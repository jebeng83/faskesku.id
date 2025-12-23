<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wilayah extends Model
{
    protected $table = 'wilayah';

    protected $primaryKey = 'kode';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = true;

    protected $fillable = [
        'kode',
        'nama',
    ];

    /**
     * Get provinces (level 1 - 2 digits)
     */
    public static function getProvinces()
    {
        return self::whereRaw('LENGTH(kode) = 2')
            ->orderBy('nama')
            ->get();
    }

    /**
     * Get regencies by province code (level 2 - 4 digits)
     */
    public static function getRegencies($provinceCode)
    {
        return self::where('kode', 'LIKE', $provinceCode.'.%')
            ->whereRaw('LENGTH(kode) = 5')
            ->orderBy('nama')
            ->get();
    }

    /**
     * Get districts by regency code (level 3 - 7 digits)
     */
    public static function getDistricts($regencyCode)
    {
        return self::where('kode', 'LIKE', $regencyCode.'.%')
            ->whereRaw('LENGTH(kode) = 8')
            ->orderBy('nama')
            ->get();
    }

    /**
     * Get villages by district code (level 4 - 13 digits)
     */
    public static function getVillages($districtCode)
    {
        return self::where('kode', 'LIKE', $districtCode.'.%')
            ->whereRaw('LENGTH(kode) = 13')
            ->orderBy('nama')
            ->get();
    }

    /**
     * Get all villages with optional filter
     */
    public static function getAllVillages($filter = null, $limit = 100)
    {
        $query = self::whereRaw('LENGTH(kode) = 13')
            ->orderBy('nama');

        if ($filter) {
            $like = '%'.$filter.'%';
            $query->where(function ($q) use ($like) {
                $q->where('nama', 'LIKE', $like)
                  ->orWhereRaw("EXISTS (SELECT 1 FROM wilayah d WHERE LENGTH(d.kode) = 8 AND d.kode = SUBSTR(wilayah.kode, 1, 8) AND d.nama LIKE ?)", [$like])
                  ->orWhereRaw("EXISTS (SELECT 1 FROM wilayah r WHERE LENGTH(r.kode) = 5 AND r.kode = SUBSTR(wilayah.kode, 1, 5) AND r.nama LIKE ?)", [$like])
                  ->orWhereRaw("EXISTS (SELECT 1 FROM wilayah p WHERE LENGTH(p.kode) = 2 AND p.kode = SUBSTR(wilayah.kode, 1, 2) AND p.nama LIKE ?)", [$like]);
            });
        }

        return $query->limit($limit)->get();
    }

    /**
     * Search wilayah by name
     */
    public static function searchByName($name, $level = null)
    {
        $query = self::query();

        // If name is provided, search by name
        if ($name) {
            $query->where('nama', 'LIKE', '%'.$name.'%');
        }

        if ($level) {
            switch ($level) {
                case 'province':
                    $query->whereRaw('LENGTH(kode) = 2');
                    break;
                case 'regency':
                    $query->whereRaw('LENGTH(kode) = 5');
                    break;
                case 'district':
                    $query->whereRaw('LENGTH(kode) = 8');
                    break;
                case 'village':
                    $query->whereRaw('LENGTH(kode) = 13');
                    break;
            }
        }

        return $query->orderBy('nama')->limit(100)->get(); // Limit to 100 results for performance
    }

    /**
     * Get wilayah by code
     */
    public static function getByCode($code)
    {
        return self::where('kode', $code)->first();
    }

    /**
     * Get parent wilayah
     */
    public function getParent()
    {
        $codeLength = strlen($this->kode);

        if ($codeLength == 2) {
            return null; // Province has no parent
        } elseif ($codeLength == 5) {
            // Regency -> Province
            $provinceCode = substr($this->kode, 0, 2);

            return self::where('kode', $provinceCode)->first();
        } elseif ($codeLength == 8) {
            // District -> Regency
            $regencyCode = substr($this->kode, 0, 5);

            return self::where('kode', $regencyCode)->first();
        } elseif ($codeLength == 13) {
            // Village -> District
            $districtCode = substr($this->kode, 0, 8);

            return self::where('kode', $districtCode)->first();
        }

        return null;
    }

    /**
     * Get children wilayah
     */
    public function getChildren()
    {
        $codeLength = strlen($this->kode);

        if ($codeLength == 2) {
            // Province -> Regencies
            return self::getRegencies($this->kode);
        } elseif ($codeLength == 5) {
            // Regency -> Districts
            return self::getDistricts($this->kode);
        } elseif ($codeLength == 8) {
            // District -> Villages
            return self::getVillages($this->kode);
        }

        return collect();
    }

    /**
     * Get full address path
     */
    public function getFullAddress()
    {
        $path = [];
        $current = $this;

        while ($current) {
            array_unshift($path, $current->nama);
            $current = $current->getParent();
        }

        return implode(', ', $path);
    }

    /**
     * Get level name
     */
    public function getLevelName()
    {
        $codeLength = strlen($this->kode);

        switch ($codeLength) {
            case 2:
                return 'Provinsi';
            case 5:
                return 'Kabupaten/Kota';
            case 8:
                return 'Kecamatan';
            case 13:
                return 'Kelurahan/Desa';
            default:
                return 'Wilayah';
        }
    }

    /**
     * Check if is province
     */
    public function isProvince()
    {
        return strlen($this->kode) == 2;
    }

    /**
     * Check if is regency
     */
    public function isRegency()
    {
        return strlen($this->kode) == 5;
    }

    /**
     * Check if is district
     */
    public function isDistrict()
    {
        return strlen($this->kode) == 8;
    }

    /**
     * Check if is village
     */
    public function isVillage()
    {
        return strlen($this->kode) == 13;
    }

    /**
     * Get full address details for a village
     */
    public function getFullAddressDetails()
    {
        if (! $this->isVillage()) {
            return null;
        }

        $villageCode = $this->kode;
        $districtCode = substr($villageCode, 0, 8);
        $regencyCode = substr($villageCode, 0, 5);
        $provinceCode = substr($villageCode, 0, 2);

        $district = self::where('kode', $districtCode)->first();
        $regency = self::where('kode', $regencyCode)->first();
        $province = self::where('kode', $provinceCode)->first();

        return [
            'village' => $this->nama,
            'district' => $district ? $district->nama : '',
            'regency' => $regency ? $regency->nama : '',
            'province' => $province ? $province->nama : '',
        ];
    }
}
