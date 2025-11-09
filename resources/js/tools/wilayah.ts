/**
 * Shared utilities for Indonesia wilayah code handling.
 * Centralizes validation and construction to avoid inconsistencies and 404s.
 */

/**
 * Validate wilayah code format: PP.RR.DD.VVVV
 * - PP: 2 digits (province)
 * - RR: 2 digits (regency/city)
 * - DD: 2 digits (district)
 * - VVVV: 4 digits (village)
 */
export const WILAYAH_CODE_REGEX = /^\d{2}\.\d{2}\.\d{2}\.\d{4}$/;

export function isValidWilayahCode(code?: string | null): boolean {
  if (!code || typeof code !== 'string') return false;
  return WILAYAH_CODE_REGEX.test(code.trim());
}

/**
 * Construct a standard wilayah code from kd_* parts.
 * Returns null if parts are missing or lengths are not standard (2/2/2/4).
 */
export function constructKodeWilayah(parts: {
  kd_prop?: string | number | null;
  kd_kab?: string | number | null;
  kd_kec?: string | number | null;
  kd_kel?: string | number | null;
}): string | null {
  const normalize = (val: string | number | null | undefined) => {
    if (val === null || val === undefined) return null;
    const s = String(val).trim();
    // Reject if contains non-digits
    if (!/^\d+$/.test(s)) return null;
    return s;
  };
  const pad = (s: string | null, len: number) => (s ? s.padStart(len, '0') : null);

  const prop = pad(normalize(parts.kd_prop), 2);
  const kab  = pad(normalize(parts.kd_kab), 2);
  const kec  = pad(normalize(parts.kd_kec), 2);
  const kel  = pad(normalize(parts.kd_kel), 4);

  if (!prop || !kab || !kec || !kel) return null;

  const code = `${prop}.${kab}.${kec}.${kel}`;
  return isValidWilayahCode(code) ? code : null;
}

/**
 * Safe attempt to construct kode_wilayah.
 * Falls back to provided kode if already valid.
 */
export function getSafeKodeWilayah(input: {
  kode_wilayah?: string | null;
  kd_prop?: string | number | null;
  kd_kab?: string | number | null;
  kd_kec?: string | number | null;
  kd_kel?: string | number | null;
}): string | null {
  if (isValidWilayahCode(input.kode_wilayah ?? '')) {
    return String(input.kode_wilayah);
  }
  return constructKodeWilayah(input);
}