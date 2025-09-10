<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Penjab extends Model
{
    use HasFactory;

    protected $table = 'penjab';
    protected $primaryKey = 'kd_pj';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'kd_pj',
        'png_jawab',
        'nama_perusahaan',
        'alamat_perusahaan',
        'no_telp',
        'attn',
        'status'
    ];

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
