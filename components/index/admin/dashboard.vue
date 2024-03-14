<template>
  <div class="flex flex-col gap-4 p-8">
    <div>
      <h1 class="text-2xl font-semibold">{{ currentInfo.currentOrganizationName }}'s Space</h1>
      <p class="text-sm text-gray-500">
        Manage all organizations and their activities
      </p>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div class="flex flex-col gap-4 col-span-1">
        <Card class="h-48 flex flex-col justify-center">
          <CardHeader>Active Members</CardHeader>
          <CardContent>
            <h1 class="text-5xl">50 members</h1>
          </CardContent>
          <CardFooter class="text-sm text-gray-500">{{ currentInfo.currentOrganizationName }} has {{ n }} members
          </CardFooter>
        </Card>
        <Card class="w-auto p-4">
          <Calendar class="h-[340px] my-3"/>
        </Card>
      </div>
      <Card class="col-span-2">
        
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Calendar from '~/components/ui/calendar/Calendar.vue';


const currentInfo = computed(() => {
  const { currentOrganizationId, currentOrganizationName } = useSessionOrganizationStore().getCurrentSessionInformation
  return { currentOrganizationId, currentOrganizationName }
});
</script>