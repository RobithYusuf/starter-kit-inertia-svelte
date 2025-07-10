# 📚 Dokumentasi Komponen Starter Kit

Dokumentasi lengkap untuk semua komponen yang tersedia dalam starter kit Laravel Inertia Svelte.

## 📁 Struktur Direktori

```
Components/
├── Dashboard/          # Komponen khusus dashboard
│   ├── DataTable/     # Komponen tabel dengan sorting & pagination
│   ├── PageHeader.svelte
│   ├── Sidebar.svelte
│   └── StatCard.svelte
├── Layouts/           # Layout halaman
│   ├── AuthLayout.svelte
│   ├── DashboardLayout.svelte
│   └── GuestLayout.svelte
├── Shared/            # Komponen yang digunakan di seluruh aplikasi
│   └── Logo.svelte
└── UI/                # Komponen UI reusable
    ├── Form/          # Komponen form
    └── ...            # Komponen UI lainnya
```

## 🎨 UI Components

### Button
Komponen button utama dengan berbagai varian dan ukuran. Mendukung loading state, icon, dan dapat berfungsi sebagai link.

```svelte
<script>
import Button from '@/Components/UI/Button.svelte';
</script>

<!-- Primary Button -->
<Button variant="primary" size="md">
  Click Me
</Button>

<!-- Button dengan Loading State -->
<Button 
  variant="secondary" 
  icon="fas fa-save" 
  loading={isLoading}
  disabled={isLoading}
>
  Save
</Button>

<!-- Button sebagai Link -->
<Button 
  href="/dashboard" 
  variant="ghost" 
  external
  icon="fas fa-external-link-alt"
>
  Dashboard
</Button>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipe button HTML |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'ghost'` | `'primary'` | Style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Ukuran button |
| `disabled` | `boolean` | `false` | Disable state |
| `loading` | `boolean` | `false` | Loading state dengan spinner |
| `icon` | `string` | `null` | Font Awesome icon class |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Posisi icon |
| `href` | `string` | `null` | URL untuk button sebagai link |
| `external` | `boolean` | `false` | Buka link di tab baru |

### Card
Komponen card untuk membungkus konten dengan customizable styling.

```svelte
<Card padding="p-6" shadow="shadow-lg" rounded="rounded-xl">
  <h3 class="text-lg font-semibold mb-2">Card Title</h3>
  <p class="text-gray-600">Card content goes here...</p>
</Card>

<!-- Card tanpa padding untuk content full-width -->
<Card padding="">
  <img src="/image.jpg" class="w-full h-48 object-cover" />
  <div class="p-4">
    <h3>Image Card</h3>
  </div>
</Card>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `string` | `'p-4'` | Tailwind padding class |
| `margin` | `string` | `''` | Tailwind margin class |
| `shadow` | `string` | `'shadow-sm'` | Tailwind shadow class |
| `rounded` | `string` | `'rounded-lg'` | Tailwind rounded class |
| `border` | `string` | `''` | Tailwind border class |
| `background` | `string` | `'bg-white'` | Tailwind background class |
| `className` | `string` | `''` | Additional CSS classes |

### UserAvatar
Menampilkan avatar user dengan gambar atau inisial otomatis.

```svelte
<!-- Dengan gambar -->
<UserAvatar 
  name="John Doe" 
  image="/path/to/avatar.jpg"
  size="lg"
/>

<!-- Tanpa gambar (inisial otomatis) -->
<UserAvatar 
  name="Jane Smith" 
  size="md"
/>

<!-- Dalam list/tabel -->
<div class="flex items-center space-x-3">
  <UserAvatar name={user.name} image={user.avatar} size="sm" />
  <div>
    <p class="font-medium">{user.name}</p>
    <p class="text-sm text-gray-500">{user.email}</p>
  </div>
</div>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Nama user untuk inisial |
| `image` | `string` | `null` | URL gambar avatar |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Ukuran avatar |

### EmptyState
Komponen untuk menampilkan state kosong dengan action optional.

