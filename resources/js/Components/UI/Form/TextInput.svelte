<script>
    let { 
        id = '',
        name = '',
        type = 'text',
        value = $bindable(''),
        label = '',
        placeholder = '',
        icon = '',
        iconPosition = 'left',
        error = '',
        hint = '',
        required = false,
        disabled = false,
        readonly = false,
        size = 'md',
        ...restProps
    } = $props();
    
    let inputId = $derived(id || `input-${Math.random().toString(36).substr(2, 9)}`);
    let inputName = $derived(name || inputId);
    
    const sizes = {
        sm: 'py-1.5 text-sm',
        md: 'py-2 text-sm',
        lg: 'py-2.5 text-base'
    };
    
    let paddingLeft = $derived(icon && iconPosition === 'left' ? 'pl-10' : 'pl-3');
    let paddingRight = $derived(icon && iconPosition === 'right' ? 'pr-10' : 'pr-3');
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
        {#if icon && iconPosition === 'left'}
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="{icon} text-gray-400"></i>
            </div>
        {/if}
        
        <input
            id={inputId}
            name={inputName}
            {type}
            bind:value
            {placeholder}
            {required}
            {disabled}
            {readonly}
            class="w-full {paddingLeft} {paddingRight} {sizes[size]} border rounded-lg transition-all duration-200 
                   focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                   {error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
                   {disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                   {readonly ? 'bg-gray-50' : ''}"
            {...restProps}
        />
        
        {#if icon && iconPosition === 'right'}
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <i class="{icon} text-gray-400"></i>
            </div>
        {/if}
    </div>
    
    {#if error}
        <p class="mt-1 text-sm text-red-600">{error}</p>
    {:else if hint}
        <p class="mt-1 text-sm text-gray-500">{hint}</p>
    {/if}
</div>
