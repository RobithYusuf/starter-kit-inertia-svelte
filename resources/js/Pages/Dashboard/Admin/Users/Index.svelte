<script>
    import { Link, useForm, router } from '@inertiajs/svelte';
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    import PageHeader from '@/Components/Dashboard/PageHeader.svelte';
    import DataTable from '@/Components/Dashboard/DataTable/DataTable.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import ConfirmModal from '@/Components/UI/ConfirmModal.svelte';
    import Modal from '@/Components/UI/Modal.svelte';
    import IconInput from '@/Components/UI/Form/IconInput.svelte';
    import Dropdown from '@/Components/UI/Form/Dropdown.svelte';
    import UserAvatar from '@/Components/UI/UserAvatar.svelte';
    import Card from '@/Components/UI/Card.svelte';
    import { alertStore } from '@/Stores/alertStore.svelte.js';
    
    // Svelte 5: Using $props()
    let { 
        users,
        filters = {
            search: '',
            role: '',
            sort_field: 'created_at',
            sort_order: 'desc',
            page: 1,
            per_page: 10,
        }
    } = $props();
    
    let confirmDelete = $state(false);
    let userToDelete = $state(null);
    let isProcessing = $state(false);
    let isLoading = $state(false);
    let debounceTimeout;
    let initialLoadComplete = $state(false);
    
    // Modal states
    let showUserModal = $state(false);
    let selectedUser = $state(null);
    
    // Track previous values
    let prevSearch = $state('');
    let prevRole = $state('');
    
    const searchForm = useForm({
        search: filters.search || '',
        role: filters.role || '',
        sort_field: filters.sort_field || 'created_at',
        sort_order: filters.sort_order || 'desc',
        page: filters.page || 1,
        per_page: parseInt(filters.per_page) || 10,
    });
    
    // Process users data - Laravel sends pagination data at root level
    let processedUsers = $derived({
        data: users?.data || [],
        meta: users ? {
            current_page: users.current_page,
            from: users.from,
            last_page: users.last_page,
            per_page: users.per_page,
            to: users.to,
            total: users.total
        } : {},
        links: users?.links || []
    });
    
    
    // Add index numbers to users
    let indexedUsers = $derived(processedUsers?.data?.length > 0 && processedUsers.meta?.current_page
        ? processedUsers.data.map((user, index) => {
            const startNumber = (processedUsers.meta.current_page - 1) * processedUsers.meta.per_page || 0;
            return { ...user, index: startNumber + index + 1 };
          })
        : []);
    
    
    const columns = [
        {
            key: 'index',
            label: '#',
            sortable: false,
            priority: 1,
            align: 'center',
            className: 'w-12',
            type: 'index'
        },
        {
            key: 'name',
            label: 'Name',
            sortable: true,
            type: 'user',
            width: '200px',
            priority: 1,
        },
        {
            key: 'email',
            label: 'Email',
            sortable: true,
            width: '200px',
            priority: 1,
        },
        {
            key: 'role',
            label: 'Role',
            sortable: true,
            width: '100px',
            priority: 2,
            type: 'badge',
            badgeVariants: {
                admin: 'warning',
                member: 'info'
            }
        },
        {
            key: 'is_active',
            label: 'Status',
            sortable: true,
            width: '100px',
            priority: 2,
            type: 'status'
        },
        {
            key: 'created_at_formatted',
            label: 'Joined',
            sortable: true,
            width: '150px',
            priority: 3,
            type: 'date'
        },
        {
            key: 'actions',
            label: 'Actions',
            align: 'right',
            width: '100px',
            priority: 1,
            type: 'actions',
            actions: {
                view: true,
                edit: true,
                delete: true
            }
        }
    ];
    
    // Handle search with debounce - using $effect
    $effect(() => {
        if (initialLoadComplete && ($searchForm.search !== prevSearch || $searchForm.role !== prevRole)) {
            clearTimeout(debounceTimeout);
            isLoading = true;
            
            debounceTimeout = setTimeout(() => {
                handleSearch();
                prevSearch = $searchForm.search;
                prevRole = $searchForm.role;
            }, 500);
        }
    });
    
    function handleSearch() {
        $searchForm.get(route('admin.users.index'), {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                isLoading = false;
            }
        });
    }
    
    function handleSort(data) {
        const { field, order } = data;
        $searchForm.sort_field = field;
        $searchForm.sort_order = order;
        // Mempertahankan halaman saat ini
        isLoading = true;
        handleSearch();
    }
    
    function goToPage(pageNumber) {
        $searchForm.page = pageNumber;
        isLoading = true;
        $searchForm.get(route('admin.users.index'), {
            preserveState: true,
            data: {
                search: $searchForm.search,
                role: $searchForm.role,
                sort_field: $searchForm.sort_field,
                sort_order: $searchForm.sort_order,
                page: pageNumber,
                per_page: $searchForm.per_page,
            },
            onFinish: () => {
                isLoading = false;
            }
        });
    }
    
    function handlePerPageChange(newPerPage) {
        $searchForm.per_page = newPerPage;
        $searchForm.page = 1; // Reset to first page when changing per page
        isLoading = true;
        handleSearch();
    }
    
    function confirmDeleteUser(userId) {
        userToDelete = indexedUsers.find(user => user.id === userId);
        if (userToDelete) {
            confirmDelete = true;
        }
    }
    
    function doDelete() {
        if (userToDelete) {
            isProcessing = true;
            router.delete(route('admin.users.destroy', userToDelete.id), {
                onSuccess: () => {
                    alertStore.success(`User ${userToDelete.name} has been deleted`);
                    confirmDelete = false;
                    userToDelete = null;
                },
                onError: (errors) => {
                    alertStore.error(`Failed to delete user: ${errors.message || 'An error occurred'}`);
                },
                onFinish: () => {
                    isProcessing = false;
                },
                preserveScroll: true,
            });
        }
    }
    
    function handleViewUser(userId) {
        selectedUser = indexedUsers.find(user => user.id === userId);
        if (selectedUser) {
            showUserModal = true;
        }
    }
    
    // Initialize on mount
    $effect(() => {
        // Set initial values without triggering reactivity
        prevSearch = filters.search || '';
        prevRole = filters.role || '';
        
        setTimeout(() => {
            initialLoadComplete = true;
        }, 50);
    });
