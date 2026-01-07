<script>
    let { 
        title = '',
        subtitle = '',
        icon = null,
        image = null,
        action = null,
        variant = 'default',
        padded = true,
        children,
        header,
        footer
    } = $props();
    
    const variants = {
        default: 'bg-white border-gray-200',
        primary: 'bg-primary-50 border-primary-200',
        success: 'bg-green-50 border-green-200',
        warning: 'bg-yellow-50 border-yellow-200',
        danger: 'bg-red-50 border-red-200'
    };
</script>

<div class="rounded-lg border shadow-sm hover:shadow-md transition-shadow {variants[variant]}">
    {#if image}
        <img 
            src={image} 
            alt={title}
            class="w-full h-48 object-cover rounded-t-lg"
        />
    {/if}
    
    {#if header}
        <div class="border-b border-gray-200 px-4 py-3 bg-gray-50/50 rounded-t-lg">
            {@render header()}
        </div>
    {:else if title || subtitle || icon}
        <div class="border-b border-gray-200 px-4 py-3 {image ? '' : 'rounded-t-lg'}">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    {#if icon}
                        <div class="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                            <i class="{icon}"></i>
                        </div>
                    {/if}
                    <div>
                        {#if title}
                            <h3 class="font-semibold text-gray-900">{title}</h3>
                        {/if}
                        {#if subtitle}
                            <p class="text-sm text-gray-500">{subtitle}</p>
                        {/if}
                    </div>
                </div>
                
                {#if action}
                    {@render action()}
                {/if}
            </div>
        </div>
    {/if}
    
    {#if children}
        <div class="{padded ? 'p-4' : ''}">
            {@render children()}
        </div>
    {/if}
    
    {#if footer}
        <div class="border-t border-gray-200 px-4 py-3 bg-gray-50/50 rounded-b-lg">
            {@render footer()}
        </div>
    {/if}
</div>
