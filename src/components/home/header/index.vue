<script setup lang="ts">
import DynamicText from './dynamic-text.vue'
</script>

<template>
    <header>
        <h1>
            dan<span id="cont"><span id="line"></span>eee</span>lo
        </h1>
        <LanguageSelector />
    </header>
    <DynamicText />
</template>

<style scoped>
header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--black-dark);
    padding: 16px;
}
h1 {
    font-size: 3rem;
    filter: blur(1px);
    text-shadow: var(--purple-active) 1px 0 10px;
    margin-right: 0.4rem;
}
#cont {
    position: relative;
}

#line {
    position: absolute;
    border-top: 3px solid var(--green-active);
    width: 90%;
    left: 0;
    right: 0;
    margin: auto;
    top: 10px;
}

@media screen and (min-width: 1024px) {
    header {
        border-radius: 22px 22px 0 0;
    }
}
</style>
