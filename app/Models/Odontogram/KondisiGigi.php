<?php

namespace App\Models\Odontogram;

use Illuminate\Database\Eloquent\Model;

class KondisiGigi extends Model
{
    protected $table = 'kondisi_gigi';
    public $timestamps = false;
    protected $fillable = [
        'kode',
        'nama',
    ];
}

