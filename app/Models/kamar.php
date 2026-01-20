<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kamar extends Model
{
    protected $table = 'kamar';

    protected $primaryKey = 'kd_kamar';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'kd_kamar',
        'kd_bangsal',
        'trf_kamar',
        'status',
        'kelas',
        'statusdata',
    ];

    protected $casts = [
        'trf_kamar' => 'double',
    ];

    /**
     * Relasi ke bangsal
     */
    public function bangsal()
    {
        return $this->belongsTo(Bangsal::class, 'kd_bangsal', 'kd_bangsal');
    }

    /**
     * Relasi ke kamar_inap
     */
    public function kamarInap()
    {
        return $this->hasMany(KamarInap::class, 'kd_kamar', 'kd_kamar');
    }

    /**
     * Relasi ke set_harga_kamar
     */
    public function setHargaKamar()
    {
        return $this->hasMany(SetHargaKamar::class, 'kd_kamar', 'kd_kamar');
    }

    /**
     * Scope untuk kamar kosong
     */
    public function scopeKosong($query)
    {
        return $query->where('status', 'KOSONG');
    }

    /**
     * Scope untuk kamar terisi
     */
    public function scopeTerisi($query)
    {
        return $query->where('status', 'ISI');
    }

    /**
     * Scope untuk kamar aktif
     */
    public function scopeAktif($query)
    {
        return $query->where('statusdata', '1');
    }

    /**
     * Scope filter by bangsal
     */
    public function scopeByBangsal($query, $kd_bangsal)
    {
        return $query->where('kd_bangsal', $kd_bangsal);
    }

    /**
     * Scope filter by kelas
     */
    public function scopeByKelas($query, $kelas)
    {
        return $query->where('kelas', $kelas);
    }
}
