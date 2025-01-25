import { defineStore } from 'pinia'

export const useLanguage = defineStore('language', {
    state: () => ({ language: window.navigator.language }),
    actions: {
        changeTo(newLanguage: string) {
            this.language = newLanguage
        },
    },
})
