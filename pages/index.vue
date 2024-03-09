<template>
  <div>
    <h1>Hello, World.</h1>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: 'authentication'
  })
</script>