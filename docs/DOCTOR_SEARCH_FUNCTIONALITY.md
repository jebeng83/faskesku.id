# Searchable Employee Selection for Doctor Form

## Overview

Fitur pencarian pegawai dengan debounce telah ditambahkan ke form Doctor untuk menangani kasus dimana jumlah pegawai sangat banyak. Fitur ini memberikan pengalaman pengguna yang lebih baik dengan pencarian real-time yang responsif.

## Features Implemented

### 1. **Searchable Dropdown Component**

- Input field dengan search functionality
- Dropdown list yang dapat di-scroll
- Click outside to close dropdown
- Clear selection button

### 2. **Debounced Search (300ms)**

- Mengurangi API calls atau filtering yang berlebihan
- Smooth typing experience tanpa lag
- Loading state selama pencarian berlangsung

### 3. **Dual Search Criteria**

- Search berdasarkan **nama pegawai**
- Search berdasarkan **NIK pegawai**
- Case-insensitive search

### 4. **Visual Enhancements**

- Search icon di sebelah kiri input
- Dropdown chevron dengan rotasi animasi
- Clear button (X) yang muncul saat ada selection/input
- Loading spinner selama pencarian
- Empty state dengan icon dan pesan informatif

### 5. **Keyboard & Mouse Interactions**

- Click to open/close dropdown
- Focus to open dropdown
- Click outside to close
- Hover effects pada dropdown items

## Technical Implementation

### State Management

```javascript
const [employeeSearch, setEmployeeSearch] = useState("");
const [filteredEmployees, setFilteredEmployees] = useState([]);
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [selectedEmployeeName, setSelectedEmployeeName] = useState("");
const [isSearching, setIsSearching] = useState(false);
```

### Debounce Implementation

```javascript
useEffect(() => {
	const timeoutId = setTimeout(() => {
		// Filter logic here
		const filtered = employees.filter(
			(emp) =>
				emp.nama.toLowerCase().includes(search.toLowerCase()) ||
				emp.nik.toLowerCase().includes(search.toLowerCase())
		);
		setFilteredEmployees(filtered);
		setIsSearching(false);
	}, 300);

	return () => clearTimeout(timeoutId);
}, [employeeSearch, availableEmployees]);
```

### Search Logic

- **Nama**: Partial match, case-insensitive
- **NIK**: Partial match, case-insensitive
- **Real-time filtering**: Results update as user types
- **Performance**: Only filters after 300ms delay

## UI Components

### Search Input

- **Icon**: MagnifyingGlass icon di kiri
- **Placeholder**: "Cari pegawai..."
- **Dynamic Value**: Menampilkan search term saat dropdown terbuka, nama terpilih saat tertutup
- **Clear Button**: X icon untuk clear selection

### Dropdown List

- **Max Height**: 240px (15rem) dengan scroll
- **Item Format**:
  - Nama pegawai (bold)
  - NIK: [nik] (smaller, gray text)
- **Hover Effects**: Background color change
- **Empty States**:
  - No employees available
  - No search results found
  - Loading state dengan spinner

### Loading State

- Rotating spinner icon
- "Mencari pegawai..." text
- Appears during 300ms debounce period

### Empty States

- **No Employees**: User icon + "Tidak ada pegawai tersedia"
- **No Results**: User icon + "Tidak ada pegawai ditemukan" + suggestion text
- **Search Suggestion**: "Coba kata kunci lain atau periksa ejaan"

## Performance Optimizations

### 1. **Debouncing (300ms)**

- Prevents excessive filtering during typing
- Reduces computational overhead
- Improves user experience

### 2. **Efficient Filtering**

- Client-side filtering for small datasets
- Simple string includes() method
- Case-insensitive comparison

### 3. **Memory Management**

- Proper cleanup of timeouts
- Event listener cleanup
- State reset on modal close

### 4. **Minimal Re-renders**

- Optimized useEffect dependencies
- Proper state management
- Efficient event handling

## User Experience Features

### 1. **Intuitive Interactions**

- Click anywhere on input to open dropdown
- Click outside to close
- Clear button for easy reset
- Visual feedback for all actions

### 2. **Accessibility**

- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- High contrast icons

### 3. **Responsive Design**

- Works on all screen sizes
- Touch-friendly on mobile
- Proper z-index for overlay
- Scrollable dropdown on small screens

### 4. **Error Prevention**

- Clear visual states
- Helpful empty state messages
- Search suggestions
- Easy recovery from no results

## Testing Scenarios

### Data Volume Testing

- **Small Dataset**: 1-10 pegawai
- **Medium Dataset**: 50-100 pegawai
- **Large Dataset**: 500+ pegawai
- **Performance**: Should remain smooth at all sizes

### Search Testing

- **Exact Name Match**: "Dr. Ahmad Fauzi"
- **Partial Name**: "Ahmad", "Fauzi"
- **NIK Search**: "PEG001", "001"
- **Case Insensitive**: "ahmad", "AHMAD"
- **No Results**: "xyz123"
- **Empty Search**: Should show all

### Interaction Testing

- **Typing Speed**: Fast typing should debounce properly
- **Click Outside**: Should close dropdown
- **Clear Button**: Should reset form and search
- **Selection**: Should auto-fill form and close dropdown

## Future Enhancements

### 1. **Server-Side Search**

- For very large datasets (1000+ employees)
- API endpoint with pagination
- Advanced search filters

### 2. **Advanced Filtering**

- Filter by department
- Filter by job title
- Filter by status (active/inactive)

### 3. **Search History**

- Remember recent searches
- Quick access to previous selections

### 4. **Keyboard Navigation**

- Arrow keys to navigate dropdown
- Enter to select
- Escape to close

## Integration Notes

### Backend Requirements

- `availableEmployees` prop with employee data
- Fields required: `nik`, `nama`, `jk`, `tmp_lahir`, `tgl_lahir`, `alamat`
- Should exclude employees already registered as doctors

### Form Integration

- Auto-fills related form fields upon selection
- Maintains data consistency
- Proper validation integration
- Reset functionality

### Performance Considerations

- Client-side filtering suitable for < 500 employees
- Consider server-side search for larger datasets
- Monitor memory usage with large lists
- Implement virtualization if needed

This implementation provides a robust, user-friendly search experience that scales well with growing employee datasets while maintaining excellent performance and usability.
