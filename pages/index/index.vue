<template>
	<div>
		<div v-if="useAdminInformationStore().$state.information?.admin">
			<IndexAdminDashboard/>
		</div>
		<div v-else>
		</div>
	</div>
</template>
