<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Frekuensi Penyakit Rawat Jalan</title>
    <style>
        @page { size: A4 portrait; margin: 8mm; }
        body { font-family: Tahoma, Arial, sans-serif; font-size: 10px; color: #111827; line-height: 1.15; }
        .header { text-align: center; margin-bottom: 12px; }
        .header .title { font-size: 14px; font-weight: bold; }
        .header .subtitle { font-size: 10px; margin-top: 2px; }
        .info { text-align: center; font-size: 10px; color: #6b7280; }
        .summary { margin: 10px 0; }
        .summary table { width: 100%; border-collapse: collapse; }
        .summary td { padding: 2px 4px; }
        .table { width: 100%; border-collapse: collapse; table-layout: fixed; }
        .table th, .table td { border: 1px solid #000; padding: 4px 6px; }
        .table th { background: #f3f4f6; font-weight: bold; text-transform: uppercase; font-size: 10px; text-align: center; }
        .table td { font-size: 10px; }
        .nowrap { white-space: nowrap; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .w-nowrap { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">LAPORAN FREKUENSI PENYAKIT RAWAT JALAN</div>
        <div class="subtitle">Periode: {{ $periode }}</div>
        <div class="subtitle">{{ $setting['nama_instansi'] ?? 'Faskesku.id' }}</div>
    </div>

    @if(!empty($filters))
        <div class="summary">
            <table style="width: 50%; margin: 0 auto; font-size: 9px;">
                @foreach($filters as $label => $value)
                    <tr>
                        <td style="width: 30%; text-align: right; padding-right: 5px; font-weight: bold;">{{ $label }}</td>
                        <td style="width: 5%;">:</td>
                        <td style="width: 65%; text-align: left;">{{ $value }}</td>
                    </tr>
                @endforeach
            </table>
        </div>
    @endif

    <table class="table">
        <thead>
            <tr>
                <th style="width: 5%">No</th>
                <th style="width: 15%">Kode Penyakit</th>
                <th style="width: 55%">Nama Penyakit</th>
                <th style="width: 10%">Jumlah</th>
                <th style="width: 15%">Persentase</th>
            </tr>
        </thead>
        <tbody>
            @php $i = 1; @endphp
            @foreach ($rows as $row)
                <tr>
                    <td class="text-center">{{ $i++ }}</td>
                    <td class="text-center">{{ $row['kd_penyakit'] }}</td>
                    <td>{{ $row['penyakit'] }}</td>
                    <td class="text-center">{{ number_format($row['jumlah'], 0, ',', '.') }}</td>
                    <td class="text-center">{{ $row['persentase'] }}%</td>
                </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr style="font-weight: bold; background-color: #f9fafb;">
                <td colspan="3" class="text-right">Total</td>
                <td class="text-center">{{ number_format($total, 0, ',', '.') }}</td>
                <td class="text-center">100%</td>
            </tr>
        </tfoot>
    </table>
</body>
</html>
