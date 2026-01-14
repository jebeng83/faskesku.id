<?php

namespace App\Http\Controllers\Pcare;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PasswordBridgingBpjsController extends Controller
{
    public function index()
    {
        $row = DB::table('password_asuransi')
            ->selectRaw("kd_pj, CAST(AES_DECRYPT(usere, 'nur') AS CHAR) AS username, CAST(AES_DECRYPT(passworde, 'windi') AS CHAR) AS password")
            ->where('kd_pj', 'BPJ')
            ->first();

        return Inertia::render('Pcare/PasswordBridingBpjs', [
            'setting' => [
                'kd_pj' => $row->kd_pj ?? 'BPJ',
                'username' => $row->username ?? '',
                'password' => $row->password ?? '',
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kd_pj' => 'required|string|max:3',
            'username' => 'required|string|max:700',
            'password' => 'required|string|max:700',
        ], [
            'required' => ':attribute wajib diisi',
            'max' => ':attribute maksimal :max karakter',
        ]);

        $kd = strtoupper(trim($validated['kd_pj']));
        if ($kd === '') {
            $kd = 'BPJ';
        }
        $user = $validated['username'];
        $pass = $validated['password'];

        DB::statement(
            "INSERT INTO password_asuransi (kd_pj, usere, passworde)
             VALUES (?, AES_ENCRYPT(?, 'nur'), AES_ENCRYPT(?, 'windi'))
             ON DUPLICATE KEY UPDATE
             usere = VALUES(usere),
             passworde = VALUES(passworde)",
            [$kd, $user, $pass]
        );

        return redirect()->route('pcare.setting.passwordbpjs.index')
            ->with('success', 'Password Bridging BPJS berhasil disimpan');
    }

    public function destroy()
    {
        DB::table('password_asuransi')->truncate();

        return redirect()->route('pcare.setting.passwordbpjs.index')
            ->with('success', 'Password Bridging BPJS berhasil direset');
    }
}
