export interface AdminInterface {
	information: AdminProfileInfo | null;
}

export interface AdminProfileInfo {
	admin: boolean;
	sub: string;
	username: string;
	email: string;
	email_verified: boolean;
	contact: string;
	first_name: string;
	last_name: string;
	phone_verified: boolean;
	role: string;
}

export const useAdminInformationStore = defineStore("adminInformation", {
	state: (): AdminInterface => ({
		information: null,
	}),
	actions: {
		reset() {
			this.information = null;
		},
	},
});
