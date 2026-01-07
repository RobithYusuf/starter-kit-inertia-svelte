<script>
    import { formatNumber } from '@/Utils/formatters';
    
    let { 
        meta = {}, 
        links = {},
        onpageChange = () => {}
    } = $props();
    
    function goToPage(page) {
        const pageNum = parseInt(page);
        const currentPage = parseInt(meta.current_page);
        if (pageNum && pageNum !== currentPage) {
            onpageChange(pageNum);
        }
    }
    
    function generatePageNumbers() {
        if (!meta || !meta.current_page || !meta.last_page) {
            return [];
        }
        
        const current = parseInt(meta.current_page);
        const last = parseInt(meta.last_page);
        const pages = [];
        
        if (last <= 9) {
            for (let i = 1; i <= last; i++) {
                pages.push(i);
            }
            return pages;
        }
        
        const leftSibling = Math.max(current - 2, 1);
        const rightSibling = Math.min(current + 2, last);
        
        const showLeftDots = leftSibling > 3;
        const showRightDots = rightSibling < last - 2;
        
        pages.push(1);
        
        if (!showLeftDots && leftSibling > 2) {
            pages.push(2);
        }
        
        if (showLeftDots) {
            pages.push('...');
        }
        
        for (let i = leftSibling; i <= rightSibling; i++) {
            if (i > 1 && i < last) {
                pages.push(i);
            }
        }
        
        if (showRightDots) {
            pages.push('...');
        }
        
        if (!showRightDots && rightSibling < last - 1) {
            pages.push(last - 1);
        }
        
        pages.push(last);
        
        return pages;
    }
    
    let pages = $derived(meta && generatePageNumbers());
</script>

{#if meta && meta.total > 0}
<div class="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
    <div class="text-sm text-gray-600">
        Showing <span class="font-medium">{formatNumber(meta.from || 0)}</span> to 
        <span class="font-medium">{formatNumber(meta.to || 0)}</span> of 
        <span class="font-medium">{formatNumber(meta.total || 0)}</span> results
    </div>
    
    {#if meta.last_page > 1}
        <nav class="flex items-center space-x-1">
            <!-- Previous -->
            <button
                onclick={() => goToPage(parseInt(meta.current_page) - 1)}
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
                        onclick={() => goToPage(page)}
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
                onclick={() => goToPage(parseInt(meta.current_page) + 1)}
                disabled={parseInt(meta.current_page) === parseInt(meta.last_page)}
                class="px-2.5 py-1.5 text-sm font-medium rounded-md transition-all
                       {parseInt(meta.current_page) === parseInt(meta.last_page) 
                        ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                        : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 cursor-pointer'}"
            >
                <i class="fas fa-chevron-right"></i>
            </button>
        </nav>
    {/if}
</div>
{/if}