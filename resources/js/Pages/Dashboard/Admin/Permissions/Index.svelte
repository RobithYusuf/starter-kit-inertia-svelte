<script>
    import { router } from '@inertiajs/svelte';
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    import PageHeader from '@/Components/Dashboard/PageHeader.svelte';
    import Card from '@/Components/UI/Card.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import Badge from '@/Components/UI/Badge.svelte';
    import ConfirmModal from '@/Components/UI/ConfirmModal.svelte';
    import { alertStore } from '@/Stores/alertStore.svelte.js';
    
    let { roles = [], permissionGroups: initialGroups = [] } = $props();
    
    // Local state copy for reactivity
    let permissionGroups = $state(JSON.parse(JSON.stringify(initialGroups)));
    
    let confirmDelete = $state(false);
    let permissionToDelete = $state(null);
    let isProcessing = $state(false);
    let loadingCells = $state(new Set());
    let expandedGroups = $state(new Set(initialGroups.map(g => g.name)));
    
    function toggleGroup(groupName) {
        if (expandedGroups.has(groupName)) {
            expandedGroups.delete(groupName);
        } else {
            expandedGroups.add(groupName);
        }
        expandedGroups = new Set(expandedGroups);
    }
    
    async function togglePermission(permissionId, roleId, roleName, currentValue) {
        if (roleName === 'super-admin') return;
        
        const cellKey = `${permissionId}-${roleId}`;
        loadingCells.add(cellKey);
        loadingCells = new Set(loadingCells);
        
        try {
            const response = await fetch('/admin/permissions/toggle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    permission_id: permissionId,
                    role_id: roleId,
                    enabled: !currentValue,
                }),
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Update local state - find and update the specific permission
                permissionGroups = permissionGroups.map(group => ({
                    ...group,
                    permissions: group.permissions.map(perm => {
                        if (perm.id === permissionId) {
                            return {
                                ...perm,
                                roles: {
                                    ...perm.roles,
                                    [roleName]: !currentValue
                                }
                            };
                        }
                        return perm;
                    })
                }));
                alertStore.success(data.message);
            } else {
                alertStore.error(data.message || 'Failed to update permission');
            }
        } catch (error) {
            alertStore.error('Failed to update permission');
        } finally {
            loadingCells.delete(cellKey);
            loadingCells = new Set(loadingCells);
        }
    }
    
    function confirmDeletePermission(permission) {
        permissionToDelete = permission;
        confirmDelete = true;
    }
    
    function doDelete() {
        if (!permissionToDelete) return;
        isProcessing = true;
        router.delete(`/admin/permissions/${permissionToDelete.id}`, {
            onSuccess: () => {
                alertStore.success(`Permission "${permissionToDelete.name}" deleted`);
                confirmDelete = false;
                permissionToDelete = null;
            },
            onError: () => {
                alertStore.error('Failed to delete permission');
            },
            onFinish: () => isProcessing = false,
        });
    }
    
    function getGroupColor(group) {
        const colors = {
            user: 'bg-blue-500',
            role: 'bg-purple-500',
            settings: 'bg-gray-500',
            dashboard: 'bg-green-500',
            components: 'bg-orange-500',
            profile: 'bg-cyan-500',
            sessions: 'bg-red-500',
        };
        return colors[group] || 'bg-gray-500';
    }
</script>

