<script>
    let { 
        checked = $bindable(false),
        disabled = false,
        size = 'md',
        label = '',
        labelPosition = 'right',
        onchange = null
    } = $props();
    
    const sizes = {
        sm: {
            track: 'w-8 h-4',
            thumb: 'w-3 h-3',
            translate: 'translate-x-4'
        },
        md: {
            track: 'w-11 h-6',
            thumb: 'w-5 h-5',
            translate: 'translate-x-5'
        },
        lg: {
            track: 'w-14 h-7',
            thumb: 'w-6 h-6',
            translate: 'translate-x-7'
        }
    };
    
    let currentSize = $derived(sizes[size] || sizes.md);
    
    function handleToggle() {
        if (disabled) return;
        checked = !checked;
        onchange?.(checked);
    }
    
    function handleKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleToggle();
        }
    }
</script>

<label class="inline-flex items-center gap-3 {disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}">
    {#if label && labelPosition === 'left'}
        <span class="text-sm font-medium text-gray-700">{label}</span>
    {/if}
    
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
        role="switch"
        aria-checked={checked}
        tabindex={disabled ? -1 : 0}
        onclick={handleToggle}
        onkeydown={handleKeydown}
        class="relative inline-flex items-center rounded-full transition-colors duration-200
               {currentSize.track}
               {checked ? 'bg-primary-600' : 'bg-gray-300'}
               {disabled ? '' : 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'}"
    >
        <span 
            class="inline-block rounded-full bg-white shadow transform transition-transform duration-200
                   {currentSize.thumb}
                   {checked ? currentSize.translate : 'translate-x-0.5'}"
        ></span>
    </div>
    
    {#if label && labelPosition === 'right'}
        <span class="text-sm font-medium text-gray-700">{label}</span>
    {/if}
</label>
