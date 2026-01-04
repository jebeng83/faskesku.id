import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import SidebarRalan from '@/Layouts/SidebarRalan';
import SuratSehat from './components/SuratSehat';
import SuratSakit from './components/SuratSakit';

export default function BuatSurat({ rawatJalan, patient, dokter, setting, suratSehatData, suratSakitData, validationUrl }) {
    const [selectedTemplate, setSelectedTemplate] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('template') === 'sakit' ? 'sakit' : 'sehat';
    });

    useEffect(() => {
        const url = new URL(window.location);
        url.searchParams.set('template', selectedTemplate);
        window.history.replaceState({}, '', url);
    }, [selectedTemplate]);

    const backToRalanUrl = route('rawat-jalan.index');

    const templates = [
        { id: 'sehat', name: 'Surat Sehat' },
        { id: 'sakit', name: 'Surat Sakit' },
    ];

    const templateSelector = (
        <div className="w-full">
            <label htmlFor="jenis_surat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Jenis Surat
            </label>
            <select
                id="jenis_surat"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
            >
                {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                        {template.name}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <SidebarRalan>
            <Head title="Buat Surat" />
            
            <div className="space-y-6">
                {/* Header with Template Selector */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg print:hidden">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Buat Surat
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Pilih template surat yang akan dibuat
                                </p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <button
                                    type="button"
                                    onClick={() => router.get(backToRalanUrl)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                                >
                                    Kembali Rawat Jalan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Render Selected Template Form */}
                <div className="transition-all duration-300 ease-in-out">
                    {selectedTemplate === 'sehat' && (
                        <SuratSehat 
                            rawatJalan={rawatJalan}
                            patient={patient}
                            dokter={dokter}
                            setting={setting}
                            suratSehatData={suratSehatData}
                            embedded={true}
                            templateSelector={templateSelector}
                            validationUrl={validationUrl}
                        />
                    )}
                    
                    {selectedTemplate === 'sakit' && (
                        <SuratSakit 
                            rawatJalan={rawatJalan}
                            patient={patient}
                            dokter={dokter}
                            setting={setting}
                            suratSakitData={suratSakitData}
                            embedded={true}
                            templateSelector={templateSelector}
                            validationUrl={validationUrl}
                        />
                    )}
                </div>
            </div>
        </SidebarRalan>
    );
}
