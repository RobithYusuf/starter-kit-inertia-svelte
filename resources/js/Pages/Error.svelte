<script>
    import GuestLayout from '@/Components/Layouts/GuestLayout.svelte';
    import Button from '@/Components/UI/Button.svelte';
    
    export let status;
    
    const errors = {
        403: {
            title: 'Forbidden',
            message: 'You do not have permission to access this resource.'
        },
        404: {
            title: 'Page Not Found',
            message: 'The page you are looking for could not be found.'
        },
        419: {
            title: 'Page Expired',
            message: 'The page has expired. Please refresh and try again.'
        },
        500: {
            title: 'Server Error',
            message: 'Something went wrong on our servers.'
        },
        503: {
            title: 'Service Unavailable',
            message: 'We are currently performing maintenance. Please try again later.'
        }
    };
    
    $: error = errors[status] || {
        title: `Error ${status}`,
        message: 'An unexpected error occurred.'
    };
</script>

<GuestLayout>
    <div class="flex items-center justify-center px-4 py-16">
        <div class="max-w-md w-full text-center">
            <div class="text-6xl font-bold text-gray-300 mb-4">{status}</div>
            <h1 class="text-2xl font-semibold text-gray-800 mb-2">{error.title}</h1>
            <p class="text-gray-600 mb-8">{error.message}</p>
            <Button 
                href="/"
                variant="primary"
                icon="fas fa-home"
            >
                Go to Homepage
            </Button>
        </div>
    </div>
</GuestLayout>