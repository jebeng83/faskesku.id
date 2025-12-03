<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Spesialis extends Model
{
    protected $table = 'spesialis';

    protected $primaryKey = 'kd_sps';

    public $timestamps = false;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['kd_sps', 'nm_sps'];

    public function dokter()
    {
        return $this->hasMany(Doctor::class, 'kd_sps', 'kd_sps');
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'kd_sps';
    }
}
