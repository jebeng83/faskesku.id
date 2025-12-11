import React, { useEffect } from "react";
import { Head } from "@inertiajs/react";

export default function Cetak({ permintaanLab, periksaLab, hasilPemeriksaan = [], setting }) {
	useEffect(() => {
		// Auto print saat komponen dimuat
		window.print();
	}, []);

	// Format tanggal Indonesia
	const formatTanggal = (tanggal) => {
		if (!tanggal || tanggal === "0000-00-00") return "-";
		try {
			const date = new Date(tanggal);
			const options = { day: "2-digit", month: "long", year: "numeric" };
			return date.toLocaleDateString("id-ID", options);
		} catch (e) {
			return tanggal;
		}
	};

	// Format jam
	const formatJam = (jam) => {
		if (!jam || jam === "00:00:00") return "-";
		return jam.toString().substring(0, 5);
	};

	// Format keterangan
	const formatKeterangan = (keterangan) => {
		const keteranganMap = {
			N: "Normal",
			L: "Rendah",
			H: "Tinggi",
			K: "Kritis",
		};
		return keteranganMap[keterangan] || keterangan || "-";
	};

	const patient = permintaanLab?.reg_periksa?.patient;
	const dokterPerujuk = permintaanLab?.dokter;
	const petugas = periksaLab?.petugas;
	const dokterPj = periksaLab?.dokterPj;

	// Hitung usia
	let usia = "-";
	if (patient?.tgl_lahir) {
		try {
			const tglLahir = new Date(patient.tgl_lahir);
			const tglPeriksa = permintaanLab?.tgl_hasil 
				? new Date(permintaanLab.tgl_hasil) 
				: new Date();
			const diffTime = Math.abs(tglPeriksa - tglLahir);
			const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
			usia = `${diffYears} tahun`;
		} catch (e) {
			usia = "-";
		}
	}

	return (
		<>
			<Head title="Cetak Hasil Laboratorium" />
			<div className="print-container" style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
				{/* Kop Surat */}
				<div style={{ textAlign: "center", marginBottom: "30px", borderBottom: "3px solid #000", paddingBottom: "15px" }}>
					<h1 style={{ margin: "0", fontSize: "24px", fontWeight: "bold" }}>
						{setting?.nama_instansi || "Rumah Sakit"}
					</h1>
					<p style={{ margin: "5px 0", fontSize: "14px" }}>
						{setting?.alamat_instansi || ""}
					</p>
					{(setting?.kabupaten || setting?.propinsi) && (
						<p style={{ margin: "5px 0", fontSize: "14px" }}>
							{setting?.kabupaten || ""} {setting?.propinsi || ""}
						</p>
					)}
					{(setting?.kontak || setting?.email) && (
						<p style={{ margin: "5px 0", fontSize: "12px" }}>
							{setting?.kontak || ""} {setting?.email ? `| ${setting.email}` : ""}
						</p>
					)}
				</div>

				{/* Judul */}
				<div style={{ textAlign: "center", marginBottom: "20px" }}>
					<h2 style={{ margin: "0", fontSize: "20px", fontWeight: "bold", textDecoration: "underline" }}>
						HASIL PEMERIKSAAN LABORATORIUM
					</h2>
				</div>

			{/* Identitas Pasien dan Data Petugas & Dokter - Side by Side */}
			<div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
				{/* Identitas Pasien - Kiri */}
				<div style={{ flex: "1" }}>
					<h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px", borderBottom: "1px solid #000", paddingBottom: "5px" }}>
						IDENTITAS PASIEN
					</h3>
					<table style={{ width: "100%", borderCollapse: "collapse" }}>
						<tbody>
							<tr>
								<td style={{ width: "35%", padding: "5px", fontWeight: "bold" }}>No. Rekam Medis</td>
								<td style={{ width: "5%", padding: "5px" }}>:</td>
								<td style={{ padding: "5px" }}>{patient?.no_rkm_medis || "-"}</td>
							</tr>
							<tr>
								<td style={{ padding: "5px", fontWeight: "bold" }}>Nama Pasien</td>
								<td style={{ padding: "5px" }}>:</td>
								<td style={{ padding: "5px" }}>{patient?.nm_pasien || "-"}</td>
							</tr>
							<tr>
								<td style={{ padding: "5px", fontWeight: "bold" }}>Jenis Kelamin</td>
								<td style={{ padding: "5px" }}>:</td>
								<td style={{ padding: "5px" }}>{patient?.jk === "L" ? "Laki-laki" : patient?.jk === "P" ? "Perempuan" : "-"}</td>
							</tr>
							<tr>
								<td style={{ padding: "5px", fontWeight: "bold" }}>Tanggal Lahir</td>
								<td style={{ padding: "5px" }}>:</td>
								<td style={{ padding: "5px" }}>{formatTanggal(patient?.tgl_lahir)}</td>
							</tr>
							<tr>
								<td style={{ padding: "5px", fontWeight: "bold" }}>Usia</td>
								<td style={{ padding: "5px" }}>:</td>
								<td style={{ padding: "5px" }}>{usia}</td>
							</tr>
							<tr>
								<td style={{ padding: "5px", fontWeight: "bold" }}>Alamat</td>
								<td style={{ padding: "5px" }}>:</td>
								<td style={{ padding: "5px" }}>{patient?.alamat || "-"}</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Data Petugas dan Dokter - Kanan */}
				<div style={{ flex: "1" }}>
					<h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px", borderBottom: "1px solid #000", paddingBottom: "5px" }}>
						DATA PETUGAS & DOKTER
					</h3>
					<table style={{ width: "100%", borderCollapse: "collapse" }}>
						<tbody>
							<tr>
								<td style={{ width: "35%", padding: "5px", fontWeight: "bold" }}>No. Order</td>
								<td style={{ width: "5%", padding: "5px" }}>:</td>
								<td style={{ padding: "5px" }}>{permintaanLab?.noorder || "-"}</td>
							</tr>
							<tr>
								<td style={{ padding: "5px", fontWeight: "bold" }}>Tanggal Permintaan</td>
								<td style={{ padding: "5px" }}>:</td>
								<td style={{ padding: "5px" }}>{formatTanggal(permintaanLab?.tgl_permintaan)} {formatJam(permintaanLab?.jam_permintaan) !== "-" ? `pukul ${formatJam(permintaanLab?.jam_permintaan)}` : ""}</td>
							</tr>
							<tr>
								<td style={{ padding: "5px", fontWeight: "bold" }}>Tanggal Sampel</td>
								<td style={{ padding: "5px" }}>:</td>
								<td style={{ padding: "5px" }}>{formatTanggal(permintaanLab?.tgl_sampel)} {formatJam(permintaanLab?.jam_sampel) !== "-" ? `pukul ${formatJam(permintaanLab?.jam_sampel)}` : ""}</td>
							</tr>
							<tr>
								<td style={{ padding: "5px", fontWeight: "bold" }}>Tanggal Hasil</td>
								<td style={{ padding: "5px" }}>:</td>
								<td style={{ padding: "5px" }}>{formatTanggal(permintaanLab?.tgl_hasil)} {formatJam(permintaanLab?.jam_hasil) !== "-" ? `pukul ${formatJam(permintaanLab?.jam_hasil)}` : ""}</td>
							</tr>
							<tr>
								<td style={{ padding: "5px", fontWeight: "bold" }}>Dokter Perujuk</td>
								<td style={{ padding: "5px" }}>:</td>
								<td style={{ padding: "5px" }}>{dokterPerujuk?.nm_dokter || permintaanLab?.dokter_perujuk || "-"}</td>
							</tr>
							{petugas && (
								<tr>
									<td style={{ padding: "5px", fontWeight: "bold" }}>Petugas Lab</td>
									<td style={{ padding: "5px" }}>:</td>
									<td style={{ padding: "5px" }}>{petugas?.nama || "-"}</td>
								</tr>
							)}
							{dokterPj && (
								<tr>
									<td style={{ padding: "5px", fontWeight: "bold" }}>Dokter Penanggung Jawab</td>
									<td style={{ padding: "5px" }}>:</td>
									<td style={{ padding: "5px" }}>{dokterPj?.nm_dokter || "-"}</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

				{/* Hasil Pemeriksaan */}
				<div style={{ marginBottom: "20px" }}>
					<h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px", borderBottom: "1px solid #000", paddingBottom: "5px" }}>
						HASIL PEMERIKSAAN
					</h3>
					<table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #000" }}>
						<thead>
							<tr style={{ backgroundColor: "#f0f0f0" }}>
								<th style={{ border: "1px solid #000", padding: "8px", textAlign: "left", fontSize: "12px", fontWeight: "bold" }}>
									No
								</th>
								<th style={{ border: "1px solid #000", padding: "8px", textAlign: "left", fontSize: "12px", fontWeight: "bold" }}>
									Nama Pemeriksaan
								</th>
								<th style={{ border: "1px solid #000", padding: "8px", textAlign: "center", fontSize: "12px", fontWeight: "bold" }}>
									Hasil
								</th>
								<th style={{ border: "1px solid #000", padding: "8px", textAlign: "center", fontSize: "12px", fontWeight: "bold" }}>
									Satuan
								</th>
								<th style={{ border: "1px solid #000", padding: "8px", textAlign: "center", fontSize: "12px", fontWeight: "bold" }}>
									Nilai Rujukan
								</th>
								<th style={{ border: "1px solid #000", padding: "8px", textAlign: "center", fontSize: "12px", fontWeight: "bold" }}>
									Keterangan
								</th>
							</tr>
						</thead>
						<tbody>
							{hasilPemeriksaan.length > 0 ? (
								hasilPemeriksaan.map((item, index) => (
									<tr key={index}>
										<td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", fontSize: "12px" }}>
											{index + 1}
										</td>
										<td style={{ border: "1px solid #000", padding: "8px", fontSize: "12px" }}>
											{item.nama_pemeriksaan || "-"}
										</td>
										<td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", fontSize: "12px" }}>
											{item.hasil || "-"}
										</td>
										<td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", fontSize: "12px" }}>
											{item.satuan || "-"}
										</td>
										<td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", fontSize: "12px" }}>
											{item.nilai_rujukan || "-"}
										</td>
										<td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", fontSize: "12px", fontWeight: item.keterangan === "Kritis" ? "bold" : "normal" }}>
											{formatKeterangan(item.keterangan)}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="6" style={{ border: "1px solid #000", padding: "15px", textAlign: "center", fontSize: "12px" }}>
										Tidak ada data hasil pemeriksaan
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Tanda Tangan */}
				<div style={{ marginTop: "40px", display: "flex", justifyContent: "space-between" }}>
					<div style={{ width: "45%", textAlign: "center" }}>
						<p style={{ marginBottom: "60px", fontSize: "12px" }}>Petugas Lab</p>
						<p style={{ marginTop: "60px", fontSize: "12px", fontWeight: "bold", borderTop: "1px solid #000", paddingTop: "5px", display: "inline-block", minWidth: "150px" }}>
							{petugas?.nama || "________________"}
						</p>
					</div>
					<div style={{ width: "45%", textAlign: "center" }}>
						<p style={{ marginBottom: "60px", fontSize: "12px" }}>Dokter Penanggung Jawab</p>
						<p style={{ marginTop: "60px", fontSize: "12px", fontWeight: "bold", borderTop: "1px solid #000", paddingTop: "5px", display: "inline-block", minWidth: "150px" }}>
							{dokterPj?.nm_dokter || dokterPerujuk?.nm_dokter || "________________"}
						</p>
					</div>
				</div>

				{/* Catatan Kaki */}
				<div style={{ marginTop: "30px", fontSize: "10px", textAlign: "center", color: "#666" }}>
					<p>Dokumen ini dicetak secara elektronik dan tidak memerlukan tanda tangan basah</p>
					<p>Tanggal Cetak: {new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
				</div>
			</div>

			{/* Print Styles */}
			<style>{`
				@media print {
					body {
						margin: 0;
						padding: 20px;
					}
					.print-container {
						max-width: 210mm;
						margin: 0 auto;
						padding: 20px;
					}
					.print-container > div[style*="display: flex"] {
						display: flex !important;
					}
					@page {
						size: A4 portrait;
						margin: 15mm;
					}
				}
				@media screen {
					.print-container {
						max-width: 800px;
						margin: 0 auto;
						background: white;
						box-shadow: 0 0 10px rgba(0,0,0,0.1);
					}
					.print-container > div[style*="display: flex"] {
						display: flex !important;
					}
				}
			`}</style>
		</>
	);
}
