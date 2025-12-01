<?php

namespace App\Models\Kepegawaian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bidang extends Model
{
    protected $table = 'bidang';

    public $timestamps = false;

    protected $primaryKey = 'nama';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'nama',
    ];

    /**
     * Get the employees that belong to this bidang.
     */
    public function employees(): HasMany
    {
        return $this->hasMany(\App\Models\Employee::class, 'bidang', 'nama');
    }
}
