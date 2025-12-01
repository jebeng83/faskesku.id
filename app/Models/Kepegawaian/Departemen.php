<?php

namespace App\Models\Kepegawaian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Departemen extends Model
{
    protected $table = 'departemen';

    public $timestamps = false;

    protected $primaryKey = 'dep_id';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'dep_id',
        'nama',
    ];

    /**
     * Get the employees that belong to this department.
     */
    public function employees(): HasMany
    {
        return $this->hasMany(\App\Models\Employee::class, 'departemen', 'dep_id');
    }
}
