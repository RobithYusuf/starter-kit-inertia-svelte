# UI Components Library

This document provides comprehensive documentation for all UI components available in this starter kit.

## Quick Links

- [Preview all components](/admin/components) - Live component showcase page

## Table of Contents

1. [UI Components](#ui-components)
   - [Button](#button)
   - [Badge](#badge)
   - [Spinner](#spinner)
   - [Skeleton](#skeleton)
   - [Tooltip](#tooltip)
   - [Toggle](#toggle)
   - [Alert](#alert)
   - [Progress](#progress)
   - [Avatar](#avatar)
   - [AvatarGroup](#avatargroup)
   - [Card](#card)
   - [CardAdvanced](#cardadvanced)
   - [StatCard](#statcard)
   - [EmptyState](#emptystate)
   - [Modal](#modal)
   - [ConfirmModal](#confirmmodal)
   - [Dropdown](#dropdown)
   - [Tabs](#tabs)
   - [Accordion](#accordion)
   - [Breadcrumb](#breadcrumb)
   - [Pagination](#pagination)

2. [Form Components](#form-components)
   - [TextInput](#textinput)
   - [PasswordInput](#passwordinput)
   - [Textarea](#textarea)
   - [Select](#select)
   - [Checkbox](#checkbox)
   - [RadioOption](#radiooption)
   - [FileUpload](#fileupload)

---

## UI Components

### Button

A versatile button component with multiple variants, sizes, and states.

```svelte
<script>
    import Button from '@/Components/UI/Button.svelte';
</script>

<Button variant="primary" size="md" icon="fas fa-plus">
    Add New
</Button>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'ghost'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `icon` | `string` | `null` | FontAwesome icon class |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable button |
| `href` | `string` | `null` | Render as link |
| `external` | `boolean` | `false` | Open link in new tab |

---

### Badge

Inline status indicators and labels.

```svelte
<script>
    import Badge from '@/Components/UI/Badge.svelte';
</script>

<Badge variant="success">Active</Badge>
<Badge variant="solid-primary" icon="fas fa-star">Featured</Badge>
<Badge variant="outline-danger" removable={true}>Tag</Badge>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'default'` | Badge variant (default, primary, success, warning, danger, info, solid-*, outline-*) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'full'` | Border radius |
| `icon` | `string` | `null` | Icon class |
| `removable` | `boolean` | `false` | Show remove button |
| `onremove` | `function` | `null` | Remove callback |

---

### Spinner

Loading indicator with customizable size and color.

```svelte
<script>
    import Spinner from '@/Components/UI/Spinner.svelte';
</script>

<Spinner size="md" variant="primary" />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Spinner size |
| `variant` | `'primary' \| 'secondary' \| 'white' \| 'success' \| 'danger'` | `'primary'` | Color variant |
| `label` | `string` | `'Loading...'` | Screen reader label |

---

### Skeleton

Placeholder loading states for content.

```svelte
<script>
    import Skeleton from '@/Components/UI/Skeleton.svelte';
</script>

<Skeleton variant="avatar" />
<Skeleton variant="text" lines={3} />
<Skeleton variant="image" />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'title' \| 'avatar' \| 'thumbnail' \| 'image' \| 'button' \| 'card'` | `'text'` | Skeleton type |
| `width` | `string` | `null` | Custom width |
| `height` | `string` | `null` | Custom height |
| `lines` | `number` | `1` | Number of text lines |
| `animate` | `boolean` | `true` | Enable pulse animation |

---

### Tooltip

Hover tooltips for additional context.

```svelte
<script>
    import Tooltip from '@/Components/UI/Tooltip.svelte';
</script>

<Tooltip text="This is helpful info" position="top">
    <button>Hover me</button>
</Tooltip>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `''` | Tooltip content |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip position |
| `delay` | `number` | `200` | Show delay in ms |

---

### Toggle

Switch toggle for boolean values.

```svelte
<script>
    import Toggle from '@/Components/UI/Toggle.svelte';
    let enabled = $state(false);
</script>

<Toggle bind:checked={enabled} label="Enable notifications" />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Bindable toggle state |
| `disabled` | `boolean` | `false` | Disable toggle |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Toggle size |
| `label` | `string` | `''` | Label text |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Label position |
| `onchange` | `function` | `null` | Change callback |

---

### Alert

Contextual alert messages.

```svelte
<script>
    import Alert from '@/Components/UI/Alert.svelte';
</script>

<Alert variant="success" title="Success!" message="Your changes have been saved." dismissible={true} />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Alert type |
| `title` | `string` | `''` | Alert title |
| `message` | `string` | `''` | Alert message |
| `icon` | `string` | `null` | Custom icon (auto-selected if null) |
| `dismissible` | `boolean` | `false` | Show close button |
| `onclose` | `function` | `null` | Close callback |

---

### Progress

Progress bar with multiple variants.

```svelte
<script>
    import Progress from '@/Components/UI/Progress.svelte';
</script>

<Progress value={75} max={100} showLabel={true} />
<Progress value={50} striped={true} animated={true} />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current value |
| `max` | `number` | `100` | Maximum value |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Bar height |
| `variant` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` | Color |
| `showLabel` | `boolean` | `false` | Show percentage label |
| `label` | `string` | `''` | Custom label |
| `striped` | `boolean` | `false` | Striped pattern |
| `animated` | `boolean` | `false` | Animate stripes |

---

### Avatar

User avatar with initials fallback and status indicator.

```svelte
<script>
    import Avatar from '@/Components/UI/Avatar.svelte';
</script>

<Avatar name="John Doe" size="lg" status="online" />
<Avatar src="/path/to/image.jpg" name="Jane" />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `null` | Image URL |
| `name` | `string` | `''` | Name for initials fallback |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Avatar size |
| `variant` | `'circle' \| 'rounded' \| 'square'` | `'circle'` | Shape |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | `null` | Status indicator |
| `showBorder` | `boolean` | `false` | White border ring |

---

### AvatarGroup

Stacked avatar group with overflow count.

```svelte
<script>
    import AvatarGroup from '@/Components/UI/AvatarGroup.svelte';
    
    const users = [
        { name: 'John', src: null },
        { name: 'Jane', src: null },
        { name: 'Bob', src: null },
    ];
</script>

<AvatarGroup avatars={users} max={3} />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `avatars` | `array` | `[]` | Array of {name, src} objects |
| `max` | `number` | `4` | Maximum visible avatars |
| `size` | `string` | `'md'` | Avatar size |
| `spacing` | `'tight' \| 'normal' \| 'loose'` | `'tight'` | Overlap spacing |

---

### Modal

Modal dialog with customizable header, body, and footer.

```svelte
<script>
    import Modal from '@/Components/UI/Modal.svelte';
    let show = $state(false);
</script>

<Modal bind:show title="Edit Profile" size="lg">
    <p>Modal content here</p>
    
    {#snippet footer()}
        <Button onclick={() => show = false}>Close</Button>
    {/snippet}
</Modal>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `show` | `boolean` | `false` | Bindable visibility |
| `title` | `string` | `''` | Modal title |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal width |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `closeOnClickOutside` | `boolean` | `true` | Close on backdrop click |
| `showClose` | `boolean` | `true` | Show X button |
| `showHeader` | `boolean` | `true` | Show header |
| `showFooter` | `boolean` | `true` | Show footer |
| `onclose` | `function` | `null` | Close callback |

---

### ConfirmModal

Confirmation dialog for destructive actions.

```svelte
<script>
    import ConfirmModal from '@/Components/UI/ConfirmModal.svelte';
    let show = $state(false);
</script>

<ConfirmModal 
    bind:show
    title="Delete User"
    message="Are you sure you want to delete this user?"
    confirmType="danger"
    onconfirm={() => handleDelete()}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `show` | `boolean` | `false` | Bindable visibility |
| `title` | `string` | `'Confirm'` | Dialog title |
| `message` | `string` | `'Are you sure?'` | Confirmation message |
| `confirmLabel` | `string` | `'Confirm'` | Confirm button text |
| `cancelLabel` | `string` | `'Cancel'` | Cancel button text |
| `confirmType` | `string` | `'primary'` | Confirm button variant |
| `isLoading` | `boolean` | `false` | Loading state |
| `onconfirm` | `function` | `null` | Confirm callback |
| `oncancel` | `function` | `null` | Cancel callback |

---

### Tabs

Tab navigation component.

```svelte
<script>
    import Tabs from '@/Components/UI/Tabs.svelte';
    let activeTab = $state(0);
    
    const tabs = [
        { label: 'General', icon: 'fas fa-cog' },
        { label: 'Security', icon: 'fas fa-lock' },
        { label: 'Notifications', badge: '3' },
    ];
</script>

<Tabs items={tabs} bind:activeTab variant="pills" />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `array` | `[]` | Tab items (string or {label, icon, badge, disabled}) |
| `activeTab` | `number` | `0` | Bindable active tab index |
| `variant` | `'underline' \| 'pills' \| 'boxed'` | `'underline'` | Tab style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tab size |
| `fullWidth` | `boolean` | `false` | Full width tabs |
| `onchange` | `function` | `null` | Tab change callback |

---

### Accordion

Collapsible content sections.

```svelte
<script>
    import Accordion from '@/Components/UI/Accordion.svelte';
    
    const items = [
        { title: 'Section 1', content: 'Content here...', icon: 'fas fa-info' },
        { title: 'Section 2', content: 'More content...' },
    ];
</script>

<Accordion {items} multiple={true} defaultOpen={[0]} />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `array` | `[]` | Array of {title, content, icon} |
| `multiple` | `boolean` | `false` | Allow multiple open |
| `defaultOpen` | `array` | `[]` | Initially open item indices |

---

### Breadcrumb

Navigation breadcrumb trail.

```svelte
<script>
    import Breadcrumb from '@/Components/UI/Breadcrumb.svelte';
    
    const items = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Users', href: '/users' },
        { label: 'Edit' },
    ];
</script>

<Breadcrumb {items} />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `array` | `[]` | Array of {label, href?, icon?} |
| `separator` | `string` | `'/'` | Separator character |
| `showHome` | `boolean` | `true` | Show home icon |
| `homeUrl` | `string` | `'/admin/dashboard'` | Home link URL |
| `homeIcon` | `string` | `'fas fa-home'` | Home icon class |

---

## Form Components

### TextInput

General purpose text input with icon support.

```svelte
<script>
    import TextInput from '@/Components/UI/Form/TextInput.svelte';
    let value = $state('');
</script>

<TextInput 
    label="Email" 
    type="email"
    icon="fas fa-envelope"
    placeholder="you@example.com"
    bind:value
    error="Please enter a valid email"
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `''` | Input label |
| `type` | `string` | `'text'` | Input type |
| `value` | `string` | `''` | Bindable value |
| `placeholder` | `string` | `''` | Placeholder text |
| `icon` | `string` | `''` | Icon class |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `error` | `string` | `''` | Error message |
| `hint` | `string` | `''` | Help text |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |

---

### PasswordInput

Password input with visibility toggle and strength indicator.

```svelte
<script>
    import PasswordInput from '@/Components/UI/Form/PasswordInput.svelte';
    let password = $state('');
</script>

<PasswordInput 
    bind:value={password}
    showStrength={true}
    placeholder="Enter password"
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Bindable value |
| `placeholder` | `string` | `'Enter password'` | Placeholder |
| `error` | `string` | `''` | Error message |
| `showStrength` | `boolean` | `false` | Show strength indicator |
| `required` | `boolean` | `false` | Required field |
| `autocomplete` | `string` | `'current-password'` | Autocomplete hint |

---

### Textarea

Multi-line text input with character count.

```svelte
<script>
    import Textarea from '@/Components/UI/Form/Textarea.svelte';
    let content = $state('');
</script>

<Textarea 
    label="Description"
    bind:value={content}
    rows={4}
    maxlength={500}
    showCount={true}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `''` | Input label |
| `value` | `string` | `''` | Bindable value |
| `placeholder` | `string` | `''` | Placeholder |
| `rows` | `number` | `4` | Visible rows |
| `maxlength` | `number` | `null` | Max characters |
| `showCount` | `boolean` | `false` | Show character count |
| `resize` | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Resize behavior |
| `error` | `string` | `''` | Error message |

---

### Select

Dropdown select input.

```svelte
<script>
    import Select from '@/Components/UI/Form/Select.svelte';
    let role = $state('');
    
    const options = [
        { value: 'admin', label: 'Administrator' },
        { value: 'member', label: 'Member' },
    ];
</script>

<Select 
    label="Role"
    {options}
    bind:value={role}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `''` | Input label |
| `value` | `string` | `''` | Bindable value |
| `options` | `array` | `[]` | Array of {value, label, disabled?} or strings |
| `placeholder` | `string` | `'Select an option'` | Placeholder |
| `error` | `string` | `''` | Error message |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |

---

### Checkbox

Checkbox with label and description.

```svelte
<script>
    import Checkbox from '@/Components/UI/Form/Checkbox.svelte';
    let agreed = $state(false);
</script>

<Checkbox 
    label="I agree to the terms"
    description="By checking this, you accept our Terms of Service"
    bind:checked={agreed}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Bindable checked state |
| `label` | `string` | `''` | Checkbox label |
| `description` | `string` | `''` | Help text below label |
| `value` | `string` | `''` | Form value |
| `disabled` | `boolean` | `false` | Disabled state |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Checkbox size |
| `error` | `string` | `''` | Error message |
| `onchange` | `function` | `null` | Change callback |

---

### RadioOption

Radio button with label and description.

```svelte
<script>
    import RadioOption from '@/Components/UI/Form/RadioOption.svelte';
    let plan = $state('basic');
</script>

<RadioOption 
    name="plan"
    value="basic"
    label="Basic Plan"
    description="$9/month"
    bind:selectedValue={plan}
/>
<RadioOption 
    name="plan"
    value="pro"
    label="Pro Plan"
    description="$29/month"
    bind:selectedValue={plan}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `''` | Radio group name |
| `value` | `string` | `''` | Radio value |
| `selectedValue` | `string` | `''` | Bindable selected value |
| `label` | `string` | `''` | Radio label |
| `description` | `string` | `''` | Help text |
| `disabled` | `boolean` | `false` | Disabled state |

---

### FileUpload

Drag and drop file upload with preview.

```svelte
<script>
    import FileUpload from '@/Components/UI/Form/FileUpload.svelte';
    
    function handleFiles(files) {
        console.log('Selected files:', files);
    }
</script>

<FileUpload 
    label="Upload Documents"
    accept=".pdf,.doc,.docx"
    multiple={true}
    maxSize={10}
    onchange={handleFiles}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `'Upload files'` | Label text |
| `accept` | `string` | `'*'` | Accepted file types |
| `multiple` | `boolean` | `false` | Allow multiple files |
| `maxSize` | `number` | `5` | Max file size in MB |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `string` | `''` | Error message |
| `hint` | `string` | `''` | Help text |
| `onchange` | `function` | `null` | Files change callback |

---

## Best Practices

1. **Import alias**: Always use `@/` alias for imports
   ```js
   import Button from '@/Components/UI/Button.svelte';
   ```

2. **Svelte 5 Runes**: Use `$state()` for reactive state, `$derived()` for computed values
   ```js
   let count = $state(0);
   let doubled = $derived(count * 2);
   ```

3. **Bindable props**: Use `$bindable()` for two-way binding
   ```js
   let { value = $bindable('') } = $props();
   ```

4. **Callback props**: Use callbacks instead of events
   ```svelte
   <Button onclick={() => handleClick()}>Click me</Button>
   ```

5. **Snippets**: Use `{#snippet}` for slot-like content
   ```svelte
   <Modal>
       {#snippet footer()}
           <Button>Save</Button>
       {/snippet}
   </Modal>
   ```
