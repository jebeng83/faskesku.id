<?php

namespace App\Http\Controllers;

use App\Models\Bangsal;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BangsalController extends Controller
{
    public function apiIndex(Request $request)
    {
        $start = max(0, (int) $request->query('start', 0));
        $limit = max(1, min(500, (int) $request->query('limit', 25)));
        $q = trim((string) $request->query('q', ''));
        $status = $request->query('status');

        $builder = Bangsal::query()->select(['kd_bangsal', 'nm_bangsal', 'status']);
        if ($q !== '') {
            $builder->where(function ($w) use ($q) {
                $w->where('kd_bangsal', 'like', "%{$q}%")
                    ->orWhere('nm_bangsal', 'like', "%{$q}%");
            });
        }
        if (in_array($status, ['0', '1'], true)) {
            $builder->where('status', $status);
        }

        $total = (clone $builder)->count();
        $rows = $builder->orderBy('nm_bangsal')->offset($start)->limit($limit)->get();

        return response()->json([
            'ok' => true,
            'total' => $total,
            'start' => $start,
            'limit' => $limit,
            'list' => $rows,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kd_bangsal' => ['required', 'string', 'unique:bangsal,kd_bangsal'],
            'nm_bangsal' => ['required', 'string'],
            'status' => ['nullable', Rule::in(['0', '1'])],
        ]);

        $payload = [
            'kd_bangsal' => $validated['kd_bangsal'],
            'nm_bangsal' => $validated['nm_bangsal'],
            'status' => $validated['status'] ?? '1',
        ];

        Bangsal::create($payload);

        return response()->json(['success' => true]);
    }

    public function update(Request $request, string $kd_bangsal)
    {
        $bangsal = Bangsal::where('kd_bangsal', $kd_bangsal)->firstOrFail();

        $validated = $request->validate([
            'nm_bangsal' => ['required', 'string'],
            'status' => ['nullable', Rule::in(['0', '1'])],
        ]);

        $bangsal->update([
            'nm_bangsal' => $validated['nm_bangsal'],
            'status' => $validated['status'] ?? $bangsal->status,
        ]);

        return response()->json(['success' => true]);
    }

    public function destroy(string $kd_bangsal)
    {
        $bangsal = Bangsal::where('kd_bangsal', $kd_bangsal)->firstOrFail();
        $bangsal->update(['status' => '0']);

        return response()->json(['success' => true]);
    }
}

