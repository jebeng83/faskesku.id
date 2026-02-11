<?php

namespace App\Jobs\SatuSehat;

use App\Services\SatuSehat\EncounterService;
use App\Traits\SatuSehatTraits;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SatuSehatBotRetryEncountersJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    use SatuSehatTraits;

    public int $limit;

    public int $days;

    public function __construct(int $limit = 50, int $days = 7)
    {
        $this->limit = $limit;
        $this->days = $days;
    }

    public function handle(EncounterService $encounterService): void
    {
        $orgIhs = $this->satusehatOrganizationId();
        if ($orgIhs === '') {
            Log::warning('[SATUSEHATBOT] skipped, SATUSEHAT_ORG_ID empty');
            return;
        }

        $rows = DB::table('reg_periksa as rp')
            ->leftJoin('satusehat_encounter as se', 'rp.no_rawat', '=', 'se.no_rawat')
            ->where('rp.tgl_registrasi', '>=', now()->subDays($this->days))
            ->where(function ($q) {
                $q->whereNull('se.satusehat_id')
                    ->orWhere('se.status', 'error')
                    ->orWhere('se.status', 'pending');
            })
            ->orderByDesc('rp.tgl_registrasi')
            ->limit($this->limit)
            ->select('rp.no_rawat')
            ->get();

        if ($rows->isEmpty()) {
            Log::info('[SATUSEHATBOT] no pending encounters');
            return;
        }

        $sent = 0;
        $errors = 0;

        foreach ($rows as $row) {
            $noRawat = trim((string) ($row->no_rawat ?? ''));
            if ($noRawat === '') {
                continue;
            }

            $ok = $this->ensureEncounterSent($encounterService, $noRawat, $orgIhs);
            if ($ok) {
                $sent++;
            } else {
                $errors++;
            }
        }

        Log::info('[SATUSEHATBOT] done', [
            'limit' => $this->limit,
            'days' => $this->days,
            'checked' => $rows->count(),
            'sent_or_found' => $sent,
            'errors' => $errors,
        ]);
    }

    private function ensureEncounterSent(EncounterService $encounterService, string $noRawat, string $orgIhs): bool
    {
        $existing = DB::table('satusehat_encounter')->where('no_rawat', $noRawat)->first(['satusehat_id']);
        $existingId = $existing ? trim((string) ($existing->satusehat_id ?? '')) : '';
        if ($existingId !== '') {
            return true;
        }

        $system = 'http://sys-ids.kemkes.go.id/encounter/'.$orgIhs;
        $identifierToken = $system.'|'.$noRawat;
        $search = $this->satusehatRequest('GET', 'Encounter', null, ['query' => ['identifier' => $identifierToken]]);
        if (($search['ok'] ?? false) && isset(($search['json']['entry'] ?? [])[0]['resource']['id'])) {
            $foundId = trim((string) $search['json']['entry'][0]['resource']['id']);
            if ($foundId !== '') {
                DB::table('satusehat_encounter')->updateOrInsert(
                    ['no_rawat' => $noRawat],
                    [
                        'satusehat_id' => $foundId,
                        'fhir_json' => json_encode($search['json']['entry'][0]['resource'] ?? null),
                        'status' => 'sent',
                        'error_message' => null,
                        'sent_at' => now(),
                        'updated_at' => now(),
                    ]
                );

                try {
                    DB::table('satu_sehat_encounter')->updateOrInsert(
                        ['no_rawat' => $noRawat],
                        ['id_encounter' => $foundId]
                    );
                } catch (\Throwable $e) {
                }

                Log::info('[SATUSEHATBOT] encounter found in SATUSEHAT', ['no_rawat' => $noRawat, 'encounter_id' => $foundId]);
                return true;
            }
        }

        try {
            $encounter = $encounterService->createEncounter($noRawat, true);
            $encounterId = is_array($encounter) ? trim((string) ($encounter['id'] ?? '')) : '';
            if ($encounterId === '') {
                DB::table('satusehat_encounter')->updateOrInsert(
                    ['no_rawat' => $noRawat],
                    [
                        'status' => 'error',
                        'error_message' => 'Encounter terkirim tapi id kosong',
                        'updated_at' => now(),
                    ]
                );

                Log::warning('[SATUSEHATBOT] encounter sent but missing id', ['no_rawat' => $noRawat]);
                return false;
            }

            Log::info('[SATUSEHATBOT] encounter created', ['no_rawat' => $noRawat, 'encounter_id' => $encounterId]);
            return true;
        } catch (\Throwable $e) {
            DB::table('satusehat_encounter')->updateOrInsert(
                ['no_rawat' => $noRawat],
                [
                    'status' => 'error',
                    'error_message' => $e->getMessage(),
                    'updated_at' => now(),
                ]
            );

            Log::error('[SATUSEHATBOT] encounter failed', ['no_rawat' => $noRawat, 'error' => $e->getMessage()]);
            return false;
        }
    }
}

