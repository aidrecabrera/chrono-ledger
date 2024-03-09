<template>
  <div>
    <h1>Hello, World.</h1>
  </div>
</template>

<script lang="ts" setup>
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
</script>