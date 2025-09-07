<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bangsal extends Model
{
    use HasFactory;

    protected $connection = 'fufufafa';
    protected $table = 'bangsal';
    protected $primaryKey = 'kd_bangsal';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'kd_bangsal',
        'nm_bangsal',
        'status'
    ];

    /**
     * Relasi ke Opname
     */
    public function opnames()
    {
        return $this->hasMany(Opname::class, 'kd_bangsal', 'kd_bangsal');
    }

    /**
     * Relasi ke GudangBarang
     */
    public function gudangBarang()
    {
        return $this->hasMany(GudangBarang::class, 'kd_bangsal', 'kd_bangsal');
    }

    /**
     * Scope untuk bangsal aktif
     */
    public function scopeAktif($query)
    {
        return $query->where('status', '1');
    }
}