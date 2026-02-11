<?php

namespace App\Http\Controllers\SatuSehat\PelayananRawatJalan;

use App\Http\Controllers\Controller;
use App\Services\SatuSehat\ProcedureService;
use Illuminate\Http\Request;

class ProcedureTindakanController extends Controller
{
    public function sendByRawat(Request $request, string $no_rawat, ProcedureService $procedureService)
    {
        $validated = $request->validate([
            'status' => 'nullable|in:Ralan,Ranap',
        ]);

        $status = (string) ($validated['status'] ?? 'Ralan');

        $res = $procedureService->sendProceduresForEncounter($no_rawat, $status);
        $http = ($res['ok'] ?? false) ? 200 : 422;

        return response()->json($res, $http);
    }
}

