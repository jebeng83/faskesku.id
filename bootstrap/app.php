<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);

        // Ensure method spoofing is enabled
        $middleware->validateCsrfTokens(except: [
            //
        ]);

        $middleware->alias([
            'menu.permission' => \App\Http\Middleware\MenuPermissionMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Handle 419 CSRF Token Expired untuk Inertia requests
        // Sesuai dokumentasi Inertia: https://inertiajs.com/csrf-protection
        $exceptions->respond(function (\Symfony\Component\HttpFoundation\Response $response, \Throwable $exception, \Illuminate\Http\Request $request) {
            // Handle CSRF token mismatch (419 error)
            if ($response->getStatusCode() === 419) {
                // Untuk Inertia requests, redirect kembali dengan flash message
                // Ini akan menghasilkan Inertia response yang valid
                return back()->with([
                    'error' => 'Halaman telah berakhir. Silakan coba lagi.',
                ]);
            }
            
            return $response;
        });
    })->create();
