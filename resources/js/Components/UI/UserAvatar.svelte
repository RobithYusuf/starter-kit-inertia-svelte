<script>
    export let name = '';
    export let size = 'default';
    export let image = null;
    export let colorScheme = 'auto'; // 'auto', 'fixed', or custom color
    
    const sizes = {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        default: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-16 h-16 text-xl'
    };
    
    // Generate consistent gray color based on name
    const getColorFromName = (name) => {
        if (!name) return '#9CA3AF'; // gray-400
        
        const colors = [
            '#6B7280', // gray-500
            '#4B5563', // gray-600
            '#374151', // gray-700
            '#1F2937', // gray-800
            '#9CA3AF', // gray-400
        ];
        
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        return colors[Math.abs(hash) % colors.length];
    };
    
    $: bgColor = colorScheme === 'auto' ? getColorFromName(name) : 
                 colorScheme === 'fixed' ? '#6B7280' : // gray-500
                 colorScheme;
    
    $: initials = name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2) || '?';
</script>

{#if image}
    <img 
        src={image} 
        alt={name}
        class="{sizes[size]} rounded-full object-cover shadow-sm"
    />
{:else}
    <div 
        class="{sizes[size]} rounded-full flex items-center justify-center text-white font-semibold shadow-sm"
        style="background-color: {bgColor};"
    >
        {initials}
    </div>
{/if}