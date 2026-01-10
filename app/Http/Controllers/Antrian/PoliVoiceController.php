<?php

namespace App\Http\Controllers\Antrian;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class PoliVoiceController extends Controller
{
    public function index(Request $request)
    {
        $rows = DB::table('poli_voice_mappings as m')
            ->leftJoin('poliklinik as p', 'p.kd_poli', '=', 'm.kd_poli')
            ->select([
                'm.kd_poli',
                DB::raw('COALESCE(m.nm_poli, p.nm_poli) as nm_poli'),
                'm.file_path',
            ])
            ->orderBy('m.kd_poli')
            ->limit(1000)
            ->get();

        return response()->json(['data' => $rows]);
    }

    public function store(Request $request)
    {
        $kdPoli = strtoupper(trim((string) $request->input('kd_poli', '')));
        $nmPoli = trim((string) $request->input('nm_poli', ''));
        $file = $request->file('file');

        if ($kdPoli === '' || !$file) {
            return response()->json([
                'metaData' => [
                    'message' => 'kd_poli dan file wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }

        $request->validate([
            'file' => 'required|mimes:mp3|max:20480',
        ]);

        $dir = public_path('Suara/Poli');
        if (!File::isDirectory($dir)) {
            File::makeDirectory($dir, 0755, true);
        }

        $safeName = preg_replace('~[^a-zA-Z0-9_\-]~', '_', strtolower($kdPoli));
        $target = $safeName.'_poli.mp3';
        $file->move($dir, $target);

        $relPath = 'Poli/'.$target;

        if ($nmPoli === '') {
            $nmPoli = (string) DB::table('poliklinik')->where('kd_poli', $kdPoli)->value('nm_poli');
        }
        if (is_string($nmPoli)) {
            $nmPoli = preg_replace('/[\x00-\x1F\x7F]/u', '', $nmPoli);
        }

        DB::table('poli_voice_mappings')->updateOrInsert(
            ['kd_poli' => $kdPoli],
            [
                'nm_poli' => $nmPoli,
                'file_path' => $relPath,
                'updated_at' => now(),
                'created_at' => DB::raw('COALESCE(created_at, NOW())'),
            ]
        );

        return response()->json([
            'metaData' => [
                'message' => 'Berhasil menyimpan mapping suara poli',
                'code' => 200,
            ],
            'data' => [
                'kd_poli' => $kdPoli,
                'nm_poli' => $nmPoli,
                'file_path' => $relPath,
            ],
        ]);
    }
}
