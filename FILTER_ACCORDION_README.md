# Filter Accordion - Dokumentasi Fitur

## Overview

Filter section telah dibungkus dengan accordion untuk menghemat space dan memberikan pengalaman pengguna yang lebih baik. Filter dapat di-collapse/expand sesuai kebutuhan.

## Fitur Accordion

### 🎯 **Toggle Button**

- **Icon Filter**: Menampilkan ikon filter yang jelas
- **Label**: "Filter Data Registrasi"
- **Active Filter Count**: Badge yang menampilkan jumlah filter aktif
- **Chevron Icon**: Arrow yang berputar saat expand/collapse
- **Hover Effects**: Scale animation saat hover

### 📊 **Filter Content**

- **Smooth Animation**: Expand/collapse dengan animasi smooth
- **Grid Layout**: 2 baris filter (3 kolom per baris)
- **Responsive**: Menyesuaikan dengan ukuran layar
- **Dark Mode**: Support untuk tema gelap

### 🎛️ **Filter Actions**

- **Filter Status**: Menampilkan jumlah filter aktif
- **Reset Button**: Reset semua filter ke default
- **Close Button**: Tutup accordion setelah selesai

## Implementasi

### State Management

```javascript
const [isFilterExpanded, setIsFilterExpanded] = useState(false);
```

### Toggle Function

```javascript
onClick={() => setIsFilterExpanded(!isFilterExpanded)}
```

### Animation dengan Framer Motion

```jsx
<motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="overflow-hidden"
>
```

## Layout Filter

### Baris 1: Filter Dasar

1. **Tanggal** - Date picker
2. **Poliklinik** - Dropdown selection
3. **Dokter** - Dropdown selection

### Baris 2: Filter Tambahan

1. **Cari Nama Pasien** - Text input dengan search icon
2. **Status** - Dropdown (Belum, Sudah, Batal)
3. **Status Poli** - Dropdown (Baru, Lama)

## Fitur Tambahan

### 🔢 **Active Filter Counter**

```javascript
{
	Object.values(filters).some(
		(value) => value !== "" && value !== new Date().toISOString().split("T")[0]
	) && (
		<span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 rounded-full">
			{
				Object.values(filters).filter(
					(value) =>
						value !== "" && value !== new Date().toISOString().split("T")[0]
				).length
			}
		</span>
	);
}
```

### 🔄 **Reset Filter Function**

```javascript
onClick={() => {
    setFilters({
        date: new Date().toISOString().split("T")[0],
        kd_poli: "",
        kd_dokter: "",
        search: "",
        status: "",
        status_poli: "",
    });
}}
```

### 📱 **Responsive Design**

- **Mobile**: 1 kolom per baris
- **Tablet**: 2 kolom per baris
- **Desktop**: 3 kolom per baris

## Styling

### Toggle Button

```css
className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
```

### Filter Content

```css
className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mt-2"
```

### Action Buttons

```css
// Reset Button
className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"

// Close Button
className="px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors"
```

## Animasi

### 1. **Toggle Animation**

- **Scale**: `whileHover={{ scale: 1.01 }}`
- **Tap**: `whileTap={{ scale: 0.99 }}`

### 2. **Chevron Rotation**

```jsx
<motion.svg
    animate={{ rotate: isFilterExpanded ? 180 : 0 }}
    transition={{ duration: 0.2 }}
>
```

### 3. **Content Animation**

- **Initial**: `opacity: 0, height: 0`
- **Animate**: `opacity: 1, height: "auto"`
- **Exit**: `opacity: 0, height: 0`
- **Duration**: `0.3s` dengan `easeInOut`

### 4. **Stagger Animation**

- **Row 1**: `delay: 0.1s`
- **Row 2**: `delay: 0.2s`
- **Actions**: `delay: 0.3s`

## User Experience

### ✅ **Space Efficiency**

- Filter tersembunyi secara default
- Hanya muncul saat dibutuhkan
- Menghemat vertical space

### ✅ **Visual Feedback**

- Badge counter untuk filter aktif
- Smooth animations
- Clear visual states

### ✅ **Easy Access**

- One-click toggle
- Quick reset function
- Close after use

### ✅ **Responsive**

- Works on all screen sizes
- Touch-friendly on mobile
- Consistent experience

## Accessibility

### 🎯 **Keyboard Navigation**

- Tab navigation support
- Enter/Space untuk toggle
- Escape untuk close

### 🎯 **Screen Reader**

- Proper ARIA labels
- Semantic HTML structure
- Clear button descriptions

### 🎯 **Focus Management**

- Visible focus indicators
- Logical tab order
- Focus trap dalam accordion

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Performance

### ⚡ **Optimizations**

- Lazy rendering dengan AnimatePresence
- Minimal re-renders
- Efficient state updates
- CSS transitions untuk smooth animations

### ⚡ **Bundle Size**

- No additional dependencies
- Uses existing Framer Motion
- Minimal CSS additions

## Testing

### Manual Testing

1. **Toggle Functionality**

   - Click untuk expand/collapse
   - Animation smooth
   - State persists

2. **Filter Operations**

   - All filters work correctly
   - Reset function works
   - Counter updates properly

3. **Responsive Design**

   - Mobile layout
   - Tablet layout
   - Desktop layout

4. **Accessibility**
   - Keyboard navigation
   - Screen reader compatibility
   - Focus management

## Future Enhancements

### 🔮 **Potential Improvements**

1. **Filter Presets**: Save/load filter combinations
2. **Quick Filters**: Common filter shortcuts
3. **Filter History**: Recent filter combinations
4. **Advanced Search**: More search options
5. **Export Filters**: Share filter configurations

## Troubleshooting

### Issue 1: Accordion tidak expand

**Solution**: Cek state `isFilterExpanded` dan event handler

### Issue 2: Animation tidak smooth

**Solution**: Pastikan Framer Motion ter-install dan configured

### Issue 3: Filter counter salah

**Solution**: Cek logic untuk menghitung active filters

### Issue 4: Responsive layout rusak

**Solution**: Cek grid classes dan breakpoints

## Status

✅ **Implemented**: Filter accordion dengan semua fitur
✅ **Tested**: Manual testing completed
✅ **Responsive**: Works on all devices
✅ **Accessible**: Keyboard dan screen reader support
✅ **Performance**: Optimized untuk production

Filter accordion siap digunakan dan memberikan pengalaman pengguna yang lebih baik! 🎉
