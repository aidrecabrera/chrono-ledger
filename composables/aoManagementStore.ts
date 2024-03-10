import type { AoManagement } from "~/types/aoManagement.types"

export interface AoManagementInterface {
  ao_management: AoManagement[] | null
}

export const useAoManagementStore = defineStore('aoManagement', {
  state: (): AoManagementInterface => ({
    ao_management: null,
  }),
  getters: {
  },
  actions: {
  },
})