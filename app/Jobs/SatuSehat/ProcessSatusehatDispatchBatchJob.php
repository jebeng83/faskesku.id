<?php

namespace App\Jobs\SatuSehat;

use App\Services\SatuSehat\EncounterService;
use App\Services\SatuSehat\RajalPipelineService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class ProcessSatusehatDispatchBatchJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $batchId;

    public function __construct(int $batchId)
    {
        $this->batchId = $batchId;
    }

    public function handle(EncounterService $encounterService, RajalPipelineService $pipelineService): void
    {
        $batchesOk = Schema::hasTable('satusehat_dispatch_batches');
        $itemsOk = Schema::hasTable('satusehat_dispatch_items');
        if (! $batchesOk || ! $itemsOk) {
            Log::channel('daily')->warning('[SATUSEHAT][DispatchBatchJob] dispatch tables missing', [
                'batch_id' => $this->batchId,
                'satusehat_dispatch_batches_missing' => ! $batchesOk,
                'satusehat_dispatch_items_missing' => ! $itemsOk,
            ]);

            return;
        }

        $batch = DB::table('satusehat_dispatch_batches')->where('id', $this->batchId)->first();
        if (! $batch) {
            return;
        }

        $batchStatus = strtolower(trim((string) ($batch->status ?? 'pending')));
        if (in_array($batchStatus, ['finished', 'cancelled'], true)) {
            return;
        }

        if ($batchStatus === 'pending') {
            DB::table('satusehat_dispatch_batches')->where('id', $this->batchId)->update([
                'status' => 'running',
                'started_at' => now(),
                'last_error' => null,
                'updated_at' => now(),
            ]);
        }

        $item = DB::table('satusehat_dispatch_items as i')
            ->where('i.batch_id', $this->batchId)
            ->where('i.status', 'pending')
            ->where(function ($q) {
                $q->whereNull('i.next_run_at')->orWhere('i.next_run_at', '<=', now());
            })
            ->whereNotExists(function ($q) {
                $q->select(DB::raw(1))
                    ->from('satusehat_dispatch_items as p')
                    ->whereColumn('p.batch_id', 'i.batch_id')
                    ->whereColumn('p.no_rawat', 'i.no_rawat')
                    ->whereColumn('p.step_order', '<', 'i.step_order')
                    ->where('p.status', '!=', 'done');
            })
            ->orderBy('i.no_rawat')
            ->orderBy('i.step_order')
            ->orderBy('i.id')
            ->first();

        if (! $item) {
            $counts = [
                'done' => (int) DB::table('satusehat_dispatch_items')->where('batch_id', $this->batchId)->where('status', 'done')->count(),
                'failed' => (int) DB::table('satusehat_dispatch_items')->where('batch_id', $this->batchId)->where('status', 'failed')->count(),
                'pending' => (int) DB::table('satusehat_dispatch_items')->where('batch_id', $this->batchId)->where('status', 'pending')->count(),
                'processing' => (int) DB::table('satusehat_dispatch_items')->where('batch_id', $this->batchId)->where('status', 'processing')->count(),
            ];

            DB::table('satusehat_dispatch_batches')->where('id', $this->batchId)->update([
                'done_items' => $counts['done'],
                'failed_items' => $counts['failed'],
                'status' => ($counts['pending'] === 0 && $counts['processing'] === 0) ? 'finished' : 'running',
                'finished_at' => ($counts['pending'] === 0 && $counts['processing'] === 0) ? now() : null,
                'updated_at' => now(),
            ]);

            return;
        }

        DB::table('satusehat_dispatch_items')->where('id', $item->id)->update([
            'status' => 'processing',
            'attempts' => (int) ($item->attempts ?? 0) + 1,
            'started_at' => now(),
            'finished_at' => null,
            'last_error' => null,
            'updated_at' => now(),
        ]);

        $ok = false;
        $response = null;
        $errorText = null;

        try {
            $step = (string) ($item->step ?? '');
            $noRawat = (string) ($item->no_rawat ?? '');
            $intervalSeconds = (int) ($batch->interval_seconds ?? 3);
            $tzOffset = '+07:00';

            if ($step === 'encounter_create') {
                $existing = DB::table('satusehat_encounter')->where('no_rawat', $noRawat)->first(['satusehat_id']);
                $existingId = $existing ? trim((string) ($existing->satusehat_id ?? '')) : '';
                if ($existingId !== '') {
                    $response = [
                        'ok' => true,
                        'skipped' => true,
                        'encounter_id' => $existingId,
                        'no_rawat' => $noRawat,
                    ];
                    $ok = true;
                } else {
                    $response = $encounterService->createEncounter($noRawat, true);
                    $ok = is_array($response) && isset($response['id']);
                    if (! $ok && is_array($response) && isset($response['reason'])) {
                        $errorText = (string) $response['reason'];
                    }
                }
            } elseif ($step === 'encounter_finish') {
                $encRow = DB::table('satusehat_encounter')->where('no_rawat', $noRawat)->first(['satusehat_id']);
                $encounterId = $encRow ? trim((string) ($encRow->satusehat_id ?? '')) : '';
                if ($encounterId === '') {
                    $legacy = DB::table('satu_sehat_encounter')->where('no_rawat', $noRawat)->first(['id_encounter_2', 'id_encounter']);
                    if ($legacy) {
                        $encounterId = trim((string) ($legacy->id_encounter_2 ?? '')) ?: trim((string) ($legacy->id_encounter ?? ''));
                    }
                }

                if ($encounterId === '') {
                    throw new \RuntimeException('Encounter ID tidak ditemukan untuk no_rawat');
                }

                $response = $pipelineService->updateEncounterByRawat($noRawat, $encounterId, 'finished', $tzOffset, '', false);
                $ok = (bool) ($response['ok'] ?? false);
                if (! $ok) {
                    $errorText = (string) ($response['message'] ?? ($response['error'] ?? 'Gagal update Encounter'));
                }
            } elseif ($step === 'rajal_pipeline') {
                $response = $pipelineService->pipelineByRawat($noRawat, $tzOffset);
                $ok = (bool) ($response['ok'] ?? false);
                if (! $ok) {
                    $errorText = (string) ($response['message'] ?? ($response['error'] ?? 'Gagal menjalankan pipeline rajal'));
                }
            } else {
                throw new \RuntimeException('Step tidak dikenali: '.$step);
            }

            DB::table('satusehat_dispatch_items')->where('id', $item->id)->update([
                'status' => $ok ? 'done' : 'failed',
                'finished_at' => now(),
                'last_error' => $ok ? null : ($errorText ?: 'Unknown error'),
                'response_json' => is_array($response) ? json_encode($response, JSON_UNESCAPED_UNICODE) : (is_string($response) ? $response : null),
                'next_run_at' => null,
                'updated_at' => now(),
            ]);

            $done = (int) DB::table('satusehat_dispatch_items')->where('batch_id', $this->batchId)->where('status', 'done')->count();
            $failed = (int) DB::table('satusehat_dispatch_items')->where('batch_id', $this->batchId)->where('status', 'failed')->count();
            $pending = (int) DB::table('satusehat_dispatch_items')->where('batch_id', $this->batchId)->where('status', 'pending')->count();
            $processing = (int) DB::table('satusehat_dispatch_items')->where('batch_id', $this->batchId)->where('status', 'processing')->count();

            DB::table('satusehat_dispatch_batches')->where('id', $this->batchId)->update([
                'done_items' => $done,
                'failed_items' => $failed,
                'last_error' => $ok ? null : ($errorText ?: 'Unknown error'),
                'status' => ($pending === 0 && $processing === 0) ? 'finished' : 'running',
                'finished_at' => ($pending === 0 && $processing === 0) ? now() : null,
                'updated_at' => now(),
            ]);

            if ($pending > 0) {
                self::dispatch($this->batchId)->delay(now()->addSeconds(max(1, (int) $intervalSeconds)));
            }
        } catch (\Throwable $e) {
            $errorText = $e->getMessage();
            Log::channel('daily')->error('[SATUSEHAT][DispatchBatchJob] failed', [
                'batch_id' => $this->batchId,
                'item_id' => $item->id ?? null,
                'no_rawat' => $item->no_rawat ?? null,
                'step' => $item->step ?? null,
                'error' => $errorText,
            ]);

            if (isset($item->id)) {
                DB::table('satusehat_dispatch_items')->where('id', $item->id)->update([
                    'status' => 'failed',
                    'finished_at' => now(),
                    'last_error' => $errorText,
                    'updated_at' => now(),
                ]);
            }

            DB::table('satusehat_dispatch_batches')->where('id', $this->batchId)->update([
                'last_error' => $errorText,
                'updated_at' => now(),
            ]);

            self::dispatch($this->batchId)->delay(now()->addSeconds(max(1, (int) ($batch->interval_seconds ?? 3))));
        }
    }
}
