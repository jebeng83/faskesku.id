<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Jobs\PcareResendJob;
use App\Http\Controllers\Pcare\PcareController;
use Illuminate\Http\Request;

class PcareResendCommand extends Command
{
    protected $signature = 'pcare:resend {no_rawat?*} {--sync} {--start=} {--end=} {--status=} {--list}';

    protected $description = 'Kirim ulang PCare berdasarkan no_rawat';

    public function handle(): int
    {
        $start = (string) $this->option('start');
        $end = (string) $this->option('end');
        $status = (string) $this->option('status');
        $listMode = (bool) $this->option('list');

        if ($listMode || $start !== '' || $end !== '' || $status !== '') {
            $controller = new PcareController();
            $req = Request::create('/pcare/monitoring/attempts', 'GET', [
                'start' => $start,
                'end' => $end,
                'status' => $status,
            ]);
            $res = $controller->monitoringAttempts($req);
            $json = $res->getContent();
            $data = json_decode($json, true);
            $rows = is_array($data) && isset($data['data']) && is_array($data['data']) ? $data['data'] : [];
            if (empty($rows)) {
                $this->warn('Tidak ada data pada rentang yang diberikan');
                return 0;
            }
            $this->table([
                'Tanggal', 'No Rawat', 'Nama', 'No RM', 'Poli', 'Nama Poli', 'Dokter', 'Status', 'No Kunjungan'
            ], array_map(function ($r) {
                return [
                    (string) ($r['tglDaftar'] ?? ''),
                    (string) ($r['no_rawat'] ?? ''),
                    (string) ($r['nama'] ?? ''),
                    (string) ($r['no_rkm_medis'] ?? ''),
                    (string) ($r['kdPoli'] ?? ''),
                    (string) ($r['nmPoli'] ?? ''),
                    (string) ($r['dokter'] ?? ''),
                    (string) ($r['status'] ?? ''),
                    (string) ($r['noKunjungan'] ?? ''),
                ];
            }, $rows));
            return 0;
        }

        $list = (array) $this->argument('no_rawat');
        if (empty($list)) {
            if (Schema::hasTable('pcare_kunjungan_umum')) {
                $list = DB::table('pcare_kunjungan_umum')->where('status', 'Gagal')->orderBy('tglDaftar')->limit(10)->pluck('no_rawat')->all();
            } else {
                $list = DB::table('reg_periksa')->where('status_pcare', 'failed')->orderBy('tgl_registrasi')->limit(10)->pluck('no_rawat')->all();
            }
        }

        if (empty($list)) {
            $this->error('Tidak ada data untuk dikirim ulang');
            return 1;
        }

        $sync = (bool) $this->option('sync');
        foreach ($list as $noRawat) {
            $noRawat = (string) $noRawat;
            if ($sync) {
                PcareResendJob::dispatchSync($noRawat);
                $this->info('Selesai: '.$noRawat);
            } else {
                PcareResendJob::dispatch($noRawat);
                $this->line('Diantrikan: '.$noRawat);
            }
        }

        return 0;
    }
}
