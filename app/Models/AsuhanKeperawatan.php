<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AsuhanKeperawatan extends Model
{
    protected $table = 'asuhan_keperawatan';

    protected $primaryKey = 'no_rawat';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'no_rawat',
        'no_rkm_medis',
        'tgl_pengkajian',
        'tgl_perubahan',
        'nip_perawat',
        'ruangan',
        'jenis_pengkajian',
        'keluhan_utama',
        'riwayat_penyakit_sekarang',
        'evaluasi_hasil',
        'evaluasi_status',
        'evaluator_nip',
        'catatan_khusus',
    ];
}

