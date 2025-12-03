<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;

class SetoranBank extends Model
{
    protected $table = 'setoran_bank';

    protected $fillable = [
        'tgl_setor',
        'no_bukti',
        'keterangan',
        'kd_rek_kas',
        'kd_rek_bank',
        'nominal',
        'no_jurnal',
        'posted_at',
    ];

    protected $casts = [
        'tgl_setor' => 'date',
        'nominal' => 'float',
        'posted_at' => 'datetime',
    ];

    public function rekeningKas()
    {
        return $this->belongsTo(Rekening::class, 'kd_rek_kas', 'kd_rek');
    }

    public function rekeningBank()
    {
        return $this->belongsTo(Rekening::class, 'kd_rek_bank', 'kd_rek');
    }

    public function jurnal()
    {
        return $this->belongsTo(Jurnal::class, 'no_jurnal', 'no_jurnal');
    }
}

