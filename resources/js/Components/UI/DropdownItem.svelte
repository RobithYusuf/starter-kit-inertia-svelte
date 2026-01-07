<script>
    import { Link } from '@inertiajs/svelte';
    
    let { 
        href = null,
        icon = null,
        variant = 'default',
        disabled = false,
        onclick = null,
        children
    } = $props();
    
    const variants = {
        default: 'text-gray-700 hover:bg-gray-100',
        danger: 'text-red-600 hover:bg-red-50'
    };
</script>

{#if href}
    <Link 
        {href}
        class="flex items-center gap-2 px-4 py-2 text-sm transition-colors
               {variants[variant]}
               {disabled ? 'opacity-50 pointer-events-none' : ''}"
    >
        {#if icon}
            <i class="{icon} w-4 text-center"></i>
        {/if}
        {@render children?.()}
    </Link>
{:else}
    <button 
        type="button"
        {onclick}
        {disabled}
        class="flex items-center gap-2 w-full px-4 py-2 text-sm text-left transition-colors
               {variants[variant]}
               {disabled ? 'opacity-50 cursor-not-allowed' : ''}"
    >
        {#if icon}
            <i class="{icon} w-4 text-center"></i>
        {/if}
        {@render children?.()}
    </button>
{/if}
