<script>
    import { createEventDispatcher } from 'svelte';
    
    export let id = '';
    export let value = '';
    export let placeholder = 'Enter password';
    export let error = '';
    export let required = false;
    export let showStrength = false;
    export let autocomplete = 'current-password';
    
    const dispatch = createEventDispatcher();
    let showPassword = false;
    
    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }
    
    function handleInput(e) {
        value = e.target.value;
        dispatch('input', e);
    }
    
    function handleChange(e) {
        dispatch('change', e);
    }
    
    function handleBlur(e) {
        dispatch('blur', e);
    }
    
    // Password strength calculation
    $: strength = calculateStrength(value);
    
    function calculateStrength(password) {
        if (!password) return { score: 0, label: '', color: '' };
        
        let score = 0;
        
        // Length check
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        
        // Character variety
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;
        
        const percentage = (score / 6) * 100;
        
        if (percentage <= 25) return { score: percentage, label: 'Weak', color: '#ef4444' };
        if (percentage <= 50) return { score: percentage, label: 'Fair', color: 'var(--theme-primary-500)' };
        if (percentage <= 75) return { score: percentage, label: 'Good', color: '#eab308' };
        return { score: percentage, label: 'Strong', color: '#10b981' };
    }
</script>

<div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i class="fas fa-lock text-gray-400"></i>
    </div>
    <input
        {id}
        type={showPassword ? 'text' : 'password'}
        {value}
        {placeholder}
        {required}
        {autocomplete}
        on:input={handleInput}
        on:change={handleChange}
        on:blur={handleBlur}
        class="w-full pl-10 pr-12 py-1.5 border border-gray-300 rounded-lg transition-all duration-200 focus:outline-none hover:border-gray-400 {error ? 'border-red-500 bg-red-50' : ''}"
        on:focus={(e) => {
            e.currentTarget.style.borderColor = 'var(--theme-primary-500)';
            e.currentTarget.style.boxShadow = '0 0 0 3px var(--theme-primary-500)33';
        }}
        on:blur={(e) => {
            if (!error) {
                e.currentTarget.style.borderColor = '#d1d5db';
            }
            e.currentTarget.style.boxShadow = '';
        }}
    />
    <button
        type="button"
        on:click={togglePasswordVisibility}
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
    >
        <i class="fas fa-eye{showPassword ? '-slash' : ''}"></i>
    </button>
</div>

{#if showStrength && value}
    <div class="mt-2">
        <div class="flex items-center justify-between mb-1">
            <span class="text-xs text-gray-600">Password strength</span>
            <span class="text-xs font-medium text-gray-700">{strength.label}</span>
        </div>
        <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
                class="h-full transition-all duration-300"
                style="width: {strength.score}%; background-color: {strength.color}"
            ></div>
        </div>
    </div>
{/if}