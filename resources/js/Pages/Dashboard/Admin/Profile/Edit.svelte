<script>
    import { useForm } from '@inertiajs/svelte';
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    import PageHeader from '@/Components/Dashboard/PageHeader.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import IconInput from '@/Components/UI/Form/IconInput.svelte';
    import alertStore from '@/Stores/alertStore.svelte.js';
    
    let { user, userRole = 'member' } = $props();
    
    let activeSection = $state('profile');
    let showCurrentPassword = $state(false);
    let showNewPassword = $state(false);
    let showConfirmPassword = $state(false);
    
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
        $profileForm.put('/admin/profile', {
            onSuccess: () => {
                alertStore.success('Profile updated successfully');
            },
            preserveScroll: true,
        });
    }
    
    function updatePassword() {
        $passwordForm.put('/admin/profile/password', {
            onSuccess: () => {
                alertStore.success('Password updated successfully');
                $passwordForm.reset();
            },
            preserveScroll: true,
        });
    }
    
    let initials = $derived(user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U');
    
    // Role badge colors
    let roleBadgeClass = $derived(
        userRole === 'super-admin' ? 'bg-red-100 text-red-700' : 
        userRole === 'admin' ? 'bg-purple-100 text-purple-700' : 
        'bg-green-100 text-green-700'
    );
    
    let roleLabel = $derived(
        userRole === 'super-admin' ? 'Super Admin' : 
        userRole === 'admin' ? 'Administrator' : 
        'Member'
    );
    
    const menuItems = [
        { id: 'profile', label: 'Profile', icon: 'fas fa-user' },
        { id: 'security', label: 'Security', icon: 'fas fa-shield-alt' },
    ];
</script>

<DashboardLayout>
    <PageHeader
        title="Account Settings"
        description="Manage your profile and security preferences"
        breadcrumbs={[
            { label: 'Dashboard', href: '/admin/dashboard', icon: 'fas fa-home' },
            { label: 'Settings' }
        ]}
    />
    
    <div class="flex flex-col lg:flex-row gap-6">
        <!-- Sidebar -->
        <div class="lg:w-64 flex-shrink-0">
            <!-- User Card -->
            <div class="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                <div class="flex items-center gap-3">
                    <div class="avatar-circle w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {initials}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="font-medium text-gray-900 truncate">{user.name}</p>
                        <p class="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                </div>
                <div class="mt-3 pt-3 border-t border-gray-100">
                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium {roleBadgeClass}">
                        <i class="fas fa-circle text-[6px]"></i>
                        {roleLabel}
                    </span>
                </div>
            </div>
            
            <!-- Navigation -->
            <nav class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {#each menuItems as item}
                    <button
                        onclick={() => activeSection = item.id}
                        class="nav-item w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-l-2"
                        class:active={activeSection === item.id}
                        class:border-transparent={activeSection !== item.id}
                        class:text-gray-600={activeSection !== item.id}
                        class:hover:bg-gray-50={activeSection !== item.id}
                    >
                        <i class="{item.icon} w-4 text-center nav-icon" class:active={activeSection === item.id} class:text-gray-400={activeSection !== item.id}></i>
                        <span class="font-medium text-sm">{item.label}</span>
                    </button>
                {/each}
            </nav>
            
            <!-- Quick Stats -->
            <div class="bg-white rounded-lg border border-gray-200 p-4 mt-4">
                <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Account Info</h4>
                <div class="space-y-3">
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-calendar text-gray-400 w-4"></i>
                        <span class="text-gray-600">Joined</span>
                        <span class="ml-auto font-medium text-gray-900">
                            {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-clock text-gray-400 w-4"></i>
                        <span class="text-gray-600">Last Update</span>
                        <span class="ml-auto font-medium text-gray-900">
                            {new Date(user.updated_at || user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-check-circle text-green-500 w-4"></i>
                        <span class="text-gray-600">Status</span>
                        <span class="ml-auto font-medium text-green-600">Active</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Main Content -->
        <div class="flex-1 min-w-0">
            {#if activeSection === 'profile'}
                <!-- Profile Section -->
                <div class="bg-white rounded-lg border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h2 class="text-lg font-semibold text-gray-900">Profile Information</h2>
                        <p class="text-sm text-gray-500 mt-0.5">Update your personal details and email address</p>
                    </div>
                    <form onsubmit={(e) => { e.preventDefault(); updateProfile(); }} class="p-6">
                        <div class="grid gap-5">
                            <!-- Avatar Section -->
                            <div class="flex items-center gap-4 pb-5 border-b border-gray-100">
                                <div class="avatar-circle w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    {initials}
                                </div>
                                <div>
                                    <p class="font-medium text-gray-900">Profile Photo</p>
                                    <p class="text-sm text-gray-500">Avatar is generated from your initials</p>
                                </div>
                            </div>
                            
                            <!-- Form Fields -->
                            <div class="grid gap-5 sm:grid-cols-2">
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
                            </div>
                            
                            <!-- Read-only Info -->
                            <div class="grid gap-5 sm:grid-cols-2 pt-4 border-t border-gray-100">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Account Role</label>
                                    <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                                        <i class="fas fa-shield-alt text-gray-400"></i>
                                        <span class="text-gray-700 capitalize">{roleLabel}</span>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                                    <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                                        <i class="fas fa-calendar text-gray-400"></i>
                                        <span class="text-gray-700">
                                            {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-6 pt-6 border-t border-gray-200 flex items-center justify-end gap-3">
                            <Button
                                type="button"
                                variant="ghost"
                                size="md"
                                onclick={() => {
                                    $profileForm.name = user.name;
                                    $profileForm.email = user.email;
                                }}
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                disabled={$profileForm.processing}
                                loading={$profileForm.processing}
                                icon={$profileForm.processing ? '' : 'fas fa-check'}
                            >
                                {$profileForm.processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </div>
                
            {:else if activeSection === 'security'}
                <!-- Security Section -->
                <div class="bg-white rounded-lg border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h2 class="text-lg font-semibold text-gray-900">Change Password</h2>
                        <p class="text-sm text-gray-500 mt-0.5">Ensure your account is using a strong password</p>
                    </div>
                    <form onsubmit={(e) => { e.preventDefault(); updatePassword(); }} class="p-6">
                        <div class="grid gap-5 max-w-xl">
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
                                    onclick={() => showCurrentPassword = !showCurrentPassword}
                                    class="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <i class="fas {showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>
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
                                    onclick={() => showNewPassword = !showNewPassword}
                                    class="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <i class="fas {showNewPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>
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
                                    onclick={() => showConfirmPassword = !showConfirmPassword}
                                    class="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <i class="fas {showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="mt-6 pt-6 border-t border-gray-200 flex items-center justify-end gap-3">
                            <Button
                                type="button"
                                variant="ghost"
                                size="md"
                                onclick={() => $passwordForm.reset()}
                            >
                                Clear
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                disabled={$passwordForm.processing}
                                loading={$passwordForm.processing}
                                icon={$passwordForm.processing ? '' : 'fas fa-key'}
                            >
                                {$passwordForm.processing ? 'Updating...' : 'Update Password'}
                            </Button>
                        </div>
                    </form>
                </div>
                
                <!-- Security Tips -->
                <div class="tips-card rounded-lg p-5 mt-6">
                    <div class="flex gap-4">
                        <div class="tips-icon w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <div>
                            <h3 class="font-medium tips-title">Security Recommendations</h3>
                            <ul class="mt-2 text-sm tips-text space-y-1.5">
                                <li class="flex items-center gap-2">
                                    <i class="fas fa-check text-xs"></i>
                                    Use at least 8 characters with mixed case
                                </li>
                                <li class="flex items-center gap-2">
                                    <i class="fas fa-check text-xs"></i>
                                    Include numbers and special characters
                                </li>
                                <li class="flex items-center gap-2">
                                    <i class="fas fa-check text-xs"></i>
                                    Avoid using personal information
                                </li>
                                <li class="flex items-center gap-2">
                                    <i class="fas fa-check text-xs"></i>
                                    Don't reuse passwords from other sites
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- Active Sessions Info -->
                <div class="bg-white rounded-lg border border-gray-200 p-5 mt-6">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-desktop text-gray-600"></i>
                            </div>
                            <div>
                                <h3 class="font-medium text-gray-900">Active Sessions</h3>
                                <p class="text-sm text-gray-500">Manage your logged-in devices</p>
                            </div>
                        </div>
                        <a href="/admin/sessions" class="text-sm font-medium link-primary">
                            View All <i class="fas fa-arrow-right ml-1"></i>
                        </a>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</DashboardLayout>

<style>
    /* Avatar with theme gradient */
    .avatar-circle {
        background: linear-gradient(to bottom right, var(--theme-primary-500), var(--theme-primary-600));
    }
    
    /* Navigation active state */
    .nav-item.active {
        background-color: var(--theme-primary-50);
        border-color: var(--theme-primary-600);
        color: var(--theme-primary-700);
    }
    
    .nav-icon.active {
        color: var(--theme-primary-600);
    }
    
    /* Tips card */
    .tips-card {
        background-color: var(--theme-primary-50);
        border: 1px solid var(--theme-primary-200);
    }
    
    .tips-icon {
        background-color: var(--theme-primary-100);
        color: var(--theme-primary-600);
    }
    
    .tips-title {
        color: var(--theme-primary-900);
    }
    
    .tips-text {
        color: var(--theme-primary-700);
    }
    
    /* Link with theme color */
    .link-primary {
        color: var(--theme-primary-600);
    }
    
    .link-primary:hover {
        color: var(--theme-primary-700);
    }
</style>
