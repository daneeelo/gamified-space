<script setup lang="ts">
import DynamicText from './dynamic-text.vue'
</script>

<template>
    <header>
        <div id="top-header">
            <h1>
                dan<span id="cont"><span id="line"></span>eee</span>lo
            </h1>
            <LanguageSelector />
        </div>
        <div id="bottom-header">
            <DynamicText />
        </div>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    padding: 16px;
    padding-bottom: 22px;
    border-bottom: 2px solid var(--black);
}

#top-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#bottom-header {
    margin-top: 0.5rem;
}
h1 {
    font-size: 2.6rem;
    filter: blur(1px);
    text-shadow: var(--purple-active) 1px 0 10px;
    margin-right: 0.4rem;
}
#cont {
    position: relative;
}

#line {
    position: absolute;
    border-top: 5px solid var(--green-active);
    width: 90%;
    left: 0;
    right: 0;
    margin: auto;
    top: 0.5rem;
}

@media screen and (min-width: 1024px) {
    header {
        border-radius: 22px 22px 0 0;
    }
    h1 {
        font-size: 3.6rem;
    }
    #line {
        border-top: 5px solid var(--green-active);
        top: 0.9rem;
    }
}
</style>
