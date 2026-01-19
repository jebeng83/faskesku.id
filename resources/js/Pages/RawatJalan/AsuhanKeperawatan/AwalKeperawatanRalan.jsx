import React, { useEffect, useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarRalan from "@/Layouts/SidebarRalan";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Input,
  Label,
  Textarea,
  CardHeader,
  CardTitle,
  CardContent,
  Toaster,
} from "@/Components/ui";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/Components/ui/Select";
import SearchableSelect from "@/Components/SearchableSelect";
import toast from "@/tools/toast";
import { Stethoscope, Save, Trash2, RefreshCw, ChevronDown, Plus } from "lucide-react";
import DataAlergi from "@/Alergi/DataAlergi";

// Section component dipindahkan ke level atas agar identitas komponen stabil dan tidak remount saat form re-render
function Section({ id, title, children, defaultOpen = true, description = null, headerRight = null, variants }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <motion.div variants={variants} id={id} className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
      <CardHeader className="px-6 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setOpen((v) => !v)} className="flex items-center gap-3 flex-1">
            <div className="min-w-0 shrink-0">
              <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">{title}</CardTitle>
              {description ? (
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">{description}</div>
              ) : null}
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-600 dark:text-gray-300 ml-auto transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
          </button>
          {headerRight ? (
            <div className="flex-1 min-w-0 px-2">
              <div className="grid grid-cols-3 grid-rows-2 gap-2 items-center">
                {headerRight}
              </div>
            </div>
          ) : null}
        </div>
      </CardHeader>
      {open ? <CardContent className="p-6">{children}</CardContent> : null}
    </motion.div>
  );
}

