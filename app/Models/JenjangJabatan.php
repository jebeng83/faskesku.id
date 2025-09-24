<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenjangJabatan extends Model
{
    use HasFactory;

    protected $table = 'jnj_jabatan';
    protected $primaryKey = 'kode';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = true;

    protected $fillable = [
        'kode',
        'nama',
        'tnj',
        'indek',
        'gapok1',
        'gapok2',
        'gapok3',
        'gapok4',
        'gapok5',
        'gapok6',
        'gapok7',
        'gapok8',
        'gapok9',
        'gapok10',
        'gapok11',
        'gapok12',
        'gapok13',
        'gapok14',
        'gapok15',
        'gapok16',
        'gapok17'
    ];

    protected $casts = [
        'tnj' => 'decimal:2',
        'indek' => 'integer',
        'gapok1' => 'decimal:2',
        'gapok2' => 'decimal:2',
        'gapok3' => 'decimal:2',
        'gapok4' => 'decimal:2',
        'gapok5' => 'decimal:2',
        'gapok6' => 'decimal:2',
        'gapok7' => 'decimal:2',
        'gapok8' => 'decimal:2',
        'gapok9' => 'decimal:2',
        'gapok10' => 'decimal:2',
        'gapok11' => 'decimal:2',
        'gapok12' => 'decimal:2',
        'gapok13' => 'decimal:2',
        'gapok14' => 'decimal:2',
        'gapok15' => 'decimal:2',
        'gapok16' => 'decimal:2',
        'gapok17' => 'decimal:2'
    ];

    /**
     * Relasi dengan pegawai
     */
    public function pegawai()
    {
        return $this->hasMany(Employee::class, 'jnj_jabatan', 'kode');
    }

    /**
     * Accessor untuk nama lengkap jenjang jabatan
     */
    public function getNamaLengkapAttribute()
    {
        return $this->kode . ' - ' . $this->nama;
    }

    /**
     * Get gaji pokok berdasarkan masa kerja
     */
    public function getGajiPokok($masaKerja)
    {
        $gapokField = 'gapok' . min(17, max(1, $masaKerja));
        return $this->$gapokField ?? 0;
    }
}