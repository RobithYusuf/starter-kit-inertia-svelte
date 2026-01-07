<script>
    let { 
        open = $bindable(false),
        align = 'left',
        width = 'w-48',
        trigger,
        children
    } = $props();
    
    let dropdownRef = $state(null);
    
    const alignments = {
        left: 'left-0',
        right: 'right-0',
        center: 'left-1/2 -translate-x-1/2'
    };
    
    function handleClickOutside(event) {
        if (dropdownRef && !dropdownRef.contains(event.target)) {
            open = false;
        }
    }
    
    function handleKeydown(event) {
        if (event.key === 'Escape') {
            open = false;
        }
    }
    
    $effect(() => {
        if (open) {
            document.addEventListener('click', handleClickOutside);
            document.addEventListener('keydown', handleKeydown);
        }
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleKeydown);
        };
    });
</script>

<div class="relative inline-block" bind:this={dropdownRef}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div onclick={() => open = !open}>
        {@render trigger?.()}
    </div>
    
    {#if open}
        <div 
            class="absolute z-50 mt-2 {width} {alignments[align]} 
                   bg-white rounded-lg shadow-lg ring-1 ring-black/5
                   py-1 focus:outline-none"
            role="menu"
        >
            {@render children?.()}
        </div>
    {/if}
</div>
