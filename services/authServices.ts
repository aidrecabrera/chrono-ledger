import type {
	SignInWithEmailProps,
	SignUpNewUserProps,
} from "~/types/authServices.types";

export const signUpNewAdminUser = async ({
	email,
	password,
	first_name,
	last_name,
	username,
	role,
	contact,
	supabase,
}: SignUpNewUserProps & { supabase: any }) => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				first_name: first_name,
				last_name: last_name,
				username: username,
				role: role,
				contact: contact,
				admin: true,
			},
		},
	});
	if (error) {
		throw error;
	}
};

export const signUpNewMemberUser = async ({
	email,
	password,
	first_name,
	last_name,
	username,
	role,
	contact,
	supabase,
}: SignUpNewUserProps & { supabase: any }) => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				first_name: first_name,
				last_name: last_name,
				username: username,
				role: role,
				contact: contact,
				admin: false,
			},
		},
	});
	if (error) {
		throw error;
	}
};

export const signInWithEmail = async ({
	email,
	password,
	supabase,
}: SignInWithEmailProps & { supabase: any }) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
		options: {
			redirectTo: "/",
		},
	});
	if (error) {
		throw error;
	}
	navigateTo("/");
};

export const signOutUser = async (supabase: any) => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.error("Error signing out:", error);
		return;
	}
};