</script>

<DashboardLayout>
    <PageHeader
        title="Users"
        description="Manage system users and their permissions"
        breadcrumbs={[
            { label: 'Dashboard', href: route('admin.dashboard'), icon: 'fas fa-home' },
            { label: 'Users' }
        ]}
        actions={[
            { 
                type: 'link', 
                href: route('admin.users.create'), 
                label: 'Add User', 
                icon: 'fas fa-plus',
                variant: 'primary'
            }
        ]}
    />
    
    <!-- Search and Filter Section -->
    <Card margin="mb-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <IconInput
                id="search"
                type="text"
                bind:value={$searchForm.search}
                placeholder="Search by name or email..."
                icon="fas fa-search"
            />
            <Dropdown
                id="role"
                bind:value={$searchForm.role}
                placeholder="Filter by role"
                options={[
                    { value: '', label: 'All Roles' },
                    { value: 'admin', label: 'Admin' },
                    { value: 'member', label: 'Member' }
                ]}
            />
        </div>
    </Card>
    
    <!-- Data Table -->
    <Card padding="p-0" className="overflow-hidden">
        <DataTable
            {columns}
            data={indexedUsers}
            meta={processedUsers.meta}
            links={processedUsers.links}
            editRoute="/admin/users"
            emptyMessage="No users found"
            loadingData={isLoading}
            currentSortField={$searchForm.sort_field}
            currentSortOrder={$searchForm.sort_order}
            perPage={$searchForm.per_page}
            onsort={handleSort}
            ondelete={confirmDeleteUser}
            onview={handleViewUser}
            onpage={goToPage}
            onperPageChange={handlePerPageChange}
            actionLabels={{ edit: 'Edit User', delete: 'Delete User', view: 'View User Details' }}
        />
    </Card>
    
    <!-- Delete Confirmation Modal -->
    <ConfirmModal
        show={confirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete user <strong>${userToDelete?.name || ''}</strong>? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmType="danger"
        isLoading={isProcessing}
        onconfirm={doDelete}
        oncancel={() => (confirmDelete = false)}
    />
    
    <!-- User Details Modal -->
    <Modal
        show={showUserModal}
        title="User Details"
        size="lg"
        onclose={() => (showUserModal = false)}
    >
        {#if selectedUser}
            <div class="space-y-6">
                <!-- User Header -->
                <div class="flex items-center space-x-4 pb-6 border-b border-gray-200">
                    <UserAvatar name={selectedUser.name} image={selectedUser.avatar} size="xl" />
                    <div>
                        <h3 class="text-xl font-semibold text-gray-900">{selectedUser.name}</h3>
                        <p class="text-sm text-gray-500">{selectedUser.email}</p>
                    </div>
                </div>
                
                <!-- User Information Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-sm font-medium text-gray-500 mb-1">Role</h4>
                        <div class="flex items-center space-x-2">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                {selectedUser.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                                {selectedUser.role}
                            </span>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="text-sm font-medium text-gray-500 mb-1">Status</h4>
                        <div class="flex items-center space-x-2">
                            <span class="flex items-center text-sm">
                                <span class="flex h-2 w-2 rounded-full mr-2
                                    {selectedUser.is_active ? 'bg-green-500' : 'bg-gray-400'}">
                                </span>
                                {selectedUser.is_active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="text-sm font-medium text-gray-500 mb-1">Joined</h4>
                        <p class="text-sm text-gray-900">{selectedUser.created_at_formatted}</p>
                    </div>
                    
                    <div>
                        <h4 class="text-sm font-medium text-gray-500 mb-1">Last Updated</h4>
                        <p class="text-sm text-gray-900">{selectedUser.updated_at_formatted || 'Never'}</p>
                    </div>
                    
                    {#if selectedUser.email_verified_at}
                        <div>
                            <h4 class="text-sm font-medium text-gray-500 mb-1">Email Verified</h4>
                            <p class="text-sm text-gray-900">{new Date(selectedUser.email_verified_at).toLocaleDateString()}</p>
                        </div>
                    {/if}
                </div>
                
                <!-- Additional Info -->
                {#if selectedUser.bio || selectedUser.phone || selectedUser.address}
                    <div class="pt-6 border-t border-gray-200 space-y-4">
                        {#if selectedUser.bio}
                            <div>
                                <h4 class="text-sm font-medium text-gray-500 mb-1">Bio</h4>
                                <p class="text-sm text-gray-900">{selectedUser.bio}</p>
                            </div>
                        {/if}
                        
                        {#if selectedUser.phone}
                            <div>
                                <h4 class="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                                <p class="text-sm text-gray-900">{selectedUser.phone}</p>
                            </div>
                        {/if}
                        
                        {#if selectedUser.address}
                            <div>
                                <h4 class="text-sm font-medium text-gray-500 mb-1">Address</h4>
                                <p class="text-sm text-gray-900">{selectedUser.address}</p>
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        {/if}
        
        {#snippet footer()}
            <Button 
                href="/admin/users/{selectedUser?.id}/edit"
                variant="primary"
                icon="fas fa-edit"
            >
                Edit User
            </Button>
            <Button 
                variant="secondary"
                onclick={() => (showUserModal = false)}
            >
                Close
            </Button>
        {/snippet}
    </Modal>
</DashboardLayout>

<style>
    :global(.pagination a) {
        cursor: pointer;
    }
    :global(th.w-8),
    :global(td.w-8) {
        width: 2.5rem !important;
        min-width: 2.5rem !important;
        max-width: 2.5rem !important;
        padding-left: 0.75rem !important;
        padding-right: 0.75rem !important;
    }
</style>