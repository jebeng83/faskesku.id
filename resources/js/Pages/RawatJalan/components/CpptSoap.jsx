import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import SearchableSelect from '../../../Components/SearchableSelect.jsx';
import DataAlergi from '../../../Alergi/DataAlergi.jsx';
import Modal from '@/Components/Modal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from 'recharts';
import { DWFKTP_TEMPLATES } from '../../../data/dwfktpTemplates.js';
import { todayDateString, nowDateTimeString, getAppTimeZone } from '@/tools/datetime';
import { Eraser, Activity, FileText, HelpCircle, Plus, Save, Calendar, Clock, User, MessageCircle, Stethoscope, Thermometer, Heart, Wind, Percent, Ruler, Scale, Brain, CircleDot, Pill } from 'lucide-react';
import toast from '@/tools/toast';
import { buildCopyFormData } from './cpptSoapCopy.js';

export default function CpptSoap({ token = '', noRkmMedis = '', noRawat = '', onOpenResep = null, onOpenDiagnosa = null, onOpenLab = null, onOpenBerkasDigital = null, appendToPlanning = null, onPlanningAppended = null, appendToAssessment = null, onAssessmentAppended = null, onPemeriksaChange = null }) {
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [list, setList] = useState([]);
    const [loadingList, setLoadingList] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [pcarePendaftaranError, setPcarePendaftaranError] = useState('');
    const [kunjunganPreviewError, setKunjunganPreviewError] = useState('');
    const [pegawaiMap, setPegawaiMap] = useState({});

    useEffect(() => {
        if (message) {
            toast.success(message);
            setMessage(null);
        }
    }, [message]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    const [pegawaiQuery, setPegawaiQuery] = useState('');
    const [kdAlergi, setKdAlergi] = useState('');
    const [alergiJenis, setAlergiJenis] = useState('');
    const [alergiModalOpen, setAlergiModalOpen] = useState(false);
    const [editKey, setEditKey] = useState(null); // { no_rawat, tgl_perawatan, jam_rawat }
    // Bridging PCare states
    const [showBridging, setShowBridging] = useState(false); // Default hidden, tampil saat pendaftaran berhasil
    const [bridgingOpen, setBridgingOpen] = useState(false); // kontrol popup modal
    const [pcarePendaftaran, setPcarePendaftaran] = useState(null);
    const [pcareRujukanSubspesialis, setPcareRujukanSubspesialis] = useState(null);
    const [isUnauthorized, setIsUnauthorized] = useState(false);
    // Status cetak rujukan: aktif setelah rujukan berhasil dikirim ke BPJS & lokal atau ada data di tabel
    const [rujukanBerhasil, setRujukanBerhasil] = useState(false);
    // Menyimpan nomor kunjungan terakhir (pengganti no rujukan bila belum tersedia)
    const [lastNoKunjungan, setLastNoKunjungan] = useState('');
    const [kunjunganSent, setKunjunganSent] = useState(false);
    const [rujukanActive, setRujukanActive] = useState(false); // checklist aktifkan kartu rujukan
    const [dbTemplateOptions, setDbTemplateOptions] = useState([]);
    const [selectedDbTemplate, setSelectedDbTemplate] = useState('');
    const [templateSaving, setTemplateSaving] = useState(false);
    const [templateError, setTemplateError] = useState(null);
    const [templateMessage, setTemplateMessage] = useState(null);
    const [showNmTemplateModal, setShowNmTemplateModal] = useState(false);
    const [nmTemplateInput, setNmTemplateInput] = useState('');

    const parseApiResponse = async (res) => {
        const text = await res.text();
        let json = null;
        if (text) {
            try {
                json = JSON.parse(text);
            } catch (_) {
                json = null;
            }
        }
        const contentType = res.headers.get('content-type') || '';
        const trimmed = text.trim();
        const isHtml = contentType.includes('text/html') || (trimmed.startsWith('<') && trimmed.includes('<html'));
        return { text, json, isHtml, contentType };
    };

    useEffect(() => {
        let active = true;
        const loadAlergiPasien = async () => {
            if (!noRkmMedis || editKey) return;
            try {
                let res = await fetch(`/api/alergi/pasien?no_rkm_medis=${encodeURIComponent(noRkmMedis)}`, {
                    headers: { Accept: 'application/json' },
                    credentials: 'same-origin',
                });
                if (res.status === 419) {
                    await fetch('/sanctum/csrf-cookie', { credentials: 'same-origin' }).catch(() => {});
                    res = await fetch(`/api/alergi/pasien?no_rkm_medis=${encodeURIComponent(noRkmMedis)}`, {
                        headers: { Accept: 'application/json' },
                        credentials: 'same-origin',
                    });
                }
                if (res.status === 401) {
                    throw new Error('Unauthenticated');
                }
                const js = await res.json();
                const list = Array.isArray(js?.data) ? js.data : [];
                if (!active) return;
                if (list.length > 0) {
                    const first = list[0];
                    setAlergiJenis(String(first.kode_jenis || ''));
                    setKdAlergi(first.kd_alergi || '');
                    setFormData((p) => ({ ...p, alergi: first.nm_alergi || '' }));
                } else {
                    setKdAlergi('');
                    setAlergiJenis('');
                    setFormData((p) => ({ ...p, alergi: '' }));
                }
            } catch (_) { }
        };
        loadAlergiPasien();
        return () => { active = false; };
    }, [noRkmMedis, editKey]);

    useEffect(() => {
        let active = true;
        const loadDbTemplates = async () => {
            try {
                const res = await fetch('/api/template-pemeriksaan-dokter/list', {
                    headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                    credentials: 'include',
                });
                const json = await res.json();
                const arr = Array.isArray(json?.data) ? json.data : (Array.isArray(json?.list) ? json.list : []);
                const opts = arr.map((it) => ({
                    value: it?.no_template || it?.id || '',
                    label: it?.nm_template || it?.penilaian || it?.keluhan || it?.no_template || '',
                }));
                if (active) setDbTemplateOptions(opts);
            } catch (_) {
                if (active) setDbTemplateOptions([]);
            }
        };
        loadDbTemplates();
        return () => { active = false; };
    }, []);

    const applyDbTemplate = async (key) => {
        setSelectedDbTemplate(key);
        if (!key) return;
        try {
            const url = `/api/template-pemeriksaan-dokter/item?no_template=${encodeURIComponent(key)}`;
            const res = await fetch(url, { headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'include' });
            const json = await res.json();
            const t = json?.data || json || {};
            setFormData((prev) => ({
                ...prev,
                suhu_tubuh: t.suhu || prev.suhu_tubuh || '',
                tensi: t.tensi || prev.tensi || '',
                nadi: t.nadi || prev.nadi || '',
                respirasi: t.respirasi || prev.respirasi || '',
                spo2: t.spo2 || prev.spo2 || '',
                gcs: t.gcs || prev.gcs || '',
                tinggi: t.tinggi || prev.tinggi || '',
                berat: t.berat || prev.berat || '',
                lingkar_perut: t.lingkar_perut || prev.lingkar_perut || '',
                keluhan: t.keluhan || prev.keluhan || '',
                pemeriksaan: t.pemeriksaan || prev.pemeriksaan || '',
                penilaian: t.penilaian || prev.penilaian || '',
                rtl: t.rencana || prev.rtl || '',
                instruksi: t.instruksi || prev.instruksi || '',
                evaluasi: t.evaluasi || prev.evaluasi || '',
            }));
        } catch (_) { }
    };

    const deriveNmTemplate = () => {
        const a = (formData?.penilaian && String(formData.penilaian).trim() !== '') ? String(formData.penilaian).trim() : '';
        const b = (!a && formData?.keluhan && String(formData.keluhan).trim() !== '') ? String(formData.keluhan).trim() : '';
        return a || b || 'Template Pemeriksaan';
    };

    const openNmTemplateModal = () => {
        setNmTemplateInput(deriveNmTemplate());
        setShowNmTemplateModal(true);
    };

    const confirmNmTemplateAndSave = async () => {
        setShowNmTemplateModal(false);
        await saveOrUpdateTemplate(nmTemplateInput);
    };

    const saveOrUpdateTemplate = async (nmOverride) => {
        try {
            setTemplateSaving(true);
            setTemplateError(null);
            setTemplateMessage(null);
            const creating = !selectedDbTemplate;
            const nmTemplate = (typeof nmOverride === 'string' && nmOverride.trim() !== '') ? nmOverride.trim() : deriveNmTemplate();
            const mainPayload = {
                no_template: selectedDbTemplate || undefined,
                keluhan: formData.keluhan || '',
                pemeriksaan: formData.pemeriksaan || '',
                penilaian: formData.penilaian || '',
                rencana: formData.rtl || '',
                instruksi: formData.instruksi || '',
                evaluasi: formData.evaluasi || '',
            };
            const detailPayload = {
                no_template: selectedDbTemplate || undefined,
                nm_template: nmTemplate,
                suhu_tubuh: formData.suhu_tubuh || '',
                tensi: formData.tensi || '',
                nadi: formData.nadi || '',
                respirasi: formData.respirasi || '',
                spo2: formData.spo2 || '',
                tinggi: formData.tinggi || '',
                berat: formData.berat || '',
                gcs: formData.gcs || '',
                lingkar_perut: formData.lingkar_perut || '',
            };
            try {
                await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
                await new Promise(resolve => setTimeout(resolve, 200));
            } catch (_) {}
            const mainRes = await axios({ method: creating ? 'POST' : 'PUT', url: '/api/template-pemeriksaan-dokter', data: mainPayload, withCredentials: true });
            const mainJson = mainRes?.data || {};
            const noTemplate = mainJson?.no_template || selectedDbTemplate;
            const detailRes = await axios({ method: creating ? 'POST' : 'PUT', url: '/api/template-pemeriksaan-dokter/detail', data: { ...detailPayload, no_template: noTemplate }, withCredentials: true });
            const detailJson = detailRes?.data || {};
            setSelectedDbTemplate(noTemplate);
            setTemplateMessage(detailJson?.message || mainJson?.message || (creating ? 'Template tersimpan' : 'Template diperbarui'));
            try {
                const res = await fetch('/api/template-pemeriksaan-dokter/list', { headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'include' });
                const json = await res.json();
                const arr = Array.isArray(json?.data) ? json.data : (Array.isArray(json?.list) ? json.list : []);
                const opts = arr.map((it) => ({ value: it?.no_template || it?.id || '', label: it?.nm_template || it?.penilaian || it?.keluhan || it?.no_template || '' }));
                setDbTemplateOptions(opts);
            } catch (_) {}
        } catch (e) {
            const msg = e?.response?.data?.message || e?.message || 'Gagal menyimpan template';
            setTemplateError(msg);
        } finally {
            setTemplateSaving(false);
        }
    };

    // State untuk Modal Keluar
    const [exitModalOpen, setExitModalOpen] = useState(false);
    const [exitLoading, setExitLoading] = useState(false);

    const handleExit = async (choice) => {
        setExitLoading(true);
        const newStatus = choice === 'ya' ? 'Sudah' : 'Belum';

        try {
            await axios.post(route('rawat-jalan.status.update'), {
                no_rawat: noRawat,
                stts: newStatus
            });
            // Redirect langsung tanpa alert
            window.location.href = route('rawat-jalan.index');
        } catch (e) {
            console.error(e);
            const json = e.response ? e.response.data : null;
            toast.error(json?.message || 'Gagal memperbarui status');
        } finally {
            setExitLoading(false);
            setExitModalOpen(false);
        }
    };

    const [kunjunganPreview, setKunjunganPreview] = useState(null); // payload preview kunjungan
    const [sendingKunjungan, setSendingKunjungan] = useState(false);
    const [kunjunganResult, setKunjunganResult] = useState(null); // hasil kirim kunjungan
    const [rujukForm, setRujukForm] = useState({ kdppk: '', tglEstRujuk: '', kdSubSpesialis1: '', kdSarana: '' });
    const [viewMode, setViewMode] = useState('current');
    const [showGrafikModal, setShowGrafikModal] = useState(false);

    // Konstanta rentang normal
    const NORMAL_RANGES = {
        sistole: { min: 90, max: 120, label: 'Normal Sistole', color: '#ef4444' },
        diastole: { min: 60, max: 80, label: 'Normal Diastole', color: '#3b82f6' },
        suhu: { min: 36.5, max: 37.5, label: 'Normal Suhu', color: '#f59e0b' },
        nadi: { min: 60, max: 100, label: 'Normal Nadi', color: '#10b981' },
        respirasi: { min: 12, max: 20, label: 'Normal Respirasi', color: '#8b5cf6' }
    };

    const grafikData = useMemo(() => {
        if (!list || list.length === 0) return [];
        // Sort by date ascending
        const sorted = [...list].sort((a, b) => {
            const dateA = new Date(`${a.tgl_perawatan}T${a.jam_rawat || '00:00'}`);
            const dateB = new Date(`${b.tgl_perawatan}T${b.jam_rawat || '00:00'}`);
            return dateA - dateB;
        });

        return sorted.map(item => {
            let sistole = null;
            let diastole = null;
            if (item.tensi && item.tensi.includes('/')) {
                const parts = item.tensi.split('/');
                sistole = parseInt(parts[0]);
                diastole = parseInt(parts[1]);
            }
            return {
                date: item.tgl_perawatan,
                datetime: `${item.tgl_perawatan} ${item.jam_rawat ? item.jam_rawat.substring(0, 5) : ''}`,
                suhu: parseFloat(item.suhu_tubuh) || null,
                nadi: parseFloat(item.nadi) || null,
                respirasi: parseFloat(item.respirasi) || null,
                spo2: parseFloat(item.spo2) || null,
                sistole,
                diastole
            };
        }).filter(item => item.suhu || item.nadi || item.respirasi || item.sistole || item.diastole);
    }, [list]);
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

    const editKunjungan = async () => {
        if (!kunjunganPreview) return;
        setSendingKunjungan(true);
        setKunjunganResult(null);
        setTaccError('');
        const payload = { ...kunjunganPreview };
        if (noRawat) {
            payload.no_rawat = noRawat;
        }
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
            const alasan = payload.alasanTacc;
            const alasanEmpty = alasan === undefined || alasan === null || String(alasan).trim() === '';
            if (alasanEmpty) {
                setTaccError('Alasan TACC wajib diisi saat KD TACC dipilih untuk diagnosa NonSpesialis.');
                setSendingKunjungan(false);
                return;
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
            const selectedSubSp = subSpesialisOptions.find(opt => String(opt.value) === String(rujukForm.kdSubSpesialis1));
            const nmSubSpesialis = selectedSubSp ? (selectedSubSp.label.split(' — ')[1] || selectedSubSp.label || '').trim() : '';
            let nmPPK = '';
            const selectedProvider = providerOptions.find(opt => String(opt.value) === String(rujukForm.kdppk));
            if (selectedProvider) {
                const labelParts = selectedProvider.label.split(' — ');
                nmPPK = (labelParts.length > 1 ? labelParts[1] : labelParts[0] || '').trim();
                if (!nmPPK && selectedProvider.meta?.nmppk) {
                    nmPPK = String(selectedProvider.meta.nmppk).trim();
                }
                if (!nmPPK && selectedProvider.meta?.nmProvider) {
                    nmPPK = String(selectedProvider.meta.nmProvider).trim();
                }
            }
            payload.rujukLanjut = {
                kdppk: rujukForm.kdppk,
                tglEstRujuk: fmtDate(rujukForm.tglEstRujuk) || null,
                subSpesialis: {
                    kdSubSpesialis1: rujukForm.kdSubSpesialis1 || null,
                    kdSarana: rujukForm.kdSarana || null,
                },
                khusus: null,
            };
            payload.nmSubSpesialis = nmSubSpesialis;
            payload.nmPPK = nmPPK;
        }
        const noKunjunganCandidate = (lastNoKunjungan && String(lastNoKunjungan)) || (pcareRujukanSubspesialis && pcareRujukanSubspesialis.noKunjungan && String(pcareRujukanSubspesialis.noKunjungan)) || (payload.noKunjungan && String(payload.noKunjungan)) || '';
        if (!noKunjunganCandidate) {
            setKunjunganResult({ success: false, message: 'NoKunjungan belum tersedia untuk edit.' });
            setSendingKunjungan(false);
            return;
        }
        payload.noKunjungan = noKunjunganCandidate;
        try {
            const res = await axios.put('/api/pcare/kunjungan', payload);
            const json = res.data;
            const msg = (json && json.metaData && json.metaData.message) ? json.metaData.message : 'OK';
            setKunjunganResult({ success: true, message: msg });
            setKunjunganSent(true);
        } catch (e) {
            const json = e.response ? e.response.data : null;
            const errMsg = (json && json.metaData && json.metaData.message) 
                ? json.metaData.message 
                : (e.message || 'Gagal edit Kunjungan');
            setKunjunganResult({ success: false, message: errMsg });
        } finally {
            setSendingKunjungan(false);
        }
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
            if (nip) {
                setFormData((prev) => ({ ...prev, nip }));
                if (typeof onPemeriksaChange === 'function') {
                    // Try to extract name from q if possible, format: "Name (NIK)"
                    let nama = '';
                    if (q) {
                        const match = q.match(/^(.*)\s\((.*)\)$/);
                        if (match) {
                            nama = match[1];
                        } else {
                            nama = q; // fallback
                        }
                    }
                    onPemeriksaChange({ id: nip, nama: nama });
                }
            }
        } catch (_) {}
    }, [onPemeriksaChange]);

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

    useEffect(() => {
        if (appendToAssessment && Array.isArray(appendToAssessment) && appendToAssessment.length > 0) {
            const utama = appendToAssessment.find(d => d.type === 'utama');
            const sekunder = appendToAssessment.filter(d => d.type === 'sekunder');
            
            let block = '';
            
            if (utama) {
                block += `Diagnosa Utama: [${utama.kode}] ${utama.nama}`;
            }
            
            if (sekunder.length > 0) {
                if (block) block += '\n';
                block += 'Diagnosa Sekunder:';
                sekunder.forEach((d, idx) => {
                    block += `\n${idx + 1}. [${d.kode}] ${d.nama}`;
                });
            }
            
            if (block) {
                setFormData((prev) => ({
                    ...prev,
                    penilaian: prev.penilaian ? `${prev.penilaian}\n\n${block}` : block,
                }));
            }
            
            if (typeof onAssessmentAppended === 'function') {
                try { onAssessmentAppended(); } catch (_) {}
            }
        }
    }, [appendToAssessment]);

    const clearTemplateFields = () => {
        setFormData((prev) => ({
            ...prev,
            suhu_tubuh: '',
            tensi: '',
            nadi: '',
            respirasi: '',
            spo2: '',
            tinggi: '',
            berat: '',
            gcs: '',
            kesadaran: 'Compos Mentis',
            lingkar_perut: '',
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
            const vitalKeys = ['suhu_tubuh', 'tensi', 'nadi', 'respirasi', 'spo2', 'tinggi', 'berat', 'gcs', 'lingkar_perut'];
            const textAreaKeys = ['keluhan', 'pemeriksaan', 'penilaian', 'rtl', 'instruksi', 'evaluasi'];
            const normalizedFormData = { ...formData };
            vitalKeys.forEach((key) => {
                const raw = normalizedFormData[key];
                const trimmed = (raw ?? '').toString().trim();
                if (trimmed === '') {
                    normalizedFormData[key] = 'N/A';
                }
            });
            textAreaKeys.forEach((key) => {
                const raw = normalizedFormData[key];
                const trimmed = (raw ?? '').toString().trim();
                if (trimmed === '') {
                    normalizedFormData[key] = '-';
                }
            });
            const kesadaranRaw = (normalizedFormData.kesadaran ?? '').toString().trim();
            if (kesadaranRaw === '' || kesadaranRaw.toLowerCase() === 'compos mentis') {
                normalizedFormData.kesadaran = 'Compos Mentis';
            }
            const jenisInt = alergiJenis ? parseInt(alergiJenis, 10) : null;
            const hasAlergiData = !!(noRkmMedis && kdAlergi && String(kdAlergi).trim() !== '' && String(kdAlergi).trim() !== '-' && jenisInt);
            const alergiPayload = hasAlergiData ? {
                no_rkm_medis: noRkmMedis,
                kode_jenis: jenisInt,
                kd_alergi: String(kdAlergi).trim(),
            } : null;
            const payload = creating
                ? { ...normalizedFormData, no_rawat: noRawat, t: token, ...(hasAlergiData && { alergi_pasien: alergiPayload }) }
                : { ...normalizedFormData, key: editKey, ...(hasAlergiData && { alergi_pasien: alergiPayload }) };
            const res = await axios({
                method: creating ? 'post' : 'put',
                url: url,
                data: payload
            });
            const json = res.data;
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
            setKdAlergi('');
            setAlergiJenis('');

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
                const pcareRes = await axios.post(pcareUrl, pcarePayload);
                const pcareJson = pcareRes.data;
                
                // Deteksi kasus "dilewati" dari backend (non-BPJS): skipped === true
                const skipped = !!(pcareJson && pcareJson.skipped);
                const alreadyRegistered = !!(pcareJson && pcareJson.already_registered);

                if (skipped) {
                    const skipMsg = (pcareJson && pcareJson.metaData && pcareJson.metaData.message)
                        ? pcareJson.metaData.message
                        : 'Pendaftaran PCare dilewati (Non-BPJS)';
                    // Jangan menampilkan pesan "Pendaftaran PCare terkirim" jika dilewati
                    setMessage((prev) => `${prev || ''} • ${skipMsg}`.trim());
                    
                    // Jika skipped karena sudah terdaftar, TETAP tampilkan bridging button
                    if (alreadyRegistered) {
                            setShowBridging(true);
                    } else {
                            // Tombol Bridging PCare tidak boleh muncul pada kasus non-BPJS (misal pasien umum)
                            setShowBridging(false);
                    }
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
            } catch (e) {
                const pcareJson = e.response ? e.response.data : null;
                const errMsg = (pcareJson && pcareJson.metaData && pcareJson.metaData.message) 
                     ? pcareJson.metaData.message 
                     : `Gagal pendaftaran PCare (${e.response ? e.response.status : (e.message || 'Error')})`;
                
                if (e.response) {
                     setError(errMsg);
                     setShowBridging(false);
                } else {
                     setError(`Gagal koneksi ke PCare: ${e.message || e}`);
                }
            }
        } catch (e) {
            const json = e.response ? e.response.data : null;
            const msg = (json && (json.message || (json.errors && Object.values(json.errors).flat().join(', ')))) || e.message || 'Terjadi kesalahan saat menyimpan';
            setError(msg);
            setMessage(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Bridging PCare helpers
    const openBridgingModal = async () => {
        setBridgingOpen(true);
        setKunjunganResult(null);
        setIsUnauthorized(false);
        setPcarePendaftaranError('');
        setKunjunganPreviewError('');
        // Secara default, buka Kunjungan dan muat preview
        try { await toggleKunjungan(true); } catch (_) {}
        // Ambil data pendaftaran dari tabel pcare_pendaftaran
        try {
            const params = new URLSearchParams({ no_rawat: noRawat });
            const res = await fetch(`/api/pcare/pendaftaran/rawat?${params.toString()}`, {
                headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                credentials: 'include',
            });
            const parsed = await parseApiResponse(res);
            if (parsed.isHtml) {
                setPcarePendaftaran(null);
                setPcarePendaftaranError(`Server mengembalikan HTML (${res.status}). Periksa sesi login dan routing /api di production.`);
                return;
            }
            if (res.status === 401) {
                setIsUnauthorized(true);
                setPcarePendaftaran(null);
                setPcarePendaftaranError('Tidak punya akses memuat pendaftaran PCare (401).');
            } else {
                setIsUnauthorized(false);
                const json = parsed.json || null;
                const data = json?.data || null;
                setPcarePendaftaran(data);
                if (!res.ok || json?.success === false || !json) {
                    const msg = json?.message || `Gagal memuat pendaftaran PCare (${res.status})`;
                    setPcarePendaftaranError(msg);
                } else if (!data) {
                    const msg = json?.message || 'Data pendaftaran belum tersedia.';
                    setPcarePendaftaranError(msg);
                } else {
                    setPcarePendaftaranError('');
                }
            }
        } catch (e) {
            setPcarePendaftaran(null);
            setPcarePendaftaranError(`Gagal memuat pendaftaran PCare: ${e.message || e}`);
        }
        // Ambil data rujukan subspesialis dari tabel pcare_rujuk_subspesialis
        try {
            const rujukRes = await fetch(`/api/pcare/rujuk-subspesialis/rawat/${encodeURIComponent(noRawat)}`, {
                headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                credentials: 'include',
            });
            if (rujukRes.status === 401) {
                setIsUnauthorized(true);
                setPcareRujukanSubspesialis(null);
                setRujukanBerhasil(false);
            } else {
                setIsUnauthorized(false);
                const rujukJson = await rujukRes.json();
                const rujukData = rujukJson.data || null;
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
            }
        } catch (_) {
            setPcareRujukanSubspesialis(null);
            setRujukanBerhasil(false);
        }
        // Muat referensi Poli & Dokter untuk menampilkan nama pada field KD Poli/Dokter
        try {
            const params = new URLSearchParams({ start: 0, limit: 200 });
            // Gunakan endpoint PCare yang benar: /api/pcare/poli
            const poRes = await fetch(`/api/pcare/poli?${params.toString()}`, {
                headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                credentials: 'include',
            });
            const poJson = await poRes.json();
            const poList = poJson?.response?.list || poJson?.list || poJson?.data || [];
            setPoliOptions(poList.map((row) => ({ value: row?.kdPoli || row?.kode || '', label: row?.nmPoli || row?.nama || '' })));
        } catch {
            setPoliOptions([]);
        }
        try {
            const params = new URLSearchParams({ start: 0, limit: 200 });
            // Gunakan endpoint PCare yang benar: /api/pcare/dokter
            const dkRes = await fetch(`/api/pcare/dokter?${params.toString()}`, {
                headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                credentials: 'include',
            });
            const dkJson = await dkRes.json();
            const dkList = dkJson?.response?.list || dkJson?.list || dkJson?.data || [];
            setDokterOptions(dkList.map((row) => ({ value: row?.kdDokter || row?.kdProvider || row?.kdDok || row?.kode || '', label: row?.nmDokter || row?.nmProvider || row?.nama || '' })));
        } catch {
            setDokterOptions([]);
        }
        // Muat referensi awal untuk Rujukan
        // Provider Rujukan akan dimuat dinamis berdasarkan SubSpesialis + Sarana + Tgl Estimasi Rujuk
        setProviderOptions([]);
        try {
            // Spesialis
            const spRes = await fetch(`/api/pcare/spesialis`, {
                headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                credentials: 'include',
            });
            const spJson = await spRes.json();
            const spList = spJson?.response?.list || [];
            setSpesialisOptions(spList.map((row) => ({ value: row.kdSpesialis, label: `${row.kdSpesialis || ''} — ${row.nmSpesialis || ''}` })));
        } catch {
            setSpesialisOptions([]);
        }
        try {
            // Sarana
            const saRes = await fetch(`/api/pcare/spesialis/sarana`, {
                headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                credentials: 'include',
            });
            const saJson = await saRes.json();
            const saList = saJson?.response?.list || [];
            setSaranaOptions(saList.map((row) => ({ value: row.kdSarana, label: `${row.kdSarana || ''} — ${row.nmSarana || ''}` })));

            // Auto-select '1' (REKAM MEDIK) as default, or fallback to '3' (Rumah Sakit)
            const defaultSarana = saList.find((r) => String(r.kdSarana) === '1') || saList.find((r) => String(r.kdSarana) === '3');
            if (defaultSarana) {
                setRujukForm((prev) => (prev.kdSarana ? prev : { ...prev, kdSarana: defaultSarana.kdSarana }));
            }
        } catch {
            setSaranaOptions([]);
        }
    };

    const closeBridgingModal = () => {
        setBridgingOpen(false);
        setIsUnauthorized(false);
        setRujukanActive(false);
        setKunjunganPreview(null);
        setKunjunganResult(null);
        setSelectedSpesialis('');
        setSubSpesialisOptions([]);
        setRujukForm({ kdppk: '', tglEstRujuk: '', kdSubSpesialis1: '', kdSarana: '' });
    };

    const toggleKunjungan = async (checked) => {
        setKunjunganResult(null);
        if (checked) {
            try {
                // Gunakan endpoint PCare yang benar: /api/pcare/kunjungan/preview
                const params = new URLSearchParams({ no_rawat: noRawat });
                const res = await fetch(`/api/pcare/kunjungan/preview?${params.toString()}`, {
                    headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                    credentials: 'include',
                });
                const parsed = await parseApiResponse(res);
                if (parsed.isHtml) {
                    setKunjunganPreview(null);
                    setKunjunganPreviewError(`Server mengembalikan HTML (${res.status}). Periksa sesi login dan routing /api di production.`);
                    return;
                }
                if (res.status === 401) {
                    setIsUnauthorized(true);
                    setKunjunganPreview(null);
                    setKunjunganPreviewError('Tidak punya akses memuat preview kunjungan (401).');
                    return;
                } else {
                    setIsUnauthorized(false);
                }
                const json = parsed.json || null;
                if (json && json.success) {
                    const payload = json.payload || {};
                    const kdSadar = '01';
                    const nmSadar = 'Compos mentis';
                    // Terapkan nilai default untuk bidang-bidang referensi PCare jika belum ada
                    const withDefaults = {
                        ...payload,
                        // Kesadaran
                        kdSadar,
                        nmSadar,
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
                    setKunjunganPreviewError('');
                } else {
                    setKunjunganPreview(null);
                    const msg = json?.message || `Gagal memuat preview kunjungan (${res.status})`;
                    setKunjunganPreviewError(msg);
                }
            } catch (e) {
                setKunjunganPreview(null);
                setKunjunganPreviewError(`Gagal memuat preview kunjungan: ${e.message || e}`);
            }
        } else {
            setKunjunganPreview(null);
            setKunjunganPreviewError('');
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
                const ssRes = await fetch(`/api/pcare/spesialis/subspesialis?${params.toString()}`, {
                    headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                    credentials: 'include',
                });
                const ssJson = await ssRes.json();
                const ssList = ssJson?.response?.list || [];
                setSubSpesialisOptions(ssList.map((row) => ({ value: row.kdSubSpesialis, label: `${row.kdSubSpesialis || ''} — ${row.nmSubSpesialis || ''}` })));
            } catch {
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
                const res = await fetch(url, {
                    headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                    credentials: 'include',
                });
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
            } catch {
                setProviderOptions([]);
            }
        };
        loadProviders();
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
            try { console.warn('[PCare] Payload akan dikirim', payload); } catch (_) {}
            const res = await axios.post('/api/pcare/kunjungan', payload, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });
            const json = res?.data || {};
            const msg = (json && json.response && json.response.message) ? json.response.message : 'CREATED';
            // Simpan informasi untuk cetak rujukan bila rujukan aktif
            const noKunj = extractNoKunjungan(json);
            setLastNoKunjungan(noKunj);
            setKunjunganSent(!!noKunj || (res.status >= 200 && res.status < 300));
            // Cek kembali data rujukan dari tabel setelah sukses kirim kunjungan
            if (payload.rujukLanjut && noRawat) {
                try {
                    const rujukRes = await fetch(`/api/pcare/rujuk-subspesialis/rawat/${encodeURIComponent(noRawat)}`, {
                        headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                        credentials: 'include',
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
                } catch {
                    // Jika error cek tabel, tetap set berdasarkan payload
            if (payload.rujukLanjut) {
                setRujukanBerhasil(true);
                    }
                }
            }
            setKunjunganResult({ success: true, message: msg });
        } catch (e) {
            const status = e?.response?.status;
            const json = e?.response?.data || {};
            const errMsg = json?.metaData?.message || json?.message || (status ? `Gagal kirim Kunjungan (${status})` : `Error: ${e.message || e}`);
            setKunjunganResult({ success: false, message: errMsg });
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
            const rows = json.data || [];
            setList(rows);
            const ids = Array.from(new Set(rows.map((r) => String(r?.nik || r?.nip || '')).filter((s) => !!s)));
            const missing = ids.filter((id) => !(id in pegawaiMap));
            if (missing.length) {
                missing.forEach(async (id) => {
                    try {
                        const resPeg = await fetch(`/pegawai/search?q=${encodeURIComponent(id)}`, { headers: { Accept: 'application/json' }, credentials: 'include' });
                        const jsPeg = await resPeg.json();
                        const listPeg = Array.isArray(jsPeg?.data) ? jsPeg.data : (Array.isArray(jsPeg?.list) ? jsPeg.list : []);
                        const found = listPeg.find((it) => String(it?.nik || '') === String(id));
                        const nama = found?.nama || '';
                        if (nama) {
                            setPegawaiMap((prev) => (id in prev ? prev : { ...prev, [id]: nama }));
                        }
                    } catch {
                    }
                });
            }
        } catch (e) {
            console.error('Gagal memuat pemeriksaan_ralan', e);
        } finally {
            setLoadingList(false);
        }
    };

    const fetchAllByNoRm = async (limit = 0) => {
        if (!noRkmMedis) return;
        setLoadingList(true);
        try {
            const base = route('rawat-jalan.riwayat');
            const res = await fetch(`${base}?no_rkm_medis=${encodeURIComponent(noRkmMedis)}`, { headers: { 'Accept': 'application/json' } });
            const json = await res.json();
            let regs = (Array.isArray(json.data) ? json.data : []).filter((r) => String(r?.stts || '').toLowerCase() !== 'batal');
            
            // Sort by latest registration first
            regs.sort((a, b) => new Date(b.tgl_registrasi || 0) - new Date(a.tgl_registrasi || 0));

            // Ambil lebih banyak data registrasi untuk memastikan kita mendapatkan data pemeriksaan yang cukup
            // (karena tidak semua registrasi memiliki data pemeriksaan/SOAP)
            if (limit > 0) {
                // Kita ambil buffer yang cukup besar (misal 50) untuk mencari 6 record valid
                regs = regs.slice(0, 50);
            }

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
            
            if (limit > 0) {
                setList(allRows.slice(0, limit));
            } else {
                setList(allRows);
            }

            const ids = Array.from(new Set(allRows.map((r) => String(r?.nik || r?.nip || '')).filter((s) => !!s)));
            const missing = ids.filter((id) => !(id in pegawaiMap));
            if (missing.length) {
                missing.forEach(async (id) => {
                    try {
                        const resPeg = await fetch(`/pegawai/search?q=${encodeURIComponent(id)}`, { headers: { Accept: 'application/json' }, credentials: 'include' });
                        const jsPeg = await resPeg.json();
                        const listPeg = Array.isArray(jsPeg?.data) ? jsPeg.data : (Array.isArray(jsPeg?.list) ? jsPeg.list : []);
                        const found = listPeg.find((it) => String(it?.nik || '') === String(id));
                        const nama = found?.nama || '';
                        if (nama) {
                            setPegawaiMap((prev) => (id in prev ? prev : { ...prev, [id]: nama }));
                        }
                    } catch {
                    }
                });
            }
        } catch (e) {
            console.error('Gagal memuat riwayat pemeriksaan pasien', e);
        } finally {
            setLoadingList(false);
        }
    };

    useEffect(() => {
        if (viewMode === 'current') {
            fetchList();
        } else if (viewMode === 'limit_6') {
            fetchAllByNoRm(6);
        } else {
            fetchAllByNoRm();
        }
    }, [noRawat, noRkmMedis, viewMode]);

    useEffect(() => {
        const checkPendaftaranStatus = async () => {
            if (!noRawat) {
                setShowBridging(false);
                return;
            }
            try {
                const params = new URLSearchParams({ no_rawat: noRawat });
                const res = await fetch(`/api/pcare/pendaftaran/rawat?${params.toString()}`, {
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    const json = await res.json();
                    const data = json.data || null;
                    const status = String(data?.status ?? '').trim().toLowerCase();
                    const hasNoUrut = String(data?.noUrut ?? '').trim() !== '';
                    const isSuccess = status === 'terkirim' || status === 'sent' || status === 'success' || status === 'sukses' || hasNoUrut;
                    setShowBridging(!!data && isSuccess);
                    if (data) {
                        setPcarePendaftaran(data);
                    }
                } else {
                    setShowBridging(false);
                }
            } catch {
                setShowBridging(false);
            }
        };
        checkPendaftaranStatus();
         
    }, [noRawat]);

    useEffect(() => {
        const checkKunjunganStatus = async () => {
            if (!noRawat) {
                setKunjunganSent(false);
                return;
            }
            try {
                const res = await fetch(`/api/pcare/kunjungan/nokunjungan/${encodeURIComponent(noRawat)}`, {
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    const json = await res.json();
                    const noKunjungan = String(json?.noKunjungan ?? '').trim();
                    if (noKunjungan) {
                        setLastNoKunjungan(noKunjungan);
                        setKunjunganSent(true);
                    } else {
                        setKunjunganSent(false);
                    }
                } else {
                    setKunjunganSent(false);
                }
            } catch {
                setKunjunganSent(false);
            }
        };
        checkKunjunganStatus();
    }, [noRawat]);

    useEffect(() => {
        const checkRujukanSubspesialis = async () => {
            if (!noRawat) { 
                setRujukanBerhasil(false); 
                setPcareRujukanSubspesialis(null);
                return; 
            }
            // Always check if noRawat exists, regardless of rujukanActive state
            // This ensures we display existing referral data as requested
            try {
                const url = `/api/pcare/rujuk-subspesialis/rawat/${encodeURIComponent(noRawat)}`;
                const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
                if (res.ok) {
                    const json = await res.json();
                    const data = json.data || null;
                    if (data) {
                        setRujukanBerhasil(true);
                        setPcareRujukanSubspesialis(data);
                        if (data.noKunjungan) { setLastNoKunjungan(data.noKunjungan); }
                    } else {
                        // Only clear if we are NOT in active referral mode (to avoid clearing form during entry)
                        // But here we are fetching from server. If server has no data, we should probably reflect that,
                        // unless we are currently creating one?
                        // If rujukanActive is true, we might be in the middle of creating one.
                        // But this fetch is by noRawat (existing data).
                        if (!rujukanActive) {
                            setRujukanBerhasil(false);
                            setPcareRujukanSubspesialis(null);
                        }
                    }
                } else {
                    if (!rujukanActive) {
                        setRujukanBerhasil(false);
                        setPcareRujukanSubspesialis(null);
                    }
                }
            } catch {
                if (!rujukanActive) {
                    setRujukanBerhasil(false);
                    setPcareRujukanSubspesialis(null);
                }
            }
        };
        checkRujukanSubspesialis();
    }, [noRawat, rujukanActive]);

    // Monitor perubahan state rujukanBerhasil untuk debugging
    useEffect(() => {
        console.warn('[CpptSoap] State changed: rujukanBerhasil =', rujukanBerhasil, ', pcareRujukanSubspesialis =', pcareRujukanSubspesialis ? 'exists' : 'null');
    }, [rujukanBerhasil, pcareRujukanSubspesialis]);

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden h-full flex flex-col">
                <div className="h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-500"></div>
                <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-700" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">CPPT / SOAP</h3>
                            <p className="text-sm text-gray-500 font-normal">Catatan Perkembangan Pasien</p>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <div>
                                <label htmlFor="tgl_perawatan" className="text-[10px] font-medium text-gray-500 mb-1 block">
                                    Tanggal
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-2 top-2 w-3.5 h-3.5 text-gray-400" />
                                    <input
                                        id="tgl_perawatan"
                                        type="date"
                                        name="tgl_perawatan"
                                        value={formData.tgl_perawatan}
                                        onChange={handleChange}
                                        className="text-xs h-8 pl-7 pr-2 rounded-md bg-white border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="jam_rawat" className="text-[10px] font-medium text-gray-500 mb-1 block">
                                    Jam
                                </label>
                                <div className="relative">
                                    <Clock className="absolute left-2 top-2 w-3.5 h-3.5 text-gray-400" />
                                    <input
                                        id="jam_rawat"
                                        type="time"
                                        name="jam_rawat"
                                        value={formData.jam_rawat}
                                        onChange={handleChange}
                                        className="text-xs h-8 pl-7 pr-2 rounded-md bg-white border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                    {/* Kolom Utama */}
                    <div className="order-2 md:order-1 space-y-2 min-w-0">
                        {/* Informasi Dasar */}
                        <div className="space-y-3 bg-gray-50/60 border border-gray-100 rounded-xl p-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5 w-24 shrink-0">
                                        <CircleDot className="w-3 h-3 text-amber-600" />
                                        Kesadaran
                                    </label>
                                    <select name="kesadaran" value={formData.kesadaran} onChange={handleChange} className="w-full text-xs h-8 px-2 rounded-md bg-white border border-gray-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors">
                                        {kesadaranOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5 w-24 shrink-0">
                                        <User className="w-3 h-3 text-blue-600" />
                                        Pemeriksa
                                    </label>
                                    <SearchableSelect
                                        source="pegawai"
                                        value={formData.nip}
                                        onChange={(val) => {
                                            setFormData((prev) => ({ ...prev, nip: val }));
                                        }}
                                        onSelect={(option) => {
                                            const val = option?.value;
                                            const label = option?.label || '';
                                            setPegawaiQuery(label);
                                            
                                            const labelParts = label.split('—');
                                            const nama = labelParts.length > 1 ? labelParts[1].trim() : label;
                                            
                                            if (typeof onPemeriksaChange === 'function' && val) {
                                                onPemeriksaChange({ id: val, nama });
                                            }
                                        }}
                                        placeholder="Ketik nama atau NIK pegawai..."
                                        searchPlaceholder="Cari pegawai..."
                                        defaultDisplay={pegawaiQuery || (formData.nip ? `${formData.nip}` : '')} 
                                        className="!h-8 !px-2 !py-0 !text-xs !rounded-md !shadow-none !bg-white !border-gray-200"
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5 w-24 shrink-0">
                                        <MessageCircle className="w-3 h-3 text-red-500" />
                                        Alergi
                                    </label>
                                    <div className="relative w-full">
                                        <SearchableSelect
                                            source="alergi_local"
                                            value={kdAlergi}
                                            onChange={(val) => { setKdAlergi(val); }}
                                            onSelect={(opt) => {
                                                const label = typeof opt === 'string' ? opt : (opt?.label ?? '');
                                                setFormData((prev) => ({ ...prev, alergi: label }));
                                                const jenis = typeof opt === 'object' ? (opt?.kode_jenis ?? null) : null;
                                                if (jenis != null) setAlergiJenis(String(jenis));
                                            }}
                                            placeholder="Pilih alergi..."
                                            searchPlaceholder="Cari alergi..."
                                            defaultDisplay={(formData.alergi || '').trim() !== '' ? formData.alergi : 'Tidak Ada'}
                                            className="!h-8 !px-2 !py-0 !text-xs !rounded-md !shadow-none !bg-white !border-gray-200"
                                            displayClassName={((formData.alergi || '').trim() !== '' && (formData.alergi || '').trim() !== '-') ? 'text-red-600' : 'text-gray-800'}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setAlergiModalOpen(true)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center p-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                                            aria-label="Tambah Data Alergi"
                                            title="Tambah Data Alergi"
                                        >
                                            <Plus className="w-3.5 h-3.5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5 w-24 shrink-0">
                                        <HelpCircle className="w-3 h-3 text-indigo-600" />
                                        Template
                                    </label>
                                    <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-2">
                                        <div className="w-full sm:w-40 md:w-40">
                                            <SearchableSelect
                                                options={templateOptions}
                                                value={selectedTemplate}
                                                onChange={(val) => { setSelectedTemplate(val); applyTemplate(val); }}
                                                placeholder="Pilih template..."
                                                searchPlaceholder="Cari diagnosa..."
                                                displayKey="label"
                                                valueKey="key"
                                                className="!h-8 !px-2 !py-0 !text-xs !rounded-md !shadow-none !bg-white !border-gray-200"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={clearTemplateFields}
                                            className="inline-flex items-center w-auto self-start sm:self-auto p-1.5 text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                                            aria-label="Bersihkan Form"
                                            title="Bersihkan"
                                        >
                                            <Eraser className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="w-full sm:w-44 md:w-44">
                                            <SearchableSelect
                                                options={dbTemplateOptions}
                                                value={selectedDbTemplate}
                                                onChange={(val) => { applyDbTemplate(val); }}
                                                placeholder="Template Manual"
                                                searchPlaceholder="Cari template..."
                                                displayKey="label"
                                                valueKey="value"
                                                className="!h-8 !px-2 !py-0 !text-xs !rounded-md !shadow-none !bg-white !border-gray-200"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={openNmTemplateModal}
                                            className="inline-flex items-center w-auto self-start sm:self-auto p-1.5 text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shrink-0"
                                            title="Simpan/Update Template"
                                            aria-label="Simpan/Update Template"
                                            disabled={templateSaving}
                                        >
                                            <Save className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-amber-50/80 border border-amber-100 rounded-xl p-3">
                                <label className="text-xs uppercase tracking-wide font-bold text-amber-700 flex items-center gap-2 mb-2">
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    Subjektif
                                </label>
                                <textarea
                                    name="keluhan"
                                    value={formData.keluhan}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Keluhan utama pasien..."
                                    className="w-full text-sm rounded-md border border-amber-200 bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors resize-none h-24"
                                />
                            </div>
                            <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-3">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <label className="text-xs uppercase tracking-wide font-bold text-emerald-700 flex items-center gap-2">
                                        <Stethoscope className="w-3.5 h-3.5" />
                                        Objektif
                                    </label>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            if (typeof onOpenBerkasDigital === 'function') {
                                                e.preventDefault();
                                                onOpenBerkasDigital();
                                            }
                                        }}
                                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50"
                                        title="Buka Berkas Digital"
                                    >
                                        <FileText className="w-3 h-3" />
                                        Berkas Digital
                                    </button>
                                </div>
                                <textarea
                                    name="pemeriksaan"
                                    value={formData.pemeriksaan}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Hasil pemeriksaan fisik..."
                                    className="w-full text-sm rounded-md border border-emerald-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors resize-none h-24"
                                />
                            </div>
                        </div>

                        <div className="bg-purple-50/80 border border-purple-100 rounded-xl p-3 space-y-2">
                            <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-purple-600" />
                                <span className="text-[10px] uppercase tracking-wide font-semibold text-purple-700">Tanda Vital</span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                                {[
                                    { label: 'Suhu', name: 'suhu_tubuh', unit: '°C', icon: Thermometer },
                                    { label: 'Tensi', name: 'tensi', unit: 'mmHg', icon: Heart },
                                    { label: 'Nadi', name: 'nadi', unit: '/menit', icon: Heart },
                                    { label: 'Respirasi', name: 'respirasi', unit: '/menit', icon: Wind },
                                    { label: 'SpO2', name: 'spo2', unit: '%', icon: Percent },
                                    { label: 'Tinggi', name: 'tinggi', unit: 'cm', icon: Ruler },
                                    { label: 'Berat', name: 'berat', unit: 'kg', icon: Scale },
                                    { label: 'GCS', name: 'gcs', unit: '', icon: Brain },
                                    { label: 'Lingkar Perut', name: 'lingkar_perut', unit: 'cm', icon: CircleDot }
                                ].map(({ label, name, unit, icon: Icon }) => (
                                    <div key={name} className="flex items-center gap-2">
                                        <label className="text-[10px] font-bold text-gray-700 flex items-center gap-1.5 w-24 shrink-0">
                                            <Icon className="w-3 h-3 text-purple-600" />
                                            {label} {unit ? `(${unit})` : ''}
                                        </label>
                                        <input
                                            type="text"
                                            name={name}
                                            value={formData[name]}
                                            onChange={handleChange}
                                            className="w-full text-xs h-8 px-2 rounded-md border border-gray-200 bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs uppercase tracking-wide font-bold text-blue-700 flex items-center gap-2">
                                        <HelpCircle className="w-3.5 h-3.5" />
                                        Assessment
                                    </label>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            if (typeof onOpenDiagnosa === 'function') {
                                                e.preventDefault();
                                                onOpenDiagnosa();
                                            }
                                        }}
                                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
                                        aria-label="Buka tab Diagnosa"
                                        title="Buka Diagnosa (ICD-10)"
                                    >
                                        ICD
                                    </button>
                                </div>
                                <textarea
                                    name="penilaian"
                                    value={formData.penilaian}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Penilaian klinis..."
                                    className="w-full text-sm rounded-md border border-blue-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none h-24"
                                />
                            </div>
                            <div className="bg-purple-50/80 border border-purple-100 rounded-xl p-3 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs uppercase tracking-wide font-bold text-purple-700 flex items-center gap-2">
                                        <Pill className="w-3.5 h-3.5" />
                                        Planning
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                if (typeof onOpenLab === 'function') {
                                                    e.preventDefault();
                                                    onOpenLab();
                                                }
                                            }}
                                            className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-white text-purple-700 border border-purple-200 hover:bg-purple-50 transition-colors"
                                            aria-label="Buka tab Laboratorium"
                                            title="Buka Permintaan Lab"
                                        >
                                            Laborat
                                        </button>
                                        <Link
                                            href={noRawat ? `/rawat-jalan/obat-ralan/${encodeURIComponent(noRawat)}` : '/farmasi/resep-obat'}
                                            onClick={(e) => {
                                                if (typeof onOpenResep === 'function') {
                                                    e.preventDefault();
                                                    onOpenResep();
                                                }
                                            }}
                                            className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
                                            aria-label="Buka tab Resep"
                                            title="Buka Resep Obat"
                                        >
                                            Resep
                                        </Link>
                                    </div>
                                </div>
                                <textarea
                                    name="rtl"
                                    value={formData.rtl}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Rencana tindak lanjut..."
                                    className="w-full text-sm rounded-md border border-purple-200 bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors resize-none h-24"
                                />
                            </div>
                            <div className="bg-teal-50/80 border border-teal-100 rounded-xl p-3 flex flex-col h-full">
                                <label className="text-[10px] uppercase tracking-wide font-semibold text-teal-700 flex items-center gap-2 mb-2">
                                    <CircleDot className="w-3.5 h-3.5" />
                                    Instruksi
                                </label>
                                <textarea
                                    name="instruksi"
                                    value={formData.instruksi}
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder="Instruksi medis..."
                                    className="w-full text-sm rounded-md border border-teal-200 bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors resize-none"
                                />
                            </div>
                            <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 flex flex-col h-full">
                                <label className="text-[10px] uppercase tracking-wide font-semibold text-slate-700 flex items-center gap-2 mb-2">
                                    <Activity className="w-3.5 h-3.5" />
                                    Evaluasi
                                </label>
                                <textarea
                                    name="evaluasi"
                                    value={formData.evaluasi}
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder="Evaluasi kunjungan..."
                                    className="w-full text-sm rounded-md border border-slate-200 bg-white focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-colors resize-none"
                                />
                            </div>
                        </div>


                    </div>

                    {/* Kolom kedua dihapus; konten template kini di dalam main form */}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 mt-2">
                    {editKey && (
                        <button
                            type="button"
                            onClick={() => { setEditKey(null); setMessage(null); setError(null); }}
                            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Batal
                        </button>
                    )}
                    <button type="submit" className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 transition-colors text-white font-semibold px-4 py-2 text-sm rounded-lg disabled:opacity-60 disabled:cursor-not-allowed" disabled={isSubmitting}>
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
                            disabled={kunjunganSent}
                            onClick={openBridgingModal}
                            className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 transition-colors text-white font-semibold px-4 py-2 text-sm rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
                            title="Kunjungan PCare"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 0h-1v4h-1m1-9h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Kunjungan PCare
                        </button>
                    )}
                    {/* Debug: Log state rujukanBerhasil saat render */}
                    {isUnauthorized && (
                        <div className="mt-2 flex items-center justify-between rounded-md border border-red-200 bg-red-50 p-2 text-xs text-red-700">
                            <span>Anda belum login. Silakan login untuk mengakses PCare.</span>
                            <a href="/login" className="inline-flex items-center rounded bg-red-600 px-2 py-1 text-white">Login</a>
                        </div>
                    )}
                    {/* Tombol Cetak Rujukan - tampil jika ada data di tabel pcare_rujuk_subspesialis */}
                    {(rujukanBerhasil && (lastNoKunjungan || (pcareRujukanSubspesialis && pcareRujukanSubspesialis.noKunjungan))) && (
                        <button
                            type="button"
                            onClick={async () => {
                                const hasRujukan = rujukanBerhasil && (lastNoKunjungan || (pcareRujukanSubspesialis && pcareRujukanSubspesialis.noKunjungan));
                                if (!hasRujukan) {
                                    toast.error('Data rujukan tidak tersedia.');
                                    return;
                                }
                                if (!noRawat) {
                                    toast.error('No rawat tidak tersedia.');
                                    return;
                                }
                                const encodedNoRawat = encodeURIComponent(noRawat).replace(/%2F/g, '/');
                                const url = `/pcare/cetak-rujukan/${encodedNoRawat}?norawat=${encodeURIComponent(noRawat)}`;
                                try {
                                    const res = await fetch(url, {
                                        method: 'GET',
                                        headers: { 'Accept': 'text/html', 'X-Requested-With': 'XMLHttpRequest' },
                                        credentials: 'include'
                                    });
                                    if (!res.ok) {
                                        toast.error('URL cetak rujukan tidak dapat diakses.');
                                        return;
                                    }
                                } catch {
                                    toast.error('URL cetak rujukan tidak dapat diakses.');
                                    return;
                                }
                                const win = window.open(url, '_blank', 'noopener,noreferrer');
                                if (!win) {
                                    toast.error('Popup diblokir. Izinkan popup untuk mencetak rujukan.');
                                    return;
                                }
                            }}
                            className="inline-flex items-center gap-2 border rounded px-2 py-1 text-xs w-full sm:w-auto justify-center bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200"
                            title="Rujuk PCare"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 9V2h12v7"></path>
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                <path d="M6 14h12v8H6z"></path>
                            </svg>
                            <span>Rujuk PCare</span>
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => setExitModalOpen(true)}
                        disabled={isSubmitting || exitLoading}
                        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold px-3 py-1.5 text-sm rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                        title="Keluar & Update Status"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Keluar
                    </button>
                </div>
                </div>
            </form>

            <Modal show={exitModalOpen} onClose={() => setExitModalOpen(false)} maxWidth="lg">
                <div className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <div className="p-6">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 sm:mx-0 sm:h-10 sm:w-10 shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-50 dark:ring-indigo-900/20">
                                <HelpCircle className="h-6 w-6 text-white" />
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">
                                    Konfirmasi Selesai
                                </h3>
                                <div className="mt-2">
                                    <p className="text-base text-gray-600 dark:text-gray-300">
                                        Apakah pelayanan pasien ini sudah selesai?
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 sm:mt-6 sm:flex sm:flex-row-reverse gap-3">
                            <button
                                type="button"
                                onClick={() => handleExit('ya')}
                                disabled={exitLoading}
                                className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 sm:w-auto disabled:opacity-50 transition-all transform hover:scale-[1.02]"
                            >
                                {exitLoading ? 'Memproses...' : 'Ya, Selesai'}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleExit('tidak')}
                                disabled={exitLoading}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 sm:mt-0 sm:w-auto disabled:opacity-50 transition-colors"
                            >
                                Belum
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>

            <DataAlergi open={alergiModalOpen} onClose={() => setAlergiModalOpen(false)} />

            <Modal show={showNmTemplateModal} onClose={() => setShowNmTemplateModal(false)} maxWidth="lg">
                <div className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <div className="p-6">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 sm:mx-0 sm:h-10 sm:w-10 shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-50 dark:ring-indigo-900/20">
                                <Save className="h-6 w-6 text-white" />
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">
                                    Simpan/Update Template
                                </h3>
                                <div className="mt-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Template</label>
                                    <input
                                        type="text"
                                        value={nmTemplateInput}
                                        onChange={(e) => setNmTemplateInput(e.target.value)}
                                        className="w-full text-sm h-9 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    />
                                    {templateError && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{templateError}</p>
                                    )}
                                    {templateMessage && (
                                        <p className="mt-2 text-sm text-green-600 dark:text-green-400">{templateMessage}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 sm:mt-6 sm:flex sm:flex-row-reverse gap-3">
                            <button
                                type="button"
                                onClick={confirmNmTemplateAndSave}
                                disabled={templateSaving}
                                className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 sm:w-auto disabled:opacity-50 transition-all transform hover:scale-[1.02]"
                            >
                                {templateSaving ? 'Menyimpan...' : 'Simpan'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowNmTemplateModal(false)}
                                disabled={templateSaving}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 sm:mt-0 sm:w-auto disabled:opacity-50 transition-colors"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>

            {bridgingOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
                    <div className="absolute inset-0 bg-black/50" onClick={closeBridgingModal}></div>
                    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full md:max-w-5xl mx-2 sm:mx-4 my-4 sm:my-8 flex flex-col max-h-[88vh] overflow-hidden">
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
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg overflow-hidden">
                                <div className="px-3 py-2 border-b border-indigo-100 dark:border-indigo-800 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    <h4 className="text-sm font-semibold text-indigo-800 dark:text-indigo-300">Pendaftaran PCare</h4>
                                </div>
                                <div className="p-2">
                                    {pcarePendaftaranError && (
                                        <div className="mb-2 text-[11px] px-2 py-1 rounded border border-amber-200 bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800">
                                            {pcarePendaftaranError}
                                        </div>
                                    )}
                                    {pcarePendaftaran ? (
                                        <div className="space-y-1">
                                            {/* Baris 1: Identitas */}
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-0.5">
                                                <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-800/50 pb-0">
                                                    <span className="text-[10px] text-gray-500 dark:text-gray-400">No Rawat</span>
                                                    <span className="text-[11px] font-medium text-gray-800 dark:text-gray-200">{pcarePendaftaran.no_rawat}</span>
                                                </div>
                                                <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-800/50 pb-0">
                                                    <span className="text-[10px] text-gray-500 dark:text-gray-400">No Kartu</span>
                                                    <span className="text-[11px] font-medium text-gray-800 dark:text-gray-200">{pcarePendaftaran.noKartu || pcarePendaftaran.no_kartu || '-'}</span>
                                                </div>
                                                <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-800/50 pb-0">
                                                    <span className="text-[10px] text-gray-500 dark:text-gray-400">Tgl Daftar</span>
                                                    <span className="text-[11px] font-medium text-gray-800 dark:text-gray-200">{pcarePendaftaran.tglDaftar || '-'}</span>
                                                </div>
                                                <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-800/50 pb-0">
                                                    <span className="text-[10px] text-gray-500 dark:text-gray-400">Kd Poli</span>
                                                    <span className="text-[11px] font-medium text-gray-800 dark:text-gray-200">{pcarePendaftaran.kdPoli || '-'}</span>
                                                </div>
                                            </div>

                                            {/* Baris 2: Vital Signs */}
                                            <div className="bg-white/50 dark:bg-gray-800/50 rounded-md p-1.5 border border-indigo-100 dark:border-indigo-800/50">
                                                <div className="flex items-center gap-1.5 mb-0.5 text-[10px] font-semibold text-indigo-700 dark:text-indigo-400">
                                                    <Activity className="w-3 h-3" />
                                                    Tanda Vital
                                                </div>
                                                <div className="overflow-hidden rounded border border-indigo-100 dark:border-indigo-800/50">
                                                    <table className="w-full text-left">
                                                        <thead className="bg-indigo-50/50 dark:bg-indigo-900/10 text-[9px] text-gray-500 uppercase tracking-wider">
                                                            <tr>
                                                                <th className="px-1.5 py-0.5 font-medium text-center border-r border-indigo-100 dark:border-indigo-800/50">Tekanan Darah</th>
                                                                <th className="px-1.5 py-0.5 font-medium text-center border-r border-indigo-100 dark:border-indigo-800/50">Resp</th>
                                                                <th className="px-1.5 py-0.5 font-medium text-center border-r border-indigo-100 dark:border-indigo-800/50">HR</th>
                                                                <th className="px-1.5 py-0.5 font-medium text-center border-r border-indigo-100 dark:border-indigo-800/50">BB</th>
                                                                <th className="px-1.5 py-0.5 font-medium text-center">TB</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white dark:bg-gray-800">
                                                            <tr className="divide-x divide-indigo-100 dark:divide-indigo-800/50">
                                                                <td className="px-1.5 py-0.5 text-center">
                                                                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                                                                        {(pcarePendaftaran.sistole || pcarePendaftaran.diastole) ? `${pcarePendaftaran.sistole || ''}/${pcarePendaftaran.diastole || ''}` : '-'}
                                                                    </span>
                                                                    <span className="text-[9px] text-gray-400 ml-0.5">mmHg</span>
                                                                </td>
                                                                <td className="px-1.5 py-0.5 text-center">
                                                                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                                                                        {pcarePendaftaran.respRate || '-'}
                                                                    </span>
                                                                    <span className="text-[9px] text-gray-400 ml-0.5">x/m</span>
                                                                </td>
                                                                <td className="px-1.5 py-0.5 text-center">
                                                                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                                                                        {pcarePendaftaran.heartRate || '-'}
                                                                    </span>
                                                                    <span className="text-[9px] text-gray-400 ml-0.5">bpm</span>
                                                                </td>
                                                                <td className="px-1.5 py-0.5 text-center">
                                                                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                                                                        {pcarePendaftaran.beratBadan || '-'}
                                                                    </span>
                                                                    <span className="text-[9px] text-gray-400 ml-0.5">kg</span>
                                                                </td>
                                                                <td className="px-1.5 py-0.5 text-center">
                                                                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                                                                        {pcarePendaftaran.tinggiBadan || '-'}
                                                                    </span>
                                                                    <span className="text-[9px] text-gray-400 ml-0.5">cm</span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            {/* Baris 3: Keluhan */}
                                            <div>
                                                <span className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-0.5">Keluhan Utama</span>
                                                <div className="bg-white dark:bg-gray-800 p-1.5 rounded border border-gray-200 dark:border-gray-700 text-[11px] text-gray-800 dark:text-gray-200 italic leading-snug">
                                                    "{pcarePendaftaran.keluhan || '-'}"
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                                            <FileText className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                            <p className="text-sm">Data pendaftaran belum tersedia.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 2. Kunjungan PCare */}
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Kunjungan PCare</h4>
                                </div>
                                <div className="space-y-2">
                                        {kunjunganPreviewError && (
                                            <div className="text-[11px] px-2 py-1 rounded border border-amber-200 bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800">
                                                {kunjunganPreviewError}
                                            </div>
                                        )}
                                        {/* Form Kunjungan PCare */}
                                        {kunjunganPreview && (
                                            <div className="space-y-4">
                                                {/* GROUP 1: ADMINISTRASI & DOKTER */}
                                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-md border border-emerald-200 dark:border-emerald-700">
                                                    <h5 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-3 uppercase tracking-wider border-b border-emerald-200 dark:border-emerald-700 pb-1 flex items-center gap-2">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .667.333 1 1 1v1m0-1h2" /></svg>
                                                        Administrasi & Dokter
                                                    </h5>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                                        <div>
                                                            <label className="block text-xs font-bold mb-0.5">No Kartu BPJS</label>
                                                            <input type="text" value={kunjunganPreview.noKartu || ''} onChange={(e) => updateKunjunganField('noKartu', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold mb-0.5">Tanggal Daftar</label>
                                                            <input type="date" value={toInputDate(kunjunganPreview.tglDaftar)} onChange={(e) => updateKunjunganField('tglDaftar', fromInputDate(e.target.value))} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold mb-0.5">KD Poli (PCare)</label>
                                                            <SearchableSelect
                                                                options={poliOptions}
                                                                value={kunjunganPreview.kdPoli ?? ''}
                                                                onChange={(val) => updateKunjunganField('kdPoli', val)}
                                                                placeholder="Pilih Poli"
                                                                className="text-xs"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold mb-0.5">KD Dokter (PCare)</label>
                                                            <SearchableSelect
                                                                options={dokterOptions}
                                                                value={kunjunganPreview.kdDokter ?? ''}
                                                                onChange={(val) => updateKunjunganField('kdDokter', val)}
                                                                placeholder="Pilih Dokter"
                                                                className="text-xs"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* GROUP 2: KLINIS & VITAL SIGNS */}
                                                <div className="bg-gray-50 dark:bg-gray-800/20 p-3 rounded-md border border-gray-100 dark:border-gray-700">
                                                    <h5 className="text-xs font-bold text-gray-800 dark:text-gray-300 mb-3 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-1 flex items-center gap-2">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                        Klinis & Tanda Vital
                                                    </h5>
                                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                                        <div className="lg:col-span-1 space-y-3">
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">Keluhan</label>
                                                                <textarea value={kunjunganPreview.keluhan || ''} onChange={(e) => updateKunjunganField('keluhan', e.target.value)} rows={3} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5"></textarea>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">Anamnesa</label>
                                                                <textarea value={kunjunganPreview.anamnesa || ''} onChange={(e) => updateKunjunganField('anamnesa', e.target.value)} rows={3} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5"></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3 content-start">
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">Sistole</label>
                                                                <div className="relative"><input type="number" value={kunjunganPreview.sistole ?? ''} onChange={(e) => updateKunjunganField('sistole', e.target.value, 'int')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5 pr-8" /><span className="absolute right-2 top-1.5 text-[10px] text-gray-400">mmHg</span></div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">Diastole</label>
                                                                <div className="relative"><input type="number" value={kunjunganPreview.diastole ?? ''} onChange={(e) => updateKunjunganField('diastole', e.target.value, 'int')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5 pr-8" /><span className="absolute right-2 top-1.5 text-[10px] text-gray-400">mmHg</span></div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">Berat (kg)</label>
                                                                <input type="number" step="0.1" value={kunjunganPreview.beratBadan ?? ''} onChange={(e) => updateKunjunganField('beratBadan', e.target.value, 'float')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5" />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">Tinggi (cm)</label>
                                                                <input type="number" step="0.1" value={kunjunganPreview.tinggiBadan ?? ''} onChange={(e) => updateKunjunganField('tinggiBadan', e.target.value, 'float')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5" />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">Resp Rate</label>
                                                                <div className="relative"><input type="number" value={kunjunganPreview.respRate ?? ''} onChange={(e) => updateKunjunganField('respRate', e.target.value, 'int')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5 pr-8" /><span className="absolute right-2 top-1.5 text-[10px] text-gray-400">x/m</span></div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">Heart Rate</label>
                                                                <div className="relative"><input type="number" value={kunjunganPreview.heartRate ?? ''} onChange={(e) => updateKunjunganField('heartRate', e.target.value, 'int')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5 pr-8" /><span className="absolute right-2 top-1.5 text-[10px] text-gray-400">x/m</span></div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">Lingkar Perut</label>
                                                                <div className="relative"><input type="number" step="0.1" value={kunjunganPreview.lingkarPerut ?? ''} onChange={(e) => updateKunjunganField('lingkarPerut', e.target.value, 'float')} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5 pr-8" /><span className="absolute right-2 top-1.5 text-[10px] text-gray-400">cm</span></div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">Suhu</label>
                                                                <div className="relative"><input type="text" value={kunjunganPreview.suhu ?? ''} onChange={(e) => updateKunjunganField('suhu', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5 pr-6" /><span className="absolute right-2 top-1.5 text-[10px] text-gray-400">°C</span></div>
                                                            </div>
                                                            <div className="col-span-2">
                                                                <label className="block text-xs font-bold mb-0.5">KD Prognosa</label>
                                                                <SearchableSelect
                                                                    source="prognosa"
                                                                    value={kunjunganPreview.kdPrognosa ?? '02'}
                                                                    onChange={(val) => {
                                                                        updateKunjunganField('kdPrognosa', val);
                                                                        if (!val) updateKunjunganField('nmPrognosa', '');
                                                                    }}
                                                                    onSelect={(opt) => {
                                                                        const label = typeof opt === 'string' ? opt : (opt?.label ?? '');
                                                                        updateKunjunganField('nmPrognosa', label);
                                                                    }}
                                                                    placeholder="Pilih Prognosa"
                                                                    searchPlaceholder="Cari prognosa…"
                                                                    defaultDisplay="Bonam (Baik)"
                                                                    className="text-xs"
                                                                />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <label className="block text-xs font-bold mb-0.5">KD Sadar</label>
                                                                <SearchableSelect
                                                                    source="kesadaran"
                                                                    value={kunjunganPreview.kdSadar ?? '01'}
                                                                    onChange={(val) => {
                                                                        updateKunjunganField('kdSadar', val);
                                                                        if (!val) updateKunjunganField('nmSadar', '');
                                                                    }}
                                                                    onSelect={(opt) => {
                                                                        const label = typeof opt === 'string' ? opt : (opt?.label ?? '');
                                                                        updateKunjunganField('nmSadar', label);
                                                                    }}
                                                                    placeholder="Pilih Kesadaran"
                                                                    searchPlaceholder="Cari kesadaran…"
                                                                    defaultDisplay="Compos mentis"
                                                                    className="text-xs"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* GROUP 3: DIAGNOSA & TERAPI */}
                                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-md border border-emerald-100 dark:border-emerald-800">
                                                    <h5 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-3 uppercase tracking-wider border-b border-emerald-200 dark:border-emerald-800 pb-1 flex items-center gap-2">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                                        Diagnosa & Terapi
                                                    </h5>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                                                        <div>
                                                            <label className="block text-xs font-bold mb-0.5">Diagnosa Utama (kdDiag1)</label>
                                                            <SearchableSelect
                                                                source="diagnosa"
                                                                value={kunjunganPreview.kdDiag1 ?? ''}
                                                                onChange={(val) => {
                                                                    updateKunjunganField('kdDiag1', val);
                                                                    if (!val || val === '') {
                                                                        setIsDiagnosaNonSpesialis(false);
                                                                        setKdTaccVisible(false);
                                                                        setTaccError('');
                                                                        updateKunjunganField('kdTacc', -1, 'int');
                                                                        updateKunjunganField('alasanTacc', '');
                                                                    }
                                                                }}
                                                                onSelect={(opt) => {
                                                                    const isNonSpesialis = !!opt && typeof opt === 'object' && opt.nonSpesialis === true;
                                                                    setIsDiagnosaNonSpesialis(isNonSpesialis);
                                                                    setKdTaccVisible(!!isNonSpesialis);
                                                                    setTaccError('');
                                                                    if (isNonSpesialis) {
                                                                        updateKunjunganField('kdTacc', '', 'int');
                                                                        updateKunjunganField('alasanTacc', '');
                                                                    } else {
                                                                        updateKunjunganField('kdTacc', -1, 'int');
                                                                        updateKunjunganField('alasanTacc', '');
                                                                    }
                                                                }}
                                                                placeholder="Pilih Diagnosa Utama"
                                                                searchPlaceholder="Cari diagnosa..."
                                                                className="text-xs"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold mb-0.5">Diagnosa 2 (kdDiag2)</label>
                                                            <SearchableSelect
                                                                source="diagnosa"
                                                                value={kunjunganPreview.kdDiag2 ?? ''}
                                                                onChange={(val) => updateKunjunganField('kdDiag2', val)}
                                                                placeholder="Pilih Diagnosa 2 (opsional)"
                                                                searchPlaceholder="Cari diagnosa..."
                                                                className="text-xs"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold mb-0.5">Diagnosa 3 (kdDiag3)</label>
                                                            <SearchableSelect
                                                                source="diagnosa"
                                                                value={kunjunganPreview.kdDiag3 ?? ''}
                                                                onChange={(val) => updateKunjunganField('kdDiag3', val)}
                                                                placeholder="Pilih Diagnosa 3 (opsional)"
                                                                searchPlaceholder="Cari diagnosa..."
                                                                className="text-xs"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-xs font-bold mb-0.5">Terapi Obat</label>
                                                            <textarea value={kunjunganPreview.terapiObat ?? ''} onChange={(e) => updateKunjunganField('terapiObat', e.target.value)} rows={3} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5"></textarea>
                                                        </div>
                                                        <div className="space-y-3">
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">Terapi Non Obat</label>
                                                                <input type="text" value={kunjunganPreview.terapiNonObat ?? ''} onChange={(e) => updateKunjunganField('terapiNonObat', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5" />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">BMHP</label>
                                                                <input type="text" value={kunjunganPreview.bmhp ?? ''} onChange={(e) => updateKunjunganField('bmhp', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* GROUP 4: DATA TAMBAHAN & KEPULANGAN */}
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                    {/* Alergi */}
                                                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md border border-amber-100 dark:border-amber-800">
                                                        <h5 className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-3 uppercase tracking-wider border-b border-amber-200 dark:border-amber-800 pb-1 flex items-center gap-2">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                            Riwayat Alergi
                                                        </h5>
                                                        <div className="space-y-3">
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">Alergi Makan</label>
                                                                <SearchableSelect
                                                                    source="alergi"
                                                                    value={kunjunganPreview.alergiMakan ?? '00'}
                                                                    onChange={(val) => {
                                                                        updateKunjunganField('alergiMakan', val);
                                                                        if (!val) updateKunjunganField('nmAlergiMakanan', '');
                                                                    }}
                                                                    onSelect={(opt) => {
                                                                        const label = typeof opt === 'string' ? opt : (opt?.label ?? '');
                                                                        updateKunjunganField('nmAlergiMakanan', label);
                                                                    }}
                                                                    placeholder="Pilih Alergi Makanan"
                                                                    searchPlaceholder="Cari alergi..."
                                                                    sourceParams={{ jenis: '01' }}
                                                                    defaultDisplay="Tidak Ada"
                                                                    className="text-xs"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">Alergi Udara</label>
                                                                <SearchableSelect
                                                                    source="alergi"
                                                                    value={kunjunganPreview.alergiUdara ?? '00'}
                                                                    onChange={(val) => {
                                                                        updateKunjunganField('alergiUdara', val);
                                                                        if (!val) updateKunjunganField('nmAlergiUdara', '');
                                                                    }}
                                                                    onSelect={(opt) => {
                                                                        const label = typeof opt === 'string' ? opt : (opt?.label ?? '');
                                                                        updateKunjunganField('nmAlergiUdara', label);
                                                                    }}
                                                                    placeholder="Pilih Alergi Udara"
                                                                    searchPlaceholder="Cari alergi..."
                                                                    sourceParams={{ jenis: '02' }}
                                                                    defaultDisplay="Tidak Ada"
                                                                    className="text-xs"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">Alergi Obat</label>
                                                                <SearchableSelect
                                                                    source="alergi"
                                                                    value={kunjunganPreview.alergiObat ?? '00'}
                                                                    onChange={(val) => {
                                                                        updateKunjunganField('alergiObat', val);
                                                                        if (!val) updateKunjunganField('nmAlergiObat', '');
                                                                    }}
                                                                    onSelect={(opt) => {
                                                                        const label = typeof opt === 'string' ? opt : (opt?.label ?? '');
                                                                        updateKunjunganField('nmAlergiObat', label);
                                                                    }}
                                                                    placeholder="Pilih Alergi Obat"
                                                                    searchPlaceholder="Cari alergi..."
                                                                    sourceParams={{ jenis: '03' }}
                                                                    defaultDisplay="Tidak Ada"
                                                                    className="text-xs"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Kepulangan */}
                                                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md border border-purple-100 dark:border-purple-800">
                                                        <h5 className="text-xs font-bold text-purple-800 dark:text-purple-300 mb-3 uppercase tracking-wider border-b border-purple-200 dark:border-purple-800 pb-1 flex items-center gap-2">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                                            Status Pulang
                                                        </h5>
                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                                <div>
                                                                    <label className="block text-xs font-bold mb-0.5">Tanggal Pulang</label>
                                                                    <input type="date" value={toInputDate(kunjunganPreview.tglPulang)} onChange={(e) => updateKunjunganField('tglPulang', fromInputDate(e.target.value))} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5" />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-bold mb-0.5">Status Pulang</label>
                                                                    <SearchableSelect
                                                                        source="statuspulang"
                                                                        value={kunjunganPreview.kdStatusPulang ?? ''}
                                                                        onChange={(val) => {
                                                                            updateKunjunganField('kdStatusPulang', val);
                                                                            if (!val) updateKunjunganField('nmStatusPulang', '');
                                                                        }}
                                                                        onSelect={(opt) => {
                                                                            const label = typeof opt === 'string' ? opt : (opt?.label ?? '');
                                                                            updateKunjunganField('nmStatusPulang', label);
                                                                        }}
                                                                        placeholder="Pilih Status Pulang"
                                                                        searchPlaceholder="Cari status..."
                                                                        sourceParams={{ rawatInap: false }}
                                                                        className="text-xs"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold mb-0.5">Poli Rujuk Internal</label>
                                                                <input type="text" value={kunjunganPreview.kdPoliRujukInternal ?? ''} onChange={(e) => updateKunjunganField('kdPoliRujukInternal', e.target.value)} placeholder="Kode Poli Rujuk Internal (jika ada)" className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                            </div>

                            {/* 3. Rujukan PCare */}
                            <div className={`border rounded-lg p-3 md:p-4 ${rujukanActive ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-700' : 'bg-gray-50 dark:bg-gray-700/20 border-gray-200 dark:border-gray-700'}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className={`text-sm font-semibold ${rujukanActive ? 'text-violet-800 dark:text-violet-300' : 'text-gray-700 dark:text-gray-300'}`}>Rujukan PCare</h4>
                                </div>
                                {!rujukanActive && (!pcareRujukanSubspesialis || !pcareRujukanSubspesialis.noKunjungan) && (
                                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Kartu Rujukan akan terbuka otomatis saat memilih Status Pulang "Rujuk Vertikal" (kode 4).</div>
                                )}
                                {!rujukanActive && pcareRujukanSubspesialis && pcareRujukanSubspesialis.noKunjungan && (
                                    <div className="space-y-3 text-sm">
                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-100 dark:border-blue-800">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="font-semibold text-blue-800 dark:text-blue-300">Data Rujukan Tersimpan</div>
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200">{pcareRujukanSubspesialis.noKunjungan}</span>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                                                <div>
                                                    <div className="text-xs text-gray-500">Tanggal Estimasi</div>
                                                    <div className="font-medium text-gray-800 dark:text-gray-200">{pcareRujukanSubspesialis.tglEstRujuk || '-'}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500">PPK Rujukan</div>
                                                    <div className="font-medium text-gray-800 dark:text-gray-200">{pcareRujukanSubspesialis.nmPPK || pcareRujukanSubspesialis.kdppk || '-'}</div>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <div className="text-xs text-gray-500">Sub Spesialis</div>
                                                    <div className="font-medium text-gray-800 dark:text-gray-200">{pcareRujukanSubspesialis.nmSubSpesialis || pcareRujukanSubspesialis.kdSubSpesialis1 || '-'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {rujukanActive && (
                                    <div className="space-y-3 text-sm">
                                        {/* Baris 1: Tanggal Estimasi Rujuk, Spesialis, Sub Spesialis */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                            <div>
                                                <label className="block text-xs font-bold mb-0.5">Tanggal Estimasi Rujuk</label>
                                                <input type="date" value={rujukForm.tglEstRujuk} onChange={(e) => setRujukForm((p) => ({ ...p, tglEstRujuk: e.target.value }))} className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-xs py-1.5" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold mb-0.5">Spesialis</label>
                                                <SearchableSelect
                                                    options={spesialisOptions}
                                                    value={selectedSpesialis}
                                                    onChange={(val) => setSelectedSpesialis(val)}
                                                    placeholder="— Pilih Spesialis —"
                                                    searchPlaceholder="Cari spesialis…"
                                                    displayKey="label"
                                                    valueKey="value"
                                                    className="text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold mb-0.5">Sub Spesialis (kdSubSpesialis1)</label>
                                                <SearchableSelect
                                                    options={subSpesialisOptions}
                                                    value={rujukForm.kdSubSpesialis1}
                                                    onChange={(val) => setRujukForm((p) => ({ ...p, kdSubSpesialis1: val }))}
                                                    placeholder="— Pilih Sub Spesialis —"
                                                    searchPlaceholder="Cari sub spesialis…"
                                                    displayKey="label"
                                                    valueKey="value"
                                                    className="text-xs"
                                                />
                                            </div>
                                        </div>

                                        {/* Baris 2: Sarana 1 kolom dan PPK Rujukan 3 kolom (rasio 1:3) */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
                                            <div className="md:col-span-1">
                                                <label className="block text-xs font-bold mb-0.5">Sarana (kdSarana)</label>
                                                <SearchableSelect
                                                    options={saranaOptions}
                                                    value={rujukForm.kdSarana}
                                                    onChange={(val) => setRujukForm((p) => ({ ...p, kdSarana: val }))}
                                                    placeholder="— Pilih Sarana —"
                                                    searchPlaceholder="Cari sarana…"
                                                    displayKey="label"
                                                    valueKey="value"
                                                    className="text-xs"
                                                />
                                            </div>
                                            <div className="md:col-span-3">
                                                <label className="block text-xs font-bold mb-0.5">PPK Rujukan (kdppk)</label>
                                                <SearchableSelect
                                                    options={providerOptions}
                                                    value={rujukForm.kdppk}
                                                    onChange={(val) => setRujukForm((p) => ({ ...p, kdppk: val }))}
                                                    placeholder="— Pilih PPK Rujukan —"
                                                    searchPlaceholder="Cari PPK…"
                                                    displayKey="label"
                                                    valueKey="value"
                                                    className="text-xs"
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
                            {kunjunganResult ? (
                                <div className={`text-sm px-3 py-2 rounded border ${kunjunganResult.success ? 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800' : 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'}`}>
                                    {kunjunganResult.success ? (
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                            Kunjungan berhasil dikirim ke PCare ({kunjunganResult.message})
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            Gagal: {kunjunganResult.message}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div />
                            )}
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={sendKunjungan} disabled={sendingKunjungan || !kunjunganPreview} className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-4 py-2 rounded-md text-sm">Kirim Kunjungan{rujukanActive ? ' + Rujuk' : ''}</button>
                                <button type="button" onClick={editKunjungan} disabled={sendingKunjungan || !kunjunganPreview || !(lastNoKunjungan || (pcareRujukanSubspesialis && pcareRujukanSubspesialis.noKunjungan) || (kunjunganPreview && kunjunganPreview.noKunjungan))} className="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-4 py-2 rounded-md text-sm">Edit Kunjungan</button>
                                <button type="button" onClick={closeBridgingModal} className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 text-white px-4 py-2 rounded-md text-sm">Tutup</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="relative z-20 pb-4 md:pb-6 px-3 md:px-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <>
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                            Riwayat Pemeriksaan
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
                                onClick={() => setViewMode('limit_6')}
                                disabled={!noRkmMedis}
                                aria-pressed={viewMode === 'limit_6'}
                                className={`text-sm px-3 py-1 rounded ${viewMode === 'limit_6'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                                } ${!noRkmMedis ? 'opacity-50 cursor-not-allowed' : ''}`}
                                title="Tampilkan 6 pemeriksaan terakhir"
                            >
                                6 record
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
                            <button
                                type="button"
                                onClick={() => setShowGrafikModal(true)}
                                disabled={!noRkmMedis}
                                className={`text-sm px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 ${!noRkmMedis ? 'opacity-50 cursor-not-allowed' : ''}`}
                                title="Tampilkan grafik vital sign"
                            >
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                                    Grafik
                                </div>
                            </button>
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
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden w-full">
                            <div className="overflow-x-auto w-full max-w-full">
                                <table className="w-full text-sm table-fixed">
                                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                                        <tr className="text-left text-gray-600 dark:text-gray-300">
                                            <th className="px-4 py-3 font-medium w-40">Tanggal / Jam</th>
                                            <th className="px-4 py-3 font-medium w-40">S</th>
                                            <th className="px-4 py-3 font-medium w-52">O</th>
                                            <th className="px-4 py-3 font-medium w-40">A</th>
                                            <th className="px-4 py-3 font-medium w-52">P</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {list.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                <td className="px-4 py-3 text-gray-900 dark:text-white w-40 align-top">
                                                    <div className="flex items-start justify-between gap-2 text-xs">
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">
                                                                {(() => {
                                                                    const v = row.tgl_perawatan;
                                                                    if (!v) return '-';
                                                                    try {
                                                                        const tz = getAppTimeZone();
                                                                        const d = new Date(v);
                                                                        if (isNaN(d.getTime())) return '-';
                                                                        return d.toLocaleDateString('id-ID', {
                                                                            timeZone: tz,
                                                                            day: '2-digit',
                                                                            month: 'short',
                                                                            year: 'numeric'
                                                                        });
                                                                    } catch (_) {
                                                                        return '-';
                                                                    }
                                                                })()}
                                                            </span>
                                                            {viewMode === 'all' && (
                                                                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                                                                    {row.no_rawat || '-'}
                                                                </span>
                                                            )}
                                                            <span className="font-mono text-[11px] text-gray-600 dark:text-gray-300">
                                                                {row.jam_rawat ? String(row.jam_rawat).substring(0,5) : '-'}
                                                            </span>
                                                            <span className="text-[10px] text-gray-600 dark:text-gray-300 mt-0.5">
                                                                {pegawaiMap[String(row.nik || row.nip || '')] || row.nama_pegawai || row.nama || row.nip || row.nik || '-'}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col items-end space-y-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setFormData((prev) => ({
                                                                        ...prev,
                                                                        ...buildCopyFormData(row),
                                                                    }));
                                                                    setEditKey(null);
                                                                    setMessage(null);
                                                                    setError(null);
                                                                }}
                                                                className="inline-flex items-center justify-center h-6 w-6 border border-transparent rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors"
                                                                title="Salin ke pemeriksaan baru"
                                                            >
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                </svg>
                                                            </button>
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
                                                                    setPegawaiQuery(pegawaiMap[row.nip] || row.nama_pegawai || row.nama || '');
                                                                    setEditKey({
                                                                        no_rawat: row.no_rawat,
                                                                        tgl_perawatan: row.tgl_perawatan,
                                                                        jam_rawat: String(row.jam_rawat).length === 5 ? row.jam_rawat + ':00' : row.jam_rawat,
                                                                    });
                                                                    setMessage(null);
                                                                    setError(null);
                                                                }}
                                                                className="inline-flex items-center justify-center h-6 w-6 border border-transparent rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50 transition-colors"
                                                                title="Edit pemeriksaan"
                                                            >
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={async () => {
                                                                    if (!confirm('Yakin ingin menghapus pemeriksaan ini?\n\nData yang dihapus tidak dapat dikembalikan.')) return;
                                                                    try {
                                                                        const url = route('rawat-jalan.pemeriksaan-ralan.delete');
                                                                        const res = await axios.delete(url, {
                                                                            data: {
                                                                                no_rawat: row.no_rawat,
                                                                                tgl_perawatan: row.tgl_perawatan,
                                                                                jam_rawat: String(row.jam_rawat).length === 5 ? row.jam_rawat + ':00' : row.jam_rawat,
                                                                            },
                                                                            withCredentials: true,
                                                                            headers: {
                                                                                'Content-Type': 'application/json',
                                                                                'Accept': 'application/json',
                                                                                'X-Requested-With': 'XMLHttpRequest',
                                                                            },
                                                                        });
                                                                        const json = res?.data || {};
                                                                        setError(null);
                                                                        setMessage(json.message || 'Pemeriksaan berhasil dihapus');
                                                                        await fetchList();
                                                                    } catch (e) {
                                                                        const errMsg = e?.response?.data?.message || e.message || 'Terjadi kesalahan saat menghapus';
                                                                        setError(errMsg);
                                                                        setMessage(null);
                                                                    }
                                                                }}
                                                                className="inline-flex items-center justify-center h-6 w-6 border border-transparent rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
                                                                title="Hapus pemeriksaan"
                                                            >
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 align-top text-xs w-40">
                                                    <div className="whitespace-normal break-words">
                                                        {(() => {
                                                            const sText = row.keluhan || row.pemeriksaan || row.penilaian || '';
                                                            if (!sText) {
                                                                return <span className="text-gray-400 italic">Tidak ada keluhan</span>;
                                                            }
                                                            return sText;
                                                        })()}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 align-top text-xs w-52">
                                                    <div className="space-y-1">
                                                        <div className="space-y-1">
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-500">Suhu:</span>
                                                                <span className="font-medium">
                                                                    {(!row.suhu_tubuh || row.suhu_tubuh === 'N/A') ? '-' : row.suhu_tubuh}°C
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-500">Tensi:</span>
                                                                <span className="font-medium">
                                                                    {(!row.tensi || row.tensi === 'N/A') ? '-' : row.tensi}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-500">Nadi:</span>
                                                                <span className="font-medium">
                                                                    {(!row.nadi || row.nadi === 'N/A') ? '-' : row.nadi}/min
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-500">SpO2:</span>
                                                                <span className="font-medium">
                                                                    {(!row.spo2 || row.spo2 === 'N/A') ? '-' : row.spo2}%
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="whitespace-normal break-words">
                                                            {(() => {
                                                                const usedPemeriksaanInS = !row.keluhan && !!row.pemeriksaan;
                                                                const text = usedPemeriksaanInS ? '' : (row.pemeriksaan || '');
                                                                if (!text) {
                                                                    return <span className="text-gray-400 italic">Belum diperiksa</span>;
                                                                }
                                                                return text;
                                                            })()}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 align-top text-xs w-40">
                                                    <div className="whitespace-normal break-words">
                                                        {row.penilaian || <span className="text-gray-400 italic">Belum dinilai</span>}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 align-top text-xs w-52">
                                                    <div className="space-y-1 whitespace-normal break-words">
                                                        {row.rtl || row.instruksi || row.evaluasi ? (
                                                            <>
                                                                {row.rtl && <div>{row.rtl}</div>}
                                                                {row.instruksi && <div>{row.instruksi}</div>}
                                                                {row.evaluasi && <div>{row.evaluasi}</div>}
                                                            </>
                                                        ) : (
                                                            <span className="text-gray-400 italic">Belum ada rencana</span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            </div>
            
            <Modal show={showGrafikModal} onClose={() => setShowGrafikModal(false)} size="wide" title="Grafik Tanda Vital">
                {grafikData.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        Belum ada data vital sign yang cukup untuk ditampilkan
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Grafik Tensi */}
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 lg:col-span-2 shadow-sm">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    Tekanan Darah (mmHg)
                                </h3>
                                <div className="h-72 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={grafikData} margin={{ top: 5, right: 30, left: 0, bottom: 55 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} vertical={false} />
                                            {/* Area Normal Sistole */}
                                            <ReferenceArea 
                                                y1={NORMAL_RANGES.sistole.min} 
                                                y2={NORMAL_RANGES.sistole.max} 
                                                fill={NORMAL_RANGES.sistole.color} 
                                                fillOpacity={0.1}
                                                label={{ value: 'Normal Sistole', position: 'insideRight', fill: NORMAL_RANGES.sistole.color, fontSize: 10 }}
                                            />
                                            {/* Area Normal Diastole */}
                                            <ReferenceArea 
                                                y1={NORMAL_RANGES.diastole.min} 
                                                y2={NORMAL_RANGES.diastole.max} 
                                                fill={NORMAL_RANGES.diastole.color} 
                                                fillOpacity={0.1}
                                                label={{ value: 'Normal Diastole', position: 'insideRight', fill: NORMAL_RANGES.diastole.color, fontSize: 10 }}
                                            />
                                            <XAxis 
                                                dataKey="datetime" 
                                                tick={{fontSize: 11}} 
                                                angle={-45} 
                                                textAnchor="end" 
                                                height={60}
                                                interval="preserveStartEnd"
                                            />
                                            <YAxis />
                                            <Tooltip 
                                                contentStyle={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                                                    borderRadius: '8px', 
                                                    border: '1px solid #e5e7eb', 
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                                }}
                                                labelStyle={{color: '#111827', fontWeight: '600', marginBottom: '4px'}}
                                            />
                                            <Legend verticalAlign="top" height={36} />
                                            <Line type="monotone" dataKey="sistole" stroke="#ef4444" name="Sistole" strokeWidth={2.5} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                                            <Line type="monotone" dataKey="diastole" stroke="#3b82f6" name="Diastole" strokeWidth={2.5} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Grafik Suhu */}
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                    Suhu Tubuh (°C)
                                </h3>
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={grafikData} margin={{ top: 5, right: 20, left: 0, bottom: 55 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} vertical={false} />
                                            <ReferenceArea 
                                                y1={NORMAL_RANGES.suhu.min} 
                                                y2={NORMAL_RANGES.suhu.max} 
                                                fill={NORMAL_RANGES.suhu.color} 
                                                fillOpacity={0.15}
                                                label={{ value: 'Normal', position: 'insideRight', fill: NORMAL_RANGES.suhu.color, fontSize: 10 }}
                                            />
                                            <XAxis 
                                                dataKey="datetime" 
                                                tick={{fontSize: 10}} 
                                                angle={-45} 
                                                textAnchor="end" 
                                                height={60}
                                                interval="preserveStartEnd"
                                            />
                                            <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                                            <Tooltip 
                                                contentStyle={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                                                    borderRadius: '8px', 
                                                    border: '1px solid #e5e7eb', 
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                                }}
                                                labelStyle={{color: '#111827', fontWeight: '600'}}
                                            />
                                            <Legend verticalAlign="top" height={36} />
                                            <Line type="monotone" dataKey="suhu" stroke="#f59e0b" name="Suhu" strokeWidth={2.5} dot={{r: 4}} activeDot={{r: 6}} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Grafik Nadi & Respirasi */}
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    Nadi & Respirasi (x/menit)
                                </h3>
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={grafikData} margin={{ top: 5, right: 20, left: 0, bottom: 55 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} vertical={false} />
                                            {/* Area Normal Nadi */}
                                            <ReferenceArea 
                                                y1={NORMAL_RANGES.nadi.min} 
                                                y2={NORMAL_RANGES.nadi.max} 
                                                fill={NORMAL_RANGES.nadi.color} 
                                                fillOpacity={0.1}
                                                label={{ value: 'Nadi Normal', position: 'insideTopRight', fill: NORMAL_RANGES.nadi.color, fontSize: 10 }}
                                            />
                                            {/* Area Normal Respirasi */}
                                            <ReferenceArea 
                                                y1={NORMAL_RANGES.respirasi.min} 
                                                y2={NORMAL_RANGES.respirasi.max} 
                                                fill={NORMAL_RANGES.respirasi.color} 
                                                fillOpacity={0.1}
                                                label={{ value: 'Resp. Normal', position: 'insideBottomRight', fill: NORMAL_RANGES.respirasi.color, fontSize: 10 }}
                                            />
                                            <XAxis 
                                                dataKey="datetime" 
                                                tick={{fontSize: 10}} 
                                                angle={-45} 
                                                textAnchor="end" 
                                                height={60}
                                                interval="preserveStartEnd"
                                            />
                                            <YAxis />
                                            <Tooltip 
                                                contentStyle={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                                                    borderRadius: '8px', 
                                                    border: '1px solid #e5e7eb', 
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                                }}
                                                labelStyle={{color: '#111827', fontWeight: '600'}}
                                            />
                                            <Legend verticalAlign="top" height={36} />
                                            <Line type="monotone" dataKey="nadi" stroke="#10b981" name="Nadi" strokeWidth={2.5} dot={{r: 4}} activeDot={{r: 6}} />
                                            <Line type="monotone" dataKey="respirasi" stroke="#8b5cf6" name="Respirasi" strokeWidth={2.5} dot={{r: 4}} activeDot={{r: 6}} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                    </div>
                )}
                
                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                        onClick={() => setShowGrafikModal(false)}
                    >
                        Tutup
                    </button>
                </div>
            </Modal>
        </div>
    );
}
