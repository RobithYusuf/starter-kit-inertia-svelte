<script>
    let { 
        id = '',
        name = '',
        value = $bindable(0),
        label = '',
        min = 0,
        max = 100,
        step = 1,
        showValue = true,
        showMinMax = false,
        disabled = false,
        size = 'md',
        variant = 'primary',
        onchange = null
    } = $props();
    
    let inputId = $derived(id || `range-${Math.random().toString(36).substr(2, 9)}`);
    let inputName = $derived(name || inputId);
    
    let percentage = $derived(((value - min) / (max - min)) * 100);
    
    const sizes = {
        sm: { track: 'h-1', thumb: 'h-3 w-3' },
        md: { track: 'h-2', thumb: 'h-4 w-4' },
        lg: { track: 'h-3', thumb: 'h-5 w-5' }
    };
    
    function handleInput(event) {
        value = parseFloat(event.target.value);
        onchange?.(value);
    }
</script>

<div class="range-slider">
    {#if label || showValue}
        <div class="flex items-center justify-between mb-2">
            {#if label}
                <label for={inputId} class="text-sm font-medium text-gray-700">{label}</label>
            {:else}
                <span></span>
            {/if}
            {#if showValue}
                <span class="text-sm font-semibold text-primary-600">{value}</span>
            {/if}
        </div>
    {/if}
    
    <div class="relative flex items-center">
        <!-- Track background -->
        <div class="absolute w-full {sizes[size].track} bg-gray-200 rounded-full"></div>
        
        <!-- Track fill -->
        <div 
            class="absolute {sizes[size].track} bg-primary-600 rounded-full transition-all"
            style="width: {percentage}%"
        ></div>
        
        <!-- Native range input (invisible but functional) -->
        <input
            type="range"
            id={inputId}
            name={inputName}
            {min}
            {max}
            {step}
            {value}
            {disabled}
            oninput={handleInput}
            class="range-input w-full relative z-10 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        />
    </div>
    
    {#if showMinMax}
        <div class="flex justify-between mt-1.5">
            <span class="text-xs text-gray-500">{min}</span>
            <span class="text-xs text-gray-500">{max}</span>
        </div>
    {/if}
</div>

<style>
    .range-input {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        height: 1.5rem;
    }
    
    .range-input::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1.25rem;
        height: 1.25rem;
        background: white;
        border: 2px solid var(--theme-primary-600, #2563eb);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        transition: transform 0.15s, box-shadow 0.15s;
    }
    
    .range-input::-webkit-slider-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    }
    
    .range-input::-webkit-slider-thumb:active {
        transform: scale(0.95);
    }
    
    .range-input::-moz-range-thumb {
        width: 1.25rem;
        height: 1.25rem;
        background: white;
        border: 2px solid var(--theme-primary-600, #2563eb);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    
    .range-input:focus {
        outline: none;
    }
    
    .range-input:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 3px rgba(var(--theme-primary-600-rgb, 37, 99, 235), 0.2);
    }
</style>
