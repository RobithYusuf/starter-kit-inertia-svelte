<script>
    import { fade, scale } from 'svelte/transition';
    
    let { 
        id = '', 
        name = '', 
        value = $bindable(''), 
        label = '', 
        placeholder = 'Select an option', 
        options = [], 
        error = '', 
        required = false, 
        disabled = false 
    } = $props();
    
    let selectId = $derived(id || `select-${Math.random().toString(36).substr(2, 9)}`);
    let selectName = $derived(name || selectId);
    
    let isOpen = $state(false);
    let dropdownRef = $state(null);
    let buttonRef = $state(null);
    let dropdownPosition = $state('bottom');
    
    let selectedOption = $derived(options.find(opt => opt.value === value));
    let selectedLabel = $derived(selectedOption ? selectedOption.label : value || placeholder);
    
    function toggleDropdown() {
        if (!disabled) {
            if (!isOpen) {
                checkDropdownPosition();
            }
            isOpen = !isOpen;
        }
    }
    
    function checkDropdownPosition() {
        if (buttonRef) {
            const rect = buttonRef.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            const dropdownHeight = Math.min(options.length * 40, 240);
            
            dropdownPosition = spaceBelow < dropdownHeight && spaceAbove > spaceBelow ? 'top' : 'bottom';
        }
    }
    
    function selectOption(option) {
        value = option.value;
        isOpen = false;
    }
    
    function handleClickOutside(event) {
        if (dropdownRef && !dropdownRef.contains(event.target)) {
            isOpen = false;
        }
    }
    
    $effect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
</script>

<div>
    {#if label}
        <label for={selectId} class="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {#if required}
                <span class="text-red-500">*</span>
            {/if}
        </label>
    {/if}
    
    <div class="relative" bind:this={dropdownRef}>
        <button
            bind:this={buttonRef}
            type="button"
            {id}
            onclick={toggleDropdown}
            class="w-full px-3 py-2 pr-10 border rounded-lg text-left transition-all duration-200
                   focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500
                   {error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
                   {disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer'}"
            {disabled}
        >
            <span class="block truncate {selectedOption || value ? 'text-gray-900' : 'text-gray-500'}">
                {selectedLabel}
            </span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg class="h-5 w-5 text-gray-400 transition-transform {isOpen ? 'rotate-180' : ''}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </span>
        </button>
        
        <!-- Hidden input for form submission -->
        <input type="hidden" {name} {value} />

        {#if isOpen}
            <div 
                transition:scale={{ duration: 200, start: 0.95 }}
                class="absolute z-50 w-full rounded-md bg-white shadow-lg ring-1 ring-gray-200 {dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'}"
            >
                <ul class="max-h-60 rounded-md py-1 overflow-auto focus:outline-none">
                    {#each options as option}
                        <li
                            onclick={() => selectOption(option)}
                            class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm transition-colors {value === option.value ? 'bg-primary-50 text-primary-900 font-medium' : 'text-gray-700 hover:bg-gray-50'}"
                        >
                            <span class="block truncate {value === option.value ? 'font-medium' : 'font-normal'}">{option.label}</span>
                            {#if value === option.value}
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-600">
                                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            {/if}
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
    
    {#if error}
        <p class="mt-1.5 text-sm text-red-600">{error}</p>
    {/if}
</div>

<style>
    /* Smooth rotation animation for chevron */
    svg {
        transition: transform 0.2s ease-in-out;
    }
</style>