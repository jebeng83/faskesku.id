import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Head, router, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import CanvasAskep from "@/Pages/IGD/Canvas_Askep";
import ResponsiveTable from "@/Components/ResponsiveTable";
import _ActionDropdown from "@/Components/ActionDropdown";
import ConfirmationAlert from "@/Components/ConfirmationAlert";
import Modal from "@/Components/Modal";
import { Button, Input, Label, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Textarea } from "@/Components/ui";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import efekEnakMd from "../../../../docs/Efekenak.md?raw";
import DataAlergi from "@/Alergi/DataAlergi";
import { Plus } from "lucide-react";

export default function AsuhanKeperawatanPage({ items, filters, editing }) {
  const [q, _setQ] = useState(filters?.q || "");
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(!!editing);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);
  const [noRawat, setNoRawat] = useState("");
  const [selectedSection, setSelectedSection] = useState("keluhan-utama");
  const [docOpen, setDocOpen] = useState(false);
  const [alergiModalOpen, setAlergiModalOpen] = useState(false);
  const [dataAlergi, setDataAlergi] = useState([]);

  useEffect(() => {
    setEditOpen(!!editing);
  }, [editing]);

  useEffect(() => {
    try {
      const searchParam = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("q") : "";
      const normalized = String(searchParam || q || "").trim();
      setNoRawat(normalized);
      if (!normalized) {
        setPatientInfo(null);
        return;
      }
      let cancelled = false;
      const fetch = async () => {
        try {
          const resp = await axios.get("/api/reg-periksa/by-rawat", {
            params: { no_rawat: normalized },
            withCredentials: true,
            headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
          });
          if (cancelled) return;
          const data = resp?.data?.data || null;
          const patient = data?.patient || null;
          const dokterName = data?.dokter?.nm_dokter || null;
          const enriched = patient ? { ...patient, nm_dokter: dokterName || undefined } : null;
          setPatientInfo(enriched);
        } catch {
          if (!cancelled) setPatientInfo(null);
        }
      };
      fetch();
      return () => {
        cancelled = true;
      };
    } catch {
      setPatientInfo(null);
    }
  }, [q]);

  const formatLocalDateTime = (d) => {
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
  };
  const nowLocalDateTime = formatLocalDateTime(new Date());

  const { data, setData, post, put, processing, errors, reset: _reset } = useForm({
    no_rawat: editing?.no_rawat || "",
    no_rkm_medis: editing?.no_rkm_medis || "",
    nip_perawat: editing?.nip_perawat || "",
    ruangan: editing?.ruangan || "",
    tgl_pengkajian: editing?.tgl_pengkajian || nowLocalDateTime,
    jenis_pengkajian: editing?.jenis_pengkajian || "Awal",
    keluhan_utama: editing?.keluhan_utama || "",
    evaluasi_hasil: editing?.evaluasi_hasil || "",
    evaluasi_status: editing?.evaluasi_status || "",
    evaluator_nip: editing?.evaluator_nip || "",
    catatan_khusus: editing?.catatan_khusus || "",
    
    riwayat_penyakit_sekarang: editing?.riwayat_penyakit_sekarang || "",
    provokatif_palliatif: editing?.provokatif_palliatif || "",
    kualitas_gejala: editing?.kualitas_gejala || "",
    region_radiasi: editing?.region_radiasi || "",
    severity_gejala: editing?.severity_gejala || "",
    
    riwayat_penyakit_kronis: editing?.riwayat_penyakit_kronis || "Tidak Ada",
    riwayat_operasi: editing?.riwayat_operasi || "Belum pernah Operasi",
    riwayat_rawat_inap: editing?.riwayat_rawat_inap || "Tidak Ada",
    riwayat_trauma: editing?.riwayat_trauma || "Tidak Ada",
    riwayat_transfusi: editing?.riwayat_transfusi || "Tidak Ada",
    tgl_transfusi_terakhir: editing?.tgl_transfusi_terakhir || "",
    pengobatan_rutin: editing?.pengobatan_rutin || "Tidak",
    pengobatan_herbal_suplemen: editing?.pengobatan_herbal_suplemen || "Tidak Ada",
    riwayat_alergi_obat: editing?.riwayat_alergi_obat || "Tidak Ada",
    reaksi_alergi: editing?.reaksi_alergi || "Tidak Ada",
    riwayat_alergi_makanan: editing?.riwayat_alergi_makanan || "Tidak Ada",
    riwayat_alergi_lainnya: editing?.riwayat_alergi_lainnya || "Tidak Ada",
    riwayat_keluarga_penyakit_kardiovaskular: editing?.riwayat_keluarga_penyakit_kardiovaskular || "Tidak Ada",
    riwayat_keluarga_diabetes: editing?.riwayat_keluarga_diabetes || "Tidak Ada",
    riwayat_keluarga_kanker: editing?.riwayat_keluarga_kanker || "Tidak Ada",
    riwayat_keluarga_hipertensi: editing?.riwayat_keluarga_hipertensi || "Tidak Ada",
    riwayat_keluarga_penyakit_mental: editing?.riwayat_keluarga_penyakit_mental || "Tidak Ada",
    riwayat_keluarga_penyakit_genetik: editing?.riwayat_keluarga_penyakit_genetik || "Tidak Ada",
    genogram_data: editing?.genogram_data ? JSON.stringify(editing.genogram_data) : "",
    genogram_path: editing?.genogram_path || "",
    genogram_deskripsi: editing?.genogram_deskripsi || "",
    genogram_keluarga_inti: editing?.genogram_keluarga_inti || "",
    genogram_hubungan_keluarga: editing?.genogram_hubungan_keluarga || "",
    lingkungan_tinggal: editing?.lingkungan_tinggal || "Rumah sendiri",
    kondisi_lingkungan: editing?.kondisi_lingkungan || "",
    akses_air_bersih: editing?.akses_air_bersih || "Ya",
    sanitasi: editing?.sanitasi || "MCK sendiri",
    paparan_polusi: editing?.paparan_polusi || "Tidak",
    paparan_bahan_berbahaya: editing?.paparan_bahan_berbahaya || "Tidak Ada",
    pekerjaan_terakhir: editing?.pekerjaan_terakhir || "Swasta",
    lingkungan_kerja: editing?.lingkungan_kerja || "Baik",
    lama_kerja: editing?.lama_kerja || "0",
    status_ekonomi: editing?.status_ekonomi || "Cukup",
    stresor_psikososial: editing?.stresor_psikososial || "",
    dukungan_sosial_tersedia: editing?.dukungan_sosial_tersedia || "",
    kebiasaan_menetap: editing?.kebiasaan_menetap || "",
    riwayat_kehamilan_ibu: editing?.riwayat_kehamilan_ibu || "",
    riwayat_persalinan_ibu: editing?.riwayat_persalinan_ibu || "",
    riwayat_imunisasi: editing?.riwayat_imunisasi || "",
    milestone_perkembangan: editing?.milestone_perkembangan || "",
    persepsi_kesehatan: editing?.persepsi_kesehatan || "",
    keb_olahraga_frekuensi: editing?.keb_olahraga_frekuensi || "Tidak pernah",
    keb_olahraga_jenis: editing?.keb_olahraga_jenis || "",
    cek_kesehatan_rutin: !!editing?.cek_kesehatan_rutin,
    penggunaan_obat: editing?.penggunaan_obat || "",
    penggunaan_rokok: editing?.penggunaan_rokok || "Tidak",
    penggunaan_alkohol: editing?.penggunaan_alkohol || "Tidak",
    zat_adiktif_lainnya: editing?.zat_adiktif_lainnya || "",
    pola_makan_harian: editing?.pola_makan_harian || "",
    nafsu_makan: editing?.nafsu_makan || "Baik",
    kesulitan_mengunyah: !!editing?.kesulitan_mengunyah,
    alergi_makanan: editing?.alergi_makanan || "",
    bb_sebelum: editing?.bb_sebelum ?? "",
    bb_sekarang: editing?.bb_sekarang ?? "",
    perubahan_bb_6bln: editing?.perubahan_bb_6bln ?? "",
    mual_muntah: !!editing?.mual_muntah,
    diare: !!editing?.diare,
    konstipasi: !!editing?.konstipasi,
    kebiasaan_minum_perhari: editing?.kebiasaan_minum_perhari ?? "",
    suplemen_vitamin: editing?.suplemen_vitamin || "",
    eliminasi_bak_frekuensi: editing?.eliminasi_bak_frekuensi ?? "",
    eliminasi_bak_warna: editing?.eliminasi_bak_warna || "",
    eliminasi_bak_jumlah: editing?.eliminasi_bak_jumlah ?? "",
    keluhan_bak: editing?.keluhan_bak || "",
    eliminasi_bab_frekuensi: editing?.eliminasi_bab_frekuensi ?? "",
    eliminasi_bab_konsistensi: editing?.eliminasi_bab_konsistensi || "Padat",
    eliminasi_bab_warna: editing?.eliminasi_bab_warna || "",
    keluhan_bab: editing?.keluhan_bab || "",
    keringat: editing?.keringat || "Normal",
    aktivitas_sebelum_sakit: editing?.aktivitas_sebelum_sakit || "",
    mobilitas: editing?.mobilitas || "Mandiri",
    kendala_aktivitas: editing?.kendala_aktivitas || "",
    jam_tidur_mulai: editing?.jam_tidur_mulai || "",
    jam_tidur_bangun: editing?.jam_tidur_bangun || "",
    kualitas_tidur: editing?.kualitas_tidur || "Nyenyak",
    adl_makan: editing?.adl_makan || "Mandiri",
    adl_mandi: editing?.adl_mandi || "Mandiri",
    adl_berpakaian: editing?.adl_berpakaian || "Mandiri",
    adl_toileting: editing?.adl_toileting || "Mandiri",
    tidur_siang_durasi: editing?.tidur_siang_durasi ?? "",
    kesulitan_tidur: !!editing?.kesulitan_tidur,
    faktor_pengganggu_tidur: editing?.faktor_pengganggu_tidur || "",
    perasaan_bangun: editing?.perasaan_bangun || "Segar",
    obat_bantu_tidur: !!editing?.obat_bantu_tidur,
    kebiasaan_sebelum_tidur: editing?.kebiasaan_sebelum_tidur || "",
    kesadaran: editing?.kesadaran || "Compos mentis",
    orientasi_orang: editing?.orientasi_orang ?? true,
    orientasi_tempat: editing?.orientasi_tempat ?? true,
    orientasi_waktu: editing?.orientasi_waktu ?? true,
    memori_jpendek: editing?.memori_jpendek || "Baik",
    memori_jpanjang: editing?.memori_jpanjang || "Baik",
    pengambilan_keputusan: editing?.pengambilan_keputusan || "Baik",
    pengetahuan_penyakit: editing?.pengetahuan_penyakit || "Baik",
    penglihatan: editing?.penglihatan || "Normal",
    pendengaran: editing?.pendengaran || "Normal",
    penciuman: editing?.penciuman || "Normal",
    pengecapan: editing?.pengecapan || "Normal",
    peraba: editing?.peraba || "Normal",
    perasaan_diri: editing?.perasaan_diri || "",
    citra_tubuh: editing?.citra_tubuh || "",
    harga_diri: editing?.harga_diri || "Baik",
    perasaan_cemas: !!editing?.perasaan_cemas,
    perasaan_takut: !!editing?.perasaan_takut,
    perasaan_sedih: !!editing?.perasaan_sedih,
    perasaan_marah: !!editing?.perasaan_marah,
    mekanisme_koping: editing?.mekanisme_koping || "",
    harapan_masa_depan: editing?.harapan_masa_depan || "",
    status_perkawinan: editing?.status_perkawinan || "Belum menikah",
    jumlah_anak: editing?.jumlah_anak ?? 0,
    hubungan_keluarga: editing?.hubungan_keluarga || "Harmonis",
    hubungan_teman: editing?.hubungan_teman || "",
    peran_di_keluarga: editing?.peran_di_keluarga || "",
    peran_di_masyarakat: editing?.peran_di_masyarakat || "",
    dukungan_sosial: editing?.dukungan_sosial || "",
    kebiasaan_komunikasi: editing?.kebiasaan_komunikasi || "",
    menarche_usia: editing?.menarche_usia ?? "",
    siklus_haid_hari: editing?.siklus_haid_hari ?? "",
    lama_haid_hari: editing?.lama_haid_hari ?? "",
    pms: !!editing?.pms,
    menopause_usia: editing?.menopause_usia ?? "",
    riwayat_kehamilan: editing?.riwayat_kehamilan || "",
    kontrasepsi: editing?.kontrasepsi || "",
    masalah_seksual: editing?.masalah_seksual || "",
    kepuasan_seksual: editing?.kepuasan_seksual || "Puas",
    riwayat_ims: !!editing?.riwayat_ims,
    sumber_stres: editing?.sumber_stres || "",
    tanda_stres_fisik: editing?.tanda_stres_fisik || "",
    tanda_stres_emosional: editing?.tanda_stres_emosional || "",
    mekanisme_koping_stres: editing?.mekanisme_koping_stres || "",
    efektivitas_koping: editing?.efektivitas_koping || "Efektif",
    dukungan_diinginkan: editing?.dukungan_diinginkan || "",
    pengalaman_stres: editing?.pengalaman_stres || "",
    keyakinan_agama: editing?.keyakinan_agama || "",
    aktivitas_ibadah: editing?.aktivitas_ibadah || "",
    sumber_kekuatan_spiritual: editing?.sumber_kekuatan_spiritual || "",
    nilai_kehidupan: editing?.nilai_kehidupan || "",
    hubungan_keyakinan_kesehatan: editing?.hubungan_keyakinan_kesehatan || "",
    kepercayaan_budaya: editing?.kepercayaan_budaya || "",
    praktik_tradisional: editing?.praktik_tradisional || "",
    td_sistolik: editing?.td_sistolik ?? "",
    td_diastolik: editing?.td_diastolik ?? "",
    nadi: editing?.nadi ?? "",
    rr: editing?.rr ?? "",
    suhu: editing?.suhu ?? "",
    nyeri_skala: editing?.nyeri_skala ?? "",
    nyeri_lokasi: editing?.nyeri_lokasi || "",
    fisik_head_to_toe: editing?.fisik_head_to_toe || "",
    tinggi_badan: editing?.tinggi_badan ?? "",
    berat_badan: editing?.berat_badan ?? "",
    imt: editing?.imt ?? "",
    lingkar_lengan: editing?.lingkar_lengan ?? "",
    skor_nyeri_total: editing?.skor_nyeri_total ?? "",
    skor_risiko_jatuh: editing?.skor_risiko_jatuh || "Rendah",
    skor_braden: editing?.skor_braden ?? "",
    skor_norton: editing?.skor_norton ?? "",
    skor_glasgow: editing?.skor_glasgow ?? "",
    tanda_tanda_vital_lain: editing?.tanda_tanda_vital_lain || "",
    diagnosa1_kode_sdki: editing?.diagnosa1_kode_sdki || "",
    diagnosa1_label: editing?.diagnosa1_label || "",
    diagnosa1_etiologi: editing?.diagnosa1_etiologi || "",
    diagnosa1_gejala: editing?.diagnosa1_gejala || "",
    diagnosa2_kode_sdki: editing?.diagnosa2_kode_sdki || "",
    diagnosa2_label: editing?.diagnosa2_label || "",
    diagnosa2_etiologi: editing?.diagnosa2_etiologi || "",
    diagnosa2_gejala: editing?.diagnosa2_gejala || "",
    diagnosa3_kode_sdki: editing?.diagnosa3_kode_sdki || "",
    diagnosa3_label: editing?.diagnosa3_label || "",
    diagnosa3_etiologi: editing?.diagnosa3_etiologi || "",
    diagnosa3_gejala: editing?.diagnosa3_gejala || "",
    tujuan1_kode_slki: editing?.tujuan1_kode_slki || "",
    tujuan1_label: editing?.tujuan1_label || "",
    tujuan1_kriteria: editing?.tujuan1_kriteria || "",
    tujuan1_target_tgl: editing?.tujuan1_target_tgl || "",
    tujuan2_kode_slki: editing?.tujuan2_kode_slki || "",
    tujuan2_label: editing?.tujuan2_label || "",
    tujuan2_kriteria: editing?.tujuan2_kriteria || "",
    tujuan2_target_tgl: editing?.tujuan2_target_tgl || "",
    intervensi1_kode_siki: editing?.intervensi1_kode_siki || "",
    intervensi1_label: editing?.intervensi1_label || "",
    intervensi1_aktivitas: editing?.intervensi1_aktivitas || "",
    intervensi1_rasional: editing?.intervensi1_rasional || "",
    intervensi2_kode_siki: editing?.intervensi2_kode_siki || "",
    intervensi2_label: editing?.intervensi2_label || "",
    intervensi2_aktivitas: editing?.intervensi2_aktivitas || "",
    intervensi2_rasional: editing?.intervensi2_rasional || "",
    intervensi3_kode_siki: editing?.intervensi3_kode_siki || "",
    intervensi3_label: editing?.intervensi3_label || "",
    intervensi3_aktivitas: editing?.intervensi3_aktivitas || "",
    intervensi3_rasional: editing?.intervensi3_rasional || "",
    evaluasi_tgl: editing?.evaluasi_tgl || nowLocalDateTime,
    status_rekam: editing?.status_rekam || "Aktif",
    asal_rujukan: editing?.asal_rujukan || "",
    tujuan_rujukan: editing?.tujuan_rujukan || "",
  });

  

  useEffect(() => {
    let cancelled = false;
    axios
      .get("/api/alergi", {
        params: { per_page: 100 },
        withCredentials: true,
        headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
      })
      .then((resp) => {
        if (cancelled) return;
        const items = Array.isArray(resp?.data?.data) ? resp.data.data : [];
        setDataAlergi(items);
      })
      .catch(() => {
        if (!cancelled) setDataAlergi([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const _painEmoji = (v) => {
    const n = Number(v) || 0;
    if (n <= 0) return "😀";
    if (n <= 3) return "🙂";
    if (n <= 5) return "😐";
    if (n <= 7) return "😕";
    if (n <= 9) return "😢";
    return "😭";
  };

  

  

  const submitCreate = (e) => {
    e.preventDefault();
    post(route("igd.asuhan-keperawatan.store"), {
      onSuccess: () => {
        setCreateOpen(false);
        router.visit(route("igd.asuhan-keperawatan.index"));
      },
    });
  };

  const submitEdit = (e) => {
    e.preventDefault();
    if (!editing?.no_rawat) return;
    put(route("igd.asuhan-keperawatan.update", editing.no_rawat), {
      onSuccess: () => {
        setEditOpen(false);
        router.visit(route("igd.asuhan-keperawatan.index"));
      },
    });
  };

  const simpanOrUpdate = () => {
    if (processing) return;
    if (editing?.no_rawat) {
      put(route("igd.asuhan-keperawatan.update", editing.no_rawat), {
        onSuccess: () => {
          setEditOpen(false);
          router.visit(route("igd.asuhan-keperawatan.index"));
        },
      });
    } else {
      post(route("igd.asuhan-keperawatan.store"), {
        onSuccess: () => {
          setCreateOpen(false);
          router.visit(route("igd.asuhan-keperawatan.index"));
        },
      });
    }
  };

  const _requestDelete = (row) => {
    setToDelete(row);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!toDelete?.no_rawat) return;
    router.delete(route("igd.asuhan-keperawatan.destroy", toDelete.no_rawat), {
      onSuccess: () => {
        setConfirmOpen(false);
        setToDelete(null);
        router.visit(route("igd.asuhan-keperawatan.index"));
      },
      onFinish: () => {
        setConfirmOpen(false);
        setToDelete(null);
      },
    });
  };

  const columns = useMemo(() => [], []);

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const list = Array.isArray(items?.data) ? items.data : [];
  

  const leftMenu = (
    <div className="space-y-2 text-xs">
      <div>
        <button type="button" className="text-xs font-semibold w-full text-left" onClick={() => setSelectedSection('rk-all')}>II. Riwayat Keperawatan</button>
      </div>
      <div>
        <div className="text-xs font-semibold">III. Pengkajian Pola Kesehatan Fungsional (Gordon)</div>
        <div className="mt-2 space-y-1">
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='riwayat-psikososial' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('riwayat-psikososial')}>1. Riwayat Psikososial</button>
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='riwayat-perkembangan' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('riwayat-perkembangan')}>2. Riwayat Perkembangan (Anak)</button>
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='pola-persepsi-pemeliharaan' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('pola-persepsi-pemeliharaan')}>3. Pola Persepsi-Pemeliharaan Kesehatan</button>
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='pola-nutrisi' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('pola-nutrisi')}>4. Pola Nutrisi-Metabolik</button>
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='pola-eliminasi' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('pola-eliminasi')}>5. Pola Eliminasi</button>
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='pola-aktivitas' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('pola-aktivitas')}>6. Pola Aktivitas-Latihan</button>
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='pola-tidur' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('pola-tidur')}>7. Pola Tidur-Istirahat</button>
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='pola-kognitif' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('pola-kognitif')}>8. Pola Kognitif-Perseptual</button>
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='pola-persepsi-diri' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('pola-persepsi-diri')}>9. Pola Persepsi Diri-Konsep Diri</button>
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='pola-peran-hubungan' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('pola-peran-hubungan')}>10. Pola Peran-Hubungan</button>
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='pola-seksual' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('pola-seksual')}>11. Pola Seksual-Reproduksi</button>
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='pola-koping' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('pola-koping')}>12. Pola Koping-Toleransi Stres</button>
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='pola-nilai-keyakinan' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('pola-nilai-keyakinan')}>13. Pola Nilai-Keyakinan</button>
        </div>
      </div>
      <div>
        <div className="text-xs font-semibold">IV. Diagnosis Keperawatan (SDKI)</div>
        <div className="mt-2">
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='diagnosis' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('diagnosis')}>Buka Diagnosis Keperawatan</button>
        </div>
      </div>
      <div>
        <div className="text-xs font-semibold">V. Tujuan (SLKI)</div>
        <div className="mt-2">
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='tujuan' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('tujuan')}>Buka Tujuan</button>
        </div>
      </div>
      <div>
        <div className="text-xs font-semibold">VI. Intervensi (SIKI)</div>
        <div className="mt-2">
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='intervensi' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('intervensi')}>Buka Intervensi</button>
        </div>
      </div>
      <div>
        <div className="text-xs font-semibold">VII. Evaluasi & Monitoring</div>
        <div className="mt-2">
          <button type="button" className={`w-full text-left px-3 py-1.5 rounded-md border ${selectedSection==='evaluasi-monitoring' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} onClick={() => setSelectedSection('evaluasi-monitoring')}>Buka Evaluasi & Monitoring</button>
        </div>
      </div>
    </div>
  );
  return (
    <CanvasAskep patient={patientInfo || {}} no_rawat={noRawat} leftMenu={leftMenu}>
      <Head title="Pengkajian Kebutuhan Dasar Manusia" />

      <div className="space-y-6">
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
          <div className="relative px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-700/80 dark:via-gray-700/80 dark:to-gray-700/80 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Pengkajian Kebutuhan Dasar Manusia</h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-12 space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label required>Jenis Pengkajian</Label>
                  <Select value={String(data.jenis_pengkajian)} onValueChange={(v) => setData("jenis_pengkajian", v)}>
                    <SelectTrigger className="w-full px-1.5 py-0.5 text-xs"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Awal">Awal</SelectItem>
                      <SelectItem value="Berkelanjutan">Berkelanjutan</SelectItem>
                      <SelectItem value="Rujukan">Rujukan</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="mt-1 h-px bg-gray-200" />
                </div>
                <div>
                  <Label>Status Rekam</Label>
                  <Select value={String(data.status_rekam)} onValueChange={(v) => setData("status_rekam", v)}>
                    <SelectTrigger className="w-full px-2 py-1.5 text-sm"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aktif">Aktif</SelectItem>
                      <SelectItem value="Arsip">Arsip</SelectItem>
                      <SelectItem value="Dihapus">Dihapus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tgl Evaluasi</Label>
                  <Input className="px-2 py-1.5 text-sm" type="datetime-local" value={data.evaluasi_tgl} onChange={(e) => setData("evaluasi_tgl", e.target.value)} />
                </div>
                <div>
                  <Label>Tgl Pengkajian</Label>
                  <Input className="px-2 py-1.5 text-sm" type="datetime-local" value={data.tgl_pengkajian} onChange={(e) => setData("tgl_pengkajian", e.target.value)} />
                </div>
              </div>
            </div>
            <div className={`space-y-3 ${selectedSection==='rk-all' || selectedSection==='keluhan-utama' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-base font-semibold">Keluhan Utama & Alasan Masuk</h3>
                  <Textarea rows={3} value={data.keluhan_utama} onChange={(e) => setData("keluhan_utama", e.target.value)} />
                </div>
                <div>
                  <h3 className="text-base font-semibold">Riwayat Penyakit Sekarang (PQRST)</h3>
                  <Textarea rows={3} value={data.riwayat_penyakit_sekarang} onChange={(e) => setData("riwayat_penyakit_sekarang", e.target.value)} />
                </div>
              </div>
              
              
            </div>

            <div className={`space-y-3 ${selectedSection==='rk-all' || selectedSection==='pqrst' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <Label>Yang Memperburuk Nyeri?</Label>
                  <Select value={String(data.provokatif_palliatif)} onValueChange={(v) => setData("provokatif_palliatif", v)}>
                    <SelectTrigger className="w-full px-2 py-1.5 text-sm"><SelectValue placeholder="Tidak Ada" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tidak Ada">Tidak Ada</SelectItem>
                      <SelectItem value="Berjalan/aktivitas">Berjalan/aktivitas</SelectItem>
                      <SelectItem value="Naik tangga">Naik tangga</SelectItem>
                      <SelectItem value="Mengangkat beban">Mengangkat beban</SelectItem>
                      <SelectItem value="Membungkuk">Membungkuk</SelectItem>
                      <SelectItem value="Rotasi tubuh">Rotasi tubuh</SelectItem>
                      <SelectItem value="Batuk/bersin">Batuk/bersin</SelectItem>
                      <SelectItem value="Berbaring telentang">Berbaring telentang</SelectItem>
                      <SelectItem value="Berdiri lama">Berdiri lama</SelectItem>
                      <SelectItem value="Duduk lama">Duduk lama</SelectItem>
                      <SelectItem value="Makanan pedas/berlemak">Makanan pedas/berlemak</SelectItem>
                      <SelectItem value="Minum kopi/alkohol">Minum kopi/alkohol</SelectItem>
                      <SelectItem value="Makanan asam">Makanan asam</SelectItem>
                      <SelectItem value="Stres emosional">Stres emosional</SelectItem>
                      <SelectItem value="Cuaca dingin">Cuaca dingin</SelectItem>
                      <SelectItem value="Suara bising">Suara bising</SelectItem>
                      <SelectItem value="Cahaya terang">Cahaya terang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Bagaimana rasanya?</Label>
                  <Select value={String(data.kualitas_gejala)} onValueChange={(v) => setData("kualitas_gejala", v)}>
                    <SelectTrigger className="w-full px-2 py-1.5 text-sm"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tidak Ada Nyeri">Tidak Ada Nyeri</SelectItem>
                      <SelectItem value="Seperti Tertusuk">Seperti Tertusuk</SelectItem>
                      <SelectItem value="Berdenyut">Berdenyut</SelectItem>
                      <SelectItem value="Teriris">Teriris</SelectItem>
                      <SelectItem value="Tertindih">Tertindih</SelectItem>
                      <SelectItem value="Tertiban">Tertiban</SelectItem>
                      <SelectItem value="Lain-lain">Lain-lain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Dimana lokasinya? Apakah menyebar?</Label>
                  <Select value={String(data.region_radiasi)} onValueChange={(v) => setData("region_radiasi", v)}>
                    <SelectTrigger className="w-full px-2 py-1.5 text-sm"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tidak Ada Nyeri">Tidak Ada Nyeri</SelectItem>   
                      <SelectItem value="Dada kiri, belakang tulang dada">Dada kiri, belakang tulang dada</SelectItem>
                      <SelectItem value="Ulu hati, dada tengah">Ulu hati, dada tengah</SelectItem>
                      <SelectItem value="Satu sisi kepala">Satu sisi kepala</SelectItem>
                      <SelectItem value="Pinggang kanan/kiri">Pinggang kanan/kiri</SelectItem>
                      <SelectItem value="Punggung bawah">Punggung bawah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Skala 0-10</Label>
                  <Select value={String(data.severity_gejala)} onValueChange={(v) => setData("severity_gejala", v)}>
                    <SelectTrigger className="w-full px-2 py-1.5 text-sm"><SelectValue placeholder="0" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="9">9</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='rk-all' || selectedSection==='riwayat-dahulu' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Riwayat Penyakit Dahulu</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Penyakit Kronis</Label>
                  <Textarea rows={2} value={data.riwayat_penyakit_kronis} onChange={(e) => setData("riwayat_penyakit_kronis", e.target.value)} />
                </div>
                <div>
                  <Label>Operasi</Label>
                  <Textarea rows={2} placeholder="Tidak Ada" value={data.riwayat_operasi} onChange={(e) => setData("riwayat_operasi", e.target.value)} />
                </div>
                <div>
                  <Label>Rawat Inap</Label>
                  <Textarea rows={2} placeholder="Tidak Ada" value={data.riwayat_rawat_inap} onChange={(e) => setData("riwayat_rawat_inap", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Trauma</Label>
                  <Textarea rows={2} value={data.riwayat_trauma} onChange={(e) => setData("riwayat_trauma", e.target.value)} />
                </div>
                <div>
                  <Label>Riwayat Transfusi</Label>
                  <Select value={String(data.riwayat_transfusi)} onValueChange={(v) => setData("riwayat_transfusi", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ya">Ya</SelectItem>
                      <SelectItem value="Tidak">Tidak</SelectItem>
                      <SelectItem value="Tidak Tahu">Tidak Tahu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tgl Transfusi Terakhir</Label>
                  <Input type="date" value={data.tgl_transfusi_terakhir} onChange={(e) => setData("tgl_transfusi_terakhir", e.target.value)} />
                </div>
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='rk-all' || selectedSection==='pengobatan-alergi' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Pengobatan & Alergi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Pengobatan Rutin</Label>
                  <Textarea rows={2} value={data.pengobatan_rutin} onChange={(e) => setData("pengobatan_rutin", e.target.value)} />
                </div>
                <div>
                  <Label>Herbal/Suplemen</Label>
                  <Textarea rows={2} value={data.pengobatan_herbal_suplemen} onChange={(e) => setData("pengobatan_herbal_suplemen", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Alergi Pasien</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Select value={String(data.riwayat_alergi_obat)} onValueChange={(v) => setData("riwayat_alergi_obat", v)}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tidak Ada">Tidak Ada</SelectItem>
                      {dataAlergi.map((it) => (
                        <SelectItem key={it.kd_alergi} value={it.nm_alergi}>
                          {it.nm_alergi}
                        </SelectItem>
                      ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="button" aria-label="Tambah data alergi" onClick={() => setAlergiModalOpen(true)} className="h-9 px-3 border border-gray-300">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Reaksi</Label>
                  <Input value={data.reaksi_alergi} onChange={(e) => setData("reaksi_alergi", e.target.value)} />
                </div>
                <div>
                  <Label>Alergi Makanan/Lainnya</Label>
                  <Input placeholder="Tidak Ada" value={data.riwayat_alergi_makanan} onChange={(e) => setData("riwayat_alergi_makanan", e.target.value)} />
                </div>
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='rk-all' || selectedSection==='lingkungan-pekerjaan' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Lingkungan & Pekerjaan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Tinggal</Label>
                  <Select value={String(data.lingkungan_tinggal)} onValueChange={(v) => setData("lingkungan_tinggal", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rumah sendiri">Rumah sendiri</SelectItem>
                      <SelectItem value="Kontrak">Kontrak</SelectItem>
                      <SelectItem value="Keluarga">Keluarga</SelectItem>
                      <SelectItem value="Lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Akses Air Bersih</Label>
                  <Select value={String(data.akses_air_bersih)} onValueChange={(v) => setData("akses_air_bersih", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ya">Ya</SelectItem>
                      <SelectItem value="Tidak">Tidak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Sanitasi</Label>
                  <Select value={String(data.sanitasi)} onValueChange={(v) => setData("sanitasi", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MCK sendiri">MCK sendiri</SelectItem>
                      <SelectItem value="MCK bersama">MCK bersama</SelectItem>
                      <SelectItem value="Tidak ada">Tidak ada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Paparan Polusi</Label>
                  <Select value={String(data.paparan_polusi)} onValueChange={(v) => setData("paparan_polusi", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tidak">Tidak</SelectItem>
                      <SelectItem value="Polusi udara">Polusi udara</SelectItem>
                      <SelectItem value="Polusi suara">Polusi suara</SelectItem>
                      <SelectItem value="Kimia">Kimia</SelectItem>
                      <SelectItem value="Lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Pekerjaan Terakhir</Label>
                  <Input placeholder="Tidak Ada" value={data.pekerjaan_terakhir} onChange={(e) => setData("pekerjaan_terakhir", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Kondisi Lingkungan</Label>
                <Textarea rows={3} placeholder="Tidak Ada" value={data.kondisi_lingkungan} onChange={(e) => setData("kondisi_lingkungan", e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Paparan Bahan Berbahaya</Label>
                  <Input placeholder="Tidak Ada" value={data.paparan_bahan_berbahaya} onChange={(e) => setData("paparan_bahan_berbahaya", e.target.value)} />
                </div>
                <div>
                  <Label>Lama Kerja</Label>
                  <Input value={data.lama_kerja} onChange={(e) => setData("lama_kerja", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Lingkungan Kerja</Label>
                <Textarea rows={3} value={data.lingkungan_kerja} onChange={(e) => setData("lingkungan_kerja", e.target.value)} />
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='rk-all' || selectedSection==='pemeriksaan-fisik' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Pemeriksaan Fisik & Tanda Vital</h3>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div>
                  <Label>TD Sistolik</Label>
                  <Input type="number" value={data.td_sistolik} onChange={(e) => setData("td_sistolik", e.target.value)} />
                </div>
                <div>
                  <Label>TD Diastolik</Label>
                  <Input type="number" value={data.td_diastolik} onChange={(e) => setData("td_diastolik", e.target.value)} />
                </div>
                <div>
                  <Label>Nadi</Label>
                  <Input type="number" value={data.nadi} onChange={(e) => setData("nadi", e.target.value)} />
                </div>
                <div>
                  <Label>RR</Label>
                  <Input type="number" value={data.rr} onChange={(e) => setData("rr", e.target.value)} />
                </div>
                <div>
                  <Label>Suhu</Label>
                  <Input type="number" step="0.1" value={data.suhu} onChange={(e) => setData("suhu", e.target.value)} />
                </div>
                <div>
                  <Label>Nyeri Skala</Label>
                  <Input type="number" min={0} max={10} value={data.nyeri_skala} onChange={(e) => setData("nyeri_skala", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Lokasi Nyeri</Label>
                <Input placeholder="Tidak Ada" value={data.nyeri_lokasi} onChange={(e) => setData("nyeri_lokasi", e.target.value)} />
              </div>
              <div>
                <Label>Head to Toe</Label>
                <Textarea rows={3} value={data.fisik_head_to_toe} onChange={(e) => setData("fisik_head_to_toe", e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Tinggi Badan (cm)</Label>
                  <Input type="number" step="0.01" value={data.tinggi_badan} onChange={(e) => setData("tinggi_badan", e.target.value)} />
                </div>
                <div>
                  <Label>Berat Badan (kg)</Label>
                  <Input type="number" step="0.01" value={data.berat_badan} onChange={(e) => setData("berat_badan", e.target.value)} />
                </div>
                <div>
                  <Label>IMT</Label>
                  <Input type="number" step="0.01" value={data.imt} onChange={(e) => setData("imt", e.target.value)} />
                </div>
                <div>
                  <Label>Lingkar Lengan (cm)</Label>
                  <Input type="number" step="0.01" value={data.lingkar_lengan} onChange={(e) => setData("lingkar_lengan", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Skor Nyeri Total</Label>
                  <Input type="number" value={data.skor_nyeri_total} onChange={(e) => setData("skor_nyeri_total", e.target.value)} />
                </div>
                <div>
                  <Label>Skor Risiko Jatuh</Label>
                  <Select value={String(data.skor_risiko_jatuh)} onValueChange={(v) => setData("skor_risiko_jatuh", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rendah">Rendah</SelectItem>
                      <SelectItem value="Sedang">Sedang</SelectItem>
                      <SelectItem value="Tinggi">Tinggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Skor Glasgow</Label>
                  <Input type="number" value={data.skor_glasgow} onChange={(e) => setData("skor_glasgow", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Skor Braden</Label>
                  <Input type="number" step="0.01" value={data.skor_braden} onChange={(e) => setData("skor_braden", e.target.value)} />
                </div>
                <div>
                  <Label>Skor Norton</Label>
                  <Input type="number" step="0.01" value={data.skor_norton} onChange={(e) => setData("skor_norton", e.target.value)} />
                </div>
                <div>
                  <Label>Tanda Vital Lain</Label>
                  <Textarea rows={2} value={data.tanda_tanda_vital_lain} onChange={(e) => setData("tanda_tanda_vital_lain", e.target.value)} />
                </div>
              </div>
            </div>
            

            

            <div className={`space-y-3 ${selectedSection==='riwayat-psikososial' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Riwayat Psikososial</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Status Ekonomi</Label>
                  <Select value={String(data.status_ekonomi)} onValueChange={(v) => setData("status_ekonomi", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baik">Baik</SelectItem>
                      <SelectItem value="Cukup">Cukup</SelectItem>
                      <SelectItem value="Kurang">Kurang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Stresor Psikososial</Label>
                  <Textarea rows={2} value={data.stresor_psikososial} onChange={(e) => setData("stresor_psikososial", e.target.value)} />
                </div>
                <div>
                  <Label>Dukungan Sosial Tersedia</Label>
                  <Textarea rows={2} value={data.dukungan_sosial_tersedia} onChange={(e) => setData("dukungan_sosial_tersedia", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Kebiasaan Menetap</Label>
                <Textarea rows={2} value={data.kebiasaan_menetap} onChange={(e) => setData("kebiasaan_menetap", e.target.value)} />
              </div>
            </div>

            

            <div className={`space-y-3 ${selectedSection==='riwayat-perkembangan' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Riwayat Perkembangan (Anak)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Riwayat Kehamilan Ibu</Label>
                  <Textarea rows={2} value={data.riwayat_kehamilan_ibu} onChange={(e) => setData("riwayat_kehamilan_ibu", e.target.value)} />
                </div>
                <div>
                  <Label>Riwayat Persalinan Ibu</Label>
                  <Textarea rows={2} value={data.riwayat_persalinan_ibu} onChange={(e) => setData("riwayat_persalinan_ibu", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Riwayat Imunisasi</Label>
                  <Textarea rows={2} value={data.riwayat_imunisasi} onChange={(e) => setData("riwayat_imunisasi", e.target.value)} />
                </div>
                <div>
                  <Label>Milestone Perkembangan</Label>
                  <Textarea rows={2} value={data.milestone_perkembangan} onChange={(e) => setData("milestone_perkembangan", e.target.value)} />
                </div>
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='pola-persepsi-pemeliharaan' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Pola Persepsi-Pemeliharaan Kesehatan</h3>
              <div>
                <Label>Persepsi Kesehatan</Label>
                <Textarea rows={3} value={data.persepsi_kesehatan} onChange={(e) => setData("persepsi_kesehatan", e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Frekuensi Olahraga</Label>
                  <Select value={String(data.keb_olahraga_frekuensi)} onValueChange={(v) => setData("keb_olahraga_frekuensi", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tidak pernah">Tidak pernah</SelectItem>
                      <SelectItem value="<1x/minggu">&lt;1x/minggu</SelectItem>
                      <SelectItem value="1-3x/minggu">1-3x/minggu</SelectItem>
                      <SelectItem value=">3x/minggu">&gt;3x/minggu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Jenis Olahraga</Label>
                  <Input value={data.keb_olahraga_jenis} onChange={(e) => setData("keb_olahraga_jenis", e.target.value)} />
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={!!data.cek_kesehatan_rutin} onChange={(e) => setData("cek_kesehatan_rutin", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Cek Kesehatan Rutin</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Penggunaan Obat</Label>
                  <Textarea rows={2} value={data.penggunaan_obat} onChange={(e) => setData("penggunaan_obat", e.target.value)} />
                </div>
                <div>
                  <Label>Penggunaan Rokok</Label>
                  <Select value={String(data.penggunaan_rokok)} onValueChange={(v) => setData("penggunaan_rokok", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tidak">Tidak</SelectItem>
                      <SelectItem value="Ya <10batang/hari">Ya &lt;10batang/hari</SelectItem>
                      <SelectItem value="Ya 10-20batang/hari">Ya 10-20batang/hari</SelectItem>
                      <SelectItem value="Ya >20batang/hari">Ya &gt;20batang/hari</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Penggunaan Alkohol</Label>
                  <Select value={String(data.penggunaan_alkohol)} onValueChange={(v) => setData("penggunaan_alkohol", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tidak">Tidak</SelectItem>
                      <SelectItem value="Ya kadang">Ya kadang</SelectItem>
                      <SelectItem value="Ya rutin">Ya rutin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Zat Adiktif Lainnya</Label>
                <Input value={data.zat_adiktif_lainnya} onChange={(e) => setData("zat_adiktif_lainnya", e.target.value)} />
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='pola-nutrisi' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Pola Nutrisi-Metabolik</h3>
              <div>
                <Label>Pola Makan Harian</Label>
                <Textarea rows={3} value={data.pola_makan_harian} onChange={(e) => setData("pola_makan_harian", e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Nafsu Makan</Label>
                  <Select value={String(data.nafsu_makan)} onValueChange={(v) => setData("nafsu_makan", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baik">Baik</SelectItem>
                      <SelectItem value="Cukup">Cukup</SelectItem>
                      <SelectItem value="Kurang">Kurang</SelectItem>
                      <SelectItem value="Tidak ada">Tidak ada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={!!data.kesulitan_mengunyah} onChange={(e) => setData("kesulitan_mengunyah", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Kesulitan Mengunyah</span>
                </div>
                <div>
                  <Label>BB Sebelum (kg)</Label>
                  <Input type="number" step="0.01" value={data.bb_sebelum} onChange={(e) => setData("bb_sebelum", e.target.value)} />
                </div>
                <div>
                  <Label>BB Sekarang (kg)</Label>
                  <Input type="number" step="0.01" value={data.bb_sekarang} onChange={(e) => setData("bb_sekarang", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Perubahan BB 6 bln (+/- kg)</Label>
                  <Input type="number" step="0.01" value={data.perubahan_bb_6bln} onChange={(e) => setData("perubahan_bb_6bln", e.target.value)} />
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={!!data.mual_muntah} onChange={(e) => setData("mual_muntah", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Mual/Muntah</span>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={!!data.diare} onChange={(e) => setData("diare", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Diare</span>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={!!data.konstipasi} onChange={(e) => setData("konstipasi", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Konstipasi</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Kebiasaan Minum per Hari (L)</Label>
                  <Input type="number" step="0.01" value={data.kebiasaan_minum_perhari} onChange={(e) => setData("kebiasaan_minum_perhari", e.target.value)} />
                </div>
                <div>
                  <Label>Alergi Makanan</Label>
                  <Input value={data.alergi_makanan} onChange={(e) => setData("alergi_makanan", e.target.value)} />
                </div>
                <div>
                  <Label>Suplemen/Vitamin</Label>
                  <Input value={data.suplemen_vitamin} onChange={(e) => setData("suplemen_vitamin", e.target.value)} />
                </div>
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='pola-eliminasi' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Pola Eliminasi</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>BAK Frekuensi</Label>
                  <Input type="number" value={data.eliminasi_bak_frekuensi} onChange={(e) => setData("eliminasi_bak_frekuensi", e.target.value)} />
                </div>
                <div>
                  <Label>BAK Warna</Label>
                  <Input value={data.eliminasi_bak_warna} onChange={(e) => setData("eliminasi_bak_warna", e.target.value)} />
                </div>
                <div>
                  <Label>BAK Jumlah (cc/hari)</Label>
                  <Input type="number" step="0.01" value={data.eliminasi_bak_jumlah} onChange={(e) => setData("eliminasi_bak_jumlah", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Keluhan BAK</Label>
                <Textarea rows={2} value={data.keluhan_bak} onChange={(e) => setData("keluhan_bak", e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>BAB Frekuensi</Label>
                  <Input type="number" value={data.eliminasi_bab_frekuensi} onChange={(e) => setData("eliminasi_bab_frekuensi", e.target.value)} />
                </div>
                <div>
                  <Label>BAB Konsistensi</Label>
                  <Select value={String(data.eliminasi_bab_konsistensi)} onValueChange={(v) => setData("eliminasi_bab_konsistensi", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Padat">Padat</SelectItem>
                      <SelectItem value="Lunak">Lunak</SelectItem>
                      <SelectItem value="Cair">Cair</SelectItem>
                      <SelectItem value="Keras">Keras</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>BAB Warna</Label>
                  <Input value={data.eliminasi_bab_warna} onChange={(e) => setData("eliminasi_bab_warna", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Keringat</Label>
                <Select value={String(data.keringat)} onValueChange={(v) => setData("keringat", v)}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Berlebihan">Berlebihan</SelectItem>
                    <SelectItem value="Tidak ada">Tidak ada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='pola-aktivitas' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Pola Aktivitas-Latihan</h3>
              <div>
                <Label>Aktivitas Sebelum Sakit</Label>
                <Textarea rows={2} value={data.aktivitas_sebelum_sakit} onChange={(e) => setData("aktivitas_sebelum_sakit", e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Mobilitas</Label>
                  <Select value={String(data.mobilitas)} onValueChange={(v) => setData("mobilitas", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mandiri">Mandiri</SelectItem>
                      <SelectItem value="Dengan bantuan">Dengan bantuan</SelectItem>
                      <SelectItem value="Tirah baring">Tirah baring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Kendala Aktivitas</Label>
                  <Input value={data.kendala_aktivitas} onChange={(e) => setData("kendala_aktivitas", e.target.value)} />
                </div>
                <div>
                  <Label>ADL Makan</Label>
                  <Select value={String(data.adl_makan)} onValueChange={(v) => setData("adl_makan", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mandiri">Mandiri</SelectItem>
                      <SelectItem value="Dibantu">Dibantu</SelectItem>
                      <SelectItem value="Bergantung">Bergantung</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>ADL Mandi</Label>
                  <Select value={String(data.adl_mandi)} onValueChange={(v) => setData("adl_mandi", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mandiri">Mandiri</SelectItem>
                      <SelectItem value="Dibantu">Dibantu</SelectItem>
                      <SelectItem value="Bergantung">Bergantung</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>ADL Berpakaian</Label>
                  <Select value={String(data.adl_berpakaian)} onValueChange={(v) => setData("adl_berpakaian", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mandiri">Mandiri</SelectItem>
                      <SelectItem value="Dibantu">Dibantu</SelectItem>
                      <SelectItem value="Bergantung">Bergantung</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>ADL Toileting</Label>
                  <Select value={String(data.adl_toileting)} onValueChange={(v) => setData("adl_toileting", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mandiri">Mandiri</SelectItem>
                      <SelectItem value="Dibantu">Dibantu</SelectItem>
                      <SelectItem value="Bergantung">Bergantung</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='pola-tidur' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Pola Tidur-Istirahat</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Jam Tidur Mulai</Label>
                  <Input type="time" value={data.jam_tidur_mulai} onChange={(e) => setData("jam_tidur_mulai", e.target.value)} />
                </div>
                <div>
                  <Label>Jam Tidur Bangun</Label>
                  <Input type="time" value={data.jam_tidur_bangun} onChange={(e) => setData("jam_tidur_bangun", e.target.value)} />
                </div>
                <div>
                  <Label>Kualitas Tidur</Label>
                  <Select value={String(data.kualitas_tidur)} onValueChange={(v) => setData("kualitas_tidur", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nyenyak">Nyenyak</SelectItem>
                      <SelectItem value="Sering terbangun">Sering terbangun</SelectItem>
                      <SelectItem value="Insomnia">Insomnia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tidur Siang (menit)</Label>
                  <Input type="number" value={data.tidur_siang_durasi} onChange={(e) => setData("tidur_siang_durasi", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={!!data.kesulitan_tidur} onChange={(e) => setData("kesulitan_tidur", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Kesulitan Tidur</span>
                </div>
                <div>
                  <Label>Faktor Pengganggu</Label>
                  <Input value={data.faktor_pengganggu_tidur} onChange={(e) => setData("faktor_pengganggu_tidur", e.target.value)} />
                </div>
                <div>
                  <Label>Perasaan Bangun</Label>
                  <Select value={String(data.perasaan_bangun)} onValueChange={(v) => setData("perasaan_bangun", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Segar">Segar</SelectItem>
                      <SelectItem value="Lelah">Lelah</SelectItem>
                      <SelectItem value="Sangat lelah">Sangat lelah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={!!data.obat_bantu_tidur} onChange={(e) => setData("obat_bantu_tidur", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm">Menggunakan Obat Bantu Tidur</span>
              </div>
              <div>
                <Label>Kebiasaan Sebelum Tidur</Label>
                <Input value={data.kebiasaan_sebelum_tidur} onChange={(e) => setData("kebiasaan_sebelum_tidur", e.target.value)} />
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='pola-kognitif' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Pola Kognitif-Perseptual</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Kesadaran</Label>
                  <Select value={String(data.kesadaran)} onValueChange={(v) => setData("kesadaran", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Compos mentis">Compos mentis</SelectItem>
                      <SelectItem value="Apatis">Apatis</SelectItem>
                      <SelectItem value="Somnolen">Somnolen</SelectItem>
                      <SelectItem value="Delirium">Delirium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={!!data.orientasi_orang} onChange={(e) => setData("orientasi_orang", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Orientasi Orang</span>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={!!data.orientasi_tempat} onChange={(e) => setData("orientasi_tempat", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Orientasi Tempat</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={!!data.orientasi_waktu} onChange={(e) => setData("orientasi_waktu", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm">Orientasi Waktu</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Memori Jangka Pendek</Label>
                  <Select value={String(data.memori_jpendek)} onValueChange={(v) => setData("memori_jpendek", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baik">Baik</SelectItem>
                      <SelectItem value="Terganggu">Terganggu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Memori Jangka Panjang</Label>
                  <Select value={String(data.memori_jpanjang)} onValueChange={(v) => setData("memori_jpanjang", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baik">Baik</SelectItem>
                      <SelectItem value="Terganggu">Terganggu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Pengambilan Keputusan</Label>
                  <Select value={String(data.pengambilan_keputusan)} onValueChange={(v) => setData("pengambilan_keputusan", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baik">Baik</SelectItem>
                      <SelectItem value="Terganggu">Terganggu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Pengetahuan Penyakit</Label>
                  <Select value={String(data.pengetahuan_penyakit)} onValueChange={(v) => setData("pengetahuan_penyakit", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baik">Baik</SelectItem>
                      <SelectItem value="Cukup">Cukup</SelectItem>
                      <SelectItem value="Kurang">Kurang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Penglihatan</Label>
                  <Select value={String(data.penglihatan)} onValueChange={(v) => setData("penglihatan", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Rabun">Rabun</SelectItem>
                      <SelectItem value="Buta">Buta</SelectItem>
                      <SelectItem value="Kacamata">Kacamata</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Pendengaran</Label>
                  <Select value={String(data.pendengaran)} onValueChange={(v) => setData("pendengaran", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Tuli">Tuli</SelectItem>
                      <SelectItem value="Alat bantu">Alat bantu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Penciuman</Label>
                  <Select value={String(data.penciuman)} onValueChange={(v) => setData("penciuman", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Terganggu">Terganggu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Pengecapan</Label>
                  <Select value={String(data.pengecapan)} onValueChange={(v) => setData("pengecapan", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Terganggu">Terganggu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Peraba</Label>
                  <Select value={String(data.peraba)} onValueChange={(v) => setData("peraba", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Terganggu">Terganggu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='pola-persepsi-diri' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Pola Persepsi Diri-Konsep Diri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Perasaan Diri</Label>
                  <Textarea rows={2} value={data.perasaan_diri} onChange={(e) => setData("perasaan_diri", e.target.value)} />
                </div>
                <div>
                  <Label>Citra Tubuh</Label>
                  <Textarea rows={2} value={data.citra_tubuh} onChange={(e) => setData("citra_tubuh", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Harga Diri</Label>
                  <Select value={String(data.harga_diri)} onValueChange={(v) => setData("harga_diri", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baik">Baik</SelectItem>
                      <SelectItem value="Cukup">Cukup</SelectItem>
                      <SelectItem value="Rendah">Rendah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={!!data.perasaan_cemas} onChange={(e) => setData("perasaan_cemas", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Cemas</span>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={!!data.perasaan_takut} onChange={(e) => setData("perasaan_takut", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Takut</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={!!data.perasaan_sedih} onChange={(e) => setData("perasaan_sedih", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Sedih</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={!!data.perasaan_marah} onChange={(e) => setData("perasaan_marah", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Marah</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Mekanisme Koping</Label>
                  <Textarea rows={2} value={data.mekanisme_koping} onChange={(e) => setData("mekanisme_koping", e.target.value)} />
                </div>
                <div>
                  <Label>Harapan Masa Depan</Label>
                  <Textarea rows={2} value={data.harapan_masa_depan} onChange={(e) => setData("harapan_masa_depan", e.target.value)} />
                </div>
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='pola-peran-hubungan' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Pola Peran-Hubungan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Status Perkawinan</Label>
                  <Select value={String(data.status_perkawinan)} onValueChange={(v) => setData("status_perkawinan", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Menikah">Menikah</SelectItem>
                      <SelectItem value="Belum menikah">Belum menikah</SelectItem>
                      <SelectItem value="Cerai">Cerai</SelectItem>
                      <SelectItem value="Duda/Janda">Duda/Janda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Jumlah Anak</Label>
                  <Input type="number" value={data.jumlah_anak} onChange={(e) => setData("jumlah_anak", Number(e.target.value))} />
                </div>
                <div>
                  <Label>Hubungan Keluarga</Label>
                  <Select value={String(data.hubungan_keluarga)} onValueChange={(v) => setData("hubungan_keluarga", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Harmonis">Harmonis</SelectItem>
                      <SelectItem value="Kurang harmonis">Kurang harmonis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Hubungan Teman</Label>
                  <Input value={data.hubungan_teman} onChange={(e) => setData("hubungan_teman", e.target.value)} />
                </div>
                <div>
                  <Label>Peran di Keluarga</Label>
                  <Input value={data.peran_di_keluarga} onChange={(e) => setData("peran_di_keluarga", e.target.value)} />
                </div>
                <div>
                  <Label>Peran di Masyarakat</Label>
                  <Input value={data.peran_di_masyarakat} onChange={(e) => setData("peran_di_masyarakat", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Dukungan Sosial</Label>
                  <Textarea rows={2} value={data.dukungan_sosial} onChange={(e) => setData("dukungan_sosial", e.target.value)} />
                </div>
                <div>
                  <Label>Kebiasaan Komunikasi</Label>
                  <Textarea rows={2} value={data.kebiasaan_komunikasi} onChange={(e) => setData("kebiasaan_komunikasi", e.target.value)} />
                </div>
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='pola-seksual' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Pola Seksual-Reproduksi</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Menarche Usia</Label>
                  <Input type="number" value={data.menarche_usia} onChange={(e) => setData("menarche_usia", e.target.value)} />
                </div>
                <div>
                  <Label>Siklus Haid (hari)</Label>
                  <Input type="number" value={data.siklus_haid_hari} onChange={(e) => setData("siklus_haid_hari", e.target.value)} />
                </div>
                <div>
                  <Label>Lama Haid (hari)</Label>
                  <Input type="number" value={data.lama_haid_hari} onChange={(e) => setData("lama_haid_hari", e.target.value)} />
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={!!data.pms} onChange={(e) => setData("pms", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">PMS</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Menopause Usia</Label>
                  <Input type="number" value={data.menopause_usia} onChange={(e) => setData("menopause_usia", e.target.value)} />
                </div>
                <div>
                  <Label>Kepuasan Seksual</Label>
                  <Select value={String(data.kepuasan_seksual)} onValueChange={(v) => setData("kepuasan_seksual", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Puas">Puas</SelectItem>
                      <SelectItem value="Cukup">Cukup</SelectItem>
                      <SelectItem value="Kurang">Kurang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={!!data.riwayat_ims} onChange={(e) => setData("riwayat_ims", e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Riwayat IMS</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Riwayat Kehamilan</Label>
                  <Textarea rows={2} value={data.riwayat_kehamilan} onChange={(e) => setData("riwayat_kehamilan", e.target.value)} />
                </div>
                <div>
                  <Label>Kontrasepsi</Label>
                  <Input value={data.kontrasepsi} onChange={(e) => setData("kontrasepsi", e.target.value)} />
                </div>
                <div>
                  <Label>Masalah Seksual</Label>
                  <Textarea rows={2} value={data.masalah_seksual} onChange={(e) => setData("masalah_seksual", e.target.value)} />
                </div>
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='pola-koping' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Pola Koping-Toleransi Stres</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Sumber Stres</Label>
                  <Textarea rows={2} value={data.sumber_stres} onChange={(e) => setData("sumber_stres", e.target.value)} />
                </div>
                <div>
                  <Label>Tanda Stres Fisik</Label>
                  <Textarea rows={2} value={data.tanda_stres_fisik} onChange={(e) => setData("tanda_stres_fisik", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Tanda Stres Emosional</Label>
                  <Textarea rows={2} value={data.tanda_stres_emosional} onChange={(e) => setData("tanda_stres_emosional", e.target.value)} />
                </div>
                <div>
                  <Label>Mekanisme Koping</Label>
                  <Textarea rows={2} value={data.mekanisme_koping_stres} onChange={(e) => setData("mekanisme_koping_stres", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Efektivitas Koping</Label>
                  <Select value={String(data.efektivitas_koping)} onValueChange={(v) => setData("efektivitas_koping", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Efektif">Efektif</SelectItem>
                      <SelectItem value="Cukup">Cukup</SelectItem>
                      <SelectItem value="Tidak efektif">Tidak efektif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Dukungan Diinginkan</Label>
                  <Textarea rows={2} value={data.dukungan_diinginkan} onChange={(e) => setData("dukungan_diinginkan", e.target.value)} />
                </div>
                <div>
                  <Label>Pengalaman Stres</Label>
                  <Textarea rows={2} value={data.pengalaman_stres} onChange={(e) => setData("pengalaman_stres", e.target.value)} />
                </div>
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='pola-nilai-keyakinan' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Pola Nilai-Keyakinan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Keyakinan Agama</Label>
                  <Input value={data.keyakinan_agama} onChange={(e) => setData("keyakinan_agama", e.target.value)} />
                </div>
                <div>
                  <Label>Aktivitas Ibadah</Label>
                  <Textarea rows={2} value={data.aktivitas_ibadah} onChange={(e) => setData("aktivitas_ibadah", e.target.value)} />
                </div>
                <div>
                  <Label>Sumber Kekuatan Spiritual</Label>
                  <Textarea rows={2} value={data.sumber_kekuatan_spiritual} onChange={(e) => setData("sumber_kekuatan_spiritual", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Nilai Kehidupan</Label>
                  <Textarea rows={2} value={data.nilai_kehidupan} onChange={(e) => setData("nilai_kehidupan", e.target.value)} />
                </div>
                <div>
                  <Label>Hubungan Keyakinan & Kesehatan</Label>
                  <Textarea rows={2} value={data.hubungan_keyakinan_kesehatan} onChange={(e) => setData("hubungan_keyakinan_kesehatan", e.target.value)} />
                </div>
                <div>
                  <Label>Kepercayaan Budaya</Label>
                  <Input value={data.kepercayaan_budaya} onChange={(e) => setData("kepercayaan_budaya", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Praktik Tradisional</Label>
                <Textarea rows={2} value={data.praktik_tradisional} onChange={(e) => setData("praktik_tradisional", e.target.value)} />
              </div>
            </div>

            

            

            

            

            <div className={`space-y-3 ${selectedSection==='keluarga-genogram' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Keluarga & Genogram</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Kardiovaskular</Label>
                  <Input value={data.riwayat_keluarga_penyakit_kardiovaskular} onChange={(e) => setData("riwayat_keluarga_penyakit_kardiovaskular", e.target.value)} />
                </div>
                <div>
                  <Label>Diabetes</Label>
                  <Input value={data.riwayat_keluarga_diabetes} onChange={(e) => setData("riwayat_keluarga_diabetes", e.target.value)} />
                </div>
                <div>
                  <Label>Kanker</Label>
                  <Input value={data.riwayat_keluarga_kanker} onChange={(e) => setData("riwayat_keluarga_kanker", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Genogram (JSON)</Label>
                  <Textarea rows={3} value={data.genogram_data} onChange={(e) => setData("genogram_data", e.target.value)} />
                </div>
                <div>
                  <Label>Deskripsi Genogram</Label>
                  <Textarea rows={3} value={data.genogram_deskripsi} onChange={(e) => setData("genogram_deskripsi", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Path Gambar Genogram</Label>
                  <Input value={data.genogram_path} onChange={(e) => setData("genogram_path", e.target.value)} />
                </div>
                <div>
                  <Label>Keluarga Inti</Label>
                  <Textarea rows={2} value={data.genogram_keluarga_inti} onChange={(e) => setData("genogram_keluarga_inti", e.target.value)} />
                </div>
                <div>
                  <Label>Hubungan Keluarga</Label>
                  <Textarea rows={2} value={data.genogram_hubungan_keluarga} onChange={(e) => setData("genogram_hubungan_keluarga", e.target.value)} />
                </div>
              </div>
            </div>

            

            

            <div className={`space-y-3 ${selectedSection==='diagnosis' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Diagnosis Keperawatan (SDKI)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Kode SDKI 1</Label>
                  <Input value={data.diagnosa1_kode_sdki} onChange={(e) => setData("diagnosa1_kode_sdki", e.target.value)} />
                </div>
                <div>
                  <Label>Label 1</Label>
                  <Input value={data.diagnosa1_label} onChange={(e) => setData("diagnosa1_label", e.target.value)} />
                </div>
                <div>
                  <Label>Etiologi 1</Label>
                  <Input value={data.diagnosa1_etiologi} onChange={(e) => setData("diagnosa1_etiologi", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Gejala 1</Label>
                <Textarea rows={2} value={data.diagnosa1_gejala} onChange={(e) => setData("diagnosa1_gejala", e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Kode SDKI 2</Label>
                  <Input value={data.diagnosa2_kode_sdki} onChange={(e) => setData("diagnosa2_kode_sdki", e.target.value)} />
                </div>
                <div>
                  <Label>Label 2</Label>
                  <Input value={data.diagnosa2_label} onChange={(e) => setData("diagnosa2_label", e.target.value)} />
                </div>
                <div>
                  <Label>Etiologi 2</Label>
                  <Input value={data.diagnosa2_etiologi} onChange={(e) => setData("diagnosa2_etiologi", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Gejala 2</Label>
                <Textarea rows={2} value={data.diagnosa2_gejala} onChange={(e) => setData("diagnosa2_gejala", e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Kode SDKI 3</Label>
                  <Input value={data.diagnosa3_kode_sdki} onChange={(e) => setData("diagnosa3_kode_sdki", e.target.value)} />
                </div>
                <div>
                  <Label>Label 3</Label>
                  <Input value={data.diagnosa3_label} onChange={(e) => setData("diagnosa3_label", e.target.value)} />
                </div>
                <div>
                  <Label>Etiologi 3</Label>
                  <Input value={data.diagnosa3_etiologi} onChange={(e) => setData("diagnosa3_etiologi", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Gejala 3</Label>
                <Textarea rows={2} value={data.diagnosa3_gejala} onChange={(e) => setData("diagnosa3_gejala", e.target.value)} />
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='tujuan' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Tujuan (SLKI)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Kode SLKI 1</Label>
                  <Input value={data.tujuan1_kode_slki} onChange={(e) => setData("tujuan1_kode_slki", e.target.value)} />
                </div>
                <div>
                  <Label>Label 1</Label>
                  <Input value={data.tujuan1_label} onChange={(e) => setData("tujuan1_label", e.target.value)} />
                </div>
                <div>
                  <Label>Target Tgl 1</Label>
                  <Input type="date" value={data.tujuan1_target_tgl} onChange={(e) => setData("tujuan1_target_tgl", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Kriteria 1</Label>
                <Textarea rows={2} value={data.tujuan1_kriteria} onChange={(e) => setData("tujuan1_kriteria", e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Kode SLKI 2</Label>
                  <Input value={data.tujuan2_kode_slki} onChange={(e) => setData("tujuan2_kode_slki", e.target.value)} />
                </div>
                <div>
                  <Label>Label 2</Label>
                  <Input value={data.tujuan2_label} onChange={(e) => setData("tujuan2_label", e.target.value)} />
                </div>
                <div>
                  <Label>Target Tgl 2</Label>
                  <Input type="date" value={data.tujuan2_target_tgl} onChange={(e) => setData("tujuan2_target_tgl", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Kriteria 2</Label>
                <Textarea rows={2} value={data.tujuan2_kriteria} onChange={(e) => setData("tujuan2_kriteria", e.target.value)} />
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='intervensi' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Intervensi (SIKI)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Kode SIKI 1</Label>
                  <Input value={data.intervensi1_kode_siki} onChange={(e) => setData("intervensi1_kode_siki", e.target.value)} />
                </div>
                <div>
                  <Label>Label 1</Label>
                  <Input value={data.intervensi1_label} onChange={(e) => setData("intervensi1_label", e.target.value)} />
                </div>
                <div>
                  <Label>Rasional 1</Label>
                  <Input value={data.intervensi1_rasional} onChange={(e) => setData("intervensi1_rasional", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Aktivitas 1</Label>
                <Textarea rows={2} value={data.intervensi1_aktivitas} onChange={(e) => setData("intervensi1_aktivitas", e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Kode SIKI 2</Label>
                  <Input value={data.intervensi2_kode_siki} onChange={(e) => setData("intervensi2_kode_siki", e.target.value)} />
                </div>
                <div>
                  <Label>Label 2</Label>
                  <Input value={data.intervensi2_label} onChange={(e) => setData("intervensi2_label", e.target.value)} />
                </div>
                <div>
                  <Label>Rasional 2</Label>
                  <Input value={data.intervensi2_rasional} onChange={(e) => setData("intervensi2_rasional", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Aktivitas 2</Label>
                <Textarea rows={2} value={data.intervensi2_aktivitas} onChange={(e) => setData("intervensi2_aktivitas", e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Kode SIKI 3</Label>
                  <Input value={data.intervensi3_kode_siki} onChange={(e) => setData("intervensi3_kode_siki", e.target.value)} />
                </div>
                <div>
                  <Label>Label 3</Label>
                  <Input value={data.intervensi3_label} onChange={(e) => setData("intervensi3_label", e.target.value)} />
                </div>
                <div>
                  <Label>Rasional 3</Label>
                  <Input value={data.intervensi3_rasional} onChange={(e) => setData("intervensi3_rasional", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Aktivitas 3</Label>
                <Textarea rows={2} value={data.intervensi3_aktivitas} onChange={(e) => setData("intervensi3_aktivitas", e.target.value)} />
              </div>
            </div>

            <div className={`space-y-3 ${selectedSection==='evaluasi-monitoring' ? '' : 'hidden'}`}>
              <div className="h-px bg-gray-200" />
              <h3 className="text-base font-semibold">Evaluasi & Monitoring</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Status</Label>
                  <Select value={String(data.evaluasi_status)} onValueChange={(v) => setData("evaluasi_status", v)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tercapai seluruhnya">Tercapai seluruhnya</SelectItem>
                      <SelectItem value="Tercapai sebagian">Tercapai sebagian</SelectItem>
                      <SelectItem value="Belum tercapai">Belum tercapai</SelectItem>
                      <SelectItem value="Dalam proses">Dalam proses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Evaluator NIP</Label>
                  <Input value={data.evaluator_nip} onChange={(e) => setData("evaluator_nip", e.target.value)} />
                </div>
                <div>
                  <Label>Catatan Khusus</Label>
                  <Textarea rows={2} value={data.catatan_khusus} onChange={(e) => setData("catatan_khusus", e.target.value)} />
                </div>
              </div>
            </div>
            

            <ResponsiveTable columns={columns} data={list} keyField="no_rawat" />

            <div className="rounded-xl border border-gray-200 bg-white">
              <div className="p-3 md:p-4">
                <div className="flex items-center justify-end flex-wrap gap-2">
                  <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={simpanOrUpdate} disabled={processing}>Simpan</Button>
                  <Button type="button" className="bg-amber-500 hover:bg-amber-600 text-white" onClick={() => setEditOpen(true)} disabled={!editing}>Edit</Button>
                  <Button type="button" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => { setToDelete(editing || null); setConfirmOpen(true); }} disabled={!editing}>Hapus</Button>
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Modal show={createOpen} onClose={() => setCreateOpen(false)} title="Tambah Asuhan Keperawatan" size="lg" showTopGradient>
        <form onSubmit={submitCreate} className="space-y-4">
          <div>
            <Label required>No Rawat</Label>
            <Input value={data.no_rawat} onChange={(e) => setData("no_rawat", e.target.value)} />
            {errors.no_rawat && <p className="mt-1 text-sm text-red-600">{errors.no_rawat}</p>}
          </div>
          <div>
            <Label required>No RM</Label>
            <Input value={data.no_rkm_medis} onChange={(e) => setData("no_rkm_medis", e.target.value)} />
            {errors.no_rkm_medis && <p className="mt-1 text-sm text-red-600">{errors.no_rkm_medis}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label required>NIP Perawat</Label>
              <Input value={data.nip_perawat} onChange={(e) => setData("nip_perawat", e.target.value)} />
              {errors.nip_perawat && <p className="mt-1 text-sm text-red-600">{errors.nip_perawat}</p>}
            </div>
            <div>
              <Label required>Ruangan</Label>
              <Input value={data.ruangan} onChange={(e) => setData("ruangan", e.target.value)} />
              {errors.ruangan && <p className="mt-1 text-sm text-red-600">{errors.ruangan}</p>}
            </div>
            <div>
              <Label required>Jenis Pengkajian</Label>
              <Select value={String(data.jenis_pengkajian || "Awal")} onValueChange={(v) => setData("jenis_pengkajian", v)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Awal">Awal</SelectItem>
                  <SelectItem value="Berkelanjutan">Berkelanjutan</SelectItem>
                  <SelectItem value="Rujukan">Rujukan</SelectItem>
                </SelectContent>
              </Select>
              {errors.jenis_pengkajian && <p className="mt-1 text-sm text-red-600">{errors.jenis_pengkajian}</p>}
            </div>
          </div>
          <div>
            <Label>Keluhan Utama</Label>
            <Textarea rows={3} value={data.keluhan_utama} onChange={(e) => setData("keluhan_utama", e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Evaluasi Hasil</Label>
              <Textarea rows={2} value={data.evaluasi_hasil} onChange={(e) => setData("evaluasi_hasil", e.target.value)} />
            </div>
            <div>
              <Label>Evaluasi Status</Label>
              <Input value={data.evaluasi_status} onChange={(e) => setData("evaluasi_status", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>NIP Evaluator</Label>
              <Input value={data.evaluator_nip} onChange={(e) => setData("evaluator_nip", e.target.value)} />
            </div>
            <div>
              <Label>Catatan Khusus</Label>
              <Textarea rows={2} value={data.catatan_khusus} onChange={(e) => setData("catatan_khusus", e.target.value)} />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" onClick={() => setCreateOpen(false)} className="border border-gray-300 dark:border-gray-600 bg-white text-gray-700 dark:text-gray-300">Batal</Button>
            <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700 text-white">Simpan</Button>
          </div>
        </form>
      </Modal>

      <Modal show={editOpen} onClose={() => setEditOpen(false)} title="Edit Asuhan Keperawatan" size="lg" showTopGradient>
        <form onSubmit={submitEdit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>No Rawat</Label>
              <Input value={data.no_rawat} disabled />
            </div>
            <div>
              <Label required>No RM</Label>
              <Input value={data.no_rkm_medis} onChange={(e) => setData("no_rkm_medis", e.target.value)} />
              {errors.no_rkm_medis && <p className="mt-1 text-sm text-red-600">{errors.no_rkm_medis}</p>}
            </div>
            <div>
              <Label required>NIP Perawat</Label>
              <Input value={data.nip_perawat} onChange={(e) => setData("nip_perawat", e.target.value)} />
              {errors.nip_perawat && <p className="mt-1 text-sm text-red-600">{errors.nip_perawat}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label required>Ruangan</Label>
              <Input value={data.ruangan} onChange={(e) => setData("ruangan", e.target.value)} />
              {errors.ruangan && <p className="mt-1 text-sm text-red-600">{errors.ruangan}</p>}
            </div>
            <div>
              <Label required>Jenis Pengkajian</Label>
              <Select value={String(data.jenis_pengkajian || "Awal")} onValueChange={(v) => setData("jenis_pengkajian", v)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Pilih" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Awal">Awal</SelectItem>
                  <SelectItem value="Berkelanjutan">Berkelanjutan</SelectItem>
                  <SelectItem value="Rujukan">Rujukan</SelectItem>
                </SelectContent>
              </Select>
              {errors.jenis_pengkajian && <p className="mt-1 text-sm text-red-600">{errors.jenis_pengkajian}</p>}
            </div>
            <div>
              <Label>Evaluasi Status</Label>
              <Input value={data.evaluasi_status} onChange={(e) => setData("evaluasi_status", e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Keluhan Utama</Label>
            <Textarea rows={3} value={data.keluhan_utama} onChange={(e) => setData("keluhan_utama", e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Evaluasi Hasil</Label>
              <Textarea rows={2} value={data.evaluasi_hasil} onChange={(e) => setData("evaluasi_hasil", e.target.value)} />
            </div>
            <div>
              <Label>NIP Evaluator</Label>
              <Input value={data.evaluator_nip} onChange={(e) => setData("evaluator_nip", e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Catatan Khusus</Label>
            <Textarea rows={2} value={data.catatan_khusus} onChange={(e) => setData("catatan_khusus", e.target.value)} />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" onClick={() => setEditOpen(false)} className="border border-gray-300 dark:border-gray-600 bg-white text-gray-700 dark:text-gray-300">Tutup</Button>
            <Button type="submit" disabled={processing} className="bg-indigo-600 hover:bg-indigo-700 text-white">Perbarui</Button>
          </div>
        </form>
      </Modal>

      <Modal show={docOpen} onClose={() => setDocOpen(false)} title="Efek Enak" size="lg" showTopGradient>
        <div className="text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{efekEnakMd}</ReactMarkdown>
        </div>
      </Modal>

      <DataAlergi open={alergiModalOpen} onClose={() => setAlergiModalOpen(false)} jenis={null} />

      <ConfirmationAlert
        isOpen={confirmOpen}
        type="danger"
        title="Konfirmasi Hapus"
        itemName={toDelete?.no_rawat || ""}
        itemType="data asuhan keperawatan"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
        onClose={() => setConfirmOpen(false)}
        confirmText="Ya, Hapus"
        cancelText="Batal"
      />
    </CanvasAskep>
  );
}
