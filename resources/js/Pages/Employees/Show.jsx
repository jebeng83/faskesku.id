import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import { motion } from "framer-motion";
import { Toaster } from "@/Components/ui";

export default function Show({ employee }) {
  // Toast state & helpers
  const [toasts, setToasts] = useState([]);
  const showToast = ({ type = "info", title, message, duration = 3000 }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  if (!employee) {
    return (
      <AppLayout>
        <Head title="Detail Pegawai" />
        <Toaster toasts={toasts} onRemove={removeToast} />
        <div className="py-6">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl">
            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300">Data pegawai tidak ditemukan.</p>
                <Link
                  href={route("employees.index")}
                  className="mt-4 inline-block border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 h-11 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Kembali
                </Link>
            </div>
          </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Head title={`Detail Pegawai - ${employee.nama ?? employee.nik ?? "-"}`} />
      {/* Global toaster */}
      <Toaster toasts={toasts} onRemove={removeToast} />
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Header dengan foto yang lebih minimalis dan profesional (tanpa warna mencolok) */}
          {(() => {
            const rawPhoto = employee?.photo || employee?.foto || employee?.photo_path || employee?.foto_path;
            // Normalisasi URL foto agar relatif ke host saat ini (menghindari mismatch port seperti :8000)
            const resolvePhotoUrl = (p) => {
              if (!p || typeof p !== "string") return null;
              // Jika string mengandung "/storage/", pakai path relatif setelahnya
              if (p.includes("/storage/")) {
                const after = p.split("/storage/").pop();
                return `/storage/${after}`;
              }
              // Jika sudah absolute http(s) atau diawali '/', gunakan apa adanya
              if (p.startsWith("http") || p.startsWith("/")) return p;
              // Default: anggap path relatif di disk publik
              return `/storage/${p}`;
            };
            const photoUrl = resolvePhotoUrl(rawPhoto);

            const displayName = employee?.nama || employee?.nik || "-";
            const subTitle = [employee?.jbtn, employee?.departemen].filter(Boolean).join(" • ");

            return (
              <div className="relative overflow-hidden rounded-2xl mb-6 border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
                {/* Dekorasi lembut di sisi kanan (gelombang hijau muda) */}
                <div className="pointer-events-none absolute inset-y-0 right-0 w-2/5 sm:w-1/3 opacity-70">
                  <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                    <path d="M0 0 H400 V240 H0 C100 220 180 120 250 80 C310 45 360 60 400 100 V0 Z" fill="#8FDAD1" opacity="0.35" />
                    <path d="M0 240 H400 V140 C360 100 300 80 240 110 C170 145 110 210 0 220 Z" fill="#AFE7E0" opacity="0.35" />
                  </svg>
                </div>

                <div className="p-8 sm:p-10 text-center">
                  <div className="flex justify-end">
                    <Link
                      href={route("employees.index")}
                      className="inline-flex items-center gap-2 px-4 h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white hover:bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Kembali
                    </Link>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="mt-4 flex flex-col items-center"
                  >
                    {/* Foto pegawai */}
                    <motion.div whileHover={{ scale: 1.03 }} className="relative">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt="Foto Pegawai"
                          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-gray-200 dark:ring-gray-700 shadow-sm"
                          onError={(e) => {
                            // Fallback jika foto tidak bisa diakses (403/404): gunakan avatar inisial
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling;
                            if (fallback) fallback.style.display = 'flex';
                            // Tampilkan toast error yang informatif
                            showToast({
                              type: 'error',
                              title: 'Foto tidak dapat dimuat',
                              message: 'Periksa izin /storage atau unggah ulang foto pegawai.',
                            });
                          }}
                        />
                      ) : null}
                      {/* Fallback avatar inisial (disembunyikan jika img sukses) */}
                      {(!photoUrl) ? (
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full ring-4 ring-gray-200 dark:ring-gray-700 shadow-sm bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">{(displayName || "-").charAt(0)}</span>
                        </div>
                      ) : (
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full ring-4 ring-gray-200 dark:ring-gray-700 shadow-sm bg-gray-100 dark:bg-gray-700 items-center justify-center hidden">
                          <span className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">{(displayName || "-").charAt(0)}</span>
                        </div>
                      )}
                    </motion.div>

                    {/* Nama dan informasi singkat */}
                    <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{displayName}</h1>
                    {subTitle && (
                      <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-300">{subTitle}</p>
                    )}

                    {/* Info ringkas */}
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                      {employee?.stts_kerja && (
                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs sm:text-sm">{employee.stts_kerja}</span>
                      )}
                      {employee?.stts_aktif && (
                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs sm:text-sm">{employee.stts_aktif}</span>
                      )}
                      {employee?.mulai_kerja && (
                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs sm:text-sm">Mulai {employee.mulai_kerja}</span>
                      )}
                    </div>

                    {/* Tombol unggah foto (dummy action menampilkan toast) */}
                    <button
                      type="button"
                      onClick={() =>
                        showToast({
                          type: 'info',
                          title: 'Unggah Foto',
                          message: 'Untuk mengganti foto, buka halaman Edit Pegawai.',
                        })
                      }
                      className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-teal-300 text-teal-700 bg-white hover:bg-teal-50 shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M3 19a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-3.586a2 2 0 01-1.414-.586l-1.828-1.828A2 2 0 0010.758 2H5a2 2 0 00-2 2v15zm7-4l2.293-2.293a1 1 0 011.414 0L17 16l3-3v6H4v-2l6-2z" />
                      </svg>
                      Unggah Foto
                    </button>
                  </motion.div>
                </div>
              </div>
            );
          })()}

          {/* Detail Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl"
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
                  <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{[employee.tmp_lahir, employee.tgl_lahir].filter(Boolean).join(", ") || "-"}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Alamat</div>
                  <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{employee.alamat || "-"}</div>
                </div>
              </div>

              <hr className="my-6 border-gray-200 dark:border-gray-700" />

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

              <hr className="my-6 border-gray-200 dark:border-gray-700" />

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
        </div>
      </div>
    </AppLayout>
  );
}