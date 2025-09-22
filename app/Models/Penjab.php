<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penjab extends Model
{
    use HasFactory;

    protected $table = 'penjab';
    protected $primaryKey = 'kd_pj';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'kd_pj',
        'png_jawab',
        'nama_perusahaan',
        'alamat_asuransi',
        'no_telp',
        'attn',
        'status'
    ];

    protected $casts = [
        'status' => 'string'
    ];

    /**
     * Scope untuk penjab aktif
     */
    public function scopeAktif($query)
    {
        return $query->where('status', '1');
    }

    /**
     * Accessor untuk nama lengkap penjab
     */
    public function getNamaLengkapAttribute()
    {
        return $this->kd_pj . ' - ' . $this->png_jawab;
    }
}
