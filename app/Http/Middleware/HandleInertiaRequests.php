<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Menu;

class HandleInertiaRequests
{
    public function handle(Request $request, Closure $next): Response
    {
        Inertia::share([
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
            'errors' => fn() => $request->session()->get('errors') ? $request->session()->get('errors')->getBag('default')->getMessages() : (object) [],
            'auth' => [
                'user' => fn() => $request->user() ? $request->user()->only('id', 'name', 'email') : null,
                'permissions' => fn() => $request->user() ? $request->user()->getAllPermissions()->pluck('name') : [],
            ],
            'menu_hierarchy' => fn() => $request->user() ? Menu::getMenuHierarchy($request->user()->id)->toArray() : [],
            'current_menu' => fn() => $request->attributes->get('current_menu'),
        ]);

        return $next($request);
    }
}
