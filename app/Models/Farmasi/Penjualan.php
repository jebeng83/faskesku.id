<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class Penjualan extends Model
{
    protected $table = 'penjualan';

    protected $primaryKey = 'nota_jual';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = ['nota_jual', 'tgl_jual', 'nip', 'no_rkm_medis', 'nm_pasien', 'keterangan', 'jns_jual', 'ongkir', 'ppn', 'status', 'kd_bangsal', 'kode_akun_bayar', 'nama_bayar'];
}
