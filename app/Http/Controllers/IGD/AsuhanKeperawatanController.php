<?php

namespace App\Http\Controllers\IGD;

use App\Http\Controllers\Controller;
use App\Models\AsuhanKeperawatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AsuhanKeperawatanController extends Controller
{
    public function index(Request $request)
    {
        $q = trim((string) $request->input('q'));
        $perPage = (int) $request->input('perPage', 10);

        $query = DB::table('asuhan_keperawatan AS ak')
            ->leftJoin('reg_periksa AS rp', 'ak.no_rawat', '=', 'rp.no_rawat')
            ->leftJoin('pasien AS p', 'rp.no_rkm_medis', '=', 'p.no_rkm_medis')
            ->select(
                'ak.no_rawat',
                'ak.no_rkm_medis',
                DB::raw('IFNULL(p.nm_pasien, "") as nm_pasien'),
                'ak.tgl_pengkajian',
                'ak.nip_perawat',
                'ak.ruangan',
                'ak.jenis_pengkajian',
                'ak.evaluasi_status'
            );

        if ($q !== '') {
            $query->where(function ($w) use ($q) {
                $w->where('ak.no_rawat', 'like', "%{$q}%")
                    ->orWhere('ak.no_rkm_medis', 'like', "%{$q}%")
                    ->orWhere('p.nm_pasien', 'like', "%{$q}%")
                    ->orWhere('ak.nip_perawat', 'like', "%{$q}%")
                    ->orWhere('ak.ruangan', 'like', "%{$q}%");
            });
        }

        $items = $query->orderBy('ak.tgl_pengkajian', 'desc')->paginate($perPage)->withQueryString();

        return Inertia::render('IGD/asuhan_keperawatan', [
            'items' => $items,
            'filters' => [
                'q' => $q,
                'perPage' => $perPage,
            ],
        ]);
    }

    public function edit(string $noRawat)
    {
        $row = DB::table('asuhan_keperawatan')->where('no_rawat', $noRawat)->first();
        return Inertia::render('IGD/asuhan_keperawatan', [
            'editing' => $row,
            'items' => null,
            'filters' => null,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'no_rawat' => ['required', 'string', 'max:17'],
            'no_rkm_medis' => ['required', 'string', 'max:15'],
            'nip_perawat' => ['required', 'string', 'max:20'],
            'ruangan' => ['required', 'string', 'max:30'],
            'jenis_pengkajian' => ['required', 'in:Awal,Berkelanjutan,Rujukan'],
            'keluhan_utama' => ['nullable', 'string'],
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $payload = [
            'no_rawat' => $data['no_rawat'],
            'no_rkm_medis' => $data['no_rkm_medis'],
            'tgl_pengkajian' => now(),
            'tgl_perubahan' => now(),
            'nip_perawat' => $data['nip_perawat'],
            'ruangan' => $data['ruangan'],
            'jenis_pengkajian' => $data['jenis_pengkajian'],
            'keluhan_utama' => $data['keluhan_utama'] ?? null,
            'evaluasi_hasil' => $data['evaluasi_hasil'] ?? null,
            'evaluasi_status' => $data['evaluasi_status'] ?? null,
            'evaluator_nip' => $data['evaluator_nip'] ?? null,
            'catatan_khusus' => $data['catatan_khusus'] ?? null,
        ];

        DB::table('asuhan_keperawatan')->insert($payload);

        return redirect()->route('igd.asuhan-keperawatan.index')->with('success', 'Berhasil menambah Asuhan Keperawatan');
    }

    public function update(Request $request, string $noRawat)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'no_rkm_medis' => ['required', 'string', 'max:15'],
            'nip_perawat' => ['required', 'string', 'max:20'],
            'ruangan' => ['required', 'string', 'max:30'],
            'jenis_pengkajian' => ['required', 'in:Awal,Berkelanjutan,Rujukan'],
            'keluhan_utama' => ['nullable', 'string'],
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $payload = [
            'no_rkm_medis' => $data['no_rkm_medis'],
            'tgl_perubahan' => now(),
            'nip_perawat' => $data['nip_perawat'],
            'ruangan' => $data['ruangan'],
            'jenis_pengkajian' => $data['jenis_pengkajian'],
            'keluhan_utama' => $data['keluhan_utama'] ?? null,
            'evaluasi_hasil' => $data['evaluasi_hasil'] ?? null,
            'evaluasi_status' => $data['evaluasi_status'] ?? null,
            'evaluator_nip' => $data['evaluator_nip'] ?? null,
            'catatan_khusus' => $data['catatan_khusus'] ?? null,
        ];

        DB::table('asuhan_keperawatan')->where('no_rawat', $noRawat)->update($payload);

        return redirect()->route('igd.asuhan-keperawatan.index')->with('success', 'Berhasil memperbarui Asuhan Keperawatan');
    }

    public function destroy(string $noRawat)
    {
        DB::table('asuhan_keperawatan')->where('no_rawat', $noRawat)->delete();
        return redirect()->route('igd.asuhan-keperawatan.index')->with('success', 'Berhasil menghapus Asuhan Keperawatan');
    }
}

