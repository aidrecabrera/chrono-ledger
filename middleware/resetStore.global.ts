export default defineNuxtRouteMiddleware(() => {
	const user = useSupabaseUser();
	if (!user.value) {
		useAoManagementStore().$reset();
		useMoAssociationStore().$reset();
		useOrganizationDetailStore().$reset();
	}
});
