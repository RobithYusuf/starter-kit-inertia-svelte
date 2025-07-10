<script>
    import { useForm } from '@inertiajs/svelte';
    import { onMount } from 'svelte';
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    import PageHeader from '@/Components/Dashboard/PageHeader.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import IconInput from '@/Components/UI/Form/IconInput.svelte';
    import alert from '@/Stores/alertStore';
    
    export let user;
    
    let showPasswordFields = false;
    let showCurrentPassword = false;
    let showNewPassword = false;
    let showConfirmPassword = false;
    
    const profileForm = useForm({
        name: user.name || '',
        email: user.email || '',
    });
    
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    
    function updateProfile() {
        $profileForm.put('/profile', {
            onSuccess: () => {
                alert.success('Profile updated successfully');
            },
            preserveScroll: true,
        });
    }
    
    function updatePassword() {
        $passwordForm.put('/profile/password', {
            onSuccess: () => {
                alert.success('Password updated successfully');
                $passwordForm.reset();
                showPasswordFields = false;
            },
            preserveScroll: true,
        });
    }
    
    function togglePasswordFields() {
        showPasswordFields = !showPasswordFields;
        if (!showPasswordFields) {
            $passwordForm.reset();
        }
    }
</script>

<DashboardLayout>
    <PageHeader
        title="My Profile"
        description="Manage your account information and security"
        breadcrumbs={[
            { label: 'Dashboard', href: '/dashboard', icon: 'fas fa-home' },
            { label: 'Profile' }
        ]}
    />
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profile Card -->
        <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="text-center">
                    <div class="inline-flex items-center justify-center w-24 h-24 bg-orange-100 rounded-full mb-4">
                        <i class="fas fa-user text-4xl text-orange-600"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900">{user.name}</h3>
                    <p class="text-sm text-gray-500 mt-1">{user.email}</p>
                    <div class="mt-3">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <i class="fas fa-user-check mr-1"></i>
                            Member
                        </span>
                    </div>
                    <div class="mt-4 pt-4 border-t border-gray-200">
                        <p class="text-xs text-gray-500">Member since</p>
                        <p class="text-sm font-medium text-gray-900 mt-1">
                            {new Date(user.created_at).toLocaleDateString('en-US', { 
                                month: 'long', 
                                day: 'numeric', 
                                year: 'numeric' 
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Forms -->
        <div class="lg:col-span-2 space-y-6">
            <!-- Profile Information -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900">Profile Information</h3>
                    <p class="text-sm text-gray-500 mt-1">Update your account profile information and email address</p>
                </div>
                <form on:submit|preventDefault={updateProfile} class="p-6 space-y-4">
                    <IconInput
                        id="name"
                        label="Full Name"
                        type="text"
                        bind:value={$profileForm.name}
                        placeholder="Enter your full name"
                        required
                        icon="fas fa-user"
                        error={$profileForm.errors.name}
                    />
                    
                    <IconInput
                        id="email"
                        label="Email Address"
                        type="email"
                        bind:value={$profileForm.email}
                        placeholder="your@email.com"
                        required
                        icon="fas fa-envelope"
                        error={$profileForm.errors.email}
                    />
                    
                    <div class="flex justify-end">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={$profileForm.processing}
                            loading={$profileForm.processing}
                            icon={$profileForm.processing ? '' : 'fas fa-save'}
                        >
                            {$profileForm.processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
            
            <!-- Password Section -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900">Password</h3>
                        <p class="text-sm text-gray-500 mt-1">Ensure your account is using a strong password</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        on:click={togglePasswordFields}
                        icon={showPasswordFields ? 'fas fa-times' : 'fas fa-edit'}
                    >
                        {showPasswordFields ? 'Cancel' : 'Change'}
                    </Button>
                </div>
                
                {#if showPasswordFields}
                    <form on:submit|preventDefault={updatePassword} class="p-6 space-y-4">
                        <div class="relative">
                            <IconInput
                                id="current_password"
                                label="Current Password"
                                type={showCurrentPassword ? 'text' : 'password'}
                                bind:value={$passwordForm.current_password}
                                placeholder="Enter current password"
                                required
                                icon="fas fa-lock"
                                error={$passwordForm.errors.current_password}
                            />
                            <button
                                type="button"
                                on:click={() => showCurrentPassword = !showCurrentPassword}
                                class="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600"
                            >
                                <i class="fas fa-eye{showCurrentPassword ? '-slash' : ''}"></i>
                            </button>
                        </div>
                        
                        <div class="relative">
                            <IconInput
                                id="password"
                                label="New Password"
                                type={showNewPassword ? 'text' : 'password'}
                                bind:value={$passwordForm.password}
                                placeholder="Enter new password"
                                required
                                icon="fas fa-lock"
                                error={$passwordForm.errors.password}
                            />
                            <button
                                type="button"
                                on:click={() => showNewPassword = !showNewPassword}
                                class="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600"
                            >
                                <i class="fas fa-eye{showNewPassword ? '-slash' : ''}"></i>
                            </button>
                        </div>
                        
                        <div class="relative">
                            <IconInput
                                id="password_confirmation"
                                label="Confirm New Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                bind:value={$passwordForm.password_confirmation}
                                placeholder="Confirm new password"
                                required
                                icon="fas fa-lock"
                                error={$passwordForm.errors.password_confirmation}
                            />
                            <button
                                type="button"
                                on:click={() => showConfirmPassword = !showConfirmPassword}
                                class="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600"
                            >
                                <i class="fas fa-eye{showConfirmPassword ? '-slash' : ''}"></i>
                            </button>
                        </div>
                        
                        <div class="flex justify-end">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={$passwordForm.processing}
                                loading={$passwordForm.processing}
                                icon={$passwordForm.processing ? '' : 'fas fa-key'}
                            >
                                {$passwordForm.processing ? 'Updating...' : 'Update Password'}
                            </Button>
                        </div>
                    </form>
                {:else}
                    <div class="p-6">
                        <p class="text-sm text-gray-500">
                            <i class="fas fa-info-circle mr-2"></i>
                            Click the "Change" button to update your password
                        </p>
                    </div>
                {/if}
            </div>
            
            <!-- Security Info -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <i class="fas fa-shield-alt text-blue-600 mt-0.5"></i>
                    </div>
                    <div class="ml-3">
                        <h4 class="text-sm font-medium text-blue-900">Security Tips</h4>
                        <div class="mt-2 text-sm text-blue-700">
                            <ul class="list-disc list-inside space-y-1">
                                <li>Use a strong password with at least 8 characters</li>
                                <li>Include numbers, symbols, and mixed case letters</li>
                                <li>Don't reuse passwords from other websites</li>
                                <li>Enable two-factor authentication when available</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</DashboardLayout>