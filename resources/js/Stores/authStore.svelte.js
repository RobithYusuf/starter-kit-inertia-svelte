// Auth Store - Svelte 5 Runes version
import { page } from '@inertiajs/svelte';

// Reactive auth state using $state
let authState = $state({
    user: null,
    isAuthenticated: false
});

// Subscribe to page props to keep auth state in sync
// Note: page is still a Svelte store from Inertia, so we use subscribe
page.subscribe($page => {
    if ($page && $page.props && $page.props.auth) {
        authState.user = $page.props.auth.user;
        authState.isAuthenticated = !!$page.props.auth.user;
    }
});

function logout() {
    window.location.href = '/logout';
}

// Export reactive auth store
export const authStore = {
    get user() {
        return authState.user;
    },
    get isAuthenticated() {
        return authState.isAuthenticated;
    },
    logout
};

export default authStore;
