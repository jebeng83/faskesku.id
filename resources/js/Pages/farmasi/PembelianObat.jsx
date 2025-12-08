import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import SidebarFarmasi from "@/Layouts/SidebarFarmasi";
import { router } from "@inertiajs/react";
import { toast } from "@/tools/toast";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/Components/ui";
import { Search, RefreshCcw, Plus, Save, X } from "lucide-react";

function Card({ children, className = "" }) {
    return (
        <div
            className={`rounded-xl border border-white/60 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl shadow-lg ${className}`}
        >
            {children}
        </div>
    );
}
function CardHeader({ children, className = "" }) {
    return (
        <div
            className={`px-4 py-2.5 border-b border-gray-200/60 dark:border-gray-700/50 ${className}`}
        >
            {children}
        </div>
    );
}
function CardTitle({ children }) {
    return (
        <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            {children}
        </h3>
    );
}
function CardContent({ children, className = "" }) {
    return <div className={`p-4 ${className}`}>{children}</div>;
}

export default function PembelianObat() {
    // Mode transaksi
    const [mode, setMode] = useState("pembelian");

    const { props } = usePage();
    const batchEnabled = (() => {
        const s = props?.settings ?? props?.setting ?? {};
        const keys = [
            "AKTIFKANBATCHOBAT",
            "aktifkan_batch_obat",
            "aktifkanBatchObat",
            "BATCH_OBAT_ENABLED",
            "batch_obat_enabled",
        ];
        for (let k of keys) {
            const v = s?.[k];
            if (typeof v === "string") {
                const t = v.toLowerCase();
                if (t === "yes" || t === "true" || t === "1") return true;
                if (t === "no" || t === "false" || t === "0") return false;
            } else if (typeof v === "number") {
                return v !== 0;
            } else if (typeof v === "boolean") {
                return v;
            }
        }
        return true;
    })();

    // State untuk form pembelian/pemesanan
    const [formData, setFormData] = useState({
        no_faktur: "",
        tgl_beli: new Date().toISOString().split("T")[0],
        kd_rek: "",
        kode_suplier: "",
        nip: "",
        kd_bangsal: "",
        total1: 0,
        potongan: 0,
        total2: 0,
        ppn: 0,
        tagihan: 0,
        no_order: "",
        tgl_pesan: new Date().toISOString().split("T")[0],
        tgl_faktur: "",
        tgl_tempo: "",
    });

    // State untuk dropdown data individual
    const [suppliers, setSuppliers] = useState([]);
    const [pegawai, setPegawai] = useState([]);
    const [bangsal, setBangsal] = useState([]);
    const [akunBayar, setAkunBayar] = useState([]);

    // Fungsi untuk mengambil data dropdown
    const fetchDropdownData = async () => {
        try {
            // Fetch suppliers
            const suppliersResponse = await fetch("/api/pembelian/supplier");
            if (suppliersResponse.ok) {
                const suppliersResult = await suppliersResponse.json();
                if (suppliersResult.success) {
                    setSuppliers(suppliersResult.data);
                } else {
                    console.error(
                        "Failed to fetch suppliers:",
                        suppliersResult.message
                    );
                }
            } else {
                console.error(
                    "Suppliers API request failed:",
                    suppliersResponse.status
                );
            }

            // Fetch pegawai
            const timestamp = new Date().getTime();
            const pegawaiResponse = await fetch(
                `/api/pembelian/petugas?t=${timestamp}`
            );
            if (pegawaiResponse.ok) {
                const pegawaiResult = await pegawaiResponse.json();
                if (pegawaiResult.success) {
                    setPegawai(pegawaiResult.data);
                } else {
                    console.error(
                        "Failed to fetch pegawai:",
                        pegawaiResult.message
                    );
                }
            } else {
                console.error(
                    "Pegawai API request failed:",
                    pegawaiResponse.status
                );
            }

            // Fetch bangsal
            const bangsalResponse = await fetch("/api/pembelian/lokasi");
            if (bangsalResponse.ok) {
                const bangsalResult = await bangsalResponse.json();
                if (bangsalResult.success) {
                    setBangsal(bangsalResult.data);
                } else {
                    console.error(
                        "Failed to fetch bangsal:",
                        bangsalResult.message
                    );
                }
            } else {
                console.error(
                    "Bangsal API request failed:",
                    bangsalResponse.status
                );
            }

            // Fetch akun bayar
            const akunBayarResponse = await fetch("/api/pembelian/akun-bayar");
            if (akunBayarResponse.ok) {
                const akunBayarResult = await akunBayarResponse.json();
                if (akunBayarResult.success) {
                    setAkunBayar(akunBayarResult.data);
                } else {
                    console.error(
                        "Failed to fetch akun bayar:",
                        akunBayarResult.message
                    );
                }
            } else {
                console.error(
                    "Akun bayar API request failed:",
                    akunBayarResponse.status
                );
            }
        } catch (error) {
            console.error("Error fetching dropdown data:", error);
        }
    };

    // State untuk item pembelian
    const [items, setItems] = useState([]);

    // State untuk pencarian item
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // State untuk total pembelian
    const [totals, setTotals] = useState({
        subtotal: 0,
        totalDiskon: 0,
        grandTotal: 0,
    });

    // Fungsi untuk generate nomor faktur
    const generateNoFaktur = async () => {
        try {
            // Tambahkan timestamp untuk mencegah caching
            const timestamp = new Date().getTime();
            const response = await fetch(
                `/api/pembelian/generate-no-faktur?t=${timestamp}`,
                {
                    method: "GET",
                    headers: {
                        "Cache-Control": "no-cache, no-store, must-revalidate",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                }
            );
            const data = await response.json();

            if (data.success) {
                return data.no_faktur;
            } else {
                console.error("Error generating no faktur:", data.message);
                // Fallback ke format lama jika API gagal
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, "0");
                const day = String(today.getDate()).padStart(2, "0");
                const random = Math.floor(Math.random() * 1000)
                    .toString()
                    .padStart(3, "0");
                return `PB-${year}${month}${day}-${random}`;
            }
        } catch (error) {
            console.error("Error calling generate no faktur API:", error);
            // Fallback ke format lama jika API gagal
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            const random = Math.floor(Math.random() * 1000)
                .toString()
                .padStart(3, "0");
            return `PB-${year}${month}${day}-${random}`;
        }
    };

    const generateNoOrder = async () => {
        try {
            const timestamp = new Date().getTime();
            const response = await fetch(
                `/api/pemesanan/generate-no-order?t=${timestamp}`,
                {
                    method: "GET",
                    headers: {
                        "Cache-Control": "no-cache, no-store, must-revalidate",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                }
            );
            const data = await response.json();
            if (data.success) {
                return data.no_order;
            } else {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, "0");
                const day = String(today.getDate()).padStart(2, "0");
                return `PO-${year}${month}${day}-001`;
            }
        } catch (error) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            return `PO-${year}${month}${day}-001`;
        }
    };

    // Load data saat komponen dimount
    useEffect(() => {
        const initializeData = async () => {
            await fetchDropdownData();
            const noFaktur = await generateNoFaktur();
            setFormData((prev) => ({
                ...prev,
                no_faktur: noFaktur,
            }));
        };

        initializeData();
    }, []);

    useEffect(() => {
        if (mode === "pembelian") {
            (async () => {
                if (!formData.no_faktur) {
                    const noFaktur = await generateNoFaktur();
                    setFormData((prev) => ({
                        ...prev,
                        no_faktur: noFaktur,
                        kd_rek: prev.kd_rek || "",
                    }));
                }
            })();
        } else {
            (async () => {
                const noOrder = await generateNoOrder();
                setFormData((prev) => ({
                    ...prev,
                    no_order: noOrder,
                    no_faktur: "",
                    kd_rek: "",
                    tgl_pesan: new Date().toISOString().split("T")[0],
                    tgl_faktur: prev.tgl_faktur || "",
                    tgl_tempo: prev.tgl_tempo || "",
                }));
            })();
        }
    }, [mode]);

    // Fungsi untuk handle perubahan form
    const handleFormChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Fungsi untuk pencarian barang
    const searchBarang = async (term) => {
        if (term.length < 2) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await fetch(
                `/api/barang/search?q=${encodeURIComponent(term)}`
            );
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    setSearchResults(result.data);
                } else {
                    console.error("Search failed:", result.message);
                    setSearchResults([]);
                }
            } else {
                console.error("Search request failed:", response.status);
                setSearchResults([]);
            }
        } catch (error) {
            console.error("Error searching barang:", error);
            setSearchResults([]);
        }
    };

    // Fungsi untuk menambah item ke pembelian
    const addItemToPurchase = (barang) => {
        const existingItemIndex = items.findIndex(
            (item) => item.kode_brng === barang.kode_brng
        );

        if (existingItemIndex >= 0) {
            // Jika item sudah ada, tambah jumlahnya
            const updatedItems = [...items];
            updatedItems[existingItemIndex].jumlah += 1;
            updatedItems[existingItemIndex].subtotal =
                updatedItems[existingItemIndex].jumlah *
                updatedItems[existingItemIndex].h_beli;
            updatedItems[existingItemIndex].total =
                updatedItems[existingItemIndex].subtotal -
                updatedItems[existingItemIndex].besardis;
            setItems(updatedItems);
        } else {
            // Jika item baru, tambahkan ke list
            const newItem = {
                kode_brng: barang.kode_brng,
                nama_brng: barang.nama_brng,
                kode_sat: resolveKodeSat(barang),
                jumlah: 1,
                h_beli: barang.h_beli || 0,
                subtotal: barang.h_beli || 0,
                dis: 0,
                besardis: 0,
                total: barang.h_beli || 0,
                no_batch: "BATCH001",
                kadaluarsa: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0], // 3 tahun dari sekarang
            };
            setItems([...items, newItem]);
        }

        // Tutup modal dan reset pencarian
        setShowSearchModal(false);
        setSearchTerm("");
        setSearchResults([]);
    };

    // Fungsi untuk update item
    const updateItem = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;

        // Recalculate subtotal dan total
        if (field === "jumlah" || field === "h_beli") {
            updatedItems[index].subtotal =
                updatedItems[index].jumlah * updatedItems[index].h_beli;
        }

        if (field === "dis") {
            updatedItems[index].besardis =
                (updatedItems[index].h_beli * updatedItems[index].dis) / 100;
        }

        updatedItems[index].total =
            updatedItems[index].subtotal - updatedItems[index].besardis;

        setItems(updatedItems);
    };

    // Fungsi untuk hapus item
    const removeItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    // Fungsi untuk menghitung total
    const calculateTotals = () => {
        const subtotal = items.reduce(
            (sum, item) => sum + (item.total || 0),
            0
        );
        const perItemDiscount = items.reduce(
            (sum, item) => sum + (item.besardis || 0),
            0
        );
        const totalDiskon = perItemDiscount + (formData.potongan || 0);
        const afterDiscount = subtotal - (formData.potongan || 0);
        const ppnAmount = formData.ppn ? afterDiscount * 0.11 : 0;
        const grandTotal = afterDiscount + ppnAmount;

        setTotals({
            subtotal,
            totalDiskon,
            grandTotal,
        });

        setFormData((prev) => ({
            ...prev,
            total1: subtotal,
            total2: afterDiscount,
            ppn: ppnAmount,
            tagihan: grandTotal,
        }));
    };

    // Fungsi untuk menghitung ulang total saat item berubah
    useEffect(() => {
        calculateTotals();
    }, [items]);

    // Fungsi untuk menghitung ulang total saat potongan berubah
    useEffect(() => {
        calculateTotals();
    }, [formData.potongan, formData.ppn]);

    const validateItems = (arr) => {
        if (!arr || arr.length === 0)
            return "Mohon tambahkan minimal satu item";
        const invalidJumlah = arr.find((i) => !i.jumlah || i.jumlah <= 0);
        if (invalidJumlah)
            return `Jumlah untuk item ${invalidJumlah.nama_brng} harus lebih dari 0`;
        const invalidHarga = arr.find((i) => !i.h_beli || i.h_beli <= 0);
        if (invalidHarga)
            return `Harga beli untuk item ${invalidHarga.nama_brng} harus lebih dari 0`;
        return null;
    };

    const getMissingFields = (m, fd) => {
        if (m === "pemesanan") {
            const req = [
                ["no_order", "No Order"],
                ["tgl_pesan", "Tanggal Pesan"],
                ["kode_suplier", "Supplier"],
                ["nip", "Petugas"],
                ["kd_bangsal", "Lokasi"],
            ];
            return req.filter(([k]) => !fd[k]).map(([, label]) => label);
        }
        const req = [
            ["no_faktur", "No Faktur"],
            ["tgl_beli", "Tanggal Pembelian"],
            ["kode_suplier", "Supplier"],
            ["nip", "Petugas"],
            ["kd_bangsal", "Lokasi"],
            ["kd_rek", "Akun Bayar"],
        ];
        return req.filter(([k]) => !fd[k]).map(([, label]) => label);
    };

    const extractErrorMessage = async (response) => {
        try {
            const contentType = response.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
                const data = await response.json();
                return (
                    data.message ||
                    `Server error: ${response.status} ${response.statusText}`
                );
            }
            return `Server error: ${response.status} ${response.statusText}`;
        } catch {
            return `Server error: ${response.status} ${response.statusText}`;
        }
    };

    const resolveKodeSat = (obj) => {
        const v = (obj?.kode_sat ?? "").toString().trim();
        return v.length ? v : "TAB";
    };

    const successToastFor = (m) =>
        m === "pemesanan"
            ? "Berhasil menyimpan data pemesanan (PO)!"
            : "Berhasil menyimpan data pembelian!";
    const errorToastPrefixFor = (m) =>
        m === "pemesanan"
            ? "Gagal menyimpan data pemesanan: "
            : "Gagal menyimpan data pembelian: ";

    const resetAfterSuccess = async (m) => {
        const delay = m === "pemesanan" ? 1200 : 1500;
        setTimeout(async () => {
            if (m === "pemesanan") {
                const newNoOrder = await generateNoOrder();
                setFormData({
                    no_order: newNoOrder,
                    tgl_pesan: new Date().toISOString().split("T")[0],
                    tgl_faktur: "",
                    tgl_tempo: "",
                    no_faktur: "",
                    tgl_beli: new Date().toISOString().split("T")[0],
                    kd_rek: "",
                    kode_suplier: "",
                    nip: "",
                    kd_bangsal: "",
                    total1: 0,
                    potongan: 0,
                    total2: 0,
                    ppn: 0,
                    tagihan: 0,
                });
                setItems([]);
                return;
            }
            const newNoFaktur = await generateNoFaktur();
            setFormData({
                no_faktur: newNoFaktur,
                tgl_beli: new Date().toISOString().split("T")[0],
                kd_rek: "",
                kode_suplier: "",
                nip: "",
                kd_bangsal: "",
                total1: 0,
                potongan: 0,
                total2: 0,
                ppn: 0,
                tagihan: 0,
            });
            setItems([]);
        }, delay);
    };

    // Fungsi untuk menyimpan data pembelian
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mode === "pemesanan") {
            const itemError = validateItems(items);
            if (itemError) {
                toast(itemError, "error");
                return;
            }
            const missingFieldsPO = getMissingFields("pemesanan", formData);
            if (missingFieldsPO.length > 0) {
                toast(
                    `Mohon lengkapi field: ${missingFieldsPO.join(", ")}`,
                    "error"
                );
                return;
            }

            try {
                const payload = {
                    no_order: formData.no_order,
                    kode_suplier: formData.kode_suplier,
                    nip: formData.nip,
                    tgl_pesan: formData.tgl_pesan,
                    tgl_faktur: formData.tgl_faktur || null,
                    tgl_tempo: formData.tgl_tempo || null,
                    kd_bangsal: formData.kd_bangsal,
                    total1: Number(formData.total1 || 0),
                    potongan: Number(formData.potongan || 0),
                    total2: Number(formData.total2 || 0),
                    ppn: Number(formData.ppn || 0),
                    tagihan: Number(formData.tagihan || 0),
                    items: items.map((item) => ({
                        kode_brng: item.kode_brng,
                        kode_sat: resolveKodeSat(item),
                        no_batch: batchEnabled ? (item.no_batch ?? '') : '',
                        kadaluarsa:
                            item.kadaluarsa ||
                            new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000)
                                .toISOString()
                                .split("T")[0],
                        jumlah: Number(item.jumlah || 0),
                        harga: Number(item.h_beli || 0),
                        subtotal: Number(item.subtotal || 0),
                        dis: Number(item.dis || 0),
                        besardis: Number(item.besardis || 0),
                        total: Number(item.total || 0),
                    })),
                };

                const response = await fetch("/api/pemesanan/store", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    toast(successToastFor("pemesanan"), "success");
                    await resetAfterSuccess("pemesanan");
                } else {
                    const errorMessage = await extractErrorMessage(response);
                    toast(
                        errorToastPrefixFor("pemesanan") + errorMessage,
                        "error"
                    );
                }
            } catch (error) {
                console.error("Error saving pemesanan:", error);
                toast("Terjadi kesalahan saat menyimpan pemesanan", "error");
            }
            return;
        }

        const missingFields = getMissingFields("pembelian", formData);
        if (missingFields.length > 0) {
            toast(`Mohon lengkapi field: ${missingFields.join(", ")}`, "error");
            return;
        }

        const itemErrorPembelian = validateItems(items);
        if (itemErrorPembelian) {
            toast(itemErrorPembelian, "error");
            return;
        }

        try {
            const payload = {
                no_faktur: formData.no_faktur,
                kode_suplier: formData.kode_suplier,
                nip: formData.nip,
                tgl_beli: formData.tgl_beli,
                kd_rek: formData.kd_rek,
                total1: Number(formData.total1 || 0),
                potongan: Number(formData.potongan || 0),
                total2: Number(formData.total2 || 0),
                ppn: Number(formData.ppn || 0),
                tagihan: Number(formData.tagihan || 0),
                kd_bangsal: formData.kd_bangsal,
                items: items.map((item) => ({
                    kode_brng: item.kode_brng,
                    kode_sat: resolveKodeSat(item),
                    no_batch: batchEnabled ? (item.no_batch ?? '') : '',
                    kadaluarsa:
                        item.kadaluarsa ||
                        new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000)
                            .toISOString()
                            .split("T")[0],
                    jumlah: Number(item.jumlah || 0),
                    harga: Number(item.h_beli || 0),
                    subtotal: Number(item.subtotal || 0),
                    dis: Number(item.dis || 0),
                    besardis: Number(item.besardis || 0),
                    total: Number(item.total || 0),
                })),
            };

            const response = await fetch("/api/pembelian/store", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast(successToastFor("pembelian"), "success");
                try {
                    const postRes = await fetch(
                        "/api/akutansi/jurnal/post-staging",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                            },
                            body: JSON.stringify({
                                no_bukti: formData.no_faktur,
                                jenis: "U",
                                keterangan: `Posting otomatis Pembelian Obat no_faktur ${formData.no_faktur}`,
                            }),
                        }
                    );
                    if (postRes.ok) {
                        toast(
                            "Jurnal akutansi berhasil diposting dari tampjurnal",
                            "success"
                        );
                    } else {
                        const msg = await extractErrorMessage(postRes);
                        toast("Gagal posting jurnal: " + msg, "error");
                    }
                } catch (err) {
                    console.error("Error posting jurnal pembelian:", err);
                    toast("Terjadi kesalahan saat posting jurnal", "error");
                }
                await resetAfterSuccess("pembelian");
            } else {
                const errorMessage = await extractErrorMessage(response);
                toast(errorToastPrefixFor("pembelian") + errorMessage, "error");
            }
        } catch (error) {
            console.error("Error saving data:", error);
            toast("Terjadi kesalahan saat menyimpan data", "error");
        }
    };

    return (
        <SidebarFarmasi title="Farmasi">
            <Head title="Pembelian Obat" />
            <div className="screen-only">
                <div className="px-6 py-4 rounded-xl bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 ring-1 ring-black/5">
                    <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                        Pembelian Obat
                    </h2>
                </div>
            </div>
            <div className="py-6">
                <div className="mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
                    <Card className="mb-4">
                        <CardHeader>
                            <div className="flex items-center justify-between gap-4">
                                <CardTitle>Form Pembelian Obat</CardTitle>
                                <div className="w-64">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mode Transaksi
                                    </label>
                                    <Select
                                        value={mode}
                                        onValueChange={setMode}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Mode Transaksi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pemesanan">
                                                Pemesanan (PO)
                                            </SelectItem>
                                            <SelectItem value="pembelian">
                                                Pembelian (Barang Masuk)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {mode === "pemesanan" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                No Order *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.no_order}
                                                onChange={(e) =>
                                                    handleFormChange(
                                                        "no_order",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tanggal Pesan *
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.tgl_pesan}
                                                onChange={(e) =>
                                                    handleFormChange(
                                                        "tgl_pesan",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tanggal Faktur
                                            </label>
                                            <input
                                                type="date"
                                                value={
                                                    formData.tgl_faktur || ""
                                                }
                                                onChange={(e) =>
                                                    handleFormChange(
                                                        "tgl_faktur",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Jatuh Tempo
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.tgl_tempo || ""}
                                                onChange={(e) =>
                                                    handleFormChange(
                                                        "tgl_tempo",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </>
                                )}
                                {mode === "pembelian" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                No Faktur *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.no_faktur}
                                                onChange={(e) =>
                                                    handleFormChange(
                                                        "no_faktur",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tanggal Pembelian *
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.tgl_beli}
                                                onChange={(e) =>
                                                    handleFormChange(
                                                        "tgl_beli",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Akun Bayar *
                                            </label>
                                            <select
                                                value={formData.kd_rek}
                                                onChange={(e) =>
                                                    handleFormChange(
                                                        "kd_rek",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            >
                                                <option value="">
                                                    Pilih Akun Bayar
                                                </option>
                                                {akunBayar.map(
                                                    (akun, index) => (
                                                        <option
                                                            key={`${akun.kd_rek}-${akun.nama_bayar}-${index}`}
                                                            value={akun.kd_rek}
                                                        >
                                                            {akun.kd_rek} -{" "}
                                                            {akun.nama_bayar}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Form Header */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {/* Supplier */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Supplier *
                                    </label>
                                    <select
                                        value={formData.kode_suplier}
                                        onChange={(e) =>
                                            handleFormChange(
                                                "kode_suplier",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Pilih Supplier</option>
                                        {suppliers.map((supplier) => (
                                            <option
                                                key={supplier.kode_suplier}
                                                value={supplier.kode_suplier}
                                            >
                                                {supplier.kode_suplier} -{" "}
                                                {supplier.nama_suplier}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Petugas */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Petugas *
                                    </label>
                                    <select
                                        value={formData.nip}
                                        onChange={(e) =>
                                            handleFormChange(
                                                "nip",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Pilih Petugas</option>
                                        {pegawai.map((petugas, index) => (
                                            <option
                                                key={`${petugas.nip}-${index}`}
                                                value={petugas.nip}
                                            >
                                                {petugas.nip} - {petugas.nama}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Lokasi */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lokasi *
                                    </label>
                                    <select
                                        value={formData.kd_bangsal}
                                        onChange={(e) =>
                                            handleFormChange(
                                                "kd_bangsal",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Pilih Lokasi</option>
                                        {bangsal.map((lokasi) => (
                                            <option
                                                key={lokasi.kd_bangsal}
                                                value={lokasi.kd_bangsal}
                                            >
                                                {lokasi.kd_bangsal} -{" "}
                                                {lokasi.nm_bangsal}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mb-4">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>
                                    {mode === "pemesanan"
                                        ? "Item Pemesanan"
                                        : "Item Pembelian"}
                                </CardTitle>
                                <Button
                                    onClick={() => setShowSearchModal(true)}
                                    variant="success"
                                    size="md"
                                >
                                    <Plus className="w-4 h-4" /> Tambah Item
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Tabel Item */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                Kode
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                Nama Barang
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                Kode Sat
                                            </th>
                                            {mode === "pembelian" && (
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                    No Batch
                                                </th>
                                            )}
                                            {mode === "pembelian" && (
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                    Kadaluarsa
                                                </th>
                                            )}
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                {mode === "pemesanan"
                                                    ? "Jumlah Pesan"
                                                    : "Jumlah"}
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                {mode === "pemesanan"
                                                    ? "Harga Rencana"
                                                    : "Harga Beli"}
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                Subtotal
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                Diskon (%)
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                Besar Diskon
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                Total
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {items.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={
                                                        mode === "pembelian"
                                                            ? 12
                                                            : 10
                                                    }
                                                    className="px-4 py-8 text-center text-gray-500"
                                                >
                                                    Belum ada item yang
                                                    ditambahkan
                                                </td>
                                            </tr>
                                        ) : (
                                            items.map((item, index) => (
                                                <tr
                                                    key={`${item.kode_brng}-${index}`}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-4 py-3 text-sm text-gray-900 border-b">
                                                        {item.kode_brng}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900 border-b">
                                                        {item.nama_brng}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm border-b">
                                                        <Input
                                                            type="text"
                                                            value={
                                                                item.kode_sat ||
                                                                ""
                                                            }
                                                            onChange={(e) =>
                                                                updateItem(
                                                                    index,
                                                                    "kode_sat",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="w-20 text-center"
                                                            placeholder="TAB"
                                                            aria-label="Kode Satuan"
                                                        />
                                                    </td>
                                                    {mode === "pembelian" && (
                                                        <td className="px-4 py-3 text-sm border-b">
                                                            <Input
                                                                type="text"
                                                                value={
                                                                    item.no_batch ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    updateItem(
                                                                        index,
                                                                        "no_batch",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-24 text-center"
                                                                placeholder="BATCH001"
                                                                aria-label="No Batch"
                                                            />
                                                        </td>
                                                    )}
                                                    {mode === "pembelian" && (
                                                        <td className="px-4 py-3 text-sm border-b">
                                                            <Input
                                                                type="date"
                                                                value={
                                                                    item.kadaluarsa ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    updateItem(
                                                                        index,
                                                                        "kadaluarsa",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-32"
                                                                aria-label="Tanggal Kadaluarsa"
                                                            />
                                                        </td>
                                                    )}
                                                    <td className="px-4 py-3 text-sm border-b">
                                                        <Input
                                                            type="number"
                                                            value={item.jumlah}
                                                            onChange={(e) =>
                                                                updateItem(
                                                                    index,
                                                                    "jumlah",
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    ) || 0
                                                                )
                                                            }
                                                            className="w-20 text-center"
                                                            min="1"
                                                            aria-label="Jumlah"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3 text-sm border-b">
                                                        <Input
                                                            type="number"
                                                            value={item.h_beli}
                                                            onChange={(e) =>
                                                                updateItem(
                                                                    index,
                                                                    "h_beli",
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    ) || 0
                                                                )
                                                            }
                                                            className="w-24 text-right"
                                                            min="0"
                                                            step="0.01"
                                                            aria-label="Harga Beli"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900 border-b text-right">
                                                        Rp{" "}
                                                        {(
                                                            item.subtotal || 0
                                                        ).toLocaleString()}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm border-b">
                                                        <Input
                                                            type="number"
                                                            value={item.dis}
                                                            onChange={(e) =>
                                                                updateItem(
                                                                    index,
                                                                    "dis",
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    ) || 0
                                                                )
                                                            }
                                                            className="w-16 text-center"
                                                            min="0"
                                                            max="100"
                                                            step="0.1"
                                                            aria-label="Diskon (%)"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900 border-b text-right">
                                                        Rp{" "}
                                                        {(
                                                            item.besardis || 0
                                                        ).toLocaleString()}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900 border-b text-right font-semibold">
                                                        Rp{" "}
                                                        {(
                                                            item.total || 0
                                                        ).toLocaleString()}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm border-b">
                                                        <Button
                                                            onClick={() =>
                                                                removeItem(
                                                                    index
                                                                )
                                                            }
                                                            variant="danger"
                                                            size="sm"
                                                        >
                                                            Hapus
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="mb-4">
                        <CardHeader>
                            <CardTitle>
                                {mode === "pemesanan"
                                    ? "Total Pemesanan"
                                    : "Total Pembelian"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="font-medium">
                                            Subtotal:
                                        </span>
                                        <span className="font-semibold">
                                            Rp{" "}
                                            {totals.subtotal.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">
                                            Potongan:
                                        </span>
                                        <Input
                                            type="number"
                                            value={formData.potongan}
                                            onChange={(e) =>
                                                handleFormChange(
                                                    "potongan",
                                                    parseFloat(
                                                        e.target.value
                                                    ) || 0
                                                )
                                            }
                                            className="w-32 text-right"
                                            min="0"
                                            step="0.01"
                                            aria-label="Potongan"
                                        />
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-medium">
                                            Total Diskon:
                                        </span>
                                        <span className="font-semibold">
                                            Rp{" "}
                                            {totals.totalDiskon.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">
                                            PPN (11%):
                                        </span>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.ppn > 0}
                                                onChange={(e) => {
                                                    const afterDiscount =
                                                        totals.subtotal -
                                                        (formData.potongan ||
                                                            0);
                                                    const ppnAmount = e.target
                                                        .checked
                                                        ? afterDiscount * 0.11
                                                        : 0;
                                                    handleFormChange(
                                                        "ppn",
                                                        ppnAmount
                                                    );
                                                }}
                                                className="mr-2"
                                            />
                                            <span>
                                                Rp{" "}
                                                {(
                                                    formData.ppn || 0
                                                ).toLocaleString()}
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end items-end">
                                    <div className="text-right">
                                        <div className="text-sm text-gray-600 mb-1">
                                            Grand Total
                                        </div>
                                        <div className="text-3xl font-bold text-green-600">
                                            Rp{" "}
                                            {totals.grandTotal.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tombol Aksi */}
                    <div className="flex justify-end space-x-4">
                        <Button
                            onClick={async () => {
                                if (mode === "pembelian") {
                                    const newNoFaktur =
                                        await generateNoFaktur();
                                    setFormData({
                                        no_faktur: newNoFaktur,
                                        tgl_beli: new Date()
                                            .toISOString()
                                            .split("T")[0],
                                        kd_rek: "",
                                        kode_suplier: "",
                                        nip: "",
                                        kd_bangsal: "",
                                        total1: 0,
                                        potongan: 0,
                                        total2: 0,
                                        ppn: 0,
                                        tagihan: 0,
                                        no_order: "",
                                        tgl_pesan: new Date()
                                            .toISOString()
                                            .split("T")[0],
                                        tgl_faktur: "",
                                        tgl_tempo: "",
                                    });
                                } else {
                                    const newNoOrder = await generateNoOrder();
                                    setFormData({
                                        no_order: newNoOrder,
                                        tgl_pesan: new Date()
                                            .toISOString()
                                            .split("T")[0],
                                        tgl_faktur: "",
                                        tgl_tempo: "",
                                        no_faktur: "",
                                        tgl_beli: new Date()
                                            .toISOString()
                                            .split("T")[0],
                                        kd_rek: "",
                                        kode_suplier: "",
                                        nip: "",
                                        kd_bangsal: "",
                                        total1: 0,
                                        potongan: 0,
                                        total2: 0,
                                        ppn: 0,
                                        tagihan: 0,
                                    });
                                }
                                setItems([]);
                                toast(
                                    mode === "pembelian"
                                        ? "Form berhasil direset dengan nomor faktur baru"
                                        : "Form berhasil direset dengan nomor order baru",
                                    "success"
                                );
                            }}
                            variant="secondary"
                            size="md"
                            aria-label="Reset Form"
                        >
                            <RefreshCcw className="w-4 h-4" /> Reset
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="success"
                            size="md"
                        >
                            <Save className="w-4 h-4" />{" "}
                            {mode === "pemesanan"
                                ? "Simpan Pemesanan"
                                : "Simpan Pembelian"}
                        </Button>
                    </div>

                    {/* Modal Pencarian Item */}
                    {showSearchModal && (
                        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-xl border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">
                                        Pencarian Item Barang
                                    </h3>
                                    <button
                                        onClick={() => {
                                            setShowSearchModal(false);
                                            setSearchTerm("");
                                            setSearchResults([]);
                                        }}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Search Input */}
                                <div className="mb-4">
                                    <Input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            searchBarang(e.target.value);
                                        }}
                                        placeholder="Cari nama barang atau kode barang..."
                                        className="w-full"
                                        autoFocus
                                        aria-label="Cari Barang"
                                    />
                                </div>

                                {/* Search Results */}
                                <div className="overflow-y-auto max-h-96">
                                    {searchResults.length === 0 &&
                                    searchTerm.length >= 2 ? (
                                        <div className="text-center py-8 text-gray-500">
                                            Tidak ada barang yang ditemukan
                                        </div>
                                    ) : searchResults.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500">
                                            Ketik minimal 2 karakter untuk
                                            mencari barang
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {searchResults.map((barang) => (
                                                <div
                                                    key={barang.kode_brng}
                                                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                                                    onClick={() =>
                                                        addItemToPurchase(
                                                            barang
                                                        )
                                                    }
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900">
                                                                {
                                                                    barang.nama_brng
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                Kode:{" "}
                                                                {
                                                                    barang.kode_brng
                                                                }{" "}
                                                                | Satuan:{" "}
                                                                {
                                                                    barang.kode_sat
                                                                }
                                                            </div>
                                                            {barang.letak_barang && (
                                                                <div className="text-sm text-gray-500">
                                                                    Lokasi:{" "}
                                                                    {
                                                                        barang.letak_barang
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="font-semibold text-green-600">
                                                                Rp{" "}
                                                                {(
                                                                    barang.h_beli ||
                                                                    0
                                                                ).toLocaleString()}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                Stok:{" "}
                                                                {barang.stokminimal ||
                                                                    0}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Modal Footer */}
                                <div className="mt-6 flex justify-end">
                                    <Button
                                        onClick={() => {
                                            setShowSearchModal(false);
                                            setSearchTerm("");
                                            setSearchResults([]);
                                        }}
                                        variant="secondary"
                                        size="md"
                                        aria-label="Tutup Pencarian"
                                    >
                                        <X className="w-4 h-4" /> Tutup
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </SidebarFarmasi>
    );
}
