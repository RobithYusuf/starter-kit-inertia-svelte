<script>
    export let id = '';
    export let name = '';
    export let type = 'text';
    export let value = '';
    export let label = '';
    export let placeholder = '';
    export let icon = '';
    export let error = '';
    export let required = false;
    export let disabled = false;
    export let readonly = false;
    
    // Generate unique ID if not provided
    $: inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    $: inputName = name || inputId;
</script>

<div>
    {#if label}
        <label for={inputId} class="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {#if required}
                <span class="text-red-500">*</span>
            {/if}
        </label>
    {/if}
    
    <div class="relative">
        {#if icon}
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="{icon} text-gray-400"></i>
            </div>
        {/if}
        
        <input
            {id}
            {name}
            {type}
            bind:value
            {placeholder}
            {required}
            {disabled}
            {readonly}
            class="w-full {icon ? 'pl-9' : 'pl-3'} pr-3 py-2 border rounded-lg transition-all duration-200 
                   focus:outline-none
                   {error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
                   {disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                   {readonly ? 'bg-gray-50' : ''}"
            on:focus={(e) => {
                if (!error) {
                    e.currentTarget.style.borderColor = 'var(--theme-primary-500)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px var(--theme-primary-500)33';
                }
            }}
            on:blur={(e) => {
                if (!error) {
                    e.currentTarget.style.borderColor = '#d1d5db';
                }
                e.currentTarget.style.boxShadow = '';
            }}
            {...$$restProps}
        />
    </div>
    
    {#if error}
        <p class="mt-1.5 text-sm text-red-600">{error}</p>
    {/if}
</div>