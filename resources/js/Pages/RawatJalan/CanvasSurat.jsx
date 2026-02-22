import React, { useMemo, useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { route } from "ziggy-js";
import { format, addDays } from "date-fns";
import QRCode from "qrcode";
import PhysicalExamForm from "./NewComponen/PhysicalExamForm";
import Label from "@/Components/ui/Label";

const LETTER_TYPES = [
  { value: "SKS", label: "Surat Keterangan Sakit" },
  { value: "SKSEHAT", label: "Surat Keterangan Sehat" },
  { value: "SKNIKAH", label: "Surat Keterangan Nikah" },
  { value: "SKHAMIL", label: "Surat Keterangan Hamil" },
  { value: "SKCUTIHAMIL", label: "Surat Cuti Hamil" },
  { value: "KELAHIRAN", label: "Surat Kelahiran" },
  { value: "CUTI", label: "Surat Cuti Melahirkan" },
  { value: "IZIN_TERBANG", label: "Surat Izin Terbang Ibu Hamil" },
  { value: "RUJUKAN", label: "Surat Rujukan" },
  { value: "BEBAS_NARKOBA", label: "Surat Keterangan Bebas Narkoba" },
  { value: "HASIL_MATA", label: "Surat Hasil Pemeriksaan Mata" },
  { value: "KEMATIAN", label: "Surat Keterangan Catatan Kematian" },
  { value: "BEROBAT", label: "Surat Keterangan Berobat" },
  { value: "RAWAT_INAP", label: "Surat Keterangan Rawat Inap" },
];

const KopSurat = memo(({ kop }) => {
  const kab = (kop?.kabupaten || "").toString().trim();
  const prop = (kop?.propinsi || "").toString().trim();
  const instansi = (kop?.nama_instansi || "").toString().trim();
  const alamat = (kop?.alamat_instansi || "").toString().trim();
  const email = (kop?.email || "").toString().trim();
  const kontak = (kop?.kontak || "").toString().trim();

  return (
    <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-4">
      <div className="w-20 h-20 shrink-0">
        {kop.logoUrl ? (
          <img src={kop.logoUrl} alt="Logo" className="w-20 h-20 object-contain" />
        ) : null}
      </div>
      <div className="text-center flex-1 pr-10">
        <div className="text-[20px] font-bold uppercase leading-tight">{instansi || "NAMA INSTANSI"}</div>
        <div className="text-[12px] leading-tight font-medium">
          {[alamat, kab, prop].filter(Boolean).join(", ")}
        </div>
        <div className="text-[11px] leading-tight">
          {[email ? `Email: ${email}` : null, kontak ? `Telp: ${kontak}` : null].filter(Boolean).join(" • ")}
        </div>
      </div>
    </div>
  );
});

const Body = memo(({ type, kop, visitDate, istirahatHari, info, physicalData, marriageData, pregnancyData, leaveData, qrSrc, nomorFinal, doc, titleOf }) => {
  const tglStr = (() => { try { return format(new Date(visitDate), "dd-MM-yyyy"); } catch { return visitDate; } })();
  const kab = (kop?.kabupaten || "").toString().trim();
  const instansi = (kop?.nama_instansi || "").toString().trim();
  const dokterName = (doc?.nm_dokter || "").toString().trim();

  if (type === "SKS") {
    const mulai = (() => { try { return format(new Date(visitDate), "dd-MM-yyyy"); } catch { return visitDate; } })();
    const akhir = (() => {
      try { return format(addDays(new Date(visitDate), Math.max(istirahatHari - 1, 0)), "dd-MM-yyyy"); } catch { return ""; }
    })();
    const jkLabel = (() => {
      const v = (info.jk || "").toString().trim().toUpperCase();
      if (v === "L" || v === "LAKI-LAKI") return "Laki-Laki";
      if (v === "P" || v === "PEREMPUAN") return "Perempuan";
      return info.jk || "-";
    })();
    const terbilang = (n) => {
      const s = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
      const f = (x) => {
        if (x < 12) return s[x];
        if (x < 20) return f(x - 10) + " belas";
        if (x < 100) {
          const puluh = Math.floor(x / 10);
          const satu = x % 10;
          return f(puluh) + " puluh" + (satu ? " " + f(satu) : "");
        }
        if (x < 200) return "seratus" + (x > 100 ? " " + f(x - 100) : "");
        if (x < 1000) {
          const ratus = Math.floor(x / 100);
          const sisa = x % 100;
          return f(ratus) + " ratus" + (sisa ? " " + f(sisa) : "");
        }
        return String(x);
      };
      const t = f(Math.max(0, Math.floor(n)));
      return t.charAt(0).toUpperCase() + t.slice(1);
    };

    return (
      <div className="space-y-4">
        <KopSurat kop={kop} />
        <div className="text-center">
          <div className="text-lg font-semibold uppercase">Surat Keterangan</div>
          <div className="mt-1 text-xs">Nomor : {nomorFinal}</div>
        </div>

        <div className="text-sm leading-relaxed">
          <div className="mb-2">Yang bertanda tangan dibawah ini {"dr."} {dokterName || "______________________________"}</div>
          <div>Dokter pada {instansi || "Instansi Kesehatan"}, menerangkan bahwa :</div>
        </div>

        <div className="grid grid-cols-12 gap-y-1 text-sm">
          <div className="col-span-12 grid grid-cols-[9.5rem_0.75rem_1fr] items-baseline">
            <div>Nama Pasien</div>
            <div className="text-center">:</div>
            <div className="font-semibold break-words">{info.nama}</div>
          </div>
          <div className="col-span-12 grid grid-cols-[9.5rem_0.75rem_1fr] items-baseline">
            <div>Tanggal Lahir</div>
            <div className="text-center">:</div>
            <div className="flex gap-6">
              <span>{info.tglLahir ? format(new Date(info.tglLahir), "dd-MM-yyyy") : "-"}</span>
              <span className="inline-flex items-center gap-2"><span>Jenis Kelamin</span><span className="mx-1">:</span><span>{jkLabel}</span></span>
            </div>
          </div>
          <div className="col-span-12 grid grid-cols-[9.5rem_0.75rem_1fr] items-baseline">
            <div>Pekerjaan</div>
            <div className="text-center">:</div>
            <div className="break-words">{info.pekerjaan || "-"}</div>
          </div>
          <div className="col-span-12 grid grid-cols-[9.5rem_0.75rem_1fr] items-baseline">
            <div>Alamat</div>
            <div className="text-center">:</div>
            <div className="break-words">{info.alamat}</div>
          </div>
        </div>

        <div className="text-sm leading-relaxed mt-2">
          Pada waktu diperiksa dalam keadaan sakit, maka perlu istirahat selama :
          <span className="font-bold underline ml-1 mr-1 px-2">{istirahatHari}</span>
          {" "}( {terbilang(istirahatHari)} ) Hari, terhitung mulai tanggal {mulai} s/d {akhir}
        </div>

        <div className="text-sm leading-relaxed mt-2">
          Demikian surat keterangan ini dibuat untuk dapat digunakan sebagaimana mestinya.
        </div>

        <div className="grid grid-cols-12 mt-6 items-end">
          <div className="col-span-8" />
          <div className="col-span-4">
            <div className="text-sm text-center">{kab ? `${kab}, ${tglStr}` : tglStr}</div>
            <div className="text-sm text-center">Dokter Pemeriksa</div>
            {qrSrc ? (
              <div className="mt-3 flex justify-center">
                <img src={qrSrc} alt="QR" className="w-28 h-28 object-contain" />
              </div>
            ) : null}
            <div className="mt-4 text-center">( {dokterName || "__________________________"} )</div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="text-[11px]">*) Coret yang tidak perlu</div>
        </div>
      </div>
    );
  }

  if (type === "RUJUKAN") {
    return (
      <div className="space-y-4">
        <KopSurat kop={kop} />
        <div className="text-center">
          <div className="text-lg font-semibold uppercase">Surat Rujukan</div>
        </div>
        <div className="grid grid-cols-12 gap-3 text-sm">
          <div className="col-span-12 grid grid-cols-5">
            <div className="col-span-1">Nama</div>
            <div className="col-span-4 border-b border-dashed" />
          </div>
          <div className="col-span-12 grid grid-cols-5">
            <div className="col-span-1">No. RM</div>
            <div className="col-span-4 border-b border-dashed" />
          </div>
          <div className="col-span-12 grid grid-cols-5">
            <div className="col-span-1">Tujuan</div>
            <div className="col-span-4 border-b border-dashed" />
          </div>
        </div>
        <div className="text-sm mt-4">Mohon pemeriksaan dan penanganan lebih lanjut.</div>
        <div className="flex justify-end items-end mt-12">
          <div className="text-sm">
            <div className="text-right">{new Date(visitDate).toLocaleDateString("id-ID")}</div>
            <div className="mt-12 text-right">______________________________</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "SKSEHAT") {
    return (
      <div className="space-y-4">
        <KopSurat kop={kop} />
        <div className="text-center">
          <div className="text-md font-bold underline uppercase">Surat Keterangan Sehat</div>
          <div className="text-xs">Nomor: {nomorFinal}</div>
        </div>

        <div className="text-sm leading-tight text-justify">
          Yang bertanda tangan di bawah ini, Dokter yang bertugas di <span className="font-bold">{instansi || "Instansi Kesehatan"}</span>, menerangkan bahwa:
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 border border-gray-300 rounded-lg space-y-1">
            <div className="text-[10px] font-bold uppercase border-b border-gray-200 mb-1">Identitas Pasien</div>
            <div className="grid grid-cols-[60px_5px_1fr] text-[11px] gap-y-0.5">
              <div>Nama</div><div>:</div><div className="font-bold">{info.nama}</div>
              <div>No. RM</div><div>:</div><div>{info.noRm}</div>
              <div>Tgl Lahir</div><div>:</div><div>{info.tglLahir ? format(new Date(info.tglLahir), "dd-MM-yyyy") : "-"}</div>
              <div>Alamat</div><div>:</div><div className="truncate">{info.alamat}</div>
            </div>
          </div>
          <div className="p-3 border border-gray-300 rounded-lg space-y-1">
            <div className="text-[10px] font-bold uppercase border-b border-gray-200 mb-1">Hasil Pemeriksaan</div>
            <div className="grid grid-cols-[75px_5px_1fr] text-[11px] gap-y-0.5">
              <div>Berat Badan</div><div>:</div><div>{physicalData.berat || "-"} kg</div>
              <div>Tinggi Badan</div><div>:</div><div>{physicalData.tinggi || "-"} cm</div>
              <div>Tensi</div><div>:</div><div>{physicalData.tensi || "-"} mmHg</div>
              <div>Suhu</div><div>:</div><div>{physicalData.suhu || "-"} °C</div>
              <div>Buta Warna</div><div>:</div><div>{physicalData.butawarna}</div>
            </div>
          </div>
        </div>

        <div className="text-sm">
          Maka yang bersangkutan dinyatakan <span className="font-bold text-lg">{physicalData.kesimpulan?.toUpperCase()}</span> dan dapat melakukan aktivitas normal untuk keperluan <span className="font-bold">{physicalData.keperluan || "________________"}</span>.
        </div>

        <div className="text-sm mt-3">
          Demikian surat keterangan ini dibuat untuk dipergunakan seperlunya.
        </div>

        <div className="grid grid-cols-2 mt-6">
          <div className="text-center">
            <div className="text-xs">Validasi Dokumen</div>
            {qrSrc && <img src={qrSrc} alt="QR" className="w-20 h-20 mx-auto object-contain mt-1" />}
          </div>
          <div className="text-center space-y-1">
            <div className="text-xs">{kab ? `${kab}, ${tglStr}` : tglStr}</div>
            <div className="text-xs">Dokter Pemeriksa</div>
            <div className="h-16" />
            <div className="text-sm font-bold">( {dokterName || "__________________________"} )</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "SKNIKAH") {
    const calculateDetailedAge = (birthDate) => {
      if (!birthDate) return "-";
      try {
        const birth = new Date(birthDate);
        const today = new Date();
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();
        if (days < 0) {
          months--;
          const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
          days += lastMonth.getDate();
        }
        if (months < 0) {
          years--;
          months += 12;
        }
        return `${years} Th ${months} Bl ${days} Hr`;
      } catch { return "-"; }
    };

    const ageBride = calculateDetailedAge(info.tglLahir);
    const ageGroom = calculateDetailedAge(marriageData?.tgl_lahir_suami);
    const tglPPTest = (() => { try { return format(new Date(marriageData?.tanggal_pp_test || visitDate), "dd-MM-yyyy"); } catch { return "-"; } })();

    return (
      <div className="space-y-4 text-black">
        <KopSurat kop={kop} />
        <div className="text-center">
          <div className="text-[16px] font-bold underline uppercase">SURAT KETERANGAN DOKTER</div>
          <div className="text-sm font-medium">{nomorFinal}</div>
        </div>

        <div className="text-sm leading-relaxed">
          Yang bertandatangan di bawah ini Dokter Penguji Kesehatan pada <span className="font-bold">{instansi}</span> mengingat sumpah /janji jabatan dengan ini menerangkan dengan sesungguhnya bahwa :
        </div>

        <table className="w-full border-collapse border border-black text-[11px]">
          <thead>
            <tr>
              <th rowSpan="2" className="border border-black p-1 w-1/4">Identitas</th>
              <th colSpan="2" className="border border-black p-1">Calon Pengantin</th>
            </tr>
            <tr>
              <th className="border border-black p-1 w-[37.5%]">Perempuan</th>
              <th className="border border-black p-1 w-[37.5%]">Laki - Laki</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1">Nama</td>
              <td className="border border-black p-1 uppercase font-semibold">{info.nama}</td>
              <td className="border border-black p-1 uppercase font-semibold">{marriageData?.nm_suami || "-"}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">Umur</td>
              <td className="border border-black p-1">{ageBride}</td>
              <td className="border border-black p-1">{ageGroom}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">Pekerjaan</td>
              <td className="border border-black p-1 uppercase">{info.pekerjaan || "-"}</td>
              <td className="border border-black p-1 uppercase">{marriageData?.pekerjaan_suami || "-"}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">Alamat</td>
              <td className="border border-black p-1 uppercase">{info.alamat}</td>
              <td className="border border-black p-1 uppercase">{marriageData?.alamat_suami || "-"}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">No KTP / Identitas Lain</td>
              <td className="border border-black p-1">{info.noKtp || "-"}</td>
              <td className="border border-black p-1">{marriageData?.no_ktp_suami || "-"}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">TT -1</td>
              <td className="border border-black p-1">{tglPPTest}</td>
              <td className="border border-black p-1"></td>
            </tr>
          </tbody>
        </table>

        <div className="text-[11px] space-y-1">
          <p>Telah diperiksa dengan teliti dan berpendapat, bahwa yang diperiksa :</p>
          <div className="pl-4">
            <p className="flex gap-2"><span>a.</span> <span>Memenuhi Syarat untuk melangsungkan perkawinan *)</span></p>
            <p className="flex gap-2"><span>b.</span> <span>Untuk Sementara belum memenuhi syarat dan memerlukan pengobatan / perawatan dan pemeriksaan diulang setelah selesai pengobatan /perawatan *)</span></p>
            <p className="flex gap-2"><span>c.</span> <span>untuk keperluan pemeriksaan berdasarkan Peraturan Daerah Kabupaten Karanganyar Nomor 19 tahun 2023 tentang Pajak Daerah dan Retribusi Daerah pada Unit Pelaksana Teknis Pusat Kesehatan dikenakan tarif sebesar <br /><span className="font-bold">Rp. 15.000,00 ( Lima Belas Ribu Rupiah )</span></span></p>
          </div>
          <p>Demikian Surat Keterangan ini dibuat untuk dapat dipergunakan seperlunya.</p>
        </div>

        <div className="grid grid-cols-2 text-[11px] mt-4">
          <div>
            <p className="font-medium">Catatan Pemeriksaan :</p>
            <p className="ml-4">Test Kehamilan : <span className="font-medium">{marriageData?.hasil_pp_test || "Negatif"}</span></p>
          </div>
          <div className="text-center">
            <p>{kab || "Kerjo"}, {tglStr}</p>
            <p>Kepala {instansi}</p>
            <p>Dokter Penguji,</p>
            {qrSrc && (
              <div className="my-1 flex justify-center">
                <img src={qrSrc} alt="QR" className="w-20 h-20 object-contain" />
              </div>
            )}
            <p className="mt-1 font-bold underline">dr. {dokterName}</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "SKHAMIL") {
    return (
      <div className="space-y-4 text-black text-sm">
        <KopSurat kop={kop} />
        <div className="text-center space-y-1">
          <div className="text-lg font-bold underline uppercase">SURAT KETERANGAN HAMIL</div>
          <div className="text-xs">Nomor: {nomorFinal}</div>
        </div>
        <div className="space-y-4 leading-relaxed">
          <p>Yang bertanda tangan di bawah ini, Dokter yang bertugas di <span className="font-bold">{instansi || "Instansi Kesehatan"}</span>, menerangkan bahwa:</p>
          <div className="grid grid-cols-[120px_5px_1fr] gap-y-1 ml-4">
            <div>Nama</div><div>:</div><div className="font-bold uppercase">{info.nama}</div>
            <div>Umur</div><div>:</div><div>{info.umur}</div>
            <div>Pekerjaan</div><div>:</div><div className="uppercase">{info.pekerjaan || "-"}</div>
            <div>Alamat</div><div>:</div><div className="uppercase">{info.alamat}</div>
          </div>
          <p>Berdasarkan hasil pemeriksaan fisik dan penunjang yang telah dilakukan pada tanggal <span className="font-bold">{tglStr}</span>, pasien tersebut di atas dinyatakan:</p>
          <div className="text-center py-4">
            <span className="text-2xl font-black border-2 border-black px-8 py-2 uppercase tracking-widest bg-gray-50">
              {pregnancyData.hasilperiksa || "HAMIL"}
            </span>
          </div>
          <p>Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
        </div>
        <div className="flex justify-end mt-8">
          <div className="text-center space-y-1 min-w-[200px]">
            <p>{kab || "Kerjo"}, {tglStr}</p>
            <p>Dokter Pemeriksa,</p>
            <div className="h-20 flex items-center justify-center">
              {qrSrc && <img src={qrSrc} alt="QR" className="w-20 h-20 object-contain" />}
            </div>
            <p className="font-bold underline">dr. {dokterName}</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "SKCUTIHAMIL") {
    return (
      <div className="space-y-4 text-black text-sm">
        <KopSurat kop={kop} />
        <div className="text-center space-y-1">
          <div className="text-lg font-bold underline uppercase">SURAT KETERANGAN CUTI HAMIL / MELAHIRKAN</div>
          <div className="text-xs">Nomor: {nomorFinal}</div>
        </div>
        <div className="space-y-4 leading-relaxed">
          <p>Yang bertanda tangan di bawah ini, Dokter yang bertugas di <span className="font-bold">{instansi || "Instansi Kesehatan"}</span>, menerangkan bahwa:</p>
          <div className="grid grid-cols-[120px_5px_1fr] gap-y-1 ml-4">
            <div>Nama</div><div>:</div><div className="font-bold uppercase">{info.nama}</div>
            <div>Umur</div><div>:</div><div>{info.umur}</div>
            <div>Pekerjaan</div><div>:</div><div className="uppercase">{info.pekerjaan || "-"}</div>
            <div>Alamat</div><div>:</div><div className="uppercase">{info.alamat}</div>
          </div>
          <p>
            Berdasarkan hasil pemeriksaan yang telah dilakukan pada tanggal <span className="font-bold">{tglStr}</span>, pasien tersebut di atas dalam keadaan <span className="font-bold">{leaveData?.keterangan_hamil || "Hamil"}</span>.
          </p>
          <p>
            Sesuai dengan Hari Perkiraan Lahir (HPL) yang jatuh pada tanggal <span className="font-bold">{leaveData?.perkiraan_lahir ? format(new Date(leaveData.perkiraan_lahir), "dd-MM-yyyy") : "-"}</span>, maka kepada pasien tersebut diberikan hak cuti terhitung mulai tanggal <span className="font-bold">{leaveData?.terhitung_mulai ? format(new Date(leaveData.terhitung_mulai), "dd-MM-yyyy") : "-"}</span>.
          </p>
          <p>Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
        </div>
        <div className="flex justify-end mt-8">
          <div className="text-center space-y-1 min-w-[200px]">
            <p>{kab || "Kerjo"}, {tglStr}</p>
            <p>Dokter Pemeriksa,</p>
            <div className="h-20 flex items-center justify-center">
              {qrSrc && <img src={qrSrc} alt="QR" className="w-20 h-20 object-contain" />}
            </div>
            <p className="font-bold underline">dr. {dokterName}</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "RAWAT_INAP") {
    return (
      <div className="space-y-4">
        <KopSurat kop={kop} />
        <div className="text-center">
          <div className="text-lg font-semibold uppercase">Surat Keterangan Rawat Inap</div>
        </div>
        <div className="grid grid-cols-12 gap-3 text-sm">
          <div className="col-span-12 grid grid-cols-5">
            <div className="col-span-1">Nama</div>
            <div className="col-span-4 border-b border-dashed" />
          </div>
          <div className="col-span-12 grid grid-cols-5">
            <div className="col-span-1">No. RM</div>
            <div className="col-span-4 border-b border-dashed" />
          </div>
          <div className="col-span-12 text-sm">
            Telah menjalani perawatan inap pada tanggal
            <span className="inline-block w-36 border-b border-dashed mx-2" />
            s/d
            <span className="inline-block w-36 border-b border-dashed mx-2" />
            .
          </div>
        </div>
        <div className="flex justify-end items-end mt-12">
          <div className="text-sm">
            <div className="text-right">{new Date(visitDate).toLocaleDateString("id-ID")}</div>
            <div className="mt-12 text-right">______________________________</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <KopSurat kop={kop} />
      <div className="text-center">
        <div className="text-lg font-semibold">{titleOf(type)}</div>
        <div className="mt-1 text-xs">No.: ________</div>
      </div>
      <div className="grid grid-cols-12 gap-3 text-sm">
        <div className="col-span-12 grid grid-cols-5">
          <div className="col-span-1">Nama</div>
          <div className="col-span-4 border-b border-dashed" />
        </div>
        <div className="col-span-12 grid grid-cols-5">
          <div className="col-span-1">No. RM</div>
          <div className="col-span-4 border-b border-dashed" />
        </div>
        <div className="col-span-12 grid grid-cols-5">
          <div className="col-span-1">Keterangan</div>
          <div className="col-span-4 border-b border-dashed" />
        </div>
      </div>
      <div className="flex justify-end items-end mt-6">
        <div className="text-sm">
          <div className="text-right">{new Date(visitDate).toLocaleDateString("id-ID")}</div>
          <div className="mt-12 text-right">______________________________</div>
        </div>
      </div>
    </div>
  );
});

export default function CanvasSurat({ patient, defaultDate, token = "", noRawat = "", noRkmMedis = "" }) {
  const printRef = useRef();

  const handlePrint = useCallback(() => {
    if (!printRef.current) return;
    const content = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank", "width=800,height=900");
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(s => s.outerHTML)
      .join("");

    printWindow.document.write(`
          <html>
            <head>
              <title>Cetak Surat</title>
              ${styles}
              <style>
                @media print {
                  body {margin: 0; padding: 20px; }
                .no-print {display: none !important; }
                * {-webkit - print - color - adjust: exact; print-color-adjust: exact; }
            }
                body {font - family: sans-serif; }
              </style>
            </head>
            <body>
              <div class="printable-content">${content}</div>
              <script>
            window.onload = () => {
                  setTimeout(() => {
                    window.print();
                    window.close();
                  }, 500);
            };
              </script>
            </body>
          </html>
          `);
    printWindow.document.close();
  }, []);

  const absoluteUrl = (path) => {
    try {
      const base = window?.location?.origin || "";
      if (!base) return path;
      if (/^https?:\/\//i.test(path)) return path;
      return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
    } catch {
      return path;
    }
  };
  const b64FromUtf8 = (s) => {
    try {
      const bytes = new window.TextEncoder().encode(String(s));
      let binary = "";
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
      return btoa(binary);
    } catch {
      return "";
    }
  };
  const b64UrlSafe = (b64) => b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  const today = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);


  const [selectedType, setSelectedType] = useState(() => {
    if (typeof window === "undefined") return LETTER_TYPES[0].value;
    try {
      const params = new URLSearchParams(window.location.search || "");
      const rawType = params.get("type");
      const normalized = String(rawType || "").trim().toUpperCase();
      if (!normalized) return LETTER_TYPES[0].value;
      const match = LETTER_TYPES.find((t) => String(t.value || "").toUpperCase() === normalized);
      return match ? match.value : LETTER_TYPES[0].value;
    } catch {
      return LETTER_TYPES[0].value;
    }
  });
  const [visitDate, setVisitDate] = useState(defaultDate || today);
  const [pat, setPat] = useState(patient || null);
  const [doc, setDoc] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [kop, setKop] = useState({
    nama_instansi: "",
    alamat_instansi: "",
    kabupaten: "",
    propinsi: "",
    kontak: "",
    email: "",
    logoUrl: "",
  });
  const [istirahatHari, setIstirahatHari] = useState(3);
  const [physicalData, setPhysicalData] = useState({
    berat: "",
    tinggi: "",
    tensi: "",
    suhu: "",
    butawarna: "Tidak",
    keperluan: "",
    kesimpulan: "Sehat",
  });
  const [marriageData, setMarriageData] = useState({
    nm_suami: "",
    tgl_lahir_suami: "",
    pekerjaan_suami: "Karyawan Swasta",
    alamat_suami: "",
    no_ktp_suami: "",
    status_suami: "Perjaka",
    tanggal_pp_test: today,
    hasil_pp_test: "Negatif",
  });
  const [pregnancyData, setPregnancyData] = useState({
    hasilperiksa: "Hamil",
    tanggalperiksa: today,
  });
  const [leaveData, setLeaveData] = useState({
    keterangan_hamil: "Hamil",
    terhitung_mulai: today,
    perkiraan_lahir: today,
  });
  const [suratSeq, setSuratSeq] = useState(null);
  const [serverNomorSurat, setServerNomorSurat] = useState("");
  const nomorSurat = useMemo(() => {
    try {
      const d = new Date(visitDate);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const type = String(selectedType || "SKS").toUpperCase();
      if (type === "SKNIKAH") {
        const seqStr = suratSeq ? String(suratSeq) : "1";
        return `No. 445.1/${seqStr}.14/${yyyy}`;
      }
      const seq = suratSeq ? String(suratSeq).padStart(5, "0") : "00001";
      return `${type}${yyyy}${mm}${dd}${seq}`;
    } catch {
      const type = String(selectedType || "SKS").toUpperCase();
      if (type === "SKNIKAH") {
        const yyyy = new Date().getFullYear();
        return `No. 445.1/1.14/${yyyy}`;
      }
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");
      return `${type}${yyyy}${mm}${dd}00001`;
    }
  }, [visitDate, suratSeq, selectedType]);
  const nomorFinal = useMemo(() => {
    const s = String(serverNomorSurat || "").trim();
    if ((selectedType === "SKS" || selectedType === "SKNIKAH") && s) return s;
    return nomorSurat;
  }, [serverNomorSurat, nomorSurat, selectedType]);

  const titleOf = useCallback((val) => {
    const t = LETTER_TYPES.find((x) => x.value === val);
    return t?.label || val;
  }, []);

  const info = useMemo(() => ({
    nama: pat?.nm_pasien || "-",
    noRm: pat?.no_rkm_medis || "-",
    jk: pat?.jk || "-",
    umur: pat?.umur || pat?.age || "-",
    alamat: pat?.alamat || "-",
    tglLahir: pat?.tgl_lahir || "",
    pekerjaan: pat?.pekerjaan || "",
    noKtp: pat?.no_ktp || "-",
  }), [pat]);
  const [qrSrc, setQrSrc] = useState("");
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState("");
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const verKey = useMemo(() => `sksVerify:${nomorFinal}`, [nomorFinal]);
  const isValidated = useMemo(() => {
    try {
      return !!verifyResult && String(verifyResult?.status || "").toLowerCase() === "valid";
    } catch {
      return false;
    }
  }, [verifyResult]);

  const safeNoRawat = useMemo(() => {
    try {
      const s = String(noRawat || "");
      return s.replace(/\//g, "");
    } catch {
      return String(noRawat || "");
    }
  }, [noRawat]);



  const normalizeJk = (v) => {
    const s = String(v || "").trim().toUpperCase();
    if (s === "L" || s === "LAKI-LAKI" || s === "L") return "Laki-laki";
    if (s === "P" || s === "PEREMPUAN") return "Perempuan";
    return "Laki-laki";
  };
  const pekerjaanAllowed = [
    "Karyawan Swasta",
    "PNS",
    "Wiraswasta",
    "Pelajar",
    "Mahasiswa",
    "Buruh",
    "Lain-lain",
  ];
  const normalizePekerjaan = (v) => {
    const s = String(v || "").trim();
    return pekerjaanAllowed.includes(s) ? s : "Karyawan Swasta";
  };

  const handleSave = useCallback(async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const d = new Date(visitDate);
      const ymd = isNaN(d.getTime()) ? visitDate : d.toISOString().slice(0, 10);

      if (selectedType === 'SKS') {
        let endStr = ymd;
        try {
          const end = addDays(new Date(visitDate), Math.max(istirahatHari - 1, 0));
          endStr = end.toISOString().slice(0, 10);
        } catch { }

        const payload = {
          no_surat: nomorFinal,
          no_rawat: noRawat || "",
          tanggalawal: ymd,
          tanggalakhir: endStr,
          lamasakit: String(istirahatHari),
          nama2: pat?.nm_pasien || info.nama || "",
          tgl_lahir: pat?.tgl_lahir || info.tglLahir || ymd,
          umur: String(info.umur || ""),
          jk: normalizeJk(info.jk),
          alamat: info.alamat || "",
          hubungan: "Suami",
          pekerjaan: normalizePekerjaan(info.pekerjaan),
          instansi: kop?.nama_instansi || "",
          ...physicalData,
        };

        let url = "/rawat-jalan/surat-sakit";
        try { url = route("rawat-jalan.surat-sakit.store"); } catch { }
        await axios.post(url, payload, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          }
        });
      } else if (selectedType === 'SKNIKAH') {
        const payload = {
          no_surat: nomorFinal,
          no_rawat: noRawat || "",
          no_ktp_suami: marriageData.no_ktp_suami,
          nm_suami: marriageData.nm_suami,
          tgl_lahir: marriageData.tgl_lahir_suami,
          umur: (() => {
            if (!marriageData.tgl_lahir_suami) return "0";
            const birth = new Date(marriageData.tgl_lahir_suami);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
            return String(age);
          })(),
          jk: marriageData.status_suami,
          alamat: marriageData.alamat_suami,
          hasil_pp_test: marriageData.hasil_pp_test,
          tanggal_pp_test: marriageData.tanggal_pp_test,
          pekerjaan: marriageData.pekerjaan_suami,
          tanggal: ymd,
          tanggal_nikah: ymd,
        };

        let url = "/rawat-jalan/surat-nikah/store";
        try { url = route("rawat-jalan.surat-nikah.store"); } catch { }
        await axios.post(url, payload, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          }
        });
      } else if (selectedType === 'SKHAMIL') {
        const payload = {
          no_surat: nomorFinal,
          no_rawat: noRawat || "",
          tanggalperiksa: ymd,
          hasilperiksa: pregnancyData.hasilperiksa,
        };

        let url = "/rawat-jalan/surat-hamil/store";
        try { url = route("rawat-jalan.surat-hamil.store"); } catch { }
        await axios.post(url, payload, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          }
        });
      } else if (selectedType === 'SKCUTIHAMIL') {
        const payload = {
          no_surat: nomorFinal,
          no_rawat: noRawat || "",
          keterangan_hamil: leaveData.keterangan_hamil,
          terhitung_mulai: leaveData.terhitung_mulai,
          perkiraan_lahir: leaveData.perkiraan_lahir,
        };

        let url = "/rawat-jalan/surat-cuti-hamil/store";
        try { url = route("rawat-jalan.surat-cuti-hamil.store"); } catch { }
        await axios.post(url, payload, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          }
        });
      }

      setSaveStatus({ type: 'success', message: 'Data tersimpan' });
    } catch (e) {
      console.error(e);
      setSaveStatus({ type: 'error', message: 'Gagal menyimpan data' });
    } finally {
      setIsSaving(false);
    }
  }, [isSaving, selectedType, visitDate, nomorFinal, noRawat, info, marriageData, pregnancyData, leaveData, istirahatHari, pat, kop, physicalData]);

  const reduceMotion = useMemo(() => {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
  }, []);
  const modalVariants = useMemo(() => (reduceMotion ? {} : { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }, exit: { opacity: 0, y: 12, transition: { duration: 0.18 } } }), [reduceMotion]);
  const toastVariants = useMemo(() => (reduceMotion ? {} : { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }, exit: { opacity: 0, y: 8, transition: { duration: 0.18 } } }), [reduceMotion]);

  useEffect(() => {
    let cancelled = false;
    const loadIdentity = async () => {
      if (pat && doc) return;
      try {
        let regData = null;
        if (noRawat) {
          try {
            const respRegExact = await axios.get("/api/reg-periksa/by-rawat", {
              params: { no_rawat: noRawat },
              withCredentials: true,
              headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
            });
            regData = respRegExact?.data?.data || null;
          } catch (_) {
            try {
              const respReg = await axios.get("/api/reg-periksa", {
                params: { search: noRawat, per_page: 1 },
                withCredentials: true,
                headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
              });
              regData = respReg?.data?.data?.data?.[0] || null;
            } catch (_) { }
          }
        } else if (noRkmMedis) {
          try {
            const respReg = await axios.get("/api/reg-periksa", {
              params: { search: noRkmMedis, per_page: 1 },
              withCredentials: true,
              headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
            });
            regData = respReg?.data?.data?.data?.[0] || null;
          } catch (_) { }
        }
        const patientObj = regData?.patient || regData?.pasien || null;
        if (!cancelled && patientObj) setPat(patientObj);
        const dokterObj = regData?.dokter || regData?.doctor || null;
        if (!cancelled && dokterObj) {
          setDoc(dokterObj);
        } else if (regData?.kd_dokter && !cancelled) {
          try {
            const respDok = await axios.get(`/api/dokter/${encodeURIComponent(regData.kd_dokter)}`, {
              withCredentials: true,
              headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
            });
            const d = respDok?.data?.data || null;
            if (d) setDoc(d);
          } catch (_) { }
        }
      } catch (_) { }
    };
    loadIdentity();
    return () => { cancelled = true; };
  }, [pat, noRawat, noRkmMedis]);

  useEffect(() => {
    let cancelled = false;
    const loadPhysicalData = async () => {
      if (!noRawat) return;
      try {
        let url = `/rawat-jalan/pemeriksaan-ralan?no_rawat=${encodeURIComponent(noRawat)}`;
        try { url = route('rawat-jalan.pemeriksaan-ralan', { no_rawat: noRawat }); } catch (_) { }
        const resp = await axios.get(url, {
          withCredentials: true,
          headers: { Accept: "application/json" }
        });
        const data = resp?.data?.data?.[0] || resp?.data?.data || null;
        if (data && !cancelled) {
          setPhysicalData(prev => ({
            ...prev,
            berat: data.berat || prev.berat,
            tinggi: data.tinggi || prev.tinggi,
            tensi: data.tensi || prev.tensi,
            suhu: data.suhu || prev.suhu,
          }));
        }
      } catch (_) { }
    };
    loadPhysicalData();
    return () => { cancelled = true; };
  }, [noRawat]);

  useEffect(() => {
    try {
      const d = new Date(visitDate);
      const yyyy = String(d.getFullYear());
      const type = String(selectedType || "SKS").toUpperCase();
      const key = `suratSeq:${type}:${yyyy}`;
      let curr = 0;
      try {
        const raw = localStorage.getItem(key);
        curr = raw ? parseInt(raw, 10) || 0 : 0;
      } catch { }
      const next = curr + 1;
      try {
        localStorage.setItem(key, String(next));
      } catch { }
      setSuratSeq(next);
    } catch {
      setSuratSeq(1);
    }
  }, [selectedType, visitDate]);

  useEffect(() => {
    let cancelled = false;
    const fetchNextNoSurat = async () => {
      try {
        if (selectedType !== "SKS") { setServerNomorSurat(""); return; }
        const d = new Date(visitDate);
        const ymd = isNaN(d.getTime()) ? String(visitDate || "") : d.toISOString().slice(0, 10);
        const findParams = {
          label: String(selectedType || "SKS"),
          no_rawat: String(noRawat || ""),
          no_rkm_medis: String(noRkmMedis || ""),
          tanggal: ymd,
        };
        let findUrl = "/rawat-jalan/validasi-ttd/find";
        try { findUrl = route("rawat-jalan.validasi-ttd.find", findParams); } catch (_) { }
        try {
          const found = await axios.get(findUrl, { params: findParams, withCredentials: true, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" } });
          const row = found?.data?.row || null;
          if (row && row.no_surat && !cancelled) { setServerNomorSurat(String(row.no_surat)); return; }
        } catch (_) { }
        const params = { tanggal: visitDate };
        let url = "/rawat-jalan/surat-sakit/next-no-surat";
        try { url = route("rawat-jalan.surat-sakit.next-no-surat", params); } catch (_) { }
        const resp = await axios.get(url, { params, headers: { Accept: "application/json" } });
        const num = resp?.data?.nomor || "";
        if (!cancelled) setServerNomorSurat(String(num || ""));
      } catch (_) {
        if (!cancelled) setServerNomorSurat("");
      }
    };
    fetchNextNoSurat();
    return () => { cancelled = true; };
  }, [selectedType, visitDate, noRawat, noRkmMedis]);

  useEffect(() => {
    let cancelled = false;
    const loadKop = async () => {
      try {
        const resp = await axios.get("/setting/app", {
          withCredentials: true,
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
        });
        const arr = Array.isArray(resp?.data?.data) ? resp.data.data : [];
        const active = arr.find((r) => String(r.aktifkan || "").toLowerCase() === "yes") || arr[0] || null;
        if (!cancelled && active) {
          let logo = "";
          try {
            logo = route("setting.app.logo", { nama_instansi: active.nama_instansi });
          } catch (_) {
            const n = typeof active.nama_instansi === "string" ? active.nama_instansi : "";
            logo = `/setting/app/${encodeURIComponent(n)}/logo`;
          }
          setKop({
            nama_instansi: active.nama_instansi || "",
            alamat_instansi: active.alamat_instansi || "",
            kabupaten: active.kabupaten || "",
            propinsi: active.propinsi || "",
            kontak: active.kontak || "",
            email: active.email || "",
            logoUrl: logo,
          });
        }
      } catch (_) { }
    };
    loadKop();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(verKey);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved?.result) setVerifyResult(saved.result);
        if (saved?.token) setVerifyToken(saved.token);
      } else {
        setVerifyResult(null);
      }
    } catch { setVerifyResult(null); }
  }, [verKey]);

  useEffect(() => {
    try {
      if (isValidated) {
        const payload = { token: verifyToken, result: verifyResult };
        localStorage.setItem(verKey, JSON.stringify(payload));
      }
    } catch { }
  }, [isValidated, verKey, verifyToken, verifyResult]);

  useEffect(() => {
    if (!saveStatus) return;
    const t = setTimeout(() => setSaveStatus(null), 2500);
    return () => clearTimeout(t);
  }, [saveStatus]);

  useEffect(() => {
    const buildQr = async () => {
      try {
        const fmtDate = (raw) => {
          const s = String(raw || "").trim();
          if (!s) return "";
          try {
            if (/^\d{4}-\d{2}-\d{2}/.test(s)) return format(new Date(s), "dd-MM-yyyy");
          } catch (_) { }
          try {
            if (/^\d{2}-\d{2}-\d{4}$/.test(s)) return s;
          } catch (_) { }
          try { return format(new Date(s), "dd-MM-yyyy"); } catch (_) { return s; }
        };

        const statusStr = String(verifyResult?.status || "").trim();
        const hasStatus = !!statusStr;
        const p = verifyResult?.payload && typeof verifyResult.payload === "object" ? verifyResult.payload : {};
        const typeVal = String(p.type || selectedType || "").trim().toUpperCase();
        const typeLabel = (LETTER_TYPES.find((t) => String(t.value || "").toUpperCase() === typeVal)?.label) || typeVal || "-";

        if (hasStatus || typeVal !== "SKS") {
          const instansi = String(p.instansi || kop?.nama_instansi || "").trim();
          const nomor = String(p.nomor || nomorFinal || "").trim();
          const nama = String(p.nama || pat?.nm_pasien || info?.nama || "").trim();
          const mr = String(p.mr || pat?.no_rkm_medis || info?.noRm || "").trim();
          const dokter = String(p.dokter || doc?.nm_dokter || "").trim();
          const tanggalSurat = fmtDate(p.tanggal_surat) || fmtDate(visitDate);
          const noRawatStr = String(p.no_rawat || noRawat || "").trim();

          const extraLines = (() => {
            const lines = [];
            if (typeVal === "SKS") {
              const hariStr = p.hari != null && String(p.hari).trim() ? String(p.hari).trim() : (istirahatHari != null ? String(istirahatHari) : "");
              const mulaiStr = fmtDate(p.mulai) || fmtDate(visitDate);
              const akhirStr = fmtDate(p.akhir) || fmtDate(addDays(new Date(visitDate), Math.max((istirahatHari || 1) - 1, 0)));
              if (hariStr) lines.push(`Lama Istirahat: ${hariStr} hari`);
              if (mulaiStr) lines.push(`Mulai: ${mulaiStr}`);
              if (akhirStr) lines.push(`Akhir: ${akhirStr}`);
            }

            if (typeVal === "SKNIKAH") {
              const nmSuami = String(p.nm_suami || marriageData?.nm_suami || "").trim();
              const noKtpSuami = String(p.no_ktp_suami || marriageData?.no_ktp_suami || "").trim();
              const tglLahirSuami = fmtDate(p.tgl_lahir_suami || marriageData?.tgl_lahir_suami);
              const pekerjaanSuami = String(p.pekerjaan_suami || marriageData?.pekerjaan_suami || "").trim();
              const alamatSuami = String(p.alamat_suami || marriageData?.alamat_suami || "").trim();
              const statusSuami = String(p.status_suami || marriageData?.status_suami || "").trim();
              const tanggalPpTest = fmtDate(p.tanggal_pp_test || marriageData?.tanggal_pp_test);
              const hasilPpTest = String(p.hasil_pp_test || marriageData?.hasil_pp_test || "").trim();
              if (nmSuami) lines.push(`Nama Suami: ${nmSuami}`);
              if (noKtpSuami) lines.push(`KTP Suami: ${noKtpSuami}`);
              if (tglLahirSuami) lines.push(`Tgl Lahir Suami: ${tglLahirSuami}`);
              if (pekerjaanSuami) lines.push(`Pekerjaan Suami: ${pekerjaanSuami}`);
              if (alamatSuami) lines.push(`Alamat Suami: ${alamatSuami}`);
              if (statusSuami) lines.push(`Status Suami: ${statusSuami}`);
              if (tanggalPpTest) lines.push(`Tanggal PP Test: ${tanggalPpTest}`);
              if (hasilPpTest) lines.push(`Hasil PP Test: ${hasilPpTest}`);
            }

            if (typeVal === "SKHAMIL") {
              const hasil = String(p.hasilperiksa || pregnancyData?.hasilperiksa || "Hamil").trim();
              if (hasil) lines.push(`Hasil: ${hasil}`);
            }

            if (typeVal !== "SKNIKAH" && typeVal !== "SKHAMIL") {
              const berat = String(p.berat || physicalData?.berat || "").trim();
              const tinggi = String(p.tinggi || physicalData?.tinggi || "").trim();
              const tensi = String(p.tensi || physicalData?.tensi || "").trim();
              const suhu = String(p.suhu || physicalData?.suhu || "").trim();
              const butawarna = String(p.butawarna || physicalData?.butawarna || "").trim();
              const keperluan = String(p.keperluan || physicalData?.keperluan || "").trim();
              const kesimpulan = String(p.kesimpulan || physicalData?.kesimpulan || "").trim();

              if (berat) lines.push(`BB: ${berat} kg`);
              if (tinggi) lines.push(`TB: ${tinggi} cm`);
              if (tensi) lines.push(`TD: ${tensi} mmHg`);
              if (suhu) lines.push(`Suhu: ${suhu} °C`);
              if (butawarna && butawarna !== "Tidak") lines.push(`Buta Warna: ${butawarna}`);
              if (keperluan) lines.push(`Keperluan: ${keperluan}`);
              if (kesimpulan) lines.push(`Kesimpulan: ${kesimpulan}`);
            }

            return lines;
          })();

          const lines = [
            typeLabel ? `${typeLabel}` : "SURAT",
            instansi ? `Instansi: ${instansi}` : null,
            nomor ? `Nomor: ${nomor}` : null,
            tanggalSurat ? `Tanggal: ${tanggalSurat}` : null,
            noRawatStr ? `No. Rawat: ${noRawatStr}` : null,
            nama ? `Nama: ${nama}` : null,
            mr ? `MR: ${mr}` : null,
            dokter ? `Dokter: ${dokter}` : null,
            ...extraLines,
            hasStatus ? `Status: ${String(statusStr).toUpperCase()}` : "Status: DRAFT",
          ].filter(Boolean);

          const text = lines.join("\n");
          const img = await QRCode.toDataURL(text, { width: 192, margin: 0 });
          setQrSrc(img);
          return;
        }

        const dStr = format(new Date(visitDate), "dd-MM-yyyy");
        const startStr = format(new Date(visitDate), "dd-MM-yyyy");
        const endStr = format(addDays(new Date(visitDate), Math.max(istirahatHari - 1, 0)), "dd-MM-yyyy");
        const payload = {
          type: "SKS",
          nomor: nomorFinal,
          instansi: kop?.nama_instansi || "",
          nama: pat?.nm_pasien || "-",
          tgl_lahir: pat?.tgl_lahir || "",
          mr: pat?.no_rkm_medis || "-",
          tanggal_surat: dStr,
          dokter: (doc?.nm_dokter || ""),
          status: "Valid",
          hari: istirahatHari,
          mulai: startStr,
          akhir: endStr,
        };
        const json = JSON.stringify(payload);
        const b64 = b64FromUtf8(json);
        const b64url = b64UrlSafe(b64);
        if (!isValidated) setVerifyToken(b64url);
        let verifyUrl = `/rawat-jalan/surat-sakit/nomor/${encodeURIComponent(nomorFinal || "")}?mode=verify&t=${encodeURIComponent(b64url)}`;
        try {
          verifyUrl = route("rawat-jalan.surat-sakit.by-nomor", encodeURIComponent(nomorFinal || ""));
          verifyUrl += `?mode=verify&t=${encodeURIComponent(b64url)}`;
        } catch (_) { }
        const img = await QRCode.toDataURL(absoluteUrl(verifyUrl), { width: 192, margin: 0 });
        setQrSrc(img);
      } catch (_) {
        setQrSrc("");
      }
    };
    buildQr();
  }, [kop, pat, visitDate, nomorFinal, doc, istirahatHari, noRawat, marriageData, selectedType, verifyResult, isValidated, info]);

  return (
    <>
      <Head title="Canvas Surat" />
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-[oklch(14.5%_0_0_/_0.5)] backdrop-blur-md flex items-center justify-center p-2">
          <div className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-[70rem] max-h-[92vh] rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Canvas Surat</div>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => {
                    try {
                      const ref = typeof document !== "undefined" ? document.referrer : "";
                      const sameOriginRef = (() => {
                        try {
                          if (!ref) return "";
                          const u = new URL(ref);
                          if (typeof window !== "undefined" && u.origin !== window.location.origin) return "";
                          const path = `${u.pathname}${u.search}${u.hash}`;
                          if (!path || path === window.location.pathname + window.location.search + window.location.hash) return "";
                          return path;
                        } catch (_) {
                          return "";
                        }
                      })();

                      if (sameOriginRef) {
                        router.visit(sameOriginRef);
                        return;
                      }

                      if (typeof window !== "undefined" && window.history && window.history.length > 1) {
                        window.history.back();
                        return;
                      }

                      const q = { token, no_rawat: noRawat, no_rkm_medis: noRkmMedis };
                      if (q.token || q.no_rkm_medis) {
                        let url = "/rawat-jalan/canvas";
                        try {
                          url = route("rawat-jalan.canvas", q);
                        } catch (_) {
                          const qs = new URLSearchParams(Object.entries(q).filter(([, v]) => v)).toString();
                          url = qs ? `${url}?${qs}` : url;
                        }
                        router.visit(url);
                        return;
                      }

                      try {
                        router.visit(route("rawat-jalan.index"));
                      } catch (_) {
                        router.visit("/rawat-jalan");
                      }
                    } catch (_) {
                      router.visit("/rawat-jalan");
                    }
                  }, 200);
                }}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-800"
                aria-label="Tutup"
                title="Tutup"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-700 dark:text-gray-300">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="text-sm">
                  <div className="font-semibold text-gray-900 dark:text-white">{info.nama}</div>
                  <div className="text-gray-600 dark:text-gray-400">No. RM: {info.noRm}</div>
                  <div className="text-gray-600 dark:text-gray-400">{info.jk} • {info.umur}</div>
                  <div className="text-gray-600 dark:text-gray-400">{info.alamat}</div>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  >
                    {LETTER_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  />
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 text-sm font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                    Cetak PDF
                  </button>
                  <button
                    onClick={async () => {
                      setVerifyOpen(true);
                      try {
                        if (String(selectedType || "").toUpperCase() === "SKS") {
                          let url = `/rawat-jalan/surat-sakit/nomor/${encodeURIComponent(nomorFinal || "")}/verify`;
                          try {
                            url = route("rawat-jalan.surat-sakit.verify.by-nomor", encodeURIComponent(nomorFinal || ""));
                          } catch (_) { }
                          const res = await fetch(url, { headers: { Accept: "application/json" } });
                          if (res.ok) {
                            const data = await res.json();
                            setVerifyResult(data);
                          } else {
                            try {
                              const d = new Date(visitDate);
                              const ymd = isNaN(d.getTime()) ? visitDate : d.toISOString().slice(0, 10);
                              let findUrl = route("rawat-jalan.validasi-ttd.find");
                              const qs = new URLSearchParams({ label: String(selectedType || "SKS"), no_rawat: String(noRawat || ""), no_rkm_medis: String(info.noRm || ""), tanggal: String(ymd || "") }).toString();
                              findUrl = qs ? `${findUrl}?${qs}` : findUrl;
                              const r2 = await fetch(findUrl, { headers: { Accept: "application/json" } });
                              if (r2.ok) {
                                const j = await r2.json();
                                const row = j?.row;
                                const statusOk = String(row?.status || "") === "1";
                                if (statusOk) {
                                  const dStr = format(new Date(ymd), "dd-MM-yyyy");
                                  const startStr = dStr;
                                  const endStr = format(addDays(new Date(ymd), Math.max(istirahatHari - 1, 0)), "dd-MM-yyyy");
                                  const payload = {
                                    type: "SKS",
                                    nomor: nomorFinal,
                                    instansi: kop?.nama_instansi || "",
                                    nama: pat?.nm_pasien || "-",
                                    tgl_lahir: pat?.tgl_lahir || "",
                                    mr: pat?.no_rkm_medis || "-",
                                    tanggal_surat: dStr,
                                    dokter: (doc?.nm_dokter || ""),
                                    status: "Valid",
                                    hari: istirahatHari,
                                    mulai: startStr,
                                    akhir: endStr,
                                  };
                                  setVerifyResult({ status: "Valid", payload });
                                }
                              }
                            } catch (_) { }
                          }
                          return;
                        }

                        try {
                          const d = new Date(visitDate);
                          const ymd = isNaN(d.getTime()) ? visitDate : d.toISOString().slice(0, 10);
                          let findUrl = route("rawat-jalan.validasi-ttd.find");
                          const qs = new URLSearchParams({ label: String(selectedType || ""), no_rawat: String(noRawat || ""), no_rkm_medis: String(info.noRm || ""), tanggal: String(ymd || "") }).toString();
                          findUrl = qs ? `${findUrl}?${qs}` : findUrl;
                          const r2 = await fetch(findUrl, { headers: { Accept: "application/json" } });
                          if (!r2.ok) return;
                          const j = await r2.json();
                          const row = j?.row || null;
                          const statusOk = String(row?.status || "") === "1";
                          const payload = (() => {
                            try {
                              if (row?.payload_json && typeof row.payload_json === "string") {
                                return JSON.parse(row.payload_json);
                              }
                              return null;
                            } catch (_) {
                              return null;
                            }
                          })();
                          setVerifyResult({ status: statusOk ? "Valid" : "Tidak Valid", payload });
                        } catch (_) { }
                      } catch (_) { }
                    }}
                    className="px-3 py-2 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-400"
                  >
                    Validasi TTD
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                  >
                    {isSaving ? "Menyimpan..." : "Simpan"}
                  </button>

                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 overflow-y-auto max-h-[72vh] space-y-6">
              {(selectedType === "SKS" || selectedType === "SKSEHAT" || selectedType === "BEBAS_NARKOBA") && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-blue-600 rounded-full" />
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Data Pemeriksaan & Keperluan</h4>
                  </div>
                  <PhysicalExamForm
                    data={physicalData}
                    onChange={(name, val) => setPhysicalData(prev => ({ ...prev, [name]: val }))}
                  />
                  {selectedType === "SKS" && (
                    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                      <Label className="mb-0 text-xs font-semibold">Lama Istirahat :</Label>
                      <input
                        type="number"
                        min={1}
                        value={istirahatHari}
                        onChange={(e) => {
                          const v = parseInt(e.target.value || "0", 10);
                          setIstirahatHari(Number.isFinite(v) ? Math.max(v, 1) : 1);
                        }}
                        className="w-16 h-8 text-center text-sm font-bold border rounded-md dark:bg-gray-800 dark:text-white"
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400">Hari</span>
                    </div>
                  )}
                </div>
              )}

              {selectedType === "SKHAMIL" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-pink-600 rounded-full" />
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Data Pemeriksaan Kehamilan</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/40 dark:bg-gray-800/40 p-5 rounded-2xl border border-white/20 dark:border-gray-700/50">
                    <div className="space-y-1">
                      <Label className="text-[11px] font-bold uppercase">Hasil Pemeriksaan</Label>
                      <select
                        className="w-full h-9 px-3 text-sm rounded-md border-none ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-pink-500"
                        value={pregnancyData.hasilperiksa}
                        onChange={(e) => setPregnancyData(prev => ({ ...prev, hasilperiksa: e.target.value }))}
                      >
                        <option value="Hamil">Hamil</option>
                        <option value="Tidak Hamil">Tidak Hamil</option>
                        <option value="Suspek Hamil">Suspek Hamil</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {selectedType === "SKCUTIHAMIL" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-orange-600 rounded-full" />
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Data Cuti Hamil</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/40 dark:bg-gray-800/40 p-5 rounded-2xl border border-white/20 dark:border-gray-700/50">
                    <div className="space-y-1">
                      <Label className="text-[11px] font-bold uppercase">Keterangan Hamil</Label>
                      <input
                        type="text"
                        className="w-full h-9 px-3 text-sm rounded-md border-none ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-orange-500"
                        value={leaveData.keterangan_hamil}
                        onChange={(e) => setLeaveData(prev => ({ ...prev, keterangan_hamil: e.target.value }))}
                        placeholder="Contoh: Hamil"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] font-bold uppercase">Terhitung Mulai</Label>
                      <input
                        type="date"
                        className="w-full h-9 px-3 text-sm rounded-md border-none ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-orange-500"
                        value={leaveData.terhitung_mulai}
                        onChange={(e) => setLeaveData(prev => ({ ...prev, terhitung_mulai: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] font-bold uppercase">Perkiraan Lahir (HPL)</Label>
                      <input
                        type="date"
                        className="w-full h-9 px-3 text-sm rounded-md border-none ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-orange-500"
                        value={leaveData.perkiraan_lahir}
                        onChange={(e) => setLeaveData(prev => ({ ...prev, perkiraan_lahir: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedType === "SKNIKAH" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-purple-600 rounded-full" />
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Data Calon Pengantin Laki - Laki</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/40 dark:bg-gray-800/40 p-5 rounded-2xl border border-white/20 dark:border-gray-700/50">
                    <div className="space-y-1">
                      <Label className="text-[11px] font-bold uppercase">Nama Suami</Label>
                      <input
                        type="text"
                        className="w-full h-9 px-3 text-sm rounded-md border-none ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500"
                        value={marriageData.nm_suami}
                        onChange={(e) => setMarriageData(prev => ({ ...prev, nm_suami: e.target.value }))}
                        placeholder="Nama Lengkap Laki-laki"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] font-bold uppercase">Tgl Lahir Suami</Label>
                      <input
                        type="date"
                        className="w-full h-9 px-3 text-sm rounded-md border-none ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500"
                        value={marriageData.tgl_lahir_suami}
                        onChange={(e) => setMarriageData(prev => ({ ...prev, tgl_lahir_suami: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] font-bold uppercase">Pekerjaan Suami</Label>
                      <select
                        className="w-full h-9 px-3 text-sm rounded-md border-none ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500"
                        value={marriageData.pekerjaan_suami}
                        onChange={(e) => setMarriageData(prev => ({ ...prev, pekerjaan_suami: e.target.value }))}
                      >
                        {pekerjaanAllowed.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] font-bold uppercase">Status Suami</Label>
                      <select
                        className="w-full h-9 px-3 text-sm rounded-md border-none ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500"
                        value={marriageData.status_suami}
                        onChange={(e) => setMarriageData(prev => ({ ...prev, status_suami: e.target.value }))}
                      >
                        <option value="Perjaka">Perjaka</option>
                        <option value="Dudha">Dudha</option>
                        <option value="Menikah">Menikah</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] font-bold uppercase">No. KTP Suami</Label>
                      <input
                        type="text"
                        className="w-full h-9 px-3 text-sm rounded-md border-none ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500"
                        value={marriageData.no_ktp_suami}
                        onChange={(e) => setMarriageData(prev => ({ ...prev, no_ktp_suami: e.target.value }))}
                        placeholder="3313..."
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <Label className="text-[11px] font-bold uppercase">Alamat Suami</Label>
                      <textarea
                        className="w-full p-3 text-sm rounded-md border-none ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500"
                        value={marriageData.alamat_suami}
                        onChange={(e) => setMarriageData(prev => ({ ...prev, alamat_suami: e.target.value }))}
                        placeholder="Alamat Lengkap Laki-laki"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] font-bold uppercase">Tgl PP Test / TT-1</Label>
                      <input
                        type="date"
                        className="w-full h-9 px-3 text-sm rounded-md border-none ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500"
                        value={marriageData.tanggal_pp_test}
                        onChange={(e) => setMarriageData(prev => ({ ...prev, tanggal_pp_test: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] font-bold uppercase">Hasil PP Test</Label>
                      <select
                        className="w-full h-9 px-3 text-sm rounded-md border-none ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500"
                        value={marriageData.hasil_pp_test}
                        onChange={(e) => setMarriageData(prev => ({ ...prev, hasil_pp_test: e.target.value }))}
                      >
                        <option value="Negatif">Negatif</option>
                        <option value="Positif">Positif</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="w-1 h-4 bg-purple-600 rounded-full" />
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Preview Surat</h4>
              </div>
              <div className="relative p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900/40 shadow-sm shadow-gray-200/50 overflow-hidden">
                <div ref={printRef} className="bg-white text-black p-4">
                  <Body
                    type={selectedType}
                    kop={kop}
                    visitDate={visitDate}
                    istirahatHari={istirahatHari}
                    info={info}
                    physicalData={physicalData}
                    marriageData={marriageData}
                    pregnancyData={pregnancyData}
                    leaveData={leaveData}
                    qrSrc={qrSrc}
                    nomorFinal={nomorFinal}
                    doc={doc}
                    titleOf={titleOf}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>{saveStatus && (
        <motion.div className="fixed bottom-4 right-4 z-[10002]" variants={toastVariants} initial="hidden" animate="show" exit="exit">
          <div className="px-3 py-2 rounded-md shadow-lg bg-green-600 text-white text-xs">{saveStatus?.message || 'Tersimpan'}</div>
        </motion.div>
      )}</AnimatePresence>
      <AnimatePresence>{verifyOpen && (
        <div className="fixed inset-0 z-[10000] bg-[oklch(14.5%_0_0_/_0.6)] backdrop-blur-md flex items-center justify-center p-2">
          <motion.div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden" variants={modalVariants} initial="hidden" animate="show" exit="exit">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Validasi TTD Elektronik</div>
              <button
                type="button"
                onClick={() => { setVerifyOpen(false); setIsVerifying(false); }}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-800"
                aria-label="Tutup"
                title="Tutup"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-700 dark:text-gray-300">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-xs text-gray-600 dark:text-gray-300">Token Verifikasi</div>
              <input
                type="text"
                value={verifyToken}
                onChange={(e) => setVerifyToken(e.target.value)}
                readOnly={isValidated}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
              {isValidated ? (
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-gray-600 dark:text-gray-300">Status Validasi</span>
                  <span className="font-semibold text-green-600">{verifyResult?.status || "Valid"}</span>
                </div>
              ) : (
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      if (!noRawat || !verifyToken) return;
                      try {
                        setIsVerifying(true);
                        let url = `/rawat-jalan/surat-sakit/${encodeURIComponent(safeNoRawat || "")}/verify?t=${encodeURIComponent(verifyToken)}`;
                        try {
                          url = route("rawat-jalan.surat-sakit.verify", encodeURIComponent(safeNoRawat || ""));
                          url += `?t=${encodeURIComponent(verifyToken)}`;
                        } catch (_) { }
                        const res = await fetch(url, { headers: { Accept: "application/json" } });
                        const data = await res.json();
                        try {
                          const mrStr = String(info?.noRm || noRkmMedis || "");
                          let postUrl = "/rawat-jalan/validasi-ttd";
                          try { postUrl = route("rawat-jalan.validasi-ttd.store"); } catch (_) { }
                          const d = new Date(visitDate);
                          const ymd = isNaN(d.getTime()) ? visitDate : d.toISOString().slice(0, 10);
                          const status01 = String(data?.status || "").toLowerCase() === "valid" ? "1" : "0";
                          const savePayload = {
                            label: selectedType,
                            nomor: nomorFinal,
                            no_rawat: noRawat || "",
                            no_rkm_medis: mrStr,
                            tanggal: ymd,
                            status: status01,
                            payload: data?.payload || null,
                          };
                          try {
                            await window.axios.get('/sanctum/csrf-cookie', { withCredentials: true, headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } });
                            await new Promise((r) => setTimeout(r, 800));
                          } catch (_) { }
                          try {
                            await window.axios.post(postUrl, savePayload, {
                              withCredentials: true,
                              headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                                'X-Requested-With': 'XMLHttpRequest',
                              },
                            });
                            if (selectedType === 'SKS') {
                              const d2 = new Date(visitDate);
                              const ymd2 = isNaN(d2.getTime()) ? visitDate : d2.toISOString().slice(0, 10);
                              let endStr2 = ymd2;
                              try {
                                const end2 = addDays(new Date(visitDate), Math.max(istirahatHari - 1, 0));
                                endStr2 = end2.toISOString().slice(0, 10);
                              } catch { }
                              const payload2 = {
                                no_surat: nomorFinal,
                                no_rawat: noRawat || "",
                                tanggalawal: ymd2,
                                tanggalakhir: endStr2,
                                lamasakit: String(istirahatHari),
                                nama2: pat?.nm_pasien || info.nama || "",
                                tgl_lahir: pat?.tgl_lahir || info.tglLahir || ymd2,
                                umur: String(info.umur || ""),
                                jk: normalizeJk(info.jk),
                                alamat: info.alamat || "",
                                hubungan: "Suami",
                                pekerjaan: normalizePekerjaan(info.pekerjaan),
                                instansi: kop?.nama_instansi || "",
                                ...physicalData,
                              };
                              let postUrl2 = "/rawat-jalan/surat-sakit";
                              try { postUrl2 = route("rawat-jalan.surat-sakit.store"); } catch { }
                              try {
                                await window.axios.post(postUrl2, payload2, {
                                  withCredentials: true,
                                  headers: {
                                    'Content-Type': 'application/json',
                                    Accept: 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest',
                                  },
                                });
                              } catch (_) { }
                            }

                            if (selectedType === 'SKNIKAH') {
                              const payloadNikah = {
                                no_surat: nomorFinal,
                                no_rawat: noRawat || "",
                                no_ktp_suami: marriageData.no_ktp_suami,
                                nm_suami: marriageData.nm_suami,
                                tgl_lahir: marriageData.tgl_lahir_suami,
                                umur: (() => {
                                  if (!marriageData.tgl_lahir_suami) return "0";
                                  const birth = new Date(marriageData.tgl_lahir_suami);
                                  const today = new Date();
                                  let age = today.getFullYear() - birth.getFullYear();
                                  const m = today.getMonth() - birth.getMonth();
                                  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
                                  return String(age);
                                })(),
                                jk: marriageData.status_suami,
                                alamat: marriageData.alamat_suami,
                                hasil_pp_test: marriageData.hasil_pp_test,
                                tanggal_pp_test: marriageData.tanggal_pp_test,
                                pekerjaan: marriageData.pekerjaan_suami,
                                tanggal: ymd,
                                tanggal_nikah: ymd,
                              };
                              let postUrlNikah = "/rawat-jalan/surat-nikah/store"; // Assuming this naming convention
                              try { postUrlNikah = route("rawat-jalan.surat-nikah.store"); } catch { }
                              try {
                                await window.axios.post(postUrlNikah, payloadNikah, {
                                  withCredentials: true,
                                  headers: {
                                    'Content-Type': 'application/json',
                                    Accept: 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest',
                                  },
                                });
                              } catch (_) { }
                            }
                            if (selectedType === 'SKCUTIHAMIL') {
                              const payloadCuti = {
                                no_surat: nomorFinal,
                                no_rawat: noRawat || "",
                                keterangan_hamil: leaveData.keterangan_hamil,
                                terhitung_mulai: leaveData.terhitung_mulai,
                                perkiraan_lahir: leaveData.perkiraan_lahir,
                              };
                              let postUrlCuti = "/rawat-jalan/surat-cuti-hamil/store";
                              try { postUrlCuti = route("rawat-jalan.surat-cuti-hamil.store"); } catch { }
                              try {
                                await window.axios.post(postUrlCuti, payloadCuti, {
                                  withCredentials: true,
                                  headers: {
                                    'Content-Type': 'application/json',
                                    Accept: 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest',
                                  },
                                });
                              } catch (_) { }
                            }
                            setVerifyResult(data);
                            setSaveStatus({ type: 'success', message: 'Data tersimpan' });
                          } catch (e) {
                            try {
                              const is419 = e?.response?.status === 419;
                              if (is419) {
                                await window.axios.get('/sanctum/csrf-cookie', { withCredentials: true, headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } });
                                await new Promise((r) => setTimeout(r, 800));
                                await window.axios.post(postUrl, savePayload, {
                                  withCredentials: true,
                                  headers: {
                                    'Content-Type': 'application/json',
                                    Accept: 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest',
                                  },
                                });
                                if (selectedType === 'SKS') {
                                  const d2 = new Date(visitDate);
                                  const ymd2 = isNaN(d2.getTime()) ? visitDate : d2.toISOString().slice(0, 10);
                                  let endStr2 = ymd2;
                                  try {
                                    const end2 = addDays(new Date(visitDate), Math.max(istirahatHari - 1, 0));
                                    endStr2 = end2.toISOString().slice(0, 10);
                                  } catch { }
                                  const payload2 = {
                                    no_surat: nomorFinal,
                                    no_rawat: noRawat || "",
                                    tanggalawal: ymd2,
                                    tanggalakhir: endStr2,
                                    lamasakit: String(istirahatHari),
                                    nama2: pat?.nm_pasien || info.nama || "",
                                    tgl_lahir: pat?.tgl_lahir || info.tglLahir || ymd2,
                                    umur: String(info.umur || ""),
                                    jk: normalizeJk(info.jk),
                                    alamat: info.alamat || "",
                                    hubungan: "Suami",
                                    pekerjaan: normalizePekerjaan(info.pekerjaan),
                                    instansi: kop?.nama_instansi || "",
                                  };
                                  let postUrl2 = "/rawat-jalan/surat-sakit";
                                  try { postUrl2 = route("rawat-jalan.surat-sakit.store"); } catch { }
                                  try {
                                    await window.axios.post(postUrl2, payload2, {
                                      withCredentials: true,
                                      headers: {
                                        'Content-Type': 'application/json',
                                        Accept: 'application/json',
                                        'X-Requested-With': 'XMLHttpRequest',
                                      },
                                    });
                                  } catch (_) { }
                                }
                                if (selectedType === 'SKCUTIHAMIL') {
                                  const payloadCuti = {
                                    no_surat: nomorFinal,
                                    no_rawat: noRawat || "",
                                    keterangan_hamil: leaveData.keterangan_hamil,
                                    terhitung_mulai: leaveData.terhitung_mulai,
                                    perkiraan_lahir: leaveData.perkiraan_lahir,
                                  };
                                  let postUrlCuti = "/rawat-jalan/surat-cuti-hamil/store";
                                  try { postUrlCuti = route("rawat-jalan.surat-cuti-hamil.store"); } catch { }
                                  try {
                                    await window.axios.post(postUrlCuti, payloadCuti, {
                                      withCredentials: true,
                                      headers: {
                                        'Content-Type': 'application/json',
                                        Accept: 'application/json',
                                        'X-Requested-With': 'XMLHttpRequest',
                                      },
                                    });
                                  } catch (_) { }
                                }
                                setVerifyResult(data);
                                setSaveStatus({ type: 'success', message: 'Data tersimpan' });
                              }
                            } catch (_) {
                              if (e?.response?.status === 419) window.location.reload();
                            }
                          }
                        } catch (_) { }
                      } catch (_) {
                        setVerifyResult(null);
                      } finally {
                        setIsVerifying(false);
                      }
                    }}
                    className={`px-3 py-2 text-sm rounded-md ${isVerifying ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"} text-white focus:ring-2 focus:ring-purple-400 disabled:opacity-60`}
                    disabled={isVerifying || !noRawat || !verifyToken}
                  >
                    {isVerifying ? "Memverifikasi..." : "Verifikasi"}
                  </button>
                </div>
              )}
              {verifyResult && (
                <div className="mt-3 border-t border-gray-200 dark:border-gray-800 pt-3 text-sm">
                  <div className="flex justify-between"><span>Status</span><span className={`font-semibold ${verifyResult?.status === 'Tidak Valid' ? 'text-red-600' : 'text-green-600'}`}>{verifyResult?.status || '-'}</span></div>
                  {verifyResult?.payload ? (
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between"><span>Klinik</span><span className="font-medium">{verifyResult.payload.instansi || '-'}</span></div>
                      <div className="flex justify-between"><span>Nama</span><span className="font-medium">{verifyResult.payload.nama || '-'}</span></div>
                      <div className="flex justify-between"><span>Tgl. Surat</span><span className="font-medium">{verifyResult.payload.tanggal_surat || '-'}</span></div>
                      <div className="flex justify-between"><span>MR</span><span className="font-medium">{verifyResult.payload.mr || '-'}</span></div>
                      <div className="flex justify-between"><span>Dokter</span><span className="font-medium">{verifyResult.payload.dokter || '-'}</span></div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}</AnimatePresence>
      {pdfPreviewOpen && (
        <div className="fixed inset-0 z-[10000] bg-[oklch(14.5%_0_0_/_0.6)] backdrop-blur-md flex items-center justify-center p-2">
          <div className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-[70rem] max-h-[92vh] rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Preview PDF</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      const w = window.open(pdfPreviewUrl);
                      setTimeout(() => { try { w && w.print && w.print(); } catch { } }, 500);
                    } catch { }
                  }}
                  className="px-2 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                >
                  Cetak
                </button>
                <button
                  type="button"
                  onClick={() => {
                    try {
                      const a = document.createElement('a');
                      a.href = pdfPreviewUrl;
                      a.download = `Surat_${selectedType}_${Date.now()}.pdf`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    } catch { }
                  }}
                  className="px-2 py-1 text-sm rounded-md bg-neutral-800 text-white hover:bg-neutral-700 focus:ring-2 focus:ring-neutral-600"
                >
                  Unduh
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPdfPreviewOpen(false);
                    try { URL.revokeObjectURL(pdfPreviewUrl); } catch { }
                    setPdfPreviewUrl("");
                  }}
                  className="px-2 py-1 text-sm rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 focus:ring-2 focus:ring-gray-400"
                >
                  Tutup
                </button>
              </div>
            </div>
            <div className="p-2">
              <iframe src={pdfPreviewUrl} className="w-full h-[80vh] border border-gray-200 dark:border-gray-800" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
