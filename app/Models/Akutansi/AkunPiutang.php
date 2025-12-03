<?php

namespace App\Models\Akutansi;

use App\Models\Penjab;
use Illuminate\Database\Eloquent\Model;

class AkunPiutang extends Model
{
    protected $table = 'akun_piutang';

    protected $primaryKey = 'nama_bayar';

    public $incrementing = false;

    public $timestamps = false;

    protected $keyType = 'string';

    protected $fillable = [
        'nama_bayar',
        'kd_rek',
        'kd_pj',
    ];

    public function rekening()
    {
        return $this->belongsTo(Rekening::class, 'kd_rek', 'kd_rek');
    }

    public function penjab()
    {
        return $this->belongsTo(Penjab::class, 'kd_pj', 'kd_pj');
    }
}
