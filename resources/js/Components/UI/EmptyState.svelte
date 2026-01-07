<script>
    import Button from './Button.svelte';
    
    let { 
        icon = 'fas fa-inbox',
        title = 'No data found',
        description = '',
        actionLabel = null,
        actionHref = null,
        onaction = null
    } = $props();
</script>

<div class="text-center py-12 px-4">
    <div class="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <i class="{icon} text-2xl text-gray-400"></i>
    </div>
    
    <h3 class="text-lg font-medium text-gray-900 mb-1">{title}</h3>
    
    {#if description}
        <p class="text-sm text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>
    {/if}
    
    {#if actionLabel}
        {#if actionHref}
            <Button href={actionHref} variant="primary" icon="fas fa-plus">
                {actionLabel}
            </Button>
        {:else if onaction}
            <Button onclick={onaction} variant="primary" icon="fas fa-plus">
                {actionLabel}
            </Button>
        {/if}
    {/if}
</div>
