<script>
    import { page } from '@inertiajs/svelte';
    import GuestLayout from '@/Components/Layouts/GuestLayout.svelte';
    import Button from '@/Components/UI/Button.svelte';
    
    const isAuthenticated = $derived($page.props.auth?.user !== null);
    const userRoles = $derived($page.props.auth?.user?.roles || []);
    const isAdminRole = $derived(userRoles.includes('admin') || userRoles.includes('super-admin'));
    const dashboardUrl = $derived(isAdminRole ? '/admin/dashboard' : '/dashboard');

    const features = [
        {
            icon: 'fas fa-shield-alt',
            title: 'Secure Authentication',
            description: 'Complete authentication system powered by Laravel Fortify with login, registration, password reset, and email verification.',
            highlights: ['Login & Register', 'Password Reset', 'Email Verification', 'Remember Me']
        },
        {
            icon: 'fas fa-users-cog',
            title: 'User Management',
            description: 'Full-featured admin panel for managing users with role-based access control and complete CRUD operations.',
            highlights: ['Role-Based Access', 'CRUD Operations', 'User Profiles', 'Admin Dashboard']
        },
        {
            icon: 'fas fa-palette',
            title: 'Modern UI Components',
            description: 'Beautiful, responsive UI components built with Tailwind CSS v4 and 5 customizable color themes.',
            highlights: ['5 Color Themes', 'Dark/Light Mode', 'Responsive Design', 'Reusable Components']
        },
        {
            icon: 'fas fa-bolt',
            title: 'Lightning Fast',
            description: 'SPA-like experience with Inertia.js - no page reloads, instant navigation, and optimized performance.',
            highlights: ['No Page Reloads', 'Instant Navigation', 'HMR Development', 'Optimized Build']
        },
        {
            icon: 'fas fa-code',
            title: 'Developer Friendly',
            description: 'Clean, well-structured codebase with Svelte 5 reactivity, TypeScript-ready components, and comprehensive documentation.',
            highlights: ['Svelte 5 Runes', 'TypeScript Ready', 'Clean Architecture', 'Well Documented']
        },
        {
            icon: 'fas fa-layer-group',
            title: 'Production Ready',
            description: 'Built on Laravel 12 with queue workers, logging, testing setup, and everything you need for production deployment.',
            highlights: ['Laravel 12', 'Queue Workers', 'PHPUnit Tests', 'Easy Deployment']
        }
    ];

    const techStack = [
        { name: 'Laravel 12', svg: 'laravel' },
        { name: 'Svelte 5', svg: 'svelte' },
        { name: 'Inertia.js', svg: 'inertia' },
        { name: 'Tailwind CSS', svg: 'tailwind' },
        { name: 'Vite', svg: 'vite' },
        { name: 'Fortify', svg: 'fortify' }
    ];
</script>

