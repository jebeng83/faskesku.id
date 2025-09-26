<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneratedNumber extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'tanggal',
        'kd_dokter',
        'kd_poli',
        'generated_number',
        'sequence_number'
    ];

    protected $casts = [
        'tanggal' => 'date',
        'sequence_number' => 'integer'
    ];
}