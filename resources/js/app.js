import { createInertiaApp } from "@inertiajs/svelte";
import { mount } from "svelte";

// Setup global route function from Ziggy
window.route = window.route || function() {
    console.warn('Route function not available. Make sure Ziggy is loaded.');
    return '#';
};

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
        color: "#3B82F6",
        showSpinner: true,
        delay: 100,
    },
})
