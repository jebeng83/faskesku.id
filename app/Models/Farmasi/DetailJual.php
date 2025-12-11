<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class DetailJual extends Model
{
    protected $table = 'detailjual';

    public $timestamps = false;

    protected $fillable = ['nota_jual', 'kode_brng', 'kode_sat', 'h_beli', 'h_jual', 'jumlah', 'subtotal', 'dis', 'bsr_dis', 'tambahan', 'total', 'aturan_pakai', 'no_batch', 'no_faktur'];
}
