import type { Tables } from "~/types/supabase";
import { supabase } from "./globalSupabaseClient";

export const getAllMemberOrganizationAttendance = async (
	organizationId: string
) => {
	const { data, error } = await supabase
		.from("vw_organization_attendance")
		.select("*")
		.eq("organization_id", organizationId);
	if (error) throw error;
	return data as Tables<"vw_organization_attendance">[];
};
