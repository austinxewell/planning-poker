<template>
    <UApp>
        <NuxtLayout> 
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>

<script setup>
import { useHead } from '#imports'

useHead({
    title: 'Planning Poker',
    meta: [
        {
            name: 'description',
            content: 'Planning Poker App' 
        }
    ]
})
</script>

<style>
@import "tailwindcss";
</style>
