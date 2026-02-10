import React, { useEffect, useMemo, useState } from 'react';
import SidebarBriding from '@/Layouts/SidebarBriding';

const toDdMmYy = (htmlDate) => {
  if (!htmlDate) return '';
  const [y, m, d] = String(htmlDate).split('-');
  if (!y || !m || !d) return String(htmlDate);
  return `${d}-${m}-${y}`;
};

const toHtmlDate = (ddmmyyyy) => {
  const v = String(ddmmyyyy || '').trim();
  if (!v) return '';
  const m = v.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!m) return v;
  return `${m[3]}-${m[2]}-${m[1]}`;
};

const getCsrfToken = () => {
  try {
    const el = document.querySelector('meta[name="csrf-token"]');
    return el?.getAttribute('content') || '';
  } catch (_) {
    return '';
  }
};

const normalizeTglPelayananForPayload = (value) => {
  const v = String(value || '').trim();
  if (!v) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return toDdMmYy(v);
  return v;
};

const intOrZero = (value) => {
  const n = Number.parseInt(String(value || '').trim(), 10);
  return Number.isFinite(n) ? n : 0;
};

const initialForm = {
  kdMCU: '0',
  noKunjungan: '',
  kdProvider: '',
  tglPelayanan: '',
  tekananDarahSistole: '',
  tekananDarahDiastole: '',
  radiologiFoto: '',
  darahRutinHemo: '',
  darahRutinLeu: '',
  darahRutinErit: '',
  darahRutinLaju: '',
  darahRutinHema: '',
  darahRutinTrom: '',
  lemakDarahHDL: '',
  lemakDarahLDL: '',
  lemakDarahChol: '',
  lemakDarahTrigli: '',
  gulaDarahSewaktu: '',
  gulaDarahPuasa: '',
  gulaDarahPostPrandial: '',
  gulaDarahHbA1c: '',
  fungsiHatiSGOT: '',
  fungsiHatiSGPT: '',
  fungsiHatiGamma: '',
  fungsiHatiProtKual: '',
  fungsiHatiAlbumin: '',
  fungsiGinjalCrea: '',
  fungsiGinjalUreum: '',
  fungsiGinjalAsam: '',
  fungsiJantungABI: '',
  fungsiJantungEKG: '',
  fungsiJantungEcho: '',
  funduskopi: '',
  pemeriksaanLain: '',
  keterangan: '',
};

