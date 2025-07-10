<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    
    export let value = '';
    export let options = [];
    export let placeholder = 'Select...';
    export let disabled = false;
    
    const dispatch = createEventDispatcher();
    
    let isOpen = false;
    let selectedLabel = '';
    let dropdownRef;
    let buttonRef;
    let dropdownPosition = 'bottom';
    
    $: selectedOption = options.find(opt => opt.value === value);
    $: selectedLabel = selectedOption ? selectedOption.label : value;
    
    function toggleDropdown() {
        if (!disabled) {
            if (!isOpen) {
                // Check position before opening
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
            const dropdownHeight = Math.min(options.length * 40, 240); // Estimate height
            
            dropdownPosition = spaceBelow < dropdownHeight && spaceAbove > spaceBelow ? 'top' : 'bottom';
        }
    }
    
    function selectOption(option) {
        value = option.value;
        isOpen = false;
        dispatch('change', option.value);
    }
    
    function handleClickOutside(event) {
        if (dropdownRef && !dropdownRef.contains(event.target)) {
            isOpen = false;
        }
    }
    
    onMount(() => {
        document.addEventListener('click', handleClickOutside);
    });
    
    onDestroy(() => {
        document.removeEventListener('click', handleClickOutside);
    });
</script>

<div class="relative" bind:this={dropdownRef}>
    <button
        bind:this={buttonRef}
        type="button"
        on:click={toggleDropdown}
        class="relative w-full rounded-lg border border-gray-300 bg-white pl-3 pr-8 py-2 text-left text-sm text-gray-700 transition-all hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-opacity-50 {disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}"
        {disabled}
    >
        <span class="block truncate">{selectedLabel || placeholder}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg class="h-3.5 w-3.5 text-gray-500 transition-transform {isOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </span>
    </button>

    {#if isOpen}
        <div class="absolute z-50 w-full rounded-md bg-white shadow-md ring-1 ring-gray-200 {dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'}">
            <ul class="max-h-60 rounded-md py-1 overflow-auto focus:outline-none">
                {#each options as option}
                    <li
                        on:click={() => selectOption(option)}
                        class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm transition-colors {value === option.value ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-50'}"
                    >
                        <span class="block truncate {value === option.value ? 'font-medium' : 'font-normal'}">{option.label}</span>
                        {#if value === option.value}
                            <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600">
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

<style>
    /* Smooth rotation animation for chevron */
    svg {
        transition: transform 0.2s ease-in-out;
    }
</style>