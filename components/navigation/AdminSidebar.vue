<template>
  <div class="flex flex-col px-7 py-8 gap-1">
    <NuxtLink v-for="item in navItems" :key="item.name" :to="item.path"
      class="flex flex-row items-center px-4 py-2 rounded-sm hover:bg-primary/10 gap-4">
      <component :is="item.icon" />
      <span class="select-none">{{ item.name }}</span>
    </NuxtLink>

    <Collapsible v-model:open="isOpen">
      <CollapsibleTrigger class="w-full">
        <NuxtLink to="/settings" class="flex flex-row items-center px-4 py-2 rounded-sm hover:bg-primary/10 gap-4">
          <component :is="Settings" />
          <span class="select-none">Settings</span>
        </NuxtLink>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div class="flex flex-col select-none">
          <NuxtLink to="/settings/general"
            class="flex flex-row items-center pl-14 px-4 py-2 rounded-sm hover:text-current/50 gap-4">General</NuxtLink>
          <NuxtLink to="/settings/security"
            class="flex flex-row items-center pl-14 px-4 py-2 rounded-sm hover:text-current/50 gap-4">Security
          </NuxtLink>
          <NuxtLink to="/settings/organizations"
            class="flex flex-row items-center pl-14 px-4 py-2 rounded-sm hover:text-current/50 gap-4">Organizations
          </NuxtLink>
          <NuxtLink to="/settings/archived"
            class="flex flex-row items-center pl-14 px-4 py-2 rounded-sm hover:text-current/50 gap-4">Archived
          </NuxtLink>
        </div>
      </CollapsibleContent>
    </Collapsible>
    <Collapsible v-model:open="isOpenOrganization">
      <CollapsibleTrigger class="w-full">
        <div class="flex ml-4 pb-2 mb-2 mt-2 text-md gap-4 items-center">
          <Building2 />
          <h1>
            Organizations
          </h1>
          <ChevronRight
            :class="`h-4 mt-1 ml-auto transition-all duration-200 ${isOpenOrganization ? 'transform rotate-90' : ''}`" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div v-for="organization in ao_management_data" :key="organization.organization_id">
          <NuxtLink class="flex flex-row items-center px-4 py-2 rounded-sm hover:bg-primary/10 gap-4">
            <ChevronRight class="h-5" />
            <span class="select-none text-sm">{{ organization.organizations.organization_name }}</span>
          </NuxtLink>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script lang="ts" setup>
import { ArchiveIcon, Building2, ChevronRight, FileBarChart2, LayoutDashboard, Notebook, Settings } from 'lucide-vue-next';
import { ref } from 'vue'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Session', path: '/session', icon: Notebook },
  { name: 'Reports', path: '/reports', icon: FileBarChart2 },
  { name: 'Archived', path: '/organizations/archived', icon: ArchiveIcon }
];
const isOpen = ref(false)
const router = useRouter();
router.afterEach((to, from) => {
  if (!to.path.includes('/settings')) {
    isOpen.value = false;
  }
});
const isOpenOrganization = ref(true)

// * All I need for Supabase communication
import type { RealtimeChannel } from "@supabase/supabase-js"
import type { AoManagement } from '~/types/aoManagement.types';

const supabase = useSupabaseClient();
// * Fetching ao_management data
const { data: ao_management_data, refresh: refresh_ao_management_data, pending }: { data: Ref<AoManagement[] | null>, refresh: () => void, pending: any } = await useAsyncData('ao_management_get', async () => {
  const { data: ao_management } = await supabase
    .from('ao_management')
    .select(`
      *,
      organizations: organizations(*),
      users: users(*)
    `)
    .eq('archived', false) // * New Update: It does not allow the user to see archived organizations
  return ao_management as AoManagement[];
});

if (ao_management_data.value) {
  useAoManagementStore().$patch({
    ao_management: ao_management_data.value,
    pending: pending
  });
}

// * Realtime updates for ao_management data
let aoManagementChannel: RealtimeChannel | null = null;
aoManagementChannel = supabase.channel('public:ao_management')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'ao_management' },
    (payload) => {
      console.log('Realtime update:', payload);
      refresh_ao_management_data();
    }
  )
aoManagementChannel.subscribe();
// * Unsubscribing when user is not on the page
if (!useAdminInformationStore().$state.information) {
  aoManagementChannel.unsubscribe();
}

// * Watch for changes in ao_management and pending state
watch([ao_management_data, pending], ([newAoManagementData, newPending]) => {
  useAoManagementStore().$patch({
    ao_management: newAoManagementData,
    pending: newPending
  });
});

useAoManagementStore().$subscribe((mutation) => {
  if ('payload' in mutation && 'archived_ao_management' in mutation.payload) refresh_ao_management_data()
}) 
</script>