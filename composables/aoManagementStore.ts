import type { AoManagement } from "~/types/aoManagement.types"

export interface AoManagementInterface {
  ao_management: AoManagement[] | null
  pending: boolean
}

export const useAoManagementStore = defineStore('aoManagement', {
  state: (): AoManagementInterface => ({
    ao_management: null,
    pending: true,
  }),
  actions: {
    reset() {
      this.ao_management = null;
      this.pending = true;
    }
  }
})