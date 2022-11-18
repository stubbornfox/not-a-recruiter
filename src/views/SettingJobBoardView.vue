<template>
    <div class="flex flex-grow border">
        <SettingsJobboardSidebar class="lg:w-1/4 md:w-1/3"/>
        <div class="w-full px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 h-full flex flex-col flex-grow h-full">
            <div class="h-full flex flex-col flex-grow mt-4">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script setup>
    import SettingsJobboardSidebar from "../components/SettingsJobboardSidebar.vue";
    import { RouterView } from "vue-router";
</script>
