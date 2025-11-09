# Spesialis Module Documentation

## Overview

Module Spesialis adalah sistem manajemen data spesialis medis rumah sakit dengan UI profesional hitam-putih dan layout 50:50. Module ini memungkinkan pengelolaan data spesialis beserta melihat dokter-dokter yang terdaftar dalam setiap spesialis.

## Features

### 1. **CRUD Operations**

- ✅ **Create**: Tambah spesialis baru dengan modal form
- ✅ **Read**: Tampilkan daftar spesialis dan detail
- ✅ **Update**: Edit data spesialis melalui modal
- ✅ **Delete**: Hapus spesialis (dengan validasi tidak memiliki dokter)

### 2. **UI Design**

- 🎨 **Professional Black & White Theme**: Kombinasi warna hitam-putih yang elegan
- 📱 **Responsive Layout**: 50:50 layout dengan daftar kiri dan detail kanan
- ✨ **Smooth Animations**: Implementasi framer-motion untuk transisi halus
- 🔍 **Search Functionality**: Pencarian real-time berdasarkan nama dan kode

### 3. **Layout Structure**

```
┌─────────────────┬─────────────────┐
│   Spesialis     │   Spesialis     │
│     List        │    Detail       │
│   (50% width)   │  (50% width)    │
│                 │                 │
│ - Search        │ - Basic Info    │
│ - List Items    │ - Statistics    │
│ - Actions       │ - Doctor List   │
└─────────────────┴─────────────────┘
```

## Technical Implementation

### Backend Components

#### 1. **SpesialisController**

```php
class SpesialisController extends Controller
{
    // CRUD operations with permission middleware
    // Validation and error handling
    // Relationship loading (with doctors)
}
```

**Methods:**

- `index()`: List all spesialis with related doctors
- `store()`: Create new spesialis
- `show()`: Get specific spesialis details
- `update()`: Update spesialis data
- `destroy()`: Delete spesialis (with validation)

#### 2. **Spesialis Model**

```php
class Spesialis extends Model
{
    protected $table = 'spesialis';
    protected $primaryKey = 'kd_sps';
    public $timestamps = false;
    public $incrementing = false;
    protected $keyType = 'string';

    // Relationship with Doctor
    public function dokter()
    {
        return $this->hasMany(Doctor::class, 'kd_sps', 'kd_sps');
    }
}
```

#### 3. **Database Schema**

```sql
Table: spesialis
- kd_sps (varchar(5), primary key) - Kode spesialis
- nm_sps (varchar(50)) - Nama spesialis
```

#### 4. **Routes**

```php
Route::resource('spesialis', SpesialisController::class);
```

#### 5. **Permissions**

- `view-spesialis`: Melihat daftar spesialis
- `create-spesialis`: Menambah spesialis baru
- `edit-spesialis`: Mengedit data spesialis
- `delete-spesialis`: Menghapus spesialis

### Frontend Components

#### 1. **Spesialis/Index.jsx**

**Main page component dengan fitur:**

- 50:50 layout dengan grid system
- Search functionality dengan real-time filtering
- List management dengan selection state
- Modal handling untuk create/edit
- Delete confirmation dengan validation

**Key Features:**

```javascript
// State management
const [searchTerm, setSearchTerm] = useState("");
const [selectedSpesialis, setSelectedSpesialis] = useState(null);
const [showModal, setShowModal] = useState(false);
const [modalMode, setModalMode] = useState("create");

// Filtering
const filteredSpesialis = spesialis.filter(
	(item) =>
		item.nm_sps.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item.kd_sps.toLowerCase().includes(searchTerm.toLowerCase())
);
```

#### 2. **SpesialisModal.jsx**

**Modal component untuk create/update:**

- Form validation dengan useForm hook
- Dynamic mode (create/edit)
- Professional styling dengan animations
- Input validation dan error handling

**Form Fields:**

- Kode Spesialis (disabled saat edit)
- Nama Spesialis
- Info box dengan guidelines

#### 3. **SpesialisDetail.jsx**

**Detail panel component:**

- Dynamic content berdasarkan selection
- Statistics display (total dokter, aktif, non-aktif)
- Doctor cards dengan informasi lengkap
- Empty states yang informatif

**Sections:**

- Basic Information
- Statistics
- Doctor List (jika ada)
- Empty state (jika belum ada dokter)

## Animations & Interactions

### 1. **Framer Motion Implementation**

```javascript
// Container animations
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1 },
	},
};

// Item animations
const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Card hover effects
const cardVariants = {
	hover: { scale: 1.02, transition: { duration: 0.2 } },
};
```

### 2. **Interactive Elements**

- **Hover Effects**: Scale dan color transitions
- **Button Animations**: Scale pada click/hover
- **Modal Transitions**: Smooth open/close dengan backdrop
- **List Animations**: Stagger children untuk smooth loading
- **Search**: Real-time filtering dengan smooth transitions

