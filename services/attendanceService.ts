
export const getAllMemberOrganizationAttendance = async () => {
    const supabase = useSupabaseClient()
    const { data, error } = await supabase
    .from("mo_attendance_audit")
    .select("*");
    if (error) throw error;
    return data;
}