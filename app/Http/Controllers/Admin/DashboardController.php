<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_users' => User::count(),
            'total_admins' => User::where('role', 'admin')->count(),
            'total_members' => User::where('role', 'member')->count(),
            'active_users' => User::where('is_active', true)->count(),
        ];
        
        $recent_users = User::latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'role', 'created_at']);
        
        return Inertia::render('Dashboard/Admin/Index', [
            'stats' => $stats,
            'recent_users' => $recent_users,
        ]);
    }
}