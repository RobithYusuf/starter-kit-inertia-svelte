<script>
    import { router, useForm } from '@inertiajs/svelte';
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    import PageHeader from '@/Components/Dashboard/PageHeader.svelte';
    import Card from '@/Components/UI/Card.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import TextInput from '@/Components/UI/Form/TextInput.svelte';
    import Checkbox from '@/Components/UI/Form/Checkbox.svelte';
    import FormError from '@/Components/UI/Form/FormError.svelte';
    import { alertStore } from '@/Stores/alertStore.svelte.js';
    
    let { permissionGroups = {} } = $props();
    
    const form = useForm({
        name: '',
        permissions: [],
    });
    
    let groupedPermissions = $derived(
        Object.entries(permissionGroups).map(([group, perms]) => ({
            name: group,
            label: group.charAt(0).toUpperCase() + group.slice(1),
            permissions: perms,
        }))
    );
    
    function togglePermission(permName) {
        const index = $form.permissions.indexOf(permName);
        if (index > -1) {
            $form.permissions = $form.permissions.filter(p => p !== permName);
        } else {
            $form.permissions = [...$form.permissions, permName];
        }
    }
    
    function toggleGroup(groupPerms) {
        const allSelected = groupPerms.every(p => $form.permissions.includes(p.name));
        if (allSelected) {
            $form.permissions = $form.permissions.filter(p => !groupPerms.map(gp => gp.name).includes(p));
        } else {
            const newPerms = groupPerms.map(p => p.name).filter(p => !$form.permissions.includes(p));
            $form.permissions = [...$form.permissions, ...newPerms];
        }
    }
    
    function isGroupSelected(groupPerms) {
        return groupPerms.every(p => $form.permissions.includes(p.name));
    }
    
    function isGroupPartial(groupPerms) {
        const selected = groupPerms.filter(p => $form.permissions.includes(p.name)).length;
        return selected > 0 && selected < groupPerms.length;
    }
    
    function handleSubmit() {
        $form.post('/admin/roles', {
            onSuccess: () => {
                alertStore.success('Role created successfully');
            },
            onError: () => {
                alertStore.error('Failed to create role');
            },
        });
    }
</script>

<DashboardLayout>
    <PageHeader
        title="Create Role"
        description="Create a new role with specific permissions"
        breadcrumbs={[
            { label: 'Dashboard', href: '/admin/dashboard', icon: 'fas fa-home' },
            { label: 'Roles', href: '/admin/roles' },
            { label: 'Create' }
        ]}
    />
    
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Role Name -->
            <div class="lg:col-span-1">
                <Card>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Role Information</h3>
                    <TextInput
                        id="name"
                        label="Role Name"
                        bind:value={$form.name}
                        placeholder="e.g., editor, moderator"
                        error={$form.errors.name}
                        required
                    />
                    <p class="mt-2 text-sm text-gray-500">
                        Use lowercase letters and hyphens only (e.g., content-editor)
                    </p>
                </Card>
            </div>
            
            <!-- Permissions -->
            <div class="lg:col-span-2">
                <Card>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Permissions</h3>
                    <p class="text-sm text-gray-500 mb-6">Select the permissions this role should have</p>
                    
                    <FormError error={$form.errors.permissions} />
                    
                    <div class="space-y-6">
                        {#each groupedPermissions as group}
                            <div class="border border-gray-200 rounded-lg overflow-hidden">
                                <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <label class="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={isGroupSelected(group.permissions)}
                                            indeterminate={isGroupPartial(group.permissions)}
                                            onchange={() => toggleGroup(group.permissions)}
                                            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        />
                                        <span class="ml-3 text-sm font-medium text-gray-900 uppercase tracking-wider">
                                            {group.label}
                                        </span>
                                        <span class="ml-2 text-xs text-gray-500">
                                            ({group.permissions.filter(p => $form.permissions.includes(p.name)).length}/{group.permissions.length})
                                        </span>
                                    </label>
                                </div>
                                <div class="px-4 py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {#each group.permissions as permission}
                                        <label class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={$form.permissions.includes(permission.name)}
                                                onchange={() => togglePermission(permission.name)}
                                                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                            />
                                            <span class="ml-3 text-sm text-gray-700">
                                                {permission.name.split('.')[1] || permission.name}
                                            </span>
                                        </label>
                                    {/each}
                                </div>
                            </div>
                        {/each}
                    </div>
                </Card>
            </div>
        </div>
        
        <!-- Actions -->
        <div class="mt-6 flex items-center justify-end gap-3">
            <Button href="/admin/roles" variant="secondary">
                Cancel
            </Button>
            <Button type="submit" variant="primary" loading={$form.processing} icon="fas fa-save">
                Create Role
            </Button>
        </div>
    </form>
</DashboardLayout>
