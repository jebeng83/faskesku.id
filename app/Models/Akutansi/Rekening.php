<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;

class Rekening extends Model
{
    protected $table = 'rekening';
    protected $primaryKey = 'kd_rek';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'kd_rek',
        'nm_rek',
        'tipe',
        'balance',
        'level',
    ];

    public function detailJurnals()
    {
        return $this->hasMany(DetailJurnal::class, 'kd_rek', 'kd_rek');
    }
}