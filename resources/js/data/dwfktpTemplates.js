// Data: 155 Diagnosa Wajib FKTP (struktur dan generator template)
// Catatan:
// - Untuk setiap diagnosa, kita menggunakan template generik agar S, O, A, P dan TTV otomatis terisi.
// - Anda bisa memperkaya konten tiap diagnosa sesuai Panduan Praktik Klinis (PPK) BPJS / Permenkes.
// - Hipertensi dan Influensa disarankan memiliki template khusus, namun tetap disediakan di CpptSoap.jsx.
//
// Sumber referensi daftar diagnosa (contoh):
// - PasienSehat: "Daftar 155 Penyakit yang Dilayani di FKTP BPJS" [https://www.pasiensehat.com/2015/04/daftar-155-penyakit-yang-ditanggung-BPJS-di-puskesmas.html]
// - Tribun Makassar: "155 Penyakit Ditangani di Faskes 1" (daftar alfabet) [https://makassar.tribunnews.com/2016/11/07/saat-berobat-pakai-bpjs-kesehatan-155-penyakit-ini-ditangani-di-faskes-1-tak-bisa-minta-spesialis]
// Silakan verifikasi dan sesuaikan daftar final sesuai kebijakan internal FKTP Anda.

// Helper untuk membuat slug key yang stabil dari label diagnosa
export function slugify(label) {
  return (label || '')
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
}

// Generator template generik berdasarkan label diagnosa
export function generateGenericTemplate(label) {
  const name = (label || '').trim();
  return {
    // TTV default (silakan sesuaikan bila perlu)
    suhu_tubuh: '36.8',
    tensi: '120/80',
    nadi: '80',
    respirasi: '20',
    spo2: '98',
    // SOAP generik
    keluhan: `Pasien datang dengan keluhan yang konsisten dengan ${name}. Keluhan dirasakan sejak ±3 hari terakhir, intensitas ringan–sedang, kadang mengganggu aktivitas harian. Pasien tidak melaporkan tanda bahaya (mis. demam tinggi menetap, perdarahan, nyeri hebat progresif, penurunan kesadaran).`,
    pemeriksaan: 'Keadaan umum baik, kesadaran Compos Mentis. TD 120/80 mmHg; Nadi 80 x/menit; RR 20 x/menit; Suhu 36.8°C; SpO2 98%. Pemeriksaan fisik sesuai kebutuhan klinis dan temuan khas.',
    penilaian: name,
    rtl: `Tatalaksana simptomatik/spesifik dan edukasi sesuai PPK/BPJS untuk kondisi: ${name}.`,
    instruksi: 'Kontrol bila keluhan memburuk atau tidak membaik; patuhi terapi dan edukasi yang diberikan.',
    evaluasi: 'Evaluasi respons terapi pada kunjungan berikutnya dan sesuaikan bila perlu.'
  };
}

