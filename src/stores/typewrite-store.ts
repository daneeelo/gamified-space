import { defineStore } from 'pinia'

type TypewriterStore = string & {
    shouldWrite: boolean
    shouldWait: boolean
    timeout?: number
}
export const useTypewrite = defineStore('typewrite', {
    state: () =>
        ({
            shouldWrite: true,
            shouldWait: false,
            timeout: undefined,
        }) as TypewriterStore,
    actions: {
        toggleShouldWrite() {
            this.shouldWrite = !this.shouldWrite
        },
        toggleShouldWait() {
            this.shouldWait = !this.shouldWait
        },
        resetToggles() {
            this.shouldWrite = false
            this.shouldWait = false
        },
    },
})
