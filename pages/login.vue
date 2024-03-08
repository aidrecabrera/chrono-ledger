<template>
  <div class="flex flex-col grow justify-center items-center gap-4">
    <ChronoLogo />
    <Card class="flex flex-col items-center justify-center gap-4 px-20 py-12 w-[500px] h-[370px]">
      <h1 class="text-2xl font-bricolage">Welcome Back!</h1>
      <Input placeholder="Email" />
      <Input placeholder="Password" />
      <p class="text-sm text-gray-500 underline">Forgot your password?</p>
      <NuxtLink to="/register" class="w-full">
        <Button class="w-full">
          Log In
        </Button>
      </NuxtLink>
      <p class="text-sm text-gray-500">Don't have an account? <NuxtLink to="/register" class="underline font-medium">
          Sign Up</NuxtLink>
      </p>
    </Card>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>