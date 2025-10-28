import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    PlusIcon, 
    MagnifyingGlassIcon, 
    TrashIcon,
    ClipboardDocumentListIcon,
    CurrencyDollarIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    CalculatorIcon
} from '@heroicons/react/24/outline';

const TarifTindakan = () => {
    const [procedures, setProcedures] = useState([]);
    const [selectedProcedures, setSelectedProcedures] = useState([]);
    const [searchProcedure, setSearchProcedure] = useState('');
    const [procedureCategory, setProcedureCategory] = useState('all');
    const [activeTab, setActiveTab] = useState('add');

    // Mock procedure data for inpatient care
    const medicalProcedures = [
        { id: 1, code: 'INP-001', name: 'Pemasangan Infus', category: 'Keperawatan', price: 50000, duration: 15, description: 'Pemasangan akses intravena' },
        { id: 2, code: 'INP-002', name: 'Pemasangan Kateter Urin', category: 'Keperawatan', price: 75000, duration: 20, description: 'Pemasangan kateter urin steril' },
        { id: 3, code: 'INP-003', name: 'Pemberian Obat Intravena', category: 'Keperawatan', price: 25000, duration: 10, description: 'Administrasi obat melalui IV' },
        { id: 4, code: 'INP-004', name: 'Monitoring Vital Sign', category: 'Keperawatan', price: 15000, duration: 5, description: 'Pemantauan tanda vital rutin' },
        { id: 5, code: 'INP-005', name: 'Perawatan Luka Post Operasi', category: 'Keperawatan', price: 100000, duration: 30, description: 'Perawatan dan ganti balutan luka operasi' },
        
        { id: 6, code: 'DOC-001', name: 'Visite Dokter Spesialis', category: 'Dokter', price: 200000, duration: 30, description: 'Konsultasi dan pemeriksaan dokter spesialis' },
        { id: 7, code: 'DOC-002', name: 'Konsultasi Intensif', category: 'Dokter', price: 150000, duration: 45, description: 'Konsultasi mendalam untuk kasus kompleks' },
        { id: 8, code: 'DOC-003', name: 'Tindakan Emergensi', category: 'Dokter', price: 500000, duration: 60, description: 'Tindakan medis darurat' },
        { id: 9, code: 'DOC-004', name: 'Interpretasi EKG', category: 'Dokter', price: 75000, duration: 15, description: 'Pembacaan dan interpretasi elektrokardiogram' },
        { id: 10, code: 'DOC-005', name: 'Biopsi Jaringan', category: 'Dokter', price: 800000, duration: 90, description: 'Pengambilan sampel jaringan untuk pemeriksaan' },
        
        { id: 11, code: 'LAB-001', name: 'Pengambilan Darah Vena', category: 'Laboratorium', price: 25000, duration: 10, description: 'Prosedur flebotomi untuk sampel darah' },
        { id: 12, code: 'LAB-002', name: 'Pengambilan Darah Arteri', category: 'Laboratorium', price: 50000, duration: 15, description: 'Aspirasi darah arteri untuk analisa gas darah' },
        { id: 13, code: 'LAB-003', name: 'Kultur Darah', category: 'Laboratorium', price: 150000, duration: 20, description: 'Pengambilan sampel untuk kultur bakteri' },
        
        { id: 14, code: 'RAD-001', name: 'Foto Thorax Portable', category: 'Radiologi', price: 200000, duration: 30, description: 'Rontgen dada di ruang rawat inap' },
        { id: 15, code: 'RAD-002', name: 'USG Bedside', category: 'Radiologi', price: 300000, duration: 45, description: 'Ultrasonografi di samping tempat tidur' },
        { id: 16, code: 'RAD-003', name: 'ECG 12 Lead', category: 'Radiologi', price: 100000, duration: 20, description: 'Elektrokardiografi 12 sadapan' },
        
        { id: 17, code: 'THER-001', name: 'Fisioterapi Dada', category: 'Terapi', price: 150000, duration: 45, description: 'Terapi fisik untuk pernapasan' },
        { id: 18, code: 'THER-002', name: 'Mobilisasi Dini', category: 'Terapi', price: 100000, duration: 30, description: 'Program mobilisasi pasca operasi' },
        { id: 19, code: 'THER-003', name: 'Terapi Okupasi', category: 'Terapi', price: 200000, duration: 60, description: 'Rehabilitasi fungsi sehari-hari' },
        { id: 20, code: 'THER-004', name: 'Speech Therapy', category: 'Terapi', price: 250000, duration: 45, description: 'Terapi bicara dan komunikasi' }
    ];

    const mockBillings = [
        {
            id: 1,
            billNumber: 'BILL-INP-2024-001',
            procedures: [
                { name: 'Visite Dokter Spesialis', quantity: 3, price: 200000 },
                { name: 'Pemasangan Infus', quantity: 1, price: 50000 },
                { name: 'Monitoring Vital Sign', quantity: 24, price: 15000 }
            ],
            totalAmount: 1010000,
            billingDate: '2024-01-15 16:30',
            status: 'paid',
            notes: 'Tagihan untuk perawatan intensif 3 hari'
        },
        {
            id: 2,
            billNumber: 'BILL-INP-2024-002',
            procedures: [
                { name: 'Konsultasi Intensif', quantity: 2, price: 150000 },
                { name: 'Fisioterapi Dada', quantity: 5, price: 150000 }
            ],
            totalAmount: 1050000,
            billingDate: '2024-01-16 10:15',
            status: 'pending',
            notes: 'Tagihan rehabilitasi post pneumonia'
        }
    ];

    const categories = ['all', 'Keperawatan', 'Dokter', 'Laboratorium', 'Radiologi', 'Terapi'];

    const filteredProcedures = medicalProcedures.filter(procedure => {
        const matchesSearch = procedure.name.toLowerCase().includes(searchProcedure.toLowerCase()) ||
                            procedure.code.toLowerCase().includes(searchProcedure.toLowerCase()) ||
                            procedure.description.toLowerCase().includes(searchProcedure.toLowerCase());
        const matchesCategory = procedureCategory === 'all' || procedure.category === procedureCategory;
        return matchesSearch && matchesCategory;
    });

    const addProcedureToList = (procedure) => {
        const existingProcedure = selectedProcedures.find(p => p.id === procedure.id);
        if (existingProcedure) {
            setSelectedProcedures(selectedProcedures.map(p => 
                p.id === procedure.id ? { ...p, quantity: p.quantity + 1 } : p
            ));
        } else {
            setSelectedProcedures([...selectedProcedures, { ...procedure, quantity: 1 }]);
        }
    };

    const updateProcedureQuantity = (procedureId, quantity) => {
        if (quantity <= 0) {
            setSelectedProcedures(selectedProcedures.filter(p => p.id !== procedureId));
        } else {
            setSelectedProcedures(selectedProcedures.map(p => 
                p.id === procedureId ? { ...p, quantity } : p
            ));
        }
    };

    const removeProcedureFromList = (procedureId) => {
        setSelectedProcedures(selectedProcedures.filter(p => p.id !== procedureId));
    };

    const submitBilling = () => {
        if (selectedProcedures.length === 0) return;
        
        const newBilling = {
            id: Date.now(),
            billNumber: `BILL-INP-${new Date().getFullYear()}-${String(procedures.length + 3).padStart(3, '0')}`,
            procedures: selectedProcedures.map(procedure => ({
                name: procedure.name,
                quantity: procedure.quantity,
                price: procedure.price
            })),
            totalAmount: totalAmount,
            billingDate: new Date().toLocaleString('id-ID'),
            status: 'pending',
            notes: ''
        };
        
        setProcedures([newBilling, ...procedures]);
        setSelectedProcedures([]);
        setActiveTab('history');
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'paid': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            case 'partial': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'pending': return <ClockIcon className="w-4 h-4" />;
            case 'paid': return <CheckCircleIcon className="w-4 h-4" />;
            case 'cancelled': return <XCircleIcon className="w-4 h-4" />;
            case 'partial': return <CalculatorIcon className="w-4 h-4" />;
            default: return <ClipboardDocumentListIcon className="w-4 h-4" />;
        }
    };

    const getCategoryColor = (category) => {
        switch(category) {
            case 'Keperawatan': return 'bg-blue-100 text-blue-800';
            case 'Dokter': return 'bg-red-100 text-red-800';
            case 'Laboratorium': return 'bg-purple-100 text-purple-800';
            case 'Radiologi': return 'bg-green-100 text-green-800';
            case 'Terapi': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const totalAmount = selectedProcedures.reduce((sum, procedure) => sum + (procedure.price * procedure.quantity), 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                        <CurrencyDollarIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Tarif Tindakan Rawat Inap</h3>
                        <p className="text-sm text-gray-600">Kelola tarif tindakan medis rawat inap</p>
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
                    Input Tindakan
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'history'
                            ? 'bg-white text-indigo-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Riwayat Tagihan ({mockBillings.length + procedures.length})
                </button>
            </div>

            {activeTab === 'add' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Category Filter */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Kategori Tindakan</h4>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setProcedureCategory(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        procedureCategory === category
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category === 'all' ? 'Semua' : category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Procedure Search */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Cari Tindakan Medis</h4>
                        <div className="relative mb-4">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchProcedure}
                                onChange={(e) => setSearchProcedure(e.target.value)}
                                placeholder="Cari nama tindakan, kode, atau deskripsi..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div className="max-h-96 overflow-y-auto space-y-3">
                            {filteredProcedures.map((procedure) => (
                                <div
                                    key={procedure.id}
                                    onClick={() => addProcedureToList(procedure)}
                                    className="p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-all"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="font-medium text-indigo-700">{procedure.code}</span>
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(procedure.category)}`}>
                                                    {procedure.category}
                                                </span>
                                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                    {procedure.duration} menit
                                                </span>
                                            </div>
                                            <div className="font-medium text-gray-900 mb-1">{procedure.name}</div>
                                            <div className="text-sm text-gray-600 mb-2">{procedure.description}</div>
                                            <div className="text-lg font-semibold text-indigo-600">
                                                Rp {procedure.price.toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                        <button className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors">
                                            <PlusIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Selected Procedures */}
                    {selectedProcedures.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h4 className="font-medium text-gray-900 mb-4">
                                Tindakan Dipilih ({selectedProcedures.length})
                            </h4>
                            <div className="space-y-3 mb-6">
                                {selectedProcedures.map((procedure) => (
                                    <div key={procedure.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="font-medium text-gray-900">{procedure.name}</span>
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(procedure.category)}`}>
                                                    {procedure.category}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {procedure.code} • Rp {procedure.price.toLocaleString('id-ID')} per tindakan
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => updateProcedureQuantity(procedure.id, procedure.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-12 text-center font-medium">{procedure.quantity}</span>
                                                <button
                                                    onClick={() => updateProcedureQuantity(procedure.id, procedure.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-semibold text-gray-900">
                                                    Rp {(procedure.price * procedure.quantity).toLocaleString('id-ID')}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeProcedureFromList(procedure.id)}
                                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="border-t pt-4">
                                <div className="flex items-center justify-between text-xl font-semibold">
                                    <span>Total Tagihan:</span>
                                    <span className="text-indigo-600">Rp {totalAmount.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={submitBilling}
                            disabled={selectedProcedures.length === 0}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span>Buat Tagihan</span>
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
                    {[...procedures, ...mockBillings].length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                            <CurrencyDollarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Tagihan</h3>
                            <p className="text-gray-600">Input tindakan medis untuk membuat tagihan</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {[...procedures, ...mockBillings].map((billing) => (
                                <motion.div
                                    key={billing.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="font-semibold text-gray-900">{billing.billNumber}</span>
                                                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(billing.status)}`}>
                                                    {getStatusIcon(billing.status)}
                                                    <span className="capitalize">{billing.status}</span>
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Tanggal: {billing.billingDate}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-semibold text-indigo-600">
                                                Rp {billing.totalAmount.toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div>
                                            <h5 className="font-medium text-gray-900 mb-3">Detail Tindakan:</h5>
                                            <div className="space-y-2">
                                                {billing.procedures.map((procedure, index) => (
                                                    <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900">{procedure.name}</div>
                                                            <div className="text-sm text-gray-600">
                                                                Jumlah: {procedure.quantity} × Rp {procedure.price.toLocaleString('id-ID')}
                                                            </div>
                                                        </div>
                                                        <div className="font-semibold text-gray-900">
                                                            Rp {(procedure.quantity * procedure.price).toLocaleString('id-ID')}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {billing.notes && (
                                            <div>
                                                <h5 className="font-medium text-gray-900 mb-2">Catatan:</h5>
                                                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{billing.notes}</p>
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

export default TarifTindakan;