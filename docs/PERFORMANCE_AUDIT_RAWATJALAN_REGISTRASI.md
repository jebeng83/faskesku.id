# Performance Audit — Rawat Jalan & Registrasi

This document summarizes query patterns observed in Rawat Jalan and Registration modules, the indexes we added, and further optimization recommendations (eager loading and additional indexes).

## Goals
- Reduce query latency for common filters (date, doctor, polyclinic).
- Accelerate history retrieval (per patient, per visit) with proper composite indexes.
- Provide guidance for future eager loading and query structure.

## Key Tables
- reg_periksa (primary driver for both modules)
- pasien (patient master; used with whereHas for name searches)
- pemeriksaan_ralan, detail_pemberian_obat, aturan_pakai (visit details)
- detail_periksa_lab, template_laboratorium (lab)
- periksa_radiologi, hasil_radiologi (radiology)

## Query Patterns and Indexes

### RawatJalanController::index
Pattern:
- Filters: tgl_registrasi = ?, stts = ?, status_bayar = ?, kd_dokter = ?, kd_poli = ?, nama_pasien (via whereHas pasien nm_pasien LIKE)
- Joins: dokter, poliklinik, penjab
- Order: tgl_registrasi DESC, jam_reg DESC

Indexes implemented:
- idx_reg_periksa_tgl on (tgl_registrasi)
- idx_reg_periksa_tgl_jam on (tgl_registrasi, jam_reg)
- idx_reg_periksa_tgl_kd_dokter on (tgl_registrasi, kd_dokter)
- idx_reg_periksa_tgl_kd_poli on (tgl_registrasi, kd_poli)

Existing helpful indexes (from prior migration):
- kd_dokter, kd_poli, kd_pj, status_lanjut, status_bayar, no_rkm_medis

Recommendation:
- Consider switching from leftJoin to eager loading when we only need related names:
  - with(['patient:no_rkm_medis,nm_pasien','dokter:kd_dokter,nm_dokter','poliklinik:kd_poli,nm_poli','penjab:kd_pj,png_jawab'])
  - Then map the result to include nm_dokter/nm_poli/nm_penjamin fields for the UI.
  - Left joins are acceptable for single-query aggregates; eager loading helps when we later access deeper relations repeatedly.

### RawatJalanController::riwayat
Pattern:
- where no_rkm_medis = ?
- order by tgl_registrasi DESC, jam_reg DESC
- limit 25

Index implemented:
- idx_reg_periksa_norm_tgl_jam on (no_rkm_medis, tgl_registrasi, jam_reg)

### RawatJalanController::getRiwayatPemeriksaan
Pattern:
- where no_rkm_medis = ? and stts <> 'Batal'
- order by tgl_registrasi DESC
- limit 10

Suggested future index (evaluate with EXPLAIN before adding):
- (no_rkm_medis, stts, tgl_registrasi) — note stts low cardinality; composite helps selective scans.

### RawatJalanController::pemeriksaanRalan
Pattern:
- where no_rawat = ?
- order by tgl_perawatan DESC, jam_rawat DESC

Suggested indices:
- pemeriksaan_ralan(no_rawat, tgl_perawatan, jam_rawat)

### RawatJalanController::getPemeriksaanLab
Pattern:
- where detail_periksa_lab.no_rawat = ?
- order by tgl_periksa DESC, jam DESC

Suggested indices:
- detail_periksa_lab(no_rawat, tgl_periksa, jam)

### RawatJalanController::getRadiologi
Pattern:
- periksa_radiologi where no_rawat = ?
- hasil_radiologi where no_rawat = ?
- Merge in PHP and sort by tgl_periksa + jam

Suggested indices:
- periksa_radiologi(no_rawat, tgl_periksa, jam)
- hasil_radiologi(no_rawat, tgl_periksa, jam)

### RegistrationController::index
Pattern:
- where tgl_registrasi = today
- order by jam_reg DESC
- with pasien, dokter, poliklinik, penjab

Indexes implemented:
- idx_reg_periksa_tgl on (tgl_registrasi)
- idx_reg_periksa_tgl_jam on (tgl_registrasi, jam_reg)

### RegistrationController::getRegistrations
Pattern:
- where tgl_registrasi = ? [default to today]
- optional where kd_poli, kd_dokter
- whereHas pasien for nm_pasien/no_rkm_medis term search
- optional where stts, status_poli
- order by jam_reg DESC

Existing helpful indexes:
- kd_dokter, kd_poli

Suggested indices to consider (evaluate with EXPLAIN):
- status_poli (low cardinality; only add if filter is frequent in production)

Patient search:
- For LIKE searches across nm_pasien or no_rkm_medis, consider FULLTEXT index on nm_pasien (if MySQL/InnoDB) for improved performance and relevance. For exact matches on no_rkm_medis, a regular index already exists on reg_periksa.no_rkm_medis; adding an index on pasien.no_rkm_medis is recommended if not present.

## Migration Applied
File: database/migrations/2025_11_09_000001_add_indexes_to_reg_periksa.php
- Added named indexes:
  - idx_reg_periksa_tgl
  - idx_reg_periksa_tgl_kd_dokter
  - idx_reg_periksa_tgl_kd_poli
  - idx_reg_periksa_norm_tgl_jam
  - idx_reg_periksa_tgl_jam

Command used:
```
php artisan migrate --force --path=database/migrations/2025_11_09_000001_add_indexes_to_reg_periksa.php
```

Note: We executed a path-specific migration to avoid unrelated migration failures (duplicate table). Use path-specific runs when needed.

## Eager Loading Recommendations
- RawatJalan model now includes poliklinik() and penjab() relations to enable:
  ```php
  RawatJalan::with(['patient:no_rkm_medis,nm_pasien', 'dokter:kd_dokter,nm_dokter', 'poliklinik:kd_poli,nm_poli', 'penjab:kd_pj,png_jawab'])
  ```
- Prefer eager loading when:
  - You display related names across many records.
  - You later access nested relations in loops.
  - You need consistent per-record relation hydration for transformers/resources.

## Verification Steps
1) Run EXPLAIN on representative queries before and after indexes.
2) Confirm key length and index usage via SHOW INDEX FROM reg_periksa.
3) Monitor query latency and InnoDB buffer pool hits in production.

## Changelog (related to performance)
- Added composite indexes to reg_periksa for common filters and sorts.
- Added poliklinik() and penjab() relations in RawatJalan model to unlock eager loading.