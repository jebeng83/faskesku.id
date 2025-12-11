<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;

/**
 * Model wrapper untuk tabel `set_akun_ranap2` (COA mapping tambahan Rawat Inap).
 * Tabel ini 1 baris tanpa PK.
 */
class SetAkunRanap2 extends Model
{
    protected $table = 'set_akun_ranap2';

    public $timestamps = false;

    public $incrementing = false;

    protected $primaryKey = 'id';

    protected $fillable = [
        'Persediaan_Obat_Kamar_Operasi_Ranap',
        'Harian_Ranap',
        'Uang_Muka_Ranap',
        'Piutang_Pasien_Ranap',
        'Sisa_Uang_Muka_Ranap',
    ];
}
