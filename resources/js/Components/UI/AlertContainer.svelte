<script>
    import { fly } from 'svelte/transition';
    import { alertStore } from '@/Stores/alertStore.svelte.js';
    
    const alertStyles = {
        success: 'bg-green-50 text-green-800 border-green-200',
        error: 'bg-red-50 text-red-800 border-red-200',
        warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
        info: 'bg-blue-50 text-blue-800 border-blue-200'
    };
    
    const alertIcons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    const positionClasses = {
        'top-right': 'top-4 right-4 items-end',
        'top-left': 'top-4 left-4 items-start',
        'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
        'bottom-right': 'bottom-4 right-4 items-end',
        'bottom-left': 'bottom-4 left-4 items-start',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center'
    };
    
    // Get animation direction based on position
    function getAnimation(pos) {
        if (pos.includes('right')) return { x: 300 };
        if (pos.includes('left')) return { x: -300 };
        if (pos.includes('top')) return { y: -50 };
        return { y: 50 };
    }
    
    let currentPosition = $derived(alertStore.position);
</script>

<div class="fixed z-[9999] flex flex-col gap-2 pointer-events-none {positionClasses[currentPosition]}">
    {#each alertStore.alerts as alertItem (alertItem.id)}
        <div
            transition:fly={{ ...getAnimation(currentPosition), duration: 300 }}
            class="max-w-sm w-80 bg-white border rounded-lg shadow-lg p-4 pointer-events-auto {alertStyles[alertItem.type]}"
        >
            <div class="flex items-start">
                <i class="{alertIcons[alertItem.type]} mr-3 mt-0.5"></i>
                <div class="flex-1">
                    <p class="text-sm">{alertItem.message}</p>
                </div>
                <button
                    onclick={() => alertStore.remove(alertItem.id)}
                    class="ml-3 text-gray-400 hover:text-gray-600"
                >
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    {/each}
</div>
