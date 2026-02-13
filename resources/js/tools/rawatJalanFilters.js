// Helper untuk persistensi filter Rawat Jalan di localStorage
// Menangani parsing JSON dan kegagalan storage secara aman.

const STORAGE_KEY = 'rawatJalanFilters';

export function getRawatJalanFilters() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return {};
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return {
      start_date: parsed?.start_date || '',
      end_date: parsed?.end_date || '',
      status: parsed?.status || '',
      status_bayar: parsed?.status_bayar || '',
      nama_pasien: parsed?.nama_pasien || '',
      kd_dokter: parsed?.kd_dokter || '',
      kd_poli: parsed?.kd_poli || '',
    };
  } catch {
    return {};
  }
}

export function setRawatJalanFilters(partial) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const current = getRawatJalanFilters();
    const next = {
      start_date: partial?.start_date ?? current.start_date ?? '',
      end_date: partial?.end_date ?? current.end_date ?? '',
      status: partial?.status ?? current.status ?? '',
      status_bayar: partial?.status_bayar ?? current.status_bayar ?? '',
      nama_pasien: partial?.nama_pasien ?? current.nama_pasien ?? '',
      kd_dokter: partial?.kd_dokter ?? current.kd_dokter ?? '',
      kd_poli: partial?.kd_poli ?? current.kd_poli ?? '',
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function clearRawatJalanFilters() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
