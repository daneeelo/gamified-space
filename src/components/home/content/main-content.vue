<script setup lang="ts">
import Simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'
import WorkInProgress from './work-in-progress.vue'
</script>

<template>
    <Simplebar class="content-wrapper">
        <div class="content-layout">
            <WorkInProgress />
        </div>
    </Simplebar>
</template>

<style>
.content-wrapper {
    height: calc(100dvh - 130px);
    padding: 1.5rem;
}
.simplebar-track {
    margin-bottom: 10px !important;
    margin-top: 10px !important;
}

.simplebar-scrollbar:before {
    background-color: var(--white);
    box-shadow: 0 1px 8px 2px var(--purple-active);
}

.content-layout {
    min-height: 2000px;
}

@media screen and (min-width: 1024px) {
    .content-wrapper {
        height: calc(100dvh - 190px);
        border-radius: 0 0 22px 22px;
    }
}
</style>
