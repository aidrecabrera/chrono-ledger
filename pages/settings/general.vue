import { Card, NuxtImg, Input, Separator } from '../../.nuxt/components';
<template>
  <div class="flex flex-col gap-4 p-8 w-full">
    <h1 class="text-4xl">General</h1>
    <Card class="flex flex-col">
      <div class="flex flex-row justify-between px-10 py-10">
        <div>
          <h1 class="text-2xl">Avatar</h1>
          <div class="py-4">
            <p>This is your avatar.</p>
            <p>Click on the avatar to upload a custom one from your files</p>
          </div>
        </div>
        <div class="flex flex-row justify-center items-center w-32 h-32 rounded-xl bg-primary/5">
          <NuxtImg src="cl.png" width="65" alt="Settings" />
        </div>
      </div>
      <div>
        <Separator />
      </div>
      <div class="flex flex-row px-10 py-5">
        <h1 class="text-sm text-white/85">An avatar is optional but strongly recommended.</h1>
      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup>
const profileInformation = useAdminInformationStore()
const profile = {
  firstName: profileInformation.$state.information?.first_name,
  lastName: profileInformation.$state.information?.last_name,
  email: profileInformation.$state.information?.email,
  username: profileInformation.$state.information?.username,
  registeredDate: profileInformation.$state.information?.registered_date
}

</script>

<style></style>