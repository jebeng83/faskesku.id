<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Security headers middleware untuk semua requests
        $middleware->web(prepend: [
            \App\Http\Middleware\SecurityHeadersMiddleware::class,
            \App\Http\Middleware\SecurityLoggingMiddleware::class, // Pindahkan ke prepend agar logging terjadi sebelum CSRF validation
        ]);

        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);

        // API rate limiting
        $middleware->api(prepend: [
            \Illuminate\Routing\Middleware\ThrottleRequests::class.':api',
        ]);

        // Sanctum stateful API untuk Inertia.js SPA authentication
        // Ini memungkinkan API routes menggunakan session-based authentication
        $middleware->statefulApi();

        // Ensure method spoofing is enabled
        $middleware->validateCsrfTokens(except: [
            '/api/wagateway/start',
            '/api/wagateway/qr',
            '/api/wagateway/restart',
            '/api/wagateway/send',
            '/api/whatsapp/send',
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
            // Log semua exceptions untuk registration POST requests
            if ($request->is('registration*') && $request->isMethod('POST')) {
                \Illuminate\Support\Facades\Log::error('[EXCEPTION HANDLER] Exception for Registration POST', [
                    'path' => $request->path(),
                    'method' => $request->method(),
                    'status' => $response->getStatusCode(),
                    'exception' => get_class($exception),
                    'message' => $exception->getMessage(),
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'trace' => $exception->getTraceAsString(),
                    'expects_json' => $request->expectsJson(),
                    'wants_json' => $request->wantsJson(),
                    'accept_header' => $request->header('Accept'),
                    'content_type' => $response->headers->get('Content-Type'),
                ]);
            }

            // Handle CSRF token mismatch (419 error)
            if ($response->getStatusCode() === 419) {
                // Untuk JSON requests, return JSON response
                if ($request->expectsJson() || $request->wantsJson() || $request->header('Accept') === 'application/json') {
                    return response()->json([
                        'success' => false,
                        'message' => 'CSRF token expired. Please refresh the page and try again.',
                        'error_code' => 'CSRF_TOKEN_EXPIRED',
                    ], 419);
                }

                // Untuk Inertia requests, redirect kembali dengan flash message
                // Ini akan menghasilkan Inertia response yang valid
                return back()->with([
                    'error' => 'Halaman telah berakhir. Silakan coba lagi.',
                ]);
            }

            // Ensure JSON responses for API requests
            if ($request->expectsJson() || $request->wantsJson() || $request->header('Accept') === 'application/json') {
                // If response is HTML but request expects JSON, return JSON error
                $contentType = $response->headers->get('Content-Type', '');
                if (str_contains($contentType, 'text/html')) {
                    \Illuminate\Support\Facades\Log::error('[EXCEPTION HANDLER] HTML response for JSON request', [
                        'path' => $request->path(),
                        'method' => $request->method(),
                        'status' => $response->getStatusCode(),
                        'exception' => get_class($exception),
                        'message' => $exception->getMessage(),
                        'route_name' => $request->route()?->getName(),
                        'route_params' => $request->route()?->parameters(),
                    ]);

                    return response()->json([
                        'success' => false,
                        'message' => 'Terjadi kesalahan pada server.',
                        'error' => config('app.debug') ? $exception->getMessage() : 'Internal Server Error',
                    ], $response->getStatusCode() ?: 500);
                }
            }

            return $response;
        });
    })->create();
