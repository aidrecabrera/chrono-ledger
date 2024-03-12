import {
	getAoManagementData,
	getArchivedAoManagementData,
} from "~/services/organizationServices";
import type { AoManagement } from "~/types/aoManagement.types";
export interface AoManagementInterface {
	ao_management: AoManagement[] | null;
	archived_ao_management: AoManagement[] | null;
	pending: boolean;
}

export const useAoManagementStore = defineStore("aoManagement", {
	state: (): AoManagementInterface => ({
		ao_management: null,
		archived_ao_management: null,
		pending: true,
	}),
	actions: {
		fetchData(): void {
			this.pending = true;
			getAoManagementData()
				.then((data: AoManagement[]) => {
					this.ao_management = data;
				})
				.catch((error: Error) => {
					this.ao_management = null;
					console.error(error);
				})
				.finally(() => {
					this.pending = false;
				});
		},
		fetchArchivedData(): void {
			this.pending = true;
			getArchivedAoManagementData()
				.then((data: AoManagement[]) => {
					this.archived_ao_management = data;
				})
				.catch((error: Error) => {
					this.archived_ao_management = null;
					console.error(error);
				})
				.finally(() => {
					this.pending = false;
				});
		},
		reset() {
			this.ao_management = null;
			this.archived_ao_management = null;
			this.pending = true;
		},
		remove_ao_management(aoId: number) {
			// Delete an AO given their ID
			if (this.ao_management) {
				this.ao_management = this.ao_management?.filter(
					(ao) => ao.ao_id !== aoId
				);
			}
		},
		remove_archived_ao_management(aoId: number) {
			// Delete an AAO given their ID
			if (this.archived_ao_management) {
				this.archived_ao_management = this.archived_ao_management?.filter(
					(ao) => ao.ao_id !== aoId
				);
			}
		},
	},
});
