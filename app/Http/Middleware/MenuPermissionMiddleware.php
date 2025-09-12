<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Menu;
use Illuminate\Support\Facades\Route;

class MenuPermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $currentRouteName = Route::currentRouteName();

        // Skip middleware for routes that don't need menu permission checking
        $skipRoutes = [
            'login',
            'logout',
            'dashboard',
            'profile.show',
            'profile.update',
            'api.menus.hierarchy',
            'api.menus.icons'
        ];

        if (in_array($currentRouteName, $skipRoutes)) {
            return $next($request);
        }

        // Find menu item by route name
        $menu = Menu::where('route', $currentRouteName)
            ->where('is_active', true)
            ->first();

        if (!$menu) {
            // If no menu found, allow access (for routes not in menu system)
            return $next($request);
        }

        // Check if menu requires permission
        if ($menu->permission_name) {
            if (!$user->can($menu->permission_name)) {
                abort(403, 'Anda tidak memiliki akses ke halaman ini.');
            }
        }

        // Store current menu in request for use in views
        $request->attributes->set('current_menu', $menu);

        return $next($request);
    }
}
