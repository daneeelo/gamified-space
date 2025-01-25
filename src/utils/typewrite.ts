import { useLanguage } from '@/stores/language-store'
import { useTypewrite } from '@/stores/typewrite-store'
import { storeToRefs } from 'pinia'

type TypewriteProps = {
    state: {
        currentWord: string
        referenceWord: {
            chars: string[]
            index: number | undefined
        }
    }
    timeout?: number
}
const keywords = [
    { it: 'proattivo', en: 'proactive' },
    { it: 'collaborativo', en: 'collaborative' },
    { it: 'responsabile', en: 'responsible' },
    { it: 'adattabile', en: 'adaptable' },
    { it: 'paziente', en: 'patient' },
    { it: 'comunicativo', en: 'communicative' },
    { it: 'analitico', en: 'analytical' },
    { it: 'motivato', en: 'motivated' },
    { it: 'umile', en: 'humble' },
    { it: 'disciplinato', en: 'disciplined' },
    { it: 'creativo', en: 'creative' },
]
export const typewriteEffect = ({ state, timeout }: TypewriteProps) => {
    const languageStore = useLanguage()
    const typewriteStore = useTypewrite()

    const { language } = storeToRefs(languageStore)
    const { shouldWait, shouldWrite } = storeToRefs(typewriteStore)

    const generateRandomIndex = (maxIndex: number): number => {
        return Number((Math.random() * maxIndex).toFixed(0))
    }

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
        const notSelectedWord = state.referenceWord.chars.length === 0
        const isWordDeleted = state.currentWord.length === 0 && shouldWrite

        if (notSelectedWord || isWordDeleted) {
            selectedWord = selectWord()
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
                    shouldWrite ? 2000 : 1000,
                )
            })
            return
        }

        if (!shouldWrite.value) {
            new Promise((resolve) => {
                timeout = setTimeout(() => {
                    const newWordState = state.currentWord.substring(
                        0,
                        state.currentWord.length - 2,
                    )
                    state.currentWord = newWordState
                    const isWordDeleted = state.currentWord.length === 0

                    if (isWordDeleted) {
                        typewriteStore.toggleShouldWait()
                    }
                    resolve
                    clearTimeout(timeout)
                    writingLoop()
                }, Math.random() * 130)
            })
            return
        }

        new Promise((resolve) => {
            timeout = setTimeout(() => {
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
            }, Math.random() * 190)
        })
    }
    writingLoop()
}
