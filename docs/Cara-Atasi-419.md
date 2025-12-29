# Cara Mengatasi Error 419 (CSRF Token Mismatch)

## Pengenalan

Error 419 adalah error yang terjadi ketika CSRF (Cross-Site Request Forgery) token tidak cocok atau sudah expired. Error ini umum terjadi pada aplikasi Laravel yang menggunakan Sanctum untuk autentikasi stateful.

## Penyebab Umum

1. **CSRF token expired** - Token sudah kadaluarsa karena session expired
2. **Token tidak ter-set dengan benar** - Cookie tidak ter-set setelah refresh
3. **Token tidak terkirim** - Header CSRF tidak terkirim dalam request
4. **Session mismatch** - Session di server berbeda dengan session di client
5. **Race condition** - Multiple request bersamaan menyebabkan token berubah

## Solusi yang Telah Diterapkan

### 1. Menggunakan Axios dengan Interceptor (Recommended)

**Keuntungan:**
- Otomatis handle refresh token dan retry
- Konsisten dengan konfigurasi global di `bootstrap.js`
- Lebih mudah di-maintain

**Implementasi:**

```javascript
import axios from 'axios';

// Refresh CSRF cookie sebelum request
try {
  await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
  await new Promise(resolve => setTimeout(resolve, 300));
} catch (_) {}

// Gunakan axios untuk request
const res = await axios({
  method: 'POST', // atau PUT, DELETE
  url: '/your-endpoint',
  data: payload,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});
```

**Catatan:** Axios interceptor di `bootstrap.js` akan otomatis:
- Mendeteksi error 419
- Refresh CSRF token
- Retry request yang gagal (1x)

### 2. Menggunakan Fetch dengan Manual Retry

**Implementasi:**

```javascript
// Helper function untuk mendapatkan CSRF token
const getCsrfToken = () => {
  // Coba ambil dari cookie XSRF-TOKEN terlebih dahulu
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'XSRF-TOKEN' && value) {
      try {
        return decodeURIComponent(value);
      } catch (_) {
        return value;
      }
    }
  }
  // Fallback ke meta tag
  const metaToken = document.querySelector('meta[name="csrf-token"]');
  return metaToken ? metaToken.getAttribute('content') : '';
};

// Refresh CSRF cookie sebelum request
try {
  await fetch('/sanctum/csrf-cookie', { 
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
  });
  // Tunggu cukup lama untuk memastikan cookie ter-set
  await new Promise(resolve => setTimeout(resolve, 500));
} catch (_) {}

// Ambil token setelah refresh
const csrfToken = getCsrfToken();

// Buat request
let res = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': csrfToken,
    'X-XSRF-TOKEN': csrfToken,
  },
  credentials: 'include',
  body: JSON.stringify(payload),
});

// Jika masih 419, refresh lagi dan retry
if (res.status === 419) {
  try {
    await fetch('/sanctum/csrf-cookie', { 
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    const refreshedToken = getCsrfToken();
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': refreshedToken,
        'X-XSRF-TOKEN': refreshedToken,
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
  } catch (_) {}
}
```

## Konfigurasi Axios di bootstrap.js

File `resources/js/bootstrap.js` sudah dikonfigurasi dengan:

1. **CSRF Token Auto-Detection:**
   ```javascript
   window.axios.defaults.xsrfCookieName = "XSRF-TOKEN";
   window.axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";
   window.axios.defaults.withCredentials = true;
   ```

2. **Response Interceptor untuk Auto-Retry:**
   - Mendeteksi error 419
   - Refresh CSRF token
   - Retry request yang gagal (maksimal 1x)

## Best Practices

### 1. Selalu Refresh Cookie Sebelum Request Penting

```javascript
// Refresh cookie sebelum POST/PUT/DELETE
await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
await new Promise(resolve => setTimeout(resolve, 300));
```

### 2. Gunakan Delay Setelah Refresh Cookie

Cookie perlu waktu untuk ter-set di browser. Delay minimal 300-500ms direkomendasikan.

### 3. Prioritaskan Cookie Token daripada Meta Tag

Cookie `XSRF-TOKEN` lebih akurat karena langsung dari session server.

### 4. Kirim Kedua Header CSRF

