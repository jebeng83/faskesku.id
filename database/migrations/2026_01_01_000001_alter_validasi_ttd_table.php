<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (! Schema::hasTable('validasi_ttd')) {
            Schema::create('validasi_ttd', function (Blueprint $table) {
                $table->string('no_surat', 20);
                $table->string('no_rawat', 17);
                $table->string('no_rkm_medis', 17)->nullable();
                $table->date('tanggal');
                $table->enum('status', ['0', '1']);
                $table->enum('label', ['SKS','SKSEHAT','KELAHIRAN','CUTI','IZIN_TERBANG','RUJUKAN','BEBAS_NARKOBA','HASIL_MATA','KEMATIAN','BEROBAT','RAWAT_INAP']);
                $table->string('jenis', 50)->nullable();
                $table->longText('payload_json')->nullable();
                $table->timestamp('verified_at')->nullable();
                $table->timestamps();
            });
            return;
        }

        Schema::table('validasi_ttd', function (Blueprint $table) {
            if (! Schema::hasColumn('validasi_ttd', 'no_surat')) {
                $table->string('no_surat', 20);
            }
            if (! Schema::hasColumn('validasi_ttd', 'no_rawat')) {
                $table->string('no_rawat', 17);
            }
            if (! Schema::hasColumn('validasi_ttd', 'no_rkm_medis')) {
                $table->string('no_rkm_medis', 17)->nullable();
            }
            if (! Schema::hasColumn('validasi_ttd', 'tanggal')) {
                $table->date('tanggal');
            }
            if (! Schema::hasColumn('validasi_ttd', 'status')) {
                $table->enum('status', ['0', '1']);
            }
            if (! Schema::hasColumn('validasi_ttd', 'label')) {
                $table->enum('label', ['SKS','SKSEHAT','KELAHIRAN','CUTI','IZIN_TERBANG','RUJUKAN','BEBAS_NARKOBA','HASIL_MATA','KEMATIAN','BEROBAT','RAWAT_INAP']);
            }
            if (! Schema::hasColumn('validasi_ttd', 'jenis')) {
                $table->string('jenis', 50)->nullable();
            }
            if (! Schema::hasColumn('validasi_ttd', 'payload_json')) {
                $table->longText('payload_json')->nullable();
            }
            if (! Schema::hasColumn('validasi_ttd', 'verified_at')) {
                $table->timestamp('verified_at')->nullable();
            }
            if (! Schema::hasColumn('validasi_ttd', 'created_at')) {
                $table->timestamp('created_at')->nullable();
            }
            if (! Schema::hasColumn('validasi_ttd', 'updated_at')) {
                $table->timestamp('updated_at')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('validasi_ttd', function (Blueprint $table) {
            if (Schema::hasColumn('validasi_ttd', 'jenis')) { $table->dropColumn('jenis'); }
            if (Schema::hasColumn('validasi_ttd', 'no_surat')) { $table->dropColumn('no_surat'); }
            if (Schema::hasColumn('validasi_ttd', 'no_rawat')) { $table->dropColumn('no_rawat'); }
            if (Schema::hasColumn('validasi_ttd', 'mr')) { $table->dropColumn('mr'); }
            if (Schema::hasColumn('validasi_ttd', 'status')) { $table->dropColumn('status'); }
            if (Schema::hasColumn('validasi_ttd', 'token')) { $table->dropColumn('token'); }
            if (Schema::hasColumn('validasi_ttd', 'payload_json')) { $table->dropColumn('payload_json'); }
            if (Schema::hasColumn('validasi_ttd', 'verified_at')) { $table->dropColumn('verified_at'); }
            if (Schema::hasColumn('validasi_ttd', 'created_at')) { $table->dropColumn('created_at'); }
            if (Schema::hasColumn('validasi_ttd', 'updated_at')) { $table->dropColumn('updated_at'); }
        });
    }
};
