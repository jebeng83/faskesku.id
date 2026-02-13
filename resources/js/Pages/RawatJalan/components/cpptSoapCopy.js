export const buildCopyFormData = (row, now = new Date()) => {
    const normalize = (value) => (value === 'N/A' ? '' : (value || ''));
    const tgl = now.toISOString().slice(0, 10);
    const jam = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    return {
        tgl_perawatan: tgl,
        jam_rawat: jam,
        suhu_tubuh: normalize(row?.suhu_tubuh),
        tensi: normalize(row?.tensi),
        nadi: normalize(row?.nadi),
        respirasi: normalize(row?.respirasi),
        tinggi: normalize(row?.tinggi),
        berat: normalize(row?.berat),
        spo2: normalize(row?.spo2),
        gcs: normalize(row?.gcs),
        kesadaran: row?.kesadaran || 'Compos Mentis',
        keluhan: row?.keluhan || '',
        pemeriksaan: row?.pemeriksaan || '',
        alergi: row?.alergi || '',
        lingkar_perut: normalize(row?.lingkar_perut),
        rtl: row?.rtl || '',
        penilaian: row?.penilaian || '',
        instruksi: row?.instruksi || '',
        evaluasi: row?.evaluasi || '',
    };
};
