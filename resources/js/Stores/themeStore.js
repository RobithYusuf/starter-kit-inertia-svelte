import { writable } from 'svelte/store';

// Available preset themes
export const presetThemes = {
    orange: {
        name: 'Orange (Default)',
        value: 'orange',
        colors: {
            primary50: '#fff7ed',
            primary100: '#ffedd5',
            primary200: '#fed7aa',
            primary300: '#fdba74',
            primary400: '#fb923c',
            primary500: '#f97316',
            primary600: '#ea580c',
            primary700: '#c2410c',
            primary800: '#9a3412',
            primary900: '#7c2d12'
        }
    },
    blue: {
        name: 'Blue Ocean',
        value: 'blue',
        colors: {
            primary50: '#eff6ff',
            primary100: '#dbeafe',
            primary200: '#bfdbfe',
            primary300: '#93c5fd',
            primary400: '#60a5fa',
            primary500: '#3b82f6',
            primary600: '#2563eb',
            primary700: '#1d4ed8',
            primary800: '#1e40af',
            primary900: '#1e3a8a'
        }
    },
    emerald: {
        name: 'Emerald Green',
        value: 'emerald',
        colors: {
            primary50: '#ecfdf5',
            primary100: '#d1fae5',
            primary200: '#a7f3d0',
            primary300: '#6ee7b7',
            primary400: '#34d399',
            primary500: '#10b981',
            primary600: '#059669',
            primary700: '#047857',
            primary800: '#065f46',
            primary900: '#064e3b'
        }
    },
    purple: {
        name: 'Royal Purple',
        value: 'purple',
        colors: {
            primary50: '#faf5ff',
            primary100: '#f3e8ff',
            primary200: '#e9d5ff',
            primary300: '#d8b4fe',
            primary400: '#c084fc',
            primary500: '#a855f7',
            primary600: '#9333ea',
            primary700: '#7c3aed',
            primary800: '#6b21a8',
            primary900: '#581c87'
        }
    },
    slate: {
        name: 'Slate Gray',
        value: 'slate',
        colors: {
            primary50: '#f8fafc',
            primary100: '#f1f5f9',
            primary200: '#e2e8f0',
            primary300: '#cbd5e1',
            primary400: '#94a3b8',
            primary500: '#64748b',
            primary600: '#475569',
            primary700: '#334155',
            primary800: '#1e293b',
            primary900: '#0f172a'
        }
    }
};

// Load saved theme from localStorage
function loadTheme() {
    const saved = localStorage.getItem('appTheme');
    if (saved && presetThemes[saved]) {
        return saved;
    }
    return 'orange'; // default theme
}

// Create store
export const currentTheme = writable(loadTheme());

// Subscribe to changes and save to localStorage
currentTheme.subscribe(theme => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('appTheme', theme);
        applyTheme(theme);
    }
});

// Apply theme to document
function applyTheme(themeName) {
    const root = document.documentElement;
    
    // Remove previous theme
    Object.keys(presetThemes).forEach(key => {
        root.removeAttribute(`data-theme`);
    });
    
    // Apply new theme
    if (themeName !== 'orange') {
        root.setAttribute('data-theme', themeName);
    }
}

// Initialize theme on load
if (typeof window !== 'undefined') {
    applyTheme(loadTheme());
}