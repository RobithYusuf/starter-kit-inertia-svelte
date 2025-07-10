<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();
        
        // Search
        if ($search = $request->get('search')) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }
        
        // Filter by role
        if ($role = $request->get('role')) {
            $query->where('role', $role);
        }
        
        // Filter by status
        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }
        
        // Sorting
        $sortField = $request->get('sort_field', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        // Validate sort field to prevent SQL injection
        $allowedSortFields = ['name', 'email', 'role', 'is_active', 'created_at'];
        if (!in_array($sortField, $allowedSortFields)) {
            $sortField = 'created_at';
        }
        
        $perPage = $request->get('per_page', 10);
        
        $users = $query->orderBy($sortField, $sortOrder)
            ->paginate($perPage)
            ->withQueryString();
        
        // Format dates for display
        $users->through(function ($user) {
            $user->created_at_formatted = $user->created_at ? $user->created_at->format('d M Y') : '-';
            return $user;
        });
        
        return Inertia::render('Dashboard/Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role', 'is_active', 'per_page', 'sort_field', 'sort_order']),
        ]);
    }
    
    public function create()
    {
        return Inertia::render('Dashboard/Admin/Users/Create');
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:admin,member',
            'is_active' => 'boolean',
        ]);
        
        $validated['password'] = Hash::make($validated['password']);
        $validated['is_active'] = $validated['is_active'] ?? true;
        
        User::create($validated);
        
        return redirect()->route('admin.users.index')
            ->with('success', 'User created successfully.');
    }
    
    public function edit(User $user)
    {
        return Inertia::render('Dashboard/Admin/Users/Edit', [
            'user' => $user->only('id', 'name', 'email', 'role', 'is_active'),
        ]);
    }
    
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|in:admin,member',
            'is_active' => 'boolean',
        ]);
        
        if (empty($validated['password'])) {
            unset($validated['password']);
        } else {
            $validated['password'] = Hash::make($validated['password']);
        }
        
        $user->update($validated);
        
        return redirect()->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }
    
    public function destroy(User $user)
    {
        // Prevent deleting yourself
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }
        
        $user->delete();
        
        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }
}