// tailwind.config.js
export default {
    darkMode: 'class',
    theme: {
        extend: {
        colors: {
            header: 'rgb(var(--color-header) / <alpha-value>)',
            main: 'rgb(var(--color-main) / <alpha-value>)',
            modal: 'rgb(var(--color-modal) / <alpha-value>)',
            modalRing: 'rgb(var(--color-modal-ring) / <alpha-value>)',
            textPrimary: 'rgb(var(--color-text-primary) / <alpha-value>)',
            cardBorder: 'rgb(var(--color-card-border) / <alpha-value>)',
            cardHover: 'rgb(var(--color-card-hover) / <alpha-value>)',

            primary: {
            from: 'rgb(var(--color-primary-from) / <alpha-value>)',
            to: 'rgb(var(--color-primary-to) / <alpha-value>)',
            },
            gold: 'rgb(var(--color-gold) / <alpha-value>)',
            red: 'rgb(var(--color-red) / <alpha-value>)',
            neutralBg: 'rgb(var(--color-neutral-bg) / <alpha-value>)',
            neutralText: 'rgb(var(--color-neutral-text) / <alpha-value>)',
            darkBg: 'rgb(var(--color-dark-bg) / <alpha-value>)',
            darkText: 'rgb(var(--color-dark-text) / <alpha-value>)',
        },
        },
    },
    plugins: [],
}
