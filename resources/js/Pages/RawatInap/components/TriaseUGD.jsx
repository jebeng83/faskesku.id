import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { todayDateString, nowDateTimeString } from "@/tools/datetime";
import Button from "@/Components/ui/Button";
 

export default function TriaseUGD({ row = {}, onClose = () => {}, onSubmit = () => {} }) {
  const patient = useMemo(() => ({
    no_rawat: row?.no_rawat || "",
    no_rkm_medis: row?.no_rkm_medis || "",
    nm_pasien: row?.nm_pasien || row?.patient?.nm_pasien || "",
    jk: row?.jk || row?.patient?.jk || "",
    tgl_lahir: row?.tgl_lahir || row?.patient?.tgl_lahir || "",
    alamat: row?.alamat || row?.patient?.alamat || "",
  }), [row]);

  const atsDefs = useMemo(() => ([
    { key: "ATS 1", label: "ATS 1", response: "Segera (0 menit)", color: "bg-red-600", badge: "text-red-700 bg-red-50 border-red-200" },
    { key: "ATS 2", label: "ATS 2", response: "≤ 10 menit", color: "bg-orange-500", badge: "text-orange-700 bg-orange-50 border-orange-200" },
    { key: "ATS 3", label: "ATS 3", response: "≤ 30 menit", color: "bg-amber-500", badge: "text-amber-700 bg-amber-50 border-amber-200" },
    { key: "ATS 4", label: "ATS 4", response: "≤ 60 menit", color: "bg-green-500", badge: "text-green-700 bg-green-50 border-green-200" },
    { key: "ATS 5", label: "ATS 5", response: "≤ 120 menit", color: "bg-blue-500", badge: "text-blue-700 bg-blue-50 border-blue-200" },
  ]), []);

  const indicators = useMemo(() => ({
    "ATS 1": [
      "Cardiac arrest",
      "Respiratory arrest",
      "Airway problem",
      "RR < 10",
      "TD < 80",
      "GCS < 9",
      "Kejang prolong",
      "Overdosis dengan hipoventilasi",
    ],
    "ATS 2": [
      "Gangguan airway berat",
      "Distres respiratori berat",
      "Perfusi buruk HR < 50 atau > 150",
      "Hipotensi",
      "Kehilangan darah banyak",
      "Chest pain",
      "Suspect sepsis",
      "Neutropenia",
      "GCS < 13",
      "Stroke akut",
      "Demam dengan letargi",
      "Trauma asam basa",
      "Multiple trauma",
      "Fraktur mayor",
      "Torsi testis",
      "Psikiatri agresif",
    ],
    "ATS 3": [
      "Krisis hipertensi",
      "Kehilangan darah sedang",
      "Kejang",
      "Nyeri kepala persisten",
      "Dehidrasi",
      "Nyeri kepala ringan",
      "Suspect sepsis (tanda vital stabil)",
      "Toraks non cardiac",
      "Cedera ekstremitas",
      "Sefal hematoma",
      "Risiko melukai diri",
    ],
    "ATS 4": [
      "Perdarahan ringan",
      "Aspirasi benda asing tanpa distres",
      "Trauma dada tanpa cedera rusuk",
      "Kesulitan menelan",
      "Luka kecil di kepala",
      "Nyeri ringan",
      "Muntah atau diare tanpa dehidrasi",
      "Inflamasi mata benda asing",
      "Luka ekstremitas ringan",
      "Nyeri perut tidak spesifik",
      "Psikiatri gangguan mental tidak urgent",
    ],
    "ATS 5": [
      "Nyeri minimal",
      "Tidak ada riwayat sebelumnya",
      "Gejala minor",
      "Luka kecil abrasio",
      "Luka terbuka tanpa jahitan",
      "Kontrol ulang jahitan",
      "Imunisasi",
      "Psikiatri kronis klinis baik",
    ],
  }), []);

  const initial = useMemo(() => ({
    tanggal: todayDateString(),
    jam: nowDateTimeString().split(" ")[1].substring(0, 5),
    kategori: "ATS 3",
    indikator: [],
    keputusan: "Prioritas",
    catatan: "",
  }), []);

  const [form, setForm] = useState(initial);
  const canSubmit = useMemo(() => Boolean(String(patient?.no_rawat || '').trim()), [patient?.no_rawat]);

  const chosenDef = useMemo(() => atsDefs.find((d) => d.key === form.kategori) || atsDefs[2], [form.kategori, atsDefs]);

  const recommendKategori = (selected) => {
    if (selected.some((s) => indicators["ATS 1"].includes(s))) return "ATS 1";
    if (selected.some((s) => indicators["ATS 2"].includes(s))) return "ATS 2";
    if (selected.some((s) => indicators["ATS 3"].includes(s))) return "ATS 3";
    if (selected.some((s) => indicators["ATS 4"].includes(s))) return "ATS 4";
    if (selected.length) return "ATS 5";
    return form.kategori;
  };

  const mapKeputusan = (kat) => {
    if (kat === "ATS 1") return "UGD";
    if (kat === "ATS 2") return "Prioritas";
    if (kat === "ATS 3") return "Prioritas";
    return "Sesuai Antrian";
  };

  const handleIndicatorToggle = (opt) => {
    setForm((prev) => {
      const exists = prev.indikator.includes(opt);
      const next = exists ? prev.indikator.filter((o) => o !== opt) : [...prev.indikator, opt];
      const rk = recommendKategori(next);
      return { ...prev, indikator: next, kategori: rk, keputusan: mapKeputusan(rk) };
    });
  };

  const badgeCls = (d) => `inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${d.badge}`;
  const btnCls = (active) => active
    ? "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-2 ring-blue-200"
    : "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-xs text-gray-700 dark:text-gray-300";

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      no_rawat: patient.no_rawat,
      no_rkm_medis: patient.no_rkm_medis,
      tanggal: form.tanggal,
      jam: form.jam,
      kategori: form.kategori,
      indikator: form.indikator,
      keputusan: form.keputusan,
      catatan: form.catatan,
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
      <div className="relative p-6">
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <motion.div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} />
            <div>
              <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-900 to-gray-700 dark:from-white dark:via-white dark:to-gray-300">Triase UGD (ATS)</h3>
              <div className="text-xs text-gray-600 dark:text-gray-400">{patient?.nm_pasien}</div>
            </div>
          </div>
          <Button onClick={onClose} size="sm" className="text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">Tutup</Button>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
            <div className="rounded-xl border border-white/30 dark:border-gray-700/50 bg-white/60 dark:bg-gray-900/30 p-4 h-full">
              <div className="text-[10px] font-medium text-gray-700 dark:text-gray-300 mb-2">Identitas Pasien</div>
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1">
                  <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-1">
                    <div className="text-[11px] text-gray-700 dark:text-gray-300">No. Rawat</div>
                    <div className="text-[11px] text-gray-400">:</div>
                    <div className="text-[11px] text-gray-900 dark:text-gray-100 font-medium">{patient?.no_rawat || '-'}</div>
                  </div>
                  <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-1">
                    <div className="text-[11px] text-gray-700 dark:text-gray-300">No. RM</div>
                    <div className="text-[11px] text-gray-400">:</div>
                    <div className="text-[11px] text-gray-900 dark:text-gray-100 font-medium">{patient?.no_rkm_medis || '-'}</div>
                  </div>
                  <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-1">
                    <div className="text-[11px] text-gray-700 dark:text-gray-300">Nama</div>
                    <div className="text-[11px] text-gray-400">:</div>
                    <div className="text-[11px] text-gray-900 dark:text-gray-100 font-medium">{patient?.nm_pasien || '-'}</div>
                  </div>
                  <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-1">
                    <div className="text-[11px] text-gray-700 dark:text-gray-300">JK</div>
                    <div className="text-[11px] text-gray-400">:</div>
                    <div className="text-[11px] text-gray-900 dark:text-gray-100 font-medium">{patient?.jk || '-'}</div>
                  </div>
                  <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-1">
                    <div className="text-[11px] text-gray-700 dark:text-gray-300">Tanggal Skrining</div>
                    <div className="text-[11px] text-gray-400">:</div>
                    <div className="text-[11px] text-gray-900 dark:text-gray-100 font-medium">{form.tanggal}</div>
                  </div>
                  <div className="grid grid-cols-[8rem_0.75rem_1fr] items-baseline gap-1">
                    <div className="text-[11px] text-gray-700 dark:text-gray-300">Jam Skrining</div>
                    <div className="text-[11px] text-gray-400">:</div>
                    <div className="text-[11px] text-gray-900 dark:text-gray-100 font-medium">{form.jam}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/30 dark:border-gray-700/50 bg-white/60 dark:bg-gray-900/30 p-4 h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${chosenDef.color} shadow-lg shadow-blue-500/25`} />
                  <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100">Kategori {form.kategori}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Respon: {chosenDef.response}</div>
                  </div>
                </div>
                <span className={badgeCls(chosenDef)}>{form.kategori}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Kategori ATS :</label>
              <select
                name="kategori"
                value={form.kategori}
                onChange={(e) => setForm((p) => ({ ...p, kategori: e.target.value, keputusan: mapKeputusan(e.target.value) }))}
                className="flex-1 px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
              >
                {atsDefs.map((d) => (
                  <option key={d.key} value={d.key}>{d.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Keputusan :</label>
              <select
                name="keputusan"
                value={form.keputusan}
                onChange={(e) => setForm((p) => ({ ...p, keputusan: e.target.value }))}
                className="flex-1 px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
              >
                <option value="Sesuai Antrian">Sesuai Antrian</option>
                <option value="Prioritas">Prioritas</option>
                <option value="UGD">UGD</option>
              </select>
            </div>
          </div>

          <div>
            <div className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Indikator Klinis</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(indicators).map(([kat, opts]) => {
                const def = atsDefs.find((d) => d.key === kat);
                return (
                  <div key={kat} className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[11px] font-medium text-gray-700 dark:text-gray-300">{kat}</div>
                      {def ? <span className={badgeCls(def)}>{def.label}</span> : null}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {opts.map((opt) => {
                        const active = form.indikator.includes(opt);
                        return (
                          <button key={opt} type="button" className={btnCls(active)} onClick={() => handleIndicatorToggle(opt)} aria-pressed={active}>
                            <span className="text-[11px]">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_15%] gap-3 items-start">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Catatan</label>
              <input
                type="text"
                name="catatan"
                value={form.catatan}
                onChange={(e) => setForm((p) => ({ ...p, catatan: e.target.value }))}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Respon</label>
              <input
                type="text"
                name="respon"
                readOnly
                value={chosenDef.response}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button type="button" onClick={onClose} variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">Batal</Button>
            <Button type="submit" disabled={!canSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white">Simpan Triase</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
