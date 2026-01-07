<script>
    import { router, useForm } from '@inertiajs/svelte';
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    import PageHeader from '@/Components/Dashboard/PageHeader.svelte';
    import Card from '@/Components/UI/Card.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import TextInput from '@/Components/UI/Form/TextInput.svelte';
    import FormError from '@/Components/UI/Form/FormError.svelte';
    import { alertStore } from '@/Stores/alertStore.svelte.js';
    
    let { role, permissionGroups = {} } = $props();
    
    const form = useForm({
        name: role.name,
        permissions: role.permissions || [],
    });
    
    let isSuperAdmin = $derived(role.name === 'super-admin');
    
    let groupedPermissions = $derived(
        Object.entries(permissionGroups).map(([group, perms]) => ({
            name: group,
            label: group.charAt(0).toUpperCase() + group.slice(1),
            permissions: perms,
        }))
    );
    
    function togglePermission(permName) {
        if (isSuperAdmin) return;
        const index = $form.permissions.indexOf(permName);
        if (index > -1) {
            $form.permissions = $form.permissions.filter(p => p !== permName);
        } else {
            $form.permissions = [...$form.permissions, permName];
        }
    }
    
    function toggleGroup(groupPerms) {
        if (isSuperAdmin) return;
        const allSelected = groupPerms.every(p => $form.permissions.includes(p.name));
        if (allSelected) {
            $form.permissions = $form.permissions.filter(p => !groupPerms.map(gp => gp.name).includes(p));
        } else {
            const newPerms = groupPerms.map(p => p.name).filter(p => !$form.permissions.includes(p));
            $form.permissions = [...$form.permissions, ...newPerms];
        }
    }
    
    function isGroupSelected(groupPerms) {
        if (isSuperAdmin) return true;
        return groupPerms.every(p => $form.permissions.includes(p.name));
    }
    
    function isGroupPartial(groupPerms) {
        if (isSuperAdmin) return false;
        const selected = groupPerms.filter(p => $form.permissions.includes(p.name)).length;
        return selected > 0 && selected < groupPerms.length;
    }
    
    function handleSubmit() {
        $form.put(`/admin/roles/${role.id}`, {
            onSuccess: () => {
                alertStore.success('Role updated successfully');
            },
            onError: () => {
                alertStore.error('Failed to update role');
            },
        });
    }
</script>

<DashboardLayout>
    <PageHeader
        title="Edit Role"
        description="Update role permissions and settings"
        breadcrumbs={[
            { label: 'Dashboard', href: '/admin/dashboard', icon: 'fas fa-home' },
            { label: 'Roles', href: '/admin/roles' },
            { label: 'Edit' }
        ]}
    />
    
    {#if isSuperAdmin}
        <div class="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div class="flex">
                <i class="fas fa-exclamation-triangle text-yellow-400 mt-0.5"></i>
                <div class="ml-3">
                    <h3 class="text-sm font-medium text-yellow-800">Protected Role</h3>
                    <p class="mt-1 text-sm text-yellow-700">
                        Super Admin role has all permissions and cannot be modified.
                    </p>
                </div>
            </div>
        </div>
    {/if}
    
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
                        disabled={isSuperAdmin}
                        required
                    />
                    <p class="mt-2 text-sm text-gray-500">
                        Use lowercase letters and hyphens only
                    </p>
                    
                    <div class="mt-6 pt-6 border-t border-gray-200">
                        <h4 class="text-sm font-medium text-gray-900 mb-2">Statistics</h4>
                        <div class="space-y-2 text-sm text-gray-600">
                            <div class="flex justify-between">
                                <span>Permissions:</span>
                                <span class="font-medium">{isSuperAdmin ? 'All' : $form.permissions.length}</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            
            <!-- Permissions -->
            <div class="lg:col-span-2">
                <Card>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Permissions</h3>
                    <p class="text-sm text-gray-500 mb-6">
                        {#if isSuperAdmin}
                            Super Admin has access to all permissions
                        {:else}
                            Select the permissions this role should have
                        {/if}
                    </p>
                    
                    <FormError error={$form.errors.permissions} />
                    
                    <div class="space-y-6">
                        {#each groupedPermissions as group}
                            <div class="border border-gray-200 rounded-lg overflow-hidden {isSuperAdmin ? 'opacity-75' : ''}">
                                <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <label class="flex items-center {isSuperAdmin ? '' : 'cursor-pointer'}">
                                        <input
                                            type="checkbox"
                                            checked={isGroupSelected(group.permissions)}
                                            indeterminate={isGroupPartial(group.permissions)}
                                            onchange={() => toggleGroup(group.permissions)}
                                            disabled={isSuperAdmin}
                                            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50"
                                        />
                                        <span class="ml-3 text-sm font-medium text-gray-900 uppercase tracking-wider">
                                            {group.label}
                                        </span>
                                        <span class="ml-2 text-xs text-gray-500">
                                            {#if isSuperAdmin}
                                                (all)
                                            {:else}
                                                ({group.permissions.filter(p => $form.permissions.includes(p.name)).length}/{group.permissions.length})
                                            {/if}
                                        </span>
                                    </label>
                                </div>
                                <div class="px-4 py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {#each group.permissions as permission}
                                        <label class="flex items-center {isSuperAdmin ? '' : 'cursor-pointer hover:bg-gray-50'} p-2 rounded-lg transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={isSuperAdmin || $form.permissions.includes(permission.name)}
                                                onchange={() => togglePermission(permission.name)}
                                                disabled={isSuperAdmin}
                                                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50"
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
            {#if !isSuperAdmin}
                <Button type="submit" variant="primary" loading={$form.processing} icon="fas fa-save">
                    Update Role
                </Button>
            {/if}
        </div>
    </form>
</DashboardLayout>