<GuestLayout>
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100/50"></div>
        <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div class="relative max-w-7xl mx-auto py-20 px-4 sm:py-32 sm:px-6 lg:px-8">
            <div class="text-center">
                <div class="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <i class="fas fa-star"></i>
                    <span>Production-Ready Starter Kit</span>
                </div>
                
                <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
                    <span class="block">Build Modern Apps</span>
                    <span class="block text-primary-600 mt-2">Faster Than Ever</span>
                </h1>
                
                <p class="max-w-2xl mt-6 mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed">
                    A complete starter kit combining <strong>Laravel 12</strong>, <strong>Svelte 5</strong>, and <strong>Inertia.js</strong> 
                    with authentication, admin dashboard, user management, and beautiful UI components out of the box.
                </p>
                
                <!-- CTA Buttons -->
                <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    {#if isAuthenticated}
                        <Button 
                            href={dashboardUrl}
                            variant="primary" 
                            size="lg" 
                            icon="fas fa-arrow-right"
                        >
                            Go to Dashboard
                        </Button>
                    {:else}
                        <Button 
                            href="/register"
                            variant="primary" 
                            size="lg" 
                            icon="fas fa-rocket"
                        >
                            Get Started Free
                        </Button>
                        <Button 
                            href="/login"
                            variant="secondary" 
                            size="lg" 
                            icon="fas fa-sign-in-alt"
                        >
                            Sign In
                        </Button>
                    {/if}
                </div>

                <!-- Tech Stack -->
                <div class="mt-16">
                    <p class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">Powered By</p>
                    <div class="flex flex-wrap justify-center gap-6 sm:gap-10">
                        {#each techStack as tech}
                            <div class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                                {#if tech.svg === 'laravel'}
                                    <svg class="w-6 h-6" viewBox="0 0 50 52" xmlns="http://www.w3.org/2000/svg"><path d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 0 1-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.944A.801.801 0 0 1 0 39.25V6.334c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.024.055-.05.088-.069h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533h.002c.032.02.059.045.088.068.026.02.055.038.078.06.028.029.048.062.072.094.017.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068a.809.809 0 0 1 .028.209v20.559l8.008-4.611v-10.51c0-.07.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.015-.026.037-.047.054-.071.024-.032.044-.065.072-.093.023-.023.052-.04.078-.06.03-.024.056-.05.088-.069h.001l9.611-5.533a.801.801 0 0 1 .8 0l9.61 5.533c.034.02.06.045.09.068.025.02.054.038.077.06.028.029.048.062.072.094.018.024.04.045.054.071.023.039.036.082.052.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.646 2.675v9.124l8.01-4.611zm-9.61 16.505v-9.13l-4.57 2.61-13.05 7.448v9.216l17.62-10.144zM1.602 7.719v31.068L19.22 48.93v-9.214l-9.204-5.209-.003-.002-.004-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09v-.002-21.481L4.965 9.654 1.602 7.72zm8.81-5.994L2.405 6.334l8.005 4.609 8.006-4.61-8.006-4.608zm4.164 28.764l4.645-2.674V7.719l-3.363 1.936-4.646 2.675v20.096l3.364-1.937zM39.243 7.164l-8.006 4.609 8.006 4.609 8.005-4.61-8.005-4.608zm-.801 10.605l-4.646-2.675-3.363-1.936v9.124l4.645 2.674 3.364 1.937v-9.124zM20.02 38.33l11.743-6.704 5.87-3.35-8-4.606-9.211 5.303-8.395 4.833 7.993 4.524z" fill="#FF2D20" fill-rule="evenodd"/></svg>
                                {:else if tech.svg === 'svelte'}
                                    <svg class="w-6 h-6" viewBox="0 0 107 128" xmlns="http://www.w3.org/2000/svg"><path d="M94.1566,22.8189c-10.4-14.8851-30.94-19.2971-45.7914-9.8348L22.2825,29.6078A29.9234,29.9234,0,0,0,8.7639,49.6506a31.5136,31.5136,0,0,0,3.1076,20.2318A30.0061,30.0061,0,0,0,7.3953,81.0653a31.8886,31.8886,0,0,0,5.4473,24.1157c10.4022,14.8865,30.9423,19.2966,45.7914,9.8348L84.7167,98.3921A29.9177,29.9177,0,0,0,98.2353,78.3493,31.5263,31.5263,0,0,0,95.13,58.117a30,30,0,0,0,4.4743-11.1824,31.88,31.88,0,0,0-5.4473-24.1157" fill="#ff3e00"/><path d="M45.8171,106.5815A20.7182,20.7182,0,0,1,23.58,98.3389a19.1739,19.1739,0,0,1-3.2766-14.5025,18.1886,18.1886,0,0,1,.6233-2.4357l.4912-1.4978,1.3363.9815a33.6443,33.6443,0,0,0,10.203,5.0978l.9694.2941-.0893.9675a5.8474,5.8474,0,0,0,1.052,3.8781,6.2389,6.2389,0,0,0,6.6952,2.485,5.7449,5.7449,0,0,0,1.6021-.7041L69.27,76.281a5.4306,5.4306,0,0,0,2.4506-3.631,5.7948,5.7948,0,0,0-.9875-4.3712,6.2436,6.2436,0,0,0-6.6978-2.4864,5.7427,5.7427,0,0,0-1.6.7036l-9.9532,6.3449a19.0329,19.0329,0,0,1-5.2965,2.3259,20.7181,20.7181,0,0,1-22.2368-8.2427,19.1725,19.1725,0,0,1-3.2766-14.5024,17.9885,17.9885,0,0,1,8.13-12.0513L55.8833,23.7472a19.0038,19.0038,0,0,1,5.3-2.3287A20.7182,20.7182,0,0,1,83.42,29.6611a19.1739,19.1739,0,0,1,3.2766,14.5025,18.4,18.4,0,0,1-.6233,2.4357l-.4912,1.4978-1.3356-.98a33.6175,33.6175,0,0,0-10.2037-5.1l-.9694-.2942.0893-.9675a5.8588,5.8588,0,0,0-1.052-3.878,6.2389,6.2389,0,0,0-6.6952-2.485,5.7449,5.7449,0,0,0-1.6021.7041L37.73,51.719a5.4218,5.4218,0,0,0-2.4487,3.63,5.7862,5.7862,0,0,0,.9856,4.3717,6.2437,6.2437,0,0,0,6.6978,2.4864,5.7652,5.7652,0,0,0,1.602-.7041l9.9519-6.3425a18.978,18.978,0,0,1,5.2959-2.3278,20.7181,20.7181,0,0,1,22.2368,8.2427,19.1725,19.1725,0,0,1,3.2766,14.5024,17.9977,17.9977,0,0,1-8.13,12.0532L51.1167,104.2528a19.0038,19.0038,0,0,1-5.3,2.3287" fill="#fff"/></svg>
                                {:else if tech.svg === 'inertia'}
                                    <svg class="w-6 h-6" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="inertia-grad" x1="0" x2="128" y1="64" y2="64" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9553e9"/><stop offset="1" stop-color="#6d74ed"/></linearGradient></defs><path fill="url(#inertia-grad)" d="M92.433 28.433H55.625L91.192 64 55.625 99.567h36.808L128 64zm-55.625 0H0L35.567 64 0 99.567h36.808L72.375 64z"/></svg>
                                {:else if tech.svg === 'tailwind'}
                                    <svg class="w-6 h-6" viewBox="0 0 54 33" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#tailwind-clip)"><path fill="#38bdf8" fill-rule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" clip-rule="evenodd"/></g><defs><clipPath id="tailwind-clip"><path fill="#fff" d="M0 0h54v32.4H0z"/></clipPath></defs></svg>
                                {:else if tech.svg === 'vite'}
                                    <svg class="w-6 h-6" viewBox="0 0 410 404" xmlns="http://www.w3.org/2000/svg"><path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1434 399.641 59.5246Z" fill="url(#vite-grad1)"/><path d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.5 323.5L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9228L279.014 102.454C275.347 103.161 272.227 99.746 273.262 96.1583L298.731 7.86689C299.767 4.27314 296.636 0.855181 292.965 1.5744Z" fill="url(#vite-grad2)"/><defs><linearGradient id="vite-grad1" x1="6.00017" y1="32.9999" x2="235" y2="344" gradientUnits="userSpaceOnUse"><stop stop-color="#41D1FF"/><stop offset="1" stop-color="#BD34FE"/></linearGradient><linearGradient id="vite-grad2" x1="194.651" y1="8.81818" x2="236.076" y2="292.989" gradientUnits="userSpaceOnUse"><stop stop-color="#FFEA83"/><stop offset="0.0833333" stop-color="#FFDD35"/><stop offset="1" stop-color="#FFA800"/></linearGradient></defs></svg>
                                {:else if tech.svg === 'fortify'}
                                    <svg class="w-6 h-6" viewBox="0 0 50 52" xmlns="http://www.w3.org/2000/svg"><path d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 0 1-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.944A.801.801 0 0 1 0 39.25V6.334c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.024.055-.05.088-.069h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533h.002c.032.02.059.045.088.068.026.02.055.038.078.06.028.029.048.062.072.094.017.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068a.809.809 0 0 1 .028.209v20.559l8.008-4.611v-10.51c0-.07.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.015-.026.037-.047.054-.071.024-.032.044-.065.072-.093.023-.023.052-.04.078-.06.03-.024.056-.05.088-.069h.001l9.611-5.533a.801.801 0 0 1 .8 0l9.61 5.533c.034.02.06.045.09.068.025.02.054.038.077.06.028.029.048.062.072.094.018.024.04.045.054.071.023.039.036.082.052.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.646 2.675v9.124l8.01-4.611zm-9.61 16.505v-9.13l-4.57 2.61-13.05 7.448v9.216l17.62-10.144zM1.602 7.719v31.068L19.22 48.93v-9.214l-9.204-5.209-.003-.002-.004-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09v-.002-21.481L4.965 9.654 1.602 7.72zm8.81-5.994L2.405 6.334l8.005 4.609 8.006-4.61-8.006-4.608zm4.164 28.764l4.645-2.674V7.719l-3.363 1.936-4.646 2.675v20.096l3.364-1.937zM39.243 7.164l-8.006 4.609 8.006 4.609 8.005-4.61-8.005-4.608zm-.801 10.605l-4.646-2.675-3.363-1.936v9.124l4.645 2.674 3.364 1.937v-9.124zM20.02 38.33l11.743-6.704 5.87-3.35-8-4.606-9.211 5.303-8.395 4.833 7.993 4.524z" fill="#22C55E" fill-rule="evenodd"/></svg>
                                {/if}
                                <span class="font-medium">{tech.name}</span>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">
                    Everything You Need to Build
                </h2>
                <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Stop wasting time on boilerplate. Start building your application with a solid foundation that includes all essential features.
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each features as feature}
                    <div class="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                        <div class="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:scale-110 transition-all duration-300">
                            <i class="{feature.icon} text-primary-600 text-2xl group-hover:text-white transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                        <p class="text-gray-600 mb-5 leading-relaxed">{feature.description}</p>
                        <div class="flex flex-wrap gap-2">
                            {#each feature.highlights as highlight}
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                                    {highlight}
                                </span>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">
                    Get Started in Minutes
                </h2>
                <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Clone, install, and start building. It's that simple.
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div class="text-center">
                    <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                        1
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Clone & Install</h3>
                    <p class="text-gray-600">Clone the repository and run composer install & npm install</p>
                </div>
                
                <div class="text-center">
                    <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                        2
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Configure</h3>
                    <p class="text-gray-600">Set up your .env file and run database migrations</p>
                </div>
                
                <div class="text-center">
                    <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                        3
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Build</h3>
                    <p class="text-gray-600">Start developing with hot reload using composer dev</p>
                </div>
            </div>
            
            <!-- Code Example -->
            <div class="mt-12 max-w-2xl mx-auto">
                <div class="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                    <div class="flex items-center gap-2 px-4 py-3 bg-gray-800">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        <span class="ml-2 text-gray-400 text-sm">Terminal</span>
                    </div>
                    <div class="p-6 font-mono text-sm">
                        <p class="text-gray-400"># Clone and setup</p>
                        <p class="text-green-400">$ git clone [repository-url]</p>
                        <p class="text-green-400">$ composer install && npm install</p>
                        <p class="text-green-400">$ cp .env.example .env && php artisan key:generate</p>
                        <p class="text-green-400">$ php artisan migrate --seed</p>
                        <p class="text-gray-400 mt-4"># Start development</p>
                        <p class="text-green-400">$ composer dev</p>
                        <p class="text-gray-500 mt-2"># Server running on http://localhost:8000</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary-600">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Build Something Amazing?
            </h2>
            <p class="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
                Join developers who are building modern web applications faster with this starter kit.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                {#if isAuthenticated}
                    <Button 
                        href={dashboardUrl}
                        variant="secondary" 
                        size="lg" 
                        icon="fas fa-arrow-right"
                    >
                        Go to Dashboard
                    </Button>
                {:else}
                    <Button 
                        href="/register"
                        variant="secondary" 
                        size="lg" 
                        icon="fas fa-rocket"
                    >
                        Get Started Free
                    </Button>
                    <a 
                        href="https://github.com" 
                        target="_blank"
                        class="inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <i class="fab fa-github"></i>
                        View on GitHub
                    </a>
                {/if}
            </div>
        </div>
    </section>
</GuestLayout>