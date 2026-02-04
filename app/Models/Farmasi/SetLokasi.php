<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class SetLokasi extends Model
{
    protected $table = 'set_lokasi';
    public $timestamps = false;
    protected $primaryKey = 'kd_bangsal';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'kd_bangsal',
        'asal_stok'
    ];

    public function bangsal()
    {
        return $this->belongsTo(\App\Models\Bangsal::class, 'kd_bangsal', 'kd_bangsal');
    }
}
