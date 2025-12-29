import React, { useMemo, useState, useEffect } from 'react';
import { route } from 'ziggy-js';
import { Link, usePage } from '@inertiajs/react';
import SearchableSelect from '../../../Components/SearchableSelect.jsx';
import { Eraser, Pencil, Trash2 } from 'lucide-react';
import { PlusIcon } from '@heroicons/react/24/outline';
import DataAlergi from '../../../Alergi/DataAlergi.jsx';
import { DWFKTP_TEMPLATES } from '../../../data/dwfktpTemplates.js';
import axios from 'axios';

export default function NewCpptSoap({ token = '', noRkmMedis = '', noRawat = '', onOpenResep = null }) {
  const page = usePage();
  const currentNik = page?.props?.auth?.user?.nik || '';
  const currentName = page?.props?.auth?.user?.name || page?.props?.auth?.user?.nama || '';
  const [pegawaiDisplay, setPegawaiDisplay] = useState('');
  const [saving, setSaving] = useState(false);
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
  useEffect(() => {
    setFormData((p) => ({ ...p, alergi: '' }));
    setKdAlergi('');
  }, [alergiJenis]);

  useEffect(() => {
    const loadJenis = async () => {
      try {
        let res = await fetch('/api/alergi/jenis?per_page=100', { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
        if (res.status === 419) {
          await fetch('/sanctum/csrf-cookie', { credentials: 'same-origin' }).catch(() => {});
          res = await fetch('/api/alergi/jenis?per_page=100', { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
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

  const [modalOpen, setModalOpen] = useState(false);
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

  const templateOptions = useMemo(() => {
    return [
      { key: '', label: '— Kosongkan —' },
      ...DWFKTP_TEMPLATES.map((t) => ({ key: t.key, label: t.label })),
    ];
  }, []);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const templatesMap = useMemo(() => {
    const map = {};
    DWFKTP_TEMPLATES.forEach((t) => { map[t.key] = t.template; });
    return map;
  }, []);
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
      <div className="px-4 py-2.5 border-b border-[oklch(84.1%_0.238_128.85_/_0.35)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[oklch(84.1%_0.238_128.85)] text-[oklch(14.5%_0_0)] shadow-[0_0_10px_oklch(84.1%_0.238_128.85_/_0.45)]">
              <span className="text-[10px] font-bold">IT</span>
            </div>
            <div className="text-sm font-semibold">CPPT / SOAP</div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="tgl_perawatan" className="text-[11px]">Tanggal</label>
            <input id="tgl_perawatan" name="tgl_perawatan" type="date" value={formData.tgl_perawatan} onChange={handleChange}
              className="text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] placeholder-[oklch(84.1%_0.238_128.85_/_0.6)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
            <label htmlFor="jam_rawat" className="text-[11px]">Jam</label>
            <input id="jam_rawat" name="jam_rawat" type="time" value={formData.jam_rawat} onChange={handleChange}
              className="text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] placeholder-[oklch(84.1%_0.238_128.85_/_0.6)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]" />
          </div>
        </div>
      </div>

      <div className="px-4 py-2.5 border-b border-[oklch(84.1%_0.238_128.85_/_0.35)]"></div>

      <div className="p-3 space-y-3">

        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                  <SearchableSelect
                    source="pegawai"
                    value={formData.nip}
                    onChange={(val) => setFormData((p) => ({ ...p, nip: val }))}
                    placeholder="— Pilih pegawai —"
                    searchPlaceholder="Ketik nama atau NIK pegawai..."
                    defaultDisplay={pegawaiDisplay || currentName || null}
                    className="!h-8 !px-2 !py-1 !text-xs !rounded !shadow-none !bg-[oklch(14.5%_0_0)] !text-[oklch(98.5%_0_0)] !border-[oklch(84.1%_0.238_128.85_/_0.35)] !focus:ring-[oklch(84.1%_0.238_128.85)] !focus:border-[oklch(84.1%_0.238_128.85)]"
                    dropdownClassName="bg-[oklch(14.5%_0_0)] border-[oklch(84.1%_0.238_128.85_/_0.5)] shadow-[0_0_14px_oklch(84.1%_0.238_128.85_/_0.5)]"
                    searchInputClassName="bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)] placeholder-[oklch(84.1%_0.238_128.85_/_0.7)] border-[oklch(84.1%_0.238_128.85_/_0.5)] focus:ring-[oklch(84.1%_0.238_128.85)] focus:border-[oklch(84.1%_0.238_128.85)] drop-shadow-[0_0_6px_oklch(84.1%_0.238_128.85_/_0.6)]"
                    optionClassName="bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)] drop-shadow-[0_0_4px_oklch(84.1%_0.238_128.85_/_0.5)]"
                    selectedOptionClassName="bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)]"
                    optionHoverClassName="hover:bg-[oklch(14.5%_0_0)]"
                    selectedOptionHoverClassName="hover:bg-[oklch(14.5%_0_0)]"
                    displayClassName="text-[oklch(98.5%_0_0)] drop-shadow-[0_0_6px_oklch(84.1%_0.238_128.85_/_0.7)]"
                  />
              </div>
            </div>
          </div>
          <div className="min-w-0 flex flex-row items-center gap-2 flex-wrap">
            <label className="text-[11px] font-semibold">Alergi</label>
            <select value={alergiJenis} onChange={(e) => setAlergiJenis(e.target.value)}
              className="w-32 text-xs h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)] focus:ring-2 focus:ring-[oklch(84.1%_0.238_128.85_/_0.6)]">
              {jenisAlergiOptions.map((opt) => (
                <option key={opt.code} value={opt.code}>{opt.label}</option>
              ))}
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
              <SearchableSelect
                source="alergi_local"
                sourceParams={{ kode_jenis: alergiJenis }}
                value={kdAlergi}
                onChange={(val) => {
                  setKdAlergi(val || '');
                  // Cari label untuk ditampilkan di formData.alergi
                  // Label akan diupdate melalui onSelect
                }}
                onSelect={(option) => {
                  if (option) {
                    setKdAlergi(option.value || '');
                    setFormData((p) => ({ ...p, alergi: option.label || '' }));
                  } else {
                    setKdAlergi('');
                    setFormData((p) => ({ ...p, alergi: '' }));
                  }
                }}
                placeholder="Pilih alergi (lokal)"
                searchPlaceholder="Cari alergi…"
                defaultDisplay="Tidak Ada"
                displayKey="label"
                valueKey="value"
                className="!h-8 !px-2 !py-1 !text-xs !rounded !shadow-none !bg-[oklch(14.5%_0_0)] !border-[oklch(84.1%_0.238_128.85_/_0.35)] !focus:ring-[oklch(84.1%_0.238_128.85)] !focus:border-[oklch(84.1%_0.238_128.85)]"
                dropdownClassName="bg-[oklch(14.5%_0_0)] border-[oklch(84.1%_0.238_128.85_/_0.5)] shadow-[0_0_14px_oklch(84.1%_0.238_128.85_/_0.5)]"
                searchInputClassName="bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)] placeholder-[oklch(84.1%_0.238_128.85_/_0.7)] border-[oklch(84.1%_0.238_128.85_/_0.5)] focus:ring-[oklch(84.1%_0.238_128.85)] focus:border-[oklch(84.1%_0.238_128.85)] drop-shadow-[0_0_6px_oklch(84.1%_0.238_128.85_/_0.6)]"
                optionClassName="bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)] drop-shadow-[0_0_4px_oklch(84.1%_0.238_128.85_/_0.5)]"
                selectedOptionClassName="bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)]"
                optionHoverClassName="hover:bg-[oklch(14.5%_0_0)]"
                selectedOptionHoverClassName="hover:bg-[oklch(14.5%_0_0)]"
                displayClassName={`${((kdAlergi || '').trim() !== '' && (kdAlergi || '').trim() !== '-') ? 'text-red-600' : 'text-[oklch(98.5%_0_0)]'} drop-shadow-[0_0_6px_oklch(84.1%_0.238_128.85_/_0.7)]`}
              />
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

        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 rounded-lg bg-[oklch(84.1%_0.238_128.85)] text-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85)] shadow-[0_0_12px_oklch(84.1%_0.238_128.85_/_0.45)]">
            {editKey ? 'Update Pemeriksaan' : 'Simpan Pemeriksaan'}
          </button>
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
    </form>
  );
}
