<?php

namespace App\Http\Controllers;

use App\Models\CatatanObservasiRanap;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CatatanObservasiRanapController extends Controller
{
    /**
     * Get list of observation records for a specific rawat inap (JSON)
     */
    public function getRecords(Request $request)
    {
        $noRawat = $request->query('no_rawat');
        
        if (!$noRawat) {
            return response()->json(['data' => []]);
        }

        $records = CatatanObservasiRanap::with(['petugas:nip,nama'])
            ->where('no_rawat', $noRawat)
            ->orderByDesc('tgl_perawatan')
            ->orderByDesc('jam_rawat')
            ->get();

        return response()->json(['data' => $records]);
    }

    /**
     * Store a new observation record
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|string|max:17',
            'tgl_perawatan' => 'required|date',
            'jam_rawat' => 'required',
            'gcs' => 'nullable|string|max:10',
            'td' => 'required|string|max:8',
            'hr' => 'nullable|string|max:5',
            'rr' => 'nullable|string|max:5',
            'suhu' => 'nullable|string|max:5',
            'spo2' => 'required|string|max:3',
            'nip' => 'required|string|max:20',
        ]);

        // Ensure jam_rawat has seconds if it doesn't
        if (strlen($validated['jam_rawat']) == 5) {
            $validated['jam_rawat'] .= ':00';
        }

        CatatanObservasiRanap::create($validated);

        return response()->json(['message' => 'Catatan observasi berhasil disimpan']);
    }

    /**
     * Update an observation record
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|string|max:17',
            'tgl_perawatan' => 'required|date',
            'jam_rawat' => 'required',
            'gcs' => 'nullable|string|max:10',
            'td' => 'required|string|max:8',
            'hr' => 'nullable|string|max:5',
            'rr' => 'nullable|string|max:5',
            'suhu' => 'nullable|string|max:5',
            'spo2' => 'required|string|max:3',
            'nip' => 'required|string|max:20',
        ]);

        // Key for update
        $no_rawat = $validated['no_rawat'];
        $tgl_perawatan = $validated['tgl_perawatan'];
        $jam_rawat = $validated['jam_rawat'];

        if (strlen($jam_rawat) == 5) {
            $jam_rawat .= ':00';
        }

        $record = CatatanObservasiRanap::where('no_rawat', $no_rawat)
            ->where('tgl_perawatan', $tgl_perawatan)
            ->where('jam_rawat', $jam_rawat)
            ->first();

        if (!$record) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $record->update($validated);

        return response()->json(['message' => 'Catatan observasi berhasil diperbarui']);
    }

    /**
     * Delete an observation record
     */
    public function destroy(Request $request)
    {
        $no_rawat = $request->input('no_rawat');
        $tgl_perawatan = $request->input('tgl_perawatan');
        $jam_rawat = $request->input('jam_rawat');

        if (strlen($jam_rawat) == 5) {
            $jam_rawat .= ':00';
        }

        $deleted = DB::table('catatan_observasi_ranap')
            ->where('no_rawat', $no_rawat)
            ->where('tgl_perawatan', $tgl_perawatan)
            ->where('jam_rawat', $jam_rawat)
            ->delete();

        if ($deleted === 0) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return response()->json(['message' => 'Catatan observasi berhasil dihapus']);
    }
}
