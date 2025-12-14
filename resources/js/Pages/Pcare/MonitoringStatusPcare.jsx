import React, { useEffect, useMemo, useState } from "react";
import SidebarBriding from "@/Layouts/SidebarBriding";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function MonitoringStatusPcare() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debugOpen, setDebugOpen] = useState(false);
  const [debugLogs, setDebugLogs] = useState([]);
  const [endpointFilter, setEndpointFilter] = useState('');
  const [statusFilterLog, setStatusFilterLog] = useState('');
  const [q, setQ] = useState('');
  const [start, setStart] = useState(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
  });
  const [end, setEnd] = useState(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
  });

  const [sendFlags, setSendFlags] = useState({});
  const [statusAdd, setStatusAdd] = useState({});
  const [descAdd, setDescAdd] = useState({});
  const [statusPanggil, setStatusPanggil] = useState({});
  const [descPanggil, setDescPanggil] = useState({});
  const [statusDaftar, setStatusDaftar] = useState({});
  const [descDaftar, setDescDaftar] = useState({});
  const [statusKunjungan, setStatusKunjungan] = useState({});
  const [descKunjungan, setDescKunjungan] = useState({});

  const csrfToken = typeof document !== 'undefined' ? (document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '') : '';

  const setSendFlag = (no, key, v) => {
    setSendFlags((p) => ({ ...p, [no]: { ...(p[no] || {}), [key]: !!v } }));
  };

  const statusClass = (st) => {
    const s = String(st || '').toLowerCase();
    if (s === 'terkirim' || s === 'ok' || s === 'success') return 'inline-flex px-2 py-0.5 rounded text-xs bg-green-100 text-green-700';
    if (s === 'gagal' || s === 'error' || s === 'failed') return 'inline-flex px-2 py-0.5 rounded text-xs bg-red-100 text-red-700';
    return 'inline-flex px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700';
  };

  const parseDesc = (raw) => {
    try {
      const meta = raw?.metaData || raw?.metadata;
      const code = meta?.code;
      const msg = meta?.message;
      let extra = '';
      if (raw?.response) {
        const r = raw.response;
        const nk = r?.noKunjungan || (Array.isArray(r) ? r[0]?.noKunjungan : undefined);
        const nu = r?.noUrut || (Array.isArray(r) ? r[0]?.noUrut : undefined);
        const field = r?.field;
        const val = r?.value || r?.message;
        if (nk) extra = ` noKunjungan=${nk}`;
        if (nu) extra = `${extra} noUrut=${nu}`.trim();
        if (!nk && !nu && field && val) extra = ` ${field}=${val}`;
      }
      const sCode = (code !== undefined && code !== null) ? String(code) : '';
      const sMsg = (msg !== undefined && msg !== null) ? String(msg) : '';
      return [sCode, sMsg, extra.trim()].filter(Boolean).join(' | ');
    } catch {
      try { return typeof raw === 'string' ? raw : JSON.stringify(raw); } catch { return ''; }
    }
  };

  const fmtDate = (s) => {
    if (!s) return '';
    const parts = String(s).split('-');
    if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
    return s;
  };

  const fmtDateTime = (s) => {
    if (!s) return '';
    const [d, t] = String(s).split(' ');
    const parts = String(d || '').split('-');
    const ddmmyy = parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : (d || '');
    const hhmm = String(t || '').slice(0, 5);
    return hhmm ? `${ddmmyy} ${hhmm}` : ddmmyy;
  };

  const jsonFetch = async (url, opts = {}) => {
    const headers = { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}), ...(opts.headers || {}) };
    const res = await fetch(url, { credentials: 'include', ...opts, headers });
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      try { return await res.json(); } catch { return null; }
    }
    return null;
  };

  const pushDebug = (entry) => {
    try { console.log('PCareDebug', entry); } catch {}
    setDebugLogs((p) => [...p, { ...entry, ts: new Date().toISOString() }]);
  };

  const fetchDebugJson = async (url, opts = {}, label = '') => {
    try {
      const headers = { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}), ...(opts.headers || {}) };
      const res = await fetch(url, { credentials: 'include', ...opts, headers });
      const ct = res.headers.get('content-type') || '';
      const status = res.status;
      const text = await res.text();
      let json = null;
      try { json = JSON.parse(text); } catch {}
      pushDebug({ label, url, status, contentType: ct, isJson: !!json, bodyPreview: String(text).slice(0, 800), keys: json && typeof json === 'object' ? Object.keys(json) : [] });
      return json;
    } catch (e) {
      pushDebug({ label, url, error: String(e?.message || e) });
      return null;
    }
  };

  const load = async () => {
    setLoading(true);
    try {
      const qs = [];
      if (start) qs.push(`start=${encodeURIComponent(start)}`);
      if (end) qs.push(`end=${encodeURIComponent(end)}`);
      if (endpointFilter) qs.push(`endpoint=${encodeURIComponent(endpointFilter)}`);
      if (statusFilterLog) qs.push(`status=${encodeURIComponent(statusFilterLog)}`);
      if (q) qs.push(`q=${encodeURIComponent(q)}`);
      qs.push(`limit=500`);
      const url = `/pcare/api/bpjs-log/list${qs.length ? `?${qs.join('&')}` : ''}`;
      const j = await fetchDebugJson(url, {}, 'GET /pcare/api/bpjs-log/list');
      const list = Array.isArray(j?.data) ? j.data : [];
      setRows(list);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [start, end, endpointFilter, statusFilterLog, q]);

  const rowsMemo = useMemo(() => rows, [rows]);

  const fetchRegByRawat = async (no) => {
    try {
      const j = await fetchDebugJson(`/api/reg-periksa/by-rawat?no_rawat=${encodeURIComponent(no)}`, {}, 'GET /api/reg-periksa/by-rawat');
      if (j?.success) return j.data;
      return null;
    } catch {
      return null;
    }
  };

  const sendAntreanAdd = async (no) => {
    setSendFlag(no, 'add', true);
    try {
      const reg = await fetchRegByRawat(no);
      if (!reg) throw new Error('Data reg_periksa tidak ditemukan');
      const body = {
        no_rkm_medis: String(reg?.no_rkm_medis || ''),
        kd_poli: String(reg?.kd_poli || ''),
        kd_dokter: String(reg?.kd_dokter || ''),
        tanggalperiksa: String(reg?.tgl_registrasi || ''),
        no_reg: String(reg?.no_reg || ''),
      };
      const r = await fetch(`/api/mobilejkn/antrean/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}) },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const j = await r.json().catch(() => ({}));
      const code = j?.metadata?.code ?? j?.metaData?.code;
      const st = Number(code) === 200 ? 'OK' : 'ERROR';
      setStatusAdd((p) => ({ ...p, [no]: st }));
      setDescAdd((p) => ({ ...p, [no]: parseDesc(j) }));
    } catch (e) {
      setStatusAdd((p) => ({ ...p, [no]: 'ERROR' }));
      setDescAdd((p) => ({ ...p, [no]: String(e?.message || 'Error') }));
    }
    setSendFlag(no, 'add', false);
  };

  const sendAntreanPanggil = async (no) => {
    setSendFlag(no, 'panggil', true);
    try {
      const reg = await fetchRegByRawat(no);
      if (!reg) throw new Error('Data reg_periksa tidak ditemukan');
      const body = {
        no_rkm_medis: String(reg?.no_rkm_medis || ''),
        kd_poli: String(reg?.kd_poli || ''),
        status: 1,
        tanggalperiksa: String(reg?.tgl_registrasi || ''),
      };
      const r = await fetch(`/api/mobilejkn/antrean/panggil`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}) },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const j = await r.json().catch(() => ({}));
      const code = j?.metadata?.code ?? j?.metaData?.code;
      const st = Number(code) === 200 ? 'OK' : 'ERROR';
      setStatusPanggil((p) => ({ ...p, [no]: st }));
      setDescPanggil((p) => ({ ...p, [no]: parseDesc(j) }));
    } catch (e) {
      setStatusPanggil((p) => ({ ...p, [no]: 'ERROR' }));
      setDescPanggil((p) => ({ ...p, [no]: String(e?.message || 'Error') }));
    }
    setSendFlag(no, 'panggil', false);
  };

  const sendPendaftaran = async (no) => {
    setSendFlag(no, 'pendaftaran', true);
    try {
      const r = await fetch(`/api/pcare/pendaftaran`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}) },
        credentials: 'include',
        body: JSON.stringify({ no_rawat: String(no) }),
      });
      const j = await r.json().catch(() => ({}));
      const code = j?.metaData?.code ?? j?.metadata?.code;
      const st = Number(code) === 201 ? 'Terkirim' : (Number(code) === 200 ? 'Terkirim' : 'Gagal');
      setStatusDaftar((p) => ({ ...p, [no]: st }));
      setDescDaftar((p) => ({ ...p, [no]: parseDesc(j) }));
    } catch (e) {
      setStatusDaftar((p) => ({ ...p, [no]: 'Gagal' }));
      setDescDaftar((p) => ({ ...p, [no]: String(e?.message || 'Error') }));
    }
    setSendFlag(no, 'pendaftaran', false);
  };

  const sendKunjungan = async (no) => {
    setSendFlag(no, 'kunjungan', true);
    try {
      const pj = await fetchDebugJson(`/api/pcare/kunjungan/preview/${encodeURIComponent(no)}`, {}, 'GET /api/pcare/kunjungan/preview');
      const payload = pj?.payload || null;
      if (!payload) throw new Error('Payload kunjungan tidak tersedia');
      payload.no_rawat = String(no);
      const r = await fetch(`/api/pcare/kunjungan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}) },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const j = await r.json().catch(() => ({}));
      const code = j?.metaData?.code ?? j?.metadata?.code;
      const st = Number(code) === 201 ? 'Terkirim' : (Number(code) === 200 ? 'Terkirim' : 'Gagal');
      setStatusKunjungan((p) => ({ ...p, [no]: st }));
      setDescKunjungan((p) => ({ ...p, [no]: parseDesc(j) }));
    } catch (e) {
      setStatusKunjungan((p) => ({ ...p, [no]: 'Gagal' }));
      setDescKunjungan((p) => ({ ...p, [no]: String(e?.message || 'Error') }));
    }
    setSendFlag(no, 'kunjungan', false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-none mx-auto px-6 py-6">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          <div className="relative px-4 py-3 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Monitoring Status Bridging PCare</h2>
            <div className="flex items-center gap-2">
              <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="h-8 rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 text-sm px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
              <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="h-8 rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 text-sm px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
              <select value={endpointFilter} onChange={(e) => setEndpointFilter(e.target.value)} className="h-8 rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 text-sm px-2">
                <option value="">Semua endpoint</option>
                <option value="Ambil Antrian">Ambil Antrian</option>
                <option value="Panggil Antrian">Panggil Antrian</option>
                <option value="Batal">Batal</option>
                <option value="pendaftaran">pendaftaran</option>
                <option value="kunjungan">kunjungan</option>
              </select>
              <select value={statusFilterLog} onChange={(e) => setStatusFilterLog(e.target.value)} className="h-8 rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 text-sm px-2">
                <option value="">Semua status</option>
                <option value="success">success</option>
                <option value="failed">failed</option>
              </select>
              <input type="text" placeholder="Cari no_rawat" value={q} onChange={(e) => setQ(e.target.value)} className="h-8 rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 text-sm px-2" />
              <button onClick={load} className="h-8 rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 px-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Refresh</button>
              <button onClick={() => setDebugOpen((v) => !v)} className="h-8 rounded-lg border border-indigo-300/60 bg-indigo-50/80 dark:bg-gray-800/80 px-3 text-sm hover:bg-indigo-100 dark:hover:bg-gray-700 transition-colors">{debugOpen ? 'Tutup Debug' : 'Debug'}</button>
            </div>
          </div>
          <div className="relative p-6">
            {debugOpen && (
              <div className="mb-4 rounded-xl border border-indigo-200/60 dark:border-indigo-800/60 bg-indigo-50/40 dark:bg-gray-900/40 p-3">
                <div className="text-sm font-medium mb-2">Debug Logs ({debugLogs.length})</div>
                <div className="max-h-48 overflow-auto text-[11px] bg-white/50 dark:bg-gray-800/50 rounded p-2">
                  {debugLogs.map((d, i) => (
                    <div key={i} className="mb-2">
                      <div className="font-semibold">{d.label || ''}</div>
                      <div>ts: {d.ts}</div>
                      <div>url: {d.url}</div>
                      {d.error ? (
                        <div className="text-red-600">error: {d.error}</div>
                      ) : (
                        <>
                          <div>status: {String(d.status || '')}</div>
                          <div>contentType: {String(d.contentType || '')}</div>
                          <div>isJson: {String(d.isJson || false)}</div>
                          <div>keys: {Array.isArray(d.keys) ? d.keys.join(', ') : ''}</div>
                          <pre className="whitespace-pre-wrap break-all">{String(d.bodyPreview || '')}</pre>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="overflow-x-auto overflow-y-auto max-h-[60vh] rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur">
              <table className="relative w-full text-sm">
                <thead>
                  <tr>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">No</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">Tanggal</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">Endpoint</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">No Rawat</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">Status</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">HTTP</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">metaCode</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">metaMessage</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">Preview</th>
                  </tr>
                </thead>
                <motion.tbody variants={containerVariants} initial="hidden" animate="show">
                  {rowsMemo.map((r, idx) => (
                    <motion.tr key={(r.id ? String(r.id) : '') + (r.no_rawat || idx)} variants={itemVariants} className="border-t border-gray-100/50 dark:border-gray-700/30 odd:bg-white/40 even:bg-white/60 dark:odd:bg-gray-800/40 dark:even:bg-gray-800/60 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-colors">
                      <td className="p-2">{idx + 1}</td>
                      <td className="p-2">{fmtDateTime(r.created_at)}</td>
                      <td className="p-2">{String(r.endpoint || '')}</td>
                      <td className="p-2">{String(r.no_rawat || '')}</td>
                      <td className="p-2">
                        <span className={statusClass(String(r.status || '')) || ''}>{String(r.status || '')}</span>
                      </td>
                      <td className="p-2">{Number(r.http_status || 0)}</td>
                      <td className="p-2">{r.meta_code !== null && r.meta_code !== undefined ? Number(r.meta_code) : ''}</td>
                      <td className="p-2 break-all">{String(r.meta_message || '')}</td>
                      <td className="p-2 break-all">{String(r.response_preview || '').slice(0, 160)}</td>
                    </motion.tr>
                  ))}
                  {rowsMemo.length === 0 && (
                    <tr><td className="p-4 text-center" colSpan={9}>{loading ? 'Memuat...' : 'Tidak ada data'}</td></tr>
                  )}
                </motion.tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

MonitoringStatusPcare.layout = (page) => (
  <SidebarBriding title="Briding Pcare" wide={true}>{page}</SidebarBriding>
);
