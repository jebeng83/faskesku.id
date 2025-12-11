<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;

class DetailJurnal extends Model
{
    protected $table = 'detailjurnal';

    // Tabel detailjurnal tidak memiliki PK tunggal; set ke no_jurnal (read-only purpose)
    protected $primaryKey = 'no_jurnal';

    public $incrementing = false;

    public $timestamps = false;

    protected $fillable = [
        'no_jurnal',
        'kd_rek',
        'debet',
        'kredit',
    ];

    protected $casts = [
        'debet' => 'float',
        'kredit' => 'float',
    ];

    public function jurnal()
    {
        return $this->belongsTo(Jurnal::class, 'no_jurnal', 'no_jurnal');
    }

    public function rekening()
    {
        return $this->belongsTo(Rekening::class, 'kd_rek', 'kd_rek');
    }
}
