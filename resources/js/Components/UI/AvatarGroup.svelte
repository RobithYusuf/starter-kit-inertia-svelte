<script>
    import Avatar from './Avatar.svelte';
    
    let { 
        avatars = [],
        max = 4,
        size = 'md',
        spacing = 'tight'
    } = $props();
    
    let displayAvatars = $derived(avatars.slice(0, max));
    let remaining = $derived(avatars.length - max);
    
    const spacings = {
        tight: '-space-x-2',
        normal: '-space-x-1',
        loose: 'space-x-1'
    };
    
    const sizes = {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-sm',
        xl: 'w-16 h-16 text-base'
    };
</script>

<div class="flex items-center {spacings[spacing]}">
    {#each displayAvatars as avatar}
        <Avatar 
            src={avatar.src}
            name={avatar.name}
            {size}
            showBorder={true}
        />
    {/each}
    
    {#if remaining > 0}
        <div 
            class="{sizes[size]} rounded-full bg-gray-200 text-gray-600 font-medium
                   flex items-center justify-center ring-2 ring-white"
        >
            +{remaining}
        </div>
    {/if}
</div>
