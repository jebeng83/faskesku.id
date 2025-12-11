<?php

namespace App\Models\Pasien;

use Illuminate\Database\Eloquent\Model;

class SukuBangsa extends Model
{
    protected $table = 'suku_bangsa';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'nama_suku_bangsa',
    ];

    protected $casts = [
        'id' => 'integer',
        'nama_suku_bangsa' => 'string',
    ];
}
