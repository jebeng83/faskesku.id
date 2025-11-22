<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;

class Jurnal extends Model
{
    protected $table = 'jurnal';
    protected $primaryKey = 'no_jurnal';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'no_jurnal',
        'no_bukti',
        'tgl_jurnal',
        'jam_jurnal',
        'jenis',
        'keterangan',
    ];

    protected $casts = [
        'tgl_jurnal' => 'date',
    ];

    public function details()
    {
        return $this->hasMany(DetailJurnal::class, 'no_jurnal', 'no_jurnal');
    }
}