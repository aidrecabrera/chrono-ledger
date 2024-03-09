<script lang="ts" setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const logout = async () => {
  await supabase.auth.signOut()
}
</script>

<template>
  <div class="flex flex-col flex-grow h-screen w-screen">
    <div v-if="user" class="flex justify-between items-center bg-secondary px-7 py-3">
      <NavigationAvatarMenu @logout="logout" />
      <NavigationAvatarMenuDropDown :logout="logout" />
    </div>
    <div class="flex flex-row h-full">
      <div class="border-r w-[300px]">

      </div>
      <div class="w-10/12">
        <slot />
      </div>
    </div>
  </div>
</template>