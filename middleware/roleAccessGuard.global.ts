const ADMIN_ROUTES = ["/session", "/organizations"];
const USER_ROUTES = ["/logging"];

function redirectToHome() {
	return navigateTo("/");
}

export default defineNuxtRouteMiddleware((to) => {
	const isAdmin = useAdminInformationStore().$state.information?.admin;
	if (isAdmin && USER_ROUTES.some((route) => to.path.startsWith(route))) {
		console.log("Admin is accessing user routes", isAdmin);
		return redirectToHome();
	}
	if (!isAdmin && ADMIN_ROUTES.some((route) => to.path.startsWith(route))) {
		console.log("Unauthorized user", isAdmin);
		return redirectToHome();
	}
});
