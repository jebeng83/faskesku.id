<!DOCTYPE html>
<html>
<head>
    <title>Surat Rujukan FKTP</title>
    <style>
        @page { margin: 20px 30px; }
        body { font-family: Arial, Helvetica, sans-serif; font-size: 10pt; color: #000; }
        table { width: 100%; border-collapse: collapse; }
        td { vertical-align: top; padding: 2px; }
        .header-table td { vertical-align: middle; }
        .title { text-align: center; font-weight: bold; font-size: 12pt; margin: 10px 0; }
        .box { border: 1px solid #000; padding: 5px; margin-bottom: 10px; }
        .small-text { font-size: 9pt; }
        .bold { font-weight: bold; }
        .center { text-align: center; }
        .right { text-align: right; }
        .underline { text-decoration: underline; }
        .checkbox-box { display: inline-block; width: 14px; height: 14px; border: 1px solid #000; text-align: center; line-height: 12px; font-size: 10px; margin-right: 3px; }
        .spacer { height: 10px; }
        .signature-space { height: 60px; }
        .dotted { border-bottom: 1px dotted #000; display: inline-block; width: 100%; height: 14px; }
    </style>
</head>
<body>
    <!-- Header -->
    <table class="header-table" style="margin-bottom: 5px;">
        <tr>
            <td width="30%">
                @if($logoBase64)
                    <img src="{{ $logoBase64 }}" width="200" style="max-height: 60px; object-fit: contain;">
                @else
                    <div style="font-weight: bold; font-size: 14pt; color: #008f4c;">BPJS Kesehatan</div>
                    <div style="font-size: 8pt;">Badan Penyelenggara Jaminan Sosial</div>
                @endif
            </td>
            <td width="10%"></td>
            <td width="60%" align="right">
                <table style="font-size: 9pt; font-weight: bold;">
                    <tr>
                        <td width="120" align="left">Kedeputian Wilayah</td>
                        <td align="left" style="white-space: nowrap;">: {{ strtoupper($kedeputian ?? 'KEDEPUTIAN WILAYAH VII') }}</td>
                    </tr>
                    <tr>
                        <td align="left">Kantor Cabang</td>
                        <td align="left" style="white-space: nowrap;">: {{ strtoupper($kabupaten) }}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <div class="title">Surat Rujukan FKTP</div>

    <!-- Top Box -->
    <div class="box">
        <table>
            <tr>
                <td width="60%">
                    <table style="font-size: 9pt;">
                        <tr>
                            <td width="110">No. Rujukan</td>
                            <td width="10">:</td>
                            <td>{{ $rujukan->noKunjungan ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td>FKTP</td>
                            <td>:</td>
                            <td>{{ $nmDokter }}</td>
                        </tr>
                        <tr>
                            <td>Kabupaten / Kota</td>
                            <td>:</td>
                            <td>{{ strtoupper($kabupaten) }}</td>
                        </tr>
                    </table>
                </td>
                <td width="40%" align="right" valign="middle">
                    <div style="padding-right: 5px;">
                        @if(isset($barcode))
                            <img src="data:image/png;base64,{{ $barcode }}" width="200" height="35" style="object-fit: contain;">
                            <div style="font-size: 8pt; text-align: center; margin-top: 2px;">{{ $rujukan->noKunjungan ?? '-' }}</div>
                        @endif
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <!-- Body Content -->
    <table style="margin-bottom: 15px; font-size: 10pt;">
        <tr>
            <td width="130">Kepada Yth. TS Dokter</td>
            <td width="10">:</td>
            <td class="bold">{{ $rujukan->nmSubSpesialis ?? '-' }}</td>
        </tr>
        <tr>
            <td>Di</td>
            <td>:</td>
            <td class="bold">{{ $rujukan->nmPPK ?? '-' }}</td>
        </tr>
    </table>

    <div style="margin-bottom: 10px;">Mohon pemeriksaan dan penangan lebih lanjut pasien :</div>

    <table style="margin-bottom: 20px;">
        <tr>
            <td width="55%" valign="top">
                <table>
                    <tr>
                        <td width="100">Nama</td>
                        <td width="10">:</td>
                        <td>{{ $pasien->nm_pasien ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td>No. Kartu BPJS</td>
                        <td>:</td>
                        <td>{{ $pendaftaran->noKartu ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td>Diagnosa</td>
                        <td>:</td>
                        <td>{{ $diagnosa }}</td>
                    </tr>
                    <tr>
                        <td>Telah diberikan</td>
                        <td>:</td>
                        <td>{{ $terapi }}</td>
                    </tr>
                </table>
            </td>
            <td width="45%" valign="top">
                <table>
                    <tr>
                        <td width="60">Umur</td>
                        <td width="10">:</td>
                        <td width="30">{{ $umur }}</td>
                        <td width="50">Tahun :</td>
                        <td>{{ $tglLahir }}</td>
                    </tr>
                    <tr>
                        <td>JK</td>
                        <td>:</td>
                        <td colspan="3">
                            {{ $pasien->jk == 'L' ? 'Laki-laki' : ($pasien->jk == 'P' ? 'Perempuan' : '-') }}
                        </td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>:</td>
                        <td colspan="3">
                            Utama / Tanggungan
                        </td>
                    </tr>
                    <tr>
                        <td>Catatan</td>
                        <td>:</td>
                        <td colspan="3">{{ $catatan }}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <!-- Footer of Body -->
    <table style="margin-bottom: 5px;">
        <tr>
            <td width="60%" valign="bottom">
                <div style="margin-bottom: 15px;">Atas bantuannya, diucapkan terima kasih</div>
                <table>
                    <tr>
                        <td width="150">Tgl. Rencana Berkunjung</td>
                        <td width="10">:</td>
                        <td>{{ $tglRencana }}</td>
                    </tr>
                    <tr>
                        <td>Jadwal Praktek</td>
                        <td>:</td>
                        <td>{{ $jadwal }}</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="font-size: 9pt; padding-top: 5px;">
                            Surat rujukan berlaku 1[satu] kali kunjungan, berlaku sampai dengan : {{ $tglBerlaku }}
                        </td>
                    </tr>
                </table>
            </td>
            <td width="40%" align="center" valign="bottom">
                <div style="margin-bottom: 5px;">Salam sejawat, <br>{{ $tglSurat }}</div>
                <div class="signature-space"></div>
                <div class="bold">{{ $nmDokter }}</div>
            </td>
        </tr>
    </table>

    <hr style="border: 0; border-top: 1px solid #000; margin: 5px 0 10px 0;">

    <!-- Surat Rujukan Balik -->
    <div class="title underline" style="margin-bottom: 15px;">SURAT RUJUKAN BALIK</div>

    <div style="margin-bottom: 10px;">
        <div>Teman sejawat Yth.</div>
        <div>Mohon kontrol selanjutnya penderita :</div>
    </div>

    <table style="margin-bottom: 15px;">
        <tr>
            <td width="100">Nama</td>
            <td width="10">:</td>
            <td>{{ $pasien->nm_pasien ?? '-' }}</td>
        </tr>
        <tr>
            <td style="padding-top: 5px;">Diagnosa</td>
            <td style="padding-top: 5px;">:</td>
            <td style="border-bottom: 1px dotted #000;"></td>
        </tr>
        <tr>
            <td style="padding-top: 5px;">Terapi</td>
            <td style="padding-top: 5px;">:</td>
            <td style="border-bottom: 1px dotted #000;"></td>
        </tr>
    </table>

    <div style="margin-bottom: 5px;">Tindak lanjut yang dianjurkan</div>

    <table>
        <tr>
            <td width="55%" valign="top">
                <div style="margin-bottom: 5px;">
                    <span class="checkbox-box"></span> Pengobatan dengan obat- obatan :
                </div>
                <div style="border-bottom: 1px dotted #000; height: 14px; margin-bottom: 8px; margin-left: 20px;"></div>
                <div style="margin-bottom: 8px;">
                    <span class="checkbox-box"></span> Kontrol kembali ke RS tanggal : ..........................
                </div>
                <div style="margin-bottom: 5px;">
                    <span class="checkbox-box"></span> Lain-lain : ...........................................................
                </div>
            </td>
            <td width="45%" valign="top">
                <div style="margin-bottom: 8px;">
                    <span class="checkbox-box"></span> Perlu rawat inap
                </div>
                <div style="margin-bottom: 8px;">
                    <span class="checkbox-box"></span> Konsultasi selesai
                </div>
                <div style="margin-top: 20px; text-align: right;">
                    .......................tgl.......................
                </div>
                <div style="text-align: right; margin-top: 5px; margin-right: 20px;">
                    Dokter RS,
                </div>
                <div class="signature-space"></div>
                <div style="text-align: right; margin-right: 10px;">
                    (.......................................................)
                </div>
            </td>
        </tr>
    </table>

</body>
</html>
