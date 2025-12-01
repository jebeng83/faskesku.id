import React, { useEffect } from "react";
import { Head } from "@inertiajs/react";

export default function CetakRegistrasi({ registration, setting, logoBase64 }) {
    useEffect(() => {
        // Auto print when component loads
        const timer = setTimeout(() => {
            window.print();
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    // Format tanggal dan jam
    const formatDateTime = () => {
        if (!registration) return "";
        try {
            const dateStr = registration.tgl_registrasi || '';
            const timeStr = registration.jam_reg || '';
            
            if (!dateStr) return "";
            
            // Parse tanggal (format: YYYY-MM-DD)
            const [year, month, day] = dateStr.split('-');
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            
            let formatted = `${day} ${months[parseInt(month) - 1]} ${year}`;
            
            // Tambahkan jam jika ada
            if (timeStr) {
                const [hours, minutes] = timeStr.split(':');
                formatted += ` ${hours}:${minutes}`;
            }
            
            return formatted;
        } catch (error) {
            console.error('Error formatting date:', error);
            return `${registration.tgl_registrasi || ""} ${registration.jam_reg || ""}`;
        }
    };

    return (
        <>
            <Head title="Cetak Registrasi" />
            <div className="print-container">
                <style>{`
                    @media print {
                        @page {
                            size: 10.5cm 16.5cm;
                            margin: 0.5cm;
                        }
                        body {
                            margin: 0;
                            padding: 0;
                        }
                        .no-print {
                            display: none !important;
                        }
                    }
                    
                    .print-container {
                        width: 10.5cm;
                        min-height: 16.5cm;
                        padding: 0.3cm;
                        font-size: 8pt;
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

                    @media print {
                        .print-container {
                            border: 1px solid #000;
                        }
                    }

                    .header {
                        display: flex;
                        align-items: center;
                        gap: 0.3cm;
                        margin-bottom: 0.3cm;
                        border-bottom: 1px solid #000;
                        padding-bottom: 0.2cm;
                    }

                    .logo {
                        width: 1.2cm;
                        height: 1.2cm;
                        object-fit: contain;
                        flex-shrink: 0;
                    }

                    .kop-surat {
                        flex: 1;
                        font-size: 7pt;
                        line-height: 1.1;
                    }

                    .kop-surat h3 {
                        margin: 0;
                        font-size: 8pt;
                        font-weight: bold;
                        margin-bottom: 0.1cm;
                    }

                    .kop-surat p {
                        margin: 0;
                        font-size: 6pt;
                    }

                    .title {
                        text-align: center;
                        font-weight: bold;
                        font-size: 9pt;
                        margin: 0.3cm 0;
                        text-transform: uppercase;
                    }

                    .divider {
                        border-top: 1px solid #000;
                        margin: 0.2cm 0;
                    }

                    .info-section {
                        margin-bottom: 0.3cm;
                    }

                    .info-row {
                        display: flex;
                        margin-bottom: 0.15cm;
                        font-size: 7pt;
                    }

                    .info-label {
                        width: 2.5cm;
                        flex-shrink: 0;
                    }

                    .info-value {
                        flex: 1;
                    }

                    .checklist-section {
                        margin-top: 0.3cm;
                    }

                    .checklist-item {
                        display: flex;
                        align-items: center;
                        margin-bottom: 0.2cm;
                        font-size: 7pt;
                    }

                    .checklist-label {
                        flex: 1;
                    }

                    .checklist-boxes {
                        display: flex;
                        gap: 0.5cm;
                        align-items: center;
                    }

                    .checkbox-label {
                        display: flex;
                        align-items: center;
                        gap: 0.15cm;
                    }

                    .checkbox {
                        width: 0.4cm;
                        height: 0.4cm;
                        border: 1px solid #000;
                        display: inline-block;
                        position: relative;
                        background: white;
                        flex-shrink: 0;
                    }

                    .checkbox.checked::after {
                        content: '✓';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 0.25cm;
                        font-weight: bold;
                        line-height: 1;
                    }

                    .sub-checklist {
                        margin-left: 0.5cm;
                        margin-top: 0.15cm;
                    }

                    .sub-checklist .checklist-item {
                        margin-bottom: 0.15cm;
                    }

                    .print-button {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        padding: 10px 20px;
                        background: #3b82f6;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;
                        z-index: 1000;
                    }

                    .print-button:hover {
                        background: #2563eb;
                    }
                `}</style>

                {/* Header dengan Logo dan Kop Surat */}
                <div className="header">
                    {logoBase64 && (
                        <img 
                            src={logoBase64} 
                            alt="Logo" 
                            className="logo"
                        />
                    )}
                    <div className="kop-surat">
                        {setting && (
                            <>
                                <h3>{setting.nama_instansi || "Rumah Sakit"}</h3>
                                <p>{setting.alamat_instansi || ""}</p>
                                <p>
                                    {setting.kabupaten && `${setting.kabupaten}, `}
                                    {setting.propinsi || ""}
                                </p>
                                {setting.kontak && <p>Telp: {setting.kontak}</p>}
                                {setting.email && <p>Email: {setting.email}</p>}
                            </>
                        )}
                    </div>
                </div>

                <div className="divider"></div>

                {/* Title */}
                <div className="title">
                    KARTU KENDALI PASIEN {registration?.penjab?.png_jawab ? `(${registration.penjab.png_jawab})` : ""}
                </div>

                <div className="divider"></div>

                {/* Informasi Registrasi */}
                <div className="info-section">
                    <div className="info-row">
                        <span className="info-label">No Registrasi</span>
                        <span className="info-value">: {registration?.no_reg || "-"}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Nama</span>
                        <span className="info-value">
                            : {registration?.pasien?.nm_pasien || "-"} ({registration?.no_rkm_medis || "-"})
                        </span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Poli</span>
                        <span className="info-value">: {registration?.poliklinik?.nm_poli || "-"}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Dokter</span>
                        <span className="info-value">: {registration?.dokter?.nm_dokter || "-"}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Tanggal</span>
                        <span className="info-value">: {formatDateTime()}</span>
                    </div>
                </div>

                <div className="divider"></div>

                {/* Checklist Section */}
                <div className="checklist-section">
                    {/* 1. Skrining */}
                    <div className="checklist-item">
                        <span className="checklist-label">1. Skrining</span>
                        <div className="checklist-boxes">
                            <div className="checkbox-label">
                                <span className="checkbox"></span>
                                <span>Ya</span>
                            </div>
                            <div className="checkbox-label">
                                <span className="checkbox"></span>
                                <span>Tidak</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. TTV */}
                    <div className="checklist-item">
                        <span className="checklist-label">2. TTV</span>
                        <div className="checklist-boxes">
                            <div className="checkbox-label">
                                <span className="checkbox"></span>
                                <span>Ya</span>
                            </div>
                            <div className="checkbox-label">
                                <span className="checkbox"></span>
                                <span>Tidak</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. CPPT */}
                    <div className="checklist-item">
                        <span className="checklist-label">3. CPPT</span>
                        <div className="checklist-boxes">
                            <div className="checkbox-label">
                                <span className="checkbox"></span>
                                <span>Ya</span>
                            </div>
                            <div className="checkbox-label">
                                <span className="checkbox"></span>
                                <span>Tidak</span>
                            </div>
                        </div>
                    </div>
                    <div className="sub-checklist">
                        <div className="checklist-item">
                            <span className="checklist-label">Perawat</span>
                            <div className="checklist-boxes">
                                <div className="checkbox-label">
                                    <span className="checkbox"></span>
                                    <span>Ya</span>
                                </div>
                                <div className="checkbox-label">
                                    <span className="checkbox"></span>
                                    <span>Tidak</span>
                                </div>
                            </div>
                        </div>
                        <div className="checklist-item">
                            <span className="checklist-label">Dokter</span>
                            <div className="checklist-boxes">
                                <div className="checkbox-label">
                                    <span className="checkbox"></span>
                                    <span>Ya</span>
                                </div>
                                <div className="checkbox-label">
                                    <span className="checkbox"></span>
                                    <span>Tidak</span>
                                </div>
                            </div>
                        </div>
                        <div className="checklist-item">
                            <span className="checklist-label">R. Internal</span>
                            <div className="checklist-boxes">
                                <div className="checkbox-label">
                                    <span className="checkbox"></span>
                                    <span>Ya</span>
                                </div>
                                <div className="checkbox-label">
                                    <span className="checkbox"></span>
                                    <span>Tidak</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Penunjang */}
                    <div className="checklist-item">
                        <span className="checklist-label">4. Penunjang</span>
                        <div className="checklist-boxes">
                            <div className="checkbox-label">
                                <span className="checkbox"></span>
                                <span>Ya</span>
                            </div>
                            <div className="checkbox-label">
                                <span className="checkbox"></span>
                                <span>Tidak</span>
                            </div>
                        </div>
                    </div>
                    <div className="sub-checklist">
                        <div className="checklist-item">
                            <span className="checklist-label">Laboratorium</span>
                            <div className="checklist-boxes">
                                <div className="checkbox-label">
                                    <span className="checkbox"></span>
                                    <span>Ya</span>
                                </div>
                                <div className="checkbox-label">
                                    <span className="checkbox"></span>
                                    <span>Tidak</span>
                                </div>
                            </div>
                        </div>
                        <div className="checklist-item">
                            <span className="checklist-label">Radiologi</span>
                            <div className="checklist-boxes">
                                <div className="checkbox-label">
                                    <span className="checkbox"></span>
                                    <span>Ya</span>
                                </div>
                                <div className="checkbox-label">
                                    <span className="checkbox"></span>
                                    <span>Tidak</span>
                                </div>
                            </div>
                        </div>
                        <div className="checklist-item">
                            <span className="checklist-label">Fisioterapi</span>
                            <div className="checklist-boxes">
                                <div className="checkbox-label">
                                    <span className="checkbox"></span>
                                    <span>Ya</span>
                                </div>
                                <div className="checkbox-label">
                                    <span className="checkbox"></span>
                                    <span>Tidak</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Resep */}
                    <div className="checklist-item">
                        <span className="checklist-label">5. Resep</span>
                        <div className="checklist-boxes">
                            <div className="checkbox-label">
                                <span className="checkbox"></span>
                                <span>Ya</span>
                            </div>
                            <div className="checkbox-label">
                                <span className="checkbox"></span>
                                <span>Tidak</span>
                            </div>
                        </div>
                    </div>

                    {/* 6. Kasir */}
                    <div className="checklist-item">
                        <span className="checklist-label">6. Kasir</span>
                        <div className="checklist-boxes">
                            <div className="checkbox-label">
                                <span className="checkbox"></span>
                                <span>Ya</span>
                            </div>
                            <div className="checkbox-label">
                                <span className="checkbox"></span>
                                <span>Tidak</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Print Button (hidden saat print) */}
                <button 
                    className="print-button no-print" 
                    onClick={() => window.print()}
                >
                    Cetak
                </button>
            </div>
        </>
    );
}
