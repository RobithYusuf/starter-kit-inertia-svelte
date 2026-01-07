<script>
    import { portal } from '@/Utils/portal.js';
    
    let { 
        id = '',
        name = '',
        value = $bindable(''),
        label = '',
        options = [],
        placeholder = 'Select an option',
        error = '',
        required = false,
        disabled = false,
        searchable = false,
        size = 'md',
        onchange = null
    } = $props();
    
    let inputId = $derived(id || `select-${Math.random().toString(36).substr(2, 9)}`);
    let inputName = $derived(name || inputId);
    
    let isOpen = $state(false);
    let searchQuery = $state('');
    let highlightedIndex = $state(-1);
    let triggerRef = $state(null);
    let dropdownRef = $state(null);
    let searchInputRef = $state(null);
    let dropdownPosition = $state({ top: 0, left: 0, width: 0 });
    
    const sizes = {
        sm: 'py-1.5 text-sm',
        md: 'py-2 text-sm',
        lg: 'py-2.5 text-base'
    };
    
    // Normalize options to always have {value, label} format
    let normalizedOptions = $derived(
        options.map(opt => 
            typeof opt === 'object' ? opt : { value: opt, label: opt }
        )
    );
    
    // Filter options based on search query
    let filteredOptions = $derived(
        searchable && searchQuery
            ? normalizedOptions.filter(opt => 
                opt.label.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : normalizedOptions
    );
    
    // Get selected option label
    let selectedLabel = $derived(
        normalizedOptions.find(opt => opt.value === value)?.label || ''
    );
    
    function updateDropdownPosition() {
        if (triggerRef) {
            const rect = triggerRef.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            const dropdownMaxHeight = 250;
            const gap = 4; // gap between trigger and dropdown
            
            // Decide whether to show above or below
            const showAbove = spaceBelow < dropdownMaxHeight && spaceAbove > spaceBelow;
            
            // Calculate actual dropdown height (will be set after render, use max for now)
            const estimatedHeight = Math.min(dropdownMaxHeight, filteredOptions.length * 40 + (searchable ? 50 : 0));
            
            dropdownPosition = {
                top: showAbove 
                    ? rect.top - estimatedHeight - gap  // Position above: trigger top - dropdown height - gap
                    : rect.bottom + gap,                 // Position below: trigger bottom + gap
                left: rect.left,
                width: rect.width,
                showAbove,
                maxHeight: showAbove ? Math.min(spaceAbove - gap, dropdownMaxHeight) : Math.min(spaceBelow - gap, dropdownMaxHeight)
            };
        }
    }
    
    function openDropdown() {
        if (disabled) return;
        updateDropdownPosition();
        isOpen = true;
        highlightedIndex = filteredOptions.findIndex(opt => opt.value === value);
        
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
        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }
    
    function selectOption(option) {
        if (option.disabled) return;
        value = option.value;
        onchange?.(option.value, option);
        closeDropdown();
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
                event.preventDefault();
                if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
                    selectOption(filteredOptions[highlightedIndex]);
                }
                break;
            case 'Escape':
                event.preventDefault();
                closeDropdown();
                triggerRef?.focus();
                break;
            case 'Tab':
                closeDropdown();
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
    
    <!-- Hidden input for form submission -->
    <input type="hidden" name={inputName} value={value} />
    
    <!-- Trigger Button -->
    <button
        bind:this={triggerRef}
        type="button"
        id={inputId}
        onclick={toggleDropdown}
        onkeydown={handleKeydown}
        {disabled}
        class="w-full flex items-center justify-between pl-3 pr-3 {sizes[size]} border rounded-lg 
               text-left transition-all duration-200 
               focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
               {error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
               {disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white cursor-pointer'}"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
    >
        <span class="{selectedLabel ? 'text-gray-900' : 'text-gray-500'}">
            {selectedLabel || placeholder}
        </span>
        <i class="fas fa-chevron-down text-gray-400 text-sm transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"></i>
    </button>
    
    {#if error}
        <p class="mt-1 text-sm text-red-600">{error}</p>
    {/if}
</div>

<!-- Dropdown Portal -->
{#if isOpen}
    <div use:portal>
        <div 
            bind:this={dropdownRef}
            class="fixed z-[9999] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
            style="top: {dropdownPosition.top}px; left: {dropdownPosition.left}px; width: {dropdownPosition.width}px; max-height: {dropdownPosition.maxHeight || 250}px;"
            role="listbox"
        >
            <!-- Search Input -->
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
            
            <!-- Options List -->
            <div class="overflow-y-auto" style="max-height: {searchable ? '190px' : '240px'};">
                {#if filteredOptions.length === 0}
                    <div class="px-3 py-6 text-center text-sm text-gray-500">
                        No options found
                    </div>
                {:else}
                    {#each filteredOptions as option, index}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <div
                            role="option"
                            aria-selected={option.value === value}
                            onclick={() => selectOption(option)}
                            onmouseenter={() => highlightedIndex = index}
                            class="flex items-center justify-between px-3 py-2 cursor-pointer transition-colors
                                   {option.value === value ? 'bg-primary-50 text-primary-700' : ''}
                                   {highlightedIndex === index && option.value !== value ? 'bg-gray-100' : ''}
                                   {option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}"
                        >
                            <span class="text-sm {option.value === value ? 'font-medium' : ''}">{option.label}</span>
                            {#if option.value === value}
                                <i class="fas fa-check text-primary-600 text-sm"></i>
                            {/if}
                        </div>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
{/if}
