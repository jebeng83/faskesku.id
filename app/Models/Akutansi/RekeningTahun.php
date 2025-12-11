<?php

declare(strict_types=1);

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;

class RekeningTahun extends Model
{
    protected $table = 'rekeningtahun';

    // Tabel tidak memiliki primary key auto-increment standar
    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'thn',
        'kd_rek',
        'saldo_awal',
    ];

    public function rekening()
    {
        return $this->belongsTo(Rekening::class, 'kd_rek', 'kd_rek');
    }
}
