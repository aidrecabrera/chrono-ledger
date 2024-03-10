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
    <Separator class="my-6" />
    <div class="flex ml-4 pb-2 mb-2 text-md gap-4 items-center">
      <Building2 />
      <h1>
        Organizations
      </h1>
    </div>
    <div v-for="organization in ao_management_data" :key="organization.organization_id">
      <NuxtLink class="flex flex-row items-center px-4 py-2 rounded-sm hover:bg-primary/10 gap-4">
        <ChevronRight class="h-5" />
        <span class="select-none text-sm">{{ organization.organizations.organization_name }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight, Building2, ChevronRight, FileBarChart2, LayoutDashboard, Notebook, Settings } from 'lucide-vue-next';
import Separator from '../ui/separator/Separator.vue';
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
];
const isOpen = ref(false)

const router = useRouter();
router.afterEach((to, from) => {
  if (!to.path.includes('/settings')) {
    isOpen.value = false;
  }
});

// * All I need for Supabase communication
import type { RealtimeChannel } from "@supabase/supabase-js"
import type { AoManagement } from '~/types/aoManagement.types';
const supabase = useSupabaseClient();

// * NuxtApp for caching (IDK but it works!)
const NuxtApp = useNuxtApp()
// * Fetching ao_management data
const { data: ao_management_data, refresh: refresh_ao_management_data, pending }: { data: Ref<AoManagement[] | null>, refresh: () => void, pending: any } = await useAsyncData('ao_management', async () => {
  const { data: ao_management } = await supabase
    .from('ao_management')
    .select(`
      *,
      organizations: organizations(*),
      users: users(*)
    `);
  return ao_management as AoManagement[];
}, {
  lazy: true,
  // * Caching the data
  getCachedData: (key) => {
    // * NuxtApp.payload.data is the data from SSR
    // * If return nullish value -> this will refetch data
    return NuxtApp.payload.data[key] || NuxtApp.static.data[key]
  }
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