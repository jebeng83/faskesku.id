public function indexSuratSehat(Request $request)
{
    $search = trim((string) $request->input('search', ''));
    $startDate = $request->input('start_date');
    $endDate = $request->input('end_date');
    $tanggal = $request->input('tanggal');

    // Set default tanggal ke hari ini jika tidak ada filter
    if (!$startDate && !$endDate && !$tanggal) {
        $tanggal = date('Y-m-d');
    }

    $query = DB::table('surat_keterangan_sehat')
        ->leftJoin('reg_periksa', 'surat_keterangan_sehat.no_rawat', '=', 'reg_periksa.no_rawat')
        ->leftJoin('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
        ->select([
            'surat_keterangan_sehat.no_surat',
            'surat_keterangan_sehat.no_rawat',
            'surat_keterangan_sehat.tanggalsurat',
            'surat_keterangan_sehat.keperluan',
            'surat_keterangan_sehat.kesimpulan',
            'surat_keterangan_sehat.berat',
            'surat_keterangan_sehat.tinggi',
            'surat_keterangan_sehat.tensi',
            'surat_keterangan_sehat.suhu',
            'pasien.nm_pasien',
            'pasien.no_rkm_medis',
        ]);

    if ($search !== '') {
        $query->where(function ($q) use ($search) {
            $q->where('surat_keterangan_sehat.no_surat', 'like', "%{$search}%")
                ->orWhere('surat_keterangan_sehat.no_rawat', 'like', "%{$search}%")
                ->orWhere('surat_keterangan_sehat.keperluan', 'like', "%{$search}%")
                ->orWhere('surat_keterangan_sehat.kesimpulan', 'like', "%{$search}%")
                ->orWhere('pasien.nm_pasien', 'like', "%{$search}%")
                ->orWhere('pasien.no_rkm_medis', 'like', "%{$search}%");
        });
    }

    if ($startDate || $endDate) {
        if ($startDate && $endDate) {
            $query->whereBetween('surat_keterangan_sehat.tanggalsurat', [$startDate, $endDate]);
        } elseif ($startDate) {
            $query->whereDate('surat_keterangan_sehat.tanggalsurat', '>=', $startDate);
        } elseif ($endDate) {
            $query->whereDate('surat_keterangan_sehat.tanggalsurat', '<=', $endDate);
        }
    } elseif ($tanggal) {
        $query->whereDate('surat_keterangan_sehat.tanggalsurat', $tanggal);
    }

    $suratSehat = $query
        ->orderByDesc('surat_keterangan_sehat.tanggalsurat')
        ->orderByDesc('surat_keterangan_sehat.no_surat')
        ->paginate(15)
        ->withQueryString();

    return Inertia::render('RawatJalan/components/SuratSehatList', [
        'suratSehat' => $suratSehat,
        'filters' => [
            'search' => $search,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'tanggal' => $tanggal,
        ],
    ]);
}
