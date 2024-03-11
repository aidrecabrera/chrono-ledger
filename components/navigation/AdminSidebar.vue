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
import { useRealtimeChannelStore } from '../../composables/realtimeChannelStore';
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
router.afterEach((to) => {
  if (!to.path.includes('/settings')) {
    isOpen.value = false;
  }
});
const isOpenOrganization = ref(true)

const aoManagementStore = useAoManagementStore();
const realtimeChannelStore = useRealtimeChannelStore();
onMounted(() => {
  if (ao_management_data !== null) {
    aoManagementStore.fetchData();
  }
})
const ao_management_data = computed(() => aoManagementStore.$state.ao_management);
realtimeChannelStore.$subscribe((_, state) => {
  if (state.payload?.table === 'ao_management') {
    aoManagementStore.fetchData();
  }
});
</script>