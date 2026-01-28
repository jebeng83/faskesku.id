<?php

namespace App\Models\AsuhanKeperawatan;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubKategoriSdki extends Model
{
    use HasFactory;

    protected $table = 'subkategori_sdki';

    protected $primaryKey = 'kd_subkategori';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'kd_kategori',
        'kd_subkategori',
        'nm_subkategori',
        'kode',
        'nama',
        'kategori',
    ];

    // Accessor untuk kompatibilitas - mengembalikan kolom lama sebagai alias kolom baru
    public function getKodeAttribute(): ?string
    {
        return $this->attributes['kd_subkategori'] ?? $this->attributes['kode'] ?? null;
    }

    public function getNamaAttribute(): ?string
    {
        return $this->attributes['nm_subkategori'] ?? $this->attributes['nama'] ?? null;
    }

    public function getKategoriAttribute(): ?string
    {
        return $this->attributes['kd_kategori'] ?? $this->attributes['kategori'] ?? null;
    }

    // Override toArray untuk memastikan kolom yang benar dikembalikan
    public function toArray(): array
    {
        $array = parent::toArray();
        // Jika kolom lama ada, tambahkan alias kolom baru
        if (isset($array['kd_subkategori']) && ! isset($array['kode'])) {
            $array['kode'] = $array['kd_subkategori'];
        }
        if (isset($array['nm_subkategori']) && ! isset($array['nama'])) {
            $array['nama'] = $array['nm_subkategori'];
        }
        if (isset($array['kd_kategori']) && ! isset($array['kategori'])) {
            $array['kategori'] = $array['kd_kategori'];
        }
        
        // Tambahkan nama kategori jika relasi dimuat
        if ($this->relationLoaded('kategoriSdki') && $this->kategoriSdki) {
            $array['kategori_nama'] = $this->kategoriSdki->nama ?? $this->kategoriSdki->nm_kategori ?? null;
            $array['kategori_kode'] = $this->kategoriSdki->kode ?? $this->kategoriSdki->kd_kategori ?? null;
        }

        return $array;
    }

    // Relationship dengan KategoriSdki
    public function kategoriSdki(): BelongsTo
    {
        return $this->belongsTo(KategoriSdki::class, 'kd_kategori', 'kd_kategori');
    }
}
