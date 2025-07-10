<script>
    import { page } from '@inertiajs/svelte';
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    import UserAvatar from '@/Components/UI/UserAvatar.svelte';
    
    export let stats = {
        total_users: 0,
        total_admins: 0,
        total_members: 0,
        active_users: 0
    };
    export let recent_users = [];
    
    const statCards = [
        {
            title: 'Total Users',
            value: stats.total_users,
            icon: 'fas fa-users',
            color: 'blue',
            change: '+12%',
            trend: 'up'
        },
        {
            title: 'Admin Users',
            value: stats.total_admins,
            icon: 'fas fa-user-shield',
            color: 'emerald',
            change: '+3%',
            trend: 'up'
        },
        {
            title: 'Members',
            value: stats.total_members,
            icon: 'fas fa-user',
            color: 'purple',
            change: '+18%',
            trend: 'up'
        },
        {
            title: 'Active Users',
            value: stats.active_users,
            icon: 'fas fa-user-check',
            color: 'amber',
            change: '-2%',
            trend: 'down'
        }
    ];
    
    // Generate random data for charts
    const generateActivityData = () => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return days.map(day => ({
            day,
            value: Math.floor(Math.random() * 100) + 20
        }));
    };
    
    const activityData = generateActivityData();
    const maxValue = Math.max(...activityData.map(d => d.value));
    
    // Pie chart data based on user stats
    const pieData = [
        { label: 'Admins', value: stats.total_admins, color: '#10b981' },
        { label: 'Members', value: stats.total_members, color: '#8b5cf6' }
    ];
    const total = pieData.reduce((sum, item) => sum + item.value, 0) || 1;
    
    let cumulativeAngle = -90; // Start from top
    const pieSlices = pieData.map(item => {
        const angle = (item.value / total) * 360;
        const startAngle = cumulativeAngle;
        cumulativeAngle += angle;
        return { ...item, startAngle, angle };
    });
    
    const colorClasses = {
        blue: 'bg-blue-500 text-blue-600 bg-blue-50',
        emerald: 'bg-emerald-500 text-emerald-600 bg-emerald-50',
        purple: 'bg-purple-500 text-purple-600 bg-purple-50',
        amber: 'bg-amber-500 text-amber-600 bg-amber-50'
    };
</script>

<DashboardLayout>
    <!-- Page Header -->
    <div class="mb-6">
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-1 text-sm lg:text-base text-gray-600">Welcome back, {$page.props.auth.user.name}! Here's what's happening today.</p>
    </div>
    
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {#each statCards as stat}
            <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 lg:p-5">
                <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                        <p class="text-xs lg:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                        <p class="mt-1 text-xl lg:text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                        <div class="mt-1 flex items-center text-xs">
                            <span class="{stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'} font-medium">
                                <i class="fas fa-{stat.trend === 'up' ? 'arrow-up' : 'arrow-down'} text-xs mr-1"></i>
                                {stat.change}
                            </span>
                            <span class="text-gray-500 ml-1 hidden sm:inline">vs last month</span>
                        </div>
                    </div>
                    <div class="p-2 lg:p-2.5 {colorClasses[stat.color].split(' ')[2]} rounded-lg ml-3 flex-shrink-0">
                        <i class="{stat.icon} {colorClasses[stat.color].split(' ')[1]} text-lg lg:text-xl"></i>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    
    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <!-- Activity Chart -->
        <div class="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-semibold text-gray-900">User Activity</h2>
                <select class="text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                </select>
            </div>
            <!-- Bar Chart -->
            <div class="h-64">
                <svg viewBox="0 0 400 250" class="w-full h-full">
                    <!-- Grid lines -->
                    {#each [0, 25, 50, 75, 100] as gridValue}
                        <line 
                            x1="40" 
                            y1="{200 - (gridValue / 100) * 180}" 
                            x2="380" 
                            y2="{200 - (gridValue / 100) * 180}" 
                            stroke="#e5e7eb" 
                            stroke-width="1"
                        />
                        <text 
                            x="30" 
                            y="{205 - (gridValue / 100) * 180}" 
                            text-anchor="end" 
                            class="text-xs fill-gray-500"
                        >
                            {gridValue}
                        </text>
                    {/each}
                    
                    <!-- Bars -->
                    {#each activityData as item, i}
                        <g>
                            <rect 
                                x="{60 + i * 45}" 
                                y="{200 - (item.value / maxValue) * 180}" 
                                width="30" 
                                height="{(item.value / maxValue) * 180}" 
                                fill="var(--theme-primary-500)" 
                                rx="4"
                                class="transition-all duration-300"
                                on:mouseenter={(e) => e.target.setAttribute('fill', 'var(--theme-primary-600)')}
                                on:mouseleave={(e) => e.target.setAttribute('fill', 'var(--theme-primary-500)')}
                            />
                            <text 
                                x="{75 + i * 45}" 
                                y="220" 
                                text-anchor="middle" 
                                class="text-xs fill-gray-600"
                            >
                                {item.day}
                            </text>
                        </g>
                    {/each}
                </svg>
            </div>
        </div>
        
        <!-- User Distribution -->
        <div class="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-semibold text-gray-900">User Distribution</h2>
                <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">View all</button>
            </div>
            <!-- Pie Chart -->
            <div class="h-64 relative">
                <svg viewBox="0 0 200 200" class="w-full h-full">
                    {#each pieSlices as slice}
                        <path
                            d="M 100 100 L {100 + 70 * Math.cos(slice.startAngle * Math.PI / 180)} {100 + 70 * Math.sin(slice.startAngle * Math.PI / 180)} A 70 70 0 {slice.angle > 180 ? 1 : 0} 1 {100 + 70 * Math.cos((slice.startAngle + slice.angle) * Math.PI / 180)} {100 + 70 * Math.sin((slice.startAngle + slice.angle) * Math.PI / 180)} Z"
                            fill="{slice.color}"
                            class="transition-all duration-300 hover:opacity-80"
                        />
                    {/each}
                    <!-- Center circle for donut effect -->
                    <circle cx="100" cy="100" r="35" fill="white" />
                </svg>
                
                <!-- Legend -->
                <div class="absolute bottom-0 left-0 right-0 flex justify-center gap-6">
                    {#each pieSlices as slice}
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded" style="background-color: {slice.color}"></div>
                            <span class="text-xs text-gray-600">{slice.label}: {slice.value}</span>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
    
    <!-- Recent Users Table -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900">Recent Users</h2>
                <a href="/admin/users" class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all <i class="fas fa-arrow-right ml-1"></i>
                </a>
            </div>
        </div>
        
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="bg-gray-50">
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Joined
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {#if recent_users.length > 0}
                        {#each recent_users as user}
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <UserAvatar name={user.name} size="sm" />
                                        <div class="ml-3">
                                            <div class="text-sm font-medium text-gray-900">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {user.email}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {user.role === 'admin' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">
                                        {user.role}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                        <span class="w-1.5 h-1.5 rounded-full {user.is_active ? 'bg-green-400' : 'bg-red-400'} mr-1.5"></span>
                                        {user.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </td>
                            </tr>
                        {/each}
                    {:else}
                        <tr>
                            <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                                <i class="fas fa-users text-4xl mb-4 block text-gray-300"></i>
                                No users found
                            </td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        </div>
    </div>
</DashboardLayout>