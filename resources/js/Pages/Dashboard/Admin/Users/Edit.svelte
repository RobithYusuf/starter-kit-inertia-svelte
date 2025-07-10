<script>
    import { useForm, Link } from '@inertiajs/svelte';
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    import PageHeader from '@/Components/Dashboard/PageHeader.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import IconInput from '@/Components/UI/Form/IconInput.svelte';
    import RadioOption from '@/Components/UI/Form/RadioOption.svelte';
    
    export let user;
    
    let processing = false;
    let passwordMatchError = '';
    let showPasswordError = false;
    
    const form = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        role: user.role,
        is_active: user.is_active,
    });
    
    function checkPasswordMatch() {
        if ($form.password && $form.password.length > 0) {
            return $form.password !== $form.password_confirmation ? 'Passwords do not match' : '';
        }
        return '';
    }
    
    function handleSubmit() {
        if ($form.password) {
            showPasswordError = true;
            passwordMatchError = checkPasswordMatch();
            
            if (passwordMatchError) {
                return;
            }
        }
        
        processing = true;
        $form.put(route('admin.users.update', user.id), {
            preserveScroll: true,
            onFinish: () => {
                processing = false;
            },
        });
    }
</script>

<DashboardLayout>
    <PageHeader
        title="Edit User"
        description="Update user information"
        breadcrumbs={[
            { label: 'Dashboard', href: route('admin.dashboard'), icon: 'fas fa-home' },
            { label: 'Users', href: route('admin.users.index') },
            { label: 'Edit' }
        ]}
    >
        <div slot="actions">
            <Button
                href={route('admin.users.index')}
                variant="secondary"
                size="md"
                icon="fas fa-arrow-left"
            >
                Back
            </Button>
        </div>
    </PageHeader>
    
    <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div class="p-5">
            <form on:submit|preventDefault={handleSubmit} class="space-y-4 w-full p-0 lg:p-2">
                <div class="mb-4">
                    <h3 class="text-lg font-medium text-gray-800">User Information</h3>
                    <p class="text-sm text-gray-500 mt-1 mb-2">Update the user details below</p>
                </div>
                
                <!-- Role Selection -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Role <span class="text-red-500">*</span>
                    </label>
                    <div class="grid grid-cols-2 gap-2">
                        <RadioOption
                            id="role-admin"
                            name="role"
                            value="admin"
                            bind:groupValue={$form.role}
                            title="Administrator"
                            description="Full system access"
                        />
                        <RadioOption
                            id="role-member"
                            name="role"
                            value="member"
                            bind:groupValue={$form.role}
                            title="Member"
                            description="Limited access"
                        />
                    </div>
                    {#if $form.errors.role}
                        <p class="mt-2 text-sm text-red-600">{$form.errors.role}</p>
                    {/if}
                </div>
                
                <!-- Name and Email -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <IconInput
                        id="name"
                        label="Full Name"
                        type="text"
                        bind:value={$form.name}
                        placeholder="Enter full name"
                        required
                        icon="fas fa-user"
                        error={$form.errors.name}
                    />
                    
                    <IconInput
                        id="email"
                        label="Email Address"
                        type="email"
                        bind:value={$form.email}
                        placeholder="name@example.com"
                        required
                        icon="fas fa-envelope"
                        error={$form.errors.email}
                    />
                </div>
                
                <!-- Password Section (Optional) -->
                <div class="mb-4 p-4 bg-yellow-50 rounded-lg">
                    <p class="text-sm text-yellow-800">
                        <i class="fas fa-info-circle mr-2"></i>
                        Leave password fields empty to keep the current password
                    </p>
                </div>
                
                <!-- Password Fields -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <IconInput
                        id="password"
                        label="New Password"
                        type="password"
                        bind:value={$form.password}
                        placeholder="Leave empty to keep current"
                        icon="fas fa-lock"
                        error={$form.errors.password}
                    />
                    
                    <IconInput
                        id="password_confirmation"
                        label="Confirm New Password"
                        type="password"
                        bind:value={$form.password_confirmation}
                        placeholder="Leave empty to keep current"
                        icon="fas fa-lock"
                        error={$form.errors.password_confirmation || (showPasswordError ? passwordMatchError : '')}
                    />
                </div>
                
                <!-- Status Selection -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Account Status
                    </label>
                    <div class="grid grid-cols-2 gap-2">
                        <RadioOption
                            id="status-active"
                            name="is_active"
                            value={true}
                            bind:groupValue={$form.is_active}
                            title="Active"
                            description="User can access"
                            variant="success"
                        />
                        <RadioOption
                            id="status-inactive"
                            name="is_active"
                            value={false}
                            bind:groupValue={$form.is_active}
                            title="Inactive"
                            description="Access disabled"
                            variant="danger"
                        />
                    </div>
                    {#if $form.errors.is_active}
                        <p class="mt-2 text-sm text-red-600">{$form.errors.is_active}</p>
                    {/if}
                </div>
                
                <!-- Form Actions -->
                <div class="pt-4 mt-2 border-t border-gray-200 flex justify-end gap-3">
                    <Button
                        href={route('admin.users.index')}
                        variant="secondary"
                        icon="fas fa-times"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={processing}
                        loading={processing}
                        icon={processing ? '' : 'fas fa-save'}
                    >
                        {processing ? 'Updating...' : 'Update'}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</DashboardLayout>