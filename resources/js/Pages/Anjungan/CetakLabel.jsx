import React, { useEffect, useMemo } from "react";
import { Head, usePage } from "@inertiajs/react";

export default function CetakLabel() {
  const { props } = usePage();
  const setting = props?.setting || props?.settings || {};

  const qs = useMemo(() => {
    try {
      return new URLSearchParams(window.location.search || "");
    } catch (_) {
      return new URLSearchParams("");
    }
  }, []);

  const getParam = (key, def = "") => {
    try {
      const v = qs.get(key);
      return v != null ? v : def;
    } catch (_) {
      return def;
    }
  };

  const todayDateString = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const nowTimeHHMM = () => {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const formatTanggalIndonesia = (s) => {
    const str = String(s || todayDateString());
    if (!str || str === "0000-00-00") return "-";
    const clean = str.split("T")[0];
    const parts = clean.split(/[-\/]/);
    if (parts.length < 3) return str;
    const yyyy = parts[0];
    const m = parseInt(parts[1], 10);
    const dd = parts[2];
    const bulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ][Math.max(0, Math.min(11, (isNaN(m) ? 1 : m) - 1))];
    return `${parseInt(dd, 10)} ${bulan} ${yyyy}`;
  };

  const hitungUsia = (tgl) => {
    const s = String(tgl || "");
    const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return "-";
    const by = parseInt(m[1], 10);
    const bm = parseInt(m[2], 10) - 1;
    const bd = parseInt(m[3], 10);
    const birth = new Date(by, bm, bd);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    const mdiff = now.getMonth() - birth.getMonth();
    if (mdiff < 0 || (mdiff === 0 && now.getDate() < birth.getDate())) years--;
    return `${years} th`;
  };

  const data = {
    instansi: getParam("instansi", setting?.nama_instansi || setting?.nama || "Instansi"),
    alamat_instansi:
      getParam("alamat", setting?.alamat_instansi || setting?.alamat || ""),
    jenis: getParam("jenis", ""),
    no_reg: getParam("no_reg", "-"),
    no_rkm_medis: getParam("no_rkm_medis", "-"),
    nm_pasien: getParam("nm_pasien", "-"),
    no_peserta: getParam("no_peserta", "-"),
    no_ktp: getParam("no_ktp", "-"),
    tgl_lahir: getParam("tgl_lahir", "-"),
    umur: (() => {
      const t = getParam("umur", "");
      return t ? t : hitungUsia(getParam("tgl_lahir", ""));
    })(),
    alamatpj: getParam("alamatpj", "-"),
    tanggal: formatTanggalIndonesia(getParam("tanggal", todayDateString())),
    jam: getParam("jam", nowTimeHHMM()),
  };

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        window.print();
      } catch (_) {}
    }, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Head title="Cetak Label Pendaftaran" />
      <div className="print-container">
        <style>{`
          @media print {
            @page {
              size: 58mm auto;
              margin: 2mm;
            }
            body { margin: 0; padding: 0; }
            .no-print { display: none !important; }
          }
          .print-container {
            width: 58mm;
            min-height: 30mm;
            padding: 2mm;
            font-size: 9pt;
            line-height: 1.2;
            font-family: Arial, sans-serif;
            margin: 0 auto;
            background: white;
            box-sizing: border-box;
            border: 1px solid #000;
          }
          @media screen {
            .print-container {
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
              margin: 20px auto;
            }
          }
          .header {
            text-align: center;
            border-bottom: 1px solid #000;
            padding-bottom: 2mm;
            margin-bottom: 2mm;
          }
          .header .title {
            font-weight: bold;
            font-size: 10pt;
          }
          .header .subtitle {
            font-size: 8pt;
          }
          .info-row {
            display: flex;
            font-size: 8pt;
            margin-bottom: 1.5mm;
          }
          .info-label { width: 22mm; flex-shrink: 0; }
          .info-value { flex: 1; }
          .footer { border-top: 1px dashed #000; padding-top: 2mm; margin-top: 2mm; text-align: center; font-size: 8pt; }
        `}</style>

        <div className="header">
          <div className="title">{data.instansi}</div>
          {data.alamat_instansi ? (
            <div className="subtitle">{data.alamat_instansi}</div>
          ) : null}
        </div>

        <div className="info-row">
          <div className="info-label">Jenis Pasien</div>
          <div className="info-value">: {data.jenis || "-"}</div>
        </div>
        <div className="info-row">
          <div className="info-label">No. Registrasi</div>
          <div className="info-value">: {data.no_reg}</div>
        </div>
        <div className="info-row">
          <div className="info-label">No. RM</div>
          <div className="info-value">: {data.no_rkm_medis}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Nama</div>
          <div className="info-value">: {data.nm_pasien}</div>
        </div>
        <div className="info-row">
          <div className="info-label">No. BPJS</div>
          <div className="info-value">: {data.no_peserta}</div>
        </div>
        <div className="info-row">
          <div className="info-label">NIK</div>
          <div className="info-value">: {data.no_ktp}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Tgl. Lahir</div>
          <div className="info-value">: {formatTanggalIndonesia(data.tgl_lahir)}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Umur</div>
          <div className="info-value">: {data.umur}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Alamat PJ</div>
          <div className="info-value">: {data.alamatpj}</div>
        </div>

        <div className="footer">
          {data.tanggal} • {data.jam}
        </div>
      </div>
    </>
  );
}
