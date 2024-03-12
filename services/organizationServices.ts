import { SupabaseClient } from "@supabase/supabase-js";
import type { AoManagement } from "~/types/aoManagement.types";
import type { Tables } from "~/types/supabase";

export interface CreateNewOrganizationProps {
	organizationInfo: Partial<Tables<"organizations">>;
	supabase: SupabaseClient;
}

export const createNewOrganization = async ({
	organizationInfo,
	supabase,
}: CreateNewOrganizationProps) => {
	const { data: new_organization, error } = await supabase
		.from("organizations")
		.insert(organizationInfo)
		.select();
	if (error) throw error;
	return new_organization;
};

export interface ArchiveOrganizationProps {
	organizationId: number;
	supabase: SupabaseClient;
}

export const archiveOrganization = async ({
	organizationId,
	supabase,
}: ArchiveOrganizationProps) => {
	const { data: archived_organization, error } = await supabase
		.from("ao_management")
		.update({
			archived: true,
		})
		.eq("organization_id", organizationId)
		.select();
	if (error) throw error;
	return archived_organization;
};

export const unarchiveOrganization = async ({
	organizationId,
	supabase,
}: ArchiveOrganizationProps) => {
	const { data: archived_organization, error } = await supabase
		.from("ao_management")
		.update({
			archived: false,
		})
		.eq("organization_id", organizationId)
		.select();
	if (error) throw error;
	return archived_organization;
};

export const deleteArchivedOrganization = async ({
	organizationId,
	supabase,
}: ArchiveOrganizationProps) => {
	const { error } = await supabase
		.from("organizations")
		.delete()
		.eq("organization_id", organizationId);
	if (error) {
		throw error;
	}
};

export const getAoManagementData = async () => {
	const supabase = useSupabaseClient();
	const { data: ao_management, error } = await supabase
		.from("ao_management")
		.select(
			`
        *,
        organizations: organizations(*),
        users: users(*)
        `
		)
		.eq("archived", false); // * New Update: It does not allow the user to see archived organizations
	if (error) throw error;
	return ao_management as AoManagement[];
};

export const getArchivedAoManagementData = async () => {
	const supabase = useSupabaseClient();
	const { data: archived_ao_management, error } = await supabase
		.from("ao_management")
		.select(
			`
        *,
        organizations: organizations(*),
        users: users(*)
        `
		)
		.eq("archived", true); // * New Update: It allows the user to see archived organizations
	if (error) throw error;
	return archived_ao_management as AoManagement[];
};
