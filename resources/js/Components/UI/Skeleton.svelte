<script>
    let { 
        variant = 'text',
        width = null,
        height = null,
        rounded = 'md',
        animate = true,
        lines = 1,
        className = ''
    } = $props();
    
    const variants = {
        text: 'h-4',
        title: 'h-6',
        avatar: 'w-10 h-10 rounded-full',
        thumbnail: 'w-16 h-16',
        image: 'w-full h-48',
        button: 'h-10 w-24',
        card: 'w-full h-32'
    };
    
    const roundedStyles = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full'
    };
    
    let baseClass = $derived(
        variant === 'avatar' ? variants.avatar : 
        `${variants[variant]} ${roundedStyles[rounded]}`
    );
    
    let customStyle = $derived(
        [width ? `width: ${width}` : '', height ? `height: ${height}` : '']
            .filter(Boolean)
            .join('; ')
    );
</script>

{#if lines > 1}
    <div class="space-y-2 {className}">
        {#each Array(lines) as _, i}
            <div 
                class="bg-gray-200 {baseClass} {animate ? 'animate-pulse' : ''}"
                style={i === lines - 1 ? 'width: 75%' : customStyle}
            ></div>
        {/each}
    </div>
{:else}
    <div 
        class="bg-gray-200 {baseClass} {animate ? 'animate-pulse' : ''} {className}"
        style={customStyle}
    ></div>
{/if}
