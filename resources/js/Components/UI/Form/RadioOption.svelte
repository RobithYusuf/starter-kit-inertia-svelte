<script>
    let { 
        id, 
        name, 
        value, 
        groupValue = $bindable(), 
        title = '', 
        description = '', 
        icon = null, 
        variant = 'default', 
        disabled = false 
    } = $props();
    
    let checked = $derived(groupValue === value);
    
    function handleClick() {
        if (!disabled) {
            groupValue = value;
        }
    }
    
    let colors = $derived.by(() => {
        const colorMap = {
            default: {
                border: checked ? 'var(--theme-primary-600)' : '#e5e7eb',
                bg: checked ? 'var(--theme-primary-50)' : 'white',
                icon: checked ? 'var(--theme-primary-600)' : '#9ca3af',
                check: 'var(--theme-primary-600)'
            },
            success: {
                border: checked ? '#10b981' : '#e5e7eb',
                bg: checked ? '#d1fae5' : 'white',
                icon: checked ? '#10b981' : '#9ca3af',
                check: '#10b981'
            },
            danger: {
                border: checked ? '#ef4444' : '#e5e7eb',
                bg: checked ? '#fee2e2' : 'white',
                icon: checked ? '#ef4444' : '#9ca3af',
                check: '#ef4444'
            }
        };
        return colorMap[variant] || colorMap.default;
    });
</script>

<label 
    for={id}
    class="relative block p-3 rounded-lg border transition-all duration-200 cursor-pointer
           {disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm'}"
    style="
        border-color: {colors.border};
        background-color: {colors.bg};
    "
>
    <input
        {id}
        type="radio"
        {name}
        {value}
        bind:group={groupValue}
        {disabled}
        class="sr-only"
    />
    
    <div class="flex items-start">
        <!-- Custom Radio Circle -->
        <div class="flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200 flex-shrink-0 mt-0.5"
             style="border-color: {checked ? colors.check : '#d1d5db'}">
            {#if checked}
                <div class="w-2 h-2 rounded-full transition-all duration-200"
                     style="background-color: {colors.check}"></div>
            {/if}
        </div>
        
        <!-- Content -->
        <div class="ml-3 flex-1">
            <div class="flex items-start">
                {#if icon}
                    <i class="{icon} text-base mr-2.5 flex-shrink-0 mt-0.5" 
                       style="color: {colors.icon}"></i>
                {/if}
                
                <div class="flex-1">
                    <div class="text-sm font-medium text-gray-900">
                        {title}
                    </div>
                    {#if description}
                        <div class="mt-0.5 text-xs text-gray-500">
                            {description}
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</label>

<style>
    /* Focus styles - single focus ring */
    label:has(input:focus-visible) {
        outline: 2px solid var(--theme-primary-500);
        outline-offset: 1px;
    }
    
    /* Hover styles when not checked and not disabled */
    label:not(:has(input:checked)):not(:has(input:disabled)):hover {
        border-color: #d1d5db;
        background-color: #f9fafb;
    }
</style>