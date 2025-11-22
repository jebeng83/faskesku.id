import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Konfigurasi sumber referensi PCare agar SearchableSelect bisa memuat opsi secara remote
const REFERENSI_CONFIG = {
    // Sumber lokal: departemen (untuk mapping ke SATUSEHAT Organization)
    // Endpoint: GET /api/departemen
    // Mendukung pencarian dengan parameter q, serta pagination start & limit
    departemen: {
        supportsSearch: true,
        defaultParams: { start: 0, limit: 25, q: '' },
        buildUrl: ({ q = '', start = 0, limit = 25 } = {}) => {
            const params = new URLSearchParams({ q, start, limit });
            return `/api/departemen?${params.toString()}`;
        },
        parse: (json) => {
            const list = json?.list || json?.data || [];
            return list.map((it) => {
                const value = it?.dep_id || '';
                const name = it?.nama || '';
                return { value, label: `${value} — ${name}` };
            });
        },
    },
    diagnosa: {
        supportsSearch: true,
        // Selaraskan dengan ReferensiDiagnosa.jsx: gunakan q kosong untuk load awal
        defaultParams: { start: 0, limit: 25, q: '' },
        buildUrl: ({ q = '', start = 0, limit = 25 } = {}) => {
            const params = new URLSearchParams({ q, start, limit });
            // Gunakan endpoint PCare pada routes/api.php untuk konsistensi: GET /api/pcare/diagnosa
            return `/api/pcare/diagnosa?${params.toString()}`;
        },
        parse: (json) => {
            const list = json?.response?.list || json?.list || json?.data || [];
            return list.map((it) => {
                const value = it?.kdDiag || it?.kode || '';
                const name = it?.nmDiag || it?.nama || '';
                const hasNs = typeof it?.nonSpesialis === 'boolean';
                const suffix = hasNs ? ` — ${it.nonSpesialis ? 'Non Spesialis' : 'Spesialis'}` : '';
                return { value, label: `${value} — ${name}${suffix}` , nonSpesialis: hasNs ? it.nonSpesialis : null };
            });
        },
    },
    dokter: {
        supportsSearch: false,
        defaultParams: { start: 0, limit: 200 },
        buildUrl: ({ start = 0, limit = 200 } = {}) => {
            const params = new URLSearchParams({ start, limit });
            // Endpoint PCare: GET /api/pcare/dokter
            return `/api/pcare/dokter?${params.toString()}`;
        },
        parse: (json) => {
            const list = json?.response?.list || json?.list || json?.data || [];
            return list.map((it) => ({ value: it?.kdDokter || it?.kdProvider || it?.kdDok || it?.kode || '', label: it?.nmDokter || it?.nmProvider || it?.nama || '' }));
        },
    },
    poli: {
        supportsSearch: false,
        defaultParams: { start: 0, limit: 200 },
        buildUrl: ({ start = 0, limit = 200 } = {}) => {
            const params = new URLSearchParams({ start, limit });
            // Endpoint PCare: GET /api/pcare/poli
            return `/api/pcare/poli?${params.toString()}`;
        },
        parse: (json) => {
            const list = json?.response?.list || json?.list || json?.data || [];
            return list.map((it) => ({ value: it?.kdPoli || it?.kode || '', label: it?.nmPoli || it?.nama || '' }));
        },
    },
    kesadaran: {
        supportsSearch: false,
        defaultParams: {},
        // Endpoint PCare: GET /api/pcare/kesadaran
        buildUrl: () => `/api/pcare/kesadaran`,
        parse: (json) => {
            const list = json?.response?.list || json?.list || json?.data || [];
            return list.map((it) => ({ value: it?.kdSadar || it?.kode || '', label: it?.nmSadar || it?.nama || '' }));
        },
    },
    statuspulang: {
        supportsSearch: false,
        defaultParams: { rawatInap: false },
        // Endpoint PCare: GET /api/pcare/statuspulang
        buildUrl: ({ rawatInap = false } = {}) => `/api/pcare/statuspulang?rawatInap=${rawatInap ? 'true' : 'false'}`,
        parse: (json) => {
            const list = json?.response?.list || json?.list || json?.data || [];
            return list.map((it) => ({ value: it?.kdStatusPulang || it?.kdStatus || it?.kode || '', label: it?.nmStatusPulang || it?.nmStatus || it?.nama || '' }));
        },
    },
    prognosa: {
        supportsSearch: false,
        defaultParams: {},
        // Endpoint PCare: GET /api/pcare/prognosa
        buildUrl: () => `/api/pcare/prognosa`,
        parse: (json) => {
            const list = json?.response?.list || json?.list || json?.data || [];
            return list.map((it) => ({ value: it?.kdPrognosa || it?.kode || '', label: it?.nmPrognosa || it?.nama || '' }));
        },
    },
    provider: {
        supportsSearch: false,
        defaultParams: { start: 0, limit: 100 },
        buildUrl: ({ start = 0, limit = 100 } = {}) => {
            const params = new URLSearchParams({ start, limit });
            // Endpoint PCare: GET /api/pcare/provider
            return `/api/pcare/provider?${params.toString()}`;
        },
        parse: (json) => {
            const list = json?.response?.list || json?.list || json?.data || [];
            return list.map((it) => ({ value: it?.kdProvider || it?.kode || '', label: it?.nmProvider || it?.nama || '' }));
        },
    },
    subspesialis: {
        supportsSearch: false,
        defaultParams: { kdSpesialis: '', start: 0, limit: 100 },
        buildUrl: ({ kdSpesialis = '', start = 0, limit = 100 } = {}) => {
            const params = new URLSearchParams({ kdSpesialis, start, limit });
            // Endpoint PCare: GET /api/pcare/spesialis/subspesialis?kdSpesialis=XX
            return `/api/pcare/spesialis/subspesialis?${params.toString()}`;
        },
        parse: (json) => {
            const list = json?.response?.list || json?.list || json?.data || [];
            return list.map((it) => ({ value: it?.kdSubSpesialis || it?.kode || '', label: it?.nmSubSpesialis || it?.nama || '' }));
        },
    },
    sarana: {
        supportsSearch: false,
        defaultParams: { start: 0, limit: 100 },
        buildUrl: ({ start = 0, limit = 100 } = {}) => {
            const params = new URLSearchParams({ start, limit });
            // Endpoint PCare: GET /api/pcare/spesialis/sarana
            return `/api/pcare/spesialis/sarana?${params.toString()}`;
        },
        parse: (json) => {
            const list = json?.response?.list || json?.list || json?.data || [];
            return list.map((it) => ({ value: it?.kdSarana || it?.kode || '', label: it?.nmSarana || it?.nama || '' }));
        },
    },
    tindakan: {
        supportsSearch: false,
        defaultParams: { kdTkp: '10', start: 0, limit: 25 },
        buildUrl: ({ kdTkp = '10', start = 0, limit = 25 } = {}) => {
            const params = new URLSearchParams({ kdTkp, start, limit });
            // Endpoint PCare: GET /api/pcare/tindakan
            return `/api/pcare/tindakan?${params.toString()}`;
        },
        parse: (json) => {
            const list = json?.response?.list || json?.list || json?.data || [];
            return list.map((it) => ({ value: it?.kdTindakan || it?.kode || '', label: (it?.nmTindakan || it?.nama || '').toString().replace(/\r\n/g, ' ').trim() }));
        },
    },
    alergi: {
        supportsSearch: false,
        // jenis: '01' (Makanan), '02' (Udara), '03' (Obat)
        defaultParams: { jenis: '01' },
        // Endpoint PCare: GET /api/pcare/alergi
        buildUrl: ({ jenis = '01' } = {}) => `/api/pcare/alergi?jenis=${encodeURIComponent(jenis)}`,
        parse: (json) => {
            const list = json?.response?.list || json?.list || json?.data || [];
            return list.map((it) => ({ value: it?.kdAlergi || it?.kode || '', label: it?.nmAlergi || it?.nama || '' }));
        },
    },
    // ===== Tambahan sumber lokal untuk kebutuhan SATUSEHAT Location mapping =====
    // Sumber: tabel poliklinik lokal
    // Endpoint: GET /api/poliklinik (mendukung q/start/limit)
    poliklinik: {
        supportsSearch: true,
        defaultParams: { start: 0, limit: 25, q: '' },
        buildUrl: ({ q = '', start = 0, limit = 25 } = {}) => {
            const params = new URLSearchParams({ q, start, limit });
            return `/api/poliklinik?${params.toString()}`;
        },
        parse: (json) => {
            const list = json?.list || json?.data || [];
            return list.map((it) => ({
                value: it?.kd_poli || '',
                label: `${it?.kd_poli ?? ''} — ${it?.nm_poli ?? ''}`.trim(),
            }));
        },
    },
    // Sumber: subunit Organization SATUSEHAT (anak dari Organization induk pada .env)
    // Endpoint: GET /api/satusehat/organization/subunits?limit=200&map=1
    // Catatan: endpoint tidak mendukung pencarian q, jadi muat semua lalu filter lokal
    satusehat_org_subunit: {
        supportsSearch: false,
        defaultParams: { limit: 200, map: 1 },
        buildUrl: ({ limit = 200, map = 1 } = {}) => {
            const params = new URLSearchParams({ limit: String(limit), map: String(map) });
            return `/api/satusehat/organization/subunits?${params.toString()}`;
        },
        parse: (json) => {
            const list = json?.subunits || [];
            return list.map((it) => ({
                value: it?.id || '',
                label: `${it?.code ?? '-'} — ${it?.name ?? '-'}`,
            }));
        },
    },
    // Sumber: daftar Bangsal (lokasi rawat inap) dari sistem lokal
    // Endpoint: GET /api/opname/lokasi (mengembalikan { success, data: [{ kd_bangsal, nm_bangsal }] })
    bangsal: {
        supportsSearch: false,
        defaultParams: {},
        buildUrl: () => '/api/opname/lokasi',
        parse: (json) => {
            const rows = Array.isArray(json?.data) ? json.data : [];
            return rows.map((r) => ({
                value: r?.kd_bangsal || '',
                label: `${r?.kd_bangsal ?? ''} — ${r?.nm_bangsal ?? ''}`.trim(),
            }));
        },
    },
    // Sumber: daftar Kamar rawat inap dari sistem lokal
    // Endpoint: GET /api/ranap/kamar (mengembalikan { ok, list: [{ kd_kamar, nm_kamar, kd_bangsal, nm_bangsal }] })
    kamar: {
        supportsSearch: true,
        defaultParams: { start: 0, limit: 25, q: '' },
        buildUrl: ({ q = '', start = 0, limit = 25 } = {}) => {
            const params = new URLSearchParams({ q, start, limit });
            return `/api/satusehat/ranap/kamar?${params.toString()}`;
        },
        parse: (json) => {
            const list = json?.list || json?.data || [];
            return list.map((it) => ({
                value: it?.kd_kamar || '',
                label: `${it?.kd_kamar ?? ''}${it?.nm_bangsal ? ' — Bangsal: ' + it.nm_bangsal : ''}`.trim(),
            }));
        },
    },
    // ===== Sumber: Rekening/COA untuk modul Akuntansi =====
    // Endpoint: GET /api/akutansi/pengaturan-rekening/rekening?limit=50&q=
    rekening: {
        supportsSearch: true,
        defaultParams: { limit: 50, q: '' },
        buildUrl: ({ limit = 50, q = '' } = {}) => {
            const params = new URLSearchParams({ limit: String(limit), q });
            return `/api/akutansi/pengaturan-rekening/rekening?${params.toString()}`;
        },
        parse: (json) => {
            const items = Array.isArray(json?.items) ? json.items : [];
            return items.map((it) => ({
                value: it?.kd_rek || '',
                label: `${it?.kd_rek ?? ''} — ${it?.nm_rek ?? ''}${it?.tipe || it?.balance ? ` [${it?.tipe ?? '-'}${it?.balance ? '/' + it.balance : ''}]` : ''}`.trim(),
                kd_rek: it?.kd_rek || '',
                nm_rek: it?.nm_rek || '',
                tipe: it?.tipe || '',
                balance: it?.balance || '',
                level: it?.level ?? null,
            }));
        },
    },
};

