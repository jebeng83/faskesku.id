<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @page { size: A4; margin: 28mm 28mm 25mm 28mm; }
        body { font-family: Arial, sans-serif; font-size: 12px; color: #000; background: #fff; padding: 0 3mm; }
        .header { margin-bottom: 4px; padding-top: 8mm; padding-bottom: 6mm; }
        .kop { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
        .kop-main { width: 100%; margin: 0 auto; }
        .kop-main table { width: 100%; border-collapse: collapse; margin: 0 auto; }
        .kop-main tr { line-height: 1; }
        .kop-main td { vertical-align: top; padding: 0; }
        .kop-logo-cell { width: 60px; padding-right: 12px; padding-top: 0; vertical-align: top; }
        .kop-content-cell { text-align: center; padding: 0; }
        .kop-logo { width: 60px; height: 60px; object-fit: contain; display: block; }
        .kop-title { font-size: 18px; font-weight: 800; text-transform: uppercase; line-height: 1.1; margin: 0; letter-spacing: 0.1px; }
        .kop-alamat { font-size: 14px; line-height: 1; margin: 4px 0 0 0; padding: 0; }
        .kop-kontak { font-size: 14px; line-height: 1; margin: 0; padding: 0; }
        .divider { border-top: 1px solid #000; margin: 4px 0 6px; }
        .title { text-align: center; font-size: 16px; font-weight: bold; text-transform: uppercase; margin-bottom: 6px; text-decoration: underline; }
        .subtitle { text-align: center; font-size: 11px; color: #333; margin-bottom: 10px; }
        .container { padding: 4mm 0; }
        .dl { display: table; width: 100%; margin: 8px 0 12px; border-collapse: separate; border-spacing: 0; }
        .dl-row { display: table-row; }
        .dl-label-wrapper { display: table-cell; width: 200px; vertical-align: baseline; padding-right: 8px; }
        .dl-label-text { color: #444; font-size: 12px; white-space: nowrap; }
        .dl-colon { display: table-cell; padding: 0 8px 0 0; font-size: 12px; vertical-align: baseline; white-space: nowrap; width: 1%; }
        .dl-value { display: table-cell; font-weight: bold; font-size: 12px; vertical-align: baseline; }
        .section { margin: 14px 0; font-size: 12px; }
        .section div { font-size: 12px; }
        .sign { margin-top: 36px; }
        .sign-box { width: 100%; text-align: right; }
        .sign-date { text-align: right; margin-bottom: 8px; font-size: 12px; }
        .sign-title { text-align: right; font-size: 12px; margin: 8px 0; }
        .sign-qr { text-align: right; margin: 12px 0 8px 0; display: flex; justify-content: flex-end; }
        .sign-qr svg { width: 112px; height: 112px; }
        .sign-name { text-align: right; margin-top: 16px; font-weight: bold; font-size: 12px; }
    </style>
    </head>
<body>
    <div class="header">
        <div class="kop">
            @if($setting)
                <div class="kop-main">
                    <table>
                        <tr>
                            @if(isset($logo_base64) && $logo_base64)
                                <td class="kop-logo-cell" rowspan="3">
                                    <img src="{{ $logo_base64 }}" alt="Logo" class="kop-logo" />
                                </td>
                            @endif
                            <td class="kop-content-cell">
                                <h1 class="kop-title">{{ $setting->nama_instansi ?? '' }}</h1>
                            </td>
                        </tr>
                        <tr>
                            <td class="kop-content-cell">
                                <p class="kop-alamat">{{ trim(($setting->alamat_instansi ?? '')) }}{{ ($setting->kabupaten ?? '') ? ', '.$setting->kabupaten : '' }}{{ ($setting->propinsi ?? '') ? ', '.$setting->propinsi : '' }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="kop-content-cell">
                                <p class="kop-kontak">{{ ($setting->email ? 'E-mail : '.$setting->email : '') }}{{ ($setting->kontak ? ' • Telp : '.$setting->kontak : '') }}</p>
                            </td>
                        </tr>
                    </table>
                </div>
            @endif
        </div>
    </div>
    <div class="divider"></div>

    <div class="container">
        @if($type === 'SKS')
            <div class="title">Surat Keterangan</div>
            @if(isset($sks['nomor']) && $sks['nomor'])
                <div class="subtitle">Nomor : {{ $sks['nomor'] }}</div>
            @endif
        @else
            <div class="title">{{ $title }}</div>
            @if(($type === 'SKS') && isset($sks['nomor']) && $sks['nomor'])
                <div class="subtitle">Nomor : {{ $sks['nomor'] }}</div>
            @endif
        @endif

        @php
            $dok = isset($sks['dokter']) ? trim($sks['dokter']) : '';
            if ($dok !== '' && !preg_match('/^dr\.?\s/i', $dok)) { $dok = 'dr. '.$dok; }
            $instansiLabel = isset($sks['instansi']) ? trim($sks['instansi']) : '';
            $tglLahirView = (function($v) {
                $v = trim((string) $v);
                if ($v === '') return '';
                if (preg_match('/^\d{4}-\d{2}-\d{2}/', $v)) {
                    try { $dt = DateTime::createFromFormat('!Y-m-d', substr($v, 0, 10)); return $dt ? $dt->format('d-m-Y') : substr($v, 0, 10); } catch (\Throwable $e) { return substr($v, 0, 10); }
                }
                if (preg_match('/^\d{2}\/\d{2}\/\d{4}/', $v)) {
                    try { $dt = DateTime::createFromFormat('!d/m/Y', substr($v, 0, 10)); return $dt ? $dt->format('d-m-Y') : substr($v, 0, 10); } catch (\Throwable $e) { return substr($v, 0, 10); }
                }
                if (preg_match('/^\d{2}-\d{2}-\d{4}/', $v)) {
                    try { $dt = DateTime::createFromFormat('!d-m-Y', substr($v, 0, 10)); return $dt ? $dt->format('d-m-Y') : substr($v, 0, 10); } catch (\Throwable $e) { return substr($v, 0, 10); }
                }
                $s10 = preg_replace('/^(.{10}).*/', '$1', $v);
                try { $dt = new DateTime($s10); return $dt->format('d-m-Y'); } catch (\Throwable $e) { return $v; }
            })($pasien['tgl_lahir'] ?? ($pasien['tgl_lahir_fmt'] ?? ''));
        @endphp
        <div class="section" style="margin-top:2px;">
            <div style="margin: 2px 0;">Yang bertanda tangan dibawah ini {{ $dok !== '' ? $dok : '______________________________' }}</div>
            <div style="margin: 2px 0;">Dokter pada {{ $instansiLabel !== '' ? $instansiLabel : ($setting->nama_instansi ?? '') }}, menerangkan bahwa :</div>
        </div>

        <div class="dl">
            <div class="dl-row">
                <div class="dl-label-wrapper">
                    <span class="dl-label-text">Nama Pasien</span>
                </div>
                <div class="dl-colon">:</div>
                <div class="dl-value">{{ $pasien['nama'] }}</div>
            </div>
            <div class="dl-row">
                <div class="dl-label-wrapper">
                    <span class="dl-label-text">Tanggal Lahir</span>
                </div>
                <div class="dl-colon">:</div>
                <div class="dl-value">{{ $tglLahirView }}</div>
            </div>
            <div class="dl-row">
                <div class="dl-label-wrapper">
                    <span class="dl-label-text">Jenis Kelamin</span>
                </div>
                <div class="dl-colon">:</div>
                <div class="dl-value">{{ strtoupper($pasien['jk']) === 'L' ? 'Laki-Laki' : (strtoupper($pasien['jk']) === 'P' ? 'Perempuan' : ($pasien['jk'] ?? '-')) }}</div>
            </div>
            <div class="dl-row">
                <div class="dl-label-wrapper">
                    <span class="dl-label-text">Pekerjaan</span>
                </div>
                <div class="dl-colon">:</div>
                <div class="dl-value">{{ $pasien['pekerjaan'] ?? '-' }}</div>
            </div>
            <div class="dl-row">
                <div class="dl-label-wrapper">
                    <span class="dl-label-text">Alamat</span>
                </div>
                <div class="dl-colon">:</div>
                <div class="dl-value">{{ $pasien['alamat'] ?? '-' }}</div>
            </div>
        </div>

        @if($type === 'SKS')
            @php
                // Fungsi terbilang untuk mengkonversi angka ke kata-kata bahasa Indonesia
                $terbilang = function($n) {
                    $n = max(0, floor($n));
                    $s = ["nol","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas"];
                    $f = function($x) use (&$f, $s) {
                        if ($x < 12) return $s[$x];
                        if ($x < 20) return $f($x - 10) . " belas";
                        if ($x < 100) {
                            $puluh = floor($x / 10);
                            $satu = $x % 10;
                            return $f($puluh) . " puluh" . ($satu ? " " . $f($satu) : "");
                        }
                        if ($x < 200) return "seratus" . ($x > 100 ? " " . $f($x - 100) : "");
                        if ($x < 1000) {
                            $ratus = floor($x / 100);
                            $sisa = $x % 100;
                            return $f($ratus) . " ratus" . ($sisa ? " " . $f($sisa) : "");
                        }
                        return (string)$x;
                    };
                    $t = $f($n);
                    return ucfirst($t);
                };
                $hariTerbilang = isset($sks['hari']) ? $terbilang($sks['hari']) : '';
            @endphp
            <div class="section">
                <div>
                    Dalam keadaan sakit memerlukan istirahat
                    @if(isset($is_preview) && $is_preview)
                        <input min="1" class="font-semibold ml-1 mr-1 inline-block w-14 text-center border-b border-dashed bg-transparent focus:outline-none" type="number" value="{{ $sks['hari'] ?? '' }}">
                    @else
                        <span style="display:inline-block; min-width:28px; border-bottom:1px dashed #999; text-align:center; font-weight:bold;">
                            {{ $sks['hari'] ?? '' }}
                        </span>
                    @endif
                    ( {{ $hariTerbilang }} ) Hari
                    terhitung mulai tanggal {{ $sks['mulai_fmt'] ?? '' }} s/d {{ $sks['akhir_fmt'] ?? '' }}
                </div>
                <div style="margin-top:8px;">
                    Demikian surat keterangan ini dibuat untuk dapat digunakan sebagaimana mestinya.
                </div>
            </div>
        @elseif($type === 'RUJUKAN')
            <div class="section">
                <div>Mohon pemeriksaan dan penanganan lebih lanjut.</div>
            </div>
        @elseif($type === 'RAWAT_INAP')
            <div class="section">
                <div>Telah menjalani perawatan inap pada tanggal <span style="display:inline-block;border-bottom:1px dashed #999;width:140px"></span> s/d <span style="display:inline-block;border-bottom:1px dashed #999;width:140px"></span>.</div>
            </div>
        @elseif($type === 'SKSEHAT')
            <div class="section">
                <div>Yang bersangkutan dinyatakan dalam kondisi sehat berdasarkan pemeriksaan.</div>
            </div>
        @elseif($type === 'BEROBAT')
            <div class="section">
                <div>Yang bersangkutan sedang menjalani pengobatan pada tanggal tersebut.</div>
            </div>
        @endif

    </div>

    @if($type === 'SKS')
        <div class="sign">
            <div class="sign-box">
                <div class="sign-date">{{ ($setting->kabupaten ?? '') ? ($setting->kabupaten . ', ') : '' }}{{ $tanggal_fmt ?? '' }}</div>
                <div class="sign-title">Dokter Pemeriksa</div>
                <div class="sign-qr">
                    @if(isset($qr_code) && $qr_code)
                        <img src="{{ $qr_code }}" alt="QR Code" style="width:112px;height:112px;object-fit:contain;" />
                    @elseif(isset($qr_svg) && $qr_svg)
                        {!! $qr_svg !!}
                    @else
                        <div style="width:112px;height:112px;border:1px solid #ddd;display:inline-block;text-align:center;line-height:112px;color:#999;font-size:10px;">QR Code</div>
                    @endif
                </div>
                <div class="sign-name">( {{ ($type === 'SKS' && isset($sks['dokter']) && $sks['dokter']) ? $sks['dokter'] : '______________________________' }} )</div>
            </div>
        </div>
    @else
        <div class="sign">
            <div class="sign-box">
                <div class="sign-date">{{ ($setting->kabupaten ?? '') ? ($setting->kabupaten . ', ') : '' }}{{ $tanggal_fmt ?? '' }}</div>
                <div style="height:72px"></div>
                <div style="font-weight: bold;">{{ ($type === 'SKS' && isset($sks['dokter']) && $sks['dokter']) ? $sks['dokter'] : '______________________________' }}</div>
                @if($type === 'SKS' && isset($sks['instansi']) && $sks['instansi'])
                    <div style="font-size:11px; color:#444;">{{ $sks['instansi'] }}</div>
                @endif
            </div>
        </div>
    @endif
    </div>
</body>
</html>
