<script lang="ts" setup>
import { CalendarCheck2, EllipsisVerticalIcon, EyeIcon } from "lucide-vue-next";
import { useMoAssociationStore } from "../../composables/moManagementStore";

const mo_data = computed(() => useMoAssociationStore().$state.mo_association);
const mo_pending = computed(() => useMoAssociationStore().$state.pending);

const supabase = useSupabaseClient();

const {
	data: mo_association_data,
	refresh: refresh_mo_association_data,
	pending,
}: {
	data: Ref<MoAssociation[] | null>;
	refresh: () => void;
	pending: any;
} = await useAsyncData("get_mo_association_data", async () => {
	const { data: mo_association } = await supabase
		.from("mo_association")
		.select(`*, organizations: organizations(*)`);
	return mo_association as MoAssociation[];
});

useMoAssociationStore().$patch({
	mo_association: mo_association_data.value,
	pending: pending,
});
</script>

<template>
	<div class="p-8">
		<Transition mode="out-in" name="fade">
			<div
				v-if="!pending"
				class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-1000"
			>
				<Card
					v-for="organization in mo_data"
					:key="organization.organization_id"
					class="flex flex-col sm:flex-row justify-between items-center col-span-1 h-auto sm:h-52 p-8 transition-all duration-1000"
				>
					<div
						class="flex flex-row justify-center items-center bg-black dark:bg-white/25 w-36 sm:w-36 md:w-36 h-36 sm:h-36 md:h-36 rounded-lg"
					>
						<NuxtImg src="cl.png" width="75" alt="Organization Logo" />
					</div>
					<div class="flex flex-col justify-between">
						<CardHeader>
							<CardTitle class="text-md font-normal">{{
								organization.organizations.organization_name
							}}</CardTitle>
							<CardDescription
								>{{ organization.organizations.city }} City,
								{{ organization.organizations.country }}
							</CardDescription>
						</CardHeader>
						<CardContent class="flex flex-row items-center gap-2 w-full">
							<Button size="sm" class="w-full" :onclick="() => navigateTo('/organizations/view/' + organization.organization_id)">
								<EyeIcon class="w-4 h-4" />
								<span class="ml-2">View</span>
							</Button>
							<Button size="sm" class="w-full">
								<CalendarCheck2 class="w-4 h-4" />
								<span class="ml-2">Track</span>
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<EllipsisVerticalIcon class="h-5" />
								</DropdownMenuTrigger>
							</DropdownMenu>
						</CardContent>
					</div>
				</Card>
			</div>
			<div v-else>
				<div
					class="flex flex-col min-w-full gap-2 pt-8 justify-center items-center"
				></div>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

@-webkit-keyframes animate-svg-stroke-1 {
	0%,
	100% {
		stroke-dashoffset: 518.0206298828125px;
		stroke-dasharray: 518.0206298828125px;
	}

	50% {
		stroke-dashoffset: 0;
		stroke-dasharray: 518.0206298828125px;
	}
}

@keyframes animate-svg-stroke-1 {
	0%,
	100% {
		stroke-dashoffset: 518.0206298828125px;
		stroke-dasharray: 518.0206298828125px;
	}

	50% {
		stroke-dashoffset: 0;
		stroke-dasharray: 518.0206298828125px;
	}
}

.chrono-ledger-1 {
	-webkit-animation: animate-svg-stroke-1 1.5s linear 0s infinite
		alternate-reverse;
	animation: animate-svg-stroke-1 1.5s linear 0s infinite alternate-reverse;
}
</style>
