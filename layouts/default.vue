<script lang="ts" setup>
import ScrollArea from "~/components/ui/scroll-area/ScrollArea.vue";
import type { AoManagement } from "~/types/aoManagement.types";
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const logout = async () => {
	await supabase.auth.signOut();
	useAoManagementStore().$reset();
	useMoAssociationStore().$reset();
	useOrganizationDetailStore().$reset();
	navigateTo("/login");
};
const adminInfo = useAdminInformationStore().$state.information?.admin;
const aoManagementStore = useAoManagementStore();
const realtimeChannelStore = useRealtimeChannelStore();
function isAoManagement(item: any): item is AoManagement {
	return item && typeof item.ao_id === 'number' && typeof item.admin_id === 'string' && typeof item.organization_id === 'number';
}
const ao_management_data = computed((): AoManagement[] | undefined => {
	const data = aoManagementStore.$state.ao_management;
	if (Array.isArray(data) && data.every(item => isAoManagement(item))) {
		return data;
	}
	return undefined;
});
onMounted(() => {
	if (ao_management_data !== null) {
		aoManagementStore.fetchData();
	}
});
realtimeChannelStore.$subscribe((_, state) => {
	if (state.payload?.table === "ao_management") {
		aoManagementStore.fetchData();
	}
});
</script>

<template>
	<div class="flex flex-col flex-grow max-h-screen max-w-screen overflow-hidden">
		<div class="sticky top-0 flex justify-between items-center bg-background border-b px-11 py-3 z-50">
			<NavigationAvatarMenu @logout="logout" />
			<NavigationAvatarMenuDropDown :logout="logout" />
		</div>
		<div class="flex flex-row">
			<div class="border-r w-[350px] min-h-[93vh]">
				<NavigationAdminSidebar v-if="adminInfo" />
				<NavigationMemberSidebar v-else />
			</div>
			<div class="w-10/12">
				<ScrollArea class="min-w-screen grow max-h-screen">
					<slot />
				</ScrollArea>
			</div>
		</div>
	</div>
</template>
