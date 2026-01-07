# 🚀 Laravel Inertia Svelte Starter Kit

Starter kit modern untuk membangun aplikasi web dengan **Laravel 12**, **Inertia.js**, dan **Svelte 5**. Dilengkapi dengan authentication, dashboard, user management, dan theme system.

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/Svelte-5.x-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="Svelte">
  <img src="https://img.shields.io/badge/Inertia.js-1.x-6B46C1?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind">
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
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

## ✨ Features

### 🔐 Authentication & Authorization
- Login, Register, Forgot Password, Reset Password
- Email verification ready
- Role-based access control (Admin & Member)
- Protected routes dengan middleware
- Pesan error yang informatif (email tidak ditemukan, password salah, akun dinonaktifkan)

### 👥 User Management
- CRUD users dengan DataTable
- Search, sort, dan pagination
- Bulk actions support
- User avatar dengan initial generator

### 🎨 UI/UX Features
- **5 Theme Colors**: Orange (default), Blue, Emerald, Purple, Slate
- **Responsive Design**: Mobile-first approach
- **Dark Mode Ready**: Struktur sudah disiapkan
- **Toast Notifications**: Success, error, info alerts
- **Loading States**: Skeleton loader & spinner
- **Empty States**: Informative placeholder

### 🛠️ Developer Experience
- **Hot Module Replacement**: Instant preview
- **TypeScript Ready**: Dapat ditambahkan
- **Component Library**: 30+ reusable components
- **Form Handling**: Terintegrasi dengan Inertia
- **Validation**: Client & server-side dengan pesan bahasa Indonesia
- **SEO Friendly**: Meta tags management
- **Multi-language Support**: Bahasa Indonesia & English

## 📦 Requirements

Pastikan sistem Anda memenuhi requirements berikut:

- **PHP** >= 8.3
- **Composer** >= 2.7
- **Node.js** >= 20.0
- **NPM** >= 10.0 atau Yarn
- **MySQL** >= 8.0 atau PostgreSQL >= 15
- **Git**

### PHP Extensions Required:
- BCMath PHP Extension
- Ctype PHP Extension
- cURL PHP Extension
- DOM PHP Extension
- Fileinfo PHP Extension
- JSON PHP Extension
- Mbstring PHP Extension
- OpenSSL PHP Extension
- PCRE PHP Extension
- PDO PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension

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
- Admin user: `admin@example.com` / `password`
- Member user: `member@example.com` / `password`
- 50 dummy users untuk testing

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
| Admin | admin@example.com | password |
| Member | member@example.com | password |

### Struktur Route

```php
// Public routes
Route::get('/', Welcome::class);
Route::get('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'register']);

// Authenticated routes
Route::middleware(['auth'])->group(function () {
    // Member area
    Route::get('/dashboard', MemberDashboard::class);
    
    // Admin area
    Route::middleware(['role:admin'])->prefix('admin')->group(function () {
        Route::get('/dashboard', AdminDashboard::class);
        Route::resource('users', UserController::class);
        Route::get('/settings', Settings::class);
    });
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

Starter kit menyediakan 30+ komponen siap pakai:

### UI Components
- `Button` - Tombol dengan berbagai varian
- `Card` - Container dengan shadow
- `Modal` - Dialog/popup
- `Alert` - Notifikasi toast
- `EmptyState` - Placeholder kosong
- `Pagination` - Navigasi halaman
- Dan lainnya...

### Form Components
- `Input` - Text input standard
- `IconInput` - Input dengan icon
- `EmailInput` - Khusus email
- `PasswordInput` - Dengan toggle visibility
- `RadioOption` - Custom radio button
- `Dropdown` - Select replacement
- Dan lainnya...

Dokumentasi lengkap: [Components README](resources/js/Components/README.md)

## 🎨 Customization

### Mengganti Theme

1. Melalui UI:
   - Login sebagai admin
   - Pergi ke Settings
   - Pilih theme yang diinginkan

2. Menambah theme baru:
```javascript
// resources/js/Stores/themeStore.js
export const presetThemes = {
    // Theme baru
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

### Menambah Role Baru

1. Update User model:
```php
// app/Models/User.php
public function hasRole($role)
{
    return $this->role === $role;
}
```

2. Buat middleware baru:
```php
php artisan make:middleware EditorMiddleware
```

3. Register di Kernel:
```php
// app/Http/Kernel.php
protected $routeMiddleware = [
    'editor' => \App\Http\Middleware\EditorMiddleware::class,
];
```

### Customize Components

Semua komponen dapat di-customize dengan props atau override styles:

```svelte
<!-- Custom button -->
<Button 
  variant="primary"
  size="lg"
  class="!bg-pink-500 !hover:bg-pink-600"
>
  Custom Button
</Button>
```

## 🚀 Deployment

### Production Build

```bash
# Install dependencies (production)
composer install --optimize-autoloader --no-dev

# Build assets
npm run build

# Cache optimization
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Environment Production

Update `.env`:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Force HTTPS
ASSET_URL="${APP_URL}"
```

## 🐛 Troubleshooting

### Common Issues

**1. Blank page atau error 500**
```bash
# Check permissions
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

**2. Vite manifest not found**
```bash
# Development
npm run dev

# Production
npm run build
```

**3. Database connection refused**
- Pastikan MySQL/PostgreSQL running
- Check credentials di `.env`
- Test connection: `php artisan db:show`

**4. Email tidak terkirim**
- Gunakan Mailtrap untuk testing
- Check SMTP credentials
- Enable "Less secure app access" untuk Gmail

**5. Storage permission denied**
```bash
# Linux/Mac
sudo chmod -R 775 storage
sudo chown -R $USER:www-data storage

# Windows (run as Administrator)
icacls storage /grant Everyone:F /T
```

### Debug Mode

Untuk debugging, aktifkan di `.env`:
```env
APP_DEBUG=true
```

**⚠️ WARNING**: Jangan aktifkan debug mode di production!

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

Created with ❤️ by [Your Name](https://github.com/RobithYusuf)

---

<p align="center">
  <strong>Happy Coding! 🎉</strong>
</p>