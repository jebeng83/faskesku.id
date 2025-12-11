<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class PengeluaranObatBhp extends Model
{
    protected $table = 'pengeluaran_obat_bhp';

    protected $primaryKey = 'no_keluar';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = ['no_keluar', 'tanggal', 'nip', 'keterangan', 'kd_bangsal'];
}
