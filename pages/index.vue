<template>
  <div>
    <h1>Hello, World.</h1>
  </div>
  <Button @click="logout">Sign Out</Button>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()

watchEffect(() => {
  if (!user.value) {
    navigateTo('/login')
  }
})
const logout = async () => {
  await supabase.auth.signOut()
}
</script>