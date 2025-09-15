<?php

namespace App\Models;

<<<<<<< HEAD
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
=======
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
>>>>>>> kohsun

class Penjab extends Model
{
    use HasFactory;

    protected $table = 'penjab';
    protected $primaryKey = 'kd_pj';
    public $incrementing = false;
<<<<<<< HEAD
=======
    protected $keyType = 'string';
>>>>>>> kohsun
    public $timestamps = false;

    protected $fillable = [
        'kd_pj',
        'png_jawab',
        'nama_perusahaan',
<<<<<<< HEAD
        'alamat_perusahaan',
=======
        'alamat_asuransi',
>>>>>>> kohsun
        'no_telp',
        'attn',
        'status'
    ];

<<<<<<< HEAD
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->setRawAttributes([
            'kd_pj' => '',
            'png_jawab' => '',
            'nama_perusahaan' => '',
            'alamat_perusahaan' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '1',
        ], true);
    }
}
=======
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
>>>>>>> kohsun
