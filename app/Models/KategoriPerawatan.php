<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriPerawatan extends Model
{
    use HasFactory;

    protected $table = 'kategori_perawatan';

    protected $primaryKey = 'kd_kategori';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'kd_kategori',
        'nm_kategori',
    ];

    // Relasi dengan jns_perawatan
    public function jnsPerawatan()
    {
        return $this->hasMany(JnsPerawatan::class, 'kd_kategori', 'kd_kategori');
    }

    // Relasi dengan jns_perawatan_inap
    public function jnsPerawatanInap()
    {
        return $this->hasMany(JnsPerawatanInap::class, 'kd_kategori', 'kd_kategori');
    }
}
