<script lang="ts" setup>
import OrganizationForm from "@/components/organization/form.vue";
// * This defines the layout for creating an organization
// * It must be focused.
definePageMeta({
	layout: "organizations-focused",
});
</script>

<template>
	<div class="p-8 pt-16 container flex flex-col items-center gap-7">
		<h1 class="text-4xl">Create Organization</h1>
		<OrganizationForm />
	</div>
</template>
