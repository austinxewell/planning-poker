<template>
    <div class="flex gap-3 mb-6 justify-center">
        <button
            class="px-4 py-2 bg-[#cf8500] text-[#0f172a] font-bold rounded hover:bg-[#e6a930]"
            @click="$emit('reveal')"
        >
            Reveal
        </button>
        <button
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            @click="$emit('reset')"
        >
            Reset
        </button>
    </div>
</template>
<script setup></script>
