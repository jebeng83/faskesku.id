# Permission Management System

Sistem manajemen permission yang telah dibuat menggunakan Spatie Laravel Permission dengan UI yang konsisten dan user-friendly.

## Fitur yang Tersedia

### 1. API Endpoints

#### Roles Management

- `GET /api/permissions/roles` - Mendapatkan semua roles
- `POST /api/permissions/roles` - Membuat role baru
- `GET /api/permissions/roles/{id}` - Mendapatkan role berdasarkan ID
- `PUT /api/permissions/roles/{id}` - Update role
- `DELETE /api/permissions/roles/{id}` - Hapus role

#### Permissions Management

- `GET /api/permissions` - Mendapatkan semua permissions
- `POST /api/permissions` - Membuat permission baru
- `GET /api/permissions/{id}` - Mendapatkan permission berdasarkan ID
- `PUT /api/permissions/{id}` - Update permission
- `DELETE /api/permissions/{id}` - Hapus permission

### 2. UI Components

#### Halaman Utama (`/permissions`)

- Tab-based interface untuk Roles dan Permissions
- Responsive table dengan ResponsiveTable component
- Modal untuk create/edit forms
- Real-time data fetching

#### Role Management

- Form untuk membuat/edit role
- Checkbox untuk memilih permissions
- Grouping permissions berdasarkan kategori
- Validasi form

#### Permission Management

- Form untuk membuat/edit permission
- Panduan format permission (kebab-case)
- Contoh permission yang umum digunakan

### 3. Komponen yang Dibuat

#### Button Component (`/resources/js/Components/Button.jsx`)

- Variant: primary, secondary, danger, success, warning, info
- Size: sm, md, lg
- Support disabled state

#### Modal Component (`/resources/js/Components/Modal.jsx`)

- Responsive modal dengan backdrop
- Keyboard navigation (ESC to close)
- Size variants: sm, md, lg, xl, full

#### IconSettings Component (`/resources/js/Components/IconSettings.jsx`)

- Reusable settings icon component

### 4. Database Structure

#### Permissions yang Tersedia

- **Patient Management**: view-patients, create-patients, edit-patients, delete-patients
- **Employee Management**: view-employees, create-employees, edit-employees, delete-employees
- **Medical Records**: view-medical-records, create-medical-records, edit-medical-records, delete-medical-records
- **Prescriptions**: view-prescriptions, create-prescriptions, edit-prescriptions, delete-prescriptions
- **Appointments**: view-appointments, create-appointments, edit-appointments, delete-appointments
- **Reports**: view-reports, generate-reports, export-reports
- **Settings**: view-settings, edit-settings
- **User Management**: view-users, create-users, edit-users, delete-users
- **Role & Permission Management**: view-roles, create-roles, edit-roles, delete-roles, view-permissions, create-permissions, edit-permissions, delete-permissions

#### Default Roles

- **admin**: Memiliki semua permissions
- **dokter**: Permissions untuk pasien, rekam medis, resep, dan laporan
- **petugas**: Permissions untuk pasien dan janji temu

### 5. Cara Menggunakan

1. **Akses Menu**: Klik "Permission Settings" di menu Authentication
2. **Kelola Roles**:
   - Klik tab "Roles" untuk melihat daftar roles
   - Klik "Tambah Role" untuk membuat role baru
   - Klik icon edit untuk mengedit role
   - Klik icon hapus untuk menghapus role
3. **Kelola Permissions**:
   - Klik tab "Permissions" untuk melihat daftar permissions
   - Klik "Tambah Permission" untuk membuat permission baru
   - Klik icon edit untuk mengedit permission
   - Klik icon hapus untuk menghapus permission

### 6. Validasi dan Keamanan

- **Role Validation**: Tidak bisa menghapus role yang masih digunakan oleh user
- **Permission Validation**: Tidak bisa menghapus permission yang masih digunakan oleh role
- **Form Validation**: Validasi input form dengan pesan error yang jelas
- **CSRF Protection**: Semua form menggunakan CSRF token

### 7. Responsive Design

- **Desktop**: Tabel dengan kolom lengkap
- **Mobile**: Card view dengan informasi yang relevan
- **Tablet**: Layout yang menyesuaikan ukuran layar

### 8. Error Handling

- **API Errors**: Menampilkan pesan error dari server
- **Network Errors**: Menampilkan pesan error untuk masalah koneksi
- **Validation Errors**: Menampilkan error validasi di form

## Instalasi dan Setup

1. **Jalankan Migration**: `php artisan migrate`
2. **Jalankan Seeder**: `php artisan db:seed --class=PermissionSeeder`
3. **Akses Menu**: Login dan klik "Permission Settings" di menu

## Teknologi yang Digunakan

- **Backend**: Laravel 12, Spatie Laravel Permission
- **Frontend**: React, Inertia.js, Tailwind CSS
- **Icons**: Custom SVG icons
- **State Management**: React hooks (useState, useEffect)
- **API**: RESTful API dengan JSON responses