```svelte
<EmptyState 
  icon="fas fa-users"
  title="Belum ada user"
  description="Mulai dengan menambahkan user pertama"
  actionText="Tambah User"
  actionIcon="fas fa-plus"
  onAction={() => router.visit('/admin/users/create')}
/>

<!-- Simple empty state -->
<EmptyState 
  title="Data tidak ditemukan"
  description="Coba ubah filter pencarian Anda"
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | `'fas fa-inbox'` | Font Awesome icon |
| `title` | `string` | `'No data found'` | Judul empty state |
| `description` | `string` | `''` | Deskripsi tambahan |
| `actionText` | `string` | `''` | Text untuk button action |
| `actionIcon` | `string` | `''` | Icon untuk button action |
| `onAction` | `function` | `() => {}` | Handler untuk action click |

### ConfirmModal
Modal konfirmasi untuk aksi berbahaya/penting.

```svelte
<script>
let showDeleteModal = false;
let isDeleting = false;

async function handleDelete() {
  isDeleting = true;
  try {
    await deleteUser(userId);
    showDeleteModal = false;
  } finally {
    isDeleting = false;
  }
}
</script>

<ConfirmModal 
  show={showDeleteModal}
  title="Hapus User"
  message="Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak dapat dibatalkan."
  confirmLabel="Hapus"
  cancelLabel="Batal"
  confirmType="danger"
  isLoading={isDeleting}
  on:confirm={handleDelete}
  on:cancel={() => showDeleteModal = false}
/>

<!-- Trigger -->
<Button variant="danger" on:click={() => showDeleteModal = true}>
  Hapus User
</Button>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `show` | `boolean` | required | Show/hide modal |
| `title` | `string` | `'Confirm'` | Modal title |
| `message` | `string` | `'Are you sure?'` | Pesan konfirmasi (support HTML) |
| `confirmLabel` | `string` | `'Confirm'` | Label button confirm |
| `cancelLabel` | `string` | `'Cancel'` | Label button cancel |
| `confirmType` | `'primary' \| 'danger' \| 'success'` | `'primary'` | Style button confirm |
| `isLoading` | `boolean` | `false` | Loading state |

### Pagination
Komponen pagination untuk navigasi halaman data.

```svelte
<Pagination 
  meta={{
    current_page: 1,
    last_page: 10,
    per_page: 15,
    total: 150,
    from: 1,
    to: 15
  }}
/>

<!-- Dengan data dari Laravel -->
<Pagination meta={users.meta} />
```

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `meta` | `object` | Laravel pagination meta object |

### SelectDropdown
Custom dropdown select untuk UI non-form dengan animasi dan smart positioning.

```svelte
<SelectDropdown 
  value={perPage}
  options={[
    { value: '10', label: '10 per halaman' },
    { value: '25', label: '25 per halaman' },
    { value: '50', label: '50 per halaman' },
    { value: '100', label: '100 per halaman' }
  ]}
  placeholder="Pilih jumlah"
  on:change={(e) => {
    perPage = e.detail;
    loadData();
  }}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Selected value |
| `options` | `Array<{value, label}>` | `[]` | Opsi dropdown |
| `placeholder` | `string` | `'Select...'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable state |

### AlertContainer
Container untuk menampilkan toast notifications. Biasanya sudah ada di layout.

```svelte
<!-- Sudah ada di DashboardLayout/AuthLayout -->
<AlertContainer />

<!-- Penggunaan di komponen -->
<script>
import alert from '@/Stores/alertStore';

// Success notification
alert.success('Data berhasil disimpan!');

// Error notification
alert.error('Terjadi kesalahan saat menyimpan data');

// Info notification
alert.info('Perubahan akan diterapkan setelah refresh');
</script>
```

## 📝 Form Components

### Input
Input text standar dengan label dan error handling.

```svelte
<Input 
  label="Nama Lengkap"
  name="name"
  bind:value={$form.name}
  error={$form.errors.name}
  placeholder="Masukkan nama lengkap"
  required
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `''` | Label input |
| `name` | `string` | `''` | Name attribute |
| `value` | `string` | `''` | Input value (bind) |
| `error` | `string` | `''` | Error message |
| `required` | `boolean` | `false` | Required field |
| `placeholder` | `string` | `''` | Placeholder text |

### IconInput
Input dengan icon di sebelah kiri.

```svelte
<IconInput 
  label="Email"
  type="email"
  icon="fas fa-envelope"
  bind:value={$form.email}
  error={$form.errors.email}
  placeholder="user@example.com"
  required
/>

<IconInput 
  label="Phone"
  type="tel"
  icon="fas fa-phone"
  bind:value={$form.phone}
  placeholder="+62 812-3456-7890"
