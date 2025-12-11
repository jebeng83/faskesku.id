<?php

namespace App\Services\Akutansi;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

/**
 * Service untuk Single Posting Point jurnal akuntansi dari staging tampjurnal → jurnal/detailjurnal.
 *
 * Alur:
 * - preview(): mengembalikan ringkasan dan baris staging, termasuk cek keseimbangan Debet=Kredit.
 * - post(): validasi keseimbangan, generate nomor jurnal harian, tulis header dan detail, kosongkan tampjurnal.
 */
class JurnalPostingService
{
    /**
     * Ambil ringkasan isi staging tampjurnal + tampjurnal2 beserta daftar barisnya (digabung per kd_rek).
     *
     * @return array{meta: array{jml:int,tanggal:string,jam:string,debet:float,kredit:float,balanced:bool}, lines: array<int, array{kd_rek:string,nm_rek:string|null,debet:float,kredit:float}>}
     */
    public function preview(): array
    {
        // Ringkasan masing-masing staging
        $s1 = DB::table('tampjurnal')
            ->selectRaw('COUNT(*) AS jml, SUM(COALESCE(debet,0)) AS debet, SUM(COALESCE(kredit,0)) AS kredit')
            ->first();
        $s2 = DB::table('tampjurnal2')
            ->selectRaw('COUNT(*) AS jml, SUM(COALESCE(debet,0)) AS debet, SUM(COALESCE(kredit,0)) AS kredit')
            ->first();

        $jml = (int) (($s1->jml ?? 0) + ($s2->jml ?? 0));
        $debet = (float) (($s1->debet ?? 0) + ($s2->debet ?? 0));
        $kredit = (float) (($s1->kredit ?? 0) + ($s2->kredit ?? 0));
        $balanced = (round($debet, 2) === round($kredit, 2)) && $debet > 0 && $kredit > 0;

        // Ambil baris dari kedua staging lalu gabungkan per kd_rek
        $rows1 = DB::table('tampjurnal')
            ->select(['kd_rek', DB::raw('COALESCE(debet,0) AS debet'), DB::raw('COALESCE(kredit,0) AS kredit')])
            ->get();
        $rows2 = DB::table('tampjurnal2')
            ->select(['kd_rek', DB::raw('COALESCE(debet,0) AS debet'), DB::raw('COALESCE(kredit,0) AS kredit')])
            ->get();

        $all = $rows1->concat($rows2)
            ->groupBy('kd_rek')
            ->map(function ($group) {
                $deb = 0.0;
                $kre = 0.0;
                foreach ($group as $r) {
                    $deb += (float) ($r->debet ?? 0);
                    $kre += (float) ($r->kredit ?? 0);
                }

                return [
                    'kd_rek' => (string) ($group[0]->kd_rek ?? ''),
                    'debet' => $deb,
                    'kredit' => $kre,
                ];
            })
            ->values();

        // Lengkapi nm_rek dari master rekening jika tersedia
        $kdList = $all->map(fn ($r) => $r['kd_rek'])->filter()->values()->all();
        $nmMap = empty($kdList) ? [] : DB::table('rekening')->whereIn('kd_rek', $kdList)->pluck('nm_rek', 'kd_rek')->all();

        $lines = $all->map(function ($r) use ($nmMap) {
            return [
                'kd_rek' => $r['kd_rek'],
                'nm_rek' => $nmMap[$r['kd_rek']] ?? null,
                'debet' => (float) $r['debet'],
                'kredit' => (float) $r['kredit'],
            ];
        })->sortBy('kd_rek')->values()->all();

        return [
            'meta' => [
                'jml' => $jml,
                'tanggal' => Carbon::today()->format('Y-m-d'),
                'jam' => Carbon::now()->format('H:i:s'),
                'debet' => $debet,
                'kredit' => $kredit,
                'balanced' => $balanced,
            ],
            'lines' => $lines,
        ];
    }

