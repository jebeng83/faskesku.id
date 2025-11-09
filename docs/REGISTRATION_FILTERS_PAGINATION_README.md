# Filter dan Pagination pada Data Registrasi

## Fitur yang Ditambahkan

### 1. Filter Nama Pasien

- **Input Search**: Field pencarian berdasarkan nama pasien atau nomor RM
- **Debounce**: Delay 500ms untuk menghindari request berlebihan
- **Real-time**: Hasil pencarian langsung muncul saat mengetik

### 2. Filter Status

- **Status Registrasi**: Belum, Sudah, Batal
- **Status Poli**: Baru, Lama
- **Dropdown**: Mudah digunakan dengan dropdown selection

### 3. Pagination

- **15 Data per Halaman**: Optimal untuk performa dan UX
- **Navigation**: Previous/Next buttons dan page numbers
- **Info Pagination**: Menampilkan "X sampai Y dari Z data"
- **Responsive**: Bekerja di mobile dan desktop

### 4. Optimasi Performa

- **Eager Loading**: Hanya load field yang diperlukan
- **Select Specific Fields**: Mengurangi data transfer
- **Loading State**: Indikator loading saat fetch data

## Kode yang Diperbaiki

### Backend (RegistrationController.php)

```php
public function getRegistrations(Request $request)
{
    $query = RegPeriksa::with([
        'pasien:id,no_rkm_medis,nm_pasien,jk,umur,alamat',
        'dokter:id,kd_dokter,nm_dokter',
        'poliklinik:id,kd_poli,nm_poli',
        'penjab:id,kd_pj,png_jawab'
    ]);

    // Filter by date
    if ($request->has('date') && $request->date) {
        $query->where('tgl_registrasi', $request->date);
    } else {
        $query->where('tgl_registrasi', date('Y-m-d'));
    }

    // Filter by polyclinic
    if ($request->has('kd_poli') && $request->kd_poli) {
        $query->where('kd_poli', $request->kd_poli);
    }

    // Filter by doctor
    if ($request->has('kd_dokter') && $request->kd_dokter) {
        $query->where('kd_dokter', $request->kd_dokter);
    }

    // Filter by patient name
    if ($request->has('search') && $request->search) {
        $searchTerm = $request->search;
        $query->whereHas('pasien', function ($q) use ($searchTerm) {
            $q->where('nm_pasien', 'like', "%{$searchTerm}%")
              ->orWhere('no_rkm_medis', 'like', "%{$searchTerm}%");
        });
    }

    // Filter by status
    if ($request->has('status') && $request->status) {
        $query->where('stts', $request->status);
    }

    // Filter by status_poli
    if ($request->has('status_poli') && $request->status_poli) {
        $query->where('status_poli', $request->status_poli);
    }

    $registrations = $query->orderBy('jam_reg', 'desc')
        ->paginate(15);

    return response()->json([
        'success' => true,
        'data' => $registrations
    ]);
}
```

### Frontend (Index.jsx)

#### State Management

```javascript
const [filters, setFilters] = useState({
	date: new Date().toISOString().split("T")[0],
	kd_poli: "",
	kd_dokter: "",
	search: "",
	status: "",
	status_poli: "",
});

const [currentPage, setCurrentPage] = useState(1);
const [isLoading, setIsLoading] = useState(false);
```

#### Load Data dengan Pagination

```javascript
const loadRegistrations = async (page = 1) => {
	setIsLoading(true);
	try {
		const response = await axios.get("/registration/get-registrations", {
			params: { ...filters, page },
		});
		setRegistrationData(response.data.data);
		setStats(calculateStats(response.data.data));
		setCurrentPage(page);
	} catch (error) {
		console.error("Error loading registrations:", error);
	} finally {
		setIsLoading(false);
	}
};
```

#### Debounce untuk Search

```javascript
useEffect(() => {
	const timeoutId = setTimeout(
		() => {
			loadRegistrations(1);
		},
		filters.search ? 500 : 0
	);

	return () => clearTimeout(timeoutId);
}, [filters]);
```

## UI Components

### Filter Section

