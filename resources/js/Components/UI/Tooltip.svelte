<script>
    let { 
        text = '',
        position = 'top',
        delay = 200,
        children
    } = $props();
    
    let show = $state(false);
    let timeoutId = $state(null);
    
    const positions = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };
    
    const arrows = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 border-x-transparent border-b-transparent',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 border-x-transparent border-t-transparent',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 border-y-transparent border-r-transparent',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900 border-y-transparent border-l-transparent'
    };
    
    function handleMouseEnter() {
        timeoutId = setTimeout(() => {
            show = true;
        }, delay);
    }
    
    function handleMouseLeave() {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        show = false;
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    class="relative inline-block"
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
>
    {@render children?.()}
    
    {#if show && text}
        <div 
            class="absolute z-50 {positions[position]} pointer-events-none"
            role="tooltip"
        >
            <div class="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
                {text}
            </div>
            <div class="absolute w-0 h-0 border-4 {arrows[position]}"></div>
        </div>
    {/if}
</div>
