<template>
  <div class="flex flex-col px-7 py-8 gap-1 text-lg font-bricolage">
    <NuxtLink to="/" class="flex flex-row items-center px-4 py-2 rounded-sm hover:bg-primary/50 gap-4">
      <LayoutDashboard />
      <span>Dashboard</span>
    </NuxtLink>
    <NuxtLink to="/session" class="flex flex-row items-center px-4 py-2 rounded-sm hover:bg-primary/50 gap-4">
      <Notebook />
      <span>Session</span>
    </NuxtLink>
    <NuxtLink to="/reports" class="flex flex-row items-center px-4 py-2 rounded-sm hover:bg-primary/50 gap-4">
      <FileBarChart2 />
      <span>Reports</span>
    </NuxtLink>
    <NuxtLink to="/settings" class="flex flex-row items-center px-4 py-2 rounded-sm hover:bg-primary/50 gap-4">
      <Settings />
      <span>Settings</span>
    </NuxtLink>
    <Separator class="mt-6" />
  </div>
</template>

<script lang="ts" setup>
import { FileBarChart2, LayoutDashboard, Notebook, Settings, User2Icon } from 'lucide-vue-next';
import Separator from '../ui/separator/Separator.vue';
</script>

<style></style>