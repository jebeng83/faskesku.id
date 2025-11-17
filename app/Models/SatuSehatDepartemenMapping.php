<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SatuSehatDepartemenMapping extends Model
{
    protected $table = 'satu_sehat_mapping_departemen';

    protected $primaryKey = 'dep_id';

    public $incrementing = false;

    protected $keyType = 'string';

    // Nonaktifkan timestamps karena tabel tidak memiliki kolom created_at/updated_at
    public $timestamps = false;

    protected $fillable = [
        'dep_id',
        'id_organisasi_satusehat',
    ];
}
