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
    <div class="flex items-center justify-center px-4 py-12 sm:py-16 md:py-24 min-h-[60vh] sm:min-h-[70vh]">
        <div class="max-w-md w-full text-center">
            <!-- Error Icon and Code -->
            <div class="relative mb-6 sm:mb-8">
                <div class="text-8xl sm:text-9xl md:text-[10rem] font-bold text-gray-100 leading-none">
                    {status}
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <i class="fas fa-exclamation-circle text-4xl sm:text-5xl text-gray-300"></i>
                </div>
            </div>
            
            <!-- Error Title and Message -->
            <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
                {error.title}
            </h1>
            <p class="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4 sm:px-0">
                {error.message}
            </p>
            
            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 justify-center px-4 sm:px-0">
                <Button 
                    href="/"
                    variant="primary"
                    icon="fas fa-home"
                    size="default"
                    className="w-full sm:w-auto"
                >
                    Go to Homepage
                </Button>
                <Button 
                    variant="ghost"
                    icon="fas fa-arrow-left"
                    size="default"
                    className="w-full sm:w-auto"
                    on:click={() => window.history.back()}
                >
                    Go Back
                </Button>
            </div>
        </div>
    </div>
</GuestLayout>