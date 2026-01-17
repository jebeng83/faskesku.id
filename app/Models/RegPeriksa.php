<?php

namespace App\Models;

use Carbon\Carbon;
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
        'keputusan',
        'kode_wilayah',
        'kd_prop',
        'kd_kab',
        'kd_kec',
        'kd_kel',
    ];

    public static function generateNoReg($kd_dokter, $kd_poli, $tgl_registrasi = null)
    {
        $date = $tgl_registrasi ? date('Y-m-d', strtotime($tgl_registrasi)) : date('Y-m-d');
        $urut = env('URUT_NO_REG', 'dokter + poli');
        $norm = strtolower(str_replace(' ', '', (string) $urut));
        $isIgd = strtoupper(trim((string) $kd_poli)) === 'IGDK';

        $qb = self::where('tgl_registrasi', $date)->where('kd_poli', $kd_poli);
        if (! $isIgd && $norm === 'dokter+poli' && $kd_dokter) {
            $qb->where('kd_dokter', $kd_dokter);
        }

        $lastNo = $qb->selectRaw('IFNULL(MAX(CONVERT(no_reg, SIGNED)), 0) as no')->first()->no;

        return str_pad((string) ($lastNo + 1), 3, '0', STR_PAD_LEFT);
    }

    public static function generateNoRawat($tgl_registrasi = null)
    {
        $date = $tgl_registrasi ? date('Y-m-d', strtotime($tgl_registrasi)) : date('Y-m-d');
        $lastNoRawat = self::where('tgl_registrasi', $date)
            ->selectRaw('ifnull(MAX(CONVERT(RIGHT(reg_periksa.no_rawat,6),signed)),0) as no')
            ->first()->no;

        $prefix = date('Y/m/d', strtotime($date));

        return $prefix.'/'.str_pad($lastNoRawat + 1, 6, '0', STR_PAD_LEFT);
    }

    public function pasien()
    {
        return $this->belongsTo(Patient::class, 'no_rkm_medis', 'no_rkm_medis');
    }

    public function patient()
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

    // Akutansi / Keuangan Relations
    public function billing()
    {
        return $this->hasMany(\App\Models\Akutansi\Billing::class, 'no_rawat', 'no_rawat');
    }

    public function notaJalan()
    {
        return $this->hasOne(\App\Models\Akutansi\NotaJalan::class, 'no_rawat', 'no_rawat');
    }

    public function notaInap()
    {
        return $this->hasOne(\App\Models\Akutansi\NotaInap::class, 'no_rawat', 'no_rawat');
    }

    // Query scopes
    public function scopeByStatus($query, $status)
    {
        if ($status === null || $status === '') {
            return $query;
        }

        return $query->where('stts', $status);
    }

    public function scopeByStatusDaftar($query, $status)
    {
        if ($status === null || $status === '') {
            return $query;
        }

        return $query->where('stts_daftar', $status);
    }

    public function scopeByStatusLanjut($query, $status)
    {
        if ($status === null || $status === '') {
            return $query;
        }

        return $query->where('status_lanjut', $status);
    }

    public function scopeByDokter($query, $kdDokter)
    {
        if ($kdDokter === null || $kdDokter === '') {
            return $query;
        }

        return $query->where('kd_dokter', $kdDokter);
    }

    public function scopeByPoli($query, $kdPoli)
    {
        if ($kdPoli === null || $kdPoli === '') {
            return $query;
        }

        return $query->where('kd_poli', $kdPoli);
    }

    public function scopeByStatusBayar($query, $status)
    {
        if ($status === null || $status === '') {
            return $query;
        }

        return $query->where('status_bayar', $status);
    }

    public function scopeByTanggalRegistrasi($query, $tanggal)
    {
        if ($tanggal === null || $tanggal === '') {
            return $query;
        }

        return $query->whereDate('tgl_registrasi', $tanggal);
    }

    public function scopeByRangeTanggal($query, $start, $end)
    {
        $start = $start ?: null;
        $end = $end ?: null;
        if ($start && $end) {
            return $query->whereBetween('tgl_registrasi', [$start, $end]);
        }
        if ($start) {
            return $query->whereDate('tgl_registrasi', '>=', $start);
        }
        if ($end) {
            return $query->whereDate('tgl_registrasi', '<=', $end);
        }

        return $query;
    }

    public function hitungUmur($tglLahir, $tglRegistrasi)
    {
        $birth = Carbon::parse($tglLahir);
        $date = Carbon::parse($tglRegistrasi);
        $years = $birth->diffInYears($date);
        if ($years > 0) {
            return ['umur' => $years, 'satuan' => 'Th'];
        }
        $months = $birth->diffInMonths($date);
        if ($months > 0) {
            return ['umur' => $months, 'satuan' => 'Bl'];
        }
        $days = $birth->diffInDays($date);

        return ['umur' => $days, 'satuan' => 'Hr'];
    }
}
