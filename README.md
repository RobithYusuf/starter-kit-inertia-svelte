# Laravel Inertia Svelte Starter Kit

Starter kit untuk membangun aplikasi web dengan **Laravel 12**, **Inertia.js v2**, dan **Svelte 5** (Runes). Dilengkapi dengan authentication, role-based access control, permission matrix, dan component library.

## Features

- **Authentication**: Login, Register, Forgot Password, Email Verification
- **Spatie Laravel Permission**: Roles & granular permissions management
- **Permission Matrix UI**: Visual grid untuk manage permissions per role
- **User Management**: CRUD dengan DataTable, search, sort, pagination
- **Session Management**: View & revoke active sessions
- **Component Library**: 40+ komponen siap pakai
- **Theme System**: 5 preset themes (Orange, Blue, Emerald, Purple, Slate)
- **Svelte 5 Runes**: Full migration ke $state, $derived, $effect, $props

## Requirements

- PHP >= 8.2
- Composer >= 2.7
- Node.js >= 20.0
- MySQL >= 8.0 atau PostgreSQL >= 15

## Installation

```bash
# Clone repository
git clone https://github.com/RobithYusuf/starter-kit-inertia-svelte.git my-app
cd my-app

# Install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Configure database di .env, lalu:
php artisan migrate --seed

# Start development
npm run dev
php artisan serve
```

Akses aplikasi di: `http://localhost:8000`

## Default Users

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@example.com | password |
| Admin | admin@example.com | password |
| Member | member@example.com | password |

## Roles & Permissions

### Default Roles

| Role | Description |
|------|-------------|
| `super-admin` | Full access, semua permissions |
| `admin` | Manage users, settings, components |
| `member` | Dashboard dan profile access |

### Permissions

| Module | Permissions |
|--------|-------------|
| Users | `user.view`, `user.create`, `user.edit`, `user.delete` |
| Roles | `role.view`, `role.create`, `role.edit`, `role.delete` |
| Settings | `settings.view`, `settings.edit` |
| Dashboard | `dashboard.admin`, `dashboard.member` |
| Profile | `profile.view`, `profile.edit` |
| Sessions | `sessions.view`, `sessions.revoke` |
| Components | `components.view` |

### Usage

```php
// Controller
if ($user->hasRole('admin')) { }
if ($user->can('user.create')) { }

// Middleware
Route::middleware(['role:admin'])->group(...);
Route::middleware(['permission:user.view'])->group(...);
```

```svelte
<script>
    import { page } from '@inertiajs/svelte';
    let user = $derived($page.props.auth?.user);
    let canCreate = $derived(user?.permissions?.includes('user.create'));
</script>

{#if canCreate}
    <Button>Create User</Button>
{/if}
```

## Project Structure

```
├── app/Http/Controllers/Admin/   # Admin controllers
├── resources/js/
│   ├── Components/               # Svelte components
│   │   ├── Dashboard/            # DataTable, Sidebar, PageHeader
│   │   ├── Layouts/              # DashboardLayout, AuthLayout
│   │   └── UI/                   # Button, Card, Modal, Form components
│   ├── Pages/                    # Svelte pages
│   │   ├── Auth/                 # Login, Register, etc
│   │   └── Dashboard/            # Admin & Member pages
│   └── Stores/                   # alertStore, themeStore
├── routes/web.php                # Routes
└── database/seeders/             # RolePermissionSeeder, UserSeeder
```

## Commands

```bash
# Development
npm run dev              # Vite dev server
php artisan serve        # Laravel server
composer dev             # Start all services

# Production
npm run build
php artisan config:cache
php artisan route:cache

# Database
php artisan migrate:fresh --seed
```

## License

MIT License - [robithdev](https://github.com/RobithYusuf)
