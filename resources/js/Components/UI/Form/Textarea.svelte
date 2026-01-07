<script>
    let { 
        id = '',
        name = '',
        value = $bindable(''),
        label = '',
        placeholder = '',
        rows = 4,
        maxlength = null,
        error = '',
        required = false,
        disabled = false,
        readonly = false,
        resize = 'vertical',
        showCount = false
    } = $props();
    
    let inputId = $derived(id || `textarea-${Math.random().toString(36).substr(2, 9)}`);
    let inputName = $derived(name || inputId);
    let charCount = $derived(value?.length || 0);
    
    const resizeStyles = {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize'
    };
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
    
    <textarea
        id={inputId}
        name={inputName}
        bind:value
        {placeholder}
        {rows}
        {maxlength}
        {required}
        {disabled}
        {readonly}
        class="w-full px-3 py-2 border rounded-lg transition-all duration-200 
               focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
               {resizeStyles[resize]}
               {error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
               {disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
               {readonly ? 'bg-gray-50' : ''}"
    ></textarea>
    
    <div class="flex justify-between mt-1">
        {#if error}
            <p class="text-sm text-red-600">{error}</p>
        {:else}
            <span></span>
        {/if}
        
        {#if showCount}
            <p class="text-xs text-gray-500">
                {charCount}{#if maxlength} / {maxlength}{/if}
            </p>
        {/if}
    </div>
</div>
