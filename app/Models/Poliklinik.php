<?php

namespace App\Models;

use App\Models\RawatJalan\RawatJalan;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Poliklinik extends Model
{
    use HasFactory;

    protected $table = 'poliklinik';

    protected $primaryKey = 'kd_poli';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'kd_poli',
        'nm_poli',
        'registrasi',
        'registrasilama',
        'status',
    ];

    protected $casts = [
        'registrasi' => 'double',
        'registrasilama' => 'double',
        'status' => 'string',
    ];

    // Scope untuk poliklinik aktif
    public function scopeAktif($query)
    {
        return $query->where('status', '1');
    }

    // Relasi dengan RawatJalan
    public function rawatJalan()
    {
        return $this->hasMany(RawatJalan::class, 'kd_poli', 'kd_poli');
    }
}
