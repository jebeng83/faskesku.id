import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Modal from "./Modal";

export default function PenjabQuickCreateModal({ isOpen, onClose, onCreated }) {
    const [form, setForm] = useState({
        kd_pj: "",
        png_jawab: "",
        nama_perusahaan: "",
        alamat_asuransi: "",
        no_telp: "",
        attn: "",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [codeInfo, setCodeInfo] = useState({ last_number: null, last_code: null, next_code: null });
    const lastChangeTs = useRef(0);
    const lastFocusedName = useRef("");

    useEffect(() => {
        if (!isOpen) {
            setForm({
                kd_pj: "",
                png_jawab: "",
                nama_perusahaan: "",
                alamat_asuransi: "",
                no_telp: "",
                attn: "",
            });
            setErrors({});
            setSubmitting(false);
        }
    }, [isOpen]);

    // Saat modal dibuka, ambil kode berikutnya (format A01) dan isi otomatis
    useEffect(() => {
        const loadNext = async () => {
            try {
                const res = await axios.get(`/api/penjab/next-code`, { params: { prefix: "A" } });
                const data = res.data || {};
                setCodeInfo({
                    last_number: data.last_number ?? null,
                    last_code: data.last_code ?? null,
                    next_code: data.next_code ?? null,
                });
                if (data?.next_code) {
                    setForm((prev) => ({ ...prev, kd_pj: data.next_code }));
                }
            } catch (e) {
                // abaikan error — pengguna tetap dapat mengisi manual
            }
        };

        if (isOpen) {
            loadNext();
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        lastChangeTs.current = Date.now();
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});
        try {
            // Gunakan API endpoint agar tidak mengalihkan halaman
            const payload = { ...form, status: "1" };
            const res = await axios.post("/api/penjab", payload);
            if (res.status === 201) {
                const created = res.data?.data || {};
                // Callback ke halaman untuk menambahkan ke daftar opsi lokal
                if (typeof onCreated === "function") {
                    onCreated({ kd_pj: created.kd_pj, png_jawab: created.png_jawab });
                }
                onClose();
            } else {
                // Fallback jika server mengembalikan non-201
                console.warn("Respon tidak terduga saat membuat penjab:", res.status, res.data);
                onClose();
            }
        } catch (err) {
            const resp = err?.response;
            if (resp?.status === 422 && resp?.data?.errors) {
                // Tampilkan pesan validasi dari backend
                const beErrors = resp.data.errors;
                const normalized = {};
                Object.keys(beErrors).forEach((k) => {
                    normalized[k] = Array.isArray(beErrors[k]) ? beErrors[k][0] : beErrors[k];
                });
                setErrors(normalized);
            } else {
                alert(
                    err?.response?.data?.message ||
                        err?.message ||
                        "Gagal menambahkan Penanggung Jawab"
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

    const Input = ({ label, name, required, value, onChange, error, placeholder, helper }) => {
        const id = `penjab-${name}`;
        const handleFocus = () => {
            lastFocusedName.current = name;
        };
        const handleBlur = (e) => {
            // Jika blur terjadi segera setelah mengetik (<= 200ms), anggap tidak diinginkan dan kembalikan fokus
            if (Date.now() - lastChangeTs.current <= 200 && isOpen) {
                // Re-focus input untuk mencegah "macet" setelah 1 huruf
                e.target.focus();
                // Pindahkan caret ke akhir teks
                const val = e.target.value;
                try {
                    e.target.setSelectionRange(val.length, val.length);
                } catch (_) {}
            }
        };
        const handleKeyDown = (e) => {
            // Hindari shortcut global menelan input karakter
            e.stopPropagation();
        };
        return (
            <div className="space-y-1">
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                    id={id}
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    required={required}
                    placeholder={placeholder}
                    className={`w-full px-3 py-2 text-sm rounded-md border ${
                        error
                            ? "border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 dark:border-gray-700 focus:ring-gray-400 focus:border-transparent"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2`}
                />
                {helper && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">{helper}</p>
                )}
                {error && (
                    <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
                )}
            </div>
        );
    };

    // Jika fokus hilang akibat re-render, pulihkan fokus ke input terakhir yang aktif
    useEffect(() => {
        if (!isOpen || !lastFocusedName.current) return;
        const selector = `input[name="${lastFocusedName.current}"]`;
        const el = document.querySelector(selector);
        if (el && document.activeElement !== el) {
            el.focus();
            try {
                el.setSelectionRange(el.value.length, el.value.length);
            } catch (_) {}
        }
    }, [form, isOpen]);

    return (
        <Modal show={isOpen} onClose={onClose} title="Tambah Penjamin" zIndex={10050} size="md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                    <Input
                        label="Kode"
                        name="kd_pj"
                        required
                        value={form.kd_pj}
                        onChange={handleChange}
                        error={errors.kd_pj}
                        placeholder="Misal: BPJ/MND/UMM"
                        helper={codeInfo?.last_number !== null ? `Nomor terakhir: ${String(codeInfo.last_number).padStart(2, "0")} ${codeInfo.last_code ? `(Kode terakhir: ${codeInfo.last_code})` : ""}` : undefined}
                    />
                    <Input
                        label="Penjamin"
                        name="png_jawab"
                        required
                        value={form.png_jawab}
                        onChange={handleChange}
                        error={errors.png_jawab}
                    />
                    <Input
                        label="Perusahaan"
                        name="nama_perusahaan"
                        required
                        value={form.nama_perusahaan}
                        onChange={handleChange}
                        error={errors.nama_perusahaan}
                    />
                    <Input
                        label="Alamat"
                        name="alamat_asuransi"
                        required
                        value={form.alamat_asuransi}
                        onChange={handleChange}
                        error={errors.alamat_asuransi}
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <Input
                            label="Telp"
                            name="no_telp"
                            value={form.no_telp}
                            onChange={handleChange}
                            error={errors.no_telp}
                        />
                        <Input
                            label="Attn"
                            name="attn"
                            value={form.attn}
                            onChange={handleChange}
                            error={errors.attn}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700"
                    >
                        Batal
                    </button>
                    <button
                        disabled={submitting}
                        className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                        {submitting ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}