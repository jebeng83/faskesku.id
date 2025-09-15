<?php

namespace App\Models\RawatJalan;

use Illuminate\Database\Eloquent\Model;
use App\Models\RawatJalan\Gudangbarang;

class Databarang extends Model
{
    protected $table = 'databarang';
    protected $primaryKey = 'kode_brng';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'kode_brng',
        'nama_brng',
        'kode_satbesar',
        'kode_sat',
        'letak_barang',
        'dasar',
        'h_beli',
        'ralan',
        'kelas1',
        'kelas2',
        'kelas3',
        'utama',
        'vip',
        'vvip',
        'beliluar',
        'jualbebas',
        'karyawan',
        'stokminimal',
        'kdjns',
        'isi',
        'kapasitas',
        'expire',
        'status',
        'kode_industri',
        'kode_kategori',
        'kode_golongan'
    ];

    protected $casts = [
        'dasar' => 'float',
        'h_beli' => 'float',
        'ralan' => 'float',
        'kelas1' => 'float',
        'kelas2' => 'float',
        'kelas3' => 'float',
        'utama' => 'float',
        'vip' => 'float',
        'vvip' => 'float',
        'beliluar' => 'float',
        'jualbebas' => 'float',
        'karyawan' => 'float',
        'stokminimal' => 'float',
        'isi' => 'float',
        'kapasitas' => 'float',
        'expire' => 'date'
    ];

    // Relasi ke gudang barang
    public function gudangBarang()
    {
        return $this->hasMany(Gudangbarang::class, 'kode_brng', 'kode_brng');
    }

    // Scope untuk barang aktif
    public function scopeActive($query)
    {
        return $query->where('status', '1');
    }

    // Scope untuk pencarian nama barang
    public function scopeSearch($query, $search)
    {
        return $query->where('nama_brng', 'like', '%' . $search . '%')
                    ->orWhere('kode_brng', 'like', '%' . $search . '%');
    }

    // Method untuk mendapatkan total stok berdasarkan bangsal
    public function getTotalStokByBangsal($kdBangsal)
    {
        return $this->gudangBarang()
                   ->where('kd_bangsal', $kdBangsal)
                   ->sum('stok');
    }
}