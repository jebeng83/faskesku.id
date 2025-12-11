<?php

namespace App\Models\Farmasi;

use Illuminate\Database\Eloquent\Model;

class ReturBeli extends Model
{
    protected $table = 'returbeli';

    protected $primaryKey = 'no_retur_beli';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = ['no_retur_beli', 'tgl_retur', 'nip', 'kode_suplier', 'kd_bangsal'];
}