export default function Mcu() {
  const [noRawat, setNoRawat] = useState('');
  const [noKunjunganQuery, setNoKunjunganQuery] = useState('');
  const [form, setForm] = useState(initialForm);
  const [loadingLookup, setLoadingLookup] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [mcuList, setMcuList] = useState([]);

  const fieldGroups = useMemo(() => {
    const mk = (key, label, type = 'number', placeholder) => ({ key, label, type, placeholder });
    return [
      {
        title: 'Kunjungan',
        fields: [
          mk('kdMCU', 'KD MCU', 'number', '0'),
          mk('noKunjungan', 'No. Kunjungan', 'text'),
          mk('kdProvider', 'KD Provider', 'text'),
          mk('tglPelayanan', 'Tanggal Pelayanan', 'date'),
        ],
      },
      {
        title: 'Tanda Vital & Radiologi',
        fields: [
          mk('tekananDarahSistole', 'Tekanan Darah Sistole'),
          mk('tekananDarahDiastole', 'Tekanan Darah Diastole'),
          mk('radiologiFoto', 'Radiologi Foto', 'text'),
        ],
      },
      {
        title: 'Darah Rutin',
        fields: [
          mk('darahRutinHemo', 'Hemoglobin'),
          mk('darahRutinLeu', 'Leukosit'),
          mk('darahRutinErit', 'Eritrosit'),
          mk('darahRutinLaju', 'Laju Endap Darah'),
          mk('darahRutinHema', 'Hematokrit'),
          mk('darahRutinTrom', 'Trombosit'),
        ],
      },
      {
        title: 'Lemak Darah',
        fields: [
          mk('lemakDarahHDL', 'HDL'),
          mk('lemakDarahLDL', 'LDL'),
          mk('lemakDarahChol', 'Kolesterol Total'),
          mk('lemakDarahTrigli', 'Trigliserida'),
        ],
      },
      {
        title: 'Gula Darah',
        fields: [
          mk('gulaDarahSewaktu', 'Gula Darah Sewaktu'),
          mk('gulaDarahPuasa', 'Gula Darah Puasa'),
          mk('gulaDarahPostPrandial', 'Gula Darah Post Prandial'),
          mk('gulaDarahHbA1c', 'HbA1c'),
        ],
      },
      {
        title: 'Fungsi Hati',
        fields: [
          mk('fungsiHatiSGOT', 'SGOT'),
          mk('fungsiHatiSGPT', 'SGPT'),
          mk('fungsiHatiGamma', 'Gamma GT'),
          mk('fungsiHatiProtKual', 'Protein Kualitatif'),
          mk('fungsiHatiAlbumin', 'Albumin'),
        ],
      },
      {
        title: 'Fungsi Ginjal',
        fields: [
          mk('fungsiGinjalCrea', 'Kreatinin'),
          mk('fungsiGinjalUreum', 'Ureum'),
          mk('fungsiGinjalAsam', 'Asam Urat'),
        ],
      },
      {
        title: 'Fungsi Jantung',
        fields: [
          mk('fungsiJantungABI', 'ABI'),
          mk('fungsiJantungEKG', 'EKG', 'text'),
          mk('fungsiJantungEcho', 'ECHO', 'text'),
        ],
      },
      {
        title: 'Catatan',
        fields: [
          mk('funduskopi', 'Funduskopi', 'text'),
          mk('pemeriksaanLain', 'Pemeriksaan Lain', 'text'),
          mk('keterangan', 'Keterangan', 'text'),
        ],
      },
    ];
  }, []);

  useEffect(() => {
    const loadKdProvider = async () => {
      try {
        const res = await fetch('/api/pcare/config/kd-provider', {
          headers: { Accept: 'application/json' },
        });
        const json = await res.json();
        const kd = json?.kd_provider || json?.data?.kd_provider || json?.response?.kd_provider || '';
        if (kd) {
          setForm((prev) => ({ ...prev, kdProvider: prev.kdProvider || String(kd) }));
        }
      } catch (_) {}
    };
    loadKdProvider();
  }, []);

  const applyMcuItemToForm = (item, noKunjunganFallback) => {
    const src = item || {};
    setForm((prev) => ({
      ...prev,
      kdMCU: String(src?.kdMCU ?? prev.kdMCU ?? '0'),
      noKunjungan: String(src?.noKunjungan ?? noKunjunganFallback ?? prev.noKunjungan ?? ''),
      kdProvider: String(src?.kdProvider ?? prev.kdProvider ?? ''),
      tglPelayanan: toHtmlDate(src?.tglPelayanan ?? prev.tglPelayanan ?? ''),
      tekananDarahSistole: String(src?.tekananDarahSistole ?? prev.tekananDarahSistole ?? ''),
      tekananDarahDiastole: String(src?.tekananDarahDiastole ?? prev.tekananDarahDiastole ?? ''),
      radiologiFoto: String(src?.radiologiFoto ?? prev.radiologiFoto ?? ''),
      darahRutinHemo: String(src?.darahRutinHemo ?? prev.darahRutinHemo ?? ''),
      darahRutinLeu: String(src?.darahRutinLeu ?? prev.darahRutinLeu ?? ''),
      darahRutinErit: String(src?.darahRutinErit ?? prev.darahRutinErit ?? ''),
      darahRutinLaju: String(src?.darahRutinLaju ?? prev.darahRutinLaju ?? ''),
      darahRutinHema: String(src?.darahRutinHema ?? prev.darahRutinHema ?? ''),
      darahRutinTrom: String(src?.darahRutinTrom ?? prev.darahRutinTrom ?? ''),
      lemakDarahHDL: String(src?.lemakDarahHDL ?? prev.lemakDarahHDL ?? ''),
      lemakDarahLDL: String(src?.lemakDarahLDL ?? prev.lemakDarahLDL ?? ''),
      lemakDarahChol: String(src?.lemakDarahChol ?? prev.lemakDarahChol ?? ''),
      lemakDarahTrigli: String(src?.lemakDarahTrigli ?? prev.lemakDarahTrigli ?? ''),
      gulaDarahSewaktu: String(src?.gulaDarahSewaktu ?? prev.gulaDarahSewaktu ?? ''),
      gulaDarahPuasa: String(src?.gulaDarahPuasa ?? prev.gulaDarahPuasa ?? ''),
      gulaDarahPostPrandial: String(src?.gulaDarahPostPrandial ?? prev.gulaDarahPostPrandial ?? ''),
      gulaDarahHbA1c: String(src?.gulaDarahHbA1c ?? prev.gulaDarahHbA1c ?? ''),
      fungsiHatiSGOT: String(src?.fungsiHatiSGOT ?? prev.fungsiHatiSGOT ?? ''),
      fungsiHatiSGPT: String(src?.fungsiHatiSGPT ?? prev.fungsiHatiSGPT ?? ''),
      fungsiHatiGamma: String(src?.fungsiHatiGamma ?? prev.fungsiHatiGamma ?? ''),
      fungsiHatiProtKual: String(src?.fungsiHatiProtKual ?? prev.fungsiHatiProtKual ?? ''),
      fungsiHatiAlbumin: String(src?.fungsiHatiAlbumin ?? prev.fungsiHatiAlbumin ?? ''),
      fungsiGinjalCrea: String(src?.fungsiGinjalCrea ?? prev.fungsiGinjalCrea ?? ''),
      fungsiGinjalUreum: String(src?.fungsiGinjalUreum ?? prev.fungsiGinjalUreum ?? ''),
      fungsiGinjalAsam: String(src?.fungsiGinjalAsam ?? prev.fungsiGinjalAsam ?? ''),
      fungsiJantungABI: String(src?.fungsiJantungABI ?? prev.fungsiJantungABI ?? ''),
      fungsiJantungEKG: String(src?.fungsiJantungEKG ?? prev.fungsiJantungEKG ?? ''),
      fungsiJantungEcho: String(src?.fungsiJantungEcho ?? prev.fungsiJantungEcho ?? ''),
      funduskopi: String(src?.funduskopi ?? prev.funduskopi ?? ''),
      pemeriksaanLain: String(src?.pemeriksaanLain ?? prev.pemeriksaanLain ?? ''),
      keterangan: String(src?.keterangan ?? prev.keterangan ?? ''),
    }));
  };

  const doLookupNoKunjungan = async () => {
    setLoadingLookup(true);
    setError(null);
    setMessage(null);
    try {
      const raw = String(noRawat || '').trim();
      if (!raw) {
        setError('No. Rawat wajib diisi untuk mencari No. Kunjungan.');
        return;
      }
      const res = await fetch(`/api/pcare/kunjungan/nokunjungan/${encodeURIComponent(raw)}`, {
        headers: { Accept: 'application/json' },
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.metaData?.message || json?.message || `Gagal mengambil No. Kunjungan (Status: ${res.status})`);
        return;
      }
      const no = json?.noKunjungan || json?.data?.noKunjungan || json?.response?.noKunjungan || '';
      if (!no) {
        setError('No. Kunjungan tidak ditemukan dari log PCare.');
        return;
      }
      setNoKunjunganQuery(String(no));
      setMessage(`No. Kunjungan ditemukan: ${no}`);
    } catch (e) {
      setError(e?.message || 'Terjadi kesalahan jaringan');
    } finally {
      setLoadingLookup(false);
    }
  };

  const doFetchMcu = async () => {
    setLoadingLookup(true);
    setError(null);
    setMessage(null);
    setMcuList([]);
    try {
      const noKunjungan = String(noKunjunganQuery || '').trim();
      if (!noKunjungan) {
        setError('No. Kunjungan wajib diisi.');
        return;
      }
      const res = await fetch(`/api/pcare/mcu/kunjungan/${encodeURIComponent(noKunjungan)}`, {
        headers: { Accept: 'application/json' },
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.metaData?.message || json?.message || `Gagal mengambil MCU (Status: ${res.status})`);
        return;
      }
      const list = json?.response?.list || json?.list || [];
      setMcuList(Array.isArray(list) ? list : []);
      if (Array.isArray(list) && list.length > 0) {
        applyMcuItemToForm(list[0], noKunjungan);
        setMessage(`Data MCU ditemukan (${list.length}). Ditampilkan item pertama.`);
      } else {
        applyMcuItemToForm(null, noKunjungan);
        setMessage('Data MCU belum ada. Silakan input dan simpan.');
      }
    } catch (e) {
      setError(e?.message || 'Terjadi kesalahan jaringan');
    } finally {
      setLoadingLookup(false);
    }
  };

  const doSubmit = async () => {
    setLoadingSubmit(true);
    setError(null);
    setMessage(null);
    try {
      const payload = {
        kdMCU: intOrZero(form.kdMCU),
        noKunjungan: String(form.noKunjungan || '').trim(),
        kdProvider: String(form.kdProvider || '').trim(),
        tglPelayanan: normalizeTglPelayananForPayload(form.tglPelayanan),
        tekananDarahSistole: intOrZero(form.tekananDarahSistole),
        tekananDarahDiastole: intOrZero(form.tekananDarahDiastole),
        radiologiFoto: String(form.radiologiFoto || ''),
        darahRutinHemo: intOrZero(form.darahRutinHemo),
        darahRutinLeu: intOrZero(form.darahRutinLeu),
        darahRutinErit: intOrZero(form.darahRutinErit),
        darahRutinLaju: intOrZero(form.darahRutinLaju),
        darahRutinHema: intOrZero(form.darahRutinHema),
        darahRutinTrom: intOrZero(form.darahRutinTrom),
        lemakDarahHDL: intOrZero(form.lemakDarahHDL),
        lemakDarahLDL: intOrZero(form.lemakDarahLDL),
        lemakDarahChol: intOrZero(form.lemakDarahChol),
        lemakDarahTrigli: intOrZero(form.lemakDarahTrigli),
        gulaDarahSewaktu: intOrZero(form.gulaDarahSewaktu),
        gulaDarahPuasa: intOrZero(form.gulaDarahPuasa),
        gulaDarahPostPrandial: intOrZero(form.gulaDarahPostPrandial),
        gulaDarahHbA1c: intOrZero(form.gulaDarahHbA1c),
        fungsiHatiSGOT: intOrZero(form.fungsiHatiSGOT),
        fungsiHatiSGPT: intOrZero(form.fungsiHatiSGPT),
        fungsiHatiGamma: intOrZero(form.fungsiHatiGamma),
        fungsiHatiProtKual: intOrZero(form.fungsiHatiProtKual),
        fungsiHatiAlbumin: intOrZero(form.fungsiHatiAlbumin),
        fungsiGinjalCrea: intOrZero(form.fungsiGinjalCrea),
        fungsiGinjalUreum: intOrZero(form.fungsiGinjalUreum),
        fungsiGinjalAsam: intOrZero(form.fungsiGinjalAsam),
        fungsiJantungABI: intOrZero(form.fungsiJantungABI),
        fungsiJantungEKG: String(form.fungsiJantungEKG || ''),
        fungsiJantungEcho: String(form.fungsiJantungEcho || ''),
        funduskopi: String(form.funduskopi || ''),
        pemeriksaanLain: String(form.pemeriksaanLain || ''),
        keterangan: String(form.keterangan || ''),
      };

      if (!payload.noKunjungan) {
        setError('No. Kunjungan wajib diisi sebelum menyimpan.');
        return;
      }

      const csrf = getCsrfToken();
      const res = await fetch('/api/pcare/mcu', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(csrf ? { 'X-CSRF-TOKEN': csrf } : {}),
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.metaData?.message || json?.message || `Gagal menyimpan MCU (Status: ${res.status})`);
        return;
      }
      setMessage(json?.metaData?.message || 'MCU berhasil disimpan.');
    } catch (e) {
      setError(e?.message || 'Terjadi kesalahan jaringan');
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white p-5 shadow">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold">MCU (Medical Check Up) - PCare</h1>
              <p className="text-sm opacity-90">Cek MCU berdasarkan No. Kunjungan dan input hasil pemeriksaan.</p>
            </div>
            <a href="/pcare" className="text-xs underline decoration-white/50">← Menu PCare</a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm lg:col-span-1">
          <div className="text-sm font-semibold text-slate-800">Pencarian</div>
          <div className="mt-3">
            <div className="text-xs text-slate-500 mb-1">No. Rawat (opsional, untuk cari No. Kunjungan)</div>
            <input
              value={noRawat}
              onChange={(e) => setNoRawat(e.target.value)}
              placeholder="2026/02/10/000001"
              className="w-full rounded-md border-slate-300 text-sm"
            />
            <button
              type="button"
              onClick={doLookupNoKunjungan}
              disabled={loadingLookup}
              className="mt-2 w-full rounded-md bg-slate-900 text-white text-sm py-2 disabled:opacity-60"
            >
              {loadingLookup ? 'Memuat…' : 'Cari No. Kunjungan'}
            </button>
          </div>

          <div className="mt-4">
            <div className="text-xs text-slate-500 mb-1">No. Kunjungan</div>
            <input
              value={noKunjunganQuery}
              onChange={(e) => setNoKunjunganQuery(e.target.value)}
              placeholder="NoKunjungan dari BPJS"
              className="w-full rounded-md border-slate-300 text-sm"
            />
            <button
              type="button"
              onClick={doFetchMcu}
              disabled={loadingLookup}
              className="mt-2 w-full rounded-md bg-emerald-600 text-white text-sm py-2 disabled:opacity-60"
            >
              {loadingLookup ? 'Memuat…' : 'Ambil Data MCU'}
            </button>
          </div>

          {error && <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          {message && <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{message}</div>}

          {Array.isArray(mcuList) && mcuList.length > 1 && (
            <div className="mt-4 text-xs text-slate-500">
              Data MCU terdeteksi lebih dari 1 item. Halaman ini menampilkan item pertama.
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-sm font-semibold text-slate-800">Form MCU</div>
              <div className="text-xs text-slate-500">Isi field sesuai hasil pemeriksaan. Field numerik default 0 bila kosong.</div>
            </div>
            <button
              type="button"
              onClick={doSubmit}
              disabled={loadingSubmit}
              className="rounded-md bg-indigo-600 text-white text-sm px-4 py-2 disabled:opacity-60"
            >
              {loadingSubmit ? 'Menyimpan…' : 'Simpan MCU'}
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {fieldGroups.map((group) => (
              <div key={group.title} className="rounded-lg border border-slate-200 p-4">
                <div className="text-sm font-semibold text-slate-800">{group.title}</div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {group.fields.map((f) => (
                    <div key={f.key}>
                      <div className="text-xs text-slate-500 mb-1">{f.label}</div>
                      <input
                        type={f.type}
                        value={form[f.key] ?? ''}
                        onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full rounded-md border-slate-300 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Mcu.layout = (page) => <SidebarBriding title="Briding Pcare">{page}</SidebarBriding>;

