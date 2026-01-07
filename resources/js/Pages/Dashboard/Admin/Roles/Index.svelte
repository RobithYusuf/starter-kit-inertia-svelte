<script>
    import { router, useForm } from '@inertiajs/svelte';
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    import PageHeader from '@/Components/Dashboard/PageHeader.svelte';
    import Card from '@/Components/UI/Card.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import Badge from '@/Components/UI/Badge.svelte';
    import ConfirmModal from '@/Components/UI/ConfirmModal.svelte';
    import IconInput from '@/Components/UI/Form/IconInput.svelte';
    import Pagination from '@/Components/UI/Pagination.svelte';
    import { alertStore } from '@/Stores/alertStore.svelte.js';
    
    let { roles, filters = {} } = $props();
    
    let confirmDelete = $state(false);
    let roleToDelete = $state(null);
    let isProcessing = $state(false);
    let isLoading = $state(false);
    let debounceTimeout;
    
    const searchForm = useForm({
        search: filters.search || '',
        per_page: filters.per_page || 10,
    });
    
    let processedRoles = $derived({
        data: roles?.data || [],
        meta: roles ? {
            current_page: roles.current_page,
            from: roles.from,
            last_page: roles.last_page,
            per_page: roles.per_page,
            to: roles.to,
            total: roles.total
        } : {},
    });
    
    function handleSearch() {
        clearTimeout(debounceTimeout);
        isLoading = true;
        debounceTimeout = setTimeout(() => {
            $searchForm.get('/admin/roles', {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => isLoading = false,
            });
        }, 300);
    }
    
    function goToPage(page) {
        isLoading = true;
        router.get('/admin/roles', { ...$searchForm, page }, {
            preserveState: true,
            onFinish: () => isLoading = false,
        });
    }
    
    function confirmDeleteRole(role) {
        roleToDelete = role;
        confirmDelete = true;
    }
    
    function doDelete() {
        if (!roleToDelete) return;
        isProcessing = true;
        router.delete(`/admin/roles/${roleToDelete.id}`, {
            onSuccess: () => {
                alertStore.success(`Role "${roleToDelete.name}" deleted successfully`);
                confirmDelete = false;
                roleToDelete = null;
            },
            onError: (errors) => {
                alertStore.error(errors.message || 'Failed to delete role');
            },
            onFinish: () => isProcessing = false,
        });
    }
    
    function isProtectedRole(name) {
        return ['super-admin', 'admin', 'member'].includes(name);
    }
</script>

<DashboardLayout>
    <PageHeader
        title="Roles"
        description="Manage user roles and their permissions"
        breadcrumbs={[
            { label: 'Dashboard', href: '/admin/dashboard', icon: 'fas fa-home' },
            { label: 'Roles' }
        ]}
        actions={[
            { 
                type: 'link', 
                href: '/admin/roles/create', 
                label: 'Add Role', 
                icon: 'fas fa-plus',
                variant: 'primary'
            }
        ]}
    />
    
    <!-- Search -->
    <Card margin="mb-4">
        <div class="max-w-md">
            <IconInput
                id="search"
                type="text"
                bind:value={$searchForm.search}
                placeholder="Search roles..."
                icon="fas fa-search"
                oninput={handleSearch}
            />
        </div>
    </Card>
    
    <!-- Roles Table -->
    <Card padding="p-0" className="overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role Name
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Permissions
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Users
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
                            <td colspan="5" class="px-6 py-12 text-center">
                                <i class="fas fa-spinner fa-spin text-2xl text-gray-400"></i>
                                <p class="mt-2 text-sm text-gray-500">Loading...</p>
                            </td>
                        </tr>
                    {:else if processedRoles.data.length === 0}
                        <tr>
                            <td colspan="5" class="px-6 py-12 text-center">
                                <i class="fas fa-shield-alt text-4xl text-gray-300"></i>
                                <p class="mt-2 text-sm text-gray-500">No roles found</p>
                            </td>
                        </tr>
                    {:else}
                        {#each processedRoles.data as role}
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                            <i class="fas fa-user-tag text-primary-600"></i>
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900 flex items-center gap-2">
                                                {role.name}
                                                {#if isProtectedRole(role.name)}
                                                    <Badge variant="secondary" size="sm">System</Badge>
                                                {/if}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex flex-wrap gap-1 max-w-xs">
                                        {#if role.name === 'super-admin'}
                                            <Badge variant="success" size="sm">All Permissions</Badge>
                                        {:else if role.permissions_count > 3}
                                            <Badge variant="info" size="sm">{role.permissions_count} permissions</Badge>
                                        {:else}
                                            {#each role.permissions_list.slice(0, 3) as permission}
                                                <Badge variant="secondary" size="sm">{permission}</Badge>
                                            {/each}
                                        {/if}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-gray-900">{role.users_count} users</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {role.created_at_formatted}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div class="flex items-center justify-end gap-2">
                                        <Button
                                            href="/admin/roles/{role.id}/edit"
                                            variant="secondary"
                                            size="sm"
                                            icon="fas fa-edit"
                                        >
                                            Edit
                                        </Button>
                                        {#if !isProtectedRole(role.name)}
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                icon="fas fa-trash"
                                                onclick={() => confirmDeleteRole(role)}
                                            >
                                                Delete
                                            </Button>
                                        {/if}
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
        
        {#if processedRoles.meta.last_page > 1}
            <div class="px-6 py-4 border-t border-gray-200">
                <Pagination
                    currentPage={processedRoles.meta.current_page}
                    totalPages={processedRoles.meta.last_page}
                    from={processedRoles.meta.from}
                    to={processedRoles.meta.to}
                    total={processedRoles.meta.total}
                    onPageChange={goToPage}
                />
            </div>
        {/if}
    </Card>
    
    <ConfirmModal
        show={confirmDelete}
        title="Delete Role"
        message={`Are you sure you want to delete the role <strong>${roleToDelete?.name || ''}</strong>? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmType="danger"
        isLoading={isProcessing}
        onconfirm={doDelete}
        oncancel={() => confirmDelete = false}
    />
</DashboardLayout>
