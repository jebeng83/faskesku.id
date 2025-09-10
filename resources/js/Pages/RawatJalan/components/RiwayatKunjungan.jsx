import React, { useEffect, useState } from 'react';

export default function RiwayatKunjungan({ token, noRkmMedis }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
                setItems(Array.isArray(json.data) ? json.data : []);
            } catch (e) {
                if (e.name !== 'AbortError') setError(e.message || 'Terjadi kesalahan');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        return () => controller.abort();
    }, [token, noRkmMedis]);

    if (loading) return <div className="text-sm text-gray-500 dark:text-gray-400">Memuat riwayat...</div>;
    if (error) return <div className="text-sm text-red-600 dark:text-red-400">{error}</div>;

    if (items.length === 0) {
        return <div className="text-sm text-gray-500 dark:text-gray-400">Belum ada riwayat.</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">No. Rawat</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Tanggal</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Jam</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Dokter</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Poli</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Status</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Bayar</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
                    {items.map((row) => (
                        <tr key={row.no_rawat} className="hover:bg-gray-50 dark:hover:bg-gray-700/40">
                            <td className="px-4 py-2 text-gray-900 dark:text-white">{row.no_rawat}</td>
                            <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.tgl_registrasi ? new Date(row.tgl_registrasi).toLocaleDateString('id-ID') : '-'}</td>
                            <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.jam_reg ? String(row.jam_reg).substring(0,5) : '-'}</td>
                            <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.kd_dokter || '-'}</td>
                            <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.kd_poli || '-'}</td>
                            <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.stts || '-'}</td>
                            <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.status_bayar || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


