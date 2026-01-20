<?php

namespace App\Models\AsuhanKeperawatan;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriSdki extends Model
{
    use HasFactory;

    protected $table = 'kategori_sdki';

    protected $primaryKey = 'kd_kategori';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'kd_kategori',
        'nm_kategori',
        'kode',
        'nama',
        'label',
        'slug',
        'kategori',
    ];

    // Accessor untuk kompatibilitas - mengembalikan kolom lama sebagai alias kolom baru
    public function getKodeAttribute(): ?string
    {
        return $this->attributes['kd_kategori'] ?? $this->attributes['kode'] ?? null;
    }

    public function getNamaAttribute(): ?string
    {
        return $this->attributes['nm_kategori'] ?? $this->attributes['nama'] ?? null;
    }

    // Override toArray untuk memastikan kolom yang benar dikembalikan
    public function toArray(): array
    {
        $array = parent::toArray();
        // Jika kolom lama ada, tambahkan alias kolom baru
        if (isset($array['kd_kategori']) && !isset($array['kode'])) {
            $array['kode'] = $array['kd_kategori'];
        }
        if (isset($array['nm_kategori']) && !isset($array['nama'])) {
            $array['nama'] = $array['nm_kategori'];
        }
        return $array;
    }
}

