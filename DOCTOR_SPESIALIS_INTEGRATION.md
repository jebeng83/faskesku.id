# Doctor Spesialis Integration Documentation

## Overview

Fitur searchable dropdown untuk spesialis telah ditambahkan ke form Doctor, sama seperti form pilih pegawai. Ini memungkinkan user untuk memilih spesialis dokter dari dropdown yang dapat dicari dengan debounce functionality.

## Changes Made

### 1. **Backend Changes**

#### **DoctorController.php**

```php
// Added import
use App\Models\Spesialis;

// Updated index method
public function index()
{
    $doctors = Doctor::with('pegawai')->get();

    // Get employees that are not yet registered as doctors
    $availableEmployees = Employee::whereNotIn('nik', function ($query) {
        $query->select('kd_dokter')->from('dokter');
    })->select('nik', 'nama', 'jk', 'tmp_lahir', 'tgl_lahir', 'alamat')
        ->get();

    // Get all spesialis for dropdown
    $spesialisList = Spesialis::select('kd_sps', 'nm_sps')->get();

    return Inertia::render('Doctor/Index', [
        'doctors' => $doctors,
        'availableEmployees' => $availableEmployees,
        'spesialisList' => $spesialisList  // Added this
    ]);
}
```

**Key Changes:**

- ✅ Added `Spesialis` model import
- ✅ Fetch all spesialis data (`kd_sps`, `nm_sps`)
- ✅ Pass `spesialisList` to frontend component

### 2. **Frontend Changes**

#### **Doctor/Index.jsx**

```javascript
// Updated component props
export default function Index({ doctors, availableEmployees, spesialisList }) {

// Updated DoctorModal props
<DoctorModal
    show={showModal}
    onClose={() => setShowModal(false)}
    mode={modalMode}
    doctor={modalMode === "edit" ? selectedDoctor : null}
    availableEmployees={availableEmployees}
    spesialisList={spesialisList}  // Added this
/>
```

**Key Changes:**

- ✅ Added `spesialisList` to component props
- ✅ Pass `spesialisList` to `DoctorModal`

#### **DoctorModal.jsx**

**Major Updates:**

**1. Component Props:**

```javascript
export default function DoctorModal({
    show,
    onClose,
    mode,
    doctor,
    availableEmployees,
    spesialisList,  // Added this
}) {
```

**2. State Management:**

```javascript
// Employee search functionality states
const [employeeSearch, setEmployeeSearch] = useState("");
const [filteredEmployees, setFilteredEmployees] = useState(
	availableEmployees || []
);
const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
const [selectedEmployeeName, setSelectedEmployeeName] = useState("");
const [isEmployeeSearching, setIsEmployeeSearching] = useState(false);
const employeeSearchTimeoutRef = useRef(null);
const employeeDropdownRef = useRef(null);

// Spesialis search functionality states - NEW
const [spesialisSearch, setSpesialisSearch] = useState("");
const [filteredSpesialis, setFilteredSpesialis] = useState(spesialisList || []);
const [isSpesialisDropdownOpen, setIsSpesialisDropdownOpen] = useState(false);
const [selectedSpesialisName, setSelectedSpesialisName] = useState("");
const [isSpesialisSearching, setIsSpesialisSearching] = useState(false);
const spesialisSearchTimeoutRef = useRef(null);
const spesialisDropdownRef = useRef(null);
```

**3. Debounced Search Effects:**

```javascript
// Debounced spesialis search effect - NEW
useEffect(() => {
	if (spesialisSearchTimeoutRef.current) {
		clearTimeout(spesialisSearchTimeoutRef.current);
	}

	if (spesialisSearch.trim()) {
		setIsSpesialisSearching(true);
	}

	spesialisSearchTimeoutRef.current = setTimeout(() => {
		if (!spesialisSearch.trim()) {
			setFilteredSpesialis(spesialisList || []);
			setIsSpesialisSearching(false);
		} else {
			const filtered = (spesialisList || []).filter(
				(spesialis) =>
					spesialis.nm_sps
						.toLowerCase()
						.includes(spesialisSearch.toLowerCase()) ||
					spesialis.kd_sps.toLowerCase().includes(spesialisSearch.toLowerCase())
			);
			setFilteredSpesialis(filtered);
			setIsSpesialisSearching(false);
		}
	}, 300);

	return () => {
		if (spesialisSearchTimeoutRef.current) {
			clearTimeout(spesialisSearchTimeoutRef.current);
		}
	};
}, [spesialisSearch, spesialisList]);
```

**4. Click Outside Handler:**

