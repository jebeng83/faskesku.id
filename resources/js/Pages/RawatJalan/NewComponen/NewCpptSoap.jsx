import React, { useMemo, useState, useEffect } from 'react';
import { route } from 'ziggy-js';
import { usePage } from '@inertiajs/react';
import SearchableSelect from '../../../Components/SearchableSelect.jsx';
import { Eraser, Pencil, Trash2 } from 'lucide-react';
import { PlusIcon } from '@heroicons/react/24/outline';
import DataAlergi from '../../../Alergi/DataAlergi.jsx';
import { DWFKTP_TEMPLATES } from '../../../data/dwfktpTemplates.js';
import axios from 'axios';

export default function NewCpptSoap({ _token = '', noRkmMedis = '', noRawat = '', _onOpenResep = null, onOpenBridging = null }) {
  const page = usePage();
  const currentNik = page?.props?.auth?.user?.nik || '';
  const currentName = page?.props?.auth?.user?.name || page?.props?.auth?.user?.nama || '';
  const [pegawaiDisplay, setPegawaiDisplay] = useState('');
  const [, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState(null);
  const [editKey, setEditKey] = useState(null);
  const [pegawaiMap, setPegawaiMap] = useState({});
  const now = useMemo(() => new Date(), []);
  const [formData, setFormData] = useState({
    tgl_perawatan: now.toISOString().slice(0, 10),
    jam_rawat: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
    keluhan: '',
    pemeriksaan: '',
    penilaian: '',
    rtl: '',
    instruksi: '',
    evaluasi: '',
    suhu_tubuh: '', tensi: '', nadi: '', respirasi: '', spo2: '', tinggi: '', berat: '', gcs: '', lingkar_perut: '',
    kesadaran: 'Compos Mentis', alergi: '', nip: '',
  });
  const [showBridging, setShowBridging] = useState(false);
  const [rujukanBerhasil, setRujukanBerhasil] = useState(false);
  const [lastNoKunjungan, setLastNoKunjungan] = useState('');
  const [bridgingOpen, setBridgingOpen] = useState(false);
  const [bridgingLoading, setBridgingLoading] = useState(false);
  const [bridgingError, setBridgingError] = useState('');
  const [bridgingInfo, setBridgingInfo] = useState(null);

  useEffect(() => {
    if (currentNik && !formData.nip) {
      setFormData((p) => ({ ...p, nip: currentNik }));
    }
  }, [currentNik]);

  useEffect(() => {
    let active = true;
    const loadPegawaiNama = async () => {
      if (!currentNik) { setPegawaiDisplay(''); return; }
      try {
        const res = await fetch(`/pegawai/search?q=${encodeURIComponent(currentNik)}`, { headers: { Accept: 'application/json' }, credentials: 'include' });
        const js = await res.json();
        const list = Array.isArray(js?.data) ? js.data : (Array.isArray(js?.list) ? js.list : []);
        const found = list.find((it) => String(it?.nik || '') === String(currentNik));
        const nama = found?.nama || '';
        if (active) setPegawaiDisplay(nama || '');
      } catch (_) {
        if (active) setPegawaiDisplay('');
      }
    };
    loadPegawaiNama();
    return () => { active = false; };
  }, [currentNik]);

  useEffect(() => {
    let active = true;
    const loadHistory = async () => {
      if (!noRawat) return;
      setHistoryLoading(true);
      setHistoryError(null);
      try {
        const url = route('rawat-jalan.pemeriksaan-ralan', { no_rawat: noRawat });
        const res = await fetch(url, { headers: { Accept: 'application/json' } });
        const js = await res.json();
        const rows = Array.isArray(js?.data) ? js.data : [];
        if (active) setHistoryList(rows);
      } catch (e) {
        if (active) setHistoryError(e?.message || 'Gagal memuat riwayat');
      } finally {
        if (active) setHistoryLoading(false);
      }
    };
    loadHistory();
    return () => { active = false; };
  }, [noRawat]);

  const reloadHistory = async () => {
    if (!noRawat) return;
    try {
      const url = route('rawat-jalan.pemeriksaan-ralan', { no_rawat: noRawat });
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      const js = await res.json();
      const rows = Array.isArray(js?.data) ? js.data : [];
      setHistoryList(rows);
    } catch (_) {}
  };

  useEffect(() => {
    const ids = Array.from(new Set((Array.isArray(historyList) ? historyList : []).map((r) => String(r?.nik || r?.nip || '')).filter((s) => !!s)));
    const missing = ids.filter((id) => !(id in pegawaiMap));
    if (missing.length === 0) return;
    Promise.all(missing.map(async (id) => {
      try {
        const res = await fetch(`/pegawai/search?q=${encodeURIComponent(id)}`, { headers: { Accept: 'application/json' }, credentials: 'include' });
        const js = await res.json();
        const list = Array.isArray(js?.data) ? js.data : (Array.isArray(js?.list) ? js.list : []);
        const found = list.find((it) => String(it?.nik || '') === String(id));
        const nama = found?.nama || '';
        if (nama) setPegawaiMap((prev) => ({ ...prev, [id]: nama }));
      } catch (_) {}
    })).catch(() => {});
  }, [historyList, pegawaiMap]);

  const kesadaranOptions = [
    'Compos Mentis','Somnolence','Sopor','Coma','Alert','Confusion','Voice','Pain','Unresponsive','Apatis','Delirium'
  ];

  const [jenisAlergiOptions, setJenisAlergiOptions] = useState([]);
  const [alergiJenis, setAlergiJenis] = useState('');
  const [alergiCrudOpen, setAlergiCrudOpen] = useState(false);
  const [kdAlergi, setKdAlergi] = useState('');
  const [pegawaiOptions, setPegawaiOptions] = useState([]);
  const [alergiOptions, setAlergiOptions] = useState([]);
  useEffect(() => {
    setFormData((p) => ({ ...p, alergi: '' }));
    setKdAlergi('');
  }, [alergiJenis]);

  useEffect(() => {
    const loadJenis = async () => {
      try {
        let res = await fetch('/api/alergi/jenis?per_page=100', { headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'include' });
        if (res.status === 419) {
          await fetch('/sanctum/csrf-cookie', { credentials: 'include' }).catch(() => {});
          res = await fetch('/api/alergi/jenis?per_page=100', { headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'include' });
        }
        if (res.status === 401) {
          throw new Error('Unauthenticated. Silakan login kembali.');
        }
        const js = await res.json();
        const data = Array.isArray(js?.data) ? js.data : [];
        const opts = data.map((j) => ({ code: String(j.kode_jenis), label: j.nama_jenis }));
        setJenisAlergiOptions(opts);
        if (!alergiJenis && opts.length > 0) {
          const def = opts.find((o) => String(o.label).toLowerCase() === 'tidak ada') || opts[0];
          setAlergiJenis(def.code);
        }
      } catch (_) {}
    };
    loadJenis();
  }, []);

  useEffect(() => {
    let active = true;
    const loadPegawaiOptions = async () => {
      try {
        const res = await fetch(`/pegawai/search?q=`, { headers: { Accept: 'application/json' }, credentials: 'include' });
        const js = await res.json();
        const list = Array.isArray(js?.data) ? js.data : (Array.isArray(js?.list) ? js.list : []);
        const opts = list.map((it) => ({ value: it?.nik || '', label: `${it?.nik ?? ''} — ${it?.nama ?? ''}`.trim() }));
        if (active) setPegawaiOptions(opts);
      } catch (_) {
        if (active) setPegawaiOptions([]);
      }
    };
    loadPegawaiOptions();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    const loadAlergi = async () => {
      try {
        if (!alergiJenis) { setAlergiOptions([]); return; }
        const params = new URLSearchParams({ kode_jenis: alergiJenis, q: '' });
        let res = await fetch(`/api/alergi?${params.toString()}`, { headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'include' });
        if (res.status === 419) {
          await fetch('/sanctum/csrf-cookie', { credentials: 'include' }).catch(() => {});
          res = await fetch(`/api/alergi?${params.toString()}`, { headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'include' });
        }
        if (res.status === 401) {
          throw new Error('Unauthenticated. Silakan login kembali.');
        }
        const js = await res.json();
        const list = Array.isArray(js?.data) ? js.data : (Array.isArray(js?.list) ? js.list : []);
        const opts = list.map((it) => ({ value: it?.kd_alergi || it?.kdAlergi || it?.kode || '', label: it?.nm_alergi || it?.nmAlergi || it?.nama || '' }));
        if (active) setAlergiOptions(opts);
      } catch (_) {
        if (active) setAlergiOptions([]);
      }
    };
    loadAlergi();
    return () => { active = false; };
  }, [alergiJenis]);

  // Load alergi pasien dari tabel alergi_pasien saat form dibuka untuk kunjungan berikutnya
  useEffect(() => {
    let active = true;
    const loadAlergiPasien = async () => {
      if (!noRkmMedis || editKey) return; // Jangan load jika sedang edit atau tidak ada noRkmMedis
      try {
        let res = await fetch(`/api/alergi/pasien?no_rkm_medis=${encodeURIComponent(noRkmMedis)}`, { 
          headers: { Accept: 'application/json' }, 
          credentials: 'same-origin' 
        });
        if (res.status === 419) {
          await fetch('/sanctum/csrf-cookie', { credentials: 'same-origin' }).catch(() => {});
          res = await fetch(`/api/alergi/pasien?no_rkm_medis=${encodeURIComponent(noRkmMedis)}`, { 
            headers: { Accept: 'application/json' }, 
            credentials: 'same-origin' 
          });
        }
        if (res.status === 401) {
          throw new Error('Unauthenticated. Silakan login kembali.');
        }
        const js = await res.json();
        const alergiList = Array.isArray(js?.data) ? js.data : [];
        
        // Jika ada alergi pasien, ambil yang pertama untuk diisi ke form
        if (active && alergiList.length > 0) {
          const alergiPertama = alergiList[0];
          setAlergiJenis(String(alergiPertama.kode_jenis || ''));
          setKdAlergi(alergiPertama.kd_alergi || '');
          setFormData((p) => ({ ...p, alergi: alergiPertama.nm_alergi || '' }));
        }
      } catch (_) {}
    };
    loadAlergiPasien();
    return () => { active = false; };
  }, [noRkmMedis, editKey]);

  const [, setModalOpen] = useState(false);
  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    performSave();
  };

  const performSave = async () => {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const creating = !editKey;
      const url = creating ? route('rawat-jalan.pemeriksaan-ralan.store') : route('rawat-jalan.pemeriksaan-ralan.update');
      
      // Siapkan payload untuk pemeriksaan
      const pemeriksaanPayload = creating ? { ...formData, no_rawat: noRawat } : { ...formData, key: editKey };
      
      // Siapkan payload untuk alergi pasien jika ada
      const hasAlergiData = noRkmMedis && alergiJenis && kdAlergi && kdAlergi.trim() !== '' && kdAlergi.trim() !== '-';
      const alergiPayload = hasAlergiData ? {
        no_rkm_medis: noRkmMedis,
        kode_jenis: parseInt(alergiJenis, 10),
        kd_alergi: kdAlergi.trim(),
      } : null;
      
      // Gabungkan payload
      const payload = {
        ...pemeriksaanPayload,
        ...(hasAlergiData && { alergi_pasien: alergiPayload }),
      };
      
      // Refresh CSRF cookie sebelum request menggunakan axios
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (_) {}
      
      // Gunakan axios yang sudah dikonfigurasi dengan interceptor untuk handle 419
      const res = await axios({
        method: creating ? 'POST' : 'PUT',
        url: url,
        data: payload,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      
      // Axios sudah mengembalikan data yang sudah di-parse sebagai JSON
      const json = res.data || {};
      setMessage(json.message || (creating ? 'Pemeriksaan tersimpan' : 'Pemeriksaan diperbarui'));
      setModalOpen(false);
      setFormData((prev) => ({
        ...prev,
        suhu_tubuh: '', tensi: '', nadi: '', respirasi: '', tinggi: '', berat: '', spo2: '', gcs: '',
        keluhan: '', pemeriksaan: '', alergi: '', lingkar_perut: '', rtl: '', penilaian: '', instruksi: '', evaluasi: ''
      }));
      setKdAlergi('');
      setEditKey(null);
      await reloadHistory();
      try {
        const pcarePayload = {
          no_rawat: noRawat,
          tgl_perawatan: pemeriksaanPayload.tgl_perawatan,
          keluhan: pemeriksaanPayload.keluhan,
          tensi: pemeriksaanPayload.tensi,
          nadi: pemeriksaanPayload.nadi,
          respirasi: pemeriksaanPayload.respirasi,
          lingkar_perut: pemeriksaanPayload.lingkar_perut,
          berat: pemeriksaanPayload.berat,
          tinggi: pemeriksaanPayload.tinggi,
        };
        const pcareRes = await axios({
          method: 'POST',
          url: '/api/pcare/pendaftaran',
          data: pcarePayload,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': typeof document !== 'undefined' ? document.querySelector('meta[name="csrf-token"]').getAttribute('content') : undefined,
          },
        });
        const pcareJson = pcareRes.data || {};
        if (pcareRes.status === 200 || pcareRes.status === 201) {
          const skipped = !!pcareJson.skipped;
          if (skipped) {
            const skipMsg = (pcareJson.metaData && pcareJson.metaData.message) ? pcareJson.metaData.message : 'Pendaftaran PCare dilewati (Non-BPJS)';
            setMessage((prev) => `${prev || ''} • ${skipMsg}`.trim());
            setShowBridging(false);
          } else {
            const noUrut = (pcareJson && pcareJson.response && pcareJson.response.field === 'noUrut') ? (pcareJson.response.message || '') : '';
            setMessage((prev) => `${prev || ''} • Pendaftaran PCare terkirim${noUrut ? ' (No Urut: ' + noUrut + ')' : ''}`.trim());
            setShowBridging(true);
          }
        } else {
          const errMsg = (pcareJson && pcareJson.metaData && pcareJson.metaData.message) ? pcareJson.metaData.message : `Gagal pendaftaran PCare (${pcareRes.status})`;
          setError(errMsg);
          setShowBridging(false);
        }
      } catch (e) {
        setError(`Gagal koneksi ke PCare: ${e.message || e}`);
      }

      try {
        const res = await fetch(`/api/pcare/rujuk-subspesialis/rawat/${encodeURIComponent(noRawat)}`, {
          headers: { 'Accept': 'application/json' },
          credentials: 'include',
        });
        if (res.ok) {
          const json = await res.json();
          const data = json.data || null;
          if (data) {
            setRujukanBerhasil(true);
            if (data.noKunjungan) setLastNoKunjungan(String(data.noKunjungan));
          } else {
            setRujukanBerhasil(false);
          }
        }
      } catch (_) {}
    } catch (e) {
      // Axios error memiliki struktur berbeda dari fetch
      const errorMessage = e?.response?.data?.message || 
                          (e?.response?.data?.errors && Object.values(e.response.data.errors).flat().join(', ')) ||
                          e?.message || 
                          'Terjadi kesalahan saat menyimpan';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const checkPendaftaranStatus = async () => {
      if (!noRawat) {
        setShowBridging(false);
        return;
      }
      try {
        const res = await fetch(`/api/pcare/pendaftaran/rawat/${encodeURIComponent(noRawat)}`, {
          headers: { 'Accept': 'application/json' },
          credentials: 'include',
        });
        if (res.status === 401) {
          setShowBridging(false);
          return;
        }
        if (res.ok) {
          const json = await res.json();
          const data = json.data || null;
          if (data && data.status === 'Terkirim') {
            setShowBridging(true);
          } else {
            setShowBridging(false);
          }
        } else {
          setShowBridging(false);
        }
      } catch (_) {
        setShowBridging(false);
      }
    };
    checkPendaftaranStatus();
  }, [noRawat]);

  useEffect(() => {
    const checkRujukan = async () => {
      if (!noRawat) {
        setRujukanBerhasil(false);
        return;
      }
      try {
        const res = await fetch(`/api/pcare/rujuk-subspesialis/rawat/${encodeURIComponent(noRawat)}`, {
          headers: { 'Accept': 'application/json' },
          credentials: 'include',
        });
        if (res.ok) {
          const json = await res.json();
          const data = json.data || null;
          if (data) {
            setRujukanBerhasil(true);
            if (data.noKunjungan) setLastNoKunjungan(String(data.noKunjungan));
          } else {
            setRujukanBerhasil(false);
          }
        } else {
          setRujukanBerhasil(false);
        }
      } catch (_) {
        setRujukanBerhasil(false);
      }
    };
    checkRujukan();
  }, [noRawat]);

  const openBridgingModal = async () => {
    setBridgingOpen(true);
    setBridgingLoading(true);
    setBridgingError('');
    try {
      const res = await fetch(`/api/pcare/pendaftaran/rawat/${encodeURIComponent(noRawat)}`, {
        headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        credentials: 'include',
      });
      if (res.status === 401) {
        setBridgingError('Tidak diizinkan');
        setBridgingLoading(false);
        return;
      }
      const json = await res.json();
      const data = json && json.data ? json.data : {};
      const status = data && data.status ? data.status : 'Tidak Diketahui';
      const noUrut = data && data.response && data.response.field === 'noUrut' ? (data.response.message || '') : '';
      const meta = (json && json.metaData && json.metaData.message) ? json.metaData.message : (data && data.metaData && data.metaData.message ? data.metaData.message : '');
      setBridgingInfo({ status, noUrut, meta });
    } catch (e) {
      setBridgingError(e?.message || String(e));
    } finally {
      setBridgingLoading(false);
    }
  };

  const customTemplates = useMemo(() => ([
    {
      key: 'normal',
      label: 'Pemeriksaan Normal',
      template: {
        suhu_tubuh: '36.8',
        tensi: '120/80',
        nadi: '80',
        respirasi: '20',
        spo2: '98',
        keluhan: '',
        pemeriksaan: 'Keadaan umum baik, kesadaran Compos Mentis. TD 120/80 mmHg; Nadi 80 x/menit; RR 20 x/menit; Suhu 36.8°C; SpO2 98%. Pemeriksaan fisik dalam batas normal tanpa temuan patologis.',
        penilaian: 'Pemeriksaan Normal',
        rtl: 'Observasi, edukasi kesehatan, anjuran kembali bila muncul keluhan.',
        instruksi: 'Kontrol bila ada keluhan baru atau perubahan kondisi.',
        evaluasi: ''
      }
    },
    {
      key: 'karies_dentin',
      label: 'Karies Dentin',
      template: {
        suhu_tubuh: '36.8',
        tensi: '120/80',
        nadi: '80',
        respirasi: '20',
        spo2: '98',
        keluhan: 'Nyeri gigi dipicu manis/dingin/panas, kadang terselip makanan.',
        pemeriksaan: 'Mulut: kebersihan sedang, plak ada. Kavitas pada gigi dengan dentin terbuka, vitalitas positif, perkusi (-), palpasi (-), gingiva sekitar normal.',
        penilaian: 'Karies Dentin',
        rtl: 'Restorasi sementara, fluor topikal, edukasi kebersihan gigi dan diet gula.',
        instruksi: 'Sikat gigi 2x/hari dengan fluoride, benang gigi, kontrol bila nyeri menetap.',
        evaluasi: ''
      }
    },
    {
      key: 'pulpitis',
      label: 'Pulpitis',
      template: {
        suhu_tubuh: '36.8',
        tensi: '120/80',
        nadi: '80',
        respirasi: '20',
        spo2: '98',
        keluhan: 'Nyeri berdenyut pada gigi, lebih berat malam hari, sensitif dingin/panas.',
        pemeriksaan: 'Tes perkusi (+), kavitas dalam, sensitivitas termal meningkat, pembengkakan gingiva minimal.',
        penilaian: 'Pulpitis',
        rtl: 'Analgesik; rujuk ke dokter gigi untuk terapi endodontik atau tindakan definitif.',
        instruksi: 'Hindari pemicu dingin/panas; jaga kebersihan mulut.',
        evaluasi: ''
      }
    },
    {
      key: 'gingivitis',
      label: 'Gingivitis',
      template: {
        suhu_tubuh: '36.8',
        tensi: '120/80',
        nadi: '80',
        respirasi: '20',
        spo2: '98',
        keluhan: 'Gusi bengkak dan mudah berdarah saat menyikat gigi; bau mulut.',
        pemeriksaan: 'Eritema dan edema gingiva, plak/kalkulus, perdarahan mudah saat probing.',
        penilaian: 'Gingivitis',
        rtl: 'Edukasi oral hygiene, pertimbangkan scaling/cleaning; antiseptik kumur bila perlu.',
        instruksi: 'Teknik sikat gigi yang benar; kontrol kebersihan.',
        evaluasi: ''
      }
    },
    {
      key: 'periodontitis_ringan',
      label: 'Periodontitis Ringan',
      template: {
        suhu_tubuh: '36.8',
        tensi: '120/80',
        nadi: '80',
        respirasi: '20',
        spo2: '98',
        keluhan: 'Gusi mudah berdarah, ketidaknyamanan, kadang mobilitas gigi ringan.',
        pemeriksaan: 'Poket dangkal, kalkulus, inflamasi gingiva; mobilitas minimal.',
        penilaian: 'Periodontitis Ringan',
        rtl: 'Scaling, root planing sederhana bila tersedia, antiseptik; rujuk bila berat.',
        instruksi: 'Perawatan kebersihan mulut; kontrol berkala.',
        evaluasi: ''
      }
    },
    {
      key: 'abses_periapikal',
      label: 'Abses Periapikal',
      template: {
        suhu_tubuh: '37.8',
        tensi: '120/80',
        nadi: '88',
        respirasi: '18',
        spo2: '98',
        keluhan: 'Pembengkakan lokal pada gusi/pipi dengan nyeri berdenyut; demam ringan.',
        pemeriksaan: 'Fluktuasi lokal (+), nyeri tekan, gigi terkait sensitif; tanda selulitis wajah (-).',
        penilaian: 'Abses Periapikal',
        rtl: 'Drainase bila perlu; analgesik; antibiotik bila ada tanda penyebaran; rujuk ke dokter gigi.',
        instruksi: 'Kompres hangat; kembali bila pembengkakan meluas atau demam tinggi.',
        evaluasi: ''
      }
    },
    {
      key: 'odontalgia',
      label: 'Odontalgia',
      template: {
        suhu_tubuh: '36.8',
        tensi: '120/80',
        nadi: '80',
        respirasi: '20',
        spo2: '98',
        keluhan: 'Nyeri gigi tanpa temuan spesifik; dipicu kunyah/dingin.',
        pemeriksaan: 'Tes perkusi ringan (+/-), kemungkinan kavitas kecil/karies awal; tanpa pembengkakan.',
        penilaian: 'Odontalgia',
        rtl: 'Analgesik; observasi; rujuk ke dokter gigi untuk evaluasi lanjutan.',
        instruksi: 'Hindari pemicu; tingkatkan kebersihan mulut.',
        evaluasi: ''
      }
    },
    {
      key: 'stomatitis_aftosa',
      label: 'Stomatitis Aftosa',
      template: {
        suhu_tubuh: '36.8',
        tensi: '120/80',
        nadi: '80',
        respirasi: '20',
        spo2: '98',
        keluhan: 'Sariawan nyeri pada mukosa mulut; sulit makan/minum.',
        pemeriksaan: 'Lesi aftosa multipel atau tunggal dengan halo eritem; tanpa demam.',
        penilaian: 'Stomatitis Aftosa',
        rtl: 'Topikal anestetik/antiinflamasi; hindari iritan; terapi suportif.',
        instruksi: 'Makanan lunak; kebersihan mulut; kontrol bila memburuk.',
        evaluasi: ''
      }
    },
    {
      key: 'perikoronitis',
      label: 'Perikoronitis',
      template: {
        suhu_tubuh: '36.9',
        tensi: '120/80',
        nadi: '82',
        respirasi: '20',
        spo2: '98',
        keluhan: 'Nyeri dan bengkak pada gigi bungsu erupsi sebagian; sulit membuka mulut.',
        pemeriksaan: 'Operkulum inflamasi, nyeri tekan; kadang trismus ringan; drainase serosa.',
        penilaian: 'Perikoronitis',
        rtl: 'Irigasi; analgesik; antibiotik bila ada tanda infeksi sistemik; rujuk ke dokter gigi.',
        instruksi: 'Kumur antiseptik; hindari impaksi makanan; kontrol bila memburuk.',
        evaluasi: ''
      }
    },
    {
      key: 'artritis',
      label: 'Artritis',
      template: {
        suhu_tubuh: '36.9',
        tensi: '120/80',
        nadi: '82',
        respirasi: '20',
        spo2: '98',
        keluhan: 'Nyeri/kaku sendi, terutama pagi hari; kadang bengkak; tanpa tanda bahaya.',
        pemeriksaan: 'KU baik, kesadaran Compos Mentis. TD 120/80; Nadi 82; RR 20; Suhu 36.9°C; SpO2 98%. Sendi: nyeri tekan, hangat minimal, ROM sedikit terbatas, tanpa deformitas akut, tanpa eritem difus. Neuro vaskular distal baik.',
        penilaian: 'Artritis',
        rtl: 'Simptomatik: OAINS bila perlu, kompres hangat, istirahat sendi, edukasi. Red flag → evaluasi lanjut/rujuk.',
        instruksi: 'Latihan ringan sesuai toleransi, hindari aktivitas berat saat nyeri akut.',
        evaluasi: ''
      }
    },
    {
      key: 'mialgia',
      label: 'Mialgia',
      template: {
        suhu_tubuh: '36.8',
        tensi: '120/80',
        nadi: '80',
        respirasi: '20',
        spo2: '98',
        keluhan: 'Nyeri otot difus/lokal, pegal, tanpa defisit neurologis.',
        pemeriksaan: 'KU baik, kesadaran Compos Mentis. TD 120/80; Nadi 80; RR 20; Suhu 36.8°C; SpO2 98%. Otot: nyeri tekan, kekuatan 5/5, ROM adekuat, tanpa bengkak lokal bermakna.',
        penilaian: 'Mialgia',
        rtl: 'Analgesik ringan, peregangan, hidrasi, istirahat; edukasi postur & ergonomi.',
        instruksi: 'Kembali bila nyeri menetap/memburuk atau muncul kelemahan.',
        evaluasi: ''
      }
    },
    {
      key: 'nyeri_pinggang',
      label: 'Nyeri Pinggang Non Spesifik',
      template: {
        suhu_tubuh: '36.8',
        tensi: '120/80',
        nadi: '78',
        respirasi: '18',
        spo2: '98',
        keluhan: 'Nyeri pinggang mekanik, tanpa red flag, tidak menjalar jauh.',
        pemeriksaan: 'KU baik. TD 120/80; Nadi 78; RR 18; Suhu 36.8°C; SpO2 98%. Lasegue (-), motor-sensori normal, nyeri tekan paravertebral, ROM lumbar sedikit terbatas.',
        penilaian: 'Nyeri Pinggang Non Spesifik',
        rtl: 'OAINS bila perlu, kompres hangat, edukasi ergonomi, latihan penguatan core.',
        instruksi: 'Waspada red flag: kelemahan progresif, gangguan BAK/BAB, demam tinggi.',
        evaluasi: ''
      }
    },
    {
      key: 'ispa_ringan',
      label: 'ISPA Ringan',
      template: {
        suhu_tubuh: '37.2',
        tensi: '120/80',
        nadi: '88',
        respirasi: '22',
        spo2: '98',
        keluhan: 'Batuk pilek ringan tanpa sesak, demam rendah, tidak ada tanda bahaya.',
        pemeriksaan: 'Keadaan umum baik, kesadaran Compos Mentis. TD 120/80; Nadi 88; RR 22; Suhu 37.2°C; SpO2 98%. Faring hiperemis ringan, paru bersih, tanpa wheezing/rales.',
        penilaian: 'ISPA Ringan',
        rtl: 'Simptomatik, hidrasi cukup, istirahat, edukasi etika batuk dan PHBS.',
        instruksi: 'Antipiretik bila perlu, saline nasal, kembali bila memburuk.',
        evaluasi: ''
      }
    },
    {
      key: 'dispepsia',
      label: 'Dispepsia/Gastritis',
      template: {
        suhu_tubuh: '36.8',
        tensi: '120/80',
        nadi: '82',
        respirasi: '20',
        spo2: '98',
        keluhan: 'Nyeri ulu hati, mual, kembung, tanpa alarm sign (hematemesis, melena, penurunan BB cepat).',
        pemeriksaan: 'KU baik. TD 120/80; Nadi 82; RR 20; Suhu 36.8°C; SpO2 98%. Abdomen supel, nyeri tekan epigastrium ringan, tanpa defans.',
        penilaian: 'Dispepsia/Gastritis',
        rtl: 'Antasida/PPIs sesuai kebutuhan, modifikasi diet, edukasi hindari iritan.',
        instruksi: 'Kontrol bila tidak membaik atau muncul alarm sign.',
        evaluasi: ''
      }
    },
    {
      key: 'hipertensi',
      label: 'Hipertensi Terkontrol',
      template: {
        suhu_tubuh: '36.8',
        tensi: '130/80',
        nadi: '78',
        respirasi: '18',
        spo2: '98',
        keluhan: 'Kontrol rutin, tanpa keluhan bermakna.',
        pemeriksaan: 'KU baik. TD 130/80; Nadi 78; RR 18; Suhu 36.8°C; SpO2 98%. Pemeriksaan fisik dalam batas normal.',
        penilaian: 'Hipertensi Esensial Terkontrol',
        rtl: 'Lanjutkan terapi, anjuran DASH, aktivitas fisik, pantau tekanan darah.',
        instruksi: 'Perbaiki gaya hidup, obat sesuai regimen, kontrol berkala.',
        evaluasi: ''
      }
    }
  ]), []);

  const templateOptions = useMemo(() => {
    return [
      { key: '', label: '— Kosongkan —' },
      ...customTemplates.map((t) => ({ key: t.key, label: t.label })),
      ...DWFKTP_TEMPLATES.map((t) => ({ key: t.key, label: t.label })),
    ];
  }, [customTemplates]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const templatesMap = useMemo(() => {
    const map = {};
    DWFKTP_TEMPLATES.forEach((t) => { map[t.key] = t.template; });
    customTemplates.forEach((t) => { map[t.key] = t.template; });
    return map;
  }, [customTemplates]);
  const stripTTV = (text) => {
    if (!text) return '';
    return String(text).replace(/suhu\s*:.*$/gmi, '').replace(/tensi\s*:.*$/gmi, '').replace(/nadi\s*:.*$/gmi, '').replace(/respirasi\s*:.*$/gmi, '').replace(/spo2\s*:.*$/gmi, '').replace(/gcs\s*:.*$/gmi, '').trim();
  };
  const applyTemplate = (key) => {
    const tpl = key ? templatesMap[key] : null;
    if (!tpl) return;
    const cleanedPemeriksaan = stripTTV(tpl.pemeriksaan || '');
    setFormData((prev) => ({
      ...prev,
      suhu_tubuh: tpl.suhu_tubuh || '',
      tensi: tpl.tensi || '',
      nadi: tpl.nadi || '',
      respirasi: tpl.respirasi || '',
      spo2: tpl.spo2 || '',
      gcs: tpl.gcs || prev.gcs || '',
      lingkar_perut: tpl.lingkar_perut || prev.lingkar_perut || '',
      keluhan: tpl.keluhan || '',
      pemeriksaan: cleanedPemeriksaan || '',
      penilaian: tpl.penilaian || '',
      rtl: tpl.rtl || '',
      instruksi: tpl.instruksi || '',
      evaluasi: tpl.evaluasi || '',
      alergi: tpl.alergi || prev.alergi || '',
    }));
  };
  const clearTemplateFields = () => {
    setFormData((prev) => ({
      ...prev,
      suhu_tubuh: '',
      tensi: '',
      nadi: '',
      respirasi: '',
      spo2: '',
      keluhan: '',
      pemeriksaan: '',
      penilaian: '',
      rtl: '',
      instruksi: '',
      evaluasi: '',
    }));
    setSelectedTemplate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)] font-mono rounded-2xl border border-[oklch(84.1%_0.238_128.85_/_0.35)] shadow-[0_0_20px_oklch(84.1%_0.238_128.85_/_0.25)] overflow-hidden">
      

      <div className="px-4 py-2.5 border-b border-[oklch(84.1%_0.238_128.85_/_0.35)]"></div>

      <div className="p-3 space-y-3">

        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <div className="min-w-0 flex flex-row items-center gap-2">
              <label htmlFor="tgl_perawatan" className="text-[11px]">Tanggal</label>
              <input id="tgl_perawatan" name="tgl_perawatan" type="date" value={formData.tgl_perawatan} onChange={handleChange}
                className="text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] placeholder-[oklch(84.1%_0.238_128.85_/_0.6)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
              <label htmlFor="jam_rawat" className="text-[11px]">Jam</label>
              <input id="jam_rawat" name="jam_rawat" type="time" value={formData.jam_rawat} onChange={handleChange}
                className="text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] placeholder-[oklch(84.1%_0.238_128.85_/_0.6)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
            </div>
            <div className="min-w-0 flex flex-row items-center gap-2">
              <label className="text-[11px] font-semibold">Kesadaran</label>
              <select name="kesadaran" value={formData.kesadaran} onChange={handleChange}
                className="w-full text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]">
                {kesadaranOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="min-w-0 flex items-center gap-2">
              <label className="text-[11px] font-semibold">Pemeriksa</label>
              <div className="w-full">
                <select
                  value={formData.nip}
                  onChange={(e) => setFormData((p) => ({ ...p, nip: e.target.value }))}
                  className="w-full text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]"
                >
                  <option value="">{pegawaiDisplay || currentName || '— Pilih pegawai —'}</option>
                  {pegawaiOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="min-w-0 flex flex-row items-center gap-2 flex-wrap">
            <label className="text-[11px] font-semibold">Alergi</label>
            <select value={alergiJenis} onChange={(e) => setAlergiJenis(e.target.value)}
              className="w-32 text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]">
              {jenisAlergiOptions.length > 0 ? (
                jenisAlergiOptions.map((opt) => (
                  <option key={opt.code} value={opt.code}>{opt.label}</option>
                ))
              ) : (
                <option value="">Tidak Ada</option>
              )}
            </select>
            <button
              type="button"
              onClick={() => setAlergiCrudOpen(true)}
              className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] text-[oklch(84.1%_0.238_128.85)] hover:bg-[oklch(14.5%_0_0_/_0.9)]"
              aria-label="Tambah Alergi"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
            <div className="flex-1 min-w-[220px]">
              <select
                value={kdAlergi}
                onChange={(e) => {
                  const v = e.target.value;
                  setKdAlergi(v);
                  const opt = alergiOptions.find((o) => o.value === v);
                  setFormData((p) => ({ ...p, alergi: opt ? opt.label : '' }));
                }}
                className="w-full text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]"
              >
                <option value="">Tidak Ada</option>
                {alergiOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <label className="text-[11px] font-semibold">Template :</label>
            <div className="w-40 md:w-52">
              <SearchableSelect
                options={templateOptions}
                value={selectedTemplate}
                onChange={(val) => { setSelectedTemplate(val); applyTemplate(val); }}
                placeholder="Pilih template..."
                searchPlaceholder="Cari diagnosa..."
                displayKey="label"
                valueKey="key"
                className="!h-7 !px-1.5 !py-0.5 !text-[11px] !rounded !shadow-none !bg-[oklch(14.5%_0_0)] !text-[oklch(98.5%_0_0)] !border-[oklch(84.1%_0.238_128.85_/_0.35)] !focus:ring-[oklch(84.1%_0.238_128.85)] !focus:border-[oklch(84.1%_0.238_128.85)] shadow-[0_0_10px_oklch(84.1%_0.238_128.85_/_0.4)]"
                dropdownClassName="bg-[oklch(14.5%_0_0)] border-[oklch(84.1%_0.238_128.85_/_0.5)] shadow-[0_0_14px_oklch(84.1%_0.238_128.85_/_0.5)]"
                searchInputClassName="bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)] placeholder-[oklch(84.1%_0.238_128.85_/_0.7)] border-[oklch(84.1%_0.238_128.85_/_0.5)] focus:ring-[oklch(84.1%_0.238_128.85)] focus:border-[oklch(84.1%_0.238_128.85)] drop-shadow-[0_0_6px_oklch(84.1%_0.238_128.85_/_0.6)]"
                optionClassName="bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)] drop-shadow-[0_0_4px_oklch(84.1%_0.238_128.85_/_0.5)]"
                selectedOptionClassName="bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)]"
                optionHoverClassName="hover:bg-[oklch(14.5%_0_0)]"
                selectedOptionHoverClassName="hover:bg-[oklch(14.5%_0_0)]"
                displayClassName="text-[oklch(98.5%_0_0)] drop-shadow-[0_0_6px_oklch(84.1%_0.238_128.85_/_0.7)]"
              />
            </div>
            <button
              type="button"
              onClick={clearTemplateFields}
              className="inline-flex items-center w-auto p-1 text-[oklch(84.1%_0.238_128.85)] bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.35)] rounded-md hover:bg-[oklch(14.5%_0_0_/_0.9)] transition-colors"
              aria-label="Bersihkan Form"
              title="Bersihkan"
            >
              <Eraser className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          <div>
            <label className="block text-[11px] mb-0.5">Suhu (°C)</label>
            <input name="suhu_tubuh" value={formData.suhu_tubuh || ''} onChange={handleChange}
              className="w-full text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
          <div>
            <label className="block text-[11px] mb-0.5">Tensi (mmHg)</label>
            <input name="tensi" value={formData.tensi || ''} onChange={handleChange}
              className="w-full text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
          <div>
            <label className="block text-[11px] mb-0.5">Nadi (/menit)</label>
            <input name="nadi" value={formData.nadi || ''} onChange={handleChange}
              className="w-full text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
          <div>
            <label className="block text-[11px] mb-0.5">Respirasi (/menit)</label>
            <input name="respirasi" value={formData.respirasi || ''} onChange={handleChange}
              className="w-full text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
          <div>
            <label className="block text-[11px] mb-0.5">SpO2 (%)</label>
            <input name="spo2" value={formData.spo2 || ''} onChange={handleChange}
              className="w-full text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
          <div>
            <label className="block text-[11px] mb-0.5">Tinggi (cm)</label>
            <input name="tinggi" value={formData.tinggi || ''} onChange={handleChange}
              className="w-full text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
          <div>
            <label className="block text-[11px] mb-0.5">Berat (kg)</label>
            <input name="berat" value={formData.berat || ''} onChange={handleChange}
              className="w-full text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
          <div>
            <label className="block text-[11px] mb-0.5">GCS</label>
            <input name="gcs" value={formData.gcs || ''} onChange={handleChange}
              className="w-full text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
          <div>
            <label className="block text-[11px] mb-0.5">Lingkar Perut (cm)</label>
            <input name="lingkar_perut" value={formData.lingkar_perut || ''} onChange={handleChange}
              className="w-full text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold">Keluhan Utama (Subjektif)</label>
            <textarea name="keluhan" rows={4} value={formData.keluhan} onChange={handleChange}
              className="w-full text-xs rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold">Pemeriksaan Fisik (Objektif)</label>
            <textarea name="pemeriksaan" rows={4} value={formData.pemeriksaan} onChange={handleChange}
              className="w-full text-xs rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold">Penilaian (Assessment)</label>
            <textarea name="penilaian" rows={3} value={formData.penilaian} onChange={handleChange}
              className="w-full text-xs rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-semibold">Rencana Tindak Lanjut (Planning)</label>
            </div>
            <textarea name="rtl" rows={3} value={formData.rtl} onChange={handleChange}
              className="w-full text-xs rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold">Instruksi Medis</label>
            <textarea name="instruksi" rows={2} value={formData.instruksi} onChange={handleChange}
              className="w-full text-xs rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold">Evaluasi</label>
            <textarea name="evaluasi" rows={2} value={formData.evaluasi} onChange={handleChange}
              className="w-full text-xs rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 flex-wrap">
          <button type="submit" className="px-4 py-2 rounded-lg bg-[oklch(84.1%_0.238_128.85)] text-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85)] shadow-[0_0_12px_oklch(84.1%_0.238_128.85_/_0.45)]">
            {editKey ? 'Update Pemeriksaan' : 'Simpan Pemeriksaan'}
          </button>
          {showBridging && (
            <button
              type="button"
              onClick={() => {
                if (typeof onOpenBridging === 'function') {
                  onOpenBridging();
                } else {
                  openBridgingModal();
                }
              }}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-[oklch(84.1%_0.238_128.85)] text-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85)] shadow-[0_0_12px_oklch(84.1%_0.238_128.85_/_0.45)]"
              title="Bridging PCare"
            >
              Bridging PCare
            </button>
          )}
          {rujukanBerhasil && (
            <button
              type="button"
              onClick={async () => {
                try {
                  const resR = await fetch(`/api/pcare/rujuk-subspesialis/rawat/${encodeURIComponent(noRawat)}`, { headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'include' });
                  const jsR = await resR.json();
                  const r = jsR.data || {};
                  let pd = {};
                  try {
                    const resP = await fetch(`/api/pcare/pendaftaran/rawat/${encodeURIComponent(noRawat)}`, { headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'include' });
                    const jsP = await resP.json();
                    pd = jsP.data || {};
                  } catch {}
                  let kabupatenKota = '';
                  try {
                    const resK = await fetch('/api/pcare/config/kabupaten', { headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'include' });
                    const jsK = await resK.json();
                    kabupatenKota = jsK?.kabupaten || '';
                  } catch {}
                  const fmtIdDateShort = (d) => {
                    if (!d) return '-';
                    try {
                      if (typeof d === 'string' && d.includes('-')) {
                        const parts = d.split('-');
                        if (parts.length === 3) {
                          if (parts[0].length === 2 && parts[2].length === 4) {
                            const dt = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
                            const dd = String(dt.getDate()).padStart(2,'0');
                            const mm = String(dt.getMonth()+1).padStart(2,'0');
                            const yy = dt.getFullYear();
                            return `${dd}-${mm}-${yy}`;
                          }
                          const dt = new Date(d);
                          const dd = String(dt.getDate()).padStart(2,'0');
                          const mm = String(dt.getMonth()+1).padStart(2,'0');
                          const yy = dt.getFullYear();
                          return `${dd}-${mm}-${yy}`;
                        }
                      }
                      const dt = new Date(d);
                      const dd = String(dt.getDate()).padStart(2,'0');
                      const mm = String(dt.getMonth()+1).padStart(2,'0');
                      const yy = dt.getFullYear();
                      return `${dd}-${mm}-${yy}`;
                    } catch { return String(d); }
                  };
                  const noKunjungan = r.noKunjungan || lastNoKunjungan || '';
                  const kdPPK = r.kdPPK || '';
                  const nmPPK = r.nmPPK || '';
                  const kdSubSpesialis = r.kdSubSpesialis || '';
                  const nmSubSpesialis = r.nmSubSpesialis || '';
                  const kdSarana = r.kdSarana || '';
                  const tglEstRujuk = r.tglEstRujuk || '';
                  let tglValiditasStr = '-';
                  if (tglEstRujuk) {
                    try {
                      let tglEstDate;
                      if (typeof tglEstRujuk === 'string' && tglEstRujuk.includes('-')) {
                        const parts = tglEstRujuk.split('-');
                        if (parts.length === 3) {
                          if (parts[0].length === 2 && parts[2].length === 4) {
                            tglEstDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
                          } else {
                            tglEstDate = new Date(tglEstRujuk);
                          }
                        } else { tglEstDate = new Date(tglEstRujuk); }
                      } else { tglEstDate = new Date(tglEstRujuk); }
                      const tglValiditas = new Date(tglEstDate); tglValiditas.setDate(tglValiditas.getDate()+90);
                      tglValiditasStr = fmtIdDateShort(tglValiditas.toISOString().split('T')[0]);
                    } catch { tglValiditasStr = '-'; }
                  }
                  const namaPasien = r.nm_pasien || pd?.nm_pasien || pd?.nama || '-';
                  const noKartu = r.noKartu || pd?.noKartu || pd?.no_kartu || '-';
                  const kdDiag1 = r.kdDiag1 || '';
                  const nmDiag1 = r.nmDiag1 || '';
                  const diagnosaDisplay = nmDiag1 ? `${nmDiag1} (${kdDiag1})` : (kdDiag1 || '-');
                  const umur = r.umur || r.umurdaftar || '';
                  const umurDisplay = umur ? String(umur) : '-';
                  const tglLahir = r.tgl_lahir || '';
                  const tglLahirStr = tglLahir ? fmtIdDateShort(tglLahir) : '-';
                  const statusPeserta = r.statusPeserta || '1';
                  const statusDisplay = statusPeserta === '1' ? '1 Utama/Tanggungan' : statusPeserta === '2' ? '2 Istri' : statusPeserta === '3' ? '3 Anak' : `${statusPeserta} Lainnya`;
                  const jenisKelamin = r.jenisKelamin || pd?.jk || pd?.jenis_kelamin || 'L';
                  const genderDisplay = jenisKelamin === 'L' ? 'L (L / P)' : jenisKelamin === 'P' ? 'P (L / P)' : 'L (L / P)';
                  const tglDaftar = r.tglDaftar || '';
                  const tglDaftarStr = tglDaftar ? fmtIdDateShort(tglDaftar) : '-';
                  const nmDokter = r.nm_dokter || '';
                  const base = typeof window !== 'undefined' && window.location ? window.location.origin || '' : '';
                  const logoCandidates = [ `${base}/img/BPJS_Kesehatan_logo.png`, '/img/BPJS_Kesehatan_logo.png' ];
                  let logoSrc = '/img/BPJS_Kesehatan_logo.png';
                  try {
                    const fetchAsDataURL = async (url) => {
                      const controller = new AbortController();
                      const timeoutId = setTimeout(() => controller.abort(), 500);
                      try {
                        const rr = await fetch(url, { method: 'GET', signal: controller.signal });
                        clearTimeout(timeoutId);
                        if (!rr.ok) throw new Error('not ok');
                        const blob = await rr.blob();
                        return await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onloadend = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(blob); });
                      } catch (e) { clearTimeout(timeoutId); throw e; }
                    };
                    const logoPromise = Promise.race([
                      (async () => { for (const u of logoCandidates) { try { const dataUrl = await fetchAsDataURL(u); if (dataUrl) return dataUrl; } catch {} } return '/img/BPJS_Kesehatan_logo.png'; })(),
                      new Promise((resolve) => setTimeout(() => resolve('/img/BPJS_Kesehatan_logo.png'), 800))
                    ]);
                    logoSrc = await logoPromise;
                  } catch {}
                  const providerLabel = nmPPK || kdPPK || '-';
                  const fktpDisplay = providerLabel || '-';
                  const subSpDisplay = nmSubSpesialis || kdSubSpesialis || '-';
                  const diDisplay = nmPPK || fktpDisplay || '-';
                  let win = null;
                  try {
                    win = typeof window !== 'undefined' ? window.open('', 'CetakRujukan', 'width=900,height=1000') : null;
                    if (!win || win.closed || typeof win.closed === 'undefined') { alert('Popup diblokir oleh browser. Silakan izinkan popup untuk halaman ini.'); return; }
                  } catch (e) { setError('Gagal membuka window cetak: ' + (e.message || e)); return; }
                  const barcodeSvg = noKunjungan ? `<svg id="barcode"></svg>` : '';
                  const html = `<!doctype html><html lang="id"><head><meta charset="utf-8"/><title>Surat Rujukan FKTP</title><script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script><style>@page{size:A4 portrait;margin:12mm}html,body{height:100%;margin:0;padding:0}body{-webkit-print-color-adjust:exact;print-color-adjust:exact;font-family:Arial, Helvetica, sans-serif;color:#111;width:186mm}.wrap{width:100%;margin:0 auto;padding:0}.header{display:flex;align-items:flex-start;justify-content:space-between;border-bottom:3px solid #0d47a1;padding-bottom:10px;margin-bottom:14px}.brand{display:flex;align-items:center;gap:16px}.brand img{height:50px;object-fit:contain;image-rendering:-webkit-optimize-contrast}.brand-title{font-size:30px;font-weight:bold;line-height:1}.brand-title .bpjs{color:#1a237e}.brand-title .kesehatan{color:#2e7d32}.brand-sub{font-size:14px;color:#1a237e;margin-top:2px}.header-right{text-align:right;font-size:12px;color:#444}.header-right div{margin-bottom:4px}.doc-title{font-size:20px;font-weight:bold;text-align:center;margin:12px 0}.rujukan-box{border:2px solid #333;padding:12px;margin:12px 0;background:#fff;display:grid;grid-template-columns:1fr auto;gap:12px;align-items:start}.rujukan-left{flex:1}.rujukan-right{text-align:center}.rujukan-row{display:flex;gap:8px;margin:6px 0;font-size:13px}.rujukan-label{min-width:140px;font-weight:bold}.rujukan-value{flex:1}#barcode{max-width:120px;height:auto}.pasien-section{margin:16px 0}.pasien-title{font-weight:bold;margin-bottom:8px;font-size:13px}.pasien-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.pasien-row{display:flex;gap:8px;margin:4px 0;font-size:13px}.pasien-label{min-width:140px;font-weight:bold}.pasien-value{flex:1}.footer-section{margin-top:20px}.footer-row{display:flex;justify-content:space-between;margin:8px 0;font-size:13px}.footer-left{flex:1}.footer-right{text-align:right}.small{font-size:11px;color:#666}.terimakasih{margin-top:0;margin-bottom:8px;font-size:13px}.footer-row-top{margin-bottom:8px;font-size:13px}.validitas-wrapper{flex:1;text-align:left;display:flex;flex-direction:column}.validitas{font-size:12px;margin-top:0}.ttd-section{margin-top:20px;font-size:13px}.ttd-date{text-align:right}.ttd-name{font-weight:bold;margin-top:0;text-align:right}.ttd-row{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-top:0}</style></head><body><div class="wrap"><div class="header"><div class="brand">${logoSrc?`<img src="${logoSrc}" alt="BPJS Kesehatan"/>`:''}</div><div class="header-right"><div><strong>Kedeputian Wilayah</strong></div><div>KEDEPUTIAN WILAYAH VI</div><div style="margin-top:8px;"><strong>Kantor Cabang</strong></div><div>SURAKARTA</div></div></div><div class="doc-title">Surat Rujukan FKTP</div><div class="rujukan-box"><div class="rujukan-left"><div class="rujukan-row"><div class="rujukan-label">No. Rujukan</div><div class="rujukan-value">: ${noKunjungan}</div></div><div class="rujukan-row"><div class="rujukan-label">FKTP</div><div class="rujukan-value">: ${fktpDisplay}</div></div>${kabupatenKota?`<div class="rujukan-row"><div class="rujukan-label">Kabupaten / Kota</div><div class="rujukan-value">: ${kabupatenKota}</div></div>`:''}<div class="rujukan-row"><div class="rujukan-label">Kepada Yth. TS Dokter</div><div class="rujukan-value">: ${subSpDisplay}</div></div><div class="rujukan-row"><div class="rujukan-label">Di</div><div class="rujukan-value">: ${diDisplay}</div></div>${kdSarana?`<div class="rujukan-row"><div class="rujukan-label">Sarana</div><div class="rujukan-value">: ${kdSarana}</div></div>`:''}</div><div class="rujukan-right">${barcodeSvg}</div></div><div class="pasien-section"><div class="pasien-title">Mohon pemeriksaan dan penangan lebih lanjut pasien :</div><div class="pasien-grid"><div class="pasien-row"><div class="pasien-label">Nama</div><div class="pasien-value">: ${namaPasien}</div></div><div class="pasien-row"><div class="pasien-label">No. Kartu BPJS</div><div class="pasien-value">: ${noKartu}</div></div><div class="pasien-row"><div class="pasien-label">Diagnosa</div><div class="pasien-value">: ${diagnosaDisplay}</div></div><div class="pasien-row"><div class="pasien-label">Umur</div><div class="pasien-value">: ${umurDisplay}</div></div><div class="pasien-row"><div class="pasien-label">Tahun</div><div class="pasien-value">: ${tglLahirStr}</div></div><div class="pasien-row"><div class="pasien-label">Status</div><div class="pasien-value">: ${statusDisplay}</div></div><div class="pasien-row"><div class="pasien-label">Gender</div><div class="pasien-value">: ${genderDisplay}</div></div><div class="pasien-row"><div class="pasien-label">Catatan</div><div class="pasien-value">:</div></div><div class="pasien-row"><div class="pasien-label">Telah diberikan</div><div class="pasien-value">:</div></div></div></div><div class="footer-section"><div class="ttd-section"><div style="margin-bottom:4px;text-align:right;">Salam sejawat,</div><div class="ttd-date">${tglDaftarStr}</div><div style="height:50px;margin-top:8px;"></div><div class="ttd-row"><div class="validitas-wrapper"><div class="terimakasih">Atas bantuannya, diucapkan terima kasih</div><div class="footer-row-top"><div><strong>Tgl. Rencana Berkunjung</strong>: ${fmtIdDateShort(tglEstRujuk)||'-'}</div><div class="small">Surat rujukan berlaku 1[satu] kali kunjungan, berlaku sampai dengan : ${tglValiditasStr}</div></div></div><div class="ttd-name">${nmDokter||'-'}</div></div></div></div><script>${noKunjungan?`JsBarcode("#barcode","${noKunjungan}",{format:"CODE128",width:2,height:50,displayValue:false});`:''}window.onload=function(){window.print();setTimeout(function(){window.close();},600);};</script></body></html>`;
                  try { win.document.write(html); win.document.close(); } catch (e) { setError('Gagal menulis konten cetak: ' + (e.message || e)); if (win && !win.closed) { win.close(); } }
                } catch (e) { setError(`Gagal mencetak rujukan: ${e.message || e}`); }
              }}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-[oklch(84.1%_0.238_128.85)] text-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85)] shadow-[0_0_12px_oklch(84.1%_0.238_128.85_/_0.45)]"
              title="Cetak Rujukan"
            >
              Cetak Rujukan
            </button>
          )}
        </div>
        <div className="mt-3 rounded-2xl border border-[oklch(84.1%_0.238_128.85_/_0.35)] shadow-[0_0_14px_oklch(84.1%_0.238_128.85_/_0.25)] overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[oklch(84.1%_0.238_128.85_/_0.35)] text-sm font-semibold">Riwayat Pemeriksaan</div>
          <div className="p-3">
            {historyLoading && (
              <div className="text-[11px]">Memuat…</div>
            )}
            {!historyLoading && historyError && (
              <div className="text-[11px] text-red-500">{historyError}</div>
            )}
            {!historyLoading && !historyError && (
              <div className="space-y-2">
                {Array.isArray(historyList) && historyList.length > 0 ? (
                  [...historyList]
                    .sort((a, b) => {
                      const ta = a?.tgl_perawatan || '';
                      const tb = b?.tgl_perawatan || '';
                      if (ta === tb) {
                        const ja = String(a?.jam_rawat || '');
                        const jb = String(b?.jam_rawat || '');
                        return jb.localeCompare(ja);
                      }
                      const da = new Date(ta);
                      const db = new Date(tb);
                      return db - da;
                    })
                    .slice(0, 10)
                    .map((row, idx) => (
                      <div key={`${row?.no_rawat || ''}-${row?.tgl_perawatan || ''}-${row?.jam_rawat || ''}-${idx}`} className="rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.3)]">
                        <div className="px-3 py-2 text-[11px] flex items-center justify-between">
                          <div className="font-semibold">{row?.tgl_perawatan || '-'} {String(row?.jam_rawat || '').length === 5 ? row?.jam_rawat + ':00' : (row?.jam_rawat || '')}</div>
                          <div className="text-[10px] flex items-center gap-1">
                            <span>{pegawaiMap[String(row?.nik || row?.nip || '')] || row?.nama_pegawai || row?.nama || row?.nip || '-'}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData({
                                  tgl_perawatan: row.tgl_perawatan,
                                  jam_rawat: String(row.jam_rawat).substring(0,5),
                                  suhu_tubuh: row.suhu_tubuh || '',
                                  tensi: row.tensi || '',
                                  nadi: row.nadi || '',
                                  respirasi: row.respirasi || '',
                                  tinggi: row.tinggi || '',
                                  berat: row.berat || '',
                                  spo2: row.spo2 || '',
                                  gcs: row.gcs || '',
                                  kesadaran: row.kesadaran || 'Compos Mentis',
                                  keluhan: row.keluhan || '',
                                  pemeriksaan: row.pemeriksaan || '',
                                  alergi: row.alergi || '',
                                  lingkar_perut: row.lingkar_perut || '',
                                  rtl: row.rtl || '',
                                  penilaian: row.penilaian || '',
                                  instruksi: row.instruksi || '',
                                  evaluasi: row.evaluasi || '',
                                  nip: row.nip || '',
                                });
                                // Reset kd_alergi karena data history hanya memiliki label, tidak ada kd_alergi
                                setKdAlergi('');
                                setEditKey({
                                  no_rawat: row.no_rawat,
                                  tgl_perawatan: row.tgl_perawatan,
                                  jam_rawat: String(row.jam_rawat).length === 5 ? row.jam_rawat + ':00' : row.jam_rawat,
                                });
                                setMessage(null);
                                setError(null);
                              }}
                              className="inline-flex items-center justify-center h-5 w-5 rounded-md border border-[oklch(89.7%_0.196_126.665)] text-[oklch(89.7%_0.196_126.665)] hover:bg-[oklch(89.7%_0.196_126.665_/_0.1)]"
                              title="Edit pemeriksaan"
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  const ok = typeof window !== 'undefined' ? window.confirm('Yakin ingin menghapus pemeriksaan ini?') : true;
                                  if (!ok) return;
                                  const url = route('rawat-jalan.pemeriksaan-ralan.delete');
                                  
                                  // Refresh CSRF cookie sebelum request menggunakan axios
                                  try {
                                    await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
                                    await new Promise(resolve => setTimeout(resolve, 300));
                                  } catch (_) {}
                                  
                                  // Gunakan axios yang sudah dikonfigurasi dengan interceptor untuk handle 419
                                  const res = await axios({
                                    method: 'DELETE',
                                    url: url,
                                    data: {
                                      no_rawat: row.no_rawat,
                                      tgl_perawatan: row.tgl_perawatan,
                                      jam_rawat: String(row.jam_rawat).length === 5 ? row.jam_rawat + ':00' : row.jam_rawat,
                                    },
                                    withCredentials: true,
                                    headers: {
                                      'Content-Type': 'application/json',
                                      'Accept': 'application/json',
                                      'X-Requested-With': 'XMLHttpRequest',
                                    },
                                  });
                                  
                                  const json = res.data || {};
                                  setError(null);
                                  setMessage(json.message || 'Pemeriksaan berhasil dihapus');
                                  await reloadHistory();
                                } catch (e) {
                                  const errorMessage = e?.response?.data?.message || 
                                                      e?.message || 
                                                      'Terjadi kesalahan saat menghapus';
                                  setError(errorMessage);
                                  setMessage(null);
                                }
                              }}
                              className="inline-flex items-center justify-center h-5 w-5 rounded-md border border-[oklch(89.7%_0.196_126.665)] text-[oklch(89.7%_0.196_126.665)] hover:bg-[oklch(89.7%_0.196_126.665_/_0.1)]"
                              title="Hapus pemeriksaan"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div className="px-3 pb-2 text-[11px]">
                          <div className="text-[oklch(98.5%_0_0)]">{(row?.keluhan || '').toString().slice(0, 160) || '-'}</div>
                          <div className="mt-1 text-[10px]">{(row?.pemeriksaan || '').toString().slice(0, 200) || '-'}</div>
                          <div className="mt-2 hidden">
                            <button
                              type="button"
                              onClick={() => {
                                setFormData({
                                  tgl_perawatan: row.tgl_perawatan,
                                  jam_rawat: String(row.jam_rawat).substring(0,5),
                                  suhu_tubuh: row.suhu_tubuh || '',
                                  tensi: row.tensi || '',
                                  nadi: row.nadi || '',
                                  respirasi: row.respirasi || '',
                                  tinggi: row.tinggi || '',
                                  berat: row.berat || '',
                                  spo2: row.spo2 || '',
                                  gcs: row.gcs || '',
                                  kesadaran: row.kesadaran || 'Compos Mentis',
                                  keluhan: row.keluhan || '',
                                  pemeriksaan: row.pemeriksaan || '',
                                  alergi: row.alergi || '',
                                  lingkar_perut: row.lingkar_perut || '',
                                  rtl: row.rtl || '',
                                  penilaian: row.penilaian || '',
                                  instruksi: row.instruksi || '',
                                  evaluasi: row.evaluasi || '',
                                  nip: row.nip || '',
                                });
                                // Reset kd_alergi karena data history hanya memiliki label, tidak ada kd_alergi
                                setKdAlergi('');
                                setEditKey({
                                  no_rawat: row.no_rawat,
                                  tgl_perawatan: row.tgl_perawatan,
                                  jam_rawat: String(row.jam_rawat).length === 5 ? row.jam_rawat + ':00' : row.jam_rawat,
                                });
                                setMessage(null);
                                setError(null);
                              }}
                              className="inline-flex items-center px-2 py-1 text-[10px] rounded-md border border-amber-500 text-amber-500 hover:bg-amber-500/10"
                              title="Edit pemeriksaan"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  const ok = typeof window !== 'undefined' ? window.confirm('Yakin ingin menghapus pemeriksaan ini?') : true;
                                  if (!ok) return;
                                  const url = route('rawat-jalan.pemeriksaan-ralan.delete');
                                  let res = await fetch(url, {
                                    method: 'DELETE',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      'Accept': 'application/json',
                                      'X-Requested-With': 'XMLHttpRequest',
                                      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                    },
                                    credentials: 'include',
                                    body: JSON.stringify({
                                      no_rawat: row.no_rawat,
                                      tgl_perawatan: row.tgl_perawatan,
                                      jam_rawat: String(row.jam_rawat).length === 5 ? row.jam_rawat + ':00' : row.jam_rawat,
                                    }),
                                  });
                                  if (res.status === 419) {
                                    await fetch('/sanctum/csrf-cookie', { credentials: 'include' }).catch(() => {});
                                    res = await fetch(url, {
                                      method: 'DELETE',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        'X-Requested-With': 'XMLHttpRequest',
                                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                      },
                                      credentials: 'include',
                                      body: JSON.stringify({
                                        no_rawat: row.no_rawat,
                                        tgl_perawatan: row.tgl_perawatan,
                                        jam_rawat: String(row.jam_rawat).length === 5 ? row.jam_rawat + ':00' : row.jam_rawat,
                                      }),
                                    });
                                  }
                                  const text = await res.text();
                                  let json; try { json = text ? JSON.parse(text) : {}; } catch (_) { json = {}; }
                                  if (!res.ok) {
                                    setError(json.message || 'Gagal menghapus pemeriksaan');
                                    setMessage(null);
                                    return;
                                  }
                                  setError(null);
                                  setMessage(json.message || 'Pemeriksaan berhasil dihapus');
                                  await reloadHistory();
                                } catch (e) {
                                  setError(e?.message || 'Terjadi kesalahan saat menghapus');
                                  setMessage(null);
                                }
                              }}
                              className="inline-flex items-center px-2 py-1 text-[10px] rounded-md border border-red-500 text-red-500 hover:bg-red-500/10"
                              title="Hapus pemeriksaan"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-[11px]">Tidak ada data</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      

      {message && (
        <div className="px-4 py-2 text-[11px] text-emerald-500">{message}</div>
      )}
      {error && (
        <div className="px-4 py-2 text-[11px] text-red-500">{error}</div>
      )}

      {alergiCrudOpen && (
        <DataAlergi open={alergiCrudOpen} onClose={() => setAlergiCrudOpen(false)} jenis={alergiJenis} />
      )}
      {bridgingOpen && (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto">
          <div className="absolute inset-0 bg-black/50" onClick={() => setBridgingOpen(false)}></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-2 sm:mx-4 my-6 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Bridging PCare</h3>
              <button onClick={() => setBridgingOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-2 text-sm">
              {bridgingLoading ? (
                <div className="text-gray-500">Memuat…</div>
              ) : bridgingError ? (
                <div className="text-red-600 dark:text-red-400">{bridgingError}</div>
              ) : bridgingInfo ? (
                <div className="space-y-1">
                  <div className="font-medium">Status Pendaftaran PCare: {bridgingInfo.status || '-'}</div>
                  {bridgingInfo.noUrut ? (
                    <div>No Urut: {bridgingInfo.noUrut}</div>
                  ) : null}
                  {bridgingInfo.meta ? (
                    <div>Keterangan: {bridgingInfo.meta}</div>
                  ) : null}
                </div>
              ) : (
                <div className="text-gray-500">Tidak ada data</div>
              )}
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
