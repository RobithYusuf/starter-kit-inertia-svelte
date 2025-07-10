<script>
    import { createEventDispatcher } from 'svelte';
    import { router } from '@inertiajs/svelte';
    import TableCell from './TableCell.svelte';
    import TableAction from './TableAction.svelte';
    import Pagination from '@/Components/UI/Pagination.svelte';
    import SelectDropdown from '@/Components/UI/SelectDropdown.svelte';
    
    export let columns = [];
    export let data = [];
    export let meta = {};
    export let links = {};
    export let editRoute = '';
    export let emptyMessage = 'No data found';
    export let loadingData = false;
    export let currentSortField = '';
    export let currentSortOrder = '';
    export let actionLabels = { edit: 'Edit', delete: 'Delete', view: 'View' };
    export let perPage = 10;
    export let perPageOptions = [10, 25, 50, 100];
    
    $: perPageSelectOptions = perPageOptions.map(num => ({
        value: num,
        label: num.toString()
    }));
    
    const dispatch = createEventDispatcher();
    
    function handleSort(field) {
        if (!columns.find(col => col.key === field)?.sortable) return;
        
        let order = 'asc';
        if (currentSortField === field && currentSortOrder === 'asc') {
            order = 'desc';
        }
        
        dispatch('sort', { field, order });
    }
    
    function handleDelete(id) {
        dispatch('delete', id);
    }
    
    function handleView(id) {
        dispatch('view', id);
    }
    
    function handlePageChange(page) {
        dispatch('page', page);
    }
    
    function handlePerPageChange(newValue) {
        perPage = newValue;
        dispatch('perPageChange', parseInt(newValue));
    }
    
    function getCellValue(row, column) {
        if (column.key.includes('.')) {
            const keys = column.key.split('.');
            let value = row;
            for (const key of keys) {
                value = value?.[key];
            }
            return value;
        }
        return row[column.key];
    }
</script>

<div class="overflow-hidden rounded-lg border border-gray-200">
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                    {#each columns as column}
                        <th 
                            class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider {column.className || ''} {column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''} {column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}"
                            on:click={() => handleSort(column.key)}
                        >
                            <div class="flex items-center {column.align === 'center' ? 'justify-center' : column.align === 'right' ? 'justify-end' : ''}">
                                {column.label}
                                {#if column.sortable}
                                    <span class="ml-1">
                                        {#if currentSortField === column.key}
                                            {#if currentSortOrder === 'asc'}
                                                <i class="fas fa-sort-up text-primary-600"></i>
                                            {:else}
                                                <i class="fas fa-sort-down text-primary-600"></i>
                                            {/if}
                                        {:else}
                                            <i class="fas fa-sort text-gray-400"></i>
                                        {/if}
                                    </span>
                                {/if}
                            </div>
                        </th>
                    {/each}
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
                {#if loadingData}
                    <tr>
                        <td colspan={columns.length} class="px-4 py-8 text-center">
                            <div class="flex justify-center items-center space-x-2">
                                <i class="fas fa-spinner fa-spin text-primary-600 text-xl"></i>
                                <span class="text-gray-600">Loading...</span>
                            </div>
                        </td>
                    </tr>
                {:else if data.length > 0}
                    {#each data as row}
                        <tr class="hover:bg-gray-50 transition-colors">
                            {#each columns as column}
                                <td class="px-4 py-3 text-sm {column.className || ''} {column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''}">
                                    {#if column.type === 'actions'}
                                        <TableAction 
                                            itemId={row.id}
                                            editRoute={editRoute}
                                            {actionLabels}
                                            canEdit={column.actions?.edit !== false}
                                            canDelete={column.actions?.delete !== false}
                                            canView={column.actions?.view === true}
                                            on:delete={() => handleDelete(row.id)}
                                            on:view={() => handleView(row.id)}
                                        />
                                    {:else}
                                        <TableCell 
                                            value={getCellValue(row, column)}
                                            type={column.type}
                                            row={row}
                                            badgeVariants={column.badgeVariants}
                                        />
                                    {/if}
                                </td>
                            {/each}
                        </tr>
                    {/each}
                {:else}
                    <tr>
                        <td colspan={columns.length} class="px-4 py-12 text-center">
                            <div class="flex flex-col items-center text-gray-400">
                                <i class="fas fa-inbox text-4xl mb-3"></i>
                                <p class="text-lg font-medium">{emptyMessage}</p>
                                <p class="text-sm mt-1">Try adjusting your search or filters</p>
                            </div>
                        </td>
                    </tr>
                {/if}
            </tbody>
        </table>
    </div>
    
    <!-- Pagination and Per Page Selector -->
    {#if meta && meta.total > 0}
        <div class="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                <!-- Per Page Selector -->
                <div class="flex items-center gap-2 order-1 sm:order-none">
                    <span class="text-sm text-gray-600">Show</span>
                    <div class="w-[72px]">
                        <SelectDropdown 
                            bind:value={perPage}
                            options={perPageSelectOptions}
                            on:change={(e) => handlePerPageChange(e.detail || perPage)}
                        />
                    </div>
                    <span class="text-sm text-gray-600">entries</span>
                </div>
                
                <!-- Pagination Component -->
                <Pagination 
                    {meta} 
                    {links} 
                    on:pageChange={(e) => handlePageChange(e.detail)}
                />
            </div>
        </div>
    {/if}
</div>

