import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';
import RiwayatKunjungan from './components/RiwayatKunjungan';
import CpptSoap from './components/CpptSoap';
import Resep from './components/Resep';
import Diagnosa from './components/Diagnosa';
import PermintaanLab from './components/PermintaanLab';
import PermintaanRadiologi from './components/PermintaanRadiologi';

export default function Lanjutan({ rawatJalan, params }) {
    // Semua accordion tertutup secara default
    const [openAcc, setOpenAcc] = useState({ pasien: false, registrasi: false });
    const [openRight, setOpenRight] = useState({ cppt: false, resep: false, diagnosa: false, lab: false, radiologi: false });
    // Membuka salah satu akan menutup yang lain; klik ulang menutup semuanya
    const toggle = (key) =>
        setOpenAcc((prev) => {
            const isOpening = !prev[key];
            return isOpening ? { pasien: false, registrasi: false, [key]: true } : { pasien: false, registrasi: false };
        });
    return (
        <AppLayout>
            <Head title={`Lanjutan Rawat Jalan${params?.no_rawat ? ' - ' + params.no_rawat : ''}`} />

            <div className="space-y-6 -mt-6 -mx-6 p-6">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Detail Rawat Jalan</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">No. Rawat: {params?.no_rawat || rawatJalan?.no_rawat || '-'}</p>
                            <p className="text-gray-600 dark:text-gray-400">No. RM: {params?.no_rkm_medis || rawatJalan?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis || '-'}</p>
                            {rawatJalan?.patient && (
                                <p className="text-gray-600 dark:text-gray-400">Pasien: {rawatJalan.patient.nm_pasien}</p>
                            )}
                        </div>
                        <Link
                            href={route('rawat-jalan.index')}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Kolom kiri: Accordion Detail Pasien + Riwayat Pemeriksaan */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Accordion: Data Pasien */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <button onClick={() => toggle('pasien')} className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/40">
                                <span className="font-semibold text-gray-900 dark:text-white">Detail Pasien</span>
                                <svg className={`w-5 h-5 text-gray-500 transition-transform ${openAcc.pasien ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.53a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                            </button>
                            {openAcc.pasien && (
                                <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 text-sm">
                                    {rawatJalan?.patient ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                            <div>
                                                <div className="text-gray-500 dark:text-gray-400">No. RM</div>
                                                <div className="text-gray-900 dark:text-white">{rawatJalan.patient.no_rkm_medis}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-500 dark:text-gray-400">Nama Pasien</div>
                                                <div className="text-gray-900 dark:text-white">{rawatJalan.patient.nm_pasien}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-500 dark:text-gray-400">NIK</div>
                                                <div className="text-gray-900 dark:text-white">{rawatJalan.patient.no_ktp || '-'}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-500 dark:text-gray-400">Jenis Kelamin</div>
                                                <div className="text-gray-900 dark:text-white">{rawatJalan.patient.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-500 dark:text-gray-400">Tanggal Lahir</div>
                                                <div className="text-gray-900 dark:text-white">{rawatJalan.patient.tgl_lahir ? new Date(rawatJalan.patient.tgl_lahir).toLocaleDateString('id-ID') : '-'}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-500 dark:text-gray-400">Alamat</div>
                                                <div className="text-gray-900 dark:text-white">{rawatJalan.patient.alamat || '-'}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-500 dark:text-gray-400">No. Telepon</div>
                                                <div className="text-gray-900 dark:text-white">{rawatJalan.patient.no_tlp || '-'}</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-gray-500 dark:text-gray-400">Data pasien belum tersedia dari parameter yang dikirim.</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Accordion: Data Registrasi */
                        }
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <button onClick={() => toggle('registrasi')} className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/40">
                                <span className="font-semibold text-gray-900 dark:text-white">Detail Registrasi</span>
                                <svg className={`w-5 h-5 text-gray-500 transition-transform ${openAcc.registrasi ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.53a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                            </button>
                            {openAcc.registrasi && (
                                <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 text-sm grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400">Tanggal</div>
                                        <div className="text-gray-900 dark:text-white">{rawatJalan?.tgl_registrasi ? new Date(rawatJalan.tgl_registrasi).toLocaleDateString('id-ID') : '-'}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400">Jam</div>
                                        <div className="text-gray-900 dark:text-white">{rawatJalan?.jam_reg ? String(rawatJalan.jam_reg).substring(0,5) : '-'}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400">Dokter</div>
                                        <div className="text-gray-900 dark:text-white">{rawatJalan?.kd_dokter || '-'}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400">Poli</div>
                                        <div className="text-gray-900 dark:text-white">{rawatJalan?.kd_poli || '-'}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400">Status</div>
                                        <div className="text-gray-900 dark:text-white">{rawatJalan?.stts || '-'}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400">Status Bayar</div>
                                        <div className="text-gray-900 dark:text-white">{rawatJalan?.status_bayar || '-'}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Riwayat Pemeriksaan (dipindah dari kanan) */}
                        <div className="block bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Riwayat Pemeriksaan</h3>
                            <RiwayatKunjungan token={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : ''} noRkmMedis={params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis} />
                        </div>
                    </div>

                    {/* Kolom kanan: Kartu navigasi singkat */}
                    <div className="space-y-4 h-full lg:col-span-2">
                        {/* <Link href={(params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis) ? route('patients.show', params?.no_rkm_medis || rawatJalan.patient.no_rkm_medis) : '#'} className="block bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
                            <h3 className="font-semibold text-gray-900 dark:text-white">Detail Pasien</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Lihat profil lengkap pasien</p>
                        </Link> */}
                        
                        {/* Accordion: CPPT / SOAP */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenRight((prev) => ({ ...prev, cppt: !prev.cppt }))}
                                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/40"
                            >
                                <span className="font-semibold text-gray-900 dark:text-white">CPPT / SOAP</span>
                                <svg className={`w-5 h-5 text-gray-500 transition-transform ${openRight.cppt ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.53a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                            </button>
                            {openRight.cppt && (
                                <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 text-sm">
                                    <CpptSoap
                                        token={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : ''}
                                        noRkmMedis={params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis}
                                        noRawat={params?.no_rawat || rawatJalan?.no_rawat}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Accordion: Resep */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenRight((prev) => ({ ...prev, resep: !prev.resep }))}
                                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/40"
                            >
                                <span className="font-semibold text-gray-900 dark:text-white">Resep</span>
                                <svg className={`w-5 h-5 text-gray-500 transition-transform ${openRight.resep ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.53a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                            </button>
                            {openRight.resep && (
                                <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 text-sm">
                                    <Resep
                                        token={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : ''}
                                        noRkmMedis={params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis}
                                        noRawat={params?.no_rawat || rawatJalan?.no_rawat}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Accordion: Diagnosa */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenRight((prev) => ({ ...prev, diagnosa: !prev.diagnosa }))}
                                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/40"
                            >
                                <span className="font-semibold text-gray-900 dark:text-white">Diagnosa</span>
                                <svg className={`w-5 h-5 text-gray-500 transition-transform ${openRight.diagnosa ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.53a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                            </button>
                            {openRight.diagnosa && (
                                <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 text-sm">
                                    <Diagnosa
                                        token={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : ''}
                                        noRkmMedis={params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis}
                                        noRawat={params?.no_rawat || rawatJalan?.no_rawat}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Accordion: Permintaan Lab */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenRight((prev) => ({ ...prev, lab: !prev.lab }))}
                                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/40"
                            >
                                <span className="font-semibold text-gray-900 dark:text-white">Permintaan Lab</span>
                                <svg className={`w-5 h-5 text-gray-500 transition-transform ${openRight.lab ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.53a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                            </button>
                            {openRight.lab && (
                                <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 text-sm">
                                    <PermintaanLab
                                        token={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : ''}
                                        noRkmMedis={params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis}
                                        noRawat={params?.no_rawat || rawatJalan?.no_rawat}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Accordion: Permintaan Radiologi */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenRight((prev) => ({ ...prev, radiologi: !prev.radiologi }))}
                                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/40"
                            >
                                <span className="font-semibold text-gray-900 dark:text-white">Permintaan Radiologi</span>
                                <svg className={`w-5 h-5 text-gray-500 transition-transform ${openRight.radiologi ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.53a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                            </button>
                            {openRight.radiologi && (
                                <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 text-sm">
                                    <PermintaanRadiologi
                                        token={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('t') : ''}
                                        noRkmMedis={params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis}
                                        noRawat={params?.no_rawat || rawatJalan?.no_rawat}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}


