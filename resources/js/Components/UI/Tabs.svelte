<script>
    let { 
        items = [],
        activeTab = $bindable(0),
        variant = 'underline',
        size = 'md',
        fullWidth = false,
        onchange = null
    } = $props();
    
    const variants = {
        underline: {
            container: 'border-b border-gray-200',
            tab: 'border-b-2 -mb-px',
            active: 'border-primary-600 text-primary-600',
            inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        },
        pills: {
            container: 'gap-2',
            tab: 'rounded-lg',
            active: 'bg-primary-600 text-white',
            inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        },
        boxed: {
            container: 'bg-gray-100 p-1 rounded-lg gap-1',
            tab: 'rounded-md',
            active: 'bg-white text-gray-900 shadow-sm',
            inactive: 'text-gray-500 hover:text-gray-700'
        }
    };
    
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };
    
    let currentVariant = $derived(variants[variant] || variants.underline);
    
    function handleTabClick(index) {
        activeTab = index;
        onchange?.(index, items[index]);
    }
</script>

<div class="flex {currentVariant.container} {fullWidth ? 'w-full' : ''}">
    {#each items as item, index}
        <button
            type="button"
            onclick={() => handleTabClick(index)}
            class="font-medium transition-all duration-200 
                   {sizes[size]} 
                   {currentVariant.tab}
                   {activeTab === index ? currentVariant.active : currentVariant.inactive}
                   {fullWidth ? 'flex-1 text-center' : ''}
                   {item.disabled ? 'opacity-50 cursor-not-allowed' : ''}"
            disabled={item.disabled}
        >
            {#if item.icon}
                <i class="{item.icon} mr-2"></i>
            {/if}
            {item.label || item}
            {#if item.badge}
                <span class="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary-100 text-primary-600">
                    {item.badge}
                </span>
            {/if}
        </button>
    {/each}
</div>
