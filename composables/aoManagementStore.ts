import type { AoManagement } from "~/types/aoManagement.types"

export interface AoManagementInterface {
    ao_management: AoManagement[] | null
    archived_ao_management: AoManagement[] | null
    pending: boolean
}

export const useAoManagementStore = defineStore('aoManagement', {
    state: (): AoManagementInterface => ({
        ao_management: null,
        archived_ao_management: null,
        pending: true,
    }),
    actions: {
        RESET() {
            this.ao_management = null;
            this.archived_ao_management = null;
            this.pending = true;
        },
        REMOVE_AO_MANAGEMENT(aoId: number) {
            // Delete an AO given their ID
            if (this.ao_management) {
                this.ao_management = this.ao_management?.filter(ao => ao.ao_id !== aoId)
            }
        },
        REMOVE_ARCHIVED_AO_MANAGEMENT(aoId: number) {
            // Delete an AAO given their ID
            if (this.archived_ao_management) {
                this.archived_ao_management = this.archived_ao_management?.filter(ao => ao.ao_id !== aoId)
            }
        }
    },
})