import React, { useState, useEffect, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import SidebarLaporan from '@/Layouts/SidebarLaporan';
import { Calendar, Search, Loader2 } from 'lucide-react';
import axios from 'axios';
import { route } from 'ziggy-js';

function toDateInputValue(date) {
    const d = new Date(date);
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function SurveilansPenyakitRanap() {
    const today = useMemo(() => new Date(), []);
    const startOfMonth = useMemo(() => {
        const d = new Date();
        d.setDate(1);
        return d;
    }, []);

    const [startDate, setStartDate] = useState(toDateInputValue(startOfMonth));
    const [endDate, setEndDate] = useState(toDateInputValue(today));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(route('laporan.ranap.surveilans-penyakit.data'), {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                }
            });
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);

    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        const lower = searchTerm.toLowerCase();
        return data.filter(item => 
            item.kd_penyakit.toLowerCase().includes(lower) || 
            item.nm_penyakit.toLowerCase().includes(lower)
        );
    }, [data, searchTerm]);

    return (
        <SidebarLaporan title="Laporan">
            <Head title="Surveilans Penyakit Ranap" />

            <div className="px-4 sm:px-6 lg:px-8 py-6 print:p-0">
                <div className="sm:flex sm:items-center print:hidden">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Surveilans Penyakit Ranap</h1>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            Laporan surveilans penyakit rawat inap (Kasus Baru).
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm mb-6 print:hidden mt-4">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                    <div className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Start Date */}
                            <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Dari Tanggal
                                </label>
                                <div className="relative mt-1">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                        <Calendar className="h-4 w-4" />
                                    </span>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>

                            {/* End Date */}
                            <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Sampai Tanggal
                                </label>
                                <div className="relative mt-1">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                        <Calendar className="h-4 w-4" />
                                    </span>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>

                             {/* Search */}
                             <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Cari Penyakit
                                </label>
                                <div className="relative mt-1">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                        <Search className="h-4 w-4" />
                                    </span>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Kode atau Nama Penyakit..."
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-xs">
                            <thead className="bg-gray-50 dark:bg-gray-800/50">
                                <tr>
                                    <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 bg-gray-50 dark:bg-gray-800/50">No</th>
                                    <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kode ICD 10</th>
                                    <th scope="col" className="px-3 py-3 text-left font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Jenis Penyakit</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">0-7 Hr</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">8-28 Hr</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">&lt; 1 Th</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">1-4 Th</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">5-9 Th</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">10-14 Th</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">15-19 Th</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">20-44 Th</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">45-54 Th</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">55-59 Th</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">60-69 Th</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">70+</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Laki</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-pink-600 dark:text-pink-400 uppercase tracking-wider">Per</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Jumlah</th>
                                    <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ttl.Kunj</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan="19" className="px-3 py-10 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center justify-center">
                                                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
                                                <span className="text-sm">Memuat data...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="19" className="px-3 py-10 text-center text-gray-500 dark:text-gray-400">
                                            Tidak ada data untuk periode ini.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item, index) => (
                                        <tr key={item.kd_penyakit} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-3 py-2 whitespace-nowrap text-gray-500 dark:text-gray-400 sticky left-0 bg-white dark:bg-gray-900">{index + 1}</td>
                                            <td className="px-3 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.kd_penyakit}</td>
                                            <td className="px-3 py-2 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.nm_penyakit}</td>
                                            <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{item.hr0s7}</td>
                                            <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{item.hr8s28}</td>
                                            <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{item.kr1th}</td>
                                            <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{item.th1s4}</td>
                                            <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{item.th5s9}</td>
                                            <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{item.th10s14}</td>
                                            <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{item.th15s19}</td>
                                            <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{item.th20s44}</td>
                                            <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{item.th45s54}</td>
                                            <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{item.th55s59}</td>
                                            <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{item.th60s69}</td>
                                            <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{item.th70plus}</td>
                                            <td className="px-3 py-2 text-center text-blue-600 dark:text-blue-400 font-medium">{item.laki}</td>
                                            <td className="px-3 py-2 text-center text-pink-600 dark:text-pink-400 font-medium">{item.per}</td>
                                            <td className="px-3 py-2 text-center font-bold text-gray-900 dark:text-white">{item.jumlah}</td>
                                            <td className="px-3 py-2 text-center font-bold text-gray-900 dark:text-white">{item.ttl_kunjungan}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SidebarLaporan>
    );
}
