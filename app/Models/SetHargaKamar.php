<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SetHargaKamar extends Model
{
    protected $table = 'set_harga_kamar';

    public $timestamps = false;

    public $incrementing = false;

    protected $primaryKey = 'kd_kamar';

    protected $keyType = 'string';

    protected $fillable = [
        'kd_kamar',
        'kd_pj',
        'tarif',
    ];

    protected $casts = [
        'tarif' => 'double',
    ];

    public function kamar()
    {
        return $this->belongsTo(Kamar::class, 'kd_kamar', 'kd_kamar');
    }

    public function penjab()
    {
        return $this->belongsTo(Penjab::class, 'kd_pj', 'kd_pj');
    }
}
