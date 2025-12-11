import React from 'react';
import RiwayatKunjungan from './RiwayatKunjungan';

export default function RiwayatPerawatan({ token, noRkmMedis }) {
    return (
        <div className="space-y-4">
            {/* Riwayat Kunjungan */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* <div className="bg-gradient-to-r from-blue-50 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/20 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30"></div>
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Riwayat Perawatan</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Daftar kunjungan dan detail pemeriksaan</p>
                        </div>
                    </div>
                </div> */}
                <div className="p-3">
                    <RiwayatKunjungan 
                        token={token} 
                        noRkmMedis={noRkmMedis} 
                    />
                </div>
            </div>
        </div>
    );
}
