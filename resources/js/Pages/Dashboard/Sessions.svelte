<script>
    import { useForm } from '@inertiajs/svelte';
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    import PageHeader from '@/Components/Dashboard/PageHeader.svelte';
    import Card from '@/Components/UI/Card.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import Modal from '@/Components/UI/Modal.svelte';
    import PasswordInput from '@/Components/UI/Form/PasswordInput.svelte';
    
    let { sessions = [] } = $props();
    
    let showLogoutModal = $state(false);
    let showLogoutAllModal = $state(false);
    let selectedSessionId = $state(null);
    
    const logoutForm = useForm({
        password: ''
    });
    
    const logoutAllForm = useForm({
        password: ''
    });
    
    function openLogoutModal(sessionId) {
        selectedSessionId = sessionId;
        $logoutForm.password = '';
        $logoutForm.clearErrors();
        showLogoutModal = true;
    }
    
    function openLogoutAllModal() {
        $logoutAllForm.password = '';
        $logoutAllForm.clearErrors();
        showLogoutAllModal = true;
    }
    
    function logoutSession() {
        $logoutForm.delete(route('sessions.destroy', selectedSessionId), {
            preserveScroll: true,
            onSuccess: () => {
                showLogoutModal = false;
            }
        });
    }
    
    function logoutAllSessions() {
        $logoutAllForm.delete(route('sessions.destroy-others'), {
            preserveScroll: true,
            onSuccess: () => {
                showLogoutAllModal = false;
            }
        });
    }
    
    function getDeviceIcon(device) {
        if (device.is_mobile) return 'fas fa-mobile-alt';
        if (device.is_tablet) return 'fas fa-tablet-alt';
        return 'fas fa-desktop';
    }
    
    function getBrowserIcon(browser) {
        const icons = {
            'Chrome': 'fab fa-chrome',
            'Firefox': 'fab fa-firefox',
            'Safari': 'fab fa-safari',
            'Edge': 'fab fa-edge',
            'Opera': 'fab fa-opera',
            'Internet Explorer': 'fab fa-internet-explorer'
        };
        return icons[browser] || 'fas fa-globe';
    }
</script>

<DashboardLayout>
    <PageHeader
        title="Browser Sessions"
        description="Manage and log out your active sessions on other browsers and devices"
        breadcrumbs={[
            { label: 'Dashboard', href: route('admin.dashboard'), icon: 'fas fa-home' },
            { label: 'Profile', href: route('admin.profile.edit') },
            { label: 'Sessions' }
        ]}
    />
    
    <Card>
        <div class="space-y-4">
            <div class="flex items-start justify-between">
                <div>
                    <h3 class="text-lg font-medium text-gray-900">Active Sessions</h3>
                    <p class="text-sm text-gray-600 mt-1">
                        If necessary, you may log out of all of your other browser sessions across all of your devices.
                    </p>
                </div>
                
                {#if sessions.length > 1}
                    <Button
                        variant="danger"
                        size="sm"
                        icon="fas fa-sign-out-alt"
                        onclick={openLogoutAllModal}
                    >
                        Log Out Other Sessions
                    </Button>
                {/if}
            </div>
            
            <div class="border-t border-gray-200 pt-4">
                {#if sessions.length === 0}
                    <div class="text-center py-8">
                        <i class="fas fa-shield-alt text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">No active sessions found.</p>
                    </div>
                {:else}
                    <div class="space-y-4">
                        {#each sessions as session}
                            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg {session.is_current_device ? 'ring-2 ring-primary-500' : ''}">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                            <i class="{getDeviceIcon(session.device)} text-xl text-gray-600"></i>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div class="flex items-center space-x-2">
                                            <i class="{getBrowserIcon(session.device.browser)} text-gray-500"></i>
                                            <span class="font-medium text-gray-900">
                                                {session.device.browser} on {session.device.platform}
                                            </span>
                                            {#if session.is_current_device}
                                                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                    <i class="fas fa-check-circle mr-1"></i>
                                                    This device
                                                </span>
                                            {/if}
                                        </div>
                                        
                                        <div class="mt-1 text-sm text-gray-500">
                                            <span>{session.ip_address}</span>
                                            <span class="mx-2">•</span>
                                            <span>Last active {session.last_active}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {#if !session.is_current_device}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        icon="fas fa-sign-out-alt"
                                        onclick={() => openLogoutModal(session.id)}
                                    >
                                        Log Out
                                    </Button>
                                {/if}
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </Card>
    
    <!-- Logout Single Session Modal -->
    <Modal
        show={showLogoutModal}
        title="Log Out Session"
        size="sm"
        onclose={() => showLogoutModal = false}
    >
        <p class="text-gray-600 mb-4">
            Please enter your password to confirm you would like to log out of this session.
        </p>
        
        <form onsubmit={(e) => { e.preventDefault(); logoutSession(); }}>
            <PasswordInput
                label="Password"
                bind:value={$logoutForm.password}
                error={$logoutForm.errors.password}
                required
            />
            
            <div class="flex justify-end space-x-3 mt-6">
                <Button
                    variant="ghost"
                    onclick={() => showLogoutModal = false}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="danger"
                    loading={$logoutForm.processing}
                    icon="fas fa-sign-out-alt"
                >
                    Log Out Session
                </Button>
            </div>
        </form>
    </Modal>
    
    <!-- Logout All Sessions Modal -->
    <Modal
        show={showLogoutAllModal}
        title="Log Out Other Sessions"
        size="sm"
        onclose={() => showLogoutAllModal = false}
    >
        <p class="text-gray-600 mb-4">
            Please enter your password to confirm you would like to log out of all other browser sessions.
        </p>
        
        <form onsubmit={(e) => { e.preventDefault(); logoutAllSessions(); }}>
            <PasswordInput
                label="Password"
                bind:value={$logoutAllForm.password}
                error={$logoutAllForm.errors.password}
                required
            />
            
            <div class="flex justify-end space-x-3 mt-6">
                <Button
                    variant="ghost"
                    onclick={() => showLogoutAllModal = false}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="danger"
                    loading={$logoutAllForm.processing}
                    icon="fas fa-sign-out-alt"
                >
                    Log Out All Sessions
                </Button>
            </div>
        </form>
    </Modal>
</DashboardLayout>
