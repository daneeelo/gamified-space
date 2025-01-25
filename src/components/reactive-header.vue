<script lang="ts" setup>
import { typewriteEffect } from '@/utils/typewrite'
import { onMounted, onUnmounted, reactive } from 'vue'
import LanguageSelector from './language-selector.vue'
import { useTypewrite } from '@/stores/typewrite-store'

const typewriteStore = useTypewrite()
let timeout: number | undefined

const headerText = reactive<{
    currentWord: string
    referenceWord: {
        chars: string[]
        index: number | undefined
    }
}>({
    currentWord: '',
    referenceWord: { chars: [], index: undefined },
})

onMounted(() => {
    typewriteEffect({ state: headerText, timeout })
})

onUnmounted(() => {
    clearTimeout(timeout)
})
</script>

<template>
    <header>
        <div id="typewriter">
            <h1 id="text" class="header-text">{{ headerText.currentWord }}</h1>
            <h1 id="caret" class="header-text">|</h1>
        </div>
        <LanguageSelector />
    </header>
</template>

<style scoped>
header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#typewriter {
    display: flex;
    width: 100%;
}

.header-text {
    font-size: 2.1rem;
    text-transform: capitalize;
}
#text {
    color: #b3e9c7;
    font-weight: 700;
}

#caret {
    color: #b3e9c7;
    font-weight: 300;
    animation: caretAnimation 1s infinite;
}

@media screen and (min-width: 800px) {
    .header-text {
        font-size: 4rem;
    }
}

@keyframes caretAnimation {
    0% {
        opacity: 0;
    }

    20% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }

    65% {
        opacity: 0;
    }

    100% {
        opacity: 0;
    }
}
</style>
