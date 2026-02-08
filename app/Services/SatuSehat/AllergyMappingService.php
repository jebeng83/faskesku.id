<?php

namespace App\Services\SatuSehat;

use Illuminate\Support\Facades\DB;

class AllergyMappingService
{
    /**
     * Cari mapping KFA atau SNOMED untuk data alergi lokal
     * 
     * @param string $alergiKode Kode alergi lokal dari tabel data_alergi
     * @param string $namaAlergi Nama alergi lokal (fallback untuk pencarian)
     * @return array Structure: ['system', 'code', 'display', 'category']
     */
    public function getMapping($alergiKode, $namaAlergi)
    {
        // 1. Cek mapping database
        $mapping = DB::table('satusehat_mapping_alergi')
            ->where('alergi_kode', $alergiKode)
            ->first();
            
        if ($mapping) {
            $result = [
                'system' => $mapping->kfa_code ? 'http://sys-ids.kemkes.go.id/kfa' : 'http://snomed.info/sct',
                'code' => $mapping->kfa_code ?: $mapping->snomed_code,
                'display' => ($mapping->kfa_code ? $mapping->kfa_display : $mapping->snomed_display) ?: $namaAlergi,
                'category' => $mapping->kfa_code ? 'medication' : ($mapping->category ?? 'environment'),
                'criticality' => $mapping->criticality ?? null,
                'manifestation' => $mapping->manifestation_code ? [
                    'code' => $mapping->manifestation_code,
                    'display' => $mapping->manifestation_display
                ] : null
            ];

            return $result;
        }

        // 2. Fallback: Return null atau default free-text structure
        // Jika tidak ada mapping, kita kembalikan struktur untuk Free Text
        // Tapi method ini khusus mengembalikan kode standar.
        return null; 
    }

    /**
     * Helper untuk auto-detect kategori based on keyword jika belum dimapping
     */
    public function guessCategory($namaAlergi)
    {
        $lower = strtolower($namaAlergi);
        
        if (str_contains($lower, 'obat') || str_contains($lower, 'antibiotik') || str_contains($lower, 'penisilin')) {
            return 'medication';
        }
        
        if (str_contains($lower, 'makanan') || str_contains($lower, 'udang') || str_contains($lower, 'kacang') || str_contains($lower, 'telur')) {
            return 'food';
        }
        
        if (str_contains($lower, 'debu') || str_contains($lower, 'dingin') || str_contains($lower, 'bulu')) {
            return 'environment';
        }
        
        return 'environment'; // Default safe fallback
    }
}
