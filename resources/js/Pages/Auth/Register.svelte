<script>
    import { useForm, Link } from '@inertiajs/svelte';
    import AuthLayout from '@/Components/Layouts/AuthLayout.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import PasswordInput from '@/Components/UI/Form/PasswordInput.svelte';
    import EmailInput from '@/Components/UI/Form/EmailInput.svelte';
    import FormError from '@/Components/UI/Form/FormError.svelte';
    
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    
    function submit() {
        $form.post('/register', {
            onError: (errors) => {
                console.error('Register errors:', errors);
            },
        });
    }
</script>

<AuthLayout 
    title="Create your account"
    subtitle="Join us and start your journey"
>
    <!-- Error Alert -->
    <FormError errors={$form.errors} />
    
    <!-- Form -->
    <form onsubmit={(e) => { e.preventDefault(); submit(); }} class="space-y-5">
        <!-- Name Field -->
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
            </label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-user text-gray-400"></i>
                </div>
                <input
                    id="name"
                    type="text"
                    bind:value={$form.name}
                    placeholder="John Doe"
                    class="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg transition-all duration-200 focus:outline-none hover:border-gray-400 {$form.errors.name ? 'border-red-500 bg-red-50' : ''}"
                    onfocus={(e) => {
                        if (!$form.errors.name) {
                            e.currentTarget.style.borderColor = 'var(--theme-primary-500)';
                            e.currentTarget.style.boxShadow = '0 0 0 3px var(--theme-primary-500)33';
                        }
                    }}
                    onblur={(e) => {
                        if (!$form.errors.name) {
                            e.currentTarget.style.borderColor = '#d1d5db';
                        }
                        e.currentTarget.style.boxShadow = '';
                    }}
                    required
                />
            </div>
        </div>
        
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
                placeholder="Create a strong password"
                error={$form.errors.password}
                showStrength={true}
                autocomplete="new-password"
                required
            />
        </div>
        
        <!-- Confirm Password Field -->
        <div>
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password
            </label>
            <PasswordInput
                id="password_confirmation"
                bind:value={$form.password_confirmation}
                placeholder="Confirm your password"
                error={$form.errors.password_confirmation}
                autocomplete="new-password"
                required
            />
        </div>
        
        <!-- Terms Checkbox -->
        <div class="flex items-start mt-6">
            <input
                id="terms"
                type="checkbox"
                class="w-4 h-4 border-gray-300 rounded transition-colors mt-0.5"
                style="accent-color: var(--theme-primary-600)"
                required
            />
            <label for="terms" class="ml-2 text-sm text-gray-700">
                I agree to the 
                <a href="#" class="font-medium transition-colors hover:opacity-80"
                   style="color: var(--theme-primary-600)">Terms</a> and 
                <a href="#" class="font-medium transition-colors hover:opacity-80"
                   style="color: var(--theme-primary-600)">Privacy Policy</a>
            </label>
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
                icon={$form.processing ? 'fas fa-spinner fa-spin' : 'fas fa-user-plus'}
            >
                {$form.processing ? 'Creating account...' : 'Create account'}
            </Button>
        </div>
    </form>
    
    <!-- Sign in link -->
    <div class="mt-8 pt-6 border-t border-gray-100 text-center">
        <p class="text-sm text-gray-600">
            Already have an account?
            <Link href="/login" class="font-medium transition-colors hover:opacity-80"
                  style="color: var(--theme-primary-600)">
                Sign in instead
            </Link>
        </p>
    </div>
</AuthLayout>