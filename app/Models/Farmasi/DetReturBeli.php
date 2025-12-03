<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class DetReturBeli extends Model
{
    protected $table = 'detreturbeli';

    public $timestamps = false;

    protected $fillable = ['no_retur_beli', 'no_faktur', 'kode_brng', 'satuan', 'h_beli', 'jml_beli', 'h_retur', 'jml_retur', 'total', 'no_batch', 'jml_retur2'];
}
