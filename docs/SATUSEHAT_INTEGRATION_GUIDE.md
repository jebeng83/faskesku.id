# Panduan Lengkap Integrasi SATUSEHAT Platform

## Daftar Isi

1. [Pengenalan](#pengenalan)
2. [Konfigurasi Awal](#konfigurasi-awal)
3. [Autentikasi OAuth2](#autentikasi-oauth2)
4. [Arsitektur Implementasi](#arsitektur-implementasi)
5. [Resource Prerequisites](#resource-prerequisites)
6. [Resource Interoperabilitas](#resource-interoperabilitas)
7. [Error Handling](#error-handling)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)
10. [Referensi](#referensi)

---

## 1. Pengenalan

### 1.1 Apa itu SATUSEHAT?

SATUSEHAT adalah platform interoperabilitas data kesehatan nasional yang dikembangkan oleh Kementerian Kesehatan Republik Indonesia. Platform ini menggunakan standar HL7 FHIR R4 untuk pertukaran data kesehatan antar sistem.

### 1.2 Tujuan Integrasi

Integrasi SATUSEHAT memungkinkan aplikasi Faskesku.id untuk:
- Mengirim dan menerima data kesehatan pasien
- Berinteraksi dengan ekosistem kesehatan nasional
- Memenuhi standar interoperabilitas kesehatan Indonesia
- Mengintegrasikan data dengan sistem kesehatan lainnya

### 1.3 Standar yang Digunakan

- **HL7 FHIR R4**: Standar pertukaran data kesehatan
- **OAuth2 Client Credentials**: Metode autentikasi
- **RESTful API**: Protokol komunikasi
- **JSON**: Format data

---

## 2. Konfigurasi Awal

### 2.1 Environment Variables

Tambahkan variabel berikut ke file `.env`:

```env
# Environment (DEV/SANDBOX/PROD)
SATUSEHAT_ENV=PROD

# Base URLs
SATUSEHAT_AUTH=https://api-satusehat.kemkes.go.id/oauth2/v1
SATUSEHAT_FHIR=https://api-satusehat.kemkes.go.id/fhir-r4/v1

# Organization ID (IHS Number)
SATUSEHAT_ORG_ID=100006530

# OAuth2 Credentials
SATUSEHAT_CLIENT_ID=your-client-id
SATUSEHAT_CLIENT_SECRET=your-client-secret

# Koordinat Default (opsional, untuk Location)
LONGITUDE=111.05827946682133
LATITUDE=-7.535561951939349
ALTITUDE=500
```

### 2.2 Konfigurasi Laravel

File konfigurasi: `config/services.php`

```php
'satusehat' => [
    'env' => env('SATUSEHAT_ENV', 'DEV'),
    'auth' => env('SATUSEHAT_AUTH'),
    'fhir' => env('SATUSEHAT_FHIR'),
    'org_id' => env('SATUSEHAT_ORG_ID'),
    'client_id' => env('SATUSEHAT_CLIENT_ID'),
    'client_secret' => env('SATUSEHAT_CLIENT_SECRET'),
],
```

### 2.3 Clear Cache Setelah Konfigurasi

```bash
php artisan config:clear
php artisan cache:clear
```

---

## 3. Autentikasi OAuth2

### 3.1 Flow Autentikasi

SATUSEHAT menggunakan OAuth2 Client Credentials flow:

1. Aplikasi mengirim `client_id` dan `client_secret` ke endpoint auth
2. Server mengembalikan `access_token`
3. Token digunakan untuk semua request FHIR berikutnya
4. Token memiliki TTL (Time To Live) tertentu

### 3.2 Request Token

**Endpoint:**
```
POST {SATUSEHAT_AUTH}/accesstoken?grant_type=client_credentials
```

**Headers:**
```
Content-Type: application/x-www-form-urlencoded
Accept: application/json
```

**Body (form-encoded):**
```
client_id={client_id}
client_secret={client_secret}
```

**Contoh cURL:**
```bash
curl -X POST \
  'https://api-satusehat.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json' \
  --data-urlencode 'client_id=your-client-id' \
  --data-urlencode 'client_secret=your-client-secret'
```

**Response Sukses:**
```json
{
  "token_type": "BearerToken",
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": "14399",
  "api_product_list": "[api-satusehat-prod]",
  "organization_name": "ihs-prod-1",
  "status": "approved"
}
```

### 3.3 Implementasi di Laravel

**File:** `app/Traits/SatuSehatTraits.php`

```php
protected function satusehatToken(): ?string
{
    // Cek cache terlebih dahulu
    $cached = Cache::get('satusehat_token');
    if ($cached) {
        return $cached;
    }

    // Request token baru
    $authBase = $this->satusehatAuthBase();
    $url = rtrim($authBase, '/') . '/accesstoken?grant_type=client_credentials';
    
    $response = Http::asForm()->post($url, [
        'client_id' => $this->satusehatClientId(),
        'client_secret' => $this->satusehatClientSecret(),
    ]);

    if (!$response->successful()) {
        Log::error('[SATUSEHAT] Gagal mendapatkan token', [
            'status' => $response->status(),
            'body' => $response->body(),
        ]);
        return null;
    }

    $json = $response->json();
    $token = $json['access_token'] ?? null;
    $expiresIn = (int) ($json['expires_in'] ?? 14399);

    if ($token) {
        // Cache token dengan TTL = expires_in - 60 detik (buffer aman)
        Cache::put('satusehat_token', $token, now()->addSeconds($expiresIn - 60));
    }

    return $token;
}
```

### 3.4 Menggunakan Token

Setelah mendapatkan token, gunakan di header setiap request FHIR:

```
Authorization: Bearer {access_token}
```

---

## 4. Arsitektur Implementasi

### 4.1 Struktur File

```
app/
├── Http/
│   └── Controllers/
│       └── SatuSehat/
│           └── SatuSehatController.php    # Controller utama
├── Models/
│   ├── SatuSehatDepartemenMapping.php     # Model mapping departemen
│   └── SatuSehatMappingLokasiRalan.php   # Model mapping lokasi
└── Traits/
    └── SatuSehatTraits.php                # Trait helper methods

resources/js/Pages/SatuSehat/
└── Prerequisites/
    ├── SatuSehatOrganization.jsx         # UI Organization mapping
    └── SatuSehatLocation.jsx              # UI Location mapping
```

### 4.2 Trait: SatuSehatTraits

Trait ini menyediakan helper methods untuk interaksi dengan SATUSEHAT API.

**Methods Utama:**

1. **`satusehatToken()`**: Mendapatkan access token (dengan caching)
2. **`satusehatRequest(method, path, body, options)`**: Generic request handler
3. **`satusehatHeaders(extra)`**: Standard FHIR headers
4. **`satusehatPatchHeaders(extra)`**: Headers khusus untuk PATCH (JSON Patch)
5. **`satusehatOrganizationId()`**: Mendapatkan Organization ID dari config

**Contoh Penggunaan:**

```php
use App\Traits\SatuSehatTraits;

class MyController extends Controller
{
    use SatuSehatTraits;

    public function myMethod()
    {
        // Request GET
        $res = $this->satusehatRequest('GET', 'Patient/123');
        
        // Request POST
        $res = $this->satusehatRequest('POST', 'Patient', [
            'resourceType' => 'Patient',
            // ... payload
        ]);
        
        // Request dengan query parameters
        $res = $this->satusehatRequest('GET', 'Location', null, [
            'query' => ['name' => 'Poliklinik', 'organization' => 'Organization/123']
        ]);
    }
}
```

### 4.3 Generic Request Handler

**Method:** `satusehatRequest()`

**Signature:**
```php
protected function satusehatRequest(
    string $method,
    string $path,
    ?array $body = null,
    array $options = []
): array
```

**Parameters:**
- `$method`: HTTP method (GET, POST, PUT, PATCH, DELETE)
- `$path`: FHIR resource path (e.g., 'Patient', 'Location/123')
- `$body`: Request body (array, akan di-encode sebagai JSON)
- `$options`: Additional options
  - `query`: Query parameters
  - `headers`: Additional headers
  - `prefer_representation`: Set Prefer header untuk return representation

**Return Value:**
```php
[
    'ok' => bool,           // Status sukses/gagal
    'status' => int,        // HTTP status code
    'json' => array|null,   // Parsed JSON response
    'body' => string|null,  // Raw response body
    'error' => string|null, // Error message jika ada
]
```

**Contoh Response Sukses:**
```php
[
    'ok' => true,
    'status' => 200,
    'json' => [
        'resourceType' => 'Patient',
        'id' => '123',
        // ... resource data
    ],
    'body' => '{"resourceType":"Patient",...}',
    'error' => null,
]
```

**Contoh Response Error:**
```php
[
    'ok' => false,
    'status' => 400,
    'json' => [
        'resourceType' => 'OperationOutcome',
        'issue' => [
            [
                'severity' => 'error',
                'code' => 'structure',
                'diagnostics' => 'expected decimal: found "string"',
            ]
        ]
    ],
    'body' => '{"resourceType":"OperationOutcome",...}',
    'error' => 'Request failed',
]
```

---

## 5. Resource Prerequisites

Resource Prerequisites adalah resource yang harus dibuat terlebih dahulu sebelum membuat resource interoperabilitas.

### 5.1 Organization

**Tujuan:** Memetakan departemen internal ke Organization subunit SATUSEHAT.

**Endpoint Mapping:**
- `GET /api/satusehat/organization/subunits` - List subunit Organization
- `POST /api/satusehat/mapping/departemen` - Buat mapping departemen
- `GET /api/satusehat/mapping/departemen` - List mapping departemen
- `DELETE /api/satusehat/mapping/departemen/{dep_id}` - Hapus mapping

**FHIR Endpoint:**
- `GET /fhir-r4/v1/Organization` - Search Organization
- `GET /fhir-r4/v1/Organization/{id}` - Get Organization by ID
- `POST /fhir-r4/v1/Organization` - Create Organization
- `PUT /fhir-r4/v1/Organization/{id}` - Update Organization

**Contoh Payload Create Organization:**
```json
{
  "resourceType": "Organization",
  "active": true,
  "name": "Poliklinik Rawat Jalan",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/organization",
      "value": "100006530"
    }
  ],
  "partOf": {
    "reference": "Organization/100006530"
  }
}
```

**Contoh Payload Update Organization (PUT):**
```json
{
  "resourceType": "Organization",
  "id": "uuid-here",
  "active": true,
  "name": "Nama Baru",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/organization",
      "value": "100006530"
    }
  ],
  "partOf": {
    "reference": "Organization/100006530"
  }
}
```

### 5.2 Location

**Tujuan:** Memetakan poliklinik internal ke Location SATUSEHAT.

**Endpoint Mapping:**
- `GET /api/satusehat/location` - Search Location
- `POST /api/satusehat/mapping/lokasi` - Buat mapping lokasi
- `GET /api/satusehat/mapping/lokasi` - List mapping lokasi
- `PATCH /api/satusehat/location/{id}` - Update Location (partial)

**FHIR Endpoint:**
- `GET /fhir-r4/v1/Location` - Search Location
- `GET /fhir-r4/v1/Location/{id}` - Get Location by ID
- `POST /fhir-r4/v1/Location` - Create Location
- `PUT /fhir-r4/v1/Location/{id}` - Update Location (full)
- `PATCH /fhir-r4/v1/Location/{id}` - Update Location (partial, JSON Patch)

**Search Parameters:**
- `name`: Nama lokasi
- `identifier`: Identifier lokasi (format: `system|value` atau `value`)
- `organization`: ID Organization atau `Organization/{id}`
- `lat`, `lon`, `radius`: Pencarian berdasarkan koordinat

**Contoh Payload Create Location:**
```json
{
  "resourceType": "Location",
  "status": "active",
  "name": "Poliklinik Rawat Jalan",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/location",
      "value": "U0001"
    }
  ],
  "managingOrganization": {
    "reference": "Organization/eb3e8fb6-b006-4c2d-9f69-188ee22da847"
  },
  "position": {
    "longitude": 111.05827946682133,
    "latitude": -7.535561951939349,
    "altitude": 500
  }
}
```

**PENTING:** Field `position.longitude`, `position.latitude`, dan `position.altitude` harus bertipe **decimal (number)**, bukan string.

**Contoh Payload PATCH Location (JSON Patch):**
```json
[
  {
    "op": "replace",
    "path": "/name",
    "value": "Nama Baru"
  },
  {
    "op": "replace",
    "path": "/position/longitude",
    "value": 111.123456
  }
]
```

**Operasi JSON Patch yang Didukung:**
- `replace`: Mengganti nilai field
- `add`: Menambahkan field baru
- `remove`: Menghapus field

**Header untuk PATCH:**
```
Content-Type: application/json-patch+json
Accept: application/fhir+json
```

### 5.3 Practitioner

**Tujuan:** Memetakan dokter/praktisi internal ke Practitioner SATUSEHAT.

**FHIR Endpoint:**
- `GET /fhir-r4/v1/Practitioner` - Search Practitioner
- `POST /fhir-r4/v1/Practitioner` - Create Practitioner
- `PUT /fhir-r4/v1/Practitioner/{id}` - Update Practitioner

**Contoh Payload:**
```json
{
  "resourceType": "Practitioner",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/nik",
      "value": "1234567890123456"
    }
  ],
  "name": [
    {
      "use": "official",
      "text": "Dr. John Doe",
      "family": "Doe",
      "given": ["John"]
    }
  ],
  "gender": "male",
  "birthDate": "1980-01-01"
}
```

### 5.4 Patient

**Tujuan:** Memetakan pasien internal ke Patient SATUSEHAT.

**FHIR Endpoint:**
- `GET /fhir-r4/v1/Patient` - Search Patient
- `POST /fhir-r4/v1/Patient` - Create Patient
- `PUT /fhir-r4/v1/Patient/{id}` - Update Patient

**Search Parameters:**
- `identifier`: NIK atau identifier lainnya
- `name`: Nama pasien
- `birthdate`: Tanggal lahir

**Contoh Payload:**
```json
{
  "resourceType": "Patient",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/nik",
      "value": "1234567890123456"
    }
  ],
  "name": [
    {
      "use": "official",
      "text": "John Doe",
      "family": "Doe",
      "given": ["John"]
    }
  ],
  "gender": "male",
  "birthDate": "1990-01-01",
  "address": [
    {
      "use": "home",
      "line": ["Jl. Contoh No. 123"],
      "city": "Jakarta",
      "postalCode": "12345",
      "country": "ID"
    }
  ]
}
```

---

## 6. Resource Interoperabilitas

Resource Interoperabilitas adalah resource yang digunakan untuk pertukaran data kesehatan.

### 6.1 Encounter

**Tujuan:** Mencatat kunjungan pasien (rawat jalan, rawat inap, IGD).

**FHIR Endpoint:**
- `POST /fhir-r4/v1/Encounter` - Create Encounter
- `GET /fhir-r4/v1/Encounter/{id}` - Get Encounter

**Contoh Payload (Rawat Jalan):**
```json
{
  "resourceType": "Encounter",
  "status": "in-progress",
  "class": {
    "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
    "code": "AMB",
    "display": "ambulatory"
  },
  "subject": {
    "reference": "Patient/123"
  },
  "serviceProvider": {
    "reference": "Organization/eb3e8fb6-b006-4c2d-9f69-188ee22da847"
  },
  "location": [
    {
      "location": {
        "reference": "Location/dbfa6835-7db7-4f55-9a29-7482b8c029f2"
      }
    }
  ],
  "period": {
    "start": "2025-11-14T08:30:00+07:00"
  },
  "reasonCode": [
    {
      "coding": [
        {
          "system": "http://hl7.org/fhir/sid/icd-10",
          "code": "J06.9",
          "display": "ISPA"
        }
      ]
    }
  ]
}
```

**Status Encounter:**
- `planned`: Direncanakan
- `in-progress`: Sedang berlangsung
- `finished`: Selesai
- `cancelled`: Dibatalkan

**Class Encounter:**
- `AMB`: Rawat Jalan (Ambulatory)
- `IMP`: Rawat Inap (Inpatient)
- `EMER`: IGD (Emergency)
- `OBSENC`: Observasi

### 6.2 Observation

**Tujuan:** Mencatat hasil pemeriksaan (vital signs, laboratorium, dll).

**FHIR Endpoint:**
- `POST /fhir-r4/v1/Observation` - Create Observation
- `GET /fhir-r4/v1/Observation/{id}` - Get Observation

**Contoh Payload (Vital Signs):**
```json
{
  "resourceType": "Observation",
  "status": "final",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "8867-4",
        "display": "Heart rate"
      }
    ]
  },
  "subject": {
    "reference": "Patient/123"
  },
  "encounter": {
    "reference": "Encounter/456"
  },
  "performer": [
    {
      "reference": "Organization/eb3e8fb6-b006-4c2d-9f69-188ee22da847"
    }
  ],
  "effectiveDateTime": "2025-11-14T08:45:00+07:00",
  "valueQuantity": {
    "value": 74,
    "unit": "beats/minute",
    "system": "http://unitsofmeasure.org",
    "code": "/min"
  }
}
```

**Contoh Payload (Laboratorium):**
```json
{
  "resourceType": "Observation",
  "status": "final",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "laboratory"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "2345-7",
        "display": "Glucose [Mass/volume] in Serum or Plasma"
      }
    ]
  },
  "subject": {
    "reference": "Patient/123"
  },
  "encounter": {
    "reference": "Encounter/456"
  },
  "performer": [
    {
      "reference": "Organization/100006530"
    }
  ],
  "effectiveDateTime": "2025-11-14T09:00:00+07:00",
  "valueQuantity": {
    "value": 102,
    "unit": "mg/dL",
    "system": "http://unitsofmeasure.org",
    "code": "mg/dL"
  }
}
```

**Status Observation:**
- `registered`: Terdaftar
- `preliminary`: Sementara
- `final`: Final
- `amended`: Diubah
- `cancelled`: Dibatalkan

**Category Observation:**
- `vital-signs`: Tanda vital
- `laboratory`: Laboratorium
- `imaging`: Pencitraan
- `procedure`: Prosedur
- `survey`: Survei

### 6.3 Condition

**Tujuan:** Mencatat diagnosis atau kondisi pasien.

**FHIR Endpoint:**
- `POST /fhir-r4/v1/Condition` - Create Condition
- `GET /fhir-r4/v1/Condition/{id}` - Get Condition

**Contoh Payload:**
```json
{
  "resourceType": "Condition",
  "clinicalStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
        "code": "active"
      }
    ]
  },
  "verificationStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
        "code": "confirmed"
      }
    ]
  },
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/condition-category",
          "code": "encounter-diagnosis"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/sid/icd-10",
        "code": "J06.9",
        "display": "ISPA"
      }
    ]
  },
  "subject": {
    "reference": "Patient/123"
  },
  "encounter": {
    "reference": "Encounter/456"
  },
  "onsetDateTime": "2025-11-14T08:30:00+07:00"
}
```

### 6.4 Procedure

**Tujuan:** Mencatat prosedur yang dilakukan pada pasien.

**FHIR Endpoint:**
- `POST /fhir-r4/v1/Procedure` - Create Procedure
- `GET /fhir-r4/v1/Procedure/{id}` - Get Procedure

**Contoh Payload:**
```json
{
  "resourceType": "Procedure",
  "status": "completed",
  "category": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "387713003",
        "display": "Surgical procedure"
      }
    ]
  },
  "code": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "387713003",
        "display": "Surgical procedure"
      }
    ]
  },
  "subject": {
    "reference": "Patient/123"
  },
  "encounter": {
    "reference": "Encounter/456"
  },
  "performedDateTime": "2025-11-14T10:00:00+07:00",
  "performer": [
    {
      "actor": {
        "reference": "Practitioner/789"
      }
    }
  ]
}
```

---

## 7. Error Handling

### 7.1 OperationOutcome

SATUSEHAT mengembalikan error dalam format OperationOutcome:

```json
{
  "resourceType": "OperationOutcome",
  "issue": [
    {
      "severity": "error",
      "code": "structure",
      "details": {
        "text": "unparseable_resource"
      },
      "diagnostics": "expected decimal: found \"string\"",
      "expression": ["Location.position.longitude"]
    }
  ]
}
```

### 7.2 Parsing Error

**Contoh Implementasi:**

```php
if (!$res['ok']) {
    $errorMessage = 'Gagal membuat resource';
    $errorDetails = [];
    
    if (isset($res['json']['issue']) && is_array($res['json']['issue'])) {
        foreach ($res['json']['issue'] as $issue) {
            $diagnostics = $issue['diagnostics'] ?? '';
            $expression = is_array($issue['expression'] ?? null) 
                ? ($issue['expression'][0] ?? '') 
                : '';
            if ($diagnostics) {
                $errorDetails[] = ($expression ? "{$expression}: " : '') . $diagnostics;
            }
        }
        if (!empty($errorDetails)) {
            $errorMessage .= '. ' . implode('; ', $errorDetails);
        }
    }
    
    return response()->json([
        'ok' => false,
        'message' => $errorMessage,
        'status' => $res['status'],
        'details' => $res['json']['issue'] ?? null,
    ], $res['status'] ?: 400);
}
```

### 7.3 Common Error Codes

| Code | Keterangan | Solusi |
|------|------------|--------|
| `structure` | Format data tidak sesuai | Periksa tipe data (decimal vs string) |
| `required` | Field wajib tidak diisi | Pastikan semua required field terisi |
| `invalid` | Nilai tidak valid | Periksa format dan nilai yang dikirim |
| `not-found` | Resource tidak ditemukan | Periksa ID resource |
| `duplicate` | Resource sudah ada | Gunakan PUT untuk update atau cek duplikasi |

### 7.4 HTTP Status Codes

| Status | Keterangan |
|--------|------------|
| `200` | Sukses (GET, PUT, PATCH) |
| `201` | Created (POST) |
| `400` | Bad Request (format/data tidak valid) |
| `401` | Unauthorized (token tidak valid) |
| `404` | Not Found (resource tidak ditemukan) |
| `422` | Unprocessable Entity (validasi gagal) |
| `500` | Server Error (error di server SATUSEHAT) |

---

## 8. Best Practices

### 8.1 Token Management

1. **Cache Token**: Selalu cache token untuk menghindari request berulang
2. **Buffer Time**: Kurangi TTL dengan buffer 60 detik untuk menghindari expired token
3. **Error Handling**: Handle error saat mendapatkan token dengan baik

### 8.2 Data Type Handling

1. **Decimal Fields**: Pastikan nilai decimal dikirim sebagai number, bukan string
   ```php
   // ❌ SALAH
   'longitude' => "111.123"
   
   // ✅ BENAR
   'longitude' => (float) "111.123"
   ```

2. **Date/DateTime**: Gunakan format ISO 8601 dengan timezone
   ```php
   // ✅ BENAR
   'effectiveDateTime' => '2025-11-14T08:30:00+07:00'
   ```

3. **References**: Gunakan format `ResourceType/{id}`
   ```php
   // ✅ BENAR
   'subject' => ['reference' => 'Patient/123']
   ```

### 8.3 Foreign Key Constraints

Saat membuat mapping, pastikan resource prerequisite sudah ada:

1. **Location → Organization**: Pastikan Organization sudah ada sebelum membuat Location
2. **Mapping Lokasi → Mapping Departemen**: Pastikan mapping departemen ada sebelum mapping lokasi

**Contoh Implementasi:**

```php
// Pastikan mapping departemen ada
$departemenMapping = SatuSehatDepartemenMapping::where('id_organisasi_satusehat', $orgId)->first();

if (!$departemenMapping) {
    // Buat mapping departemen otomatis atau return error
    // ...
}
```

### 8.4 Logging

Selalu log request dan response untuk debugging:

```php
Log::info('[SATUSEHAT] Request', [
    'method' => $method,
    'path' => $path,
    'payload' => $body,
]);

Log::error('[SATUSEHAT] Error', [
    'method' => $method,
    'path' => $path,
    'status' => $status,
    'error' => $error,
    'response' => $response,
]);
```

### 8.5 Retry Logic

Implementasikan retry logic untuk transient errors:

```php
$maxRetries = 3;
$retryCount = 0;

while ($retryCount < $maxRetries) {
    $res = $this->satusehatRequest('GET', 'Patient/123');
    
    if ($res['ok']) {
        break;
    }
    
    // Retry hanya untuk 5xx errors
    if ($res['status'] >= 500 && $retryCount < $maxRetries - 1) {
        $retryCount++;
        sleep(pow(2, $retryCount)); // Exponential backoff
        continue;
    }
    
    break;
}
```

### 8.6 Validation

Validasi data sebelum mengirim ke SATUSEHAT:

```php
$data = $request->validate([
    'kd_poli' => ['required', 'string', 'max:5'],
    'id_organisasi_satusehat' => ['required', 'string', 'max:64'],
    'longitude' => ['nullable', 'string', 'max:30'],
    'latitude' => ['nullable', 'string', 'max:30'],
], [
    'kd_poli.required' => 'Kode poliklinik wajib diisi.',
    'id_organisasi_satusehat.required' => 'ID Organization wajib diisi.',
]);
```

---

## 9. Troubleshooting

### 9.1 Token Error

**Problem:** `401 Unauthorized` atau `client_id or client_secret unacceptable`

**Solusi:**
1. Periksa `SATUSEHAT_CLIENT_ID` dan `SATUSEHAT_CLIENT_SECRET` di `.env`
2. Pastikan format request sesuai (grant_type di query, credentials di body)
3. Pastikan kredensial aktif di portal SATUSEHAT
4. Clear cache: `php artisan config:clear && php artisan cache:clear`

### 9.2 Decimal Type Error

**Problem:** `expected decimal: found "string"`

**Solusi:**
1. Pastikan nilai decimal dikirim sebagai number:
   ```php
   $position['longitude'] = (float) $longitude;
   ```
2. Gunakan `json_encode()` dengan flag `JSON_PRESERVE_ZERO_FRACTION`
3. Pastikan tidak ada string conversion di middleware

### 9.3 Foreign Key Constraint

**Problem:** `Cannot add or update a child row: a foreign key constraint fails`

**Solusi:**
1. Pastikan resource prerequisite sudah ada
2. Buat mapping prerequisite terlebih dahulu
3. Implementasikan auto-create jika diperlukan

### 9.4 Network Timeout

**Problem:** Request timeout atau connection refused

**Solusi:**
1. Periksa koneksi internet
2. Periksa firewall/proxy settings
3. Increase timeout di HTTP client:
   ```php
   Http::timeout(30)->...
   ```

### 9.5 Resource Not Found

**Problem:** `404 Not Found` saat mencari resource

**Solusi:**
1. Periksa ID resource
2. Pastikan resource sudah dibuat sebelumnya
3. Gunakan search dengan parameter yang tepat

---

## 10. Referensi

### 10.1 Dokumentasi Resmi

- **SATUSEHAT Platform**: https://satusehat.kemkes.go.id/platform/
- **API Catalogue**: https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/
- **FHIR Documentation**: https://satusehat.kemkes.go.id/platform/docs/id/fhir/
- **Playbook**: https://satusehat.kemkes.go.id/platform/docs/id/playbook/

### 10.2 Standar

- **HL7 FHIR R4**: https://www.hl7.org/fhir/
- **OAuth2**: https://oauth.net/2/
- **JSON Patch**: https://datatracker.ietf.org/doc/html/rfc6902

### 10.3 Terminologi

- **ICD-10**: https://www.who.int/classifications/icd/en/
- **LOINC**: https://loinc.org/
- **SNOMED CT**: https://www.snomed.org/

### 10.4 Tools

- **Postman Collection**: Tersedia di portal SATUSEHAT
- **FHIR Validator**: https://validator.fhir.org/
- **JSON Patch Tester**: https://jsonpatch.com/

---

## 11. Checklist Implementasi

Saat mengimplementasikan integrasi SATUSEHAT, pastikan:

- [ ] Konfigurasi `.env` lengkap dan benar
- [ ] Token management dengan caching
- [ ] Error handling yang proper
- [ ] Logging untuk debugging
- [ ] Validasi data sebelum kirim
- [ ] Type handling yang benar (decimal, date, reference)
- [ ] Foreign key constraints ditangani
- [ ] Retry logic untuk transient errors
- [ ] Testing di sandbox sebelum production
- [ ] Dokumentasi endpoint internal

---

## 12. Contoh Implementasi Lengkap

Lihat file berikut sebagai referensi:
- `app/Traits/SatuSehatTraits.php` - Helper methods
- `app/Http/Controllers/SatuSehat/SatuSehatController.php` - Controller implementation
- `resources/js/Pages/SatuSehat/Prerequisites/SatuSehatOrganization.jsx` - UI Organization
- `resources/js/Pages/SatuSehat/Prerequisites/SatuSehatLocation.jsx` - UI Location

---

**Terakhir Diupdate:** 2025-11-14
**Versi:** 2.0.0
**Penulis:** Tim Development Faskesku.id

