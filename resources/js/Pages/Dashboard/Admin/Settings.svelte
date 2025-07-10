<script>
    import { onMount } from 'svelte';
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    import PageHeader from '@/Components/Dashboard/PageHeader.svelte';
    import Card from '@/Components/UI/Card.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import { currentTheme, presetThemes } from '@/Stores/themeStore';
    import alert from '@/Stores/alertStore';
    
    let selectedTheme = $currentTheme;
    
    function handleThemeChange(themeName) {
        selectedTheme = themeName;
        $currentTheme = themeName;
        alert.success(`Theme changed to ${presetThemes[themeName].name}`);
    }
    
    onMount(() => {
        // Make sure theme is applied on mount
        selectedTheme = $currentTheme;
    });
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
    
    <!-- Theme Settings -->
    <Card margin="mb-6">
        <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
                <i class="fas fa-palette mr-2 text-gray-500"></i>
                Theme Settings
            </h3>
            <p class="text-sm text-gray-600">Choose your preferred color theme for the application</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each Object.entries(presetThemes) as [key, theme]}
                <button
                    on:click={() => handleThemeChange(key)}
                    class="relative p-4 rounded-lg border-2 transition-all hover:shadow-md"
                    style="
                        border-color: {selectedTheme === key ? 'var(--theme-primary-500)' : '#e5e7eb'};
                        background-color: {selectedTheme === key ? 'var(--theme-primary-50)' : 'white'};
                    "
                    on:mouseenter={(e) => {
                        if (selectedTheme !== key) {
                            e.currentTarget.style.borderColor = '#d1d5db';
                        }
                    }}
                    on:mouseleave={(e) => {
                        if (selectedTheme !== key) {
                            e.currentTarget.style.borderColor = '#e5e7eb';
                        }
                    }}
                >
                    <!-- Theme Preview -->
                    <div class="flex items-center justify-between mb-3">
                        <span class="font-medium text-gray-900">{theme.name}</span>
                        {#if selectedTheme === key}
                            <span class="text-xs text-white px-2 py-1 rounded-full"
                                  style="background-color: var(--theme-primary-500)">
                                Active
                            </span>
                        {/if}
                    </div>
                    
                    <!-- Color Preview -->
                    <div class="flex gap-1">
                        <div 
                            class="w-8 h-8 rounded shadow-sm"
                            style="background-color: {theme.colors.primary200}"
                        ></div>
                        <div 
                            class="w-8 h-8 rounded shadow-sm"
                            style="background-color: {theme.colors.primary400}"
                        ></div>
                        <div 
                            class="w-8 h-8 rounded shadow-sm"
                            style="background-color: {theme.colors.primary600}"
                        ></div>
                        <div 
                            class="w-8 h-8 rounded shadow-sm"
                            style="background-color: {theme.colors.primary800}"
                        ></div>
                    </div>
                    
                    <!-- Apply Button -->
                    <div class="mt-3">
                        <span class="text-sm"
                              style="color: {selectedTheme === key ? 'var(--theme-primary-600)' : '#4b5563'}">
                            {selectedTheme === key ? 'Currently active' : 'Click to apply'}
                        </span>
                    </div>
                </button>
            {/each}
        </div>
    </Card>
    
    <!-- Other Settings -->
    <Card>
        <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
                <i class="fas fa-cog mr-2 text-gray-500"></i>
                General Settings
            </h3>
            <p class="text-sm text-gray-600">Other application preferences</p>
        </div>
        
        <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                    <h4 class="font-medium text-gray-900">Notifications</h4>
                    <p class="text-sm text-gray-600">Receive email notifications for important updates</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" checked>
                    <div class="w-11 h-6 rounded-full peer transition-all
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                after:bg-white after:border-gray-300 after:border after:rounded-full 
                                after:h-5 after:w-5 after:transition-all
                                peer-checked:after:translate-x-full peer-checked:after:border-white"
                         style="background-color: {true ? 'var(--theme-primary-600)' : '#e5e7eb'}">
                    </div>
                </label>
            </div>
            
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                    <h4 class="font-medium text-gray-900">Dark Mode</h4>
                    <p class="text-sm text-gray-600">Coming soon - Switch between light and dark interface</p>
                </div>
                <span class="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    Coming Soon
                </span>
            </div>
        </div>
    </Card>
</DashboardLayout>