<DashboardLayout>
    <PageHeader
        title="Permission Matrix"
        description="Manage permissions for all roles in one place"
        breadcrumbs={[
            { label: 'Dashboard', href: '/admin/dashboard', icon: 'fas fa-home' },
            { label: 'Permissions' }
        ]}
        actions={[
            { 
                type: 'link', 
                href: '/admin/permissions/create', 
                label: 'Add Permission', 
                icon: 'fas fa-plus',
                variant: 'primary'
            }
        ]}
    />
    
    <!-- Stats -->
    <div class="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <i class="fas fa-key text-primary-600"></i>
                </div>
                <div>
                    <p class="text-2xl font-bold text-gray-900">
                        {permissionGroups.reduce((acc, g) => acc + g.permissions.length, 0)}
                    </p>
                    <p class="text-sm text-gray-500">Total Permissions</p>
                </div>
            </div>
        </Card>
        <Card>
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <i class="fas fa-user-tag text-purple-600"></i>
                </div>
                <div>
                    <p class="text-2xl font-bold text-gray-900">{roles.length}</p>
                    <p class="text-sm text-gray-500">Roles</p>
                </div>
            </div>
        </Card>
        <Card>
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <i class="fas fa-layer-group text-green-600"></i>
                </div>
                <div>
                    <p class="text-2xl font-bold text-gray-900">{permissionGroups.length}</p>
                    <p class="text-sm text-gray-500">Permission Groups</p>
                </div>
            </div>
        </Card>
    </div>
    
    <!-- Legend -->
    <Card margin="mb-4">
        <div class="flex flex-wrap items-center gap-4 text-sm">
            <span class="font-medium text-gray-700">Legend:</span>
            <div class="flex items-center gap-2">
                <div class="w-5 h-5 rounded bg-primary-600 flex items-center justify-center">
                    <i class="fas fa-check text-white text-xs"></i>
                </div>
                <span class="text-gray-600">Granted</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-5 h-5 rounded bg-gray-200 flex items-center justify-center">
                    <i class="fas fa-times text-gray-400 text-xs"></i>
                </div>
                <span class="text-gray-600">Not Granted</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-5 h-5 rounded bg-yellow-100 border border-yellow-300 flex items-center justify-center">
                    <i class="fas fa-lock text-yellow-600 text-xs"></i>
                </div>
                <span class="text-gray-600">Super Admin (Always All)</span>
            </div>
        </div>
    </Card>
    
    <!-- Permission Matrix -->
    <Card padding="p-0" className="overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead class="bg-gray-50 sticky top-0 z-10">
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px] sticky left-0 bg-gray-50 z-20">
                            Permission
                        </th>
                        {#each roles as role}
                            <th class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                                <div class="flex flex-col items-center gap-1">
                                    <span>{role.name}</span>
                                    {#if role.is_super_admin}
                                        <Badge variant="warning" size="sm">All</Badge>
                                    {/if}
                                </div>
                            </th>
                        {/each}
                        <th class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                            <i class="fas fa-trash text-gray-400"></i>
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {#each permissionGroups as group}
                        <!-- Group Header -->
                        <tr class="bg-gray-100">
                            <td 
                                colspan={roles.length + 2} 
                                class="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors sticky left-0"
                                onclick={() => toggleGroup(group.name)}
                            >
                                <div class="flex items-center gap-3">
                                    <i class="fas {expandedGroups.has(group.name) ? 'fa-chevron-down' : 'fa-chevron-right'} text-gray-400 w-4"></i>
                                    <div class="w-3 h-3 rounded-full {getGroupColor(group.name)}"></div>
                                    <span class="font-semibold text-gray-700 uppercase text-sm">{group.label}</span>
                                    <Badge variant="secondary" size="sm">{group.permissions.length}</Badge>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Permissions in Group -->
                        {#if expandedGroups.has(group.name)}
                            {#each group.permissions as permission}
                                <tr class="hover:bg-gray-50 transition-colors">
                                    <td class="px-4 py-3 whitespace-nowrap sticky left-0 bg-white">
                                        <div class="flex items-center gap-2">
                                            <code class="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                                                {permission.action}
                                            </code>
                                            <span class="text-xs text-gray-400 hidden sm:inline">
                                                {permission.name}
                                            </span>
                                        </div>
                                    </td>
                                    {#each roles as role}
                                        {@const cellKey = `${permission.id}-${role.id}`}
                                        {@const isEnabled = role.is_super_admin || permission.roles[role.name]}
                                        {@const isLoading = loadingCells.has(cellKey)}
                                        <td class="px-3 py-3 text-center">
                                            {#if role.is_super_admin}
                                                <div class="inline-flex items-center justify-center w-8 h-8 rounded bg-yellow-100 border border-yellow-300">
                                                    <i class="fas fa-lock text-yellow-600 text-sm"></i>
                                                </div>
                                            {:else}
                                                <button
                                                    onclick={() => togglePermission(permission.id, role.id, role.name, permission.roles[role.name])}
                                                    disabled={isLoading}
                                                    class="inline-flex items-center justify-center w-8 h-8 rounded transition-all duration-200 {isEnabled 
                                                        ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm' 
                                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-400'} {isLoading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}"
                                                    title={isEnabled ? 'Click to revoke' : 'Click to grant'}
                                                >
                                                    {#if isLoading}
                                                        <i class="fas fa-spinner fa-spin text-sm"></i>
                                                    {:else if isEnabled}
                                                        <i class="fas fa-check text-sm"></i>
                                                    {:else}
                                                        <i class="fas fa-times text-sm"></i>
                                                    {/if}
                                                </button>
                                            {/if}
                                        </td>
                                    {/each}
                                    <td class="px-3 py-3 text-center">
                                        <button
                                            onclick={() => confirmDeletePermission(permission)}
                                            class="inline-flex items-center justify-center w-8 h-8 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                            title="Delete permission"
                                        >
                                            <i class="fas fa-trash text-sm"></i>
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                        {/if}
                    {/each}
                </tbody>
            </table>
        </div>
        
        {#if permissionGroups.length === 0}
            <div class="px-6 py-12 text-center">
                <i class="fas fa-key text-4xl text-gray-300"></i>
                <p class="mt-2 text-sm text-gray-500">No permissions found</p>
                <Button href="/admin/permissions/create" variant="primary" size="sm" class="mt-4">
                    Add First Permission
                </Button>
            </div>
        {/if}
    </Card>
    
    <ConfirmModal
        show={confirmDelete}
        title="Delete Permission"
        message={`Are you sure you want to delete <strong>${permissionToDelete?.name || ''}</strong>? This will remove it from all roles.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmType="danger"
        isLoading={isProcessing}
        onconfirm={doDelete}
        oncancel={() => confirmDelete = false}
    />
</DashboardLayout>

<style>
    table {
        border-collapse: separate;
        border-spacing: 0;
    }
    
    th.sticky, td.sticky {
        position: sticky;
        left: 0;
    }
    
    /* Shadow for sticky column */
    td.sticky::after {
        content: '';
        position: absolute;
        top: 0;
        right: -8px;
        bottom: 0;
        width: 8px;
        background: linear-gradient(to right, rgba(0,0,0,0.05), transparent);
        pointer-events: none;
    }
</style>
