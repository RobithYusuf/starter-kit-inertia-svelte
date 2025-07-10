<script>
    export let title = '';
    export let value = 0;
    export let icon = '';
    export let color = 'blue';
    export let trend = null; // { value: '+12%', direction: 'up' }
    export let subtitle = '';
    
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-emerald-50 text-emerald-600',
        purple: 'bg-purple-50 text-purple-600',
        amber: 'bg-amber-50 text-amber-600',
        red: 'bg-red-50 text-red-600',
        gray: 'bg-gray-50 text-gray-600'
    };
    
    $: formattedValue = typeof value === 'number' ? value.toLocaleString() : value;
</script>

<div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 lg:p-5">
    <div class="flex items-center justify-between">
        <div class="flex-1 min-w-0">
            <p class="text-xs lg:text-sm font-medium text-gray-600 truncate">{title}</p>
            <p class="mt-1 text-xl lg:text-2xl font-bold text-gray-900">{formattedValue}</p>
            {#if trend || subtitle}
                <div class="mt-1 flex items-center text-xs">
                    {#if trend}
                        <span class="{trend.direction === 'up' ? 'text-emerald-600' : 'text-red-600'} font-medium">
                            <i class="fas fa-{trend.direction === 'up' ? 'arrow-up' : 'arrow-down'} text-xs mr-1"></i>
                            {trend.value}
                        </span>
                    {/if}
                    {#if subtitle}
                        <span class="text-gray-500 {trend ? 'ml-1' : ''}">{subtitle}</span>
                    {/if}
                </div>
            {/if}
        </div>
        {#if icon}
            <div class="p-2 lg:p-2.5 {colorClasses[color]} rounded-lg ml-3 flex-shrink-0">
                <i class="{icon} text-lg lg:text-xl"></i>
            </div>
        {/if}
    </div>
</div>