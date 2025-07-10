<script>
    import { createEventDispatcher } from 'svelte';
    import { formatNumber } from '@/Utils/formatters';
    
    export let meta = {};
    export let links = {};
    
    const dispatch = createEventDispatcher();
    
    function goToPage(page) {
        const pageNum = parseInt(page);
        const currentPage = parseInt(meta.current_page);
        if (pageNum && pageNum !== currentPage) {
            dispatch('pageChange', pageNum);
        }
    }
    
    function generatePageNumbers() {
        if (!meta || !meta.current_page || !meta.last_page) {
            return [];
        }
        
        const current = parseInt(meta.current_page);
        const last = parseInt(meta.last_page);
        const pages = [];
        
        // If 9 or fewer pages, show all
        if (last <= 9) {
            for (let i = 1; i <= last; i++) {
                pages.push(i);
            }
            return pages;
        }
        
        // Complex pagination for more than 9 pages
        const leftSibling = Math.max(current - 2, 1);
        const rightSibling = Math.min(current + 2, last);
        
        // Should we show left dots?
        const showLeftDots = leftSibling > 3;
        // Should we show right dots?
        const showRightDots = rightSibling < last - 2;
        
        // Always show first page
        pages.push(1);
        
        // Show second page if no left dots needed
        if (!showLeftDots && leftSibling > 2) {
            pages.push(2);
        }
        
        // Show left dots
        if (showLeftDots) {
            pages.push('...');
        }
        
        // Show sibling pages
        for (let i = leftSibling; i <= rightSibling; i++) {
            // Skip if it's the first or last page (already added)
            if (i > 1 && i < last) {
                pages.push(i);
            }
        }
        
        // Show right dots
        if (showRightDots) {
            pages.push('...');
        }
        
        // Show second to last page if no right dots needed
        if (!showRightDots && rightSibling < last - 1) {
            pages.push(last - 1);
        }
        
        // Always show last page
        pages.push(last);
        
        return pages;
    }
    
    // Force reactivity when meta changes
    $: pages = meta && generatePageNumbers();
</script>

{#if meta && meta.total > 0}
<div class="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
    <div class="text-sm text-gray-600">
        Showing <span class="font-medium">{formatNumber(meta.from || 0)}</span> to 
        <span class="font-medium">{formatNumber(meta.to || 0)}</span> of 
        <span class="font-medium">{formatNumber(meta.total || 0)}</span> results
    </div>
    
    {#if meta.last_page > 1}
        {#key meta.current_page}
        <nav class="flex items-center space-x-1">
            <!-- Previous -->
            <button
                on:click={() => goToPage(parseInt(meta.current_page) - 1)}
                disabled={parseInt(meta.current_page) === 1}
                class="px-2.5 py-1.5 text-sm font-medium rounded-md transition-all
                       {parseInt(meta.current_page) === 1 
                        ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                        : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 cursor-pointer'}"
            >
                <i class="fas fa-chevron-left"></i>
            </button>
            
            <!-- Page Numbers -->
            {#each pages as page}
                {#if page === '...'}
                    <span class="px-2 py-1 text-sm text-gray-400">...</span>
                {:else}
                    <button
                        on:click={() => goToPage(page)}
                        class="min-w-[36px] px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer
                               {parseInt(page) === parseInt(meta.current_page) 
                                ? 'text-white shadow-sm' 
                                : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'}"
                        style="{parseInt(page) === parseInt(meta.current_page) ? `background-color: var(--theme-primary-600)` : ''}"
                    >
                        {page}
                    </button>
                {/if}
            {/each}
            
            <!-- Next -->
            <button
                on:click={() => goToPage(parseInt(meta.current_page) + 1)}
                disabled={parseInt(meta.current_page) === parseInt(meta.last_page)}
                class="px-2.5 py-1.5 text-sm font-medium rounded-md transition-all
                       {parseInt(meta.current_page) === parseInt(meta.last_page) 
                        ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                        : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 cursor-pointer'}"
            >
                <i class="fas fa-chevron-right"></i>
            </button>
        </nav>
        {/key}
    {/if}
</div>
{/if}