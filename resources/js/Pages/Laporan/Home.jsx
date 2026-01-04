import React, { useState, useRef, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import SidebarLaporan from "@/Layouts/SidebarLaporan";
import DropdownMenu, { DropdownItem } from "@/Components/DropdownMenu";
import ChartPoliMonthly from "@/Pages/DashboardComponents/ChartPoliMonthly";
import { route } from "ziggy-js";
import { BarChart2, Activity, TrendingUp, TrendingDown, MoreVertical, Stethoscope, Bed, Wallet, Users } from "lucide-react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];



export default function LaporanHome({ summary }) {

    // Stats State
    const [ralanPeriod, setRalanPeriod] = useState('today');
    const [ranapPeriod, setRanapPeriod] = useState('today');
    const [igdPeriod, setIgdPeriod] = useState('today');

    const [ralan, setRalan] = useState(summary?.rawat_jalan || {});
    const [ranap, setRanap] = useState(summary?.rawat_inap || {});
    const [igd, setIgd] = useState(summary?.igd || {});
    
    const [lastUpdate, setLastUpdate] = useState(summary?.updated_at || "-");
    
    const [isLoadingRalan, setIsLoadingRalan] = useState(false);
    const [isLoadingRanap, setIsLoadingRanap] = useState(false);
    const [isLoadingIgd, setIsLoadingIgd] = useState(false);

    const [chartPeriod, setChartPeriod] = useState(summary?.chart_period || 'week');
    const [isLoadingChart, setIsLoadingChart] = useState(false);

    const handleChartFilterChange = (period) => {
        if (period === chartPeriod) return;
        setChartPeriod(period);
        setIsLoadingChart(true);
        
        import('@inertiajs/react').then(({ router }) => {
            router.get('/laporan', { chart_period: period }, {
                preserveState: true,
                preserveScroll: true,
                only: ['summary'],
                onFinish: () => setIsLoadingChart(false)
            });
        });
    };

    const handleFilterChange = async (type, period) => {
        if (type === 'ralan') {
            if (period === ralanPeriod) return;
            setIsLoadingRalan(true);
        } else if (type === 'ranap') {
            if (period === ranapPeriod) return;
            setIsLoadingRanap(true);
        } else if (type === 'igd') {
            if (period === igdPeriod) return;
            setIsLoadingIgd(true);
        }

        try {
            const res = await fetch(route('laporan.stats', { type, period }));
            const data = await res.json();

            if (type === 'ralan') {
                setRalan(data);
                setRalanPeriod(period);
            } else if (type === 'ranap') {
                setRanap(data);
                setRanapPeriod(period);
            } else if (type === 'igd') {
                setIgd(data);
                setIgdPeriod(period);
            }

            const now = new Date();
            setLastUpdate(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            if (type === 'ralan') setIsLoadingRalan(false);
            if (type === 'ranap') setIsLoadingRanap(false);
            if (type === 'igd') setIsLoadingIgd(false);
        }
    };

    const chartRef = useRef(null);
    const [shouldLoadChart, setShouldLoadChart] = useState(false);
    const [poliMonthly, setPoliMonthly] = useState(null);

    useEffect(() => {
        const el = chartRef.current;
        if (!el) return;

        if (typeof IntersectionObserver === "undefined") {
            setShouldLoadChart(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setShouldLoadChart(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!shouldLoadChart) return;
        let active = true;

        const run = async () => {
            try {
                const year = new Date().getFullYear();
                const url = route(
                    "registration.poli-monthly-stats",
                    { year, limit: 6 },
                    false
                );
                const res = await fetch(url, {
                    headers: { Accept: "application/json" },
                });
                const json = await res.json();
                if (active) setPoliMonthly(json?.data || null);
            } catch (e) {
                if (active) setPoliMonthly(null);
            }
        };

        run();
        return () => {
            active = false;
        };
    }, [shouldLoadChart]);



    const formatPct = (n) => {
        const v = Number(n || 0);
        const sign = v > 0 ? "+" : "";
        return `${sign}${v}%`;
    };

    const formatNumber = (value) => {
        const n = typeof value === "number" ? value : parseFloat(value || "0");
        return new Intl.NumberFormat("id-ID").format(isNaN(n) ? 0 : n);
    };

    const formatPercent = (value) => {
        const n = typeof value === "number" ? value : parseFloat(value || "0");
        if (!isFinite(n)) return "0%";
        const fixed = Math.round(n * 10) / 10;
        const sign = fixed > 0 ? "+" : "";
        return `${sign}${fixed}%`;
    };

    const renderDelta = (value) => {
        const n = typeof value === "number" ? value : parseFloat(value || "0");
        if (!isFinite(n) || n === 0) {
            return (
                <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1" />
                    Stabil
                </span>
            );
        }
        const positive = n > 0;
        const Icon = positive ? TrendingUp : TrendingDown;
        return (
            <span
                className={
                    "inline-flex items-center text-xs font-medium " +
                    (positive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400")
                }
            >
                <Icon className="w-3 h-3 mr-1" />
                {formatPercent(n)}
            </span>
        );
    };

    return (
        <SidebarLaporan title="Laporan">
            <Head title="Laporan" />

            <div className="px-2 sm:px-4 lg:px-6">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                    <div className="min-w-[220px]">
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Pusat Laporan
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Akses cepat ke laporan operasional dan keuangan.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Rawat Inap - Blue Theme */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 hover:shadow-md transition-all duration-200 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex gap-3">
                                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl group-hover:scale-110 transition-transform duration-200">
                                    <Bed className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Rawat Inap</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Update terakhir: {lastUpdate}</p>
                                </div>
                            </div>
                            <DropdownMenu
                                trigger={
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                }
                                align="end"
                            >
                                <DropdownItem onClick={() => handleFilterChange('ranap', 'today')}>Hari Ini</DropdownItem>
                                <DropdownItem onClick={() => handleFilterChange('ranap', 'week')}>Minggu Ini</DropdownItem>
                                <DropdownItem onClick={() => handleFilterChange('ranap', 'month')}>Bulan Ini</DropdownItem>
                                <DropdownItem onClick={() => handleFilterChange('ranap', 'year')}>Tahun Ini</DropdownItem>
                            </DropdownMenu>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total</div>
                                <div className="text-xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">{formatNumber(ranap?.total)}</div>
                            </div>
                             <div className="text-center">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Masuk</div>
                                <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">{formatNumber(ranap?.masuk)}</div>
                            </div>
                             <div className="text-center">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Keluar</div>
                                <div className="text-lg font-semibold text-rose-600 dark:text-rose-400 tabular-nums">{formatNumber(ranap?.keluar)}</div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-gray-600 dark:text-gray-300 font-medium">Okupansi</span>
                                <span className="font-bold text-blue-600 dark:text-blue-400">{formatPercent(ranap?.okupansi_pct)}</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(ranap?.okupansi_pct || 0, 100)}%` }}></div>
                            </div>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-2">
                                <span className="font-medium text-gray-900 dark:text-gray-200">{formatNumber(ranap?.total)}</span> dari <span className="font-medium text-gray-900 dark:text-gray-200">{formatNumber(ranap?.bed_total)}</span> tempat tidur terisi
                            </p>
                        </div>

                        <div className="flex justify-between items-center py-3 border-t border-dashed border-gray-100 dark:border-gray-800 mb-1">
                             <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Rata-rata Rawat</span>
                             <span className="font-bold text-sm text-blue-600 dark:text-blue-400">{ranap?.avg_los_days} Hari</span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                             {renderDelta(ranap?.delta_pct)}
                             <Link href="/laporan/ranap/kunjungan" className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                                Lihat Detail →
                             </Link>
                        </div>
                    </div>

                    {/* Rawat Jalan - Green Theme */}
                    <div className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 hover:shadow-md transition-all duration-200 group ${isLoadingRalan ? 'opacity-70' : ''}`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex gap-3">
                                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl group-hover:scale-110 transition-transform duration-200">
                                    <Stethoscope className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Rawat Jalan</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Update terakhir: {lastUpdate}</p>
                                </div>
                            </div>
                            <DropdownMenu
                                trigger={
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                }
                                align="end"
                            >
                                <DropdownItem onClick={() => handleFilterChange('ralan', 'today')}>Hari Ini</DropdownItem>
                                <DropdownItem onClick={() => handleFilterChange('ralan', 'week')}>Minggu Ini</DropdownItem>
                                <DropdownItem onClick={() => handleFilterChange('ralan', 'month')}>Bulan Ini</DropdownItem>
                                <DropdownItem onClick={() => handleFilterChange('ralan', 'year')}>Tahun Ini</DropdownItem>
                            </DropdownMenu>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-left">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total</div>
                                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{formatNumber(ralan?.total)}</div>
                            </div>
                             <div className="text-right">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Baru</div>
                                <div className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums">{formatNumber(ralan?.baru)}</div>
                            </div>
                             <div className="text-right">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Lama</div>
                                <div className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums">{formatNumber(ralan?.lama)}</div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-gray-600 dark:text-gray-300 font-medium">Rasio Pasien Baru</span>
                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatPercent((ralan?.baru / (ralan?.total || 1)) * 100)}</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(((ralan?.baru || 0) / (ralan?.total || 1)) * 100, 100)}%` }}></div>
                            </div>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-2">
                                <span className="font-medium text-gray-900 dark:text-gray-200">{formatNumber(ralan?.baru)}</span> dari <span className="font-medium text-gray-900 dark:text-gray-200">{formatNumber(ralan?.total)}</span> kunjungan adalah pasien baru
                            </p>
                        </div>

                        <div className="flex justify-between items-center py-3 border-t border-dashed border-gray-100 dark:border-gray-800 mb-1">
                             <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Rata-rata Harian</span>
                             <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400">{ralan?.avg_daily} Pasien</span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                             {renderDelta(ralan?.delta_pct)}
                             <Link href="/laporan/ralan/kunjungan" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center gap-1">
                                Lihat Detail →
                             </Link>
                        </div>
                    </div>

                    {/* IGD - Red Theme */}
                    <div className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 hover:shadow-md transition-all duration-200 group ${isLoadingIgd ? 'opacity-70' : ''}`}>
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex gap-3">
                                <div className="p-2.5 bg-rose-50 dark:bg-rose-900/20 rounded-xl group-hover:scale-110 transition-transform duration-200">
                                    <Activity className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">IGD</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Update terakhir: {lastUpdate}</p>
                                </div>
                            </div>
                            <DropdownMenu
                                trigger={
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                }
                                align="end"
                            >
                                <DropdownItem onClick={() => handleFilterChange('igd', 'today')}>Hari Ini</DropdownItem>
                                <DropdownItem onClick={() => handleFilterChange('igd', 'week')}>Minggu Ini</DropdownItem>
                                <DropdownItem onClick={() => handleFilterChange('igd', 'month')}>Bulan Ini</DropdownItem>
                                <DropdownItem onClick={() => handleFilterChange('igd', 'year')}>Tahun Ini</DropdownItem>
                            </DropdownMenu>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total</div>
                                <div className="text-xl font-bold text-rose-600 dark:text-rose-400 tabular-nums">{formatNumber(igd?.total)}</div>
                            </div>
                             <div className="text-center">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Ranap</div>
                                <div className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums">{formatNumber(igd?.lanjut_ranap)}</div>
                            </div>
                             <div className="text-center">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pulang</div>
                                <div className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums">{formatNumber(igd?.pulang)}</div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-gray-600 dark:text-gray-300 font-medium">Rasio Lanjut Ranap</span>
                                <span className="font-bold text-rose-600 dark:text-rose-400">{formatPercent((igd?.lanjut_ranap / (igd?.total || 1)) * 100)}</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-rose-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(((igd?.lanjut_ranap || 0) / (igd?.total || 1)) * 100, 100)}%` }}></div>
                            </div>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-2">
                                <span className="font-medium text-gray-900 dark:text-gray-200">{formatNumber(igd?.lanjut_ranap)}</span> dari <span className="font-medium text-gray-900 dark:text-gray-200">{formatNumber(igd?.total)}</span> pasien lanjut rawat inap
                            </p>
                        </div>

                        <div className="flex justify-between items-center py-3 border-t border-dashed border-gray-100 dark:border-gray-800 mb-1">
                             <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Rata-rata Harian</span>
                             <span className="font-bold text-sm text-rose-600 dark:text-rose-400">{igd?.avg_daily} Pasien</span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                             {renderDelta(igd?.delta_pct)}
                             <Link href="/laporan/igd/kunjungan" className="text-xs font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 flex items-center gap-1">
                                Lihat Detail →
                             </Link>
                        </div>
                    </div>
                </div>

                {/* New Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Visit Trend Chart */}
                    <div className={`lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 transition-opacity duration-200 ${isLoadingChart ? 'opacity-70' : ''}`}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tren Kunjungan</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {chartPeriod === 'week' ? 'Statistik kunjungan 7 hari terakhir' : 
                                     chartPeriod === 'month' ? 'Statistik kunjungan 30 hari terakhir' : 
                                     'Statistik kunjungan tahun ini'}
                                </p>
                            </div>
                            <DropdownMenu
                                trigger={
                                    <button className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        {chartPeriod === 'week' ? 'Minggu Ini' : 
                                         chartPeriod === 'month' ? 'Bulan Ini' : 
                                         'Tahun Ini'}
                                        <MoreVertical className="w-4 h-4 ml-1" />
                                    </button>
                                }
                                align="end"
                            >
                                <DropdownItem onClick={() => handleChartFilterChange('week')}>Minggu Ini</DropdownItem>
                                <DropdownItem onClick={() => handleChartFilterChange('month')}>Bulan Ini</DropdownItem>
                                <DropdownItem onClick={() => handleChartFilterChange('year')}>Tahun Ini</DropdownItem>
                            </DropdownMenu>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={summary?.visit_trend || []}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis 
                                        dataKey="tanggal" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fill: '#6B7280', fontSize: 12}}
                                        dy={10}
                                        tickFormatter={(str) => {
                                            if (!str) return '';
                                            if (chartPeriod === 'year') {
                                                const [y, m] = str.split('-');
                                                const date = new Date(y, m - 1);
                                                return date.toLocaleDateString('id-ID', { month: 'short' });
                                            }
                                            const d = new Date(str);
                                            return d.toLocaleDateString('id-ID', {day: 'numeric', month: 'short'});
                                        }}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fill: '#6B7280', fontSize: 12}}
                                    />
                                    <RechartsTooltip 
                                        contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                                        labelStyle={{color: '#374151', marginBottom: '4px', fontWeight: 600}}
                                    />
                                    <Legend wrapperStyle={{paddingTop: '20px'}} />
                                    <Line type="monotone" dataKey="rawat_jalan" name="Rawat Jalan" stroke="#3B82F6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                                    <Line type="monotone" dataKey="rawat_inap" name="Rawat Inap" stroke="#10B981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                                    <Line type="monotone" dataKey="igd" name="IGD" stroke="#F43F5E" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Payment Stats Chart */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cara Bayar</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Metode pembayaran hari ini</p>
                        </div>
                        <div className="h-[300px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={summary?.cara_bayar_stats || []}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="total"
                                        nameKey="png_jawab"
                                    >
                                        {(summary?.cara_bayar_stats || []).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                    <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{fontSize: '11px', paddingTop: '10px'}} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                                <Wallet className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                     {/* Top Poli Chart */}
                     <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Poliklinik Teramai</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Top 10 poliklinik hari ini</p>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={summary?.poli_stats || []} layout="vertical" margin={{left: 0, right: 30}}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                                    <XAxis type="number" hide />
                                    <YAxis 
                                        dataKey="nm_poli" 
                                        type="category" 
                                        width={150}
                                        axisLine={false} 
                                        tickLine={false}
                                        tick={{fill: '#4B5563', fontSize: 12}}
                                    />
                                    <RechartsTooltip 
                                        cursor={{fill: 'transparent'}}
                                        contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                                    />
                                    <Bar dataKey="total_kunjungan" name="Kunjungan" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                     </div>

                     {/* Summary/Info Card - Placeholder or Keep empty for layout balance */}
                     <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-sm p-6 text-white flex flex-col justify-between">
                        <div>
                            <div className="p-3 bg-white/20 rounded-xl w-fit mb-4">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Total Pasien Hari Ini</h3>
                            <p className="text-indigo-100 text-sm mb-6">
                                Akumulasi total pasien dari Rawat Jalan, Rawat Inap, dan IGD.
                            </p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-1">
                                {formatNumber((summary?.rawat_jalan?.total || 0) + (summary?.rawat_inap?.total || 0) + (summary?.igd?.total || 0))}
                            </div>
                            <div className="text-sm text-indigo-200">Pasien terdaftar</div>
                        </div>
                     </div>
                </div>

                <div ref={chartRef} className="mb-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Tren Kunjungan Poli
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Statistik kunjungan poli rawat jalan per bulan tahun ini.
                            </p>
                        </div>
                    </div>
                    
                    <div className="min-h-[300px] flex items-center justify-center">
                        {shouldLoadChart && poliMonthly ? (
                            <div className="w-full overflow-x-auto">
                                <ChartPoliMonthly data={poliMonthly} />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600 animate-pulse">
                                <BarChart2 className="h-8 w-8 opacity-50" />
                                <span className="text-sm font-medium">Memuat data grafik...</span>
                            </div>
                        )}
                    </div>
                </div>


            </div>
        </SidebarLaporan>
    );
}