    /**
     * Posting isi tampjurnal ke jurnal/detailjurnal dalam satu transaksi.
     *
     * @param  string|null  $tgl_jurnal  Format Y-m-d; default hari ini
     * @return array{no_jurnal:string}
     *
     * @throws \Throwable
     */
    public function post(?string $no_bukti = null, ?string $keterangan = null, ?string $tgl_jurnal = null): array
    {
        // Ambil ringkasan dari kedua staging untuk validasi
        $s1 = DB::table('tampjurnal')
            ->selectRaw('COUNT(*) AS jml, SUM(COALESCE(debet,0)) AS debet, SUM(COALESCE(kredit,0)) AS kredit')
            ->first();
        $s2 = DB::table('tampjurnal2')
            ->selectRaw('COUNT(*) AS jml, SUM(COALESCE(debet,0)) AS debet, SUM(COALESCE(kredit,0)) AS kredit')
            ->first();

        $jml = (int) (($s1->jml ?? 0) + ($s2->jml ?? 0));
        $debet = (float) (($s1->debet ?? 0) + ($s2->debet ?? 0));
        $kredit = (float) (($s1->kredit ?? 0) + ($s2->kredit ?? 0));

        if ($jml <= 0) {
            throw new \RuntimeException('Staging tampjurnal/tampjurnal2 kosong. Tidak ada baris untuk diposting.');
        }
        if (round($debet, 2) <= 0 || round($kredit, 2) <= 0) {
            throw new \RuntimeException('Nominal debet/kredit harus > 0.');
        }
        if (round($debet, 2) !== round($kredit, 2)) {
            throw new \RuntimeException('Total Debet dan Kredit gabungan tidak sama. Periksa komposisi tampjurnal/tampjurnal2.');
        }

        $tgl = $tgl_jurnal ?: Carbon::today()->format('Y-m-d');
        $jam = Carbon::now()->format('H:i:s');
        $jenis = 'P'; // posted dari transaksi

        return DB::transaction(function () use ($tgl, $jam, $jenis, $no_bukti, $keterangan) {
            // Generate nomor jurnal harian: JR + yyyymmdd + 6 digit urut
            $prefix = 'JR'.str_replace('-', '', $tgl);
            $driver = DB::connection()->getDriverName();
            $expr = $driver === 'sqlite'
                ? 'IFNULL(MAX(CAST(SUBSTR(no_jurnal, -6) AS INTEGER)),0)'
                : 'IFNULL(MAX(CONVERT(RIGHT(no_jurnal,6),SIGNED)),0)';
            $max = DB::table('jurnal')
                ->lockForUpdate()
                ->where('tgl_jurnal', $tgl)
                ->select(DB::raw($expr.' AS max_no'))
                ->value('max_no');
            $next = ((int) $max) + 1;
            $noSuffix = str_pad((string) $next, 6, '0', STR_PAD_LEFT);
            $noJurnal = $prefix.$noSuffix;

            // Header jurnal
            DB::table('jurnal')->insert([
                'no_jurnal' => $noJurnal,
                'no_bukti' => $no_bukti,
                'tgl_jurnal' => $tgl,
                'jam_jurnal' => $jam,
                'jenis' => $jenis,
                'keterangan' => $keterangan ?? 'Posting otomatis dari tampjurnal/tampjurnal2',
            ]);

            // Ambil detail dari kedua staging dan gabungkan per kd_rek untuk menghindari duplikasi baris
            $rows1 = DB::table('tampjurnal')
                ->select(['kd_rek', DB::raw('COALESCE(debet,0) AS debet'), DB::raw('COALESCE(kredit,0) AS kredit')])
                ->get();
            $rows2 = DB::table('tampjurnal2')
                ->select(['kd_rek', DB::raw('COALESCE(debet,0) AS debet'), DB::raw('COALESCE(kredit,0) AS kredit')])
                ->get();

            $grouped = $rows1->concat($rows2)
                ->groupBy('kd_rek')
                ->map(function ($group) {
                    $deb = 0.0;
                    $kre = 0.0;
                    foreach ($group as $r) {
                        $deb += (float) ($r->debet ?? 0);
                        $kre += (float) ($r->kredit ?? 0);
                    }

                    return [
                        'kd_rek' => (string) ($group[0]->kd_rek ?? ''),
                        'debet' => $deb,
                        'kredit' => $kre,
                    ];
                })
                ->values();

            $detailRows = [];
            foreach ($grouped as $r) {
                $detailRows[] = [
                    'no_jurnal' => $noJurnal,
                    'kd_rek' => (string) $r['kd_rek'],
                    'debet' => (float) ($r['debet'] ?? 0),
                    'kredit' => (float) ($r['kredit'] ?? 0),
                ];
            }
            if (! empty($detailRows)) {
                DB::table('detailjurnal')->insert($detailRows);
            }

            // Kosongkan kedua staging setelah sukses
            DB::table('tampjurnal')->delete();
            DB::table('tampjurnal2')->delete();

            return ['no_jurnal' => $noJurnal];
        });
    }
}
