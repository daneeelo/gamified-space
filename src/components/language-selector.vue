<script setup lang="ts">
import { useLanguage } from '../stores/language-store'
import { SelectButton, Image } from 'primevue'
import { onUpdated, ref } from 'vue'
import Italian from './icons/ita.svg'
import English from './icons/eng.svg'
import { storeToRefs } from 'pinia'
import { useTypewrite } from '@/stores/typewrite-store'

const typewriteStore = useTypewrite()
const languageStore = useLanguage()
const { language } = storeToRefs(languageStore)

const selectedLanguage = ref(
    language.value.includes('it')
        ? { img: Italian, code: 'it-IT' }
        : { img: English, code: 'en-US' },
)

const options = ref([
    { img: Italian, code: 'it-IT' },
    { img: English, code: 'en-US' },
])

onUpdated(() => {
    languageStore.changeTo(selectedLanguage.value.code)
    typewriteStore.resetToggles()
})
</script>

<template>
    <SelectButton
        class="select-container"
        v-model="selectedLanguage"
        :options="options"
        optionLabel="code"
        dataKey="code"
        aria-labelledby="custom"
        :allow-empty="false"
    >
        <template #option="slotProps">
            <div
                class="pill"
                :class="selectedLanguage.code === slotProps.option.code ? 'selected' : ''"
            >
                <Image :src="slotProps.option.img" class="flag" />
            </div>
        </template>
    </SelectButton>
</template>

<style scoped>
.select-container {
    background-color: var(--black-mute);
    border-radius: 16px;
    padding: 0 2px;
}
.pill {
    width: 50px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 4px;
    margin-right: 4px;
    margin-bottom: 4px;
    margin-top: 4px;
    border-radius: 16px;
    overflow: hidden;
}

.flag {
    margin-top: 4px;
    width: 50px;
    height: auto;
}

.selected {
    border: 1px solid #b3e9c7;
    box-shadow: -1px 0 4px 1px #b3e9c7;
    transition: all 300ms;
}
</style>
