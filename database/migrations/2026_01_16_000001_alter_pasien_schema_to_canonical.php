<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('pasien')) {
            return;
        }

        if (! Schema::hasColumn('pasien', 'no_ktp')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('no_ktp', 20)->nullable()->index('no_ktp');
            });
        }

        if (! Schema::hasColumn('pasien', 'nm_ibu')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('nm_ibu', 40)->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'gol_darah')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->enum('gol_darah', ['A', 'B', 'O', 'AB', '-'])->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'pekerjaan')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('pekerjaan', 60)->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'stts_nikah')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->enum('stts_nikah', ['BELUM MENIKAH', 'MENIKAH', 'JANDA', 'DUDHA', 'JOMBLO'])->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'agama')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('agama', 12)->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'tgl_daftar')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->date('tgl_daftar')->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'no_tlp')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('no_tlp', 40)->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'umur')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('umur', 30)->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'pnd')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->enum('pnd', ['TS', 'TK', 'SD', 'SMP', 'SMA', 'SLTA/SEDERAJAT', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3', '-']);
            });
        }

        if (! Schema::hasColumn('pasien', 'keluarga')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->enum('keluarga', ['AYAH', 'IBU', 'ISTRI', 'SUAMI', 'SAUDARA', 'ANAK', 'DIRI SENDIRI', 'LAIN-LAIN'])->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'namakeluarga')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('namakeluarga', 50)->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'kd_pj')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->char('kd_pj', 3)->nullable()->index('kd_pj');
            });
        }

        if (! Schema::hasColumn('pasien', 'no_peserta')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('no_peserta', 25)->nullable()->index('no_peserta');
            });
        }

        if (! Schema::hasColumn('pasien', 'kd_kel')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->integer('kd_kel')->nullable()->index('kd_kel_2');
            });
        }

        if (! Schema::hasColumn('pasien', 'kd_kec')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->integer('kd_kec')->nullable()->index('kd_kec');
            });
        }

        if (! Schema::hasColumn('pasien', 'kd_kab')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->integer('kd_kab')->nullable()->index('kd_kab');
            });
        }

        if (! Schema::hasColumn('pasien', 'pekerjaanpj')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('pekerjaanpj', 35)->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'alamatpj')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('alamatpj', 100)->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'kelurahanpj')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('kelurahanpj', 60)->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'kecamatanpj')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('kecamatanpj', 60)->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'kabupatenpj')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('kabupatenpj', 60)->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'perusahaan_pasien')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('perusahaan_pasien', 8)->nullable()->index('perusahaan_pasien');
            });
        }

        if (! Schema::hasColumn('pasien', 'suku_bangsa')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->integer('suku_bangsa')->nullable()->index('suku_bangsa');
            });
        }

        if (! Schema::hasColumn('pasien', 'bahasa_pasien')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->integer('bahasa_pasien')->nullable()->index('bahasa_pasien');
            });
        }

        if (! Schema::hasColumn('pasien', 'cacat_fisik')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->integer('cacat_fisik')->nullable()->index('cacat_fisik');
            });
        }

        if (! Schema::hasColumn('pasien', 'email')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('email', 50)->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'nip')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('nip', 30)->nullable();
            });
        }

        if (! Schema::hasColumn('pasien', 'kd_prop')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->integer('kd_prop')->nullable()->index('kd_prop');
            });
        }

        if (! Schema::hasColumn('pasien', 'propinsipj')) {
            Schema::table('pasien', function (Blueprint $table) {
                $table->string('propinsipj', 30)->nullable();
            });
        }
    }

    public function down(): void
    {
        if (! Schema::hasTable('pasien')) {
            return;
        }
    }
};

