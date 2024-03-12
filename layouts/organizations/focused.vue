<script lang="ts" setup>
import ScrollArea from "~/components/ui/scroll-area/ScrollArea.vue";

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const logout = async () => {
	await supabase.auth.signOut();
	useAoManagementStore().reset();
	navigateTo("/login");
};
</script>
<template>
	<div
		class="flex flex-col flex-grow max-h-screen max-w-screen overflow-hidden"
	>
		<div
			v-if="user"
			class="sticky top-0 flex justify-between items-center bg-background border-b px-11 py-3"
		>
			<NavigationAvatarMenu @logout="logout" />
			<NavigationAvatarMenuDropDown :logout="logout" />
		</div>
		<ScrollArea class="h-screen">
			<slot />
		</ScrollArea>
	</div>
</template>
