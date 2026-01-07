<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
        $query = Permission::query();
        
        // Search
        if ($search = $request->get('search')) {
            $query->where('name', 'like', "%{$search}%");
        }
        
        // Filter by group (module)
        if ($group = $request->get('group')) {
            $query->where('name', 'like', "{$group}.%");
        }
        
        $perPage = $request->get('per_page', 15);
        
        $permissions = $query->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();
        
        // Format data for display
        $permissions->through(function ($permission) {
            $parts = explode('.', $permission->name);
            $permission->group = $parts[0] ?? 'other';
            $permission->action = $parts[1] ?? $permission->name;
            $permission->roles_count = $permission->roles()->count();
            $permission->created_at_formatted = $permission->created_at?->format('d M Y') ?? '-';
            return $permission;
        });
        
        // Get unique groups for filter
        $groups = Permission::all()
            ->map(fn($p) => explode('.', $p->name)[0])
            ->unique()
            ->sort()
            ->values()
            ->toArray();
        
        return Inertia::render('Dashboard/Admin/Permissions/Index', [
            'permissions' => $permissions,
            'filters' => $request->only(['search', 'group', 'per_page']),
            'groups' => $groups,
        ]);
    }
    
    public function create()
    {
        // Get existing groups for suggestions
        $groups = Permission::all()
            ->map(fn($p) => explode('.', $p->name)[0])
            ->unique()
            ->sort()
            ->values()
            ->toArray();
        
        $roles = Role::orderBy('name')->pluck('name')->toArray();
        
        return Inertia::render('Dashboard/Admin/Permissions/Create', [
            'groups' => $groups,
            'roles' => $roles,
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name|regex:/^[a-z]+\.[a-z]+$/',
            'roles' => 'array',
            'roles.*' => 'string|exists:roles,name',
        ], [
            'name.regex' => 'Permission name must be in format: module.action (e.g., user.view)',
        ]);
        
        $permission = Permission::create(['name' => $validated['name']]);
        
        // Assign to roles if specified
        if (!empty($validated['roles'])) {
            foreach ($validated['roles'] as $roleName) {
                $role = Role::findByName($roleName);
                $role->givePermissionTo($permission);
            }
        }
        
        // Always give to super-admin
        $superAdmin = Role::findByName('super-admin');
        if ($superAdmin && !in_array('super-admin', $validated['roles'] ?? [])) {
            $superAdmin->givePermissionTo($permission);
        }
        
        return redirect()->route('admin.permissions.index')
            ->with('success', 'Permission created successfully.');
    }
    
    public function edit(Permission $permission)
    {
        $groups = Permission::all()
            ->map(fn($p) => explode('.', $p->name)[0])
            ->unique()
            ->sort()
            ->values()
            ->toArray();
        
        $roles = Role::orderBy('name')->get()->map(function ($role) use ($permission) {
            return [
                'name' => $role->name,
                'has_permission' => $role->hasPermissionTo($permission),
            ];
        });
        
        return Inertia::render('Dashboard/Admin/Permissions/Edit', [
            'permission' => [
                'id' => $permission->id,
                'name' => $permission->name,
                'roles' => $permission->roles->pluck('name')->toArray(),
            ],
            'groups' => $groups,
            'roles' => $roles,
        ]);
    }
    
    public function update(Request $request, Permission $permission)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name,' . $permission->id . '|regex:/^[a-z]+\.[a-z]+$/',
            'roles' => 'array',
            'roles.*' => 'string|exists:roles,name',
        ], [
            'name.regex' => 'Permission name must be in format: module.action (e.g., user.view)',
        ]);
        
        $permission->update(['name' => $validated['name']]);
        
        // Sync roles
        $roles = $validated['roles'] ?? [];
        
        // Always include super-admin
        if (!in_array('super-admin', $roles)) {
            $roles[] = 'super-admin';
        }
        
        // Remove permission from all roles first
        foreach (Role::all() as $role) {
            $role->revokePermissionTo($permission);
        }
        
        // Assign to specified roles
        foreach ($roles as $roleName) {
            $role = Role::findByName($roleName);
            $role->givePermissionTo($permission);
        }
        
        return redirect()->route('admin.permissions.index')
            ->with('success', 'Permission updated successfully.');
    }
    
    public function destroy(Permission $permission)
    {
        // Remove from all roles first
        foreach (Role::all() as $role) {
            $role->revokePermissionTo($permission);
        }
        
        $permission->delete();
        
        return redirect()->route('admin.permissions.index')
            ->with('success', 'Permission deleted successfully.');
    }
}