### 3. **Loading States**

- Modal loading dengan spinner animation
- Form submission dengan disabled states
- Smooth transitions saat data loading

## UI/UX Features

### 1. **Professional Design**

- **Color Scheme**: Gray-900, Gray-800 untuk dark elements
- **Typography**: Consistent font weights dan sizes
- **Spacing**: Systematic padding dan margins
- **Shadows**: Subtle shadows untuk depth

### 2. **Responsive Layout**

```css
/* Desktop: 50:50 layout */
grid-cols-1 lg:grid-cols-2

/* Mobile: Stacked layout */
Automatic responsive behavior
```

### 3. **Dark Mode Support**

- Full dark mode compatibility
- Dynamic classes berdasarkan theme
- Consistent color schemes across components

### 4. **Accessibility**

- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios

## Data Flow

### 1. **Create Flow**

```
User clicks "Tambah" → Modal opens (create mode) →
User fills form → Submit → POST /spesialis →
Success response → Modal closes → List refreshes
```

### 2. **Edit Flow**

```
User clicks edit icon → Modal opens (edit mode) →
Form pre-filled with data → User modifies → Submit →
PUT /spesialis/{id} → Success response → Modal closes → List refreshes
```

### 3. **Delete Flow**

```
User clicks delete icon → Check if has doctors →
Show confirmation dialog → User confirms →
DELETE /spesialis/{id} → Success response → List refreshes
```

### 4. **View Flow**

```
User clicks spesialis item → Set selected state →
Detail panel updates → Show spesialis info →
Load related doctors → Display statistics
```

## Business Logic

### 1. **Validation Rules**

```php
// Create
'kd_sps' => 'required|string|max:5|unique:spesialis,kd_sps'
'nm_sps' => 'required|string|max:50'

// Update
'nm_sps' => 'required|string|max:50'
// kd_sps tidak bisa diubah
```

### 2. **Delete Constraints**

- Tidak dapat menghapus spesialis yang masih memiliki dokter
- Validasi dilakukan di frontend dan backend
- Error message yang informatif

### 3. **Relationship Management**

- Spesialis hasMany Doctor
- Doctor belongsTo Spesialis
- Eager loading untuk performance

## Seeder Data

### 1. **SpesialisSeeder**

Menyediakan 15 spesialis medis umum:

```php
'SP001' => 'Spesialis Jantung dan Pembuluh Darah'
'SP002' => 'Spesialis Anak'
'SP003' => 'Spesialis Penyakit Dalam'
'SP004' => 'Spesialis Bedah Umum'
'SP005' => 'Spesialis Kandungan dan Kebidanan'
// ... dan lainnya
```

### 2. **Integration dengan Doctor**

- DoctorSeeder updated untuk menggunakan kode spesialis yang benar
- Relasi data yang konsisten
- Foreign key constraints

## Performance Considerations

### 1. **Database Optimization**

- Proper indexing pada primary keys
- Eager loading untuk menghindari N+1 queries
- Efficient relationship queries

### 2. **Frontend Optimization**

- Component memoization where needed
- Efficient state management
- Minimal re-renders
- Optimized animations

### 3. **API Efficiency**

- Single endpoint untuk list dengan relationships
- Minimal data transfer
- Proper HTTP status codes

## Security Features

### 1. **Authentication & Authorization**

- Permission-based access control
- Middleware protection pada semua routes
- Role-based menu visibility

### 2. **Input Validation**

- Frontend dan backend validation
- XSS protection
- SQL injection prevention
- CSRF protection

### 3. **Data Integrity**

- Foreign key constraints
- Proper validation rules
- Error handling

## Testing Scenarios

### 1. **Functional Testing**

- [ ] Create spesialis dengan data valid
- [ ] Edit spesialis existing
- [ ] Delete spesialis tanpa dokter
- [ ] Prevent delete spesialis dengan dokter
- [ ] Search functionality
- [ ] Modal open/close behavior

### 2. **UI Testing**

- [ ] Responsive layout pada berbagai screen sizes
- [ ] Dark mode compatibility
- [ ] Animation smoothness
- [ ] Loading states
- [ ] Error states

### 3. **Permission Testing**

- [ ] Access control berdasarkan role
- [ ] Menu visibility
- [ ] Action button availability
- [ ] API endpoint protection

## Future Enhancements

### 1. **Advanced Features**

- Export data ke Excel/PDF
- Import spesialis dari file
- Advanced search dengan filters
- Bulk operations

### 2. **UI Improvements**

- Drag & drop untuk reordering
- Advanced animations
- Custom themes
- Better mobile experience

### 3. **Integration**

- Integration dengan sistem HIS lain
- API untuk external systems
- Real-time updates dengan WebSockets

This module provides a solid foundation for spesialis management with professional UI, robust functionality, and excellent user experience.
