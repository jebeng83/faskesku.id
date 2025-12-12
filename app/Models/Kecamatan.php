<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kecamatan extends Model
{
    use HasFactory;

    protected $table = 'kecamatan';

    protected $primaryKey = 'kd_kec';

    public $incrementing = false;

    public $timestamps = false;

    protected $fillable = [
        'kd_kec',
        'nm_kec',
    ];
}
