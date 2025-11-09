# Fitur Manajemen User dengan Permission

## Deskripsi

Fitur ini memungkinkan administrator untuk mengelola data pengguna (users) dengan sistem permission yang terintegrasi menggunakan Spatie Laravel Permission. Fitur ini mencakup CRUD lengkap untuk user dan pengaturan role serta permission.

## Komponen yang Dibuat

### 1. API Controller

- **UserController.php** - Controller API untuk mengelola user dengan endpoint lengkap

### 2. Frontend

- **Users/Index.jsx** - Halaman manajemen user dengan modal CRUD dan permission management

### 3. Routes

- **API Routes** - Endpoint untuk CRUD user dan permission management
- **Web Routes** - Route untuk halaman manajemen user

## Fitur Utama

### 1. **CRUD User**

- ✅ **Create** - Tambah user baru dengan form modal
- ✅ **Read** - Tampilkan daftar user dengan pagination dan search
- ✅ **Update** - Edit data user dengan form modal
- ✅ **Delete** - Hapus user dengan konfirmasi

### 2. **Permission Management**

- ✅ **Role Assignment** - Assign multiple roles ke user
- ✅ **Permission Assignment** - Assign specific permissions ke user
- ✅ **Role & Permission Sync** - Sync roles dan permissions saat update

### 3. **Password Management**

- ✅ **Change Password** - Modal khusus untuk ubah password
- ✅ **Password Validation** - Validasi password saat ini dan konfirmasi

### 4. **Employee Integration**

- ✅ **NIK Selection** - Pilih karyawan dari dropdown untuk link ke user
- ✅ **Employee Data** - Tampilkan data karyawan yang terkait

## API Endpoints

### User Management

```
GET    /api/users              - List users dengan pagination dan filter
POST   /api/users              - Create user baru
GET    /api/users/{user}       - Show detail user
PUT    /api/users/{user}       - Update user
DELETE /api/users/{user}       - Delete user
PUT    /api/users/{user}/password - Update password user
```

### Supporting Data

```
GET    /api/users/roles        - List semua roles
GET    /api/users/permissions  - List semua permissions
GET    /api/users/employees    - List karyawan untuk NIK selection
```

## Form Fields

### User Form

1. **Nama** - Input text (required)
2. **Email** - Input email (required, unique)
3. **Password** - Input password (required untuk create, optional untuk update)
4. **Konfirmasi Password** - Input password confirmation
5. **NIK** - Select dropdown dari data karyawan
6. **Roles** - Checkbox multiple selection
7. **Permissions** - Checkbox multiple selection

### Password Form

1. **Password Saat Ini** - Input password (required)
2. **Password Baru** - Input password (required)
3. **Konfirmasi Password Baru** - Input password confirmation (required)

## Validasi

### User Validation

- Nama: required, string, max 255
- Email: required, email, unique
- Password: required untuk create, min 8 karakter, confirmed
- NIK: optional, unique
- Roles: array, exists in roles table
- Permissions: array, exists in permissions table

### Password Validation

- Current Password: required, must match existing password
- New Password: required, min 8 karakter, confirmed

## Fitur UI/UX

### 1. **Search & Filter**

- ✅ Search berdasarkan nama, email, atau NIK
- ✅ Filter berdasarkan role
- ✅ Real-time search dengan debounce

### 2. **Modal System**

- ✅ Modal untuk create/edit user
- ✅ Modal terpisah untuk change password
- ✅ Responsive design untuk mobile

### 3. **Data Display**

- ✅ Tabel dengan pagination
- ✅ Badge untuk roles dan permissions
- ✅ Loading states dan empty states
- ✅ Error handling dengan validation messages

### 4. **Actions**

- ✅ Edit button untuk setiap user
- ✅ Change password button
- ✅ Delete button dengan konfirmasi
- ✅ Prevent delete admin terakhir

## Security Features

### 1. **Password Security**

- ✅ Password hashing dengan bcrypt
- ✅ Password confirmation validation
- ✅ Current password verification untuk change password

### 2. **Data Protection**

- ✅ Prevent delete last admin user
- ✅ Unique email dan NIK validation
- ✅ CSRF protection via Laravel

### 3. **Permission Integration**

- ✅ Role-based access control
- ✅ Permission-based feature access
- ✅ Spatie Laravel Permission integration

## Database Integration

### User Model

- ✅ HasRoles trait untuk role management
- ✅ HasPermissions trait untuk permission management
- ✅ Employee relationship via NIK

### Relationships

- ✅ User belongsTo Employee (via NIK)
- ✅ User hasMany Roles (many-to-many)
- ✅ User hasMany Permissions (many-to-many)

## Menu Integration

### Sidebar Menu

- ✅ Menu "Manajemen User" di grup Authentication
- ✅ Menu "Permissions" di grup Authentication
- ✅ Icon users dan shield untuk visual clarity

## Cara Menggunakan

### 1. **Akses Menu**

- Buka sidebar menu
- Klik "Authentication" group
- Pilih "Manajemen User"

### 2. **Tambah User**

- Klik tombol "Tambah User"
- Isi form dengan data yang diperlukan
- Pilih roles dan permissions
- Klik "Simpan"

### 3. **Edit User**

- Klik icon edit pada user yang ingin diedit
- Ubah data yang diperlukan
- Klik "Update"

### 4. **Ubah Password**

- Klik icon kunci pada user
- Masukkan password saat ini
- Masukkan password baru dan konfirmasi
- Klik "Ubah Password"

### 5. **Hapus User**

- Klik icon hapus pada user
- Konfirmasi penghapusan
- User akan dihapus (kecuali admin terakhir)

## Error Handling

### 1. **Validation Errors**

- ✅ Field-specific error messages
- ✅ Real-time validation feedback
- ✅ Server-side validation

### 2. **API Errors**

- ✅ HTTP status code handling
- ✅ Error message display
- ✅ Network error handling

### 3. **Business Logic Errors**

- ✅ Prevent delete last admin
- ✅ Unique constraint violations
- ✅ Permission errors

## Responsive Design

### 1. **Mobile Support**

- ✅ Responsive table dengan horizontal scroll
- ✅ Mobile-friendly modal
- ✅ Touch-friendly buttons

### 2. **Desktop Support**

- ✅ Full-width table
- ✅ Large modal untuk better UX
- ✅ Keyboard navigation support

## Performance

### 1. **Data Loading**

- ✅ Pagination untuk large datasets
- ✅ Lazy loading untuk roles dan permissions
- ✅ Debounced search

### 2. **UI Performance**

- ✅ Optimized re-renders
- ✅ Efficient state management
- ✅ Loading states

## Dependencies

### Backend

- Laravel 11
- Spatie Laravel Permission
- Laravel Sanctum (untuk API)

### Frontend

- React 18
- Inertia.js
- Axios untuk API calls
- Tailwind CSS untuk styling

## Instalasi

1. Pastikan Spatie Laravel Permission sudah terinstall
2. Jalankan migration untuk permission tables
3. Jalankan seeder untuk roles dan permissions
4. Akses menu "Manajemen User" di sidebar

## Catatan

- User dengan role admin tidak bisa dihapus jika hanya tersisa 1 admin
- Password tidak ditampilkan di form edit (kosongkan jika tidak diubah)
- NIK optional, bisa dikosongkan jika user bukan karyawan
- Roles dan permissions bisa multiple selection
- Semua perubahan permission langsung tersimpan ke database
