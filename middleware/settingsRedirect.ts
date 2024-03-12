export default defineNuxtRouteMiddleware((to, from) => {
	if (to.path === "/settings" || to.path === "/settings/") {
		return "/settings/general";
	}
});
