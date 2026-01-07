<script>
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    import PageHeader from '@/Components/Dashboard/PageHeader.svelte';
    import Card from '@/Components/UI/Card.svelte';
    import { themeStore, presetThemes } from '@/Stores/themeStore.svelte.js';
    import alertStore from '@/Stores/alertStore.svelte.js';
    
    let selectedTheme = $state(themeStore.current);
    let selectedAlertPosition = $state(alertStore.position);
    
    const alertPositions = [
        { value: 'top-left', label: 'Top Left', icon: '↖' },
        { value: 'top-center', label: 'Top Center', icon: '↑' },
        { value: 'top-right', label: 'Top Right', icon: '↗' },
        { value: 'bottom-left', label: 'Bottom Left', icon: '↙' },
        { value: 'bottom-center', label: 'Bottom Center', icon: '↓' },
        { value: 'bottom-right', label: 'Bottom Right', icon: '↘' }
    ];
    
    $effect(() => {
        selectedTheme = themeStore.current;
    });
    
    function handleThemeChange(themeName) {
        selectedTheme = themeName;
        themeStore.setTheme(themeName);
        alertStore.success(`Theme: ${presetThemes[themeName].name}`);
    }
    
    function handleAlertPositionChange(position) {
        selectedAlertPosition = position;
        alertStore.setPosition(position);
        alertStore.success(`Alert position changed`);
    }
</script>

<DashboardLayout>
    <PageHeader
        title="Settings"
        description="Customize your application preferences"
        breadcrumbs={[
            { label: 'Dashboard', href: '/admin/dashboard', icon: 'fas fa-home' },
            { label: 'Settings' }
        ]}
    />
    
    <div class="space-y-6">
        <!-- Theme Settings - Full Width -->
        <Card>
            <div class="mb-4">
                <h3 class="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <i class="fas fa-palette text-gray-400"></i>
                    Theme
                </h3>
                <p class="text-sm text-gray-500">Choose your preferred color theme</p>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {#each Object.entries(presetThemes) as [key, theme]}
                    <button
                        onclick={() => handleThemeChange(key)}
                        class="relative p-3 rounded-xl border-2 transition-all hover:shadow-md
                               {selectedTheme === key ? 'border-primary-500 bg-primary-50 shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'}"
                    >
                        <!-- Color palette -->
                        <div class="flex gap-1 mb-2 justify-center">
                            <div class="w-6 h-6 rounded-full shadow-sm" style="background-color: {theme.colors.primary300}"></div>
                            <div class="w-6 h-6 rounded-full shadow-sm" style="background-color: {theme.colors.primary500}"></div>
                            <div class="w-6 h-6 rounded-full shadow-sm" style="background-color: {theme.colors.primary700}"></div>
                        </div>
                        
                        <!-- Theme name -->
                        <span class="text-sm font-medium block text-center {selectedTheme === key ? 'text-primary-700' : 'text-gray-700'}">
                            {theme.name}
                        </span>
                        
                        <!-- Active indicator -->
                        {#if selectedTheme === key}
                            <div class="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                                <i class="fas fa-check text-white text-xs"></i>
                            </div>
                        {/if}
                    </button>
                {/each}
            </div>
        </Card>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Alert Position -->
            <Card>
                <div class="mb-4">
                    <h3 class="text-base font-semibold text-gray-900 flex items-center gap-2">
                        <i class="fas fa-bell text-gray-400"></i>
                        Alert Position
                    </h3>
                    <p class="text-sm text-gray-500">Where notifications appear</p>
                </div>
                
                <!-- Position Grid -->
                <div class="grid grid-cols-3 gap-2 p-3 bg-gray-100 rounded-lg">
                    {#each alertPositions as pos}
                        <button
                            onclick={() => handleAlertPositionChange(pos.value)}
                            class="flex flex-col items-center justify-center p-2 rounded-md transition-all text-center
                                   {selectedAlertPosition === pos.value 
                                       ? 'bg-primary-500 text-white shadow-sm' 
                                       : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}"
                        >
                            <span class="text-lg mb-0.5">{pos.icon}</span>
                            <span class="text-xs">{pos.label.split(' ')[1]}</span>
                        </button>
                    {/each}
                </div>
            </Card>
            
            <!-- Notifications -->
            <Card>
                <div class="mb-4">
                    <h3 class="text-base font-semibold text-gray-900 flex items-center gap-2">
                        <i class="fas fa-envelope text-gray-400"></i>
                        Notifications
                    </h3>
                    <p class="text-sm text-gray-500">Email preferences</p>
                </div>
                
                <div class="space-y-3">
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span class="text-sm text-gray-700">Email notifications</span>
                        <span class="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">Soon</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span class="text-sm text-gray-700">Weekly digest</span>
                        <span class="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">Soon</span>
                    </div>
                </div>
            </Card>
            
            <!-- Other Settings -->
            <Card>
                <div class="mb-4">
                    <h3 class="text-base font-semibold text-gray-900 flex items-center gap-2">
                        <i class="fas fa-cog text-gray-400"></i>
                        Other
                    </h3>
                    <p class="text-sm text-gray-500">Additional preferences</p>
                </div>
                
                <div class="space-y-3">
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span class="text-sm text-gray-700">Dark Mode</span>
                        <span class="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">Soon</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span class="text-sm text-gray-700">Language</span>
                        <span class="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">Soon</span>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</DashboardLayout>
