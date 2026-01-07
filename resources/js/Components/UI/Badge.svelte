<script>
    let { 
        variant = 'default',
        size = 'md',
        rounded = 'full',
        icon = null,
        removable = false,
        onremove = null,
        children
    } = $props();
    
    const variants = {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-primary-100 text-primary-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
        // Solid variants
        'solid-default': 'bg-gray-600 text-white',
        'solid-primary': 'bg-primary-600 text-white',
        'solid-success': 'bg-green-600 text-white',
        'solid-warning': 'bg-yellow-500 text-white',
        'solid-danger': 'bg-red-600 text-white',
        'solid-info': 'bg-blue-600 text-white',
        // Outline variants
        'outline-default': 'bg-transparent border border-gray-300 text-gray-700',
        'outline-primary': 'bg-transparent border border-primary-500 text-primary-700',
        'outline-success': 'bg-transparent border border-green-500 text-green-700',
        'outline-warning': 'bg-transparent border border-yellow-500 text-yellow-700',
        'outline-danger': 'bg-transparent border border-red-500 text-red-700',
        'outline-info': 'bg-transparent border border-blue-500 text-blue-700'
    };
    
    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base'
    };
    
    const roundedStyles = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full'
    };
</script>

<span class="inline-flex items-center gap-1 font-medium {variants[variant]} {sizes[size]} {roundedStyles[rounded]}">
    {#if icon}
        <i class="{icon} text-xs"></i>
    {/if}
    {@render children?.()}
    {#if removable}
        <button 
            type="button"
            onclick={onremove}
            class="ml-0.5 -mr-1 hover:opacity-70 transition-opacity"
        >
            <i class="fas fa-times text-xs"></i>
        </button>
    {/if}
</span>
