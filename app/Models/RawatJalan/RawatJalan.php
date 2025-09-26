<?php

namespace App\Models\RawatJalan;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Patient;

class RawatJalan extends Model
{
    use HasFactory;

    protected $table = 'reg_periksa';
    protected $primaryKey = 'no_rawat';
    public $incrementing = false; // kunci utama bertipe string (bukan auto-increment)
    protected $keyType = 'string';
    public $timestamps = false; // Nonaktifkan created_at dan updated_at

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
        'status_poli'
    ];

    protected $casts = [
        'tgl_registrasi' => 'date',
        'jam_reg' => 'datetime:H:i:s',
        'biaya_reg' => 'decimal:2',
        'umurdaftar' => 'integer'
    ];

    // Relasi dengan model Patient
    public function patient()
    {
        return $this->belongsTo(Patient::class, 'no_rkm_medis', 'no_rkm_medis');
    }

    // Scope untuk filter status
    public function scopeStatus($query, $status)
    {
        return $query->where('stts', $status);
    }

    // Scope untuk filter status bayar
    public function scopeStatusBayar($query, $status)
    {
        return $query->where('status_bayar', $status);
    }

    // Scope untuk filter tanggal
    public function scopeTanggal($query, $tanggal)
    {
        return $query->where('tgl_registrasi', $tanggal);
    }

    // Accessor untuk format tanggal
    public function getTglRegistrasiFormattedAttribute()
    {
        return $this->tgl_registrasi ? $this->tgl_registrasi->format('d/m/Y') : '-';
    }

    // Accessor untuk format jam
    public function getJamRegFormattedAttribute()
    {
        return $this->jam_reg ? $this->jam_reg->format('H:i') : '-';
    }

    // Accessor untuk status badge
    public function getStatusBadgeAttribute()
    {
        $badges = [
            'Belum' => 'badge-warning',
            'Sudah' => 'badge-success',
            'Batal' => 'badge-danger',
            'Berkas Diterima' => 'badge-info',
            'Dirujuk' => 'badge-primary',
            'Meninggal' => 'badge-dark',
            'Dirawat' => 'badge-primary',
            'Pulang Paksa' => 'badge-warning'
        ];

        $class = $badges[$this->stts] ?? 'badge-secondary';
        return "<span class='badge {$class}'>{$this->stts}</span>";
    }

    /**
     * Generate nomor registrasi dengan format NN berdasarkan kode dokter
     */
    public static function generateNoReg($tanggal, $kd_dokter)
    {
        // Cari nomor urut terakhir untuk tanggal dan dokter tersebut
        $lastRecord = self::where('tgl_registrasi', \Carbon\Carbon::parse($tanggal)->format('Y-m-d'))
                         ->where('kd_dokter', $kd_dokter)
                         ->orderBy('no_reg', 'desc')
                         ->first();
        
        if ($lastRecord && $lastRecord->no_reg) {
            // Ambil 2 digit terakhir dari no_reg
            $lastNo = substr($lastRecord->no_reg, -2);
            $nextNo = str_pad((int)$lastNo + 1, 2, '0', STR_PAD_LEFT);
        } else {
            $nextNo = '01';
        }
        
        return $nextNo;
    }

    /**
     * Generate nomor rawat dengan format YYYY/MM/DD/NNNNNN
     * Menggunakan API endpoint yang sudah diperbaiki dengan cache counter
     */
    public static function generateNoRawat($tanggal)
    {
        try {
            // Gunakan HTTP client untuk memanggil API endpoint yang sudah diperbaiki
            $response = \Illuminate\Support\Facades\Http::timeout(10)->post(url('/api/generate-no-rawat/'), [
                'tanggal' => $tanggal
            ]);

            if ($response->successful()) {
                $data = $response->json();
                if ($data['success']) {
                    return $data['data']['no_rawat'];
                }
            }
            
            // Fallback jika API gagal - gunakan logika lama tapi dengan format 6 digit
            $tgl = \Carbon\Carbon::parse($tanggal);
            $tglFormatted = $tgl->format('Y/m/d');
            
            // Gunakan database lock untuk mencegah race condition
            return \Illuminate\Support\Facades\DB::transaction(function () use ($tgl, $tglFormatted) {
                // Cari nomor urut terakhir untuk tanggal tersebut dari reg_periksa dengan lock
                $lastRecord = \App\Models\RegPeriksa::where('tgl_registrasi', $tgl->format('Y-m-d'))
                                 ->lockForUpdate()
                                 ->orderBy('no_rawat', 'desc')
                                 ->first();
                
                if ($lastRecord && $lastRecord->no_rawat) {
                    // Ambil 6 digit terakhir dari no_rawat
                    $lastNo = (int) substr($lastRecord->no_rawat, -6);
                    $nextNo = str_pad($lastNo + 1, 6, '0', STR_PAD_LEFT);
                } else {
                    $nextNo = '000001';
                }
                
                return $tglFormatted . '/' . $nextNo;
            });
            
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Error generating no_rawat: ' . $e->getMessage());
            
            // Fallback dengan logika sederhana
            $tgl = \Carbon\Carbon::parse($tanggal);
            $tglFormatted = $tgl->format('Y/m/d');
            return $tglFormatted . '/000001';
        }
    }

    /**
     * Method untuk menentukan status_poli berdasarkan riwayat kunjungan pasien
     */
    public static function checkPatientStatus($no_rkm_medis)
    {
        // Cek apakah pasien sudah pernah berobat sebelumnya
        $existingRecord = self::where('no_rkm_medis', $no_rkm_medis)
                             ->where('tgl_registrasi', '<', \Carbon\Carbon::now()->format('Y-m-d'))
                             ->first();
        
        return $existingRecord ? 'Lama' : 'Baru';
    }
}