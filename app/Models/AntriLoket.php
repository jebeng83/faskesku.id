<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AntriLoket extends Model
{
    protected $table = 'antriloket';

    protected $fillable = [
        'nomor', 'prefix', 'tanggal', 'status', 'asal', 'loket', 'kode_tiket',
        'dibuat_oleh', 'dicetak_pada', 'dipanggil_pada', 'dibatalkan_pada'
    ];

    public const STATUS_BARU = 'baru';
    public const STATUS_DICETAK = 'dicetak';
    public const STATUS_DIPANGGIL = 'dipanggil';
    public const STATUS_BATAL = 'batal';

    protected $casts = [
        'tanggal' => 'date',
        'dicetak_pada' => 'datetime',
        'dipanggil_pada' => 'datetime',
        'dibatalkan_pada' => 'datetime',
    ];

    public function markCalled(int $loket = 0): void
    {
        $this->status = self::STATUS_DIPANGGIL;
        $this->loket = $loket;
        $this->dipanggil_pada = now();
        $this->save();
    }
}

