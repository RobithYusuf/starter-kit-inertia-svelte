<script>
    import { onMount } from 'svelte';
    import { Link } from '@inertiajs/svelte';
    import Logo from '@/Components/Shared/Logo.svelte';
    
    export let title = '';
    export let subtitle = '';
    
    let mounted = false;
    
    onMount(() => {
        mounted = true;
    });
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 py-12 px-4 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 z-0">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>
    
    <div class="w-full max-w-md relative z-10 transform transition-all duration-700 {mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}">
        <!-- Logo Section -->
        <div class="flex justify-center mb-8">
            <Logo 
                href="/" 
                size="large" 
                showTagline={true}
                theme="light"
            >
                <span slot="tagline">Laravel 12 Inertia Svelte</span>
            </Logo>
        </div>
        
        <!-- Card Container -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100 auth-page-content">
            <!-- Header -->
            {#if title || subtitle}
            <div class="text-center mb-6">
                {#if title}
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">
                        {title}
                    </h2>
                {/if}
                {#if subtitle}
                    <p class="text-gray-600">
                        {subtitle}
                    </p>
                {/if}
            </div>
            {/if}
            
            <!-- Content Slot -->
            <slot />
        </div>
        
        <!-- Footer -->
        <div class="text-center mt-8">
            <p class="text-xs text-gray-600">
                By continuing, you agree to our 
                <a href="#" class="text-primary-600 hover:text-primary-700 font-medium">Terms of Service</a> and 
                <a href="#" class="text-primary-600 hover:text-primary-700 font-medium">Privacy Policy</a>
            </p>
        </div>
    </div>
</div>

<style>
    @keyframes blob {
        0% {
            transform: translate(0px, 0px) scale(1);
        }
        33% {
            transform: translate(30px, -50px) scale(1.1);
        }
        66% {
            transform: translate(-20px, 20px) scale(0.9);
        }
        100% {
            transform: translate(0px, 0px) scale(1);
        }
    }
    
    .animate-blob {
        animation: blob 7s infinite;
    }
    
    .animation-delay-2000 {
        animation-delay: 2s;
    }
    
    .animation-delay-4000 {
        animation-delay: 4s;
    }
</style>