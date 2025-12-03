<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class DetailPengeluaranObatBhp extends Model
{
    protected $table = 'detail_pengeluaran_obat_bhp';

    public $timestamps = false;

    protected $fillable = ['no_keluar', 'kode_brng', 'kode_sat', 'no_batch', 'jumlah', 'h_beli', 'subtotal', 'no_faktur'];
}
