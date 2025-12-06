<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class DataBatch extends Model
{
    protected $table = 'data_batch';

    public $timestamps = false;

    protected $fillable = ['kode_brng', 'no_batch', 'no_faktur', 'h_beli', 'tgl_kadaluarsa', 'sisa'];

    public function getConnectionName()
    {
        return config('database.default');
    }
}