const SearchableSelect = ({ 
    options = [], 
    value, 
    onChange, 
    // Callback opsional untuk mendapatkan objek opsi terpilih (selain value)
    onSelect = null,
    placeholder = "Pilih opsi", 
    searchPlaceholder = "Cari...",
    className = "",
    error = false,
    displayKey = "label",
    valueKey = "value",
    // Ambil pilihan dari sumber referensi PCare: diagnosa, dokter, poli, dll
    source = null,
    sourceParams = {},
    debounceMs = 350,
    // Label default untuk ditampilkan ketika value sudah ada tetapi opsi belum dimuat
    defaultDisplay = null,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);
    const portalElRef = useRef(null);
    const [portalPos, setPortalPos] = useState({ top: 0, left: 0, width: 0 });
    const [remoteOptions, setRemoteOptions] = useState([]);
    const [remoteLoading, setRemoteLoading] = useState(false);
    const [remoteError, setRemoteError] = useState('');

    const useRemote = !!source && !!REFERENSI_CONFIG[source];
    const cfg = useRemote ? REFERENSI_CONFIG[source] : null;

    // Filter options based on search term
    const baseOptions = useRemote ? remoteOptions : options;
    const filteredOptions = baseOptions.filter(option => {
        const displayValueRaw = typeof option === 'string' ? option : option[displayKey];
        const displayValue = (displayValueRaw ?? '').toString();
        return displayValue.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Get selected option display text
    const getSelectedDisplay = () => {
        if (!value) return placeholder;
        const selectedOption = baseOptions.find(option => {
            const optionValue = typeof option === 'string' ? option : option[valueKey];
            return optionValue === value;
        });
        // Jika nilai sudah ada tapi opsi belum dimuat (mis. sumber remote belum dibuka),
        // tampilkan defaultDisplay (jika disediakan) sebagai fallback agar "textbox" tetap menampilkan label.
        if (!selectedOption) {
            if (defaultDisplay) return defaultDisplay;
            const raw = typeof value === 'string' ? value : (value != null ? String(value) : '');
            return raw || placeholder;
        }
        const labelRaw = typeof selectedOption === 'string' ? selectedOption : selectedOption[displayKey];
        return (labelRaw ?? '').toString() || placeholder;
    };

    // Handle option selection
    const handleSelect = (option) => {
        const optionValue = typeof option === 'string' ? option : option[valueKey];
        onChange(optionValue);
        if (typeof onSelect === 'function') {
            try {
                onSelect(option);
            } catch (_) {}
        }
        setIsOpen(false);
        setSearchTerm('');
    };

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedInsideTrigger = dropdownRef.current && dropdownRef.current.contains(event.target);
            const clickedInsidePortal = portalElRef.current && portalElRef.current.contains(event.target);
            // Jika klik terjadi di dalam trigger atau konten portal dropdown, JANGAN tutup.
            if (clickedInsideTrigger || clickedInsidePortal) return;
            // Selain itu, tutup dropdown.
            setIsOpen(false);
            setSearchTerm('');
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Compute dropdown position (for portal) and focus when open
    useEffect(() => {
        const updatePosition = () => {
            const el = dropdownRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            // Position dropdown just below the trigger button
            setPortalPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
        };

        if (isOpen) {
            updatePosition();
            if (!portalElRef.current) {
                portalElRef.current = document.createElement('div');
                portalElRef.current.setAttribute('data-searchable-select-portal', '');
                document.body.appendChild(portalElRef.current);
            }
            // listeners to keep dropdown aligned while scrolling/resizing
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            // focus search input slightly after mount
            setTimeout(() => {
                if (searchInputRef.current) searchInputRef.current.focus();
            }, 0);

            // Saat dibuka, jika menggunakan sumber remote dan belum ada opsi, lakukan load awal
            if (useRemote && remoteOptions.length === 0) {
                const params = { ...(cfg?.defaultParams || {}), ...(sourceParams || {}) };
                (async () => {
                    try {
                        setRemoteLoading(true);
                        setRemoteError('');
                        const url = cfg.buildUrl(params);
                        const res = await fetch(url, { headers: { Accept: 'application/json' } });
                        const json = await res.json();
                        const opts = cfg.parse(json);
                        setRemoteOptions(Array.isArray(opts) ? opts : []);
                    } catch (e) {
                        setRemoteError(e?.message || 'Gagal memuat data');
                    } finally {
                        setRemoteLoading(false);
                    }
                })();
            }
        }

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
            if (!isOpen && portalElRef.current) {
                try {
                    document.body.removeChild(portalElRef.current);
                } catch (e) {}
                portalElRef.current = null;
            }
        };
    }, [isOpen]);

    // Pencarian remote dengan debounce untuk sumber yang mendukung (mis. diagnosa)
    useEffect(() => {
        if (!useRemote || !cfg?.supportsSearch) return;
        if (!isOpen) return; // hanya fetch saat dropdown terbuka
        const handle = setTimeout(async () => {
            try {
                setRemoteLoading(true);
                setRemoteError('');
                const params = { ...(cfg?.defaultParams || {}), ...(sourceParams || {}), q: searchTerm };
                const url = cfg.buildUrl(params);
                const res = await fetch(url, { headers: { Accept: 'application/json' } });
                const json = await res.json();
                const opts = cfg.parse(json);
                setRemoteOptions(Array.isArray(opts) ? opts : []);
            } catch (e) {
                setRemoteError(e?.message || 'Gagal memuat data');
            } finally {
                setRemoteLoading(false);
            }
        }, Math.max(0, debounceMs));
        return () => clearTimeout(handle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, isOpen, source, JSON.stringify(sourceParams)]);

    return (
        <div className={`relative ${isOpen ? 'z-[2000]' : 'z-50'}`} ref={dropdownRef}>
            {/* Selected value display */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-3 py-2 text-sm text-left border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex justify-between items-center ${
                    error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } ${className}`}
            >
                <span className={value ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                    {getSelectedDisplay()}
                </span>
                <svg 
                    className={`w-5 h-5 transition-transform duration-200 ${
                        isOpen ? 'transform rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown rendered via portal to escape stacking contexts */}
            {isOpen && portalElRef.current && createPortal(
                <div
                    style={{
                        position: 'fixed',
                        top: portalPos.top,
                        left: portalPos.left,
                        width: portalPos.width,
                        // Pastikan dropdown berada di atas modal overlay (z-[9999])
                        zIndex: 10000
                    }}
                    className="mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg max-h-60 overflow-hidden"
                >
                    {/* Search input */}
                    <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:text-white"
                        />
                    </div>

                    {/* Options list */}
                    <div className="max-h-48 overflow-y-auto">
                        {useRemote && remoteLoading && (
                            <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">Memuat…</div>
                        )}
                        {useRemote && remoteError && !remoteLoading && (
                            <div className="px-3 py-2 text-sm text-red-600 dark:text-red-400">{remoteError}</div>
                        )}
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => {
                                const optionValue = typeof option === 'string' ? option : option[valueKey];
                                const optionDisplay = typeof option === 'string' ? option : option[displayKey];
                                const isSelected = optionValue === value;

                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleSelect(option)}
                                        className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 ${
                                            isSelected ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'text-gray-900 dark:text-white'
                                        }`}
                                    >
                                        {optionDisplay}
                                    </button>
                                );
                            })
                        ) : (
                            <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                                Tidak ada data ditemukan
                            </div>
                        )}
                    </div>
                </div>,
                portalElRef.current
            )}
        </div>
    );
};

export default SearchableSelect;