```javascript
headers: {
  'X-CSRF-TOKEN': csrfToken,
  'X-XSRF-TOKEN': csrfToken, // Untuk kompatibilitas
}
```

### 5. Pastikan `credentials: 'include'` atau `withCredentials: true`

Ini memastikan cookie dikirim dengan request.

## Troubleshooting

### Masalah: Masih 419 setelah refresh cookie

**Solusi:**
1. Pastikan delay setelah refresh cookie cukup (minimal 300ms)
2. Pastikan `credentials: 'include'` atau `withCredentials: true` digunakan
3. Pastikan cookie `XSRF-TOKEN` benar-benar ter-set di browser (cek di DevTools)
4. Pastikan session masih valid di server

### Masalah: Token selalu berbeda

**Solusi:**
1. Jangan refresh cookie terlalu sering
2. Pastikan tidak ada multiple request bersamaan yang menyebabkan race condition
3. Gunakan axios interceptor untuk handle retry otomatis

### Masalah: Cookie tidak ter-set

**Solusi:**
1. Pastikan domain dan path cookie benar
2. Pastikan tidak ada masalah CORS
3. Pastikan `SameSite` attribute cookie sesuai kebutuhan
4. Cek di browser DevTools > Application > Cookies

## Contoh Implementasi Lengkap

### Menggunakan Axios (Recommended)

```javascript
import axios from 'axios';

const performSave = async () => {
  try {
    // 1. Refresh CSRF cookie sebelum request
    try {
      await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (_) {}
    
    // 2. Buat request menggunakan axios
    const res = await axios({
      method: 'POST',
      url: '/your-endpoint',
      data: payload,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    
    // 3. Handle success
    console.log('Success:', res.data);
  } catch (e) {
    // Axios interceptor sudah handle 419, jadi error ini biasanya bukan 419
    const errorMessage = e?.response?.data?.message || 
                        e?.message || 
                        'Terjadi kesalahan';
    console.error('Error:', errorMessage);
  }
};
```

### Menggunakan Fetch (Manual)

```javascript
const performSave = async () => {
  try {
    // 1. Helper function untuk mendapatkan token
    const getCsrfToken = () => {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'XSRF-TOKEN' && value) {
          try {
            return decodeURIComponent(value);
          } catch (_) {
            return value;
          }
        }
      }
      const metaToken = document.querySelector('meta[name="csrf-token"]');
      return metaToken ? metaToken.getAttribute('content') : '';
    };
    
    // 2. Refresh CSRF cookie
    try {
      await fetch('/sanctum/csrf-cookie', { 
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
      });
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (_) {}
    
    // 3. Ambil token
    const csrfToken = getCsrfToken();
    
    // 4. Buat request
    let res = await fetch('/your-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrfToken,
        'X-XSRF-TOKEN': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    
    // 5. Handle 419 dengan retry
    if (res.status === 419) {
      await fetch('/sanctum/csrf-cookie', { credentials: 'include' });
      await new Promise(resolve => setTimeout(resolve, 500));
      const refreshedToken = getCsrfToken();
      res = await fetch('/your-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': refreshedToken,
          'X-XSRF-TOKEN': refreshedToken,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
    }
    
    // 6. Handle response
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Request failed');
    }
    console.log('Success:', json);
  } catch (e) {
    console.error('Error:', e.message);
  }
};
```

## File yang Sudah Diperbaiki

1. **`resources/js/Pages/Registration/Index.jsx`**
   - Menggunakan axios dengan interceptor
   - Refresh cookie sebelum POST request
   - Retry logic untuk handle 419

2. **`resources/js/Pages/RawatJalan/NewComponen/NewCpptSoap.jsx`**
   - Menggunakan axios untuk POST/PUT/DELETE
   - Refresh cookie sebelum request penting
   - Error handling yang lebih baik

## Referensi

- [Laravel CSRF Protection](https://laravel.com/docs/csrf)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)

## Catatan Penting

1. **Jangan hardcode token** - Selalu ambil dari cookie atau meta tag
2. **Jangan skip delay** - Cookie perlu waktu untuk ter-set
3. **Gunakan axios jika memungkinkan** - Lebih mudah dan konsisten
4. **Test di berbagai browser** - Cookie handling bisa berbeda
5. **Monitor log server** - Untuk debugging masalah session

