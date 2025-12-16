import React, { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { todayDateString, nowDateTimeString } from '@/tools/datetime';
import { RiwayatPermintaanLab } from '@/Pages/RawatJalan/components/PermintaanLab';

export default function PermintaanLab({ token = '', noRkmMedis = '', noRawat = '' }) {
    const [selectedTests, setSelectedTests] = useState([]);
    const [availableTests, setAvailableTests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState('PK');

    const [dokterPerujuk, setDokterPerujuk] = useState({ kd_dokter: '', nm_dokter: '' });
    const [dokterOptions, setDokterOptions] = useState([]);
    const [loadingDokter, setLoadingDokter] = useState(false);
    const [dokterSearch, setDokterSearch] = useState('');
    const [isDokterDropdownOpen, setIsDokterDropdownOpen] = useState(false);
    const dokterDropdownRef = useRef(null);

    const [selectedTemplates, setSelectedTemplates] = useState({});
    const [templatesData, setTemplatesData] = useState({});
    const [loadingTemplates, setLoadingTemplates] = useState({});

    const [formData, setFormData] = useState({
        tgl_permintaan: todayDateString(),
        jam_permintaan: nowDateTimeString().split(' ')[1].substring(0, 5),
        status: 'ranap',
        informasi_tambahan: '-',
        diagnosa_klinis: '-'
    });

    useEffect(() => {
        fetchAvailableTests();
    }, []);

    useEffect(() => {
        fetchDokter();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dokterDropdownRef.current && !dokterDropdownRef.current.contains(event.target)) {
                setIsDokterDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchAvailableTests = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/lab-tests', {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setAvailableTests(data.data || []);
            } else {
                console.error('Failed to fetch lab tests:', response.status);
            }
        } catch (error) {
            console.error('Error fetching lab tests:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDokter = async () => {
        setLoadingDokter(true);
        try {
            const response = await fetch('/api/dokter', {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            if (response.ok) {
                const data = await response.json();
                const validDokters = (data.data || []).filter((dokter) => dokter.kd_dokter !== '-');
                setDokterOptions(validDokters);
            } else {
                setDokterOptions([]);
            }
        } catch (error) {
            console.error('Error fetching dokter:', error);
            setDokterOptions([]);
        } finally {
            setLoadingDokter(false);
        }
    };

    const filteredDokterOptions = dokterOptions.filter(
        (dokter) =>
            dokter.nm_dokter?.toLowerCase().includes(dokterSearch.toLowerCase()) ||
            dokter.kd_dokter?.toLowerCase().includes(dokterSearch.toLowerCase())
    );

    const handleDokterSelect = (dokter) => {
        if (dokter) {
            setDokterPerujuk({ kd_dokter: dokter.kd_dokter, nm_dokter: dokter.nm_dokter });
            setDokterSearch(dokter.nm_dokter);
        } else {
            setDokterPerujuk({ kd_dokter: '', nm_dokter: '' });
            setDokterSearch('');
        }
        setIsDokterDropdownOpen(false);
    };

    const fetchTemplatesForTest = async (kdJenisPrw) => {
        if (templatesData[kdJenisPrw]) {
            return;
        }

        setLoadingTemplates((prev) => ({ ...prev, [kdJenisPrw]: true }));
        try {
            const response = await fetch(`/api/permintaan-lab/templates/${kdJenisPrw}`, {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setTemplatesData((prev) => ({
                    ...prev,
                    [kdJenisPrw]: data.data || []
                }));
                if (data.data && data.data.length > 0) {
                    const templateIds = data.data.map((t) => t.id_template);
                    setSelectedTemplates((prev) => ({
                        ...prev,
                        [kdJenisPrw]: templateIds
                    }));
                }
            } else {
                console.error('Failed to fetch templates:', response.status);
                setTemplatesData((prev) => ({
                    ...prev,
                    [kdJenisPrw]: []
                }));
            }
        } catch (error) {
            console.error('Error fetching templates:', error);
            setTemplatesData((prev) => ({
                ...prev,
                [kdJenisPrw]: []
            }));
        } finally {
            setLoadingTemplates((prev) => ({ ...prev, [kdJenisPrw]: false }));
        }
    };

    const addTest = async (test) => {
        if (!selectedTests.find((t) => t.kd_jenis_prw === test.kd_jenis_prw)) {
            const biaya =
                typeof test.total_byr === 'string'
                    ? parseFloat(test.total_byr.replace(/[^\d.-]/g, '')) || 0
                    : Number(test.total_byr) || 0;

            setSelectedTests((prev) => [
                ...prev,
                {
                    ...test,
                    total_byr: biaya,
                    stts_bayar: 'Belum'
                }
            ]);
            await fetchTemplatesForTest(test.kd_jenis_prw);
        }
    };

    const removeTest = (kd_jenis_prw) => {
        setSelectedTests((prev) => prev.filter((t) => t.kd_jenis_prw !== kd_jenis_prw));
        setSelectedTemplates((prev) => {
            const newState = { ...prev };
            delete newState[kd_jenis_prw];
            return newState;
        });
        setTemplatesData((prev) => {
            const newState = { ...prev };
            delete newState[kd_jenis_prw];
            return newState;
        });
    };

    const toggleTemplate = (kdJenisPrw, idTemplate) => {
        setSelectedTemplates((prev) => {
            const current = prev[kdJenisPrw] || [];
            const isSelected = current.includes(idTemplate);

            if (isSelected) {
                return {
                    ...prev,
                    [kdJenisPrw]: current.filter((id) => id !== idTemplate)
                };
            } else {
                return {
                    ...prev,
                    [kdJenisPrw]: [...current, idTemplate]
                };
            }
        });
    };

    const selectAllTemplates = (kdJenisPrw) => {
        const templates = templatesData[kdJenisPrw] || [];
        const templateIds = templates.map((t) => t.id_template);
        setSelectedTemplates((prev) => ({
            ...prev,
            [kdJenisPrw]: templateIds
        }));
    };

    const deselectAllTemplates = (kdJenisPrw) => {
        setSelectedTemplates((prev) => ({
            ...prev,
            [kdJenisPrw]: []
        }));
    };

    const updateFormData = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedTests.length === 0) {
            alert('Pilih minimal satu pemeriksaan laboratorium');
            return;
        }

        if (!dokterPerujuk.kd_dokter || dokterPerujuk.kd_dokter === '-') {
            alert('Pilih dokter perujuk');
            return;
        }

        if (
            !formData.diagnosa_klinis ||
            formData.diagnosa_klinis.trim() === '' ||
            formData.diagnosa_klinis.trim() === '-'
        ) {
            alert('Diagnosa klinis wajib diisi');
            return;
        }

        for (const test of selectedTests) {
            const selectedTemplateIds = selectedTemplates[test.kd_jenis_prw] || [];
            if (selectedTemplateIds.length === 0) {
                alert(`Pilih minimal satu template untuk pemeriksaan: ${test.nm_perawatan}`);
                return;
            }
        }

        setIsSubmitting(true);
        try {
            const detailTests = selectedTests.map((test) => {
                const selectedTemplateIds = selectedTemplates[test.kd_jenis_prw] || [];
                if (selectedTemplateIds.length === 0) {
                    throw new Error(`Template harus dipilih untuk pemeriksaan: ${test.nm_perawatan}`);
                }
                return {
                    kd_jenis_prw: test.kd_jenis_prw,
                    stts_bayar: test.stts_bayar,
                    templates: selectedTemplateIds
                };
            });

            const submitData = {
                no_rawat: noRawat,
                ...formData,
                dokter_perujuk: dokterPerujuk.kd_dokter || '-',
                detail_tests: detailTests
            };

            router.post(route('laboratorium.permintaan-lab.store'), submitData, {
                onSuccess: async (page) => {
                    setSelectedTests([]);
                    setFormData({
                        tgl_permintaan: todayDateString(),
                        jam_permintaan: nowDateTimeString().split(' ')[1].substring(0, 5),
                        status: 'ranap',
                        informasi_tambahan: '-',
                        diagnosa_klinis: '-'
                    });
                    setDokterPerujuk({ kd_dokter: '', nm_dokter: '' });
                    setDokterSearch('');
                    setSelectedTemplates({});
                    setTemplatesData({});

                    let noorder = null;
                    const successMsg = page.props.flash?.success || '';
                    const match = successMsg.match(/nomor order:\s*([A-Z0-9]+)/i);
                    if (match) {
                        noorder = match[1];
                    }

                    if (noorder) {
                        try {
                            setIsSubmitting(true);

                            const stageRes = await fetch('/api/permintaan-lab/stage-lab', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Accept: 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest',
                                    'X-CSRF-TOKEN':
                                        document
                                            .querySelector('meta[name="csrf-token"]')
                                            ?.getAttribute('content') || ''
                                },
                                body: JSON.stringify({ noorder })
                            });

                            const stageData = await stageRes.json();

                            if (!stageRes.ok || !stageData.success || !stageData.meta?.balanced) {
                                const errMsg =
                                    stageData?.message ||
                                    'Staging jurnal gagal atau tidak seimbang. Posting dibatalkan.';
                                alert(
                                    `Permintaan laboratorium berhasil disimpan (No: ${noorder}), namun staging jurnal gagal: ${errMsg}`
                                );
                                setIsSubmitting(false);
                                return;
                            }

                            try {
                                const postRes = await fetch('/api/akutansi/jurnal/post', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Accept: 'application/json',
                                        'X-Requested-With': 'XMLHttpRequest',
                                        'X-CSRF-TOKEN':
                                            document
                                                .querySelector('meta[name="csrf-token"]')
                                                ?.getAttribute('content') || ''
                                    },
                                    body: JSON.stringify({
                                        no_bukti: noorder,
                                        keterangan: `Posting otomatis permintaan Laboratorium noorder ${noorder}${
                                            noRawat ? ` (no_rawat ${noRawat})` : ''
                                        }`
                                    })
                                });

                                let postData = {};
                                try {
                                    const text = await postRes.text();
                                    postData = text ? JSON.parse(text) : {};
                                } catch (parseError) {
                                    console.error('Error parsing JSON response:', parseError);
                                    postData = {
                                        message: `Gagal parsing response (Status: ${postRes.status})`
                                    };
                                }

                                if (postRes.status === 201 && postData.no_jurnal) {
                                    const noJurnal = postData.no_jurnal;
                                    alert(
                                        `Permintaan laboratorium berhasil disimpan (No: ${noorder}) dan jurnal diposting (No: ${noJurnal}).`
                                    );
                                } else {
                                    const errMsg =
                                        postData?.message ||
                                        `Posting jurnal gagal (Status: ${postRes.status}).`;
                                    console.warn('Posting jurnal gagal:', {
                                        status: postRes.status,
                                        statusText: postRes.statusText,
                                        data: postData,
                                        message: errMsg
                                    });
                                    alert(
                                        `Permintaan laboratorium berhasil disimpan (No: ${noorder}), namun posting jurnal gagal: ${errMsg}`
                                    );
                                }
                            } catch (postError) {
                                console.error('Auto Stage→Post error:', postError);
                                const errMsg =
                                    postError?.response?.data?.message ||
                                    postError?.message ||
                                    'Gagal melakukan posting jurnal otomatis.';
                                alert(
                                    `Permintaan laboratorium berhasil disimpan (No: ${noorder}), namun terjadi kesalahan saat posting jurnal: ${errMsg}`
                                );
                            }
                        } catch (e) {
                            console.error('Auto Stage→Post error:', e);
                            const errMsg =
                                e?.response?.data?.message ||
                                e?.message ||
                                'Gagal melakukan Staging/Posting jurnal otomatis.';
                            alert(
                                `Permintaan laboratorium berhasil disimpan (No: ${noorder}), namun terjadi kesalahan saat staging/posting jurnal: ${errMsg}`
                            );
                        } finally {
                            setIsSubmitting(false);
                        }
                    } else {
                        if (successMsg) {
                            alert(successMsg);
                        } else {
                            alert('Permintaan laboratorium berhasil disimpan');
                        }
                        setIsSubmitting(false);
                    }
                },
                onError: (errors) => {
                    console.error('Error:', errors);

                    if (errors.error) {
                        alert('Error: ' + errors.error);
                    } else if (Object.keys(errors).length > 0) {
                        const errorMessages = Object.values(errors).flat();
                        alert('Validation Error: ' + errorMessages.join(', '));
                    } else {
                        alert('Terjadi kesalahan saat menyimpan permintaan');
                    }
                }
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredTestsByCategory = availableTests.filter((test) => {
        const testCategory = test.kategori || test.kd_kategori || 'PK';
        if (activeCategory === 'PK') return testCategory === 'PK' || !testCategory;
        if (activeCategory === 'PA') return testCategory === 'PA';
        if (activeCategory === 'MB') return testCategory === 'MB';
        return true;
    });

    const filteredTests = filteredTestsByCategory.filter((test) =>
        test.nm_perawatan?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTotalBiaya = () => {
        return selectedTests.reduce((total, test) => {
            const biaya =
                typeof test.total_byr === 'string'
                    ? parseFloat(test.total_byr.replace(/[^\d.-]/g, '')) || 0
                    : Number(test.total_byr) || 0;
            return total + biaya;
        }, 0);
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700">
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <svg
                            className="w-6 h-6 text-green-600 dark:text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Permintaan Laboratorium
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Pilih pemeriksaan laboratorium dan sertakan catatan klinis
                        </p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Tanggal Permintaan
                            </label>
                            <input
                                type="date"
                                value={formData.tgl_permintaan}
                                onChange={(e) => updateFormData('tgl_permintaan', e.target.value)}
                                className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Jam Permintaan
                            </label>
                            <input
                                type="time"
                                value={formData.jam_permintaan}
                                onChange={(e) => updateFormData('jam_permintaan', e.target.value)}
                                className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Dokter Perujuk <span className="text-red-500">*</span>
                            </label>
                            <div className="relative" ref={dokterDropdownRef}>
                                <input
                                    type="text"
                                    value={dokterSearch}
                                    onChange={(e) => {
                                        setDokterSearch(e.target.value);
                                        setIsDokterDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsDokterDropdownOpen(true)}
                                    className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                    placeholder="Cari dokter perujuk..."
                                    required
                                />
                                {isDokterDropdownOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                        {loadingDokter ? (
                                            <div className="p-3 text-center text-gray-500 dark:text-gray-400">
                                                Memuat...
                                            </div>
                                        ) : filteredDokterOptions.length > 0 ? (
                                            filteredDokterOptions.map((dokter) => (
                                                <div
                                                    key={dokter.kd_dokter}
                                                    onClick={() => handleDokterSelect(dokter)}
                                                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                                                >
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {dokter.nm_dokter}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {dokter.kd_dokter}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-3 text-center text-gray-500 dark:text-gray-400">
                                                Tidak ada dokter ditemukan
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            {dokterPerujuk.kd_dokter && (
                                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                    Dipilih: {dokterPerujuk.nm_dokter} ({dokterPerujuk.kd_dokter})
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Diagnosa Klinis <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.diagnosa_klinis}
                                onChange={(e) => updateFormData('diagnosa_klinis', e.target.value)}
                                className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                placeholder="Masukkan diagnosa klinis"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Informasi Tambahan
                            </label>
                            <input
                                type="text"
                                value={formData.informasi_tambahan}
                                onChange={(e) => updateFormData('informasi_tambahan', e.target.value)}
                                className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                placeholder="Informasi tambahan (opsional)"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-600">
                    <button
                        type="button"
                        onClick={() => setActiveCategory('PK')}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeCategory === 'PK'
                                ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                    >
                        Patologi Klinis (PK)
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveCategory('PA')}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeCategory === 'PA'
                                ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                    >
                        Patologi Anatomi (PA)
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveCategory('MB')}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeCategory === 'MB'
                                ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                    >
                        Mikrobiologi (MB)
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            Cari Pemeriksaan Laboratorium ({activeCategory})
                        </h4>
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="Cari nama pemeriksaan..."
                    />

                    {isLoading ? (
                        <div className="text-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto" />
                            <p className="text-sm text-gray-500 mt-2">Memuat pemeriksaan...</p>
                        </div>
                    ) : (
                        <div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg">
                            {filteredTests.length > 0 ? (
                                filteredTests.map((test) => (
                                    <div
                                        key={test.kd_jenis_prw}
                                        className="p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {test.nm_perawatan}
                                                </h5>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Kode: {test.kd_jenis_prw}
                                                </p>
                                                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                                                    {test.total_byr_formatted || 'Rp 0'}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => addTest(test)}
                                                disabled={selectedTests.find(
                                                    (t) => t.kd_jenis_prw === test.kd_jenis_prw
                                                )}
                                                className="ml-3 px-3 py-1.5 text-xs font-medium rounded-md bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                                            >
                                                {selectedTests.find(
                                                    (t) => t.kd_jenis_prw === test.kd_jenis_prw
                                                )
                                                    ? 'Dipilih'
                                                    : 'Pilih'}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                    {searchTerm
                                        ? 'Tidak ada pemeriksaan yang ditemukan'
                                        : 'Tidak ada pemeriksaan tersedia'}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                            Pemeriksaan Terpilih
                        </h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {selectedTests.length} pemeriksaan
                        </span>
                    </div>
                    {selectedTests.length > 0 ? (
                        selectedTests.map((test, index) => {
                            const templates = templatesData[test.kd_jenis_prw] || [];
                            const selectedTemplateIds = selectedTemplates[test.kd_jenis_prw] || [];
                            const isLoadingTemplate = loadingTemplates[test.kd_jenis_prw] || false;
                            const allSelected =
                                templates.length > 0 && selectedTemplateIds.length === templates.length;

                            return (
                                <div
                                    key={test.kd_jenis_prw}
                                    className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium">
                                                    {index + 1}
                                                </span>
                                                <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {test.nm_perawatan}
                                                </h5>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                Kode: {test.kd_jenis_prw}
                                            </p>
                                            <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                                Rp{' '}
                                                {(() => {
                                                    const biaya =
                                                        typeof test.total_byr === 'string'
                                                            ? parseFloat(
                                                                  test.total_byr.replace(/[^\d.-]/g, '')
                                                              ) || 0
                                                            : Number(test.total_byr) || 0;
                                                    return biaya.toLocaleString('id-ID', {
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0
                                                    });
                                                })()}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeTest(test.kd_jenis_prw)}
                                            className="ml-3 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
                                            title="Hapus pemeriksaan"
                                        >
                                            <svg
                                                className="w-3 h-3 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                            Hapus
                                        </button>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                        <div className="flex items-center justify-between mb-3">
                                            <h6 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                                                Pilih Detail Template ({selectedTemplateIds.length} /{' '}
                                                {templates.length} dipilih)
                                            </h6>
                                            {templates.length > 0 && (
                                                <div className="flex space-x-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => selectAllTemplates(test.kd_jenis_prw)}
                                                        disabled={allSelected}
                                                        className="text-xs px-2 py-1 text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed dark:text-blue-400 dark:hover:text-blue-300"
                                                    >
                                                        Pilih Semua
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => deselectAllTemplates(test.kd_jenis_prw)}
                                                        disabled={selectedTemplateIds.length === 0}
                                                        className="text-xs px-2 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:text-gray-300"
                                                    >
                                                        Hapus Semua
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {isLoadingTemplate ? (
                                            <div className="text-center py-4">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto" />
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                    Memuat template...
                                                </p>
                                            </div>
                                        ) : templates.length > 0 ? (
                                            <div className="max-h-96 overflow-y-auto bg-white dark:bg-gray-800 rounded-md p-3 border border-gray-200 dark:border-gray-600">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                                                    {templates.map((template) => {
                                                        const isSelected = selectedTemplateIds.includes(
                                                            template.id_template
                                                        );
                                                        return (
                                                            <label
                                                                key={template.id_template}
                                                                className="flex items-start space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md cursor-pointer border border-gray-200 dark:border-gray-600"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isSelected}
                                                                    onChange={() =>
                                                                        toggleTemplate(
                                                                            test.kd_jenis_prw,
                                                                            template.id_template
                                                                        )
                                                                    }
                                                                    className="mt-0.5 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 flex-shrink-0"
                                                                />
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="text-xs font-medium text-gray-900 dark:text-white break-words">
                                                                        {template.Pemeriksaan || 'Nama tidak tersedia'}
                                                                    </div>
                                                                    {template.satuan && (
                                                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                                            Satuan: {template.satuan}
                                                                        </div>
                                                                    )}
                                                                    {(template.nilai_rujukan_ld ||
                                                                        template.nilai_rujukan_la ||
                                                                        template.nilai_rujukan_pd ||
                                                                        template.nilai_rujukan_pa) && (
                                                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 break-words">
                                                                            Nilai Rujukan:{' '}
                                                                            {template.nilai_rujukan_ld ||
                                                                                template.nilai_rujukan_la ||
                                                                                template.nilai_rujukan_pd ||
                                                                                template.nilai_rujukan_pa ||
                                                                                '-'}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                                                Tidak ada template tersedia untuk pemeriksaan ini
                                            </div>
                                        )}

                                        {selectedTemplateIds.length === 0 && templates.length > 0 && (
                                            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                                                Pilih minimal satu template untuk pemeriksaan ini
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <svg
                                className="w-12 h-12 mx-auto mb-4 opacity-50"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                            <p>Belum ada pemeriksaan yang dipilih</p>
                            <p className="text-sm">
                                Gunakan pencarian di atas untuk memilih pemeriksaan
                            </p>
                        </div>
                    )}

                    {selectedTests.length > 0 && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                                    Total Biaya Pemeriksaan:
                                </span>
                                <span className="text-lg font-bold text-blue-900 dark:text-blue-300">
                                    Rp{' '}
                                    {getTotalBiaya().toLocaleString('id-ID', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    })}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Total: {selectedTests.length} pemeriksaan dipilih
                        </span>
                        {selectedTests.length > 0 && (
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                Rp{' '}
                                {getTotalBiaya().toLocaleString('id-ID', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                })}
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={isSubmitting || selectedTests.length === 0}
                    >
                        {isSubmitting ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Mengirim Permintaan...
                            </>
                        ) : (
                            <>
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    />
                                </svg>
                                Kirim Permintaan Lab
                            </>
                        )}
                    </button>
                </div>
            </form>

            <RiwayatPermintaanLab noRawat={noRawat} />
        </div>
    );
}
