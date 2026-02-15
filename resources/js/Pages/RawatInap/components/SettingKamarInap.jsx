import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Save, Trash2, Settings2 } from "lucide-react";
import { Head } from "@inertiajs/react";
import LayoutUtama from "@/Pages/LayoutUtama";
import SidebarRawatInapMenu from "@/Components/SidebarRawatInapMenu";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";
import Label from "@/Components/ui/Label";
import Modal from "@/Components/Modal";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/Components/ui/Table";
import toast from "@/tools/toast";

const variants = {
  container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } },
  item: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
};

const defaults = {
  lamajam: 0,
  hariawal: "No",
  feeperujuk: 0,
  diagnosaakhir: "No",
  bayi: 0,
  aktifkan_hapus_data_salah: "No",
  kamar_inap_kasir_ralan: "No",
  ubah_status_kamar: "No",
};

const yesNoOptions = ["Yes", "No"];

export default function SettingKamarInap() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [exists, setExists] = useState(false);
  const [serverData, setServerData] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [form, setForm] = useState({ ...defaults });

  const headers = useMemo(() => ({ Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }), []);

  const fetchSetting = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/set-kamar-inap", { headers, withCredentials: true });
      const data = res?.data?.data || { ...defaults };
      const ex = !!res?.data?.exists;
      setExists(ex);
      setServerData(ex ? data : null);
      setForm({
        lamajam: Number.isFinite(Number(data.lamajam)) ? Number(data.lamajam) : 0,
        hariawal: data.hariawal === "Yes" ? "Yes" : "No",
        feeperujuk: Number.isFinite(Number(data.feeperujuk)) ? Number(data.feeperujuk) : 0,
        diagnosaakhir: data.diagnosaakhir === "Yes" ? "Yes" : "No",
        bayi: Number.isFinite(Number(data.bayi)) ? Number(data.bayi) : 0,
        aktifkan_hapus_data_salah: data.aktifkan_hapus_data_salah === "Yes" ? "Yes" : "No",
        kamar_inap_kasir_ralan: data.kamar_inap_kasir_ralan === "Yes" ? "Yes" : "No",
        ubah_status_kamar: data.ubah_status_kamar === "Yes" ? "Yes" : "No",
      });
    } catch (_e) {
      toast.error("Gagal memuat setting kamar inap");
      setExists(false);
      setServerData(null);
      setForm({ ...defaults });
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    fetchSetting();
  }, [fetchSetting]);

  const handleReset = () => {
    setForm({ ...defaults });
  };

  const validateForm = () => {
    const lamajam = Number(form.lamajam);
    const bayi = Number(form.bayi);
    const feeperujuk = Number(form.feeperujuk);

    if (!Number.isFinite(lamajam) || lamajam < 0) return "Jam minimal harus angka dan ≥ 0";
    if (!Number.isFinite(feeperujuk) || feeperujuk < 0) return "Fee perujuk harus angka dan ≥ 0";
    if (!Number.isFinite(bayi) || bayi < 0 || bayi > 100) return "Persen gabung bayi harus 0–100";
    return null;
  };

  const handleSave = async () => {
    const msg = validateForm();
    if (msg) {
      toast.error(msg);
      return;
    }

    setSaving(true);
    try {
      const payload = {
        lamajam: Math.trunc(Number(form.lamajam)),
        hariawal: form.hariawal,
        feeperujuk: Number(form.feeperujuk),
        diagnosaakhir: form.diagnosaakhir,
        bayi: Math.trunc(Number(form.bayi)),
        aktifkan_hapus_data_salah: form.aktifkan_hapus_data_salah,
        kamar_inap_kasir_ralan: form.kamar_inap_kasir_ralan,
        ubah_status_kamar: form.ubah_status_kamar,
      };
      const res = await axios.put("/api/set-kamar-inap", payload, { headers, withCredentials: true });
      const message = res?.data?.message || "Setting tersimpan";
      toast.success(message);
      fetchSetting();
    } catch (e) {
      const errors = e?.response?.data?.errors;
      if (errors && typeof errors === "object") {
        const firstKey = Object.keys(errors)[0];
        const firstMsg = Array.isArray(errors[firstKey]) ? errors[firstKey][0] : String(errors[firstKey]);
        toast.error(firstMsg || "Gagal menyimpan setting kamar inap");
      } else {
        const message = e?.response?.data?.message || "Gagal menyimpan setting kamar inap";
        toast.error(message);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await axios.delete("/api/set-kamar-inap", { headers, withCredentials: true });
      toast.success("Setting kamar inap berhasil dihapus");
      setConfirmDeleteOpen(false);
      fetchSetting();
    } catch (e) {
      const message = e?.response?.data?.message || "Gagal menghapus setting kamar inap";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <LayoutUtama title="Setting Kamar Inap" left={<SidebarRawatInapMenu title="Rawat Inap" />}>
      <Head title="Setting Kamar Inap" />
      <div className="space-y-4">
        <motion.div
          variants={variants.item}
          className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm rounded-lg"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <motion.h1
                className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Setting Kamar Inap
              </motion.h1>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
          variants={variants.container}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          <div className="relative px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-indigo-600" />
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Konfigurasi</div>
              <div className="ml-auto text-xs text-slate-500">{exists ? "Tersimpan" : "Belum tersimpan"}</div>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label>Jam minimal dihitung di kamar</Label>
                <Input
                  type="number"
                  value={form.lamajam}
                  onChange={(e) => setForm((s) => ({ ...s, lamajam: e.target.value }))}
                  className="h-10 text-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                />
              </div>

              <div>
                <Label>Hitung hari dari awal masuk</Label>
                <select
                  value={form.hariawal}
                  onChange={(e) => setForm((s) => ({ ...s, hariawal: e.target.value }))}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  {yesNoOptions.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Fee perujuk ranap (Rp)</Label>
                <Input
                  type="number"
                  value={form.feeperujuk}
                  onChange={(e) => setForm((s) => ({ ...s, feeperujuk: e.target.value }))}
                  className="h-10 text-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                />
              </div>

              <div>
                <Label>Aktifkan diagnosa akhir</Label>
                <select
                  value={form.diagnosaakhir}
                  onChange={(e) => setForm((s) => ({ ...s, diagnosaakhir: e.target.value }))}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  {yesNoOptions.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Biaya ranap gabung bayi (%)</Label>
                <Input
                  type="number"
                  value={form.bayi}
                  onChange={(e) => setForm((s) => ({ ...s, bayi: e.target.value }))}
                  className="h-10 text-sm ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                />
              </div>

              <div>
                <Label>Aktifkan hapus data salah</Label>
                <select
                  value={form.aktifkan_hapus_data_salah}
                  onChange={(e) => setForm((s) => ({ ...s, aktifkan_hapus_data_salah: e.target.value }))}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  {yesNoOptions.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Aktifkan kamar inap di ralan</Label>
                <select
                  value={form.kamar_inap_kasir_ralan}
                  onChange={(e) => setForm((s) => ({ ...s, kamar_inap_kasir_ralan: e.target.value }))}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  {yesNoOptions.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Ijinkan ubah status kamar</Label>
                <select
                  value={form.ubah_status_kamar}
                  onChange={(e) => setForm((s) => ({ ...s, ubah_status_kamar: e.target.value }))}
                  className="w-full h-10 text-sm rounded-md ring-1 ring-gray-300/70 dark:ring-gray-600/60 focus:ring-2 focus:ring-blue-500/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  {yesNoOptions.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
              <Button variant="outline" onClick={handleReset} disabled={saving}>
                Reset
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
          variants={variants.container}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          <div className="relative px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Data tersimpan</div>
              <div className="text-xs text-slate-500">{exists ? "1 setup" : "0 setup"}</div>
            </div>
          </div>

          <div className="p-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jam Minimal</TableHead>
                  <TableHead>Hari Awal</TableHead>
                  <TableHead>Fee Perujuk</TableHead>
                  <TableHead>Diagnosa Akhir</TableHead>
                  <TableHead>Gabung Bayi (%)</TableHead>
                  <TableHead>Hapus Data Salah</TableHead>
                  <TableHead>Ranap di Ralan</TableHead>
                  <TableHead>Ubah Status Kamar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence initial={false}>
                  {exists && serverData ? (
                    <motion.tr key="row" variants={variants.item} initial="hidden" animate="visible" exit="hidden">
                      <TableCell className="text-sm">{serverData.lamajam}</TableCell>
                      <TableCell className="text-sm">{serverData.hariawal}</TableCell>
                      <TableCell className="text-sm">{serverData.feeperujuk}</TableCell>
                      <TableCell className="text-sm">{serverData.diagnosaakhir}</TableCell>
                      <TableCell className="text-sm">{serverData.bayi}</TableCell>
                      <TableCell className="text-sm">{serverData.aktifkan_hapus_data_salah}</TableCell>
                      <TableCell className="text-sm">{serverData.kamar_inap_kasir_ralan}</TableCell>
                      <TableCell className="text-sm">{serverData.ubah_status_kamar}</TableCell>
                    </motion.tr>
                  ) : (
                    <motion.tr key="empty" variants={variants.item} initial="hidden" animate="visible" exit="hidden">
                      <TableCell colSpan={8} className="py-6 text-sm text-slate-500">
                        Belum ada data. Isi konfigurasi lalu klik Simpan.
                      </TableCell>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
          <div className="px-4 pb-4 flex flex-wrap items-center justify-end gap-2">
            <Button
              variant="outline"
              onClick={fetchSetting}
              disabled={loading || saving}
              className="flex items-center gap-1"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
            <Button onClick={handleSave} disabled={saving} className="flex items-center gap-1">
              <Save className="w-4 h-4" /> Simpan
            </Button>
            <Button
              variant="danger"
              onClick={() => setConfirmDeleteOpen(true)}
              disabled={!exists || saving}
              className="flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" /> Hapus
            </Button>
          </div>
        </motion.div>

        <Modal
          show={confirmDeleteOpen}
          onClose={() => setConfirmDeleteOpen(false)}
          title="Hapus Setup Kamar Inap"
          size="md"
          zIndex={10050}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5"
          headerClassName="bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50"
          titleClassName="font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
          showTopGradient
          backdropClassName="bg-black/30 backdrop-blur-sm"
        >
          <div className="space-y-4">
            <div className="text-sm text-slate-700 dark:text-slate-200">
              Setup ini dipakai sebagai konfigurasi perhitungan rawat inap. Yakin ingin menghapusnya?
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)} disabled={saving}>
                Batal
              </Button>
              <Button variant="danger" onClick={handleDelete} disabled={saving}>
                Hapus
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </LayoutUtama>
  );
}
