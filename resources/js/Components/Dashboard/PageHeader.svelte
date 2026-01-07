<script>
    import { Link } from '@inertiajs/svelte';
    import Card from '@/Components/UI/Card.svelte';
    import Breadcrumb from '@/Components/UI/Breadcrumb.svelte';
    
    let { 
        title = '', 
        description = '', 
        breadcrumbs = [], 
        actions = []
    } = $props();
    
    // Check if actions is a function (snippet) or array
    const isSnippet = typeof actions === 'function';
    const actionsArray = isSnippet ? [] : (Array.isArray(actions) ? actions : []);
</script>

<div class="mb-4">
    <!-- Breadcrumbs -->
    {#if breadcrumbs.length > 0}
        <Breadcrumb items={breadcrumbs} class="mb-4" />
    {/if}
    
    <!-- Header Card -->
    <Card>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
            {#if description}
                <p class="mt-1 text-sm text-gray-600">{description}</p>
            {/if}
        </div>
        
        {#if isSnippet}
            <div class="mt-4 sm:mt-0 flex space-x-3">
                {@render actions()}
            </div>
        {:else if actionsArray.length > 0}
            <div class="mt-4 sm:mt-0 flex space-x-3">
                {#each actionsArray as action}
                    {#if action.type === 'link'}
                        <Link 
                            href={action.href}
                            class="inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all"
                            style="background-color: var(--theme-primary-600)"
                            onmouseenter={(e) => e.currentTarget.style.backgroundColor = 'var(--theme-primary-700)'}
                            onmouseleave={(e) => e.currentTarget.style.backgroundColor = 'var(--theme-primary-600)'}
                            onfocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 3px var(--theme-primary-500)4D'}
                            onblur={(e) => e.currentTarget.style.boxShadow = ''}
                        >
                            {#if action.icon}
                                <i class="{action.icon} -ml-1 mr-2"></i>
                            {/if}
                            {action.label}
                        </Link>
                    {:else}
                        <button 
                            onclick={action.onClick}
                            class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white transition-all"
                            onmouseenter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                            onmouseleave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            onfocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 3px var(--theme-primary-500)4D'}
                            onblur={(e) => e.currentTarget.style.boxShadow = ''}
                        >
                            {#if action.icon}
                                <i class="{action.icon} -ml-1 mr-2"></i>
                            {/if}
                            {action.label}
                        </button>
                    {/if}
                {/each}
            </div>
        {/if}
        </div>
    </Card>
</div>