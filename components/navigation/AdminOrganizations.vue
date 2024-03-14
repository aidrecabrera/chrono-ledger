<template>
	<div>
		<Collapsible v-model:open="isOpenOrganization">
			<CollapsibleTrigger class="w-full">
				<div class="flex ml-4 text-md gap-2 items-center">
					<h1>{{ !organizationStore.$state.currentOrganizationName ? "Organizations" :
			organizationStore.$state.currentOrganizationName }}</h1>
					<ChevronRight
						:class="`h-4 mt-1 ml-auto transition-all duration-200 ${isOpenOrganization ? 'transform rotate-90' : ''}`" />
				</div>
			</CollapsibleTrigger>
			<CollapsibleContent class="absolute ml-1 mt-3 w-80 bg-background px-4 py-3 border rounded-sm">
				<Card v-for="organization in ao_management_data" :key="organization.organization_id"
					class="flex flex-row items-center px-2 py-1 hover:bg-primary/10 gap-4 border-0 rounded-sm relative"
					:onclick="() =>
			setCurrentSession(organization.organizations.organization_id, organization.organizations.organization_name)
			">
					<NuxtLink class="flex flex-row items-center gap-2 w-full">
						<ChevronRight class="h-4" />
						<span class="select-none text-sm">{{
			organization.organizations.organization_name
		}}</span>
					</NuxtLink>
				</Card>
			</CollapsibleContent>
		</Collapsible>
	</div>
</template>

<script lang="ts" setup>
import type { AoManagement } from '~/types/aoManagement.types';
const { ao_management_data } = defineProps({
	ao_management_data: {
		type: Object as () => AoManagement[] | undefined,
		required: false,
	}
});
const isOpenOrganization = ref(false);
const organizationStore = useSessionOrganizationStore();
const setCurrentSession = (organizationId: number, organizationName: string) => {
	organizationStore.$patch({
		currentOrganizationId: organizationId,
		currentOrganizationName: organizationName,
	})
	isOpenOrganization.value = false;
}
</script>