<script>
    import { useForm, Link } from '@inertiajs/svelte';
    import AuthLayout from '@/Components/Layouts/AuthLayout.svelte';
    import Button from '@/Components/UI/Button.svelte';
    import EmailInput from '@/Components/UI/Form/EmailInput.svelte';
    import FormError from '@/Components/UI/Form/FormError.svelte';
    
    let { status = '' } = $props();
    
    const form = useForm({
        email: '',
    });
    
    function submit() {
        $form.post('/forgot-password');
    }
</script>

<AuthLayout 
    title="Forgot password?"
    subtitle="No worries, we'll send you reset instructions"
>
    <!-- Success Message -->
    {#if status}
        <div class="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg mb-6">
            <div class="flex items-center">
                <i class="fas fa-check-circle mr-2"></i>
                <p class="text-sm">{status}</p>
            </div>
        </div>
    {/if}
    
    <!-- Error Alert -->
    <FormError errors={$form.errors} />
    
    <!-- Form -->
    <form onsubmit={(e) => { e.preventDefault(); submit(); }} class="space-y-5">
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
        
        <!-- Submit Button -->
        <div class="pt-2">
            <Button
                type="submit"
                variant="primary"
                size="lg"
                class="w-full"
                loading={$form.processing}
                disabled={$form.processing}
                icon={$form.processing ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'}
            >
                {$form.processing ? 'Sending...' : 'Send reset link'}
            </Button>
        </div>
    </form>
    
    <!-- Back to login link -->
    <div class="mt-8 pt-6 border-t border-gray-100 text-center">
        <Link href="/login" class="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors">
            <i class="fas fa-arrow-left mr-2"></i>
            Back to login
        </Link>
        
        <!-- Help text -->
        <p class="text-xs text-gray-500 mt-4">
            If you don't receive an email, check your spam folder or
            <a href="#" class="text-orange-600 hover:text-orange-700"> contact support</a>
        </p>
    </div>
</AuthLayout>