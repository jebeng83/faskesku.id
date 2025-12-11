<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hasil Pemeriksaan Laboratorium - {{ $permintaanLab['noorder'] ?? '-' }}</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 15mm;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #000;
            margin: 0;
            padding: 0;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 3px solid #000;
            padding-bottom: 15px;
        }

        .header h1 {
            margin: 0;
            font-size: 20px;
            font-weight: bold;
        }

        .header p {
            margin: 5px 0;
            font-size: 12px;
        }

        .title {
            text-align: center;
            margin: 20px 0;
            font-size: 16px;
            font-weight: bold;
            text-decoration: underline;
        }

        .info-section {
            display: table;
            width: 100%;
            margin-bottom: 20px;
        }

        .info-left,
        .info-right {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            padding-right: 15px;
        }

        .info-right {
            padding-right: 0;
            padding-left: 15px;
        }

        .info-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
        }

        .info-table {
            width: 100%;
            border-collapse: collapse;
        }

        .info-table td {
            padding: 4px;
            font-size: 11px;
        }

        .info-table td:first-child {
            width: 35%;
            font-weight: bold;
        }

        .info-table td:nth-child(2) {
            width: 5%;
        }

        .info-table td:last-child {
            width: 60%;
        }

        .results-section {
            margin-bottom: 20px;
        }

        .results-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
        }

        .results-table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #000;
        }

        .results-table thead {
            background-color: #f0f0f0;
        }

        .results-table th {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
            font-size: 11px;
            font-weight: bold;
        }

        .results-table th:nth-child(1) {
            width: 5%;
            text-align: center;
        }

        .results-table th:nth-child(2) {
            width: 30%;
        }

        .results-table th:nth-child(3),
        .results-table th:nth-child(4),
        .results-table th:nth-child(5),
        .results-table th:nth-child(6) {
            width: 15%;
            text-align: center;
        }

        .results-table td {
            border: 1px solid #000;
            padding: 6px;
            font-size: 11px;
        }

        .results-table td:first-child,
        .results-table td:nth-child(3),
        .results-table td:nth-child(4),
        .results-table td:nth-child(5),
        .results-table td:nth-child(6) {
            text-align: center;
        }

        .signature-section {
            margin-top: 40px;
            display: table;
            width: 100%;
        }

        .signature-left,
        .signature-right {
            display: table-cell;
            width: 50%;
            text-align: center;
            vertical-align: top;
        }

        .signature-box {
            margin-top: 5px;
            padding-top: 5px;
            border-top: 1px solid #000;
            display: inline-block;
            min-width: 150px;
            font-size: 11px;
            font-weight: bold;
        }

        .footer {
            margin-top: 30px;
            font-size: 9px;
            text-align: center;
            color: #666;
        }
    </style>
</head>

