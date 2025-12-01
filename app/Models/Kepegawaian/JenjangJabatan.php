<?php

namespace App\Models\Kepegawaian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JenjangJabatan extends Model
{
    protected $table = 'jnj_jabatan';

    public $timestamps = false;

    protected $primaryKey = 'kode';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'kode',
        'nama',
        'tnj',
        'indek',
    ];

    protected $casts = [
        'tnj' => 'double',
        'indek' => 'integer',
    ];

    /**
     * Get the employees that have this job level.
     */
    public function employees(): HasMany
    {
        return $this->hasMany(\App\Models\Employee::class, 'jnj_jabatan', 'kode');
    }
}
