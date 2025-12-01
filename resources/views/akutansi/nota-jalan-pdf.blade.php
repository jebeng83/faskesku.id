<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nota Pembayaran Rawat Jalan - {{ $nota_jalan->no_nota ?? '-' }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: 8.5in 13in;
            margin: 0.25in;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            color: #000;
            background: #fff;
            padding: 0;
            margin: 0;
            width: 100%;
            min-height: 12in;
        }

        .container {
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
            box-sizing: border-box;
        }

        .header {
            margin-bottom: 20px;
        }

        .header-top {
            display: block;
            margin-bottom: 10px;
        }

        .header-table {
            width: 100%;
            table-layout: fixed;
            border-collapse: collapse;
        }

        .header-logo-cell {
            width: 25%;
            vertical-align: middle;
            padding-right: 10px;
        }

        .header-center-cell {
            width: 50%;
            vertical-align: middle;
            text-align: center;
        }

        .header-spacer-cell {
            width: 25%;
        }

        .logo {
            width: 64px;
            height: 64px;
            flex-shrink: 0;
        }

        .logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .kop-surat {
            font-size: 11px;
            line-height: 1.2;
        }

        .kop-surat h1 {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 3px;
            color: #000;
            text-transform: uppercase;
        }

        .kop-surat p {
            margin: 1px 0;
            color: #333;
            font-size: 10px;
            line-height: 1.15;
        }

        .divider {
            border-top: 1px solid #666;
            /* rata kiri-kanan mengikuti padding container */
            margin: 10px 0;
        }

        .title {
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            padding: 6px 0;
            color: #000;
            letter-spacing: 0.5px;
        }

        .info-box {
            border: 1px solid #666;
            padding: 10px;
            /* kurangi panjang border agar lebih simetris dengan elemen lain */
            width: calc(100% - 0.25in);
            margin: 0 auto 15px;
            box-sizing: border-box;
            border-width: 1px;
            max-width: calc(100% - 0.25in);
            overflow: hidden;
        }

        .info-grid {
            display: table;
            width: 100%;
            font-size: 10px;
            table-layout: fixed;
            border-collapse: separate;
            border-spacing: 0;
        }

        .info-section {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            padding-right: 10px;
            box-sizing: border-box;
        }

        .info-section:last-child {
            padding-right: 0;
            padding-left: 0;
        }

        .info-section:first-child {
            padding-left: 0;
        }

        .info-section h3 {
            font-weight: bold;
            margin-bottom: 4px;
            font-size: 11px;
        }

        .info-item {
            margin: 2px 0;
        }

        .info-label {
            color: #555;
        }

        .info-value {
            font-weight: 600;
            color: #000;
        }

        .category-section {
            margin-bottom: 15px;
        }

        .category-title {
            font-weight: bold;
            font-size: 11px;
            margin-bottom: 5px;
            padding-left: 2px;
            color: #000;
        }

        .table-container {
            border: 1px solid #666;
            margin: 0 0 15px;
            /* rata kiri-kanan dengan konten lain */
            width: 100%;
            overflow: hidden;
            border-width: 1px;
            box-sizing: border-box;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
            table-layout: fixed;
        }

        thead th {
            background-color: #f0f0f0;
            border: 1px solid #666;
            padding: 6px 4px;
            text-align: left;
            font-weight: bold;
            word-wrap: break-word;
            overflow: hidden;
        }

        thead th:first-child {
            width: 5%;
        }

        thead th:nth-child(2) {
            width: 50%;
        }

        thead th:nth-child(3) {
            width: 20%;
            text-align: right;
        }

        thead th:nth-child(4) {
            width: 10%;
            text-align: center;
        }

        thead th:last-child {
            width: 15%;
            text-align: right;
        }

        tbody tr.category-header {
            background-color: #f5f5f5;
        }

        tbody tr.category-header td {
            font-weight: bold;
            padding: 4px 8px;
            border-bottom: 1px solid #999;
        }

        tbody td {
            border: 1px solid #ccc;
            padding: 4px;
            border-top: none;
            word-wrap: break-word;
            overflow: hidden;
        }

        tbody td:first-child {
            text-align: left;
        }

        tbody td:nth-child(2) {
            word-wrap: break-word;
            overflow-wrap: break-word;
        }

        tbody td:nth-child(3) {
            text-align: right;
            white-space: nowrap;
        }

        tbody td:nth-child(4) {
            text-align: center;
        }

        tbody td:last-child {
            text-align: right;
            font-weight: 600;
            white-space: nowrap;
        }

        .summary-box {
            width: 256px;
            /* w-64 pada preview React */
            max-width: 100%;
            border: 1px solid #666;
            padding: 10px;
            margin-left: auto;
            margin-right: 0;
            /* selaras dengan margin konten lain */
            margin-bottom: 20px;
            font-size: 10px;
        }

        .summary-row {
            display: table;
            width: 100%;
            margin-bottom: 4px;
        }

        .summary-label {
            display: table-cell;
            text-align: left;
            padding-right: 10px;
            white-space: nowrap;
        }

        .summary-value {
            display: table-cell;
            text-align: right;
            font-weight: 600;
            width: 100%;
        }

        .summary-row.total {
            border-top: 1px solid #666;
            padding-top: 6px;
            margin-top: 6px;
        }

        .summary-row.total .summary-label,
        .summary-row.total .summary-value {
            font-weight: bold;
        }

        .footer {
            margin: 30px 0 0;
            /* rata kiri-kanan mengikuti padding container */
            padding-top: 15px;
            border-top: 1px solid #666;
        }

        .footer-grid {
            display: table;
            width: 100%;
            table-layout: fixed;
            text-align: center;
            font-size: 10px;
        }

        .footer-grid>div {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            padding: 0 20px;
        }

        .signature-box {
            margin-top: 8px;
        }

        .signature-line {
            border-bottom: 1px solid #666;
            height: 48px;
            margin-bottom: 4px;
        }

        .signature-label {
            color: #555;
            font-size: 9px;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Header dengan Logo dan Kop Surat -->
        <div class="header">
            <div class="header-top">
                <table class="header-table" role="presentation">
                    <colgroup>
                        <col style="width:25%" />
                        <col style="width:50%" />
                        <col style="width:25%" />
                    </colgroup>
                    <tr>
                        <td class="header-logo-cell">
                            @if($logo_base64)
                            <div class="logo">
                                <img src="{{ $logo_base64 }}" alt="Logo Instansi">
                            </div>
                            @else
                            <div class="logo"
                                style="border: 1px solid #ccc; display: table; width:64px; height:64px; text-align:center; color:#999; font-size:8px; vertical-align:middle;">
                                <span style="display: table-cell; vertical-align: middle;">Logo</span>
                            </div>
                            @endif
                        </td>
                        <td class="header-center-cell">
                            <div class="kop-surat">
                                <h1>{{ $setting->nama_instansi ?? 'Rumah Sakit / Klinik' }}</h1>
                                @if($setting->alamat_instansi ?? null)
                                <p>{{ $setting->alamat_instansi }}</p>
                                @endif
                                @if(($setting->kabupaten ?? null) || ($setting->propinsi ?? null))
                                <p>{{ trim(($setting->kabupaten ?? '') . ', ' . ($setting->propinsi ?? ''), ', ') }}</p>
                                @endif
                                @if(($setting->kontak ?? null) || ($setting->email ?? null))
                                <p>
                                    @if($setting->kontak ?? null)Telp: {{ $setting->kontak }}@endif
                                    @if(($setting->kontak ?? null) && ($setting->email ?? null)) • @endif
                                    @if($setting->email ?? null)Email: {{ $setting->email }}@endif
                                </p>
                                @endif
                            </div>
                        </td>
                        <td class="header-spacer-cell"></td>
                    </tr>
                </table>
            </div>

            <div class="title">
                NOTA PEMBAYARAN RAWAT JALAN
            </div>

            <div class="divider"></div>
        </div>

        <!-- Informasi Pasien dan Kunjungan -->
        <div class="info-box">
            <div class="info-grid">
                <div class="info-section">
                    <h3>Informasi Pasien</h3>
                    <div class="info-item">
                        <span class="info-label">Nama:</span>
                        <span class="info-value">{{ $pasien->nm_pasien ?? '-' }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">No. RM:</span>
                        <span class="info-value">{{ $pasien->no_rkm_medis ?? '-' }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Alamat:</span>
                        <span class="info-value">{{ $pasien->alamat ?? '-' }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Telp:</span>
                        <span class="info-value">{{ $pasien->no_tlp ?? '-' }}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h3>Informasi Kunjungan</h3>
                    <div class="info-item">
                        <span class="info-label">No. Nota:</span>
                        <span class="info-value">{{ $nota_jalan->no_nota ?? '-' }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">No. Rawat:</span>
                        <span class="info-value">{{ $reg_periksa->no_rawat ?? '-' }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Poliklinik:</span>
                        <span class="info-value">{{ $poliklinik->nm_poli ?? '-' }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Dokter:</span>
                        <span class="info-value">{{ $dokter->nm_dokter ?? '-' }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Penjamin:</span>
                        <span class="info-value">{{ $penjab->png_jawab ?? '-' }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Tanggal:</span>
                        <span class="info-value">{{ $formatDate($nota_jalan->tanggal) }} {{
                            $formatTime($nota_jalan->jam)
                            }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabel Tagihan per Kategori -->
        @if(count($grouped_by_category) > 0)
        @foreach($grouped_by_category as $category => $items)
        <div class="category-section">
            <div class="category-title">{{ $category }}</div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Tagihan</th>
                            <th>Biaya</th>
                            <th>Jml.</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($items as $itemData)
                        @php
                        $item = $itemData['item'];
                        $number = $itemData['number'];
                        @endphp
                        <tr>
                            <td>{{ $number }}.</td>
                            <td>{{ $item->nm_perawatan ?? '-' }}</td>
                            <td>{{ $formatCurrency($item->biaya ?? 0) }}</td>
                            <td>{{ $item->jumlah ?? 1 }}</td>
                            <td>{{ $formatCurrency($item->totalbiaya ?? 0) }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
        @endforeach
        @else
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Tagihan</th>
                        <th>Biaya</th>
                        <th>Jml.</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="5" style="text-align: center; padding: 16px; color: #999;">
                            Tidak ada data tagihan
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        @endif

        <!-- Summary Total di Kanan Bawah -->
        <div class="summary-box">
            <div class="summary-row">
                <span class="summary-label">Total:</span>
                <span class="summary-value">{{ $formatCurrency($billing_grand_total ?? 0) }}</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">PPN:</span>
                <span class="summary-value">{{ $formatCurrency($pembayaran_total['besarppn'] ?? 0) }}</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">Tambahan:</span>
                <span class="summary-value">{{ $formatCurrency($total_tambahan ?? 0) }}</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">Potongan:</span>
                <span class="summary-value">{{ $formatCurrency(0) }}</span>
            </div>
            <div class="summary-row total">
                <span class="summary-label">Grand Total:</span>
                <span class="summary-value">{{ $formatCurrency(($billing_grand_total ?? 0) +
                    ($pembayaran_total['besarppn'] ?? 0) +
                    ($total_tambahan ?? 0)) }}</span>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-grid">
                <div class="signature-box">
                    <p style="margin-bottom: 8px;">Pasien / Keluarga</p>
                    <div class="signature-line"></div>
                    <p class="signature-label">Tanda Tangan & Nama Jelas</p>
                </div>
                <div class="signature-box">
                    <p style="margin-bottom: 8px;">Petugas Kasir</p>
                    <div class="signature-line"></div>
                    <p class="signature-label">Tanda Tangan & Nama Jelas</p>
                </div>
            </div>
        </div>
</body>

</html>