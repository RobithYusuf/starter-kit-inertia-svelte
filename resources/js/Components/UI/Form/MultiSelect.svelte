<script>
    import { portal } from '@/Utils/portal.js';
    
    let { 
        id = '',
        name = '',
        value = $bindable([]),
        label = '',
        options = [],
        placeholder = 'Select options',
        error = '',
        required = false,
        disabled = false,
        searchable = false,
        maxDisplay = 3,
        size = 'md',
        onchange = null
    } = $props();
    
    let inputId = $derived(id || `multiselect-${Math.random().toString(36).substr(2, 9)}`);
    let inputName = $derived(name || inputId);
    
    let isOpen = $state(false);
    let searchQuery = $state('');
    let highlightedIndex = $state(-1);
    let triggerRef = $state(null);
    let dropdownRef = $state(null);
    let searchInputRef = $state(null);
    let dropdownPosition = $state({ top: 0, left: 0, width: 0 });
    
    const sizes = {
        sm: 'py-1.5 text-sm min-h-[34px]',
        md: 'py-2 text-sm min-h-[42px]',
        lg: 'py-2.5 text-base min-h-[46px]'
    };
    
    let normalizedOptions = $derived(
        options.map(opt => 
            typeof opt === 'object' ? opt : { value: opt, label: opt }
        )
    );
    
    let filteredOptions = $derived(
        searchable && searchQuery
            ? normalizedOptions.filter(opt => 
                opt.label.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : normalizedOptions
    );
    
    let selectedOptions = $derived(
        normalizedOptions.filter(opt => value.includes(opt.value))
    );
    
    let displayText = $derived(() => {
        if (selectedOptions.length === 0) return '';
        if (selectedOptions.length <= maxDisplay) {
            return selectedOptions.map(o => o.label).join(', ');
        }
        return `${selectedOptions.slice(0, maxDisplay).map(o => o.label).join(', ')} +${selectedOptions.length - maxDisplay} more`;
    });
    
    function updateDropdownPosition() {
        if (triggerRef) {
            const rect = triggerRef.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            const dropdownMaxHeight = 280;
            const gap = 4;
            
            const showAbove = spaceBelow < dropdownMaxHeight && spaceAbove > spaceBelow;
            const estimatedHeight = Math.min(dropdownMaxHeight, filteredOptions.length * 40 + (searchable ? 50 : 0) + 50);
            
            dropdownPosition = {
                top: showAbove 
                    ? rect.top - estimatedHeight - gap
                    : rect.bottom + gap,
                left: rect.left,
                width: rect.width,
                maxHeight: showAbove ? Math.min(spaceAbove - gap, dropdownMaxHeight) : Math.min(spaceBelow - gap, dropdownMaxHeight)
            };
        }
    }
    
    function openDropdown() {
        if (disabled) return;
        updateDropdownPosition();
        isOpen = true;
        if (searchable) {
            setTimeout(() => searchInputRef?.focus(), 10);
        }
    }
    
    function closeDropdown() {
        isOpen = false;
        searchQuery = '';
        highlightedIndex = -1;
    }
    
    function toggleDropdown() {
        if (isOpen) closeDropdown();
        else openDropdown();
    }
    
    function toggleOption(option) {
        if (option.disabled) return;
        
        if (value.includes(option.value)) {
            value = value.filter(v => v !== option.value);
        } else {
            value = [...value, option.value];
        }
        onchange?.(value);
    }
    
    function removeOption(optionValue, event) {
        event.stopPropagation();
        value = value.filter(v => v !== optionValue);
        onchange?.(value);
    }
    
    function isSelected(optionValue) {
        return value.includes(optionValue);
    }
    
    function handleKeydown(event) {
        if (!isOpen) {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
                event.preventDefault();
                openDropdown();
            }
            return;
        }
        
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                highlightedIndex = Math.min(highlightedIndex + 1, filteredOptions.length - 1);
                break;
            case 'ArrowUp':
                event.preventDefault();
                highlightedIndex = Math.max(highlightedIndex - 1, 0);
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
                    toggleOption(filteredOptions[highlightedIndex]);
                }
                break;
            case 'Escape':
                event.preventDefault();
                closeDropdown();
                triggerRef?.focus();
                break;
        }
    }
    
    function handleClickOutside(event) {
        if (
            triggerRef && !triggerRef.contains(event.target) &&
            dropdownRef && !dropdownRef.contains(event.target)
        ) {
            closeDropdown();
        }
    }
    
    $effect(() => {
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            window.addEventListener('scroll', updateDropdownPosition, true);
            window.addEventListener('resize', updateDropdownPosition);
        }
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('scroll', updateDropdownPosition, true);
            window.removeEventListener('resize', updateDropdownPosition);
        };
    });
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
    
    <input type="hidden" name={inputName} value={value.join(',')} />
    
    <button
        bind:this={triggerRef}
        type="button"
        id={inputId}
        onclick={toggleDropdown}
        onkeydown={handleKeydown}
        {disabled}
        class="w-full flex items-center justify-between gap-2 pl-3 pr-3 {sizes[size]} border rounded-lg 
               text-left transition-all duration-200 
               focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
               {error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
               {disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white cursor-pointer'}"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
    >
        <div class="flex-1 flex flex-wrap gap-1">
            {#if selectedOptions.length === 0}
                <span class="text-gray-500">{placeholder}</span>
            {:else if selectedOptions.length <= 2}
                {#each selectedOptions as option}
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">
                        {option.label}
                        <button 
                            type="button"
                            onclick={(e) => removeOption(option.value, e)}
                            class="hover:text-primary-900"
                        >
                            <i class="fas fa-times text-[10px]"></i>
                        </button>
                    </span>
                {/each}
            {:else}
                <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">
                    {selectedOptions.length} selected
                </span>
            {/if}
        </div>
        <i class="fas fa-chevron-down text-gray-400 text-sm transition-transform duration-200 flex-shrink-0 {isOpen ? 'rotate-180' : ''}"></i>
    </button>
    
    {#if error}
        <p class="mt-1 text-sm text-red-600">{error}</p>
    {/if}
</div>

{#if isOpen}
    <div use:portal>
        <div 
            bind:this={dropdownRef}
            class="fixed z-[9999] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
            style="top: {dropdownPosition.top}px; left: {dropdownPosition.left}px; width: {dropdownPosition.width}px; max-height: {dropdownPosition.maxHeight || 280}px;"
            role="listbox"
            aria-multiselectable="true"
        >
            {#if searchable}
                <div class="p-2 border-b border-gray-100">
                    <div class="relative">
                        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                        <input
                            bind:this={searchInputRef}
                            type="text"
                            bind:value={searchQuery}
                            onkeydown={handleKeydown}
                            placeholder="Search..."
                            class="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-md
                                   focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                </div>
            {/if}
            
            <div class="overflow-y-auto" style="max-height: {searchable ? '220px' : '270px'};">
                {#if filteredOptions.length === 0}
                    <div class="px-3 py-6 text-center text-sm text-gray-500">
                        No options found
                    </div>
                {:else}
                    {#each filteredOptions as option, index}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <div
                            role="option"
                            aria-selected={isSelected(option.value)}
                            onclick={() => toggleOption(option)}
                            onmouseenter={() => highlightedIndex = index}
                            class="flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors
                                   {highlightedIndex === index ? 'bg-gray-100' : 'hover:bg-gray-50'}
                                   {option.disabled ? 'opacity-50 cursor-not-allowed' : ''}"
                        >
                            <div class="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0
                                        {isSelected(option.value) ? 'bg-primary-600 border-primary-600' : 'border-gray-300'}">
                                {#if isSelected(option.value)}
                                    <i class="fas fa-check text-white text-[10px]"></i>
                                {/if}
                            </div>
                            <span class="text-sm">{option.label}</span>
                        </div>
                    {/each}
                {/if}
            </div>
            
            {#if selectedOptions.length > 0}
                <div class="border-t border-gray-100 px-3 py-2 bg-gray-50 flex justify-between items-center">
                    <span class="text-xs text-gray-500">{selectedOptions.length} selected</span>
                    <button 
                        type="button"
                        onclick={() => { value = []; onchange?.([]); }}
                        class="text-xs text-red-600 hover:text-red-700"
                    >
                        Clear all
                    </button>
                </div>
            {/if}
        </div>
    </div>
{/if}
