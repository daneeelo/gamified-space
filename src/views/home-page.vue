<script setup lang="ts">
import ReactiveHeader from '@/components/home/header/header-comp.vue'
import Content from '@/components/home/content/main-content.vue'
</script>

<template>
    <div id="app-container">
        <ReactiveHeader />
        <Content />
    </div>
</template>

<style scoped>
#app-container {
    background-color: var(--black-dark);
    border-radius: 22px;
    box-shadow: 0 0 10px 1px var(--black-pure);
}
</style>
