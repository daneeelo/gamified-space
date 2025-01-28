<script setup lang="ts">
import { useLanguage } from '../../stores/language-store'
import { SelectButton, Image } from 'primevue'
import { onUpdated, ref } from 'vue'
import Italian from '../icons/ita.svg'
import English from '../icons/eng.svg'
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
    border-radius: 22px;
    padding: 6px;
    outline: inset 4px solid var(--black);
    box-shadow: 0 0 10px 1px var(--black-mute);
}
.pill {
    width: 50px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 6px;
    margin-right: 6px;
    margin-bottom: 4px;
    margin-top: 4px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 0 4px 0 var(--black);
}

.flag {
    margin-top: 4px;
    width: 50px;
    height: auto;
}

.selected {
    border: 2px solid var(--green-active);
    box-shadow: -1px 0 4px 1px var(--green-active);
    transition: all 300ms;
}
</style>
