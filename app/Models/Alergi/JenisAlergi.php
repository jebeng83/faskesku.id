<?php

namespace App\Models\Alergi;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisAlergi extends Model
{
    use HasFactory;

    protected $table = 'jenis_alergi';

    protected $primaryKey = 'kode_jenis';

    public $incrementing = true;

    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'kode_jenis',
        'nama_jenis',
    ];

    protected $casts = [
        'kode_jenis' => 'integer',
    ];

    public function data()
    {
        return $this->hasMany(DataAlergi::class, 'kode_jenis', 'kode_jenis');
    }
}
