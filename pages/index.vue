<script lang="ts" setup>
import { CalendarCheck2, EyeIcon } from 'lucide-vue-next';
import type { AoManagement } from '~/types/aoManagement.types';

// * Route Guard, preventing unauthorized access
const user = useSupabaseUser()
watchEffect(() => {
  if (!user.value) {
    navigateTo('/login')
    useAdminInformationStore().$reset
  }
})
definePageMeta({
  middleware: 'authentication'
})

// * All I need for Supabase communication
import type { RealtimeChannel } from "@supabase/supabase-js"
const supabase = useSupabaseClient();

// * Fetching ao_management data
const { data: ao_management_data, refresh: refresh_ao_management_data }: { data: Ref<AoManagement[] | null>, refresh: () => void } = await useAsyncData('ao_management', async () => {
  const { data: ao_management } = await supabase
    .from('ao_management')
    .select(`
      *,
      organizations: organizations(*),
      users: users(*)
    `);
  return ao_management as AoManagement[];
});

// * Realtime updates for ao_management data
let aoManagementChannel: RealtimeChannel | null = null;
onMounted(() => {
  aoManagementChannel = supabase.channel('public:ao_management')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'ao_management' },
      (payload) => {
        console.log('Realtime update:', payload);
        refresh_ao_management_data();
      }
    )
  aoManagementChannel.subscribe();
});
// * Unsubscribing when user is not on the page
onUnmounted(() => {
  if (aoManagementChannel) {
    aoManagementChannel.unsubscribe();
  }
});

</script>

<template>
  <div class="p-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="organization in ao_management_data" :key="organization.organization_id">
        <Card class="flex flex-col sm:flex-row justify-between items-center col-span-1 h-auto sm:h-52 p-8">
          <div
            class="flex flex-row justify-center items-center bg-white/25 w-36 sm:w-36 md:w-36 h-36 sm:h-36 md:h-36 rounded-lg">
            <NuxtImg src="cl.png" width="75" alt="Organization Logo" />
          </div>
          <div class="flex flex-col justify-between">
            <CardHeader>
              <CardTitle class="text-md font-normal">{{ organization.organizations.organization_name }}</CardTitle>
              <CardDescription>{{ organization.organizations.city }} City, {{ organization.organizations.country }}
              </CardDescription>
            </CardHeader>
            <CardContent class="flex flex-row gap-2 w-full">
              <Button size="sm" class="w-full">
                <EyeIcon class="w-4 h-4" />
                <span class="ml-2">View</span>
              </Button>
              <Button size="sm" class="w-full">
                <CalendarCheck2 class="w-4 h-4" />
                <span class="ml-2">Track</span>
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
