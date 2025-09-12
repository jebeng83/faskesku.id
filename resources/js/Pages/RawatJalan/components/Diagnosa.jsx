import React, { useMemo, useState } from 'react';

export default function Diagnosa({ token = '', noRkmMedis = '', noRawat = '' }) {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('utama'); // utama | sekunder
    const [selected, setSelected] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // TODO: Ganti dengan pencarian ICD dari API bila tersedia
    const mockIcd = useMemo(() => [
        { kode: 'A09', nama: 'Diare dan gastroenteritis' },
        { kode: 'I10', nama: 'Hipertensi esensial' },
        { kode: 'E11', nama: 'Diabetes mellitus tipe 2' },
        { kode: 'J06', nama: 'Infeksi saluran napas atas akut' },
    ], []);

    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        return mockIcd.filter((d) => d.kode.toLowerCase().includes(q) || d.nama.toLowerCase().includes(q)).slice(0, 10);
    }, [query, mockIcd]);

    const addDiagnosis = (diag) => {
        if (selected.find((s) => s.kode === diag.kode)) return;
        setSelected((prev) => [...prev, { ...diag, type }]);
    };

    const removeDiagnosis = (kode) => {
        setSelected((prev) => prev.filter((s) => s.kode !== kode));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // TODO: Integrasikan ke endpoint diagnosa
            // await axios.post(route('diagnosa.store'), { list: selected, no_rawat: noRawat, t: token });
            console.log('Submit Diagnosa', { token, noRkmMedis, noRawat, selected });
            setSelected([]);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Diagnosa</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tambah ICD dan jenis diagnosa</p>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-4">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Pencarian ICD</label>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="Cari kode/nama ICD" />
                    </div>
                    <div className="md:col-span-3">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Jenis</label>
                        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="utama">Utama</option>
                            <option value="sekunder">Sekunder</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    {filtered.length > 0 && (
                        <div className="border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700">
                            {filtered.map((d) => (
                                <button key={d.kode} type="button" onClick={() => addDiagnosis(d)} className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/40">
                                    <span className="font-medium text-gray-900 dark:text-white mr-2">{d.kode}</span>
                                    <span className="text-gray-600 dark:text-gray-300">{d.nama}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">Daftar Diagnosa</div>
                    {selected.length === 0 ? (
                        <div className="text-sm text-gray-500 dark:text-gray-400">Belum ada diagnosa ditambahkan.</div>
                    ) : (
                        <div className="rounded-md border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
                            {selected.map((s) => (
                                <div key={s.kode} className="flex items-center justify-between px-3 py-2">
                                    <div>
                                        <span className="font-medium text-gray-900 dark:text-white mr-2">{s.kode}</span>
                                        <span className="text-gray-600 dark:text-gray-300">{s.nama}</span>
                                        <span className="ml-2 inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{s.type}</span>
                                    </div>
                                    <button type="button" onClick={() => removeDiagnosis(s.kode)} className="text-red-600 hover:text-red-700">Hapus</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end">
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md disabled:opacity-60" disabled={isSubmitting}>{isSubmitting ? 'Menyimpan...' : 'Simpan Diagnosa'}</button>
                </div>
            </form>
        </div>
    );
}


