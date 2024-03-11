<template>
  <div>
    <div v-if="useAdminInformationStore().$state.information?.admin">
      <DashboardAdmin />
    </div>
    <div v-else>
      <DashboardMember />
    </div>
  </div>
</template>