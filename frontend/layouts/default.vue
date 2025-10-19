<template>
    <div class="flex flex-col min-h-screen">
        <LayoutHeader />

        <main class="flex-1 overflow-y-auto">
            <slot />
        </main>

        <LayoutFooter />
    </div>
</template>