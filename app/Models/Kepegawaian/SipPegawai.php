<?php

namespace App\Models\Kepegawaian;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SipPegawai extends Model
{
    protected $table = 'sip_pegawai';

    public $timestamps = false;

    protected $primaryKey = 'nik';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'nik',
        'jnj_jabatan',
        'no_sip',
        'masa_berlaku',
        'status',
    ];

    protected $casts = [
        'masa_berlaku' => 'date',
    ];

    /**
     * Get the employee that owns the SIP.
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'nik', 'nik');
    }
}
