<script setup lang="ts">
import type { AoManagement } from '~/types/aoManagement.types';

const aoManagementStore = useAoManagementStore();
const isOpenOrganization = ref(true);
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
</script>
<template>
	<div class="flex flex-row gap-4 items-center">
		<div class="flex gap-4 justify-center items-center pointer-events-none select-none">
			<NuxtImg class="invert dark:invert-0" src="/cl.png" width="20"></NuxtImg>
			<h1 class="text-center text-2xl font-normal">Rechron</h1>

		</div>
		<NavigationAdminOrganizations :isOpenOrganization="isOpenOrganization"
			:ao_management_data="ao_management_data" />
	</div>
</template>
