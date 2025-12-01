<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeadersMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Force HTTPS di production
        if (config('app.env') === 'production') {
            $response->headers->set('Strict-Transport-Security', 
                'max-age=31536000; includeSubDomains; preload'
            );
        }

        // Content Security Policy
        // Untuk development: izinkan Vite dev server dan CDN
        // Untuk production: lebih ketat
        $isDevelopment = config('app.env') === 'local' || config('app.debug');
        
        if ($isDevelopment) {
            // CSP untuk development - lebih fleksibel untuk Vite HMR dan CDN
            $csp = "default-src 'self'; " .
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://127.0.0.1:5177 http://localhost:5177 ws://127.0.0.1:5177 ws://localhost:5177; " .
                "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.googleapis.com http://127.0.0.1:5177 http://localhost:5177; " .
                "img-src 'self' data: https: http:; " .
                "font-src 'self' data: https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.gstatic.com https://fonts.googleapis.com; " .
                "connect-src 'self' http://127.0.0.1:5177 http://localhost:5177 ws://127.0.0.1:5177 ws://localhost:5177 http://127.0.0.1:8000 ws://127.0.0.1:8000; " .
                "worker-src 'self' blob:; " .
                "frame-src 'self';";
        } else {
            // CSP untuk production - lebih ketat
            $csp = "default-src 'self'; " .
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " .
                "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.googleapis.com; " .
                "img-src 'self' data: https:; " .
                "font-src 'self' data: https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.gstatic.com https://fonts.googleapis.com; " .
                "connect-src 'self'; " .
                "frame-src 'self';";
        }
        
        $response->headers->set('Content-Security-Policy', $csp);

        // X-Content-Type-Options
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // X-Frame-Options
        $response->headers->set('X-Frame-Options', 'DENY');

        // X-XSS-Protection
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        // Referrer-Policy
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        return $response;
    }
}
