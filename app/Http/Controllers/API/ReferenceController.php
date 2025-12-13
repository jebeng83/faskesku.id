<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ReferenceController extends Controller
{
    public function perusahaanPasien()
    {
        try {
            $query = DB::table('perusahaan_pasien');
            // Determine label column if available
            $labelCol = Schema::hasColumn('perusahaan_pasien', 'nama_perusahaan') ? 'nama_perusahaan' : null;
            if ($labelCol) {
                $query->select('kode_perusahaan as value', DB::raw("$labelCol as label"))->orderBy($labelCol);
            } else {
                $query->select('kode_perusahaan as value', DB::raw('kode_perusahaan as label'))->orderBy('kode_perusahaan');
            }
            $data = $query->get();

            return response()->json(['success' => true, 'data' => $data]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function sukuBangsa()
    {
        try {
            $query = DB::table('suku_bangsa');
            $labelCol = Schema::hasColumn('suku_bangsa', 'nama_suku_bangsa') ? 'nama_suku_bangsa' : (Schema::hasColumn('suku_bangsa', 'nama') ? 'nama' : null);
            if ($labelCol) {
                $query->select('id as value', DB::raw("$labelCol as label"))->orderBy($labelCol);
            } else {
                $query->select('id as value', DB::raw('id as label'))->orderBy('id');
            }
            $data = $query->get();

            return response()->json(['success' => true, 'data' => $data]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function bahasaPasien()
    {
        try {
            $query = DB::table('bahasa_pasien');
            $labelCol = Schema::hasColumn('bahasa_pasien', 'nama_bahasa') ? 'nama_bahasa' : (Schema::hasColumn('bahasa_pasien', 'nama') ? 'nama' : null);
            if ($labelCol) {
                $query->select('id as value', DB::raw("$labelCol as label"))->orderBy($labelCol);
            } else {
                $query->select('id as value', DB::raw('id as label'))->orderBy('id');
            }
            $data = $query->get();

            return response()->json(['success' => true, 'data' => $data]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function cacatFisik()
    {
        try {
            $query = DB::table('cacat_fisik');
            // Prefer "nama_cacat" if available, fallback to legacy/other columns
            $labelCol = Schema::hasColumn('cacat_fisik', 'nama_cacat')
                ? 'nama_cacat'
                : (Schema::hasColumn('cacat_fisik', 'nama_cacat_fisik')
                    ? 'nama_cacat_fisik'
                    : (Schema::hasColumn('cacat_fisik', 'nama') ? 'nama' : null));
            if ($labelCol) {
                $query->select('id as value', DB::raw("$labelCol as label"))->orderBy($labelCol);
            } else {
                $query->select('id as value', DB::raw('id as label'))->orderBy('id');
            }
            $data = $query->get();

            return response()->json(['success' => true, 'data' => $data]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
