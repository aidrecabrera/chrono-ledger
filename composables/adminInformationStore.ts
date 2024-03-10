export interface AdminInterface {
  information: AdminProfileInfo | null
}

export interface AdminProfileInfo {
  email: string
  email_verified: boolean
  first_name: string
  last_name: string
  phone_verified: boolean
  sub: string
  username: string
}

export const useAdminInformationStore = defineStore('adminInformation', {
  state: (): AdminInterface => ({
    information: null,
  }),
  actions: {
    reset() {
      this.information = null;
    }
  },
})