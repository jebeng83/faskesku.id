# Sistem Wilayah Indonesia Documentation

## Overview

Sistem Wilayah Indonesia adalah sistem pencarian wilayah yang menggunakan data standar Indonesia dengan struktur hierarkis: Provinsi → Kabupaten/Kota → Kecamatan → Kelurahan/Desa. Sistem ini dirancang untuk memberikan pengalaman pencarian yang cepat dan akurat.

## Features

### 🔍 **Advanced Search**

- **Real-time Search**: Pencarian real-time dengan delay 300ms
- **Hierarchical Search**: Pencarian berdasarkan level wilayah
- **Full Address Display**: Menampilkan alamat lengkap dalam hasil pencarian
- **Fuzzy Search**: Pencarian yang toleran terhadap kesalahan pengetikan

### 🏗️ **Database Structure**

- **Tabel `wilayah`**: Menyimpan semua data wilayah Indonesia
- **Primary Key**: `kode` (string, 13 karakter)
- **Hierarchical Codes**:
  - Provinsi: 2 digit (contoh: `11`)
  - Kabupaten/Kota: 5 digit (contoh: `11.01`)
  - Kecamatan: 8 digit (contoh: `11.01.01`)
  - Kelurahan/Desa: 13 digit (contoh: `11.01.01.2001`)

### 🎯 **API Endpoints**

#### **Get Provinces**

```http
GET /api/wilayah/provinces
```

**Response:**

```json
{
	"success": true,
	"data": [
		{
			"code": "11",
			"name": "Aceh"
		},
		{
			"code": "31",
			"name": "DKI Jakarta"
		}
	]
}
```

#### **Get Regencies by Province**

```http
GET /api/wilayah/regencies/{provinceCode}
```

**Response:**

```json
{
	"success": true,
	"data": [
		{
			"code": "31.01",
			"name": "Kepulauan Seribu"
		},
		{
			"code": "31.02",
			"name": "Jakarta Selatan"
		}
	]
}
```

#### **Get Districts by Regency**

```http
GET /api/wilayah/districts/{regencyCode}
```

**Response:**

```json
{
	"success": true,
	"data": [
		{
			"code": "31.02.01",
			"name": "Kebayoran Baru"
		},
		{
			"code": "31.02.02",
			"name": "Kebayoran Lama"
		}
	]
}
```

#### **Get Villages by District**

```http
GET /api/wilayah/villages/{districtCode}
```

**Response:**

```json
{
	"success": true,
	"data": [
		{
			"code": "31.02.01.1001",
			"name": "Kramat Pela"
		},
		{
			"code": "31.02.01.1002",
			"name": "Gandaria Selatan"
		}
	]
}
```

#### **Search Wilayah**

```http
GET /api/wilayah/search?q={query}&level={level}
```

**Parameters:**

- `q`: Search query (required)
- `level`: Level filter (optional) - `province`, `regency`, `district`, `village`

**Response:**

```json
{
	"success": true,
	"data": [
		{
			"code": "31.02.01.1001",
			"name": "Kramat Pela",
			"level": "Kelurahan/Desa",
			"full_address": "Kramat Pela, Kebayoran Baru, Jakarta Selatan, DKI Jakarta"
		}
	]
}
```

#### **Get Wilayah by Code**

```http
GET /api/wilayah/{code}
```

**Response:**

```json
{
	"success": true,
	"data": {
		"code": "31.02.01.1001",
		"name": "Kramat Pela",
		"level": "Kelurahan/Desa",
		"full_address": "Kramat Pela, Kebayoran Baru, Jakarta Selatan, DKI Jakarta",
		"parent": {
			"code": "31.02.01",
			"name": "Kebayoran Baru",
			"level": "Kecamatan"
		},
		"children": []
	}
}
```

## Frontend Components

### **WilayahSearchableSelect**

Komponen React untuk pencarian wilayah dengan fitur:

#### **Props:**

- `label`: Label untuk input
- `name`: Nama field untuk form
- `value`: Nilai yang dipilih
- `onChange`: Handler untuk perubahan nilai
- `level`: Level wilayah (`province`, `regency`, `district`, `village`)
- `parentCode`: Kode parent (required untuk regency, district, village)
- `placeholder`: Placeholder text
- `error`: Error message
- `required`: Apakah field required
- `disabled`: Apakah field disabled
- `searchPlaceholder`: Placeholder untuk search input
- `noOptionsText`: Text ketika tidak ada data
- `loadingText`: Text ketika loading

#### **Usage:**

```jsx
import WilayahSearchableSelect from "@/Components/WilayahSearchableSelect";

// Province selection
<WilayahSearchableSelect
  label="Provinsi"
  name="province"
  value={province}
  onChange={handleProvinceChange}
  level="province"
  placeholder="Pilih provinsi"
  required={true}
/>

// Regency selection
<WilayahSearchableSelect
  label="Kabupaten/Kota"
  name="regency"
  value={regency}
  onChange={handleRegencyChange}
  level="regency"
  parentCode={province}
  placeholder="Pilih kabupaten/kota"
  required={true}
  disabled={!province}
/>

// District selection
<WilayahSearchableSelect
  label="Kecamatan"
  name="district"
  value={district}
  onChange={handleDistrictChange}
  level="district"
  parentCode={regency}
  placeholder="Pilih kecamatan"
  required={true}
  disabled={!regency}
/>

// Village selection
<WilayahSearchableSelect
  label="Kelurahan/Desa"
  name="village"
  value={village}
  onChange={handleVillageChange}
  level="village"
  parentCode={district}
  placeholder="Pilih kelurahan/desa"
  required={true}
  disabled={!district}
/>
```

## Backend Models

### **Wilayah Model**

