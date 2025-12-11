<?php

namespace App\Models\Kepegawaian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ResikoKerja extends Model
{
    protected $table = 'resiko_kerja';

    public $timestamps = false;

    protected $primaryKey = 'kode_resiko';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'kode_resiko',
        'nama_resiko',
        'indek',
    ];

    protected $casts = [
        'indek' => 'integer',
    ];

    /**
     * Get the employees that have this work risk.
     */
    public function employees(): HasMany
    {
        return $this->hasMany(\App\Models\Employee::class, 'kode_resiko', 'kode_resiko');
    }
}
