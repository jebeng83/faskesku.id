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
      kd_dokter: parsed?.kd_dokter || '',
      kd_poli: parsed?.kd_poli || '',
    };
  } catch (_) {
    return {};
  }
}

export function setRawatJalanFilters(partial) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const current = getRawatJalanFilters();
    const next = {
      kd_dokter: partial?.kd_dokter ?? current.kd_dokter ?? '',
      kd_poli: partial?.kd_poli ?? current.kd_poli ?? '',
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (_) {
    // ignore
  }
}

export function clearRawatJalanFilters() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (_) {
    // ignore
  }
}