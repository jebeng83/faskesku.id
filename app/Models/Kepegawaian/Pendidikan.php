<?php

namespace App\Models\Kepegawaian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pendidikan extends Model
{
    protected $table = 'pendidikan';

    public $timestamps = false;

    protected $primaryKey = 'tingkat';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'tingkat',
        'indek',
        'gapok1',
        'kenaikan',
        'maksimal',
    ];

    protected $casts = [
        'indek' => 'integer',
        'gapok1' => 'double',
        'kenaikan' => 'double',
        'maksimal' => 'integer',
    ];

    /**
     * Get the employees that have this education level.
     */
    public function employees(): HasMany
    {
        return $this->hasMany(\App\Models\Employee::class, 'pendidikan', 'tingkat');
    }
}
