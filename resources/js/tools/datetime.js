// Helper functions to get dates/times string based on app timezone

export function getAppTimeZone() {
  const meta = typeof document !== 'undefined' ? document.querySelector('meta[name="app-timezone"]') : null;
  return meta?.getAttribute('content') || 'Asia/Jakarta';
}

export function todayDateString(tz = getAppTimeZone()) {
  // Returns YYYY-MM-DD formatted for the specified timezone
  try {
    return new Date().toLocaleDateString('en-CA', { timeZone: tz });
  } catch {
    // Fallback to local date
    return new Date().toISOString().slice(0, 10);
  }
}

export function nowDateTimeString(tz = getAppTimeZone()) {
  // Returns YYYY-MM-DD HH:mm:ss in specified timezone
  try {
    const d = new Date();
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: tz,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    }).formatToParts(d);
    const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
    const yyyy = map.year; const mm = map.month; const dd = map.day;
    const hh = map.hour; const mi = map.minute; const ss = map.second;
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
  } catch {
    const d = new Date();
    return `${d.toISOString().slice(0,10)} ${d.toTimeString().slice(0,8)}`;
  }
}