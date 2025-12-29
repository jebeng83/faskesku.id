<?php

namespace App\Http\Controllers\Security;

use App\Http\Controllers\Controller;
use App\Models\FirewallSetting;
use App\Models\BlockedIp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class FirewallSettingsController extends Controller
{
    public function index(Request $request): Response
    {
        $setting = FirewallSetting::query()->orderBy('id')->first();

        $data = [
            'enabled' => $setting?->enabled ?? true,
            'window_seconds' => $setting?->window_seconds ?? (int) env('FIREWALL_WINDOW_SECONDS', 60),
            'threshold' => $setting?->threshold ?? (int) env('FIREWALL_THRESHOLD', 30),
            'block_minutes' => $setting?->block_minutes ?? (int) env('FIREWALL_BLOCK_MINUTES', 60),
        ];

        return Inertia::render('Security/FirewallSettings', [
            'setting' => $data,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'enabled' => ['required', 'boolean'],
            'window_seconds' => ['required', 'integer', 'min:10', 'max:3600'],
            'threshold' => ['required', 'integer', 'min:1', 'max:1000'],
            'block_minutes' => ['required', 'integer', 'min:1', 'max:1440'],
        ]);

        $setting = FirewallSetting::query()->orderBy('id')->first();

        if ($setting) {
            $setting->update($validated);
        } else {
            FirewallSetting::create($validated);
        }

        Cache::forget('firewall:settings');

        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
            ]);
        }

        return redirect()->back()->with('success', 'Pengaturan firewall berhasil disimpan.');
    }

    public function blocked(Request $request): Response
    {
        $items = BlockedIp::query()
            ->orderByDesc('blocked_at')
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Security/FirewallBlockedList', [
            'items' => $items,
        ]);
    }

    public function unblock(Request $request, BlockedIp $blockedIp)
    {
        $ip = $blockedIp->ip_address;

        $blockedIp->delete();

        Cache::forget('firewall:blocked:'.$ip);
        Cache::forget('firewall:errors:'.$ip);

        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
            ]);
        }

        return redirect()
            ->route('security.firewall.blocked')
            ->with('success', 'IP berhasil dihapus dari daftar blokir.');
    }
}
