import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    PlusIcon, 
    MagnifyingGlassIcon, 
    ClipboardDocumentCheckIcon,
    CameraIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';

const PermintaanRadiologi = () => {
    const [radioRequests, setRadioRequests] = useState([]);
    const [selectedExams, setSelectedExams] = useState([]);
    const [searchExam, setSearchExam] = useState('');
    const [urgency, setUrgency] = useState('normal');
    const [clinicalInfo, setClinicalInfo] = useState('');
    const [indication, setIndication] = useState('');
    const [activeTab, setActiveTab] = useState('request');

    // Mock radiology exam data
    const radioExams = [
        { id: 1, code: 'XRAY-CHEST', name: 'Rontgen Thorax PA', category: 'X-Ray', price: 150000, bodyPart: 'Dada' },
        { id: 2, code: 'XRAY-ABD', name: 'Rontgen Abdomen', category: 'X-Ray', price: 120000, bodyPart: 'Perut' },
        { id: 3, code: 'XRAY-SPINE', name: 'Rontgen Vertebra Lumbal', category: 'X-Ray', price: 200000, bodyPart: 'Tulang Belakang' },
        { id: 4, code: 'CT-HEAD', name: 'CT Scan Kepala', category: 'CT Scan', price: 800000, bodyPart: 'Kepala' },
        { id: 5, code: 'CT-CHEST', name: 'CT Scan Thorax', category: 'CT Scan', price: 900000, bodyPart: 'Dada' },
        { id: 6, code: 'CT-ABD', name: 'CT Scan Abdomen', category: 'CT Scan', price: 1000000, bodyPart: 'Perut' },
        { id: 7, code: 'MRI-HEAD', name: 'MRI Kepala', category: 'MRI', price: 1500000, bodyPart: 'Kepala' },
        { id: 8, code: 'MRI-SPINE', name: 'MRI Vertebra', category: 'MRI', price: 1800000, bodyPart: 'Tulang Belakang' },
        { id: 9, code: 'USG-ABD', name: 'USG Abdomen', category: 'USG', price: 250000, bodyPart: 'Perut' },
        { id: 10, code: 'USG-PELVIS', name: 'USG Pelvis', category: 'USG', price: 300000, bodyPart: 'Panggul' },
        { id: 11, code: 'USG-CARDIAC', name: 'Echocardiography', category: 'USG', price: 400000, bodyPart: 'Jantung' },
        { id: 12, code: 'MAMMO', name: 'Mammografi', category: 'Mammografi', price: 500000, bodyPart: 'Payudara' }
    ];

    const mockRequests = [
        {
            id: 1,
            requestNumber: 'RAD-2024-001',
            exams: ['Rontgen Thorax PA', 'CT Scan Kepala'],
            urgency: 'urgent',
            status: 'completed',
            requestDate: '2024-01-15 10:30',
            completedDate: '2024-01-15 16:45',
            clinicalInfo: 'Pasien post trauma kepala, sesak napas',
            indication: 'Evaluasi trauma kepala dan pneumonia'
        },
        {
            id: 2,
            requestNumber: 'RAD-2024-002',
            exams: ['USG Abdomen'],
            urgency: 'normal',
            status: 'in_progress',
            requestDate: '2024-01-16 14:20',
            clinicalInfo: 'Nyeri perut kanan atas',
            indication: 'Evaluasi hepatomegali'
        }
    ];

    const filteredExams = radioExams.filter(exam => 
        exam.name.toLowerCase().includes(searchExam.toLowerCase()) ||
        exam.code.toLowerCase().includes(searchExam.toLowerCase()) ||
        exam.category.toLowerCase().includes(searchExam.toLowerCase()) ||
        exam.bodyPart.toLowerCase().includes(searchExam.toLowerCase())
    );

    const toggleExamSelection = (exam) => {
        const isSelected = selectedExams.some(e => e.id === exam.id);
        if (isSelected) {
            setSelectedExams(selectedExams.filter(e => e.id !== exam.id));
        } else {
            setSelectedExams([...selectedExams, exam]);
        }
    };

    const submitRadioRequest = () => {
        if (selectedExams.length === 0) return;
        
        const newRequest = {
            id: Date.now(),
            requestNumber: `RAD-${new Date().getFullYear()}-${String(radioRequests.length + 3).padStart(3, '0')}`,
            exams: selectedExams.map(e => e.name),
            urgency,
            status: 'pending',
            requestDate: new Date().toLocaleString('id-ID'),
            clinicalInfo,
            indication
        };
        
        setRadioRequests([newRequest, ...radioRequests]);
        setSelectedExams([]);
        setClinicalInfo('');
        setIndication('');
        setSearchExam('');
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

    const getCategoryColor = (category) => {
        switch(category) {
            case 'X-Ray': return 'bg-blue-100 text-blue-800';
            case 'CT Scan': return 'bg-purple-100 text-purple-800';
            case 'MRI': return 'bg-red-100 text-red-800';
            case 'USG': return 'bg-green-100 text-green-800';
            case 'Mammografi': return 'bg-pink-100 text-pink-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const totalPrice = selectedExams.reduce((sum, exam) => sum + exam.price, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                        <CameraIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Permintaan Radiologi</h3>
                        <p className="text-sm text-gray-600">Kelola permintaan pemeriksaan radiologi</p>
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
                    Riwayat ({mockRequests.length + radioRequests.length})
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
                                { value: 'normal', label: 'Normal', desc: 'Hasil dalam 2-3 hari' },
                                { value: 'urgent', label: 'Mendesak', desc: 'Hasil dalam 24 jam' },
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

                    {/* Exam Search */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Pilih Pemeriksaan Radiologi</h4>
                        <div className="relative mb-4">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchExam}
                                onChange={(e) => setSearchExam(e.target.value)}
                                placeholder="Cari pemeriksaan radiologi..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div className="max-h-60 overflow-y-auto space-y-2">
                            {filteredExams.map((exam) => {
                                const isSelected = selectedExams.some(e => e.id === exam.id);
                                return (
                                    <div
                                        key={exam.id}
                                        onClick={() => toggleExamSelection(exam)}
                                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                            isSelected
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <span className="font-medium text-indigo-700">{exam.code}</span>
                                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(exam.category)}`}>
                                                        {exam.category}
                                                    </span>
                                                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                        {exam.bodyPart}
                                                    </span>
                                                </div>
                                                <div className="text-gray-900 mb-1">{exam.name}</div>
                                                <div className="text-sm text-gray-600">
                                                    Harga: Rp {exam.price.toLocaleString('id-ID')}
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

                    {/* Selected Exams Summary */}
                    {selectedExams.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h4 className="font-medium text-gray-900 mb-4">
                                Pemeriksaan Dipilih ({selectedExams.length})
                            </h4>
                            <div className="space-y-2 mb-4">
                                {selectedExams.map((exam) => (
                                    <div key={exam.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <span className="text-gray-900">{exam.name}</span>
                                            <span className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(exam.category)}`}>
                                                {exam.category}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-600">Rp {exam.price.toLocaleString('id-ID')}</span>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h4 className="font-medium text-gray-900 mb-4">Informasi Klinis</h4>
                            <textarea
                                value={clinicalInfo}
                                onChange={(e) => setClinicalInfo(e.target.value)}
                                placeholder="Masukkan informasi klinis yang relevan..."
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent p-3"
                            />
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h4 className="font-medium text-gray-900 mb-4">Indikasi Pemeriksaan</h4>
                            <textarea
                                value={indication}
                                onChange={(e) => setIndication(e.target.value)}
                                placeholder="Masukkan indikasi atau tujuan pemeriksaan..."
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent p-3"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={submitRadioRequest}
                            disabled={selectedExams.length === 0}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span>Buat Permintaan Radiologi</span>
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
                    {[...radioRequests, ...mockRequests].length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                            <CameraIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Permintaan Radiologi</h3>
                            <p className="text-gray-600">Buat permintaan pemeriksaan radiologi untuk pasien ini</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {[...radioRequests, ...mockRequests].map((request) => (
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
                                                {request.exams.map((exam, index) => (
                                                    <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                                                        {exam}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {request.clinicalInfo && (
                                                <div>
                                                    <h5 className="font-medium text-gray-900 mb-2">Informasi Klinis:</h5>
                                                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">{request.clinicalInfo}</p>
                                                </div>
                                            )}
                                            
                                            {request.indication && (
                                                <div>
                                                    <h5 className="font-medium text-gray-900 mb-2">Indikasi:</h5>
                                                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">{request.indication}</p>
                                                </div>
                                            )}
                                        </div>
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

export default PermintaanRadiologi;