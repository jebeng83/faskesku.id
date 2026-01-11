<?php

declare(strict_types=1);

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PaymentPointController extends Controller
{
    protected function getShiftWindows(string $date, ?string $onlyShift = null): array
    {
        $shifts = [];
        if (Schema::hasTable('closing_kasir')) {
            $rows = DB::table('closing_kasir')->select(['shift', 'jam_masuk', 'jam_pulang'])->get();
            foreach ($rows as $r) {
                $start = trim($date.' '.($r->jam_masuk ?? '00:00:00'));
                $endTime = (string) ($r->jam_pulang ?? '23:59:59');
                $endDate = $date;
                if (strtotime($endTime) < strtotime((string) $r->jam_masuk)) {
                    $endDate = date('Y-m-d', strtotime($date.' +1 day'));
                }
                $end = trim($endDate.' '.$endTime);
                $shifts[] = ['name' => (string) $r->shift, 'start' => $start, 'end' => $end];
            }
        } else {
            $shifts = [
                ['name' => 'Pagi', 'start' => $date.' 00:00:00', 'end' => $date.' 12:59:59'],
                ['name' => 'Siang', 'start' => $date.' 13:00:00', 'end' => $date.' 18:59:59'],
                ['name' => 'Malam', 'start' => $date.' 19:00:00', 'end' => $date.' 23:59:59'],
            ];
        }
        if ($onlyShift && $onlyShift !== 'Semua') {
            $shifts = array_values(array_filter($shifts, fn($s) => $s['name'] === $onlyShift));
        }
        return $shifts;
    }

    public function index(Request $request)
    {
        $date = (string) $request->query('date', date('Y-m-d'));
        $shift = (string) $request->query('shift', 'Semua');
        $q = trim((string) $request->query('q', ''));
        $user = trim((string) $request->query('user', ''));

        $windows = $this->getShiftWindows($date, $shift);

        $items = [];
        $uangMasuk = 0.0;

        if (Schema::hasTable('tagihan_sadewa') && Schema::hasColumn('tagihan_sadewa', 'tgl_bayar')) {
            foreach ($windows as $w) {
                $query = DB::table('tagihan_sadewa as t');
                $hasNama = Schema::hasColumn('tagihan_sadewa', 'nama_pasien');
                $hasNoNota = Schema::hasColumn('tagihan_sadewa', 'no_nota');
                $hasJumlah = Schema::hasColumn('tagihan_sadewa', 'jumlah_bayar') || Schema::hasColumn('tagihan_sadewa', 'bayar');
                $jumlahCol = Schema::hasColumn('tagihan_sadewa', 'jumlah_bayar') ? 'jumlah_bayar' : (Schema::hasColumn('tagihan_sadewa', 'bayar') ? 'bayar' : null);

                if (Schema::hasTable('nota_inap') && Schema::hasColumn('nota_inap', 'no_rawat') && Schema::hasColumn('nota_inap', 'no_nota')) {
                    $query->leftJoin('nota_inap as ni', 'ni.no_rawat', '=', 't.no_nota');
                }
                if (Schema::hasTable('nota_jalan') && Schema::hasColumn('nota_jalan', 'no_rawat') && Schema::hasColumn('nota_jalan', 'no_nota')) {
                    $query->leftJoin('nota_jalan as nj', 'nj.no_rawat', '=', 't.no_nota');
                }
                if (Schema::hasTable('pegawai') && Schema::hasColumn('pegawai', 'nik') && Schema::hasColumn('pegawai', 'nama')) {
                    $query->leftJoin('pegawai as p', 'p.nik', '=', 't.petugas');
                }

                $selects = [
                    't.tgl_bayar as tgl_bayar',
                ];
                if ($hasNoNota) {
                    $selects[] = DB::raw('COALESCE(ni.no_nota, nj.no_nota, t.no_nota) as no_nota_final');
                } else {
                    $selects[] = DB::raw('COALESCE(ni.no_nota, nj.no_nota, t.no_nota) as no_nota_final');
                }
                if ($hasNama) {
                    $selects[] = 't.nama_pasien as nama_pasien';
                }
                if ($jumlahCol) {
                    $selects[] = 't.'.$jumlahCol.' as jumlah_bayar';
                }
                $selects[] = DB::raw('COALESCE(p.nama, t.petugas) as petugas_label');

                $query->select($selects)
                    ->where('t.tgl_bayar', '>=', $w['start'])
                    ->where('t.tgl_bayar', '<', $w['end']);

                if ($q !== '') {
                    $like = '%'.$q.'%';
                    $query->where(function ($qb) use ($like) {
                        $qb->orWhere('t.nama_pasien', 'like', $like)
                           ->orWhere(DB::raw('COALESCE(ni.no_nota, nj.no_nota, t.no_nota)'), 'like', $like);
                    });
                }

                if ($user !== '') {
                    $likeUser = '%'.strtolower($user).'%';
                    $query->where(function ($qb) use ($likeUser) {
                        $qb->orWhereRaw('LOWER(COALESCE(p.nama, t.petugas)) like ?', [$likeUser]);
                    });
                }

                $rows = $query->orderBy('t.tgl_bayar')->limit(1000)->get();
                foreach ($rows as $r) {
                    $amt = (float) ($r->jumlah_bayar ?? 0);
                    $uangMasuk += $amt;
                    $items[] = [
                        'tanggal' => (string) ($r->tgl_bayar ?? ''),
                        'shift' => $w['name'],
                        'no_nota' => (string) ($r->no_nota_final ?? ''),
                        'nama_pasien' => (string) ($r->nama_pasien ?? ''),
                        'pembayaran' => $amt,
                        'petugas' => (string) ($r->petugas_label ?? ''),
                    ];
                }
            }
        }

        $modalAwal = 0.0;
        if (Schema::hasTable('set_modal_payment')) {
            $qModal = DB::table('set_modal_payment');
            $hasEffectiveDate = Schema::hasColumn('set_modal_payment', 'effective_date');
            $hasUpdatedAt = Schema::hasColumn('set_modal_payment', 'updated_at');
            $hasCreatedAt = Schema::hasColumn('set_modal_payment', 'created_at');
            if ($hasEffectiveDate) {
                $qModal->where('effective_date', $date)->orderByDesc('effective_date');
            } elseif ($hasUpdatedAt) {
                $qModal->orderByDesc('updated_at');
            } elseif ($hasCreatedAt) {
                $qModal->orderByDesc('created_at');
            }
            $row = $qModal->first();
            if ($row && isset($row->modal_awal)) {
                $modalAwal = (float) $row->modal_awal;
            }
        }

        return response()->json([
            'items' => $items,
            'summary' => [
                'modal_awal' => $modalAwal,
                'uang_masuk' => $uangMasuk,
                'total' => $modalAwal + $uangMasuk,
            ],
        ]);
    }

    public function setModalAwal(Request $request)
    {
        $modalAwal = (float) $request->input('modal_awal', 0);
        $effectiveDate = (string) $request->input('effective_date', date('Y-m-d'));

        if (! Schema::hasTable('set_modal_payment')) {
            return response()->json(['success' => true, 'message' => 'Tersimpan secara sementara'], 200);
        }

        $payload = ['modal_awal' => $modalAwal];
        if (Schema::hasColumn('set_modal_payment', 'effective_date')) {
            $payload['effective_date'] = $effectiveDate;
            DB::table('set_modal_payment')->updateOrInsert(['effective_date' => $effectiveDate], $payload);
        } elseif (Schema::hasColumn('set_modal_payment', 'id')) {
            DB::table('set_modal_payment')->updateOrInsert(['id' => 1], $payload);
        } else {
            $updated = DB::table('set_modal_payment')->update($payload);
            if ($updated === 0) {
                DB::table('set_modal_payment')->insert($payload);
            }
        }

        return response()->json(['success' => true]);
    }

    public function report(Request $request)
    {
        $data = $this->index($request)->getData(true);
        $items = $data['items'] ?? [];
        $summary = $data['summary'] ?? ['modal_awal' => 0, 'uang_masuk' => 0, 'total' => 0];

        $date = (string) $request->query('date', date('Y-m-d'));
        $shift = (string) $request->query('shift', 'Semua');

        $nama = '';
        $alamat = '';
        $kab = '';
        $prov = '';
        $kontak = '';
        $email = '';
        $logoUrl = null;

        if (Schema::hasTable('setting')) {
            $fields = [];
            foreach (['nama_instansi','alamat_instansi','kabupaten','propinsi','kontak','email','kode_ppk'] as $col) {
                if (Schema::hasColumn('setting', $col)) {
                    $fields[] = $col;
                }
            }
            if (! empty($fields)) {
                $qSet = DB::table('setting')->select($fields);
                if (Schema::hasColumn('setting', 'aktifkan')) {
                    $qSet->where('aktifkan', 'Yes');
                }
                $row = $qSet->first() ?: DB::table('setting')->select($fields)->first();
                if ($row) {
                    $nama = (string) ($row->nama_instansi ?? '');
                    $alamat = (string) ($row->alamat_instansi ?? '');
                    $kab = (string) ($row->kabupaten ?? '');
                    $prov = (string) ($row->propinsi ?? '');
                    $kontak = (string) ($row->kontak ?? '');
                    $email = (string) ($row->email ?? '');
                    if ($nama !== '') {
                        $logoUrl = '/setting/app/'.rawurlencode($nama).'/logo';
                    }
                }
            }
        }

        $html = '<html><head><meta charset="utf-8"><title>Payment Point Report</title>';
        $html .= '<style>body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,"Noto Sans",sans-serif;line-height:1.5;color:#111827;padding:24px} .letterhead{display:flex;align-items:center;gap:16px;border-bottom:2px solid #1f2937;padding-bottom:12px;margin-bottom:20px} .logo{width:72px;height:72px;object-fit:contain} .org{flex:1} .org h1{font-size:18px;font-weight:700;margin:0;color:#0f172a} .org p{margin:2px 0;font-size:12px;color:#374151} .title{text-align:center;font-size:16px;font-weight:600;margin:8px 0 16px;color:#0f172a} .meta{text-align:center;font-size:12px;color:#6b7280;margin-bottom:12px} table{width:100%;border-collapse:collapse;font-size:12px} thead th{background:#f3f4f6;color:#111827;text-align:left;padding:8px;border-bottom:1px solid #e5e7eb} tbody td{padding:8px;border-bottom:1px solid #f3f4f6} tbody tr:nth-child(even){background:#fafafa} tfoot td{padding:8px;font-weight:600} .summary{margin-top:16px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px} .card{background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:12px} .card .label{font-size:11px;color:#6b7280} .card .value{font-size:14px;font-weight:600;color:#111827} @media print{body{color:#000} .letterhead{border-color:#000} thead th{background:#eee !important;-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style>';
        $html .= '</head><body>';

        $html .= '<div class="letterhead">';
        if ($logoUrl) {
            $html .= '<img class="logo" src="'.htmlspecialchars($logoUrl, ENT_QUOTES).'" alt="Logo"/>';
        }
        $html .= '<div class="org">';
        if ($nama !== '') {
            $html .= '<h1>'.htmlspecialchars($nama, ENT_QUOTES).'</h1>';
        }
        $addrParts = array_filter([trim($alamat), trim($kab !== '' || $prov !== '' ? ($kab.' '.$prov) : '')]);
        if (! empty($addrParts)) {
            $html .= '<p>'.htmlspecialchars(implode(' • ', $addrParts), ENT_QUOTES).'</p>';
        }
        $contactParts = array_filter([trim($kontak), trim($email)]);
        if (! empty($contactParts)) {
            $html .= '<p>'.htmlspecialchars(implode(' • ', $contactParts), ENT_QUOTES).'</p>';
        }
        $html .= '</div>';
        $html .= '</div>';

        $html .= '<div class="title">Laporan Payment Point</div>';
        $html .= '<div class="meta">Tanggal: '.htmlspecialchars($date, ENT_QUOTES).' • Shift: '.htmlspecialchars($shift, ENT_QUOTES).'</div>';

        $html .= '<table><thead><tr>';
        $html .= '<th>No</th><th>Tanggal</th><th>Shift</th><th>No Nota</th><th>Nama Pasien</th><th>Pembayaran</th><th>Petugas</th>';
        $html .= '</tr></thead><tbody>';
        $i = 1;
        foreach ($items as $row) {
            $html .= '<tr>'
                .'<td>'.($i++).'</td>'
                .'<td>'.htmlspecialchars((string) ($row['tanggal'] ?? ''), ENT_QUOTES).'</td>'
                .'<td>'.htmlspecialchars((string) ($row['shift'] ?? ''), ENT_QUOTES).'</td>'
                .'<td>'.htmlspecialchars((string) ($row['no_nota'] ?? ''), ENT_QUOTES).'</td>'
                .'<td>'.htmlspecialchars((string) ($row['nama_pasien'] ?? ''), ENT_QUOTES).'</td>'
                .'<td>'.number_format((float) ($row['pembayaran'] ?? 0), 2, ',', '.').'</td>'
                .'<td>'.htmlspecialchars((string) ($row['petugas'] ?? ''), ENT_QUOTES).'</td>'
                .'</tr>';
        }
        $html .= '</tbody></table>';

        $html .= '<div class="summary">';
        $html .= '<div class="card"><div class="label">Modal Awal</div><div class="value">'.number_format((float) ($summary['modal_awal'] ?? 0), 2, ',', '.').'</div></div>';
        $html .= '<div class="card"><div class="label">Uang Masuk</div><div class="value">'.number_format((float) ($summary['uang_masuk'] ?? 0), 2, ',', '.').'</div></div>';
        $html .= '<div class="card"><div class="label">Total</div><div class="value">'.number_format((float) ($summary['total'] ?? 0), 2, ',', '.').'</div></div>';
        $html .= '</div>';

        $html .= '</body></html>';
        return response($html, 200)->header('Content-Type', 'text/html; charset=utf-8');
    }
}
