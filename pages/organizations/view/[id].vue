<template>
  <div>
    <div class="flex flex-col gap-3 p-8">
      <div class="flex flex-row justify-start items-center text-4xl gap-4 mx-1">
        <Building2/>
        <span>{{ organizationData[0].organization_name }}</span>
      </div>
      <OrganizationViewDataTable :columns="columns" :data="organizationData" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Building2 } from "lucide-vue-next";
import { columns } from "~/components/organization/view/columns";
const route = useRoute()
let id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
const organizationDetailStoreData = computed(() => useOrganizationDetailStore().getOrganizationById(parseInt(id)))
const organizationData = (await organizationDetailStoreData.value) || [];
</script>