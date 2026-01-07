<script>
    import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
    import PageHeader from '@/Components/Dashboard/PageHeader.svelte';
    import Card from '@/Components/UI/Card.svelte';
    import Tabs from '@/Components/UI/Tabs.svelte';
    
    // UI Components
    import Button from '@/Components/UI/Button.svelte';
    import Badge from '@/Components/UI/Badge.svelte';
    import Spinner from '@/Components/UI/Spinner.svelte';
    import Skeleton from '@/Components/UI/Skeleton.svelte';
    import Tooltip from '@/Components/UI/Tooltip.svelte';
    import Toggle from '@/Components/UI/Toggle.svelte';
    import Alert from '@/Components/UI/Alert.svelte';
    import Progress from '@/Components/UI/Progress.svelte';
    import Avatar from '@/Components/UI/Avatar.svelte';
    import AvatarGroup from '@/Components/UI/AvatarGroup.svelte';
    import Breadcrumb from '@/Components/UI/Breadcrumb.svelte';
    import Accordion from '@/Components/UI/Accordion.svelte';
    import Modal from '@/Components/UI/Modal.svelte';
    import ConfirmModal from '@/Components/UI/ConfirmModal.svelte';
    import Dropdown from '@/Components/UI/Dropdown.svelte';
    import DropdownItem from '@/Components/UI/DropdownItem.svelte';
    import Pagination from '@/Components/UI/Pagination.svelte';
    import StatCard from '@/Components/UI/StatCard.svelte';
    import EmptyState from '@/Components/UI/EmptyState.svelte';
    import CardAdvanced from '@/Components/UI/CardAdvanced.svelte';
    
    // Form Components
    import TextInput from '@/Components/UI/Form/TextInput.svelte';
    import Textarea from '@/Components/UI/Form/Textarea.svelte';
    import Select from '@/Components/UI/Form/Select.svelte';
    import MultiSelect from '@/Components/UI/Form/MultiSelect.svelte';
    import DatePicker from '@/Components/UI/Form/DatePicker.svelte';
    import DateRangePicker from '@/Components/UI/Form/DateRangePicker.svelte';
    import RangeSlider from '@/Components/UI/Form/RangeSlider.svelte';
    import TagInput from '@/Components/UI/Form/TagInput.svelte';
    import Checkbox from '@/Components/UI/Form/Checkbox.svelte';
    import PasswordInput from '@/Components/UI/Form/PasswordInput.svelte';
    import FileUpload from '@/Components/UI/Form/FileUpload.svelte';
    import RadioOption from '@/Components/UI/Form/RadioOption.svelte';
    
    let activeTab = $state(0);
    
    const tabs = [
        { label: 'Buttons', icon: 'fas fa-mouse-pointer' },
        { label: 'Badges & Status', icon: 'fas fa-tag' },
        { label: 'Forms', icon: 'fas fa-edit' },
        { label: 'Feedback', icon: 'fas fa-comment' },
        { label: 'Data Display', icon: 'fas fa-table' },
        { label: 'Overlays', icon: 'fas fa-layer-group' },
        { label: 'Navigation', icon: 'fas fa-compass' },
    ];
    
    // Demo states
    let toggleValue = $state(false);
    let checkboxValue = $state(false);
    let textValue = $state('');
    let textareaValue = $state('');
    let selectValue = $state('');
    let multiSelectValue = $state([]);
    let dateValue = $state('');
    let rangeStartDate = $state('');
    let rangeEndDate = $state('');
    let rangeValue = $state(50);
    let tagValue = $state('');
    let passwordValue = $state('');
    let selectedRadio = $state('option1');
    let progressValue = $state(65);
    let showModal = $state(false);
    let showConfirmModal = $state(false);
    let dropdownOpen = $state(false);
    let paginationPage = $state(1);
    
    const selectOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        { value: 'option4', label: 'Option 4' },
        { value: 'option5', label: 'Option 5' },
    ];
    
    const countryOptions = [
        { value: 'id', label: 'Indonesia' },
        { value: 'my', label: 'Malaysia' },
        { value: 'sg', label: 'Singapore' },
        { value: 'th', label: 'Thailand' },
        { value: 'vn', label: 'Vietnam' },
        { value: 'ph', label: 'Philippines' },
    ];
    
    const tagSuggestions = ['JavaScript', 'TypeScript', 'Svelte', 'React', 'Vue', 'Laravel', 'PHP', 'Python'];
    
    const accordionItems = [
        { title: 'What is Svelte 5?', content: 'Svelte 5 is the latest version of Svelte with new features like Runes for state management.', icon: 'fas fa-question-circle' },
        { title: 'What are Runes?', content: 'Runes are special symbols ($state, $derived, $effect) that enable reactive programming in Svelte 5.' },
        { title: 'How to migrate?', content: 'Follow the official migration guide to convert your Svelte 4 components to Svelte 5 syntax.' },
    ];
    
    const avatars = [
        { name: 'John Doe', src: null },
        { name: 'Jane Smith', src: null },
        { name: 'Bob Johnson', src: null },
        { name: 'Alice Brown', src: null },
        { name: 'Charlie Wilson', src: null },
    ];
    
    const breadcrumbItems = [
        { label: 'Dashboard', href: '/admin/dashboard', icon: 'fas fa-home' },
        { label: 'Developer', href: '/admin/components' },
        { label: 'Components' },
    ];
