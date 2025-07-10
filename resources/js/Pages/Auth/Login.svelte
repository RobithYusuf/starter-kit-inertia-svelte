<script>
    import { useForm } from '@inertiajs/svelte';
    import { Link } from '@inertiajs/svelte';
    import AuthLayout from '@/Components/Layouts/AuthLayout.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import PasswordInput from '@/Components/UI/Form/PasswordInput.svelte';
    import EmailInput from '@/Components/UI/Form/EmailInput.svelte';
    import FormError from '@/Components/UI/Form/FormError.svelte';
    
    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });
    
    function submit() {
        $form.post('/login', {
            onError: (errors) => {
                console.error('Login errors:', errors);
            },
        });
    }
</script>

<AuthLayout 
    title="Welcome back"
    subtitle="Sign in to your account to continue"
>
    <!-- Error Alert -->
    {#if Object.keys($form.errors).length > 0}
        <FormError errors={$form.errors} title="Login gagal" />
    {/if}
    
    <!-- Form -->
    <form on:submit|preventDefault={submit} class="space-y-5">
        <!-- Email Field -->
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
            </label>
            <EmailInput
                id="email"
                bind:value={$form.email}
                error={$form.errors.email}
                required
            />
        </div>
        
        <!-- Password Field -->
        <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1.5">
                Password
            </label>
            <PasswordInput
                id="password"
                bind:value={$form.password}
                placeholder="Enter your password"
                error={$form.errors.password}
                required
            />
        </div>
        
        <!-- Remember & Forgot -->
        <div class="flex items-center justify-between mt-6">
            <label class="flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    bind:checked={$form.remember}
                    class="w-4 h-4 border-gray-300 rounded transition-colors"
                    style="accent-color: var(--theme-primary-600)"
                />
                <span class="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
            
            <Link href="/forgot-password" class="text-sm font-medium transition-colors"
                  style="color: var(--theme-primary-600)"
                  on:mouseenter={(e) => e.currentTarget.style.color = 'var(--theme-primary-700)'}
                  on:mouseleave={(e) => e.currentTarget.style.color = 'var(--theme-primary-600)'}>
                Forgot password?
            </Link>
        </div>
        
        <!-- Submit Button -->
        <div class="pt-2">
            <Button
                type="submit"
                variant="primary"
                size="lg"
                class="w-full"
                loading={$form.processing}
                disabled={$form.processing}
                icon={$form.processing ? 'fas fa-spinner fa-spin' : 'fas fa-sign-in-alt'}
            >
                {$form.processing ? 'Signing in...' : 'Sign in'}
            </Button>
        </div>
    </form>
    
    <!-- Sign up link -->
    <div class="mt-8 pt-6 border-t border-gray-100 text-center">
        <p class="text-sm text-gray-600">
            Don't have an account?
            <Link href="/register" class="font-medium transition-colors"
                  style="color: var(--theme-primary-600)"
                  on:mouseenter={(e) => e.currentTarget.style.color = 'var(--theme-primary-700)'}
                  on:mouseleave={(e) => e.currentTarget.style.color = 'var(--theme-primary-600)'}>
                Sign up for free
            </Link>
        </p>
    </div>
</AuthLayout>