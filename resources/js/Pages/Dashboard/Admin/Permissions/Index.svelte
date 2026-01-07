<script>
    import { router, useForm } from '@inertiajs/svelte';
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    import PageHeader from '@/Components/Dashboard/PageHeader.svelte';
    import Card from '@/Components/UI/Card.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import Badge from '@/Components/UI/Badge.svelte';
    import ConfirmModal from '@/Components/UI/ConfirmModal.svelte';
    import IconInput from '@/Components/UI/Form/IconInput.svelte';
    import Dropdown from '@/Components/UI/Form/Dropdown.svelte';
    import Pagination from '@/Components/UI/Pagination.svelte';
    import { alertStore } from '@/Stores/alertStore.svelte.js';
    
    let { permissions, filters = {}, groups = [] } = $props();
    
    let confirmDelete = $state(false);
    let permissionToDelete = $state(null);
    let isProcessing = $state(false);
    let isLoading = $state(false);
    let debounceTimeout;
    
    const searchForm = useForm({
        search: filters.search || '',
        group: filters.group || '',
        per_page: filters.per_page || 15,
    });
    
    let processedPermissions = $derived({
        data: permissions?.data || [],
        meta: permissions ? {
            current_page: permissions.current_page,
            from: permissions.from,
            last_page: permissions.last_page,
            per_page: permissions.per_page,
            to: permissions.to,
            total: permissions.total
        } : {},
    });
    
    let groupOptions = $derived([
        { value: '', label: 'All Groups' },
        ...groups.map(g => ({ value: g, label: g.charAt(0).toUpperCase() + g.slice(1) }))
    ]);
    
    function handleSearch() {
        clearTimeout(debounceTimeout);
        isLoading = true;
        debounceTimeout = setTimeout(() => {
            $searchForm.get('/admin/permissions', {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => isLoading = false,
            });
        }, 300);
    }
    
    function goToPage(page) {
        isLoading = true;
        router.get('/admin/permissions', { ...$searchForm, page }, {
            preserveState: true,
            onFinish: () => isLoading = false,
        });
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
                alertStore.success(`Permission "${permissionToDelete.name}" deleted successfully`);
                confirmDelete = false;
                permissionToDelete = null;
            },
            onError: (errors) => {
                alertStore.error(errors.message || 'Failed to delete permission');
            },
            onFinish: () => isProcessing = false,
        });
    }
    
    function getGroupColor(group) {
        const colors = {
            user: 'primary',
            role: 'warning',
            settings: 'secondary',
            dashboard: 'info',
            components: 'success',
            profile: 'default',
            sessions: 'danger',
        };
        return colors[group] || 'secondary';
    }
</script>

<DashboardLayout>
    <PageHeader
        title="Permissions"
        description="Manage system permissions"
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
    
    <!-- Search and Filters -->
    <Card margin="mb-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <IconInput
                id="search"
                type="text"
                bind:value={$searchForm.search}
                placeholder="Search permissions..."
                icon="fas fa-search"
                oninput={handleSearch}
            />
            <Dropdown
                id="group"
                bind:value={$searchForm.group}
                options={groupOptions}
                onchange={handleSearch}
            />
        </div>
    </Card>
    
    <!-- Permissions Table -->
    <Card padding="p-0" className="overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Permission
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Group
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Roles
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                        </th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {#if isLoading}
                        <tr>
                            <td colspan="6" class="px-6 py-12 text-center">
                                <i class="fas fa-spinner fa-spin text-2xl text-gray-400"></i>
                                <p class="mt-2 text-sm text-gray-500">Loading...</p>
                            </td>
                        </tr>
                    {:else if processedPermissions.data.length === 0}
                        <tr>
                            <td colspan="6" class="px-6 py-12 text-center">
                                <i class="fas fa-key text-4xl text-gray-300"></i>
                                <p class="mt-2 text-sm text-gray-500">No permissions found</p>
                            </td>
                        </tr>
                    {:else}
                        {#each processedPermissions.data as permission}
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                            <i class="fas fa-key text-gray-500"></i>
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900 font-mono">
                                                {permission.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <Badge variant={getGroupColor(permission.group)} size="sm">
                                        {permission.group}
                                    </Badge>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {permission.action}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-gray-900">{permission.roles_count} roles</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {permission.created_at_formatted}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div class="flex items-center justify-end gap-2">
                                        <Button
                                            href="/admin/permissions/{permission.id}/edit"
                                            variant="secondary"
                                            size="sm"
                                            icon="fas fa-edit"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            icon="fas fa-trash"
                                            onclick={() => confirmDeletePermission(permission)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
        
        {#if processedPermissions.meta.last_page > 1}
            <div class="px-6 py-4 border-t border-gray-200">
                <Pagination
                    currentPage={processedPermissions.meta.current_page}
                    totalPages={processedPermissions.meta.last_page}
                    from={processedPermissions.meta.from}
                    to={processedPermissions.meta.to}
                    total={processedPermissions.meta.total}
                    onPageChange={goToPage}
                />
            </div>
        {/if}
    </Card>
    
    <ConfirmModal
        show={confirmDelete}
        title="Delete Permission"
        message={`Are you sure you want to delete the permission <strong>${permissionToDelete?.name || ''}</strong>? This will remove it from all roles.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmType="danger"
        isLoading={isProcessing}
        onconfirm={doDelete}
        oncancel={() => confirmDelete = false}
    />
</DashboardLayout>