```javascript
// Handle click outside spesialis dropdown - NEW
useEffect(() => {
	const handleClickOutside = (event) => {
		if (
			spesialisDropdownRef.current &&
			!spesialisDropdownRef.current.contains(event.target)
		) {
			setIsSpesialisDropdownOpen(false);
		}
	};

	if (isSpesialisDropdownOpen) {
		document.addEventListener("mousedown", handleClickOutside);
	}

	return () => {
		document.removeEventListener("mousedown", handleClickOutside);
	};
}, [isSpesialisDropdownOpen]);
```

**5. Spesialis Selection Handler:**

```javascript
const handleSpesialisSelect = (spesialisKode) => {
	if (!spesialisKode) {
		// Clear spesialis if no selection
		setData({
			...data,
			kd_sps: "",
		});
		setSelectedSpesialisName("");
		setSpesialisSearch("");
		setIsSpesialisDropdownOpen(false);
		return;
	}

	const selectedSpesialis = spesialisList.find(
		(sps) => sps.kd_sps === spesialisKode
	);
	if (selectedSpesialis) {
		// Set spesialis data
		setData({
			...data,
			kd_sps: selectedSpesialis.kd_sps,
		});

		// Update UI states
		setSelectedSpesialisName(
			`${selectedSpesialis.nm_sps} (${selectedSpesialis.kd_sps})`
		);
		setSpesialisSearch("");
		setIsSpesialisDropdownOpen(false);
	}
};
```

**6. Updated Reset Logic:**

```javascript
// Reset search states when modal opens/closes
useEffect(() => {
	if (show) {
		setEmployeeSearch("");
		setIsEmployeeDropdownOpen(false);
		setSpesialisSearch(""); // NEW
		setIsSpesialisDropdownOpen(false); // NEW

		if (mode === "edit" && doctor) {
			setSelectedEmployeeName(`${doctor.nm_dokter} (${doctor.kd_dokter})`);
			// Find and set spesialis name for edit mode - NEW
			const currentSpesialis = spesialisList?.find(
				(sps) => sps.kd_sps === doctor.kd_sps
			);
			if (currentSpesialis) {
				setSelectedSpesialisName(
					`${currentSpesialis.nm_sps} (${currentSpesialis.kd_sps})`
				);
			} else {
				setSelectedSpesialisName("");
			}
		} else {
			setSelectedEmployeeName("");
			setSelectedSpesialisName(""); // NEW
		}
	}
}, [show, mode, doctor, spesialisList]);
```

**7. New Form Field:**

```javascript
{
	/* Kode Spesialisasi */
}
<div>
	<label className="block text-sm font-medium text-gray-700 mb-2">
		Spesialisasi
	</label>
	<div className="relative" ref={spesialisDropdownRef}>
		{/* Search Input */}
		<motion.div
			variants={inputVariants}
			className={`relative w-full border rounded-lg transition-all ${
				errors.kd_sps ? "border-red-500" : "border-gray-300"
			}`}
		>
			<div className="flex items-center">
				<MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-400" />
				<input
					type="text"
					value={
						isSpesialisDropdownOpen ? spesialisSearch : selectedSpesialisName
					}
					onChange={(e) => {
						setSpesialisSearch(e.target.value);
						if (!isSpesialisDropdownOpen) setIsSpesialisDropdownOpen(true);
					}}
					onFocus={() => setIsSpesialisDropdownOpen(true)}
					className="w-full pl-10 pr-16 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-lg"
					placeholder="Cari spesialis..."
				/>
				<div className="absolute right-2 flex items-center gap-1">
					{(selectedSpesialisName || spesialisSearch) && (
						<button
							type="button"
							onClick={() => handleSpesialisSelect("")}
							className="p-1 hover:bg-gray-100 rounded transition-colors"
							title="Clear selection"
						>
							<XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
						</button>
					)}
					<button
						type="button"
						onClick={() => setIsSpesialisDropdownOpen(!isSpesialisDropdownOpen)}
						className="p-1 hover:bg-gray-100 rounded transition-colors"
					>
						<ChevronDownIcon
							className={`h-5 w-5 text-gray-400 transition-transform ${
								isSpesialisDropdownOpen ? "rotate-180" : ""
							}`}
						/>
					</button>
				</div>
			</div>
		</motion.div>

		{/* Dropdown List */}
		<AnimatePresence>
			{isSpesialisDropdownOpen && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
					className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
				>
					{isSpesialisSearching ? (
						<div className="px-4 py-3 text-gray-500 text-center flex items-center justify-center gap-2">
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
								className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full"
							/>
							Mencari spesialis...
						</div>
					) : filteredSpesialis.length === 0 ? (
						<div className="px-4 py-3 text-gray-500 text-center">
							<div className="flex flex-col items-center gap-2">
								<UserIcon className="h-8 w-8 text-gray-300" />
								<span className="font-medium">
									{spesialisSearch
										? "Tidak ada spesialis ditemukan"
										: "Tidak ada spesialis tersedia"}
								</span>
								{spesialisSearch && (
									<span className="text-sm">
										Coba kata kunci lain atau periksa ejaan
									</span>
								)}
							</div>
						</div>
					) : (
						filteredSpesialis.map((spesialis) => (
							<motion.button
								key={spesialis.kd_sps}
								type="button"
								onClick={() => handleSpesialisSelect(spesialis.kd_sps)}
								className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0"
								whileHover={{ backgroundColor: "#f9fafb" }}
							>
								<div className="flex flex-col">
									<span className="font-medium text-gray-900">
										{spesialis.nm_sps}
									</span>
									<span className="text-sm text-gray-500">
										Kode: {spesialis.kd_sps}
									</span>
								</div>
							</motion.button>
						))
					)}
				</motion.div>
			)}
		</AnimatePresence>
	</div>
	{errors.kd_sps && (
		<motion.p
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			className="text-red-600 text-sm mt-1"
		>
			{errors.kd_sps}
		</motion.p>
	)}
</div>;
```

