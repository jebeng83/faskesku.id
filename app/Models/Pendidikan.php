<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pendidikan extends Model
{
    use HasFactory;

    protected $table = 'pendidikan';
    
    protected $fillable = [
        'tingkat',
        'indek',
        'gapok1',
        'kenaikan',
        'maksimal',
    ];

    public $timestamps = false;

    protected $casts = [
        'indek' => 'integer',
        'gapok1' => 'float',
        'kenaikan' => 'float',
        'maksimal' => 'integer',
    ];
}