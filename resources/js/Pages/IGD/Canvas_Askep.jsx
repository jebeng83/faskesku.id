import React, { useState } from "react";
import Modal from "@/Components/Modal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import efekEnakMd from "../../../../docs/Efekenak.md?raw";
import { Head } from "@inertiajs/react";
import { getAppTimeZone } from "@/tools/datetime";
import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function CanvasAskep(props = {}) {
  const { patient = {}, no_rawat = "", children, leftMenu = null } = props;
  const [isIdentityOpen, setIsIdentityOpen] = useState(true);
  const [docOpen, setDocOpen] = useState(false);
  

  const formatDateIdShort = (date) => {
    if (!date) return "-";
    try {
      const tz = getAppTimeZone();
      const d = new Date(date);
      if (isNaN(d.getTime())) return String(date);
      return d.toLocaleDateString("id-ID", {
        timeZone: tz,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return String(date);
    }
  };

  

  const leftIdentity = [
    { label: "No Rawat", value: no_rawat || "-" },
    { label: "No Rekam Medis", value: patient?.no_rkm_medis || "-" },
    { label: "Nama Pasien", value: patient?.nm_pasien || "-" },
    { label: "Tanggal Lahir", value: formatDateIdShort(patient?.tgl_lahir) },
    { label: "JK / Gol Darah", value: [patient?.jk, patient?.gol_darah].filter(Boolean).join(" / ") || "-" },
    { label: "NIK", value: patient?.no_ktp || "-" },
    { label: "No Peserta", value: patient?.no_peserta || "-" },
    { label: "Alamat", value: patient?.alamat || "-" },
  ];

  const leftInfo = [
    { label: "Kamar Inap", value: patient?.nm_bangsal || "-" },
    { label: "Dokter PJ", value: patient?.nm_dokter || "-" },
    { label: "Penjamin", value: patient?.png_jawab || "-" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Head title="Asuhan Keperawatan IGD" />
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="w-full px-2 sm:px-3 h-14 flex items-center">
          <h1 className="text-lg font-semibold">Asuhan Keperawatan</h1>
        </div>
      </header>
      <main className="w-full px-1 sm:px-2 md:px-3 pt-16 pb-4 overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[25%_75%] lg:grid-cols-[20%_80%] gap-2 md:gap-4 lg:gap-6">
          <div className="hidden md:block">
            <div className="rounded-xl border border-gray-200 bg-white mb-6">
              <button
                type="button"
                onClick={() => setIsIdentityOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3 py-2 md:px-4 md:py-3"
              >
                <span className="text-sm font-semibold text-gray-800">Identitas Pasien</span>
                {isIdentityOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              {isIdentityOpen && (
                <div className="px-4 pb-4">
                  <div className="space-y-2">
                    {leftIdentity.map((it) => (
                      <div key={it.label} className="flex items-start gap-2">
                        <div className="w-28 text-xs text-gray-500">{it.label}</div>
                        <div className="text-xs text-gray-400">:</div>
                        <div className="text-xs font-medium text-gray-900 break-all">{it.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="space-y-2">
                      {leftInfo.map((it) => (
                        <div key={it.label} className="flex items-start gap-2">
                          <div className="w-28 text-xs text-gray-500">{it.label}</div>
                          <div className="text-xs text-gray-400">:</div>
                          <div className="text-xs font-medium text-gray-900 break-all">{it.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {leftMenu ? (
              <div className="rounded-xl border border-gray-200 bg-white mb-6">
                <div className="px-2 py-1.5 md:px-3 md:py-2 text-xs">
                  {leftMenu}
                </div>
              </div>
            ) : null}
          </div>
          <div className="w-full min-w-0">
            <div className="rounded-xl border border-gray-200 bg-white mb-6 md:hidden">
              <button
                type="button"
                onClick={() => setIsIdentityOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3 py-2 md:px-4 md:py-3"
              >
                <span className="text-sm font-semibold text-gray-800">Identitas Pasien</span>
                {isIdentityOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              {isIdentityOpen && (
                <div className="px-4 pb-4">
                  <div className="space-y-2">
                    {leftIdentity.map((it) => (
                      <div key={it.label} className="flex items-start gap-2">
                        <div className="w-36 text-xs text-gray-500">{it.label}</div>
                        <div className="text-xs text-gray-400">:</div>
                        <div className="text-xs font-medium text-gray-900 break-all">{it.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="space-y-2">
                      {leftInfo.map((it) => (
                        <div key={it.label} className="flex items-start gap-2">
                          <div className="w-36 text-xs text-gray-500">{it.label}</div>
                          <div className="text-xs text-gray-400">:</div>
                          <div className="text-xs font-medium text-gray-900 break-all">{it.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {children ? (
              <div className="mt-4 rounded-xl border border-gray-200 bg-white">
                <div className="p-3 md:p-4">
                  {children}
                </div>
              </div>
            ) : null}
            {leftMenu ? (
              <div className="rounded-xl border border-gray-200 bg-white mb-6 md:hidden">
                <div className="px-2 py-1.5 md:px-3 md:py-2 text-xs">
                  {leftMenu}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>
      <Modal show={docOpen} onClose={() => setDocOpen(false)} title="Efek Enak" size="lg" showTopGradient>
        <div className="text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{efekEnakMd}</ReactMarkdown>
        </div>
      </Modal>
    </div>
  );
}
