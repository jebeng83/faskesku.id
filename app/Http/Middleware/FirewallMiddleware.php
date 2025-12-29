<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use App\Models\FirewallSetting;
use App\Models\BlockedIp;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class FirewallMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $config = [
            'enabled' => true,
            'window_seconds' => (int) env('FIREWALL_WINDOW_SECONDS', 60),
            'threshold' => (int) env('FIREWALL_THRESHOLD', 30),
            'block_minutes' => (int) env('FIREWALL_BLOCK_MINUTES', 60),
        ];

        try {
            $config = Cache::remember('firewall:settings', 60, function () use ($config) {
                if (! Schema::hasTable('firewall_settings')) {
                    return $config;
                }

                $row = FirewallSetting::query()->orderBy('id')->first();

                return [
                    'enabled' => $row?->enabled ?? $config['enabled'],
                    'window_seconds' => $row?->window_seconds ?? $config['window_seconds'],
                    'threshold' => $row?->threshold ?? $config['threshold'],
                    'block_minutes' => $row?->block_minutes ?? $config['block_minutes'],
                ];
            });
        } catch (\Throwable $e) {
            $config = $config;
        }

        if (! $config['enabled']) {
            return $next($request);
        }

        $ip = $request->ip();
        $blockedKey = 'firewall:blocked:'.$ip;
        $blocked = Cache::get($blockedKey);

        if (is_array($blocked) && isset($blocked['until']) && now()->lt($blocked['until'])) {
            return $this->blockedResponse($request, $ip, $blocked);
        }

        $response = $next($request);

        $status = $response->getStatusCode();
        $suspiciousStatuses = [400, 401, 403, 404, 405, 408, 429, 500, 501, 502, 503, 504];

        if (in_array($status, $suspiciousStatuses, true)) {
            $windowSeconds = (int) $config['window_seconds'];
            $threshold = (int) $config['threshold'];
            $blockMinutes = (int) $config['block_minutes'];

            $counterKey = 'firewall:errors:'.$ip;
            $data = Cache::get($counterKey, ['count' => 0, 'codes' => []]);

            $data['count']++;
            $data['codes'][] = $status;

            if (count($data['codes']) > 50) {
                $data['codes'] = array_slice($data['codes'], -50);
            }

            Cache::put($counterKey, $data, $windowSeconds);

            if ($data['count'] >= $threshold) {
                $until = now()->addMinutes($blockMinutes);

                $blockedData = [
                    'reason' => 'Terlalu banyak respons error dari alamat IP ini dalam waktu singkat.',
                    'codes' => $data['codes'],
                    'count' => $data['count'],
                    'blocked_at' => now(),
                    'until' => $until,
                ];

                Cache::forget($counterKey);
                Cache::put($blockedKey, $blockedData, $until);

                try {
                    if (Schema::hasTable('blocked_ips')) {
                        $existing = BlockedIp::where('ip_address', $ip)->first();

                        if ($existing) {
                            $existing->update([
                                'reason' => $blockedData['reason'],
                                'codes' => $blockedData['codes'],
                                'hits' => $blockedData['count'],
                                'blocked_at' => $blockedData['blocked_at'],
                                'expires_at' => $blockedData['until'],
                            ]);
                        } else {
                            BlockedIp::create([
                                'ip_address' => $ip,
                                'reason' => $blockedData['reason'],
                                'codes' => $blockedData['codes'],
                                'hits' => $blockedData['count'],
                                'blocked_at' => $blockedData['blocked_at'],
                                'expires_at' => $blockedData['until'],
                            ]);
                        }
                    }
                } catch (\Throwable $e) {
                }

                return $this->blockedResponse($request, $ip, $blockedData);
            }
        }

        return $response;
    }

    protected function blockedResponse(Request $request, string $ip, array $data): Response
    {
        $reason = $data['reason'] ?? null;
        $codes = $data['codes'] ?? [];
        $blockedAt = $data['blocked_at'] ?? null;
        $until = $data['until'] ?? null;

        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => false,
                'message' => 'Akses sementara diblokir oleh sistem keamanan.',
                'ip' => $ip,
                'reason' => $reason,
                'codes' => $codes,
                'blocked_at' => $blockedAt ? $blockedAt->toIso8601String() : null,
                'blocked_until' => $until ? $until->toIso8601String() : null,
            ], 429);
        }

        return Inertia::render('Security/FirewallBlocked', [
            'ip' => $ip,
            'reason' => $reason,
            'codes' => $codes,
            'blocked_at' => $blockedAt ? $blockedAt->toIso8601String() : null,
            'blocked_until' => $until ? $until->toIso8601String() : null,
        ])->toResponse($request)->setStatusCode(429);
    }
}
