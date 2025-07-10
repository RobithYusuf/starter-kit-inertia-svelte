<script>
    import { onMount } from 'svelte';
    import { page, Link, router } from '@inertiajs/svelte';
    import Sidebar from '@/Components/Dashboard/Sidebar.svelte';
    import AlertContainer from '@/Components/UI/AlertContainer.svelte';
    import UserAvatar from '@/Components/UI/UserAvatar.svelte';
    import alert from '@/Stores/alertStore';
    
    let sidebarOpen = false;
    let sidebarCollapsed = false;
    let userMenuOpen = false;
    
    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }
    
    function toggleSidebarCollapse() {
        sidebarCollapsed = !sidebarCollapsed;
        // Save preference to localStorage
        localStorage.setItem('sidebarCollapsed', sidebarCollapsed);
    }
    
    function toggleUserMenu() {
        userMenuOpen = !userMenuOpen;
    }
    
    function closeUserMenu() {
        userMenuOpen = false;
    }
    
    // Close dropdown when clicking outside
    function handleClickOutside(event) {
        const userMenuButton = document.getElementById('user-menu-button');
        const userMenuDropdown = document.getElementById('user-menu-dropdown');
        
        if (userMenuButton && userMenuDropdown && 
            !userMenuButton.contains(event.target) && 
            !userMenuDropdown.contains(event.target)) {
            userMenuOpen = false;
        }
    }
    
    // Handle flash messages
    onMount(() => {
        const flash = $page.props.flash;
        if (flash) {
            if (flash.success) alert.success(flash.success);
            if (flash.error) alert.error(flash.error);
            if (flash.warning) alert.warning(flash.warning);
            if (flash.message) alert.info(flash.message);
        }
        
        // Check window size and set sidebar state accordingly
        const checkWindowSize = () => {
            const width = window.innerWidth;
            if (width >= 768 && width < 1024) {
                // Tablet mode - auto collapse
                sidebarCollapsed = true;
            } else if (width >= 1024) {
                // Desktop mode - restore from localStorage
                const savedCollapsed = localStorage.getItem('sidebarCollapsed');
                if (savedCollapsed !== null) {
                    sidebarCollapsed = savedCollapsed === 'true';
                }
            }
        };
        
        // Initial check
        checkWindowSize();
        
        // Add resize listener
        window.addEventListener('resize', checkWindowSize);
        
        // Add click outside listener
        document.addEventListener('click', handleClickOutside);
        
        return () => {
            window.removeEventListener('resize', checkWindowSize);
            document.removeEventListener('click', handleClickOutside);
        };
    });
    
    $: userRole = $page.props.auth?.user?.role || 'member';
</script>

<div class="min-h-screen bg-gray-50">
    <AlertContainer />
    
    <div class="flex h-screen overflow-hidden">
        <!-- Sidebar -->
        <Sidebar bind:sidebarOpen bind:sidebarCollapsed />
        
        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Top Bar -->
            <header class="bg-white border-b border-gray-200 shadow-sm">
                <div class="h-16 flex items-center justify-between px-3 sm:px-4 lg:px-6">
                    <!-- Sidebar toggle buttons -->
                    <div class="flex items-center">
                        <!-- Mobile menu button -->
                        <button
                            id="sidebar-toggle"
                            on:click={toggleSidebar}
                            class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <i class="fas fa-bars text-gray-600 text-lg"></i>
                        </button>
                        
                        <!-- Tablet/Desktop collapse button -->
                        <button
                            on:click={toggleSidebarCollapse}
                            class="hidden md:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            <i class="fas fa-bars text-gray-600 text-lg"></i>
                        </button>
                    </div>
                    
                    
                    <!-- Right side items -->
                    <div class="flex items-center space-x-4">
                        <!-- Notifications -->
                        <button class="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                            <i class="fas fa-bell text-lg"></i>
                            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        
                        <!-- User menu -->
                        <div class="relative">
                            <button 
                                id="user-menu-button"
                                on:click={toggleUserMenu}
                                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <UserAvatar 
                                    name={$page.props.auth?.user?.name || 'User'} 
                                    size="sm" 
                                    colorScheme="fixed"
                                />
                                <span class="hidden sm:block text-sm font-medium text-gray-700">
                                    {$page.props.auth?.user?.name || 'User'}
                                </span>
                                <i class="fas fa-chevron-down text-xs text-gray-500 transition-transform {userMenuOpen ? 'rotate-180' : ''}"></i>
                            </button>
                            
                            <!-- Dropdown Menu -->
                            {#if userMenuOpen}
                                <div
                                    id="user-menu-dropdown"
                                    class="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden"
                                >
                                    <!-- User Info -->
                                    <div class="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
                                        <p class="text-sm font-medium text-gray-900 truncate">{$page.props.auth?.user?.name}</p>
                                        <p class="text-xs text-gray-500 truncate">{$page.props.auth?.user?.email}</p>
                                    </div>
                                    
                                    <!-- Menu Items -->
                                    <div class="py-1">
                                        <Link
                                            href={userRole === 'admin' ? '/admin/profile' : '/profile'}
                                            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            on:click={closeUserMenu}
                                        >
                                            <i class="fas fa-user-circle mr-3 text-gray-400 text-sm"></i>
                                            Profile
                                        </Link>
                                        
                                        <Link
                                            href={userRole === 'admin' ? '/admin/settings' : '/settings'}
                                            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            on:click={closeUserMenu}
                                        >
                                            <i class="fas fa-cog mr-3 text-gray-400 text-sm"></i>
                                            Settings
                                        </Link>
                                    </div>
                                    
                                    <!-- Logout -->
                                    <div class="border-t border-gray-200 py-1">
                                        <button
                                            on:click={() => {
                                                closeUserMenu();
                                                router.post('/logout');
                                            }}
                                            class="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                                        >
                                            <i class="fas fa-sign-out-alt mr-3 text-gray-400 text-sm"></i>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </header>
            
            <!-- Page Content -->
            <main class="flex-1 overflow-y-auto">
                <div class="p-3 sm:p-4 lg:p-6">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</div>