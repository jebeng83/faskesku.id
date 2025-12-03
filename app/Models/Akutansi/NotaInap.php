<?php

namespace App\Models\Akutansi;

use App\Models\RegPeriksa;
use Illuminate\Database\Eloquent\Model;

class NotaInap extends Model
{
    protected $table = 'nota_inap';

    protected $primaryKey = 'no_rawat';

    public $incrementing = false;

    public $timestamps = false;

    protected $fillable = [
        'no_rawat',
        'no_nota',
        'tanggal',
        'jam',
        'Uang_Muka',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'Uang_Muka' => 'float',
    ];

    public function regPeriksa()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }
}
