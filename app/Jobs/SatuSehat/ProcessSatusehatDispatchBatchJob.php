<?php

namespace App\Jobs\SatuSehat;

use App\Services\SatuSehat\AllergyIntoleranceService;
use App\Services\SatuSehat\CompositionService;
use App\Services\SatuSehat\ConditionService;
use App\Services\SatuSehat\EncounterService;
use App\Services\SatuSehat\MedicationDispenseService;
use App\Services\SatuSehat\MedicationRequestService;
use App\Services\SatuSehat\ObservationService;
use App\Services\SatuSehat\ProcedureService;
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

    public function handle(
        EncounterService $encounterService,
        RajalPipelineService $pipelineService,
        ConditionService $conditionService,
        ObservationService $observationService,
        ProcedureService $procedureService,
        AllergyIntoleranceService $allergyService,
        MedicationRequestService $medicationRequestService,
        MedicationDispenseService $medicationDispenseService,
        CompositionService $compositionService
    ): void
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
            } elseif ($step === 'condition') {
                $dxList = DB::table('diagnosa_pasien')
                    ->where('no_rawat', $noRawat)
                    ->orderBy('prioritas', 'asc')
                    ->get(['kd_penyakit', 'prioritas']);

                if ($dxList->isEmpty()) {
                    $response = ['ok' => true, 'skipped' => true, 'reason' => 'diagnosa_pasien kosong'];
                    $ok = true;
                } else {
                    $sent = [];
                    foreach ($dxList as $dx) {
                        $kd = trim((string) ($dx->kd_penyakit ?? ''));
                        if ($kd === '') {
                            continue;
                        }
                        $r = $conditionService->createCondition($noRawat, $kd, 'Ralan');
                        if (! is_array($r) || empty($r['id'])) {
                            $ok = false;
                            $errorText = 'Gagal kirim Condition untuk kd_penyakit: '.$kd;
                            $response = ['ok' => false, 'kd_penyakit' => $kd];
                            break;
                        }
                        $sent[] = ['kd_penyakit' => $kd, 'id' => (string) ($r['id'] ?? '')];
                    }

                    if ($errorText === null) {
                        $response = ['ok' => true, 'sent' => $sent];
                        $ok = true;
                    }
                }
            } elseif ($step === 'observation') {
                $rows = DB::table('pemeriksaan_ralan')
                    ->where('no_rawat', $noRawat)
                    ->orderBy('tgl_perawatan', 'asc')
                    ->orderBy('jam_rawat', 'asc')
                    ->get(['tgl_perawatan', 'jam_rawat']);

                if ($rows->isEmpty()) {
                    $response = ['ok' => true, 'skipped' => true, 'reason' => 'pemeriksaan_ralan kosong'];
                    $ok = true;
                } else {
                    $results = [];
                    foreach ($rows as $r) {
                        $tgl = trim((string) ($r->tgl_perawatan ?? ''));
                        $jam = trim((string) ($r->jam_rawat ?? ''));
                        if ($tgl === '' || $jam === '') {
                            continue;
                        }
                        $resObs = $observationService->sendVitalSigns($noRawat, $tgl, $jam);
                        $success = (bool) ($resObs['success'] ?? false);
                        $results[] = ['tgl_perawatan' => $tgl, 'jam_rawat' => $jam, 'success' => $success];
                        if (! $success) {
                            $ok = false;
                            $errorText = (string) ($resObs['message'] ?? 'Gagal kirim Observation');
                            $response = ['ok' => false, 'tgl_perawatan' => $tgl, 'jam_rawat' => $jam, 'detail' => $resObs];
                            break;
                        }
                    }

                    if ($errorText === null) {
                        $response = ['ok' => true, 'results' => $results];
                        $ok = true;
                    }
                }
            } elseif ($step === 'procedure') {
                $response = $procedureService->sendProceduresForEncounter($noRawat, 'Ralan');
                $ok = (bool) ($response['ok'] ?? false);
                if (! $ok) {
                    $errorText = (string) ($response['message'] ?? ($response['error'] ?? 'Gagal kirim Procedure'));
                }
            } elseif ($step === 'allergy_intolerance') {
                $response = $allergyService->sendAllergyIntolerance($noRawat);
                $ok = (bool) ($response['success'] ?? false);
                if (! $ok) {
                    $errorText = (string) ($response['message'] ?? 'Gagal kirim AllergyIntolerance');
                }
            } elseif ($step === 'medication') {
                $response = $medicationRequestService->ensureMedicationsForNoRawat($noRawat);
                $ok = (bool) ($response['ok'] ?? false);
                if (! $ok) {
                    $errorText = (string) ($response['message'] ?? 'Gagal memastikan Medication');
                }
            } elseif ($step === 'medication_request') {
                $response = $medicationRequestService->sendMedicationRequestsForNoRawat($noRawat);
                $ok = (bool) ($response['ok'] ?? false);
                if (! $ok) {
                    $errorText = (string) ($response['message'] ?? 'Gagal kirim MedicationRequest');
                }
            } elseif ($step === 'medication_dispense') {
                $response = $medicationDispenseService->sendMedicationDispensesForNoRawat($noRawat);
                $ok = (bool) ($response['ok'] ?? false);
                if (! $ok) {
                    $errorText = (string) ($response['message'] ?? 'Gagal kirim MedicationDispense');
                }
            } elseif ($step === 'composition') {
                $enc = DB::table('satusehat_encounter')->where('no_rawat', $noRawat)->first(['satusehat_id', 'patient_id', 'practitioner_id']);
                $encounterId = $enc ? trim((string) ($enc->satusehat_id ?? '')) : '';
                $patientId = $enc ? trim((string) ($enc->patient_id ?? '')) : '';
                $practitionerId = $enc ? trim((string) ($enc->practitioner_id ?? '')) : '';

                if ($encounterId === '' || $patientId === '') {
                    $legacy = DB::table('satu_sehat_encounter')->where('no_rawat', $noRawat)->first(['id_encounter_2', 'id_encounter', 'id_pasien_satusehat', 'id_dokter_satusehat']);
                    if ($legacy) {
                        $encounterId = $encounterId !== '' ? $encounterId : (trim((string) ($legacy->id_encounter_2 ?? '')) ?: trim((string) ($legacy->id_encounter ?? '')));
                        $patientId = $patientId !== '' ? $patientId : trim((string) ($legacy->id_pasien_satusehat ?? ''));
                        $practitionerId = $practitionerId !== '' ? $practitionerId : trim((string) ($legacy->id_dokter_satusehat ?? ''));
                    }
                }

                if ($encounterId === '' || $patientId === '') {
                    $ok = false;
                    $errorText = 'Encounter atau Patient ID belum tersedia untuk kirim Composition';
                    $response = ['ok' => false, 'encounter_id' => $encounterId, 'patient_id' => $patientId];
                } else {
                    $pem = DB::table('pemeriksaan_ralan')->where('no_rawat', $noRawat)->orderByDesc('tgl_perawatan')->orderByDesc('jam_rawat')->first(['tgl_perawatan', 'jam_rawat']);
                    $localDateTime = $pem && ! empty($pem->tgl_perawatan) && ! empty($pem->jam_rawat)
                        ? (string) $pem->tgl_perawatan.'T'.(string) $pem->jam_rawat.'+07:00'
                        : '';

                    $response = $compositionService->sendRajalCompositionAutoFromNoRawat($noRawat, $patientId, $encounterId, $practitionerId, $localDateTime);
                    $ok = (bool) ($response['ok'] ?? false);
                    if (! $ok) {
                        $errorText = (string) ($response['message'] ?? 'Gagal kirim Composition');
                    }
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
