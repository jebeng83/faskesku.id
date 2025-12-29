import React, { useEffect, useState, useCallback } from 'react';
import { route } from 'ziggy-js';
import { BeakerIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function RiwayatKunjungan({ token, noRkmMedis }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [expandedVisit, setExpandedVisit] = useState(null);
    const [medicationData, setMedicationData] = useState({});
    const [loadingMedication, setLoadingMedication] = useState({});
    const [labData, setLabData] = useState({});
    const [loadingLab, setLoadingLab] = useState({});
    const [radData, setRadData] = useState({});
    const [loadingRad, setLoadingRad] = useState({});
    const [soapData, setSoapData] = useState({});
    const [loadingSoap, setLoadingSoap] = useState({});
    const [openSections, setOpenSections] = useState({}); // { [noRawat]: { obat:boolean, lab:boolean, rad:boolean } }
    const [chartModal, setChartModal] = useState({ open: false, type: null, noRawat: null });

    const parseNumber = (value) => {
        const raw = String(value ?? '').trim();
        if (!raw || raw === '-' || raw.toLowerCase() === 'n/a') return null;
        const n = Number(raw.replace(',', '.'));
        return Number.isFinite(n) ? n : null;
    };

    const parseTensi = (value) => {
        const raw = String(value ?? '').trim();
        if (!raw || raw === '-' || raw.toLowerCase() === 'n/a') return null;
        const cleaned = raw.replace(/\s+/g, '');
        const parts = cleaned.split('/');
        if (parts.length < 2) return null;
        const systole = Number(parts[0]);
        const diastole = Number(parts[1]);
        if (!Number.isFinite(systole) || !Number.isFinite(diastole)) return null;
        return { systole, diastole };
    };

    const openChart = (type, noRawat) => {
        setChartModal({ open: true, type, noRawat });
    };

    const closeChart = () => {
        setChartModal({ open: false, type: null, noRawat: null });
    };

    const buildChartRows = (rows) => {
        const seen = new Set();
        const out = [];
        for (const r of rows || []) {
            const tgl = String(r?.tgl_perawatan || '').trim();
            const jam = String(r?.jam_rawat || '').trim();
            const key = `${tgl}|${jam}`;
            if (!tgl && !jam) continue;
            if (seen.has(key)) continue;
            seen.add(key);
            out.push(r);
        }
        out.sort((a, b) => {
            const at = `${String(a?.tgl_perawatan || '')} ${String(a?.jam_rawat || '')}`.trim();
            const bt = `${String(b?.tgl_perawatan || '')} ${String(b?.jam_rawat || '')}`.trim();
            return at < bt ? -1 : at > bt ? 1 : 0;
        });
        return out;
    };

    const formatChartLabel = (row) => {
        const tgl = String(row?.tgl_perawatan || '').trim();
        const jam = String(row?.jam_rawat || '').trim();
        const jamShort = jam ? jam.substring(0, 5) : '';
        if (!tgl) return jamShort || '-';
        try {
            const d = new Date(tgl);
            const t = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
            return `${t} ${jamShort}`.trim();
        } catch (_) {
            return `${tgl} ${jamShort}`.trim();
        }
    };

    const LineChart = ({ title, labels, series, height = 260 }) => {
        const width = 820;
        const padL = 44;
        const padR = 18;
        const padT = 20;
        const padB = 36;
        const allValues = series.flatMap((s) => s.values).filter((v) => Number.isFinite(v));
        if (allValues.length === 0) {
            return (
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{title}</div>
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">Belum ada data yang bisa digrafikkan.</div>
                </div>
            );
        }
        let minY = Math.min(...allValues);
        let maxY = Math.max(...allValues);
        if (minY === maxY) {
            minY -= 1;
            maxY += 1;
        } else {
            const pad = (maxY - minY) * 0.08;
            minY -= pad;
            maxY += pad;
        }

        const n = Math.max(1, labels.length);
        const xStep = n <= 1 ? 0 : (width - padL - padR) / (n - 1);
        const xAt = (i) => padL + i * xStep;
        const yAt = (v) => padT + ((maxY - v) / (maxY - minY)) * (height - padT - padB);

        const buildPath = (values) => {
            let d = '';
            let started = false;
            for (let i = 0; i < values.length; i++) {
                const v = values[i];
                if (!Number.isFinite(v)) {
                    started = false;
                    continue;
                }
                const x = xAt(i);
                const y = yAt(v);
                if (!started) {
                    d += `M ${x} ${y}`;
                    started = true;
                } else {
                    d += ` L ${x} ${y}`;
                }
            }
            return d;
        };

        const gridLines = 4;
        const ticks = Array.from({ length: gridLines + 1 }).map((_, i) => {
            const t = i / gridLines;
            const v = maxY - (maxY - minY) * t;
            const y = padT + (height - padT - padB) * t;
            return { v, y };
        });

        const xLabels = (() => {
            if (labels.length <= 2) return labels.map((l, i) => ({ i, text: l }));
            const mid = Math.floor((labels.length - 1) / 2);
            return [
                { i: 0, text: labels[0] },
                { i: mid, text: labels[mid] },
                { i: labels.length - 1, text: labels[labels.length - 1] },
            ];
        })();

        return (
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{title}</div>
                    <div className="flex flex-wrap items-center gap-3">
                        {series.map((s) => (
                            <div key={s.id} className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-300">
                                <span className="inline-block w-3 h-0.5 rounded" style={{ backgroundColor: s.color }} />
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-3 overflow-x-auto">
                    <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[720px] w-full">
                        <rect x="0" y="0" width={width} height={height} fill="transparent" />
                        {ticks.map((t, idx) => (
                            <g key={idx}>
                                <line x1={padL} y1={t.y} x2={width - padR} y2={t.y} stroke="rgba(148,163,184,0.35)" strokeWidth="1" />
                                <text x={padL - 8} y={t.y + 4} textAnchor="end" fontSize="10" fill="rgba(100,116,139,0.95)">
                                    {Math.round(t.v * 10) / 10}
                                </text>
                            </g>
                        ))}
                        <line x1={padL} y1={height - padB} x2={width - padR} y2={height - padB} stroke="rgba(148,163,184,0.55)" strokeWidth="1" />
                        {series.map((s) => (
                            <g key={s.id}>
                                <path d={buildPath(s.values)} fill="none" stroke={s.color} strokeWidth="2" />
                                {s.values.map((v, i) => {
                                    if (!Number.isFinite(v)) return null;
                                    return (
                                        <circle key={`${s.id}-${i}`} cx={xAt(i)} cy={yAt(v)} r="2.5" fill={s.color} stroke="white" strokeWidth="1" />
                                    );
                                })}
                            </g>
                        ))}
                        {xLabels.map((xl) => (
                            <text key={xl.i} x={xAt(xl.i)} y={height - 12} textAnchor="middle" fontSize="10" fill="rgba(100,116,139,0.95)">
                                {xl.text}
                            </text>
                        ))}
                    </svg>
                </div>
            </div>
        );
    };

    const fetchMedicationData = useCallback(async (noRawat) => {
        if (medicationData[noRawat]) {
            return; // Data sudah ada
        }

        setLoadingMedication(prev => ({ ...prev, [noRawat]: true }));

        try {
            const url = `/rawat-jalan/obat-ralan/${encodeURIComponent(noRawat)}`;

            const res = await fetch(url, {
                headers: { 'Accept': 'application/json' }
            });
            
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }
            
            const json = await res.json();
            const data = Array.isArray(json.data) ? json.data : [];
            
            setMedicationData(prev => ({ ...prev, [noRawat]: data }));
        } catch (e) {
            console.error('Error fetching medication data:', e);
            setMedicationData(prev => ({ ...prev, [noRawat]: [] }));
        } finally {
            setLoadingMedication(prev => ({ ...prev, [noRawat]: false }));
        }
    }, [medicationData]);

    const fetchLabData = useCallback(async (noRawat) => {
        if (labData[noRawat]) return;
        setLoadingLab(prev => ({ ...prev, [noRawat]: true }));
        try {
            const res = await fetch(`/rawat-jalan/lab/${encodeURIComponent(noRawat)}`, { headers: { 'Accept': 'application/json' } });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            const data = Array.isArray(json.data) ? json.data : [];
            setLabData(prev => ({ ...prev, [noRawat]: data }));
        } catch (e) {
            console.error('Error fetching lab data:', e);
            setLabData(prev => ({ ...prev, [noRawat]: [] }));
        } finally {
            setLoadingLab(prev => ({ ...prev, [noRawat]: false }));
        }
    }, [labData]);

    const fetchRadData = useCallback(async (noRawat) => {
        if (radData[noRawat]) return;
        setLoadingRad(prev => ({ ...prev, [noRawat]: true }));
        try {
            const res = await fetch(`/rawat-jalan/radiologi/${encodeURIComponent(noRawat)}`, { headers: { 'Accept': 'application/json' } });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            const data = Array.isArray(json.data) ? json.data : [];
            setRadData(prev => ({ ...prev, [noRawat]: data }));
        } catch (e) {
            console.error('Error fetching radiologi data:', e);
            setRadData(prev => ({ ...prev, [noRawat]: [] }));
        } finally {
            setLoadingRad(prev => ({ ...prev, [noRawat]: false }));
        }
    }, [radData]);

    const fetchSoapData = useCallback(async (noRawat) => {
        if (soapData[noRawat]) return;
        setLoadingSoap(prev => ({ ...prev, [noRawat]: true }));
        try {
            const url = route('rawat-jalan.pemeriksaan-ralan', { no_rawat: noRawat });
            const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            const data = Array.isArray(json.data) ? json.data : [];
            setSoapData(prev => ({ ...prev, [noRawat]: data }));
        } catch (e) {
            console.error('Error fetching pemeriksaan_ralan:', e);
            setSoapData(prev => ({ ...prev, [noRawat]: [] }));
        } finally {
            setLoadingSoap(prev => ({ ...prev, [noRawat]: false }));
        }
    }, [soapData]);

    useEffect(() => {
        const controller = new AbortController();
        async function fetchData() {
            try {
                setLoading(true);
                setError('');
                const qs = token
                    ? `t=${encodeURIComponent(token)}`
                    : `no_rkm_medis=${encodeURIComponent(noRkmMedis || '')}`;
                const res = await fetch(`/rawat-jalan/riwayat?${qs}`, {
                    signal: controller.signal,
                    headers: { 'Accept': 'application/json' }
                });
                if (!res.ok) throw new Error('Gagal memuat riwayat');
                const json = await res.json();
                const data = Array.isArray(json.data) ? json.data : [];
                setItems(data);

                if (data.length > 0) {
                    const isDesktop = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
                        ? window.matchMedia('(min-width: 768px)').matches
                        : true;
                    setExpandedVisit(isDesktop ? data[0] : null);
                } else {
                    setExpandedVisit(null);
                }
            } catch (e) {
                if (e.name !== 'AbortError') setError(e.message || 'Terjadi kesalahan');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        return () => controller.abort();
    }, [token, noRkmMedis]);

    // Lazy load per section via header toggle; no auto-fetch here

    const toggleVisitDetails = (visit) => {
        if (expandedVisit && expandedVisit.no_rawat === visit.no_rawat) {
            setExpandedVisit(null);
        } else {
            setExpandedVisit(visit);
            // Auto-open Obat section for this visit and fetch immediately
            setOpenSections(prev => ({
                ...prev,
                [visit.no_rawat]: { obat: true, soap: true, lab: false, rad: false }
            }));
            fetchMedicationData(visit.no_rawat);
            fetchSoapData(visit.no_rawat);
        }
    };

    const renderMedicationTable = (noRawat) => {
        const medications = medicationData[noRawat] || [];
        const isLoading = loadingMedication[noRawat];

        if (isLoading) {
            return (
                <div className="text-center py-6 text-gray-500">
                    <div className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-xs">Memuat data obat...</span>
                    </div>
                </div>
            );
        }

        if (medications.length === 0) {
            return (
                <div className="text-center py-6 text-gray-500">
                    <BeakerIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-xs">Belum ada data obat untuk kunjungan ini</p>
                </div>
            );
        }

        // Group by date (tgl_perawatan)
        const groupedByDate = medications.reduce((acc, item) => {
            const key = item.tgl_perawatan || '-';
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});

        const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
            if (a === '-') return 1;
            if (b === '-') return -1;
            return new Date(b) - new Date(a);
        });

        const formatDateId = (date) => {
            if (!date || date === '-') return '-';
            try {
                return new Date(date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } catch (e) {
                return date;
            }
        };

        const totalItems = medications.length;

        return (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 px-4 py-3 border-b">
                    <div className="flex items-center space-x-3">
                        <div className="p-1.5 rounded-md bg-white/80 text-green-600">
                            <BeakerIcon className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-gray-900 text-sm">Riwayat Obat</h3>
                            <p className="text-xs text-gray-600">{totalItems} item obat</p>
                        </div>
                    </div>
                </div>

                <div>
                    {sortedDates.map((dateKey) => {
                        const items = groupedByDate[dateKey].slice().sort((a, b) => (a.jam || '').localeCompare(b.jam || ''));
                        return (
                            <div key={dateKey} className="border-t border-gray-100">
                                <div className="px-4 py-2 bg-gray-50 flex items-center justify-between">
                                    <div className="text-xs font-medium text-gray-700">
                                        {formatDateId(dateKey)}
                                    </div>
                                    <div className="text-[11px] text-gray-500">{items.length} item</div>
                                </div>

                                {/* Mobile list */}
                                <div className="md:hidden divide-y divide-gray-100">
                                    {items.map((item, index) => (
                                        <div key={`${item.kode_brng}-${item.jam}-${index}`} className="px-4 py-3 flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <div className="text-sm text-gray-900">{item.nama_brng || '-'}</div>
                                                <div className="mt-1 text-xs text-gray-500">{item.aturan || '-'}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-900">{item.jml || '-'}</div>
                                                <div className="text-[11px] text-gray-400">{item.jam || ''}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desktop table */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Obat</th>
                                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aturan Pakai</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-100">
                                            {items.map((item, index) => (
                                                <tr key={`${item.kode_brng}-${item.jam}-${index}`}>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                                        <div className="text-sm text-gray-900">{item.nama_brng || '-'}</div>
                                                        <div className="text-[11px] text-gray-400 mt-0.5">{item.jam || ''}</div>
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.jml || '-'}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.aturan || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderGroupedByDate = (rows, options = {}) => {
        const { title, emptyIcon, columns, mobileTemplate } = options;
        if (!Array.isArray(rows) || rows.length === 0) {
            return (
                <div className="text-center py-6 text-gray-500">
                    {emptyIcon}
                    <p className="text-xs">Belum ada data {title}</p>
                </div>
            );
        }
        const grouped = rows.reduce((acc, item) => {
            const key = item.tgl_periksa || item.tgl_perawatan || '-';
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
        const sortedDates = Object.keys(grouped).sort((a,b) => {
            if (a === '-') return 1; if (b === '-') return -1;
            return new Date(b) - new Date(a);
        });
        const formatDateId = (date) => {
            if (!date || date === '-') return '-';
            try {return new Date(date).toLocaleDateString('id-ID', { weekday:'long', year:'numeric', month:'long', day:'numeric' });} catch {return date;}
        };
        return (
            <div>
                {sortedDates.map((dateKey) => {
                    const items = grouped[dateKey].slice().sort((a,b) => (a.jam||'').localeCompare(b.jam||''));
                    return (
                        <div key={dateKey} className="border-t border-gray-100">
                            <div className="px-4 py-2 bg-gray-50 flex items-center justify-between">
                                <div className="text-xs font-medium text-gray-700">{formatDateId(dateKey)}</div>
                                <div className="text-[11px] text-gray-500">{items.length} item</div>
                            </div>
                            {/* Mobile */}
                            <div className="md:hidden divide-y divide-gray-100">
                                {items.map((item, idx) => (
                                    <div key={idx} className="px-4 py-3">{mobileTemplate(item)}</div>
                                ))}
                            </div>
                            {/* Desktop */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {columns.map((c) => (
                                                <th key={c.key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{c.header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {items.map((item, idx) => (
                                            <tr key={idx}>
                                                {columns.map((c) => (
                                                    <td key={c.key} className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{c.render(item)}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderLab = (noRawat) => {
        const rows = labData[noRawat] || [];
        const isLoading = loadingLab[noRawat];
        if (isLoading) return (<div className="py-6 text-center text-xs text-gray-500">Memuat data lab...</div>);
        return renderGroupedByDate(rows, {
            title: 'lab',
            emptyIcon: <BeakerIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />,
            columns: [
                { key: 'pemeriksaan', header: 'Pemeriksaan', render: (r) => (
                    <div>
                        <div className="text-sm">{r.pemeriksaan || '-'}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{r.jam || ''}</div>
                    </div>
                )},
                { key: 'nilai', header: 'Nilai', render: (r) => r.nilai || '-' },
                { key: 'satuan', header: 'Satuan', render: (r) => r.satuan || '-' },
                { key: 'rujukan', header: 'Nilai Rujukan', render: (r) => r.nilai_rujukan || '-' },
                { key: 'ket', header: 'Keterangan', render: (r) => r.keterangan || '-' },
            ],
            mobileTemplate: (r) => (
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <div className="text-sm text-gray-900">{r.pemeriksaan || '-'}</div>
                        <div className="mt-1 text-xs text-gray-500">{r.nilai || '-'} {r.satuan || ''}</div>
                        <div className="mt-0.5 text-[11px] text-gray-400">{r.nilai_rujukan || '-'} · {r.jam || ''}</div>
                    </div>
                    <div className="text-right text-xs text-gray-600">{r.keterangan || '-'}</div>
                </div>
            )
        });
    };

    const renderRadiologi = (noRawat) => {
        const rows = radData[noRawat] || [];
        const isLoading = loadingRad[noRawat];
        if (isLoading) return (<div className="py-6 text-center text-xs text-gray-500">Memuat data radiologi...</div>);
        return renderGroupedByDate(rows, {
            title: 'radiologi',
            emptyIcon: <DocumentTextIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />,
            columns: [
                { key: 'hasil', header: 'Hasil', render: (r) => (
                    <div>
                        <div className="text-sm">{r.hasil || '-'}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{r.jam || ''}</div>
                    </div>
                )},
            ],
            mobileTemplate: (r) => (
                <div>
                    <div className="text-sm text-gray-900">{r.hasil || '-'}</div>
                    <div className="mt-0.5 text-[11px] text-gray-400">{r.jam || ''}</div>
                </div>
            )
        });
    };

    const renderSoap = (noRawat) => {
        const rows = soapData[noRawat] || [];
        const isLoading = loadingSoap[noRawat];
        if (isLoading) return (<div className="py-6 text-center text-xs text-gray-500">Memuat data SOAP...</div>);
        if (!Array.isArray(rows) || rows.length === 0) {
            return (
                <div className="text-center py-6 text-gray-500">
                    <p className="text-xs">Belum ada data SOAP</p>
                </div>
            );
        }
        const deduped = (() => {
            const seen = new Set();
            const out = [];
            for (const e of rows) {
                const t = String(e.jam_rawat || '').substring(0,5);
                if (seen.has(t)) continue;
                seen.add(t);
                out.push(e);
            }
            return out;
        })();
        const sorted = deduped.slice().sort((a, b) => {
            const aa = String(a.jam_rawat || '').substring(0,5);
            const bb = String(b.jam_rawat || '').substring(0,5);
            return aa < bb ? 1 : aa > bb ? -1 : 0;
        });
        const hasSuhu = sorted.some((e) => parseNumber(e?.suhu_tubuh) !== null);
        const hasTensi = sorted.some((e) => parseTensi(e?.tensi) !== null);
        return (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden w-full">
                <div className="bg-gray-50 dark:bg-gray-700/50 px-3 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Riwayat SOAP</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => openChart('suhu', noRawat)}
                            disabled={!hasSuhu}
                            className={`px-2 py-1 text-[11px] rounded border transition-colors ${
                                hasSuhu
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            }`}
                            title={hasSuhu ? 'Grafik suhu dari pemeriksaan ralan' : 'Tidak ada data suhu'}
                        >
                            Grafik Suhu
                        </button>
                        <button
                            type="button"
                            onClick={() => openChart('tensi', noRawat)}
                            disabled={!hasTensi}
                            className={`px-2 py-1 text-[11px] rounded border transition-colors ${
                                hasTensi
                                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            }`}
                            title={hasTensi ? 'Grafik tensi (sistole/diastole) dari pemeriksaan ralan' : 'Tidak ada data tensi'}
                        >
                            Grafik Tensi
                        </button>
                        <span className="text-[11px] text-gray-600 dark:text-gray-300">{sorted.length} record</span>
                    </div>
                </div>
                <div className="overflow-x-auto overflow-y-auto max-h-[320px] w-full">
                    <table className="w-full text-xs table-fixed">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr className="text-left text-gray-600 dark:text-gray-300">
                                <th className="px-3 py-2 font-medium w-44">Tanggal</th>
                                <th className="px-3 py-2 font-medium w-48">Dokter/Paramedis</th>
                                <th className="px-3 py-2 font-medium w-64">Subjek</th>
                                <th className="px-3 py-2 font-medium w-64">Objek</th>
                                <th className="px-3 py-2 font-medium w-48">Asesmen</th>
                                <th className="px-3 py-2 font-medium w-48">Plan</th>
                                <th className="px-3 py-2 font-medium w-48">Inst/Impl</th>
                                <th className="px-3 py-2 font-medium w-48">Evaluasi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {sorted.map((e, i) => (
                                <tr key={`${noRawat}-soap-${i}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="px-3 py-2 w-44">
                                        <div className="flex items-baseline gap-2">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                {e.tgl_perawatan ? new Date(e.tgl_perawatan).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                                            </div>
                                            <div className="text-[11px] text-gray-900 dark:text-white font-mono w-20 whitespace-nowrap">
                                                {typeof e.jam_rawat === 'string' && e.jam_rawat.trim() ? e.jam_rawat.trim().substring(0,5) : '-'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 w-48 text-gray-700 dark:text-gray-300">
                                        <div className="truncate">{e.nip || e.kd_dokter || e.nm_dokter || e.nama_dokter || e.nm_pegawai || '-'}</div>
                                    </td>
                                    <td className="px-3 py-2 w-64 text-gray-700 dark:text-gray-300">
                                        <div className="truncate whitespace-nowrap" title={typeof e.keluhan === 'string' ? e.keluhan.trim() : ''}>
                                            {(typeof e.keluhan === 'string' && e.keluhan.trim()) ? e.keluhan.trim() : '-'}
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 w-64 text-gray-700 dark:text-gray-300">
                                        <div className="space-y-1">
                                            <div className="truncate whitespace-nowrap" title={typeof e.pemeriksaan === 'string' ? e.pemeriksaan.trim() : ''}>
                                                {(typeof e.pemeriksaan === 'string' && e.pemeriksaan.trim()) ? e.pemeriksaan.trim() : '-'}
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[11px]">
                                                <div className="text-gray-500">Kesadaran</div>
                                                <div className="text-right">{e.kesadaran || 'Compos Mentis'}</div>
                                                <div className="text-gray-500">SUHU</div>
                                                <div className="text-right">{e.suhu_tubuh || '-'}°C</div>
                                                <div className="text-gray-500">TENSI</div>
                                                <div className="text-right">{e.tensi || '-'}</div>
                                                <div className="text-gray-500">NADI</div>
                                                <div className="text-right">{e.nadi || '-'}/min</div>
                                                <div className="text-gray-500">SpO2</div>
                                                <div className="text-right">{e.spo2 || '-'}%</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 w-48 text-gray-700 dark:text-gray-300">
                                        <div className="truncate whitespace-nowrap" title={typeof e.penilaian === 'string' ? e.penilaian.trim() : ''}>
                                            {(typeof e.penilaian === 'string' && e.penilaian.trim()) ? e.penilaian.trim() : '-'}
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 w-48 text-gray-700 dark:text-gray-300">
                                        <div className="truncate whitespace-nowrap" title={typeof e.rtl === 'string' ? e.rtl.trim() : ''}>
                                            {(typeof e.rtl === 'string' && e.rtl.trim()) ? e.rtl.trim() : '-'}
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 w-48 text-gray-700 dark:text-gray-300">
                                        <div className="truncate whitespace-nowrap" title={typeof e.instruksi === 'string' ? e.instruksi.trim() : ''}>
                                            {(typeof e.instruksi === 'string' && e.instruksi.trim()) ? e.instruksi.trim() : '-'}
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 w-48 text-gray-700 dark:text-gray-300">
                                        <div className="truncate whitespace-nowrap" title={typeof e.evaluasi === 'string' ? e.evaluasi.trim() : ''}>
                                            {(typeof e.evaluasi === 'string' && e.evaluasi.trim()) ? e.evaluasi.trim() : '-'}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const toggleSection = async (noRawat, key) => {
        setOpenSections(prev => {
            const prevForVisit = prev[noRawat] || { obat: false, soap: false, lab: false, rad: false };
            const nextVal = !prevForVisit[key];
            return { ...prev, [noRawat]: { ...prevForVisit, [key]: nextVal } };
        });

        // Lazy load on open
        try {
            if (key === 'obat' && !medicationData[noRawat]) {
                await fetchMedicationData(noRawat);
            } else if (key === 'soap' && !soapData[noRawat]) {
                await fetchSoapData(noRawat);
            } else if (key === 'lab' && !labData[noRawat]) {
                await fetchLabData(noRawat);
            } else if (key === 'rad' && !radData[noRawat]) {
                await fetchRadData(noRawat);
            }
        } catch (e) {
            // ignore
        }
    };

    if (loading) {
        return (
            <div className="p-4">
                {/* Mobile skeleton cards */}
                <div className="grid gap-3 md:hidden">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 animate-pulse">
                            <div className="flex items-center justify-between mb-2">
                                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
                {/* Desktop skeleton table */}
                <div className="hidden md:block">
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                            <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="grid grid-cols-5 gap-2 px-4 py-3">
                                    {Array.from({ length: 5 }).map((__, j) => (
                                        <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <div className="text-center">
                    <div className="flex flex-col items-center space-y-2">
                        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</div>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Muat ulang
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="p-4">
                <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center bg-white dark:bg-gray-900">
                    <div className="mx-auto w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Belum ada riwayat</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Data riwayat kunjungan akan muncul di sini.</p>
                </div>
            </div>
        );
    }

    // Tampilan header mobile: netral (tanpa warna khusus)
    const mobileItems = items
        .slice()
        .sort((a, b) => {
            const at = Date.parse(String(a?.tgl_registrasi || '')) || 0;
            const bt = Date.parse(String(b?.tgl_registrasi || '')) || 0;
            return bt - at;
        })
        .slice(0, 2);

    return (
        <div className="overflow-hidden">
            {/* Mobile: Card list */}
            <div className="md:hidden grid gap-3 pr-1 justify-items-center items-start content-start auto-rows-max">
                {mobileItems.map((row, index) => {
                    const isOpen = expandedVisit && expandedVisit.no_rawat === row.no_rawat;
                    return (
                        <div
                            key={row.no_rawat}
                            className={`w-full max-w-[360px] self-start rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden`}
                        >
                            <button
                                onClick={() => toggleVisitDetails(row)}
                                className={`w-full text-left px-3 min-h-14 py-2 flex flex-wrap items-start justify-between gap-2 bg-gray-50 dark:bg-gray-800/60 ${isOpen ? 'rounded-t-lg' : 'rounded-lg'}`}
                                aria-expanded={isOpen}
                                aria-controls={`visit-${index}`}
                            >
                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-center justify-between gap-2 min-w-0 flex-wrap">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M12 11v10m0 0l-3-3m3 3l3-3" />
                                            </svg>
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {row.tgl_registrasi ? new Date(row.tgl_registrasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                                            </span>
                                        </div>
                                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 break-words whitespace-normal max-w-full sm:whitespace-nowrap sm:max-w-[12rem] max-[360px]:break-all">
                                            {row.no_rawat}
                                        </span>
                                    </div>
                                    
                                </div>
                                <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''} flex-shrink-0 self-start ml-2`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {/* Garis aksen dihilangkan (tanpa warna khusus) */}
                            <div
                                id={`visit-${index}`}
                                className={`px-3 pb-3 transition-all duration-200 ease-out ${isOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-800`}
                            >
                                {(() => {
                                    const rows = soapData[row.no_rawat] || [];
                                    const isSoapLoading = loadingSoap[row.no_rawat];
                                    const usable = Array.isArray(rows) ? rows : [];
                                    const hasSuhu = usable.some((e) => parseNumber(e?.suhu_tubuh) !== null);
                                    const hasTensi = usable.some((e) => parseTensi(e?.tensi) !== null);
                                    return (
                                        <div className="mb-2 flex flex-wrap items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => openChart('suhu', row.no_rawat)}
                                                disabled={isSoapLoading || !hasSuhu}
                                                className={`px-2 py-1 text-[11px] rounded border transition-colors ${
                                                    !isSoapLoading && hasSuhu
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                                }`}
                                                title={
                                                    isSoapLoading
                                                        ? 'Memuat data SOAP...'
                                                        : hasSuhu
                                                          ? 'Grafik suhu dari pemeriksaan ralan'
                                                          : 'Tidak ada data suhu'
                                                }
                                            >
                                                Grafik Suhu
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => openChart('tensi', row.no_rawat)}
                                                disabled={isSoapLoading || !hasTensi}
                                                className={`px-2 py-1 text-[11px] rounded border transition-colors ${
                                                    !isSoapLoading && hasTensi
                                                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                                                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                                }`}
                                                title={
                                                    isSoapLoading
                                                        ? 'Memuat data SOAP...'
                                                        : hasTensi
                                                          ? 'Grafik tensi (sistole/diastole) dari pemeriksaan ralan'
                                                          : 'Tidak ada data tensi'
                                                }
                                            >
                                                Grafik Tensi
                                            </button>
                                        </div>
                                    );
                                })()}
                                {renderMedicationTable(row.no_rawat)}
                                {renderLab(row.no_rawat)}
                                {renderRadiologi(row.no_rawat)}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Desktop: List dengan header klik-untuk-expand (tanpa tabel) */}
            <div className="hidden md:block">
                <div className="space-y-2 pr-1 h-[376px] overflow-y-auto">
                    {items.map((row) => (
                        <div
                            key={row.no_rawat}
                            className={`rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden ${
                                expandedVisit && expandedVisit.no_rawat === row.no_rawat ? 'ring-1 ring-blue-300 dark:ring-blue-700' : ''
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => toggleVisitDetails(row)}
                                aria-expanded={expandedVisit && expandedVisit.no_rawat === row.no_rawat ? 'true' : 'false'}
                                className={`w-full flex items-center justify-between px-3 h-14 bg-gray-50 dark:bg-gray-700/30 ${
                                    expandedVisit && expandedVisit.no_rawat === row.no_rawat ? 'border-b border-gray-200 dark:border-gray-700' : ''
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M12 11v10m0 0l-3-3m3 3l3-3" />
                                    </svg>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {row.tgl_registrasi ? new Date(row.tgl_registrasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[11px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                        {row.no_rawat}
                                    </span>
                                    {expandedVisit && expandedVisit.no_rawat === row.no_rawat ? (
                                        <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                                        </svg>
                                    )}
                                </div>
                            </button>
                            {/* Baris Poli dihilangkan sesuai permintaan */}
                            {expandedVisit && expandedVisit.no_rawat === row.no_rawat && (
                                <div className="p-2 space-y-3 border-t border-gray-200 dark:border-gray-700">
                                    {/* Section Obat */}
                                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => toggleSection(row.no_rawat, 'obat')}
                                            className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-800"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Riwayat Obat</span>
                                                <span className="text-[11px] text-gray-500">{(medicationData[row.no_rawat] || []).length} item</span>
                                            </div>
                                            {openSections[row.no_rawat]?.obat ? (
                                                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                                                </svg>
                                            )}
                                        </button>
                                        <div className={`${openSections[row.no_rawat]?.obat ? 'block' : 'hidden'} p-2`}>
                                            {renderMedicationTable(row.no_rawat)}
                                        </div>
                                    </div>

                                    {/* Section SOAP */}
                                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => toggleSection(row.no_rawat, 'soap')}
                                            className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-800"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Riwayat SOAP</span>
                                                <span className="text-[11px] text-gray-500">{(soapData[row.no_rawat] || []).length} record</span>
                                            </div>
                                            {openSections[row.no_rawat]?.soap ? (
                                                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                                                </svg>
                                            )}
                                        </button>
                                        <div className={`${openSections[row.no_rawat]?.soap ? 'block' : 'hidden'} p-2`}>
                                            {renderSoap(row.no_rawat)}
                                        </div>
                                    </div>

                                    {/* Section Lab */}
                                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => toggleSection(row.no_rawat, 'lab')}
                                            className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-800"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Riwayat Lab</span>
                                                <span className="text-[11px] text-gray-500">{(labData[row.no_rawat] || []).length} item</span>
                                            </div>
                                            {openSections[row.no_rawat]?.lab ? (
                                                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                                                </svg>
                                            )}
                                        </button>
                                        <div className={`${openSections[row.no_rawat]?.lab ? 'block' : 'hidden'} p-2`}>
                                            {renderLab(row.no_rawat)}
                                        </div>
                                    </div>

                                    {/* Section Radiologi */}
                                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => toggleSection(row.no_rawat, 'rad')}
                                            className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-800"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Riwayat Radiologi</span>
                                                <span className="text-[11px] text-gray-500">{(radData[row.no_rawat] || []).length} item</span>
                                            </div>
                                            {openSections[row.no_rawat]?.rad ? (
                                                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                                                </svg>
                                            )}
                                        </button>
                                        <div className={`${openSections[row.no_rawat]?.rad ? 'block' : 'hidden'} p-2`}>
                                            {renderRadiologi(row.no_rawat)}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {chartModal?.open && (
                <div className="fixed inset-0 z-50">
                    <button type="button" className="absolute inset-0 bg-black/40" onClick={closeChart} />
                    <div className="absolute inset-x-0 top-10 sm:top-16 mx-auto w-[calc(100%-2rem)] max-w-4xl">
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                        {chartModal.type === 'tensi'
                                            ? 'Grafik Tensi (Sistole/Diastole)'
                                            : 'Grafik Suhu'}
                                    </div>
                                    <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                                        No. Rawat: {chartModal.noRawat || '-'}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={closeChart}
                                    className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Tutup
                                </button>
                            </div>
                            <div className="p-4">
                                {(() => {
                                    const baseRows = buildChartRows(soapData[chartModal.noRawat] || []);
                                    const labels = baseRows.map(formatChartLabel);
                                    if (chartModal.type === 'tensi') {
                                        const systole = baseRows.map((r) => parseTensi(r?.tensi)?.systole ?? null);
                                        const diastole = baseRows.map((r) => parseTensi(r?.tensi)?.diastole ?? null);
                                        return (
                                            <LineChart
                                                title="Tensi"
                                                labels={labels}
                                                series={[
                                                    { id: 'sistole', label: 'Sistole', color: '#ef4444', values: systole },
                                                    { id: 'diastole', label: 'Diastole', color: '#3b82f6', values: diastole },
                                                ]}
                                            />
                                        );
                                    }
                                    const suhu = baseRows.map((r) => parseNumber(r?.suhu_tubuh));
                                    return (
                                        <LineChart
                                            title="Suhu Tubuh"
                                            labels={labels}
                                            series={[{ id: 'suhu', label: 'Suhu (°C)', color: '#10b981', values: suhu }]}
                                        />
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
