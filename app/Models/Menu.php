<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Permission\Models\Permission;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'icon',
        'route',
        'url',
        'parent_id',
        'sort_order',
        'is_active',
        'permission_name',
        'description'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer'
    ];

    /**
     * Get the parent menu
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }

    /**
     * Get child menus
     */
    public function children(): HasMany
    {
        return $this->hasMany(Menu::class, 'parent_id')->orderBy('sort_order');
    }

    /**
     * Get active child menus
     */
    public function activeChildren(): HasMany
    {
        return $this->children()->where('is_active', true);
    }

    /**
     * Get active children with their children recursively
     */
    public function activeChildrenRecursive(): HasMany
    {
        return $this->children()
            ->where('is_active', true)
            ->with(['activeChildrenRecursive' => function ($query) {
                $query->orderBy('sort_order');
            }])
            ->orderBy('sort_order');
    }

    /**
     * Get permission associated with this menu
     */
    public function permission()
    {
        if ($this->permission_name) {
            return Permission::where('name', $this->permission_name)->first();
        }
        return null;
    }

    /**
     * Scope for active menus
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for root menus (no parent)
     */
    public function scopeRoot($query)
    {
        return $query->whereNull('parent_id');
    }

    /**
     * Get menu hierarchy
     */
    public static function getMenuHierarchy($userId = null)
    {
        $menus = self::active()
            ->root()
            ->with(['activeChildrenRecursive' => function ($query) {
                $query->orderBy('sort_order');
            }])
            ->orderBy('sort_order')
            ->get();

        // Filter by user permissions if user ID provided
        if ($userId) {
            $user = \App\Models\User::find($userId);
            if ($user) {
                $menus = $menus->filter(function ($menu) use ($user) {
                    return self::userCanAccessMenu($menu, $user);
                });

                // Filter children recursively
                $menus->each(function ($menu) use ($user) {
                    $menu->setRelation(
                        'activeChildrenRecursive',
                        self::filterChildrenByPermission($menu->activeChildrenRecursive, $user)
                    );
                });
            }
        }

        return $menus;
    }

    /**
     * Filter children by permission recursively
     */
    private static function filterChildrenByPermission($children, $user)
    {
        return $children->filter(function ($child) use ($user) {
            $canAccess = self::userCanAccessMenu($child, $user);

            if ($canAccess && $child->activeChildrenRecursive) {
                $child->setRelation(
                    'activeChildrenRecursive',
                    self::filterChildrenByPermission($child->activeChildrenRecursive, $user)
                );
            }

            return $canAccess;
        });
    }

    /**
     * Check if user can access menu
     */
    private static function userCanAccessMenu($menu, $user)
    {
        if (!$menu->permission_name) {
            return true; // No permission required
        }

        return $user->can($menu->permission_name);
    }

    /**
     * Get breadcrumb trail for this menu
     */
    public function getBreadcrumb()
    {
        $breadcrumb = collect([$this]);

        $parent = $this->parent;
        while ($parent) {
            $breadcrumb->prepend($parent);
            $parent = $parent->parent;
        }

        return $breadcrumb;
    }

    /**
     * Check if this menu has children
     */
    public function hasChildren()
    {
        return $this->children()->exists();
    }

    /**
     * Get full URL for this menu
     */
    public function getFullUrlAttribute()
    {
        if ($this->url) {
            return $this->url;
        }

        if ($this->route) {
            return route($this->route);
        }

        return '#';
    }
}
