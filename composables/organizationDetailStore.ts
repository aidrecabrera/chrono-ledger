import { viewOrganizationInfo } from "~/services/viewServices";
import type { Tables } from "~/types/supabase";

export interface OrganizationDetailInterface {
	viewedOrganizationDetails: {
		[key: number]: Tables<"vw_organization_info">[];
	} | null;
	error: Error | unknown;
}

export const useOrganizationDetailStore = defineStore(
	"organizationDetailStore",
	{
		state: (): OrganizationDetailInterface => ({
			viewedOrganizationDetails: null,
			error: null,
		}),
		getters: {
			getById(state) {
				return (organizationId: number) => {
					// Check if the organization exists in the state
					return state.viewedOrganizationDetails?.[organizationId];
				};
			},
		},
		actions: {
			async fetchSingleOrganization(id: number) {
				try {
					const data: Tables<"vw_organization_info">[] =
						await viewOrganizationInfo({ organizationId: id });
					if (data !== null && data.length !== 0) {
						if (this.viewedOrganizationDetails === null) {
							this.viewedOrganizationDetails = {};
						}
						this.viewedOrganizationDetails[id] = data;
					}
				} catch (error: any) {
					this.error = error.message;
					console.error(error);
				}
			},
			/**
			 * * NOTE: Always use this method to get an organization by its ID.
			 * * If the organization is not found in the local store, it fetches the organization from the server.
			 * @param id The ID of the organization.
			 * @returns The organization object or null if not found.
			 */
			async getOrganizationById(id: number) {
				let organization = this.getById(id);
				if (!organization) {
					await this.fetchSingleOrganization(id);
					organization = this.getById(id);
				}
				return organization;
			},
		},
	}
);
