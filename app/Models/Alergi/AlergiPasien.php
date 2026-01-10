<?php

namespace App\Models\Alergi;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AlergiPasien extends Model
{
    protected $table = 'alergi_pasien';

    protected $primaryKey = ['no_rkm_medis', 'kd_alergi'];

    public $incrementing = false;

    public $timestamps = false;

    protected $fillable = [
        'no_rkm_medis',
        'kode_jenis',
        'kd_alergi',
    ];

    protected $casts = [
        'kode_jenis' => 'integer',
    ];

    /**
     * Set the keys for a save update query.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function setKeysForSaveQuery($query)
    {
        $keys = $this->getKeyName();
        if (! is_array($keys)) {
            return parent::setKeysForSaveQuery($query);
        }

        foreach ($keys as $keyName) {
            $query->where($keyName, '=', $this->getKeyForSaveQuery($keyName));
        }

        return $query;
    }

    /**
     * Get the primary key value for a save query.
     *
     * @param  mixed  $keyName
     * @return mixed
     */
    protected function getKeyForSaveQuery($keyName = null)
    {
        if ($keyName === null) {
            $keyName = $this->getKeyName();
        }

        if (isset($this->original[$keyName])) {
            return $this->original[$keyName];
        }

        return $this->getAttribute($keyName);
    }

    /**
     * Relasi ke model Patient
     */
    public function pasien(): BelongsTo
    {
        return $this->belongsTo(Patient::class, 'no_rkm_medis', 'no_rkm_medis');
    }

    /**
     * Relasi ke model DataAlergi
     */
    public function dataAlergi(): BelongsTo
    {
        return $this->belongsTo(DataAlergi::class, 'kd_alergi', 'kd_alergi');
    }

    /**
     * Relasi ke model JenisAlergi melalui DataAlergi
     */
    public function jenisAlergi(): BelongsTo
    {
        return $this->belongsTo(JenisAlergi::class, 'kode_jenis', 'kode_jenis');
    }
}
