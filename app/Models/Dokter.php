<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dokter extends Model
{
    use HasFactory;

    protected $table = 'dokter';
    protected $primaryKey = 'kd_dokter';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'kd_dokter',
        'nm_dokter',
        'jk',
        'tmp_lahir',
        'tgl_lahir',
        'gol_drh',
        'agama',
        'almt_tgl',
        'no_telp',
        'email',
        'stts_nikah',
        'kd_sps',
        'alumni',
        'no_ijn_praktek',
        'status'
    ];

    protected $casts = [
        'tgl_lahir' => 'date',
        'status' => 'string'
    ];

    /**
     * Scope untuk dokter aktif
     */
    public function scopeAktif($query)
    {
        return $query->where('status', '1');
    }

    /**
     * Accessor untuk nama lengkap dokter
     */
    public function getNamaLengkapAttribute()
    {
        return $this->kd_dokter . ' - ' . $this->nm_dokter;
    }

    public function pegawai()
    {
        return $this->belongsTo(Employee::class, 'kd_dokter', 'nik');
    }
}
