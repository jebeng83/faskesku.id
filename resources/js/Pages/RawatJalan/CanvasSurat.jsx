import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { route } from "ziggy-js";
import { format, addDays } from "date-fns";
import QRCode from "qrcode";

export default function CanvasSurat({ patient, defaultDate, token = "", noRawat = "", noRkmMedis = "" }) {
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

  const LETTER_TYPES = [
    { value: "SKS", label: "Surat Keterangan Sakit" },
    { value: "SKSEHAT", label: "Surat Keterangan Sehat" },
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

  const [selectedType, setSelectedType] = useState(LETTER_TYPES[0].value);
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
  const [suratSeq, setSuratSeq] = useState(null);
  const [serverNomorSurat, setServerNomorSurat] = useState("");
  const nomorSurat = useMemo(() => {
    try {
      const d = new Date(visitDate);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const type = String(selectedType || "SKS").toUpperCase();
      const seq = suratSeq ? String(suratSeq).padStart(5, "0") : "00001";
      return `${type}${yyyy}${mm}${dd}${seq}`;
    } catch {
      const type = String(selectedType || "SKS").toUpperCase();
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");
      return `${type}${yyyy}${mm}${dd}00001`;
    }
  }, [visitDate, suratSeq, selectedType]);
  const nomorFinal = useMemo(() => {
    const s = String(serverNomorSurat || "").trim();
    if (selectedType === "SKS" && s) return s;
    return nomorSurat;
  }, [serverNomorSurat, nomorSurat, selectedType]);
  const [qrSrc, setQrSrc] = useState("");
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState("");
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
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

  const reduceMotion = useMemo(() => {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
  }, []);
  const containerVariants = useMemo(() => ({ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }), []);
  const itemVariants = useMemo(() => (reduceMotion ? {} : { hidden: { opacity: 0, y: 6, scale: 0.99 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } } }), [reduceMotion]);
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
            } catch (_) {}
          }
        } else if (noRkmMedis) {
          try {
            const respReg = await axios.get("/api/reg-periksa", {
              params: { search: noRkmMedis, per_page: 1 },
              withCredentials: true,
              headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
            });
            regData = respReg?.data?.data?.data?.[0] || null;
          } catch (_) {}
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
          } catch (_) {}
        }
      } catch (_) {}
    };
    loadIdentity();
    return () => { cancelled = true; };
  }, [pat, noRawat, noRkmMedis]);

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
      } catch {}
      const next = curr + 1;
      try {
        localStorage.setItem(key, String(next));
      } catch {}
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
        try { findUrl = route("rawat-jalan.validasi-ttd.find", findParams); } catch (_) {}
        try {
          const found = await axios.get(findUrl, { params: findParams, withCredentials: true, headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" } });
          const row = found?.data?.row || null;
          if (row && row.no_surat && !cancelled) { setServerNomorSurat(String(row.no_surat)); return; }
        } catch (_) {}
        const params = { tanggal: visitDate };
        let url = "/rawat-jalan/surat-sakit/next-no-surat";
        try { url = route("rawat-jalan.surat-sakit.next-no-surat", params); } catch (_) {}
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
      } catch (_) {}
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
    } catch {}
  }, [isValidated, verKey, verifyToken, verifyResult]);

  useEffect(() => {
    if (!saveStatus) return;
    const t = setTimeout(() => setSaveStatus(null), 2500);
    return () => clearTimeout(t);
  }, [saveStatus]);

  useEffect(() => {
    const buildQr = async () => {
      try {
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
        setVerifyToken(b64url);
        let verifyUrl = `/rawat-jalan/surat-sakit/nomor/${encodeURIComponent(nomorFinal || "")}?mode=verify&t=${encodeURIComponent(b64url)}`;
        try {
          verifyUrl = route("rawat-jalan.surat-sakit.by-nomor", encodeURIComponent(nomorFinal || ""));
          verifyUrl += `?mode=verify&t=${encodeURIComponent(b64url)}`;
        } catch (_) {}
        const img = await QRCode.toDataURL(absoluteUrl(verifyUrl), { width: 192, margin: 0 });
        setQrSrc(img);
      } catch (_) {
        setQrSrc("");
      }
    };
    buildQr();
  }, [kop, pat, visitDate, nomorFinal, doc, istirahatHari, noRawat]);

  useEffect(() => {
    const updateQrAfterVerify = async () => {
      try {
        if (!verifyResult || String(verifyResult?.status || "") !== "Valid") return;
        let infoUrl = `/rawat-jalan/surat-sakit/nomor/${encodeURIComponent(nomorFinal || "")}?mode=info`;
        try {
          infoUrl = route("rawat-jalan.surat-sakit.by-nomor", encodeURIComponent(nomorFinal || ""));
          infoUrl += `?mode=info`;
        } catch (_) {}
        const img = await QRCode.toDataURL(absoluteUrl(infoUrl), { width: 192, margin: 0 });
        setQrSrc(img);
      } catch {}
    };
    updateQrAfterVerify();
  }, [verifyResult, nomorFinal]);

  useEffect(() => {
    const onKey = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        setIsOpen(false);
        setTimeout(() => {
          try {
            const q = { token, no_rawat: noRawat, no_rkm_medis: noRkmMedis };
            let url = "/rawat-jalan/canvas";
            try {
              url = route("rawat-jalan.canvas", q);
            } catch (_) {
              const qs = new URLSearchParams(Object.entries(q).filter(([, v]) => v)).toString();
              url = qs ? `${url}?${qs}` : url;
            }
            router.visit(url);
          } catch {
            router.visit("/rawat-jalan");
          }
        }, 200);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, token, noRawat, noRkmMedis]);

  const info = {
    nama: pat?.nm_pasien || "-",
    noRm: pat?.no_rkm_medis || "-",
    jk: pat?.jk || "-",
    umur: pat?.umur || pat?.age || "-",
    alamat: pat?.alamat || "-",
    tglLahir: pat?.tgl_lahir || "",
    pekerjaan: pat?.pekerjaan || "",
  };

  const titleOf = (val) => {
    const t = LETTER_TYPES.find((x) => x.value === val);
    return t?.label || val;
  };

  const Body = ({ type }) => {
    if (type === "SKS") {
      const kab = (kop?.kabupaten || "").toString().trim();
      const prop = (kop?.propinsi || "").toString().trim();
      const instansi = (kop?.nama_instansi || "").toString().trim();
      const dokterName = (doc?.nm_dokter || "").toString().trim();
      const mulai = (() => {
        try { return format(new Date(visitDate), "dd-MM-yyyy"); } catch { return visitDate; }
      })();
      const akhir = (() => {
        try { return format(addDays(new Date(visitDate), Math.max(istirahatHari - 1, 0)), "dd-MM-yyyy"); } catch { return ""; }
      })();
      const tglStr = (() => { try { return format(new Date(visitDate), "dd-MM-yyyy"); } catch { return visitDate; } })();
      const jkLabel = (() => {
        const v = (info.jk || "").toString().trim().toUpperCase();
        if (v === "L" || v === "LAKI-LAKI") return "Laki-Laki";
        if (v === "P" || v === "PEREMPUAN") return "Perempuan";
        return info.jk || "-";
      })();
      const terbilang = (n) => {
        const s = ["nol","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas"];
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
        <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="show">
          <div className="flex items-center justify-between">
            <div className="w-16 h-16 shrink-0">
              {kop.logoUrl ? (
                <img src={kop.logoUrl} alt="Logo" className="w-16 h-16 object-contain" />
              ) : null}
            </div>
          <motion.div className="text-center flex-1" variants={itemVariants}>
              <div className="text-[18px] font-bold uppercase">{instansi || "Instansi Kesehatan"}</div>
              <div className="text-[11px]">{kop.alamat_instansi || ""}{kab ? `, ${kab}` : ""}{prop ? `, ${prop}` : ""}</div>
              <div className="text-[11px]">{kop.email ? `E-mail : ${kop.email}` : ""}{kop.kontak ? ` • Telp : ${kop.kontak}` : ""}</div>
          </motion.div>
            <div className="w-16 h-16" />
          </div>
          <div className="border-t border-black" />

          <motion.div className="text-center" variants={itemVariants}>
            <div className="text-lg font-semibold uppercase">Surat Keterangan</div>
            <div className="mt-1 text-xs">Nomor : {nomorFinal}</div>
          </motion.div>

          <motion.div className="text-sm leading-relaxed" variants={itemVariants}>
            <div className="mb-2">Yang bertanda tangan dibawah ini {"dr."} {dokterName || "______________________________"}</div>
            <div>Dokter pada {instansi || "Instansi Kesehatan"}, menerangkan bahwa :</div>
          </motion.div>

          <motion.div className="grid grid-cols-12 gap-y-1 text-sm" variants={containerVariants}>
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
          </motion.div>

          <div className="text-sm leading-relaxed mt-2">
            Pada waktu diperiksa dalam keadaan sakit, maka perlu istirahat selama :
            <input
              type="number"
              min={1}
              value={istirahatHari}
              onChange={(e) => {
                const v = parseInt(e.target.value || "0", 10);
                setIstirahatHari(Number.isFinite(v) ? Math.max(v, 1) : 1);
              }}
              className="font-semibold ml-1 mr-1 inline-block w-14 text-center border-b border-dashed bg-transparent focus:outline-none"
            />
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
        </motion.div>
      );
    }
    if (type === "RUJUKAN") {
      return (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-lg font-semibold">Surat Rujukan</div>
            <div className="mt-1 text-xs">No.: RJK//00001</div>
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
          <div className="text-sm">Mohon pemeriksaan dan penanganan lebih lanjut.</div>
          <div className="flex justify-end items-end mt-6">
            <div className="text-sm">
              <div className="text-right">{new Date(visitDate).toLocaleDateString("id-ID")}</div>
              <div className="mt-12 text-right">______________________________</div>
            </div>
          </div>
        </div>
      );
    }
    if (type === "RAWAT_INAP") {
      return (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-lg font-semibold">Surat Keterangan Rawat Inap</div>
            <div className="mt-1 text-xs">No.: RWI//00001</div>
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
          <div className="flex justify-end items-end mt-6">
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
  };

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
                      const q = { token, no_rawat: noRawat, no_rkm_medis: noRkmMedis };
                      let url = "/rawat-jalan/canvas";
                      try {
                        url = route("rawat-jalan.canvas", q);
                      } catch (_) {
                        const qs = new URLSearchParams(Object.entries(q).filter(([, v]) => v)).toString();
                        url = qs ? `${url}?${qs}` : url;
                      }
                      router.visit(url);
                    } catch {
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
                    onClick={async () => {
                      try {
                        const url = route("surat.pdf");
                        const d = new Date(visitDate);
                        const ymd = isNaN(d.getTime()) ? visitDate : d.toISOString().slice(0, 10);
                        const payload = {
                          type: selectedType,
                          tanggal: ymd,
                          pasien: info,
                          no_rawat: noRawat || "",
                          nomor: nomorFinal,
                          hari: istirahatHari,
                          mulai: ymd,
                          akhir: (() => {
                            try {
                              const end = addDays(new Date(visitDate), Math.max(istirahatHari - 1, 0));
                              return end.toISOString().slice(0, 10);
                            } catch {
                              return ymd;
                            }
                          })(),
                          dokter: (doc?.nm_dokter || ""),
                          instansi: (kop?.nama_instansi || ""),
                        };
                        try {
                          await window.axios.get('/sanctum/csrf-cookie', { withCredentials: true, headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } });
                          await new Promise((r) => setTimeout(r, 300));
                        } catch (_) {}
                        const res = await window.axios.post(url, payload, { responseType: "blob", withCredentials: true, headers: { Accept: 'application/pdf', 'X-Requested-With': 'XMLHttpRequest' } });
                        const blob = new Blob([res.data], { type: "application/pdf" });
                        const nextUrl = URL.createObjectURL(blob);
                        if (pdfPreviewUrl) {
                          try { URL.revokeObjectURL(pdfPreviewUrl); } catch {}
                        }
                        setPdfPreviewUrl(nextUrl);
                        setPdfPreviewOpen(true);
                      } catch (_) {}
                    }}
                    className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                  >
                    Cetak PDF
                  </button>
                  <button
                    onClick={async () => {
                      setVerifyOpen(true);
                      try {
                        let url = `/rawat-jalan/surat-sakit/nomor/${encodeURIComponent(nomorFinal || "")}/verify`;
                        try {
                          url = route("rawat-jalan.surat-sakit.verify.by-nomor", encodeURIComponent(nomorFinal || ""));
                        } catch (_) {}
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
                          } catch (_) {}
                        }
                      } catch (_) {}
                    }}
                    className="px-3 py-2 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-400"
                  >
                    Validasi TTD
                  </button>
                  
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 overflow-y-auto max-h-[72vh]">
              <Body type={selectedType} />
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
                        } catch (_) {}
                        const res = await fetch(url, { headers: { Accept: "application/json" } });
                        const data = await res.json();
                        try {
                          const mrStr = String(info?.noRm || noRkmMedis || "");
                          let postUrl = "/rawat-jalan/validasi-ttd";
                          try { postUrl = route("rawat-jalan.validasi-ttd.store"); } catch (_) {}
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
                          } catch (_) {}
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
                              } catch {}
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
                              try { postUrl2 = route("rawat-jalan.surat-sakit.store"); } catch {}
                              try {
                                await window.axios.post(postUrl2, payload2, {
                                  withCredentials: true,
                                  headers: {
                                    'Content-Type': 'application/json',
                                    Accept: 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest',
                                  },
                                });
                              } catch (_) {}
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
                                  } catch {}
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
                                  try { postUrl2 = route("rawat-jalan.surat-sakit.store"); } catch {}
                                  try {
                                    await window.axios.post(postUrl2, payload2, {
                                      withCredentials: true,
                                      headers: {
                                        'Content-Type': 'application/json',
                                        Accept: 'application/json',
                                        'X-Requested-With': 'XMLHttpRequest',
                                      },
                                    });
                                  } catch (_) {}
                                }
                                setVerifyResult(data);
                                setSaveStatus({ type: 'success', message: 'Data tersimpan' });
                              }
                            } catch (_) {}
                          }
                        } catch (_) {}
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
                      setTimeout(() => { try { w && w.print && w.print(); } catch {} }, 500);
                    } catch {}
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
                    } catch {}
                  }}
                  className="px-2 py-1 text-sm rounded-md bg-neutral-800 text-white hover:bg-neutral-700 focus:ring-2 focus:ring-neutral-600"
                >
                  Unduh
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPdfPreviewOpen(false);
                    try { URL.revokeObjectURL(pdfPreviewUrl); } catch {}
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
