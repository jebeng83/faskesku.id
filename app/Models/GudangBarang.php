<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class GudangBarang extends Model
{
    use HasFactory;

    protected $connection = 'fufufafa';
    protected $table = 'gudangbarang';
    protected $primaryKey = ['kode_brng', 'kd_bangsal', 'no_batch', 'no_faktur'];
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'kode_brng',
        'kd_bangsal',
        'stok',
        'no_batch',
        'no_faktur'
    ];

    protected $casts = [
        'stok' => 'double'
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
        if(!is_array($keys)){
            return parent::setKeysForSaveQuery($query);
        }

        foreach($keys as $keyName){
            $query->where($keyName, '=', $this->getKeyForSaveQuery($keyName));
        }

        return $query;
    }

    /**
     * Get the primary key value for a save query.
     *
     * @param mixed $keyName
     * @return mixed
     */
    protected function getKeyForSaveQuery($keyName = null)
    {
        if(is_null($keyName)){
            $keyName = $this->getKeyName();
        }

        if (isset($this->original[$keyName])) {
            return $this->original[$keyName];
        }

        return $this->getAttribute($keyName);
    }

    /**
     * Relasi ke DataBarang
     */
    public function dataBarang()
    {
        return $this->belongsTo(DataBarang::class, 'kode_brng', 'kode_brng');
    }

    /**
     * Update atau create stok gudang barang
     * 
     * @param string $kodeBarang
     * @param string $kdBangsal
     * @param string $noBatch
     * @param string $noFaktur
     * @param float $jumlah
     * @return bool
     */
    public static function updateOrCreateStok($kodeBarang, $kdBangsal, $noBatch, $noFaktur, $jumlah)
    {
        try {
            // Cari record yang sudah ada berdasarkan kode_brng, kd_bangsal, no_batch, no_faktur
            $gudangBarang = self::where('kode_brng', $kodeBarang)
                ->where('kd_bangsal', $kdBangsal)
                ->where('no_batch', $noBatch)
                ->where('no_faktur', $noFaktur)
                ->first();

            if ($gudangBarang) {
                // Jika sudah ada, tambahkan stok
                $gudangBarang->stok += $jumlah;
                $gudangBarang->save();
            } else {
                // Jika belum ada, buat record baru
                self::create([
                    'kode_brng' => $kodeBarang,
                    'kd_bangsal' => $kdBangsal,
                    'stok' => $jumlah,
                    'no_batch' => $noBatch,
                    'no_faktur' => $noFaktur
                ]);
            }

            return true;
        } catch (\Exception $e) {
            Log::error('Error updating gudang barang stok: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Get total stok untuk kode barang dan bangsal tertentu
     * 
     * @param string $kodeBarang
     * @param string $kdBangsal
     * @return float
     */
    public static function getTotalStok($kodeBarang, $kdBangsal)
    {
        return self::where('kode_brng', $kodeBarang)
            ->where('kd_bangsal', $kdBangsal)
            ->sum('stok');
    }
}