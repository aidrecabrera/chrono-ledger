<template>
    <div>
        <p class="absolute p-5">
            <select v-model="colorMode.preference"
                class="border w-24 h-8 dark:bg-gray-900 dark:text-white dark:border-gray-700">
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </p>
    </div>
    <div class="flex flex-grow h-screen w-screen">
        <slot />
    </div>
</template>

<script setup>
const colorMode = useColorMode()
</script>