import React, { useMemo, useState, useEffect } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import SearchableSelect from "@/Components/SearchableSelect";
import usePermission from "@/hooks/usePermission";

export default function Create({ refs = {} }) {
    const { can } = usePermission();
    const [showJenjangJabatanModal, setShowJenjangJabatanModal] = useState(false);
    const [jenjangJabatanOptions, setJenjangJabatanOptions] = useState(
        (refs.jnjJabatan || []).map((r) => ({ value: r.kode, label: `${r.kode} - ${r.nama}` }))
    );

    const [showDepartemenModal, setShowDepartemenModal] = useState(false);
    const [departemenOptions, setDepartemenOptions] = useState(
        (refs.departemen || []).map((r) => ({ value: r.dep_id, label: `${r.dep_id} - ${r.nama}` }))
    );

    const [showBidangModal, setShowBidangModal] = useState(false);
    const [bidangOptions, setBidangOptions] = useState(
        (refs.bidang || []).map((r) => ({ value: r.nama, label: r.nama }))
    );

    const [showPendidikanModal, setShowPendidikanModal] = useState(false);
    const [pendidikanOptions, setPendidikanOptions] = useState(
        (refs.pendidikan || []).map((r) => ({ value: r.tingkat, label: r.tingkat }))
    );

    const [showResikoKerjaModal, setShowResikoKerjaModal] = useState(false);
    const [resikoKerjaOptions, setResikoKerjaOptions] = useState(
        (refs.resikoKerja || []).map((r) => ({ value: r.kode_resiko, label: `${r.kode_resiko} - ${r.nama_resiko}` }))
    );

    const [showKelompokJabatanModal, setShowKelompokJabatanModal] = useState(false);
    const [kelompokJabatanOptions, setKelompokJabatanOptions] = useState(
        (refs.kelompokJabatan || []).map((r) => ({ value: r.kode_kelompok, label: `${r.kode_kelompok} - ${r.nama_kelompok}` }))
    );

    const [showEmergencyIndexModal, setShowEmergencyIndexModal] = useState(false);
    const [emergencyIndexOptions, setEmergencyIndexOptions] = useState(
        (refs.emergencyIndex || []).map((r) => ({ value: r.kode_emergency, label: `${r.kode_emergency} - ${r.nama_emergency || r.emergency || ''}` }))
    );

    const [showBankModal, setShowBankModal] = useState(false);
    const [bankOptions, setBankOptions] = useState(
        (refs.bank || []).map((r) => ({ value: r.namabank, label: r.namabank }))
    );

    const [showSttsWpModal, setShowSttsWpModal] = useState(false);
    const [sttsWpOptions, setSttsWpOptions] = useState(
        (refs.sttsWp || []).map((r) => ({ value: r.stts, label: `${r.stts}${r.ktg ? ` - ${r.ktg}` : ""}` }))
    );

    const [showSttsKerjaModal, setShowSttsKerjaModal] = useState(false);
    const [sttsKerjaOptions, setSttsKerjaOptions] = useState(
        (refs.sttsKerja || []).map((r) => ({ value: r.stts, label: `${r.stts}${r.ktg ? ` - ${r.ktg}` : ""}` }))
    );

    // Sinkronisasi options ketika refs berubah
    useEffect(() => {
        const newOptions = (refs.jnjJabatan || []).map((r) => ({ value: r.kode, label: `${r.kode} - ${r.nama}` }));
        setJenjangJabatanOptions(newOptions);
    }, [refs.jnjJabatan]);

    useEffect(() => {
        const newOptions = (refs.departemen || []).map((r) => ({ value: r.dep_id, label: `${r.dep_id} - ${r.nama}` }));
        setDepartemenOptions(newOptions);
    }, [refs.departemen]);

    useEffect(() => {
        const newOptions = (refs.bidang || []).map((r) => ({ value: r.nama, label: r.nama }));
        setBidangOptions(newOptions);
    }, [refs.bidang]);

    useEffect(() => {
        const newOptions = (refs.pendidikan || []).map((r) => ({ value: r.tingkat, label: r.tingkat }));
        setPendidikanOptions(newOptions);
    }, [refs.pendidikan]);

    useEffect(() => {
        const newOptions = (refs.resikoKerja || []).map((r) => ({ value: r.kode_resiko, label: `${r.kode_resiko} - ${r.nama_resiko}` }));
        setResikoKerjaOptions(newOptions);
    }, [refs.resikoKerja]);

    useEffect(() => {
        const newOptions = (refs.kelompokJabatan || []).map((r) => ({ value: r.kode_kelompok, label: `${r.kode_kelompok} - ${r.nama_kelompok}` }));
        setKelompokJabatanOptions(newOptions);
    }, [refs.kelompokJabatan]);

    useEffect(() => {
        const newOptions = (refs.emergencyIndex || []).map((r) => ({ value: r.kode_emergency, label: `${r.kode_emergency} - ${r.nama_emergency || r.emergency || ''}` }));
        setEmergencyIndexOptions(newOptions);
    }, [refs.emergencyIndex]);

    useEffect(() => {
        const newOptions = (refs.bank || []).map((r) => ({ value: r.namabank, label: r.namabank }));
        setBankOptions(newOptions);
    }, [refs.bank]);

    useEffect(() => {
        const newOptions = (refs.sttsWp || []).map((r) => ({ value: r.stts, label: `${r.stts}${r.ktg ? ` - ${r.ktg}` : ""}` }));
        setSttsWpOptions(newOptions);
    }, [refs.sttsWp]);

    useEffect(() => {
        const newOptions = (refs.sttsKerja || []).map((r) => ({ value: r.stts, label: `${r.stts}${r.ktg ? ` - ${r.ktg}` : ""}` }));
        setSttsKerjaOptions(newOptions);
    }, [refs.sttsKerja]);

    const { data, setData, post, processing, errors } = useForm({
        // Data utama
        nik: "",
        no_ktp: "",
        nama: "",
        jk: "Pria",
        tmp_lahir: "",
        tgl_lahir: "",
        alamat: "",
        photo: null,

        // Informasi kepegawaian (opsional)
        jbtn: "",
        jnj_jabatan: "",
        kode_kelompok: "",
        kode_resiko: "",
        kode_emergency: "",
        departemen: "",
        bidang: "",
        stts_wp: "",
        stts_kerja: "",
        pendidikan: "",
        indexins: "",
        kota: "",
        mulai_kerja: "",
        stts_aktif: "AKTIF",

        // Informasi finansial (opsional)
        npwp: "",
        gapok: "",
        bpd: "",
        rekening: "",
    });

    // Opsi referensi untuk SearchableSelect
    const options = useMemo(() => {
        const indexins = departemenOptions; // gunakan daftar departemen yang sama
        return { jnjJabatan: jenjangJabatanOptions, kelompokJabatan: kelompokJabatanOptions, resikoKerja: resikoKerjaOptions, departemen: departemenOptions, indexins, bidang: bidangOptions, sttsWp: sttsWpOptions, sttsKerja: sttsKerjaOptions, pendidikan: pendidikanOptions, bank: bankOptions, emergencyIndex: emergencyIndexOptions };
    }, [refs, jenjangJabatanOptions, departemenOptions, bidangOptions, pendidikanOptions, resikoKerjaOptions, kelompokJabatanOptions, emergencyIndexOptions, bankOptions, sttsWpOptions, sttsKerjaOptions]);

	const handleSubmit = (e) => {
		e.preventDefault();
		post(route("employees.store"), {
			forceFormData: true,
		});
	};

	// Form untuk tambah Jenjang Jabatan
	const jenjangJabatanForm = useForm({
		kode: "",
		nama: "",
		tnj: "",
		indek: "",
	});

	// Form untuk tambah Departemen
	const departemenForm = useForm({
		dep_id: "",
		nama: "",
	});

	// Form untuk tambah Bidang
	const bidangForm = useForm({
		nama: "",
	});

	// Form untuk tambah Pendidikan
	const pendidikanForm = useForm({
		tingkat: "",
		indek: "",
		gapok1: "",
		kenaikan: "",
		maksimal: "",
	});

	// Form untuk tambah Resiko Kerja
	const resikoKerjaForm = useForm({
		kode_resiko: "",
		nama_resiko: "",
		indek: "",
	});

	// Form untuk tambah Kelompok Jabatan
	const kelompokJabatanForm = useForm({
		kode_kelompok: "",
		nama_kelompok: "",
		indek: "",
	});

	// Form untuk tambah Emergency Index
	const emergencyIndexForm = useForm({
		kode_emergency: "",
		nama_emergency: "",
		indek: "",
	});

	// Form untuk tambah Bank
	const bankForm = useForm({
		namabank: "",
	});

	// Form untuk tambah Status WP
	const sttsWpForm = useForm({
		stts: "",
		ktg: "",
	});

	// Form untuk tambah Status Kerja
	const sttsKerjaForm = useForm({
		stts: "",
		ktg: "",
		indek: "",
		hakcuti: "",
	});

	const handleTambahSttsKerja = (e) => {
		e.preventDefault();
		sttsKerjaForm.post(route("stts-kerja.store"), {
			preserveScroll: true,
			preserveState: true,
			onSuccess: (page) => {
				// Cek apakah ada data status kerja yang baru dibuat dari flash message
				const createdData = page.props.flash?.sttsKerjaCreated;
				if (createdData) {
					const newStts = createdData.stts;
					if (newStts) {
						setData("stts_kerja", newStts);
						// Tambahkan ke options secara langsung
						const newOption = {
							value: newStts,
							label: `${newStts}${sttsKerjaForm.data.ktg ? ` - ${sttsKerjaForm.data.ktg}` : ""}`,
						};
						setSttsKerjaOptions((prev) => {
							// Cek apakah sudah ada, jika belum tambahkan
							const exists = prev.find((opt) => opt.value === newStts);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				} else {
					// Fallback: gunakan data dari form
					const newStts = sttsKerjaForm.data.stts;
					if (newStts) {
						setData("stts_kerja", newStts);
						const newOption = {
							value: newStts,
							label: `${newStts}${sttsKerjaForm.data.ktg ? ` - ${sttsKerjaForm.data.ktg}` : ""}`,
						};
						setSttsKerjaOptions((prev) => {
							const exists = prev.find((opt) => opt.value === newStts);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				}
				// Tutup modal dan reset form
				setShowSttsKerjaModal(false);
				sttsKerjaForm.reset();
				// Reload refs untuk sinkronisasi dengan server
				router.reload({ only: ["refs"], preserveScroll: true, preserveState: true });
			},
			onError: () => {
				// Tetap buka modal jika ada error agar user bisa melihat error
				// Error akan otomatis ditampilkan oleh Inertia form
			},
		});
	};

	const handleTambahSttsWp = (e) => {
		e.preventDefault();
		sttsWpForm.post(route("stts-wp.store"), {
			preserveScroll: true,
			preserveState: true,
			onSuccess: (page) => {
				// Cek apakah ada data status WP yang baru dibuat dari flash message
				const createdData = page.props.flash?.sttsWpCreated;
				if (createdData) {
					const newStts = createdData.stts;
					if (newStts) {
						setData("stts_wp", newStts);
						// Tambahkan ke options secara langsung
						const newOption = {
							value: newStts,
							label: `${newStts}${sttsWpForm.data.ktg ? ` - ${sttsWpForm.data.ktg}` : ""}`,
						};
						setSttsWpOptions((prev) => {
							// Cek apakah sudah ada, jika belum tambahkan
							const exists = prev.find((opt) => opt.value === newStts);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				} else {
					// Fallback: gunakan data dari form
					const newStts = sttsWpForm.data.stts;
					if (newStts) {
						setData("stts_wp", newStts);
						const newOption = {
							value: newStts,
							label: `${newStts}${sttsWpForm.data.ktg ? ` - ${sttsWpForm.data.ktg}` : ""}`,
						};
						setSttsWpOptions((prev) => {
							const exists = prev.find((opt) => opt.value === newStts);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				}
				// Tutup modal dan reset form
				setShowSttsWpModal(false);
				sttsWpForm.reset();
				// Reload refs untuk sinkronisasi dengan server
				router.reload({ only: ["refs"], preserveScroll: true, preserveState: true });
			},
			onError: () => {
				// Tetap buka modal jika ada error agar user bisa melihat error
				// Error akan otomatis ditampilkan oleh Inertia form
			},
		});
	};

	const handleTambahBank = (e) => {
		e.preventDefault();
		bankForm.post(route("bank.store"), {
			preserveScroll: true,
			preserveState: true,
			onSuccess: (page) => {
				// Cek apakah ada data bank yang baru dibuat dari flash message
				const createdData = page.props.flash?.bankCreated;
				if (createdData) {
					const newNamabank = createdData.namabank;
					if (newNamabank) {
						setData("bpd", newNamabank);
						// Tambahkan ke options secara langsung
						const newOption = {
							value: newNamabank,
							label: newNamabank,
						};
						setBankOptions((prev) => {
							// Cek apakah sudah ada, jika belum tambahkan
							const exists = prev.find((opt) => opt.value === newNamabank);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				} else {
					// Fallback: gunakan data dari form
					const newNamabank = bankForm.data.namabank;
					if (newNamabank) {
						setData("bpd", newNamabank);
						const newOption = {
							value: newNamabank,
							label: newNamabank,
						};
						setBankOptions((prev) => {
							const exists = prev.find((opt) => opt.value === newNamabank);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				}
				// Tutup modal dan reset form
				setShowBankModal(false);
				bankForm.reset();
				// Reload refs untuk sinkronisasi dengan server
				router.reload({ only: ["refs"], preserveScroll: true, preserveState: true });
			},
			onError: () => {
				// Tetap buka modal jika ada error agar user bisa melihat error
				// Error akan otomatis ditampilkan oleh Inertia form
			},
		});
	};

	const handleTambahEmergencyIndex = (e) => {
		e.preventDefault();
		emergencyIndexForm.post(route("emergency-index.store"), {
			preserveScroll: true,
			preserveState: true,
			onSuccess: (page) => {
				// Cek apakah ada data emergency index yang baru dibuat dari flash message
				const createdData = page.props.flash?.emergencyIndexCreated;
				if (createdData) {
					const newKodeEmergency = createdData.kode_emergency;
					if (newKodeEmergency) {
						setData("kode_emergency", newKodeEmergency);
						// Tambahkan ke options secara langsung
						const newOption = {
							value: newKodeEmergency,
							label: `${newKodeEmergency} - ${emergencyIndexForm.data.nama_emergency}`,
						};
						setEmergencyIndexOptions((prev) => {
							// Cek apakah sudah ada, jika belum tambahkan
							const exists = prev.find((opt) => opt.value === newKodeEmergency);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				} else {
					// Fallback: gunakan data dari form
					const newKodeEmergency = emergencyIndexForm.data.kode_emergency;
					if (newKodeEmergency) {
						setData("kode_emergency", newKodeEmergency);
						const newOption = {
							value: newKodeEmergency,
							label: `${newKodeEmergency} - ${emergencyIndexForm.data.nama_emergency}`,
						};
						setEmergencyIndexOptions((prev) => {
							const exists = prev.find((opt) => opt.value === newKodeEmergency);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				}
				// Tutup modal dan reset form
				setShowEmergencyIndexModal(false);
				emergencyIndexForm.reset();
				// Reload refs untuk sinkronisasi dengan server
				router.reload({ only: ["refs"], preserveScroll: true, preserveState: true });
			},
			onError: () => {
				// Tetap buka modal jika ada error agar user bisa melihat error
				// Error akan otomatis ditampilkan oleh Inertia form
			},
		});
	};

	const handleTambahKelompokJabatan = (e) => {
		e.preventDefault();
		kelompokJabatanForm.post(route("kelompok-jabatan.store"), {
			preserveScroll: true,
			preserveState: true,
			onSuccess: (page) => {
				// Cek apakah ada data kelompok jabatan yang baru dibuat dari flash message
				const createdData = page.props.flash?.kelompokJabatanCreated;
				if (createdData) {
					const newKodeKelompok = createdData.kode_kelompok;
					if (newKodeKelompok) {
						setData("kode_kelompok", newKodeKelompok);
						// Tambahkan ke options secara langsung
						const newOption = {
							value: newKodeKelompok,
							label: `${newKodeKelompok} - ${kelompokJabatanForm.data.nama_kelompok}`,
						};
						setKelompokJabatanOptions((prev) => {
							// Cek apakah sudah ada, jika belum tambahkan
							const exists = prev.find((opt) => opt.value === newKodeKelompok);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				} else {
					// Fallback: gunakan data dari form
					const newKodeKelompok = kelompokJabatanForm.data.kode_kelompok;
					if (newKodeKelompok) {
						setData("kode_kelompok", newKodeKelompok);
						const newOption = {
							value: newKodeKelompok,
							label: `${newKodeKelompok} - ${kelompokJabatanForm.data.nama_kelompok}`,
						};
						setKelompokJabatanOptions((prev) => {
							const exists = prev.find((opt) => opt.value === newKodeKelompok);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				}
				// Tutup modal dan reset form
				setShowKelompokJabatanModal(false);
				kelompokJabatanForm.reset();
				// Reload refs untuk sinkronisasi dengan server
				router.reload({ only: ["refs"], preserveScroll: true, preserveState: true });
			},
			onError: () => {
				// Tetap buka modal jika ada error agar user bisa melihat error
				// Error akan otomatis ditampilkan oleh Inertia form
			},
		});
	};

	const handleTambahResikoKerja = (e) => {
		e.preventDefault();
		resikoKerjaForm.post(route("resiko-kerja.store"), {
			preserveScroll: true,
			preserveState: true,
			onSuccess: (page) => {
				// Cek apakah ada data resiko kerja yang baru dibuat dari flash message
				const createdData = page.props.flash?.resikoKerjaCreated;
				if (createdData) {
					const newKodeResiko = createdData.kode_resiko;
					if (newKodeResiko) {
						setData("kode_resiko", newKodeResiko);
						// Tambahkan ke options secara langsung
						const newOption = {
							value: newKodeResiko,
							label: `${newKodeResiko} - ${resikoKerjaForm.data.nama_resiko}`,
						};
						setResikoKerjaOptions((prev) => {
							// Cek apakah sudah ada, jika belum tambahkan
							const exists = prev.find((opt) => opt.value === newKodeResiko);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				} else {
					// Fallback: gunakan data dari form
					const newKodeResiko = resikoKerjaForm.data.kode_resiko;
					if (newKodeResiko) {
						setData("kode_resiko", newKodeResiko);
						const newOption = {
							value: newKodeResiko,
							label: `${newKodeResiko} - ${resikoKerjaForm.data.nama_resiko}`,
						};
						setResikoKerjaOptions((prev) => {
							const exists = prev.find((opt) => opt.value === newKodeResiko);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				}
				// Tutup modal dan reset form
				setShowResikoKerjaModal(false);
				resikoKerjaForm.reset();
				// Reload refs untuk sinkronisasi dengan server
				router.reload({ only: ["refs"], preserveScroll: true, preserveState: true });
			},
			onError: () => {
				// Tetap buka modal jika ada error agar user bisa melihat error
				// Error akan otomatis ditampilkan oleh Inertia form
			},
		});
	};

	const handleTambahPendidikan = (e) => {
		e.preventDefault();
		pendidikanForm.post(route("pendidikan.store"), {
			preserveScroll: true,
			preserveState: true,
			onSuccess: (page) => {
				// Cek apakah ada data pendidikan yang baru dibuat dari flash message
				const createdData = page.props.flash?.pendidikanCreated;
				if (createdData) {
					const newTingkat = createdData.tingkat;
					if (newTingkat) {
						setData("pendidikan", newTingkat);
						// Tambahkan ke options secara langsung
						const newOption = {
							value: newTingkat,
							label: newTingkat,
						};
						setPendidikanOptions((prev) => {
							// Cek apakah sudah ada, jika belum tambahkan
							const exists = prev.find((opt) => opt.value === newTingkat);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				} else {
					// Fallback: gunakan data dari form
					const newTingkat = pendidikanForm.data.tingkat;
					if (newTingkat) {
						setData("pendidikan", newTingkat);
						const newOption = {
							value: newTingkat,
							label: newTingkat,
						};
						setPendidikanOptions((prev) => {
							const exists = prev.find((opt) => opt.value === newTingkat);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				}
				// Tutup modal dan reset form
				setShowPendidikanModal(false);
				pendidikanForm.reset();
				// Reload refs untuk sinkronisasi dengan server
				router.reload({ only: ["refs"], preserveScroll: true, preserveState: true });
			},
			onError: () => {
				// Tetap buka modal jika ada error agar user bisa melihat error
				// Error akan otomatis ditampilkan oleh Inertia form
			},
		});
	};

	const handleTambahBidang = (e) => {
		e.preventDefault();
		bidangForm.post(route("bidang.store"), {
			preserveScroll: true,
			preserveState: true,
			onSuccess: (page) => {
				// Cek apakah ada data bidang yang baru dibuat dari flash message
				const createdData = page.props.flash?.bidangCreated;
				if (createdData) {
					const newNama = createdData.nama;
					if (newNama) {
						setData("bidang", newNama);
						// Tambahkan ke options secara langsung
						const newOption = {
							value: newNama,
							label: newNama,
						};
						setBidangOptions((prev) => {
							// Cek apakah sudah ada, jika belum tambahkan
							const exists = prev.find((opt) => opt.value === newNama);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				} else {
					// Fallback: gunakan data dari form
					const newNama = bidangForm.data.nama;
					if (newNama) {
						setData("bidang", newNama);
						const newOption = {
							value: newNama,
							label: newNama,
						};
						setBidangOptions((prev) => {
							const exists = prev.find((opt) => opt.value === newNama);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				}
				// Tutup modal dan reset form
				setShowBidangModal(false);
				bidangForm.reset();
				// Reload refs untuk sinkronisasi dengan server
				router.reload({ only: ["refs"], preserveScroll: true, preserveState: true });
			},
			onError: () => {
				// Tetap buka modal jika ada error agar user bisa melihat error
				// Error akan otomatis ditampilkan oleh Inertia form
			},
		});
	};

	const handleTambahDepartemen = (e) => {
		e.preventDefault();
		departemenForm.post(route("departemen.store"), {
			preserveScroll: true,
			preserveState: true,
			onSuccess: (page) => {
				// Cek apakah ada data departemen yang baru dibuat dari flash message
				const createdData = page.props.flash?.departemenCreated;
				if (createdData) {
					const newDepId = createdData.dep_id;
					const newNama = createdData.nama;
					if (newDepId) {
						setData("departemen", newDepId);
						// Tambahkan ke options secara langsung
						const newOption = {
							value: newDepId,
							label: `${newDepId} - ${newNama}`,
						};
						setDepartemenOptions((prev) => {
							// Cek apakah sudah ada, jika belum tambahkan
							const exists = prev.find((opt) => opt.value === newDepId);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				} else {
					// Fallback: gunakan data dari form
					const newDepId = departemenForm.data.dep_id;
					if (newDepId) {
						setData("departemen", newDepId);
						const newOption = {
							value: newDepId,
							label: `${newDepId} - ${departemenForm.data.nama}`,
						};
						setDepartemenOptions((prev) => {
							const exists = prev.find((opt) => opt.value === newDepId);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				}
				// Tutup modal dan reset form
				setShowDepartemenModal(false);
				departemenForm.reset();
				// Reload refs untuk sinkronisasi dengan server
				router.reload({ only: ["refs"], preserveScroll: true, preserveState: true });
			},
			onError: () => {
				// Tetap buka modal jika ada error agar user bisa melihat error
				// Error akan otomatis ditampilkan oleh Inertia form
			},
		});
	};

	const handleTambahJenjangJabatan = (e) => {
		e.preventDefault();
		jenjangJabatanForm.post(route("jenjang-jabatan.store"), {
			preserveScroll: true,
			preserveState: true,
			onSuccess: (page) => {
				// Cek apakah ada data jenjang jabatan yang baru dibuat dari flash message
				const createdData = page.props.flash?.jenjangJabatanCreated;
				if (createdData) {
					const newKode = createdData.kode;
					const newNama = createdData.nama;
					if (newKode) {
						setData("jnj_jabatan", newKode);
						// Tambahkan ke options secara langsung
						const newOption = {
							value: newKode,
							label: `${newKode} - ${newNama}`,
						};
						setJenjangJabatanOptions((prev) => {
							// Cek apakah sudah ada, jika belum tambahkan
							const exists = prev.find((opt) => opt.value === newKode);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				} else {
					// Fallback: gunakan data dari form
					const newKode = jenjangJabatanForm.data.kode;
					if (newKode) {
						setData("jnj_jabatan", newKode);
						const newOption = {
							value: newKode,
							label: `${newKode} - ${jenjangJabatanForm.data.nama}`,
						};
						setJenjangJabatanOptions((prev) => {
							const exists = prev.find((opt) => opt.value === newKode);
							if (!exists) {
								return [...prev, newOption];
							}
							return prev;
						});
					}
				}
				// Tutup modal dan reset form
				setShowJenjangJabatanModal(false);
				jenjangJabatanForm.reset();
				// Reload refs untuk sinkronisasi dengan server
				router.reload({ only: ["refs"], preserveScroll: true, preserveState: true });
			},
			onError: () => {
				// Tetap buka modal jika ada error agar user bisa melihat error
				// Error akan otomatis ditampilkan oleh Inertia form
			},
		});
	};

	return (
		<SidebarPengaturan title="Kepegawaian">
			<Head title="Tambah Pegawai Baru" />

			<div className="py-6">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl mb-6">
                        <div className="p-6">
							<div className="flex justify-between items-center">
								<div>
									<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
										Tambah Pegawai Baru
									</h2>
									<p className="text-gray-600 dark:text-gray-400 mt-1">
										Masukkan data pegawai baru ke dalam sistem
									</p>
								</div>
                                <Link
                                    href={route("employees.index")}
                                    className="px-4 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors"
                                >
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path
											fillRule="evenodd"
											d="M7.72 12.53a.75.75 0 010-1.06L10.94 8.25H3a.75.75 0 010-1.5h7.94L7.72 3.53a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06 0z"
											clipRule="evenodd"
										/>
									</svg>
									Kembali
								</Link>
                        </div>
                    </div>
                </div>

                {/* Informasi Kepegawaian (Opsional) */}
                <div className="bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Informasi Kepegawaian (Opsional)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Jabatan
                                </label>
                                <input
                                    type="text"
                                    value={data.jbtn}
                                    onChange={(e) => setData("jbtn", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Masukkan jabatan"
                                />
                                {errors.jbtn && (
                                    <p className="mt-1 text-sm text-red-600">{errors.jbtn}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jenjang Jabatan</label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <SearchableSelect
                                            options={options.jnjJabatan}
                                            value={data.jnj_jabatan}
                                            onChange={(v) => setData("jnj_jabatan", v)}
                                            placeholder="Pilih jenjang jabatan"
                                            searchPlaceholder="Cari kode/nama jenjang jabatan"
                                            error={!!errors.jnj_jabatan}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowJenjangJabatanModal(true)}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                        title="Tambah Jenjang Jabatan Baru"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {errors.jnj_jabatan && (<p className="mt-1 text-sm text-red-600">{errors.jnj_jabatan}</p>)}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Departemen</label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <SearchableSelect
                                            options={options.departemen}
                                            value={data.departemen}
                                            onChange={(v) => setData("departemen", v)}
                                            placeholder="Pilih departemen"
                                            searchPlaceholder="Cari kode/nama departemen"
                                            error={!!errors.departemen}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowDepartemenModal(true)}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                        title="Tambah Departemen Baru"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {errors.departemen && (<p className="mt-1 text-sm text-red-600">{errors.departemen}</p>)}
                            </div>

                            {can("bidang.view") && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bidang</label>
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <SearchableSelect
                                                options={options.bidang}
                                                value={data.bidang}
                                                onChange={(v) => setData("bidang", v)}
                                                placeholder="Pilih bidang"
                                                searchPlaceholder="Cari nama bidang"
                                                error={!!errors.bidang}
                                            />
                                        </div>
                                        {can("bidang.create") && (
                                            <button
                                                type="button"
                                                onClick={() => setShowBidangModal(true)}
                                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                                title="Tambah Bidang Baru"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    {errors.bidang && (<p className="mt-1 text-sm text-red-600">{errors.bidang}</p>)}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status WP</label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <SearchableSelect
                                            options={options.sttsWp}
                                            value={data.stts_wp}
                                            onChange={(v) => setData("stts_wp", v)}
                                            placeholder="Pilih status WP"
                                            searchPlaceholder="Cari status WP"
                                            error={!!errors.stts_wp}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowSttsWpModal(true)}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                        title="Tambah Status WP Baru"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {errors.stts_wp && (<p className="mt-1 text-sm text-red-600">{errors.stts_wp}</p>)}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Kerja</label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <SearchableSelect
                                            options={options.sttsKerja}
                                            value={data.stts_kerja}
                                            onChange={(v) => setData("stts_kerja", v)}
                                            placeholder="Pilih status kerja"
                                            searchPlaceholder="Cari status kerja"
                                            error={!!errors.stts_kerja}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowSttsKerjaModal(true)}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                        title="Tambah Status Kerja Baru"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {errors.stts_kerja && (<p className="mt-1 text-sm text-red-600">{errors.stts_kerja}</p>)}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pendidikan</label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <SearchableSelect
                                            options={options.pendidikan}
                                            value={data.pendidikan}
                                            onChange={(v) => setData("pendidikan", v)}
                                            placeholder="Pilih pendidikan"
                                            searchPlaceholder="Cari tingkat pendidikan"
                                            error={!!errors.pendidikan}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowPendidikanModal(true)}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                        title="Tambah Pendidikan Baru"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {errors.pendidikan && (<p className="mt-1 text-sm text-red-600">{errors.pendidikan}</p>)}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kelompok Jabatan</label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <SearchableSelect
                                            options={options.kelompokJabatan}
                                            value={data.kode_kelompok}
                                            onChange={(v) => setData("kode_kelompok", v)}
                                            placeholder="Pilih kelompok jabatan"
                                            searchPlaceholder="Cari kode/nama kelompok"
                                            error={!!errors.kode_kelompok}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowKelompokJabatanModal(true)}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                        title="Tambah Kelompok Jabatan Baru"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {errors.kode_kelompok && (<p className="mt-1 text-sm text-red-600">{errors.kode_kelompok}</p>)}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resiko Kerja</label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <SearchableSelect
                                            options={options.resikoKerja}
                                            value={data.kode_resiko}
                                            onChange={(v) => setData("kode_resiko", v)}
                                            placeholder="Pilih resiko kerja"
                                            searchPlaceholder="Cari kode/nama resiko"
                                            error={!!errors.kode_resiko}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowResikoKerjaModal(true)}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                        title="Tambah Resiko Kerja Baru"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {errors.kode_resiko && (<p className="mt-1 text-sm text-red-600">{errors.kode_resiko}</p>)}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emergency Index</label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <SearchableSelect
                                            options={options.emergencyIndex}
                                            value={data.kode_emergency}
                                            onChange={(v) => setData("kode_emergency", v)}
                                            placeholder="Pilih emergency index"
                                            searchPlaceholder="Cari kode/nama emergency"
                                            error={!!errors.kode_emergency}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowEmergencyIndexModal(true)}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                        title="Tambah Emergency Index Baru"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {errors.kode_emergency && (<p className="mt-1 text-sm text-red-600">{errors.kode_emergency}</p>)}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Indexins (Departemen)</label>
                                <SearchableSelect
                                    options={options.indexins}
                                    value={data.indexins}
                                    onChange={(v) => setData("indexins", v)}
                                    placeholder="Pilih indexins"
                                    searchPlaceholder="Cari kode/nama departemen"
                                    error={!!errors.indexins}
                                />
                                {errors.indexins && (<p className="mt-1 text-sm text-red-600">{errors.indexins}</p>)}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Kota
                                </label>
                                <input
                                    type="text"
                                    value={data.kota}
                                    onChange={(e) => setData("kota", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Masukkan kota"
                                />
                                {errors.kota && (
                                    <p className="mt-1 text-sm text-red-600">{errors.kota}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tanggal Mulai Kerja
                                </label>
                                <input
                                    type="date"
                                    value={data.mulai_kerja}
                                    onChange={(e) => setData("mulai_kerja", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                />
                                {errors.mulai_kerja && (
                                    <p className="mt-1 text-sm text-red-600">{errors.mulai_kerja}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Aktif</label>
                                <select
                                    value={data.stts_aktif}
                                    onChange={(e) => setData("stts_aktif", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="AKTIF">AKTIF</option>
                                    <option value="CUTI">CUTI</option>
                                    <option value="KELUAR">KELUAR</option>
                                    <option value="TENAGA LUAR">TENAGA LUAR</option>
                                    <option value="NON AKTIF">NON AKTIF</option>
                                </select>
                                {errors.stts_aktif && (<p className="mt-1 text-sm text-red-600">{errors.stts_aktif}</p>)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Informasi Finansial (Opsional) */}
                <div className="bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Informasi Finansial (Opsional)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    NPWP
                                </label>
                                <input
                                    type="text"
                                    value={data.npwp}
                                    onChange={(e) => setData("npwp", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Masukkan NPWP"
                                />
                                {errors.npwp && (
                                    <p className="mt-1 text-sm text-red-600">{errors.npwp}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Gaji Pokok (Gapok)
                                </label>
                                <input
                                    type="number"
                                    value={data.gapok}
                                    onChange={(e) => setData("gapok", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Masukkan gaji pokok"
                                />
                                {errors.gapok && (
                                    <p className="mt-1 text-sm text-red-600">{errors.gapok}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bank (BPD)</label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <SearchableSelect
                                            options={options.bank}
                                            value={data.bpd}
                                            onChange={(v) => setData("bpd", v)}
                                            placeholder="Pilih bank"
                                            searchPlaceholder="Cari nama bank"
                                            error={!!errors.bpd}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowBankModal(true)}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                        title="Tambah Bank Baru"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {errors.bpd && (<p className="mt-1 text-sm text-red-600">{errors.bpd}</p>)}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    No. Rekening
                                </label>
                                <input
                                    type="text"
                                    value={data.rekening}
                                    onChange={(e) => setData("rekening", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Masukkan nomor rekening"
                                />
                                {errors.rekening && (
                                    <p className="mt-1 text-sm text-red-600">{errors.rekening}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informasi Dasar
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            NIK *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nik}
                                            onChange={(e) => setData("nik", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Masukkan NIK"
                                        />
										{errors.nik && (
											<p className="mt-1 text-sm text-red-600">{errors.nik}</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											No. KTP *
										</label>
                                        <input
                                            type="text"
                                            value={data.no_ktp}
                                            onChange={(e) => setData("no_ktp", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Masukkan No. KTP (16-20 digit)"
                                            maxLength="20"
                                        />
										{errors.no_ktp && (
											<p className="mt-1 text-sm text-red-600">
												{errors.no_ktp}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Nama *
										</label>
                                        <input
                                            type="text"
                                            value={data.nama}
                                            onChange={(e) => setData("nama", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Masukkan nama lengkap"
                                        />
										{errors.nama && (
											<p className="mt-1 text-sm text-red-600">{errors.nama}</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Jenis Kelamin *
										</label>
                                        <select
                                            value={data.jk}
                                            onChange={(e) => setData("jk", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                        >
                                            <option value="Pria">Pria</option>
                                            <option value="Wanita">Wanita</option>
                                        </select>
										{errors.jk && (
											<p className="mt-1 text-sm text-red-600">{errors.jk}</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Tempat Lahir *
										</label>
                                        <input
                                            type="text"
                                            value={data.tmp_lahir}
                                            onChange={(e) => setData("tmp_lahir", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Masukkan tempat lahir"
                                        />
										{errors.tmp_lahir && (
											<p className="mt-1 text-sm text-red-600">
												{errors.tmp_lahir}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Tanggal Lahir *
										</label>
                                        <input
                                            type="date"
                                            value={data.tgl_lahir}
                                            onChange={(e) => setData("tgl_lahir", e.target.value)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                        />
										{errors.tgl_lahir && (
											<p className="mt-1 text-sm text-red-600">
												{errors.tgl_lahir}
											</p>
										)}
									</div>

									<div className="md:col-span-2">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Alamat *
										</label>
                                        <textarea
                                            value={data.alamat}
                                            onChange={(e) => setData("alamat", e.target.value)}
                                            rows={3}
                                            className="w-full min-h-[110px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                            placeholder="Masukkan alamat lengkap"
                                        />
										{errors.alamat && (
											<p className="mt-1 text-sm text-red-600">
												{errors.alamat}
											</p>
										)}
									</div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
						{/* <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Kontak
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											No. Telepon
										</label>
										<input
											type="text"
											value={data.no_telepon}
											onChange={(e) => setData("no_telepon", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nomor telepon"
										/>
										{errors.no_telepon && (
											<p className="mt-1 text-sm text-red-600">
												{errors.no_telepon}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Email
										</label>
										<input
											type="email"
											value={data.email}
											onChange={(e) => setData("email", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan email"
										/>
										{errors.email && (
											<p className="mt-1 text-sm text-red-600">
												{errors.email}
											</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* Foto Pegawai (Opsional) */}
                        <div className="bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Foto Pegawai (Opsional)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Unggah Foto
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setData("photo", e.target.files?.[0] ?? null)}
                                            className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
                                        />
										{errors.photo && (
											<p className="mt-1 text-sm text-red-600">{errors.photo}</p>
										)}
										{data.photo && typeof data.photo === "object" && (
											<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">File terpilih: {data.photo.name}</p>
										)}
									</div>
								</div>
							</div>
						</div>

						{/* Employment Information */}
						{/* <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Kepegawaian
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Jabatan *
										</label>
										<input
											type="text"
											value={data.jabatan}
											onChange={(e) => setData("jabatan", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan jabatan"
										/>
										{errors.jabatan && (
											<p className="mt-1 text-sm text-red-600">
												{errors.jabatan}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Departemen *
										</label>
										<input
											type="text"
											value={data.departemen}
											onChange={(e) => setData("departemen", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan departemen"
										/>
										{errors.departemen && (
											<p className="mt-1 text-sm text-red-600">
												{errors.departemen}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Status Karyawan *
										</label>
										<select
											value={data.status_karyawan}
											onChange={(e) =>
												setData("status_karyawan", e.target.value)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="TETAP">Tetap</option>
											<option value="KONTRAK">Kontrak</option>
											<option value="MAGANG">Magang</option>
											<option value="HONORER">Honorer</option>
										</select>
										{errors.status_karyawan && (
											<p className="mt-1 text-sm text-red-600">
												{errors.status_karyawan}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Status Aktif *
										</label>
										<select
											value={data.status_aktif}
											onChange={(e) => setData("status_aktif", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="AKTIF">Aktif</option>
											<option value="NONAKTIF">Non Aktif</option>
											<option value="CUTI">Cuti</option>
											<option value="RESIGN">Resign</option>
										</select>
										{errors.status_aktif && (
											<p className="mt-1 text-sm text-red-600">
												{errors.status_aktif}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Tanggal Masuk *
										</label>
										<input
											type="date"
											value={data.tanggal_masuk}
											onChange={(e) => setData("tanggal_masuk", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										/>
										{errors.tanggal_masuk && (
											<p className="mt-1 text-sm text-red-600">
												{errors.tanggal_masuk}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Tanggal Keluar
										</label>
										<input
											type="date"
											value={data.tanggal_keluar}
											onChange={(e) =>
												setData("tanggal_keluar", e.target.value)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										/>
										{errors.tanggal_keluar && (
											<p className="mt-1 text-sm text-red-600">
												{errors.tanggal_keluar}
											</p>
										)}
									</div>
								</div>
							</div>
						</div> */}

						{/* Education Information */}
						{/* <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Pendidikan
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Pendidikan Terakhir *
										</label>
										<select
											value={data.pendidikan_terakhir}
											onChange={(e) =>
												setData("pendidikan_terakhir", e.target.value)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										>
											<option value="SMA">SMA</option>
											<option value="D3">D3</option>
											<option value="D4">D4</option>
											<option value="S1">S1</option>
											<option value="S2">S2</option>
											<option value="S3">S3</option>
										</select>
										{errors.pendidikan_terakhir && (
											<p className="mt-1 text-sm text-red-600">
												{errors.pendidikan_terakhir}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Universitas
										</label>
										<input
											type="text"
											value={data.universitas}
											onChange={(e) => setData("universitas", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nama universitas"
										/>
										{errors.universitas && (
											<p className="mt-1 text-sm text-red-600">
												{errors.universitas}
											</p>
										)}
									</div>
								</div>
							</div>
						</div> */}

						{/* Banking Information */}
						{/* <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Informasi Rekening
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											No. Rekening
										</label>
										<input
											type="text"
											value={data.no_rekening}
											onChange={(e) => setData("no_rekening", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nomor rekening"
										/>
										{errors.no_rekening && (
											<p className="mt-1 text-sm text-red-600">
												{errors.no_rekening}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Bank
										</label>
										<input
											type="text"
											value={data.bank}
											onChange={(e) => setData("bank", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nama bank"
										/>
										{errors.bank && (
											<p className="mt-1 text-sm text-red-600">{errors.bank}</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Nama Rekening
										</label>
										<input
											type="text"
											value={data.nama_rekening}
											onChange={(e) => setData("nama_rekening", e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan nama pemilik rekening"
										/>
										{errors.nama_rekening && (
											<p className="mt-1 text-sm text-red-600">
												{errors.nama_rekening}
											</p>
										)}
									</div>

									<div className="md:col-span-3">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Catatan
										</label>
										<textarea
											value={data.catatan}
											onChange={(e) => setData("catatan", e.target.value)}
											rows={3}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											placeholder="Masukkan catatan tambahan"
										/>
										{errors.catatan && (
											<p className="mt-1 text-sm text-red-600">
												{errors.catatan}
											</p>
										)}
									</div>
								</div>
							</div>
						</div> */}

                        {/* Submit Button */}
                        <div className="bg-white/95 dark:bg-gray-900/60 backdrop-blur-sm overflow-visible shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
                            <div className="p-6">
                                <div className="flex justify-end gap-4">
                                    <Link
                                        href={route("employees.index")}
                                        className="px-5 h-11 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors inline-flex items-center justify-center"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-indigo-400 disabled:to-blue-400 text-white px-6 h-11 rounded-lg transition-all shadow-sm flex items-center gap-2"
                                    >
										{processing && (
											<svg
												className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
										)}
										{processing ? "Menyimpan..." : "Simpan"}
									</button>
								</div>
							</div>
						</div>
					</form>

					{/* Modal Tambah Jenjang Jabatan */}
					{showJenjangJabatanModal && (
						<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
								<div className="p-6">
									<div className="flex justify-between items-center mb-4">
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
											Tambah Jenjang Jabatan Baru
										</h3>
										<button
											type="button"
											onClick={() => {
												setShowJenjangJabatanModal(false);
												jenjangJabatanForm.reset();
											}}
											className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="w-6 h-6"
											>
												<line x1="18" y1="6" x2="6" y2="18"></line>
												<line x1="6" y1="6" x2="18" y2="18"></line>
											</svg>
										</button>
									</div>

									<form onSubmit={handleTambahJenjangJabatan} className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Kode *
											</label>
											<input
												type="text"
												value={jenjangJabatanForm.data.kode}
												onChange={(e) => jenjangJabatanForm.setData("kode", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan kode"
												maxLength="10"
												required
											/>
											{jenjangJabatanForm.errors.kode && (
												<p className="mt-1 text-sm text-red-600">{jenjangJabatanForm.errors.kode}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Nama *
											</label>
											<input
												type="text"
												value={jenjangJabatanForm.data.nama}
												onChange={(e) => jenjangJabatanForm.setData("nama", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan nama jenjang jabatan"
												maxLength="50"
												required
											/>
											{jenjangJabatanForm.errors.nama && (
												<p className="mt-1 text-sm text-red-600">{jenjangJabatanForm.errors.nama}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Tunjangan *
											</label>
											<input
												type="number"
												step="0.01"
												value={jenjangJabatanForm.data.tnj}
												onChange={(e) => jenjangJabatanForm.setData("tnj", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan tunjangan"
												required
											/>
											{jenjangJabatanForm.errors.tnj && (
												<p className="mt-1 text-sm text-red-600">{jenjangJabatanForm.errors.tnj}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Indek
											</label>
											<input
												type="number"
												value={jenjangJabatanForm.data.indek}
												onChange={(e) => jenjangJabatanForm.setData("indek", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan indek (opsional)"
											/>
											{jenjangJabatanForm.errors.indek && (
												<p className="mt-1 text-sm text-red-600">{jenjangJabatanForm.errors.indek}</p>
											)}
										</div>

										<div className="flex justify-end gap-3 pt-4">
											<button
												type="button"
												onClick={() => {
													setShowJenjangJabatanModal(false);
													jenjangJabatanForm.reset();
												}}
												className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
											>
												Batal
											</button>
											<button
												type="submit"
												disabled={jenjangJabatanForm.processing}
												className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
											>
												{jenjangJabatanForm.processing ? "Menyimpan..." : "Simpan"}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					)}

					{/* Modal Tambah Departemen */}
					{showDepartemenModal && (
						<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
								<div className="p-6">
									<div className="flex justify-between items-center mb-4">
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
											Tambah Departemen Baru
										</h3>
										<button
											type="button"
											onClick={() => {
												setShowDepartemenModal(false);
												departemenForm.reset();
											}}
											className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="w-6 h-6"
											>
												<line x1="18" y1="6" x2="6" y2="18"></line>
												<line x1="6" y1="6" x2="18" y2="18"></line>
											</svg>
										</button>
									</div>

									<form onSubmit={handleTambahDepartemen} className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Kode Departemen *
											</label>
											<input
												type="text"
												value={departemenForm.data.dep_id}
												onChange={(e) => departemenForm.setData("dep_id", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan kode departemen"
												maxLength="4"
												required
											/>
											{departemenForm.errors.dep_id && (
												<p className="mt-1 text-sm text-red-600">{departemenForm.errors.dep_id}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Nama Departemen *
											</label>
											<input
												type="text"
												value={departemenForm.data.nama}
												onChange={(e) => departemenForm.setData("nama", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan nama departemen"
												maxLength="25"
												required
											/>
											{departemenForm.errors.nama && (
												<p className="mt-1 text-sm text-red-600">{departemenForm.errors.nama}</p>
											)}
										</div>

										<div className="flex justify-end gap-3 pt-4">
											<button
												type="button"
												onClick={() => {
													setShowDepartemenModal(false);
													departemenForm.reset();
												}}
												className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
											>
												Batal
											</button>
											<button
												type="submit"
												disabled={departemenForm.processing}
												className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
											>
												{departemenForm.processing ? "Menyimpan..." : "Simpan"}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					)}

					{/* Modal Tambah Bidang */}
                    {showBidangModal && can("bidang.create") && (
						<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
								<div className="p-6">
									<div className="flex justify-between items-center mb-4">
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
											Tambah Bidang Baru
										</h3>
										<button
											type="button"
											onClick={() => {
												setShowBidangModal(false);
												bidangForm.reset();
											}}
											className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="w-6 h-6"
											>
												<line x1="18" y1="6" x2="6" y2="18"></line>
												<line x1="6" y1="6" x2="18" y2="18"></line>
											</svg>
										</button>
									</div>

									<form onSubmit={handleTambahBidang} className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Nama Bidang *
											</label>
											<input
												type="text"
												value={bidangForm.data.nama}
												onChange={(e) => bidangForm.setData("nama", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan nama bidang"
												maxLength="15"
												required
											/>
											{bidangForm.errors.nama && (
												<p className="mt-1 text-sm text-red-600">{bidangForm.errors.nama}</p>
											)}
										</div>

										<div className="flex justify-end gap-3 pt-4">
											<button
												type="button"
												onClick={() => {
													setShowBidangModal(false);
													bidangForm.reset();
												}}
												className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
											>
												Batal
											</button>
											<button
												type="submit"
												disabled={bidangForm.processing}
												className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
											>
												{bidangForm.processing ? "Menyimpan..." : "Simpan"}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					)}

					{/* Modal Tambah Pendidikan */}
					{showPendidikanModal && (
						<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
								<div className="p-6">
									<div className="flex justify-between items-center mb-4">
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
											Tambah Pendidikan Baru
										</h3>
										<button
											type="button"
											onClick={() => {
												setShowPendidikanModal(false);
												pendidikanForm.reset();
											}}
											className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="w-6 h-6"
											>
												<line x1="18" y1="6" x2="6" y2="18"></line>
												<line x1="6" y1="6" x2="18" y2="18"></line>
											</svg>
										</button>
									</div>

									<form onSubmit={handleTambahPendidikan} className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Tingkat Pendidikan *
											</label>
											<input
												type="text"
												value={pendidikanForm.data.tingkat}
												onChange={(e) => pendidikanForm.setData("tingkat", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan tingkat pendidikan (contoh: S1, S2, D3, dll)"
												maxLength="80"
												required
											/>
											{pendidikanForm.errors.tingkat && (
												<p className="mt-1 text-sm text-red-600">{pendidikanForm.errors.tingkat}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Indek
											</label>
											<input
												type="number"
												value={pendidikanForm.data.indek}
												onChange={(e) => pendidikanForm.setData("indek", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan indek (opsional)"
											/>
											{pendidikanForm.errors.indek && (
												<p className="mt-1 text-sm text-red-600">{pendidikanForm.errors.indek}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Gaji Pokok 1
											</label>
											<input
												type="number"
												step="0.01"
												value={pendidikanForm.data.gapok1}
												onChange={(e) => pendidikanForm.setData("gapok1", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan gaji pokok 1 (opsional)"
											/>
											{pendidikanForm.errors.gapok1 && (
												<p className="mt-1 text-sm text-red-600">{pendidikanForm.errors.gapok1}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Kenaikan
											</label>
											<input
												type="number"
												step="0.01"
												value={pendidikanForm.data.kenaikan}
												onChange={(e) => pendidikanForm.setData("kenaikan", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan kenaikan (opsional)"
											/>
											{pendidikanForm.errors.kenaikan && (
												<p className="mt-1 text-sm text-red-600">{pendidikanForm.errors.kenaikan}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Maksimal
											</label>
											<input
												type="number"
												value={pendidikanForm.data.maksimal}
												onChange={(e) => pendidikanForm.setData("maksimal", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan maksimal (opsional)"
											/>
											{pendidikanForm.errors.maksimal && (
												<p className="mt-1 text-sm text-red-600">{pendidikanForm.errors.maksimal}</p>
											)}
										</div>

										<div className="flex justify-end gap-3 pt-4">
											<button
												type="button"
												onClick={() => {
													setShowPendidikanModal(false);
													pendidikanForm.reset();
												}}
												className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
											>
												Batal
											</button>
											<button
												type="submit"
												disabled={pendidikanForm.processing}
												className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
											>
												{pendidikanForm.processing ? "Menyimpan..." : "Simpan"}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					)}

					{/* Modal Tambah Resiko Kerja */}
					{showResikoKerjaModal && (
						<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
								<div className="p-6">
									<div className="flex justify-between items-center mb-4">
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
											Tambah Resiko Kerja Baru
										</h3>
										<button
											type="button"
											onClick={() => {
												setShowResikoKerjaModal(false);
												resikoKerjaForm.reset();
											}}
											className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="w-6 h-6"
											>
												<line x1="18" y1="6" x2="6" y2="18"></line>
												<line x1="6" y1="6" x2="18" y2="18"></line>
											</svg>
										</button>
									</div>

									<form onSubmit={handleTambahResikoKerja} className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Kode Resiko *
											</label>
											<input
												type="text"
												value={resikoKerjaForm.data.kode_resiko}
												onChange={(e) => resikoKerjaForm.setData("kode_resiko", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan kode resiko (maksimal 3 karakter)"
												maxLength="3"
												required
											/>
											{resikoKerjaForm.errors.kode_resiko && (
												<p className="mt-1 text-sm text-red-600">{resikoKerjaForm.errors.kode_resiko}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Nama Resiko *
											</label>
											<input
												type="text"
												value={resikoKerjaForm.data.nama_resiko}
												onChange={(e) => resikoKerjaForm.setData("nama_resiko", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan nama resiko"
												maxLength="100"
												required
											/>
											{resikoKerjaForm.errors.nama_resiko && (
												<p className="mt-1 text-sm text-red-600">{resikoKerjaForm.errors.nama_resiko}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Indek
											</label>
											<input
												type="number"
												value={resikoKerjaForm.data.indek}
												onChange={(e) => resikoKerjaForm.setData("indek", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan indek (opsional)"
											/>
											{resikoKerjaForm.errors.indek && (
												<p className="mt-1 text-sm text-red-600">{resikoKerjaForm.errors.indek}</p>
											)}
										</div>

										<div className="flex justify-end gap-3 pt-4">
											<button
												type="button"
												onClick={() => {
													setShowResikoKerjaModal(false);
													resikoKerjaForm.reset();
												}}
												className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
											>
												Batal
											</button>
											<button
												type="submit"
												disabled={resikoKerjaForm.processing}
												className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
											>
												{resikoKerjaForm.processing ? "Menyimpan..." : "Simpan"}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					)}

					{/* Modal Tambah Kelompok Jabatan */}
					{showKelompokJabatanModal && (
						<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
								<div className="p-6">
									<div className="flex justify-between items-center mb-4">
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
											Tambah Kelompok Jabatan Baru
										</h3>
										<button
											type="button"
											onClick={() => {
												setShowKelompokJabatanModal(false);
												kelompokJabatanForm.reset();
											}}
											className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="w-6 h-6"
											>
												<line x1="18" y1="6" x2="6" y2="18"></line>
												<line x1="6" y1="6" x2="18" y2="18"></line>
											</svg>
										</button>
									</div>

									<form onSubmit={handleTambahKelompokJabatan} className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Kode Kelompok *
											</label>
											<input
												type="text"
												value={kelompokJabatanForm.data.kode_kelompok}
												onChange={(e) => kelompokJabatanForm.setData("kode_kelompok", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan kode kelompok (maksimal 3 karakter)"
												maxLength="3"
												required
											/>
											{kelompokJabatanForm.errors.kode_kelompok && (
												<p className="mt-1 text-sm text-red-600">{kelompokJabatanForm.errors.kode_kelompok}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Nama Kelompok *
											</label>
											<input
												type="text"
												value={kelompokJabatanForm.data.nama_kelompok}
												onChange={(e) => kelompokJabatanForm.setData("nama_kelompok", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan nama kelompok"
												maxLength="100"
												required
											/>
											{kelompokJabatanForm.errors.nama_kelompok && (
												<p className="mt-1 text-sm text-red-600">{kelompokJabatanForm.errors.nama_kelompok}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Indek
											</label>
											<input
												type="number"
												value={kelompokJabatanForm.data.indek}
												onChange={(e) => kelompokJabatanForm.setData("indek", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan indek (opsional)"
											/>
											{kelompokJabatanForm.errors.indek && (
												<p className="mt-1 text-sm text-red-600">{kelompokJabatanForm.errors.indek}</p>
											)}
										</div>

										<div className="flex justify-end gap-3 pt-4">
											<button
												type="button"
												onClick={() => {
													setShowKelompokJabatanModal(false);
													kelompokJabatanForm.reset();
												}}
												className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
											>
												Batal
											</button>
											<button
												type="submit"
												disabled={kelompokJabatanForm.processing}
												className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
											>
												{kelompokJabatanForm.processing ? "Menyimpan..." : "Simpan"}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					)}

					{/* Modal Tambah Emergency Index */}
					{showEmergencyIndexModal && (
						<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
								<div className="p-6">
									<div className="flex justify-between items-center mb-4">
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
											Tambah Emergency Index Baru
										</h3>
										<button
											type="button"
											onClick={() => {
												setShowEmergencyIndexModal(false);
												emergencyIndexForm.reset();
											}}
											className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="w-6 h-6"
											>
												<line x1="18" y1="6" x2="6" y2="18"></line>
												<line x1="6" y1="6" x2="18" y2="18"></line>
											</svg>
										</button>
									</div>

									<form onSubmit={handleTambahEmergencyIndex} className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Kode Emergency *
											</label>
											<input
												type="text"
												value={emergencyIndexForm.data.kode_emergency}
												onChange={(e) => emergencyIndexForm.setData("kode_emergency", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan kode emergency (maksimal 3 karakter)"
												maxLength="3"
												required
											/>
											{emergencyIndexForm.errors.kode_emergency && (
												<p className="mt-1 text-sm text-red-600">{emergencyIndexForm.errors.kode_emergency}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Nama Emergency *
											</label>
											<input
												type="text"
												value={emergencyIndexForm.data.nama_emergency}
												onChange={(e) => emergencyIndexForm.setData("nama_emergency", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan nama emergency"
												maxLength="100"
												required
											/>
											{emergencyIndexForm.errors.nama_emergency && (
												<p className="mt-1 text-sm text-red-600">{emergencyIndexForm.errors.nama_emergency}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Indek
											</label>
											<input
												type="number"
												value={emergencyIndexForm.data.indek}
												onChange={(e) => emergencyIndexForm.setData("indek", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan indek (opsional)"
											/>
											{emergencyIndexForm.errors.indek && (
												<p className="mt-1 text-sm text-red-600">{emergencyIndexForm.errors.indek}</p>
											)}
										</div>

										<div className="flex justify-end gap-3 pt-4">
											<button
												type="button"
												onClick={() => {
													setShowEmergencyIndexModal(false);
													emergencyIndexForm.reset();
												}}
												className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
											>
												Batal
											</button>
											<button
												type="submit"
												disabled={emergencyIndexForm.processing}
												className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
											>
												{emergencyIndexForm.processing ? "Menyimpan..." : "Simpan"}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					)}

					{/* Modal Tambah Bank */}
					{showBankModal && (
						<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
								<div className="p-6">
									<div className="flex justify-between items-center mb-4">
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
											Tambah Bank Baru
										</h3>
										<button
											type="button"
											onClick={() => {
												setShowBankModal(false);
												bankForm.reset();
											}}
											className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="w-6 h-6"
											>
												<line x1="18" y1="6" x2="6" y2="18"></line>
												<line x1="6" y1="6" x2="18" y2="18"></line>
											</svg>
										</button>
									</div>

									<form onSubmit={handleTambahBank} className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Nama Bank *
											</label>
											<input
												type="text"
												value={bankForm.data.namabank}
												onChange={(e) => bankForm.setData("namabank", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan nama bank"
												maxLength="50"
												required
											/>
											{bankForm.errors.namabank && (
												<p className="mt-1 text-sm text-red-600">{bankForm.errors.namabank}</p>
											)}
										</div>

										<div className="flex justify-end gap-3 pt-4">
											<button
												type="button"
												onClick={() => {
													setShowBankModal(false);
													bankForm.reset();
												}}
												className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
											>
												Batal
											</button>
											<button
												type="submit"
												disabled={bankForm.processing}
												className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
											>
												{bankForm.processing ? "Menyimpan..." : "Simpan"}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					)}

					{/* Modal Tambah Status WP */}
					{showSttsWpModal && (
						<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
								<div className="p-6">
									<div className="flex justify-between items-center mb-4">
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
											Tambah Status WP Baru
										</h3>
										<button
											type="button"
											onClick={() => {
												setShowSttsWpModal(false);
												sttsWpForm.reset();
											}}
											className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="w-6 h-6"
											>
												<line x1="18" y1="6" x2="6" y2="18"></line>
												<line x1="6" y1="6" x2="18" y2="18"></line>
											</svg>
										</button>
									</div>

									<form onSubmit={handleTambahSttsWp} className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Status WP *
											</label>
											<input
												type="text"
												value={sttsWpForm.data.stts}
												onChange={(e) => sttsWpForm.setData("stts", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan status WP (maksimal 5 karakter)"
												maxLength="5"
												required
											/>
											{sttsWpForm.errors.stts && (
												<p className="mt-1 text-sm text-red-600">{sttsWpForm.errors.stts}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Kategori
											</label>
											<input
												type="text"
												value={sttsWpForm.data.ktg}
												onChange={(e) => sttsWpForm.setData("ktg", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan kategori (opsional)"
												maxLength="50"
											/>
											{sttsWpForm.errors.ktg && (
												<p className="mt-1 text-sm text-red-600">{sttsWpForm.errors.ktg}</p>
											)}
										</div>

										<div className="flex justify-end gap-3 pt-4">
											<button
												type="button"
												onClick={() => {
													setShowSttsWpModal(false);
													sttsWpForm.reset();
												}}
												className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
											>
												Batal
											</button>
											<button
												type="submit"
												disabled={sttsWpForm.processing}
												className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
											>
												{sttsWpForm.processing ? "Menyimpan..." : "Simpan"}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					)}

					{/* Modal Tambah Status Kerja */}
					{showSttsKerjaModal && (
						<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
								<div className="p-6">
									<div className="flex justify-between items-center mb-4">
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
											Tambah Status Kerja Baru
										</h3>
										<button
											type="button"
											onClick={() => {
												setShowSttsKerjaModal(false);
												sttsKerjaForm.reset();
											}}
											className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="w-6 h-6"
											>
												<line x1="18" y1="6" x2="6" y2="18"></line>
												<line x1="6" y1="6" x2="18" y2="18"></line>
											</svg>
										</button>
									</div>

									<form onSubmit={handleTambahSttsKerja} className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Status Kerja *
											</label>
											<input
												type="text"
												value={sttsKerjaForm.data.stts}
												onChange={(e) => sttsKerjaForm.setData("stts", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan status kerja (maksimal 3 karakter)"
												maxLength="3"
												required
											/>
											{sttsKerjaForm.errors.stts && (
												<p className="mt-1 text-sm text-red-600">{sttsKerjaForm.errors.stts}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Kategori
											</label>
											<input
												type="text"
												value={sttsKerjaForm.data.ktg}
												onChange={(e) => sttsKerjaForm.setData("ktg", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan kategori (opsional)"
												maxLength="20"
											/>
											{sttsKerjaForm.errors.ktg && (
												<p className="mt-1 text-sm text-red-600">{sttsKerjaForm.errors.ktg}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Indek
											</label>
											<input
												type="number"
												value={sttsKerjaForm.data.indek}
												onChange={(e) => sttsKerjaForm.setData("indek", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan indek (opsional)"
											/>
											{sttsKerjaForm.errors.indek && (
												<p className="mt-1 text-sm text-red-600">{sttsKerjaForm.errors.indek}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Hak Cuti
											</label>
											<input
												type="number"
												value={sttsKerjaForm.data.hakcuti}
												onChange={(e) => sttsKerjaForm.setData("hakcuti", e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
												placeholder="Masukkan hak cuti (opsional)"
											/>
											{sttsKerjaForm.errors.hakcuti && (
												<p className="mt-1 text-sm text-red-600">{sttsKerjaForm.errors.hakcuti}</p>
											)}
										</div>

										<div className="flex justify-end gap-3 pt-4">
											<button
												type="button"
												onClick={() => {
													setShowSttsKerjaModal(false);
													sttsKerjaForm.reset();
												}}
												className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
											>
												Batal
											</button>
											<button
												type="submit"
												disabled={sttsKerjaForm.processing}
												className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
											>
												{sttsKerjaForm.processing ? "Menyimpan..." : "Simpan"}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</SidebarPengaturan>
	);
}
