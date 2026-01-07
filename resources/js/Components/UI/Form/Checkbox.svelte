<script>
    let { 
        id = '',
        name = '',
        checked = $bindable(false),
        value = '',
        label = '',
        description = '',
        disabled = false,
        error = '',
        indeterminate = false,
        size = 'md',
        onchange = null
    } = $props();
    
    let inputId = $derived(id || `checkbox-${Math.random().toString(36).substr(2, 9)}`);
    let inputName = $derived(name || inputId);
    
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };
    
    function handleChange(event) {
        checked = event.target.checked;
        onchange?.(checked);
    }
</script>

<div class="flex items-start gap-3">
    <div class="flex items-center h-5">
        <input
            type="checkbox"
            id={inputId}
            name={inputName}
            {value}
            checked={checked}
            {disabled}
            onchange={handleChange}
            class="{sizes[size]} rounded border-gray-300 text-primary-600 
                   focus:ring-primary-500 focus:ring-offset-0
                   disabled:opacity-50 disabled:cursor-not-allowed
                   {error ? 'border-red-500' : ''}"
        />
    </div>
    
    {#if label || description}
        <div class="flex-1">
            {#if label}
                <label 
                    for={inputId} 
                    class="text-sm font-medium text-gray-700 {disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}"
                >
                    {label}
                </label>
            {/if}
            {#if description}
                <p class="text-xs text-gray-500 mt-0.5">{description}</p>
            {/if}
            {#if error}
                <p class="text-sm text-red-600 mt-1">{error}</p>
            {/if}
        </div>
    {/if}
</div>
