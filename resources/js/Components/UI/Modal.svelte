<script>
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import Button from './Button.svelte';
    
    export let show = false;
    export let title = '';
    export let size = 'md'; // sm, md, lg, xl, full
    export let closeOnEscape = true;
    export let closeOnClickOutside = true;
    export let showClose = true;
    export let showFooter = true;
    export let showHeader = true;
    export let centered = false;
    export let scrollable = false;
    export let className = '';
    
    const dispatch = createEventDispatcher();
    
    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4'
    };
    
    function handleClose() {
        dispatch('close');
    }
    
    function handleKeydown(event) {
        if (event.key === 'Escape' && closeOnEscape) {
            handleClose();
        }
    }
    
    function handleBackdropClick(event) {
        if (closeOnClickOutside && event.target === event.currentTarget) {
            handleClose();
        }
    }
    
    onMount(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeydown);
        }
    });
    
    onDestroy(() => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeydown);
    });
    
    $: if (show) {
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeydown);
    } else {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeydown);
    }
</script>

{#if show}
    <!-- Backdrop -->
    <div 
        class="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title" 
        role="dialog" 
        aria-modal="true"
    >
        <!-- Background overlay -->
        <div 
            transition:fade={{ duration: 200 }}
            class="fixed inset-0 bg-gray-500/75 transition-opacity"
            on:click={handleBackdropClick}
            aria-hidden="true"
        ></div>

        <!-- Modal container -->
        <div 
            class="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0"
            on:click={handleBackdropClick}
        >
            <!-- Modal panel -->
            <div 
                transition:fly={{ y: 50, duration: 300 }}
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full {sizes[size]} {className}"
                on:click|stopPropagation
            >
                <!-- Header -->
                {#if showHeader}
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-gray-900" id="modal-title">
                                {title}
                            </h3>
                            {#if showClose}
                                <button
                                    type="button"
                                    class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
                                    style="focus:ring-color: var(--theme-primary-500)"
                                    on:click={handleClose}
                                >
                                    <span class="sr-only">Close</span>
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            {/if}
                        </div>
                        <!-- Header slot for custom content -->
                        <slot name="header" />
                    </div>
                {/if}

                <!-- Body -->
                <div 
                    class="px-4 py-5 sm:p-6 {scrollable ? 'max-h-[60vh] overflow-y-auto' : ''}"
                >
                    <slot />
                </div>

                <!-- Footer -->
                {#if showFooter && $$slots.footer}
                    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2 border-t border-gray-200">
                        <slot name="footer" />
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    /* Custom scrollbar styles for scrollable content */
    .max-h-\[60vh\]::-webkit-scrollbar {
        width: 6px;
    }
    
    .max-h-\[60vh\]::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }
    
    .max-h-\[60vh\]::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
    }
    
    .max-h-\[60vh\]::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
</style>