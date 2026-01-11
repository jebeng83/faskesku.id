<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use App\Services\Akutansi\JurnalPostingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PemasukanLainController extends Controller
{
    public function describe()
    {
        try {
            if (! Schema::hasTable('pemasukan_lain')) {
                return response()->json(['success' => false, 'message' => 'Tabel pemasukan_lain tidak tersedia'], 404);
            }
            $columns = DB::select('SHOW FULL COLUMNS FROM pemasukan_lain');
            return response()->json(['success' => true, 'data' => ['columns' => $columns]]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
    public function generateNoMasuk()
    {
        if (! Schema::hasTable('pemasukan_lain')) {
            return response()->json(['no_masuk' => 'PL000000001']);
        }

        $rows = DB::table('pemasukan_lain')->select('no_masuk')->get();
        $max = 0;
        foreach ($rows as $r) {
            $raw = (string) ($r->no_masuk ?? '');
            $digits = preg_replace('/[^0-9]/', '', $raw);
            if ($digits === '') continue;
            $n = (int) $digits;
            if ($n > $max) $max = $n;
        }
        $next = $max + 1;
        $candidate = 'PL' . str_pad((string) $next, 9, '0', STR_PAD_LEFT);
        while (DB::table('pemasukan_lain')->where('no_masuk', $candidate)->exists()) {
            $next++;
            $candidate = 'PL' . str_pad((string) $next, 9, '0', STR_PAD_LEFT);
        }
        return response()->json(['no_masuk' => $candidate]);
    }
    public function index(Request $request)
    {
        $start = (string) $request->query('start');
        $end = (string) $request->query('end');
        $q = (string) $request->query('q');
        $kodeKategori = (string) $request->query('kode_kategori');
        $nip = (string) $request->query('nip');

        if (! Schema::hasTable('pemasukan_lain')) {
            return response()->json(['data' => []]);
        }

        $query = DB::table('pemasukan_lain as pl')
            ->leftJoin('kategori_pemasukan_lain as k', 'k.kode_kategori', '=', 'pl.kode_kategori')
            ->leftJoin('petugas as p', 'p.nip', '=', 'pl.nip')
            ->select(
                'pl.no_masuk',
                'pl.tanggal',
                'pl.keterangan',
                'pl.keperluan',
                'pl.besar',
                'pl.nip',
                'p.nama as nama_petugas',
                'pl.kode_kategori',
                'k.nama_kategori'
            )
            ->orderByDesc('pl.tanggal');

        if ($start !== '') {
            $query->whereDate('pl.tanggal', '>=', $start);
        }
        if ($end !== '') {
            $query->whereDate('pl.tanggal', '<=', $end);
        }
        if ($kodeKategori !== '') {
            $query->where('pl.kode_kategori', $kodeKategori);
        }
        if ($nip !== '') {
            $query->where('pl.nip', $nip);
        }
        if ($q !== '') {
            $query->where(function ($w) use ($q) {
                $w->where('pl.no_masuk', 'like', "%{$q}%")
                    ->orWhere('pl.keterangan', 'like', "%{$q}%")
                    ->orWhere('pl.keperluan', 'like', "%{$q}%")
                    ->orWhere('k.nama_kategori', 'like', "%{$q}%")
                    ->orWhere('p.nama', 'like', "%{$q}%");
            });
        }

        $rows = $query->get();

        return response()->json(['data' => $rows]);
    }

    public function store(Request $request, JurnalPostingService $posting)
    {
        $data = $request->validate([
            'no_masuk' => ['required', 'string'],
            'tanggal' => ['required', 'string'],
            'kode_kategori' => ['required', 'string'],
            'nip' => ['required', 'string'],
            'besar' => ['required', 'numeric'],
            'keterangan' => ['required', 'string'],
            'keperluan' => ['required', 'string'],
        ]);

        if (! Schema::hasTable('pemasukan_lain')) {
            return response()->json(['message' => 'Tabel pemasukan_lain tidak tersedia'], 500);
        }
        if (! Schema::hasTable('kategori_pemasukan_lain')) {
            return response()->json(['message' => 'Tabel kategori_pemasukan_lain tidak tersedia'], 500);
        }

        return DB::transaction(function () use ($data, $posting) {
            $exists = DB::table('pemasukan_lain')->where('no_masuk', $data['no_masuk'])->exists();
            if ($exists) {
                return response()->json(['message' => 'no_masuk sudah ada'], 422);
            }

            DB::table('pemasukan_lain')->insert([
                'no_masuk' => $data['no_masuk'],
                'tanggal' => $data['tanggal'],
                'keterangan' => $data['keterangan'],
                'keperluan' => $data['keperluan'],
                'besar' => (float) $data['besar'],
                'nip' => $data['nip'],
                'kode_kategori' => $data['kode_kategori'],
            ]);

            $kat = DB::table('kategori_pemasukan_lain')
                ->select('kd_rek', 'kd_rek2')
                ->where('kode_kategori', $data['kode_kategori'])
                ->first();
            if (! $kat || empty($kat->kd_rek) || empty($kat->kd_rek2)) {
                throw new \RuntimeException('Kategori tidak memiliki kd_rek/kd_rek2');
            }

            DB::table('tampjurnal')->delete();
            DB::table('tampjurnal')->insert([
                ['kd_rek' => (string) $kat->kd_rek2, 'nm_rek' => null, 'debet' => (float) $data['besar'], 'kredit' => 0.0],
                ['kd_rek' => (string) $kat->kd_rek, 'nm_rek' => null, 'debet' => 0.0, 'kredit' => (float) $data['besar']],
            ]);

            $posting->post($data['no_masuk'], $data['keterangan'], substr($data['tanggal'], 0, 10));

            if (Schema::hasTable('tagihan_sadewa')) {
                $petugasNama = DB::table('petugas')->where('nip', $data['nip'])->value('nama');
                $payload = [
                    'no_nota' => $data['no_masuk'],
                ];

                $dateCol = Schema::hasColumn('tagihan_sadewa', 'tgl_bayar') ? 'tgl_bayar' : (Schema::hasColumn('tagihan_sadewa', 'tanggal') ? 'tanggal' : null);
                $jenisCol = Schema::hasColumn('tagihan_sadewa', 'jenis_bayar') ? 'jenis_bayar' : (Schema::hasColumn('tagihan_sadewa', 'tipe') ? 'tipe' : null);
                $jumlahTagihanCol = Schema::hasColumn('tagihan_sadewa', 'jumlah_tagihan') ? 'jumlah_tagihan' : (Schema::hasColumn('tagihan_sadewa', 'total') ? 'total' : null);
                $jumlahBayarCol = Schema::hasColumn('tagihan_sadewa', 'jumlah_bayar') ? 'jumlah_bayar' : (Schema::hasColumn('tagihan_sadewa', 'bayar') ? 'bayar' : null);
                $petugasCol = Schema::hasColumn('tagihan_sadewa', 'petugas') ? 'petugas' : (Schema::hasColumn('tagihan_sadewa', 'nip') ? 'nip' : null);
                $deskripsiCol = Schema::hasColumn('tagihan_sadewa', 'deskripsi') ? 'deskripsi' : null;
                $statusCol = Schema::hasColumn('tagihan_sadewa', 'status') ? 'status' : null;

                if ($dateCol) $payload[$dateCol] = $data['tanggal'];
                if ($jenisCol) $payload[$jenisCol] = 'Pelunasan';
                if ($jumlahTagihanCol) $payload[$jumlahTagihanCol] = (float) $data['besar'];
                if ($jumlahBayarCol) $payload[$jumlahBayarCol] = (float) $data['besar'];
                if ($petugasCol) $payload[$petugasCol] = $petugasNama ?: $data['nip'];
                if ($deskripsiCol) $payload[$deskripsiCol] = $data['keterangan'];
                if ($statusCol) $payload[$statusCol] = 'Sudah';

                if (Schema::hasColumn('tagihan_sadewa', 'no_rkm_medis')) $payload['no_rkm_medis'] = $payload['no_rkm_medis'] ?? '-';
                if (Schema::hasColumn('tagihan_sadewa', 'nama_pasien')) $payload['nama_pasien'] = $payload['nama_pasien'] ?? ($data['keperluan'] ?? '-');
                if (Schema::hasColumn('tagihan_sadewa', 'alamat')) $payload['alamat'] = $payload['alamat'] ?? '-';

                DB::table('tagihan_sadewa')->insert($payload);
            }

            return response()->json(['ok' => true], 201);
        });
    }

    public function update(string $no_masuk, Request $request)
    {
        $data = $request->validate([
            'tanggal' => ['required', 'string'],
            'kode_kategori' => ['required', 'string'],
            'nip' => ['required', 'string'],
            'besar' => ['required', 'numeric'],
            'keterangan' => ['required', 'string'],
            'keperluan' => ['required', 'string'],
        ]);

        if (! Schema::hasTable('pemasukan_lain')) {
            return response()->json(['message' => 'Tabel pemasukan_lain tidak tersedia'], 500);
        }

        $exists = DB::table('pemasukan_lain')->where('no_masuk', $no_masuk)->exists();
        if (! $exists) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        DB::table('pemasukan_lain')
            ->where('no_masuk', $no_masuk)
            ->update([
                'tanggal' => $data['tanggal'],
                'keterangan' => $data['keterangan'],
                'keperluan' => $data['keperluan'],
                'besar' => (float) $data['besar'],
                'nip' => $data['nip'],
                'kode_kategori' => $data['kode_kategori'],
            ]);

        return response()->json(['ok' => true]);
    }

    public function destroy(string $no_masuk, JurnalPostingService $posting)
    {
        if (! Schema::hasTable('pemasukan_lain')) {
            return response()->json(['message' => 'Tabel pemasukan_lain tidak tersedia'], 500);
        }

        $row = DB::table('pemasukan_lain')->where('no_masuk', $no_masuk)->first();
        if (! $row) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return DB::transaction(function () use ($row, $posting, $no_masuk) {
            $kat = DB::table('kategori_pemasukan_lain')
                ->select('kd_rek', 'kd_rek2')
                ->where('kode_kategori', $row->kode_kategori)
                ->first();

            DB::table('pemasukan_lain')->where('no_masuk', $no_masuk)->delete();

            if ($kat && ! empty($kat->kd_rek) && ! empty($kat->kd_rek2) && (float) ($row->besar ?? 0) > 0) {
                DB::table('tampjurnal')->delete();
                DB::table('tampjurnal')->insert([
                    ['kd_rek' => (string) $kat->kd_rek, 'nm_rek' => null, 'debet' => (float) $row->besar, 'kredit' => 0.0],
                    ['kd_rek' => (string) $kat->kd_rek2, 'nm_rek' => null, 'debet' => 0.0, 'kredit' => (float) $row->besar],
                ]);
                $posting->post($no_masuk, 'Pembatalan '.$row->keterangan, substr((string) $row->tanggal, 0, 10));
            }

            if (Schema::hasTable('tagihan_sadewa')) {
                DB::table('tagihan_sadewa')->where('no_nota', $no_masuk)->delete();
            }

            return response()->json(['ok' => true]);
        });
    }
}
