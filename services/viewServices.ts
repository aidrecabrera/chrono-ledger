import type { Tables } from "~/types/supabase";

export const viewOrganizationInfo = async ({
	organizationId,
}: {
	organizationId: number;
}) => {
	const supabase = useSupabaseClient();
	const { data: organization_info, error } = await supabase
		.from("vw_organization_info")
		.select("*")
		.eq("organization_id", organizationId);
	if (error) throw error;
	return organization_info as Tables<"vw_organization_info">[];
};
