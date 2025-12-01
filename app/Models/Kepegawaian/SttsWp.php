<?php

namespace App\Models\Kepegawaian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SttsWp extends Model
{
    protected $table = 'stts_wp';

    public $timestamps = false;

    protected $primaryKey = 'stts';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'stts',
        'ktg',
    ];

    /**
     * Get the employees that have this WP status.
     */
    public function employees(): HasMany
    {
        return $this->hasMany(\App\Models\Employee::class, 'stts_wp', 'stts');
    }
}
