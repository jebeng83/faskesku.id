<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $table = 'setting';
    protected $primaryKey = 'nama_instansi';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'nama_instansi',
        'alamat_instansi',
        'kabupaten',
        'propinsi',
        'kontak',
        'email',
        'aktifkan',
        'kode_ppk',
        'kode_ppkinhealth',
        'kode_ppkkemenkes',
        'wallpaper',
        'logo'
    ];

    protected $casts = [
        'aktifkan' => 'string',
    ];

    // Hide binary data from JSON serialization to prevent UTF-8 encoding issues
    protected $hidden = [
        'wallpaper',
        'logo'
    ];

    // Append attributes to JSON
    protected $appends = [
        'has_logo',
        'has_wallpaper'
    ];

    // Accessor untuk mengetahui apakah logo ada
    public function getHasLogoAttribute()
    {
        return !empty($this->logo);
    }

    // Accessor untuk mengetahui apakah wallpaper ada
    public function getHasWallpaperAttribute()
    {
        return !empty($this->wallpaper);
    }



    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'nama_instansi';
    }

    // Accessor untuk format data
    public function getNamaInstansiFormattedAttribute()
    {
        return $this->nama_instansi ?? 'Belum diatur';
    }

    public function getAlamatInstansiFormattedAttribute()
    {
        return $this->alamat_instansi ?? 'Belum diatur';
    }

    public function getKontakFormattedAttribute()
    {
        return $this->kontak ?? 'Belum diatur';
    }

    public function getEmailFormattedAttribute()
    {
        return $this->email ?? 'Belum diatur';
    }

    public function getStatusAktifAttribute()
    {
        return $this->aktifkan === 'Yes' ? 'Aktif' : 'Tidak Aktif';
    }

    public function getStatusAktifColorAttribute()
    {
        return $this->aktifkan === 'Yes' ? 'green' : 'red';
    }

    // Scope untuk pencarian
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('nama_instansi', 'like', "%{$search}%")
              ->orWhere('alamat_instansi', 'like', "%{$search}%")
              ->orWhere('kabupaten', 'like', "%{$search}%")
              ->orWhere('propinsi', 'like', "%{$search}%")
              ->orWhere('kontak', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
        });
    }

    // Method untuk mendapatkan setting aktif
    public static function getActiveSetting()
    {
        return self::where('aktifkan', 'Yes')->first();
    }

    // Method untuk mengaktifkan setting
    public function activate()
    {
        // Nonaktifkan semua setting terlebih dahulu
        self::where('aktifkan', 'Yes')->update(['aktifkan' => 'No']);
        
        // Aktifkan setting ini
        $this->update(['aktifkan' => 'Yes']);
    }
}
