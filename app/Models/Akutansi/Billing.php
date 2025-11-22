<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;
use App\Models\RegPeriksa;

class Billing extends Model
{
    protected $table = 'billing';
    // Catatan: tabel billing pada SIMRS Khanza umumnya tidak memiliki PK yang ketat.
    // Kita set ke noindex untuk keperluan baca saja (read-only). Hindari operasi update/delete by model.
    protected $primaryKey = 'noindex';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'noindex',
        'no_rawat',
        'tgl_byr',
        'no',
        'nm_perawatan',
        'pemisah',
        'biaya',
        'jumlah',
        'tambahan',
        'totalbiaya',
        'status',
    ];

    protected $casts = [
        'tgl_byr' => 'date',
        'biaya' => 'float',
        'jumlah' => 'float',
        'tambahan' => 'float',
        'totalbiaya' => 'float',
    ];

    public function regPeriksa()
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }
}