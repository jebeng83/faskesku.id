<?php

namespace App\Models\Pasien;

use Illuminate\Database\Eloquent\Model;

class PerusahaanPasien extends Model
{
    protected $table = 'perusahaan_pasien';

    protected $primaryKey = 'kode_perusahaan';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'kode_perusahaan',
        'nama_perusahaan',
        'alamat',
        'kota',
        'no_telp',
    ];

    protected $casts = [
        'kode_perusahaan' => 'string',
        'nama_perusahaan' => 'string',
        'alamat' => 'string',
        'kota' => 'string',
        'no_telp' => 'string',
    ];
}
