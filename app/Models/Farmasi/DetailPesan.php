<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class DetailPesan extends Model
{
    protected $connection = 'fufufafa';

    protected $table = 'detailpesan';

    public $timestamps = false;

    protected $fillable = ['no_faktur', 'kode_brng', 'kode_sat', 'jumlah', 'h_pesan', 'subtotal', 'dis', 'besardis', 'total', 'no_batch', 'jumlah2', 'kadaluarsa'];
}