/>
```

**Props tambahan:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | `''` | Font Awesome icon class |
| `type` | `string` | `'text'` | Input type |

### EmailInput
Input khusus untuk email dengan icon envelope.

```svelte
<EmailInput 
  bind:value={$form.email}
  error={$form.errors.email}
  placeholder="your@email.com"
  required
/>
```

### PasswordInput
Input password dengan toggle visibility dan optional strength indicator.

```svelte
<!-- Login form -->
<PasswordInput 
  bind:value={$form.password}
  error={$form.errors.password}
  placeholder="Enter password"
  autocomplete="current-password"
/>

<!-- Registration form dengan strength indicator -->
<PasswordInput 
  bind:value={$form.password}
  error={$form.errors.password}
  showStrength={true}
  placeholder="Create strong password"
  autocomplete="new-password"
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showStrength` | `boolean` | `false` | Tampilkan strength indicator |
| `autocomplete` | `string` | `'current-password'` | Autocomplete hint |

### RadioOption
Custom radio button dengan design modern dan support untuk icon.

```svelte
<script>
let selectedRole = 'admin';
let selectedStatus = true;
</script>

<!-- Role Selection -->
<div class="space-y-3">
  <label class="block text-sm font-medium text-gray-700">User Role</label>
  <div class="grid grid-cols-2 gap-3">
    <RadioOption 
      id="role-admin"
      name="role"
      value="admin"
      bind:groupValue={selectedRole}
      title="Administrator"
      description="Full system access"
      icon="fas fa-shield-alt"
    />
    <RadioOption 
      id="role-member"
      name="role"
      value="member"
      bind:groupValue={selectedRole}
      title="Member"
      description="Limited access"
      icon="fas fa-user"
    />
  </div>
</div>

<!-- Status Selection -->
<div class="grid grid-cols-2 gap-3">
  <RadioOption 
    id="status-active"
    name="status"
    value={true}
    bind:groupValue={selectedStatus}
    title="Active"
    description="User can login"
    variant="success"
  />
  <RadioOption 
    id="status-inactive"
    name="status"
    value={false}
    bind:groupValue={selectedStatus}
    title="Inactive"
    description="Login disabled"
    variant="danger"
  />
</div>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Unique ID |
| `name` | `string` | required | Group name |
| `value` | `any` | required | Option value |
| `groupValue` | `any` | required | Selected value (bind) |
| `title` | `string` | `''` | Option title |
| `description` | `string` | `''` | Option description |
| `icon` | `string` | `null` | Font Awesome icon |
| `variant` | `'default' \| 'success' \| 'danger'` | `'default'` | Color variant |
| `disabled` | `boolean` | `false` | Disable state |

### Dropdown (Form)
Custom select dropdown untuk form dengan label dan error handling.

```svelte
<Dropdown 
  label="Pilih Role"
  name="role"
  bind:value={$form.role}
  options={[
    { value: 'admin', label: 'Administrator' },
    { value: 'member', label: 'Member' },
    { value: 'guest', label: 'Guest' }
  ]}
  placeholder="Pilih role user"
  error={$form.errors.role}
  required
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `''` | Field label |
| `name` | `string` | `''` | Field name |
| `value` | `string` | `''` | Selected value |
| `options` | `Array<{value, label}>` | `[]` | Options |
| `error` | `string` | `''` | Error message |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disable state |

### FormError
Menampilkan error message atau multiple errors.

```svelte
<!-- Single error -->
<FormError message={error} />

<!-- Multiple errors dari form -->
<FormError errors={$form.errors} />

<!-- Custom styling -->
<FormError 
  message="Email sudah terdaftar" 
  class="mt-4 text-center"
/>
```

## 📊 Dashboard Components

### PageHeader
Header halaman dengan breadcrumb, title, description, dan action buttons.

```svelte
<PageHeader 
  title="User Management"
  description="Kelola user sistem"
  breadcrumbs={[
    { label: 'Dashboard', href: '/admin/dashboard', icon: 'fas fa-home' },
    { label: 'Users' }
  ]}
>
  <div slot="actions">
    <Button 
      href="/admin/users/create" 
      icon="fas fa-plus"
      size="md"
    >
      Tambah User
    </Button>
  </div>
</PageHeader>

