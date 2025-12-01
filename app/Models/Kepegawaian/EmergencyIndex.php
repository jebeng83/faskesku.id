<?php

namespace App\Models\Kepegawaian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EmergencyIndex extends Model
{
    protected $table = 'emergency_index';

    public $timestamps = false;

    protected $primaryKey = 'kode_emergency';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'kode_emergency',
        'nama_emergency',
        'indek',
    ];

    protected $casts = [
        'indek' => 'integer',
    ];

    /**
     * Get the employees that have this emergency index.
     */
    public function employees(): HasMany
    {
        return $this->hasMany(\App\Models\Employee::class, 'kode_emergency', 'kode_emergency');
    }
}
