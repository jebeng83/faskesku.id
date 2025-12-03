<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class RiwayatBarangMedis extends Model
{
    protected $table = 'riwayat_barang_medis';

    public $timestamps = false;

    protected $fillable = ['kode_brng', 'stok_awal', 'masuk', 'keluar', 'stok_akhir', 'posisi', 'tanggal', 'jam', 'petugas', 'kd_bangsal', 'status', 'no_batch', 'no_faktur', 'keterangan'];
}