<!-- Simple header -->
<PageHeader title="Dashboard" />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `''` | Page title |
| `description` | `string` | `''` | Page description |
| `breadcrumbs` | `Array<{label, href?, icon?}>` | `[]` | Breadcrumb items |

### DataTable
Tabel data lengkap dengan sorting, search, pagination, dan custom actions.

```svelte
<script>
function handleAction(action, user) {
  if (action.label === 'Edit') {
    router.visit(`/admin/users/${user.id}/edit`);
  } else if (action.label === 'Delete') {
    // Show delete confirmation
  }
}
</script>

<DataTable 
  columns={[
    { 
      key: 'name', 
      label: 'User', 
      type: 'user',  // Special type untuk avatar + name/email
      sortable: true 
    },
    { 
      key: 'role', 
      label: 'Role', 
      type: 'badge',
      badgeVariants: {
        admin: 'danger',    // Admin = red badge
        member: 'success'   // Member = green badge
      }
    },
    { 
      key: 'is_active', 
      label: 'Status', 
      type: 'status'  // Show active/inactive dengan dot
    },
    { 
      key: 'created_at', 
      label: 'Bergabung', 
      type: 'date',
      sortable: true 
    }
  ]}
  data={users}
  searchable
  searchPlaceholder="Cari user..."
  actions={[
    { 
      label: 'Edit', 
      icon: 'fas fa-edit', 
      variant: 'primary' 
    },
    { 
      label: 'Delete', 
      icon: 'fas fa-trash', 
      variant: 'danger',
      requireConfirm: true 
    }
  ]}
  onAction={handleAction}
/>
```

**Column Types:**
- `text` - Text biasa (default)
- `user` - Avatar + name/email display
- `badge` - Colored badge
- `status` - Active/inactive indicator
- `date` - Formatted date
- `currency` - Format currency
- `number` - Format number
- `index` - Row number

### StatCard
Kartu statistik untuk dashboard metrics.

```svelte
<!-- Simple stat -->
<StatCard 
  title="Total Users"
  value="1,234"
  icon="fas fa-users"
  color="primary"
/>

<!-- With trend -->
<StatCard 
  title="Revenue"
  value="Rp 45.2M"
  icon="fas fa-dollar-sign"
  color="success"
  trend="+12.5%"
  trendType="up"
/>

<!-- Grid layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <StatCard title="Users" value={stats.users} icon="fas fa-users" color="primary" />
  <StatCard title="Orders" value={stats.orders} icon="fas fa-shopping-cart" color="info" />
  <StatCard title="Revenue" value={stats.revenue} icon="fas fa-dollar-sign" color="success" />
  <StatCard title="Growth" value={stats.growth} icon="fas fa-chart-line" color="warning" trend="+8%" trendType="up" />
</div>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Stat title |
| `value` | `string\|number` | required | Stat value |
| `icon` | `string` | required | Font Awesome icon |
| `color` | `string` | `'primary'` | Color theme |
| `trend` | `string` | `''` | Trend percentage |
| `trendType` | `'up' \| 'down'` | `'up'` | Trend direction |

### Sidebar
Sidebar navigasi dashboard dengan support untuk nested menu.

```svelte
<!-- Sudah dihandle di DashboardLayout -->
<!-- Konfigurasi menu di DashboardLayout.svelte -->

const menuItems = [
  { 
    label: 'Dashboard', 
    href: '/admin/dashboard', 
    icon: 'fas fa-home' 
  },
  { 
    label: 'Users', 
    href: '/admin/users', 
    icon: 'fas fa-users',
    badge: '5'  // Optional badge
  },
  { 
    label: 'Settings',
    icon: 'fas fa-cog',
    children: [  // Nested menu
      { label: 'General', href: '/admin/settings' },
      { label: 'Security', href: '/admin/settings/security' }
    ]
  }
];
```

## 🎨 Layout Components

### AuthLayout
Layout untuk halaman authentication (login, register, dll).

```svelte
<AuthLayout>
  <!-- Content otomatis di-center dengan card -->
  <form>
    <!-- Form content -->
  </form>
</AuthLayout>
```

### DashboardLayout
Layout untuk halaman dashboard dengan sidebar dan navbar.

```svelte
<DashboardLayout>
  <!-- Page content -->
  <PageHeader title="Dashboard" />
  
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Dashboard content -->
  </div>
