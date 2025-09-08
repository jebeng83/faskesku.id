import React, { useState } from 'react';

export default function PermintaanLab({ token = '', noRkmMedis = '', noRawat = '' }) {
    const [tests, setTests] = useState([{ id: 1, namaPemeriksaan: '', catatan: '' }]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addTest = () => setTests((prev) => [...prev, { id: Date.now(), namaPemeriksaan: '', catatan: '' }]);
    const removeTest = (id) => setTests((prev) => prev.filter((t) => t.id !== id));
    const updateTest = (id, key, value) => setTests((prev) => prev.map((t) => (t.id === id ? { ...t, [key]: value } : t)));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // TODO: Integrasikan ke endpoint permintaan lab
            // await axios.post(route('lab.request'), { tests, no_rawat: noRawat, t: token });
            console.log('Submit Permintaan Lab', { token, noRkmMedis, noRawat, tests });
            setTests([{ id: 1, namaPemeriksaan: '', catatan: '' }]);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Permintaan Lab</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pilih pemeriksaan dan sertakan catatan</p>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div className="space-y-3">
                    {tests.map((t) => (
                        <div key={t.id} className="grid grid-cols-1 md:grid-cols-12 gap-3">
                            <div className="md:col-span-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Nama Pemeriksaan</label>
                                <input type="text" value={t.namaPemeriksaan} onChange={(e) => updateTest(t.id, 'namaPemeriksaan', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="cth: Hematologi Lengkap" />
                            </div>
                            <div className="md:col-span-5">
                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Catatan Klinis</label>
                                <input type="text" value={t.catatan} onChange={(e) => updateTest(t.id, 'catatan', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="cth: demam 3 hari, nyeri perut" />
                            </div>
                            <div className="md:col-span-1 flex items-end">
                                <button type="button" onClick={() => removeTest(t.id)} className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md">Hapus</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <button type="button" onClick={addTest} className="bg-gray-100 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md">+ Tambah Pemeriksaan</button>
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md disabled:opacity-60" disabled={isSubmitting}>{isSubmitting ? 'Mengirim...' : 'Kirim Permintaan'}</button>
                </div>
            </form>
        </div>
    );
}


