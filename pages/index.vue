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

const supabase = useSupabaseClient()

let { data: ao_management, error } = await supabase
  .from('ao_management')
  .select(`
    *,
    organizations: organizations(*),
    users: users(*)
  `)

console.log(ao_management);

</script>