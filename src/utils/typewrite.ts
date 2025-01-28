import { useLanguage } from '@/stores/language-store'
import { useTypewrite } from '@/stores/typewrite-store'
import { storeToRefs } from 'pinia'
import { onUpdated } from 'vue'

type TypewriteProps = {
    state: {
        currentWord: string
        referenceWord: {
            chars: string[]
            index: number | undefined
        }
    }
    timing?: {
        wait?: {
            write?: number
            delete?: number
        }
        write?: number
        delete?: number
    }
    timeout?: number
}
const keywords = [
    { it: 'proattivo', en: 'proactive' },
    { it: 'collaborativo', en: 'collaborative' },
    { it: 'responsabile', en: 'responsible' },
    { it: 'flessibile', en: 'adaptable' },
    { it: 'paziente', en: 'patient' },
    { it: 'comunicativo', en: 'communicative' },
    { it: 'analitico', en: 'analytical' },
    { it: 'motivato', en: 'motivated' },
    { it: 'umile', en: 'humble' },
    { it: 'disciplinato', en: 'disciplined' },
    { it: 'creativo', en: 'creative' },
]
export const typewriteEffect = ({ state, timing, timeout }: TypewriteProps) => {
    const languageStore = useLanguage()
    const typewriteStore = useTypewrite()

    const { language } = storeToRefs(languageStore)
    const { shouldWait, shouldWrite } = storeToRefs(typewriteStore)

    const generateRandomIndex = (maxIndex: number): number => {
        return Number((Math.random() * maxIndex).toFixed(0))
    }

    let shouldChangeWord = true

    const selectWord = () => {
        let newIndex = generateRandomIndex(keywords.length - 1)

        if (newIndex === state.referenceWord.index) {
            newIndex++
        }
        return {
            chars: keywords[newIndex][language.value.includes('it') ? 'it' : 'en'].split(''),
            index: newIndex,
        }
    }

    const writingLoop = async () => {
        let selectedWord = state.referenceWord

        if (shouldChangeWord) {
            selectedWord = selectWord()
            shouldChangeWord = false
        }
        state.referenceWord.chars = selectedWord.chars
        state.referenceWord.index = selectedWord.index

        if (shouldWait.value) {
            new Promise((resolve) => {
                timeout = setTimeout(
                    () => {
                        typewriteStore.toggleShouldWrite()
                        typewriteStore.toggleShouldWait()
                        clearTimeout(timeout)
                        writingLoop()
                        resolve
                    },
                    shouldWrite ? (timing?.wait?.write ?? 2000) : (timing?.wait?.delete ?? 1000),
                )
            })
            return
        }

        if (!shouldWrite.value) {
            new Promise((resolve) => {
                timeout = setTimeout(
                    () => {
                        const newWordState = state.currentWord.substring(
                            0,
                            state.currentWord.length - 2,
                        )
                        state.currentWord = newWordState
                        const isWordDeleted = state.currentWord.length === 0

                        if (isWordDeleted) {
                            typewriteStore.toggleShouldWait()
                            shouldChangeWord = true
                        }
                        resolve
                        clearTimeout(timeout)
                        writingLoop()
                    },
                    Math.random() * (timing?.delete ?? 130),
                )
            })
            return
        }

        new Promise((resolve) => {
            timeout = setTimeout(
                () => {
                    const newWordState =
                        state.currentWord +
                        (state?.referenceWord?.chars?.[state?.currentWord?.length] ?? '')
                    state.currentWord = newWordState
                    const isWordCompleted =
                        state.currentWord.length === state.referenceWord.chars.length

                    if (isWordCompleted) {
                        typewriteStore.toggleShouldWait()
                    }
                    resolve
                    clearTimeout(timeout)
                    writingLoop()
                },
                Math.random() * (timing?.write ?? 190),
            )
        })
    }
    writingLoop()
}
