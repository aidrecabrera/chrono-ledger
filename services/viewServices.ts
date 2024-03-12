import type {
  PostgrestError,
  PostgrestSingleResponse,
  SupabaseClient,
} from "@supabase/supabase-js";
import type { Tables } from "~/types/supabase";

export const viewOrganizationInfo = async ({
  organizationId,
  supabase,
}: {
  organizationId: number;
  supabase: SupabaseClient;
}) => {
  const { data: organization_info } = await supabase
    .from("vw_organization")
    .select("*");
};
