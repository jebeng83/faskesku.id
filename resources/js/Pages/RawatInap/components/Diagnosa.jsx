import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    PlusIcon, 
    MagnifyingGlassIcon, 
    TrashIcon,
    ClipboardDocumentListIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

const Diagnosa = () => {
    const [diagnoses, setDiagnoses] = useState([]);
    const [searchICD, setSearchICD] = useState('');
    const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
    const [diagnosisType, setDiagnosisType] = useState('primary');
    const [activeTab, setActiveTab] = useState('add');

    // Mock ICD-10 data
    const icdCodes = [
        { code: 'A09', name: 'Infectious gastroenteritis and colitis, unspecified' },
        { code: 'B34.9', name: 'Viral infection, unspecified' },
        { code: 'E11.9', name: 'Type 2 diabetes mellitus without complications' },
        { code: 'I10', name: 'Essential (primary) hypertension' },
        { code: 'J44.1', name: 'Chronic obstructive pulmonary disease with acute exacerbation' },
        { code: 'K59.0', name: 'Constipation' },
        { code: 'M79.3', name: 'Panniculitis, unspecified' },
        { code: 'N39.0', name: 'Urinary tract infection, site not specified' },
        { code: 'R50.9', name: 'Fever, unspecified' },
        { code: 'Z51.11', name: 'Encounter for antineoplastic chemotherapy' }
    ];

    const filteredICDs = icdCodes.filter(icd => 
        icd.code.toLowerCase().includes(searchICD.toLowerCase()) ||
        icd.name.toLowerCase().includes(searchICD.toLowerCase())
    );

    const addDiagnosis = () => {
        if (!selectedDiagnosis) return;
        
        const newDiagnosis = {
            id: Date.now(),
            code: selectedDiagnosis.code,
            name: selectedDiagnosis.name,
            type: diagnosisType,
            timestamp: new Date().toLocaleString('id-ID'),
            status: 'active'
        };
        
        setDiagnoses([...diagnoses, newDiagnosis]);
        setSelectedDiagnosis(null);
        setSearchICD('');
    };

    const removeDiagnosis = (id) => {
        setDiagnoses(diagnoses.filter(d => d.id !== id));
    };

    const getTypeColor = (type) => {
        switch(type) {
            case 'primary': return 'bg-red-100 text-red-800 border-red-200';
            case 'secondary': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'differential': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getTypeIcon = (type) => {
        switch(type) {
            case 'primary': return <ExclamationTriangleIcon className="w-4 h-4" />;
            case 'secondary': return <ClockIcon className="w-4 h-4" />;
            case 'differential': return <CheckCircleIcon className="w-4 h-4" />;
            default: return <ClipboardDocumentListIcon className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                        <ClipboardDocumentListIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Diagnosa Medis</h3>
                        <p className="text-sm text-gray-600">Kelola diagnosis dan kode ICD-10</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                    onClick={() => setActiveTab('add')}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'add'
                            ? 'bg-white text-indigo-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Tambah Diagnosa
                </button>
                <button
                    onClick={() => setActiveTab('list')}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'list'
                            ? 'bg-white text-indigo-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Daftar Diagnosa ({diagnoses.length})
                </button>
            </div>

            {activeTab === 'add' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <div className="space-y-6">
                        {/* Diagnosis Type Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Jenis Diagnosa
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { value: 'primary', label: 'Primer', desc: 'Diagnosa utama' },
                                    { value: 'secondary', label: 'Sekunder', desc: 'Diagnosa tambahan' },
                                    { value: 'differential', label: 'Diferensial', desc: 'Diagnosa banding' }
                                ].map((type) => (
                                    <label key={type.value} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="diagnosisType"
                                            value={type.value}
                                            checked={diagnosisType === type.value}
                                            onChange={(e) => setDiagnosisType(e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className={`p-4 rounded-lg border-2 transition-all ${
                                            diagnosisType === type.value
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}>
                                            <div className="text-sm font-medium text-gray-900">{type.label}</div>
                                            <div className="text-xs text-gray-500 mt-1">{type.desc}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* ICD Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cari Kode ICD-10
                            </label>
                            <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchICD}
                                    onChange={(e) => setSearchICD(e.target.value)}
                                    placeholder="Cari berdasarkan kode atau nama diagnosa..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* ICD Results */}
                        {searchICD && (
                            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                                {filteredICDs.map((icd) => (
                                    <button
                                        key={icd.code}
                                        onClick={() => setSelectedDiagnosis(icd)}
                                        className={`w-full text-left p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                                            selectedDiagnosis?.code === icd.code ? 'bg-indigo-50 border-indigo-200' : ''
                                        }`}
                                    >
                                        <div className="font-medium text-indigo-700">{icd.code}</div>
                                        <div className="text-sm text-gray-600 mt-1">{icd.name}</div>
                                    </button>
                                ))}
                                {filteredICDs.length === 0 && (
                                    <div className="p-4 text-center text-gray-500">
                                        Tidak ada hasil ditemukan
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Selected Diagnosis */}
                        {selectedDiagnosis && (
                            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-indigo-900">
                                            {selectedDiagnosis.code} - {selectedDiagnosis.name}
                                        </div>
                                        <div className="text-sm text-indigo-700 mt-1">
                                            Akan ditambahkan sebagai diagnosa {diagnosisType}
                                        </div>
                                    </div>
                                    <button
                                        onClick={addDiagnosis}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                        <span>Tambah</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}

            {activeTab === 'list' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    {diagnoses.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                            <ClipboardDocumentListIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Diagnosa</h3>
                            <p className="text-gray-600">Tambahkan diagnosa untuk pasien ini</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {diagnoses.map((diagnosis) => (
                                <motion.div
                                    key={diagnosis.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(diagnosis.type)}`}>
                                                    {getTypeIcon(diagnosis.type)}
                                                    <span className="capitalize">{diagnosis.type}</span>
                                                </span>
                                                <span className="text-xs text-gray-500">{diagnosis.timestamp}</span>
                                            </div>
                                            <div className="font-semibold text-gray-900 mb-1">
                                                {diagnosis.code}
                                            </div>
                                            <div className="text-gray-700">
                                                {diagnosis.name}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeDiagnosis(diagnosis.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default Diagnosa;