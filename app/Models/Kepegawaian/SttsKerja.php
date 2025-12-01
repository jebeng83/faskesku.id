<?php

namespace App\Models\Kepegawaian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SttsKerja extends Model
{
    protected $table = 'stts_kerja';

    public $timestamps = false;

    protected $primaryKey = 'stts';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'stts',
        'ktg',
        'indek',
        'hakcuti',
    ];

    protected $casts = [
        'indek' => 'integer',
        'hakcuti' => 'integer',
    ];

    /**
     * Get the employees that have this work status.
     */
    public function employees(): HasMany
    {
        return $this->hasMany(\App\Models\Employee::class, 'stts_kerja', 'stts');
    }
}
