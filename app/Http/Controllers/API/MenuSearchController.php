<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MenuSearchController extends Controller
{
    /**
     * Search menus
     */
    public function search(Request $request)
    {
        $query = $request->query('q', '');
        $userId = Auth::id();

        if (empty(trim($query))) {
            // Return popular menus when no query
            $results = Menu::getPopular($userId);
        } else {
            // Search menus
            $results = Menu::search($query, $userId);
        }

        return response()->json([
            'success' => true,
            'data' => $results->map(function ($result) {
                $menu = $result['menu'];

                return [
                    'id' => $menu->id,
                    'name' => $menu->name,
                    'slug' => $menu->slug,
                    'icon' => $menu->icon,
                    'route' => $menu->route,
                    'url' => $menu->url,
                    'description' => $menu->description,
                    'breadcrumb' => $result['breadcrumb'],
                    'score' => $result['score'],
                ];
            }),
        ]);
    }

    /**
     * Get popular menus
     */
    public function popular(Request $request)
    {
        $limit = $request->query('limit', 8);
        $userId = Auth::id();

        $results = Menu::getPopular($userId, $limit);

        return response()->json([
            'success' => true,
            'data' => $results->map(function ($result) {
                $menu = $result['menu'];

                return [
                    'id' => $menu->id,
                    'name' => $menu->name,
                    'slug' => $menu->slug,
                    'icon' => $menu->icon,
                    'route' => $menu->route,
                    'url' => $menu->url,
                    'description' => $menu->description,
                    'breadcrumb' => $result['breadcrumb'],
                ];
            }),
        ]);
    }
}
