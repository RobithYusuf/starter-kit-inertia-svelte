<script>
    let { 
        id = '',
        name = '',
        value = $bindable(''),
        label = '',
        placeholder = '',
        error = '',
        required = false,
        disabled = false,
        maxTags = null,
        allowDuplicates = false,
        validateTag = null,
        suggestions = [],
        size = 'md',
        onchange = null
    } = $props();
    
    let inputId = $derived(id || `taginput-${Math.random().toString(36).substr(2, 9)}`);
    let inputName = $derived(name || inputId);
    
    let inputValue = $state('');
    let inputRef = $state(null);
    let showSuggestions = $state(false);
    
    // Parse value as array
    let tags = $derived(value ? value.split(',').filter(t => t.trim()) : []);
    
    let filteredSuggestions = $derived(
        suggestions.filter(s => 
            s.toLowerCase().includes(inputValue.toLowerCase()) &&
            (allowDuplicates || !tags.includes(s))
        )
    );
    
    const sizes = {
        sm: 'min-h-[34px] text-sm',
        md: 'min-h-[42px] text-sm',
        lg: 'min-h-[46px] text-base'
    };
    
    function updateValue(newTags) {
        value = newTags.join(',');
        onchange?.(newTags);
    }
    
    function addTag(tag) {
        const trimmedTag = tag.trim();
        if (!trimmedTag) return;
        
        if (maxTags && tags.length >= maxTags) return;
        if (!allowDuplicates && tags.includes(trimmedTag)) return;
        if (validateTag && !validateTag(trimmedTag)) return;
        
        updateValue([...tags, trimmedTag]);
        inputValue = '';
        showSuggestions = false;
    }
    
    function removeTag(index) {
        const newTags = tags.filter((_, i) => i !== index);
        updateValue(newTags);
    }
    
    function handleKeydown(event) {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            addTag(inputValue);
        } else if (event.key === 'Backspace' && !inputValue && tags.length > 0) {
            removeTag(tags.length - 1);
        } else if (event.key === 'Escape') {
            showSuggestions = false;
        }
    }
    
    function handleInput() {
        showSuggestions = inputValue.length > 0 && filteredSuggestions.length > 0;
    }
    
    function selectSuggestion(suggestion) {
        addTag(suggestion);
        inputRef?.focus();
    }
    
    function handleBlur() {
        setTimeout(() => {
            showSuggestions = false;
        }, 150);
    }
</script>

<div>
    {#if label}
        <label for={inputId} class="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {#if required}
                <span class="text-red-500">*</span>
            {/if}
        </label>
    {/if}
    
    <input type="hidden" name={inputName} {value} />
    
    <div class="relative">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
            onclick={() => inputRef?.focus()}
            class="flex flex-wrap gap-1.5 items-center px-3 py-2 {sizes[size]} border rounded-lg 
                   transition-all duration-200 cursor-text
                   focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500
                   {error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
                   {disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}"
        >
            {#each tags as tag, index}
                <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-100 text-primary-700 text-sm rounded-full">
                    {tag}
                    {#if !disabled}
                        <button 
                            type="button"
                            onclick={() => removeTag(index)}
                            class="hover:text-primary-900 focus:outline-none"
                        >
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    {/if}
                </span>
            {/each}
            
            {#if !disabled && (!maxTags || tags.length < maxTags)}
                <input
                    bind:this={inputRef}
                    type="text"
                    id={inputId}
                    bind:value={inputValue}
                    oninput={handleInput}
                    onkeydown={handleKeydown}
                    onblur={handleBlur}
                    onfocus={() => showSuggestions = inputValue.length > 0 && filteredSuggestions.length > 0}
                    {placeholder}
                    class="flex-1 min-w-[120px] border-none outline-none bg-transparent text-sm"
                />
            {/if}
        </div>
        
        <!-- Suggestions dropdown -->
        {#if showSuggestions && filteredSuggestions.length > 0}
            <div class="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                {#each filteredSuggestions.slice(0, 5) as suggestion}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div 
                        onclick={() => selectSuggestion(suggestion)}
                        class="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                    >
                        {suggestion}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
    
    {#if error}
        <p class="mt-1 text-sm text-red-600">{error}</p>
    {:else if maxTags}
        <p class="mt-1 text-xs text-gray-500">{tags.length} / {maxTags} tags</p>
    {/if}
</div>
