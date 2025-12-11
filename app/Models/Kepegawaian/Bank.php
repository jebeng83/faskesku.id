<?php

namespace App\Models\Kepegawaian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bank extends Model
{
    protected $table = 'bank';

    public $timestamps = false;

    protected $primaryKey = 'namabank';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'namabank',
    ];

    /**
     * Get the employees that have this bank.
     */
    public function employees(): HasMany
    {
        return $this->hasMany(\App\Models\Employee::class, 'bpd', 'namabank');
    }
}
