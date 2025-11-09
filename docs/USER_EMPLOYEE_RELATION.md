# User-Employee Relation - Dokumentasi

## Overview

Dokumentasi ini menjelaskan relasi antara tabel `users` dan `pegawai` melalui foreign key `nik`. Relasi ini memungkinkan setiap user untuk terhubung dengan data pegawai yang sesuai.

## Database Structure

### Tabel: `users`

- **Primary Key**: `id` (auto increment)
- **Foreign Key**: `nik` (string, 20 karakter, nullable)
- **Relasi**: `belongsTo` Employee

### Tabel: `pegawai`

- **Primary Key**: `nik` (string, 20 karakter)
- **Relasi**: `hasOne` User

## Migration

### File: `2025_09_06_084114_add_nik_foreign_key_to_users_table.php`

```php
// Up method
Schema::table('users', function (Blueprint $table) {
    // Add nik column if it doesn't exist
    if (!Schema::hasColumn('users', 'nik')) {
        $table->string('nik', 20)->nullable()->after('email');
    }

    // Add foreign key constraint
    $table->foreign('nik')->references('nik')->on('pegawai')->onDelete('set null')->onUpdate('cascade');
});

// Down method
Schema::table('users', function (Blueprint $table) {
    // Drop foreign key constraint
    $table->dropForeign(['nik']);

    // Drop nik column
    $table->dropColumn('nik');
});
```

### Foreign Key Constraints

- **ON DELETE**: `SET NULL` - Jika data pegawai dihapus, NIK di user akan di-set NULL
- **ON UPDATE**: `CASCADE` - Jika NIK pegawai diubah, NIK di user akan ikut berubah

## Model Relations

### User Model

```php
/**
 * Get the employee associated with the user.
 */
public function employee()
{
    return $this->belongsTo(Employee::class, 'nik', 'nik');
}
```

### Employee Model

```php
/**
 * Get the user associated with the employee.
 */
public function user()
{
    return $this->hasOne(User::class, 'nik', 'nik');
}
```

## Usage Examples

### 1. Mengambil Data User dengan Employee

```php
$user = User::with('employee')->find(1);
echo $user->employee->nama; // Nama pegawai
echo $user->employee->jbtn; // Jabatan pegawai
```

### 2. Mengambil Data Employee dengan User

```php
$employee = Employee::with('user')->where('nik', 'EMP001')->first();
echo $employee->user->email; // Email user
echo $employee->user->name; // Nama user
```

### 3. Membuat User dengan Employee

```php
// Cari pegawai terlebih dahulu
$employee = Employee::where('nik', 'EMP001')->first();

// Buat user dengan NIK
$user = User::create([
    'name' => 'John Doe',
    'email' => 'john.doe@faskesku.id',
    'password' => Hash::make('password'),
    'nik' => $employee->nik,
]);
```

### 4. Query dengan Join

```php
$users = User::join('pegawai', 'users.nik', '=', 'pegawai.nik')
    ->select('users.*', 'pegawai.nama as nama_pegawai', 'pegawai.jbtn as jabatan')
    ->get();
```

### 5. Filter User berdasarkan Jabatan

```php
$users = User::whereHas('employee', function ($query) {
    $query->where('jbtn', 'Dokter');
})->get();
```

## Seeder

### UserEmployeeSeeder

Seeder ini membuat data contoh untuk:

- 2 pegawai dengan NIK: EMP001 dan EMP002
- 3 user: 2 dengan NIK pegawai, 1 admin tanpa NIK
- Assignment role untuk setiap user

```php
// Jalankan seeder
php artisan db:seed --class=UserEmployeeSeeder
```

## Data Examples

### Pegawai Data

```php
[
    'nik' => 'EMP001',
    'nama' => 'John Doe',
    'jbtn' => 'Administrator',
    'departemen' => 'IT',
    'stts_aktif' => 'AKTIF',
    // ... other fields
]
```

### User Data

```php
[
    'name' => 'John Doe',
    'email' => 'john.doe@faskesku.id',
    'password' => 'hashed_password',
    'nik' => 'EMP001', // Foreign key to pegawai.nik
]
```

## Benefits

### 1. Data Integrity

- Foreign key constraint memastikan NIK di user valid
- Referential integrity terjaga

### 2. Single Source of Truth

- Data pegawai tersentralisasi di tabel `pegawai`
- User hanya menyimpan referensi NIK

### 3. Flexible User Management

- User bisa ada tanpa pegawai (admin system)
- Pegawai bisa ada tanpa user (belum login)

### 4. Easy Data Retrieval

- Relasi Eloquent memudahkan akses data
- Eager loading untuk performa optimal

## Security Considerations

### 1. Mass Assignment

- Field `nik` sudah ditambahkan ke `$fillable` di User model
- Pastikan validasi input yang tepat

### 2. Authorization

- Gunakan role-based access control
- Validasi akses berdasarkan relasi user-employee

### 3. Data Validation

- Pastikan NIK yang diinput valid di tabel pegawai
- Handle case ketika pegawai dihapus

## API Usage

### Get User with Employee Data

```php
// Controller
public function show($id)
{
    $user = User::with('employee')->findOrFail($id);
    return response()->json($user);
}
```

### Create User with Employee

```php
// Controller
public function store(Request $request)
{
    $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'password' => 'required',
        'nik' => 'nullable|exists:pegawai,nik',
    ]);

    $user = User::create($request->all());
    return response()->json($user->load('employee'));
}
```

## Troubleshooting

### 1. Foreign Key Constraint Error

- Pastikan NIK yang diinput ada di tabel pegawai
- Gunakan `nullable()` jika user bisa tanpa pegawai

### 2. Data Inconsistency

- Gunakan transaction untuk operasi yang melibatkan kedua tabel
- Validasi data sebelum insert/update

### 3. Performance Issues

- Gunakan eager loading untuk menghindari N+1 query
- Index pada kolom NIK untuk performa optimal

## Migration Commands

```bash
# Run migration
php artisan migrate

# Rollback migration
php artisan migrate:rollback

# Run seeder
php artisan db:seed --class=UserEmployeeSeeder

# Fresh migration with seed
php artisan migrate:fresh --seed
```
