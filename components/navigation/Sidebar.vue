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
    <Separator class="mt-6" />

  </div>
</template>

<script lang="ts" setup>
import { FileBarChart2, LayoutDashboard, Notebook, Settings } from 'lucide-vue-next';
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
</script>