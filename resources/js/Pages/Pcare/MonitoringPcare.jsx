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

const todayInput = (() => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
})();

export default function MonitoringPcare() {
  const [summary, setSummary] = useState({ success: 0, failed: 0 });
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState([]);
  const [start, setStart] = useState(todayInput);
  const [end, setEnd] = useState(todayInput);
  const [resendingNo, setResendingNo] = useState("");
  const [debugOpen, setDebugOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState({ queued: null, raw: null, status: "", noKunjungan: "", metaCode: "", metaMessage: "" });
  const [sortKey, setSortKey] = useState('tglDaftar');
  const [sortOrder, setSortOrder] = useState('asc');
  const [massSending, setMassSending] = useState(false);
  const [massModalOpen, setMassModalOpen] = useState(false);
  const [massLogs, setMassLogs] = useState([]);
  const [kunjunganSending, setKunjunganSending] = useState(false);
  const [kunjunganModalOpen, setKunjunganModalOpen] = useState(false);
  const [kunjunganLogs, setKunjunganLogs] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const qs = [];
      if (start) qs.push(`start=${encodeURIComponent(start)}`);
      if (end) qs.push(`end=${encodeURIComponent(end)}`);
      const s = await fetch(`/pcare/api/pendaftaran/summary${qs.length ? `?${qs.join('&')}` : ''}`, { headers: { Accept: "application/json" }, credentials: 'include' });
      const sj = await s.json();
      setSummary({ success: sj.success || 0, failed: sj.failed || 0 });
      const qa = [];
      if (statusFilter) qa.push(`status=${encodeURIComponent(statusFilter)}`);
      if (start) qa.push(`start=${encodeURIComponent(start)}`);
      if (end) qa.push(`end=${encodeURIComponent(end)}`);
      const a = await fetch(`/pcare/api/pendaftaran/list${qa.length ? `?${qa.join('&')}` : ""}`, { headers: { Accept: "application/json" }, credentials: 'include' });
      const aj = await a.json();
      setAttempts(Array.isArray(aj?.data) ? aj.data : []);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [statusFilter, start, end]);

  const toggleSel = (no) => {
    setSelected((prev) => (prev.includes(no) ? prev.filter((x) => x !== no) : [...prev, no]));
  };

  const csrfToken = typeof document !== 'undefined' ? (document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '') : '';


  const sendPendaftaranWithResponse = async (no) => {
    try {
      const body = { no_rawat: String(no) };
      const r = await fetch(`/api/pcare/pendaftaran`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}) }, credentials: 'include', body: JSON.stringify(body) });
      const text = await r.text();
      let json = null;
      try { json = JSON.parse(text); } catch {}
      const code = json?.metaData?.code ?? json?.metadata?.code;
      const ok = Number(code) === 201 || Number(code) === 200;
      return { ok, requestBody: body, response: json ?? text };
    } catch (e) {
      return { ok: false, requestBody: { no_rawat: String(no) }, response: String(e?.message || e) };
    }
  };

  const resendFailedPendaftaran = async () => {
    const targets = rows
      .filter((r) => String(r.status) === 'Gagal')
      .map((r) => r.no_rawat)
      .filter(Boolean)
      .sort((a, b) => String(a).localeCompare(String(b)));
    if (!targets.length) {
      setMassLogs((p) => [...p, { no_rawat: '-', status: 'none', requestBody: null, response: 'Tidak ada entri dengan status Gagal' }]);
      setMassSending(false);
      return;
    }
    try {
      for (const no of targets) {
        setMassLogs((p) => [...p, { no_rawat: String(no), status: 'sending', requestBody: { no_rawat: String(no) }, response: null }]);
        const result = await sendPendaftaranWithResponse(no);
        setMassLogs((p) => p.map((log) => log.no_rawat === String(no) ? { ...log, status: result.ok ? 'success' : 'failed', requestBody: result.requestBody, response: result.response } : log));
        await new Promise((res) => setTimeout(res, 300));
      }
      load();
    } finally {
      setMassSending(false);
    }
  };

  const sendKunjunganWithResponse = async (no) => {
    try {
      const prev = await fetch(`/api/pcare/kunjungan/preview/${encodeURIComponent(no)}`, { headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'include' });
      const pj = await prev.json().catch(() => ({}));
      const payload = pj?.payload || {};
      const body = { ...payload, no_rawat: String(no) };
      const issues = [];
      if (!body.noKartu) issues.push('noKartu');
      if (!body.kdPoli) issues.push('kdPoli');
      if (!body.kdDokter) issues.push('kdDokter');
      if (!body.kdDiag1) issues.push('kdDiag1');
      if (issues.length) {
        return { ok: false, requestBody: body, response: `Payload tidak lengkap: ${issues.join(', ')}` };
      }
      const tglIso = typeof body.tglDaftar === 'string' ? body.tglDaftar : '';
      if (/^\d{4}-\d{2}-\d{2}$/.test(tglIso)) {
        const dt = new Date(tglIso);
        const dd = String(dt.getDate()).padStart(2, '0');
        const mm = String(dt.getMonth() + 1).padStart(2, '0');
        const yy = dt.getFullYear();
        body.tglDaftar = `${dd}-${mm}-${yy}`;
      }
      const vTacc = body.kdTacc;
      if (vTacc === undefined || vTacc === null || vTacc === '' || vTacc === 0 || vTacc === '0' || vTacc === -1 || vTacc === '-1') {
        body.kdTacc = -1;
        body.alasanTacc = null;
      }
      if (body.rujukLanjut && typeof body.rujukLanjut === 'object') {
        const rl = body.rujukLanjut;
        const hasKppk = !!rl.kdppk;
        const hasSub = rl.subSpesialis && typeof rl.subSpesialis === 'object' && (!!rl.subSpesialis.kdSubSpesialis1 || !!rl.subSpesialis.kdSubSpesialis);
        const hasDate = !!rl.tglEstRujuk;
        if (!hasKppk || !hasSub || !hasDate) {
          delete body.rujukLanjut;
        } else {
          const t = String(rl.tglEstRujuk || '');
          if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
            const d = new Date(t);
            const ddd = String(d.getDate()).padStart(2, '0');
            const mmm = String(d.getMonth() + 1).padStart(2, '0');
            const yyy = d.getFullYear();
            rl.tglEstRujuk = `${ddd}-${mmm}-${yyy}`;
          }
          if (rl.khusus === null || rl.khusus === '') delete rl.khusus;
          body.rujukLanjut = rl;
        }
      }
      const r = await fetch(`/api/pcare/kunjungan`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}) }, credentials: 'include', body: JSON.stringify(body) });
      const text = await r.text();
      let json = null;
      try { json = JSON.parse(text); } catch {}
      const code = json?.metaData?.code ?? json?.metadata?.code;
      const ok = Number(code) === 201 || Number(code) === 200;
      if (!ok && !json && r.status >= 400) {
        return { ok: false, requestBody: body, response: `HTTP ${r.status}: ${text}` };
      }
      return { ok, requestBody: body, response: json ?? text };
    } catch (e) {
      return { ok: false, requestBody: { no_rawat: String(no) }, response: String(e?.message || e) };
    }
  };

  const makeKunjungan = async () => {
    setKunjunganModalOpen(true);
    setKunjunganLogs([]);
    setKunjunganSending(true);
    const targets = (selected.length ? [...selected] : rows.filter((r) => String(r.status) === 'Terkirim').map((r) => r.no_rawat).filter(Boolean))
      .sort((a, b) => String(a).localeCompare(String(b)));
    if (!targets.length) {
      setKunjunganLogs((p) => [...p, { no_rawat: '-', status: 'none', requestBody: null, response: 'Tidak ada entri dengan status Terkirim' }]);
      setKunjunganSending(false);
      return;
    }
    try {
      for (const no of targets) {
        setKunjunganLogs((p) => [...p, { no_rawat: String(no), status: 'sending', requestBody: { no_rawat: String(no) }, response: null }]);
        const result = await sendKunjunganWithResponse(no);
        setKunjunganLogs((p) => p.map((log) => log.no_rawat === String(no) ? { ...log, status: result.ok ? 'success' : 'failed', requestBody: result.requestBody, response: result.response } : log));
        await new Promise((res) => setTimeout(res, 300));
      }
      load();
    } finally {
      setKunjunganSending(false);
    }
  };

  const resend = async (no) => {
    setResendingNo(no);
    try {
      const r = await fetch(`/pcare/api/resend/${encodeURIComponent(no)}`, { method: "POST", headers: { "X-Requested-With": "XMLHttpRequest", ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}) }, credentials: 'include' });
      const j = await r.json().catch(() => ({}));
      setDebugInfo((prev) => ({ ...prev, queued: !!j?.queued }));
      setDebugOpen(true);
      for (let i = 0; i < 10; i++) {
        await new Promise((res) => setTimeout(res, 1000));
        const m = await fetch(`/pcare/api/monitoring/raw/${encodeURIComponent(no)}`, { headers: { Accept: "application/json" }, credentials: 'include' });
        const mj = await m.json().catch(() => ({}));
        const data = mj?.data || {};
        let raw = null;
        try { raw = data?.raw ? JSON.parse(data.raw) : null; } catch { raw = data?.raw || null; }
        const status = String(data?.status || "");
        let nk = raw && typeof raw === 'object' ? (raw.noKunjungan || (raw.response?.noKunjungan) || "") : "";
        if (!nk && data?.noKunjungan) nk = String(data.noKunjungan);
        const metaCode = raw && typeof raw === 'object' && raw.metaData ? String(raw.metaData.code || "") : "";
        const metaMessage = raw && typeof raw === 'object' && raw.metaData ? String(raw.metaData.message || "") : "";
        setDebugInfo({ queued: !!j?.queued, raw, status, noKunjungan: String(nk || ""), metaCode, metaMessage });
        if (status === 'sent' || status === 'Terkirim' || status === 'failed' || status === 'Gagal') break;
      }
    } catch {}
    setResendingNo("");
    load();
  };

  const massSend = async () => {
    setMassModalOpen(true);
    setMassLogs([]);
    setMassSending(true);
    if (selected.length) {
      try {
        for (const no of selected) {
          setMassLogs((p) => [...p, { no_rawat: String(no), status: 'sending', requestBody: { no_rawat: String(no) }, response: null }]);
          const result = await sendPendaftaranWithResponse(no);
          setMassLogs((p) => p.map((log) => log.no_rawat === String(no) ? { ...log, status: result.ok ? 'success' : 'failed', requestBody: result.requestBody, response: result.response } : log));
          await new Promise((res) => setTimeout(res, 300));
        }
        setSelected([]);
        load();
      } finally {
        setMassSending(false);
      }
      return;
    }
    await resendFailedPendaftaran();
  };

  const rows = useMemo(() => {
    const arr = Array.isArray(attempts) ? [...attempts] : [];
    const key = sortKey;
    const toVal = (obj) => {
      const v = obj ? obj[key] : undefined;
      if (key === 'tglDaftar') {
        return v ? new Date(v) : new Date(0);
      }
      if (key === 'noUrut') {
        const n = Number(v);
        return Number.isNaN(n) ? 0 : n;
      }
      return v != null ? String(v).toLowerCase() : '';
    };
    arr.sort((a, b) => {
      const va = toVal(a);
      const vb = toVal(b);
      let cmp = 0;
      if (va instanceof Date && vb instanceof Date) {
        cmp = va - vb;
      } else if (typeof va === 'number' && typeof vb === 'number') {
        cmp = va - vb;
      } else {
        cmp = va < vb ? -1 : va > vb ? 1 : 0;
      }
      return sortOrder === 'asc' ? cmp : -cmp;
    });
    return arr;
  }, [attempts, sortKey, sortOrder]);

  const fmtDate = (s) => {
    if (!s) return '';
    const parts = String(s).split('-');
    if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
    return s;
  };

  const statusClass = (st) => {
    if (st === 'Terkirim') return 'inline-flex px-2 py-0.5 rounded text-xs bg-green-100 text-green-700';
    if (st === 'Gagal') return 'inline-flex px-2 py-0.5 rounded text-xs bg-red-100 text-red-700';
    return 'inline-flex px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-none mx-auto px-6 py-6">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          <div className="relative px-4 py-3 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Monitoring Pengiriman PCare</h2>
            <div className="flex flex-wrap items-center gap-2 justify-end">
              <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="h-8 w-full sm:w-auto rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 text-sm px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
              <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="h-8 w-full sm:w-auto rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 text-sm px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-8 w-full sm:w-auto rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 text-sm px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
                <option value="">Semua</option>
                <option value="Terkirim">Terkirim</option>
                <option value="Gagal">Gagal</option>
              </select>
              <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} className="h-8 w-full sm:w-auto rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 text-sm px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
                <option value="tglDaftar">Tanggal</option>
                <option value="noUrut">No Urut</option>
                <option value="no_rawat">No Rawat</option>
                <option value="nm_pasien">Nama</option>
                <option value="kdPoli">Poli</option>
                <option value="nmPoli">Nama Poli</option>
              </select>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="h-8 w-full sm:w-auto rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 text-sm px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </select>
              <button onClick={load} className="h-8 w-full sm:w-auto rounded-lg border border-gray-300/60 bg-white/80 dark:bg-gray-800/80 px-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Refresh</button>
              <button onClick={massSend} disabled={massSending || kunjunganSending} className={`h-8 w-full sm:w-auto rounded-lg px-3 text-sm text-white transition-colors ${massSending ? 'bg-indigo-400' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500'}`}>{massSending ? 'Mengirim…' : 'Kirim Massal'}</button>
              <button onClick={makeKunjungan} disabled={kunjunganSending || massSending} className={`h-8 w-full sm:w-auto rounded-lg px-3 text-sm text-white transition-colors ${kunjunganSending ? 'bg-emerald-400' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'}`}>{kunjunganSending ? 'Mengirim…' : 'Jadikan Kunjungan'}</button>
            </div>
          </div>
          <div className="relative p-6">
            <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div variants={itemVariants} className="rounded-xl border border-white/30 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur p-4 shadow-sm">
                <div className="text-xs text-slate-600 dark:text-slate-400">Berhasil</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{summary.success}</div>
              </motion.div>
              <motion.div variants={itemVariants} className="rounded-xl border border-white/30 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur p-4 shadow-sm">
                <div className="text-xs text-slate-600 dark:text-slate-400">Gagal</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{summary.failed}</div>
              </motion.div>
            </div>
            <div className="overflow-x-auto overflow-y-auto sm:max-h-[60vh] max-h-[52vh] rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur">
              <table className="relative w-full text-sm">
                <thead>
                  <tr>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 hidden sm:table-cell">Pilih</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">Tanggal</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">No Rawat</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">Nama (No RM)</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 hidden md:table-cell">Poli</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 hidden md:table-cell">Nama Poli</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 hidden md:table-cell">No Urut</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">Status</th>
                    <th className="sticky top-0 z-10 px-3 py-2 text-left font-medium bg-gradient-to-r from-gray-50/80 via-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">Aksi</th>
                  </tr>
                </thead>
                <motion.tbody variants={containerVariants} initial="hidden" animate="show">
                  {rows.map((r) => (
                    <motion.tr key={r.no_rawat} variants={itemVariants} className="border-t border-gray-100/50 dark:border-gray-700/30 odd:bg-white/40 even:bg-white/60 dark:odd:bg-gray-800/40 dark:even:bg-gray-800/60 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-colors">
                      <td className="p-2 hidden sm:table-cell"><input type="checkbox" checked={selected.includes(r.no_rawat)} onChange={() => toggleSel(r.no_rawat)} /></td>
                      <td className="p-2">{fmtDate(r.tglDaftar)}</td>
                      <td className="p-2">{r.no_rawat || ''}</td>
                      <td className="p-2">{(r.nm_pasien || '') + (r.no_rkm_medis ? ` (${r.no_rkm_medis})` : '')}</td>
                      <td className="p-2 hidden md:table-cell">{r.kdPoli || ''}</td>
                      <td className="p-2 hidden md:table-cell">{r.nmPoli || ''}</td>
                      <td className="p-2 hidden md:table-cell">{r.noUrut || ''}</td>
                      <td className="p-2"><span className={statusClass(r.status)}>{r.status || ''}</span></td>
                      <td className="p-2">
                        <button onClick={() => resend(r.no_rawat)} disabled={r.status === 'Terkirim' || resendingNo === r.no_rawat} className="inline-flex items-center gap-2 border rounded px-2 py-1 disabled:opacity-50 w-full sm:w-auto">
                          {resendingNo === r.no_rawat ? (
                            <span className="inline-block w-3 h-3 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
                          ) : null}
                          <span>Kirim Ulang</span>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                  {rows.length === 0 && (
                    <tr><td className="p-4 text-center" colSpan={9}>{loading ? 'Memuat...' : 'Tidak ada data'}</td></tr>
                  )}
                </motion.tbody>
              </table>
            </div>
          <div className="mt-4">
            {debugOpen && (
              <div className="rounded-xl border border-white/30 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold">Debug Resend</div>
                  <button onClick={() => setDebugOpen(false)} className="text-xs rounded px-2 py-1 border">Tutup</button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><div className="text-xs text-slate-600 dark:text-slate-400">Queued</div><div className="font-mono">{String(!!debugInfo.queued)}</div></div>
                  <div><div className="text-xs text-slate-600 dark:text-slate-400">Status</div><div className="font-mono">{debugInfo.status || ''}</div></div>
                  <div><div className="text-xs text-slate-600 dark:text-slate-400">No Kunjungan</div><div className="font-mono">{debugInfo.noKunjungan || ''}</div></div>
                  <div><div className="text-xs text-slate-600 dark:text-slate-400">metaData.code</div><div className="font-mono">{debugInfo.metaCode || ''}</div></div>
                  <div><div className="text-xs text-slate-600 dark:text-slate-400">metaData.message</div><div className="font-mono break-all">{debugInfo.metaMessage || ''}</div></div>
                </div>
                <div className="mt-3">
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Raw Response</div>
                  <pre className="text-xs leading-relaxed p-3 rounded bg-slate-50/70 dark:bg-gray-900/40 border border-slate-200/50 dark:border-gray-700/50 overflow-auto max-h-64">{debugInfo.raw ? JSON.stringify(debugInfo.raw, null, 2) : 'Tidak ada data'}</pre>
                </div>
              </div>
            )}
            {massModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/30" onClick={() => setMassModalOpen(false)} />
                <div className="relative w-[90vw] max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl border border-white/30 dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/95 shadow-xl">
                  <div className="px-4 py-3 border-b border-gray-200/60 dark:border-gray-700/60 flex items-center justify-between">
                    <div className="text-sm font-semibold">Proses Kirim Massal</div>
                    <button onClick={() => setMassModalOpen(false)} className="text-xs rounded px-2 py-1 border">Tutup</button>
                  </div>
                  <div className="p-4 overflow-auto" style={{ maxHeight: '70vh' }}>
                    {massLogs.length === 0 ? (
                      <div className="text-sm text-slate-600 dark:text-slate-300">Menunggu proses…</div>
                    ) : (
                      <div className="space-y-3">
                        {massLogs.map((log) => (
                          <div key={log.no_rawat} className="rounded-lg border border-slate-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium">No Rawat: {log.no_rawat}</div>
                              <span className={`text-xs px-2 py-0.5 rounded ${log.status === 'success' ? 'bg-green-100 text-green-700' : log.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'}`}>{log.status}</span>
                            </div>
                            <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">Payload</div>
                            <pre className="text-xs p-2 rounded bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 overflow-auto">{JSON.stringify(log.requestBody, null, 2)}</pre>
                            <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">Response</div>
                            <pre className="text-xs p-2 rounded bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 overflow-auto">{typeof log.response === 'string' ? log.response : JSON.stringify(log.response ?? null, null, 2)}</pre>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {kunjunganModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/30" onClick={() => setKunjunganModalOpen(false)} />
                <div className="relative w-[90vw] max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl border border-white/30 dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/95 shadow-xl">
                  <div className="sticky top-0 z-20 px-4 py-3 border-b border-gray-200/60 dark:border-gray-700/60 flex items-center justify-between bg-white/95 dark:bg-gray-800/95 backdrop-blur">
                    <div className="text-sm font-semibold">Proses Jadikan Kunjungan</div>
                    <button onClick={() => setKunjunganModalOpen(false)} aria-label="Tutup" title="Tutup" className="inline-flex items-center justify-center h-7 w-7 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">✕</button>
                  </div>
                  <div className="p-4 overflow-auto" style={{ maxHeight: '70vh' }}>
                    {kunjunganLogs.length === 0 ? (
                      <div className="text-sm text-slate-600 dark:text-slate-300">Menunggu proses…</div>
                    ) : (
                      <div className="space-y-3">
                        {kunjunganLogs.map((log) => (
                          <div key={log.no_rawat} className="rounded-lg border border-slate-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium">No Rawat: {log.no_rawat}</div>
                              <span className={`text-xs px-2 py-0.5 rounded ${log.status === 'success' ? 'bg-green-100 text-green-700' : log.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'}`}>{log.status}</span>
                            </div>
                            <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">Payload</div>
                            <pre className="text-xs p-2 rounded bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 overflow-auto">{JSON.stringify(log.requestBody, null, 2)}</pre>
                            <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">Response</div>
                            <pre className="text-xs p-2 rounded bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 overflow-auto">{typeof log.response === 'string' ? log.response : JSON.stringify(log.response ?? null, null, 2)}</pre>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

MonitoringPcare.layout = (page) => (
  <SidebarBriding title="Briding Pcare" wide={true}>{page}</SidebarBriding>
);
