<script>
    import { Link } from '@inertiajs/svelte';
    import Card from '@/Components/UI/Card.svelte';
    
    export let title = '';
    export let description = '';
    export let breadcrumbs = [];
    export let actions = [];
</script>

<div class="mb-4">
    <!-- Breadcrumbs -->
    {#if breadcrumbs.length > 0}
        <nav class="flex mb-4" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                {#each breadcrumbs as crumb, index}
                    <li class="inline-flex items-center">
                        {#if index > 0}
                            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        {/if}
                        {#if crumb.href}
                            <Link href={crumb.href} class="inline-flex items-center text-sm font-medium text-gray-700 transition-colors"
                                on:mouseenter={(e) => e.currentTarget.style.color = 'var(--theme-primary-600)'}
                                on:mouseleave={(e) => e.currentTarget.style.color = '#374151'}>
                                {#if crumb.icon}
                                    <i class="{crumb.icon} mr-2"></i>
                                {/if}
                                {crumb.label}
                            </Link>
                        {:else}
                            <span class="text-sm font-medium text-gray-500">
                                {crumb.label}
                            </span>
                        {/if}
                    </li>
                {/each}
            </ol>
        </nav>
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
        
        {#if $$slots.actions}
            <div class="mt-4 sm:mt-0 flex space-x-3">
                <slot name="actions" />
            </div>
        {:else if actions.length > 0}
            <div class="mt-4 sm:mt-0 flex space-x-3">
                {#each actions as action}
                    {#if action.type === 'link'}
                        <Link 
                            href={action.href}
                            class="inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all"
                            style="background-color: var(--theme-primary-600)"
                            on:mouseenter={(e) => e.currentTarget.style.backgroundColor = 'var(--theme-primary-700)'}
                            on:mouseleave={(e) => e.currentTarget.style.backgroundColor = 'var(--theme-primary-600)'}
                            on:focus={(e) => e.currentTarget.style.boxShadow = '0 0 0 3px var(--theme-primary-500)4D'}
                            on:blur={(e) => e.currentTarget.style.boxShadow = ''}
                        >
                            {#if action.icon}
                                <i class="{action.icon} -ml-1 mr-2"></i>
                            {/if}
                            {action.label}
                        </Link>
                    {:else}
                        <button 
                            on:click={action.onClick}
                            class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white transition-all"
                            on:mouseenter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                            on:mouseleave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            on:focus={(e) => e.currentTarget.style.boxShadow = '0 0 0 3px var(--theme-primary-500)4D'}
                            on:blur={(e) => e.currentTarget.style.boxShadow = ''}
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