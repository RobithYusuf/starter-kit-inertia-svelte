<script>
    import { createEventDispatcher } from 'svelte';
    import { Link } from '@inertiajs/svelte';
    
    export let itemId;
    export let editRoute = '';
    export let actionLabels = { edit: 'Edit', delete: 'Delete', view: 'View' };
    export let canEdit = true;
    export let canDelete = true;
    export let canView = false;
    export let customActions = []; // Array of { icon, label, color, event }
    
    const dispatch = createEventDispatcher();
    
    function handleDelete() {
        dispatch('delete');
    }
    
    function handleView() {
        dispatch('view');
    }
    
    function handleCustomAction(event) {
        dispatch('custom', event);
    }
</script>

<div class="flex items-center justify-end space-x-2">
    {#if canView}
        <button
            on:click={handleView}
            class="inline-flex items-center justify-center w-8 h-8 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            style="color: var(--theme-primary-600)"
            title={actionLabels.view}
        >
            <i class="fas fa-eye text-sm"></i>
        </button>
    {/if}
    
    {#if canEdit && editRoute}
        <Link 
            href="{editRoute}/{itemId}/edit"
            class="inline-flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            title={actionLabels.edit}
        >
            <i class="fas fa-edit text-sm"></i>
        </Link>
    {/if}
    
    {#each customActions as action}
        <button
            on:click={() => handleCustomAction(action.event)}
            class="inline-flex items-center justify-center w-8 h-8 bg-{action.color || 'gray'}-50 hover:bg-{action.color || 'gray'}-100 rounded-lg transition-colors"
            style={action.color ? `color: var(--color-${action.color}-600)` : ''}
            title={action.label}
        >
            <i class="{action.icon} text-sm"></i>
        </button>
    {/each}
    
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