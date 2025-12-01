<?php

namespace App\Models\Pasien;

use Illuminate\Database\Eloquent\Model;

class CacatFisik extends Model
{
    protected $table = 'cacat_fisik';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'nama_cacat',
    ];

    protected $casts = [
        'id' => 'integer',
        'nama_cacat' => 'string',
    ];
}
