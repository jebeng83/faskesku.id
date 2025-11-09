import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    PlusIcon, 
    MagnifyingGlassIcon, 
    ClipboardDocumentCheckIcon,
    BeakerIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const PermintaanLab = () => {
    const [labRequests, setLabRequests] = useState([]);
    const [selectedTests, setSelectedTests] = useState([]);
    const [searchTest, setSearchTest] = useState('');
    const [urgency, setUrgency] = useState('normal');
    const [clinicalInfo, setClinicalInfo] = useState('');
    const [activeTab, setActiveTab] = useState('request');

    // Mock lab test data
    const labTests = [
        { id: 1, code: 'HB', name: 'Hemoglobin', category: 'Hematologi', unit: 'g/dL', price: 25000 },
        { id: 2, code: 'LED', name: 'Laju Endap Darah', category: 'Hematologi', unit: 'mm/jam', price: 30000 },
        { id: 3, code: 'LEUKO', name: 'Leukosit', category: 'Hematologi', unit: '/μL', price: 35000 },
        { id: 4, code: 'TROMBO', name: 'Trombosit', category: 'Hematologi', unit: '/μL', price: 35000 },
        { id: 5, code: 'GDS', name: 'Gula Darah Sewaktu', category: 'Kimia Klinik', unit: 'mg/dL', price: 20000 },
        { id: 6, code: 'GDP', name: 'Gula Darah Puasa', category: 'Kimia Klinik', unit: 'mg/dL', price: 25000 },
        { id: 7, code: 'CHOL', name: 'Kolesterol Total', category: 'Kimia Klinik', unit: 'mg/dL', price: 40000 },
        { id: 8, code: 'UREA', name: 'Ureum', category: 'Kimia Klinik', unit: 'mg/dL', price: 30000 },
        { id: 9, code: 'CREAT', name: 'Kreatinin', category: 'Kimia Klinik', unit: 'mg/dL', price: 35000 },
        { id: 10, code: 'SGOT', name: 'SGOT (AST)', category: 'Kimia Klinik', unit: 'U/L', price: 45000 },
        { id: 11, code: 'SGPT', name: 'SGPT (ALT)', category: 'Kimia Klinik', unit: 'U/L', price: 45000 },
        { id: 12, code: 'URIN', name: 'Urin Lengkap', category: 'Urinalisis', unit: '-', price: 50000 },
        { id: 13, code: 'PROTEIN', name: 'Protein Urin', category: 'Urinalisis', unit: 'mg/dL', price: 25000 },
        { id: 14, code: 'HBsAg', name: 'Hepatitis B Surface Antigen', category: 'Serologi', unit: '-', price: 75000 },
        { id: 15, code: 'AntiHCV', name: 'Anti HCV', category: 'Serologi', unit: '-', price: 80000 }
    ];

    const mockRequests = [
        {
            id: 1,
            requestNumber: 'LAB-2024-001',
            tests: ['Hemoglobin', 'Leukosit', 'Gula Darah Sewaktu'],
            urgency: 'urgent',
            status: 'completed',
            requestDate: '2024-01-15 09:30',
            completedDate: '2024-01-15 14:20',
            clinicalInfo: 'Pasien dengan gejala anemia dan diabetes'
        },
        {
            id: 2,
            requestNumber: 'LAB-2024-002',
            tests: ['Kolesterol Total', 'SGOT', 'SGPT'],
            urgency: 'normal',
            status: 'in_progress',
            requestDate: '2024-01-16 11:15',
            clinicalInfo: 'Kontrol rutin fungsi hati'
        }
    ];

    const filteredTests = labTests.filter(test => 
        test.name.toLowerCase().includes(searchTest.toLowerCase()) ||
        test.code.toLowerCase().includes(searchTest.toLowerCase()) ||
        test.category.toLowerCase().includes(searchTest.toLowerCase())
    );

    const toggleTestSelection = (test) => {
        const isSelected = selectedTests.some(t => t.id === test.id);
        if (isSelected) {
            setSelectedTests(selectedTests.filter(t => t.id !== test.id));
        } else {
            setSelectedTests([...selectedTests, test]);
        }
    };

    const submitLabRequest = () => {
        if (selectedTests.length === 0) return;
        
        const newRequest = {
            id: Date.now(),
            requestNumber: `LAB-${new Date().getFullYear()}-${String(labRequests.length + 3).padStart(3, '0')}`,
            tests: selectedTests.map(t => t.name),
            urgency,
            status: 'pending',
            requestDate: new Date().toLocaleString('id-ID'),
            clinicalInfo
        };
        
        setLabRequests([newRequest, ...labRequests]);
        setSelectedTests([]);
        setClinicalInfo('');
        setSearchTest('');
        setActiveTab('history');
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'pending': return <ClockIcon className="w-4 h-4" />;
            case 'in_progress': return <ExclamationTriangleIcon className="w-4 h-4" />;
            case 'completed': return <CheckCircleIcon className="w-4 h-4" />;
            case 'cancelled': return <XCircleIcon className="w-4 h-4" />;
            default: return <ClipboardDocumentCheckIcon className="w-4 h-4" />;
        }
    };

    const getUrgencyColor = (urgency) => {
        switch(urgency) {
            case 'emergency': return 'bg-red-100 text-red-800';
            case 'urgent': return 'bg-orange-100 text-orange-800';
            case 'normal': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const totalPrice = selectedTests.reduce((sum, test) => sum + test.price, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                        <BeakerIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Permintaan Laboratorium</h3>
                        <p className="text-sm text-gray-600">Kelola permintaan pemeriksaan laboratorium</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                    onClick={() => setActiveTab('request')}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'request'
                            ? 'bg-white text-indigo-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Buat Permintaan
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'history'
                            ? 'bg-white text-indigo-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Riwayat ({mockRequests.length + labRequests.length})
                </button>
            </div>

            {activeTab === 'request' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Urgency Selection */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Tingkat Urgensi</h4>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: 'normal', label: 'Normal', desc: 'Hasil dalam 24 jam' },
                                { value: 'urgent', label: 'Mendesak', desc: 'Hasil dalam 6 jam' },
                                { value: 'emergency', label: 'Darurat', desc: 'Hasil segera' }
                            ].map((level) => (
                                <label key={level.value} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="urgency"
                                        value={level.value}
                                        checked={urgency === level.value}
                                        onChange={(e) => setUrgency(e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className={`p-4 rounded-lg border-2 transition-all ${
                                        urgency === level.value
                                            ? 'border-indigo-500 bg-indigo-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                        <div className="text-sm font-medium text-gray-900">{level.label}</div>
                                        <div className="text-xs text-gray-500 mt-1">{level.desc}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Test Search */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Pilih Pemeriksaan</h4>
                        <div className="relative mb-4">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchTest}
                                onChange={(e) => setSearchTest(e.target.value)}
                                placeholder="Cari pemeriksaan laboratorium..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div className="max-h-60 overflow-y-auto space-y-2">
                            {filteredTests.map((test) => {
                                const isSelected = selectedTests.some(t => t.id === test.id);
                                return (
                                    <div
                                        key={test.id}
                                        onClick={() => toggleTestSelection(test)}
                                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                            isSelected
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3">
                                                    <span className="font-medium text-indigo-700">{test.code}</span>
                                                    <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                        {test.category}
                                                    </span>
                                                </div>
                                                <div className="text-gray-900 mt-1">{test.name}</div>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    Unit: {test.unit} • Harga: Rp {test.price.toLocaleString('id-ID')}
                                                </div>
                                            </div>
                                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                                isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'
                                            }`}>
                                                {isSelected && <CheckCircleIcon className="w-3 h-3 text-white" />}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Selected Tests Summary */}
                    {selectedTests.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h4 className="font-medium text-gray-900 mb-4">
                                Pemeriksaan Dipilih ({selectedTests.length})
                            </h4>
                            <div className="space-y-2 mb-4">
                                {selectedTests.map((test) => (
                                    <div key={test.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-900">{test.name}</span>
                                        <span className="text-sm text-gray-600">Rp {test.price.toLocaleString('id-ID')}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex items-center justify-between font-semibold">
                                    <span>Total Biaya:</span>
                                    <span className="text-indigo-600">Rp {totalPrice.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Clinical Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Informasi Klinis</h4>
                        <textarea
                            value={clinicalInfo}
                            onChange={(e) => setClinicalInfo(e.target.value)}
                            placeholder="Masukkan informasi klinis yang relevan untuk pemeriksaan..."
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent p-3"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={submitLabRequest}
                            disabled={selectedTests.length === 0}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span>Buat Permintaan Lab</span>
                        </button>
                    </div>
                </motion.div>
            )}

            {activeTab === 'history' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    {[...labRequests, ...mockRequests].length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                            <BeakerIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Permintaan Lab</h3>
                            <p className="text-gray-600">Buat permintaan pemeriksaan laboratorium untuk pasien ini</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {[...labRequests, ...mockRequests].map((request) => (
                                <motion.div
                                    key={request.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="font-semibold text-gray-900">{request.requestNumber}</span>
                                                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                                                    {getStatusIcon(request.status)}
                                                    <span className="capitalize">{request.status.replace('_', ' ')}</span>
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                                                    {request.urgency}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Diminta: {request.requestDate}
                                                {request.completedDate && (
                                                    <span> • Selesai: {request.completedDate}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div>
                                            <h5 className="font-medium text-gray-900 mb-2">Pemeriksaan:</h5>
                                            <div className="flex flex-wrap gap-2">
                                                {request.tests.map((test, index) => (
                                                    <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                                                        {test}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {request.clinicalInfo && (
                                            <div>
                                                <h5 className="font-medium text-gray-900 mb-2">Informasi Klinis:</h5>
                                                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{request.clinicalInfo}</p>
                                            </div>
                                        )}
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

export default PermintaanLab;