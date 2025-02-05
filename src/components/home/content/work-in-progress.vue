<script lang="ts" setup>
import { useLanguage } from '@/stores/language-store'
import { ref, watch } from 'vue'
import { Image } from 'primevue'
import Torus from '../../../assets/torus.gif'
import { storeToRefs } from 'pinia'

const lang = useLanguage()

const { language } = storeToRefs(lang)

const message = {
    it: "alimentando l'anima...",
    en: 'feeding the soul...',
}

const selectedMessage = ref(language.value.includes('it') ? message.it : message.en)

watch(language, () => {
    selectedMessage.value = language.value.includes('it') ? message.it : message.en
})
</script>

<template>
    <div class="wip-container">
        <h1>{{ selectedMessage }}</h1>
        <div class="torus-container">
            <Image :src="Torus" width="100px" height="100px" alt="loading torus" />
        </div>
        <h2>Work in Progress</h2>
    </div>
</template>

<style scoped>
.wip-container {
    height: 100dvh;
    max-height: calc(100dvh - 220px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
}

.torus-container {
    overflow: hidden;
    border-radius: 100%;
    object-fit: contain;
    width: 90px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 4px solid var(--white-pure);
    box-shadow: 0 0 12px 12px var(--white-pure);
}
h1 {
    font-size: 4rem;
    background: linear-gradient(to top, var(--white), var(--green-active));
    filter: drop-shadow(1px 1px 6px var(--purple-active));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

h2 {
    font-size: 3rem;
    background: linear-gradient(to top, var(--purple-active), var(--green-active));
    filter: drop-shadow(1px 1px 6px var(--purple-active));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

@media screen and (min-width: 1024px) {
    .wip-container {
        height: 100dvh;
        max-height: calc(100dvh - 240px);
    }
}
</style>
