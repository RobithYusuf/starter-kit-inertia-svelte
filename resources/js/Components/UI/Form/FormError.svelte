<script>
    let { 
        errors = {}, 
        title = 'Please fix the following errors', 
        singleError = '', 
        message = '',
        className = '' 
    } = $props();
    
    let hasErrors = $derived(message || singleError || (errors && Object.keys(errors).length > 0));
    let errorList = $derived(
        message 
            ? [message]
            : singleError 
            ? [singleError] 
            : Object.values(errors)
                .flat()
                .filter(Boolean)
    );
</script>

{#if hasErrors}
    <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 {className}">
        <div class="flex items-start">
            <i class="fas fa-exclamation-circle mr-2 mt-0.5"></i>
            <div class="flex-1">
                {#if errorList.length > 1}
                    <p class="font-medium">{title}</p>
                    <ul class="mt-1 space-y-1">
                        {#each errorList as error}
                            <li class="text-sm">• {error}</li>
                        {/each}
                    </ul>
                {:else if errorList.length === 1}
                    <p class="text-sm">{errorList[0]}</p>
                {/if}
            </div>
        </div>
    </div>
{/if}