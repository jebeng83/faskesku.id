<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class SuratController extends Controller
{
    public function pdf(Request $request)
    {
        $type = (string) $request->input('type', 'SKS');
        $tanggal = (string) $request->input('tanggal', date('Y-m-d'));
        $pasien = (array) $request->input('pasien', []);
        $noRawat = (string) $request->input('no_rawat', '');
        $nomorSurat = (string) $request->input('nomor', '');

        $allowed = [
            'SKS',
            'RUJUKAN',
            'RAWAT_INAP',
            'SKSEHAT',
            'BEROBAT',
        ];
        if (! in_array($type, $allowed, true)) {
            return response()->json(['message' => 'Jenis surat tidak dikenali'], 422);
        }

        $setting = null;
        $logoBase64 = null;
        if (DB::getSchemaBuilder()->hasTable('setting')) {
            $setting = DB::table('setting')->where('aktifkan', 'Yes')->first() ?: DB::table('setting')->first();
            if ($setting && isset($setting->logo) && ! empty($setting->logo)) {
                $blob = $setting->logo;
                $mime = 'image/png';
                $bytes = substr($blob, 0, 12);
                if (substr($bytes, 0, 2) === "\xFF\xD8") {
                    $mime = 'image/jpeg';
                } elseif (substr($bytes, 0, 4) === "\x89PNG") {
                    $mime = 'image/png';
                } elseif (substr($bytes, 0, 6) === 'GIF87a' || substr($bytes, 0, 6) === 'GIF89a') {
                    $mime = 'image/gif';
                }
                $logoBase64 = 'data:'.$mime.';base64,'.base64_encode($blob);
            }
        }

        $titleMap = [
            'SKS' => 'Surat Keterangan Sakit',
            'RUJUKAN' => 'Surat Rujukan',
            'RAWAT_INAP' => 'Surat Keterangan Rawat Inap',
            'SKSEHAT' => 'Surat Keterangan Sehat',
            'BEROBAT' => 'Surat Keterangan Berobat',
        ];

        $normalize = function ($v) {
            $v = (string) $v;
            if ($v === '') return $v;
            try {
                return Carbon::createFromFormat('d/m/Y', $v)->format('Y-m-d');
            } catch (\Throwable $e) {}
            try {
                return Carbon::parse($v)->format('Y-m-d');
            } catch (\Throwable $e) {}
            return $v;
        };

        $tanggal = $normalize($tanggal);
        $fmt = function ($v) {
            try { return $v ? Carbon::parse($v)->format('d/m/Y') : ''; } catch (\Throwable $e) { return (string) $v; }
        };
        $fmtDash = function ($v) {
            try { return $v ? Carbon::parse($v)->format('d-m-Y') : ''; } catch (\Throwable $e) { return (string) $v; }
        };
        $maskNama = function ($name) {
            $name = trim((string) $name);
            if ($name === '') return '-';
            $parts = preg_split('/\s+/', $name);
            $out = [];
            if (count($parts) > 0) {
                $first = $parts[0];
                $keep = mb_substr($first, 0, 2);
                $maskLen = max(0, mb_strlen($first) - mb_strlen($keep));
                $out[] = $keep . str_repeat('*', $maskLen);
                for ($i = 1; $i < count($parts); $i++) {
                    $out[] = str_repeat('*', mb_strlen($parts[$i]));
                }
            }
            return implode(' ', $out);
        };
        $terbilangNum = function($n) {
            $n = max(0, (int) $n);
            $s = ["nol","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas"];
            $f = function($x) use (&$f, $s) {
                if ($x < 12) return $s[$x];
                if ($x < 20) return $f($x - 10) . " belas";
                if ($x < 100) { $puluh = (int) floor($x / 10); $satu = $x % 10; return $f($puluh) . " puluh" . ($satu ? " " . $f($satu) : ""); }
                if ($x < 200) return "seratus" . ($x > 100 ? " " . $f($x - 100) : "");
                if ($x < 1000) { $ratus = (int) floor($x / 100); $sisa = $x % 100; return $f($ratus) . " ratus" . ($sisa ? " " . $f($sisa) : ""); }
                return (string) $x;
            };
            return ucfirst($f($n));
        };
        $terbilangNum = function($n) {
            $n = max(0, (int) $n);
            $s = ["nol","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas"];
            $f = function($x) use (&$f, $s) {
                if ($x < 12) return $s[$x];
                if ($x < 20) return $f($x - 10) . " belas";
                if ($x < 100) { $puluh = (int) floor($x / 10); $satu = $x % 10; return $f($puluh) . " puluh" . ($satu ? " " . $f($satu) : ""); }
                if ($x < 200) return "seratus" . ($x > 100 ? " " . $f($x - 100) : "");
                if ($x < 1000) { $ratus = (int) floor($x / 100); $sisa = $x % 100; return $f($ratus) . " ratus" . ($sisa ? " " . $f($sisa) : ""); }
                return (string) $x;
            };
            return ucfirst($f($n));
        };
        $tanggalFmt = $fmt($tanggal);

        $sks = null;
        if ($type === 'SKS') {
            $instansi = null;
            if (DB::getSchemaBuilder()->hasTable('setting')) {
                $row = DB::table('setting')->where('aktifkan', 'Yes')->first() ?: DB::table('setting')->first();
                $instansi = $row->nama_instansi ?? null;
            }

            $dokter = '';
            $mulai = $normalize($request->input('mulai', ''));
            $akhir = $normalize($request->input('akhir', ''));
            $hari = $request->input('hari');

            if ($noRawat !== '') {
                $reg = DB::table('reg_periksa')->where('no_rawat', $noRawat)->first();
                if ($reg) {
                    $dokter = (string) (DB::table('dokter')->where('kd_dokter', $reg->kd_dokter)->value('nm_dokter') ?: '');
                    if ($mulai === '') { $mulai = (string) ($reg->tgl_registrasi ?? ''); }
                    if ($akhir === '') { $akhir = (string) ($reg->tgl_registrasi ?? ''); }
                    if (DB::getSchemaBuilder()->hasTable('suratsakitpihak2')) {
                        $srQ = DB::table('suratsakitpihak2')->where('no_rawat', $noRawat);
                        if (Schema::hasColumn('suratsakitpihak2', 'created_at')) {
                            $srQ = $srQ->orderByDesc('created_at');
                        } elseif (Schema::hasColumn('suratsakitpihak2', 'tanggalakhir')) {
                            $srQ = $srQ->orderByDesc('tanggalakhir');
                        } elseif (Schema::hasColumn('suratsakitpihak2', 'tanggalawal')) {
                            $srQ = $srQ->orderByDesc('tanggalawal');
                        } elseif (Schema::hasColumn('suratsakitpihak2', 'no_surat')) {
                            $srQ = $srQ->orderByDesc('no_surat');
                        }
                        $sr = $srQ->first();
                        if ($sr) {
                            $nomorSurat = $nomorSurat ?: (string) ($sr->no_surat ?? '');
                            $mulai = (string) ($sr->tanggalawal ?? $mulai);
                            $akhir = (string) ($sr->tanggalakhir ?? $akhir);
                            $hari = $hari ?? ($sr->lamasakit ?? null);
                        }
                    }
                }
            }

            try {
                $mx = $normalize($mulai);
                $ax = $normalize($akhir);
                if ($mx && $ax && ! $hari) {
                    $hari = Carbon::parse($mx)->diffInDays(Carbon::parse($ax)) + 1;
                }
            } catch (\Throwable $e) {}

            $mulaiN = $normalize($mulai);
            $akhirN = $normalize($akhir);
            $sks = [
                'nomor' => $nomorSurat,
                'instansi' => (string) ($request->input('instansi', $instansi ?? '') ?? ''),
                'dokter' => (string) ($request->input('dokter', $dokter) ?? ''),
                'mulai' => $mulaiN,
                'akhir' => $akhirN,
                'mulai_fmt' => $fmtDash($mulaiN),
                'akhir_fmt' => $fmtDash($akhirN),
                'hari' => $hari,
            ];
        }

        $tglLahirRaw = (string) ($pasien['tglLahir'] ?? $pasien['tgl_lahir'] ?? '');
        $tglLahirFmt = $fmtDash($normalize($tglLahirRaw));

        $noRawat = (string) $request->input('no_rawat', '');
        $nomorSuratParam = (string) $request->input('nomor', '');
        $qrCodeBase64 = null;
        $qrSvg = null;
        $qrSvg = null;
        try {
            if (Schema::hasTable('validasi_ttd')) {
                $vrow = null;
                $labelCandidates = (function($t) {
                    $map = [
                        'SKS' => ['SKS', 'Surat Sakit', 'SURAT SAKIT', 'Sakit'],
                        'RUJUKAN' => ['RUJUKAN', 'Surat Rujukan', 'SURAT RUJUKAN'],
                        'RAWAT_INAP' => ['RAWAT_INAP', 'Rawat Inap', 'RAWAT INAP'],
                        'SKSEHAT' => ['SKSEHAT', 'Surat Keterangan Sehat', 'SEHAT'],
                        'BEROBAT' => ['BEROBAT', 'Surat Keterangan Berobat', 'Surat Berobat'],
                    ];
                    $c = $map[$t] ?? [$t];
                    return array_values(array_unique(array_map('strval', $c)));
                })($type);
                $nomorSurat = (string) (($sks['nomor'] ?? null) ?: $nomorSuratParam);
                if ($nomorSurat !== '') {
                    $q1 = DB::table('validasi_ttd')->where('no_surat', $nomorSurat);
                    if (Schema::hasColumn('validasi_ttd','updated_at')) { $q1->orderByDesc('updated_at'); }
                    if (Schema::hasColumn('validasi_ttd','verified_at')) { $q1->orderByDesc('verified_at'); }
                    $vrow = $q1->first();
                }
                if (! $vrow && $noRawat !== '') {
                    $q2 = DB::table('validasi_ttd')->where('no_rawat', $noRawat)->where(function($qq) use ($labelCandidates) {
                        foreach ($labelCandidates as $lc) { $qq->orWhere('label', $lc); }
                    });
                    if (Schema::hasColumn('validasi_ttd','updated_at')) { $q2->orderByDesc('updated_at'); }
                    if (Schema::hasColumn('validasi_ttd','verified_at')) { $q2->orderByDesc('verified_at'); }
                    $vrow = $q2->first();
                }
                if (! $vrow) {
                    $q3 = DB::table('validasi_ttd')->where(function($qq) use ($labelCandidates) {
                        foreach ($labelCandidates as $lc) { $qq->orWhere('label', $lc); }
                    });
                    $mrCandidate = (string) ($pasien['noRm'] ?? $pasien['no_rm'] ?? '');
                    if ($mrCandidate !== '') { $q3->where('no_rkm_medis', $mrCandidate); }
                    if (Schema::hasColumn('validasi_ttd','updated_at')) { $q3->orderByDesc('updated_at'); }
                    if (Schema::hasColumn('validasi_ttd','verified_at')) { $q3->orderByDesc('verified_at'); }
                    $vrow = $q3->first();
                }
                if ($vrow) {
                    if (is_array($sks)) { $sks['nomor'] = (string) ($vrow->no_surat ?? ($sks['nomor'] ?? '')); }
                    $payload = null;
                    try { $payload = $vrow->payload_json ? json_decode($vrow->payload_json, true) : null; } catch (\Throwable $e) {}
                    $mr = (string) ($vrow->no_rkm_medis ?? ($pasien['noRm'] ?? $pasien['no_rm'] ?? ''));
                    $reg = null;
                    if ($vrow->no_rawat) { $reg = DB::table('reg_periksa')->where('no_rawat', $vrow->no_rawat)->first(); }
                    $dokterName = '';
                    if ($reg) { $dokterName = (string) (DB::table('dokter')->where('kd_dokter', $reg->kd_dokter)->value('nm_dokter') ?: ''); }
                    if ($dokterName === '' && is_array($sks)) { $dokterName = (string) ($sks['dokter'] ?? ''); }
                    $instansiLabel = (string) (($payload['instansi'] ?? null) ?: ($sks['instansi'] ?? ($setting->nama_instansi ?? '')));
                    $namaPasien = (string) (($payload['nama'] ?? null) ?: ($pasien['nama'] ?? '-'));
                    $tglLahirP = (string) (($pasien['tgl_lahir'] ?? null) ?: ($payload['tgl_lahir'] ?? ''));
                    $tglSurat = (string) (($vrow->tanggal ?? null) ?: ($sks['mulai'] ?? $tanggal));
                    $mulaiStr = (string) (($sks['mulai'] ?? null) ?: ($payload['mulai'] ?? $tglSurat));
                    $akhirStr = (string) (($sks['akhir'] ?? null) ?: ($payload['akhir'] ?? $tglSurat));
                    $hariStr = (string) (($sks['hari'] ?? null) ?: ($payload['hari'] ?? ''));
                    if ($hariStr === '' && Schema::hasTable('suratsakitpihak2')) {
                        $sr = null;
                        if ($nomorSurat !== '') { $sr = DB::table('suratsakitpihak2')->where('no_surat', $nomorSurat)->first(); }
                        if (! $sr && $vrow->no_rawat) { $sr = DB::table('suratsakitpihak2')->where('no_rawat', $vrow->no_rawat)->orderByDesc('created_at')->first(); }
                        if ($sr) {
                            $mulaiStr = (string) ($sr->tanggalawal ?? $mulaiStr);
                            $akhirStr = (string) ($sr->tanggalakhir ?? $akhirStr);
                            $hariStr = (string) (($sr->lamasakit ?? '') ?: $hariStr);
                        }
                    }
                    $tglSuratFmt = $fmtDash($normalize($tglSurat));
                    $mulaiFmt = $fmtDash($normalize($mulaiStr));
                    $akhirFmt = $fmtDash($normalize($akhirStr));
                    $tglLahirFmtOut = $fmtDash($normalize($tglLahirP));
                    $statusStr = ((string) ($vrow->status ?? '0')) === '1' ? 'Valid' : 'Tidak Valid';
                    $lines = [];
                    $lines[] = 'SURAT SAKIT';
                    $lines[] = '- KLINIK: ' . (string) $instansiLabel;
                    $lines[] = '- NAMA: ' . (string) $maskNama($namaPasien);
                    $lines[] = '- TANGGAL LAHIR: ' . (string) $tglLahirFmtOut;
                    $lines[] = '- ID MR: ' . (string) $mr;
                    $lines[] = '- TANGGAL SURAT: ' . (string) $tglSuratFmt;
                    $lines[] = '- PENANGGUNG JAWAB: ' . (string) $dokterName;
                    $lines[] = '- STATUS: ' . (string) $statusStr;
                    $hariTerbilangOut = $terbilangNum($hariStr);
                    $lines[] = 'Dalam keadaan sakit memerlukan istirahat ' . (string) $hariStr . ' ( ' . (string) $hariTerbilangOut . ' ) Hari';
                    $lines[] = 'terhitung mulai tanggal ' . (string) $mulaiFmt . ' s/d ' . (string) $akhirFmt;
                    $qrText = implode("\n", $lines);
                    try {
                        $png = QrCode::size(160)->errorCorrection('H')->margin(1)->format('png')->generate($qrText);
                        $qrCodeBase64 = 'data:image/png;base64,' . base64_encode($png);
                        try { $qrSvg = QrCode::size(160)->errorCorrection('H')->format('svg')->generate($qrText); } catch (\Throwable $e0) {}
                    } catch (\Throwable $e) {
                        try {
                            $svg = QrCode::size(160)->errorCorrection('H')->margin(1)->format('svg')->generate($qrText);
                            $qrSvg = $svg;
                            $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                        } catch (\Throwable $e2) {
                            try {
                                $g = new \SimpleSoftwareIO\QrCode\Generator();
                                $svg = $g->size(160)->format('svg')->generate($qrText);
                                $qrSvg = $svg;
                                $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                            } catch (\Throwable $e3) {}
                        }
                    }
                }
            }
        } catch (\Throwable $e) {}

        if (! $qrSvg && $type === 'SKS' && is_array($sks)) {
            $mr = (string) ($pasien['noRm'] ?? $pasien['no_rm'] ?? '');
            $dokterName = (string) ($sks['dokter'] ?? '');
            $instansiLabel = (string) ($sks['instansi'] ?? ($setting->nama_instansi ?? ''));
            $namaPasien = (string) ($pasien['nama'] ?? '-');
            $tglLahirP = (string) ($pasien['tgl_lahir'] ?? '');
            $tglSurat = (string) ($sks['mulai'] ?? $tanggal);
            $mulaiStr = (string) ($sks['mulai'] ?? $tglSurat);
            $akhirStr = (string) ($sks['akhir'] ?? $tglSurat);
            $hariStr = (string) ($sks['hari'] ?? '');
            $tglSuratFmt = $fmtDash($normalize($tglSurat));
            $mulaiFmt = $fmtDash($normalize($mulaiStr));
            $akhirFmt = $fmtDash($normalize($akhirStr));
            $tglLahirFmtOut = $fmtDash($normalize($tglLahirP));
            $statusStr = 'Tidak Valid';
            $lines = [];
            $lines[] = 'SURAT SAKIT';
            $lines[] = '- KLINIK: ' . (string) $instansiLabel;
            $lines[] = '- NAMA: ' . (string) $maskNama($namaPasien);
            $lines[] = '- TANGGAL LAHIR: ' . (string) $tglLahirFmtOut;
            $lines[] = '- ID MR: ' . (string) $mr;
            $lines[] = '- TANGGAL SURAT: ' . (string) $tglSuratFmt;
            $lines[] = '- PENANGGUNG JAWAB: ' . (string) $dokterName;
            $lines[] = '- STATUS: ' . (string) $statusStr;
            $hariTerbilangOut = $terbilangNum($hariStr);
            $lines[] = 'Dalam keadaan sakit memerlukan istirahat ' . (string) $hariStr . ' ( ' . (string) $hariTerbilangOut . ' ) Hari';
            $lines[] = 'terhitung mulai tanggal ' . (string) $mulaiFmt . ' s/d ' . (string) $akhirFmt;
            $qrText = implode("\n", $lines);
            try {
                $qrSvg = QrCode::size(160)->errorCorrection('H')->format('svg')->generate($qrText);
            } catch (\Throwable $e) {
                try {
                    $g = new \SimpleSoftwareIO\QrCode\Generator();
                    $qrSvg = $g->size(160)->format('svg')->generate($qrText);
                } catch (\Throwable $e2) {
                    $qrSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112"><rect width="112" height="112" fill="white"/><text x="10" y="60" font-size="12">QR</text></svg>';
                }
            }
        }
        if (! $qrCodeBase64 && $type === 'SKS' && is_array($sks)) {
            $mr = (string) ($pasien['noRm'] ?? $pasien['no_rm'] ?? '');
            $dokterName = (string) ($sks['dokter'] ?? '');
            $instansiLabel = (string) ($sks['instansi'] ?? ($setting->nama_instansi ?? ''));
            $namaPasien = (string) ($pasien['nama'] ?? '-');
            $tglLahirP = (string) ($pasien['tgl_lahir'] ?? '');
            $tglSurat = (string) ($sks['mulai'] ?? $tanggal);
            $mulaiStr = (string) ($sks['mulai'] ?? $tglSurat);
            $akhirStr = (string) ($sks['akhir'] ?? $tglSurat);
            $hariStr = (string) ($sks['hari'] ?? '');
            $tglSuratFmt = $fmtDash($normalize($tglSurat));
            $mulaiFmt = $fmtDash($normalize($mulaiStr));
            $akhirFmt = $fmtDash($normalize($akhirStr));
            $tglLahirFmtOut = $fmtDash($normalize($tglLahirP));
            $statusStr = 'Tidak Valid';
            $lines = [];
            $lines[] = 'SURAT SAKIT';
            $lines[] = '- KLINIK: ' . (string) $instansiLabel;
            $lines[] = '- NAMA: ' . (string) $maskNama($namaPasien);
            $lines[] = '- TANGGAL LAHIR: ' . (string) $tglLahirFmtOut;
            $lines[] = '- ID MR: ' . (string) $mr;
            $lines[] = '- TANGGAL SURAT: ' . (string) $tglSuratFmt;
            $lines[] = '- PENANGGUNG JAWAB: ' . (string) $dokterName;
            $lines[] = '- STATUS: ' . (string) $statusStr;
            $hariTerbilangOut = $terbilangNum($hariStr);
            $lines[] = 'Dalam keadaan sakit memerlukan istirahat ' . (string) $hariStr . ' ( ' . (string) $hariTerbilangOut . ' ) Hari';
            $lines[] = 'terhitung mulai tanggal ' . (string) $mulaiFmt . ' s/d ' . (string) $akhirFmt;
            $qrText = implode("\n", $lines);
            try {
                $png = QrCode::size(160)->errorCorrection('H')->margin(1)->format('png')->generate($qrText);
                $qrCodeBase64 = 'data:image/png;base64,' . base64_encode($png);
                try { $qrSvg = QrCode::size(160)->errorCorrection('H')->format('svg')->generate($qrText); } catch (\Throwable $e0) {}
            } catch (\Throwable $e) {
                try {
                    $svg = QrCode::size(160)->errorCorrection('H')->margin(1)->format('svg')->generate($qrText);
                    $qrSvg = $svg;
                    $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                } catch (\Throwable $e2) {
                    try {
                        $g = new \SimpleSoftwareIO\QrCode\Generator();
                        $svg = $g->size(160)->format('svg')->generate($qrText);
                        $qrSvg = $svg;
                        $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                    } catch (\Throwable $e3) {}
                }
            }
            if (! $qrCodeBase64) {
                $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112"><rect width="112" height="112" fill="white"/><text x="10" y="60" font-size="12">QR</text></svg>';
                $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                if (! $qrSvg) { $qrSvg = $svg; }
            }
        }

        if (! $qrCodeBase64 && $type === 'SKS' && is_array($sks)) {
            $mr = (string) ($pasien['noRm'] ?? $pasien['no_rm'] ?? '');
            $dokterName = (string) ($sks['dokter'] ?? '');
            $instansiLabel = (string) ($sks['instansi'] ?? ($setting->nama_instansi ?? ''));
            $namaPasien = (string) ($pasien['nama'] ?? '-');
            $tglLahirP = (string) ($pasien['tgl_lahir'] ?? '');
            $tglSurat = (string) ($sks['mulai'] ?? $tanggal);
            $mulaiStr = (string) ($sks['mulai'] ?? $tglSurat);
            $akhirStr = (string) ($sks['akhir'] ?? $tglSurat);
            $hariStr = (string) ($sks['hari'] ?? '');
            $tglSuratFmt = $fmtDash($normalize($tglSurat));
            $mulaiFmt = $fmtDash($normalize($mulaiStr));
            $akhirFmt = $fmtDash($normalize($akhirStr));
            $tglLahirFmtOut = $fmtDash($normalize($tglLahirP));
            $statusStr = 'Tidak Valid';
            $lines = [];
            $lines[] = 'SURAT SAKIT';
            $lines[] = '- KLINIK: ' . (string) $instansiLabel;
            $lines[] = '- NAMA: ' . (string) $maskNama($namaPasien);
            $lines[] = '- TANGGAL LAHIR: ' . (string) $tglLahirFmtOut;
            $lines[] = '- ID MR: ' . (string) $mr;
            $lines[] = '- TANGGAL SURAT: ' . (string) $tglSuratFmt;
            $lines[] = '- PENANGGUNG JAWAB: ' . (string) $dokterName;
            $lines[] = '- STATUS: ' . (string) $statusStr;
            $hariTerbilangOut = $terbilangNum($hariStr);
            $lines[] = 'Dalam keadaan sakit memerlukan istirahat ' . (string) $hariStr . ' ( ' . (string) $hariTerbilangOut . ' ) Hari';
            $lines[] = 'terhitung mulai tanggal ' . (string) $mulaiFmt . ' s/d ' . (string) $akhirFmt;
            $qrText = implode("\n", $lines);
            try {
                $png = QrCode::size(160)->errorCorrection('H')->margin(1)->format('png')->generate($qrText);
                $qrCodeBase64 = 'data:image/png;base64,' . base64_encode($png);
            } catch (\Throwable $e) {
                try {
                    $svg = QrCode::size(160)->errorCorrection('H')->margin(1)->format('svg')->generate($qrText);
                    $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                } catch (\Throwable $e2) {
                    try {
                        $g = new \SimpleSoftwareIO\QrCode\Generator();
                        $svg = $g->size(160)->format('svg')->generate($qrText);
                        $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                    } catch (\Throwable $e3) {}
                }
            }
        }

        $noRawat = (string) $request->input('no_rawat', '');
        if (! $qrCodeBase64) {
        try {
            if (Schema::hasTable('validasi_ttd')) {
                $vrow = null;
                $labelCandidates = (function($t) {
                    $map = [
                        'SKS' => ['SKS', 'Surat Sakit', 'SURAT SAKIT', 'Sakit'],
                        'RUJUKAN' => ['RUJUKAN', 'Surat Rujukan', 'SURAT RUJUKAN'],
                        'RAWAT_INAP' => ['RAWAT_INAP', 'Rawat Inap', 'RAWAT INAP'],
                        'SKSEHAT' => ['SKSEHAT', 'Surat Keterangan Sehat', 'SEHAT'],
                        'BEROBAT' => ['BEROBAT', 'Surat Keterangan Berobat', 'Surat Berobat'],
                    ];
                    $c = $map[$t] ?? [$t];
                    return array_values(array_unique(array_map('strval', $c)));
                })($type);
                $nomorSurat = (string) ($sks['nomor'] ?? '');
                if ($nomorSurat !== '') {
                    $q1 = DB::table('validasi_ttd')->where('no_surat', $nomorSurat);
                    if (Schema::hasColumn('validasi_ttd','updated_at')) { $q1->orderByDesc('updated_at'); }
                    if (Schema::hasColumn('validasi_ttd','verified_at')) { $q1->orderByDesc('verified_at'); }
                    $vrow = $q1->first();
                }
                if (! $vrow && $noRawat !== '') {
                    $q2 = DB::table('validasi_ttd')->where('no_rawat', $noRawat)->where(function($qq) use ($labelCandidates) {
                        foreach ($labelCandidates as $lc) { $qq->orWhere('label', $lc); }
                    });
                    if (Schema::hasColumn('validasi_ttd','updated_at')) { $q2->orderByDesc('updated_at'); }
                    if (Schema::hasColumn('validasi_ttd','verified_at')) { $q2->orderByDesc('verified_at'); }
                    $vrow = $q2->first();
                }
                if (! $vrow) {
                    $q3 = DB::table('validasi_ttd')->where(function($qq) use ($labelCandidates) {
                        foreach ($labelCandidates as $lc) { $qq->orWhere('label', $lc); }
                    });
                    $mrCandidate = (string) ($pasien['noRm'] ?? $pasien['no_rm'] ?? '');
                    if ($mrCandidate !== '') { $q3->where('no_rkm_medis', $mrCandidate); }
                    if (Schema::hasColumn('validasi_ttd','updated_at')) { $q3->orderByDesc('updated_at'); }
                    if (Schema::hasColumn('validasi_ttd','verified_at')) { $q3->orderByDesc('verified_at'); }
                    $vrow = $q3->first();
                }
                if ($vrow) {
                    if (is_array($sks)) { $sks['nomor'] = (string) ($vrow->no_surat ?? ($sks['nomor'] ?? '')); }
                    $payload = null;
                    try { $payload = $vrow->payload_json ? json_decode($vrow->payload_json, true) : null; } catch (
                        \Throwable $e) {}
                    $mr = (string) ($vrow->no_rkm_medis ?? ($pasien['noRm'] ?? $pasien['no_rm'] ?? ''));
                    $reg = null;
                    if ($vrow->no_rawat) { $reg = DB::table('reg_periksa')->where('no_rawat', $vrow->no_rawat)->first(); }
                    $dokterName = '';
                    if ($reg) { $dokterName = (string) (DB::table('dokter')->where('kd_dokter', $reg->kd_dokter)->value('nm_dokter') ?: ''); }
                    if ($dokterName === '' && is_array($sks)) { $dokterName = (string) ($sks['dokter'] ?? ''); }
                    $instansiLabel = (string) (($payload['instansi'] ?? null) ?: ($sks['instansi'] ?? ($setting->nama_instansi ?? '')));
                    $namaPasien = (string) (($payload['nama'] ?? null) ?: ($pasien['nama'] ?? '-'));
                    $tglLahirP = (string) (($pasien['tgl_lahir'] ?? null) ?: ($payload['tgl_lahir'] ?? ''));
                    $tglSurat = (string) (($vrow->tanggal ?? null) ?: ($sks['mulai'] ?? $tanggal));
                    $mulaiStr = (string) (($sks['mulai'] ?? null) ?: ($payload['mulai'] ?? $tglSurat));
                    $akhirStr = (string) (($sks['akhir'] ?? null) ?: ($payload['akhir'] ?? $tglSurat));
                    $hariStr = (string) (($sks['hari'] ?? null) ?: ($payload['hari'] ?? ''));
                    if ($hariStr === '' && Schema::hasTable('suratsakitpihak2')) {
                        $sr = null;
                        if ($nomorSurat !== '') { $sr = DB::table('suratsakitpihak2')->where('no_surat', $nomorSurat)->first(); }
                        if (! $sr && $vrow->no_rawat) { $sr = DB::table('suratsakitpihak2')->where('no_rawat', $vrow->no_rawat)->orderByDesc('created_at')->first(); }
                        if ($sr) {
                            $mulaiStr = (string) ($sr->tanggalawal ?? $mulaiStr);
                            $akhirStr = (string) ($sr->tanggalakhir ?? $akhirStr);
                            $hariStr = (string) (($sr->lamasakit ?? '') ?: $hariStr);
                        }
                    }
                    $tglSuratFmt = $fmtDash($normalize($tglSurat));
                    $mulaiFmt = $fmtDash($normalize($mulaiStr));
                    $akhirFmt = $fmtDash($normalize($akhirStr));
                    $tglLahirFmtOut = $fmtDash($normalize($tglLahirP));
                    $statusStr = ((string) ($vrow->status ?? '0')) === '1' ? 'Valid' : 'Tidak Valid';
                    $lines = [];
                    $lines[] = 'SURAT SAKIT';
                    $lines[] = '- KLINIK: ' . (string) $instansiLabel;
                    $lines[] = '- NAMA: ' . (string) $maskNama($namaPasien);
                    $lines[] = '- TANGGAL LAHIR: ' . (string) $tglLahirFmtOut;
                    $lines[] = '- ID MR: ' . (string) $mr;
                    $lines[] = '- TANGGAL SURAT: ' . (string) $tglSuratFmt;
                    $lines[] = '- PENANGGUNG JAWAB: ' . (string) $dokterName;
                    $lines[] = '- STATUS: ' . (string) $statusStr;
                    $hariTerbilangOut = $terbilangNum($hariStr);
                    $lines[] = 'Dalam keadaan sakit memerlukan istirahat ' . (string) $hariStr . ' ( ' . (string) $hariTerbilangOut . ' ) Hari';
                    $lines[] = 'terhitung mulai tanggal ' . (string) $mulaiFmt . ' s/d ' . (string) $akhirFmt;
                    $qrText = implode("\n", $lines);
                    try {
                        $png = QrCode::size(160)->errorCorrection('H')->margin(1)->format('png')->generate($qrText);
                        $qrCodeBase64 = 'data:image/png;base64,' . base64_encode($png);
                    } catch (\Throwable $e) {
                        try {
                            $svg = QrCode::size(160)->errorCorrection('H')->margin(1)->format('svg')->generate($qrText);
                            $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                        } catch (\Throwable $e2) {
                            try {
                                $g = new \SimpleSoftwareIO\QrCode\Generator();
                                $svg = $g->size(160)->format('svg')->generate($qrText);
                                $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                            } catch (\Throwable $e3) {}
                        }
                    }
                }
            }
        } catch (\Throwable $e) {}

        if (! $qrCodeBase64 && $type === 'SKS' && is_array($sks)) {
            $mr = (string) ($pasien['noRm'] ?? $pasien['no_rm'] ?? '');
            $dokterName = (string) ($sks['dokter'] ?? '');
            $instansiLabel = (string) ($sks['instansi'] ?? ($setting->nama_instansi ?? ''));
            $namaPasien = (string) ($pasien['nama'] ?? '-');
            $tglLahirP = (string) ($pasien['tgl_lahir'] ?? '');
            $tglSurat = (string) ($sks['mulai'] ?? $tanggal);
            $mulaiStr = (string) ($sks['mulai'] ?? $tglSurat);
            $akhirStr = (string) ($sks['akhir'] ?? $tglSurat);
            $hariStr = (string) ($sks['hari'] ?? '');
            $tglSuratFmt = $fmtDash($normalize($tglSurat));
            $mulaiFmt = $fmtDash($normalize($mulaiStr));
            $akhirFmt = $fmtDash($normalize($akhirStr));
            $tglLahirFmtOut = $fmtDash($normalize($tglLahirP));
            $statusStr = 'Preview';
            $lines = [];
            $lines[] = 'SURAT SAKIT';
            $lines[] = 'KLINIK: ' . (string) $instansiLabel;
            $lines[] = 'NAMA: ' . (string) $namaPasien;
            $lines[] = 'TANGGAL LAHIR: ' . (string) $tglLahirFmtOut;
            $lines[] = 'ID MR: ' . (string) $mr;
            $lines[] = 'TANGGAL SURAT: ' . (string) $tglSuratFmt;
            $lines[] = 'DOKTER: ' . (string) $dokterName;
            $lines[] = 'STATUS: ' . (string) $statusStr;
            $desc = 'Isi keterangan sakit: "SAKIT ' . '…' . ' perlu istirahat ' . (string) $hariStr . ' hari, mulai tanggal ' . (string) $mulaiFmt . ' s/d ' . (string) $akhirFmt . ',"';
            $lines[] = $desc;
            $qrText = implode("\n", $lines);
            try {
                $png = QrCode::size(160)->errorCorrection('H')->margin(1)->format('png')->generate($qrText);
                $qrCodeBase64 = 'data:image/png;base64,' . base64_encode($png);
            } catch (\Throwable $e) {
                try {
                    $svg = QrCode::size(160)->errorCorrection('H')->margin(1)->format('svg')->generate($qrText);
                    $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                } catch (\Throwable $e2) {
                    try {
                        $g = new \SimpleSoftwareIO\QrCode\Generator();
                        $svg = $g->size(160)->format('svg')->generate($qrText);
                        $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                    } catch (\Throwable $e3) {}
                }
            }
            if (! $qrCodeBase64) {
                $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112"><rect width="112" height="112" fill="white"/><text x="10" y="60" font-size="12">QR</text></svg>';
                $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
            }
        }
        }

        if (! $qrCodeBase64) {
        try {
            if (Schema::hasTable('validasi_ttd')) {
                $vrow = null;
                $labelCandidates = (function($t) {
                    $map = [
                        'SKS' => ['SKS', 'Surat Sakit', 'SURAT SAKIT', 'Sakit'],
                        'RUJUKAN' => ['RUJUKAN', 'Surat Rujukan', 'SURAT RUJUKAN'],
                        'RAWAT_INAP' => ['RAWAT_INAP', 'Rawat Inap', 'RAWAT INAP'],
                        'SKSEHAT' => ['SKSEHAT', 'Surat Keterangan Sehat', 'SEHAT'],
                        'BEROBAT' => ['BEROBAT', 'Surat Keterangan Berobat', 'Surat Berobat'],
                    ];
                    $c = $map[$t] ?? [$t];
                    return array_values(array_unique(array_map('strval', $c)));
                })($type);
                if ($nomorSurat !== '') {
                    $q1 = DB::table('validasi_ttd')->where('no_surat', $nomorSurat);
                    if (Schema::hasColumn('validasi_ttd','updated_at')) { $q1->orderByDesc('updated_at'); }
                    if (Schema::hasColumn('validasi_ttd','verified_at')) { $q1->orderByDesc('verified_at'); }
                    $vrow = $q1->first();
                }
                if (! $vrow && $noRawat !== '') {
                    $q2 = DB::table('validasi_ttd')->where('no_rawat', $noRawat)->where(function($qq) use ($labelCandidates) {
                        foreach ($labelCandidates as $lc) { $qq->orWhere('label', $lc); }
                    });
                    if (Schema::hasColumn('validasi_ttd','updated_at')) { $q2->orderByDesc('updated_at'); }
                    if (Schema::hasColumn('validasi_ttd','verified_at')) { $q2->orderByDesc('verified_at'); }
                    $vrow = $q2->first();
                }
                if (! $vrow) {
                    $q3 = DB::table('validasi_ttd')->where(function($qq) use ($labelCandidates) {
                        foreach ($labelCandidates as $lc) { $qq->orWhere('label', $lc); }
                    });
                    $mrCandidate = (string) ($pasien['noRm'] ?? $pasien['no_rm'] ?? '');
                    if ($mrCandidate !== '') { $q3->where('no_rkm_medis', $mrCandidate); }
                    if (Schema::hasColumn('validasi_ttd','updated_at')) { $q3->orderByDesc('updated_at'); }
                    if (Schema::hasColumn('validasi_ttd','verified_at')) { $q3->orderByDesc('verified_at'); }
                    $vrow = $q3->first();
                }
                if ($vrow) {
                    if (is_array($sks)) { $sks['nomor'] = (string) ($vrow->no_surat ?? ($sks['nomor'] ?? '')); }
                    $payload = null;
                    try { $payload = $vrow->payload_json ? json_decode($vrow->payload_json, true) : null; } catch (\Throwable $e) {}
                    $mr = (string) ($vrow->no_rkm_medis ?? ($pasien['noRm'] ?? $pasien['no_rm'] ?? ''));
                    $reg = null;
                    if ($vrow->no_rawat) { $reg = DB::table('reg_periksa')->where('no_rawat', $vrow->no_rawat)->first(); }
                    $dokterName = '';
                    if ($reg) { $dokterName = (string) (DB::table('dokter')->where('kd_dokter', $reg->kd_dokter)->value('nm_dokter') ?: ''); }
                    if ($dokterName === '' && is_array($sks)) { $dokterName = (string) ($sks['dokter'] ?? ''); }
                    $instansiLabel = (string) (($payload['instansi'] ?? null) ?: ($sks['instansi'] ?? ($setting->nama_instansi ?? '')));
                    $namaPasien = (string) (($payload['nama'] ?? null) ?: ($pasien['nama'] ?? '-'));
                    $tglLahirP = (string) (($pasien['tgl_lahir'] ?? null) ?: ($payload['tgl_lahir'] ?? ''));
                    $tglSurat = (string) (($vrow->tanggal ?? null) ?: ($sks['mulai'] ?? $tanggal));
                    $mulaiStr = (string) (($sks['mulai'] ?? null) ?: ($payload['mulai'] ?? $tglSurat));
                    $akhirStr = (string) (($sks['akhir'] ?? null) ?: ($payload['akhir'] ?? $tglSurat));
                    $hariStr = (string) (($sks['hari'] ?? null) ?: ($payload['hari'] ?? ''));
                    if ($hariStr === '' && Schema::hasTable('suratsakitpihak2')) {
                        $sr = null;
                        if ($nomorSurat !== '') { $sr = DB::table('suratsakitpihak2')->where('no_surat', $nomorSurat)->first(); }
                        if (! $sr && $vrow->no_rawat) { $sr = DB::table('suratsakitpihak2')->where('no_rawat', $vrow->no_rawat)->orderByDesc('created_at')->first(); }
                        if ($sr) {
                            $mulaiStr = (string) ($sr->tanggalawal ?? $mulaiStr);
                            $akhirStr = (string) ($sr->tanggalakhir ?? $akhirStr);
                            $hariStr = (string) (($sr->lamasakit ?? '') ?: $hariStr);
                        }
                    }
                    $tglSuratFmt = $fmtDash($normalize($tglSurat));
                    $mulaiFmt = $fmtDash($normalize($mulaiStr));
                    $akhirFmt = $fmtDash($normalize($akhirStr));
                    $tglLahirFmtOut = $fmtDash($normalize($tglLahirP));
                    $statusStr = ((string) ($vrow->status ?? '0')) === '1' ? 'Valid' : 'Tidak Valid';
                    $lines = [];
                    $lines[] = 'SURAT SAKIT';
                    $lines[] = '- KLINIK: ' . (string) $instansiLabel;
                    $lines[] = '- NAMA: ' . (string) $maskNama($namaPasien);
                    $lines[] = '- TANGGAL LAHIR: ' . (string) $tglLahirFmtOut;
                    $lines[] = '- ID MR: ' . (string) $mr;
                    $lines[] = '- TANGGAL SURAT: ' . (string) $tglSuratFmt;
                    $lines[] = '- PENANGGUNG JAWAB: ' . (string) $dokterName;
                    $lines[] = '- STATUS: ' . (string) $statusStr;
                    $hariTerbilangOut = $terbilangNum($hariStr);
                    $lines[] = 'Dalam keadaan sakit memerlukan istirahat ' . (string) $hariStr . ' ( ' . (string) $hariTerbilangOut . ' ) Hari';
                    $lines[] = 'terhitung mulai tanggal ' . (string) $mulaiFmt . ' s/d ' . (string) $akhirFmt;
                    $qrText = implode("\n", $lines);
                    try {
                        $png = QrCode::size(160)->errorCorrection('H')->margin(1)->format('png')->generate($qrText);
                        $qrCodeBase64 = 'data:image/png;base64,' . base64_encode($png);
                        try { $qrSvg = QrCode::size(160)->errorCorrection('H')->format('svg')->generate($qrText); } catch (\Throwable $e0) {}
                    } catch (\Throwable $e) {
                        try {
                            $svg = QrCode::size(160)->errorCorrection('H')->margin(1)->format('svg')->generate($qrText);
                            $qrSvg = $svg;
                            $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                        } catch (\Throwable $e2) {
                            try {
                                $g = new \SimpleSoftwareIO\QrCode\Generator();
                                $svg = $g->size(160)->format('svg')->generate($qrText);
                                $qrSvg = $svg;
                                $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                            } catch (\Throwable $e3) {}
                        }
                    }
                }
            }
        } catch (\Throwable $e) {}

        if (! $qrSvg && $type === 'SKS' && is_array($sks)) {
            $mr = (string) ($pasien['noRm'] ?? $pasien['no_rm'] ?? '');
            $dokterName = (string) ($sks['dokter'] ?? '');
            $instansiLabel = (string) ($sks['instansi'] ?? ($setting->nama_instansi ?? ''));
            $namaPasien = (string) ($pasien['nama'] ?? '-');
            $tglLahirP = (string) ($pasien['tgl_lahir'] ?? '');
            $tglSurat = (string) ($sks['mulai'] ?? $tanggal);
            $mulaiStr = (string) ($sks['mulai'] ?? $tglSurat);
            $akhirStr = (string) ($sks['akhir'] ?? $tglSurat);
            $hariStr = (string) ($sks['hari'] ?? '');
            $tglSuratFmt = $fmtDash($normalize($tglSurat));
            $mulaiFmt = $fmtDash($normalize($mulaiStr));
            $akhirFmt = $fmtDash($normalize($akhirStr));
            $tglLahirFmtOut = $fmtDash($normalize($tglLahirP));
            $statusStr = 'Preview';
            $lines = [];
            $lines[] = 'SURAT SAKIT';
            $lines[] = 'KLINIK: ' . (string) $instansiLabel;
            $lines[] = 'NAMA: ' . (string) $namaPasien;
            $lines[] = 'TANGGAL LAHIR: ' . (string) $tglLahirFmtOut;
            $lines[] = 'ID MR: ' . (string) $mr;
            $lines[] = 'TANGGAL SURAT: ' . (string) $tglSuratFmt;
            $lines[] = 'DOKTER: ' . (string) $dokterName;
            $lines[] = 'STATUS: ' . (string) $statusStr;
            $desc = 'Isi keterangan sakit: "SAKIT ' . '…' . ' perlu istirahat ' . (string) $hariStr . ' hari, mulai tanggal ' . (string) $mulaiFmt . ' s/d ' . (string) $akhirFmt . ',"';
            $lines[] = $desc;
            $qrText = implode("\n", $lines);
            try {
                $qrSvg = QrCode::size(160)->errorCorrection('H')->format('svg')->generate($qrText);
            } catch (\Throwable $e) {
                try {
                    $g = new \SimpleSoftwareIO\QrCode\Generator();
                    $qrSvg = $g->size(160)->format('svg')->generate($qrText);
                } catch (\Throwable $e2) {
                    $qrSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112"><rect width="112" height="112" fill="white"/><text x="10" y="60" font-size="12">QR</text></svg>';
                }
            }
        }

        if (! $qrCodeBase64 && $type === 'SKS' && is_array($sks)) {
            $mr = (string) ($pasien['noRm'] ?? $pasien['no_rm'] ?? '');
            $dokterName = (string) ($sks['dokter'] ?? '');
            $instansiLabel = (string) ($sks['instansi'] ?? ($setting->nama_instansi ?? ''));
            $namaPasien = (string) ($pasien['nama'] ?? '-');
            $tglLahirP = (string) ($pasien['tgl_lahir'] ?? '');
            $tglSurat = (string) ($sks['mulai'] ?? $tanggal);
            $mulaiStr = (string) ($sks['mulai'] ?? $tglSurat);
            $akhirStr = (string) ($sks['akhir'] ?? $tglSurat);
            $hariStr = (string) ($sks['hari'] ?? '');
            $tglSuratFmt = $fmtDash($normalize($tglSurat));
            $mulaiFmt = $fmtDash($normalize($mulaiStr));
            $akhirFmt = $fmtDash($normalize($akhirStr));
            $tglLahirFmtOut = $fmtDash($normalize($tglLahirP));
            $statusStr = 'Preview';
            $lines = [];
            $lines[] = 'SURAT SAKIT';
            $lines[] = 'KLINIK: ' . (string) $instansiLabel;
            $lines[] = 'NAMA: ' . (string) $namaPasien;
            $lines[] = 'TANGGAL LAHIR: ' . (string) $tglLahirFmtOut;
            $lines[] = 'ID MR: ' . (string) $mr;
            $lines[] = 'TANGGAL SURAT: ' . (string) $tglSuratFmt;
            $lines[] = 'DOKTER: ' . (string) $dokterName;
            $lines[] = 'STATUS: ' . (string) $statusStr;
            $desc = 'Isi keterangan sakit: ' . 'SAKIT ' . '…' . ' perlu istirahat ' . (string) $hariStr . ' hari, mulai tanggal ' . (string) $mulaiFmt . ' s/d ' . (string) $akhirFmt . ',';
            $lines[] = $desc;
            $qrText = implode("\n", $lines);
            try {
                $png = QrCode::size(160)->errorCorrection('H')->margin(1)->format('png')->generate($qrText);
                $qrCodeBase64 = 'data:image/png;base64,' . base64_encode($png);
                try { $qrSvg = $qrSvg ?: QrCode::size(160)->errorCorrection('H')->format('svg')->generate($qrText); } catch (\Throwable $e0) {}
            } catch (\Throwable $e) {
                try {
                    $svg = QrCode::size(160)->errorCorrection('H')->margin(1)->format('svg')->generate($qrText);
                    $qrSvg = $qrSvg ?: $svg;
                    $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                } catch (\Throwable $e2) {
                    try {
                        $g = new \SimpleSoftwareIO\QrCode\Generator();
                        $svg = $g->size(160)->format('svg')->generate($qrText);
                        $qrSvg = $qrSvg ?: $svg;
                        $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                    } catch (\Throwable $e3) {}
                }
            }
            if (! $qrCodeBase64) {
                $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112"><rect width="112" height="112" fill="white"/><text x="10" y="60" font-size="12">QR</text></svg>';
                $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                if (! $qrSvg) { $qrSvg = $svg; }
            }
        }
        }

        if ($type === 'SKS') {
            $instansiLabel = (string) ($sks['instansi'] ?? ($setting->nama_instansi ?? ''));
            $mr = (string) ($pasien['noRm'] ?? $pasien['no_rm'] ?? '');
            $namaPasien = (string) ($pasien['nama'] ?? '-');
            $tglLahirRaw2 = (string) ($pasien['tgl_lahir'] ?? '');
            $tglLahirFmtOut2 = $fmtDash($normalize($tglLahirRaw2));
            $tglSuratFmt2 = $fmtDash($normalize((string) ($sks['mulai'] ?? $tanggal)));
            $mulaiFmt2 = $fmtDash($normalize((string) ($sks['mulai'] ?? $tanggal)));
            $akhirFmt2 = $fmtDash($normalize((string) ($sks['akhir'] ?? $tanggal)));
            $dokterName2 = (string) ($sks['dokter'] ?? '');
            $hariStr2 = (string) ($sks['hari'] ?? '');
            $statusStr2 = 'Tidak Valid';

            $lines2 = [];
            $lines2[] = 'SURAT SAKIT';
            $lines2[] = '- KLINIK: ' . $instansiLabel;
            $lines2[] = '- NAMA: ' . $maskNama($namaPasien);
            $lines2[] = '- TANGGAL LAHIR: ' . $tglLahirFmtOut2;
            $lines2[] = '- ID MR: ' . $mr;
            $lines2[] = '- TANGGAL SURAT: ' . $tglSuratFmt2;
            $lines2[] = '- PENANGGUNG JAWAB: ' . $dokterName2;
            $lines2[] = '- STATUS: ' . $statusStr2;
            $hariTerbilangOut2 = $terbilangNum($hariStr2);
            $lines2[] = 'Dalam keadaan sakit memerlukan istirahat ' . (string) $hariStr2 . ' ( ' . (string) $hariTerbilangOut2 . ' ) Hari';
            $lines2[] = 'terhitung mulai tanggal ' . (string) $mulaiFmt2 . ' s/d ' . (string) $akhirFmt2;
            $qrTextNew2 = implode("\n", $lines2);

            if (! $qrSvg) {
                try { $qrSvg = QrCode::size(160)->errorCorrection('H')->format('svg')->generate($qrTextNew2); } catch (\Throwable $e) {
                    try { $g = new \SimpleSoftwareIO\QrCode\Generator(); $qrSvg = $g->size(160)->format('svg')->generate($qrTextNew2); } catch (\Throwable $e2) { $qrSvg = null; }
                }
            }
            if (! $qrCodeBase64) {
                try {
                    $png = QrCode::size(160)->errorCorrection('H')->margin(1)->format('png')->generate($qrTextNew2);
                    $qrCodeBase64 = 'data:image/png;base64,' . base64_encode($png);
                } catch (\Throwable $e) {
                    try { $svg = QrCode::size(160)->errorCorrection('H')->margin(1)->format('svg')->generate($qrTextNew2); $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg); if (! $qrSvg) { $qrSvg = $svg; } } catch (\Throwable $e2) {
                        try { $g = new \SimpleSoftwareIO\QrCode\Generator(); $svg = $g->size(160)->format('svg')->generate($qrTextNew2); $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg); if (! $qrSvg) { $qrSvg = $svg; } } catch (\Throwable $e3) { $qrCodeBase64 = null; }
                    }
                }
            }
            if (! $qrSvg && ! $qrCodeBase64) {
                $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112"><rect width="112" height="112" fill="white"/><text x="10" y="60" font-size="12">QR</text></svg>';
                $qrSvg = $svg;
                $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
            }
        }

        

        $viewData = [
            'type' => $type,
            'title' => $titleMap[$type] ?? $type,
            'tanggal' => $tanggal,
            'tanggal_fmt' => $tanggalFmt,
            'pasien' => [
                'nama' => $pasien['nama'] ?? '-',
                'no_rm' => $pasien['noRm'] ?? $pasien['no_rm'] ?? '-',
                'jk' => $pasien['jk'] ?? '-',
                'umur' => $pasien['umur'] ?? '-',
                'alamat' => $pasien['alamat'] ?? '-',
                'tgl_lahir' => $tglLahirRaw,
                'tgl_lahir_fmt' => $tglLahirFmt,
                'pekerjaan' => $pasien['pekerjaan'] ?? '-',
            ],
            'setting' => $setting,
            'logo_base64' => $logoBase64,
            'sks' => $sks,
            'qr_svg' => $qrSvg,
            'qr_code' => ($qrCodeBase64 ?: ('data:image/svg+xml;base64,' . base64_encode('<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112"><rect width="112" height="112" fill="white"/><text x="10" y="60" font-size="12">QR</text></svg>'))),
            'is_preview' => false,
        ];

        $pdf = Pdf::loadView('surat.CetakSuratSakit', $viewData);
        $pdf->setPaper('A4', 'portrait');
        $pdf->setOption('isHtml5ParserEnabled', true);
        $pdf->setOption('isRemoteEnabled', true);

        $filename = 'Surat_'.$type.'_'.date('YmdHis').'.pdf';

        return $pdf->download($filename);
    }

    public function preview(Request $request)
    {
        $type = (string) $request->input('type', 'SKS');
        $tanggal = (string) $request->input('tanggal', date('Y-m-d'));
        $pasien = (array) $request->input('pasien', []);

        $allowed = [
            'SKS',
            'RUJUKAN',
            'RAWAT_INAP',
            'SKSEHAT',
            'BEROBAT',
        ];
        if (! in_array($type, $allowed, true)) {
            return response()->json(['message' => 'Jenis surat tidak dikenali'], 422);
        }

        // Ambil data setting dari database jika ada
        $setting = null;
        $logoBase64 = null;
        if (DB::getSchemaBuilder()->hasTable('setting')) {
            $setting = DB::table('setting')->where('aktifkan', 'Yes')->first() ?: DB::table('setting')->first();
            if ($setting && isset($setting->logo) && ! empty($setting->logo)) {
                $blob = $setting->logo;
                $mime = 'image/png';
                $bytes = substr($blob, 0, 12);
                if (substr($bytes, 0, 2) === "\xFF\xD8") {
                    $mime = 'image/jpeg';
                } elseif (substr($bytes, 0, 4) === "\x89PNG") {
                    $mime = 'image/png';
                } elseif (substr($bytes, 0, 6) === 'GIF87a' || substr($bytes, 0, 6) === 'GIF89a') {
                    $mime = 'image/gif';
                }
                $logoBase64 = 'data:'.$mime.';base64,'.base64_encode($blob);
            }
        }

        // Jika tidak ada setting, gunakan data dummy
        if (! $setting) {
            $setting = (object) [
                'nama_instansi' => 'RUMAH SAKIT UMUM DAERAH',
                'alamat_instansi' => 'Jl. Contoh No. 123',
                'kabupaten' => 'Jakarta Selatan',
                'propinsi' => 'DKI Jakarta',
                'email' => 'info@rsud.example.id',
                'kontak' => '021-12345678',
            ];
        }

        $titleMap = [
            'SKS' => 'Surat Keterangan Sakit',
            'RUJUKAN' => 'Surat Rujukan',
            'RAWAT_INAP' => 'Surat Keterangan Rawat Inap',
            'SKSEHAT' => 'Surat Keterangan Sehat',
            'BEROBAT' => 'Surat Keterangan Berobat',
        ];

        $normalize = function ($v) {
            $v = (string) $v;
            if ($v === '') return $v;
            try {
                return Carbon::createFromFormat('d/m/Y', $v)->format('Y-m-d');
            } catch (\Throwable $e) {}
            try {
                return Carbon::parse($v)->format('Y-m-d');
            } catch (\Throwable $e) {}
            return $v;
        };

        $tanggal = $normalize($tanggal);
        $fmt = function ($v) {
            try { return $v ? Carbon::parse($v)->format('d/m/Y') : ''; } catch (\Throwable $e) { return (string) $v; }
        };
        $fmtDash = function ($v) {
            try { return $v ? Carbon::parse($v)->format('d-m-Y') : ''; } catch (\Throwable $e) { return (string) $v; }
        };
        $maskNama = function ($name) {
            $name = trim((string) $name);
            if ($name === '') return '-';
            $parts = preg_split('/\s+/', $name);
            $out = [];
            if (count($parts) > 0) {
                $first = $parts[0];
                $keep = mb_substr($first, 0, 2);
                $maskLen = max(0, mb_strlen($first) - mb_strlen($keep));
                $out[] = $keep . str_repeat('*', $maskLen);
                for ($i = 1; $i < count($parts); $i++) {
                    $out[] = str_repeat('*', mb_strlen($parts[$i]));
                }
            }
            return implode(' ', $out);
        };
        $terbilangNum = function($n) {
            $n = max(0, (int) $n);
            $s = ["nol","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas"];
            $f = function($x) use (&$f, $s) {
                if ($x < 12) return $s[$x];
                if ($x < 20) return $f($x - 10) . " belas";
                if ($x < 100) { $puluh = (int) floor($x / 10); $satu = $x % 10; return $f($puluh) . " puluh" . ($satu ? " " . $f($satu) : ""); }
                if ($x < 200) return "seratus" . ($x > 100 ? " " . $f($x - 100) : "");
                if ($x < 1000) { $ratus = (int) floor($x / 100); $sisa = $x % 100; return $f($ratus) . " ratus" . ($sisa ? " " . $f($sisa) : ""); }
                return (string) $x;
            };
            return ucfirst($f($n));
        };
        $tanggalFmt = $fmt($tanggal);

        $sks = null;
        if ($type === 'SKS') {
            $instansi = $setting->nama_instansi ?? null;
            $dokter = $request->input('dokter', 'Dr. Ahmad Hidayat, Sp.PD');
            $mulaiDefault = date('d/m/Y');
            $akhirDefault = date('d/m/Y', strtotime('+3 days'));
            $mulai = $request->input('mulai', $mulaiDefault);
            $akhir = $request->input('akhir', $akhirDefault);
            $hari = $request->input('hari', '3');
            $nomorSurat = $request->input('nomor', 'SKS/001/'.date('Y'));

            $mulaiN = $normalize($mulai);
            $akhirN = $normalize($akhir);
            $sks = [
                'nomor' => $nomorSurat,
                'instansi' => (string) ($request->input('instansi', $instansi ?? '') ?? ''),
                'dokter' => (string) $dokter,
                'mulai' => $mulaiN,
                'akhir' => $akhirN,
                'mulai_fmt' => $fmtDash($mulaiN),
                'akhir_fmt' => $fmtDash($akhirN),
                'hari' => $hari,
            ];
        }

        // Data dummy untuk pasien jika tidak ada
        if (empty($pasien)) {
            $pasien = [
                'nama' => 'Budi Santoso',
                'no_rm' => 'RM001',
                'jk' => 'L',
                'umur' => '35',
                'alamat' => 'Jl. Merdeka No. 45, RT 05/RW 02, Kelurahan Kebon Jeruk, Kecamatan Kebon Jeruk',
                'tgl_lahir' => '1989-05-15',
                'pekerjaan' => 'Karyawan Swasta',
            ];
        }

        $tglLahirRaw = (string) ($pasien['tglLahir'] ?? $pasien['tgl_lahir'] ?? '');
        $tglLahirFmt = $fmtDash($normalize($tglLahirRaw));

        $noRawat = (string) $request->input('no_rawat', '');
        $nomorSuratParam = (string) $request->input('nomor', '');
        $qrCodeBase64 = null;
        $qrSvg = null;
        try {
            if (Schema::hasTable('validasi_ttd')) {
                $vrow = null;
                $labelCandidates = (function($t) {
                    $map = [
                        'SKS' => ['SKS', 'Surat Sakit', 'SURAT SAKIT', 'Sakit'],
                        'RUJUKAN' => ['RUJUKAN', 'Surat Rujukan', 'SURAT RUJUKAN'],
                        'RAWAT_INAP' => ['RAWAT_INAP', 'Rawat Inap', 'RAWAT INAP'],
                        'SKSEHAT' => ['SKSEHAT', 'Surat Keterangan Sehat', 'SEHAT'],
                        'BEROBAT' => ['BEROBAT', 'Surat Keterangan Berobat', 'Surat Berobat'],
                    ];
                    $c = $map[$t] ?? [$t];
                    return array_values(array_unique(array_map('strval', $c)));
                })($type);
                $nomorSurat = (string) (($sks['nomor'] ?? null) ?: $nomorSuratParam);
                if ($nomorSurat !== '') {
                    $q1 = DB::table('validasi_ttd')->where('no_surat', $nomorSurat);
                    if (Schema::hasColumn('validasi_ttd','updated_at')) { $q1->orderByDesc('updated_at'); }
                    if (Schema::hasColumn('validasi_ttd','verified_at')) { $q1->orderByDesc('verified_at'); }
                    $vrow = $q1->first();
                }
                if (! $vrow && $noRawat !== '') {
                    $q2 = DB::table('validasi_ttd')->where('no_rawat', $noRawat)->where(function($qq) use ($labelCandidates) {
                        foreach ($labelCandidates as $lc) { $qq->orWhere('label', $lc); }
                    });
                    if (Schema::hasColumn('validasi_ttd','updated_at')) { $q2->orderByDesc('updated_at'); }
                    if (Schema::hasColumn('validasi_ttd','verified_at')) { $q2->orderByDesc('verified_at'); }
                    $vrow = $q2->first();
                }
                if (! $vrow) {
                    $q3 = DB::table('validasi_ttd')->where(function($qq) use ($labelCandidates) {
                        foreach ($labelCandidates as $lc) { $qq->orWhere('label', $lc); }
                    });
                    $mrCandidate = (string) ($pasien['noRm'] ?? $pasien['no_rm'] ?? '');
                    if ($mrCandidate !== '') { $q3->where('no_rkm_medis', $mrCandidate); }
                    if (Schema::hasColumn('validasi_ttd','updated_at')) { $q3->orderByDesc('updated_at'); }
                    if (Schema::hasColumn('validasi_ttd','verified_at')) { $q3->orderByDesc('verified_at'); }
                    $vrow = $q3->first();
                }
                if ($vrow) {
                    if (is_array($sks)) { $sks['nomor'] = (string) ($vrow->no_surat ?? ($sks['nomor'] ?? '')); }
                    $payload = null;
                    try { $payload = $vrow->payload_json ? json_decode($vrow->payload_json, true) : null; } catch (\Throwable $e) {}
                    $mr = (string) ($vrow->no_rkm_medis ?? ($pasien['noRm'] ?? $pasien['no_rm'] ?? ''));
                    $reg = null;
                    if ($vrow->no_rawat) { $reg = DB::table('reg_periksa')->where('no_rawat', $vrow->no_rawat)->first(); }
                    $dokterName = '';
                    if ($reg) { $dokterName = (string) (DB::table('dokter')->where('kd_dokter', $reg->kd_dokter)->value('nm_dokter') ?: ''); }
                    if ($dokterName === '' && is_array($sks)) { $dokterName = (string) ($sks['dokter'] ?? ''); }
                    $instansiLabel = (string) (($payload['instansi'] ?? null) ?: ($sks['instansi'] ?? ($setting->nama_instansi ?? '')));
                    $namaPasien = (string) (($payload['nama'] ?? null) ?: ($pasien['nama'] ?? '-'));
                    $tglLahirP = (string) (($pasien['tgl_lahir'] ?? null) ?: ($payload['tgl_lahir'] ?? ''));
                    $tglSurat = (string) (($vrow->tanggal ?? null) ?: ($sks['mulai'] ?? $tanggal));
                    $mulaiStr = (string) (($sks['mulai'] ?? null) ?: ($payload['mulai'] ?? $tglSurat));
                    $akhirStr = (string) (($sks['akhir'] ?? null) ?: ($payload['akhir'] ?? $tglSurat));
                    $hariStr = (string) (($sks['hari'] ?? null) ?: ($payload['hari'] ?? ''));
                    if ($hariStr === '' && Schema::hasTable('suratsakitpihak2')) {
                        $sr = null;
                        if ($nomorSurat !== '') { $sr = DB::table('suratsakitpihak2')->where('no_surat', $nomorSurat)->first(); }
                        if (! $sr && $vrow->no_rawat) { $sr = DB::table('suratsakitpihak2')->where('no_rawat', $vrow->no_rawat)->orderByDesc('created_at')->first(); }
                        if ($sr) {
                            $mulaiStr = (string) ($sr->tanggalawal ?? $mulaiStr);
                            $akhirStr = (string) ($sr->tanggalakhir ?? $akhirStr);
                            $hariStr = (string) (($sr->lamasakit ?? '') ?: $hariStr);
                        }
                    }
                    $tglSuratFmt = $fmtDash($normalize($tglSurat));
                    $mulaiFmt = $fmtDash($normalize($mulaiStr));
                    $akhirFmt = $fmtDash($normalize($akhirStr));
                    $tglLahirFmtOut = $fmtDash($normalize($tglLahirP));
                    $statusStr = ((string) ($vrow->status ?? '0')) === '1' ? 'Valid' : 'Tidak Valid';
                    $lines = [];
                    $lines[] = 'SURAT SAKIT';
                    $lines[] = '- KLINIK: ' . (string) $instansiLabel;
                    $lines[] = '- NAMA: ' . (string) $maskNama($namaPasien);
                    $lines[] = '- TANGGAL LAHIR: ' . (string) $tglLahirFmtOut;
                    $lines[] = '- ID MR: ' . (string) $mr;
                    $lines[] = '- TANGGAL SURAT: ' . (string) $tglSuratFmt;
                    $lines[] = '- PENANGGUNG JAWAB: ' . (string) $dokterName;
                    $lines[] = '- STATUS: ' . (string) $statusStr;
                    $hariTerbilangOut = $terbilangNum($hariStr);
                    $lines[] = 'Dalam keadaan sakit memerlukan istirahat ' . (string) $hariStr . ' ( ' . (string) $hariTerbilangOut . ' ) Hari';
                    $lines[] = 'terhitung mulai tanggal ' . (string) $mulaiFmt . ' s/d ' . (string) $akhirFmt;
                    $qrText = implode("\n", $lines);
                    try {
                        $png = QrCode::size(160)->errorCorrection('H')->margin(1)->format('png')->generate($qrText);
                        $qrCodeBase64 = 'data:image/png;base64,' . base64_encode($png);
                        try { $qrSvg = QrCode::size(160)->errorCorrection('H')->format('svg')->generate($qrText); } catch (\Throwable $e0) {}
                    } catch (\Throwable $e) {
                        try {
                            $svg = QrCode::size(160)->errorCorrection('H')->margin(1)->format('svg')->generate($qrText);
                            $qrSvg = $svg;
                            $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                        } catch (\Throwable $e2) {
                            try {
                                $g = new \SimpleSoftwareIO\QrCode\Generator();
                                $svg = $g->size(160)->format('svg')->generate($qrText);
                                $qrSvg = $svg;
                                $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
                            } catch (\Throwable $e3) {}
                        }
                    }
                }
            }
        } catch (\Throwable $e) {}

        if ($type === 'SKS') {
            $instansiLabel = (string) ($sks['instansi'] ?? ($setting->nama_instansi ?? ''));
            $mr = (string) ($pasien['noRm'] ?? $pasien['no_rm'] ?? '');
            $namaPasien = (string) ($pasien['nama'] ?? '-');
            $tglLahirRaw2 = (string) ($pasien['tglLahir'] ?? $pasien['tgl_lahir'] ?? '');
            $tglLahirFmtOut2 = $fmtDash($normalize($tglLahirRaw2));
            $tglSuratFmt2 = $fmtDash($normalize((string) ($sks['mulai'] ?? $tanggal)));
            $mulaiFmt2 = $fmtDash($normalize((string) ($sks['mulai'] ?? $tanggal)));
            $akhirFmt2 = $fmtDash($normalize((string) ($sks['akhir'] ?? $tanggal)));
            $dokterName2 = (string) ($sks['dokter'] ?? '');
            $hariStr2 = (string) ($sks['hari'] ?? '');
            $statusStr2 = 'Tidak Valid';

            $lines2 = [];
            $lines2[] = 'SURAT SAKIT';
            $lines2[] = '- KLINIK: ' . $instansiLabel;
            $lines2[] = '- NAMA: ' . $maskNama($namaPasien);
            $lines2[] = '- TANGGAL LAHIR: ' . $tglLahirFmtOut2;
            $lines2[] = '- ID MR: ' . $mr;
            $lines2[] = '- TANGGAL SURAT: ' . $tglSuratFmt2;
            $lines2[] = '- PENANGGUNG JAWAB: ' . $dokterName2;
            $lines2[] = '- STATUS: ' . $statusStr2;
            $hariTerbilangOut2 = $terbilangNum($hariStr2);
            $lines2[] = 'Dalam keadaan sakit memerlukan istirahat ' . (string) $hariStr2 . ' ( ' . (string) $hariTerbilangOut2 . ' ) Hari';
            $lines2[] = 'terhitung mulai tanggal ' . (string) $mulaiFmt2 . ' s/d ' . (string) $akhirFmt2;
            $qrTextNew2 = implode("\n", $lines2);

            if (! $qrSvg) {
                try { $qrSvg = QrCode::size(160)->errorCorrection('H')->format('svg')->generate($qrTextNew2); } catch (\Throwable $e) {
                    try { $g = new \SimpleSoftwareIO\QrCode\Generator(); $qrSvg = $g->size(160)->format('svg')->generate($qrTextNew2); } catch (\Throwable $e2) {}
                }
            }
            if (! $qrCodeBase64) {
                try {
                    $png = QrCode::size(160)->errorCorrection('H')->margin(1)->format('png')->generate($qrTextNew2);
                    $qrCodeBase64 = 'data:image/png;base64,' . base64_encode($png);
                } catch (\Throwable $e) {
                    try { $svg = QrCode::size(160)->errorCorrection('H')->margin(1)->format('svg')->generate($qrTextNew2); $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg); if (! $qrSvg) { $qrSvg = $svg; } } catch (\Throwable $e2) {
                        try { $g = new \SimpleSoftwareIO\QrCode\Generator(); $svg = $g->size(160)->format('svg')->generate($qrTextNew2); $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg); if (! $qrSvg) { $qrSvg = $svg; } } catch (\Throwable $e3) {}
                    }
                }
            }
            if (! $qrSvg && ! $qrCodeBase64) {
                $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112"><rect width="112" height="112" fill="white"/><text x="10" y="60" font-size="12">QR</text></svg>';
                $qrSvg = $svg;
                $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($svg);
            }
        }

        $viewData = [
            'type' => $type,
            'title' => $titleMap[$type] ?? $type,
            'tanggal' => $tanggal,
            'tanggal_fmt' => $tanggalFmt,
            'pasien' => [
                'nama' => $pasien['nama'] ?? '-',
                'no_rm' => $pasien['noRm'] ?? $pasien['no_rm'] ?? '-',
                'jk' => $pasien['jk'] ?? '-',
                'umur' => $pasien['umur'] ?? '-',
                'alamat' => $pasien['alamat'] ?? '-',
                'tgl_lahir' => $tglLahirRaw,
                'tgl_lahir_fmt' => $tglLahirFmt,
                'pekerjaan' => $pasien['pekerjaan'] ?? '-',
            ],
            'setting' => $setting,
            'logo_base64' => $logoBase64,
            'sks' => $sks,
            'qr_svg' => $qrSvg,
            'qr_code' => ($qrCodeBase64 ?: ('data:image/svg+xml;base64,' . base64_encode('<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" fill="white"/><text x="10" y="60" font-size="12">QR</text></svg>'))),
            'is_preview' => true,
        ];

        // Return view HTML langsung untuk preview
        return view('surat.CetakSuratSakit', $viewData);
    }
}
