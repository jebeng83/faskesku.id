import React, { useEffect, useMemo, useState } from 'react';
import { route } from 'ziggy-js';
import SearchableSelect from '../../../Components/SearchableSelect.jsx';
import { DWFKTP_TEMPLATES } from '../../../data/dwfktpTemplates.js';

export default function CpptSoap({ token = '', noRkmMedis = '', noRawat = '' }) {
    const now = useMemo(() => new Date(), []);
    // Template kustom yang lebih rinci
    const customTemplates = useMemo(() => ([
        {
            key: 'normal',
            label: 'Pemeriksaan Normal',
            template: {
                suhu_tubuh: '36.5',
                tensi: '120/80',
                nadi: '80',
                respirasi: '20',
                spo2: '96',
                gcs: '15',
                lingkar_perut: '72',
                alergi: 'Tidak Ada',
                keluhan: 'Pasien melakukan kontrol rutin.',
                pemeriksaan: 'Keadaan Umum : Baik, Composmentis\nThorax : Cor S1-2 intensitas normal, reguler, bising (-)\nPulmo : SDV +/+ ST -/-\nAbdomen : Supel, NT(-), peristaltik (+) normal.\nEXT : Oedem -/-',
                penilaian: 'Kondisi pasien stabil',
                instruksi: 'Istirahat Cukup, PHBS',
                rtl: 'Edukasi Kesehatan',
                evaluasi: 'Kontrol Ulang Jika belum Ada Perubahan'
            }
        },
        {
            key: 'hipertensi',
            label: 'Hipertensi',
            template: {
                suhu_tubuh: '36.8',
                tensi: '150/95',
                nadi: '85',
                respirasi: '18',
                spo2: '98',
                keluhan: 'Pasien mengatakan sudah beberapa minggu mengeluh pusing/sakit kepala, kadang berdebar. Riwayat tekanan darah tinggi.',
                pemeriksaan: 'Keadaan umum baik, CM; TD 150/95 mmHg; Nadi 85 x/menit reguler; RR 18 x/menit; Suhu 36.8°C; SpO2 98%. Tidak ada distress napas, JVP normal, edema tungkai (-), bunyi jantung normal.',
                penilaian: 'Hipertensi esensial (ICD-10: I10).',
                rtl: 'Edukasi diet rendah garam, olahraga teratur, monitoring tekanan darah. Terapi antihipertensi sesuai resep dan kontrol berkala.',
                instruksi: 'Pantau tekanan darah di rumah, hindari rokok/kafein.',
                evaluasi: 'Rencana kontrol 1-2 minggu untuk evaluasi TD dan gejala.'
            }
        },
        {
            key: 'influensa',
            label: 'Influensa',
            template: {
                suhu_tubuh: '38.5',
                tensi: '120/80',
                nadi: '95',
                respirasi: '22',
                spo2: '97',
                keluhan: 'Pasien mengatakan sudah 3 hari mengeluh demam, batuk, nyeri tenggorokan, pegal-pegal, pilek.',
                pemeriksaan: 'Keadaan umum baik, CM; TD 120/80 mmHg; Nadi 95 x/menit; RR 22 x/menit; Suhu 38.5°C; SpO2 97%. Rinorea (+), faring hiperemis, ronkhi (-), wheezing (-).',
                penilaian: 'Influenza (ICD-10: J10/J11).',
                rtl: 'Istirahat, hidrasi cukup, antipiretik, vitamin, terapi simptomatik. Anjuran masker dan etika batuk.',
                instruksi: 'Pantau suhu; bila sesak atau saturasi <94% segera ke IGD.',
                evaluasi: 'Kontrol 3-5 hari bila belum membaik atau muncul tanda bahaya.'
            }
        },
        {
            key: 'faringitis',
            label: 'Faringitis Akut',
            template: {
                suhu_tubuh: '38.0', tensi: '120/80', nadi: '90', respirasi: '20', spo2: '98',
                keluhan: 'Pasien mengatakan sudah 2-3 hari nyeri tenggorokan, nyeri saat menelan, demam ringan, tanpa sesak.',
                pemeriksaan: 'CM; TD 120/80; N 90; RR 20; Suhu 38.0°C; SpO2 98%. Faring hiperemis, eksudat (-), nyeri tekan kelenjar servikal anterior ringan.',
                penilaian: 'Faringitis akut (ICD-10: J02).',
                rtl: 'Simptomatik (analgesik/antipiretik, kumur air garam), edukasi; pertimbangkan antibiotik bila kriteria klinis terpenuhi.',
                instruksi: 'Minum hangat, istirahat, hindari iritan. Kembali bila muncul sesak, disfagia berat, atau demam tinggi.',
                evaluasi: 'Kontrol 2-3 hari bila belum membaik.'
            }
        },
        {
            key: 'tonsilitis',
            label: 'Tonsilitis Akut',
            template: {
                suhu_tubuh: '38.5', tensi: '120/80', nadi: '92', respirasi: '22', spo2: '97', gcs: '15', lingkar_perut: '72', alergi: 'Tidak Ada',
                keluhan: 'Pasien mengeluh nyeri tenggorokan hebat, sulit menelan, demam, suara berubah (bindeng), bau mulut, nyeri telinga. Riwayat infeksi saluran napas atas sebelumnya (+/-).',
                pemeriksaan: 'Keadaan Umum : Tampak Sakit Sedang, Composmentis\nTenggorokan : Tonsil T2-T3 hiperemis, eksudat putih/kekuningan (+)\nLeher : Nyeri tekan (+), pembesaran KGB (+)',
                penilaian: 'Tonsilitis akut (ICD-10: J03).',
                rtl: 'Pemberian antibiotik, analgetik, antipiretik. Observasi komplikasi.',
                instruksi: 'Istirahat total, minum air putih yang banyak, berkumur dengan air hangat yang diberi garam, makan makanan lunak, hindari makanan/minuman yang terlalu panas/dingin/pedas.',
                evaluasi: 'Kontrol 5 hari lagi atau jika demam/nyeri tidak membaik.'
            }
        },
        {
            key: 'bronkitis_akut',
            label: 'Bronkitis Akut',
            template: {
                suhu_tubuh: '37.8', tensi: '120/80', nadi: '88', respirasi: '20', spo2: '98',
                keluhan: 'Pasien mengatakan batuk berdahak sejak 3-4 hari, nyeri dada ringan saat batuk, demam ringan, tanpa sesak berat.',
                pemeriksaan: 'CM; TD 120/80; N 88; RR 20; Suhu 37.8°C; SpO2 98%. Ronkhi halus, wheezing ringan, tidak ada tanda pneumonia.',
                penilaian: 'Bronkitis akut (ICD-10: J20).',
                rtl: 'Simptomatik; pertimbangkan bronkodilator inhalasi bila bronkospasme. Antibiotik tidak rutin kecuali indikasi.',
                instruksi: 'Hindari rokok dan polusi; hidrasi cukup.',
                evaluasi: 'Kontrol 5-7 hari bila belum membaik atau muncul tanda bahaya.'
            }
        },
        {
            key: 'diare_akut',
            label: 'Diare Akut',
            template: {
                suhu_tubuh: '37.8', tensi: '120/80', nadi: '90', respirasi: '20', spo2: '98',
                keluhan: 'Pasien mengatakan sejak 1-2 hari diare cair 5x/hari, mual, tanpa darah, nafsu makan menurun.',
                pemeriksaan: 'CM; TD 120/80; N 90; RR 20; Suhu 37.8°C; SpO2 98%. Dehidrasi ringan, turgor agak menurun, nyeri tekan ringan abdomen difus.',
                penilaian: 'Gastroenteritis/Diare akut.',
                rtl: 'Rehidrasi oral (ORS), diet sesuai toleransi, terapi simptomatik. Antibiotik bila indikasi khusus.',
                instruksi: 'Waspadai tanda bahaya: BAB berdarah, muntah berulang, dehidrasi berat, demam tinggi.',
                evaluasi: 'Kontrol 1-2 hari bila tidak membaik.'
            }
        },
        {
            key: 'gastritis',
            label: 'Gastritis',
            template: {
                suhu_tubuh: '36.8', tensi: '120/80', nadi: '80', respirasi: '20', spo2: '98',
                keluhan: 'Pasien mengatakan 3 hari nyeri ulu hati, mual, kembung, terutama setelah makan pedas/asam.',
                pemeriksaan: 'CM; TD 120/80; N 80; RR 20; Suhu 36.8°C; SpO2 98%. Nyeri tekan epigastrium, tanpa tanda peritonitis.',
                penilaian: 'Gastritis (ICD-10: K29).',
                rtl: 'Modifikasi diet, terapi antasida/penekan asam sesuai pedoman, edukasi hindari iritan.',
                instruksi: 'Hindari kopi, pedas, asam, NSAID tanpa pengaman; kecilkan porsi makan tetapi sering.',
                evaluasi: 'Kontrol 5-7 hari atau lebih cepat bila memburuk.'
            }
        },
        {
            key: 'isk',
            label: 'Infeksi Saluran Kemih (ISK)',
            template: {
                suhu_tubuh: '37.6', tensi: '120/80', nadi: '84', respirasi: '20', spo2: '98',
                keluhan: 'Pasien mengatakan 2-3 hari disuria, anyang-anyangan, nyeri suprapubik, tanpa demam tinggi.',
                pemeriksaan: 'CM; TD 120/80; N 84; RR 20; Suhu 37.6°C; SpO2 98%. CVA tenderness (-), nyeri tekan suprapubik ringan.',
                penilaian: 'Infeksi saluran kemih akut (ICD-10: N39.0).',
                rtl: 'Hidrasi cukup, analgesik; antibiotik empiris sesuai pedoman bila indikasi.',
                instruksi: 'Minum air yang cukup, jaga kebersihan; kembali bila demam tinggi/nyeri pinggang.',
                evaluasi: 'Kontrol 3-5 hari bila belum membaik.'
            }
        },
        {
            key: 'konjungtivitis',
            label: 'Konjungtivitis Akut',
            template: {
                suhu_tubuh: '36.8', tensi: '120/80', nadi: '80', respirasi: '18', spo2: '98',
                keluhan: 'Pasien mengatakan 2 hari mata merah, gatal/berair, sedikit kotoran mata, penglihatan normal.',
                pemeriksaan: 'CM; TD 120/80; N 80; RR 18; Suhu 36.8°C; SpO2 98%. Injeksi konjungtiva difus, sekret ringan, kornea jernih.',
                penilaian: 'Konjungtivitis akut (ICD-10: H10).',
                rtl: 'Kebersihan mata, kompres hangat, obat tetes sesuai etiologi; edukasi hindari menyentuh mata.',
                instruksi: 'Cuci tangan sering, jangan berbagi handuk; segera kembali bila nyeri hebat atau penurunan visus.',
                evaluasi: 'Kontrol 3-5 hari bila belum membaik.'
            }
        },
        {
            key: 'otitis_media_akut',
            label: 'Otitis Media Akut',
            template: {
                suhu_tubuh: '38.0', tensi: '120/80', nadi: '92', respirasi: '20', spo2: '98',
                keluhan: 'Pasien mengatakan 2 hari nyeri telinga, demam ringan, kadang gangguan pendengaran sementara.',
                pemeriksaan: 'CM; TD 120/80; N 92; RR 20; Suhu 38.0°C; SpO2 98%. Membran timpani hiperemis/menonjol, TTP mastoid (-).',
                penilaian: 'Otitis media akut (ICD-10: H65/H66).',
                rtl: 'Analgesik/antipiretik; pertimbangkan antibiotik sesuai pedoman bila indikasi; edukasi.',
                instruksi: 'Hindari memasukkan benda ke telinga; kembali bila demam tinggi atau nyeri memburuk.',
                evaluasi: 'Kontrol 2-3 hari bila belum membaik.'
            }
        },
        {
            key: 'dermatitis_kontak',
            label: 'Dermatitis Kontak Iritan',
            template: {
                suhu_tubuh: '36.8', tensi: '120/80', nadi: '80', respirasi: '18', spo2: '98',
                keluhan: 'Pasien mengatakan gatal dan kemerahan pada kulit setelah paparan bahan iritan tertentu.',
                pemeriksaan: 'Lesi eritematous di area paparan, vesikel/papul dapat ditemukan, tanpa infeksi sekunder.',
                penilaian: 'Dermatitis kontak iritan.',
                rtl: 'Hindari iritan, gunakan emolien/topikal sesuai pedoman; edukasi perawatan kulit.',
                instruksi: 'Gunakan sarung tangan bila perlu; kembali bila meluas atau ada tanda infeksi.',
                evaluasi: 'Kontrol 5-7 hari bila belum membaik.'
            }
        },
        {
            key: 'dermatitis_atopik',
            label: 'Dermatitis Atopik',
            template: {
                suhu_tubuh: '36.8', tensi: '120/80', nadi: '80', respirasi: '18', spo2: '98',
                keluhan: 'Pasien mengatakan gatal kronik berulang di lipatan kulit, terutama malam hari.',
                pemeriksaan: 'Xerosis, likenifikasi pada area fleksural, tanda garukan; tanpa infeksi sekunder.',
                penilaian: 'Dermatitis atopik.',
                rtl: 'Emolien rutin, kortikosteroid topikal bila indikasi, edukasi kontrol flare.',
                instruksi: 'Hindari sabun keras/iritan, mandi singkat; kembali bila tidak terkontrol.',
                evaluasi: 'Kontrol 1-2 minggu untuk evaluasi terapi.'
            }
        },
        {
            key: 'low_back_pain',
            label: 'Low Back Pain',
            template: {
                suhu_tubuh: '36.8', tensi: '120/80', nadi: '80', respirasi: '18', spo2: '98',
                keluhan: 'Pasien mengatakan 1 minggu nyeri punggung bawah, tidak ada red flags (inkontinensia, kelemahan progresif, demam tinggi).',
                pemeriksaan: 'TTP paravertebral lumbal, ROM sedikit terbatas akibat nyeri, tes neurologis perifer normal.',
                penilaian: 'Nyeri punggung bawah non spesifik.',
                rtl: 'Analgesik, kompres hangat, latihan peregangan; edukasi ergonomi.',
                instruksi: 'Hindari mengangkat beban berat; kembali bila muncul red flags.',
                evaluasi: 'Kontrol 1-2 minggu untuk evaluasi perbaikan.'
            }
        },
        {
            key: 'dm_tipe_2',
            label: 'Diabetes Mellitus Tipe 2 (stabil)',
            template: {
                suhu_tubuh: '36.8', tensi: '130/80', nadi: '80', respirasi: '18', spo2: '98',
                keluhan: 'Pasien mengatakan poliuria/polidipsia, kadang lemas; sedang menjalani kontrol rutin.',
                pemeriksaan: 'CM; TD 130/80; N 80; RR 18; Suhu 36.8°C; SpO2 98%. Pemeriksaan foot care dasar, edukasi diet/aktivitas.',
                penilaian: 'Diabetes mellitus tipe 2 (ICD-10: E11).',
                rtl: 'Edukasi diet, aktivitas fisik, kepatuhan obat; rencanakan pemeriksaan gula darah; tata laksana sesuai pedoman.',
                instruksi: 'Pantau gula darah bila tersedia; kenali tanda hipoglikemia/hiperglikemia.',
                evaluasi: 'Kontrol 2-4 minggu atau sesuai jadwal program DM.'
            }
        },
        // Template Gigi
        {
            key: 'karies_gigi',
            label: 'Karies Gigi (Caries dentis)',
            template: {
                suhu_tubuh: '36.8', tensi: '120/80', nadi: '80', respirasi: '18', spo2: '98',
                keluhan: 'Pasien mengatakan nyeri gigi saat makan manis/dingin dan kadang terasa ngilu beberapa hari terakhir.',
                pemeriksaan: 'Kavitas pada permukaan gigi terkena, tes perkusi ringan (+/-), tidak ada pembengkakan gingiva signifikan.',
                penilaian: 'Karies dentis.',
                rtl: 'Edukasi kebersihan mulut, pertimbangkan restorasi/penambalan; analgesik bila perlu.',
                instruksi: 'Sikat gigi teratur, kurangi gula; rujuk ke dokter gigi untuk tindakan definitif.',
                evaluasi: 'Kontrol 1 minggu untuk evaluasi nyeri dan rencana tindakan.'
            }
        },
        {
            key: 'gingivitis',
            label: 'Gingivitis',
            template: {
                suhu_tubuh: '36.8', tensi: '120/80', nadi: '80', respirasi: '18', spo2: '98',
                keluhan: 'Pasien mengatakan gusi bengkak dan mudah berdarah saat menyikat gigi, kadang bau mulut.',
                pemeriksaan: 'Eritema dan edema gingiva, kalkulus/plaques terlihat, perdarahan mudah saat probing ringan.',
                penilaian: 'Gingivitis.',
                rtl: 'Edukasi oral hygiene, pertimbangkan scaling/cleaning; obat kumur antiseptik bila perlu.',
                instruksi: 'Sikat gigi teknik yang benar; rujuk ke dokter gigi untuk tindakan.',
                evaluasi: 'Kontrol 1-2 minggu untuk evaluasi perbaikan.'
            }
        },
        {
            key: 'pulpitis_akut',
            label: 'Pulpitis Akut',
            template: {
                suhu_tubuh: '36.8', tensi: '120/80', nadi: '80', respirasi: '18', spo2: '98',
                keluhan: 'Pasien mengatakan nyeri berdenyut pada gigi, bertambah saat malam, nyeri saat dingin/panas.',
                pemeriksaan: 'Tes perkusi (+), kavitas dalam/karies aktif, sensitivitas termal meningkat.',
                penilaian: 'Pulpitis akut.',
                rtl: 'Analgesik; rujuk ke dokter gigi untuk terapi endodontik atau tindakan definitif.',
                instruksi: 'Hindari pemicu (dingin/panas), jaga kebersihan mulut.',
                evaluasi: 'Kontrol 2-3 hari bila nyeri tidak membaik.'
            }
        },
        {
            key: 'abses_periapikal',
            label: 'Abses Periapikal',
            template: {
                suhu_tubuh: '37.8', tensi: '120/80', nadi: '88', respirasi: '18', spo2: '98',
                keluhan: 'Pasien mengatakan bengkak lokal pada gusi/pipi dengan nyeri berdenyut, kadang demam ringan.',
                pemeriksaan: 'Fluktuasi lokal (+), nyeri tekan, gigi terkait sensitif; tanda selulitis wajah (-).',
                penilaian: 'Abses periapikal.',
                rtl: 'Pertimbangkan drainase; analgesik; antibiotik bila ada tanda penyebaran infeksi; rujuk ke dokter gigi.',
                instruksi: 'Kompres hangat; segera kembali bila pembengkakan meluas/ demam tinggi.',
                evaluasi: 'Kontrol 2-3 hari untuk evaluasi perbaikan.'
            }
        },
        // Tambahan sesuai permintaan: ISPA ringan (dewasa/anak), Centor cue, Periodontitis, Obstetri awal
        {
            key: 'ispa_ringan_dewasa',
            label: 'ISPA Ringan (Dewasa)',
            template: {
                suhu_tubuh: '37.8', tensi: '120/80', nadi: '88', respirasi: '20', spo2: '98',
                keluhan: 'Pasien mengatakan 2-3 hari batuk, pilek, demam ringan, nyeri tenggorokan, tidak sesak.',
                pemeriksaan: 'CM; TD 120/80; N 88; RR 20; Suhu 37.8°C; SpO2 98%. Rinorea (+), faring hiperemis ringan, ronkhi (-), wheezing (-), tidak ada tanda pneumonia.',
                penilaian: 'ISPA ringan (dewasa).',
                rtl: 'Istirahat, hidrasi, antipiretik/analgesik bila perlu, terapi simptomatik (misal dekongestan/antitusif sesuai pedoman). Antibiotik tidak rutin bila tanpa indikasi.',
                instruksi: 'Masker dan etika batuk, hindari rokok. Kembali bila muncul demam tinggi, sesak, atau saturasi <94%.',
                evaluasi: 'Kontrol 3-5 hari bila belum membaik.'
            }
        },
        {
            key: 'ispa_ringan_anak',
            label: 'ISPA Ringan (Anak)',
            template: {
                suhu_tubuh: '38.0', tensi: '—', nadi: '—', respirasi: '—', spo2: '98',
                keluhan: 'Orangtua mengatakan anak 2-3 hari batuk, pilek, demam ringan, makan/minum agak berkurang, tanpa sesak.',
                pemeriksaan: 'CM; Suhu 38.0°C; SpO2 98%. Frekuensi napas sesuai usia, retraksi (-), stridor (-), sianosis (-). Hidung berair, faring hiperemis ringan, auskultasi paru bersih.',
                penilaian: 'ISPA ringan (anak).',
                rtl: 'Edukasi cairan cukup, kompres hangat, antipiretik sesuai dosis anak, terapi simptomatik (saline nasal, humidifier). Antibiotik tidak rutin bila tanpa indikasi.',
                instruksi: 'Cue tanda bahaya ISPA anak: [ ] napas cepat sesuai usia, [ ] retraksi dinding dada, [ ] stridor, [ ] sianosis, [ ] minum sangat berkurang, [ ] kejang. Segera ke IGD bila ada tanda bahaya.',
                evaluasi: 'Kontrol 2-3 hari atau lebih cepat bila memburuk.'
            }
        },
        {
            key: 'faringitis_centor',
            label: 'Faringitis (Skor Centor - cue)',
            template: {
                suhu_tubuh: '38.0', tensi: '120/80', nadi: '90', respirasi: '20', spo2: '98',
                keluhan: 'Pasien mengatakan 2-3 hari nyeri tenggorokan, nyeri saat menelan, demam ringan; batuk biasanya tidak ada pada etiologi bakterial.',
                pemeriksaan: 'Faring hiperemis, eksudat tonsil (+/-), LA servikal anterior nyeri (+/-). CM; TD 120/80; N 90; RR 20; Suhu 38.0°C; SpO2 98%.',
                penilaian: 'Faringitis akut (pertimbangkan etiologi viral vs streptokokus).',
                rtl: 'Simptomatik (analgesik/antipiretik, kumur air garam). Pertimbangkan antibiotik bila skor klinis tinggi sesuai pedoman.',
                instruksi: 'Cue Skor Centor (checklist): [ ] Demam (>38°C), [ ] Tidak batuk, [ ] LA servikal anterior nyeri/pembesaran, [ ] Eksudat tonsil. Interpretasi: 0-1 simptomatik; 2-3 pertimbangkan uji strep/ kultur; ≥4 pertimbangkan antibiotik sesuai pedoman klinis.',
                evaluasi: 'Kontrol 2-3 hari bila belum membaik atau muncul tanda bahaya.'
            }
        },
        {
            key: 'tonsilitis_centor',
            label: 'Tonsilitis (Skor Centor - cue)',
            template: {
                suhu_tubuh: '38.5', tensi: '120/80', nadi: '95', respirasi: '20', spo2: '98',
                keluhan: 'Pasien mengatakan 3 hari nyeri tenggorokan dengan demam, nyeri saat menelan, bau mulut; batuk biasanya tidak ada pada etiologi bakterial.',
                pemeriksaan: 'Tonsil hiperemis, eksudat (+), LA servikal anterior (+). CM; TD 120/80; N 95; RR 20; Suhu 38.5°C; SpO2 98%.',
                penilaian: 'Tonsilitis akut (pertimbangkan streptokokus vs viral).',
                rtl: 'Simptomatik; pertimbangkan antibiotik sesuai skor klinis/pedoman dan kontraindikasi.',
                instruksi: 'Cue Skor Centor (checklist): [ ] Demam (>38°C), [ ] Tidak batuk, [ ] LA servikal anterior nyeri/pembesaran, [ ] Eksudat tonsil. Gunakan skor untuk keputusan terapi (0-1 simptomatik, 2-3 uji strep, ≥4 pertimbangkan antibiotik).',
                evaluasi: 'Kontrol 3-5 hari atau lebih cepat bila disfagia berat/sesak.'
            }
        },
        {
            key: 'periodontitis_ringan',
            label: 'Periodontitis Ringan',
            template: {
                suhu_tubuh: '36.8', tensi: '120/80', nadi: '80', respirasi: '18', spo2: '98',
                keluhan: 'Pasien mengatakan gusi mudah berdarah, bengkak ringan, bau mulut, kadang nyeri saat mengunyah.',
                pemeriksaan: 'Edema dan eritema gingiva, perdarahan saat probing ringan, kalkulus/plaques terlihat, mobilitas gigi (-).',
                penilaian: 'Periodontitis ringan.',
                rtl: 'Edukasi oral hygiene, scaling/cleaning; pertimbangkan obat kumur antiseptik; analgesik bila nyeri.',
                instruksi: 'Sikat gigi teknik yang benar, gunakan dental floss; rujuk ke dokter gigi untuk manajemen periodontal.',
                evaluasi: 'Kontrol 2 minggu untuk evaluasi perbaikan setelah tindakan kebersihan mulut.'
            }
        },
        {
            key: 'obstetri_trimester_awal',
            label: 'Obstetri: Keluhan Trimester Awal (tanpa red flags)',
            template: {
                suhu_tubuh: '36.8', tensi: '110/70', nadi: '82', respirasi: '18', spo2: '99',
                keluhan: 'Pasien mengatakan mual/muntah ringan, pusing, payudara tegang; dugaan hamil trimester awal; tanpa perdarahan/nyeri hebat.',
                pemeriksaan: 'CM; TD 110/70; N 82; RR 18; Suhu 36.8°C; SpO2 99%. Abdomen lembut, tanda iritasi peritoneum (-), dehidrasi (-).',
                penilaian: 'Keluhan trimester awal tanpa tanda bahaya (morning sickness).',
                rtl: 'Edukasi nutrisi kecil tapi sering, hidrasi, istirahat; pertimbangkan suplemen sesuai pedoman antenatal. Konseling tanda bahaya.',
                instruksi: 'Cue red flags: [ ] perdarahan pervaginam, [ ] nyeri perut hebat, [ ] demam tinggi, [ ] muntah berat/hiperemesis, [ ] pusing berat/sinkope. Segera ke fasilitas lanjutan bila ada tanda bahaya.',
                evaluasi: 'Kontrol sesuai jadwal antenatal atau lebih cepat bila keluhan memberat.'
            }
        },
        // Sinkronisasi tambahan dari pemeriksaan.blade.php
        {
            key: 'disfungsi_ereksi',
            label: 'Disfungsi Ereksi',
            template: {
                suhu_tubuh: '36.5', tensi: '130/80', nadi: '80', respirasi: '20', spo2: '98', gcs: '15', lingkar_perut: '90', alergi: 'Tidak Ada',
                keluhan: 'Pasien mengeluh kesulitan mencapai/mempertahankan ereksi yang cukup untuk berhubungan. Keluhan dirasakan > 3 bulan. Riwayat DM (+/-), hipertensi (+/-), merokok (+/-), stres (+/-), alkohol (+/-).',
                pemeriksaan: 'Keadaan Umum : Baik, Composmentis\nThorax : Cor S1-2 intensitas normal, reguler, bising (-)\nPulmo : SDV +/+ ST -/-\nAbdomen : Supel, NT(-), peristaltik (+) normal\nGenitalia : Dalam batas normal',
                penilaian: 'Disfungsi Ereksi.',
                instruksi: 'Kelola faktor risiko (kontrol gula darah/tekanan darah, berhenti merokok, kurangi alkohol), kurangi stres, komunikasi terbuka dengan pasangan, olahraga teratur.',
                rtl: 'Pemberian PDE5 inhibitor sesuai indikasi. Terapi faktor risiko yang mendasari. Konseling psikologis bila diperlukan.',
                evaluasi: 'Kontrol 1 bulan lagi untuk evaluasi respon pengobatan.'
            }
        },
        {
            key: 'gagal_jantung',
            label: 'Gagal Jantung',
            template: {
                suhu_tubuh: '36.5', tensi: '140/90', nadi: '96', respirasi: '24', spo2: '92', gcs: '15', lingkar_perut: '90', alergi: 'Tidak Ada',
                keluhan: 'Pasien mengeluh sesak napas terutama saat beraktivitas/berbaring, mudah lelah, kaki bengkak, terbangun malam hari karena sesak. Riwayat hipertensi (+/-), penyakit jantung koroner (+/-), DM (+/-).',
                pemeriksaan: 'Keadaan Umum : Tampak Lemah, Composmentis\nThorax : Cor S1-2 intensitas melemah, reguler/tidak, bising (+/-), gallop (+/-)\nPulmo : SDV +/+ menurun, Ronkhi basah halus +/+\nAbdomen : Supel, NT(-), peristaltik (+) normal, hepatomegali (+/-)\nExt : Edema pretibial (+/+), akral hangat/dingin',
                penilaian: 'Gagal Jantung.',
                instruksi: 'Batasi aktivitas fisik berat, diet rendah garam dan lemak, istirahat cukup dengan posisi kepala ditinggikan, pantau berat badan, batasi asupan cairan.',
                rtl: 'Pemberian diuretik, ACE-inhibitor, Beta blocker sesuai indikasi. Monitoring gejala dan tanda gagal jantung.',
                evaluasi: 'Kontrol 7 hari lagi atau segera jika sesak memberat.'
            }
        },
        {
            key: 'maag_dispepsia',
            label: 'Maag / Dispepsia',
            template: {
                suhu_tubuh: '36.5', tensi: '120/80', nadi: '80', respirasi: '20', spo2: '98', gcs: '15', lingkar_perut: '78', alergi: 'Tidak Ada',
                keluhan: 'Pasien mengeluh nyeri ulu hati, kembung, mual, muntah, cepat kenyang. Keluhan memberat saat perut kosong/stres. Riwayat konsumsi makanan pedas/asam/berlemak (+), minum kopi/alkohol (+/-), stress (+/-).',
                pemeriksaan: 'Keadaan Umum : Baik, Composmentis\nThorax : Cor S1-2 intensitas normal, reguler, bising (-)\nPulmo : SDV +/+ ST -/-\nAbdomen : Supel, nyeri tekan epigastrium (+), defans muskular (-), peristaltik (+) normal',
                penilaian: 'Dispepsia/Gastritis.',
                instruksi: 'Makan porsi kecil tapi sering, hindari makanan pedas/asam/berlemak/gorengan, kurangi kopi/alkohol/coklat/mint, hindari makan < 3 jam sebelum tidur, kelola stres.',
                rtl: 'Pemberian antasida, PPI/H2 blocker. Observasi faktor pemicu.',
                evaluasi: 'Kontrol 7 hari lagi atau jika keluhan tidak membaik.'
            }
        },
        {
            key: 'keputihan_vaginitis',
            label: 'Keputihan (Vaginitis)',
            template: {
                suhu_tubuh: '36.8', tensi: '110/70', nadi: '80', respirasi: '20', spo2: '98', gcs: '15', lingkar_perut: '70', alergi: 'Tidak Ada',
                keluhan: 'Pasien mengeluh keputihan abnormal (berwarna putih/kekuningan/kehijauan/keabu-abuan, berbau tidak sedap, gatal, jumlah banyak). Kadang disertai nyeri saat BAK/berhubungan, kemerahan pada area genital.',
                pemeriksaan: 'Keadaan Umum : Baik, Composmentis\nGenitalia Eksterna : Kemerahan (+/-), flour albus (+) warna putih/kuning/hijau/abu-abu, konsistensi kental/encer\nNyeri tekan suprapubik (-/+) ',
                penilaian: 'Vaginitis (Bacterial Vaginosis/Kandidiasis/Trikomoniasis).',
                instruksi: 'Jaga kebersihan area genital, gunakan pakaian dalam dari katun dan tidak ketat, ganti pembalut/pantyliner secara teratur, keringkan area genital setelah BAK/BAB, hindari douching.',
                rtl: 'Pemberian antifungal/antibiotik oral/topikal sesuai indikasi. Edukasi kebersihan genital.',
                evaluasi: 'Kontrol 7 hari lagi atau jika keluhan tidak membaik.'
            }
        },
        {
            key: 'stomatitis',
            label: 'Stomatitis',
            template: {
                suhu_tubuh: '36.5', tensi: '120/80', nadi: '80', respirasi: '20', spo2: '98', gcs: '15', lingkar_perut: '72', alergi: 'Tidak Ada',
                keluhan: 'Pasien mengeluh sariawan/luka di mulut, nyeri saat makan/minum/bicara, mulut terasa panas, air liur berlebih. Riwayat trauma (-/+), stres (+/-), kurang vitamin (+/-).',
                pemeriksaan: 'Keadaan Umum : Baik, Composmentis\nMulut : Ulkus pada mukosa mulut/lidah/gusi, diameter <1 cm, dasar putih/kekuningan, tepi kemerahan, nyeri tekan (+)',
                penilaian: 'Stomatitis Aftosa.',
                instruksi: 'Menjaga kebersihan mulut, sikat gigi dengan sikat lembut, hindari makanan pedas/asam/keras/panas, perbanyak minum air putih, hindari stres.',
                rtl: 'Pemberian obat kumur antiseptik, gel anestesi lokal, kortikosteroid topikal. Suplemen vitamin B kompleks.',
                evaluasi: 'Kontrol 7 hari lagi atau jika keluhan tidak membaik.'
            }
        },
        {
            key: 'insomnia',
            label: 'Insomnia',
            template: {
                suhu_tubuh: '36.5', tensi: '130/80', nadi: '88', respirasi: '20', spo2: '98', gcs: '15', lingkar_perut: '80', alergi: 'Tidak Ada',
                keluhan: 'Pasien mengeluh sulit memulai/mempertahankan tidur, atau bangun terlalu awal dan tidak bisa tidur kembali. Keluhan dirasakan >1 bulan dan mengganggu aktivitas sehari-hari. Riwayat stres (+), depresi (+/-), cemas (+/-).',
                pemeriksaan: 'Keadaan Umum : Baik, Composmentis\nTanda Vital : Dalam batas normal\nTanda depresi/ansietas : (+/-)\nPemeriksaan fisik lainnya dalam batas normal',
                penilaian: 'Insomnia.',
                instruksi: 'Tidur dan bangun pada jam yang sama setiap hari, hindari tidur siang terlalu lama, hindari kafein/alkohol/nikotin terutama di malam hari, olahraga teratur (tapi tidak dekat waktu tidur), lingkungan tidur yang nyaman.',
                rtl: 'Pemberian sedatif-hipnotik dengan dosis minimal sesuai indikasi dan jangka pendek. Terapi kognitif perilaku untuk insomnia jika tersedia.',
                evaluasi: 'Kontrol 14 hari lagi untuk evaluasi kualitas tidur.'
            }
        },
        {
            key: 'stroke_cva',
            label: 'Stroke (CVA)',
            template: {
                suhu_tubuh: '36.8', tensi: '160/100', nadi: '92', respirasi: '22', spo2: '96', gcs: '13-15', lingkar_perut: '90', alergi: 'Tidak Ada',
                keluhan: 'Pasien datang dengan riwayat kelemahan/kelumpuhan anggota gerak (kanan/kiri), pelo/sulit bicara, mulut mencong, kesadaran menurun. Riwayat hipertensi (+/-), DM (+/-), dislipidemia (+/-), merokok (+/-).',
                pemeriksaan: 'Keadaan Umum : Tampak Lemah, Composmentis/Somnolen\nThorax : Cor S1-2 intensitas normal, reguler, bising (-)\nPulmo : SDV +/+ ST -/-\nNeurologis : GCS E(4) V(4-5) M(6), kekuatan motorik (menurun/hemiplegi), refleks patologis (+/-), sensibilitas (menurun/normal)',
                penilaian: 'Cerebrovascular Accident (CVA/Stroke).',
                instruksi: 'Posisi kepala elevasi 30 derajat, mobilisasi bertahap sesuai kemampuan, latihan fisioterapi, hindari makanan yang sulit ditelan, kontrol faktor risiko (tekanan darah, gula darah, kolesterol).',
                rtl: 'Kontrol rutin ke poliklinik saraf. Manajemen faktor risiko. Rehabilitasi medik.',
                evaluasi: 'Kontrol 7 hari lagi atau segera jika keluhan memberat.'
            }
        },
        {
            key: 'helminthiasis_cacingan',
            label: 'Cacingan (Helminthiasis)',
            template: {
                suhu_tubuh: '36.5', tensi: '100/70', nadi: '88', respirasi: '20', spo2: '96', gcs: '15', lingkar_perut: '65', alergi: 'Tidak Ada',
                keluhan: 'Pasien/orangtua mengeluhkan perut sering sakit, nafsu makan menurun, BB tidak naik/menurun, pucat, lemah, dan kadang BAB dengan cacing/telur cacing. Riwayat sanitasi buruk (+/-), kebiasaan tidak cuci tangan (+/-).',
                pemeriksaan: 'Keadaan Umum : Tampak Lemah, Composmentis\nThorax : Cor S1-2 intensitas normal, reguler, bising (-)\nPulmo : SDV +/+ ST -/-\nAbdomen : Supel, nyeri tekan umbilikal (+/-), peristaltik (+) normal\nKonjungtiva : Anemis (+/-)',
                penilaian: 'Helminthiasis (Cacingan).',
                instruksi: 'Minum obat cacing sesuai dosis, jaga kebersihan tangan dan kuku, selalu cuci tangan sebelum makan dan setelah BAB, gunakan air bersih, makan makanan yang sudah dimasak dengan baik.',
                rtl: 'Pemberian obat cacing (albendazole/mebendazole). Suplemen Fe jika anemia. Edukasi PHBS.',
                evaluasi: 'Kontrol 2 minggu lagi untuk evaluasi keluhan.'
            }
        }
    ]), []);

    // Opsi templates gabungan (kustom + daftar FKTP)
    const templateOptions = useMemo(() => {
        const base = [
            ...customTemplates.map((t) => ({ key: t.key, label: t.label })),
            ...DWFKTP_TEMPLATES.map((t) => ({ key: t.key, label: t.label }))
        ];
        const seen = new Set();
        return base.filter((opt) => { if (seen.has(opt.key)) return false; seen.add(opt.key); return true; });
    }, [customTemplates]);

    // Peta key -> isi template
    const templatesMap = useMemo(() => {
        const map = {};
        // Masukkan generik dulu
        DWFKTP_TEMPLATES.forEach((t) => { map[t.key] = t.template; });
        // Lalu override dengan template khusus agar prioritas custom
        customTemplates.forEach((t) => { map[t.key] = t.template; });
        return map;
    }, [customTemplates]);
    const [formData, setFormData] = useState({
        tgl_perawatan: now.toISOString().slice(0, 10),
        jam_rawat: now.toTimeString().slice(0, 5),
        suhu_tubuh: '',
        tensi: '',
        nadi: '',
        respirasi: '',
        tinggi: '',
        berat: '',
        spo2: '',
        gcs: '',
        kesadaran: 'Compos Mentis',
        keluhan: '',
        pemeriksaan: '',
        alergi: '',
        lingkar_perut: '',
        rtl: '',
        penilaian: '',
        instruksi: '',
        evaluasi: '',
        nip: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [list, setList] = useState([]);
    const [loadingList, setLoadingList] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [pegawaiOptions, setPegawaiOptions] = useState([]);
    const [pegawaiQuery, setPegawaiQuery] = useState('');
    const [editKey, setEditKey] = useState(null); // { no_rawat, tgl_perawatan, jam_rawat }
    // Bridging PCare states
    const [showBridging, setShowBridging] = useState(false); // tampilkan tombol setelah pendaftaran sukses
    const [bridgingOpen, setBridgingOpen] = useState(false); // kontrol popup modal
    const [pcarePendaftaran, setPcarePendaftaran] = useState(null); // data dari tabel pcare_pendaftaran
    const [kunjunganActive, setKunjunganActive] = useState(false); // checklist aktifkan kartu kunjungan
    const [rujukanActive, setRujukanActive] = useState(false); // checklist aktifkan kartu rujukan
    const [kunjunganPreview, setKunjunganPreview] = useState(null); // payload preview kunjungan
    const [sendingKunjungan, setSendingKunjungan] = useState(false);
    const [kunjunganResult, setKunjunganResult] = useState(null); // hasil kirim kunjungan
    const [rujukForm, setRujukForm] = useState({ kdppk: '', tglEstRujuk: '', kdSubSpesialis1: '', kdSarana: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [selectedTemplate, setSelectedTemplate] = useState('');
    const applyTemplate = (key) => {
        const tpl = key ? templatesMap[key] : null;
        if (!tpl) return;
        setFormData((prev) => ({
            ...prev,
            // Keep tgl_perawatan, jam_rawat, kesadaran, nip as-is
            suhu_tubuh: tpl.suhu_tubuh || '',
            tensi: tpl.tensi || '',
            nadi: tpl.nadi || '',
            respirasi: tpl.respirasi || '',
            spo2: tpl.spo2 || '',
            gcs: tpl.gcs || prev.gcs || '',
            lingkar_perut: tpl.lingkar_perut || prev.lingkar_perut || '',
            keluhan: tpl.keluhan || '',
            pemeriksaan: tpl.pemeriksaan || '',
            penilaian: tpl.penilaian || '',
            rtl: tpl.rtl || '',
            instruksi: tpl.instruksi || '',
            evaluasi: tpl.evaluasi || '',
            alergi: tpl.alergi || prev.alergi || '',
        }));
    };
    const clearTemplateFields = () => {
        setFormData((prev) => ({
            ...prev,
            suhu_tubuh: '',
            tensi: '',
            nadi: '',
            respirasi: '',
            spo2: '',
            keluhan: '',
            pemeriksaan: '',
            penilaian: '',
            rtl: '',
            instruksi: '',
            evaluasi: '',
        }));
        setSelectedTemplate('');
    };

    const kesadaranOptions = [
        'Compos Mentis','Somnolence','Sopor','Coma','Alert','Confusion','Voice','Pain','Unresponsive','Apatis','Delirium'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const creating = !editKey;
            const url = creating ? route('rawat-jalan.pemeriksaan-ralan.store') : route('rawat-jalan.pemeriksaan-ralan.update');
            const payload = creating
                ? { ...formData, no_rawat: noRawat, t: token }
                : { ...formData, key: editKey };
            const res = await fetch(url, {
                method: creating ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                credentials: 'same-origin',
                body: JSON.stringify(payload),
            });
            const text = await res.text();
            let json;
            try { json = text ? JSON.parse(text) : {}; } catch (_) { json = {}; }
            if (!res.ok) {
                const msg = (json && (json.message || (json.errors && Object.values(json.errors).flat().join(', ')))) || `Gagal menyimpan (${res.status})`;
                setError(msg);
                setMessage(null);
                return;
            }
            setError(null);
            setMessage(json.message || (creating ? 'Pemeriksaan tersimpan' : 'Pemeriksaan diperbarui'));
            await fetchList();
            setFormData((prev) => ({
                ...prev,
                suhu_tubuh: '', tensi: '', nadi: '', respirasi: '', tinggi: '', berat: '', spo2: '', gcs: '',
                keluhan: '', pemeriksaan: '', alergi: '', lingkar_perut: '', rtl: '', penilaian: '', instruksi: '', evaluasi: ''
            }));
            setPegawaiQuery('');
            setEditKey(null);

            // Setelah pemeriksaan tersimpan, otomatis hit ke BPJS PCare: pendaftaran
            try {
                // Gunakan endpoint API langsung untuk memastikan kompatibilitas Ziggy
                const pcareUrl = '/api/pcare/pendaftaran';
                const pcarePayload = {
                    no_rawat: noRawat,
                    tgl_perawatan: payload.tgl_perawatan,
                    keluhan: payload.keluhan,
                    tensi: payload.tensi,
                    nadi: payload.nadi,
                    respirasi: payload.respirasi,
                    lingkar_perut: payload.lingkar_perut,
                    berat: payload.berat,
                    tinggi: payload.tinggi,
                };
                const pcareRes = await fetch(pcareUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify(pcarePayload),
                });
                const pcareText = await pcareRes.text();
                let pcareJson;
                try { pcareJson = pcareText ? JSON.parse(pcareText) : {}; } catch (_) { pcareJson = {}; }
                if (pcareRes.ok) {
                    // Ambil noUrut dari response BPJS bila ada
                    const noUrut = (pcareJson && pcareJson.response && pcareJson.response.field === 'noUrut') ? (pcareJson.response.message || '') : '';
                    setMessage((prev) => `${prev || ''} • Pendaftaran PCare terkirim${noUrut ? ' (No Urut: ' + noUrut + ')' : ''}`.trim());
                    // Tampilkan tombol Bridging PCare setelah sukses
                    setShowBridging(true);
                } else {
                    const errMsg = (pcareJson && pcareJson.metaData && pcareJson.metaData.message) ? pcareJson.metaData.message : `Gagal pendaftaran PCare (${pcareRes.status})`;
                    setError(errMsg);
                }
            } catch (e) {
                setError(`Gagal koneksi ke PCare: ${e.message || e}`);
            }
        } catch (e) {
            setError(e.message || 'Terjadi kesalahan saat menyimpan');
            setMessage(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Bridging PCare helpers
    const openBridgingModal = async () => {
        setBridgingOpen(true);
        setKunjunganResult(null);
        // Ambil data pendaftaran dari tabel pcare_pendaftaran
        try {
            const res = await fetch(`/api/pcare/pendaftaran/rawat/${encodeURIComponent(noRawat)}`, { headers: { 'Accept': 'application/json' } });
            const json = await res.json();
            setPcarePendaftaran(json.data || null);
        } catch (_) {
            setPcarePendaftaran(null);
        }
    };

    const closeBridgingModal = () => {
        setBridgingOpen(false);
        setKunjunganActive(false);
        setRujukanActive(false);
        setKunjunganPreview(null);
        setKunjunganResult(null);
    };

    const toggleKunjungan = async (checked) => {
        setKunjunganActive(checked);
        setKunjunganResult(null);
        if (checked) {
            try {
                const res = await fetch(`/api/pcare/kunjungan/preview/${encodeURIComponent(noRawat)}`, { headers: { 'Accept': 'application/json' } });
                const json = await res.json();
                if (json && json.success) {
                    setKunjunganPreview(json.payload || null);
                } else {
                    setKunjunganPreview(null);
                }
            } catch (e) {
                setKunjunganPreview(null);
            }
        } else {
            setKunjunganPreview(null);
        }
    };

    const sendKunjungan = async () => {
        if (!kunjunganPreview) return;
        setSendingKunjungan(true);
        setKunjunganResult(null);
        const payload = { ...kunjunganPreview };
        const fmtDate = (d) => {
            if (!d) return null;
            try {
                const dt = new Date(d);
                const dd = String(dt.getDate()).padStart(2, '0');
                const mm = String(dt.getMonth() + 1).padStart(2, '0');
                const yyyy = dt.getFullYear();
                return `${dd}-${mm}-${yyyy}`;
            } catch (_) {
                return d;
            }
        };
        if (rujukanActive && rujukForm.kdppk) {
            payload.rujukLanjut = {
                kdppk: rujukForm.kdppk,
                tglEstRujuk: fmtDate(rujukForm.tglEstRujuk) || null,
                subSpesialis: {
                    kdSubSpesialis1: rujukForm.kdSubSpesialis1 || null,
                    kdSarana: rujukForm.kdSarana || null,
                },
                khusus: null,
            };
        }
        try {
            const res = await fetch('/api/pcare/kunjungan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                credentials: 'same-origin',
                body: JSON.stringify(payload),
            });
            const text = await res.text();
            let json;
            try { json = text ? JSON.parse(text) : {}; } catch (_) { json = {}; }
            if (res.ok) {
                const msg = (json && json.response && json.response.message) ? json.response.message : 'CREATED';
                setKunjunganResult({ success: true, message: msg });
            } else {
                const errMsg = (json && json.metaData && json.metaData.message) ? json.metaData.message : `Gagal kirim Kunjungan (${res.status})`;
                setKunjunganResult({ success: false, message: errMsg });
            }
        } catch (e) {
            setKunjunganResult({ success: false, message: `Error: ${e.message || e}` });
        } finally {
            setSendingKunjungan(false);
        }
    };

    const fetchList = async () => {
        if (!noRawat) return;
        setLoadingList(true);
        try {
            const url = route('rawat-jalan.pemeriksaan-ralan', { no_rawat: noRawat, t: token });
            const res = await fetch(url);
            const json = await res.json();
            setList(json.data || []);
        } catch (e) {
            console.error('Gagal memuat pemeriksaan_ralan', e);
        } finally {
            setLoadingList(false);
        }
    };

    useEffect(() => {
        fetchList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noRawat]);

    const searchPegawai = async (q) => {
        const url = route('pegawai.search', { q });
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        const json = await res.json();
        setPegawaiOptions(json.data || []);
    };

    useEffect(() => {
        if (pegawaiQuery.trim() === '') { setPegawaiOptions([]); return; }
        const id = setTimeout(() => { searchPegawai(pegawaiQuery); }, 300);
        return () => clearTimeout(id);
    }, [pegawaiQuery]);

    return (
        <>
            <form onSubmit={handleSubmit} className="p-4 md:p-6">
                {/* Baris atas: kiri card CPPT/SOAP (Informasi Dasar), kanan card Template */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
                    <div className="lg:col-span-2 h-full">
                        <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3 md:p-4 h-full">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Informasi Dasar</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tanggal Perawatan</label>
                                    <input type="date" name="tgl_perawatan" value={formData.tgl_perawatan} onChange={handleChange} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Jam Rawat</label>
                                    <input type="time" name="jam_rawat" value={formData.jam_rawat} onChange={handleChange} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Kesadaran</label>
                                    <select name="kesadaran" value={formData.kesadaran} onChange={handleChange} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                                        {kesadaranOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* Hanya card Informasi Dasar di kolom kiri atas */}
                    </div>
                    <aside className="lg:col-span-1 h-full">
                        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 md:p-4 lg:sticky lg:top-4 h-full">
                            <div className="space-y-3 md:space-y-4">
                                <div>                     
                                    <SearchableSelect
                                        options={templateOptions}
                                        value={selectedTemplate}
                                        onChange={(val) => { setSelectedTemplate(val); applyTemplate(val); }}
                                        placeholder="— Pilih template —"
                                        searchPlaceholder="Cari diagnosa..."
                                        displayKey="label"
                                        valueKey="key"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button type="button" onClick={clearTemplateFields} className="bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-4 py-2.5 rounded-md text-sm font-medium transition-colors w-full">
                                        Bersihkan isian
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Baris bawah: card lain tetap penuh lebar seperti sebelumnya */}
                <div className="space-y-4 md:space-y-6 mt-4 md:mt-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 md:p-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Tanda-Tanda Vital & Antropometri
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Suhu (°C)</label>
                                <input type="text" name="suhu_tubuh" value={formData.suhu_tubuh} onChange={handleChange} placeholder="36.8" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tensi (mmHg)</label>
                                <input type="text" name="tensi" value={formData.tensi} onChange={handleChange} placeholder="120/80" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nadi (/menit)</label>
                                <input type="text" name="nadi" value={formData.nadi} onChange={handleChange} placeholder="80" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Respirasi (/menit)</label>
                                <input type="text" name="respirasi" value={formData.respirasi} onChange={handleChange} placeholder="20" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">SpO2 (%)</label>
                                <input type="text" name="spo2" value={formData.spo2} onChange={handleChange} placeholder="98" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tinggi (cm)</label>
                                <input type="text" name="tinggi" value={formData.tinggi} onChange={handleChange} placeholder="165" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Berat (kg)</label>
                                <input type="text" name="berat" value={formData.berat} onChange={handleChange} placeholder="60" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">GCS</label>
                                <input type="text" name="gcs" value={formData.gcs} onChange={handleChange} placeholder="E4V5M6" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Lingkar Perut (cm)</label>
                                <input type="text" name="lingkar_perut" value={formData.lingkar_perut} onChange={handleChange} placeholder="80" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 md:p-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Subjektif & Objektif
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Keluhan Utama (Subjektif)</label>
                                <textarea name="keluhan" value={formData.keluhan} onChange={handleChange} rows={4} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" placeholder="Keluhan yang dirasakan pasien..." />
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Pemeriksaan Fisik (Objektif)</label>
                                <textarea name="pemeriksaan" value={formData.pemeriksaan} onChange={handleChange} rows={4} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" placeholder="Hasil pemeriksaan fisik dan penunjang..." />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                        <div>
                            <label className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
                                <svg className="w-4 h-4 mr-1.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                Alergi
                            </label>
                            <input type="text" name="alergi" value={formData.alergi} onChange={handleChange} placeholder="Contoh: Penisilin, Aspirin" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                        </div>
                        <div className="relative">
                            <label className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
                                <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Petugas Pemeriksa
                            </label>
                            <input
                                type="text"
                                value={pegawaiQuery}
                                onChange={(e) => setPegawaiQuery(e.target.value)}
                                placeholder="Ketik nama atau NIK pegawai..."
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            />
                            {pegawaiOptions.length > 0 && (
                                <div className="absolute z-20 mt-1 w-full max-h-48 overflow-auto rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg">
                                    {pegawaiOptions.map((p) => (
                                        <button
                                            key={p.nik}
                                            type="button"
                                            onClick={() => {
                                                setFormData((prev) => ({ ...prev, nip: p.nik }));
                                                setPegawaiQuery(p.nama + ' (' + p.nik + ')');
                                                setPegawaiOptions([]);
                                            }}
                                            className="w-full text-left px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-sm border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors"
                                        >
                                            <div className="font-medium text-gray-900 dark:text-white">{p.nama}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">NIK: {p.nik}</div>
                                        </button>
                                    ))}
                                </div>
                            )}
                            <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">💡 Mulai ketik untuk mencari pegawai</p>
                        </div>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 md:p-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Assessment & Planning
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Penilaian (Assessment)</label>
                                <textarea name="penilaian" value={formData.penilaian} onChange={handleChange} rows={3} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" placeholder="Diagnosis dan analisis kondisi pasien..." />
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Rencana Tindak Lanjut (Planning)</label>
                                <textarea name="rtl" value={formData.rtl} onChange={handleChange} rows={3} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" placeholder="Rencana pengobatan dan tindakan..." />
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Instruksi Medis</label>
                                <textarea name="instruksi" value={formData.instruksi} onChange={handleChange} rows={3} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" placeholder="Instruksi untuk pasien dan perawat..." />
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Evaluasi</label>
                                <textarea name="evaluasi" value={formData.evaluasi} onChange={handleChange} rows={3} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" placeholder="Evaluasi hasil pengobatan..." />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                    {editKey && (
                        <button
                            type="button"
                            onClick={() => { setEditKey(null); setMessage(null); setError(null); }}
                            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Batal
                        </button>
                    )}
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-2.5 rounded-md text-sm font-medium transition-colors disabled:cursor-not-allowed flex items-center justify-center" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {editKey ? 'Mengupdate...' : 'Menyimpan...'}
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {editKey ? 'Update Pemeriksaan' : 'Simpan Pemeriksaan'}
                            </>
                        )}
                    </button>
                    {showBridging && (
                        <button
                            type="button"
                            onClick={openBridgingModal}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                            title="Bridging PCare"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 0h-1v4h-1m1-9h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Bridging PCare
                        </button>
                    )}
                </div>
            </form>
            {bridgingOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={closeBridgingModal}></div>
                    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-5xl mx-4">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Bridging PCare</h3>
                            <button onClick={closeBridgingModal} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 md:p-6 space-y-6">
                            {/* 1. Pendaftaran PCare */}
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-3 md:p-4">
                                <h4 className="text-sm font-semibold text-indigo-800 dark:text-indigo-300 mb-2">Pendaftaran PCare</h4>
                                {pcarePendaftaran ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 dark:text-gray-200">
                                        <div><span className="font-medium">No Rawat:</span> {pcarePendaftaran.no_rawat}</div>
                                        <div><span className="font-medium">No Kartu:</span> {pcarePendaftaran.noKartu || pcarePendaftaran.no_kartu || '-'}</div>
                                        <div><span className="font-medium">Tgl Daftar:</span> {pcarePendaftaran.tglDaftar || '-'}</div>
                                        <div><span className="font-medium">Kd Poli:</span> {pcarePendaftaran.kdPoli || '-'}</div>
                                        <div><span className="font-medium">Keluhan:</span> {pcarePendaftaran.keluhan || '-'}</div>
                                        <div><span className="font-medium">Sistole/Diastole:</span> {(pcarePendaftaran.sistole || pcarePendaftaran.diastole) ? `${pcarePendaftaran.sistole || ''}/${pcarePendaftaran.diastole || ''}` : '-'}</div>
                                        <div><span className="font-medium">Berat/Tinggi:</span> {(pcarePendaftaran.beratBadan || pcarePendaftaran.tinggiBadan) ? `${pcarePendaftaran.beratBadan || ''}kg / ${pcarePendaftaran.tinggiBadan || ''}cm` : '-'}</div>
                                        <div><span className="font-medium">Resp/HR:</span> {(pcarePendaftaran.respRate || pcarePendaftaran.heartRate) ? `${pcarePendaftaran.respRate || ''} / ${pcarePendaftaran.heartRate || ''}` : '-'}</div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Data pendaftaran belum tersedia.</p>
                                )}
                            </div>

                            {/* 2. Kunjungan PCare */}
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3 md:p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Kunjungan PCare</h4>
                                    <label className="inline-flex items-center text-sm">
                                        <input type="checkbox" className="mr-2 rounded" checked={kunjunganActive} onChange={(e) => toggleKunjungan(e.target.checked)} />
                                        Aktifkan
                                    </label>
                                </div>
                                {kunjunganActive && (
                                    <div className="space-y-3">
                                        <pre className="bg-white dark:bg-gray-900 border border-emerald-200 dark:border-emerald-700 rounded p-3 text-xs overflow-x-auto">{JSON.stringify(kunjunganPreview || {}, null, 2)}</pre>
                                        <div className="flex justify-end">
                                            <button type="button" onClick={sendKunjungan} disabled={sendingKunjungan || !kunjunganPreview} className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center">
                                                {sendingKunjungan ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Mengirim...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Kirim Kunjungan
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        {kunjunganResult && (
                                            <div className={`text-sm px-3 py-2 rounded border ${kunjunganResult.success ? 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800' : 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'}`}>
                                                {kunjunganResult.success ? (
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                                        Berhasil: {kunjunganResult.message}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        Gagal: {kunjunganResult.message}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* 3. Rujukan PCare */}
                            <div className={`border rounded-lg p-3 md:p-4 ${rujukanActive ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-700' : 'bg-gray-50 dark:bg-gray-700/20 border-gray-200 dark:border-gray-700'}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className={`text-sm font-semibold ${rujukanActive ? 'text-violet-800 dark:text-violet-300' : 'text-gray-700 dark:text-gray-300'}`}>Rujukan PCare</h4>
                                    <label className="inline-flex items-center text-sm">
                                        <input type="checkbox" className="mr-2 rounded" checked={rujukanActive} onChange={(e) => setRujukanActive(e.target.checked)} />
                                        Aktifkan
                                    </label>
                                </div>
                                {rujukanActive && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Kode PPK (kdppk)</label>
                                            <input type="text" value={rujukForm.kdppk} onChange={(e) => setRujukForm((p) => ({ ...p, kdppk: e.target.value }))} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" placeholder="0112R016" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Tanggal Estimasi Rujuk</label>
                                            <input type="date" value={rujukForm.tglEstRujuk} onChange={(e) => setRujukForm((p) => ({ ...p, tglEstRujuk: e.target.value }))} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Sub Spesialis (kdSubSpesialis1)</label>
                                            <input type="text" value={rujukForm.kdSubSpesialis1} onChange={(e) => setRujukForm((p) => ({ ...p, kdSubSpesialis1: e.target.value }))} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" placeholder="16" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Sarana (kdSarana)</label>
                                            <input type="text" value={rujukForm.kdSarana} onChange={(e) => setRujukForm((p) => ({ ...p, kdSarana: e.target.value }))} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" placeholder="01" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <div className="text-xs text-gray-600 dark:text-gray-300 mb-2">Payload rujukan akan masuk ke field rujukLanjut pada payload kunjungan.</div>
                                            <pre className="bg-white dark:bg-gray-900 border border-violet-200 dark:border-violet-700 rounded p-3 text-xs overflow-x-auto">{JSON.stringify({
                                                kdppk: rujukForm.kdppk || null,
                                                tglEstRujuk: rujukForm.tglEstRujuk || null,
                                                subSpesialis: {
                                                    kdSubSpesialis1: rujukForm.kdSubSpesialis1 || null,
                                                    kdSarana: rujukForm.kdSarana || null,
                                                },
                                                khusus: null,
                                            }, null, 2)}</pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                            <div className="text-xs text-gray-500 dark:text-gray-400">Tutup popup ini untuk kembali ke form pemeriksaan.</div>
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={closeBridgingModal} className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md text-sm">Tutup</button>
                                {kunjunganActive && (
                                    <button type="button" onClick={sendKunjungan} disabled={sendingKunjungan || !kunjunganPreview} className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-4 py-2 rounded-md text-sm">Kirim Kunjungan{rujukanActive ? ' + Rujuk' : ''}</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="px-4 md:px-6 pb-4 md:pb-6">
                {(message || error) && (
                    <div className={`mb-4 text-sm px-4 py-3 rounded-lg border flex items-start ${error ? 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800' : 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'}`}>
                        <svg className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${error ? 'text-red-500' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {error ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                        </svg>
                        <span>{error || message}</span>
                    </div>
                )}
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                            Riwayat Pemeriksaan
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {list.length} record
                        </span>
                    </div>
                    {loadingList ? (
                        <div className="flex items-center justify-center py-8">
                            <svg className="animate-spin h-6 w-6 text-indigo-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Memuat riwayat pemeriksaan...</span>
                        </div>
                    ) : list.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Belum ada pemeriksaan</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Mulai dengan menambahkan pemeriksaan pertama.</p>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                                        <tr className="text-left text-gray-600 dark:text-gray-300">
                                            <th className="px-4 py-3 font-medium">Tanggal</th>
                                            <th className="px-4 py-3 font-medium">Jam</th>
                                            <th className="px-4 py-3 font-medium">TTV</th>
                                            <th className="px-4 py-3 font-medium">Kesadaran</th>
                                            <th className="px-4 py-3 font-medium">Keluhan</th>
                                            <th className="px-4 py-3 font-medium">Pemeriksaan</th>
                                            <th className="px-4 py-3 font-medium">Penilaian</th>
                                            <th className="px-4 py-3 font-medium text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {list.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">
                                                    {new Date(row.tgl_perawatan).toLocaleDateString('id-ID', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </td>
                                                <td className="px-4 py-3 text-gray-900 dark:text-white font-mono">{String(row.jam_rawat).substring(0,5)}</td>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                    <div className="space-y-1 text-xs">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">Suhu:</span>
                                                            <span className="font-medium">{row.suhu_tubuh || '-'}°C</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">Tensi:</span>
                                                            <span className="font-medium">{row.tensi || '-'}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">Nadi:</span>
                                                            <span className="font-medium">{row.nadi || '-'}/min</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">SpO2:</span>
                                                            <span className="font-medium">{row.spo2 || '-'}%</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                        {row.kesadaran}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 max-w-xs">
                                                    <div className="truncate" title={row.keluhan || ''}>
                                                        {row.keluhan || <span className="text-gray-400 italic">Tidak ada keluhan</span>}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 max-w-xs">
                                                    <div className="truncate" title={row.pemeriksaan || ''}>
                                                        {row.pemeriksaan || <span className="text-gray-400 italic">Belum diperiksa</span>}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 max-w-xs">
                                                    <div className="truncate" title={row.penilaian || ''}>
                                                        {row.penilaian || <span className="text-gray-400 italic">Belum dinilai</span>}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData({
                                                                    tgl_perawatan: row.tgl_perawatan,
                                                                    jam_rawat: String(row.jam_rawat).substring(0,5),
                                                                    suhu_tubuh: row.suhu_tubuh || '',
                                                                    tensi: row.tensi || '',
                                                                    nadi: row.nadi || '',
                                                                    respirasi: row.respirasi || '',
                                                                    tinggi: row.tinggi || '',
                                                                    berat: row.berat || '',
                                                                    spo2: row.spo2 || '',
                                                                    gcs: row.gcs || '',
                                                                    kesadaran: row.kesadaran || 'Compos Mentis',
                                                                    keluhan: row.keluhan || '',
                                                                    pemeriksaan: row.pemeriksaan || '',
                                                                    alergi: row.alergi || '',
                                                                    lingkar_perut: row.lingkar_perut || '',
                                                                    rtl: row.rtl || '',
                                                                    penilaian: row.penilaian || '',
                                                                    instruksi: row.instruksi || '',
                                                                    evaluasi: row.evaluasi || '',
                                                                    nip: row.nip || '',
                                                                });
                                                                setPegawaiQuery('');
                                                                setEditKey({
                                                                    no_rawat: row.no_rawat,
                                                                    tgl_perawatan: row.tgl_perawatan,
                                                                    jam_rawat: String(row.jam_rawat).length === 5 ? row.jam_rawat + ':00' : row.jam_rawat,
                                                                });
                                                                setMessage(null);
                                                                setError(null);
                                                            }}
                                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50 transition-colors"
                                                            title="Edit pemeriksaan"
                                                        >
                                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={async () => {
                                                                if (!confirm('Yakin ingin menghapus pemeriksaan ini?\n\nData yang dihapus tidak dapat dikembalikan.')) return;
                                                                try {
                                                                    const url = route('rawat-jalan.pemeriksaan-ralan.delete');
                                                                    const res = await fetch(url, {
                                                                        method: 'DELETE',
                                                                        headers: {
                                                                            'Content-Type': 'application/json',
                                                                            'Accept': 'application/json',
                                                                            'X-Requested-With': 'XMLHttpRequest',
                                                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                                                        },
                                                                        credentials: 'same-origin',
                                                                        body: JSON.stringify({
                                                                            no_rawat: row.no_rawat,
                                                                            tgl_perawatan: row.tgl_perawatan,
                                                                            jam_rawat: String(row.jam_rawat).length === 5 ? row.jam_rawat + ':00' : row.jam_rawat,
                                                                        }),
                                                                    });
                                                                    const text = await res.text();
                                                                    let json; try { json = text ? JSON.parse(text) : {}; } catch (_) { json = {}; }
                                                                    if (!res.ok) {
                                                                        setError(json.message || 'Gagal menghapus pemeriksaan');
                                                                        setMessage(null);
                                                                        return;
                                                                    }
                                                                    setError(null);
                                                                    setMessage(json.message || 'Pemeriksaan berhasil dihapus');
                                                                    await fetchList();
                                                                } catch (e) {
                                                                    setError(e.message || 'Terjadi kesalahan saat menghapus');
                                                                    setMessage(null);
                                                                }
                                                            }}
                                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
                                                            title="Hapus pemeriksaan"
                                                        >
                                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}


