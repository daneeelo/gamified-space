<script setup lang="ts">
import DynamicText from './dynamic-text.vue'
</script>

<template>
    <header>
        <DynamicText />
        <LanguageSelector />
    </header>
</template>

<style scoped>
header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