<body>
    <!-- Kop Surat -->
    <div class="header">
        <h1>{{ $setting['nama_instansi'] ?? 'Rumah Sakit' }}</h1>
        @if(!empty($setting['alamat_instansi']))
        <p>{{ $setting['alamat_instansi'] }}</p>
        @endif
        @if(!empty($setting['kabupaten']) || !empty($setting['propinsi']))
        <p>{{ $setting['kabupaten'] ?? '' }} {{ $setting['propinsi'] ?? '' }}</p>
        @endif
        @if(!empty($setting['kontak']) || !empty($setting['email']))
        <p>{{ $setting['kontak'] ?? '' }} @if(!empty($setting['email'])) | {{ $setting['email'] }} @endif</p>
        @endif
    </div>

    <!-- Judul -->
    <div class="title">
        HASIL PEMERIKSAAN LABORATORIUM
    </div>

    <!-- Identitas Pasien dan Data Petugas & Dokter - Side by Side -->
    <div class="info-section">
        <!-- Identitas Pasien - Kiri -->
        <div class="info-left">
            <div class="info-title">IDENTITAS PASIEN</div>
            <table class="info-table">
                <tr>
                    <td>No. Rekam Medis</td>
                    <td>:</td>
                    <td>{{ $permintaanLab['reg_periksa']['patient']['no_rkm_medis'] ?? '-' }}</td>
                </tr>
                <tr>
                    <td>Nama Pasien</td>
                    <td>:</td>
                    <td>{{ $permintaanLab['reg_periksa']['patient']['nm_pasien'] ?? '-' }}</td>
                </tr>
                <tr>
                    <td>Jenis Kelamin</td>
                    <td>:</td>
                    <td>
                        @if(($permintaanLab['reg_periksa']['patient']['jk'] ?? '') === 'L')
                        Laki-laki
                        @elseif(($permintaanLab['reg_periksa']['patient']['jk'] ?? '') === 'P')
                        Perempuan
                        @else
                        -
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>Tanggal Lahir</td>
                    <td>:</td>
                    <td>
                        @if(!empty($permintaanLab['reg_periksa']['patient']['tgl_lahir']) &&
                        $permintaanLab['reg_periksa']['patient']['tgl_lahir'] !== '0000-00-00')
                        @php
                        try {
                        $tglLahir = \Carbon\Carbon::parse($permintaanLab['reg_periksa']['patient']['tgl_lahir']);
                        if ($tglLahir->year > 1900 && $tglLahir->year < 2100) { $tglLahirFormatted=$tglLahir->
                            locale('id')->isoFormat('D MMMM YYYY');
                            } else {
                            $tglLahirFormatted = null;
                            }
                            } catch (\Exception $e) {
                            $tglLahirFormatted = null;
                            }
                            @endphp
                            @if(!empty($tglLahirFormatted))
                            {{ $tglLahirFormatted }}
                            @else
                            -
                            @endif
                            @else
                            -
                            @endif
                    </td>
                </tr>
                <tr>
                    <td>Usia</td>
                    <td>:</td>
                    <td>
                        @if(!empty($permintaanLab['reg_periksa']['patient']['tgl_lahir']))
                        @php
                        $tglLahir = \Carbon\Carbon::parse($permintaanLab['reg_periksa']['patient']['tgl_lahir']);
                        $tglPeriksa = !empty($permintaanLab['tgl_hasil']) && $permintaanLab['tgl_hasil'] !==
                        '0000-00-00'
                        ? \Carbon\Carbon::parse($permintaanLab['tgl_hasil'])
                        : \Carbon\Carbon::now();
                        $usiaTahun = (int) $tglLahir->diffInYears($tglPeriksa, false);
                        $usiaBulan = (int) $tglLahir->copy()->addYears($usiaTahun)->diffInMonths($tglPeriksa, false);
                        @endphp
                        @if($usiaBulan > 0)
                        {{ $usiaTahun }} tahun {{ $usiaBulan }} bulan
                        @else
                        {{ $usiaTahun }} tahun
                        @endif
                        @else
                        -
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>{{ $permintaanLab['reg_periksa']['patient']['alamat'] ?? '-' }}</td>
                </tr>
            </table>
        </div>

        <!-- Data Petugas dan Dokter - Kanan -->
        <div class="info-right">
            <div class="info-title">DATA PETUGAS & DOKTER</div>
            <table class="info-table">
                <tr>
                    <td>No. Order</td>
                    <td>:</td>
                    <td>{{ $permintaanLab['noorder'] ?? '-' }}</td>
                </tr>
                <tr>
                    <td>Tanggal Permintaan</td>
                    <td>:</td>
                    <td>
                        @if(!empty($permintaanLab['tgl_permintaan']))
                        @php
                        try {
                        $tglPermintaan = \Carbon\Carbon::parse($permintaanLab['tgl_permintaan']);
                        if ($tglPermintaan->year > 1900 && $tglPermintaan->year < 2100) {
                            $tglPermintaanFormatted=$tglPermintaan->locale('id')->isoFormat('D MMMM YYYY');
                            } else {
                            $tglPermintaanFormatted = null;
                            }
                            } catch (\Exception $e) {
                            $tglPermintaanFormatted = null;
                            }
                            @endphp
                            @if(!empty($tglPermintaanFormatted))
                            <div>{{ $tglPermintaanFormatted }}</div>
                            @if(!empty($permintaanLab['jam_permintaan']) && $permintaanLab['jam_permintaan'] !==
                            '00:00:00' && $permintaanLab['jam_permintaan'] !== '00:00')
                            <div style="font-size: 10px; color: #666; margin-top: 2px;">pukul {{
                                substr($permintaanLab['jam_permintaan'], 0, 5) }}</div>
                            @endif
                            @else
                            -
                            @endif
                            @else
                            -
                            @endif
                    </td>
                </tr>
                <tr>
                    <td>Tanggal Sampel</td>
                    <td>:</td>
                    <td>
                        @if(!empty($permintaanLab['tgl_sampel']) && $permintaanLab['tgl_sampel'] !== '0000-00-00')
                        @php
                        try {
                        $tglSampel = \Carbon\Carbon::parse($permintaanLab['tgl_sampel']);
                        if ($tglSampel->year > 1900 && $tglSampel->year < 2100) { $tglSampelFormatted=$tglSampel->
                            locale('id')->isoFormat('D MMMM YYYY');
                            } else {
                            $tglSampelFormatted = null;
                            }
                            } catch (\Exception $e) {
                            $tglSampelFormatted = null;
                            }
                            @endphp
                            @if(!empty($tglSampelFormatted))
                            <div>{{ $tglSampelFormatted }}</div>
                            @if(!empty($permintaanLab['jam_sampel']) && $permintaanLab['jam_sampel'] !== '00:00:00' &&
                            $permintaanLab['jam_sampel'] !== '00:00')
                            <div style="font-size: 10px; color: #666; margin-top: 2px;">pukul {{
                                substr($permintaanLab['jam_sampel'], 0, 5) }}</div>
                            @endif
                            @else
                            -
                            @endif
                            @else
                            -
                            @endif
                    </td>
                </tr>
                <tr>
                    <td>Tanggal Hasil</td>
                    <td>:</td>
                    <td>
                        @if(!empty($permintaanLab['tgl_hasil']) && $permintaanLab['tgl_hasil'] !== '0000-00-00')
                        @php
                        try {
                        $tglHasil = \Carbon\Carbon::parse($permintaanLab['tgl_hasil']);
                        if ($tglHasil->year > 1900 && $tglHasil->year < 2100) { $tglHasilFormatted=$tglHasil->
                            locale('id')->isoFormat('D MMMM YYYY');
                            } else {
                            $tglHasilFormatted = null;
                            }
                            } catch (\Exception $e) {
                            $tglHasilFormatted = null;
                            }
                            @endphp
                            @if(!empty($tglHasilFormatted))
                            <div>{{ $tglHasilFormatted }}</div>
                            @if(!empty($permintaanLab['jam_hasil']) && $permintaanLab['jam_hasil'] !== '00:00:00' &&
                            $permintaanLab['jam_hasil'] !== '00:00')
                            <div style="font-size: 10px; color: #666; margin-top: 2px;">pukul {{
                                substr($permintaanLab['jam_hasil'], 0, 5) }}</div>
                            @endif
                            @else
                            -
                            @endif
                            @else
                            -
                            @endif
                    </td>
                </tr>
                <tr>
                    <td>Dokter Perujuk</td>
                    <td>:</td>
                    <td>{{ $permintaanLab['dokter']['nm_dokter'] ?? $permintaanLab['dokter_perujuk'] ?? '-' }}</td>
                </tr>
                @if(!empty($periksaLab['petugas']['nama']))
                <tr>
                    <td>Petugas Lab</td>
                    <td>:</td>
                    <td>{{ $periksaLab['petugas']['nama'] }}</td>
                </tr>
                @endif
                @if(!empty($periksaLab['dokterPj']['nm_dokter']))
                <tr>
                    <td>Dokter Penanggung Jawab</td>
                    <td>:</td>
                    <td>{{ $periksaLab['dokterPj']['nm_dokter'] }}</td>
                </tr>
                @endif
            </table>
        </div>
    </div>

    <!-- Hasil Pemeriksaan -->
    <div class="results-section">
        <div class="results-title">HASIL PEMERIKSAAN</div>
        <table class="results-table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Pemeriksaan</th>
                    <th>Hasil</th>
                    <th>Satuan</th>
                    <th>Nilai Rujukan</th>
                    <th>Keterangan</th>
                </tr>
            </thead>
            <tbody>
                @if(count($hasilPemeriksaan) > 0)
                @foreach($hasilPemeriksaan as $index => $item)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $item['nama_pemeriksaan'] ?? '-' }}</td>
                    <td>{{ $item['hasil'] ?? '-' }}</td>
                    <td>{{ $item['satuan'] ?? '-' }}</td>
                    <td>{{ $item['nilai_rujukan'] ?? '-' }}</td>
                    <td
                        style="font-weight: {{ in_array($item['keterangan'] ?? '', ['K', 'Kritis']) ? 'bold' : 'normal' }}">
                        @php
                        $keteranganMap = [
                        'N' => 'Normal',
                        'L' => 'Rendah',
                        'H' => 'Tinggi',
                        'K' => 'Kritis',
                        ];
                        $keterangan = $item['keterangan'] ?? '-';
                        $keteranganDisplay = $keteranganMap[$keterangan] ?? $keterangan;
                        @endphp
                        {{ $keteranganDisplay }}
                    </td>
                </tr>
                @endforeach
                @else
                <tr>
                    <td colspan="6" style="text-align: center; padding: 15px;">
                        Tidak ada data hasil pemeriksaan
                    </td>
                </tr>
                @endif
            </tbody>
        </table>
    </div>

    <!-- Tanda Tangan -->
    <div class="signature-section">
        <div class="signature-left">
            <p style="margin-bottom: 10px; font-size: 11px;">Petugas Lab</p>
            <!-- QR Code Petugas Lab -->
            <div style="text-align: center; margin-bottom: 10px;">
                <div style="display: inline-block; padding: 5px; background-color: #fff; border: 1px solid #000;">
                    {!! $qrCodePetugasSvg ?? '' !!}
                </div>
            </div>
            <div class="signature-box">
                {{ $periksaLab['petugas']['nama'] ?? '________________' }}
            </div>
        </div>
        <div class="signature-right">
            <p style="margin-bottom: 10px; font-size: 11px;">Dokter Penanggung Jawab</p>
            <!-- QR Code Dokter Penanggung Jawab -->
            <div style="text-align: center; margin-bottom: 5px;">
                <div style="display: inline-block; padding: 5px; background-color: #fff; border: 1px solid #000;">
                    {!! $qrCodeDokterSvg ?? '' !!}
                </div>
            </div>
            <div class="signature-box">
                {{ $periksaLab['dokterPj']['nm_dokter'] ?? $permintaanLab['dokter']['nm_dokter'] ?? '________________'
                }}
            </div>
        </div>
    </div>

    <!-- Catatan Kaki -->
    <div class="footer">
        <p>Dokumen ini dicetak secara elektronik dan tidak memerlukan tanda tangan basah</p>
        <p>Tanggal Cetak: {{ \Carbon\Carbon::now()->locale('id')->isoFormat('D MMMM YYYY, HH:mm') }}</p>
    </div>
</body>

</html>