<script lang="ts" setup>
const admin = useSupabaseUser()
console.log(admin)
</script>

<template>
    <div class="flex flex-grow h-screen w-screen">
        <slot />
    </div>
</template>