import React, { useMemo, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ReferenceArea,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const VitalSignsChart = ({ data = [], defaultSelectedVital = 'all' }) => {
    const [activeChart, setActiveChart] = useState('trend');
    const [selectedVital, setSelectedVital] = useState(defaultSelectedVital || 'all');

    const vitalRanges = useMemo(
        () => ({
            suhu: { low: 36.1, high: 37.2 },
            sistolik: { low: 90, high: 140 },
            diastolik: { low: 60, high: 90 },
            nadi: { low: 60, high: 100 },
            respirasi: { low: 12, high: 20 },
            spo2: { low: 95, high: 100 },
        }),
        []
    );

    const normalBands = useMemo(() => {
        if (selectedVital === 'all') return [];
        if (selectedVital === 'tensi') {
            return [
                {
                    key: 'sistolik',
                    ...vitalRanges.sistolik,
                    fill: '#dcfce7',
                    fillOpacity: 0.35,
                },
                {
                    key: 'diastolik',
                    ...vitalRanges.diastolik,
                    fill: '#cffafe',
                    fillOpacity: 0.28,
                },
            ];
        }

        const range = vitalRanges[selectedVital];
        if (!range) return [];
        return [
            {
                key: selectedVital,
                ...range,
                fill: '#dcfce7',
                fillOpacity: 0.35,
            },
        ];
    }, [selectedVital, vitalRanges]);

    // Process data for charts
    const chartData = useMemo(() => {
        if (!data || data.length === 0) return [];

        return data
            .filter(item => item.suhu_tubuh || item.tensi || item.nadi || item.respirasi || item.spo2)
            .map((item, index) => {
                const date = new Date(item.tgl_perawatan);
                const time = item.jam_rawat ? item.jam_rawat.substring(0, 5) : '';
                
                // Parse tensi (blood pressure) - format: "120/80"
                const tensiParts = item.tensi ? item.tensi.split('/') : [];
                const sistolik = tensiParts[0] ? parseInt(tensiParts[0]) : null;
                const diastolik = tensiParts[1] ? parseInt(tensiParts[1]) : null;

                return {
                    id: index,
                    date: date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' }),
                    time: time,
                    datetime: `${date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' })} ${time}`,
                    suhu: item.suhu_tubuh ? parseFloat(item.suhu_tubuh) : null,
                    sistolik: sistolik,
                    diastolik: diastolik,
                    nadi: item.nadi ? parseInt(item.nadi) : null,
                    respirasi: item.respirasi ? parseInt(item.respirasi) : null,
                    spo2: item.spo2 ? parseInt(item.spo2) : null,
                    berat: item.berat ? parseFloat(item.berat) : null,
                    tinggi: item.tinggi ? parseFloat(item.tinggi) : null,
                    gcs: item.gcs ? parseInt(item.gcs) : null,
                    kesadaran: item.kesadaran || '-'
                };
            })
            .reverse(); // Show chronological order
    }, [data]);

    // Latest vital signs for summary cards
    const latestVitals = useMemo(() => {
        if (chartData.length === 0) return null;
        return chartData[chartData.length - 1];
    }, [chartData]);

    // Vital signs ranges for color coding
    const getVitalStatus = (vital, value) => {
        if (!value) return 'normal';

        const range = vitalRanges[vital];
        if (!range) return 'normal';

        if (value < range.low) return 'low';
        if (value > range.high) return 'high';
        return 'normal';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'low': return 'text-blue-600 bg-blue-50';
            case 'high': return 'text-red-600 bg-red-50';
            default: return 'text-green-600 bg-green-50';
        }
    };

    // Chart colors
    const colors = {
        suhu: '#ef4444',
        sistolik: '#3b82f6',
        diastolik: '#06b6d4',
        nadi: '#10b981',
        respirasi: '#f59e0b',
        spo2: '#8b5cf6'
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
                    <p className="font-medium text-gray-900 dark:text-white mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                            {entry.dataKey === 'suhu' && '°C'}
                            {(entry.dataKey === 'sistolik' || entry.dataKey === 'diastolik') && ' mmHg'}
                            {entry.dataKey === 'nadi' && ' bpm'}
                            {entry.dataKey === 'respirasi' && '/min'}
                            {entry.dataKey === 'spo2' && '%'}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (!data || data.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="text-center text-gray-500 dark:text-gray-400">
                    <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-lg font-medium">Tidak ada data vital signs</p>
                    <p className="text-sm">Data akan muncul setelah pemeriksaan dilakukan</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Visualisasi Vital Signs</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Trend dan analisis tanda vital pasien</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveChart('trend')}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                activeChart === 'trend'
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                            }`}
                        >
                            Trend
                        </button>
                        <button
                            onClick={() => setActiveChart('summary')}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                activeChart === 'summary'
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                            }`}
                        >
                            Ringkasan
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {activeChart === 'trend' && (
                    <div className="space-y-6">
                        {/* Vital Signs Filter */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedVital('all')}
                                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                    selectedVital === 'all'
                                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                }`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => setSelectedVital('tensi')}
                                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                    selectedVital === 'tensi'
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                }`}
                            >
                                Tensi
                            </button>
                            {Object.entries(colors).map(([vital, color]) => (
                                <button
                                    key={vital}
                                    onClick={() => setSelectedVital(vital)}
                                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                        selectedVital === vital
                                            ? 'text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                    style={selectedVital === vital ? { backgroundColor: color } : {}}
                                >
                                    {vital === 'suhu' && 'Suhu'}
                                    {vital === 'sistolik' && 'Sistolik'}
                                    {vital === 'diastolik' && 'Diastolik'}
                                    {vital === 'nadi' && 'Nadi'}
                                    {vital === 'respirasi' && 'Respirasi'}
                                    {vital === 'spo2' && 'SpO2'}
                                </button>
                            ))}
                        </div>

                        {/* Line Chart */}
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                    <XAxis 
                                        dataKey="datetime" 
                                        tick={{ fontSize: 12 }}
                                        angle={-45}
                                        textAnchor="end"
                                        height={60}
                                    />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    {normalBands.map((band) => (
                                        <ReferenceArea
                                            key={band.key}
                                            y1={band.low}
                                            y2={band.high}
                                            fill={band.fill}
                                            fillOpacity={band.fillOpacity}
                                            strokeOpacity={0}
                                        />
                                    ))}
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    
                                    {(selectedVital === 'all' || selectedVital === 'suhu') && (
                                        <Line
                                            type="monotone"
                                            dataKey="suhu"
                                            stroke={colors.suhu}
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            name="Suhu (°C)"
                                            connectNulls={false}
                                        />
                                    )}
                                    {(selectedVital === 'all' || selectedVital === 'sistolik' || selectedVital === 'tensi') && (
                                        <Line
                                            type="monotone"
                                            dataKey="sistolik"
                                            stroke={colors.sistolik}
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            name="Sistolik (mmHg)"
                                            connectNulls={false}
                                        />
                                    )}
                                    {(selectedVital === 'all' || selectedVital === 'diastolik' || selectedVital === 'tensi') && (
                                        <Line
                                            type="monotone"
                                            dataKey="diastolik"
                                            stroke={colors.diastolik}
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            name="Diastolik (mmHg)"
                                            connectNulls={false}
                                        />
                                    )}
                                    {(selectedVital === 'all' || selectedVital === 'nadi') && (
                                        <Line
                                            type="monotone"
                                            dataKey="nadi"
                                            stroke={colors.nadi}
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            name="Nadi (bpm)"
                                            connectNulls={false}
                                        />
                                    )}
                                    {(selectedVital === 'all' || selectedVital === 'respirasi') && (
                                        <Line
                                            type="monotone"
                                            dataKey="respirasi"
                                            stroke={colors.respirasi}
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            name="Respirasi (/min)"
                                            connectNulls={false}
                                        />
                                    )}
                                    {(selectedVital === 'all' || selectedVital === 'spo2') && (
                                        <Line
                                            type="monotone"
                                            dataKey="spo2"
                                            stroke={colors.spo2}
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            name="SpO2 (%)"
                                            connectNulls={false}
                                        />
                                    )}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {activeChart === 'summary' && latestVitals && (
                    <div className="space-y-6">
                        {/* Latest Vital Signs Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {[
                                { key: 'suhu', label: 'Suhu', value: latestVitals.suhu, unit: '°C', icon: '🌡️' },
                                { key: 'sistolik', label: 'Sistolik', value: latestVitals.sistolik, unit: 'mmHg', icon: '💓' },
                                { key: 'diastolik', label: 'Diastolik', value: latestVitals.diastolik, unit: 'mmHg', icon: '💓' },
                                { key: 'nadi', label: 'Nadi', value: latestVitals.nadi, unit: 'bpm', icon: '💗' },
                                { key: 'respirasi', label: 'Respirasi', value: latestVitals.respirasi, unit: '/min', icon: '🫁' },
                                { key: 'spo2', label: 'SpO2', value: latestVitals.spo2, unit: '%', icon: '🩸' }
                            ].map((vital) => {
                                const status = getVitalStatus(vital.key, vital.value);
                                return (
                                    <div key={vital.key} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-2xl">{vital.icon}</span>
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
                                                {status === 'normal' ? 'Normal' : status === 'high' ? 'Tinggi' : 'Rendah'}
                                            </span>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {vital.value || '-'}
                                            {vital.value && <span className="text-sm font-normal text-gray-500 ml-1">{vital.unit}</span>}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">{vital.label}</div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Trend Summary */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Ringkasan Trend</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600 dark:text-gray-400">Total Pemeriksaan:</span>
                                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{chartData.length}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600 dark:text-gray-400">Pemeriksaan Terakhir:</span>
                                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{latestVitals.datetime}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600 dark:text-gray-400">Kesadaran Terakhir:</span>
                                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{latestVitals.kesadaran}</span>
                                </div>
                                {latestVitals.berat && (
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">Berat Badan:</span>
                                        <span className="ml-2 font-medium text-gray-900 dark:text-white">{latestVitals.berat} kg</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VitalSignsChart;
