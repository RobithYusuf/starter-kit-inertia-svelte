<script>
    export let type = 'button';
    export let variant = 'primary';
    export let size = 'md';
    export let disabled = false;
    export let loading = false;
    export let icon = null;
    export let iconPosition = 'left';
    export let href = null;
    export let external = false;
    
    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontWeight: '500',
        borderRadius: '0.5rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        border: 'none',
        textDecoration: 'none',
        opacity: disabled ? '0.5' : '1',
        outline: 'none',
        userSelect: 'none'
    };
    
    const variants = {
        primary: {
            background: 'linear-gradient(to right, var(--theme-primary-600), var(--theme-primary-700))',
            color: 'white',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            ':hover': {
                background: 'linear-gradient(to right, var(--theme-primary-700), var(--theme-primary-800))',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }
        },
        secondary: {
            background: 'white',
            color: '#374151',
            border: '1px solid #d1d5db',
            ':hover': {
                background: '#f9fafb',
                borderColor: '#9ca3af'
            }
        },
        success: {
            background: 'linear-gradient(to right, #059669, #047857)',
            color: 'white',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            ':hover': {
                background: 'linear-gradient(to right, #047857, #065f46)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }
        },
        danger: {
            background: 'linear-gradient(to right, #dc2626, #b91c1c)',
            color: 'white',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            ':hover': {
                background: 'linear-gradient(to right, #b91c1c, #991b1b)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }
        },
        ghost: {
            background: 'transparent',
            color: '#374151',
            border: '1px solid #e5e7eb',
            ':hover': {
                background: '#f9fafb',
                borderColor: '#d1d5db'
            }
        }
    };
    
    const sizes = {
        sm: {
            padding: '0.375rem 0.75rem',
            fontSize: '0.875rem'
        },
        md: {
            padding: '0.5rem 1rem',
            fontSize: '0.875rem'
        },
        lg: {
            padding: '0.625rem 1.25rem',
            fontSize: '1rem'
        }
    };
    
    let hovering = false;
    
    $: currentVariant = variants[variant] || variants.primary;
    $: currentSize = sizes[size] || sizes.md;
    $: buttonStyles = {
        ...baseStyles,
        ...currentVariant,
        ...currentSize,
        ...(hovering && !disabled && currentVariant[':hover'] ? currentVariant[':hover'] : {})
    };
    
    $: styleString = Object.entries(buttonStyles)
        .filter(([key]) => !key.startsWith(':'))
        .map(([key, value]) => {
            const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            return `${cssKey}: ${value}`;
        })
        .join('; ');
</script>

{#if href}
    <a
        {href}
        style={styleString}
        class={$$props.class || ''}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        on:mouseenter={() => hovering = true}
        on:mouseleave={() => hovering = false}
        {...$$restProps}
    >
        {#if loading}
            <i class="fas fa-spinner fa-spin"></i>
        {:else if icon && iconPosition === 'left'}
            <i class={icon}></i>
        {/if}
        <slot />
        {#if icon && iconPosition === 'right' && !loading}
            <i class={icon}></i>
        {/if}
    </a>
{:else}
    <button
        {type}
        {disabled}
        style={styleString}
        class={$$props.class || ''}
        on:click
        on:mouseenter={() => hovering = true}
        on:mouseleave={() => hovering = false}
        {...$$restProps}
    >
        {#if loading}
            <i class="fas fa-spinner fa-spin"></i>
        {:else if icon && iconPosition === 'left'}
            <i class={icon}></i>
        {/if}
        <slot />
        {#if icon && iconPosition === 'right' && !loading}
            <i class={icon}></i>
        {/if}
    </button>
{/if}