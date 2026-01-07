<script>
    let { 
        variant = 'info',
        title = '',
        message = '',
        icon = null,
        dismissible = false,
        onclose = null,
        children
    } = $props();
    
    let visible = $state(true);
    
    const variants = {
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            icon: 'fas fa-info-circle text-blue-500',
            title: 'text-blue-800',
            text: 'text-blue-700'
        },
        success: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            icon: 'fas fa-check-circle text-green-500',
            title: 'text-green-800',
            text: 'text-green-700'
        },
        warning: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            icon: 'fas fa-exclamation-triangle text-yellow-500',
            title: 'text-yellow-800',
            text: 'text-yellow-700'
        },
        danger: {
            bg: 'bg-red-50',
            border: 'border-red-200',
            icon: 'fas fa-times-circle text-red-500',
            title: 'text-red-800',
            text: 'text-red-700'
        }
    };
    
    let currentVariant = $derived(variants[variant] || variants.info);
    let displayIcon = $derived(icon || currentVariant.icon);
    
    function handleClose() {
        visible = false;
        onclose?.();
    }
</script>

{#if visible}
    <div 
        class="rounded-lg border p-4 {currentVariant.bg} {currentVariant.border}"
        role="alert"
    >
        <div class="flex">
            <div class="flex-shrink-0">
                <i class="{displayIcon}"></i>
            </div>
            
            <div class="ml-3 flex-1">
                {#if title}
                    <h3 class="text-sm font-medium {currentVariant.title}">{title}</h3>
                {/if}
                
                {#if message}
                    <p class="text-sm {currentVariant.text} {title ? 'mt-1' : ''}">{message}</p>
                {/if}
                
                {#if children}
                    <div class="text-sm {currentVariant.text} {title ? 'mt-1' : ''}">
                        {@render children()}
                    </div>
                {/if}
            </div>
            
            {#if dismissible}
                <div class="flex-shrink-0 ml-4">
                    <button 
                        type="button"
                        onclick={handleClose}
                        class="-m-1.5 p-1.5 rounded-lg hover:bg-black/5 transition-colors {currentVariant.text}"
                    >
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
            {/if}
        </div>
    </div>
{/if}
