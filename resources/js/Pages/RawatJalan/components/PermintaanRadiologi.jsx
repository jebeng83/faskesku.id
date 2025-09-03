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
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Permintaan Radiologi</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pilih tindakan dan info klinis</p>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div className="space-y-3">
                    {exams.map((x) => (
                        <div key={x.id} className="grid grid-cols-1 md:grid-cols-12 gap-3">
                            <div className="md:col-span-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Nama Tindakan</label>
                                <input type="text" value={x.namaTindakan} onChange={(e) => updateExam(x.id, 'namaTindakan', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="cth: Rontgen Thorax PA" />
                            </div>
                            <div className="md:col-span-5">
                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Info Klinis</label>
                                <input type="text" value={x.infoKlinis} onChange={(e) => updateExam(x.id, 'infoKlinis', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="cth: batuk lama, sesak" />
                            </div>
                            <div className="md:col-span-1 flex items-end">
                                <button type="button" onClick={() => removeExam(x.id)} className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md">Hapus</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <button type="button" onClick={addExam} className="bg-gray-100 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md">+ Tambah Tindakan</button>
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md disabled:opacity-60" disabled={isSubmitting}>{isSubmitting ? 'Mengirim...' : 'Kirim Permintaan'}</button>
                </div>
            </form>
        </div>
    );
}


