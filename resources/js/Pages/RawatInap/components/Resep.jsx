import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    PlusIcon, 
    SearchIcon, 
    TrashIcon,
    ClipboardDocumentListIcon,
    HeartIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const Resep = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [selectedDrugs, setSelectedDrugs] = useState([]);
    const [searchDrug, setSearchDrug] = useState('');
    const [prescriptionType, setPrescriptionType] = useState('oral');
    const [activeTab, setActiveTab] = useState('create');

    // Mock drug data
    const drugs = [
        { id: 1, name: 'Paracetamol 500mg', type: 'Tablet', unit: 'Tab', price: 500, stock: 1000, category: 'Analgesik' },
        { id: 2, name: 'Amoxicillin 500mg', type: 'Kapsul', unit: 'Kaps', price: 2000, stock: 500, category: 'Antibiotik' },
        { id: 3, name: 'Omeprazole 20mg', type: 'Kapsul', unit: 'Kaps', price: 3500, stock: 200, category: 'Antasida' },
        { id: 4, name: 'Metformin 500mg', type: 'Tablet', unit: 'Tab', price: 1200, stock: 800, category: 'Antidiabetik' },
        { id: 5, name: 'Amlodipine 5mg', type: 'Tablet', unit: 'Tab', price: 1800, stock: 300, category: 'Antihipertensi' },
        { id: 6, name: 'Simvastatin 20mg', type: 'Tablet', unit: 'Tab', price: 2500, stock: 150, category: 'Antilipid' },
        { id: 7, name: 'Captopril 25mg', type: 'Tablet', unit: 'Tab', price: 800, stock: 600, category: 'ACE Inhibitor' },
        { id: 8, name: 'Furosemide 40mg', type: 'Tablet', unit: 'Tab', price: 1500, stock: 400, category: 'Diuretik' },
        { id: 9, name: 'Dexamethasone 0.5mg', type: 'Tablet', unit: 'Tab', price: 1000, stock: 250, category: 'Kortikosteroid' },
        { id: 10, name: 'Insulin Rapid Acting', type: 'Injection', unit: 'Vial', price: 85000, stock: 50, category: 'Antidiabetik' },
        { id: 11, name: 'Morphine 10mg/ml', type: 'Injection', unit: 'Amp', price: 25000, stock: 100, category: 'Analgesik Narkotik' },
        { id: 12, name: 'Normal Saline 0.9%', type: 'IV Fluid', unit: 'Bag', price: 15000, stock: 200, category: 'Cairan Infus' }
    ];

    const mockPrescriptions = [
        {
            id: 1,
            prescriptionNumber: 'RX-INP-2024-001',
            type: 'oral',
            status: 'dispensed',
            drugs: [
                { name: 'Paracetamol 500mg', quantity: 30, dosage: '3x1 tablet', instruction: 'Sesudah makan' },
                { name: 'Amoxicillin 500mg', quantity: 21, dosage: '3x1 kapsul', instruction: 'Sebelum makan' }
            ],
            prescribedDate: '2024-01-15 10:30',
            dispensedDate: '2024-01-15 14:20',
            notes: 'Untuk nyeri dan infeksi post operasi'
        },
        {
            id: 2,
            prescriptionNumber: 'RX-INP-2024-002',
            type: 'injection',
            status: 'pending',
            drugs: [
                { name: 'Insulin Rapid Acting', quantity: 2, dosage: '3x10 unit SC', instruction: 'Sebelum makan' },
                { name: 'Normal Saline 0.9%', quantity: 6, dosage: '500ml IV', instruction: 'Maintenance fluid' }
            ],
            prescribedDate: '2024-01-16 08:15',
            notes: 'Terapi intensif diabetes dan rehidrasi'
        }
    ];

    const filteredDrugs = drugs.filter(drug => 
        drug.name.toLowerCase().includes(searchDrug.toLowerCase()) ||
        drug.category.toLowerCase().includes(searchDrug.toLowerCase()) ||
        drug.type.toLowerCase().includes(searchDrug.toLowerCase())
    );

    const addDrugToPrescription = (drug) => {
        const existingDrug = selectedDrugs.find(d => d.id === drug.id);
        if (existingDrug) return;

        const newDrug = {
            ...drug,
            quantity: 1,
            dosage: '',
            instruction: '',
            frequency: '3x1'
        };
        setSelectedDrugs([...selectedDrugs, newDrug]);
    };

    const updateDrugDetails = (drugId, field, value) => {
        setSelectedDrugs(selectedDrugs.map(drug => 
            drug.id === drugId ? { ...drug, [field]: value } : drug
        ));
    };

    const removeDrugFromPrescription = (drugId) => {
        setSelectedDrugs(selectedDrugs.filter(drug => drug.id !== drugId));
    };

    const submitPrescription = () => {
        if (selectedDrugs.length === 0) return;
        
        const newPrescription = {
            id: Date.now(),
            prescriptionNumber: `RX-INP-${new Date().getFullYear()}-${String(prescriptions.length + 3).padStart(3, '0')}`,
            type: prescriptionType,
            status: 'pending',
            drugs: selectedDrugs.map(drug => ({
                name: drug.name,
                quantity: drug.quantity,
                dosage: drug.dosage || `${drug.frequency} ${drug.type.toLowerCase()}`,
                instruction: drug.instruction
            })),
            prescribedDate: new Date().toLocaleString('id-ID'),
            notes: ''
        };
        
        setPrescriptions([newPrescription, ...prescriptions]);
        setSelectedDrugs([]);
        setActiveTab('history');
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'dispensed': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            case 'partial': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'pending': return <ClockIcon className="w-4 h-4" />;
            case 'dispensed': return <CheckCircleIcon className="w-4 h-4" />;
            case 'cancelled': return <XCircleIcon className="w-4 h-4" />;
            case 'partial': return <ExclamationTriangleIcon className="w-4 h-4" />;
            default: return <ClipboardDocumentListIcon className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type) => {
        switch(type) {
            case 'oral': return 'bg-green-100 text-green-800';
            case 'injection': return 'bg-red-100 text-red-800';
            case 'topical': return 'bg-blue-100 text-blue-800';
            case 'iv': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const totalCost = selectedDrugs.reduce((sum, drug) => sum + (drug.price * drug.quantity), 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                        <HeartIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Resep Rawat Inap</h3>
                        <p className="text-sm text-gray-600">Kelola resep obat untuk pasien rawat inap</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                    onClick={() => setActiveTab('create')}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'create'
                            ? 'bg-white text-indigo-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Buat Resep
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'history'
                            ? 'bg-white text-indigo-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Riwayat ({mockPrescriptions.length + prescriptions.length})
                </button>
            </div>

            {activeTab === 'create' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Prescription Type */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Jenis Resep</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { value: 'oral', label: 'Oral', desc: 'Obat minum', icon: '💊' },
                                { value: 'injection', label: 'Injeksi', desc: 'Suntikan', icon: '💉' },
                                { value: 'topical', label: 'Topikal', desc: 'Obat luar', icon: '🧴' },
                                { value: 'iv', label: 'Intravena', desc: 'Infus IV', icon: '🩸' }
                            ].map((type) => (
                                <label key={type.value} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="prescriptionType"
                                        value={type.value}
                                        checked={prescriptionType === type.value}
                                        onChange={(e) => setPrescriptionType(e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className={`p-4 rounded-lg border-2 transition-all text-center ${
                                        prescriptionType === type.value
                                            ? 'border-indigo-500 bg-indigo-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                        <div className="text-2xl mb-2">{type.icon}</div>
                                        <div className="text-sm font-medium text-gray-900">{type.label}</div>
                                        <div className="text-xs text-gray-500 mt-1">{type.desc}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Drug Search */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Cari Obat</h4>
                        <div className="relative mb-4">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchDrug}
                                onChange={(e) => setSearchDrug(e.target.value)}
                                placeholder="Cari nama obat, kategori, atau jenis..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div className="max-h-60 overflow-y-auto space-y-2">
                            {filteredDrugs.map((drug) => {
                                const isSelected = selectedDrugs.some(d => d.id === drug.id);
                                return (
                                    <div
                                        key={drug.id}
                                        onClick={() => !isSelected && addDrugToPrescription(drug)}
                                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                            isSelected
                                                ? 'border-green-500 bg-green-50 cursor-not-allowed'
                                                : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-1">
                                                    <span className="font-medium text-gray-900">{drug.name}</span>
                                                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                        {drug.category}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {drug.type} • Stok: {drug.stock} {drug.unit} • Rp {drug.price.toLocaleString('id-ID')}/{drug.unit}
                                                </div>
                                            </div>
                                            {isSelected && (
                                                <div className="text-green-600">
                                                    <CheckCircleIcon className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Selected Drugs */}
                    {selectedDrugs.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h4 className="font-medium text-gray-900 mb-4">
                                Obat Dipilih ({selectedDrugs.length})
                            </h4>
                            <div className="space-y-4">
                                {selectedDrugs.map((drug) => (
                                    <div key={drug.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h5 className="font-medium text-gray-900">{drug.name}</h5>
                                                <p className="text-sm text-gray-600">{drug.type} - {drug.category}</p>
                                            </div>
                                            <button
                                                onClick={() => removeDrugFromPrescription(drug.id)}
                                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Jumlah
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={drug.quantity}
                                                    onChange={(e) => updateDrugDetails(drug.id, 'quantity', parseInt(e.target.value) || 1)}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Frekuensi
                                                </label>
                                                <select
                                                    value={drug.frequency}
                                                    onChange={(e) => updateDrugDetails(drug.id, 'frequency', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                >
                                                    <option value="1x1">1x1</option>
                                                    <option value="2x1">2x1</option>
                                                    <option value="3x1">3x1</option>
                                                    <option value="4x1">4x1</option>
                                                    <option value="PRN">PRN (bila perlu)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Petunjuk
                                                </label>
                                                <input
                                                    type="text"
                                                    value={drug.instruction}
                                                    onChange={(e) => updateDrugDetails(drug.id, 'instruction', e.target.value)}
                                                    placeholder="Sebelum/sesudah makan"
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="mt-3 text-sm text-gray-600">
                                            Subtotal: Rp {(drug.price * drug.quantity).toLocaleString('id-ID')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="border-t pt-4 mt-4">
                                <div className="flex items-center justify-between text-lg font-semibold">
                                    <span>Total Biaya:</span>
                                    <span className="text-indigo-600">Rp {totalCost.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={submitPrescription}
                            disabled={selectedDrugs.length === 0}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span>Buat Resep</span>
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
                    {[...prescriptions, ...mockPrescriptions].length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                            <HeartIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Resep</h3>
                            <p className="text-gray-600">Buat resep obat untuk pasien rawat inap</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {[...prescriptions, ...mockPrescriptions].map((prescription) => (
                                <motion.div
                                    key={prescription.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="font-semibold text-gray-900">{prescription.prescriptionNumber}</span>
                                                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(prescription.status)}`}>
                                                    {getStatusIcon(prescription.status)}
                                                    <span className="capitalize">{prescription.status}</span>
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(prescription.type)}`}>
                                                    {prescription.type}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Diresepkan: {prescription.prescribedDate}
                                                {prescription.dispensedDate && (
                                                    <span> • Diserahkan: {prescription.dispensedDate}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div>
                                            <h5 className="font-medium text-gray-900 mb-3">Daftar Obat:</h5>
                                            <div className="space-y-2">
                                                {prescription.drugs.map((drug, index) => (
                                                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1">
                                                                <div className="font-medium text-gray-900">{drug.name}</div>
                                                                <div className="text-sm text-gray-600 mt-1">
                                                                    Jumlah: {drug.quantity} • Dosis: {drug.dosage}
                                                                    {drug.instruction && <span> • {drug.instruction}</span>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {prescription.notes && (
                                            <div>
                                                <h5 className="font-medium text-gray-900 mb-2">Catatan:</h5>
                                                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{prescription.notes}</p>
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

export default Resep;