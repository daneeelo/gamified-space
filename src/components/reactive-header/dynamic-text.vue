<script lang="ts" setup>
import { typewriteEffect } from '@/utils/typewrite'
import { onMounted, onUnmounted, reactive } from 'vue'

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

let timeout: number | undefined

onMounted(() => {
    typewriteEffect({
        state: headerText,
        timeout,
        timing: { write: 110, delete: 80, wait: { write: 1000, delete: 700 } },
    })
})

onUnmounted(() => {
    clearTimeout(timeout)
})
</script>

<template>
    <div id="cli-cmd">
        <h1 id="usr">@dev ></h1>
        <h1 id="text" class="header-text">{{ headerText.currentWord }}</h1>
        <h1 id="caret" class="header-text">|</h1>
    </div>
</template>

<style scoped>
#cli-cmd {
    display: flex;
    width: 100%;
    font-size: 2.1rem;
    filter: blur(1.2px);
}

#usr {
    text-shadow: var(--purple-active) 1px 0 10px;
    margin-right: 1rem;
}

#caret {
    text-shadow: var(--purple-active) 1px 0 10px;
    font-weight: 300;
    animation: caretAnimation 1s infinite;
}

.header-text {
    text-shadow: #7bde92 1px 0 10px;
}
#text {
    color: var(--green-active);
    font-weight: 400;
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
