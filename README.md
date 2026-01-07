# 🚀 Laravel Inertia Svelte Starter Kit

Starter kit modern untuk membangun aplikasi web dengan **Laravel 12**, **Inertia.js v2**, dan **Svelte 5** (Runes). Dilengkapi dengan authentication, Spatie Permission, user management, dan component library.

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/Svelte-5.x-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="Svelte">
  <img src="https://img.shields.io/badge/Inertia.js-2.x-6B46C1?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Spatie_Permission-6.x-2196F3?style=for-the-badge" alt="Spatie Permission">
</p>

## 📋 Table of Contents

- [Features](#-features)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Configuration](#%EF%B8%8F-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Components](#-components)
- [Customization](#-customization)

## ✨ Features

### 🔐 Authentication & Authorization
- Login, Register, Forgot Password, Reset Password
- Email verification (optional)
- **Spatie Laravel Permission** untuk roles & permissions
- 3 default roles: Super Admin, Admin, Member
- 17 granular permissions
- Permission Matrix UI untuk manage permissions
- Protected routes dengan middleware

### 👥 User Management
- CRUD users dengan DataTable
- Assign roles ke users
- Search, sort, dan pagination
- User avatar dengan initial generator

### 🔒 Session Management
- View semua active sessions
- Revoke sessions dari device lain
- Informasi device, IP, dan last activity

### 🎨 UI/UX Features
- **5 Theme Colors**: Orange (default), Blue, Emerald, Purple, Slate
- **Customizable Alert Position**: 6 posisi (top/bottom, left/center/right)
- **Responsive Design**: Mobile-first approach
- **Toast Notifications**: Success, error, info, warning alerts
- **Loading States**: Skeleton loader & spinner
- **Empty States**: Informative placeholder

### 🛠️ Developer Experience
- **Svelte 5 Runes**: Full migration ke $state, $derived, $effect, $props
- **Hot Module Replacement**: Instant preview
- **Component Library**: 40+ reusable components
- **Form Handling**: Terintegrasi dengan Inertia
- **Validation**: Client & server-side
- **Multi-language Support**: Bahasa Indonesia & English

## 📦 Requirements

Pastikan sistem Anda memenuhi requirements berikut:

- **PHP** >= 8.2
- **Composer** >= 2.7
- **Node.js** >= 20.0
- **NPM** >= 10.0 atau Yarn
- **MySQL** >= 8.0 atau PostgreSQL >= 15

## 🔧 Installation

### 1. Clone Repository

```bash
# Clone repository
git clone https://github.com/RobithYusuf/starter-kit-inertia-svelte.git my-app

# Masuk ke directory
cd my-app
```

### 2. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node dependencies
npm install
# atau menggunakan yarn
yarn install
```

### 3. Environment Setup

```bash
# Copy file environment
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Configure Database

Edit file `.env` dan sesuaikan konfigurasi database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 5. Run Migrations & Seeders

```bash
# Buat database tables
php artisan migrate

# Isi data dummy (optional)
php artisan db:seed
```

Seeder akan membuat:
- Super Admin: `superadmin@example.com` / `password`
- Admin: `admin@example.com` / `password`
- Member: `member@example.com` / `password`
- 50 dummy users dengan role member

### 6. Build Assets

```bash
# Development mode dengan HMR
npm run dev

# Production build
npm run build
```

### 7. Start Development Server

```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server (jika belum running)
npm run dev
```

Aplikasi dapat diakses di: `http://localhost:8000`

## ⚙️ Configuration

### Email Configuration

Untuk fitur email (reset password, verification), konfigurasikan di `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourapp.com
MAIL_FROM_NAME="${APP_NAME}"
```

### Storage Link

Untuk upload file/images:

```bash
php artisan storage:link
```

### Queue Configuration (Optional)

Untuk background jobs:

```env
QUEUE_CONNECTION=database
```

```bash
php artisan queue:table
php artisan migrate
php artisan queue:work
```

## 💻 Usage

### Default Users

Setelah menjalankan seeder, gunakan akun berikut:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@example.com | password |
| Admin | admin@example.com | password |
| Member | member@example.com | password |

### Roles & Permissions

Project ini menggunakan [Spatie Laravel Permission](https://spatie.be/docs/laravel-permission):

| Role | Permissions | Dashboard |
|------|-------------|-----------|
| `super-admin` | Semua permissions | `/admin/dashboard` |
| `admin` | User CRUD, Settings, Components | `/admin/dashboard` |
| `member` | Profile, Sessions | `/dashboard` |

**Available Permissions:**
- `user.view`, `user.create`, `user.edit`, `user.delete`
- `role.view`, `role.create`, `role.edit`, `role.delete`
- `settings.view`, `settings.edit`
- `dashboard.admin`, `dashboard.member`
- `profile.view`, `profile.edit`
- `sessions.view`, `sessions.revoke`
- `components.view`

### Struktur Route

```php
// Public routes
Route::get('/', ...);
Route::get('/login', ...);
Route::get('/register', ...);

// Admin routes (super-admin & admin)
Route::middleware(['auth', 'role:super-admin,admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('permissions', PermissionController::class);
    Route::get('/settings', ...);
    Route::get('/components', ...);
});

// Member routes
Route::middleware(['auth', 'role:member'])->group(function () {
    Route::get('/dashboard', ...);
    Route::get('/profile', ...);
    Route::get('/sessions', ...);
});
```

## 📁 Project Structure

```
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Middleware/
│   └── Models/
├── resources/
│   ├── js/
│   │   ├── Components/     # Reusable Svelte components
│   │   │   ├── Dashboard/
│   │   │   ├── Layouts/
│   │   │   ├── Shared/
│   │   │   └── UI/
│   │   ├── Pages/         # Svelte pages
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   └── Error.svelte
│   │   ├── Stores/        # Svelte stores
│   │   └── app.js         # Main entry point
│   └── css/
│       └── app.css        # Tailwind CSS
├── routes/
│   └── web.php           # Application routes
├── database/
│   ├── migrations/
│   └── seeders/
└── tests/
```

## 🧩 Components

Starter kit menyediakan 40+ komponen siap pakai dengan Svelte 5 Runes:

### UI Components
| Component | Description |
|-----------|-------------|
| `Button` | Tombol dengan varian (primary, secondary, outline, ghost, danger) |
| `Card` | Container dengan shadow dan padding |
| `Modal` | Dialog/popup dengan portal rendering |
| `ConfirmModal` | Modal konfirmasi dengan callback |
| `Alert` | Notifikasi inline |
| `AlertContainer` | Toast notifications dengan 6 posisi |
| `Badge` | Label/tag dengan warna |
| `Avatar` | User avatar dengan fallback initials |
| `Tabs` | Tab navigation |
| `Accordion` | Collapsible content |
| `Tooltip` | Hover tooltips |
| `Progress` | Progress bar |
| `Spinner` | Loading indicator |
| `Skeleton` | Loading placeholder |
| `Pagination` | Page navigation |
| `Breadcrumb` | Navigation breadcrumbs |
| `Dropdown` | Dropdown menu |

### Form Components
| Component | Description |
|-----------|-------------|
| `TextInput` | Text input dengan label dan error |
| `Select` | Custom select dropdown |
| `MultiSelect` | Multi-value select dengan tags |
| `DatePicker` | Calendar date picker dengan min/max |
| `DateRangePicker` | Date range dengan presets |
| `FileUpload` | Drag & drop file upload |
| `TagInput` | Tag/chip input |
| `RangeSlider` | Numeric range slider |
| `Toggle` | Toggle switch |
| `Checkbox` | Custom checkbox |
| `PasswordInput` | Password dengan visibility toggle |

Lihat semua komponen di `/admin/components` setelah login.

## 🎨 Customization

### Mengganti Theme

1. Melalui UI:
   - Login sebagai admin
   - Pergi ke Settings
   - Pilih theme yang diinginkan

2. Menambah theme baru:
```javascript
// resources/js/Stores/themeStore.svelte.js
export const presetThemes = {
    indigo: {
        name: 'Indigo Night',
        colors: {
            primary50: '#eef2ff',
            primary100: '#e0e7ff',
            // ... warna lainnya
        }
    }
};
```

### Menambah Role & Permission

```php
// database/seeders/RolePermissionSeeder.php

// Tambah permission baru
$permissions = [
    // ... existing
    'report.view',
    'report.export',
];

// Buat role baru
$editor = Role::create(['name' => 'editor']);
$editor->givePermissionTo(['report.view', 'report.export']);

// Jalankan: php artisan db:seed --class=RolePermissionSeeder
```

### Using Permissions di Svelte

```svelte
<script>
    import { page } from '@inertiajs/svelte';
    
    let user = $derived($page.props.auth?.user);
    let canCreateUser = $derived(user?.permissions?.includes('user.create'));
    let isAdmin = $derived(user?.roles?.some(r => ['admin', 'super-admin'].includes(r)));
</script>

{#if canCreateUser}
    <Button>Create User</Button>
{/if}
```

## 📚 Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com)
- [Svelte Documentation](https://svelte.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 👨‍💻 Author

Created with ❤️ by [RobithYusuf](https://github.com/RobithYusuf)

---

<p align="center">
  <strong>Happy Coding! 🎉</strong>
</p>