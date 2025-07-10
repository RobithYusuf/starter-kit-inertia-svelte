import { createInertiaApp } from "@inertiajs/svelte";
import { mount } from "svelte";
import { presetThemes } from "./Stores/themeStore";

// Setup global route function from Ziggy
window.route = window.route || function() {
    console.warn('Route function not available. Make sure Ziggy is loaded.');
    return '#';
};
// Get current theme color for progress bar
function getProgressColor() {
    const savedTheme = localStorage.getItem('appTheme') || 'orange';
    const theme = presetThemes[savedTheme];
    return theme ? theme.colors.primary600 : '#f97316';
}

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob("./Pages/**/*.svelte", { eager: true });
        const page = pages[`./Pages/${name}.svelte`];
        
        if (!page) {
            console.error(`Page not found: ${name}`);
            return pages[`./Pages/Error.svelte`] || null;
        }
        
        return page;
    },
    setup({ el, App, props }) {
        mount(App, { 
            target: el, 
            props
        });
    },
    progress: {
        color: getProgressColor(),
        showSpinner: true,
        delay: 100,
    },
})
