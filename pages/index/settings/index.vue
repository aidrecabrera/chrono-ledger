<template>
	<div class="flex h-full">
		<NuxtPage />
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: "settings-redirect",
});
</script>

<style></style>
