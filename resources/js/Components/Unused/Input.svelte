<script>
    export let type = 'text';
    export let name = '';
    export let label = '';
    export let value = '';
    export let error = '';
    export let placeholder = '';
    export let required = false;
    export let disabled = false;
    export let readonly = false;
    export let icon = null;
    
    let inputElement;
    
    function handleInput(e) {
        value = e.target.value;
    }
    
    export function focus() {
        inputElement?.focus();
    }
</script>

<div class="mb-3">
    {#if label}
        <label for={name} class="block text-sm font-medium text-gray-700 mb-1">
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
            bind:this={inputElement}
            {type}
            {name}
            id={name}
            {value}
            {placeholder}
            {required}
            {disabled}
            {readonly}
            on:input={handleInput}
            on:change
            on:blur
            on:focus
            class="
                w-full rounded-lg border border-gray-300 
                focus:ring-1 focus:ring-primary-500 focus:border-primary-500
                disabled:bg-gray-50 disabled:text-gray-500
                hover:border-gray-400 transition-all duration-200
                {icon ? 'pl-9' : 'px-3'} py-2
                {error ? 'border-red-500 bg-red-50' : ''}
                {$$props.class || ''}
            "
            {...$$restProps}
        />
    </div>
    
    {#if error}
        <p class="mt-1 text-sm text-red-600">{error}</p>
    {/if}
</div>