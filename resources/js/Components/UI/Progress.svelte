<script>
    let { 
        value = 0,
        max = 100,
        size = 'md',
        variant = 'primary',
        showLabel = false,
        label = '',
        striped = false,
        animated = false
    } = $props();
    
    let percentage = $derived(Math.min(100, Math.max(0, (value / max) * 100)));
    let displayLabel = $derived(label || `${Math.round(percentage)}%`);
    
    const sizes = {
        xs: 'h-1',
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
        xl: 'h-6'
    };
    
    const variants = {
        primary: 'bg-primary-600',
        success: 'bg-green-600',
        warning: 'bg-yellow-500',
        danger: 'bg-red-600',
        info: 'bg-blue-600'
    };
</script>

<div class="w-full">
    {#if showLabel}
        <div class="flex justify-between mb-1">
            <span class="text-sm font-medium text-gray-700">{displayLabel}</span>
            <span class="text-sm text-gray-500">{Math.round(percentage)}%</span>
        </div>
    {/if}
    
    <div 
        class="w-full bg-gray-200 rounded-full overflow-hidden {sizes[size]}"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
    >
        <div 
            class="h-full rounded-full transition-all duration-300 ease-out {variants[variant]}
                   {striped ? 'bg-stripes' : ''}
                   {animated ? 'animate-stripes' : ''}"
            style="width: {percentage}%"
        ></div>
    </div>
</div>

<style>
    .bg-stripes {
        background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
        );
        background-size: 1rem 1rem;
    }
    
    .animate-stripes {
        animation: progress-stripes 1s linear infinite;
    }
    
    @keyframes progress-stripes {
        from {
            background-position: 1rem 0;
        }
        to {
            background-position: 0 0;
        }
    }
</style>
