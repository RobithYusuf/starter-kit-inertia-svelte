<script>
    let { 
        src = null,
        name = '',
        size = 'md',
        variant = 'circle',
        status = null,
        showBorder = false,
        className = ''
    } = $props();
    
    const sizes = {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
        '2xl': 'w-20 h-20 text-xl'
    };
    
    const variants = {
        circle: 'rounded-full',
        rounded: 'rounded-lg',
        square: 'rounded-none'
    };
    
    const statusColors = {
        online: 'bg-green-500',
        offline: 'bg-gray-400',
        busy: 'bg-red-500',
        away: 'bg-yellow-500'
    };
    
    const statusSizes = {
        xs: 'w-1.5 h-1.5',
        sm: 'w-2 h-2',
        md: 'w-2.5 h-2.5',
        lg: 'w-3 h-3',
        xl: 'w-4 h-4',
        '2xl': 'w-5 h-5'
    };
    
    function getInitials(name) {
        if (!name) return '?';
        const parts = name.trim().split(' ');
        if (parts.length === 1) {
            return parts[0].charAt(0).toUpperCase();
        }
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    
    let initials = $derived(getInitials(name));
</script>

<div class="relative inline-flex {className}">
    {#if src}
        <img 
            {src}
            alt={name}
            class="{sizes[size]} {variants[variant]} object-cover
                   {showBorder ? 'ring-2 ring-white' : ''}"
        />
    {:else}
        <div 
            class="{sizes[size]} {variants[variant]} 
                   bg-primary-100 text-primary-700 font-medium
                   flex items-center justify-center
                   {showBorder ? 'ring-2 ring-white' : ''}"
        >
            {initials}
        </div>
    {/if}
    
    {#if status}
        <span 
            class="absolute bottom-0 right-0 block rounded-full ring-2 ring-white
                   {statusColors[status]} {statusSizes[size]}"
        ></span>
    {/if}
</div>