## Features Implemented

### 1. **Searchable Dropdown**

- 🔍 **Real-time Search**: Search berdasarkan nama atau kode spesialis
- ⚡ **Debounced Search**: 300ms delay untuk performa optimal
- 🎯 **Dual Criteria**: Search nama spesialis dan kode spesialis

### 2. **User Experience**

- 📱 **Responsive Design**: Bekerja di semua ukuran layar
- 🎨 **Smooth Animations**: Framer-motion untuk transisi halus
- 🔄 **Loading States**: Spinner animasi saat pencarian
- ❌ **Clear Selection**: Button X untuk reset pilihan

### 3. **Visual Indicators**

- 🔍 **Search Icon**: Magnifying glass di kiri input
- 🔽 **Dropdown Arrow**: Chevron dengan rotasi animasi
- 🎯 **Selected State**: Menampilkan nama terpilih saat dropdown tertutup
- 📝 **Placeholder**: "Cari spesialis..." untuk guidance

### 4. **Error Handling**

- ⚠️ **Validation Errors**: Red border dan error message
- 🚫 **Empty States**: Pesan informatif saat tidak ada hasil
- 🔄 **Search Suggestions**: Saran saat pencarian tidak ditemukan
- 🛡️ **Error Prevention**: Proper state management

### 5. **Performance Optimizations**

- ⏱️ **Debouncing**: Mengurangi excessive filtering
- 🧹 **Memory Management**: Proper cleanup timeouts dan event listeners
- 🔄 **Efficient Updates**: Minimal re-renders
- 📊 **Client-side Filtering**: Fast response untuk dataset kecil-menengah

## User Workflow

### **Create Mode:**

1. User clicks "Tambah Dokter"
2. Modal opens dengan form kosong
3. User dapat memilih pegawai (auto-fill data personal)
4. User dapat memilih spesialis dari searchable dropdown
5. User melengkapi data lainnya
6. Submit form dengan data lengkap

### **Edit Mode:**

1. User clicks edit icon pada dokter
2. Modal opens dengan data pre-filled
3. Spesialis yang sudah terpilih ditampilkan
4. User dapat mengubah spesialis jika diperlukan
5. Submit perubahan

### **Search Experience:**

1. User clicks pada dropdown spesialis
2. Dropdown terbuka dengan daftar semua spesialis
3. User mengetik untuk search (nama atau kode)
4. Results ter-filter real-time dengan debounce
5. User memilih spesialis dari hasil
6. Dropdown tertutup dan pilihan tersimpan

## Technical Benefits

### **1. Consistency**

- Same UX pattern sebagai employee selection
- Consistent search behavior across form
- Unified styling dan animations

### **2. Scalability**

- Dapat handle ratusan spesialis dengan performa baik
- Debounced search mencegah lag
- Memory efficient dengan proper cleanup

### **3. Maintainability**

- Clean separation of concerns
- Reusable patterns untuk dropdown lain
- Well-documented state management

### **4. User Experience**

- Intuitive search interface
- Fast and responsive interactions
- Clear visual feedback
- Error prevention dan recovery

## Integration Notes

### **Database Requirements**

- `spesialis` table dengan `kd_sps` dan `nm_sps`
- Relationship: `dokter.kd_sps` → `spesialis.kd_sps`
- Proper foreign key constraints

### **Backend Requirements**

- Spesialis model dengan proper relationships
- Controller method untuk fetch spesialis list
- Validation rules untuk `kd_sps`

### **Frontend Requirements**

- Framer-motion untuk animations
- Heroicons untuk icons
- Proper state management
- Event handling untuk dropdown interactions

This implementation provides a seamless, professional user experience for selecting doctor specializations, matching the quality and functionality of the employee selection feature.
