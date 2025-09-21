import React, { useState } from 'react';

export default function PermintaanRadiologi({ token = '', noRkmMedis = '', noRawat = '' }) {
    const [exams, setExams] = useState([{ id: 1, namaTindakan: '', infoKlinis: '' }]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addExam = () => setExams((prev) => [...prev, { id: Date.now(), namaTindakan: '', infoKlinis: '' }]);
    const removeExam = (id) => setExams((prev) => prev.filter((x) => x.id !== id));
    const updateExam = (id, key, value) => setExams((prev) => prev.map((x) => (x.id === id ? { ...x, [key]: value } : x)));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // TODO: Integrasikan ke endpoint permintaan radiologi
            // await axios.post(route('radiologi.request'), { exams, no_rawat: noRawat, t: token });
            console.log('Submit Permintaan Radiologi', { token, noRkmMedis, noRawat, exams });
            setExams([{ id: 1, namaTindakan: '', infoKlinis: '' }]);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-gray-800 dark:to-gray-700">
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Permintaan Radiologi</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Pilih tindakan radiologi dan sertakan informasi klinis</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Daftar Tindakan Radiologi
                        </h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                            {exams.length} tindakan
                        </span>
                    </div>
                    {exams.map((x, index) => (
                        <div key={x.id} className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-medium">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Tindakan #{index + 1}</span>
                                </div>
                                {exams.length > 1 && (
                                    <button 
                                        type="button" 
                                        onClick={() => removeExam(x.id)} 
                                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
                                        title="Hapus tindakan"
                                    >
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Hapus
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        Nama Tindakan
                                    </label>
                                    <input 
                                        type="text" 
                                        value={x.namaTindakan} 
                                        onChange={(e) => updateExam(x.id, 'namaTindakan', e.target.value)} 
                                        className="w-full py-2.5 px-3 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors" 
                                        placeholder="Contoh: Rontgen Thorax PA, CT Scan Abdomen, USG Whole Abdomen" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Informasi Klinis
                                    </label>
                                    <textarea 
                                        value={x.infoKlinis} 
                                        onChange={(e) => updateExam(x.id, 'infoKlinis', e.target.value)} 
                                        className="w-full py-2.5 px-3 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none" 
                                        placeholder="Contoh: Batuk lama >2 minggu, sesak napas, riwayat merokok" 
                                        rows={2}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <button 
                            type="button" 
                            onClick={addExam} 
                            className="inline-flex items-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Tambah Tindakan
                        </button>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Total: {exams.length} tindakan
                        </span>
                    </div>
                    <button 
                        type="submit" 
                        className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
                        disabled={isSubmitting || exams.some(x => !x.namaTindakan.trim())}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Mengirim Permintaan...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                Kirim Permintaan Radiologi
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}


