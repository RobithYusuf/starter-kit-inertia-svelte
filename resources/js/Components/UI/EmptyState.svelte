<script>
    export let icon = 'fas fa-inbox';
    export let title = 'No data found';
    export let description = '';
    export let actionText = '';
    export let actionIcon = '';
    export let onAction = () => {};
</script>

<div class="flex flex-col items-center justify-center py-12 px-4">
    <div class="text-gray-300 mb-4">
        <i class="{icon} text-5xl"></i>
    </div>
    <h3 class="text-lg font-medium text-gray-900 mb-1">{title}</h3>
    {#if description}
        <p class="text-sm text-gray-500 text-center max-w-sm">{description}</p>
    {/if}
    {#if actionText}
        <button
            on:click={onAction}
            class="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all"
            style="background-color: var(--theme-primary-600)"
            on:mouseenter={(e) => e.currentTarget.style.backgroundColor = 'var(--theme-primary-700)'}
            on:mouseleave={(e) => e.currentTarget.style.backgroundColor = 'var(--theme-primary-600)'}
        >
            {#if actionIcon}
                <i class="{actionIcon} mr-2"></i>
            {/if}
            {actionText}
        </button>
    {/if}
</div>