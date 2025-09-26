<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegPeriksa extends Model
{
    use HasFactory;

    protected $table = 'reg_periksa';
    protected $primaryKey = 'no_rawat';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'no_reg',
        'no_rawat',
        'tgl_registrasi',
        'jam_reg',
        'kd_dokter',
        'no_rkm_medis',
        'kd_poli',
        'p_jawab',
        'almt_pj',
        'hubunganpj',
        'biaya_reg',
        'stts',
        'stts_daftar',
        'status_lanjut',
        'kd_pj',
        'umurdaftar',
        'sttsumur',
        'status_bayar',
        'status_poli',
    ];

    public static function generateNoReg($kd_dokter, $kd_poli, $tgl_registrasi = null, $urutnoreg = null)
    {
        $tanggal = $tgl_registrasi ?: date('Y-m-d');
        
        // Ambil URUTNOREG dari environment variable jika tidak diberikan parameter
        $urutnoreg = $urutnoreg ?: env('URUT_NO_REG', 'dokter + poli');
        
        // Implementasi logika Java autoNomer3 dengan switch case URUTNOREG
        switch ($urutnoreg) {
            case 'poli':
                $maxNoReg = self::where('kd_poli', $kd_poli)
                    ->where('tgl_registrasi', $tanggal)
                    ->selectRaw('IFNULL(MAX(CONVERT(no_reg, SIGNED)), 0) as max_no')
                    ->first()->max_no ?? 0;
                break;
                
            case 'dokter':
                $maxNoReg = self::where('kd_dokter', $kd_dokter)
                    ->where('tgl_registrasi', $tanggal)
                    ->selectRaw('IFNULL(MAX(CONVERT(no_reg, SIGNED)), 0) as max_no')
                    ->first()->max_no ?? 0;
                break;
                
            case 'dokter + poli':
                $maxNoReg = self::where('kd_dokter', $kd_dokter)
                    ->where('kd_poli', $kd_poli)
                    ->where('tgl_registrasi', $tanggal)
                    ->selectRaw('IFNULL(MAX(CONVERT(no_reg, SIGNED)), 0) as max_no')
                    ->first()->max_no ?? 0;
                break;
                
            default:
                // Default sama dengan 'dokter'
                $maxNoReg = self::where('kd_dokter', $kd_dokter)
                    ->where('tgl_registrasi', $tanggal)
                    ->selectRaw('IFNULL(MAX(CONVERT(no_reg, SIGNED)), 0) as max_no')
                    ->first()->max_no ?? 0;
                break;
        }
        
        // Implementasi autoNomer3: nextNumber + padding 3 digit
        $nextNumber = $maxNoReg + 1;
        return str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
    }

    /**
     * Generate nomor rawat dengan format YYYY/MM/DD/NNNNNN
     * Menggunakan API endpoint yang sudah diperbaiki dengan cache counter
     */
    public static function generateNoRawat()
    {
        try {
            // Gunakan HTTP client untuk memanggil API endpoint yang sudah diperbaiki
            $response = \Illuminate\Support\Facades\Http::post(url('/api/generate-no-rawat'), [
                'tanggal' => date('Y-m-d')
            ]);

            if ($response->successful()) {
                $data = $response->json();
                if ($data['success']) {
                    return $data['data']['no_rawat'];
                }
            }
            
            // Fallback jika API gagal - gunakan logika lama tapi dengan format 6 digit
            $lastNoRawat = self::where('tgl_registrasi', date('Y-m-d'))
                ->selectRaw("ifnull(MAX(CONVERT(RIGHT(reg_periksa.no_rawat,6),signed)),0) as no")
                ->first()->no;
            return date('Y/m/d') . '/' . str_pad($lastNoRawat + 1, 6, '0', STR_PAD_LEFT);
            
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Error generating no_rawat: ' . $e->getMessage());
            
            // Fallback dengan logika sederhana
            return date('Y/m/d') . '/000001';
        }
    }

    public function pasien()
    {
        return $this->belongsTo(Patient::class, 'no_rkm_medis', 'no_rkm_medis');
    }

    public function penjab()
    {
        return $this->belongsTo(Penjab::class, 'kd_pj', 'kd_pj');
    }

    public function poliklinik()
    {
        return $this->belongsTo(Poliklinik::class, 'kd_poli', 'kd_poli');
    }

    public function dokter()
    {
        return $this->belongsTo(Dokter::class, 'kd_dokter', 'kd_dokter');
    }

    // public function kamarInap()
    // {
    //     return $this->hasOne(KamarInap::class, 'no_rawat', 'no_rawat');
    // }
}
