<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class BillingDedupCommand extends Command
{
    protected $signature = 'akutansi:billing-dedup {no_rawat} {--apply : Apply deletion, otherwise dry-run}';

    protected $description = 'Hapus duplikat billing untuk satu no_rawat berdasarkan kunci gabungan (no,status,tgl_byr,nm_perawatan,biaya,jumlah,tambahan)';

    public function handle(): int
    {
        $noRawat = (string) $this->argument('no_rawat');
        $apply = (bool) $this->option('apply');

        $rows = DB::table('billing')
            ->where('no_rawat', $noRawat)
            ->orderBy('noindex')
            ->get();

        if ($rows->isEmpty()) {
            $this->warn("Tidak ada data billing untuk no_rawat: {$noRawat}");
            return self::SUCCESS;
        }

        $this->info("Total baris awal: " . $rows->count());

        $groups = [];
        foreach ($rows as $r) {
            $key = implode('_', [
                trim((string)($r->no ?? '')),
                trim((string)($r->status ?? '-')),
                trim((string)($r->tgl_byr ?? '')),
                trim((string)($r->nm_perawatan ?? '')),
                number_format((float)($r->biaya ?? 0), 2, '.', ''),
                number_format((float)($r->jumlah ?? 0), 2, '.', ''),
                number_format((float)($r->tambahan ?? 0), 2, '.', ''),
            ]);
            $groups[$key] = $groups[$key] ?? [];
            $groups[$key][] = $r;
        }

        $deleteNos = [];
        $duplicateCount = 0;
        foreach ($groups as $key => $items) {
            if (count($items) > 1) {
                $duplicateCount += (count($items) - 1);
                // Keep the smallest noindex, delete the rest
                usort($items, function ($a, $b) { return ($a->noindex <=> $b->noindex); });
                $keep = $items[0];
                $toDelete = array_slice($items, 1);
                foreach ($toDelete as $d) {
                    $deleteNos[] = (int) $d->noindex;
                }
                $this->line(sprintf(
                    "DUPE: key=%s | keep noindex=%d | delete=%s",
                    $key,
                    (int) $keep->noindex,
                    implode(',', array_map(fn($x) => (string) $x->noindex, $toDelete))
                ));
            }
        }

        $this->info("Total baris duplikat (akan dihapus): " . count($deleteNos));

        $grandTotalBefore = (float) DB::table('billing')->where('no_rawat', $noRawat)->sum('totalbiaya');
        $this->info("Grand total sebelum: " . number_format($grandTotalBefore, 2, '.', ''));

        if ($apply && !empty($deleteNos)) {
            DB::transaction(function () use ($deleteNos) {
                DB::table('billing')->whereIn('noindex', $deleteNos)->delete();
            });
            $this->info("Penghapusan dilakukan untuk noindex: " . implode(',', $deleteNos));
        } else {
            $this->warn("Dry-run: tidak ada penghapusan dilakukan. Tambahkan opsi --apply untuk menghapus.");
        }

        $rowsAfter = DB::table('billing')->where('no_rawat', $noRawat)->count();
        $grandTotalAfter = (float) DB::table('billing')->where('no_rawat', $noRawat)->sum('totalbiaya');
        $this->info("Total baris sesudah: {$rowsAfter}");
        $this->info("Grand total sesudah: " . number_format($grandTotalAfter, 2, '.', ''));

        return self::SUCCESS;
    }
}

