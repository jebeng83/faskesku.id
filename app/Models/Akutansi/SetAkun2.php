<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;

/**
 * Model wrapper untuk tabel `set_akun2` (COA tambahan/lanjutan).
 * Tabel ini juga 1 baris tanpa primary key.
 */
class SetAkun2 extends Model
{
    protected $table = 'set_akun2';
    public $timestamps = false;
    public $incrementing = false;
    protected $primaryKey = 'id'; // placeholder

    protected $fillable = [
        'Penerimaan_Dapur',
        'Kontra_Penerimaan_Dapur',
        'Bayar_Pemesanan_Dapur',
        'Retur_Beli_Dapur',
        'Kontra_Retur_Beli_Dapur',
        'Hibah_Dapur',
        'Kontra_Hibah_Dapur',
        'Piutang_Jasa_Perusahaan',
        'Pendapatan_Piutang_Jasa_Perusahaan',
    ];
}