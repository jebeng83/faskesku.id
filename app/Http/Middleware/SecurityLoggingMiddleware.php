<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityLoggingMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Log registration POST requests untuk debugging
        if ($request->is('registration/*/register') && $request->isMethod('POST')) {
            \Illuminate\Support\Facades\Log::info('[SECURITY MIDDLEWARE] Registration POST request intercepted', [
                'path' => $request->path(),
                'full_url' => $request->fullUrl(),
                'method' => $request->method(),
                'route_name' => $request->route()?->getName(),
                'patient_param' => $request->route('patient'),
                'has_x_csrf_token' => $request->hasHeader('X-CSRF-TOKEN'),
                'has_x_xsrf_token' => $request->hasHeader('X-XSRF-TOKEN'),
                'x_csrf_token_preview' => $request->header('X-CSRF-TOKEN') ? substr($request->header('X-CSRF-TOKEN'), 0, 20).'...' : null,
                'x_xsrf_token_preview' => $request->header('X-XSRF-TOKEN') ? substr($request->header('X-XSRF-TOKEN'), 0, 20).'...' : null,
                'session_token_preview' => $request->session()->token() ? substr($request->session()->token(), 0, 20).'...' : null,
                'has_session' => $request->hasSession(),
                'session_id' => $request->session()->getId(),
                'accept_header' => $request->header('Accept'),
                'content_type' => $request->header('Content-Type'),
                'expects_json' => $request->expectsJson(),
                'wants_json' => $request->wantsJson(),
            ]);
        }

        // Log ALL POST requests to registration routes untuk debugging
        if ($request->is('registration*') && $request->isMethod('POST')) {
            \Illuminate\Support\Facades\Log::info('[SECURITY MIDDLEWARE] ANY Registration POST request', [
                'path' => $request->path(),
                'full_url' => $request->fullUrl(),
                'method' => $request->method(),
                'route_name' => $request->route()?->getName(),
                'route_params' => $request->route()?->parameters(),
            ]);
        }

        $response = $next($request);

        // Log aktivitas keamanan penting
        if (auth()->check()) {
            $this->logSecurityActivity($request, $response);
        }

        // Monitor failed login attempts
        if ($request->routeIs('login') && $response->getStatusCode() === 302) {
            $this->logLoginAttempt($request, false);
        }

        return $response;
    }

    /**
     * Log aktivitas keamanan
     */
    protected function logSecurityActivity(Request $request, Response $response): void
    {
        $sensitiveRoutes = [
            'users.*',
            'patients.*',
            'employees.*',
            'reg-periksa.*',
            'rawat-jalan.*',
            'laboratorium.*',
            'permintaan-lab.*',
            'permintaan-radiologi.*',
        ];

        $currentRoute = $request->route()?->getName();

        if ($currentRoute && $this->matchesPattern($currentRoute, $sensitiveRoutes)) {
            \Illuminate\Support\Facades\Log::info('Security Activity', [
                'user_id' => auth()->id(),
                'route' => $currentRoute,
                'method' => $request->method(),
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'status_code' => $response->getStatusCode(),
                'timestamp' => now()->toIso8601String(),
            ]);
        }
    }

    /**
     * Log login attempt
     */
    protected function logLoginAttempt(Request $request, bool $success): void
    {
        \Illuminate\Support\Facades\Log::info('Login Attempt', [
            'username' => $request->input('username'),
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'success' => $success,
            'timestamp' => now()->toIso8601String(),
        ]);

        // Track failed attempts untuk rate limiting
        if (! $success) {
            $key = 'failed_logins_'.$request->ip();
            $attempts = \Illuminate\Support\Facades\Cache::get($key, 0);
            \Illuminate\Support\Facades\Cache::put($key, $attempts + 1, now()->addMinutes(15));
        }
    }

    /**
     * Check if route matches pattern
     */
    protected function matchesPattern(string $route, array $patterns): bool
    {
        foreach ($patterns as $pattern) {
            if (str_contains($pattern, '*')) {
                $regex = '/^'.str_replace(['*', '.'], ['.*', '\.'], $pattern).'$/';
                if (preg_match($regex, $route)) {
                    return true;
                }
            } elseif ($route === $pattern) {
                return true;
            }
        }

        return false;
    }
}
