<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\PeriksaLab;
use App\Models\TemplateLaboratorium;
use Carbon\Carbon;

class LabInspect extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lab:inspect {no_rawat}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Tampilkan data pemeriksaan lab dan template berdasarkan no_rawat';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $noRawat = $this->argument('no_rawat');

        $lab = PeriksaLab::with(['detailPemeriksaan', 'regPeriksa.patient'])->find($noRawat);
        if (!$lab) {
            $this->error('PeriksaLab tidak ditemukan untuk no_rawat: ' . $noRawat);
            return self::FAILURE;
        }

        $this->info('no_rawat           : ' . $noRawat);
        $this->info('kd_jenis_prw       : ' . ($lab->kd_jenis_prw ?? '-'));
        $this->info('jumlah detail      : ' . $lab->detailPemeriksaan->count());

        $jk = optional($lab->regPeriksa->patient)->jk;
        $umur = optional($lab->regPeriksa->patient)->tgl_lahir
            ? Carbon::parse($lab->regPeriksa->patient->tgl_lahir)->diffInYears(Carbon::parse($lab->tgl_periksa ?? now()))
            : null;

        $this->info('pasien jk/umur     : ' . ($jk ?? '-') . ' / ' . ($umur ?? '-'));

        $this->line('--- TemplateLaboratorium (contoh max 20) ---');
        $templates = TemplateLaboratorium::byJenisPemeriksaan($lab->kd_jenis_prw)
            ->ordered()
            ->take(20)
            ->get();

        if ($templates->isEmpty()) {
            $this->warn('Tidak ada template untuk kd_jenis_prw: ' . $lab->kd_jenis_prw);
        } else {
            foreach ($templates as $t) {
                $nr = $t->getNilaiRujukan($jk, $umur);
                $this->line(sprintf(
                    '- %s | satuan: %s | nilai_rujukan: %s',
                    $t->Pemeriksaan,
                    $t->satuan,
                    $nr
                ));
            }
        }

        return self::SUCCESS;
    }
}

