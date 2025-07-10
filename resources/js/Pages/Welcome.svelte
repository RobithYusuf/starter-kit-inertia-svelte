<script>
    import { page } from '@inertiajs/svelte';
    import GuestLayout from '@/Components/Layouts/GuestLayout.svelte';
    import Button from '@/Components/UI/Button.svelte';
    
    $: isAuthenticated = $page.props.auth?.user !== null;
</script>

<GuestLayout>
    <!-- Hero Section -->
        <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div class="text-center">
                <h2 class="text-base font-semibold text-primary-600 tracking-wide uppercase">Welcome to</h2>
                <p class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Laravel 12 + Svelte + Inertia.js
                </p>
                <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                    A modern starter kit with authentication, admin dashboard, and user management.
                </p>
                
                <!-- Features -->
                <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                    <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-shield-alt text-primary-600 text-xl"></i>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Authentication</h3>
                        <p class="text-gray-600">Built-in authentication with Laravel Fortify</p>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-users text-primary-600 text-xl"></i>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
                        <p class="text-gray-600">Complete CRUD for managing users</p>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-palette text-primary-600 text-xl"></i>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Modern UI</h3>
                        <p class="text-gray-600">Clean design with Tailwind CSS v4</p>
                    </div>
                </div>
                
                <!-- CTA Buttons -->
                <div class="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                    {#if isAuthenticated}
                        <Button 
                            href={$page.props.auth.user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                            variant="primary" 
                            size="lg" 
                            icon="fas fa-arrow-right"
                        >
                            Go to Dashboard
                        </Button>
                    {:else}
                        <Button 
                            href="/register"
                            variant="primary" 
                            size="lg" 
                            icon="fas fa-rocket"
                        >
                            Get Started Free
                        </Button>
                        <Button 
                            href="/login"
                            variant="secondary" 
                            size="lg" 
                            icon="fas fa-sign-in-alt"
                        >
                            Sign In
                        </Button>
                    {/if}
                </div>
            </div>
        </div>
</GuestLayout>