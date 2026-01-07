<script>
    import { router, useForm } from '@inertiajs/svelte';
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    import PageHeader from '@/Components/Dashboard/PageHeader.svelte';
    import Card from '@/Components/UI/Card.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import TextInput from '@/Components/UI/Form/TextInput.svelte';
    import Dropdown from '@/Components/UI/Form/Dropdown.svelte';
    import Checkbox from '@/Components/UI/Form/Checkbox.svelte';
    import FormError from '@/Components/UI/Form/FormError.svelte';
    import { alertStore } from '@/Stores/alertStore.svelte.js';
    
    let { groups = [], roles = [] } = $props();
    
    let group = $state('');
    let action = $state('');
    
    const form = useForm({
        name: '',
        roles: [],
    });
    
    let suggestedActions = ['view', 'create', 'edit', 'delete', 'manage', 'export', 'import'];
    
    let groupOptions = $derived([
        { value: '', label: 'Select or type new...' },
        ...groups.map(g => ({ value: g, label: g }))
    ]);
    
    // Update form name when group or action changes
    $effect(() => {
        if (group && action) {
            $form.name = `${group}.${action}`;
        }
    });
    
    function toggleRole(roleName) {
        const index = $form.roles.indexOf(roleName);
        if (index > -1) {
            $form.roles = $form.roles.filter(r => r !== roleName);
        } else {
            $form.roles = [...$form.roles, roleName];
        }
    }
    
    function handleSubmit() {
        $form.post('/admin/permissions', {
            onSuccess: () => {
                alertStore.success('Permission created successfully');
            },
            onError: () => {
                alertStore.error('Failed to create permission');
            },
        });
    }
</script>

<DashboardLayout>
    <PageHeader
        title="Create Permission"
        description="Create a new permission and assign it to roles"
        breadcrumbs={[
            { label: 'Dashboard', href: '/admin/dashboard', icon: 'fas fa-home' },
            { label: 'Permissions', href: '/admin/permissions' },
            { label: 'Create' }
        ]}
    />
    
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Permission Details -->
            <Card>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Permission Details</h3>
                
                <div class="space-y-4">
                    <div>
                        <label for="group" class="block text-sm font-medium text-gray-700 mb-1">
                            Module / Group
                        </label>
                        <input
                            type="text"
                            id="group"
                            bind:value={group}
                            list="group-suggestions"
                            placeholder="e.g., user, post, report"
                            class="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                        <datalist id="group-suggestions">
                            {#each groups as g}
                                <option value={g}></option>
                            {/each}
                        </datalist>
                        <p class="mt-1 text-xs text-gray-500">The module this permission belongs to</p>
                    </div>
                    
                    <div>
                        <label for="action" class="block text-sm font-medium text-gray-700 mb-1">
                            Action
                        </label>
                        <input
                            type="text"
                            id="action"
                            bind:value={action}
                            list="action-suggestions"
                            placeholder="e.g., view, create, edit, delete"
                            class="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                        <datalist id="action-suggestions">
                            {#each suggestedActions as a}
                                <option value={a}></option>
                            {/each}
                        </datalist>
                        <p class="mt-1 text-xs text-gray-500">The action this permission allows</p>
                    </div>
                    
                    <div class="pt-4 border-t border-gray-200">
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Permission Name (Generated)
                        </label>
                        <div class="flex items-center">
                            <code class="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-sm font-mono text-gray-800">
                                {$form.name || 'module.action'}
                            </code>
                        </div>
                        <FormError error={$form.errors.name} />
                    </div>
                </div>
            </Card>
            
            <!-- Assign to Roles -->
            <Card>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Assign to Roles</h3>
                <p class="text-sm text-gray-500 mb-4">
                    Select which roles should have this permission. Super Admin will always have all permissions.
                </p>
                
                <FormError error={$form.errors.roles} />
                
                <div class="space-y-3">
                    {#each roles as roleName}
                        <label class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors {$form.roles.includes(roleName) ? 'border-primary-500 bg-primary-50' : ''}">
                            <input
                                type="checkbox"
                                checked={roleName === 'super-admin' || $form.roles.includes(roleName)}
                                disabled={roleName === 'super-admin'}
                                onchange={() => toggleRole(roleName)}
                                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50"
                            />
                            <div class="ml-3">
                                <span class="text-sm font-medium text-gray-900">{roleName}</span>
                                {#if roleName === 'super-admin'}
                                    <span class="ml-2 text-xs text-gray-500">(always has all permissions)</span>
                                {/if}
                            </div>
                        </label>
                    {/each}
                </div>
            </Card>
        </div>
        
        <!-- Actions -->
        <div class="mt-6 flex items-center justify-end gap-3">
            <Button href="/admin/permissions" variant="secondary">
                Cancel
            </Button>
            <Button 
                type="submit" 
                variant="primary" 
                loading={$form.processing} 
                icon="fas fa-save"
                disabled={!group || !action}
            >
                Create Permission
            </Button>
        </div>
    </form>
</DashboardLayout>
