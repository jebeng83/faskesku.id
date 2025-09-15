<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SetLokasi extends Model
{
    protected $table = 'set_lokasi';
    protected $primaryKey = 'kd_bangsal';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'kd_bangsal',
        'asal_stok'
    ];

    // Relasi ke bangsal (jika ada model Bangsal)
    public function bangsal()
    {
        return $this->belongsTo(Bangsal::class, 'kd_bangsal', 'kd_bangsal');
    }

    // Method untuk mendapatkan semua bangsal
    public static function getAllBangsal()
    {
        return static::pluck('kd_bangsal');
    }

    // Method untuk mendapatkan bangsal pertama
    public static function getFirstBangsal()
    {
        return static::value('kd_bangsal');
    }
}