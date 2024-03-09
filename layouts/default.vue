<script lang="ts" setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const logout = async () => {
  await supabase.auth.signOut()
  navigateTo('/login')
}
</script>

<template>
  <div class="flex flex-col flex-grow max-h-screen max-w-screen">
    <div v-if="user" class="sticky top-0 flex justify-between items-center bg-background border-b px-11 py-3">
      <NavigationAvatarMenu @logout="logout" />
      <NavigationAvatarMenuDropDown :logout="logout" />
    </div>
    <div class="flex flex-row">
      <div class="border-r w-[300px] min-h-[93vh]">
        <NavigationSidebar />
      </div>
      <div class="w-10/12 p-8">
        <slot />
      </div>
    </div>
  </div>
</template>