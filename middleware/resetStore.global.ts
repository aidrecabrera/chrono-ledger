export default defineNuxtRouteMiddleware(() => {
    const user = useSupabaseUser()
    if (!user.value) {
        useAoManagementStore().RESET()
        useAdminInformationStore().reset()
    } 
})
