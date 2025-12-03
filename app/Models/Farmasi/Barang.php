<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    protected $table = 'databarang';

    protected $primaryKey = 'kode_brng';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'kode_brng', 'nama_brng', 'kode_satbesar', 'kode_sat', 'letak_barang', 'dasar', 'h_beli', 'ralan', 'kelas1', 'kelas2', 'kelas3', 'utama', 'vip', 'vvip', 'beliluar', 'jualbebas', 'karyawan', 'stokminimal', 'kdjns', 'isi', 'kapasitas', 'expire', 'status', 'kode_industri', 'kode_kategori', 'kode_golongan',
    ];

    protected $casts = [
        'dasar' => 'float', 'h_beli' => 'float', 'ralan' => 'float', 'kelas1' => 'float', 'kelas2' => 'float', 'kelas3' => 'float', 'utama' => 'float', 'vip' => 'float', 'vvip' => 'float', 'beliluar' => 'float', 'jualbebas' => 'float', 'karyawan' => 'float', 'stokminimal' => 'float', 'isi' => 'float', 'kapasitas' => 'float', 'expire' => 'date',
    ];
}
