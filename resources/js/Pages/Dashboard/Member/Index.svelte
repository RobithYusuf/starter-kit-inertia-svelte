<script>
    import { page } from '@inertiajs/svelte';
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    
    // Sample data for member dashboard
    const activities = [
        { id: 1, action: 'Logged in', time: '2 hours ago', icon: 'fas fa-sign-in-alt' },
        { id: 2, action: 'Updated profile', time: '1 day ago', icon: 'fas fa-user-edit' },
        { id: 3, action: 'Changed password', time: '3 days ago', icon: 'fas fa-key' },
        { id: 4, action: 'Viewed dashboard', time: '5 days ago', icon: 'fas fa-eye' }
    ];
    
    const quickStats = [
        { label: 'Profile Views', value: '124', icon: 'fas fa-eye', color: 'blue' },
        { label: 'Days Active', value: '45', icon: 'fas fa-calendar-check', color: 'green' },
        { label: 'Tasks Completed', value: '12', icon: 'fas fa-check-circle', color: 'purple' },
        { label: 'Points Earned', value: '380', icon: 'fas fa-star', color: 'amber' }
    ];
    
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-emerald-50 text-emerald-600',
        purple: 'bg-purple-50 text-purple-600',
        amber: 'bg-amber-50 text-amber-600'
    };
</script>

<DashboardLayout>
    <!-- Page Header -->
    <div class="mb-6">
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Member Dashboard</h1>
        <p class="mt-1 text-sm lg:text-base text-gray-600">Welcome back, {$page.props.auth.user.name}! Here's your overview.</p>
    </div>
    
    <!-- Quick Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {#each quickStats as stat}
            <div class="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs text-gray-600">{stat.label}</p>
                        <p class="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div class="p-2 {colorClasses[stat.color]} rounded-lg">
                        <i class="{stat.icon} text-lg"></i>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    
    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Recent Activity -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow-sm">
            <div class="p-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div class="p-4">
                <div class="space-y-4">
                    {#each activities as activity}
                        <div class="flex items-start gap-3">
                            <div class="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                                <i class="{activity.icon} text-gray-600 text-sm"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-medium text-gray-900">{activity.action}</p>
                                <p class="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-sm">
            <div class="p-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div class="p-4">
                <div class="space-y-2">
                    <a href="/profile" class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <i class="fas fa-user-edit text-gray-600"></i>
                        <span class="text-sm font-medium text-gray-700">Edit Profile</span>
                        <i class="fas fa-chevron-right text-gray-400 ml-auto text-xs"></i>
                    </a>
                    <a href="/settings" class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <i class="fas fa-cog text-gray-600"></i>
                        <span class="text-sm font-medium text-gray-700">Settings</span>
                        <i class="fas fa-chevron-right text-gray-400 ml-auto text-xs"></i>
                    </a>
                    <a href="/help" class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <i class="fas fa-question-circle text-gray-600"></i>
                        <span class="text-sm font-medium text-gray-700">Help Center</span>
                        <i class="fas fa-chevron-right text-gray-400 ml-auto text-xs"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Progress Section -->
    <div class="mt-6 bg-white rounded-lg shadow-sm p-4 lg:p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Your Progress</h2>
        <div class="space-y-4">
            <div>
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-700">Profile Completion</span>
                    <span class="text-sm font-medium text-gray-900">75%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-orange-500 h-2 rounded-full" style="width: 75%"></div>
                </div>
            </div>
            <div>
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-700">Tasks Progress</span>
                    <span class="text-sm font-medium text-gray-900">60%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: 60%"></div>
                </div>
            </div>
        </div>
    </div>
</DashboardLayout>