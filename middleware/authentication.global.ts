export default defineNuxtRouteMiddleware((to, from) => {
	// ! IMPORTANT TO PREVENT UNAUTHORIZED AND UNAUTHENTICATED ACCESS.
	/**
	 * ! Breakthrough solution to my infinite guard problem
	 * ! when making the middleware global
	 *
	 * * IF route is in login, and member-login,
	 * * OR anything that can be accessed by unauthenticated,
	 * * THEN we don't need to invoke this middleware.
	 * */
	const user = useSupabaseUser();
	// ? These are the routes that can be accessed when logged out
	if (
		[
			"login",
			"login-admin",
			"register-admin",
			"login-member",
			"register-member",
		].includes(to.name as string)
	) {
		// * If they are authenticated, they cannot accessed the no-auth routes.
		if (user.value) {
			return navigateTo("/");
		}
		return; // * <-- Do nothing!
	}
	if (to.name === "register") {
		// ! <-- Only necessary because register is a dead route.
		return navigateTo("/register/member");
	}
	if (!user.value) {
		return navigateTo("/login");
	}
});
