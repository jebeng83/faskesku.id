<?php

namespace App\Models\Kepegawaian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KelompokJabatan extends Model
{
    protected $table = 'kelompok_jabatan';

    public $timestamps = false;

    protected $primaryKey = 'kode_kelompok';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'kode_kelompok',
        'nama_kelompok',
        'indek',
    ];

    protected $casts = [
        'indek' => 'integer',
    ];

    /**
     * Get the employees that have this job group.
     */
    public function employees(): HasMany
    {
        return $this->hasMany(\App\Models\Employee::class, 'kode_kelompok', 'kode_kelompok');
    }
}
