<?php

namespace App\Models\Akutansi;

use App\Models\RegPeriksa;
use Illuminate\Database\Eloquent\Model;

class NotaJalan extends Model
{
    protected $table = 'nota_jalan';

    protected $primaryKey = 'no_rawat';

    public $incrementing = false;

    public $timestamps = false;

    protected $fillable = [
        'no_rawat',
        'no_nota',
        'tanggal',
        'jam',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function regPeriksa()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }
}
