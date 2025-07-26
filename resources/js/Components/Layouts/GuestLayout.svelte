<script>
    import { Link, page } from '@inertiajs/svelte';
    import Logo from '@/Components/Shared/Logo.svelte';
    import Button from '@/Components/UI/Button.svelte';
    
    export let showNav = true;
    export let showFooter = true;
    
    $: isAuthenticated = $page.props.auth?.user !== null && $page.props.auth?.user !== undefined;
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col">
    <!-- Navigation -->
    {#if showNav}
    <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <Logo href="/" size="small" showText={false} />
                    <span class="hidden sm:block ml-2 text-lg font-semibold text-gray-800">
                        Starter Kit
                    </span>
                </div>
                <div class="flex items-center gap-2 sm:gap-4">
                    {#if isAuthenticated}
                        <Button 
                            href={$page.props.auth?.user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                            variant="primary"
                            size="sm"
                            icon="fas fa-tachometer-alt"
                        >
                            <span class="hidden sm:inline">Dashboard</span>
                            <span class="sm:hidden">
                                <i class="fas fa-tachometer-alt"></i>
                            </span>
                        </Button>
                    {:else}
                        <Button 
                            href="/login"
                            variant="ghost"
                            size="sm"
                        >
                            Login
                        </Button>
                        <Button 
                            href="/register"
                            variant="primary"
                            size="sm"
                            icon="fas fa-rocket"
                        >
                            <span class="hidden sm:inline">Get Started</span>
                            <span class="sm:hidden">Start</span>
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
        <div class="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
            <p class="text-center text-xs sm:text-sm text-gray-500">
                <span class="block sm:inline">© {new Date().getFullYear()} Starter Kit.</span>
                <span class="hidden sm:inline"> Built with <i class="fas fa-heart text-red-500 mx-1"></i> using</span>
                <span class="block sm:inline mt-1 sm:mt-0">
                    <span class="sm:hidden">Powered by</span>
                    Laravel & Svelte
                </span>
            </p>
        </div>
    </footer>
    {/if}
</div>