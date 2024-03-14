<template>
	<div>
		<Collapsible v-bind:isOpen="isOpenOrganization" v-on:update:isOpen="isOpenOrganization = $event">
			<CollapsibleTrigger class="w-full">
				<div class="flex ml-4 text-md gap-2 items-center">
					<h1>Organizations</h1>
					<ChevronRight
						:class="`h-4 mt-1 ml-auto transition-all duration-200 ${isOpenOrganization ? 'transform rotate-90' : ''}`"
					/>
				</div>
			</CollapsibleTrigger>
			<CollapsibleContent class="absolute ml-1 mt-3 w-80 bg-background px-4 py-3 border rounded-sm">
				<Card
					v-for="organization in ao_management_data"
					:key="organization.organization_id"
					class="flex flex-row items-center px-2 py-1 hover:bg-primary/10 gap-4 border-0 rounded-sm relative"
				>
					<NuxtLink
						class="flex flex-row items-center gap-2 w-full"
					>
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
import { ChevronRight } from 'lucide-vue-next';
import type { AoManagement } from '~/types/aoManagement.types';
const { isOpenOrganization, ao_management_data } = defineProps({
	isOpenOrganization: Boolean,
	ao_management_data: {
		type: Object as () => AoManagement[] | undefined,
		required: false,
	}
});
</script>