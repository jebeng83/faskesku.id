<?php

namespace App\Http\Middleware;

use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

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
                    ? @mb_detect_encoding($value, ['UTF-8', 'ISO-8859-1', 'Windows-1252', 'ASCII'], true)
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

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'flash' => [
                'success' => fn () => $this->sanitizeUtf8($request->session()->get('success')),
                'error' => fn () => $this->sanitizeUtf8($request->session()->get('error')),
                'new_patient' => fn () => $this->sanitizeUtf8($request->session()->get('new_patient')),
            ],
            'errors' => fn () => $this->sanitizeUtf8($request->session()->get('errors') ? $request->session()->get('errors')->getBag('default')->getMessages() : (object) []),
            'auth' => [
                'user' => fn () => $this->sanitizeUtf8($request->user() ? $request->user()->load('employee')->only('id', 'name', 'username', 'email', 'nik', 'employee') : null),
                'permissions' => fn () => $this->sanitizeUtf8($request->user() ? $request->user()->getAllPermissions()->pluck('name')->toArray() : []),
            ],
            'menu_hierarchy' => fn () => $this->sanitizeUtf8($request->user() ? Menu::getMenuHierarchy($request->user()->id)->toArray() : []),
            'current_menu' => fn () => $this->sanitizeUtf8(($cm = $request->attributes->get('current_menu')) ? (method_exists($cm, 'toArray') ? $cm->toArray() : $cm) : null),
            'map_coords' => fn () => [
                'latitude' => ($lat = config('app.map.latitude')) !== null && $lat !== '' && is_numeric($lat) ? (float) $lat : null,
                'longitude' => ($lng = config('app.map.longitude')) !== null && $lng !== '' && is_numeric($lng) ? (float) $lng : null,
            ],
            'settings' => fn () => $this->sanitizeUtf8([
                'AKTIFKANBATCHOBAT' => env('AKTIFKANBATCHOBAT', 'Yes'),
            ]),
        ]);
    }
}
