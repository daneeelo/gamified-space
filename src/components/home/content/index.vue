<script setup lang="ts">
import Content from './content.vue'
import Simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'
</script>

<template>
    <Simplebar class="content-wrapper">
        <Content />
    </Simplebar>
</template>

<style>
.content-wrapper {
    height: calc(100dvh - 130px);
    padding: 1.5rem;
    background-color: var(--black-dark);
}
.simplebar-track {
    margin-bottom: 10px !important;
    margin-top: 10px !important;
}

.simplebar-scrollbar:before {
    background-color: var(--white);
    box-shadow: 0 1px 8px 2px var(--purple-active);
}

@media screen and (min-width: 1024px) {
    .content-wrapper {
        height: calc(100dvh - 189px - 32px);
        border-radius: 0 0 22px 22px;
    }
}
</style>
