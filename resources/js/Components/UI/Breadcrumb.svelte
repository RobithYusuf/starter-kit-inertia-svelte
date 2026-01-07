<script>
    import { Link } from '@inertiajs/svelte';
    
    let { 
        items = [],
        separator = 'chevron',
        class: className = ''
    } = $props();
</script>

<nav class="flex {className}" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2">
        {#each items as item, index}
            <li class="inline-flex items-center">
                {#if index > 0}
                    {#if separator === 'chevron'}
                        <svg class="w-5 h-5 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                        </svg>
                    {:else}
                        <span class="mx-2 text-gray-400">{separator}</span>
                    {/if}
                {/if}
                
                {#if item.href && index < items.length - 1}
                    <Link 
                        href={item.href}
                        class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                    >
                        {#if item.icon}
                            <i class="{item.icon} mr-2"></i>
                        {/if}
                        {item.label}
                    </Link>
                {:else}
                    <span class="inline-flex items-center text-sm font-medium text-gray-500">
                        {#if item.icon && index === items.length - 1}
                            <i class="{item.icon} mr-2"></i>
                        {:else if item.icon}
                            <i class="{item.icon} mr-2"></i>
                        {/if}
                        {item.label}
                    </span>
                {/if}
            </li>
        {/each}
    </ol>
</nav>
