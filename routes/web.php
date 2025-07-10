<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProfileController;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;
use Laravel\Fortify\Http\Controllers\PasswordResetLinkController;
use Laravel\Fortify\Http\Controllers\NewPasswordController;

Route::get('/', function () {
    return Inertia\Inertia::render('Welcome');
});

// Auth Routes - Manual untuk Inertia
Route::middleware('guest')->group(function () {
    // Login
    Route::get('/login', function () {
        return Inertia\Inertia::render('Auth/Login');
    })->name('login');
    
    // Register
    Route::get('/register', function () {
        return Inertia\Inertia::render('Auth/Register');
    })->name('register');
    
    // Forgot Password
    Route::get('/forgot-password', function () {
        return Inertia\Inertia::render('Auth/ForgotPassword');
    })->name('password.request');
    
    // Reset Password
    Route::get('/reset-password/{token}', function ($token) {
        return Inertia\Inertia::render('Auth/ResetPassword', [
            'token' => $token,
            'email' => request()->email
        ]);
    })->name('password.reset');
});

// Admin Routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // User Management
    Route::resource('users', UserController::class);
    
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password');
    
    // Settings
    Route::get('/settings', function () {
        return Inertia\Inertia::render('Dashboard/Admin/Settings');
    })->name('settings');
});

// Member Routes
Route::middleware(['auth', 'role:member'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia\Inertia::render('Dashboard/Member/Index');
    })->name('member.dashboard');
    
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password');
});

// Logout route - available for authenticated users
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');