export default function AwalKeperawatanRalan({ initial = null, rawatJalan = null, patient = null, dokter: _dokter = null }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const informasiOptions = ["Autoanamnesis", "Alloanamnesis"];
  const yaTidakOptions = ["Tidak", "Ya"];
  const adlOptions = ["Mandiri", "Dibantu"];
  const statusPsikoOptions = ["Tenang", "Takut", "Cemas", "Depresi", "Lain-lain"];
  const hubKeluargaOptions = ["Baik", "Tidak Baik"];
  const tinggalDenganOptions = ["Sendiri", "Orang Tua", "Suami / Istri", "Lainnya"];
  const ekonomiOptions = ["Baik", "Cukup", "Kurang"];
  const budayaOptions = ["Tidak Ada", "Ada"];
  const edukasiOptions = ["Pasien", "Keluarga"];
  const berjalanOptions = ["Ya", "Tidak"];
  const hasilOptions = [
    "Tidak beresiko (tidak ditemukan a dan b)",
    "Resiko rendah (ditemukan a/b)",
    "Resiko tinggi (ditemukan a dan b)",
  ];
  const laporOptions = ["Ya", "Tidak"];
  const sg1Options = [
    "Tidak",
    "Tidak Yakin",
    "Ya, 1-5 Kg",
    "Ya, 6-10 Kg",
    "Ya, 11-15 Kg",
    "Ya, >15 Kg",
  ];
  const nilai1Options = ["0", "1", "2", "3", "4"];
  const sg2Options = ["Ya", "Tidak"];
  const nilai2Options = ["0", "1"];
  const nyeriOptions = ["Tidak Ada Nyeri", "Nyeri Akut", "Nyeri Kronis"];
  const provokesOptions = ["Proses Penyakit", "Benturan", "Lain-lain"];
  const qualityOptions = [
    "Seperti Tertusuk",
    "Berdenyut",
    "Teriris",
    "Tertindih",
    "Tertiban",
    "Lain-lain",
  ];
  const menyebarOptions = ["Tidak", "Ya"];
  const skalaNyeriOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const nowLocal = () => {
    try {
      const dt = new Date();
      const off = dt.getTimezoneOffset();
      const local = new Date(dt.getTime() - off * 60000);
      return local.toISOString().slice(0, 16);
    } catch {
      return new Date().toISOString().slice(0, 16);
    }
  };

  const [alergiModalOpen, setAlergiModalOpen] = useState(false);

  const formatBornDate = (val) => {
    try {
      if (!val) return '-';
      const s = String(val).trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
        const [y, m, d] = s.split('-');
        return `${d}-${m}-${y}`;
      }
      const d = new Date(s);
      if (Number.isNaN(d.getTime())) return s;
      return d.toLocaleDateString('id-ID');
    } catch (_) {
      return String(val);
    }
  };

  const formatGender = (val) => {
    const s = String(val || '').trim().toUpperCase();
    if (!s) return '-';
    if (s === 'L' || s === 'LAKI' || s === 'LAKI-LAKI' || s === 'PRIA' || s === 'M') return 'Laki - Laki';
    if (s === 'P' || s === 'PEREMPUAN' || s === 'WANITA' || s === 'F') return 'Perempuan';
    return String(val);
  };

  const computeAge = (val) => {
    try {
      if (!val) return '-';
      const birth = new Date(String(val));
      if (Number.isNaN(birth.getTime())) return '-';
      const now = new Date();
      let years = now.getFullYear() - birth.getFullYear();
      const mDiff = now.getMonth() - birth.getMonth();
      const dDiff = now.getDate() - birth.getDate();
      if (mDiff < 0 || (mDiff === 0 && dDiff < 0)) years -= 1;
      if (years > 0) return `${years} Th`;
      const months = (now.getFullYear() - birth.getFullYear()) * 12 + mDiff - (dDiff < 0 ? 1 : 0);
      if (months > 0) return `${months} Bl`;
      const days = Math.max(0, Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)));
      return `${days} Hr`;
    } catch {
      return '-';
    }
  };

  const { data, setData, reset, processing } = useForm({
    no_rawat: initial?.no_rawat || "",
    tanggal: initial?.tanggal ? String(initial.tanggal).slice(0, 16) : nowLocal(),
    informasi: initial?.informasi || informasiOptions[0],
    td: initial?.td || "",
    nadi: initial?.nadi || "",
    rr: initial?.rr || "",
    suhu: initial?.suhu || "",
    gcs: initial?.gcs || "",
    bb: initial?.bb || "",
    tb: initial?.tb || "",
    bmi: initial?.bmi || "",
    keluhan_utama: initial?.keluhan_utama || "",
    rpd: initial?.rpd || "",
    rpk: initial?.rpk || "",
    rpo: initial?.rpo || "",
    alergi: initial?.alergi || "",
    alat_bantu: initial?.alat_bantu || yaTidakOptions[0],
    ket_bantu: initial?.ket_bantu || "",
    prothesa: initial?.prothesa || yaTidakOptions[0],
    ket_pro: initial?.ket_pro || "",
    adl: initial?.adl || adlOptions[0],
    status_psiko: initial?.status_psiko || statusPsikoOptions[0],
    ket_psiko: initial?.ket_psiko || "",
    hub_keluarga: initial?.hub_keluarga || hubKeluargaOptions[0],
    tinggal_dengan: initial?.tinggal_dengan || tinggalDenganOptions[0],
    ket_tinggal: initial?.ket_tinggal || "",
    ekonomi: initial?.ekonomi || ekonomiOptions[0],
    budaya: initial?.budaya || budayaOptions[0],
    ket_budaya: initial?.ket_budaya || "",
    edukasi: initial?.edukasi || edukasiOptions[0],
    ket_edukasi: initial?.ket_edukasi || "",
    berjalan_a: initial?.berjalan_a || berjalanOptions[1],
    berjalan_b: initial?.berjalan_b || berjalanOptions[1],
    berjalan_c: initial?.berjalan_c || berjalanOptions[1],
    hasil: initial?.hasil || hasilOptions[0],
    lapor: initial?.lapor || laporOptions[1],
    ket_lapor: initial?.ket_lapor || "",
    sg1: initial?.sg1 || sg1Options[0],
    nilai1: initial?.nilai1 || nilai1Options[0],
    sg2: initial?.sg2 || sg2Options[1],
    nilai2: initial?.nilai2 || nilai2Options[0],
    total_hasil: initial?.total_hasil || 0,
    nyeri: initial?.nyeri || nyeriOptions[0],
    provokes: initial?.provokes || provokesOptions[0],
    ket_provokes: initial?.ket_provokes || "",
    quality: initial?.quality || qualityOptions[0],
    ket_quality: initial?.ket_quality || "",
    lokasi: initial?.lokasi || "",
    menyebar: initial?.menyebar || menyebarOptions[0],
    skala_nyeri: initial?.skala_nyeri || skalaNyeriOptions[0],
    durasi: initial?.durasi || "",
    nyeri_hilang: initial?.nyeri_hilang || "Istirahat",
    ket_nyeri: initial?.ket_nyeri || "",
    pada_dokter: initial?.pada_dokter || "Tidak",
    ket_dokter: initial?.ket_dokter || "",
    rencana: initial?.rencana || "",
    nip: initial?.nip || "",
    sdki: initial?.sdki || "",
    slki: initial?.slki || "",
    siki: initial?.siki || "",
  });

  const [exists, setExists] = useState(!!initial);
  const [toasts, setToasts] = useState([]);
  const pushToast = (t) => setToasts((arr) => [...arr, { id: Date.now() + Math.random(), ...t }]);
  const removeToast = (id) => setToasts((arr) => arr.filter((x) => x.id !== id));

  useEffect(() => {
    const parseNum = (s) => {
      const str = String(s || "").replace(/,/g, ".");
      const n = parseFloat(str);
      return Number.isFinite(n) ? n : null;
    };
    const bbN = parseNum(data.bb);
    const tbN = parseNum(data.tb);
    if (bbN != null && tbN != null && tbN > 0) {
      const meter = tbN / 100;
      const bmiVal = bbN / (meter * meter);
      const formatted = bmiVal ? bmiVal.toFixed(2) : "";
      if (formatted !== data.bmi) setData("bmi", formatted);
    } else {
      if (data.bmi) setData("bmi", "");
    }
  }, [data.bb, data.tb]);

  useEffect(() => {
    const n1 = parseInt(String(data.nilai1 || "0"), 10) || 0;
    const n2 = parseInt(String(data.nilai2 || "0"), 10) || 0;
    const total = n1 + n2;
    if (total !== data.total_hasil) setData("total_hasil", total);
  }, [data.nilai1, data.nilai2]);

  useEffect(() => {
    const mapping = {
      "Tidak": "0",
      "Tidak Yakin": "0",
      "Ya, 1-5 Kg": "1",
      "Ya, 6-10 Kg": "2",
      "Ya, 11-15 Kg": "3",
      "Ya, >15 Kg": "4",
    };
    const target = mapping[String(data.sg1)] ?? "0";
    if (data.nilai1 !== target) setData("nilai1", target);
  }, [data.sg1]);

  useEffect(() => {
    const target = data.sg2 === sg2Options[0] ? "1" : "0";
    if (data.nilai2 !== target) setData("nilai2", target);
  }, [data.sg2]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...data };
    if (!String(payload.no_rawat || "").trim()) {
      pushToast({ type: "error", title: "Validasi", message: "No. Rawat wajib diisi", duration: 3500 });
      toast.error("No. Rawat wajib diisi");
      return;
    }
    try {
      if (!exists) {
        router.post(route("penilaian-awal-keperawatan-ralan.store"), payload, {
          onSuccess: () => {
            setExists(true);
            pushToast({ type: "success", title: "Tersimpan", message: "Data berhasil disimpan" });
            toast.success("Data berhasil disimpan");
          },
          onError: () => {
            pushToast({ type: "error", title: "Gagal", message: "Gagal menyimpan data" });
            toast.error("Gagal menyimpan data");
          },
        });
      } else {
        router.put(route("penilaian-awal-keperawatan-ralan.update", { no_rawat: data.no_rawat }), payload, {
          onSuccess: () => {
            pushToast({ type: "success", title: "Terbarui", message: "Data berhasil diperbarui" });
            toast.success("Data berhasil diperbarui");
          },
          onError: () => {
            pushToast({ type: "error", title: "Gagal", message: "Gagal memperbarui data" });
            toast.error("Gagal memperbarui data");
          },
        });
      }
    } catch (_err) {
      pushToast({ type: "error", title: "Rute belum tersedia", message: "Endpoint belum dihubungkan" });
      toast.error("Endpoint belum dihubungkan");
    }
  };

  const handleDelete = () => {
    if (!String(data.no_rawat || "").trim()) {
      pushToast({ type: "error", title: "Validasi", message: "No. Rawat kosong" });
      toast.error("No. Rawat kosong");
      return;
    }
    try {
      router.delete(route("penilaian-awal-keperawatan-ralan.destroy", { no_rawat: data.no_rawat }), {
        onSuccess: () => {
          pushToast({ type: "success", title: "Terhapus", message: "Data dihapus" });
          toast.success("Data dihapus");
          setExists(false);
        },
        onError: () => {
          pushToast({ type: "error", title: "Gagal", message: "Gagal menghapus data" });
          toast.error("Gagal menghapus data");
        },
      });
    } catch {
      pushToast({ type: "error", title: "Rute belum tersedia", message: "Endpoint belum dihubungkan" });
      toast.error("Endpoint belum dihubungkan");
    }
  };

  const handleReset = () => {
    reset();
    setData("tanggal", nowLocal());
    setExists(false);
    pushToast({ type: "info", title: "Reset", message: "Form direset" });
  };

  
  useEffect(() => {
    const v = Number(data.skala_nyeri || 0);
    if (v === 0 && data.nyeri !== nyeriOptions[0]) {
      setData("nyeri", nyeriOptions[0]);
    }
    if (v > 0 && data.nyeri === nyeriOptions[0]) {
      setData("nyeri", nyeriOptions[1]);
    }
  }, [data.skala_nyeri]);

  useEffect(() => {
    if (data.nyeri === nyeriOptions[0] && data.skala_nyeri !== "0") {
      setData("skala_nyeri", "0");
    }
    if (data.nyeri === nyeriOptions[1] && data.skala_nyeri === "0") {
      setData("skala_nyeri", "3");
    }
    if (data.nyeri === nyeriOptions[2] && Number(data.skala_nyeri || 0) < 3) {
      setData("skala_nyeri", "5");
    }
  }, [data.nyeri]);

  useEffect(() => {
    if (data.hasil === hasilOptions[0] && data.lapor !== laporOptions[1]) {
      setData("lapor", laporOptions[1]);
    }
    if (data.hasil !== hasilOptions[0] && data.lapor === laporOptions[1]) {
      setData("lapor", laporOptions[0]);
    }
  }, [data.hasil]);

  useEffect(() => {
    if (data.lapor === laporOptions[1] && data.hasil !== hasilOptions[0]) {
      setData("hasil", hasilOptions[0]);
    }
    if (data.lapor === laporOptions[0] && data.hasil === hasilOptions[0]) {
      setData("hasil", hasilOptions[1]);
    }
  }, [data.lapor]);

  useEffect(() => {
    if (data.lapor === laporOptions[0]) {
      const t = nowLocal().slice(11, 16);
      if (data.ket_lapor !== t) {
        setData("ket_lapor", t);
      }
    } else {
      if (data.ket_lapor !== "") {
        setData("ket_lapor", "");
      }
    }
  }, [data.lapor]);

  return (
    <SidebarRalan title="Asuhan Keperawatan Ralan">
      <Head title="Pengkajian Awal Keperawatan Ralan" />

      <Toaster toasts={toasts} onRemove={removeToast} />

      <motion.div variants={itemVariants} className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg mb-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center">
            <Stethoscope className="w-5 h-5" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Pengkajian Awal Keperawatan (Ralan)</h1>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[28%_72%] gap-6 items-start">
        <div>
          <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <CardHeader className="px-6 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
              <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">I. Identitas Pasien</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-1.5">
                <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-2">
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">No RM.</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">:</div>
                  <div className="font-mono text-xs sm:text-sm text-gray-900 dark:text-gray-100">{rawatJalan?.no_rkm_medis || patient?.no_rkm_medis || '-'}</div>
                </div>
                <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-2">
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Nama</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">:</div>
                  <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100">{patient?.nm_pasien || rawatJalan?.patient?.nm_pasien || '-'} ({formatGender(patient?.jk || rawatJalan?.patient?.jk)})</div>
                </div>
                <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-2">
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Tgl Lahir</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">:</div>
                  <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100">{formatBornDate(patient?.tgl_lahir || rawatJalan?.patient?.tgl_lahir)} ({computeAge(patient?.tgl_lahir || rawatJalan?.patient?.tgl_lahir)})</div>
                </div>
                <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-2">
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">NIK</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">:</div>
                  <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100">{patient?.no_ktp || rawatJalan?.patient?.no_ktp || '-'}</div>
                </div>
                <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-2">
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">No Peserta</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">:</div>
                  <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100">{patient?.no_peserta || rawatJalan?.patient?.no_peserta || '-'}</div>
                </div>
                <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-2">
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Pendidikan</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">:</div>
                  <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100">{patient?.pnd || rawatJalan?.patient?.pnd || '-'}</div>
                </div>
                <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-2">
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Pekerjaan</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">:</div>
                  <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100">{patient?.pekerjaan || rawatJalan?.patient?.pekerjaan || '-'}</div>
                </div>
                <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-2">
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Agama</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">:</div>
                  <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100">{patient?.agama || rawatJalan?.patient?.agama || '-'}</div>
                </div>
                <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-2">
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Gol Darah</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">:</div>
                  <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100">{patient?.gol_darah || rawatJalan?.patient?.gol_darah || '-'}</div>
                </div>
                <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-2">
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">No Rawat</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">:</div>
                  <div className="font-mono text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">{rawatJalan?.no_rawat || data.no_rawat || '-'}</div>
                </div>
                <div className="pt-3">
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">PENANGGUNGJAWAB</div>
                  <div className="space-y-1">
                    <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-2">
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Nama</div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">:</div>
                      <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100">{rawatJalan?.patient?.namakeluarga || patient?.namakeluarga || '-'}</div>
                    </div>
                    <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-2">
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Hubungan</div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">:</div>
                      <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100">{rawatJalan?.patient?.keluarga || patient?.keluarga || '-'}</div>
                    </div>
                    <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-2">
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Pekerjaan</div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">:</div>
                      <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100">{rawatJalan?.patient?.pekerjaanpj || patient?.pekerjaanpj || '-'}</div>
                    </div>
                    <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-2">
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Alamat</div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">:</div>
                      <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100">{rawatJalan?.patient?.alamatpj || patient?.alamatpj || '-'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </motion.div>
        </div>

        <div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence initial={false}>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-6">
            <Section
              id="identitas-waktu"
              title="Identitas & Waktu"
              defaultOpen
              variants={itemVariants}
            >
              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-1 md:grid-cols-[30%_40%_30%] gap-2 items-start justify-start place-items-start self-start">
                  <div>
                    <Label htmlFor="tanggal" required>Tanggal Asuhan</Label>
                    <Input id="tanggal" type="datetime-local" value={data.tanggal} onChange={(e) => setData("tanggal", e.target.value)} className="h-8 text-xs px-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm" />
                  </div>
                  <div>
                    <Label>Informasi</Label>
                    <Select value={data.informasi} onValueChange={(v) => setData("informasi", v)}>
                      <SelectTrigger className="h-8 text-xs px-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm" aria-label="Pilih informasi">
                        <SelectValue placeholder="Pilih informasi" selectedValue={data.informasi} />
                      </SelectTrigger>
                      <SelectContent>
                        {informasiOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Petugas (NIP)</Label>
                    <SearchableSelect
                      source="pegawai"
                      value={data.nip}
                      onChange={(v) => setData("nip", v)}
                      placeholder="Cari petugas berdasarkan NIP/Nama"
                      defaultDisplay={data.nip ? data.nip : ""}
                      className="h-8 text-xs px-2 py-1 justify-start"
                      dropdownClassName="rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </Section>

            <Section id="vital-sign" title="Keadaan Umum & Vital Sign" defaultOpen variants={itemVariants}>
              <div className="mb-4">
                <Label>Keluhan Utama</Label>
                <Textarea rows={4} className="h-24" value={data.keluhan_utama} onChange={(e) => setData("keluhan_utama", e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label>TD (mmHg)</Label>
                  <Input value={data.td} onChange={(e) => setData("td", e.target.value)} placeholder="120/80" />
                </div>
                <div>
                  <Label>Nadi (x/menit)</Label>
                  <Input value={data.nadi} onChange={(e) => setData("nadi", e.target.value)} placeholder="80" />
                </div>
                <div>
                  <Label>RR (x/menit)</Label>
                  <Input value={data.rr} onChange={(e) => setData("rr", e.target.value)} placeholder="20" />
                </div>
                <div>
                  <Label>Suhu (°C)</Label>
                  <Input value={data.suhu} onChange={(e) => setData("suhu", e.target.value)} placeholder="36.5" />
                </div>
                <div>
                  <Label>GCS</Label>
                  <Input value={data.gcs} onChange={(e) => setData("gcs", e.target.value)} placeholder="15" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <Label>BB (Kg)</Label>
                  <Input value={data.bb} onChange={(e) => setData("bb", e.target.value)} placeholder="60" />
                </div>
                <div>
                  <Label>TB (cm)</Label>
                  <Input value={data.tb} onChange={(e) => setData("tb", e.target.value)} placeholder="170" />
                </div>
                <div>
                  <Label>BMI (Kg/m²)</Label>
                  <Input value={data.bmi} onChange={(e) => setData("bmi", e.target.value)} placeholder="Auto" disabled />
                </div>
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Riwayat Penyakit Dahulu (RPD)</Label>
                    <Textarea rows={4} className="h-24" value={data.rpd} onChange={(e) => setData("rpd", e.target.value)} />
                  </div>
                  <div>
                    <Label>Riwayat Penyakit Keluarga (RPK)</Label>
                    <Textarea rows={4} className="h-24" value={data.rpk} onChange={(e) => setData("rpk", e.target.value)} />
                  </div>
                  <div>
                    <Label>Riwayat Pengobatan (RPO)</Label>
                    <Textarea rows={4} className="h-24" value={data.rpo} onChange={(e) => setData("rpo", e.target.value)} />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <Label>Alergi</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <SearchableSelect
                        source="alergi_local"
                        sourceParams={{ kode_jenis: "" }}
                        valueKey="label"
                        value={data.alergi}
                        onChange={(v) => setData("alergi", v)}
                        placeholder="Penisilin / Makanan / Lainnya"
                        defaultDisplay={data.alergi || ""}
                        searchPlaceholder="Cari alergi (nama)…"
                        dropdownClassName="rounded-xl"
                      />
                    </div>
                    <Button type="button" variant="outline" aria-label="Tambah data alergi" onClick={() => setAlergiModalOpen(true)} className="h-9 px-3">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="fungsi-psiko" title="Fungsional & Psiko-Sosial" defaultOpen variants={itemVariants}>
              <div className="space-y-4">
                <div className="grid grid-cols-[15%_33%_15%_33%] gap-4 items-end">
                  <div>
                    <Label>Alat Bantu</Label>
                    <Select value={data.alat_bantu} onValueChange={(v) => setData("alat_bantu", v)}>
                      <SelectTrigger className="h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.alat_bantu} />
                      </SelectTrigger>
                      <SelectContent>
                        {yaTidakOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Keterangan Alat Bantu</Label>
                    <Input className="h-10" value={data.ket_bantu} onChange={(e) => setData("ket_bantu", e.target.value)} />
                  </div>
                  <div>
                    <Label>Status Psiko</Label>
                    <Select value={data.status_psiko} onValueChange={(v) => setData("status_psiko", v)}>
                      <SelectTrigger className="h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.status_psiko} />
                      </SelectTrigger>
                      <SelectContent>
                        {statusPsikoOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Keterangan Psiko</Label>
                    <Input className="h-10" value={data.ket_psiko} onChange={(e) => setData("ket_psiko", e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-[15%_33%_15%_33%] gap-4 items-end">
                  <div>
                    <Label>Prothesa</Label>
                    <Select value={data.prothesa} onValueChange={(v) => setData("prothesa", v)}>
                      <SelectTrigger className="h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.prothesa} />
                      </SelectTrigger>
                      <SelectContent>
                        {yaTidakOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Keterangan Prothesa</Label>
                    <Input className="h-10" value={data.ket_pro} onChange={(e) => setData("ket_pro", e.target.value)} />
                  </div>
                  <div>
                    <Label>Tinggal Dengan</Label>
                    <Select value={data.tinggal_dengan} onValueChange={(v) => setData("tinggal_dengan", v)}>
                      <SelectTrigger className="h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.tinggal_dengan} />
                      </SelectTrigger>
                      <SelectContent>
                        {tinggalDenganOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Keterangan Tinggal</Label>
                    <Input className="h-10" value={data.ket_tinggal} onChange={(e) => setData("ket_tinggal", e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-[15%_33%_15%_33%] gap-4 items-end">
                  <div>
                    <Label>Kepercayaan Lain</Label>
                    <Select value={data.budaya} onValueChange={(v) => setData("budaya", v)}>
                      <SelectTrigger className="h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.budaya} />
                      </SelectTrigger>
                      <SelectContent>
                        {budayaOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Keterangan Kepercayaan Lain</Label>
                    <Input className="h-10" value={data.ket_budaya} onChange={(e) => setData("ket_budaya", e.target.value)} />
                  </div>
                  <div>
                    <Label>Edukasi</Label>
                    <Select value={data.edukasi} onValueChange={(v) => setData("edukasi", v)}>
                      <SelectTrigger className="h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.edukasi} />
                      </SelectTrigger>
                      <SelectContent>
                        {edukasiOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Keterangan Edukasi</Label>
                    <Input className="h-10" value={data.ket_edukasi} onChange={(e) => setData("ket_edukasi", e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 items-end">
                  <div>
                    <Label>ADL</Label>
                    <Select value={data.adl} onValueChange={(v) => setData("adl", v)}>
                      <SelectTrigger className="h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.adl} />
                      </SelectTrigger>
                      <SelectContent>
                        {adlOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Ekonomi</Label>
                    <Select value={data.ekonomi} onValueChange={(v) => setData("ekonomi", v)}>
                      <SelectTrigger className="h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.ekonomi} />
                      </SelectTrigger>
                      <SelectContent>
                        {ekonomiOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Hubungan Keluarga</Label>
                    <Select value={data.hub_keluarga} onValueChange={(v) => setData("hub_keluarga", v)}>
                      <SelectTrigger className="h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.hub_keluarga} />
                      </SelectTrigger>
                      <SelectContent>
                        {hubKeluargaOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="risiko-gizi" title="Risiko Jatuh & Skrining Gizi" defaultOpen variants={itemVariants}>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 items-end">
                  <div>
                    <Label>a. Sempoyongan/Limbung</Label>
                    <Select value={data.berjalan_a} onValueChange={(v) => setData("berjalan_a", v)}>
                      <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.berjalan_a} />
                      </SelectTrigger>
                      <SelectContent>
                        {berjalanOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>a. Alat Bantu (Kursi Roda    )</Label>
                    <Select value={data.berjalan_b} onValueChange={(v) => setData("berjalan_b", v)}>
                      <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.berjalan_b} />
                      </SelectTrigger>
                      <SelectContent>
                        {berjalanOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>b. Menopang Saat duduk</Label>
                    <Select value={data.berjalan_c} onValueChange={(v) => setData("berjalan_c", v)}>
                      <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.berjalan_c} />
                      </SelectTrigger>
                      <SelectContent>
                        {berjalanOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-[35%_35%_25%] gap-4 items-end">
                  <div>
                    <Label>Hasil Risiko</Label>
                    <Select value={data.hasil} onValueChange={(v) => setData("hasil", v)}>
                      <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.hasil} />
                      </SelectTrigger>
                      <SelectContent>
                        {hasilOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Lapor</Label>
                    <Select value={data.lapor} onValueChange={(v) => setData("lapor", v)}>
                      <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.lapor} />
                      </SelectTrigger>
                      <SelectContent>
                        {laporOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Keterangan Lapor</Label>
                    <Input type="time" step="60" value={data.ket_lapor} onChange={(e) => setData("ket_lapor", e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 items-end">
                  <div>
                    <Label>Penurunan BB dalam 6 bulan terakir</Label>
                    <Select value={data.sg1} onValueChange={(v) => setData("sg1", v)}>
                      <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.sg1} />
                      </SelectTrigger>
                      <SelectContent>
                        {sg1Options.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Nilai 1</Label>
                    <Select value={data.nilai1} onValueChange={(v) => setData("nilai1", v)}>
                      <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="0-4" selectedValue={data.nilai1} />
                      </SelectTrigger>
                      <SelectContent>
                        {nilai1Options.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 items-end">
                  <div>
                    <Label>Nafsu Makan Berkurang</Label>
                    <Select value={data.sg2} onValueChange={(v) => setData("sg2", v)}>
                      <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="Pilih" selectedValue={data.sg2} />
                      </SelectTrigger>
                      <SelectContent>
                        {sg2Options.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Nilai 2</Label>
                    <Select value={data.nilai2} onValueChange={(v) => setData("nilai2", v)}>
                      <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <SelectValue placeholder="0-1" selectedValue={data.nilai2} />
                      </SelectTrigger>
                      <SelectContent>
                        {nilai2Options.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 items-end">
                  <div>
                    <Label>Total Hasil</Label>
                    <Input value={data.total_hasil} onChange={(e) => setData("total_hasil", e.target.value)} disabled />
                  </div>
                </div>
              </div>
            </Section>

            <Section id="nyeri" title="Pengkajian Nyeri" defaultOpen variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <Label>Skala Nyeri (Geser)</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={Number(data.skala_nyeri ?? 0)}
                        onChange={(e) => setData("skala_nyeri", e.target.value)}
                        className="w-full h-2 rounded-lg bg-gradient-to-r from-green-400 via-yellow-400 via-orange-500 to-red-600 appearance-none"
                      />
                      <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                        {Array.from({ length: 11 }, (_, i) => (
                          <span key={i}>{i}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
                        style={{
                          backgroundColor: (() => {
                            const v = Number(data.skala_nyeri ?? 0);
                            if (v === 0) return "#22c55e";
                            if (v <= 2) return "#4ade80";
                            if (v <= 4) return "#f59e0b";
                            if (v <= 6) return "#f97316";
                            if (v <= 8) return "#ef4444";
                            return "#dc2626";
                          })(),
                        }}
                      >
                        {(() => {
                          const v = Number(data.skala_nyeri ?? 0);
                          if (v === 0) return "😀";
                          if (v <= 2) return "🙂";
                          if (v <= 4) return "😐";
                          if (v <= 6) return "🙁";
                          if (v <= 8) return "😣";
                          return "😭";
                        })()}
                      </div>
                      <div className="mt-1 text-xs text-gray-600">
                        {(() => {
                          const v = Number(data.skala_nyeri ?? 0);
                          if (v === 0) return "No Pain";
                          if (v <= 2) return "Mild";
                          if (v <= 4) return "Moderate";
                          if (v <= 6) return "Severe";
                          if (v <= 8) return "Very Severe";
                          return "Worst Pain";
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Nyeri</Label>
                  <Select value={data.nyeri} onValueChange={(v) => setData("nyeri", v)}>
                    <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                      <SelectValue placeholder="Pilih" selectedValue={data.nyeri} />
                    </SelectTrigger>
                    <SelectContent>
                      {nyeriOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Provokes</Label>
                  <Select value={data.provokes} onValueChange={(v) => setData("provokes", v)}>
                    <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                      <SelectValue placeholder="Pilih" selectedValue={data.provokes} />
                    </SelectTrigger>
                    <SelectContent>
                      {provokesOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Keterangan Provokes</Label>
                  <Input value={data.ket_provokes} onChange={(e) => setData("ket_provokes", e.target.value)} />
                </div>
                <div>
                  <Label>Quality</Label>
                  <Select value={data.quality} onValueChange={(v) => setData("quality", v)}>
                    <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                      <SelectValue placeholder="Pilih" selectedValue={data.quality} />
                    </SelectTrigger>
                    <SelectContent>
                      {qualityOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Keterangan Quality</Label>
                  <Input value={data.ket_quality} onChange={(e) => setData("ket_quality", e.target.value)} />
                </div>
                <div>
                  <Label>Lokasi Nyeri</Label>
                  <Input value={data.lokasi} onChange={(e) => setData("lokasi", e.target.value)} />
                </div>
                <div>
                  <Label>Menyebar</Label>
                  <Select value={data.menyebar} onValueChange={(v) => setData("menyebar", v)}>
                    <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                      <SelectValue placeholder="Pilih" selectedValue={data.menyebar} />
                    </SelectTrigger>
                    <SelectContent>
                      {menyebarOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Skala Nyeri</Label>
                  <Select value={data.skala_nyeri} onValueChange={(v) => setData("skala_nyeri", v)}>
                    <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                      <SelectValue placeholder="0-10" selectedValue={data.skala_nyeri} />
                    </SelectTrigger>
                    <SelectContent>
                      {skalaNyeriOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Durasi</Label>
                  <Input value={data.durasi} onChange={(e) => setData("durasi", e.target.value)} placeholder="Menit / waktu" />
                </div>
                <div>
                  <Label>Nyeri Hilang Dengan</Label>
                  <Select value={data.nyeri_hilang} onValueChange={(v) => setData("nyeri_hilang", v)}>
                    <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                      <SelectValue placeholder="Pilih" selectedValue={data.nyeri_hilang} />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Istirahat",
                        "Medengar Musik",
                        "Minum Obat",
                      ].map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Keterangan Nyeri</Label>
                  <Input value={data.ket_nyeri} onChange={(e) => setData("ket_nyeri", e.target.value)} />
                </div>
                <div>
                  <Label>Pada Dokter</Label>
                  <Select value={data.pada_dokter} onValueChange={(v) => setData("pada_dokter", v)}>
                    <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                      <SelectValue placeholder="Pilih" selectedValue={data.pada_dokter} />
                    </SelectTrigger>
                    <SelectContent>
                      {["Tidak", "Ya"].map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Keterangan Dokter</Label>
                  <Input value={data.ket_dokter} onChange={(e) => setData("ket_dokter", e.target.value)} />
                </div>
              </div>
            </Section>

            <Section
              id="sdki-slki-siki"
              title="SDKI – SLKI – SIKI"
              defaultOpen
              variants={itemVariants}
              headerRight={
                <div className="flex items-center justify-end">
                  <Button
                    size="sm"
                    onClick={() => {
                      try {
                        const url = route('rawat-jalan.asuhan-keperawatan.sdki');
                        router.visit(url);
                      } catch (_) {
                        router.visit('/rawat-jalan/asuhan-keperawatan/sdki');
                      }
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    SDKI
                  </Button>
                </div>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>SDKI (Diagnosa Keperawatan)</Label>
                  <Textarea
                    rows={3}
                    value={data.sdki}
                    onChange={(e) => setData("sdki", e.target.value)}
                    placeholder="Contoh: Nyeri akut terkait ..."
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <Label>SLKI (Luaran Keperawatan)</Label>
                  <Textarea
                    rows={3}
                    value={data.slki}
                    onChange={(e) => setData("slki", e.target.value)}
                    placeholder="Contoh: Intensitas nyeri menurun menjadi ..."
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <Label>SIKI (Intervensi Keperawatan)</Label>
                  <Textarea
                    rows={3}
                    value={data.siki}
                    onChange={(e) => setData("siki", e.target.value)}
                    placeholder="Contoh: Manajemen nyeri, edukasi ..."
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                  />
                </div>
                <div className="md:col-span-3">
                  <Label>Rencana Keperawatan</Label>
                  <Textarea
                    rows={3}
                    value={data.rencana}
                    onChange={(e) => setData("rencana", e.target.value)}
                    placeholder="Rencana lainnya"
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                  />
                </div>
              </div>
            </Section>
          </motion.div>
        </AnimatePresence>

        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-3">
          <Button type="submit" variant="primary" className="shadow" disabled={processing} aria-label="Simpan">
            <Save className="w-4 h-4 mr-2" />
            {exists ? "Update" : "Simpan"}
          </Button>
          <Button type="button" variant="outline" onClick={handleReset} aria-label="Reset">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button type="button" variant="danger" onClick={handleDelete} aria-label="Hapus" disabled={!exists}>
            <Trash2 className="w-4 h-4 mr-2" />
            Hapus
          </Button>
          <div className="text-xs text-gray-500">Total Skor Gizi: <span className="font-semibold text-gray-700">{data.total_hasil}</span></div>
        </motion.div>
      </form>
        </div>
      </div>
      <DataAlergi open={alergiModalOpen} onClose={() => setAlergiModalOpen(false)} jenis={null} />
    </SidebarRalan>
  );
}
