export interface SessionOrganizationsInterface {
  currentOrganizationId: number | null,
  currentOrganizationName: string | null
}

export const useSessionOrganizationStore = defineStore("sessionOrganization",{
  state: (): SessionOrganizationsInterface => ({
    currentOrganizationId: null,
    currentOrganizationName: null
  }),
  getters: {
    getCurrentSessionInformation: (state) => {
      return {
        currentOrganizationId: state.currentOrganizationId, 
        currentOrganizationName: state.currentOrganizationName 
      }
    }
  },
})
