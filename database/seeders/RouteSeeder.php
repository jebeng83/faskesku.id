<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Route;
use App\Models\Menu;

class RouteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Seeding routes from web.php...');

        // Get all routes from web.php
        $routes = collect(Route::getRoutes())->filter(function ($route) {
            return $route->getName() &&
                !str_starts_with($route->getName(), 'api.') &&
                !str_starts_with($route->getName(), 'generated::') &&
                !str_starts_with($route->getName(), 'sanctum.') &&
                !str_starts_with($route->getName(), 'ignition.');
        });

        $this->command->info("Found {$routes->count()} routes to seed");

        $routeData = [];
        foreach ($routes as $route) {
            $routeData[] = [
                'name' => $route->getName(),
                'uri' => $route->uri(),
                'methods' => implode(',', $route->methods()),
                'middleware' => implode(',', $route->gatherMiddleware()),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert routes into a routes table (if it exists) or log them
        $this->command->table(
            ['Name', 'URI', 'Methods', 'Middleware'],
            $routes->map(function ($route) {
                return [
                    $route->getName(),
                    $route->uri(),
                    implode(',', $route->methods()),
                    implode(',', $route->gatherMiddleware())
                ];
            })->toArray()
        );

        $this->command->info('Route seeding completed!');
    }
}
