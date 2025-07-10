<script>
    import { Link, page } from '@inertiajs/svelte';
    import Logo from '@/Components/Shared/Logo.svelte';
    import Button from '@/Components/UI/Button.svelte';
    
    export let showNav = true;
    export let showFooter = true;
    
    $: isAuthenticated = $page.props.auth?.user !== null;
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col">
    <!-- Navigation -->
    {#if showNav}
    <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <Logo href="/" size="default" />
                </div>
                <div class="flex items-center space-x-4">
                    {#if isAuthenticated}
                        <Button 
                            href={$page.props.auth.user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                            variant="primary"
                            icon="fas fa-tachometer-alt"
                        >
                            Dashboard
                        </Button>
                    {:else}
                        <Button 
                            href="/login"
                            variant="ghost"
                            size="default"
                        >
                            Login
                        </Button>
                        <Button 
                            href="/register"
                            variant="primary"
                            size="default"
                            icon="fas fa-rocket"
                        >
                            Get Started
                        </Button>
                    {/if}
                </div>
            </div>
        </div>
    </nav>
    {/if}
    
    <!-- Main Content -->
    <main class="flex-grow">
        <slot />
    </main>
    
    <!-- Footer -->
    {#if showFooter}
    <footer class="bg-white border-t border-gray-200">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p class="text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Starkit Svelte. Built with 
                <i class="fas fa-heart text-red-500 mx-1"></i> 
                using Laravel & Svelte
            </p>
        </div>
    </footer>
    {/if}
</div>