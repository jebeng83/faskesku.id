<?php

namespace App\Http\Controllers;

use App\Models\CatatanKeperawatanRanap;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CatatanKeperawatanRanapController extends Controller
{
    /**
     * Get list of nursing notes for a specific rawat inap (JSON)
     */
    public function getRecords(Request $request)
    {
        $noRawat = $request->query('no_rawat');
        
        if (!$noRawat) {
            return response()->json(['data' => []]);
        }

        $records = CatatanKeperawatanRanap::with(['petugas:nip,nama'])
            ->where('no_rawat', $noRawat)
            ->orderByDesc('tanggal')
            ->orderByDesc('jam')
            ->get();

        return response()->json(['data' => $records]);
    }

    /**
     * Store a new nursing note
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|string|max:17',
            'tanggal' => 'required|date',
            'jam' => 'required',
            'uraian' => 'required|string|max:1000',
            'nip' => 'required|string|max:20',
        ]);

        if (strlen($validated['jam']) == 5) {
            $validated['jam'] .= ':00';
        }

        CatatanKeperawatanRanap::create($validated);

        return response()->json(['message' => 'Catatan keperawatan berhasil disimpan']);
    }

    /**
     * Update a nursing note
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|string|max:17',
            'tanggal' => 'required|date',
            'jam' => 'required',
            'uraian' => 'required|string|max:1000',
            'nip' => 'required|string|max:20',
        ]);

        $no_rawat = $validated['no_rawat'];
        $tanggal = $validated['tanggal'];
        $jam = $validated['jam'];

        if (strlen($jam) == 5) {
            $jam .= ':00';
        }

        $record = CatatanKeperawatanRanap::where('no_rawat', $no_rawat)
            ->where('tanggal', $tanggal)
            ->where('jam', $jam)
            ->first();

        if (!$record) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $record->update($validated);

        return response()->json(['message' => 'Catatan keperawatan berhasil diperbarui']);
    }

    /**
     * Delete a nursing note
     */
    public function destroy(Request $request)
    {
        $no_rawat = $request->input('no_rawat');
        $tanggal = $request->input('tanggal');
        $jam = $request->input('jam');

        if (strlen($jam) == 5) {
            $jam .= ':00';
        }

        $deleted = DB::table('catatan_keperawatan_ranap')
            ->where('no_rawat', $no_rawat)
            ->where('tanggal', $tanggal)
            ->where('jam', $jam)
            ->delete();

        if ($deleted === 0) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return response()->json(['message' => 'Catatan keperawatan berhasil dihapus']);
    }
}
