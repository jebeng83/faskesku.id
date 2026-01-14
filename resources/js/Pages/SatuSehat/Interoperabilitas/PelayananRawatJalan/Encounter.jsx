import React, { useEffect, useMemo, useState } from "react";
import SidebarBriding from "@/Layouts/SidebarBriding";
import ResponsiveTable from "@/Components/ResponsiveTable";
import axios from "axios";
import Toaster from "@/Components/ui/Toaster";

function dateToYmd(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function combineDateTime(dateStr, timeStr, tz = "+07:00") {
  const t = (timeStr || "").slice(0, 8);
  return `${dateStr}T${t}${tz}`;
}

export default function Encounter() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [kdDokter, setKdDokter] = useState("");
  const [kdPoli, setKdPoli] = useState("");
  const [dokters, setDokters] = useState([]);
  const [polikliniks, setPolikliniks] = useState([]);
  const [locationMap, setLocationMap] = useState({});
  const [orgMap, setOrgMap] = useState({});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resolvingIhs, setResolvingIhs] = useState(false);
  const [postingEncounter, setPostingEncounter] = useState(false);
  const [updatingEncounter, setUpdatingEncounter] = useState(false);

  const [toasts, setToasts] = useState([]);
  const addToast = (type = "info", title = "", message = "", duration = 4000) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const formatError = (err, fallback = "Terjadi kesalahan") => {
    const status = err?.response?.status;
    const data = err?.response?.data || {};
    let detail = data?.detail || data?.message || err?.message || fallback;
    const parts = [];
    if (data?.code) parts.push(`Kode ${data.code}`);
    if (data?.no_rawat) parts.push(`No. Rawat ${data.no_rawat}`);
    if (data?.nip) parts.push(`NIP ${data.nip}`);
    if (data?.nik) parts.push(`NIK ${data.nik}`);
    if (status) parts.push(`Status ${status}`);
    if (parts.length) detail = `${detail} (${parts.join(", ")})`;
    return detail;
  };

  useEffect(() => {
    axios
      .get("/api/dokter", { params: { per_page: 200 } })
      .then((r) => {
        const raw = r?.data?.data;
        const list = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
        setDokters(list);
      })
      .catch(() => {});
    axios
      .get("/pcare/api/rs/poliklinik", { params: { q: "" } })
      .then((r) => {
        const list = Array.isArray(r?.data?.data) ? r.data.data : [];
        setPolikliniks(list);
      })
      .catch(() => {});
    axios
      .get("/api/satusehat/mapping/lokasi", { params: { limit: 500 } })
      .then((r) => {
        const items = r?.data?.list || [];
        const map = {};
        items.forEach((it) => {
          const k = String(it?.kd_poli || "");
          if (k) map[k] = String(it?.id_lokasi_satusehat || "");
        });
        setLocationMap(map);
      })
      .catch(() => {});
    axios
      .get("/api/satusehat/mapping/departemen", { params: { limit: 500 } })
      .then((r) => {
        const items = r?.data?.list || [];
        const map = {};
        items.forEach((it) => {
          const k = String(it?.dep_id || "");
          if (k) map[k] = String(it?.id_organisasi_satusehat || "");
        });
        setOrgMap(map);
      })
      .catch(() => {});
  }, []);

  const dateRange = useMemo(() => {
    if (!startDate && !endDate) return [];
    const s = startDate ? new Date(startDate) : new Date();
    const e = endDate ? new Date(endDate) : s;
    const arr = [];
    const cur = new Date(s.getTime());
    while (cur <= e) {
      arr.push(dateToYmd(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return arr;
  }, [startDate, endDate]);

  async function loadData() {
    setLoading(true);
    try {
      const all = [];
      const dates = dateRange.length ? dateRange : [dateToYmd(new Date())];
      for (const d of dates) {
        const res = await axios.get("/registration/get-registrations", {
          params: {
            date: d,
            kd_poli: kdPoli || undefined,
            kd_dokter: kdDokter || undefined,
            per_page: 100,
          },
        });
        const paged = res?.data?.data;
        const items = Array.isArray(paged?.data) ? paged.data : [];
        items.forEach((reg) => {
          all.push({
            key: `${reg.no_rawat}`,
            no: 0,
            no_rawat: reg.no_rawat,
            tgl_registrasi: reg.tgl_registrasi,
            jam_registrasi: reg.jam_reg,
            pasien_nama: reg?.pasien?.nm_pasien || "",
            pasien_ktp: reg?.pasien?.no_ktp || "",
            pasien_ihs: "",
            dokter_nama: reg?.dokter?.nm_dokter || "",
            dokter_ktp: reg?.dokter?.pegawai?.no_ktp || "",
            dokter_ihs: "",
            poliklinik_nama: reg?.poliklinik?.nm_poli || "",
            kd_poli: reg?.poliklinik?.kd_poli || reg?.kd_poli || "",
            location_id: "",
            departemen: reg?.dokter?.pegawai?.departemen || "",
            organization_id: "",
            enc1_id: "",
            enc2_id: "",
          });
        });
      }
      all.forEach((it, idx) => {
        it.no = idx + 1;
        const loc = locationMap[String(it.kd_poli || "")] || "";
        it.location_id = loc;
        const org = orgMap[String(it.departemen || "")] || "";
        it.organization_id = org;
      });
      setRows(all);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  

  function sortRows(list) {
    const toKey = (r) => `${r.tgl_registrasi || ''}T${String(r.jam_registrasi || '').slice(0,8)}|${String(r.no_rawat || '')}`;
    return [...list].sort((a, b) => toKey(a).localeCompare(toKey(b)));
  }

  function sanitizeNik(n) {
    return String(n || "").replace(/[^0-9]/g, "");
  }

  async function resolveIhsAll() {
    if (rows.length === 0) return;
    setResolvingIhs(true);
    try {
      const ordered = sortRows(rows);
      const next = rows.map((x) => ({ ...x }));
      for (const r of ordered) {
        const idx = next.findIndex((x) => x.key === r.key);
        if (idx < 0) continue;
        let ptId = next[idx].pasien_ihs;
        let prId = next[idx].dokter_ihs;
        const ptNik = sanitizeNik(next[idx].pasien_ktp);
        const prNik = sanitizeNik(next[idx].dokter_ktp);
        if (!ptId && ptNik.length === 16) {
          try {
            const r1 = await axios.get("/api/satusehat/patient", { params: { nik: ptNik } });
            const first = Array.isArray(r1?.data?.list) && r1.data.list.length ? r1.data.list[0] : null;
            ptId = first?.id || "";
          } catch {}
        }
        if (!prId && prNik.length === 16) {
          try {
            const r2 = await axios.get("/api/satusehat/practitioner", { params: { nik: prNik } });
            const first2 = Array.isArray(r2?.data?.list) && r2.data.list.length ? r2.data.list[0] : null;
            prId = first2?.id || "";
          } catch {}
        }
        next[idx] = { ...next[idx], pasien_ihs: ptId, dokter_ihs: prId };
      }
      setRows(next);
      return next;
    } finally {
      setResolvingIhs(false);
    }
  }

  async function postEncounterAll() {
    if (rows.length === 0) return;
    setPostingEncounter(true);
    try {
      const updated = await resolveIhsAll();
      const source = Array.isArray(updated) ? updated : rows;
      const ordered = sortRows(source);
      const next = source.map((x) => ({ ...x }));
      for (const r of ordered) {
        const idx = next.findIndex((x) => x.key === r.key);
        if (idx < 0) continue;
        const cur = next[idx];
        const startIso = combineDateTime(cur.tgl_registrasi, cur.jam_registrasi);
        const ptId = cur.pasien_ihs;
        const prId = cur.dokter_ihs;
        if (!ptId || !prId || !cur.location_id) {
          continue;
        }
        try {
          const rPost = await axios.post("/api/satusehat/rajal/encounter", {
            patient_id: ptId,
            practitioner_id: prId,
            location_id: cur.location_id,
            organization_id: cur.organization_id,
            status: "in-progress",
            class_code: "AMB",
            start: startIso,
            no_rawat: cur.no_rawat,
          });
          const id = rPost?.data?.resource?.id || rPost?.data?.resource?.resource?.id || "";
          next[idx] = { ...cur, enc1_id: id };
          setRows(next.slice());
        } catch {}
      }
    } finally {
      setPostingEncounter(false);
    }
  }

  async function putEncounterAll() {
    if (rows.length === 0) return;
    setUpdatingEncounter(true);
    try {
      const ordered = sortRows(rows);
      const next = rows.slice();
      for (const r of ordered) {
        const idx = next.findIndex((x) => x.key === r.key);
        if (idx < 0) continue;
        const cur = next[idx];
        let encId = cur.enc1_id;
        if (!encId) {
          try {
            const look = await axios.get(`/api/satusehat/rajal/encounter/id-by-rawat/${encodeURIComponent(cur.no_rawat)}`);
            encId = look?.data?.encounter_id || "";
            if (encId) {
              next[idx] = { ...cur, enc1_id: encId };
              setRows(next.slice());
            }
          } catch {}
        }
        if (!encId) continue;
        try {
          const rPut = await axios.put(`/api/satusehat/rajal/encounter/by-rawat/${encodeURIComponent(cur.no_rawat)}`, {
            encounter_id: encId,
            status: "finished",
            tz_offset: "+07:00",
          });
          const id = rPut?.data?.resource?.id || rPut?.data?.resource?.resource?.id || cur.enc1_id;
          next[idx] = { ...cur, enc2_id: id };
          setRows(next.slice());
          try {
            await axios.post(`/api/satusehat/rajal/pipeline/by-rawat/${encodeURIComponent(cur.no_rawat)}`, {
              tz_offset: "+07:00",
            });
          } catch (e) {
            addToast("error", "Pipeline gagal", formatError(e));
          }
        } catch {}
      }
    } finally {
      setUpdatingEncounter(false);
    }
  }

  

  

  const columns = [
    { key: "no", header: "No" },
    { key: "tgl_registrasi", header: "Tanggal" },
    { key: "jam_registrasi", header: "Jam" },
    { key: "pasien_nama", header: "Nama Pasien" },
    { key: "pasien_ktp", header: "No KTP Pasien" },
    { key: "pasien_ihs", header: "IHS Pasien" },
    { key: "dokter_nama", header: "Dokter" },
    { key: "dokter_ktp", header: "No KTP Dokter" },
    { key: "dokter_ihs", header: "IHS Dokter" },
    { key: "poliklinik_nama", header: "Poliklinik" },
    { key: "location_id", header: "ID Location" },
    { key: "departemen", header: "Departemen" },
    { key: "organization_id", header: "ID Organization" },
    { key: "enc1_id", header: "ID Encounter 1" },
    { key: "enc2_id", header: "ID Encounter 2" },
  ];

  return (
    <SidebarBriding title="Interoperabilitas">
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium">Tanggal dari</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-medium">Tanggal sampai</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-medium">Dokter</label>
              <select value={kdDokter} onChange={(e) => setKdDokter(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900">
                <option value="">Semua</option>
                {dokters.map((d) => (
                  <option key={d.kd_dokter} value={d.kd_dokter}>{d.nm_dokter}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Poli</label>
              <select value={kdPoli} onChange={(e) => setKdPoli(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900">
                <option value="">Semua</option>
                {polikliniks.map((p) => (
                  <option key={p.kd_poli} value={p.kd_poli}>{p.nm_poli}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button onClick={loadData} disabled={loading || resolvingIhs || postingEncounter || updatingEncounter} className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50">{loading ? "Memuat..." : "Muat Data"}</button>
            <button onClick={resolveIhsAll} disabled={loading || resolvingIhs || postingEncounter || updatingEncounter} className="px-4 py-2 rounded-md bg-gray-600 text-white disabled:opacity-50">{resolvingIhs ? "Resolving..." : "Resolve IHS"}</button>
            <button onClick={postEncounterAll} disabled={loading || resolvingIhs || postingEncounter || updatingEncounter} className="px-4 py-2 rounded-md bg-green-600 text-white disabled:opacity-50">{postingEncounter ? "Mengirim..." : "Kirim Encounter"}</button>
            <button onClick={putEncounterAll} disabled={loading || resolvingIhs || postingEncounter || updatingEncounter} className="px-4 py-2 rounded-md bg-indigo-600 text-white disabled:opacity-50">{updatingEncounter ? "Mengupdate..." : "Update Encounter"}</button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm">Total: {rows.length}</span>
          </div>
          <ResponsiveTable columns={columns} data={rows} keyField="key" className="min-w-full" />
        </div>
      </div>
      <Toaster toasts={toasts} onRemove={removeToast} />
    </SidebarBriding>
  );
}
