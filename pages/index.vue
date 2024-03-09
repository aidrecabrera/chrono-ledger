<template>
  <div>
    <h1>Hello, World.</h1>
  </div>
  <Button @click="logout">Sign Out</Button>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const logout = async () => {
  await supabase.auth.signOut()
}

definePageMeta({
  middleware: 'authentication'
})
</script> 