<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;

class MenuController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:menu.view')->only(['index', 'show']);
        $this->middleware('permission:menu.create')->only(['create', 'store']);
        $this->middleware('permission:menu.edit')->only(['edit', 'update']);
        $this->middleware('permission:menu.delete')->only(['destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Menu::with(['parent', 'children'])
            ->orderBy('parent_id')
            ->orderBy('sort_order');

        // Filter by search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%")
                    ->orWhere('route', 'like', "%{$search}%");
            });
        }

        // Filter by parent
        if ($request->has('parent_id')) {
            if ($request->parent_id === 'root') {
                $query->whereNull('parent_id');
            } elseif ($request->parent_id) {
                $query->where('parent_id', $request->parent_id);
            }
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('is_active', $request->status === 'active');
        }

        $menus = $query->paginate(20);

        // Get parent options for filter
        $parentOptions = Menu::whereNull('parent_id')
            ->orderBy('sort_order')
            ->get(['id', 'name']);

        // Get permissions for select options
        $permissions = Permission::orderBy('name')->get(['name']);

        return inertia('Menus/Index', [
            'menus' => $menus,
            'parentOptions' => $parentOptions,
            'permissions' => $permissions,
            'filters' => $request->only(['search', 'parent_id', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $parentMenus = Menu::whereNull('parent_id')
            ->active()
            ->orderBy('sort_order')
            ->get(['id', 'name']);

        $permissions = Permission::orderBy('name')->get(['name']);

        return inertia('Menus/Create', [
            'parentMenus' => $parentMenus,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:menus,slug',
            'icon' => 'nullable|string|max:255',
            'route' => 'nullable|string|max:255',
            'url' => 'nullable|string|max:255',
            'parent_id' => 'nullable|exists:menus,id',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'permission_name' => 'nullable|string|exists:permissions,name',
            'description' => 'nullable|string',
        ]);

        // Auto-generate slug if not provided
        if (! $validated['slug']) {
            $validated['slug'] = Str::slug($validated['name']);

            // Ensure unique slug
            $originalSlug = $validated['slug'];
            $counter = 1;
            while (Menu::where('slug', $validated['slug'])->exists()) {
                $validated['slug'] = $originalSlug.'-'.$counter;
                $counter++;
            }
        }

        // Set default sort order if not provided
        if (! isset($validated['sort_order'])) {
            $maxOrder = Menu::where('parent_id', $validated['parent_id'] ?? null)
                ->max('sort_order');
            $validated['sort_order'] = ($maxOrder ?? 0) + 1;
        }

        $menu = Menu::create($validated);

        return to_route('menus.index', [], 303)
            ->with('success', 'Menu berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        $menu->load(['parent', 'children' => function ($query) {
            $query->orderBy('sort_order');
        }]);

        return inertia('Menus/Show', [
            'menu' => $menu,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu)
    {
        $parentMenus = Menu::whereNull('parent_id')
            ->where('id', '!=', $menu->id) // Exclude self
            ->active()
            ->orderBy('sort_order')
            ->get(['id', 'name']);

        $permissions = Permission::orderBy('name')->get(['name']);

        return inertia('Menus/Edit', [
            'menu' => $menu,
            'parentMenus' => $parentMenus,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('menus', 'slug')->ignore($menu->id),
            ],
            'icon' => 'nullable|string|max:255',
            'route' => 'nullable|string|max:255',
            'url' => 'nullable|string|max:255',
            'parent_id' => [
                'nullable',
                'exists:menus,id',
                function ($attribute, $value, $fail) use ($menu) {
                    if ($value == $menu->id) {
                        $fail('Menu tidak bisa menjadi parent dari dirinya sendiri.');
                    }

                    // Check if making this menu a child would create a circular reference
                    if ($value && $this->wouldCreateCircularReference($menu, $value)) {
                        $fail('Pengaturan parent ini akan membuat referensi circular.');
                    }
                },
            ],
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'permission_name' => 'nullable|string|exists:permissions,name',
            'description' => 'nullable|string',
        ]);

        // Auto-generate slug if not provided
        if (! $validated['slug']) {
            $validated['slug'] = Str::slug($validated['name']);

            // Ensure unique slug
            $originalSlug = $validated['slug'];
            $counter = 1;
            while (Menu::where('slug', $validated['slug'])->where('id', '!=', $menu->id)->exists()) {
                $validated['slug'] = $originalSlug.'-'.$counter;
                $counter++;
            }
        }

        $menu->update($validated);

        // Handle Inertia requests properly
        return to_route('menus.index', [], 303)
            ->with('success', 'Menu berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        // Check if menu has children
        if ($menu->children()->exists()) {
            return to_route('menus.index', [], 303)
                ->with('error', 'Tidak dapat menghapus menu yang memiliki sub-menu. Hapus sub-menu terlebih dahulu.');
        }

        $menu->delete();

        return to_route('menus.index', [], 303)
            ->with('success', 'Menu berhasil dihapus.');
    }

    /**
     * Get menu hierarchy for sidebar
     */
    public function getMenuHierarchy(Request $request)
    {
        $userId = $request->user()->id ?? null;
        $menus = Menu::getMenuHierarchy($userId);

        return response()->json([
            'menus' => $menus,
        ]);
    }

    /**
     * Reorder menus
     */
    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:menus,id',
            'items.*.sort_order' => 'required|integer|min:0',
            'items.*.parent_id' => 'nullable|exists:menus,id',
        ]);

        foreach ($validated['items'] as $item) {
            Menu::where('id', $item['id'])->update([
                'sort_order' => $item['sort_order'],
                'parent_id' => $item['parent_id'],
            ]);
        }

        return to_route('menus.index', [], 303)
            ->with('success', 'Urutan menu berhasil diperbarui.');
    }

    /**
     * Toggle menu status
     */
    public function toggleStatus(Menu $menu)
    {
        $menu->update(['is_active' => ! $menu->is_active]);

        $status = $menu->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return to_route('menus.index', [], 303)
            ->with('success', "Menu berhasil {$status}.");
    }

    /**
     * Check if setting parent would create circular reference
     */
    private function wouldCreateCircularReference(Menu $menu, $parentId)
    {
        $parent = Menu::find($parentId);

        while ($parent) {
            if ($parent->id === $menu->id) {
                return true;
            }
            $parent = $parent->parent;
        }

        return false;
    }

    /**
     * Get available icons (for frontend)
     */
    public function getIcons()
    {
        // Common icon options - you can expand this list
        $icons = [
            'dashboard' => 'fas fa-tachometer-alt',
            'users' => 'fas fa-users',
            'user' => 'fas fa-user',
            'settings' => 'fas fa-cog',
            'menu' => 'fas fa-bars',
            'home' => 'fas fa-home',
            'file' => 'fas fa-file',
            'folder' => 'fas fa-folder',
            'chart' => 'fas fa-chart-bar',
            'table' => 'fas fa-table',
            'calendar' => 'fas fa-calendar',
            'envelope' => 'fas fa-envelope',
            'bell' => 'fas fa-bell',
            'search' => 'fas fa-search',
            'plus' => 'fas fa-plus',
            'edit' => 'fas fa-edit',
            'trash' => 'fas fa-trash',
            'eye' => 'fas fa-eye',
            'lock' => 'fas fa-lock',
            'unlock' => 'fas fa-unlock',
            'key' => 'fas fa-key',
            'shield' => 'fas fa-shield-alt',
            'hospital' => 'fas fa-hospital',
            'stethoscope' => 'fas fa-stethoscope',
            'user-md' => 'fas fa-user-md',
            'pills' => 'fas fa-pills',
            'heartbeat' => 'fas fa-heartbeat',
        ];

        return response()->json(['icons' => $icons]);
    }
}
