<template>
  <div class="flex flex-col grow justify-center items-center gap-4">
    <ChronoLogo/>
    <Card class="flex flex-col items-center justify-center gap-4 px-20 py-12 w-[500px] h-[517px]">
      <h1 class="text-2xl font-bricolage">Get Started</h1>
      <div class="flex flex-row gap-2">
        <Input placeholder="First Name" />
        <Input placeholder="Last Name" />
      </div>
      <Input placeholder="Username" />
      <Input placeholder="Email" />
      <Input placeholder="Password" />
      <Input placeholder="Confirm Password" />
      <div class="flex flex-row items-center gap-2">
        <Checkbox />
        <p class="text-sm text-gray-500">I agree to the terms and conditions</p>
      </div>
      <NuxtLink to="/register" class="w-full">
        <Button class="w-full">
          Log In
        </Button>
      </NuxtLink>
      <p class="text-sm text-gray-500">Already have an account? <NuxtLink to="/login" class="underline font-medium">
          Log In</NuxtLink>
      </p>
    </Card>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>