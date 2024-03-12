<template>
	<SpeedInsights />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
</script>

<style>
:root {
	font-family: "Square Sans Text", sans-serif;
	overflow: hidden;
}

.page-enter-active,
.page-leave-active {
	transition: all 0.1s;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
}

.layout-enter-active,
.layout-leave-active {
	transition: all 0.25s;
}

.layout-enter-from,
.layout-leave-to {
	opacity: 0;
	transform: translateY(10px);
}
</style>
