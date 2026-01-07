import React, { useState, useEffect, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import SidebarLaporan from '@/Layouts/SidebarLaporan';
import { Calendar, Search, PieChart, BarChart, Loader2, Printer, Building2, Stethoscope, Wallet, Activity, X } from 'lucide-react';
import { 
    BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, Legend, ResponsiveContainer, 
    PieChart as RePieChart, Pie, Cell 
} from 'recharts';
import axios from 'axios';
import { route } from 'ziggy-js';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

function toDateInputValue(date) {
    const d = new Date(date);
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function FrekuensiPenyakitRalan({ listPoli = [], listDokter = [], listPenjab = [], listStatus = [] }) {
    const today = useMemo(() => new Date(), []);
    const startOfMonth = useMemo(() => {
        const d = new Date();
        d.setDate(1);
        return d;
    }, []);

    const [startDate, setStartDate] = useState(toDateInputValue(startOfMonth));
    const [endDate, setEndDate] = useState(toDateInputValue(today));
    const [poli, setPoli] = useState("");
    const [dokter, setDokter] = useState("");
    const [penjab, setPenjab] = useState("");
    const [status, setStatus] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const handleResetFilters = () => {
        setStartDate(toDateInputValue(startOfMonth));
        setEndDate(toDateInputValue(today));
        setPoli("");
        setDokter("");
        setPenjab("");
        setStatus("");
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(route('laporan.ralan.frekuensi-penyakit.data'), {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                    poli,
                    dokter,
                    penjab
                }
            });
            setData(response.data.data);
            setTotal(response.data.total);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, poli, dokter, penjab, status]);

    const handlePrint = () => {
        const params = new URLSearchParams({
            start_date: startDate,
            end_date: endDate,
            poli: poli,
            dokter: dokter,
            penjab: penjab,
            status: status
        });

        const url = route('laporan.ralan.frekuensi-penyakit.print') + '?' + params.toString();
        window.open(url, '_blank');
    };

    const top10Data = useMemo(() => {
        return data.slice(0, 10);
    }, [data]);

    return (
        <SidebarLaporan title="Laporan">
            <Head title="Frekuensi Penyakit Ralan" />

            <div className="px-4 sm:px-6 lg:px-8 py-6 print:p-0">
                <div className="sm:flex sm:items-center print:hidden">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Frekuensi Penyakit Ralan</h1>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            Laporan frekuensi penyakit rawat jalan berdasarkan diagnosa utama pasien.
                        </p>
                    </div>
                </div>
                
                {/* Print Header */}
                <div className="hidden print:block mb-4 text-center">
                    <h2 className="text-xl font-bold text-gray-900">Laporan Frekuensi Penyakit Rawat Jalan</h2>
                    <p className="text-sm text-gray-600">Periode: {startDate} s.d {endDate}</p>
                </div>

                {/* Filters */}
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm mb-6 print:hidden">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                    <div className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

                            {/* Poli */}
                            <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Poliklinik
                                </label>
                                <div className="relative mt-1">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                        <Building2 className="h-4 w-4" />
                                    </span>
                                    <select
                                        value={poli}
                                        onChange={(e) => setPoli(e.target.value)}
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="">Semua Poliklinik</option>
                                        {listPoli.map((p) => (
                                            <option key={p.kd_poli} value={p.kd_poli}>{p.nm_poli}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Dokter */}
                            <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Dokter
                                </label>
                                <div className="relative mt-1">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                        <Stethoscope className="h-4 w-4" />
                                    </span>
                                    <select
                                        value={dokter}
                                        onChange={(e) => setDokter(e.target.value)}
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="">Semua Dokter</option>
                                        {listDokter.map((d) => (
                                            <option key={d.kd_dokter} value={d.kd_dokter}>{d.nm_dokter}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Cara Bayar */}
                            <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Cara Bayar
                                </label>
                                <div className="relative mt-1">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                        <Wallet className="h-4 w-4" />
                                    </span>
                                    <select
                                        value={penjab}
                                        onChange={(e) => setPenjab(e.target.value)}
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="">Semua Cara Bayar</option>
                                        {listPenjab.map((p) => (
                                            <option key={p.kd_pj} value={p.kd_pj}>{p.png_jawab}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Status
                                </label>
                                <div className="relative mt-1">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                        <Activity className="h-4 w-4" />
                                    </span>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="">Semua Status</option>
                                        {listStatus.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                            <button
                                type="button"
                                onClick={handleResetFilters}
                                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <X className="h-4 w-4" />
                                Reset
                            </button>
                            <button
                                type="button"
                                onClick={handlePrint}
                                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <Printer className="h-4 w-4" />
                                Print
                            </button>
                            <button
                                type="button"
                                onClick={fetchData}
                                disabled={loading}
                                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                                Terapkan Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                {data.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                                <BarChart className="w-5 h-5 mr-2" /> 10 Penyakit Terbanyak (Bar)
                            </h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ReBarChart data={top10Data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="kd_penyakit" type="category" width={80} />
                                        <ReTooltip 
                                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                                            formatter={(value, name, props) => [value, props.payload.penyakit]}
                                        />
                                        <Legend />
                                        <Bar dataKey="jumlah" fill="#3b82f6" name="Jumlah Kasus" />
                                    </ReBarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                                <PieChart className="w-5 h-5 mr-2" /> 10 Penyakit Terbanyak (Pie)
                            </h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RePieChart>
                                        <Pie
                                            data={top10Data}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                                const RADIAN = Math.PI / 180;
                                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                                return (
                                                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={10}>
                                                        {`${(percent * 100).toFixed(0)}%`}
                                                    </text>
                                                );
                                            }}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="jumlah"
                                        >
                                            {top10Data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <ReTooltip formatter={(value, name, props) => [value, props.payload.penyakit]} />
                                        <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '10px' }} />
                                    </RePieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">No</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Kode</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Nama Penyakit</th>
                                            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">Jumlah</th>
                                            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">Persentase</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                                        {loading ? (
                                            <tr>
                                                <td colSpan="5" className="py-10 text-center text-gray-500">
                                                    <Loader2 className="w-8 h-8 mx-auto animate-spin mb-2" />
                                                    Memuat data...
                                                </td>
                                            </tr>
                                        ) : data.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="py-10 text-center text-gray-500">
                                                    Tidak ada data untuk periode ini.
                                                </td>
                                            </tr>
                                        ) : (
                                            data.map((item, index) => (
                                                <tr key={item.kd_penyakit}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">{index + 1}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{item.kd_penyakit}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{item.penyakit}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500 dark:text-gray-400 font-semibold">{item.jumlah}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500 dark:text-gray-400">{item.persentase}%</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                    <tfoot className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <td colSpan="3" className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">Total</td>
                                            <td className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">{total}</td>
                                            <td className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">100%</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLaporan>
    );
}
