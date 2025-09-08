import React, { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function RiwayatPemeriksaan({ token = '', noRawat = '', noRkmMedis = '' }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState({ pemeriksaan: true, obat: false, lab: false, radiologi: false });

    const fetchData = async () => {
        if (!noRawat) return;
        setLoading(true);
        setError(null);
        try {
            const url = route('rawat-jalan.pemeriksaan-ralan', { no_rawat: noRawat, t: token });
            const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
            const json = await res.json();
            setRows(json.data || []);
        } catch (e) {
            setError(e.message || 'Gagal memuat riwayat pemeriksaan');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noRawat]);

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            {/* <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Riwayat Perawatan</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ringkasan riwayat pemeriksaan, obat, lab, dan radiologi</p>
            </div> */}
            <div className="p-4 space-y-3">
            {/* Collapsible: Riwayat Pemeriksaan */}
            <button
                onClick={() => setOpen((p) => ({ ...p, pemeriksaan: !p.pemeriksaan }))}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/40"
            >
                <span className="font-semibold text-gray-900 dark:text-white">Riwayat Pemeriksaan</span>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{rows.length} entri</span>
                    <svg className={`w-5 h-5 text-gray-500 transition-transform ${open.pemeriksaan ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.53a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                </div>
            </button>
            {open.pemeriksaan && (
                <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between py-3">
                        <div className="text-sm text-gray-600 dark:text-gray-300">Berikut riwayat pemeriksaan berdasarkan no. rawat</div>
                        <button onClick={fetchData} className="text-sm px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/40">Refresh</button>
                    </div>
                    {loading && <div className="text-sm text-gray-500 dark:text-gray-400">Memuat...</div>}
                    {error && <div className="text-sm text-red-700 dark:text-red-300">{error}</div>}
                    {!loading && !error && (
                        rows.length === 0 ? (
                            <div className="text-sm text-gray-500 dark:text-gray-400">Belum ada pemeriksaan.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-gray-600 dark:text-gray-300">
                                            <th className="pr-4 py-2">Tanggal</th>
                                            <th className="pr-4 py-2">Jam</th>
                                            <th className="pr-4 py-2">TTV</th>
                                            <th className="pr-4 py-2">Kesadaran</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {rows.map((row, idx) => (
                                            <tr key={idx} className="align-top">
                                                <td className="pr-4 py-2 text-gray-900 dark:text-white">{new Date(row.tgl_perawatan).toLocaleDateString('id-ID')}</td>
                                                <td className="pr-4 py-2 text-gray-900 dark:text-white">{String(row.jam_rawat).substring(0,5)}</td>
                                                <td className="pr-4 py-2 text-gray-700 dark:text-gray-300">
                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                        <span>Suhu: {row.suhu_tubuh || '-'}</span>
                                                        <span>Tensi: {row.tensi || '-'}</span>
                                                        <span>Nadi: {row.nadi || '-'}</span>
                                                        <span>RR: {row.respirasi || '-'}</span>
                                                        <span>BB: {row.berat || '-'}</span>
                                                        <span>TB: {row.tinggi || '-'}</span>
                                                        <span>SpO2: {row.spo2 || '-'}</span>
                                                        <span>GCS: {row.gcs || '-'}</span>
                                                    </div>
                                                </td>
                                                <td className="pr-4 py-2 text-gray-700 dark:text-gray-300">{row.kesadaran}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    )}
                </div>
            )}

            {/* Collapsible: Riwayat Obat */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden mt-3">
                <button
                    onClick={() => setOpen((p) => ({ ...p, obat: !p.obat }))}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/40"
                >
                    <span className="font-semibold text-gray-900 dark:text-white">Riwayat Obat</span>
                    <svg className={`w-5 h-5 text-gray-500 transition-transform ${open.obat ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.53a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                </button>
                {open.obat && (
                    <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Riwayat obat akan ditampilkan di sini.</div>
                    </div>
                )}
            </div>

            {/* Collapsible: Riwayat Lab */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden mt-3">
                <button
                    onClick={() => setOpen((p) => ({ ...p, lab: !p.lab }))}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/40"
                >
                    <span className="font-semibold text-gray-900 dark:text-white">Riwayat Lab</span>
                    <svg className={`w-5 h-5 text-gray-500 transition-transform ${open.lab ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.53a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                </button>
                {open.lab && (
                    <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Riwayat pemeriksaan lab akan ditampilkan di sini.</div>
                    </div>
                )}
            </div>

            {/* Collapsible: Riwayat Radiologi */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden mt-3">
                <button
                    onClick={() => setOpen((p) => ({ ...p, radiologi: !p.radiologi }))}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/40"
                >
                    <span className="font-semibold text-gray-900 dark:text-white">Riwayat Radiologi</span>
                    <svg className={`w-5 h-5 text-gray-500 transition-transform ${open.radiologi ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.53a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                </button>
                {open.radiologi && (
                    <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Riwayat pemeriksaan radiologi akan ditampilkan di sini.</div>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}


