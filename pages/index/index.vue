<template>
	<div>
		<div v-if="useAdminInformationStore().$state.information?.admin">
		</div>
		<div v-else>
		</div>
	</div>
</template>
