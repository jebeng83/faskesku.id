import React, { useEffect, useMemo, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import { motion } from "framer-motion";
import { Toaster } from "@/Components/ui";

export default function Show({ employee }) {
  const [toasts, setToasts] = useState([]);
  const showToast = ({ type = "info", title, message, duration = 3000 }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const close = () => router.get(route("employees.index"));

  const Overlay = ({ headTitle, title, subtitle, children }) => (
    <SidebarPengaturan title="Kepegawaian">
      <Head title={headTitle} />
      <Toaster toasts={toasts} onRemove={removeToast} />
      <div className="fixed inset-0 z-[9000] flex items-start justify-center p-4 sm:p-6">
        <button
          type="button"
          aria-label="Tutup"
          onClick={close}
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl shadow-blue-500/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10" />
          <div className="absolute top-2 left-4 right-4 h-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 ring-1 ring-black/5 dark:ring-white/10 z-20" />

          <div className="relative px-6 py-5 border-b border-white/20 dark:border-gray-700/40">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {title}
                </h2>
                {subtitle ? (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>
                ) : null}
              </div>
              <button
                type="button"
                aria-label="Tutup"
                onClick={close}
                className="h-10 w-10 rounded-xl border border-gray-200/70 dark:border-gray-700/70 bg-white/70 dark:bg-gray-900/40 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-700 dark:text-gray-200"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.72 6.72a.75.75 0 011.06 0L12 10.94l4.22-4.22a.75.75 0 111.06 1.06L13.06 12l4.22 4.22a.75.75 0 11-1.06 1.06L12 13.06l-4.22 4.22a.75.75 0 11-1.06-1.06L10.94 12 6.72 7.78a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative max-h-[calc(100vh-140px)] overflow-y-auto">
            <div className="py-6">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SidebarPengaturan>
  );

  if (!employee) {
    return (
      <Overlay headTitle="Detail Pegawai" title="Detail Pegawai" subtitle="Data pegawai tidak ditemukan.">
        <div className="bg-white/85 dark:bg-gray-900/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-sm rounded-2xl">
          <div className="p-6">
            <p className="text-gray-700 dark:text-gray-200">Data pegawai tidak ditemukan.</p>
            <button
              type="button"
              onClick={close}
              className="mt-4 inline-flex items-center justify-center px-4 h-11 rounded-lg border border-gray-200/70 dark:border-gray-700/70 bg-white/70 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
            >
              Kembali
            </button>
          </div>
        </div>
      </Overlay>
    );
  }

  const rawPhoto = employee?.photo || employee?.foto || employee?.photo_path || employee?.foto_path;
  const photoCandidates = useMemo(() => {
    const out = new Set();
    const add = (u) => {
      if (!u || typeof u !== "string") return;
      try {
        out.add(encodeURI(u));
      } catch (_e) {
        out.add(u);
      }
    };

    if (employee?.id) {
      try {
        add(route("employees.photo", employee.id));
      } catch (_e) {
      }
    }

    if (!rawPhoto || typeof rawPhoto !== "string") return Array.from(out);
    const raw = rawPhoto.trim().replaceAll("\\", "/");
    if (!raw || raw.endsWith("/")) return Array.from(out);

    if (raw.startsWith("http")) add(raw);
    if (raw.startsWith("/")) add(raw);
    if (raw.includes("/storage/")) {
      const after = raw.split("/storage/").pop();
      add(`/storage/${after}`);
    }

    const normalized = raw.replace(/^public\//, "").replace(/^storage\//, "");
    add(`/storage/${normalized}`);
    add(`/${normalized}`);

    if (normalized.startsWith("pages/pegawai/photo/")) {
      const tail = normalized.slice("pages/pegawai/photo/".length);
      add(`/pages/pegawai/photo/${tail}`);
      add(`/storage/pegawai/${tail}`);
      add(`/storage/pegawai/photo/${tail}`);
    }

    if (!normalized.includes("/")) {
      add(`/storage/pegawai/${normalized}`);
      add(`/storage/pegawai/photo/${normalized}`);
    }

    return Array.from(out);
  }, [employee?.id, rawPhoto]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoToastShown, setPhotoToastShown] = useState(false);
  useEffect(() => {
    setPhotoIndex(0);
    setPhotoToastShown(false);
  }, [employee?.id]);
  const photoUrl = photoCandidates[photoIndex] || null;
  const displayName = employee?.nama || employee?.nik || "-";
  const subTitle = [employee?.jbtn, employee?.departemen].filter(Boolean).join(" • ");

  return (
    <Overlay
      headTitle={`Detail Pegawai - ${employee.nama ?? employee.nik ?? "-"}`}
      title={displayName}
      subtitle={subTitle}
    >
      <div className="relative overflow-hidden rounded-2xl mb-6 border border-white/20 dark:border-gray-700/50 shadow-sm bg-white/85 dark:bg-gray-900/60 backdrop-blur-xl">
        <div className="p-8 sm:p-10 text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
            animate={reduceMotion ? false : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              className="relative"
            >
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Foto Pegawai"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-gray-200/70 dark:ring-gray-700/70 shadow-sm"
                  onError={() => {
                    if (photoIndex < photoCandidates.length - 1) {
                      setPhotoIndex((i) => i + 1);
                      return;
                    }
                    if (!photoToastShown) {
                      setPhotoToastShown(true);
                      showToast({
                        type: "error",
                        title: "Foto tidak dapat dimuat",
                        message: "Periksa izin file foto pegawai atau unggah ulang.",
                      });
                    }
                    setPhotoIndex(photoCandidates.length);
                  }}
                />
              ) : null}
              {!photoUrl ? (
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full ring-4 ring-gray-200/70 dark:ring-gray-700/70 shadow-sm bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
                    {(displayName || "-").charAt(0)}
                  </span>
                </div>
              ) : (
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full ring-4 ring-gray-200/70 dark:ring-gray-700/70 shadow-sm bg-gray-100 dark:bg-gray-800 items-center justify-center hidden">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
                    {(displayName || "-").charAt(0)}
                  </span>
                </div>
              )}
            </motion.div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {employee?.stts_kerja ? (
                <span className="px-3 py-1 rounded-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 text-xs sm:text-sm">
                  {employee.stts_kerja}
                </span>
              ) : null}
              {employee?.stts_aktif ? (
                <span className="px-3 py-1 rounded-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 text-xs sm:text-sm">
                  {employee.stts_aktif}
                </span>
              ) : null}
              {employee?.mulai_kerja ? (
                <span className="px-3 py-1 rounded-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 text-xs sm:text-sm">
                  Mulai {employee.mulai_kerja}
                </span>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() =>
                showToast({
                  type: "info",
                  title: "Unggah Foto",
                  message: "Untuk mengganti foto, buka halaman Edit Pegawai.",
                })
              }
              className="mt-6 inline-flex items-center gap-2 px-4 h-11 rounded-lg border border-gray-200/70 dark:border-gray-700/70 bg-white/70 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M3 19a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-3.586a2 2 0 01-1.414-.586l-1.828-1.828A2 2 0 0010.758 2H5a2 2 0 00-2 2v15zm7-4l2.293-2.293a1 1 0 011.414 0L17 16l3-3v6H4v-2l6-2z" />
              </svg>
              Unggah Foto
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={reduceMotion ? false : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white/85 dark:bg-gray-900/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-sm rounded-2xl"
      >
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">NIK</div>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{employee.nik || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">No. KTP</div>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{employee.no_ktp || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Nama</div>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{employee.nama || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Jenis Kelamin</div>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{employee.jk || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Tempat, Tanggal Lahir</div>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                {[employee.tmp_lahir, employee.tgl_lahir].filter(Boolean).join(", ") || "-"}
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="text-sm text-gray-500 dark:text-gray-400">Alamat</div>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{employee.alamat || "-"}</div>
            </div>
          </div>

          <hr className="my-6 border-gray-200/70 dark:border-gray-700/70" />

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informasi Kepegawaian</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Jabatan</div>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{employee.jbtn || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Departemen</div>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{employee.departemen || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Status Kerja</div>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{employee.stts_kerja || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Status Aktif</div>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{employee.stts_aktif || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Mulai Kerja</div>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{employee.mulai_kerja || "-"}</div>
            </div>
          </div>

          <hr className="my-6 border-gray-200/70 dark:border-gray-700/70" />

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informasi Finansial</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">NPWP</div>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{employee.npwp || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Gaji Pokok</div>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{employee.gapok || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Bank</div>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{employee.bpd || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">No. Rekening</div>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{employee.rekening || "-"}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </Overlay>
  );
}
