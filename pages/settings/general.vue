import { Card, NuxtImg, Input, Separator } from '../../.nuxt/components';
<template>
  <div class="flex flex-col gap-4 p-8 w-full max-h-screen">
    <h1 class="text-4xl">General</h1>
    <Card class="flex flex-col">
      <div class="flex flex-row justify-between px-10 py-10">
        <div>
          <h1 class="text-2xl font-medium">Avatar</h1>
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
    <Card class="flex flex-col">
      <div class="flex flex-row justify-between px-10 py-10">
        <div>
          <h1 class="text-2xl font-medium">Username</h1>
          <div class="py-4 flex flex-col gap-3">
            <p>Please enter your full name, or a display name you are comfortable with.</p>
            <Input type="text" class="w-96 rounded-md bg-primary/5 px-4" placeholder="Username"
              :value="profile.username" />
          </div>
        </div>
      </div>
      <div>
        <Separator />
      </div>
      <div class="flex flex-row px-10 py-5 items-center">
        <h1 class="text-sm text-white/85">Please use 32 characters at maximum.</h1>
        <Button class="ml-auto" variant="default">Save</Button>
      </div>
    </Card>
    <Card class="flex flex-col">
      <div class="flex flex-row justify-between px-10 py-10">
        <div>
          <h1 class="text-2xl font-medium">Email</h1>
          <div class="py-4 flex flex-col gap-3">
            <p>Please enter your email address.</p>
            <Input type="email" class="w-96 rounded-md bg-primary/5 px-4" placeholder="Email" :value="profile.email" />
          </div>
        </div>
      </div>
      <div>
        <Separator />
      </div>
      <div class="flex flex-row px-10 py-5 items-center">
        <h1 class="text-sm text-white/85">Please use a valid email address.</h1>
        <Button class="ml-auto" variant="default">Save</Button>
      </div>
    </Card>
    <Card class="flex flex-col">
      <div class="flex flex-row justify-between px-10 py-10">
        <div>
          <h1 class="text-2xl font-medium">Name</h1>
          <div class="py-4 flex flex-col gap-3">
            <p>Please enter your full name.</p>
            <div class="flex flex-row gap-3">
              <Input type="text" class="w-48 rounded-md bg-primary/5 px-4" placeholder="First Name"
                :value="profile.firstName" />
              <Input type="text" class="w-48 rounded-md bg-primary/5 px-4" placeholder="Last Name"
                :value="profile.lastName" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Separator />
      </div>
      <div class="flex flex-row px-10 py-5 items-center">
        <h1 class="text-sm text-white/85">Please use 32 characters at maximum.</h1>
        <Button class="ml-auto" variant="default">Save</Button>
      </div>
    </Card>
    <!-- Delete Account Card -->
    <Card class="flex flex-col border-destructive bg-destructive/5">
      <div class="flex flex-row justify-between px-10 py-10">
        <div>
          <h1 class="text-2xl font-medium">Delete Account</h1>
          <div class="py-4 flex flex-col gap-3">
            <p>Once you delete your account, there is no going back. Please be certain.</p>
          </div>
        </div>
      </div>
      <div>
        <Separator class="bg-destructive" />
      </div>
      <div class="flex flex-row px-10 py-5 items-center bg-destructive/15">
        <h1 class="text-sm text-white/85">This action cannot be undone.</h1>
        <Button class="ml-auto" variant="destructive">Delete Account</Button>
      </div>
    </Card>
  </div>

</template>
<script lang="ts" setup>
import ScrollArea from '~/components/ui/scroll-area/ScrollArea.vue';

const profileInformation = useAdminInformationStore()
const profile = {
  firstName: profileInformation.$state.information?.first_name,
  lastName: profileInformation.$state.information?.last_name,
  email: profileInformation.$state.information?.email,
  username: profileInformation.$state.information?.username,
}
</script>

<style></style>