# Sukses Dump/Describe Tabel (MySQL + Laravel)

## Tujuan
- Menampilkan struktur tabel (DESCRIBE) dan DDL lengkap (SHOW CREATE TABLE) menggunakan lingkungan Laravel tanpa perlu klien MySQL terpasang.

## Prasyarat
- Konfigurasi database valid di `.env` (DB_CONNECTION=mysql, DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD).
- Aplikasi bisa menjalankan perintah Artisan.

## Langkah Cepat (Artisan Tinker)
- Cek koneksi:

```bash
php artisan tinker --execute="DB::select('select 1')"
```

- DESCRIBE tabel (menampilkan sebagian atau penuh, generik untuk tabel apa pun):

```bash
# 12 kolom pertama (contoh ringkas)
php artisan tinker --execute='$t = "skrining_pkg"; dump(collect(DB::select("DESCRIBE ".$t))->take(12));'

# Cetak baris rapi ke terminal
php artisan tinker --execute='
$t = "skrining_pkg";
foreach (DB::select("DESCRIBE ".$t) as $c) {
  echo $c->Field."\t".$c->Type."\t".$c->Null."\t".$c->Key."\t".(isset($c->Default)?$c->Default:"")."\t".$c->Extra.PHP_EOL;
}'
```

- SHOW CREATE TABLE (DDL lengkap, generik untuk tabel apa pun):

```bash
php artisan tinker --execute='$t = "skrining_pkg"; dump(DB::select("SHOW CREATE TABLE ".$t));'
```

- Simpan hasil ke file (generik):

```bash
# Simpan DESCRIBE ke file teks
php artisan tinker --execute='
$t = "skrining_pkg";
$rows = DB::select("DESCRIBE ".$t);
$out = "Field\tType\tNull\tKey\tDefault\tExtra\n";
foreach ($rows as $c) { $out .= $c->Field."\t".$c->Type."\t".$c->Null."\t".$c->Key."\t".(isset($c->Default)?$c->Default:"")."\t".$c->Extra."\n"; }
file_put_contents("describe_".$t.".txt", $out);
'

# Simpan DDL (SHOW CREATE) ke file SQL
php artisan tinker --execute='
$t = "skrining_pkg";
$rows = DB::select("SHOW CREATE TABLE ".$t);
$ddl = $rows[0]->{"Create Table"};
file_put_contents("create_".$t.".sql", $ddl);
'
```

## Alternatif (Jika klien MySQL tersedia)

```bash
mysql -h127.0.0.1 -P3306 -uroot -D fufufafa -e "DESCRIBE skrining_pkg;"
mysql -h127.0.0.1 -P3306 -uroot -D fufufafa -e "SHOW CREATE TABLE skrining_pkg;"
```

## Tips Penggunaan
- Gunakan kutip tunggal di luar dan kutip ganda di dalam perintah `--execute` untuk menghindari konflik escape.
- Ganti `skrining_pkg` dengan nama tabel lain sesuai kebutuhan.
- Untuk output panjang, simpan ke file agar mudah ditinjau dan dibagikan.

### Template Satu-Baris (Copy-Paste Cepat)
- Set nama tabel sekali, lalu jalankan perintah sesuai kebutuhan:

```bash
# Set variabel nama tabel
TAB=skrining_pkg

# DESCRIBE 12 kolom pertama
php artisan tinker --execute="$t = '$TAB'; dump(collect(DB::select('DESCRIBE '.\$t))->take(12));"

# DESCRIBE format rapi penuh
php artisan tinker --execute="$t = '$TAB'; foreach (DB::select('DESCRIBE '.\$t) as $c) { echo \$c->Field."\t".\$c->Type."\t".\$c->Null."\t".\$c->Key."\t".(isset(\$c->Default)?\$c->Default:"")."\t".\$c->Extra.PHP_EOL; }"

# SHOW CREATE TABLE
php artisan tinker --execute="$t = '$TAB'; dump(DB::select('SHOW CREATE TABLE '.\$t));"

# Simpan DESCRIBE ke file
php artisan tinker --execute="$t = '$TAB'; \$rows = DB::select('DESCRIBE '.\$t); \$out = 'Field\tType\tNull\tKey\tDefault\tExtra\n'; foreach (\$rows as \$c) { \$out .= \$c->Field.'\t'.\$c->Type.'\t'.\$c->Null.'\t'.\$c->Key.'\t'.(isset(\$c->Default)?\$c->Default:'').'\t'.\$c->Extra.'\n'; } file_put_contents('describe_'.\$t.'.txt', \$out);"

# Simpan DDL ke file
php artisan tinker --execute="$t = '$TAB'; \$rows = DB::select('SHOW CREATE TABLE '.\$t); \$ddl = \$rows[0]->{'Create Table'}; file_put_contents('create_'.\$t.'.sql', \$ddl);"
```

### Menampilkan Semua Tabel dan Dump Massal
- Daftar semua tabel, lalu dump satu per satu (gunakan hati-hati di database besar):

```bash
# Daftar tabel (MySQL)
php artisan tinker --execute='dump(DB::select("SHOW TABLES"));'

# Dump DESCRIBE semua tabel ke file masing-masing
php artisan tinker --execute='
$tables = collect(DB::select("SHOW TABLES"))->map(function ($row) { return array_values((array) $row)[0]; });
foreach ($tables as $t) {
  $rows = DB::select("DESCRIBE ".$t);
  $out = "Field\tType\tNull\tKey\tDefault\tExtra\n";
  foreach ($rows as $c) { $out .= $c->Field."\t".$c->Type."\t".$c->Null."\t".$c->Key."\t".(isset($c->Default)?$c->Default:"")."\t".$c->Extra."\n"; }
  file_put_contents("describe_".$t.".txt", $out);
}
'
```

## Validasi & Rujukan
- Model Eloquent yang disesuaikan dengan DDL: [SkriningCKG.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Models/CKG/SkriningCKG.php)
- Pastikan perubahan field di model mencerminkan kolom pada hasil DESCRIBE/SHOW CREATE.

## Troubleshooting
- "command not found: mysql": gunakan metode Artisan Tinker.
- Koneksi gagal: periksa kredensial di `.env` dan jalankan `php artisan config:clear` sebelum eksekusi.
- Output terpotong di terminal: gunakan metode simpan ke file.

### Catatan Tambahan
- Untuk melihat foreign key dan relasi cepat:

```bash
php artisan tinker --execute='
$t = "skrining_pkg";
dump(DB::select("SELECT CONSTRAINT_NAME, TABLE_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND REFERENCED_TABLE_NAME IS NOT NULL", [$t]));
'
```
