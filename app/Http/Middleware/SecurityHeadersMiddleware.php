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
        // Log registration POST requests untuk debugging
        if ($request->is('registration*') && $request->isMethod('POST')) {
            \Illuminate\Support\Facades\Log::info('[SECURITY HEADERS MIDDLEWARE] Registration POST request', [
                'path' => $request->path(),
                'full_url' => $request->fullUrl(),
                'method' => $request->method(),
                'route_name' => $request->route()?->getName(),
                'route_params' => $request->route()?->parameters(),
                'accept_header' => $request->header('Accept'),
                'content_type' => $request->header('Content-Type'),
            ]);
        }

        $response = $next($request);

        // Log response untuk registration POST requests
        if ($request->is('registration*') && $request->isMethod('POST')) {
            \Illuminate\Support\Facades\Log::info('[SECURITY HEADERS MIDDLEWARE] Registration POST response', [
                'path' => $request->path(),
                'status' => $response->getStatusCode(),
                'content_type' => $response->headers->get('Content-Type'),
                'route_name' => $request->route()?->getName(),
            ]);
        }

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
        $viteHosts = array_filter(array_map('trim', explode(',', env('VITE_DEV_HOSTS', ''))));
        $viteHttp = [];
        $viteWs = [];
        foreach ($viteHosts as $h) {
            if ($h !== '') {
                $viteHttp[] = 'http://'.$h;
                $viteWs[] = 'ws://'.$h;
            }
        }

        if ($isDevelopment) {
            $httpAllowed = array_unique(array_merge([
                'http://127.0.0.1:5177',
                'http://localhost:5177',
                'http://127.0.0.1:5178',
                'http://localhost:5178',
                'http://127.0.0.1:8000',
                'http://localhost:8000',
                'http://127.0.0.1:8080',
                'http://localhost:8080',
            ], $viteHttp));
            $wsAllowed = array_unique(array_merge([
                'ws://127.0.0.1:5177',
                'ws://localhost:5177',
                'ws://127.0.0.1:5178',
                'ws://localhost:5178',
                'ws://127.0.0.1:8000',
                'ws://localhost:8000',
                'ws://127.0.0.1:8080',
                'ws://localhost:8080',
            ], $viteWs));

            $csp = "default-src 'self'; ".
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com ".implode(' ', $httpAllowed).'; '.
                "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.googleapis.com ".implode(' ', $httpAllowed).'; '.
                "img-src 'self' data: https: http:; ".
                "font-src 'self' data: https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.gstatic.com https://fonts.googleapis.com; ".
                "connect-src 'self' https://cloudflareinsights.com ".implode(' ', array_merge($httpAllowed, $wsAllowed)).'; '.
                "worker-src 'self' blob:; ".
                "frame-src 'self' blob: data: https://www.google.com https://maps.google.com";
        } else {
            // CSP untuk production - lebih ketat
            $style = "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.googleapis.com";
            if (! empty($viteHttp)) {
                $style .= ' '.implode(' ', $viteHttp);
            }
            $script = "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com";
            if (! empty($viteHttp) || ! empty($viteWs)) {
                $script .= ' '.implode(' ', array_merge($viteHttp, $viteWs));
            }
            $connect = "connect-src 'self' https://cloudflareinsights.com";
            if (! empty($viteHttp) || ! empty($viteWs)) {
                $connect .= ' '.implode(' ', array_merge($viteHttp, $viteWs));
            }
            $csp = "default-src 'self'; ".
                $script.'; '.
                $style.'; '.
                "img-src 'self' data: https:; ".
                "font-src 'self' data: https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.gstatic.com https://fonts.googleapis.com; ".
                $connect.'; '.
                "frame-src 'self' blob: data: https://www.google.com https://maps.google.com";
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
