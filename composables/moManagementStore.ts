import type { Tables } from "~/types/supabase";

export type MoAssociation = Tables<"mo_association"> & {
  organizations: Tables<"organizations">;
};

export interface moAssociationInterface {
  mo_association: MoAssociation[] | null;
  pending: boolean;
}

export const useMoAssociationStore = defineStore("moAssociation", {
  state: (): moAssociationInterface => ({
    mo_association: null,
    pending: true,
  }),
  actions: {
    RESET() {
      this.mo_association = null;
      this.pending = true;
    },
  },
});