</DashboardLayout>
```

### GuestLayout
Layout untuk halaman public/guest.

```svelte
<GuestLayout>
  <!-- Public page content -->
</GuestLayout>
```

## 🎨 Theming

Aplikasi mendukung 5 tema warna:
- **Orange** (Default) - Warm & energetic
- **Blue Ocean** - Professional & trustworthy  
- **Emerald Green** - Fresh & growth
- **Royal Purple** - Creative & premium
- **Slate Gray** - Modern & minimalist

Tema dapat diubah melalui Settings page. Semua komponen otomatis menyesuaikan dengan tema yang dipilih.

## 📋 Form Integration dengan Inertia

```svelte
<script>
import { useForm } from '@inertiajs/svelte';
import Button from '@/Components/UI/Button.svelte';
import IconInput from '@/Components/UI/Form/IconInput.svelte';
import alert from '@/Stores/alertStore';

const form = useForm({
  name: '',
  email: '',
  password: ''
});

function handleSubmit() {
  $form.post('/users', {
    onSuccess: () => {
      alert.success('User berhasil ditambahkan');
    },
    onError: () => {
      alert.error('Terjadi kesalahan');
    }
  });
}
</script>

<form on:submit|preventDefault={handleSubmit}>
  <IconInput 
    label="Name"
    icon="fas fa-user"
    bind:value={$form.name}
    error={$form.errors.name}
    required
  />
  
  <IconInput 
    label="Email"
    type="email"
    icon="fas fa-envelope"
    bind:value={$form.email}
    error={$form.errors.email}
    required
  />
  
  <Button 
    type="submit"
    loading={$form.processing}
    disabled={$form.processing}
  >
    {$form.processing ? 'Menyimpan...' : 'Simpan'}
  </Button>
</form>
```

## 🔧 Tips & Best Practices

1. **Import Path**: Selalu gunakan alias `@/Components/`
   ```svelte
   import Button from '@/Components/UI/Button.svelte';
   ```

2. **Event Handling**: Gunakan event forwarding untuk flexibility
   ```svelte
   <Button on:click={() => handleClick()} />
   ```

3. **Loading States**: Selalu handle loading untuk UX yang baik
   ```svelte
   <Button loading={isLoading} disabled={isLoading}>
     {isLoading ? 'Processing...' : 'Submit'}
   </Button>
   ```

4. **Error Handling**: Tampilkan error dengan jelas
   ```svelte
   <Input error={$form.errors.email} />
   ```

5. **Responsive Design**: Gunakan Tailwind responsive utilities
   ```svelte
   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
   ```

6. **Accessibility**: Pastikan semua interactive elements accessible
   ```svelte
   <button aria-label="Delete user" title="Delete user">
   ```

## 📝 Catatan

- Semua komponen mendukung theme switching otomatis
- Komponen form terintegrasi dengan Inertia.js form handling  
- Icons menggunakan Font Awesome 5
- Responsive design untuk semua screen sizes
- Tailwind CSS v4 dengan CSS variables untuk theming

## 🚀 Quick Start

```svelte
<script>
// Import komponen yang dibutuhkan
import { useForm } from '@inertiajs/svelte';
import DashboardLayout from '@/Components/Layouts/DashboardLayout.svelte';
import PageHeader from '@/Components/Dashboard/PageHeader.svelte';
import Card from '@/Components/UI/Card.svelte';
import Button from '@/Components/UI/Button.svelte';
import IconInput from '@/Components/UI/Form/IconInput.svelte';
import alert from '@/Stores/alertStore';

// Setup form
const form = useForm({
  title: '',
  description: ''
});

// Handle submit
function handleSubmit() {
  $form.post('/items', {
    onSuccess: () => alert.success('Item created!')
  });
}
</script>

<DashboardLayout>
  <PageHeader 
    title="Create Item"
    breadcrumbs={[
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Items', href: '/items' },
      { label: 'Create' }
    ]}
  />
  
  <Card>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <IconInput 
        label="Title"
        icon="fas fa-heading"
        bind:value={$form.title}
        error={$form.errors.title}
        required
      />
      
      <div class="flex justify-end gap-3">
        <Button href="/items" variant="secondary">
          Cancel
        </Button>
        <Button 
          type="submit"
          loading={$form.processing}
        >
          Create
        </Button>
      </div>
    </form>
  </Card>
</DashboardLayout>
```