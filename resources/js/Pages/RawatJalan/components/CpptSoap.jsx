import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import SearchableSelect from '../../../Components/SearchableSelect.jsx';
import { DWFKTP_TEMPLATES } from '../../../data/dwfktpTemplates.js';
import { todayDateString, nowDateTimeString, getAppTimeZone } from '@/tools/datetime';
import { Eraser } from 'lucide-react';

export default function CpptSoap({ token = '', noRkmMedis = '', noRawat = '', onOpenResep = null, appendToPlanning = null, onPlanningAppended = null }) {
    // Gunakan helper untuk mendapatkan tanggal/waktu dengan timezone yang benar
    const nowDateString = todayDateString();
    const nowTimeString = nowDateTimeString().split(' ')[1].substring(0, 5);
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
        tgl_perawatan: nowDateString,
        jam_rawat: nowTimeString,
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
    const draftStorageKey = useMemo(() => (noRawat ? `cpptSoap_draft_${noRawat}` : 'cpptSoap_draft'), [noRawat]);
    const [draftReady, setDraftReady] = useState(false);
    const latestDraftRef = useRef({ key: draftStorageKey, data: formData });
    latestDraftRef.current = { key: draftStorageKey, data: formData };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [list, setList] = useState([]);
    const [loadingList, setLoadingList] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [pegawaiOptions, setPegawaiOptions] = useState([]);
    const [pegawaiQuery, setPegawaiQuery] = useState('');
    const [editKey, setEditKey] = useState(null); // { no_rawat, tgl_perawatan, jam_rawat }
    // Bridging PCare states
    const [showBridging, setShowBridging] = useState(false); // Default hidden, tampil saat pendaftaran berhasil
    const [bridgingOpen, setBridgingOpen] = useState(false); // kontrol popup modal
    const [pcarePendaftaran, setPcarePendaftaran] = useState(null); // data dari tabel pcare_pendaftaran
    const [pcareRujukanSubspesialis, setPcareRujukanSubspesialis] = useState(null); // data dari tabel pcare_rujuk_subspesialis
    // Status cetak rujukan: aktif setelah rujukan berhasil dikirim ke BPJS & lokal atau ada data di tabel
    const [rujukanBerhasil, setRujukanBerhasil] = useState(false);
    // Menyimpan nomor kunjungan terakhir (pengganti no rujukan bila belum tersedia)
    const [lastNoKunjungan, setLastNoKunjungan] = useState('');
    // Menyimpan payload terakhir untuk template cetak rujukan
    const [lastKunjunganPayload, setLastKunjunganPayload] = useState(null);
    const [rujukanActive, setRujukanActive] = useState(false); // checklist aktifkan kartu rujukan
    const [kunjunganPreview, setKunjunganPreview] = useState(null); // payload preview kunjungan
    const [sendingKunjungan, setSendingKunjungan] = useState(false);
    const [kunjunganResult, setKunjunganResult] = useState(null); // hasil kirim kunjungan
    const [rujukForm, setRujukForm] = useState({ kdppk: '', tglEstRujuk: '', kdSubSpesialis1: '', kdSarana: '' });
    const [viewMode, setViewMode] = useState('current');
    // Referensi Poli & Dokter (untuk menampilkan nama pada KD Poli/Dokter)
    const [poliOptions, setPoliOptions] = useState([]);
    const [dokterOptions, setDokterOptions] = useState([]);
    // KD TACC: default hidden, tampil wajib isi bila diagnosa NonSpesialis dipilih
    const [kdTaccVisible, setKdTaccVisible] = useState(false);
    const [taccError, setTaccError] = useState('');
    const [isDiagnosaNonSpesialis, setIsDiagnosaNonSpesialis] = useState(false); // Menyimpan informasi apakah diagnosa yang dipilih adalah NonSpesialis
    // Referensi KD TACC & Alasan (untuk penentuan rujuk). Sumber sesuai permintaan user.
    const REF_TACC = useMemo(() => ([
        { kdTacc: -1, nmTacc: 'Tanpa TACC', alasanTacc: [] },
        { kdTacc: 1, nmTacc: 'Time', alasanTacc: ['< 3 Hari', '>= 3 - 7 Hari', '>= 7 Hari'] },
        { kdTacc: 2, nmTacc: 'Age', alasanTacc: ['< 1 Bulan', '>= 1 Bulan s/d < 12 Bulan', '>= 1 Tahun s/d < 5 Tahun', '>= 5 Tahun s/d < 12 Tahun', '>= 12 Tahun s/d < 55 Tahun', '>= 55 Tahun'] },
        { kdTacc: 3, nmTacc: 'Complication', alasanTacc: [] }, // Alasan bersifat free text (format: kdDiagnosa - NamaDiagnosa)
        { kdTacc: 4, nmTacc: 'Comorbidity', alasanTacc: ['< 3 Hari', '>= 3 - 7 Hari', '>= 7 Hari'] },
    ]), []);
    // Referensi untuk Rujukan PCare
    const [providerOptions, setProviderOptions] = useState([]);
    const [spesialisOptions, setSpesialisOptions] = useState([]);
    const [subSpesialisOptions, setSubSpesialisOptions] = useState([]);
    const [saranaOptions, setSaranaOptions] = useState([]);
    const [selectedSpesialis, setSelectedSpesialis] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [selectedTemplate, setSelectedTemplate] = useState('');
    const stripTTV = (text) => {
        if (!text) return '';
        let s = String(text);
        const pFull = /TD\s*\d{2,3}\/\d{2,3}\s*(?:mmHg)?;\s*(?:Nadi|N)\s*\d+(?:\s*x\/menit)?(?:\s*\w+)?;\s*RR\s*\d+(?:\s*x\/menit)?;\s*Suhu\s*\d+(?:\.\d+)?\s*°C;\s*SpO2\s*\d+\s*%\.?/gi;
        const pShort = /Suhu\s*\d+(?:\.\d+)?\s*°C;\s*SpO2\s*\d+\s*%\.?/gi;
        const pTD = /TD\s*\d{2,3}\/\d{2,3}\s*(?:mmHg)?;?/gi;
        const pN = /(?:Nadi|N)\s*\d+\s*(?:x\/menit)?(?:\s*\w+)?;?/gi;
        const pRR = /RR\s*\d+\s*(?:x\/menit)?;?/gi;
        const pSuhu = /Suhu\s*\d+(?:\.\d+)?\s*°C;?/gi;
        const pSpO2 = /SpO2\s*\d+\s*%\.?/gi;
        s = s.replace(pFull, '').replace(pShort, '');
        s = s.replace(pTD, '').replace(pN, '').replace(pRR, '').replace(pSuhu, '').replace(pSpO2, '');
        s = s.replace(/;\s*;\s*/g, '; ').replace(/,\s*;/g, ';').replace(/;\s*\./g, '.');
        s = s.replace(/[ \t]{2,}/g, ' ').trim();
        return s;
    };
    const applyTemplate = (key) => {
        const tpl = key ? templatesMap[key] : null;
        if (!tpl) return;
        const cleanedPemeriksaan = stripTTV(tpl.pemeriksaan || '');
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
            pemeriksaan: cleanedPemeriksaan || '',
            penilaian: tpl.penilaian || '',
            rtl: tpl.rtl || '',
            instruksi: tpl.instruksi || '',
            evaluasi: tpl.evaluasi || '',
            alergi: tpl.alergi || prev.alergi || '',
        }));
    };

    useEffect(() => {
        try {
            const q = sessionStorage.getItem('cpptSoap_pegawaiQuery');
            if (q) setPegawaiQuery(q);
            const nip = sessionStorage.getItem('cpptSoap_nip');
            if (nip) setFormData((prev) => ({ ...prev, nip }));
        } catch (_) {}
    }, []);

    useEffect(() => {
        setDraftReady(false);
        let draft = null;
        try {
            const raw = sessionStorage.getItem(draftStorageKey);
            if (raw) draft = JSON.parse(raw);
        } catch (_) {}
        setFormData((prev) => {
            const base = {
                tgl_perawatan: todayDateString(),
                jam_rawat: nowDateTimeString().split(' ')[1]?.substring(0, 5) || '',
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
                nip: prev.nip || '',
            };
            if (draft && typeof draft === 'object') {
                const next = { ...base, ...draft };
                if (!next.nip) next.nip = base.nip || '';
                return next;
            }
            return base;
        });
        setEditKey(null);
        setDraftReady(true);
    }, [draftStorageKey]);

    useEffect(() => {
        if (!draftReady) return;
        try {
            sessionStorage.setItem(draftStorageKey, JSON.stringify(formData));
        } catch (_) {}
    }, [draftStorageKey, draftReady, formData]);

    useEffect(() => {
        return () => {
            try {
                const { key, data } = latestDraftRef.current || {};
                if (key) sessionStorage.setItem(key, JSON.stringify(data || {}));
            } catch (_) {}
        };
    }, []);

    useEffect(() => {
        try {
            sessionStorage.setItem('cpptSoap_pegawaiQuery', pegawaiQuery || '');
        } catch (_) {}
    }, [pegawaiQuery]);

    useEffect(() => {
        try {
            sessionStorage.setItem('cpptSoap_nip', formData.nip || '');
        } catch (_) {}
    }, [formData.nip]);

    useEffect(() => {
        if (appendToPlanning && Array.isArray(appendToPlanning) && appendToPlanning.length > 0) {
            const items = appendToPlanning.map((it) => {
                const name = String(it.name ?? '').trim();
                const qty = it.qty ?? '';
                const instruction = String(it.instruction ?? '').trim();
                return ` - ${name}, ${qty}, ${instruction}`;
            });
            const block = `RESEP:\n${items.join('\n')}`;
            setFormData((prev) => ({
                ...prev,
                rtl: prev.rtl ? `${prev.rtl}\n${block}` : block,
            }));
            if (typeof onPlanningAppended === 'function') {
                try { onPlanningAppended(); } catch (_) {}
            }
        }
    }, [appendToPlanning]);
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
                    // Deteksi kasus "dilewati" dari backend (non-BPJS): skipped === true
                    const skipped = !!(pcareJson && pcareJson.skipped);
                    if (skipped) {
                        const skipMsg = (pcareJson && pcareJson.metaData && pcareJson.metaData.message)
                            ? pcareJson.metaData.message
                            : 'Pendaftaran PCare dilewati (Non-BPJS)';
                        // Jangan menampilkan pesan "Pendaftaran PCare terkirim" jika dilewati
                        setMessage((prev) => `${prev || ''} • ${skipMsg}`.trim());
                        // Tombol Bridging PCare tidak boleh muncul pada kasus non-BPJS
                        setShowBridging(false);
                    } else if (pcareRes.status === 201 || pcareRes.status === 200) {
                        // Sukses kirim ke BPJS PCare
                        const noUrut = (pcareJson && pcareJson.response && pcareJson.response.field === 'noUrut')
                            ? (pcareJson.response.message || '')
                            : '';
                        setMessage((prev) => `${prev || ''} • Pendaftaran PCare terkirim${noUrut ? ' (No Urut: ' + noUrut + ')' : ''}`.trim());
                        setShowBridging(true);
                    } else {
                        const errMsg = (pcareJson && pcareJson.metaData && pcareJson.metaData.message)
                            ? pcareJson.metaData.message
                            : `Gagal pendaftaran PCare (${pcareRes.status})`;
                        setError(errMsg);
                        setShowBridging(false);
                    }
                } else {
                    const errMsg = (pcareJson && pcareJson.metaData && pcareJson.metaData.message) ? pcareJson.metaData.message : `Gagal pendaftaran PCare (${pcareRes.status})`;
                    setError(errMsg);
                    setShowBridging(false);
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
        // Secara default, buka Kunjungan dan muat preview
        try { await toggleKunjungan(true); } catch (_) {}
        // Ambil data pendaftaran dari tabel pcare_pendaftaran
        try {
            const res = await fetch(`/api/pcare/pendaftaran/rawat/${encodeURIComponent(noRawat)}`, { headers: { 'Accept': 'application/json' } });
            const json = await res.json();
            setPcarePendaftaran(json.data || null);
        } catch (_) {
            setPcarePendaftaran(null);
        }
        // Ambil data rujukan subspesialis dari tabel pcare_rujuk_subspesialis
        try {
            const rujukRes = await fetch(`/api/pcare/rujuk-subspesialis/rawat/${encodeURIComponent(noRawat)}`, { headers: { 'Accept': 'application/json' } });
            const rujukJson = await rujukRes.json();
            const rujukData = rujukJson.data || null;
            
            // Jika response OK dan ada data, set state rujukan
            if (rujukRes.ok && rujukData) {
                setPcareRujukanSubspesialis(rujukData);
                setRujukanBerhasil(true);
                if (rujukData.noKunjungan) {
                    setLastNoKunjungan(rujukData.noKunjungan);
                }
            } else {
                setPcareRujukanSubspesialis(null);
                setRujukanBerhasil(false);
            }
        } catch (_) {
            setPcareRujukanSubspesialis(null);
            setRujukanBerhasil(false);
        }
        // Muat referensi Poli & Dokter untuk menampilkan nama pada field KD Poli/Dokter
        try {
            const params = new URLSearchParams({ start: 0, limit: 200 });
            // Gunakan endpoint PCare yang benar: /api/pcare/poli
            const poRes = await fetch(`/api/pcare/poli?${params.toString()}`, { headers: { 'Accept': 'application/json' } });
            const poJson = await poRes.json();
            const poList = poJson?.response?.list || poJson?.list || poJson?.data || [];
            setPoliOptions(poList.map((row) => ({ value: row?.kdPoli || row?.kode || '', label: row?.nmPoli || row?.nama || '' })));
        } catch (e) {
            setPoliOptions([]);
        }
        try {
            const params = new URLSearchParams({ start: 0, limit: 200 });
            // Gunakan endpoint PCare yang benar: /api/pcare/dokter
            const dkRes = await fetch(`/api/pcare/dokter?${params.toString()}`, { headers: { 'Accept': 'application/json' } });
            const dkJson = await dkRes.json();
            const dkList = dkJson?.response?.list || dkJson?.list || dkJson?.data || [];
            setDokterOptions(dkList.map((row) => ({ value: row?.kdDokter || row?.kdProvider || row?.kdDok || row?.kode || '', label: row?.nmDokter || row?.nmProvider || row?.nama || '' })));
        } catch (e) {
            setDokterOptions([]);
        }
        // Muat referensi awal untuk Rujukan
        // Provider Rujukan akan dimuat dinamis berdasarkan SubSpesialis + Sarana + Tgl Estimasi Rujuk
        setProviderOptions([]);
        try {
            // Spesialis
            const spRes = await fetch(`/api/pcare/spesialis`, { headers: { 'Accept': 'application/json' } });
            const spJson = await spRes.json();
            const spList = spJson?.response?.list || [];
            setSpesialisOptions(spList.map((row) => ({ value: row.kdSpesialis, label: `${row.kdSpesialis || ''} — ${row.nmSpesialis || ''}` })));
        } catch (e) {
            setSpesialisOptions([]);
        }
        try {
            // Sarana
            const saRes = await fetch(`/api/pcare/spesialis/sarana`, { headers: { 'Accept': 'application/json' } });
            const saJson = await saRes.json();
            const saList = saJson?.response?.list || [];
            setSaranaOptions(saList.map((row) => ({ value: row.kdSarana, label: `${row.kdSarana || ''} — ${row.nmSarana || ''}` })));
        } catch (e) {
            setSaranaOptions([]);
        }
    };

    const closeBridgingModal = () => {
        setBridgingOpen(false);
        setRujukanActive(false);
        setKunjunganPreview(null);
        setKunjunganResult(null);
        setSelectedSpesialis('');
        setSubSpesialisOptions([]);
    };

    const toggleKunjungan = async (checked) => {
        setKunjunganResult(null);
        if (checked) {
            try {
                // Gunakan endpoint PCare yang benar: /api/pcare/kunjungan/preview/{no_rawat}
                const res = await fetch(`/api/pcare/kunjungan/preview/${encodeURIComponent(noRawat)}`, { headers: { 'Accept': 'application/json' } });
                const json = await res.json();
                if (json && json.success) {
                    const payload = json.payload || {};
                    // Terapkan nilai default untuk bidang-bidang referensi PCare jika belum ada
                    const withDefaults = {
                        ...payload,
                        // Kesadaran
                        kdSadar: payload.kdSadar ?? '01',
                        nmSadar: payload.nmSadar ?? 'Compos mentis',
                        // Status Pulang (default: 3 = Berobat Jalan)
                        kdStatusPulang: payload.kdStatusPulang ?? '3',
                        nmStatusPulang: payload.nmStatusPulang ?? '',
                        // Prognosa
                        kdPrognosa: payload.kdPrognosa ?? '02',
                        nmPrognosa: payload.nmPrognosa ?? 'Bonam (Baik)',
                        // Alergi (default: Tidak Ada)
                        alergiMakan: payload.alergiMakan ?? '00',
                        alergiUdara: payload.alergiUdara ?? '00',
                        alergiObat: payload.alergiObat ?? '00',
                        nmAlergi: payload.nmAlergi ?? 'Tidak Ada',
                    };
                    setKunjunganPreview(withDefaults);
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

    // Muat Sub Spesialis ketika spesialis dipilih
    useEffect(() => {
        const loadSubSpesialis = async () => {
            if (!selectedSpesialis) {
                setSubSpesialisOptions([]);
                return;
            }
            try {
                const params = new URLSearchParams({ kdSpesialis: selectedSpesialis });
                // Gunakan endpoint PCare yang benar: /api/pcare/spesialis/subspesialis
                const ssRes = await fetch(`/api/pcare/spesialis/subspesialis?${params.toString()}`, { headers: { 'Accept': 'application/json' } });
                const ssJson = await ssRes.json();
                const ssList = ssJson?.response?.list || [];
                setSubSpesialisOptions(ssList.map((row) => ({ value: row.kdSubSpesialis, label: `${row.kdSubSpesialis || ''} — ${row.nmSubSpesialis || ''}` })));
            } catch (e) {
                setSubSpesialisOptions([]);
            }
        };
        loadSubSpesialis();
    }, [selectedSpesialis]);

    // Muat daftar Faskes Rujukan Sub Spesialis (PPK Rujukan) ketika
    // kdSubSpesialis1, kdSarana, dan tglEstRujuk telah diisi.
    useEffect(() => {
        const loadProviders = async () => {
            const kdSub = rujukForm.kdSubSpesialis1;
            const kdSa = rujukForm.kdSarana;
            const tglIso = rujukForm.tglEstRujuk; // yyyy-mm-dd dari input type=date
            if (!kdSub || !kdSa || !tglIso) {
                setProviderOptions([]);
                // Kosongkan kdppk bila parameter belum lengkap agar tidak menggunakan pilihan yang stale
                setRujukForm((p) => ({ ...p, kdppk: '' }));
                return;
            }
            const tglParam = fromInputDate(tglIso); // jadi dd-mm-yyyy
            if (!tglParam) {
                setProviderOptions([]);
                setRujukForm((p) => ({ ...p, kdppk: '' }));
                return;
            }
            try {
                // Gunakan endpoint PCare yang benar: /api/pcare/spesialis/rujuk/subspesialis/{kdSub}/sarana/{kdSa}/tglEstRujuk/{tgl}
                const url = `/api/pcare/spesialis/rujuk/subspesialis/${encodeURIComponent(kdSub)}/sarana/${encodeURIComponent(kdSa)}/tglEstRujuk/${encodeURIComponent(tglParam)}`;
                const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
                const json = await res.json();
                const list = json?.response?.list || [];
                // Simpan kdppk dan nmppk sebagai value/label, serta lampirkan jadwal/kapasitas/telepon untuk ditampilkan
                const DAY_ORDER = ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu'];
                const parseJadwal = (text) => {
                    const result = {};
                    if (!text || typeof text !== 'string') return result;
                    const re = /(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu)\s*:/gi;
                    let match;
                    const segments = [];
                    while ((match = re.exec(text)) !== null) {
                        segments.push({ day: match[1], start: match.index, end: null });
                    }
                    for (let i = 0; i < segments.length; i++) {
                        segments[i].end = i < segments.length - 1 ? segments[i + 1].start : text.length;
                    }
                    segments.forEach(seg => {
                        const raw = text.slice(seg.start, seg.end);
                        const [dayLabel, rest] = raw.split(':');
                        if (!dayLabel || !rest) return;
                        const day = dayLabel.trim();
                        const times = rest
                            .replace(/\n/g, ' ')
                            .split(/[,;]+/)
                            .map(s => s.trim())
                            .filter(Boolean);
                        if (times.length) {
                            result[day] = times;
                        }
                    });
                    return result;
                };

                const newOptions = list.map((row) => {
                    const jadwalParsed = parseJadwal(row.jadwal);
                    return {
                        value: row.kdppk,
                        // Perluas label: tampilkan kota dan kelas
                        label: `${row.kdppk || ''} — ${row.nmppk || ''}${row.nmkc ? ` (${row.nmkc}${row.kelas ? `, Kelas ${row.kelas}` : ''})` : (row.kelas ? ` (Kelas ${row.kelas})` : '')}`,
                        meta: {
                            nmppk: row.nmppk,
                            alamat: row.alamatPpk,
                            telp: row.telpPpk,
                            kelas: row.kelas,
                            nmkc: row.nmkc,
                            jadwal: row.jadwal,
                            jadwalParsed,
                            kapasitas: row.kapasitas,
                            persentase: row.persentase,
                            jmlRujuk: row.jmlRujuk,
                            distance: row.distance,
                            dayOrder: DAY_ORDER,
                        },
                    };
                });
                setProviderOptions(newOptions);
                // Pastikan kdppk yang terpilih valid untuk Tanggal Estimasi Rujuk saat ini
                if (rujukForm.kdppk) {
                    const stillExists = newOptions.some((opt) => String(opt.value) === String(rujukForm.kdppk));
                    if (!stillExists) {
                        setRujukForm((p) => ({ ...p, kdppk: '' }));
                    }
                }
            } catch (e) {
                setProviderOptions([]);
            }
        };
        loadProviders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rujukForm.kdSubSpesialis1, rujukForm.kdSarana, rujukForm.tglEstRujuk]);

    // Helper konversi tanggal untuk input HTML date
    const toInputDate = (ddmmyyyy) => {
        if (!ddmmyyyy || typeof ddmmyyyy !== 'string') return '';
        const parts = ddmmyyyy.split('-');
        if (parts.length !== 3) return '';
        const [dd, mm, yyyy] = parts;
        const d = dd.padStart(2, '0');
        const m = mm.padStart(2, '0');
        return `${yyyy}-${m}-${d}`;
    };

    const fromInputDate = (iso) => {
        if (!iso || typeof iso !== 'string') return null;
        const parts = iso.split('-');
        if (parts.length !== 3) return null;
        const [yyyy, mm, dd] = parts;
        const d = dd.padStart(2, '0');
        const m = mm.padStart(2, '0');
        return `${d}-${m}-${yyyy}`;
    };


    // Update field helper untuk form Kunjungan
    const updateKunjunganField = (key, value, type = 'text') => {
        setKunjunganPreview((prev) => {
            if (!prev) return prev;
            let val = value;
            if (type === 'int') {
                const n = parseInt(value, 10);
                val = isNaN(n) ? '' : n;
            } else if (type === 'float') {
                const f = parseFloat(value);
                val = isNaN(f) ? '' : f;
            }
            return { ...prev, [key]: val };
        });
    };

    // Auto-aktifkan kartu Rujukan PCare saat kdStatusPulang = '4' (Rujuk Vertikal)
    // dan reset isian rujukan ketika bukan '4'.
    useEffect(() => {
        if (!kunjunganPreview) {
            setRujukanActive(false);
            return;
        }
        const k = kunjunganPreview.kdStatusPulang ? String(kunjunganPreview.kdStatusPulang) : '';
        const active = k === '4';
        setRujukanActive(active);
        if (!active) {
            // Reset form rujukan agar tidak mengirim data rujukan saat status pulang bukan rujuk vertikal
            setRujukForm({ kdppk: '', tglEstRujuk: '', kdSubSpesialis1: '', kdSarana: '' });
            setProviderOptions([]);
        }
    }, [kunjunganPreview?.kdStatusPulang]);

    const sendKunjungan = async () => {
        if (!kunjunganPreview) return;
        setSendingKunjungan(true);
        setKunjunganResult(null);
        setTaccError('');
        const payload = { ...kunjunganPreview };
        // Sertakan no_rawat agar backend dapat menyimpan ke tabel lokal sesuai kunjungan ini
        if (noRawat) {
            payload.no_rawat = noRawat;
        }
        
        // Validasi: Jika diagnosa NonSpesialis dipilih, kdTacc wajib diisi (1, 2, 3, atau 4) dan alasanTacc wajib diisi
        if (isDiagnosaNonSpesialis) {
            const v = payload.kdTacc;
            const isEmpty = v === undefined || v === null || v === '' || String(v).trim() === '';
            const isMinusOne = v === -1 || v === '-1' || v === 0 || v === '0';
            const isValidTacc = v === 1 || v === 2 || v === 3 || v === 4 || v === '1' || v === '2' || v === '3' || v === '4';
            
            if (isEmpty || isMinusOne || !isValidTacc) {
                setTaccError('KD TACC wajib diisi untuk diagnosa NonSpesialis. Pilih salah satu: 1 (Time), 2 (Age), 3 (Complication), atau 4 (Comorbidity).');
                setSendingKunjungan(false);
                return;
            }
            
            // Validasi tambahan: bila KD TACC dipilih (1, 2, 3, atau 4), maka Alasan TACC wajib diisi
            const alasan = payload.alasanTacc;
            const alasanEmpty = alasan === undefined || alasan === null || String(alasan).trim() === '';
            if (alasanEmpty) {
                setTaccError('Alasan TACC wajib diisi saat KD TACC dipilih untuk diagnosa NonSpesialis.');
                setSendingKunjungan(false);
                return;
            }
        }
        
        // Normalisasi KD TACC untuk API PCare
        // Sesuai Ref_TACC BPJS: nilai valid adalah -1 (Tanpa TACC), 1 (Time), 2 (Age), 3 (Complication), 4 (Comorbidity)
        // API BPJS menerima -1 untuk "Tanpa TACC", bukan 0
        // Backend akan menormalkan nilai 0 menjadi -1 jika diperlukan
        const isMinusOne = payload.kdTacc === -1 || payload.kdTacc === '-1';
        const isEmptyTacc = payload.kdTacc === undefined || payload.kdTacc === null || payload.kdTacc === '';
        // Jika kosong atau -1, set ke -1 (Tanpa TACC) dan kosongkan alasan
        if (isEmptyTacc || isMinusOne) {
            payload.kdTacc = -1;
            payload.alasanTacc = null;
        } else {
            // Pastikan alasanTacc tidak undefined/null jika kdTacc diisi
            if (payload.alasanTacc === undefined || payload.alasanTacc === null) {
                payload.alasanTacc = '';
            }
            // Jika kdTacc = -1, pastikan alasanTacc kosong
            if (payload.kdTacc === -1 || payload.kdTacc === '-1') {
                payload.alasanTacc = null;
            }
        }
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
            // Ambil nama SubSpesialis dari options
            const selectedSubSp = subSpesialisOptions.find(opt => String(opt.value) === String(rujukForm.kdSubSpesialis1));
            const nmSubSpesialis = selectedSubSp ? (selectedSubSp.label.split(' — ')[1] || selectedSubSp.label || '').trim() : '';
            
            // Ambil nama PPK dari provider options
            let nmPPK = '';
            const selectedProvider = providerOptions.find(opt => String(opt.value) === String(rujukForm.kdppk));
            if (selectedProvider) {
                // Coba ambil dari label yang di-split
                const labelParts = selectedProvider.label.split(' — ');
                nmPPK = (labelParts.length > 1 ? labelParts[1] : labelParts[0] || '').trim();
                // Jika masih kosong, coba dari meta
                if (!nmPPK && selectedProvider.meta?.nmppk) {
                    nmPPK = String(selectedProvider.meta.nmppk).trim();
                }
                // Jika masih kosong, coba dari meta.nmProvider
                if (!nmPPK && selectedProvider.meta?.nmProvider) {
                    nmPPK = String(selectedProvider.meta.nmProvider).trim();
                }
            }
            
            // Bangun payload rujukan lanjut hanya saat rujukan aktif dan PPK rujukan terpilih
            payload.rujukLanjut = {
                kdppk: rujukForm.kdppk,
                tglEstRujuk: fmtDate(rujukForm.tglEstRujuk) || null,
                subSpesialis: {
                    kdSubSpesialis1: rujukForm.kdSubSpesialis1 || null,
                    kdSarana: rujukForm.kdSarana || null,
                },
                khusus: null,
            };
            
            // Tambahkan nama-nama ke payload untuk disimpan di backend
            payload.nmSubSpesialis = nmSubSpesialis;
            payload.nmPPK = nmPPK;
        }
        // Helper: ekstrak noKunjungan dari variasi struktur respon backend
        const extractNoKunjungan = (resp) => {
            if (!resp) return '';
            try {
                if (resp.noKunjungan) return String(resp.noKunjungan);
                if (resp.response) {
                    const r = resp.response;
                    if (typeof r === 'object' && r !== null) {
                        if (r.noKunjungan) return String(r.noKunjungan);
                        if (r.field === 'noKunjungan' && r.message) return String(r.message);
                    }
                    if (Array.isArray(r) && r.length > 0 && r[0]?.noKunjungan) {
                        return String(r[0].noKunjungan);
                    }
                }
            } catch (_) {}
            return '';
        };

        try {
            // Tampilkan payload di console untuk debug
            try { console.debug('[PCare] Payload akan dikirim', payload); } catch (_) {}
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
                // Simpan informasi untuk cetak rujukan bila rujukan aktif
                const noKunj = extractNoKunjungan(json);
                setLastNoKunjungan(noKunj);
                setLastKunjunganPayload(payload);
                // Cek kembali data rujukan dari tabel setelah sukses kirim kunjungan
                if (payload.rujukLanjut && noRawat) {
                    try {
                        const rujukRes = await fetch(`/api/pcare/rujuk-subspesialis/rawat/${encodeURIComponent(noRawat)}`, {
                            headers: { 'Accept': 'application/json' }
                        });
                        const rujukJson = await rujukRes.json();
                        const rujukData = rujukJson.data || null;
                        
                        // Jika response OK dan ada data, set state rujukan
                        if (rujukRes.ok && rujukData) {
                            setRujukanBerhasil(true);
                            setPcareRujukanSubspesialis(rujukData);
                            if (rujukData.noKunjungan) {
                                setLastNoKunjungan(rujukData.noKunjungan);
                            }
                        } else if (payload.rujukLanjut) {
                            // Jika tidak ada data di tabel tapi payload ada rujukan, tetap set true
                            setRujukanBerhasil(true);
                        }
                    } catch (e) {
                        // Jika error cek tabel, tetap set berdasarkan payload
                if (payload.rujukLanjut) {
                    setRujukanBerhasil(true);
                        }
                    }
                }
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

    // Fungsi salin payload ke clipboard dihapus karena preview payload sudah dihilangkan

    const fetchList = async () => {
        if (!noRawat) return;
        setLoadingList(true);
        try {
            const url = route('rawat-jalan.pemeriksaan-ralan', { no_rawat: noRawat });
            const res = await fetch(url);
            const json = await res.json();
            setList(json.data || []);
        } catch (e) {
            console.error('Gagal memuat pemeriksaan_ralan', e);
        } finally {
            setLoadingList(false);
        }
    };

    const fetchAllByNoRm = async () => {
        if (!noRkmMedis) return;
        setLoadingList(true);
        try {
            const base = route('rawat-jalan.riwayat');
            const res = await fetch(`${base}?no_rkm_medis=${encodeURIComponent(noRkmMedis)}`, { headers: { 'Accept': 'application/json' } });
            const json = await res.json();
            const regs = (Array.isArray(json.data) ? json.data : []).filter((r) => String(r?.stts || '').toLowerCase() !== 'batal');
            const promises = regs
                .map((r) => r?.no_rawat)
                .filter(Boolean)
                .map((nr) => {
                    const url = route('rawat-jalan.pemeriksaan-ralan', { no_rawat: nr });
                    return fetch(url, { headers: { 'Accept': 'application/json' } })
                        .then((x) => x.json())
                        .then((j) => (Array.isArray(j.data) ? j.data : []))
                        .catch(() => []);
                });
            const results = await Promise.all(promises);
            const allRows = results.flat();
            allRows.sort((a, b) => {
                const ta = a?.tgl_perawatan || '';
                const tb = b?.tgl_perawatan || '';
                if (ta === tb) {
                    const ja = String(a?.jam_rawat || '');
                    const jb = String(b?.jam_rawat || '');
                    return jb.localeCompare(ja);
                }
                const da = new Date(ta);
                const db = new Date(tb);
                return db - da;
            });
            setList(allRows);
        } catch (e) {
            console.error('Gagal memuat riwayat pemeriksaan pasien', e);
        } finally {
            setLoadingList(false);
        }
    };

    useEffect(() => {
        if (viewMode === 'current') {
            fetchList();
        } else {
            fetchAllByNoRm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noRawat, noRkmMedis, viewMode]);

    // Cek status pendaftaran PCare dari tabel pcare_pendaftaran
    useEffect(() => {
        const checkPendaftaranStatus = async () => {
            if (!noRawat) {
                setShowBridging(false);
                return;
            }
            try {
                const res = await fetch(`/api/pcare/pendaftaran/rawat/${encodeURIComponent(noRawat)}`, {
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    const json = await res.json();
                    const data = json.data || null;
                    // Tampilkan tombol Bridging jika status = 'Terkirim'
                    if (data && data.status === 'Terkirim') {
                        setShowBridging(true);
                        setPcarePendaftaran(data);
                    } else {
                        setShowBridging(false);
                    }
                } else {
                    setShowBridging(false);
                }
            } catch (e) {
                // Jika error, tetap hidden
                setShowBridging(false);
            }
        };
        checkPendaftaranStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noRawat]);

    // Cek data rujukan subspesialis dari tabel pcare_rujuk_subspesialis
    useEffect(() => {
        const checkRujukanSubspesialis = async () => {
            if (!noRawat) {
                console.log('[CpptSoap] checkRujukanSubspesialis: noRawat kosong');
                setRujukanBerhasil(false);
                return;
            }
            console.log('[CpptSoap] checkRujukanSubspesialis: checking for noRawat:', noRawat);
            try {
                const url = `/api/pcare/rujuk-subspesialis/rawat/${encodeURIComponent(noRawat)}`;
                console.log('[CpptSoap] Fetching URL:', url);
                const res = await fetch(url, {
                    headers: { 'Accept': 'application/json' }
                });
                console.log('[CpptSoap] Response status:', res.status, res.ok);
                const json = await res.json();
                console.log('[CpptSoap] Response JSON:', json);
                const data = json.data || null;
                console.log('[CpptSoap] Extracted data:', data ? 'exists' : 'null');
                
                // Tampilkan tombol Cetak Rujukan jika ada data di tabel
                // Jika response OK dan ada data, tampilkan tombol
                if (res.ok && data) {
                    console.log('[CpptSoap] Setting rujukanBerhasil = true');
                    setRujukanBerhasil(true);
                    setPcareRujukanSubspesialis(data);
                    // Simpan noKunjungan untuk cetak rujukan
                    if (data.noKunjungan) {
                        setLastNoKunjungan(data.noKunjungan);
                    }
                } else {
                    console.log('[CpptSoap] Setting rujukanBerhasil = false (res.ok:', res.ok, ', data:', !!data, ')');
                    // Jika response tidak OK atau tidak ada data, set false
                    setRujukanBerhasil(false);
                    setPcareRujukanSubspesialis(null);
                }
            } catch (e) {
                // Jika error, set false
                console.error('[CpptSoap] Error checking rujukan subspesialis:', e);
                setRujukanBerhasil(false);
                setPcareRujukanSubspesialis(null);
            }
        };
        checkRujukanSubspesialis();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noRawat]);

    // Monitor perubahan state rujukanBerhasil untuk debugging
    useEffect(() => {
        console.log('[CpptSoap] State changed: rujukanBerhasil =', rujukanBerhasil, ', pcareRujukanSubspesialis =', pcareRujukanSubspesialis ? 'exists' : 'null');
    }, [rujukanBerhasil, pcareRujukanSubspesialis]);

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
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden h-full flex flex-col">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">CPPT / SOAP</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">Catatan Perkembangan Pasien</p>
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                                <label htmlFor="tgl_perawatan" className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-0">
                                    Tanggal Perawatan
                                </label>
                                <input
                                    id="tgl_perawatan"
                                    type="date"
                                    name="tgl_perawatan"
                                    value={formData.tgl_perawatan}
                                    onChange={handleChange}
                                    className="text-sm h-9 md:h-10 px-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label htmlFor="jam_rawat" className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-0">
                                    Jam Rawat
                                </label>
                                <input
                                    id="jam_rawat"
                                    type="time"
                                    name="jam_rawat"
                                    value={formData.jam_rawat}
                                    onChange={handleChange}
                                    className="text-sm h-9 md:h-10 px-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-2 md:p-3 flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 gap-2 md:gap-3">
                    {/* Kolom Utama */}
                    <div className="order-2 md:order-1 space-y-2 min-w-0">
                        {/* Informasi Dasar */}
                        <div className="space-y-px md:space-y-px bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-md p-px md:p-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-px md:gap-px">
                                <div className="min-w-0 flex flex-row items-center gap-1">
                                    <label className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 md:w-24 whitespace-nowrap">Kesadaran :</label>
                                    <select name="kesadaran" value={formData.kesadaran} onChange={handleChange} className="w-full md:flex-1 text-sm h-7 px-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                                        {kesadaranOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative">
                                    <div className="min-w-0 flex flex-row items-center gap-1">
                                        <label className="shrink-0 text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 md:w-24 whitespace-nowrap">Pemeriksa :</label>
                                        <input
                                            type="text"
                                            value={pegawaiQuery}
                                            onChange={(e) => setPegawaiQuery(e.target.value)}
                                            placeholder="Ketik nama atau NIK pegawai..."
                                            className="w-full md:flex-1 text-sm h-7 px-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        />
                                    </div>
                                    {pegawaiOptions.length > 0 && (
                                        <div className="absolute z-50 mt-1 md:mt-1 w-full max-h-48 overflow-auto rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg">
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
                                </div>
                                <div className="min-w-0 flex flex-row items-center gap-1">
                                    <label className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 md:w-24 whitespace-nowrap">
                                        Alergi :
                                    </label>
                                    <input
                                        type="text"
                                        name="alergi"
                                        value={formData.alergi}
                                        onChange={handleChange}
                                        className={`w-full md:flex-1 text-sm h-7 px-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                            ((formData.alergi || '').trim() !== '' && (formData.alergi || '').trim() !== '-') ? 'text-red-600 dark:text-red-400' : 'dark:text-white'
                                        }`}
                                    />
                                </div>
                                <div className="min-w-0 flex flex-row items-center gap-1">
                                    <label className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 md:w-24 whitespace-nowrap">Template :</label>
                                    <div className="w-full md:flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                                            <div className="w-full sm:w-52 md:w-52">
                                                <SearchableSelect
                                                    options={templateOptions}
                                                    value={selectedTemplate}
                                                    onChange={(val) => { setSelectedTemplate(val); applyTemplate(val); }}
                                                    placeholder="Pilih template..."
                                                    searchPlaceholder="Cari diagnosa..."
                                                    displayKey="label"
                                                    valueKey="key"
                                                    className="!h-7 !px-1.5 !py-0.5 !text-[11px] !rounded !shadow-none"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={clearTemplateFields}
                                                className="inline-flex items-center w-auto self-start sm:self-auto p-1 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                aria-label="Bersihkan Form"
                                                title="Bersihkan"
                                            >
                                                <Eraser className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Subjektif & Objektif */}
                        <div className="space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-stretch">
                                <div className="flex flex-col h-full">
                                    <label className="block text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Keluhan Utama (Subjektif)</label>
                                    <textarea name="keluhan" value={formData.keluhan} onChange={handleChange} rows={4} className="w-full text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none h-24" />
                                </div>
                                <div className="flex flex-col h-full">
                                    <label className="block text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Pemeriksaan Fisik (Objektif)</label>
                                    <textarea name="pemeriksaan" value={formData.pemeriksaan} onChange={handleChange} rows={4} className="w-full text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none h-24" />
                                </div>
                            </div>
                        </div>

                        {/* Tanda-Tanda Vital & Antropometri */}
                        <div className="space-y-px md:space-y-px">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-1">
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-px">Suhu (°C)</label>
                                    <input type="text" name="suhu_tubuh" value={formData.suhu_tubuh} onChange={handleChange} className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-px">Tensi (mmHg)</label>
                                    <input type="text" name="tensi" value={formData.tensi} onChange={handleChange} className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-px">Nadi (/menit)</label>
                                    <input type="text" name="nadi" value={formData.nadi} onChange={handleChange} className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-px">Respirasi (/menit)</label>
                                    <input type="text" name="respirasi" value={formData.respirasi} onChange={handleChange} className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-px">SpO2 (%)</label>
                                    <input type="text" name="spo2" value={formData.spo2} onChange={handleChange} className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-px">Tinggi (cm)</label>
                                    <input type="text" name="tinggi" value={formData.tinggi} onChange={handleChange} className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-px">Berat (kg)</label>
                                    <input type="text" name="berat" value={formData.berat} onChange={handleChange} className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-px">GCS</label>
                                    <input type="text" name="gcs" value={formData.gcs} onChange={handleChange} className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-px">Lingkar Perut (cm)</label>
                                    <input type="text" name="lingkar_perut" value={formData.lingkar_perut} onChange={handleChange} className="w-full text-sm h-7 px-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Assessment & Planning */}
                        <div className="space-y-px md:space-y-px">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-1 items-stretch">
                                <div className="flex flex-col h-full">
                                    <label className="block text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 mb-px">Penilaian (Assessment)</label>
                                    <textarea name="penilaian" value={formData.penilaian} onChange={handleChange} rows={3} className="w-full text-sm rounded-md border bg-white border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none h-24" />
                                </div>
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 mb-px">Rencana Tindak Lanjut (Planning)</label>
                                        <Link
                                            href={noRawat ? `/rawat-jalan/obat-ralan/${encodeURIComponent(noRawat)}` : '/farmasi/resep-obat'}
                                            onClick={(e) => {
                                                if (typeof onOpenResep === 'function') {
                                                    e.preventDefault();
                                                    onOpenResep();
                                                }
                                            }}
                                            className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700"
                                            aria-label="Buka tab Resep"
                                            title="Buka Resep Obat"
                                        >
                                            Resep
                                        </Link>
                                    </div>
                                    <textarea name="rtl" value={formData.rtl} onChange={handleChange} rows={3} className="w-full text-sm rounded-md border bg-white border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none h-24" />
                                </div>
                                <div className="flex flex-col h-full">
                                    <label className="block text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 mb-px">Instruksi Medis</label>
                                    <textarea name="instruksi" value={formData.instruksi} onChange={handleChange} rows={2} className="w-full text-sm rounded-md border bg-white border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" />
                                </div>
                                <div className="flex flex-col h-full">
                                    <label className="block text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 mb-px">Evaluasi</label>
                                    <textarea name="evaluasi" value={formData.evaluasi} onChange={handleChange} rows={2} className="w-full text-sm rounded-md border bg-white border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none" />
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Kolom kedua dihapus; konten template kini di dalam main form */}
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 mt-3">
                    {editKey && (
                        <button
                            type="button"
                            onClick={() => { setEditKey(null); setMessage(null); setError(null); }}
                            className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Batal
                        </button>
                    )}
                    <button type="submit" className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-semibold px-6 py-2.5 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed" disabled={isSubmitting}>
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
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 text-white font-semibold px-4 py-2.5 rounded-lg"
                            title="Bridging PCare"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 0h-1v4h-1m1-9h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Bridging PCare
                        </button>
                    )}
                    {/* Debug: Log state rujukanBerhasil saat render */}
                    {(() => {
                        console.log('[CpptSoap] Render: rujukanBerhasil =', rujukanBerhasil, ', pcareRujukanSubspesialis =', pcareRujukanSubspesialis ? 'exists' : 'null');
                        return null;
                    })()}
                    {/* Tombol Cetak Rujukan - tampil jika ada data di tabel pcare_rujuk_subspesialis */}
                    {rujukanBerhasil && (
                        <button
                            type="button"
                            onClick={async () => {
                                try {
                                    console.log('[CpptSoap] Cetak Rujukan clicked');
                                    console.log('[CpptSoap] State check:', {
                                        hasRujukanData: !!pcareRujukanSubspesialis,
                                        hasPayload: !!lastKunjunganPayload,
                                        hasPendaftaran: !!pcarePendaftaran
                                    });
                                    
                                    // Prioritaskan data dari tabel pcare_rujuk_subspesialis jika tersedia
                                    const rujukanData = pcareRujukanSubspesialis || {};
                                const p = lastKunjunganPayload || {};
                                const pd = pcarePendaftaran || {};
                                const findLabel = (opts, val) => {
                                    if (!val) return '';
                                    const it = (opts || []).find(o => String(o.value) === String(val));
                                    return it ? it.label : '';
                                };
                                    
                                    console.log('[CpptSoap] Starting data fetch...');
                                    
                                    const kdPPK = rujukanData.kdPPK || p?.rujukLanjut?.kdppk || '';
                                    const kdSubSpesialis = rujukanData.kdSubSpesialis || p?.rujukLanjut?.subSpesialis?.kdSubSpesialis1 || '';
                                    const kdSarana = rujukanData.kdSarana || p?.rujukLanjut?.subSpesialis?.kdSarana || '';
                                    const tglEstRujuk = rujukanData.tglEstRujuk || p?.rujukLanjut?.tglEstRujuk || '';
                                    
                                    // Optimasi: Fetch paralel hanya jika diperlukan
                                    const fetchPromises = [];
                                    
                                    // Ambil data FKTP provider - hanya jika nmPPK belum ada di rujukanData
                                    let fktpData = null;
                                    if (kdPPK && (!rujukanData.nmPPK || rujukanData.nmPPK.trim() === '' || rujukanData.nmPPK === '-')) {
                                        fetchPromises.push(
                                            fetch(`/api/pcare/provider?start=0&limit=200`, { headers: { 'Accept': 'application/json' } })
                                                .then(res => res.ok ? res.json() : null)
                                                .then(json => {
                                                    if (json?.response?.list) {
                                                        fktpData = json.response.list.find(pr => String(pr.kdProvider) === String(kdPPK));
                                                    }
                                                })
                                                .catch(() => {})
                                        );
                                    }
                                    
                                    // Ambil jadwal praktek - hanya jika diperlukan (opsional, bisa di-skip)
                                    let jadwalPraktek = '';
                                    // Skip fetch jadwal untuk mempercepat - bisa ditambahkan nanti jika diperlukan
                                    
                                    // Ambil kabupaten/kota dari config - fetch cepat
                                    let kabupatenKota = '';
                                    fetchPromises.push(
                                        fetch('/api/pcare/config/kabupaten', { headers: { 'Accept': 'application/json' } })
                                            .then(res => res.ok ? res.json() : null)
                                            .then(json => {
                                                kabupatenKota = json?.kabupaten || '';
                                            })
                                            .catch(() => {})
                                    );
                                    
                                    // Tunggu semua fetch selesai (maksimal 2 detik)
                                    await Promise.race([
                                        Promise.all(fetchPromises),
                                        new Promise(resolve => setTimeout(resolve, 2000))
                                    ]);
                                    
                                    // Gunakan data dari tabel jika tersedia, fallback ke payload
                                    const nmPPK = fktpData?.nmProvider || rujukanData.nmPPK || '';
                                    const nmSubSpesialis = rujukanData.nmSubSpesialis || '';
                                    const nmSarana = rujukanData.nmSarana || '';
                                    
                                    // Cari label dari options jika tersedia
                                    const providerLabel = findLabel(providerOptions, kdPPK);
                                const providerParts = providerLabel.split(' — ');
                                    const kdProvider = providerParts[0] || kdPPK || '';
                                    // Format FKTP: "Nama FKTP (Kode)" atau hanya "Kode" jika nama tidak ada
                                    const nmProvider = providerParts[1] || nmPPK || '';
                                    const fktpDisplay = nmProvider ? `${nmProvider} (${kdProvider})` : kdProvider || '-';
                                    
                                    // Format SubSpesialis untuk "Kepada Yth. TS Dokter"
                                    // Prioritas: ambil langsung dari tabel pcare_rujuk_subspesialis.nmSubSpesialis
                                    // Jika kosong, coba dari options yang sudah di-load (tidak fetch lagi untuk performa)
                                    let subSpDisplay = rujukanData.nmSubSpesialis || '';
                                    if (!subSpDisplay || subSpDisplay === '-') {
                                        // Coba dari subSpesialisOptions yang sudah di-load (tidak fetch untuk performa)
                                        const selectedSubSp = subSpesialisOptions.find(opt => String(opt.value) === String(kdSubSpesialis));
                                        if (selectedSubSp) {
                                            subSpDisplay = selectedSubSp.label.split(' — ')[1] || selectedSubSp.label;
                                        } else {
                                            // Coba dari findLabel sebagai fallback
                                            const subSpLabel = findLabel(subSpesialisOptions, kdSubSpesialis);
                                            if (subSpLabel) {
                                                subSpDisplay = subSpLabel.split(' — ')[1] || subSpLabel;
                                            } else {
                                                subSpDisplay = '-';
                                            }
                                        }
                                    }
                                    
                                    // Format Provider untuk "Di"
                                    // Prioritas: ambil langsung dari tabel pcare_rujuk_subspesialis.nmPPK
                                    // Jika kosong, coba dari provider options atau fallback ke '-'
                                    let diDisplay = '';
                                    // Cek nmPPK dari rujukanData (tabel pcare_rujuk_subspesialis)
                                    if (rujukanData.nmPPK && rujukanData.nmPPK.trim() !== '' && rujukanData.nmPPK !== '-') {
                                        diDisplay = rujukanData.nmPPK.trim();
                                    } else {
                                        // Jika kosong, coba dari fktpData yang sudah di-fetch
                                        if (fktpData && fktpData.nmProvider && fktpData.nmProvider.trim() !== '') {
                                            diDisplay = fktpData.nmProvider.trim();
                                        } else {
                                            // Coba dari providerOptions yang sudah di-load
                                            const selectedProvider = providerOptions.find(opt => String(opt.value) === String(kdPPK));
                                            if (selectedProvider) {
                                                const providerName = selectedProvider.label.split(' — ')[1] || selectedProvider.meta?.nmppk || '';
                                                if (providerName && providerName.trim() !== '') {
                                                    diDisplay = providerName.trim();
                                                }
                                            }
                                            // Jika masih kosong, coba dari nmProvider atau nmPPK yang sudah di-parse
                                            if (!diDisplay || diDisplay === '') {
                                                diDisplay = (nmProvider && nmProvider.trim() !== '') ? nmProvider.trim() : 
                                                           (nmPPK && nmPPK.trim() !== '') ? nmPPK.trim() : '-';
                                            }
                                        }
                                    }
                                    
                                    // Format tanggal
                                const fmtIdDate = (d) => {
                                    if (!d) return '-';
                                    try {
                                            if (typeof d === 'string' && d.includes('-')) {
                                                const parts = d.split('-');
                                                if (parts.length === 3) {
                                                    if (parts[0].length === 2 && parts[2].length === 4) {
                                                        const dt = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
                                                        const tz = getAppTimeZone();
                                                        return dt.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', timeZone: tz });
                                                    }
                                                    const dt = new Date(d);
                                                    const tz = getAppTimeZone();
                                                    return dt.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', timeZone: tz });
                                                }
                                            }
                                        const dt = new Date(d);
                                        const tz = getAppTimeZone();
                                        return dt.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', timeZone: tz });
                                    } catch { return String(d); }
                                };
                                    
                                    const fmtIdDateShort = (d) => {
                                        if (!d) return '-';
                                        try {
                                            if (typeof d === 'string' && d.includes('-')) {
                                                const parts = d.split('-');
                                                if (parts.length === 3) {
                                                    let dt;
                                                    if (parts[0].length === 2 && parts[2].length === 4) {
                                                        // Format DD-MM-YYYY
                                                        dt = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
                                                    } else if (parts[0].length === 4) {
                                                        // Format YYYY-MM-DD
                                                        dt = new Date(d);
                                                    } else {
                                                        dt = new Date(d);
                                                    }
                                                    const day = String(dt.getDate()).padStart(2, '0');
                                                    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
                                                    const month = monthNames[dt.getMonth()] || String(dt.getMonth() + 1).padStart(2, '0');
                                                    const year = dt.getFullYear();
                                                    return `${day}-${month}-${year}`;
                                                }
                                            }
                                            const dt = new Date(d);
                                            const day = String(dt.getDate()).padStart(2, '0');
                                            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
                                            const month = monthNames[dt.getMonth()] || String(dt.getMonth() + 1).padStart(2, '0');
                                            const year = dt.getFullYear();
                                            return `${day}-${month}-${year}`;
                                        } catch { return String(d); }
                                    };
                                    
                                const todayStr = fmtIdDate(new Date()); // fmtIdDate sudah menggunakan timezone dari getAppTimeZone
                                    const tglEstStr = tglEstRujuk ? fmtIdDateShort(tglEstRujuk) : '-';
                                    
                                    // Hitung tanggal validitas (90 hari dari tglEstRujuk)
                                    let tglValiditasStr = '-';
                                    if (tglEstRujuk) {
                                        try {
                                            let tglEstDate;
                                            if (typeof tglEstRujuk === 'string' && tglEstRujuk.includes('-')) {
                                                const parts = tglEstRujuk.split('-');
                                                if (parts.length === 3) {
                                                    if (parts[0].length === 2 && parts[2].length === 4) {
                                                        tglEstDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
                                                    } else {
                                                        tglEstDate = new Date(tglEstRujuk);
                                                    }
                                                } else {
                                                    tglEstDate = new Date(tglEstRujuk);
                                                }
                                            } else {
                                                tglEstDate = new Date(tglEstRujuk);
                                            }
                                            const tglValiditas = new Date(tglEstDate);
                                            tglValiditas.setDate(tglValiditas.getDate() + 90);
                                            // Gunakan helper untuk mendapatkan tanggal dengan timezone yang benar
                                            const tz = getAppTimeZone();
                                            const dateParts = tglValiditas.toLocaleDateString('en-GB', { timeZone: tz }).split('/');
                                            if (dateParts.length === 3) {
                                                tglValiditasStr = fmtIdDateShort(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
                                            } else {
                                                tglValiditasStr = fmtIdDateShort(tglValiditas.toISOString().split('T')[0]);
                                            }
                                        } catch (e) {
                                            tglValiditasStr = '-';
                                        }
                                    }
                                    
                                    // Data pasien
                                    const noKunjungan = rujukanData.noKunjungan || lastNoKunjungan || '';
                                    const namaPasien = rujukanData.nm_pasien || pd?.nm_pasien || pd?.nama || '-';
                                    const noKartu = rujukanData.noKartu || pd?.noKartu || pd?.no_kartu || '-';
                                    
                                    // Format diagnosa: "Nama Diagnosa (Kode)" atau hanya "Kode" jika nama tidak ada
                                    const kdDiag1 = rujukanData.kdDiag1 || '';
                                    const nmDiag1 = rujukanData.nmDiag1 || '';
                                    const diagnosaDisplay = nmDiag1 ? `${nmDiag1} (${kdDiag1})` : (kdDiag1 || '-');
                                    
                                    // Umur: hanya angka tanpa satuan
                                    const umur = rujukanData.umur || rujukanData.umurdaftar || '';
                                    const satuanUmur = rujukanData.satuanUmur || rujukanData.sttsumur || 'Th';
                                    const umurDisplay = umur ? String(umur) : '-';
                                    
                                    const tglLahir = rujukanData.tgl_lahir || '';
                                    const tglLahirStr = tglLahir ? fmtIdDateShort(tglLahir) : '-';
                                    
                                    // Format status: "Kode Deskripsi"
                                    const statusPeserta = rujukanData.statusPeserta || '1';
                                    const statusDisplay = statusPeserta === '1' ? '1 Utama/Tanggungan' : 
                                                          statusPeserta === '2' ? '2 Istri' : 
                                                          statusPeserta === '3' ? '3 Anak' : 
                                                          `${statusPeserta} Lainnya`;
                                    
                                    // Format gender: "L (L / P)" atau "P (L / P)"
                                    const jenisKelamin = rujukanData.jenisKelamin || pd?.jk || pd?.jenis_kelamin || 'L';
                                    const genderDisplay = jenisKelamin === 'L' ? 'L (L / P)' : jenisKelamin === 'P' ? 'P (L / P)' : 'L (L / P)';
                                    
                                    const tglDaftar = rujukanData.tglDaftar || '';
                                    const tglDaftarStr = tglDaftar ? fmtIdDateShort(tglDaftar) : '-';
                                    const nmDokter = rujukanData.nm_dokter || '';
                                    
                                    // Format jadwal praktek: "Hari : Jam" dari jadwal yang sudah di-parse
                                    let jadwalPraktekDisplay = '';
                                    if (jadwalPraktek) {
                                        // Parse jadwal jika format string, atau gunakan langsung jika sudah di-parse
                                        const DAY_ORDER = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
                                        const parseJadwal = (text) => {
                                            const result = {};
                                            if (!text || typeof text !== 'string') return result;
                                            const re = /(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu)\s*:/gi;
                                            let match;
                                            const segments = [];
                                            while ((match = re.exec(text)) !== null) {
                                                segments.push({ day: match[1], start: match.index, end: null });
                                            }
                                            for (let i = 0; i < segments.length; i++) {
                                                segments[i].end = i < segments.length - 1 ? segments[i + 1].start : text.length;
                                            }
                                            segments.forEach(seg => {
                                                const raw = text.slice(seg.start, seg.end);
                                                const [dayLabel, rest] = raw.split(':');
                                                if (!dayLabel || !rest) return;
                                                const day = dayLabel.trim();
                                                const times = rest.replace(/\n/g, ' ').split(/[,;]+/).map(s => s.trim()).filter(Boolean);
                                                if (times.length) {
                                                    result[day] = times;
                                                }
                                            });
                                            return result;
                                        };
                                        const jadwalParsed = parseJadwal(jadwalPraktek);
                                        // Ambil jadwal untuk hari yang sesuai dengan tglEstRujuk jika ada
                                        if (tglEstRujuk) {
                                            try {
                                                const tglEstDate = new Date(tglEstRujuk.includes('-') && tglEstRujuk.split('-')[0].length === 2 
                                                    ? `${tglEstRujuk.split('-')[2]}-${tglEstRujuk.split('-')[1]}-${tglEstRujuk.split('-')[0]}`
                                                    : tglEstRujuk);
                                                const dayIndex = tglEstDate.getDay();
                                                const dayName = DAY_ORDER[dayIndex === 0 ? 6 : dayIndex - 1]; // Convert Sunday=0 to Monday=0
                                                if (jadwalParsed[dayName] && jadwalParsed[dayName].length > 0) {
                                                    jadwalPraktekDisplay = `${dayName} : ${jadwalParsed[dayName].join(' - ')}`;
                                                }
                                            } catch (e) {
                                                // Fallback: ambil jadwal pertama yang ada
                                                const firstDay = Object.keys(jadwalParsed)[0];
                                                if (firstDay && jadwalParsed[firstDay].length > 0) {
                                                    jadwalPraktekDisplay = `${firstDay} : ${jadwalParsed[firstDay].join(' - ')}`;
                                                }
                                            }
                                        }
                                    }

                                    console.log('[CpptSoap] Data prepared:', { 
                                        noKunjungan, 
                                        namaPasien, 
                                        noKartu,
                                        tglEstRujuk,
                                        kdSubSpesialis,
                                        kdSarana,
                                        kdPPK
                                    });
                                    console.log('[CpptSoap] Preparing print data...', { noKunjungan, namaPasien, noKartu });
                                    
                                    // Generate barcode menggunakan library JsBarcode (CDN)
                                    const barcodeSvg = noKunjungan ? `<svg id="barcode"></svg>` : '';

                                    // Cari logo BPJS (non-blocking, gunakan default jika gagal)
                                const base = window.location.origin || '';
                                const logoCandidates = [
                                    `${base}/img/BPJS_Kesehatan_logo.png`,
                                    '/img/BPJS_Kesehatan_logo.png',
                                    'http://127.0.0.1:8000/img/BPJS_Kesehatan_logo.png',
                                    'http://127.0.0.1:8001/img/BPJS_Kesehatan_logo.png',
                                    'http://127.0.0.1:8006/img/BPJS_Kesehatan_logo.png',
                                    'http://127.0.0.1:8007/img/BPJS_Kesehatan_logo.png',
                                    'http://127.0.0.1:8008/img/BPJS_Kesehatan_logo.png',
                                ];
                                    
                                    // Resolve logo dengan timeout singkat untuk performa
                                    let logoSrc = '/img/BPJS_Kesehatan_logo.png';
                                    try {
                                const fetchAsDataURL = async (url) => {
                                            const controller = new AbortController();
                                            const timeoutId = setTimeout(() => controller.abort(), 500); // Timeout 500ms per URL
                                            try {
                                                const r = await fetch(url, { method: 'GET', signal: controller.signal });
                                                clearTimeout(timeoutId);
                                    if (!r.ok) throw new Error('not ok');
                                    const blob = await r.blob();
                                                return await new Promise((resolve, reject) => {
                                        const reader = new FileReader();
                                        reader.onloadend = () => resolve(reader.result);
                                                    reader.onerror = reject;
                                        reader.readAsDataURL(blob);
                                    });
                                            } catch (e) {
                                                clearTimeout(timeoutId);
                                                throw e;
                                            }
                                        };
                                        
                                        // Coba resolve logo dengan timeout total 1 detik (lebih cepat)
                                        const logoPromise = Promise.race([
                                            (async () => {
                                                // Coba hanya 2 URL pertama untuk mempercepat
                                                for (const u of logoCandidates.slice(0, 2)) {
                                        try {
                                            const dataUrl = await fetchAsDataURL(u);
                                            if (dataUrl) return dataUrl;
                                        } catch (e) { /* try next candidate */ }
                                    }
                                    return '/img/BPJS_Kesehatan_logo.png';
                                            })(),
                                            new Promise((resolve) => setTimeout(() => resolve('/img/BPJS_Kesehatan_logo.png'), 1000))
                                        ]);
                                        
                                        logoSrc = await logoPromise;
                                    } catch (e) {
                                        console.warn('[CpptSoap] Error resolving logo:', e);
                                        // Gunakan default logo jika gagal
                                    }

                                    console.log('[CpptSoap] Opening print window...');
                                    // Pastikan window terbuka meskipun ada error sebelumnya
                                    let win = null;
                                    try {
                                        win = window.open('', 'CetakRujukan', 'width=900,height=1000');
                                        if (!win || win.closed || typeof win.closed === 'undefined') {
                                            alert('Popup diblokir oleh browser. Silakan izinkan popup untuk halaman ini.');
                                            return;
                                        }
                                        console.log('[CpptSoap] Window opened successfully');
                                    } catch (e) {
                                        console.error('[CpptSoap] Error opening window:', e);
                                        alert('Gagal membuka window cetak. Error: ' + (e.message || e));
                                        return;
                                    }
                                    
                                const html = `<!doctype html>
<html lang="id"><head><meta charset="utf-8"/><title>Surat Rujukan FKTP</title>
<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
<style>
  @page { size: A4 portrait; margin: 12mm; }
  html, body { height: 100%; margin: 0; padding: 0; }
  body {
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
    font-family: Arial, Helvetica, sans-serif; color: #111;
    width: 186mm; /* 210mm - (12mm + 12mm) */
  }
  .wrap { width: 100%; margin: 0 auto; padding: 0; }
  .header {
    display: flex; align-items: flex-start; justify-content: space-between;
    border-bottom: 3px solid #0d47a1; padding-bottom: 10px; margin-bottom: 14px;
  }
  .brand { display: flex; align-items: center; gap: 16px; }
  .brand img { height: 50px; object-fit: contain; image-rendering: -webkit-optimize-contrast; }
  .brand-title { font-size: 30px; font-weight: bold; line-height: 1; }
  .brand-title .bpjs { color: #1a237e; }
  .brand-title .kesehatan { color: #2e7d32; }
  .brand-sub { font-size: 14px; color: #1a237e; margin-top: 2px; }
  .header-right { text-align: right; font-size: 12px; color: #444; }
  .header-right div { margin-bottom: 4px; }
  .doc-title { font-size: 20px; font-weight: bold; text-align: center; margin: 12px 0; }
  .rujukan-box {
    border: 2px solid #333; padding: 12px; margin: 12px 0; background: #fff;
    display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: start;
  }
  .rujukan-left { flex: 1; }
  .rujukan-right { text-align: center; }
  .rujukan-row { display: flex; gap: 8px; margin: 6px 0; font-size: 13px; }
  .rujukan-label { min-width: 140px; font-weight: bold; }
  .rujukan-value { flex: 1; }
  #barcode { max-width: 120px; height: auto; }
  .pasien-section { margin: 16px 0; }
  .pasien-title { font-weight: bold; margin-bottom: 8px; font-size: 13px; }
  .pasien-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .pasien-row { display: flex; gap: 8px; margin: 4px 0; font-size: 13px; }
  .pasien-label { min-width: 140px; font-weight: bold; }
  .pasien-value { flex: 1; }
  .footer-section { margin-top: 20px; }
  .footer-row { display: flex; justify-content: space-between; margin: 8px 0; font-size: 13px; }
  .footer-left { flex: 1; }
  .footer-right { text-align: right; }
  .small { font-size: 11px; color: #666; }
  .terimakasih { margin-top: 0; margin-bottom: 8px; font-size: 13px; }
  .footer-row-top { margin-bottom: 8px; font-size: 13px; }
  .validitas-wrapper { flex: 1; text-align: left; display: flex; flex-direction: column; }
  .validitas { font-size: 12px; margin-top: 0; }
  .ttd-section { margin-top: 20px; font-size: 13px; }
  .ttd-date { margin-bottom: 0; text-align: right; }
  .ttd-name { font-weight: bold; margin-top: 0; text-align: right; }
  .ttd-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; margin-top: 0; }
</style></head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="brand">
        ${logoSrc ? `<img src="${logoSrc}" alt="BPJS Kesehatan"/>` : ''}
        </div>
      <div class="header-right">
        <div><strong>Kedeputian Wilayah</strong></div>
        <div>KEDEPUTIAN WILAYAH VI</div>
        <div style="margin-top: 8px;"><strong>Kantor Cabang</strong></div>
        <div>SURAKARTA</div>
      </div>
    </div>
    <div class="doc-title">Surat Rujukan FKTP</div>

    <div class="rujukan-box">
      <div class="rujukan-left">
        <div class="rujukan-row">
          <div class="rujukan-label">No. Rujukan</div>
          <div class="rujukan-value">: ${noKunjungan}</div>
        </div>
        <div class="rujukan-row">
          <div class="rujukan-label">FKTP</div>
          <div class="rujukan-value">: ${fktpDisplay}</div>
        </div>
        ${kabupatenKota ? `<div class="rujukan-row">
          <div class="rujukan-label">Kabupaten / Kota</div>
          <div class="rujukan-value">: ${kabupatenKota}</div>
        </div>` : ''}
        <div class="rujukan-row">
          <div class="rujukan-label">Kepada Yth. TS Dokter</div>
          <div class="rujukan-value">: ${subSpDisplay}</div>
        </div>
        <div class="rujukan-row">
          <div class="rujukan-label">Di</div>
          <div class="rujukan-value">: ${diDisplay}</div>
        </div>
      </div>
      <div class="rujukan-right">
        ${barcodeSvg}
      </div>
    </div>

    <div class="pasien-section">
      <div class="pasien-title">Mohon pemeriksaan dan penangan lebih lanjut pasien :</div>
      <div class="pasien-grid">
        <div class="pasien-row">
          <div class="pasien-label">Nama</div>
          <div class="pasien-value">: ${namaPasien}</div>
        </div>
        <div class="pasien-row">
          <div class="pasien-label">No. Kartu BPJS</div>
          <div class="pasien-value">: ${noKartu}</div>
        </div>
        <div class="pasien-row">
          <div class="pasien-label">Diagnosa</div>
          <div class="pasien-value">: ${diagnosaDisplay}</div>
        </div>
        <div class="pasien-row">
          <div class="pasien-label">Umur</div>
          <div class="pasien-value">: ${umurDisplay}</div>
        </div>
        <div class="pasien-row">
          <div class="pasien-label">Tahun</div>
          <div class="pasien-value">: ${tglLahirStr}</div>
        </div>
        <div class="pasien-row">
          <div class="pasien-label">Status</div>
          <div class="pasien-value">: ${statusDisplay}</div>
        </div>
        <div class="pasien-row">
          <div class="pasien-label">Gender</div>
          <div class="pasien-value">: ${genderDisplay}</div>
        </div>
        <div class="pasien-row">
          <div class="pasien-label">Catatan</div>
          <div class="pasien-value">:</div>
        </div>
        <div class="pasien-row">
          <div class="pasien-label">Telah diberikan</div>
          <div class="pasien-value">:</div>
        </div>
      </div>
    </div>

    <div class="footer-section">
      <div class="ttd-section">
        <div style="margin-bottom: 4px; text-align: right;">Salam sejawat,</div>
        <div class="ttd-date">${tglDaftarStr}</div>
        <div style="height: 50px; margin-top: 8px;"></div>
        <div class="ttd-row">
          <div class="validitas-wrapper">
            <div class="terimakasih">Atas bantuannya, diucapkan terima kasih</div>
            <div class="footer-row-top">
              <div><strong>Tgl. Rencana Berkunjung</strong>: ${tglEstStr}</div>
              ${jadwalPraktekDisplay ? `<div><strong>Jadwal Praktek</strong>: ${jadwalPraktekDisplay}</div>` : ''}
        </div>
            <div class="validitas">
              Surat rujukan berlaku 1[satu] kali kunjungan, berlaku sampai dengan : ${tglValiditasStr}
        </div>
      </div>
          <div class="ttd-name">${nmDokter || '-'}</div>
        </div>
      </div>
    </div>
  </div>
  <script>
    ${noKunjungan ? `JsBarcode("#barcode", "${noKunjungan}", { format: "CODE128", width: 2, height: 50, displayValue: false });` : ''}
    window.onload = function(){
      window.print();
      setTimeout(function(){ window.close(); }, 600);
    };
  </script>
</body></html>`;
                                    console.log('[CpptSoap] Writing HTML to window...');
                                    try {
                                        if (!win || win.closed) {
                                            throw new Error('Window sudah ditutup');
                                        }
                                win.document.write(html);
                                win.document.close();
                                        console.log('[CpptSoap] HTML written successfully');
                                    } catch (e) {
                                        console.error('[CpptSoap] Error writing to window:', e);
                                        alert('Gagal menulis konten ke window cetak. Error: ' + (e.message || e));
                                        if (win && !win.closed) {
                                            win.close();
                                        }
                                    }
                                } catch (e) {
                                    console.error('[CpptSoap] Error in Cetak Rujukan:', e);
                                    alert('Terjadi kesalahan saat mencetak rujukan: ' + (e.message || e));
                                }
                            }}
                            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                            title="Cetak Rujukan"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                            </svg>
                            Cetak Rujukan
                        </button>
                    )}
                </div>
                </div>
            </form>
            {bridgingOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
                    <div className="absolute inset-0 bg-black/50" onClick={closeBridgingModal}></div>
                    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-full mx-2 sm:mx-4 my-4 sm:my-8 flex flex-col max-h-[88vh] overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Bridging PCare</h3>
                            <button onClick={closeBridgingModal} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1 overflow-x-hidden">
                            {/* 1. Pendaftaran PCare */}
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-3 sm:p-4 overflow-x-hidden">
                                <h4 className="text-sm font-semibold text-indigo-800 dark:text-indigo-300 mb-2">Pendaftaran PCare</h4>
                                {pcarePendaftaran ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-2 text-sm text-gray-700 dark:text-gray-200">
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
                                </div>
                                <div className="space-y-3">
                                        {/* Form Kunjungan PCare */}
                                        {kunjunganPreview && (
                                            <div className="space-y-4 md:space-y-5">
                                                {/* 1 baris: No Kartu BPJS, Tanggal Daftar, KD Poli, KD Dokter */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">No Kartu BPJS</label>
                                                        <input type="text" value={kunjunganPreview.noKartu || ''} onChange={(e) => updateKunjunganField('noKartu', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Tanggal Daftar</label>
                                                        <input type="date" value={toInputDate(kunjunganPreview.tglDaftar)} onChange={(e) => updateKunjunganField('tglDaftar', fromInputDate(e.target.value))} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">KD Poli (PCare)</label>
                                                        <SearchableSelect
                                                            options={poliOptions}
                                                            value={kunjunganPreview.kdPoli ?? ''}
                                                            onChange={(val) => updateKunjunganField('kdPoli', val)}
                                                            placeholder="Pilih Poli"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">KD Dokter (PCare)</label>
                                                        <SearchableSelect
                                                            options={dokterOptions}
                                                            value={kunjunganPreview.kdDokter ?? ''}
                                                            onChange={(val) => updateKunjunganField('kdDokter', val)}
                                                            placeholder="Pilih Dokter"
                                                        />
                                                    </div>
                                                </div>

                                                {/* 1 baris: Keluhan, Anamnesa */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Keluhan</label>
                                                        <textarea value={kunjunganPreview.keluhan || ''} onChange={(e) => updateKunjunganField('keluhan', e.target.value)} rows={2} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm"></textarea>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Anamnesa</label>
                                                        <textarea value={kunjunganPreview.anamnesa || ''} onChange={(e) => updateKunjunganField('anamnesa', e.target.value)} rows={2} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm"></textarea>
                                                    </div>
                                                </div>

                                                {/* 1 baris: Sistole, Diastole, Berat, Tinggi */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Sistole</label>
                                                        <input type="number" value={kunjunganPreview.sistole ?? ''} onChange={(e) => updateKunjunganField('sistole', e.target.value, 'int')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Diastole</label>
                                                        <input type="number" value={kunjunganPreview.diastole ?? ''} onChange={(e) => updateKunjunganField('diastole', e.target.value, 'int')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Berat Badan (kg)</label>
                                                        <input type="number" step="0.1" value={kunjunganPreview.beratBadan ?? ''} onChange={(e) => updateKunjunganField('beratBadan', e.target.value, 'float')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Tinggi Badan (cm)</label>
                                                        <input type="number" step="0.1" value={kunjunganPreview.tinggiBadan ?? ''} onChange={(e) => updateKunjunganField('tinggiBadan', e.target.value, 'float')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                                    </div>
                                                </div>

                                                {/* 1 baris: Resp Rate, Heart Rate, Lingkar Perut, Suhu */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Resp Rate</label>
                                                        <input type="number" value={kunjunganPreview.respRate ?? ''} onChange={(e) => updateKunjunganField('respRate', e.target.value, 'int')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Heart Rate</label>
                                                        <input type="number" value={kunjunganPreview.heartRate ?? ''} onChange={(e) => updateKunjunganField('heartRate', e.target.value, 'int')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Lingkar Perut (cm)</label>
                                                        <input type="number" step="0.1" value={kunjunganPreview.lingkarPerut ?? ''} onChange={(e) => updateKunjunganField('lingkarPerut', e.target.value, 'float')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Suhu</label>
                                                        <input type="text" value={kunjunganPreview.suhu ?? ''} onChange={(e) => updateKunjunganField('suhu', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                                    </div>
                                                </div>

                                                {/* 1 baris: Tanggal Pulang, Poli Rujuk Internal, Terapi Non Obat, BMHP */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Tanggal Pulang</label>
                                                        <input type="date" value={toInputDate(kunjunganPreview.tglPulang)} onChange={(e) => updateKunjunganField('tglPulang', fromInputDate(e.target.value))} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Poli Rujuk Internal (kdPoliRujukInternal)</label>
                                                        <input type="text" value={kunjunganPreview.kdPoliRujukInternal ?? ''} onChange={(e) => updateKunjunganField('kdPoliRujukInternal', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Terapi Non Obat</label>
                                                        <input type="text" value={kunjunganPreview.terapiNonObat ?? ''} onChange={(e) => updateKunjunganField('terapiNonObat', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">BMHP</label>
                                                        <input type="text" value={kunjunganPreview.bmhp ?? ''} onChange={(e) => updateKunjunganField('bmhp', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                                    </div>
                                                </div>

                                                {/* 1 baris: Status Pulang, Diagnosa Utama, Diagnosa 2, Diagnosa 3 */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Status Pulang (kdStatusPulang)</label>
                                                        <SearchableSelect
                                                            source="statuspulang"
                                                            value={kunjunganPreview.kdStatusPulang ?? ''}
                                                            onChange={(val) => {
                                                                // Update kode status pulang
                                                                updateKunjunganField('kdStatusPulang', val);
                                                                // Jika kode dikosongkan, kosongkan juga nama status pulang
                                                                if (!val) updateKunjunganField('nmStatusPulang', '');
                                                            }}
                                                            // Saat opsi dipilih, isi nmStatusPulang otomatis dari label referensi
                                                            onSelect={(opt) => {
                                                                const label = typeof opt === 'string' ? opt : (opt?.label ?? '');
                                                                updateKunjunganField('nmStatusPulang', label);
                                                            }}
                                                            placeholder="Pilih Status Pulang"
                                                            searchPlaceholder="Cari status pulang…"
                                                            sourceParams={{ rawatInap: false }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Diagnosa Utama (kdDiag1)</label>
                                                        <SearchableSelect
                                                            source="diagnosa"
                                                            value={kunjunganPreview.kdDiag1 ?? ''}
                                                            onChange={(val) => {
                                                                updateKunjunganField('kdDiag1', val);
                                                                // Reset state jika diagnosa dihapus (value kosong)
                                                                if (!val || val === '') {
                                                                    setIsDiagnosaNonSpesialis(false);
                                                                    setKdTaccVisible(false);
                                                                    setTaccError('');
                                                                    updateKunjunganField('kdTacc', -1, 'int');
                                                                    updateKunjunganField('alasanTacc', '');
                                                                }
                                                            }}
                                                            onSelect={(opt) => {
                                                                // TACC wajib diisi bila diagnosa NonSpesialis = true
                                                                const isNonSpesialis = !!opt && typeof opt === 'object' && opt.nonSpesialis === true;
                                                                setIsDiagnosaNonSpesialis(isNonSpesialis);
                                                                setKdTaccVisible(!!isNonSpesialis);
                                                                setTaccError('');
                                                                if (isNonSpesialis) {
                                                                    // Reset kdTacc agar wajib diisi
                                                                    updateKunjunganField('kdTacc', '', 'int');
                                                                    updateKunjunganField('alasanTacc', '');
                                                                } else {
                                                                    // Diagnosa Spesialis (nonSpesialis = false): Default Tanpa TACC
                                                                    updateKunjunganField('kdTacc', -1, 'int');
                                                                    updateKunjunganField('alasanTacc', '');
                                                                }
                                                            }}
                                                            placeholder="Pilih Diagnosa Utama"
                                                            searchPlaceholder="Cari diagnosa (kode atau nama)…"
                                                            className=""
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Diagnosa 2 (kdDiag2)</label>
                                                        <SearchableSelect
                                                            source="diagnosa"
                                                            value={kunjunganPreview.kdDiag2 ?? ''}
                                                            onChange={(val) => updateKunjunganField('kdDiag2', val)}
                                                            placeholder="Pilih Diagnosa 2 (opsional)"
                                                            searchPlaceholder="Cari diagnosa (kode atau nama)…"
                                                            className=""
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Diagnosa 3 (kdDiag3)</label>
                                                        <SearchableSelect
                                                            source="diagnosa"
                                                            value={kunjunganPreview.kdDiag3 ?? ''}
                                                            onChange={(val) => updateKunjunganField('kdDiag3', val)}
                                                            placeholder="Pilih Diagnosa 3 (opsional)"
                                                            searchPlaceholder="Cari diagnosa (kode atau nama)…"
                                                            className=""
                                                        />
                                                    </div>
                                                </div>

                                                {/* 1 baris: Alergi Makan, Alergi Udara, Alergi Obat, KD Prognosa, KD Sadar */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Alergi Makan</label>
                                                        <SearchableSelect
                                                            source="alergi"
                                                            value={kunjunganPreview.alergiMakan ?? '00'}
                                                            onChange={(val) => updateKunjunganField('alergiMakan', val)}
                                                            placeholder="Pilih Alergi Makanan"
                                                            searchPlaceholder="Cari alergi (makanan)…"
                                                            sourceParams={{ jenis: '01' }}
                                                            defaultDisplay="Tidak Ada"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Alergi Udara</label>
                                                        <SearchableSelect
                                                            source="alergi"
                                                            value={kunjunganPreview.alergiUdara ?? '00'}
                                                            onChange={(val) => updateKunjunganField('alergiUdara', val)}
                                                            placeholder="Pilih Alergi Udara"
                                                            searchPlaceholder="Cari alergi (udara)…"
                                                            sourceParams={{ jenis: '02' }}
                                                            defaultDisplay="Tidak Ada"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">Alergi Obat</label>
                                                        <SearchableSelect
                                                            source="alergi"
                                                            value={kunjunganPreview.alergiObat ?? '00'}
                                                            onChange={(val) => updateKunjunganField('alergiObat', val)}
                                                            placeholder="Pilih Alergi Obat"
                                                            searchPlaceholder="Cari alergi (obat)…"
                                                            sourceParams={{ jenis: '03' }}
                                                            defaultDisplay="Tidak Ada"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">KD Prognosa</label>
                                                        <SearchableSelect
                                                            source="prognosa"
                                                            value={kunjunganPreview.kdPrognosa ?? '02'}
                                                            onChange={(val) => updateKunjunganField('kdPrognosa', val)}
                                                            placeholder="Pilih Prognosa"
                                                            searchPlaceholder="Cari prognosa…"
                                                            defaultDisplay="Bonam (Baik)"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1">KD Sadar</label>
                                                        <SearchableSelect
                                                            source="kesadaran"
                                                            value={kunjunganPreview.kdSadar ?? '01'}
                                                            onChange={(val) => updateKunjunganField('kdSadar', val)}
                                                            placeholder="Pilih Kesadaran"
                                                            searchPlaceholder="Cari kesadaran…"
                                                            defaultDisplay="Compos mentis"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Terapi Obat - tidak diminta satu baris, tetap terpisah */}
                                                <div>
                                                    <label className="block text-xs font-medium mb-1">Terapi Obat</label>
                                                <textarea value={kunjunganPreview.terapiObat ?? ''} onChange={(e) => updateKunjunganField('terapiObat', e.target.value)} rows={2} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm"></textarea>
                                            </div>
                                            {/* Bagian preview payload dihapus sesuai permintaan untuk membuat popup lebih ringkas */}
                                        </div>
                                    )}

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
                            </div>

                            {/* 3. Rujukan PCare */}
                            <div className={`border rounded-lg p-3 md:p-4 ${rujukanActive ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-700' : 'bg-gray-50 dark:bg-gray-700/20 border-gray-200 dark:border-gray-700'}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className={`text-sm font-semibold ${rujukanActive ? 'text-violet-800 dark:text-violet-300' : 'text-gray-700 dark:text-gray-300'}`}>Rujukan PCare</h4>
                                </div>
                                {!rujukanActive && (
                                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Kartu Rujukan akan terbuka otomatis saat memilih Status Pulang "Rujuk Vertikal" (kode 4).</div>
                                )}
                                {rujukanActive && (
                                    <div className="space-y-3 text-sm">
                                        {/* Baris 1: Tanggal Estimasi Rujuk, Spesialis, Sub Spesialis */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Tanggal Estimasi Rujuk</label>
                                                <input type="date" value={rujukForm.tglEstRujuk} onChange={(e) => setRujukForm((p) => ({ ...p, tglEstRujuk: e.target.value }))} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Spesialis</label>
                                                <SearchableSelect
                                                    options={spesialisOptions}
                                                    value={selectedSpesialis}
                                                    onChange={(val) => setSelectedSpesialis(val)}
                                                    placeholder="— Pilih Spesialis —"
                                                    searchPlaceholder="Cari spesialis…"
                                                    displayKey="label"
                                                    valueKey="value"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Sub Spesialis (kdSubSpesialis1)</label>
                                                <SearchableSelect
                                                    options={subSpesialisOptions}
                                                    value={rujukForm.kdSubSpesialis1}
                                                    onChange={(val) => setRujukForm((p) => ({ ...p, kdSubSpesialis1: val }))}
                                                    placeholder="— Pilih Sub Spesialis —"
                                                    searchPlaceholder="Cari sub spesialis…"
                                                    displayKey="label"
                                                    valueKey="value"
                                                />
                                            </div>
                                        </div>

                                        {/* Baris 2: Sarana 1 kolom dan PPK Rujukan 3 kolom (rasio 1:3) */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
                                            <div className="md:col-span-1">
                                                <label className="block text-xs font-medium mb-1">Sarana (kdSarana)</label>
                                                <SearchableSelect
                                                    options={saranaOptions}
                                                    value={rujukForm.kdSarana}
                                                    onChange={(val) => setRujukForm((p) => ({ ...p, kdSarana: val }))}
                                                    placeholder="— Pilih Sarana —"
                                                    searchPlaceholder="Cari sarana…"
                                                    displayKey="label"
                                                    valueKey="value"
                                                />
                                            </div>
                                            <div className="md:col-span-3">
                                                <label className="block text-xs font-medium mb-1">PPK Rujukan (kdppk)</label>
                                                <SearchableSelect
                                                    options={providerOptions}
                                                    value={rujukForm.kdppk}
                                                    onChange={(val) => setRujukForm((p) => ({ ...p, kdppk: val }))}
                                                    placeholder="— Pilih PPK Rujukan —"
                                                    searchPlaceholder="Cari PPK…"
                                                    displayKey="label"
                                                    valueKey="value"
                                                />
                                                {/* Detail PPK Rujukan lengkap: Jadwal per hari, Alamat, Telp, Jarak, Statistik */}
                                                {(() => {
                                                    const sel = providerOptions.find((o) => String(o.value) === String(rujukForm.kdppk));
                                                    const meta = sel?.meta || {};
                                                    if (!meta) return null;
                                                    const hasAny = meta.jadwal || meta.jadwalParsed || meta.alamat || meta.telp || meta.distance || meta.kapasitas || meta.persentase || meta.jmlRujuk;
                                                    if (!hasAny) return null;
                                                    const toKm = (d) => {
                                                        if (d === undefined || d === null || isNaN(Number(d))) return null;
                                                        const km = Number(d) / 1000;
                                                        return `${km.toFixed(2)} km`;
                                                    };
                                                    return (
                                                        <div className="mt-2 text-xs text-gray-700 dark:text-gray-300 space-y-1">
                                                            {/* Jadwal per-hari */}
                                                            {meta.jadwalParsed && Object.keys(meta.jadwalParsed).length > 0 ? (
                                                                <div>
                                                                    <div className="font-medium">Jadwal Praktek:</div>
                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2">
                                                                        {(meta.dayOrder || ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu']).map((d) => (
                                                                            meta.jadwalParsed[d] ? (
                                                                                <div key={d}>
                                                                                    <span className="font-medium">{d}:</span> {meta.jadwalParsed[d].join('; ')}
                                                                                </div>
                                                                            ) : null
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                meta.jadwal ? (
                                                                    <div><span className="font-medium">Jadwal Praktek:</span> {meta.jadwal}</div>
                                                                ) : null
                                                            )}
                                                            {/* Alamat & Telp */}
                                                            {(meta.alamat || meta.telp) && (
                                                                <div className="flex flex-wrap gap-x-2">
                                                                    {meta.alamat && (<span><span className="font-medium">Alamat:</span> {meta.alamat}</span>)}
                                                                    {meta.telp && (<span><span className="font-medium">Telp:</span> {meta.telp}</span>)}
                                                                </div>
                                                            )}
                                                            {/* Jarak */}
                                                            {meta.distance !== undefined && meta.distance !== null && (
                                                                <div><span className="font-medium">Jarak:</span> {toKm(meta.distance) || `${meta.distance}`}</div>
                                                            )}
                                                            {/* Statistik */}
                                                            {(meta.jmlRujuk !== undefined || meta.kapasitas !== undefined || meta.persentase !== undefined) && (
                                                                <div className="flex flex-wrap gap-x-3">
                                                                    {meta.jmlRujuk !== undefined && (<span><span className="font-medium">Jml Rujuk:</span> {meta.jmlRujuk}</span>)}
                                                                    {meta.kapasitas !== undefined && (<span><span className="font-medium">Kapasitas:</span> {meta.kapasitas}</span>)}
                                                                    {meta.persentase !== undefined && (<span><span className="font-medium">Persentase:</span> {meta.persentase}%</span>)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        </div>
                                        {/* KD TACC: default hidden, muncul otomatis dan wajib diisi bila diagnosa NonSpesialis dipilih */}
                                        {kdTaccVisible && (
                                            <div>
                                                <label className="block text-xs font-medium mb-1">
                                                    KD TACC <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={kunjunganPreview?.kdTacc ?? ''}
                                                    onChange={(e) => {
                                                        setTaccError('');
                                                        updateKunjunganField('kdTacc', e.target.value, 'int');
                                                    }}
                                                    placeholder="Isi KD TACC (1=Time, 2=Age, 3=Complication, 4=Comorbidity)"
                                                    className={`w-full rounded-md text-sm dark:bg-gray-800 dark:text-white ${taccError ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                                />
                                                {taccError && (
                                                    <div className="mt-1 text-xs text-red-600 dark:text-red-400">{taccError}</div>
                                                )}
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-xs font-medium mb-1">
                                                Alasan TACC {kdTaccVisible && <span className="text-red-500">*</span>}
                                            </label>
                                            {(() => {
                                                const selected = REF_TACC.find((x) => x.kdTacc === (kunjunganPreview?.kdTacc ?? -1));
                                                if (!selected || selected.kdTacc === -1) {
                                                    return (
                                                        <input
                                                            type="text"
                                                            value={kunjunganPreview?.alasanTacc ?? ''}
                                                            onChange={(e) => updateKunjunganField('alasanTacc', e.target.value)}
                                                            placeholder="Tanpa TACC (alasan kosong)"
                                                            disabled
                                                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm"
                                                        />
                                                    );
                                                }
                                                if (selected.kdTacc === 3) {
                                                    return (
                                                        <input
                                                            type="text"
                                                            value={kunjunganPreview?.alasanTacc ?? ''}
                                                            onChange={(e) => {
                                                                setTaccError('');
                                                                updateKunjunganField('alasanTacc', e.target.value);
                                                            }}
                                                            placeholder={`mis. ${kunjunganPreview?.kdDiag1 ? `${kunjunganPreview.kdDiag1} - NamaDiagnosa` : 'A09 - Diarrhoea and gastroenteritis of presumed infectious origin'}`}
                                                            className={`w-full rounded-md text-sm dark:bg-gray-800 dark:text-white ${taccError ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                                        />
                                                    );
                                                }
                                                return (
                                                    <SearchableSelect
                                                        options={(selected?.alasanTacc || []).map((a) => ({ label: a, value: a }))}
                                                        value={kunjunganPreview?.alasanTacc ?? ''}
                                                        onChange={(val) => {
                                                            setTaccError('');
                                                            updateKunjunganField('alasanTacc', val);
                                                        }}
                                                        placeholder="— Pilih Alasan —"
                                                        searchPlaceholder="Cari alasan…"
                                                        displayKey="label"
                                                        valueKey="value"
                                                    />
                                                );
                                            })()}
                                        </div>
                                        {/* Card payload rujukan dihilangkan agar UI lebih bersih dan profesional */}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between bg-white dark:bg-gray-800">
                            <div className="text-xs text-gray-500 dark:text-gray-400">Tutup popup ini untuk kembali ke form pemeriksaan.</div>
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={closeBridgingModal} className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md text-sm">Tutup</button>
                                <button type="button" onClick={sendKunjungan} disabled={sendingKunjungan || !kunjunganPreview} className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-4 py-2 rounded-md text-sm">Kirim Kunjungan{rujukanActive ? ' + Rujuk' : ''}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        <div className="relative z-20 pb-4 md:pb-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
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
                <>
                    <div className="flex items-center justify-between mb-4 px-4 sm:px-6 pt-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                            Riwayat CPPT/SOAP
                        </h4>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setViewMode('current')}
                                aria-pressed={viewMode === 'current'}
                                className={`text-sm px-3 py-1 rounded ${viewMode === 'current'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                                title="Tampilkan pemeriksaan untuk kunjungan ini"
                            >
                                Kunjungan ini
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('all')}
                                disabled={!noRkmMedis}
                                aria-pressed={viewMode === 'all'}
                                className={`text-sm px-3 py-1 rounded ${viewMode === 'all'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                                } ${!noRkmMedis ? 'opacity-50 cursor-not-allowed' : ''}`}
                                title="Tampilkan semua pemeriksaan berdasarkan no RM"
                            >
                                Semua record
                            </button>
                            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                {list.length} record
                            </span>
                        </div>
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
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg w-full">
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {list.map((row, idx) => (
                                    <div
                                        key={idx}
                                        className="px-4 sm:px-5 md:px-6 py-4 space-y-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div className="flex flex-wrap items-center gap-2 text-sm">
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {(() => {
                                                        const v = row.tgl_perawatan;
                                                        if (!v) return "-";
                                                        try {
                                                            const tz = getAppTimeZone();
                                                            const d = new Date(v);
                                                            if (isNaN(d.getTime())) return "-";
                                                            return d.toLocaleDateString("id-ID", {
                                                                timeZone: tz,
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            });
                                                        } catch (_) {
                                                            return "-";
                                                        }
                                                    })()}
                                                </span>
                                                <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-mono text-gray-800 dark:text-gray-100">
                                                    {row.jam_rawat ? String(row.jam_rawat).substring(0, 5) : "-"}
                                                </span>
                                                {viewMode === "all" && (
                                                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-[11px] text-indigo-700 dark:text-indigo-200">
                                                        {row.no_rawat || "-"}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-700 dark:text-gray-300">
                                            <div className="flex items-center justify-between rounded-md bg-gray-50 dark:bg-gray-900/40 px-3 py-2">
                                                <span className="text-gray-500 dark:text-gray-400">Suhu</span>
                                                <span className="font-medium">
                                                    {row.suhu_tubuh || "-"}°C
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-md bg-gray-50 dark:bg-gray-900/40 px-3 py-2">
                                                <span className="text-gray-500 dark:text-gray-400">Tensi</span>
                                                <span className="font-medium">
                                                    {row.tensi || "-"}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-md bg-gray-50 dark:bg-gray-900/40 px-3 py-2">
                                                <span className="text-gray-500 dark:text-gray-400">Nadi</span>
                                                <span className="font-medium">
                                                    {row.nadi || "-"}
                                                    {row.nadi ? "/min" : ""}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-md bg-gray-50 dark:bg-gray-900/40 px-3 py-2">
                                                <span className="text-gray-500 dark:text-gray-400">SpO₂</span>
                                                <span className="font-medium">
                                                    {row.spo2 || "-"}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700 dark:text-gray-300">
                                            <div>
                                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                    Keluhan
                                                </div>
                                                <div className="whitespace-pre-wrap break-words">
                                                    {row.keluhan || (
                                                        <span className="text-gray-400 italic">
                                                            Tidak ada keluhan
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                    Pemeriksaan
                                                </div>
                                                <div className="whitespace-pre-wrap break-words">
                                                    {row.pemeriksaan || (
                                                        <span className="text-gray-400 italic">
                                                            Belum diperiksa
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                    Penilaian
                                                </div>
                                                <div className="whitespace-pre-wrap break-words">
                                                    {row.penilaian || (
                                                        <span className="text-gray-400 italic">
                                                            Belum dinilai
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
                                            <div>
                                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                    Instruksi
                                                </div>
                                                <div className="whitespace-pre-wrap break-words">
                                                    {row.instruksi || (
                                                        <span className="text-gray-400 italic">
                                                            Tidak ada instruksi khusus
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                    Evaluasi
                                                </div>
                                                <div className="whitespace-pre-wrap break-words">
                                                    {row.evaluasi || (
                                                        <span className="text-gray-400 italic">
                                                            Belum ada evaluasi
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end gap-2 pt-1">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFormData({
                                                        tgl_perawatan: row.tgl_perawatan,
                                                        jam_rawat: String(row.jam_rawat).substring(0, 5),
                                                        suhu_tubuh: row.suhu_tubuh || "",
                                                        tensi: row.tensi || "",
                                                        nadi: row.nadi || "",
                                                        respirasi: row.respirasi || "",
                                                        tinggi: row.tinggi || "",
                                                        berat: row.berat || "",
                                                        spo2: row.spo2 || "",
                                                        gcs: row.gcs || "",
                                                        kesadaran: row.kesadaran || "Compos Mentis",
                                                        keluhan: row.keluhan || "",
                                                        pemeriksaan: row.pemeriksaan || "",
                                                        alergi: row.alergi || "",
                                                        lingkar_perut: row.lingkar_perut || "",
                                                        rtl: row.rtl || "",
                                                        penilaian: row.penilaian || "",
                                                        instruksi: row.instruksi || "",
                                                        evaluasi: row.evaluasi || "",
                                                        nip: row.nip || "",
                                                    });
                                                    setPegawaiQuery("");
                                                    setEditKey({
                                                        no_rawat: row.no_rawat,
                                                        tgl_perawatan: row.tgl_perawatan,
                                                        jam_rawat:
                                                            String(row.jam_rawat).length === 5
                                                                ? row.jam_rawat + ":00"
                                                                : row.jam_rawat,
                                                    });
                                                    setMessage(null);
                                                    setError(null);
                                                }}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50 transition-colors"
                                                title="Edit pemeriksaan"
                                            >
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    if (
                                                        !confirm(
                                                            "Yakin ingin menghapus pemeriksaan ini?\n\nData yang dihapus tidak dapat dikembalikan."
                                                        )
                                                    )
                                                        return;
                                                    try {
                                                        const url = route("rawat-jalan.pemeriksaan-ralan.delete");
                                                        const res = await fetch(url, {
                                                            method: "DELETE",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                                Accept: "application/json",
                                                                "X-Requested-With": "XMLHttpRequest",
                                                                "X-CSRF-TOKEN":
                                                                    document
                                                                        .querySelector('meta[name="csrf-token"]')
                                                                        .getAttribute("content"),
                                                            },
                                                            credentials: "same-origin",
                                                            body: JSON.stringify({
                                                                no_rawat: row.no_rawat,
                                                                tgl_perawatan: row.tgl_perawatan,
                                                                jam_rawat:
                                                                    String(row.jam_rawat).length === 5
                                                                        ? row.jam_rawat + ":00"
                                                                        : row.jam_rawat,
                                                            }),
                                                        });
                                                        const text = await res.text();
                                                        let json;
                                                        try {
                                                            json = text ? JSON.parse(text) : {};
                                                        } catch (_) {
                                                            json = {};
                                                        }
                                                        if (!res.ok) {
                                                            setError(json.message || "Gagal menghapus pemeriksaan");
                                                            setMessage(null);
                                                            return;
                                                        }
                                                        setError(null);
                                                        setMessage(json.message || "Pemeriksaan berhasil dihapus");
                                                        await fetchList();
                                                    } catch (e) {
                                                        setError(e.message || "Terjadi kesalahan saat menghapus");
                                                        setMessage(null);
                                                    }
                                                }}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
                                                title="Hapus pemeriksaan"
                                            >
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            </div>
        </div>
    );
}
