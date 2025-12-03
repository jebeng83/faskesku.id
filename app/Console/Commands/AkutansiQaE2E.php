<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * QA/E2E Akuntansi untuk memastikan kesesuaian blueprint di modul Rawat Jalan (Ralan).
 *
 * Fitur utama:
 * - Validasi mapping COA pada set_akun_ralan (ketersediaan kd_rek untuk key kunci)
 * - Deteksi tindakan ralan (rawat_jl_dr/pr/drpr) berdasarkan no_rawat atau rekam terakhir
 * - Hitung komposisi tampjurnal yang diharapkan sesuai blueprint (Suspen, Pendapatan, Beban/Utang, HPP/Persediaan)
 * - Periksa keberadaan jurnal dengan no_bukti = no_rawat dan keseimbangan debet = kredit
 * - TIDAK memodifikasi data; hanya diagnostik (read-only)
 */
class AkutansiQaE2E extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'akutansi:qa-e2e {no_rawat? : No. rawat untuk diuji} {--mode=auto : Pilih dr|pr|drpr|auto} {--limit=1 : Jumlah record yang dianalisis per tabel}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Menjalankan QA/E2E diagnostik akuntansi untuk tindakan Ralan (Suspen, Pendapatan, Beban/Utang, HPP/Persediaan)';

    public function handle(): int
    {
        $noRawat = $this->argument('no_rawat');
        $mode = strtolower((string) $this->option('mode')) ?: 'auto';
        $limit = (int) $this->option('limit') ?: 1;

        $this->info('=== QA/E2E Akuntansi Ralan ===');
        $this->line('Mode: '.$mode.' | no_rawat: '.($noRawat ?: '-')." | limit: {$limit}");

        // 1) Validasi tabel penting
        $requiredTables = ['set_akun_ralan', 'rekening', 'jns_perawatan', 'rawat_jl_dr', 'rawat_jl_pr', 'rawat_jl_drpr', 'tampjurnal', 'jurnal', 'detailjurnal'];
        foreach ($requiredTables as $t) {
            if (! Schema::hasTable($t)) {
                $this->warn("⚠ Tabel {$t} tidak ditemukan. QA/E2E akan terbatas.");
            } else {
                $this->info("✓ Tabel {$t} tersedia");
            }
        }

        // 2) Validasi mapping COA kunci di set_akun_ralan
        $mapping = Schema::hasTable('set_akun_ralan') ? DB::table('set_akun_ralan')->first() : null;
        $requiredKeys = [
            'Suspen_Piutang_Tindakan_Ralan',
            'Tindakan_Ralan',
            'Beban_Jasa_Medik_Dokter_Tindakan_Ralan',
            'Utang_Jasa_Medik_Dokter_Tindakan_Ralan',
            'Beban_Jasa_Medik_Paramedis_Tindakan_Ralan',
            'Utang_Jasa_Medik_Paramedis_Tindakan_Ralan',
            'Beban_KSO_Tindakan_Ralan',
            'Utang_KSO_Tindakan_Ralan',
            'Beban_Jasa_Sarana_Tindakan_Ralan',
            'Utang_Jasa_Sarana_Tindakan_Ralan',
            'HPP_BHP_Tindakan_Ralan',
            'Persediaan_BHP_Tindakan_Ralan',
            'Beban_Jasa_Menejemen_Tindakan_Ralan',
            'Utang_Jasa_Menejemen_Tindakan_Ralan',
        ];
        if ($mapping) {
            $this->line('\n-- Validasi Mapping COA (set_akun_ralan) --');
            $rows = [];
            foreach ($requiredKeys as $key) {
                $val = $mapping->{$key} ?? null;
                $exists = $val && DB::table('rekening')->where('kd_rek', $val)->exists();
                $rows[] = [$key, $val ?: '-', $exists ? 'OK' : 'MISSING'];
            }
            $this->table(['Key', 'kd_rek', 'Status'], $rows);
        } else {
            $this->warn('⚠ Tidak bisa memuat mapping set_akun_ralan');
        }

        // 3) Ambil data tindakan (rawat_jl_*)
        $this->line('\n-- Deteksi Tindakan Ralan --');
        $targets = [];
        try {
            if ($mode === 'auto' || $mode === 'dr') {
                $q = DB::table('rawat_jl_dr')->orderByDesc('tgl_perawatan')->orderByDesc('jam_rawat');
                if ($noRawat) {
                    $q->where('no_rawat', $noRawat);
                }
                $targets['dr'] = $q->limit($limit)->get();
            }
            if ($mode === 'auto' || $mode === 'pr') {
                $q = DB::table('rawat_jl_pr')->orderByDesc('tgl_perawatan')->orderByDesc('jam_rawat');
                if ($noRawat) {
                    $q->where('no_rawat', $noRawat);
                }
                $targets['pr'] = $q->limit($limit)->get();
            }
            if ($mode === 'auto' || $mode === 'drpr') {
                $q = DB::table('rawat_jl_drpr')->orderByDesc('tgl_perawatan')->orderByDesc('jam_rawat');
                if ($noRawat) {
                    $q->where('no_rawat', $noRawat);
                }
                $targets['drpr'] = $q->limit($limit)->get();
            }
        } catch (\Throwable $e) {
            $this->error('Gagal mengambil tindakan: '.$e->getMessage());
        }

        foreach ($targets as $type => $rows) {
            if (empty($rows)) {
                $this->warn("Tidak ada data tindakan untuk {$type}");

                continue;
            }
            $this->info("\nAnalisis tindakan: {$type}");
            foreach ($rows as $row) {
                $this->analyzeTindakanRow($type, (array) $row, $mapping);
            }
        }

        $this->info("\nSelesai QA/E2E diagnostik. Lihat hasil di atas.");

        return 0;
    }

    /**
     * Analisis satu baris tindakan dan tampilkan komposisi jurnal yang diharapkan.
     */
    protected function analyzeTindakanRow(string $type, array $row, $mapping): void
    {
        $noRawat = $row['no_rawat'] ?? '-';
        $kdJenis = $row['kd_jenis_prw'] ?? null;
        $tgl = $row['tgl_perawatan'] ?? null;
        $jam = $row['jam_rawat'] ?? null;
        $this->line("No.Rawat: {$noRawat} | kd_jenis_prw: {$kdJenis} | {$tgl} {$jam}");

        // Ambil jenis perawatan untuk komponen biaya
        $jenis = $kdJenis ? DB::table('jns_perawatan')->where('kd_jenis_prw', $kdJenis)->first() : null;
        $material = (float) ($jenis->material ?? 0);
        $bhp = (float) ($jenis->bhp ?? 0);
        $tarifDr = (float) ($jenis->tarif_tindakandr ?? ($row['tarif_tindakandr'] ?? 0));
        $tarifPr = (float) ($jenis->tarif_tindakanpr ?? ($row['tarif_tindakanpr'] ?? 0));
        $kso = (float) ($jenis->kso ?? 0);
        $manajemen = (float) ($jenis->menejemen ?? 0);
        $biayaRawat = (float) ($row['biaya_rawat'] ?? $jenis->total_byrdr ?? $jenis->total_byrpr ?? $jenis->total_byrdrpr ?? 0);

        // Komposisi jurnal yang diharapkan (ringkas)
        $expected = [];
        // Suspen vs Pendapatan
        $expected[] = ['kd_rek' => $mapping->Suspen_Piutang_Tindakan_Ralan ?? null, 'nm_pos' => 'Suspen Piutang Tindakan Ralan', 'debet' => $biayaRawat, 'kredit' => 0];
        $expected[] = ['kd_rek' => $mapping->Tindakan_Ralan ?? null, 'nm_pos' => 'Pendapatan Tindakan Ralan', 'debet' => 0, 'kredit' => $biayaRawat];
        // Beban/Utang Jasa Medik Dokter
        if ($tarifDr > 0) {
            $expected[] = ['kd_rek' => $mapping->Beban_Jasa_Medik_Dokter_Tindakan_Ralan ?? null, 'nm_pos' => 'Beban Jasa Medik Dokter', 'debet' => $tarifDr, 'kredit' => 0];
            $expected[] = ['kd_rek' => $mapping->Utang_Jasa_Medik_Dokter_Tindakan_Ralan ?? null, 'nm_pos' => 'Utang Jasa Medik Dokter', 'debet' => 0, 'kredit' => $tarifDr];
        }
        // Beban/Utang Jasa Medik Paramedis
        if ($tarifPr > 0) {
            $expected[] = ['kd_rek' => $mapping->Beban_Jasa_Medik_Paramedis_Tindakan_Ralan ?? null, 'nm_pos' => 'Beban Jasa Medik Paramedis', 'debet' => $tarifPr, 'kredit' => 0];
            $expected[] = ['kd_rek' => $mapping->Utang_Jasa_Medik_Paramedis_Tindakan_Ralan ?? null, 'nm_pos' => 'Utang Jasa Medik Paramedis', 'debet' => 0, 'kredit' => $tarifPr];
        }
        // Beban/Utang KSO
        if ($kso > 0) {
            $expected[] = ['kd_rek' => $mapping->Beban_KSO_Tindakan_Ralan ?? null, 'nm_pos' => 'Beban KSO', 'debet' => $kso, 'kredit' => 0];
            $expected[] = ['kd_rek' => $mapping->Utang_KSO_Tindakan_Ralan ?? null, 'nm_pos' => 'Utang KSO', 'debet' => 0, 'kredit' => $kso];
        }
        // Beban/Utang Manajemen
        if ($manajemen > 0) {
            $expected[] = ['kd_rek' => $mapping->Beban_Jasa_Menejemen_Tindakan_Ralan ?? null, 'nm_pos' => 'Beban Jasa Manajemen', 'debet' => $manajemen, 'kredit' => 0];
            $expected[] = ['kd_rek' => $mapping->Utang_Jasa_Menejemen_Tindakan_Ralan ?? null, 'nm_pos' => 'Utang Jasa Manajemen', 'debet' => 0, 'kredit' => $manajemen];
        }
        // HPP/Persediaan BHP (material+bhp dianggap BHP)
        $hpp = $material + $bhp;
        if ($hpp > 0) {
            $expected[] = ['kd_rek' => $mapping->HPP_BHP_Tindakan_Ralan ?? null, 'nm_pos' => 'HPP BHP', 'debet' => $hpp, 'kredit' => 0];
            $expected[] = ['kd_rek' => $mapping->Persediaan_BHP_Tindakan_Ralan ?? null, 'nm_pos' => 'Persediaan BHP', 'debet' => 0, 'kredit' => $hpp];
        }

        // Tampilkan komposisi yang diharapkan
        $this->table(['kd_rek', 'Pos', 'Debet', 'Kredit'], array_map(function ($x) {
            $x['kd_rek'] = $x['kd_rek'] ?: '-';
            $x['debet'] = number_format((float) $x['debet'], 2, '.', ',');
            $x['kredit'] = number_format((float) $x['kredit'], 2, '.', ',');

            return $x;
        }, $expected));

        // Validasi keseimbangan teoretis
        $sumDebet = array_sum(array_map(fn ($x) => (float) $x['debet'], $expected));
        $sumKredit = array_sum(array_map(fn ($x) => (float) $x['kredit'], $expected));
        $balanced = abs($sumDebet - $sumKredit) < 0.0001;
        $this->info(sprintf('Teoretis Debet: %s | Kredit: %s | %s',
            number_format($sumDebet, 2, '.', ','),
            number_format($sumKredit, 2, '.', ','),
            $balanced ? 'SEIMBANG' : 'TIDAK SEIMBANG')
        );

        // 4) Cek jurnal terkait di DB
        if (Schema::hasTable('jurnal')) {
            $journals = DB::table('jurnal')->where('no_bukti', $noRawat)->orderByDesc('tgl_jurnal')->limit(5)->get();
            if ($journals->isEmpty()) {
                $this->warn("⚠ Belum ada jurnal dengan no_bukti = {$noRawat}");
                $this->line('Rekomendasi: Implementasikan Single Posting Point saat simpan tindakan untuk memanggil JurnalPostingService.');
            } else {
                $this->info('✓ Ditemukan jurnal terkait (top 5):');
                foreach ($journals as $j) {
                    $dj = DB::table('detailjurnal')->where('no_jurnal', $j->no_jurnal)->selectRaw('SUM(debet) AS debet, SUM(kredit) AS kredit')->first();
                    $this->line(sprintf('- %s | %s %s | Debet=%s Kredit=%s',
                        $j->no_jurnal,
                        $j->tgl_jurnal,
                        $j->jam_jurnal ?? '-',
                        number_format((float) ($dj->debet ?? 0), 2, '.', ','),
                        number_format((float) ($dj->kredit ?? 0), 2, '.', ',')
                    ));
                }
            }
        }
    }
}
