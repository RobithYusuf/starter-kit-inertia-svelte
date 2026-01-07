<script>
    let { 
        items = [],
        multiple = false,
        defaultOpen = []
    } = $props();
    
    let openItems = $state(new Set(defaultOpen));
    
    function toggleItem(index) {
        if (multiple) {
            if (openItems.has(index)) {
                openItems.delete(index);
            } else {
                openItems.add(index);
            }
            openItems = new Set(openItems);
        } else {
            openItems = openItems.has(index) ? new Set() : new Set([index]);
        }
    }
    
    function isOpen(index) {
        return openItems.has(index);
    }
</script>

<div class="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
    {#each items as item, index}
        <div class="bg-white">
            <button
                type="button"
                onclick={() => toggleItem(index)}
                class="flex items-center justify-between w-full px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
                aria-expanded={isOpen(index)}
            >
                <span class="flex items-center gap-3">
                    {#if item.icon}
                        <i class="{item.icon} text-primary-500"></i>
                    {/if}
                    <span class="font-medium text-gray-900">{item.title}</span>
                </span>
                
                <i class="fas fa-chevron-down text-primary-500 transition-transform duration-200 {isOpen(index) ? 'rotate-180' : ''}"></i>
            </button>
            
            {#if isOpen(index)}
                <div class="px-4 pb-4 pt-0">
                    <div class="text-sm text-gray-600 {item.icon ? 'pl-8' : ''}">
                        {#if typeof item.content === 'string'}
                            {item.content}
                        {:else if item.content}
                            {@render item.content()}
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
    {/each}
</div>
