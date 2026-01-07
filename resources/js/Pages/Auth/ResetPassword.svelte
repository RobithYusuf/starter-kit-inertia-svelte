<script>
    import { useForm, Link } from '@inertiajs/svelte';
    import AuthLayout from '@/Components/Layouts/AuthLayout.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import EmailInput from '@/Components/UI/Form/EmailInput.svelte';
    import PasswordInput from '@/Components/UI/Form/PasswordInput.svelte';
    import FormError from '@/Components/UI/Form/FormError.svelte';
    
    let { token = '', email = '' } = $props();
    
    const form = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });
    
    function submit() {
        $form.post('/reset-password');
    }
</script>

<AuthLayout 
    title="Reset your password"
    subtitle="Enter your new password below"
>
    <!-- Error Alert -->
    <FormError errors={$form.errors} title="Please fix the following errors" />
    
    <!-- Form -->
    <form onsubmit={(e) => { e.preventDefault(); submit(); }} class="space-y-5">
        <!-- Email Field (readonly) -->
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
            </label>
            <EmailInput
                id="email"
                bind:value={$form.email}
                readonly={true}
                disabled={true}
            />
        </div>
        
        <!-- New Password Field -->
        <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1.5">
                New Password
            </label>
            <PasswordInput
                id="password"
                bind:value={$form.password}
                placeholder="Enter new password"
                error={$form.errors.password}
                required
            />
        </div>
        
        <!-- Confirm Password Field -->
        <div>
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm New Password
            </label>
            <PasswordInput
                id="password_confirmation"
                bind:value={$form.password_confirmation}
                placeholder="Confirm new password"
                error={$form.errors.password_confirmation}
                required
            />
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
                icon={$form.processing ? 'fas fa-spinner fa-spin' : 'fas fa-key'}
            >
                {$form.processing ? 'Resetting password...' : 'Reset password'}
            </Button>
        </div>
    </form>
    
    <!-- Back to login link -->
    <div class="mt-8 pt-6 border-t border-gray-100 text-center">
        <p class="text-sm text-gray-600">
            Remember your password?
            <Link href="/login" class="font-medium text-orange-600 hover:text-orange-700 transition-colors">
                Back to login
            </Link>
        </p>
    </div>
</AuthLayout>