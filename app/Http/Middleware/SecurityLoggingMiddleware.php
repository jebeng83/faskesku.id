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
