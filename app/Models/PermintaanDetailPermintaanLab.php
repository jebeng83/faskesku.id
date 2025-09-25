<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermintaanDetailPermintaanLab extends Model
{
    use HasFactory;

    protected $table = 'permintaan_detail_permintaan_lab';
    
    // Composite primary key
    protected $primaryKey = ['noorder', 'kd_jenis_prw', 'id_template'];
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'noorder',
        'kd_jenis_prw',
        'id_template',
        'stts_bayar'
    ];

    protected $casts = [
        'stts_bayar' => 'string'
    ];

    /**
     * Override getKeyName for composite primary key
     */
    public function getKeyName()
    {
        return $this->primaryKey;
    }

    /**
     * Override getKey for composite primary key
     */
    public function getKey()
    {
        $key = [];
        if (is_array($this->primaryKey)) {
            foreach ($this->primaryKey as $keyName) {
                $key[$keyName] = $this->getAttribute($keyName);
            }
        } else {
            $key = $this->getAttribute($this->primaryKey);
        }
        return $key;
    }

    /**
     * Override setKeysForSaveQuery for composite primary key
     */
    protected function setKeysForSaveQuery($query)
    {
        if (is_array($this->primaryKey)) {
            foreach ($this->primaryKey as $keyName) {
                $query->where($keyName, $this->getAttribute($keyName));
            }
        } else {
            $query->where($this->primaryKey, $this->getAttribute($this->primaryKey));
        }
        return $query;
    }

    /**
     * Relasi ke PermintaanLab
     */
    public function permintaanLab()
    {
        return $this->belongsTo(PermintaanLab::class, 'noorder', 'noorder');
    }

    /**
     * Relasi ke JnsPerawatanLab
     */
    public function jnsPerawatanLab()
    {
        return $this->belongsTo(JnsPerawatanLab::class, 'kd_jenis_prw', 'kd_jenis_prw');
    }

    /**
     * Alias untuk relasi ke JnsPerawatanLab
     */
    public function jenisPerawatan()
    {
        return $this->belongsTo(JnsPerawatanLab::class, 'kd_jenis_prw', 'kd_jenis_prw');
    }

    /**
     * Relasi ke TemplateLaboratorium
     */
    public function templateLaboratorium()
    {
        return $this->belongsTo(TemplateLaboratorium::class, 'id_template', 'id_template');
    }

    /**
     * Scope untuk filter berdasarkan status bayar
     */
    public function scopeByStatusBayar($query, $status)
    {
        return $query->where('stts_bayar', $status);
    }

    /**
     * Scope untuk filter berdasarkan noorder
     */
    public function scopeByNoOrder($query, $noorder)
    {
        return $query->where('noorder', $noorder);
    }

    /**
     * Scope untuk filter berdasarkan jenis perawatan
     */
    public function scopeByJenisPerawatan($query, $kdJenisPrw)
    {
        return $query->where('kd_jenis_prw', $kdJenisPrw);
    }

    /**
     * Get total biaya untuk detail permintaan ini
     */
    public function getTotalBiayaAttribute()
    {
        if ($this->templateLaboratorium) {
            return $this->templateLaboratorium->biaya_item;
        }
        
        if ($this->jnsPerawatanLab) {
            return $this->jnsPerawatanLab->total_byr;
        }
        
        return 0;
    }

    /**
     * Get nama pemeriksaan
     */
    public function getNamaPemeriksaanAttribute()
    {
        if ($this->templateLaboratorium) {
            return $this->templateLaboratorium->Pemeriksaan;
        }
        
        if ($this->jnsPerawatanLab) {
            return $this->jnsPerawatanLab->nm_perawatan;
        }
        
        return 'N/A';
    }

    /**
     * Check if sudah bayar
     */
    public function isSudahBayar()
    {
        return $this->stts_bayar === 'Sudah';
    }

    /**
     * Check if belum bayar
     */
    public function isBelumBayar()
    {
        return $this->stts_bayar === 'Belum' || is_null($this->stts_bayar);
    }
}