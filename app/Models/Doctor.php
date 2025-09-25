<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
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
        'stts_nikah',
        'kd_sps',
        'alumni',
        'no_ijn_praktek',
        'status',
    ];

    protected $casts = [
        'tgl_lahir' => 'date',
    ];

    /**
     * Relasi dengan RegPeriksa
     */
    public function regPeriksas()
    {
        return $this->hasMany(RegPeriksa::class, 'kd_dokter', 'kd_dokter');
    }

    public function pegawai()
    {
        return $this->belongsTo(Employee::class, 'kd_dokter', 'nik');
    }

    /**
     * Relasi dengan Spesialis
     */
    public function spesialis()
    {
        return $this->belongsTo(Spesialis::class, 'kd_sps', 'kd_sps');
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'kd_dokter';
    }
}
