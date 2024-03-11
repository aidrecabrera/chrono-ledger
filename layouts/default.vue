<script lang="ts" setup>
import ScrollArea from '~/components/ui/scroll-area/ScrollArea.vue';

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const logout = async () => {
  await supabase.auth.signOut()
  useAoManagementStore().RESET()
  navigateTo('/login')
}
const adminInfo = useAdminInformationStore().$state.information?.admin

</script>

<template>
  <div class="flex flex-col flex-grow max-h-screen max-w-screen overflow-hidden">
    <div v-if="user" class="sticky top-0 flex justify-between items-center bg-background border-b px-11 py-3">
      <NavigationAvatarMenu @logout="logout" />
      <NavigationAvatarMenuDropDown :logout="logout" />
    </div>
    <div class="flex flex-row">
      <div class="border-r w-[350px] min-h-[93vh]">
        <NavigationAdminSidebar v-if="adminInfo" />
        <NavigationMemberSidebar v-else />
      </div>
      <div class="w-10/12">
        <ScrollArea class="min-w-screen grow max-h-screen">
          <slot />
        </ScrollArea>
      </div>
    </div>
  </div>
</template>
