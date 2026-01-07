<script>
    let { 
        label = '',
        value = '',
        change = null,
        changeType = 'neutral',
        icon = null,
        trend = null,
        loading = false
    } = $props();
    
    const changeColors = {
        positive: 'text-green-600 bg-green-50',
        negative: 'text-red-600 bg-red-50',
        neutral: 'text-gray-600 bg-gray-50'
    };
    
    const trendIcons = {
        up: 'fas fa-arrow-up',
        down: 'fas fa-arrow-down',
        flat: 'fas fa-minus'
    };
</script>

<div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between">
        <div class="flex-1">
            <p class="text-sm font-medium text-gray-500">{label}</p>
            
            {#if loading}
                <div class="mt-2 h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            {:else}
                <p class="mt-2 text-3xl font-bold text-gray-900">{value}</p>
            {/if}
            
            {#if change !== null && !loading}
                <div class="mt-2 flex items-center gap-1">
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium {changeColors[changeType]}">
                        {#if trend}
                            <i class="{trendIcons[trend]} text-[10px]"></i>
                        {/if}
                        {change}
                    </span>
                    <span class="text-xs text-gray-500">vs last period</span>
                </div>
            {/if}
        </div>
        
        {#if icon}
            <div class="flex-shrink-0">
                <div class="w-12 h-12 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                    <i class="{icon} text-xl"></i>
                </div>
            </div>
        {/if}
    </div>
</div>
