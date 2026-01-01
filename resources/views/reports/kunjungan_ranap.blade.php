<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Kunjungan Rawat Inap</title>
    <style>
        @page { size: A4 landscape; margin: 8mm; }
        body { font-family: Tahoma, Arial, sans-serif; font-size: 8px; color: #111827; line-height: 1.15; }
        .header { text-align: center; margin-bottom: 6px; }
        .header .title { font-size: 12px; font-weight: bold; }
        .header .subtitle { font-size: 10px; margin-top: 1px; }
        .info { text-align: center; font-size: 8px; color: #6b7280; }
        .summary { margin: 6px 0; }
        .summary table { width: 100%; border-collapse: collapse; }
        .summary td { padding: 2px 4px; }
        .table { width: 100%; border-collapse: collapse; table-layout: fixed; }
        .table th, .table td { border: 1px solid #e5e7eb; padding: 2px 3px; }
        .table th { background: #f3f4f6; font-weight: bold; text-transform: uppercase; font-size: 8px; }
        .table td { font-size: 8px; }
        .nowrap { white-space: nowrap; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .small { font-size: 8px; }
        .w-nowrap { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">LAPORAN KUNJUNGAN RAWAT INAP</div>
        <table style="width:85%; margin:6px auto; border-collapse:collapse;">
            <tr>
                <td style="width:50%; vertical-align:top; text-align:left; font-size:8px;">
                    <table style="width:100%; border-collapse:collapse;">
                        <tr><td style="width:28%;">Kabupaten</td><td>: {{ $setting['kabupaten'] ?? '-' }}</td></tr>
                        <tr><td>Rumah Sakit</td><td>: {{ $setting['nama_instansi'] ?? '-' }}</td></tr>
                        <tr><td>Tanggal</td><td>: {{ $periode }}</td></tr>
                    </table>
                </td>
                <td style="width:50%; vertical-align:top; text-align:right; font-size:8px;">
                    <table style="float:right; border-collapse:collapse;">
                        <tr>
                            <td style="padding-right:12px;">Laki-Laki : <strong>{{ number_format($summary['laki'] ?? 0) }}</strong></td>
                            <td>Total Kunjungan : <strong>{{ number_format($summary['total'] ?? 0) }}</strong></td>
                        </tr>
                        <tr>
                            <td style="padding-right:12px;">Perempuan : <strong>{{ number_format($summary['perempuan'] ?? 0) }}</strong></td>
                            <td></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>

    <div class="summary">
        <!-- spacer kecil -->
    </div>

    <table class="table">
        <thead>
            <tr>
                <th class="nowrap" style="width: 3%">No</th>
                <th class="nowrap" style="width: 6%">No. RM</th>
                <th class="nowrap" style="width: 10%">Bangsal</th>
                <th class="nowrap" style="width: 15%">Pasien</th>
                <th class="nowrap" style="width: 5%">Umur</th>
                <th class="nowrap" style="width: 3%">L/P</th>
                <th class="nowrap" style="width: 18%">Alamat</th>
                <th class="nowrap" style="width: 5%">Kode</th>
                <th class="nowrap" style="width: 17%">Diagnosa</th>
                <th class="nowrap" style="width: 18%">Dokter Jaga</th>
            </tr>
        </thead>
        <tbody>
            @php $i = 1; @endphp
            @foreach ($rows as $r)
                <tr>
                    <td class="text-center w-nowrap">{{ $i++ }}</td>
                    <td class="text-center nowrap">{{ $r->no_rkm_medis }}</td>
                    <td class="w-nowrap" title="{{ $r->nm_bangsal }}">{{ $r->nm_bangsal }}</td>
                    <td class="nowrap">{{ $r->nm_pasien }}</td>
                    <td class="text-center nowrap">{{ $r->umur }}</td>
                    <td class="text-center nowrap">{{ $r->jk }}</td>
                    @php
                        $addr = (string) ($r->alamat ?? '');
                        $addrShort = function_exists('mb_strimwidth') ? mb_strimwidth($addr, 0, 70, '…', 'UTF-8') : substr($addr, 0, 70);
                        $diag = (string) ($r->nm_penyakit ?? '-');
                        $diagShort = function_exists('mb_strimwidth') ? mb_strimwidth($diag, 0, 60, '…', 'UTF-8') : substr($diag, 0, 60);
                        $bangsal = (string) ($r->nm_bangsal ?? '-');
                        $bangsalShort = function_exists('mb_strimwidth') ? mb_strimwidth($bangsal, 0, 30, '…', 'UTF-8') : substr($bangsal, 0, 30);
                    @endphp
                    <td class="w-nowrap" title="{{ $addr }}">{{ $addrShort }}</td>
                    <td class="nowrap">{{ $r->kd_penyakit ?? '-' }}</td>
                    <td class="w-nowrap" title="{{ $diag }}">{{ $diagShort }}</td>
                    <td class="nowrap">{{ $r->nm_dokter }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
