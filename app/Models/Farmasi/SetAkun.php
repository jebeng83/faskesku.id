<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class SetAkun extends Model
{
    protected $table = 'set_akun';

    public $timestamps = false;

    protected $fillable = ['Pemesanan_Obat', 'PPN_Masukan', 'Kontra_Pemesanan_Obat', 'Pengadaan_Obat', 'PPN_Keluaran', 'Penjualan_Obat', 'HPP_Obat_Jual_Bebas', 'Persediaan_Obat_Jual_Bebas', 'Stok_Keluar_Medis', 'Kontra_Stok_Keluar_Medis', 'Retur_Ke_Suplayer', 'Kontra_Retur_Ke_Suplayer'];
}
