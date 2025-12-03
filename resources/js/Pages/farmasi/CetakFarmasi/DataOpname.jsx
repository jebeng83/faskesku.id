import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";

function formatIDR(n) {
    try {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(Number(n || 0));
    } catch {
        return n;
    }
}

const COLS = [
    "Kode Barang",
    "Nama Barang",
    "Harga Beli",
    "Satuan",
    "Tanggal",
    "Stok",
    "Real",
    "Selisih",
    "Lebih",
    "Total Real",
    "Nominal Hilang(Rp)",
    "Nominal Lebih(Rp)",
    "Keterangan",
    "Kode Lokasi",
    "Nama Lokasi",
    "No.Batch",
    "No.Faktur",
];

export default function CetakDataOpname() {
    const params = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : ""
    );
    const [setting, setSetting] = useState(null);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const tanggal_dari =
        params.get("tanggal_dari") || new Date().toISOString().slice(0, 10);
    const tanggal_sampai =
        params.get("tanggal_sampai") || new Date().toISOString().slice(0, 10);
    const kd_bangsal = params.get("kd_bangsal") || "";

    useEffect(() => {
        (async () => {
            try {
                const r = await fetch("/setting/app");
                const j = await r.json().catch(() => ({}));
                const data = Array.isArray(j.data) ? j.data : [];
                const active =
                    data.find(
                        (d) => (d.aktifkan || "").toLowerCase() === "yes"
                    ) ||
                    data[0] ||
                    null;
                setSetting(active);
            } catch {}
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const qs = new URLSearchParams({
                    tanggal_dari,
                    tanggal_sampai,
                    kd_bangsal: kd_bangsal || "",
                }).toString();
                const r = await fetch(`/api/opname/list?${qs}`);
                const j = await r.json().catch(() => ({}));
                const arr = Array.isArray(j.data) ? j.data : [];
                const normalized = arr.map((r) => ({
                    ...r,
                    h_beli: r.h_beli ?? r.harga ?? 0,
                    kode_sat: r.kode_sat ?? r.satuan ?? "",
                    totalreal:
                        r.totalreal ??
                        Number(r.real || 0) * Number(r.h_beli ?? r.harga ?? 0),
                    kd_bangsal: r.kd_bangsal ?? r.kd_bangsal ?? "",
                }));
                setRows(normalized);
            } catch {}
            setLoading(false);
        })();
    }, [tanggal_dari, tanggal_sampai, kd_bangsal]);

    const totals = useMemo(() => {
        let totalreal = 0,
            totalHilang = 0,
            totalLebih = 0;
        rows.forEach((r) => {
            totalreal += Number(r.totalreal || 0);
            totalHilang += Number(r.nomihilang || 0);
            totalLebih += Number(r.nomilebih || 0);
        });
        return { totalreal, totalHilang, totalLebih };
    }, [rows]);

    return (
        <div>
            <Head title="Cetak Data Opname" />
            <style>{`
        @page { size: A4 landscape; margin: 12mm; }
        @media print {
          .screen-only { display: none !important; }
          body { background: #ffffff; }
        }
      `}</style>
            <div
                className="screen-only"
                style={{
                    padding: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    borderBottom: "1px solid #e5e7eb",
                    position: "sticky",
                    top: 0,
                    background: "#fff",
                    zIndex: 10,
                }}
            >
                <div style={{ fontWeight: 600 }}>
                    Preview Cetak • Data Opname
                </div>
                <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                    <button
                        onClick={() => window.print()}
                        style={{
                            padding: "6px 12px",
                            borderRadius: 8,
                            border: "1px solid #2563eb",
                            background: "#eff6ff",
                            color: "#1e40af",
                            fontWeight: 600,
                        }}
                    >
                        Cetak
                    </button>
                    <button
                        onClick={() => history.back()}
                        style={{
                            padding: "6px 12px",
                            borderRadius: 8,
                            border: "1px solid #d1d5db",
                            background: "#f9fafb",
                            color: "#111827",
                        }}
                    >
                        Kembali
                    </button>
                </div>
            </div>
            <div style={{ padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    {setting?.nama_instansi ? (
                        <img
                            src={`/setting/app/${encodeURIComponent(
                                setting.nama_instansi
                            )}/logo?t=${Date.now()}`}
                            alt="Logo"
                            style={{ height: 60, objectFit: "contain" }}
                        />
                    ) : (
                        <div
                            style={{
                                width: 60,
                                height: 60,
                                border: "1px solid #ddd",
                            }}
                        />
                    )}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ fontSize: 20, fontWeight: 700 }}>
                            {setting?.nama_instansi || "Nama Instansi"}
                        </div>
                        <div
                            style={{
                                marginTop: 4,
                                fontSize: 12,
                                color: "#374151",
                            }}
                        >
                            {[
                                setting?.alamat_instansi,
                                setting?.kabupaten,
                                setting?.propinsi,
                            ]
                                .filter(Boolean)
                                .join(", ")}
                        </div>
                        <div
                            style={{
                                marginTop: 2,
                                fontSize: 12,
                                color: "#374151",
                            }}
                        >
                            {[
                                setting?.kontak
                                    ? `Telp: ${setting.kontak}`
                                    : null,
                                setting?.email
                                    ? `Email: ${setting.email}`
                                    : null,
                            ]
                                .filter(Boolean)
                                .join(" • ")}
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: 8, borderTop: "1px solid #000" }} />
                <div
                    style={{
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: 700,
                        padding: "6px 0",
                    }}
                >
                    DATA STOK OPNAME
                </div>
                <div style={{ borderBottom: "1px solid #000" }} />
                <div
                    style={{
                        marginTop: 10,
                        display: "flex",
                        gap: 16,
                        fontSize: 12,
                    }}
                >
                    <div>
                        Tanggal Dari: <strong>{tanggal_dari}</strong>
                    </div>
                    <div>
                        Tanggal Sampai: <strong>{tanggal_sampai}</strong>
                    </div>
                    {kd_bangsal ? (
                        <div>
                            Lokasi: <strong>{kd_bangsal}</strong>
                        </div>
                    ) : null}
                </div>
                <div style={{ marginTop: 12, fontWeight: 600 }}>
                    Daftar Data Opname
                </div>
                <div style={{ marginTop: 8 }}>
                    {loading ? (
                        <div style={{ padding: 12, fontSize: 12 }}>Memuat…</div>
                    ) : rows.length === 0 ? (
                        <div style={{ padding: 12, fontSize: 12 }}>
                            Tidak ada data
                        </div>
                    ) : (
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                fontSize: 12,
                            }}
                        >
                            <thead>
                                <tr>
                                    {COLS.map((c) => (
                                        <th
                                            key={c}
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                                textAlign: "left",
                                            }}
                                        >
                                            {c}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((r, i) => (
                                    <tr
                                        key={`${r.kode_brng}|${r.kd_bangsal}|${
                                            r.tanggal?.slice(0, 10) || ""
                                        }|${r.no_batch || ""}|${
                                            r.no_faktur || ""
                                        }`}
                                    >
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                            }}
                                        >
                                            {r.kode_brng}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                            }}
                                        >
                                            {r.nama_brng}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                                textAlign: "right",
                                            }}
                                        >
                                            {formatIDR(r.h_beli)}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                            }}
                                        >
                                            {r.kode_sat}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                            }}
                                        >
                                            {r.tanggal?.slice(0, 10)}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                                textAlign: "right",
                                            }}
                                        >
                                            {r.stok}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                                textAlign: "right",
                                            }}
                                        >
                                            {r.real}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                                textAlign: "right",
                                            }}
                                        >
                                            {r.selisih}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                                textAlign: "right",
                                            }}
                                        >
                                            {r.lebih}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                                textAlign: "right",
                                            }}
                                        >
                                            {formatIDR(r.totalreal)}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                                textAlign: "right",
                                            }}
                                        >
                                            {formatIDR(r.nomihilang)}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                                textAlign: "right",
                                            }}
                                        >
                                            {formatIDR(r.nomilebih)}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                            }}
                                        >
                                            {r.keterangan || "-"}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                            }}
                                        >
                                            {r.kd_bangsal}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                            }}
                                        >
                                            {r.nm_bangsal}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                            }}
                                        >
                                            {r.no_batch || "-"}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: 4,
                                            }}
                                        >
                                            {r.no_faktur || "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div
                    style={{
                        marginTop: 12,
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gap: 8,
                        fontSize: 12,
                    }}
                >
                    <div>
                        <strong>Total Real:</strong>{" "}
                        {formatIDR(totals.totalreal)}
                    </div>
                    <div>
                        <strong>Total Hilang:</strong>{" "}
                        {formatIDR(totals.totalHilang)}
                    </div>
                    <div>
                        <strong>Total Lebih:</strong>{" "}
                        {formatIDR(totals.totalLebih)}
                    </div>
                </div>
            </div>
        </div>
    );
}
