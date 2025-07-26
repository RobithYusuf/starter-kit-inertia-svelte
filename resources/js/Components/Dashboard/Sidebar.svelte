<script>
    import { Link, page, router } from '@inertiajs/svelte';
    import { createEventDispatcher, onMount } from 'svelte';
    import Logo from '@/Components/Shared/Logo.svelte';
    
    export let sidebarOpen = false;
    export let sidebarCollapsed = false;
    const dispatch = createEventDispatcher();
    
    let innerWidth;
    
    $: userRole = $page.props.auth?.user?.role || 'member';
    $: currentPath = $page.url ? $page.url.split('?')[0] : '';
    $: menuCategories = userRole === 'admin' ? adminMenuCategories : memberMenuCategories;
    $: isMobile = innerWidth < 768;
    $: effectiveCollapsed = !isMobile && sidebarCollapsed;
    
    onMount(() => {
        innerWidth = window.innerWidth;
        // Don't auto-open sidebar on mount for mobile
        sidebarOpen = false;
        
        const handleResize = () => {
            innerWidth = window.innerWidth;
            // Don't auto-toggle sidebar on resize
        };
        
        const handleOutsideClick = (event) => {
            if (innerWidth < 1024 && sidebarOpen) {
                const sidebar = document.getElementById('sidebar');
                const toggleButton = document.getElementById('sidebar-toggle');
                if (sidebar && !sidebar.contains(event.target) && !toggleButton?.contains(event.target)) {
                    sidebarOpen = false;
                }
            }
        };
        
        window.addEventListener('resize', handleResize);
        document.addEventListener('click', handleOutsideClick);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('click', handleOutsideClick);
        };
    });
    
    const adminMenuCategories = [
        {
            id: 'main',
            name: 'Main',
            items: [
                { id: 'dashboard', name: 'Dashboard', href: '/admin/dashboard', icon: 'fas fa-home' },
                { id: 'users', name: 'Users', href: '/admin/users', icon: 'fas fa-users' },
            ]
        },
        {
            id: 'account',
            name: 'Account',
            items: [
                { id: 'profile', name: 'Profile', href: '/admin/profile', icon: 'fas fa-user-circle' },
                { id: 'settings', name: 'Settings', href: '/admin/settings', icon: 'fas fa-cog' },
            ]
        }
    ];
    
    const memberMenuCategories = [
        {
            id: 'main',
            name: 'Main Menu',
            items: [
                { id: 'dashboard', name: 'Dashboard', href: '/dashboard', icon: 'fas fa-home' },
                { id: 'profile', name: 'My Profile', href: '/profile', icon: 'fas fa-user' }
            ]
        }
    ];
    
    function closeSidebar() {
        if (innerWidth < 1024) {
            sidebarOpen = false;
            dispatch('toggle', false);
        }
    }
    
    function isActive(href) {
        if (href === '/') return currentPath === '/';
        return currentPath === href || currentPath.startsWith(href + '/');
    }
    
    function handleNavigation(href, event) {
        event.preventDefault();
        closeSidebar();
        router.visit(href, {
            preserveScroll: false,
            preserveState: false,
        });
    }
</script>

<svelte:window bind:innerWidth />

<!-- Sidebar -->
<aside
    id="sidebar"
    class="fixed inset-y-0 left-0 z-30 w-64 md:{sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 transition-all duration-300 transform {sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static"
>
    <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="{effectiveCollapsed ? 'px-2 py-4' : 'px-4 py-2.5'} border-b border-gray-200 flex items-center {effectiveCollapsed ? 'justify-center' : 'justify-between'}">
            <Logo 
                href={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'} 
                size={effectiveCollapsed ? 'small' : 'default'} 
                showTagline={!effectiveCollapsed}
                showText={!effectiveCollapsed}
            >
                <span slot="tagline">{userRole === 'admin' ? 'Admin Panel' : 'Member Area'}</span>
            </Logo>
            
            <!-- Mobile close button -->
            <button
                on:click={closeSidebar}
                class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <i class="fas fa-times text-gray-600 text-lg"></i>
            </button>
        </div>
        
        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto {effectiveCollapsed ? 'px-2 py-3' : 'px-3 py-4'}">
            {#each menuCategories as category, index}
                <!-- Category separator -->
                {#if index > 0 && effectiveCollapsed}
                    <div class="my-1 mx-1">
                        <div class="border-t border-gray-200"></div>
                    </div>
                {/if}
                
                <!-- Category label -->
                {#if !effectiveCollapsed}
                <div class="px-3 mb-2 {index > 0 ? 'mt-3' : ''}">
                    <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {category.name}
                    </h3>
                </div>
                {/if}
                
                <!-- Menu items -->
                <div class="{sidebarCollapsed ? 'space-y-1' : 'space-y-1'}">
                    {#each category.items as item}
                        <a
                            href={item.href}
                            on:click={(e) => handleNavigation(item.href, e)}
                            class="flex items-center {effectiveCollapsed ? 'justify-center px-2' : 'px-3'} py-2.5 text-sm font-medium rounded-lg transition-all duration-200 {isActive(item.href) 
                                ? 'bg-primary-50 text-primary-700' 
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}"
                            title={effectiveCollapsed ? item.name : ''}
                        >
                            <i class="{item.icon} {effectiveCollapsed ? 'text-lg' : 'text-sm w-5 text-center'} {isActive(item.href) ? 'text-primary-600' : 'text-gray-400'}"></i>
                            {#if !effectiveCollapsed}
                            <span class="ml-3">{item.name}</span>
                            {/if}
                            {#if isActive(item.href) && !effectiveCollapsed}
                                <div class="ml-auto w-1 h-4 bg-primary-600 rounded-full"></div>
                            {/if}
                        </a>
                    {/each}
                </div>
            {/each}
        </nav>
        
        <!-- User section -->
        <div class="border-t border-gray-200 hidden md:block">
            <!-- Logout Button -->
            <div class="{effectiveCollapsed ? 'px-2 py-2' : 'px-3 py-3'}">
                <button
                    on:click={() => router.post('/logout')}
                    class="flex items-center {effectiveCollapsed ? 'justify-center' : ''} w-full {effectiveCollapsed ? 'px-2' : 'px-3'} py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                    title={effectiveCollapsed ? 'Logout' : ''}
                >
                    <i class="fas fa-sign-out-alt {effectiveCollapsed ? 'text-lg' : 'mr-3 text-sm'} text-gray-400"></i>
                    {#if !effectiveCollapsed}
                    <span>Logout</span>
                    {/if}
                </button>
            </div>
        </div>
    </div>
</aside>

<!-- Mobile backdrop -->
{#if sidebarOpen && innerWidth < 768}
    <div
        class="fixed inset-0 bg-black/50 z-20 lg:hidden"
        on:click={closeSidebar}
    ></div>
{/if}

<style>
    aside {
        scrollbar-width: thin;
        scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
    }
    
    aside::-webkit-scrollbar {
        width: 6px;
    }
    
    aside::-webkit-scrollbar-track {
        background: transparent;
    }
    
    aside::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.3);
        border-radius: 3px;
    }
    
    aside::-webkit-scrollbar-thumb:hover {
        background-color: rgba(156, 163, 175, 0.5);
    }
</style>