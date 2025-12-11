<?php

// Konfigurasi Akutansi
// Digunakan oleh modul Jurnal untuk menentukan akun default saat staging dari Billing.
// Jika tidak diisi, UI akan meminta pengguna memilih akun secara manual.
//
// Cara pakai:
// - Set melalui environment (.env):
//   AKUTANSI_REK_KAS_DEFAULT="1000"          # contoh kode rekening Kas/Bank
//   AKUTANSI_REK_PENDAPATAN_DEFAULT="4000"   # contoh kode rekening Pendapatan
// - Atau langsung isi nilai di bawah ini.

return [
    // Akun debit default untuk penerimaan pembayaran (Kas/Bank)
    // Digunakan saat melakukan stageFromBilling jika payload tidak menyertakan akun bayar.
    'rek_kas_default' => env('AKUTANSI_REK_KAS_DEFAULT', null),

    // Akun kredit default untuk pendapatan utama
    // Digunakan saat melakukan stageFromBilling jika payload tidak menyertakan kd_rek_kredit.
    'rek_pendapatan_default' => env('AKUTANSI_REK_PENDAPATAN_DEFAULT', null),
];
