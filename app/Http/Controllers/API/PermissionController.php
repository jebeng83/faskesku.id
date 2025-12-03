<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    /**
     * Get all roles with their permissions
     */
    public function getRoles(): JsonResponse
    {
        try {
            $roles = Role::with('permissions')->get();

            return response()->json([
                'success' => true,
                'data' => $roles,
                'message' => 'Roles retrieved successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve roles: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all permissions
     */
    public function getPermissions(): JsonResponse
    {
        try {
            $permissions = Permission::all();

            return response()->json([
                'success' => true,
                'data' => $permissions,
                'message' => 'Permissions retrieved successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve permissions: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Create a new role
     */
    public function createRole(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:roles,name',
                'guard_name' => 'nullable|string|max:255',
                'permissions' => 'nullable|array',
                'permissions.*' => 'exists:permissions,id',
            ]);

            $role = Role::create([
                'name' => $request->name,
                'guard_name' => $request->guard_name ?? 'web',
            ]);

            if ($request->has('permissions')) {
                $permissions = Permission::whereIn('id', $request->permissions)->get();
                $role->syncPermissions($permissions);
            }

            $role->load('permissions');

            return response()->json([
                'success' => true,
                'data' => $role,
                'message' => 'Role created successfully',
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create role: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update a role
     */
    public function updateRole(Request $request, Role $role): JsonResponse
    {
        try {
            $request->validate([
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('roles', 'name')->ignore($role->id),
                ],
                'guard_name' => 'nullable|string|max:255',
                'permissions' => 'nullable|array',
                'permissions.*' => 'exists:permissions,id',
            ]);

            $role->update([
                'name' => $request->name,
                'guard_name' => $request->guard_name ?? $role->guard_name,
            ]);

            if ($request->has('permissions')) {
                $permissions = Permission::whereIn('id', $request->permissions)->get();
                $role->syncPermissions($permissions);
            }

            $role->load('permissions');

            return response()->json([
                'success' => true,
                'data' => $role,
                'message' => 'Role updated successfully',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update role: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a role
     */
    public function deleteRole(Role $role): JsonResponse
    {
        try {
            // Check if role is assigned to any users
            $usersWithRole = $role->users()->count();
            if ($usersWithRole > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete role. It is assigned to '.$usersWithRole.' user(s).',
                ], 400);
            }

            $role->delete();

            return response()->json([
                'success' => true,
                'message' => 'Role deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete role: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Create a new permission
     */
    public function createPermission(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:permissions,name',
                'guard_name' => 'nullable|string|max:255',
            ]);

            $permission = Permission::create([
                'name' => $request->name,
                'guard_name' => $request->guard_name ?? 'web',
            ]);

            return response()->json([
                'success' => true,
                'data' => $permission,
                'message' => 'Permission created successfully',
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create permission: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update a permission
     */
    public function updatePermission(Request $request, Permission $permission): JsonResponse
    {
        try {
            $request->validate([
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('permissions', 'name')->ignore($permission->id),
                ],
                'guard_name' => 'nullable|string|max:255',
            ]);

            $permission->update([
                'name' => $request->name,
                'guard_name' => $request->guard_name ?? $permission->guard_name,
            ]);

            return response()->json([
                'success' => true,
                'data' => $permission,
                'message' => 'Permission updated successfully',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update permission: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a permission
     */
    public function deletePermission(Permission $permission): JsonResponse
    {
        try {
            // Check if permission is assigned to any roles
            $rolesWithPermission = $permission->roles()->count();
            if ($rolesWithPermission > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete permission. It is assigned to '.$rolesWithPermission.' role(s).',
                ], 400);
            }

            $permission->delete();

            return response()->json([
                'success' => true,
                'message' => 'Permission deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete permission: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get role with permissions
     */
    public function getRole(Role $role): JsonResponse
    {
        try {
            $role->load('permissions');

            return response()->json([
                'success' => true,
                'data' => $role,
                'message' => 'Role retrieved successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve role: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get permission
     */
    public function getPermission(Permission $permission): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $permission,
                'message' => 'Permission retrieved successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve permission: '.$e->getMessage(),
            ], 500);
        }
    }
}
