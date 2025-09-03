import React, { useState } from 'react';

export default function CpptSoap({ token = '', noRkmMedis = '', noRawat = '' }) {
    const [formData, setFormData] = useState({
        subjektif: '',
        objektif: '',
        assessment: '',
        planning: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // TODO: Integrasikan ke endpoint CPPT/SOAP jika tersedia
            // Placeholder submit; saat ini hanya log
            // Sertakan token/noRkmMedis/noRawat sesuai kebutuhan backend
            // Contoh:
            // await axios.post(route('cppt.store'), { ...formData, no_rkm_medis: noRkmMedis, no_rawat: noRawat, t: token });
            console.log('Submit CPPT/SOAP', { token, noRkmMedis, noRawat, ...formData });
            setFormData({ subjektif: '', objektif: '', assessment: '', planning: '' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">CPPT / SOAP</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Input catatan CPPT/SOAP</p>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="subjektif">Subjektif</label>
                    <textarea id="subjektif" name="subjektif" value={formData.subjektif} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" rows={3} placeholder="Keluhan utama, riwayat, dll" />
                </div>
                <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="objektif">Objektif</label>
                    <textarea id="objektif" name="objektif" value={formData.objektif} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" rows={3} placeholder="Tanda vital, pemeriksaan fisik, penunjang" />
                </div>
                <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="assessment">Assessment</label>
                    <textarea id="assessment" name="assessment" value={formData.assessment} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" rows={2} placeholder="Diagnosis kerja/masalah" />
                </div>
                <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="planning">Planning</label>
                    <textarea id="planning" name="planning" value={formData.planning} onChange={handleChange} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" rows={2} placeholder="Rencana terapi, kontrol, edukasi" />
                </div>

                <div className="flex items-center justify-end gap-2">
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md disabled:opacity-60" disabled={isSubmitting}>
                        {isSubmitting ? 'Menyimpan...' : 'Simpan CPPT/SOAP'}
                    </button>
                </div>
            </form>
        </div>
    );
}


