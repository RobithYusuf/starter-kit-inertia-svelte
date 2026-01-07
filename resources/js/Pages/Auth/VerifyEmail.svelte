<script>
    import { useForm } from '@inertiajs/svelte';
    import AuthLayout from '@/Components/Layouts/AuthLayout.svelte';
    import Button from '@/Components/UI/Button.svelte';
    
    let { status = null } = $props();
    
    const form = useForm({});
    
    function resendEmail() {
        $form.post('/email/verification-notification');
    }
</script>

<AuthLayout title="Verify Email" subtitle="Please verify your email address to continue">
    <div class="text-center">
        <div class="mb-6">
            <div class="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
                <i class="fas fa-envelope text-2xl text-primary-600"></i>
            </div>
        </div>
        
        <p class="text-gray-600 mb-6">
            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you?
        </p>
        
        <p class="text-gray-600 mb-6">
            If you didn't receive the email, we will gladly send you another.
        </p>
        
        {#if status === 'verification-link-sent'}
            <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p class="text-sm text-green-700">
                    <i class="fas fa-check-circle mr-2"></i>
                    A new verification link has been sent to your email address.
                </p>
            </div>
        {/if}
        
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
                onclick={resendEmail}
                variant="primary"
                icon="fas fa-paper-plane"
                loading={$form.processing}
            >
                Resend Verification Email
            </Button>
            
            <form method="POST" action="/logout" class="inline">
                <Button
                    type="submit"
                    variant="ghost"
                    icon="fas fa-sign-out-alt"
                >
                    Log Out
                </Button>
            </form>
        </div>
    </div>
</AuthLayout>
