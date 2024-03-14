<template>
	<div></div>
</template>

<script lang="ts" setup>
import { getAllMemberOrganizationAttendance } from '~/services/attendanceService';

const allAttendance = getAllMemberOrganizationAttendance();
console.log(allAttendance);
</script>