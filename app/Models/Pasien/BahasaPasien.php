<?php

namespace App\Models\Pasien;

use Illuminate\Database\Eloquent\Model;

class BahasaPasien extends Model
{
    protected $table = 'bahasa_pasien';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'nama_bahasa',
    ];

    protected $casts = [
        'id' => 'integer',
        'nama_bahasa' => 'string',
    ];
}
