<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Menu;

class HandleInertiaRequests
{
    /**
     * Recursively sanitize any string values to valid UTF-8.
     * This prevents InvalidArgumentException "Malformed UTF-8" when
     * Inertia/JsonResponse encodes props containing legacy-encoded strings.
     */
    protected function sanitizeUtf8($value)
    {
        // If this is an Eloquent model or a collection-like object, convert to array first
        if (is_object($value) && method_exists($value, 'toArray')) {
            // Convert to a plain array so nested attributes become visible to sanitation
            $value = $value->toArray();
        }
        if (is_string($value)) {
            // If the string is already valid UTF-8, keep it but strip control chars
            if (function_exists('mb_check_encoding') && @mb_check_encoding($value, 'UTF-8')) {
                $sv = $value;
            } else {
                // Detect common legacy encodings and convert to UTF-8
                $enc = function_exists('mb_detect_encoding')
                    ? @mb_detect_encoding($value, ['UTF-8','ISO-8859-1','Windows-1252','ASCII'], true)
                    : null;
                if ($enc) {
                    $sv = @mb_convert_encoding($value, 'UTF-8', $enc);
                } else {
                    // Fallback: drop invalid bytes assuming UTF-8
                    $sv = @iconv('UTF-8', 'UTF-8//IGNORE', $value);
                }
            }
            // Strip control characters that may break JSON
            $sv = preg_replace('/[\x00-\x1F\x7F]/u', '', $sv ?? $value);
            return $sv ?? $value;
        }
        if (is_array($value)) {
            foreach ($value as $k => $v) {
                $value[$k] = $this->sanitizeUtf8($v);
            }
            return $value;
        }
        if (is_object($value)) {
            foreach (get_object_vars($value) as $k => $v) {
                $value->{$k} = $this->sanitizeUtf8($v);
            }
            return $value;
        }
        return $value;
    }

    public function handle(Request $request, Closure $next): Response
    {
        Inertia::share([
            'flash' => [
                'success' => fn() => $this->sanitizeUtf8($request->session()->get('success')),
                'error' => fn() => $this->sanitizeUtf8($request->session()->get('error')),
            ],
            'errors' => fn() => $this->sanitizeUtf8($request->session()->get('errors') ? $request->session()->get('errors')->getBag('default')->getMessages() : (object) []),
            'auth' => [
                'user' => fn() => $this->sanitizeUtf8($request->user() ? $request->user()->load('employee')->only('id', 'name', 'username', 'email', 'nik', 'employee') : null),
                'permissions' => fn() => $this->sanitizeUtf8($request->user() ? $request->user()->getAllPermissions()->pluck('name')->toArray() : []),
            ],
            'menu_hierarchy' => fn() => $this->sanitizeUtf8($request->user() ? Menu::getMenuHierarchy($request->user()->id)->toArray() : []),
            'current_menu' => fn() => $this->sanitizeUtf8(($cm = $request->attributes->get('current_menu')) ? (method_exists($cm, 'toArray') ? $cm->toArray() : $cm) : null),
            'map_coords' => fn() => [
                'latitude' => ($lat = env('LATITUDE')) !== null && $lat !== '' && is_numeric($lat) ? (float) $lat : null,
                'longitude' => ($lng = env('LONGITUDE')) !== null && $lng !== '' && is_numeric($lng) ? (float) $lng : null,
            ],
        ]);

        return $next($request);
    }
}
