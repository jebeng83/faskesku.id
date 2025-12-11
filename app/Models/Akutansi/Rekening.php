<?php

namespace App\Models\Akutansi;

use Illuminate\Database\Eloquent\Model;

class Rekening extends Model
{
    protected $table = 'rekening';

    protected $primaryKey = 'kd_rek';

    public $incrementing = false;

    public $timestamps = false;

    protected $fillable = [
        'kd_rek',
        'nm_rek',
        'tipe',
        'balance',
        'level',
    ];

    public function detailJurnals()
    {
        return $this->hasMany(DetailJurnal::class, 'kd_rek', 'kd_rek');
    }

    /**
     * Anak/sub-akun dari akun ini.
     * Menggunakan tabel pivot subrekening (kd_rek -> kd_rek2).
     */
    public function children()
    {
        return $this->belongsToMany(self::class, 'subrekening', 'kd_rek', 'kd_rek2');
    }

    /**
     * Induk/parent dari akun ini (jika level = '1').
     */
    public function induk()
    {
        return $this->belongsToMany(self::class, 'subrekening', 'kd_rek2', 'kd_rek');
    }

    /** Scope akun induk (level = '0') */
    public function scopeInduk($query)
    {
        return $query->where('level', '0');
    }

    /** Scope akun sub (level = '1') */
    public function scopeSub($query)
    {
        return $query->where('level', '1');
    }
}
