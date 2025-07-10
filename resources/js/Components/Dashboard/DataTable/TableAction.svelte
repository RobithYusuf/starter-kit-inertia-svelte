<script>
    import { createEventDispatcher } from 'svelte';
    import { Link } from '@inertiajs/svelte';
    
    export let itemId;
    export let editRoute = '';
    export let actionLabels = { edit: 'Edit', delete: 'Delete' };
    export let canEdit = true;
    export let canDelete = true;
    
    const dispatch = createEventDispatcher();
    
    function handleDelete() {
        dispatch('delete');
    }
</script>

<div class="flex items-center justify-end space-x-2">
    {#if canEdit && editRoute}
        <Link 
            href="{editRoute}/{itemId}/edit"
            class="inline-flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            title={actionLabels.edit}
        >
            <i class="fas fa-edit text-sm"></i>
        </Link>
    {/if}
    
    {#if canDelete}
        <button
            on:click={handleDelete}
            class="inline-flex items-center justify-center w-8 h-8 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            title={actionLabels.delete}
        >
            <i class="fas fa-trash text-sm"></i>
        </button>
    {/if}
</div>