</script>

<DashboardLayout>
    <PageHeader 
        title="Components Library"
        subtitle="Preview and documentation for all UI components"
        breadcrumbs={[
            { label: 'Dashboard', href: '/admin/dashboard' },
            { label: 'Components' }
        ]}
    />
    
    <div class="mb-6">
        <Tabs items={tabs} bind:activeTab variant="pills" />
    </div>
    
    <!-- Buttons Tab -->
    {#if activeTab === 0}
        <div class="space-y-6">
            <Card title="Button Variants">
                <div class="flex flex-wrap gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="ghost">Ghost</Button>
                </div>
            </Card>
            
            <Card title="Button Sizes">
                <div class="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                </div>
            </Card>
            
            <Card title="Button with Icons">
                <div class="flex flex-wrap gap-3">
                    <Button icon="fas fa-plus">Add New</Button>
                    <Button icon="fas fa-download" iconPosition="right">Download</Button>
                    <Button icon="fas fa-trash" variant="danger">Delete</Button>
                    <Button icon="fas fa-edit" variant="secondary">Edit</Button>
                </div>
            </Card>
            
            <Card title="Button States">
                <div class="flex flex-wrap gap-3">
                    <Button loading={true}>Loading...</Button>
                    <Button disabled={true}>Disabled</Button>
                    <Button href="/admin/dashboard">Link Button</Button>
                </div>
            </Card>
            
            <Card title="Usage">
                <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto"><code>{`<Button variant="primary" size="md" icon="fas fa-plus">
    Add New
</Button>

<Button loading={true}>Loading...</Button>

<Button href="/link" external={true}>External Link</Button>`}</code></pre>
            </Card>
        </div>
    {/if}
    
    <!-- Badges & Status Tab -->
    {#if activeTab === 1}
        <div class="space-y-6">
            <Card title="Badge Variants">
                <div class="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                    <Badge variant="info">Info</Badge>
                </div>
            </Card>
            
            <Card title="Solid Badges">
                <div class="flex flex-wrap gap-2">
                    <Badge variant="solid-default">Default</Badge>
                    <Badge variant="solid-primary">Primary</Badge>
                    <Badge variant="solid-success">Success</Badge>
                    <Badge variant="solid-warning">Warning</Badge>
                    <Badge variant="solid-danger">Danger</Badge>
                    <Badge variant="solid-info">Info</Badge>
                </div>
            </Card>
            
            <Card title="Outline Badges">
                <div class="flex flex-wrap gap-2">
                    <Badge variant="outline-default">Default</Badge>
                    <Badge variant="outline-primary">Primary</Badge>
                    <Badge variant="outline-success">Success</Badge>
                    <Badge variant="outline-warning">Warning</Badge>
                    <Badge variant="outline-danger">Danger</Badge>
                </div>
            </Card>
            
            <Card title="Badge Sizes & Options">
                <div class="flex flex-wrap items-center gap-2">
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                    <Badge icon="fas fa-star" variant="primary">With Icon</Badge>
                    <Badge variant="success" removable={true}>Removable</Badge>
                </div>
            </Card>
            
            <Card title="Spinners">
                <div class="flex flex-wrap items-center gap-6">
                    <Spinner size="xs" />
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                    <Spinner size="xl" />
                </div>
                <div class="flex flex-wrap items-center gap-6 mt-4">
                    <Spinner variant="primary" />
                    <Spinner variant="secondary" />
                    <Spinner variant="success" />
                    <Spinner variant="danger" />
                </div>
            </Card>
            
            <Card title="Skeleton Loading">
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <Skeleton variant="avatar" />
                        <div class="flex-1">
                            <Skeleton variant="title" width="60%" />
                            <div class="mt-2">
                                <Skeleton variant="text" lines={2} />
                            </div>
                        </div>
                    </div>
                    <Skeleton variant="image" />
                </div>
            </Card>
            
            <Card title="Avatar">
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <Avatar name="John Doe" size="xs" />
                        <Avatar name="Jane Smith" size="sm" />
                        <Avatar name="Bob J" size="md" />
                        <Avatar name="Alice Brown" size="lg" />
                        <Avatar name="Charlie" size="xl" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Avatar name="Online User" status="online" />
                        <Avatar name="Away User" status="away" />
                        <Avatar name="Busy User" status="busy" />
                        <Avatar name="Offline User" status="offline" />
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 mb-2">Avatar Group:</p>
                        <AvatarGroup {avatars} max={4} />
                    </div>
                </div>
            </Card>
        </div>
    {/if}
    
    <!-- Forms Tab -->
    {#if activeTab === 2}
        <div class="space-y-6">
            <Card title="Text Inputs">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput 
                        label="Default Input"
                        placeholder="Enter text..."
                        bind:value={textValue}
                    />
                    <TextInput 
                        label="With Icon"
                        placeholder="Search..."
                        icon="fas fa-search"
                        bind:value={textValue}
                    />
                    <TextInput 
                        label="With Error"
                        placeholder="Enter email"
                        error="This field is required"
                        icon="fas fa-envelope"
                    />
                    <TextInput 
                        label="Disabled"
                        placeholder="Disabled input"
                        disabled={true}
                    />
                </div>
            </Card>
            
            <Card title="Password Input">
                <div class="max-w-md">
                    <PasswordInput 
                        bind:value={passwordValue}
                        placeholder="Enter password"
                        showStrength={true}
                    />
                </div>
            </Card>
            
            <Card title="Textarea">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Textarea 
                        label="Default Textarea"
                        placeholder="Enter your message..."
                        bind:value={textareaValue}
                    />
                    <Textarea 
                        label="With Character Count"
                        placeholder="Limited to 100 characters"
                        maxlength={100}
                        showCount={true}
                        bind:value={textareaValue}
                    />
                </div>
            </Card>
            
            <Card title="Select">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select 
                        label="Custom Select"
                        options={selectOptions}
                        bind:value={selectValue}
                        placeholder="Choose an option..."
                    />
                    <Select 
                        label="Searchable Select"
                        options={countryOptions}
                        bind:value={selectValue}
                        searchable={true}
                        placeholder="Search country..."
                    />
                </div>
            </Card>
            
            <Card title="Multi Select">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MultiSelect 
                        label="Select Multiple"
                        options={countryOptions}
                        bind:value={multiSelectValue}
                        placeholder="Select countries..."
                    />
                    <MultiSelect 
                        label="Searchable Multi Select"
                        options={countryOptions}
                        bind:value={multiSelectValue}
                        searchable={true}
                        placeholder="Search and select..."
                    />
                </div>
            </Card>
            
            <Card title="Date Picker">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DatePicker 
                        label="Select Date"
                        bind:value={dateValue}
                        placeholder="Choose a date..."
                    />
                    <DatePicker 
                        label="With Min/Max Limit"
                        bind:value={dateValue}
                        minDate="2026-01-05"
                        maxDate="2026-01-25"
                    />
                </div>
                <p class="text-sm text-gray-500 mt-3">
                    <i class="fas fa-info-circle mr-1"></i>
                    Min/Max Limit: Only dates between Jan 5 - Jan 25, 2026 can be selected. Dates outside this range are disabled.
                </p>
            </Card>
            <Card title="Date Range Picker">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DateRangePicker 
                        label="With Quick Presets"
                        bind:startDate={rangeStartDate}
                        bind:endDate={rangeEndDate}
                        placeholder="Select date range"
                        showPresets={true}
                    />
                    <DateRangePicker 
                        label="Without Presets"
                        bind:startDate={rangeStartDate}
                        bind:endDate={rangeEndDate}
                        placeholder="Manual selection only"
                        showPresets={false}
                    />
                </div>
                <p class="text-sm text-gray-500 mt-3">
                    <i class="fas fa-lightbulb mr-1 text-yellow-500"></i>
                    <strong>Features:</strong> Quick presets (Today, Last 7 days, This month), connected range highlighting, hover preview, days counter badge.
                </p>
            </Card>
            
            <Card title="Range Slider">
                <div class="space-y-6">
                    <RangeSlider 
                        label="Volume"
                        bind:value={rangeValue}
                        min={0}
                        max={100}
                        showValue={true}
                    />
                    <RangeSlider 
                        label="With Min/Max Labels"
                        bind:value={rangeValue}
                        min={0}
                        max={100}
                        showMinMax={true}
                    />
                </div>
            </Card>
            
            <Card title="Tag Input">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TagInput 
                        label="Add Tags"
                        bind:value={tagValue}
                        placeholder="Type and press Enter..."
                        maxTags={5}
                    />
                    <TagInput 
                        label="With Suggestions"
                        bind:value={tagValue}
                        placeholder="Start typing..."
                        suggestions={tagSuggestions}
                    />
                </div>
            </Card>
            
            <Card title="Checkbox & Toggle">
                <div class="space-y-4">
                    <Checkbox 
                        label="I agree to the terms and conditions"
                        description="By checking this box, you agree to our Terms of Service"
                        bind:checked={checkboxValue}
                    />
                    <div class="flex items-center gap-6">
                        <Toggle label="Enable notifications" bind:checked={toggleValue} />
                        <Toggle label="Small toggle" size="sm" />
                        <Toggle label="Large toggle" size="lg" />
                    </div>
                </div>
            </Card>
            
            <Card title="Radio Options">
                <div class="space-y-2">
                    <RadioOption 
                        name="demo-radio"
                        value="option1"
                        label="Option 1"
                        description="This is the first option"
                        bind:selectedValue={selectedRadio}
                    />
                    <RadioOption 
                        name="demo-radio"
                        value="option2"
                        label="Option 2"
                        description="This is the second option"
                        bind:selectedValue={selectedRadio}
                    />
                    <RadioOption 
                        name="demo-radio"
                        value="option3"
                        label="Option 3"
                        description="This is the third option"
                        bind:selectedValue={selectedRadio}
                    />
                </div>
            </Card>
            
            <Card title="File Upload">
                <div class="max-w-md">
                    <FileUpload 
                        label="Upload Documents"
                        accept=".pdf,.doc,.docx"
                        multiple={true}
                        maxSize={10}
                    />
                </div>
            </Card>
        </div>
    {/if}
    
    <!-- Feedback Tab -->
    {#if activeTab === 3}
        <div class="space-y-6">
            <Card title="Alerts">
                <div class="space-y-3">
                    <Alert variant="info" title="Information" message="This is an informational alert." />
                    <Alert variant="success" title="Success" message="Your changes have been saved successfully." dismissible={true} />
                    <Alert variant="warning" title="Warning" message="Please review the following items before proceeding." />
                    <Alert variant="danger" title="Error" message="An error occurred while processing your request." />
                </div>
            </Card>
            
            <Card title="Progress">
                <div class="space-y-6">
                    <div>
                        <p class="text-sm text-gray-500 mb-2">Default Progress</p>
                        <Progress value={progressValue} />
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 mb-2">With Label</p>
                        <Progress value={75} showLabel={true} label="Uploading..." />
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 mb-2">Variants</p>
                        <div class="space-y-2">
                            <Progress value={80} variant="success" size="sm" />
                            <Progress value={60} variant="warning" size="md" />
                            <Progress value={40} variant="danger" size="lg" />
                        </div>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 mb-2">Striped & Animated</p>
                        <Progress value={50} striped={true} animated={true} size="lg" />
                    </div>
                </div>
            </Card>
            
            <Card title="Tooltip">
                <div class="flex flex-wrap gap-6">
                    <Tooltip text="Top tooltip" position="top">
                        <Button variant="secondary">Hover (Top)</Button>
                    </Tooltip>
                    <Tooltip text="Bottom tooltip" position="bottom">
                        <Button variant="secondary">Hover (Bottom)</Button>
                    </Tooltip>
                    <Tooltip text="Left tooltip" position="left">
                        <Button variant="secondary">Hover (Left)</Button>
                    </Tooltip>
                    <Tooltip text="Right tooltip" position="right">
                        <Button variant="secondary">Hover (Right)</Button>
                    </Tooltip>
                </div>
            </Card>
            
            <Card title="Empty State">
                <EmptyState 
                    icon="fas fa-inbox"
                    title="No messages yet"
                    description="When you receive messages, they will appear here."
                    actionLabel="Compose Message"
                />
            </Card>
        </div>
    {/if}
    
    <!-- Data Display Tab -->
    {#if activeTab === 4}
        <div class="space-y-6">
            <Card title="Stat Cards">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                        label="Total Users"
                        value="1,234"
                        icon="fas fa-users"
                        change="+12%"
                        changeType="positive"
                        trend="up"
                    />
                    <StatCard 
                        label="Revenue"
                        value="$45,678"
                        icon="fas fa-dollar-sign"
                        change="+8.2%"
                        changeType="positive"
                        trend="up"
                    />
                    <StatCard 
                        label="Orders"
                        value="567"
                        icon="fas fa-shopping-cart"
                        change="-3%"
                        changeType="negative"
                        trend="down"
                    />
                    <StatCard 
                        label="Conversion"
                        value="2.4%"
                        icon="fas fa-chart-line"
                        loading={true}
                    />
                </div>
            </Card>
            
            <Card title="Advanced Card">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CardAdvanced 
                        title="Card with Header"
                        subtitle="This is a subtitle"
                        icon="fas fa-star"
                    >
                        <p class="text-gray-600">This is the card content with various options available.</p>
                    </CardAdvanced>
                    
                    <CardAdvanced title="Card with Footer">
                        {#snippet children()}
                            <p class="text-gray-600">Card content goes here.</p>
                        {/snippet}
                        {#snippet footer()}
                            <div class="flex justify-end gap-2">
                                <Button variant="secondary" size="sm">Cancel</Button>
                                <Button variant="primary" size="sm">Save</Button>
                            </div>
                        {/snippet}
                    </CardAdvanced>
                </div>
            </Card>
            
            <Card title="Accordion">
                <Accordion items={accordionItems} multiple={true} defaultOpen={[0]} />
            </Card>
            
            <Card title="Pagination">
                <div class="space-y-4">
                    <Pagination 
                        meta={{
                            current_page: paginationPage,
                            last_page: 10,
                            from: (paginationPage - 1) * 10 + 1,
                            to: paginationPage * 10,
                            total: 100
                        }}
                        onpageChange={(page) => paginationPage = page}
                    />
                </div>
            </Card>
        </div>
    {/if}
    
    <!-- Overlays Tab -->
    {#if activeTab === 5}
        <div class="space-y-6">
            <Card title="Modals">
                <div class="flex gap-3">
                    <Button onclick={() => showModal = true}>
                        Open Modal
                    </Button>
                    <Button variant="danger" onclick={() => showConfirmModal = true}>
                        Open Confirm Modal
                    </Button>
                </div>
            </Card>
            
            <Card title="Dropdown">
                <div class="flex gap-4">
                    <Dropdown bind:open={dropdownOpen}>
                        {#snippet trigger()}
                            <Button variant="secondary" icon="fas fa-chevron-down" iconPosition="right">
                                Dropdown Menu
                            </Button>
                        {/snippet}
                        <DropdownItem icon="fas fa-user">Profile</DropdownItem>
                        <DropdownItem icon="fas fa-cog">Settings</DropdownItem>
                        <DropdownItem icon="fas fa-sign-out-alt" variant="danger">Logout</DropdownItem>
                    </Dropdown>
                </div>
            </Card>
            
            <Card title="Usage">
                <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto"><code>{`<Modal bind:show={showModal} title="Modal Title">
    <p>Modal content goes here.</p>
</Modal>

<ConfirmModal 
    bind:show={showConfirmModal}
    title="Confirm Delete"
    message="Are you sure?"
    onconfirm={() => handleDelete()}
/>`}</code></pre>
            </Card>
        </div>
    {/if}
    
    <!-- Navigation Tab -->
    {#if activeTab === 6}
        <div class="space-y-6">
            <Card title="Breadcrumb">
                <Breadcrumb items={breadcrumbItems} />
            </Card>
            
            <Card title="Tabs Variants">
                <div class="space-y-6">
                    <div>
                        <p class="text-sm text-gray-500 mb-2">Underline (Default)</p>
                        <Tabs items={['Tab 1', 'Tab 2', 'Tab 3']} variant="underline" />
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 mb-2">Pills</p>
                        <Tabs items={['Tab 1', 'Tab 2', 'Tab 3']} variant="pills" />
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 mb-2">Boxed</p>
                        <Tabs items={['Tab 1', 'Tab 2', 'Tab 3']} variant="boxed" />
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 mb-2">Full Width</p>
                        <Tabs items={['Tab 1', 'Tab 2', 'Tab 3']} variant="boxed" fullWidth={true} />
                    </div>
                </div>
            </Card>
        </div>
    {/if}
    
    <!-- Modal -->
    <Modal bind:show={showModal} title="Example Modal" size="md">
        <p class="text-gray-600">This is an example modal content. You can put any content here including forms, text, or other components.</p>
        
        <div class="mt-4">
            <TextInput label="Example Input" placeholder="Type something..." />
        </div>
        
        {#snippet footer()}
            <div class="flex justify-end gap-2">
                <Button variant="secondary" onclick={() => showModal = false}>Cancel</Button>
                <Button variant="primary" onclick={() => showModal = false}>Save Changes</Button>
            </div>
        {/snippet}
    </Modal>
    
    <!-- Confirm Modal -->
    <ConfirmModal 
        bind:show={showConfirmModal}
        title="Confirm Action"
        message="Are you sure you want to proceed with this action? This cannot be undone."
        confirmLabel="Yes, Proceed"
        cancelLabel="Cancel"
        confirmType="danger"
        onconfirm={() => showConfirmModal = false}
        oncancel={() => showConfirmModal = false}
    />
</DashboardLayout>
