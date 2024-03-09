<template>
  <div>
    <h1>Hello, World.</h1>
    <Button @click="logout">Sign Out</Button>
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const logout = async () => {
  await supabase.auth.signOut()
}
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