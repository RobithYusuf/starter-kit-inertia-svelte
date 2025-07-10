<script>
    import { createEventDispatcher } from 'svelte';
    import { fade, scale } from 'svelte/transition';
    import Button from './Button.svelte';
    
    export let show = false;
    export let title = 'Confirm';
    export let message = 'Are you sure?';
    export let confirmLabel = 'Confirm';
    export let cancelLabel = 'Cancel';
    export let confirmType = 'primary';
    export let isLoading = false;
    
    const dispatch = createEventDispatcher();
    
    function handleCancel() {
        dispatch('cancel');
    }
    
    function handleConfirm() {
        dispatch('confirm');
    }
</script>

{#if show}
    <!-- Backdrop -->
    <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <!-- Background overlay -->
            <div 
                transition:fade={{ duration: 300 }}
                class="fixed inset-0 bg-gray-500/75 transition-opacity"
                on:click={handleCancel}
                aria-hidden="true"
            ></div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <!-- Modal panel -->
            <div 
                transition:scale={{ duration: 300, start: 0.95 }}
                class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                             style="background-color: {confirmType === 'danger' ? '#fee2e2' : 'var(--theme-primary-100)'}">
                            <svg class="h-6 w-6" 
                                 style="color: {confirmType === 'danger' ? '#dc2626' : 'var(--theme-primary-600)'}"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                {title}
                            </h3>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    {@html message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                    <Button
                        variant={confirmType}
                        on:click={handleConfirm}
                        disabled={isLoading}
                        loading={isLoading}
                        class="w-full sm:w-auto"
                    >
                        {confirmLabel}
                    </Button>
                    <Button
                        variant="secondary"
                        on:click={handleCancel}
                        disabled={isLoading}
                        class="w-full sm:w-auto mt-3 sm:mt-0"
                    >
                        {cancelLabel}
                    </Button>
                </div>
            </div>
        </div>
    </div>
{/if}