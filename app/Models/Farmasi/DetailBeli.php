<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class DetailBeli extends Model
{
    protected $table = 'detailbeli';

    public $timestamps = false;

    protected $fillable = ['no_faktur', 'kode_brng', 'kode_sat', 'jumlah', 'h_beli', 'subtotal', 'dis', 'besardis', 'total', 'no_batch', 'jumlah2', 'kadaluarsa'];
}
