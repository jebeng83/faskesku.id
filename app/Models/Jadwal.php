<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    protected $table = 'jadwal';
    public $timestamps = false;

    // Composite primary key tidak didukung langsung oleh Eloquent,
    // jadi kita tidak gunakan incrementing dan primaryKey standar.
    public $incrementing = false;

    protected $fillable = [
        'kd_dokter',
        'hari_kerja',
        'jam_mulai',
        'jam_selesai',
        'kd_poli',
        'kuota',
    ];

    public function dokter()
    {
        return $this->belongsTo(Dokter::class, 'kd_dokter', 'kd_dokter');
    }

    public function poliklinik()
    {
        return $this->belongsTo(Poliklinik::class, 'kd_poli', 'kd_poli');
    }
}