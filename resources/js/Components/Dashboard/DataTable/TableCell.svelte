<script>
    import { formatNumber, formatCurrency } from '@/Utils/formatters';
    import UserAvatar from '@/Components/UI/UserAvatar.svelte';
    
    let { value, type = 'text', row = {}, badgeVariants = {} } = $props();
    
    function formatDate(date) {
        if (!date) return '-';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
    
    function getBadgeStyle(value) {
        const variant = badgeVariants[value] || 'default';
        const styles = {
            default: { backgroundColor: '#f3f4f6', color: '#1f2937' },
            primary: { backgroundColor: 'var(--theme-primary-100)', color: 'var(--theme-primary-800)' },
            success: { backgroundColor: '#d1fae5', color: '#065f46' },
            danger: { backgroundColor: '#fee2e2', color: '#991b1b' },
            warning: { backgroundColor: '#fef3c7', color: '#92400e' },
            info: { backgroundColor: '#dbeafe', color: '#1e40af' }
        };
        return styles[variant] || styles.default;
    }
</script>

{#if type === 'user'}
    <div class="flex items-center">
        <UserAvatar 
            name={row.name || 'Unknown User'} 
            image={row.avatar}
            size="sm"
        />
        <div class="ml-3">
            <p class="text-sm font-medium text-gray-900">{row.name || 'Unknown User'}</p>
            {#if row.email}
                <p class="text-xs text-gray-500">{row.email}</p>
            {/if}
        </div>
    </div>
{:else if type === 'badge'}
    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
          style="background-color: {getBadgeStyle(value).backgroundColor}; color: {getBadgeStyle(value).color}">
        {value || '-'}
    </span>
{:else if type === 'status'}
    {#if value === true || value === 1 || value === 'active' || value === 'Active'}
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span class="w-1.5 h-1.5 mr-1.5 bg-green-400 rounded-full animate-pulse"></span>
            Active
        </span>
    {:else if value === false || value === 0 || value === 'inactive' || value === 'Inactive'}
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <span class="w-1.5 h-1.5 mr-1.5 bg-red-400 rounded-full"></span>
            Inactive
        </span>
    {:else}
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <span class="w-1.5 h-1.5 mr-1.5 bg-gray-400 rounded-full"></span>
            Unknown
        </span>
    {/if}
{:else if type === 'date'}
    <span class="text-gray-600">{formatDate(value)}</span>
{:else if type === 'currency'}
    <span class="font-medium">
        {formatCurrency(value)}
    </span>
{:else if type === 'number'}
    <span class="font-medium text-gray-900">
        {formatNumber(value)}
    </span>
{:else if type === 'index'}
    <span class="font-medium text-gray-900">
        {formatNumber(value)}
    </span>
{:else}
    <span class="text-gray-900">
        {value || '-'}
    </span>
{/if}