import { DashboardMember } from '#build/components';
<template>
  <div>
    <div v-if="false">
      <DashboardAdmin />
    </div>
    <div else>
      <DashboardMember />
    </div>
  </div>
</template>