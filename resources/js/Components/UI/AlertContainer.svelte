<script>
    import { fade, fly } from 'svelte/transition';
    import alert from '@/Stores/alertStore';
    
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
</script>

<div class="fixed top-4 right-4 z-50 space-y-2">
    {#each $alert as alertItem (alertItem.id)}
        <div
            transition:fly={{ x: 300, duration: 300 }}
            class="max-w-sm w-full bg-white border rounded-lg shadow-lg p-4 {alertStyles[alertItem.type]}"
        >
            <div class="flex items-start">
                <i class="{alertIcons[alertItem.type]} mr-3 mt-0.5"></i>
                <div class="flex-1">
                    <p class="text-sm">{alertItem.message}</p>
                </div>
                <button
                    on:click={() => alert.remove(alertItem.id)}
                    class="ml-3 text-gray-400 hover:text-gray-600"
                >
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    {/each}
</div>