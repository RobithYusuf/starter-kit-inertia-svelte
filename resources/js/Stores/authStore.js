import { writable } from 'svelte/store';
import { page } from '@inertiajs/svelte';
import { get } from 'svelte/store';

function createAuthStore() {
    const { subscribe, set, update } = writable({
        user: null,
        isAuthenticated: false
    });

    // Subscribe to page props to keep auth state in sync
    page.subscribe($page => {
        if ($page && $page.props && $page.props.auth) {
            set({
                user: $page.props.auth.user,
                isAuthenticated: !!$page.props.auth.user
            });
        }
    });

    return {
        subscribe,
        logout: () => {
            // Logout will be handled by Laravel/Inertia
            window.location.href = '/logout';
        }
    };
}

export const auth = createAuthStore();