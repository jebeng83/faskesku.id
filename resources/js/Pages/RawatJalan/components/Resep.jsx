import React, { useState } from 'react';

export default function Resep({ token = '', noRkmMedis = '', noRawat = '' }) {
    const [items, setItems] = useState([
        { id: 1, namaObat: '', aturanPakai: '', jumlah: 0, satuan: '' },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addItem = () => {
        setItems((prev) => [...prev, { id: Date.now(), namaObat: '', aturanPakai: '', jumlah: 0, satuan: '' }]);
    };

    const removeItem = (id) => {
        setItems((prev) => prev.filter((it) => it.id !== id));
    };

    const updateItem = (id, key, value) => {
        setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [key]: value } : it)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // TODO: Integrasikan ke endpoint resep jika tersedia
            // Contoh:
            // await axios.post(route('resep.store'), { items, no_rkm_medis: noRkmMedis, no_rawat: noRawat, t: token });
            console.log('Submit Resep', { token, noRkmMedis, noRawat, items });
            setItems([{ id: 1, namaObat: '', aturanPakai: '', jumlah: 0, satuan: '' }]);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Resep</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Input & lihat resep pasien</p>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div className="space-y-3">
                    {items.map((item) => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3">
                            <div className="md:col-span-4">
                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Nama Obat</label>
                                <input type="text" value={item.namaObat} onChange={(e) => updateItem(item.id, 'namaObat', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="cth: Paracetamol 500mg" />
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Aturan Pakai</label>
                                <input type="text" value={item.aturanPakai} onChange={(e) => updateItem(item.id, 'aturanPakai', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="3x1 sesudah makan" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Jumlah</label>
                                <input type="number" min="0" value={item.jumlah} onChange={(e) => updateItem(item.id, 'jumlah', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Satuan</label>
                                <input type="text" value={item.satuan} onChange={(e) => updateItem(item.id, 'satuan', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="tablet, botol, dll" />
                            </div>
                            <div className="md:col-span-1 flex items-end">
                                <button type="button" onClick={() => removeItem(item.id)} className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md">Hapus</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <button type="button" onClick={addItem} className="bg-gray-100 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md">+ Tambah Obat</button>
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md disabled:opacity-60" disabled={isSubmitting}>{isSubmitting ? 'Menyimpan...' : 'Simpan Resep'}</button>
                </div>
            </form>
        </div>
    );
}