```php
class Wilayah extends Model
{
    protected $table = 'wilayah';
    protected $primaryKey = 'kode';
    public $incrementing = false;
    protected $keyType = 'string';

    // Get provinces (level 1 - 2 digits)
    public static function getProvinces()

    // Get regencies by province code (level 2 - 5 digits)
    public static function getRegencies($provinceCode)

    // Get districts by regency code (level 3 - 8 digits)
    public static function getDistricts($regencyCode)

    // Get villages by district code (level 4 - 13 digits)
    public static function getVillages($districtCode)

    // Search wilayah by name
    public static function searchByName($name, $level = null)

    // Get wilayah by code
    public static function getByCode($code)

    // Get parent wilayah
    public function getParent()

    // Get children wilayah
    public function getChildren()

    // Get full address path
    public function getFullAddress()

    // Get level name
    public function getLevelName()

    // Check level methods
    public function isProvince()
    public function isRegency()
    public function isDistrict()
    public function isVillage()
}
```

## Database Schema

```sql
CREATE TABLE wilayah (
    kode VARCHAR(13) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    INDEX wilayah_name_idx (nama)
);
```

## Data Structure

### **Code Format:**

- **Provinsi**: `XX` (2 digit)
- **Kabupaten/Kota**: `XX.YY` (5 digit dengan titik)
- **Kecamatan**: `XX.YY.ZZ` (8 digit dengan titik)
- **Kelurahan/Desa**: `XX.YY.ZZ.WWWW` (13 digit dengan titik)

### **Examples:**

- `11` = Aceh (Provinsi)
- `11.01` = Kabupaten Aceh Selatan (Kabupaten)
- `11.01.01` = Bakongan (Kecamatan)
- `11.01.01.2001` = Keude Bakongan (Kelurahan/Desa)

## Installation & Setup

### **1. Run Migration**

```bash
php artisan migrate
```

### **2. Seed Data**

```bash
php artisan db:seed --class=WilayahSeeder
```

### **3. Import SQL File (Optional)**

Jika Anda memiliki file SQL wilayah yang lengkap:

```bash
# Copy file SQL ke database/seeders/
cp /path/to/wilayah.sql database/seeders/wilayah_data.sql

# Run seeder
php artisan db:seed --class=WilayahSeeder
```

## Features

### **1. Hierarchical Navigation**

- Pilih provinsi → otomatis load kabupaten/kota
- Pilih kabupaten/kota → otomatis load kecamatan
- Pilih kecamatan → otomatis load kelurahan/desa

### **2. Smart Search**

- Pencarian real-time dengan delay 300ms
- Pencarian berdasarkan level wilayah
- Menampilkan alamat lengkap dalam hasil
- Toleran terhadap kesalahan pengetikan

### **3. Performance Optimization**

- Lazy loading data
- Caching hasil pencarian
- Batch loading untuk data besar
- Index pada kolom nama untuk pencarian cepat

### **4. User Experience**

- Loading states yang jelas
- Error handling yang baik
- Keyboard navigation support
- Responsive design

## Usage Examples

### **1. Form Patient Registration**

```jsx
// Province selection
<WilayahSearchableSelect
  label="Provinsi"
  name="propinsipj"
  value={data.propinsipj}
  onChange={handleProvinceChange}
  level="province"
  required={true}
/>

// Regency selection (depends on province)
<WilayahSearchableSelect
  label="Kabupaten/Kota"
  name="kabupatenpj"
  value={data.kabupatenpj}
  onChange={handleRegencyChange}
  level="regency"
  parentCode={data.propinsipj}
  required={true}
  disabled={!data.propinsipj}
/>
```

### **2. Address Search**

```jsx
// Search any wilayah
<WilayahSearchableSelect
	label="Cari Alamat"
	name="address"
	value={address}
	onChange={handleAddressChange}
	level="village" // Search all levels
	searchPlaceholder="Cari alamat lengkap..."
/>
```

### **3. API Usage**

```javascript
// Get provinces
const response = await fetch("/api/wilayah/provinces");
const { data } = await response.json();

// Search wilayah
const searchResponse = await fetch(
	"/api/wilayah/search?q=jakarta&level=district"
);
const { data: searchResults } = await searchResponse.json();

// Get specific wilayah
const wilayahResponse = await fetch("/api/wilayah/31.02.01.1001");
const { data: wilayah } = await wilayahResponse.json();
```

## Error Handling

### **Common Errors:**

- `400 Bad Request`: Missing required parameters
- `404 Not Found`: Wilayah not found
- `500 Internal Server Error`: Server error

### **Error Response Format:**

```json
{
	"success": false,
	"message": "Error description",
	"error": "Detailed error message"
}
```

## Performance Tips

### **1. Database Optimization**

- Pastikan index pada kolom `nama` sudah ada
- Gunakan `LIMIT` untuk query besar
- Implementasi caching jika diperlukan

### **2. Frontend Optimization**

- Gunakan debouncing untuk search
- Implementasi virtual scrolling untuk data besar
- Cache hasil pencarian di localStorage

### **3. API Optimization**

- Gunakan pagination untuk data besar
- Implementasi response caching
- Gunakan database connection pooling

## Troubleshooting

### **Common Issues:**

1. **Data tidak muncul**

   - Pastikan seeder sudah dijalankan
   - Check database connection
   - Verify API endpoints

2. **Search tidak bekerja**

   - Check network connection
   - Verify search query format
   - Check API response

3. **Performance lambat**
   - Check database indexes
   - Optimize query
   - Implement caching

## Support

Untuk bantuan teknis atau pertanyaan tentang Sistem Wilayah Indonesia, silakan hubungi tim development atau lihat dokumentasi API.

---

**Note**: Sistem ini menggunakan data wilayah standar Indonesia yang dapat diupdate sesuai dengan perubahan administrasi wilayah.