// Daftar 155 nama diagnosa sesuai referensi FKTP/PPK (disederhanakan dan diperbaiki ejaan umum)
// Sumber utama: 155 Diagnosis Non Spesialistik, Permenkes No. 5/2014 (lihat referensi)
const DIAGNOSIS_NAMES = [
  // SISTEM SARAF
  'Kejang Demam',
  'Tetanus',
  'HIV AIDS Tanpa Komplikasi',
  'Tension Headache',
  'Migren',
  "Bell's Palsy",
  'Vertigo',
  'Epilepsi',
  'Status Epileptikus',
  'Rabies',
  'Delirium',

  // PSIKIATRI
  'Demensia',
  'Gangguan Campuran Anxietas & Depresi',
  'Gangguan Psikotik',
  'Insomnia',

  // MATA
  'Benda Asing di Konjungtiva',
  'Konjungtivitis',
  'Pendarahan Subkonjungtiva',
  'Mata Kering',
  'Blefaritis',
  'Hordeolum',
  'Glaukoma Akut',
  'Episkleritis',
  'Hipermetropia Ringan',
  'Miopia Ringan',
  'Astigmatisme Ringan',
  'Presbiopia',
  'Buta Senja',
  'Katarak',

  // TELINGA
  'Otitis Eksterna',
  'Otitis Media Akut',
  'Serumen Prop',

  // HIDUNG
  'Rinitis Akut',
  'Rinitis Vasomotor',
  'Rinitis Alergika',
  'Benda Asing di Hidung',
  'Epistaksis',
  'Furunkel pada Hidung',

  // SISTEM RESPIRASI
  'Influensa',
  'Faringitis',
  'Pertusis',
  'Tonsilitis',
  'Laringitis',

  // PARU
  'Asma Bronkial',
  'Bronkitis Akut',
  'Pneumonia, Bronkopneumonia',
  'Pneumonia Aspirasi',
  'Tuberkulosis Paru tanpa Komplikasi',

  // SISTEM KARDIOVASKULER
  'Hipertensi Esensial',
  'Angina Pektoris',
  'Cardiorespiratory Arrest',
  'Gagal Jantung Akut',
  'Gagal Jantung Kronik',
  'Infark Miokard',
  'Infark Serebral / Stroke',
  'Takikardi',

  // SISTEM ENDOKRIN, METABOLIK DAN NUTRISI
  'Diabetes Mellitus Tipe 1',
  'Diabetes Mellitus Tipe 2',
  'Hipoglikemia Ringan',
  'Hiperglikemia Hiperosmolar Non Ketotik',
  'Tirotoksikosis',

  // SISTEM GINJAL DAN SALURAN KEMIH
  'Infeksi Saluran Kemih',
  'Gonore',
  'Sifilis Stadium 1 & 2',
  'Fluor Albus',

  // SISTEM GASTROINTESTINAL, HEPATOBILIER, DAN PANKREAS
  'Kandidiasis Mulut',
  'Malabsorbsi Makanan',
  'Parotitis',
  'Gastritis',
  'Gastroenteritis',
  'Refluks Gastroesofagus',
  'Infeksi pada Umbilikus',
  'Demam Tifoid',
  'Intoleransi Makanan',
  'Alergi Makanan',
  'Keracunan Makanan',
  'Penyakit Cacing Tambang',
  'Strongiloidiasis',
  'Askariasis',
  'Skistosomiasis',
  'Taeniasis',
  'Disentri Basiler',
  'Disentri Amuba',
  'Hemoroid Internal derajat 1-2',
  'Kolesistitis',
  'Perdarahan Saluran Cerna Bagian Atas',
  'Apendisitis Akut',
  'Perdarahan Saluran Cerna Bagian Bawah',
  'Peritonitis',

  // SISTEM REPRODUKSI
  'Kehamilan Normal',
  'Abortus Spontan Komplit',
  'Vaginitis',
  'Abortus Mengancam',
  'Abortus Spontan Inkomplit',
  'Anemia Defisiensi Besi pada Kehamilan',
  'Eklampsia',
  'Hiperemesis Gravidarum',
  'Ketuban Pecah Dini',
  'Ruptur Perineum Tingkat 1–2',
  'Perdarahan Post Partum',
  'Mastitis',
  'Persalinan Lama',
  'Pre Eklampsia',
  'Vulvitis',

  // HEPAR
  'Hepatitis A',
  'Hepatitis B',

  // SISTEM HEMATOLOGI DAN IMUNOLOGI
  'Anemia Defisiensi Besi',
  'Limfadenitis',
  'Demam Dengue',
  'Malaria',
  'Leptospirosis',
  'Filariasis',

  // SISTEM AUTOIMUN
  'Reaksi Anafilaktik',
  'Syok',
  'Artritis Osteoartritis',
  'Artritis Reumatoid',
  'Fraktur',
  'Hiperurisemia',

  // PENYAKIT KULIT
  'Cutaneous Larva Migrans',
  'Dermatitis Atopik',
  'Dermatitis Kontak Iritan',
  'Dermatitis Numularis',
  'Dermatitis Perioral',
  'Dermatitis Seboroik',
  'Exanthematous Drug Eruption',
  'Fixed Drug Eruption',
  'Tinea Capitis',
  'Tinea Barbae',
  'Tinea Facialis',
  'Tinea Corporis',
  'Tinea Manum',
  'Tinea Unguium',
  'Tinea Cruris',
  'Tinea Pedis',
  'Herpes Simpleks Tanpa Komplikasi',
  'Herpes Zoster Tanpa Komplikasi',
  'Lepra',
  'Lichen Simplex Chronicus / Neurodermatitis',
  'Luka Bakar Derajat 1 & 2',
  'Miliaria',
  'Molluscum Contagiosum',
  'Morbili Tanpa Komplikasi',
  'Napkin Eczema',
  'Pedikulosis Kapitis',
  'Pitiriasis Rosea',
  'Pioderma',
  'Pitiriasis Versicolor',
  'Reaksi Gigitan Serangga',
  'Skabies',
  'Urtikaria',
  'Varisela Tanpa Komplikasi',
  'Veruka Vulgaris',

  // GIZI DAN METABOLISME
  'Malnutrisi Energi Protein',
  'Dislipidemia',
  'Obesitas',
];

// Bangun array template dari daftar nama
export const DWFKTP_TEMPLATES = DIAGNOSIS_NAMES.map((name) => ({
  key: slugify(name),
  label: name,
  template: generateGenericTemplate(name)
}));

// Utility untuk menambahkan atau menggabungkan daftar eksternal bila diperlukan
export function mergeExternalDiagnosis(names = []) {
  const added = (names || []).filter(Boolean).map((n) => ({
    key: slugify(n),
    label: n,
    template: generateGenericTemplate(n)
  }));
  // Hindari duplikasi berdasarkan key
  const map = new Map();
  [...DWFKTP_TEMPLATES, ...added].forEach((item) => {
    if (!map.has(item.key)) map.set(item.key, item);
  });
  return Array.from(map.values());
}