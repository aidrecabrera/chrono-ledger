export default defineNuxtRouteMiddleware(() => {
  const adminProfile = useSupabaseUser();
  const adminInformationStore = useAdminInformationStore();
  if (adminProfile.value && !adminInformationStore.$state.information) {
    const adminProfileData = adminProfile.value.user_metadata as AdminProfileInfo;
    adminInformationStore.$patch({ information: adminProfileData });
  }
  if (!adminProfile.value) {
    adminInformationStore.$patch({ information: null });
  }
})
