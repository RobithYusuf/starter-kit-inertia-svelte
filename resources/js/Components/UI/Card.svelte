<script>
    // Svelte 5: Using $props()
    let { 
        title = '',
        subtitle = '',
        padding = 'p-4',
        margin = '',
        shadow = 'shadow-sm',
        rounded = 'rounded-lg',
        border = 'border border-gray-200',
        background = 'bg-white',
        className = '',
        children
    } = $props();
</script>

<div class="{background} {rounded} {shadow} {margin} {border} {className} hover:shadow-md transition-shadow">
    {#if title}
        <div class="px-4 py-3 border-b border-gray-200">
            <h3 class="font-semibold text-gray-900">{title}</h3>
            {#if subtitle}
                <p class="text-sm text-gray-500 mt-0.5">{subtitle}</p>
            {/if}
        </div>
        <div class="{padding}">
            {@render children?.()}
        </div>
    {:else}
        <div class="{padding}">
            {@render children?.()}
        </div>
    {/if}
</div>
