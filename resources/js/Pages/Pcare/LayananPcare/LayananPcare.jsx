import React, { useEffect, useMemo, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import SearchableSelect from '@/Components/SearchableSelect';
import { route } from 'ziggy-js';

// Helper: format yyyy-mm-dd (HTML date) -> dd-mm-yyyy (PCare)
const toDdMmYy = (htmlDate) => {
  if (!htmlDate) return '';
  const [y, m, d] = htmlDate.split('-');
  if (!y || !m || !d) return htmlDate;
  return `${d}-${m}-${y}`;
};

export default function LayananPcare() {
  // Card 1: Peserta + Pemeriksaan SOAP sederhana
  const [searchMode, setSearchMode] = useState('nik'); // 'nik' | 'noka'
  const [searchNik, setSearchNik] = useState('');
  const [searchNoka, setSearchNoka] = useState('');
  const [pesertaLoading, setPesertaLoading] = useState(false);
  const [pesertaError, setPesertaError] = useState(null);
  const [peserta, setPeserta] = useState(null); // response.response dari PCare

  const [tglPelayanan, setTglPelayanan] = useState(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  // SOAP subset
  const [keluhan, setKeluhan] = useState('');
  const [anamnesa, setAnamnesa] = useState('');
  const [alergi, setAlergi] = useState('');
  // Objektif (vital sign)
  const [sistole, setSistole] = useState('');
  const [diastole, setDiastole] = useState('');
  const [beratBadan, setBeratBadan] = useState('');
  const [tinggiBadan, setTinggiBadan] = useState('');
  const [respRate, setRespRate] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [lingkarPerut, setLingkarPerut] = useState('');
  const [suhu, setSuhu] = useState('');
  const [tglPulang, setTglPulang] = useState('');

  // Card 2: Kunjungan PCare
  const [kunjunganAktif, setKunjunganAktif] = useState(false);
  const [kdDokter, setKdDokter] = useState('');
  const [kdPoli, setKdPoli] = useState('');
  const [kdSadar, setKdSadar] = useState('');
  const [kdStatusPulang, setKdStatusPulang] = useState('');
  const [kdPrognosa, setKdPrognosa] = useState('');
  const [kdDiag1, setKdDiag1] = useState('');
  const [kdDiag2, setKdDiag2] = useState('');
  const [kdDiag3, setKdDiag3] = useState('');
  const [kirimLoading, setKirimLoading] = useState(false);
  const [kirimError, setKirimError] = useState(null);
  const [kirimResult, setKirimResult] = useState(null);

  // Card 3: Rujukan PCare (opsional, akan ikut payload kunjungan)
  const [rujukAktif, setRujukAktif] = useState(false);
  const [kdSubSpesialis, setKdSubSpesialis] = useState('');
  const [kdSarana, setKdSarana] = useState('');
  const [tglEstRujuk, setTglEstRujuk] = useState('');
  const [kdFaskesRujuk, setKdFaskesRujuk] = useState('');
  const [faskesOptions, setFaskesOptions] = useState([]);
  const [faskesLoading, setFaskesLoading] = useState(false);
  const [faskesError, setFaskesError] = useState(null);

  // Referensi options
  const [dokterOptions, setDokterOptions] = useState([]);
  const [poliOptions, setPoliOptions] = useState([]);
  const [diagOptions, setDiagOptions] = useState([]);
  const [kesadaranOptions, setKesadaranOptions] = useState([]);
  const [statusPulangOptions, setStatusPulangOptions] = useState([]);
  const [prognosaOptions, setPrognosaOptions] = useState([]);
  const [subSpesialisOptions, setSubSpesialisOptions] = useState([]);
  const [saranaOptions, setSaranaOptions] = useState([]);

  // Fetch peserta by NIK atau No Kartu
  // Dapat menerima override parameter agar bisa dipanggil segera setelah prefill dari query string
  const doCekPeserta = async (opts = {}) => {
    setPesertaLoading(true);
    setPesertaError(null);
    setPeserta(null);
    try {
      let url = '';
      const mode = opts.mode || searchMode;
      if (mode === 'nik') {
        const nikClean = ((opts.nik ?? searchNik) || '').replace(/[^0-9]/g, '');
        if (!nikClean || nikClean.length < 8) {
          setPesertaError('Masukkan NIK yang valid (min. 8 digit, ideal 16 digit).');
          setPesertaLoading(false);
          return;
        }
        const params = new URLSearchParams({ nik: nikClean });
        url = `/pcare/api/peserta/nik?${params.toString()}`;
      } else {
        const nokaClean = ((opts.noka ?? searchNoka) || '').replace(/[^0-9]/g, '');
        if (!nokaClean || nokaClean.length < 8) {
          setPesertaError('Masukkan No. Kartu yang valid (min. 8 digit).');
          setPesertaLoading(false);
          return;
        }
        url = `/pcare/api/peserta/${encodeURIComponent(nokaClean)}`;
      }
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      const json = await res.json();
      if (res.ok) {
        const resp = json?.response || json?.data || null;
        setPeserta(resp);
        // Auto-fill No. Kartu dan NIK di input jika belum terisi
        try {
          const nokaFromResp = String(resp?.noKartu || '').replace(/[^0-9]/g, '');
          const nikFromResp = String(resp?.noKTP || '').replace(/[^0-9]/g, '').slice(0, 16);
          setSearchNoka((prev) => (prev && prev.trim() ? prev : nokaFromResp));
          setSearchNik((prev) => (prev && prev.trim() ? prev : nikFromResp));
        } catch (_) {}
      } else {
        setPesertaError(json?.metaData?.message || 'Gagal mengambil data peserta');
      }
    } catch (e) {
      setPesertaError(e?.message || 'Terjadi kesalahan jaringan');
    } finally {
      setPesertaLoading(false);
    }
  };

  // Prefill dari query string ketika halaman dibuka: ?nik=XXXX atau ?noka=XXXX
  const [initializedFromQuery, setInitializedFromQuery] = useState(false);
  useEffect(() => {
    if (initializedFromQuery) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const modeParam = String(params.get('mode') || '').toLowerCase();
      const nik = params.get('nik');
      const noka = params.get('noka');
      const nikOk = !!(nik && /\d{8,}/.test(nik));
      const nokaOk = !!(noka && /\d{8,}/.test(noka));

      if (nikOk) setSearchNik(String(nik).replace(/[^0-9]/g, '').slice(0, 16));
      if (nokaOk) setSearchNoka(String(noka).replace(/[^0-9]/g, ''));

      // Jika ada 'mode' di query, gunakan untuk menentukan preferensi pencarian
      if (modeParam === 'noka' && nokaOk) {
        setSearchMode('noka');
        setInitializedFromQuery(true);
        doCekPeserta({ mode: 'noka', noka });
        return;
      }
      if (modeParam === 'nik' && nikOk) {
        setSearchMode('nik');
        setInitializedFromQuery(true);
        doCekPeserta({ mode: 'nik', nik });
        return;
      }

      // Tanpa 'mode', prioritaskan NIK jika keduanya tersedia; jika tidak ada, gunakan yang tersedia
      if (nikOk) {
        setSearchMode('nik');
        setInitializedFromQuery(true);
        doCekPeserta({ mode: 'nik', nik });
      } else if (nokaOk) {
        setSearchMode('noka');
        setInitializedFromQuery(true);
        doCekPeserta({ mode: 'noka', noka });
      } else {
        // Fallback: coba baca prefill dari localStorage jika tersedia
        try {
          const raw = localStorage.getItem('pcarePrefill');
          if (raw) {
            const obj = JSON.parse(raw);
            const nikLs = String(obj?.nik || '').replace(/[^0-9]/g, '').slice(0, 16);
            const nokaLs = String(obj?.noka || '').replace(/[^0-9]/g, '');
            const modeLs = String(obj?.mode || '').toLowerCase();
            const nikLsOk = !!(nikLs && /\d{8,}/.test(nikLs));
            const nokaLsOk = !!(nokaLs && /\d{8,}/.test(nokaLs));

            if (nikLsOk) setSearchNik(nikLs);
            if (nokaLsOk) setSearchNoka(nokaLs);

            if (modeLs === 'noka' && nokaLsOk) {
              setSearchMode('noka');
              setInitializedFromQuery(true);
              doCekPeserta({ mode: 'noka', noka: nokaLs });
              return;
            }
            if (modeLs === 'nik' && nikLsOk) {
              setSearchMode('nik');
              setInitializedFromQuery(true);
              doCekPeserta({ mode: 'nik', nik: nikLs });
              return;
            }
            if (nikLsOk) {
              setSearchMode('nik');
              setInitializedFromQuery(true);
              doCekPeserta({ mode: 'nik', nik: nikLs });
              return;
            }
            if (nokaLsOk) {
              setSearchMode('noka');
              setInitializedFromQuery(true);
              doCekPeserta({ mode: 'noka', noka: nokaLs });
              return;
            }
          }
        } catch (_) {}
        setInitializedFromQuery(true);
      }
    } catch (_) {
      setInitializedFromQuery(true);
    }
  }, [initializedFromQuery]);

  // Fetch referensi awal (dokter, poli, kesadaran, prognosa, status pulang)
  useEffect(() => {
    const loadInitRefs = async () => {
      try {
        // Catatan: sebagian endpoint referensi berada di routes/web.php (/pcare/api/*)
        // dan sebagian lagi berada di routes/api.php (/api/pcare/*).
        // Untuk menghindari 404, gunakan path yang sesuai dengan definisi route.
        const [dokterRes, poliRes, kesRes, progRes, statRes] = await Promise.all([
          fetch('/pcare/api/dokter?start=0&limit=100'), // web.php
          fetch('/pcare/api/poli?start=0&limit=200'),    // web.php
          fetch('/api/pcare/kesadaran'),                 // api.php
          fetch('/api/pcare/prognosa'),                  // api.php
          fetch('/api/pcare/statuspulang'),              // api.php
        ]);
        const dokterJson = await dokterRes.json();
        const poliJson = await poliRes.json();
        const kesJson = await kesRes.json();
        const progJson = await progRes.json();
        const statJson = await statRes.json();
        const listOrData = (obj) => obj?.response?.list || obj?.list || obj?.data || [];
        setDokterOptions(listOrData(dokterJson).map((it) => ({ value: it?.kdDokter || it?.kdProvider || it?.kode || '', label: it?.nmDokter || it?.nmProvider || it?.nama || '' })));
        setPoliOptions(listOrData(poliJson).map((it) => ({ value: it?.kdPoli || it?.kode || '', label: it?.nmPoli || it?.nama || '' })));
        setKesadaranOptions(listOrData(kesJson).map((it) => ({ value: it?.kdSadar || it?.kode || '', label: it?.nmSadar || it?.nama || '' })));
        setPrognosaOptions(listOrData(progJson).map((it) => ({ value: it?.kdPrognosa || it?.kode || '', label: it?.nmPrognosa || it?.nama || '' })));
        setStatusPulangOptions(listOrData(statJson).map((it) => ({ value: it?.kdStatusPulang || it?.kode || '', label: it?.nmStatusPulang || it?.nama || '' })));
      } catch (_) {}
    };
    loadInitRefs();
  }, []);

  // Fetch referensi rujukan (subspesialis, sarana)
  useEffect(() => {
    const loadRujukRefs = async () => {
      try {
        const [subRes, sarRes] = await Promise.all([
          fetch('/api/pcare/spesialis/subspesialis?start=0&limit=100'), // api.php
          fetch('/api/pcare/spesialis/sarana?start=0&limit=100'),       // api.php
        ]);
        const subJson = await subRes.json();
        const sarJson = await sarRes.json();
        const listOrData = (obj) => obj?.response?.list || obj?.list || obj?.data || [];
        setSubSpesialisOptions(listOrData(subJson).map((it) => ({ value: it?.kdSubSpesialis || it?.kode || '', label: it?.nmSubSpesialis || it?.nama || '' })));
        setSaranaOptions(listOrData(sarJson).map((it) => ({ value: it?.kdSarana || it?.kode || '', label: it?.nmSarana || it?.nama || '' })));
      } catch (_) {}
    };
    loadRujukRefs();
  }, []);

  // Fetch diagnosa berdasarkan keyword (client-side filter untuk SearchableSelect)
  const loadDiagnosa = async (q = '-') => {
    try {
      const params = new URLSearchParams({ q, start: 0, limit: 25 });
      const res = await fetch(`/pcare/api/diagnosa?${params.toString()}`);
      const json = await res.json();
      const list = json?.response?.list || json?.list || json?.data || [];
      const opts = list.map((it) => ({ value: it?.kdDiag || it?.kode || '', label: `${it?.kdDiag || it?.kode || ''} — ${it?.nmDiag || it?.nama || ''}` }));
      setDiagOptions(opts);
    } catch (_) {}
  };

  useEffect(() => {
    // Prefetch default diagnosa list
    loadDiagnosa('-');
  }, []);

  // Load Faskes Rujukan berdasarkan subspesialis + sarana + tanggal estimasi
  const loadFaskesRujukan = async () => {
    setFaskesLoading(true);
    setFaskesError(null);
    setFaskesOptions([]);
    try {
      if (!kdSubSpesialis || !kdSarana || !tglEstRujuk) {
        setFaskesLoading(false);
        return;
      }
      const url = `/api/pcare/spesialis/rujuk/subspesialis/${encodeURIComponent(kdSubSpesialis)}/sarana/${encodeURIComponent(kdSarana)}/tglEstRujuk/${encodeURIComponent(tglEstRujuk)}`;
      const res = await fetch(url);
      const json = await res.json();
      const list = json?.response?.list || json?.list || json?.data || [];
      setFaskesOptions(list.map((it) => ({ value: it?.kdProvider || it?.kdFaskes || it?.kode || '', label: it?.nmProvider || it?.nama || '' })));
    } catch (e) {
      setFaskesError(e?.message || 'Gagal memuat faskes rujukan');
    } finally {
      setFaskesLoading(false);
    }
  };

  useEffect(() => {
    loadFaskesRujukan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kdSubSpesialis, kdSarana, tglEstRujuk]);

  // Submit kunjungan ke server (akan diteruskan ke BPJS PCare)
  const doKirimKunjungan = async () => {
    setKirimLoading(true);
    setKirimError(null);
    setKirimResult(null);
    try {
      const noKartu = peserta?.noKartu || (searchMode === 'noka' ? (searchNoka || '').replace(/[^0-9]/g, '') : '');
      if (!kunjunganAktif) {
        setKirimError('Centang "Aktifkan Kunjungan PCare" terlebih dahulu.');
        setKirimLoading(false);
        return;
      }
      if (!noKartu) {
        setKirimError('No. Kartu BPJS tidak diketahui. Cari peserta terlebih dahulu atau isi No. Kartu.');
        setKirimLoading(false);
        return;
      }
      if (!kdPoli || !kdDokter || !kdDiag1) {
        setKirimError('Lengkapi Poli, Dokter, dan Diagnosa Utama sebelum mengirim.');
        setKirimLoading(false);
        return;
      }
      const payload = {
        noKartu: String(noKartu),
        tglDaftar: toDdMmYy(tglPelayanan),
        kdPoli: String(kdPoli),
        keluhan: keluhan || anamnesa || '-',
        kdSadar: String(kdSadar || ''),
        sistole: String(sistole || ''),
        diastole: String(diastole || ''),
        beratBadan: String(beratBadan || ''),
        tinggiBadan: String(tinggiBadan || ''),
        respRate: String(respRate || ''),
        heartRate: String(heartRate || ''),
        lingkarPerut: String(lingkarPerut || ''),
        suhu: String(suhu || ''),
        kdStatusPulang: String(kdStatusPulang || ''),
        tglPulang: tglPulang ? toDdMmYy(tglPulang) : '',
        kdDokter: String(kdDokter),
        kdDiag1: String(kdDiag1),
        kdDiag2: kdDiag2 ? String(kdDiag2) : '',
        kdDiag3: kdDiag3 ? String(kdDiag3) : '',
        kdPrognosa: String(kdPrognosa || ''),
        // Tambahan default sesuai beberapa implementasi
        kdTacc: -1,
        alasanTacc: '',
      };

      if (rujukAktif && kdSubSpesialis && kdSarana && tglEstRujuk && kdFaskesRujuk) {
        payload.rujukLanjut = {
          kdSubSpesialis: String(kdSubSpesialis),
          kdSarana: String(kdSarana),
          kdProvider: String(kdFaskesRujuk),
          tglEstRujuk: toDdMmYy(tglEstRujuk),
        };
      }

      const res = await fetch('/api/pcare/kunjungan', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok) {
        setKirimResult(json);
      } else {
        setKirimError(json?.metaData?.message || 'Gagal mengirim kunjungan ke PCare');
      }
    } catch (e) {
      setKirimError(e?.message || 'Terjadi kesalahan jaringan saat mengirim kunjungan');
    } finally {
      setKirimLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Breadcrumb & header */}
      <div className="mb-4">
        <div className="rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 text-white p-5 shadow">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold">Layanan PCare</h1>
              <p className="text-sm opacity-90">Form terpadu untuk cek peserta, input pemeriksaan SOAP, Kunjungan PCare, dan Rujukan.</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Gunakan path absolut untuk menghindari error Ziggy ketika prefix route berbeda */}
              <a href="/pcare/referensi/statuspulang" className="text-xs underline decoration-white/50">Referensi Status Pulang</a>
              <a href="/pcare/referensi/subspesialis" className="text-xs underline decoration-white/50">Referensi Subspesialis</a>
              <a href="/pcare/referensi/sarana" className="text-xs underline decoration-white/50">Referensi Sarana</a>
              <a href="/pcare/referensi/faskes-rujukan" className="text-xs underline decoration-white/50">Faskes Rujukan</a>
            </div>
          </div>
        </div>
      </div>

      {/* Card 1: Informasi Peserta + SOAP */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-800">Informasi Peserta & Pemeriksaan SOAP</div>
            <div className="text-xs text-slate-500">Cek peserta berdasarkan NIK atau No. Kartu, kemudian isi pemeriksaan SOAP ringkas.</div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-600">Mode Pencarian:</label>
            <select value={searchMode} onChange={(e) => setSearchMode(e.target.value)} className="text-sm rounded-md border-slate-300">
              <option value="nik">NIK</option>
              <option value="noka">No. Kartu</option>
            </select>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2">
            {searchMode === 'nik' ? (
              <div>
                <label className="text-xs text-slate-500">NIK Peserta</label>
                <input value={searchNik} onChange={(e) => setSearchNik(e.target.value.replace(/[^0-9]/g, '').slice(0,16))} className="mt-1 w-full rounded-md border-slate-300 text-sm" placeholder="Masukkan NIK (16 digit)" />
              </div>
            ) : (
              <div>
                <label className="text-xs text-slate-500">No. Kartu BPJS</label>
                <input value={searchNoka} onChange={(e) => setSearchNoka(e.target.value.replace(/[^0-9]/g, ''))} className="mt-1 w-full rounded-md border-slate-300 text-sm" placeholder="Masukkan No. Kartu (BPJS)" />
              </div>
            )}
          </div>
          <div className="lg:col-span-1 flex items-end gap-2">
            <button onClick={doCekPeserta} disabled={pesertaLoading} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white shadow ${pesertaLoading ? 'bg-sky-400' : 'bg-sky-600 hover:bg-sky-700'}`}>
              {pesertaLoading ? 'Mencari…' : 'Cari Peserta'}
            </button>
            <button onClick={() => { setPeserta(null); setPesertaError(null); setSearchNik(''); setSearchNoka(''); }} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50">Reset</button>
          </div>
        </div>

        {/* Hasil peserta */}
        <div className="mt-3">
          {pesertaError && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">{pesertaError}</div>
          )}
          {peserta && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Nama</div>
                <div className="mt-1 text-sm text-slate-800">{peserta?.nama || '-'}</div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="text-xs text-slate-500">No. Kartu</div>
                <div className="mt-1 text-sm text-slate-800">{peserta?.noKartu || '-'}</div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="text-xs text-slate-500">NIK</div>
                <div className="mt-1 text-sm text-slate-800">{peserta?.noKTP || '-'}</div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Provider FKTP</div>
                <div className="mt-1 text-sm text-slate-800">{peserta?.kdProviderPst?.nmProvider || '-'}</div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Status Peserta</div>
                <div className="mt-1 text-sm text-slate-800">{String(peserta?.aktif ? 'AKTIF' : (peserta?.ketAktif || 'TIDAK AKTIF'))}</div>
              </div>
            </div>
          )}
        </div>

        {/* Pemeriksaan SOAP ringkas */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="text-sm font-semibold text-slate-800">Keluhan Utama (S)</div>
            <textarea value={keluhan} onChange={(e) => setKeluhan(e.target.value)} rows={4} placeholder="Keluhan yang dirasakan pasien…" className="mt-2 w-full rounded-md border-slate-300 text-sm" />
            <div className="mt-3 text-sm font-semibold text-slate-800">Anamnesa Tambahan</div>
            <textarea value={anamnesa} onChange={(e) => setAnamnesa(e.target.value)} rows={3} placeholder="Riwayat singkat, faktor risiko, dll." className="mt-2 w-full rounded-md border-slate-300 text-sm" />
            <div className="mt-3 text-sm font-semibold text-slate-800">Alergi</div>
            <input value={alergi} onChange={(e) => setAlergi(e.target.value)} placeholder="Alergi obat/makanan/udara" className="mt-2 w-full rounded-md border-slate-300 text-sm" />
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="text-sm font-semibold text-slate-800">Pemeriksaan Fisik (O)</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <label className="text-xs text-slate-500">Sistole</label>
                <input value={sistole} onChange={(e) => setSistole(e.target.value.replace(/[^0-9]/g, ''))} className="mt-1 w-full rounded-md border-slate-300 text-sm" placeholder="mmHg" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Diastole</label>
                <input value={diastole} onChange={(e) => setDiastole(e.target.value.replace(/[^0-9]/g, ''))} className="mt-1 w-full rounded-md border-slate-300 text-sm" placeholder="mmHg" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Berat Badan</label>
                <input value={beratBadan} onChange={(e) => setBeratBadan(e.target.value.replace(/[^0-9.]/g, ''))} className="mt-1 w-full rounded-md border-slate-300 text-sm" placeholder="kg" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Tinggi Badan</label>
                <input value={tinggiBadan} onChange={(e) => setTinggiBadan(e.target.value.replace(/[^0-9.]/g, ''))} className="mt-1 w-full rounded-md border-slate-300 text-sm" placeholder="cm" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Respirasi</label>
                <input value={respRate} onChange={(e) => setRespRate(e.target.value.replace(/[^0-9]/g, ''))} className="mt-1 w-full rounded-md border-slate-300 text-sm" placeholder="x/menit" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Nadi</label>
                <input value={heartRate} onChange={(e) => setHeartRate(e.target.value.replace(/[^0-9]/g, ''))} className="mt-1 w-full rounded-md border-slate-300 text-sm" placeholder="x/menit" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Lingkar Perut</label>
                <input value={lingkarPerut} onChange={(e) => setLingkarPerut(e.target.value.replace(/[^0-9.]/g, ''))} className="mt-1 w-full rounded-md border-slate-300 text-sm" placeholder="cm" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Suhu</label>
                <input value={suhu} onChange={(e) => setSuhu(e.target.value.replace(/[^0-9.]/g, ''))} className="mt-1 w-full rounded-md border-slate-300 text-sm" placeholder="°C" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <label className="text-xs text-slate-500">Tgl. Pelayanan</label>
                <input type="date" value={tglPelayanan} onChange={(e) => setTglPelayanan(e.target.value)} className="mt-1 w-full rounded-md border-slate-300 text-sm" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Tgl. Pulang</label>
                <input type="date" value={tglPulang} onChange={(e) => setTglPulang(e.target.value)} className="mt-1 w-full rounded-md border-slate-300 text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Kunjungan PCare */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-800">Kunjungan PCare</div>
            <div className="text-xs text-slate-500">Centang untuk mengaktifkan input Kunjungan PCare.</div>
          </div>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={kunjunganAktif} onChange={(e) => setKunjunganAktif(e.target.checked)} />
            Aktifkan
          </label>
        </div>

        {kunjunganAktif && (
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="text-xs text-slate-500 mb-1">Dokter</div>
              <SearchableSelect options={dokterOptions} value={kdDokter} onChange={setKdDokter} placeholder="Pilih dokter" />
              <div className="mt-3 text-xs text-slate-500 mb-1">Poli</div>
              <SearchableSelect options={poliOptions} value={kdPoli} onChange={setKdPoli} placeholder="Pilih poli" />
              <div className="mt-3 text-xs text-slate-500 mb-1">Kesadaran</div>
              <SearchableSelect options={kesadaranOptions} value={kdSadar} onChange={setKdSadar} placeholder="Pilih kesadaran" />
              <div className="mt-3 text-xs text-slate-500 mb-1">Status Pulang</div>
              <SearchableSelect options={statusPulangOptions} value={kdStatusPulang} onChange={setKdStatusPulang} placeholder="Pilih status pulang" />
              <div className="mt-3 text-xs text-slate-500 mb-1">Prognosa</div>
              <SearchableSelect options={prognosaOptions} value={kdPrognosa} onChange={setKdPrognosa} placeholder="Pilih prognosa" />
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="text-xs text-slate-500 mb-1">Diagnosa Utama</div>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex gap-2">
                  <input className="flex-1 rounded-md border-slate-300 text-sm" placeholder="Cari diagnosa (ICD-10)" onChange={(e) => loadDiagnosa(e.target.value)} />
                </div>
                <SearchableSelect options={diagOptions} value={kdDiag1} onChange={setKdDiag1} placeholder="Pilih diagnosa utama" />
                <div className="mt-2 text-xs text-slate-500 mb-1">Diagnosa Sekunder (Opsional)</div>
                <SearchableSelect options={diagOptions} value={kdDiag2} onChange={setKdDiag2} placeholder="Diagnosa 2 (opsional)" />
                <SearchableSelect options={diagOptions} value={kdDiag3} onChange={setKdDiag3} placeholder="Diagnosa 3 (opsional)" />
              </div>
            </div>
          </div>
        )}

        {kunjunganAktif && (
          <div className="mt-3 flex items-center gap-2">
            <button onClick={doKirimKunjungan} disabled={kirimLoading} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white shadow ${kirimLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
              {kirimLoading ? 'Mengirim…' : 'Kirim Kunjungan PCare'}
            </button>
            {kirimError && <div className="text-sm text-red-600">{kirimError}</div>}
          </div>
        )}

        {kirimResult && (
          <div className="mt-3 rounded-md border border-slate-200 bg-white p-3">
            <div className="text-sm font-semibold text-slate-800">Response</div>
            <pre className="mt-2 text-xs bg-slate-50 p-2 rounded-md overflow-auto max-h-64">{JSON.stringify(kirimResult, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Card 3: Rujukan PCare */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-800">Rujukan PCare</div>
            <div className="text-xs text-slate-500">Centang untuk menambahkan data rujukan ke payload kunjungan.</div>
          </div>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={rujukAktif} onChange={(e) => setRujukAktif(e.target.checked)} />
            Aktifkan
          </label>
        </div>

        {rujukAktif && (
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="text-xs text-slate-500 mb-1">Subspesialis</div>
              <SearchableSelect options={subSpesialisOptions} value={kdSubSpesialis} onChange={setKdSubSpesialis} placeholder="Pilih subspesialis" />
              <div className="mt-3 text-xs text-slate-500 mb-1">Sarana</div>
              <SearchableSelect options={saranaOptions} value={kdSarana} onChange={setKdSarana} placeholder="Pilih sarana" />
              <div className="mt-3 text-xs text-slate-500 mb-1">Tanggal Estimasi Rujuk</div>
              <input type="date" value={tglEstRujuk} onChange={(e) => setTglEstRujuk(e.target.value)} className="mt-1 w-full rounded-md border-slate-300 text-sm" />
            </div>
            <div className="rounded-lg border border-slate-200 p-3 lg:col-span-2">
              <div className="text-xs text-slate-500 mb-1">Faskes Rujukan</div>
              <SearchableSelect options={faskesOptions} value={kdFaskesRujuk} onChange={setKdFaskesRujuk} placeholder={faskesLoading ? 'Memuat…' : 'Pilih faskes'} />
              {faskesError && <div className="mt-2 text-xs text-red-600">{faskesError}</div>}
              <div className="mt-3 text-xs text-slate-500">Catatan: daftar faskes akan otomatis dimuat ketika Subspesialis, Sarana, dan Tanggal Estimasi dipilih.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Render dalam AppLayout
LayananPcare.layout = (page) => <AppLayout title="Layanan PCare" children={page} />;