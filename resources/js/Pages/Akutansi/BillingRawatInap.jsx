import React from "react";
import { BillingPage } from "@/Pages/Akutansi/Billing";
import LayoutUtama from "@/Pages/LayoutUtama";
import SidebarRawatInap from "@/Layouts/SidebarRawatInap";

export default function BillingRawatInapPage(props) {
    const categoryMap = [
        { label: "Kamar & Harian", keys: ["Kamar", "Harian", "TtlKamar"] },
        {
            label: "Tarif Ranap",
            keys: [
                "Ranap Dokter",
                "Ranap Dokter Paramedis",
                "Ranap Paramedis",
                "TtlRanap Dokter",
                "TtlRanap Paramedis",
                "Dokter",
                "Perawat",
            ],
        },
        { label: "Laboratorium", keys: ["Laborat", "TtlLaborat"] },
        { label: "Radiologi", keys: ["Radiologi", "TtlRadiologi"] },
        { label: "Operasi", keys: ["Operasi", "TtlOperasi"] },
        { label: "Obat", keys: ["Obat", "TtlObat", "Retur Obat", "TtlRetur Obat", "Resep Pulang", "TtlResep Pulang"] },
        { label: "Lainnya", keys: ["Registrasi", "Administrasi", "Service", "Tambahan", "Potongan", "TtlTambahan", "TtlPotongan", "Tagihan", "-"] },
    ];

    return (
        <SidebarRawatInap title="Rawat Inap">
            <LayoutUtama title="Billing Rawat Inap" chrome={false}>
                <BillingPage
                    {...props}
                    heading="Billing Rawat Inap"
                    categoryMap={categoryMap}
                    forceTodayOnly={false}
                    showKasirRalanLink={false}
                    useLayout={false}
                    notaApiBase="/api/akutansi/nota-inap"
                    notaLabel="nota_inap"
                />
            </LayoutUtama>
        </SidebarRawatInap>
    );
}
