<script>
    import { createEventDispatcher } from 'svelte';
    
    export let id = '';
    export let value = '';
    export let placeholder = 'you@example.com';
    export let error = '';
    export let required = false;
    export let autocomplete = 'email';
    
    const dispatch = createEventDispatcher();
    
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
</script>

<div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i class="fas fa-envelope text-gray-400"></i>
    </div>
    <input
        {id}
        type="email"
        {value}
        {placeholder}
        {required}
        {autocomplete}
        on:input={handleInput}
        on:change={handleChange}
        on:blur={handleBlur}
        class="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg transition-all duration-200 focus:outline-none hover:border-gray-400 {error ? 'border-red-500 bg-red-50' : ''}"
        on:focus={(e) => {
            if (!error) {
                e.currentTarget.style.borderColor = 'var(--theme-primary-500)';
                e.currentTarget.style.boxShadow = '0 0 0 3px var(--theme-primary-500)33';
            }
        }}
        on:blur={(e) => {
            handleBlur(e);
            if (!error) {
                e.currentTarget.style.borderColor = '#d1d5db';
            }
            e.currentTarget.style.boxShadow = '';
        }}
    />
</div>