```jsx
{
	/* Search by Name */
}
<input
	type="text"
	name="search"
	value={filters.search}
	onChange={handleFilterChange}
	placeholder="Cari nama atau nomor RM..."
	className="w-full px-3 py-2 pl-10 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
/>;

{
	/* Status Filter */
}
<select
	name="status"
	value={filters.status}
	onChange={handleFilterChange}
	className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
>
	<option value="">Semua Status</option>
	<option value="Belum">Belum</option>
	<option value="Sudah">Sudah</option>
	<option value="Batal">Batal</option>
</select>;
```

### Pagination Component

```jsx
{
	/* Pagination Info */
}
<div className="text-sm text-gray-600 dark:text-gray-400">
	Menampilkan {registrationData.from || 0} sampai {registrationData.to || 0}{" "}
	dari {registrationData.total || 0} data
</div>;

{
	/* Pagination Controls */
}
<div className="flex items-center space-x-2">
	<motion.button
		onClick={() => loadRegistrations(registrationData.current_page - 1)}
		disabled={!registrationData.prev_page_url}
		className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
	>
		Previous
	</motion.button>

	{/* Page Numbers */}
	{registrationData.links.map((link, index) => (
		<motion.button
			key={index}
			onClick={() => loadRegistrations(parseInt(link.label))}
			className={`px-3 py-2 text-sm font-medium rounded-lg ${
				link.active
					? "bg-blue-600 text-white"
					: "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
			}`}
		>
			{link.label}
		</motion.button>
	))}

	<motion.button
		onClick={() => loadRegistrations(registrationData.current_page + 1)}
		disabled={!registrationData.next_page_url}
		className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
	>
		Next
	</motion.button>
</div>;
```

## Performa Optimasi

### 1. Eager Loading

- Hanya load field yang diperlukan dari relasi
- Mengurangi query N+1 problem
- Mengurangi data transfer

### 2. Pagination

- 15 data per halaman (optimal untuk performa)
- Mengurangi memory usage
- Loading lebih cepat

### 3. Debounce Search

- Delay 500ms untuk search input
- Mengurangi request ke server
- Better user experience

### 4. Loading States

- Indikator loading saat fetch data
- User feedback yang jelas
- Smooth animations

## Database Query Optimization

### Before (N+1 Problem)

```php
// Multiple queries for each registration
$registrations = RegPeriksa::with(['pasien', 'dokter', 'poliklinik', 'penjab'])->get();
// Results in: 1 + N queries (N = number of registrations)
```

### After (Optimized)

```php
// Single query with specific fields
$registrations = RegPeriksa::with([
    'pasien:id,no_rkm_medis,nm_pasien,jk,umur,alamat',
    'dokter:id,kd_dokter,nm_dokter',
    'poliklinik:id,kd_poli,nm_poli',
    'penjab:id,kd_pj,png_jawab'
])->paginate(15);
// Results in: 1 query only
```

## Testing

### Manual Testing

1. **Filter Nama**: Ketik nama pasien di search box
2. **Filter Status**: Pilih status dari dropdown
3. **Pagination**: Klik page numbers atau prev/next
4. **Loading**: Cek loading indicator muncul
5. **Responsive**: Test di mobile dan desktop

### Performance Testing

1. **Load Time**: Cek waktu loading data
2. **Memory Usage**: Monitor memory consumption
3. **Network**: Cek jumlah request ke server
4. **Database**: Monitor query execution time

## Troubleshooting

### Common Issues

1. **Slow Loading**: Cek database indexes
2. **Search Not Working**: Cek query syntax
3. **Pagination Broken**: Cek response format
4. **Memory Issues**: Reduce page size

### Debug Tips

1. Enable query logging: `DB::enableQueryLog()`
2. Check network tab in browser dev tools
3. Monitor Laravel logs
4. Use database query analyzer

## Future Improvements

1. **Caching**: Redis cache untuk data yang sering diakses
2. **Search Index**: Full-text search dengan Elasticsearch
3. **Export**: Export filtered data ke Excel/PDF
4. **Real-time**: WebSocket untuk update real-time
5. **Advanced Filters**: Date range, multiple selections
