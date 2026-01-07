<script>
    import { fade, fly } from 'svelte/transition';
    import { portal } from '@/Utils/portal.js';
    import Button from './Button.svelte';
    
    // Svelte 5: Using $props()
    let { 
        show = false,
        title = '',
        size = 'md',
        closeOnEscape = true,
        closeOnClickOutside = true,
        showClose = true,
        showFooter = true,
        showHeader = true,
        centered = false,
        scrollable = false,
        className = '',
        onclose = null,
        children,
        footer,
        header
    } = $props();
    
    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4'
    };
    
    function handleClose() {
        if (onclose) onclose();
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
    
    // Svelte 5: Using $effect for side effects
    $effect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeydown);
        } else {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeydown);
        }
        
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeydown);
        };
    });
</script>

{#if show}
    <!-- Portal: teleport modal to document.body to escape stacking context -->
    <div use:portal class="modal-portal">
        <!-- Backdrop with very high z-index to cover everything including sidebar -->
        <div 
            class="fixed inset-0 z-[9998] overflow-y-auto"
            aria-labelledby="modal-title" 
            role="dialog" 
            aria-modal="true"
        >
            <!-- Background overlay -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
                transition:fade={{ duration: 200 }}
                class="fixed inset-0 bg-black/50 transition-opacity"
                onclick={handleBackdropClick}
                aria-hidden="true"
            ></div>

            <!-- Modal container -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
                class="fixed inset-0 z-[9999] flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0"
                onclick={handleBackdropClick}
            >
            <!-- Modal panel -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
                transition:fly={{ y: 50, duration: 300 }}
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full {sizes[size]} {className}"
                onclick={(e) => e.stopPropagation()}
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
                                    onclick={handleClose}
                                >
                                    <span class="sr-only">Close</span>
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            {/if}
                        </div>
                        <!-- Header slot for custom content -->
                        {#if header}
                            {@render header()}
                        {/if}
                    </div>
                {/if}

                <!-- Body -->
                <div 
                    class="px-4 py-5 sm:p-6 {scrollable ? 'max-h-[60vh] overflow-y-auto' : ''}"
                >
                    {#if children}
                        {@render children()}
                    {/if}
                </div>

                <!-- Footer -->
                {#if showFooter && footer}
                    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2 border-t border-gray-200">
                        {@render footer()}
                    </div>
                {/if}
            </div>
        </div>
    </div>
    </div>
{/if}

<style>
    .modal-portal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9998;
        pointer-events: none;
    }
    
    .modal-portal > * {
        pointer-events: auto;
    }
    
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