<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $regPeriksaSupportsFk = $this->supportsForeignKeys('reg_periksa');
        $employeesSupportsFk = $this->supportsForeignKeys('employees');
        $jnsPerawatanSupportsFk = $this->supportsForeignKeys('jns_perawatan_lab');
        $patientsSupportsFk = $this->supportsForeignKeys('patients');

        if (! Schema::hasTable('periksa_lab')) {
            Schema::create('periksa_lab', function (Blueprint $table) use ($regPeriksaSupportsFk, $employeesSupportsFk, $jnsPerawatanSupportsFk) {
                $table->engine = 'InnoDB';
                $table->string('no_rawat', 17)->primary();
                $table->string('nip', 20);
                $table->string('kd_jenis_prw', 15);
                $table->datetime('tgl_periksa');
                $table->time('jam');
                $table->text('dokter_perujuk')->nullable();
                $table->text('bagian_perujuk')->nullable();
                $table->text('kategori')->nullable();
                $table->enum('status', ['Menunggu', 'Proses', 'Selesai'])->default('Menunggu');
                $table->text('keterangan')->nullable();
                $table->timestamps();

                $table->index('nip');
                $table->index('kd_jenis_prw');

                if ($regPeriksaSupportsFk) {
                    $table->foreign('no_rawat')->references('no_rawat')->on('reg_periksa')->onDelete('cascade');
                }

                if ($employeesSupportsFk) {
                    $table->foreign('nip')->references('nip')->on('employees')->onDelete('cascade');
                }

                if ($jnsPerawatanSupportsFk) {
                    $table->foreign('kd_jenis_prw')->references('kd_jenis_prw')->on('jns_perawatan_lab')->onDelete('cascade');
                }
            });
        }

        if (! Schema::hasTable('detail_periksa_lab')) {
            Schema::create('detail_periksa_lab', function (Blueprint $table) use ($jnsPerawatanSupportsFk) {
                $table->engine = 'InnoDB';
                $table->id();
                $table->string('no_rawat', 17);
                $table->string('kd_jenis_prw', 15);
                $table->string('item_pemeriksaan');
                $table->text('nilai')->nullable();
                $table->string('nilai_rujukan')->nullable();
                $table->string('satuan')->nullable();
                $table->enum('keterangan', ['Normal', 'Tinggi', 'Rendah', 'Abnormal'])->nullable();
                $table->timestamps();

                $table->index('no_rawat');
                $table->index('kd_jenis_prw');

                if ($this->supportsForeignKeys('periksa_lab')) {
                    $table->foreign('no_rawat')->references('no_rawat')->on('periksa_lab')->onDelete('cascade');
                }

                if ($jnsPerawatanSupportsFk) {
                    $table->foreign('kd_jenis_prw')->references('kd_jenis_prw')->on('jns_perawatan_lab')->onDelete('cascade');
                }
            });
        }

        if (! Schema::hasTable('template_laboratorium')) {
            Schema::create('template_laboratorium', function (Blueprint $table) use ($jnsPerawatanSupportsFk) {
                $table->engine = 'InnoDB';
                $table->id();
                $table->string('kd_jenis_prw', 15);
                $table->string('item_pemeriksaan');
                $table->string('nilai_rujukan_pria')->nullable();
                $table->string('nilai_rujukan_wanita')->nullable();
                $table->string('satuan')->nullable();
                $table->integer('urutan')->default(1);
                $table->enum('status', ['Aktif', 'Nonaktif'])->default('Aktif');
                $table->timestamps();

                $table->index('kd_jenis_prw');

                if ($jnsPerawatanSupportsFk) {
                    $table->foreign('kd_jenis_prw')->references('kd_jenis_prw')->on('jns_perawatan_lab')->onDelete('cascade');
                }
            });
        }

        if (! Schema::hasTable('riwayat_lab')) {
            Schema::create('riwayat_lab', function (Blueprint $table) use ($regPeriksaSupportsFk, $patientsSupportsFk, $jnsPerawatanSupportsFk) {
                $table->engine = 'InnoDB';
                $table->id();
                $table->string('no_rawat', 17);
                $table->string('no_rkm_medis', 15);
                $table->string('kd_jenis_prw', 15);
                $table->datetime('tgl_periksa');
                $table->text('hasil_pemeriksaan');
                $table->string('dokter_pj')->nullable();
                $table->string('petugas_lab')->nullable();
                $table->timestamps();

                $table->index('no_rawat');
                $table->index('no_rkm_medis');
                $table->index('kd_jenis_prw');

                if ($regPeriksaSupportsFk) {
                    $table->foreign('no_rawat')->references('no_rawat')->on('reg_periksa')->onDelete('cascade');
                }

                if ($patientsSupportsFk) {
                    $table->foreign('no_rkm_medis')->references('no_rkm_medis')->on('patients')->onDelete('cascade');
                }

                if ($jnsPerawatanSupportsFk) {
                    $table->foreign('kd_jenis_prw')->references('kd_jenis_prw')->on('jns_perawatan_lab')->onDelete('cascade');
                }
            });
        }
    }

    protected function supportsForeignKeys(string $table): bool
    {
        if (! Schema::hasTable($table)) {
            return false;
        }

        $connection = Schema::getConnection();
        $driver = $connection->getDriverName();

        if ($driver === 'mysql') {
            $status = DB::select('SHOW TABLE STATUS WHERE Name = ?', [$table]);
            $engine = $status[0]->Engine ?? null;

            return strtolower((string) $engine) === 'innodb';
        }

        return true;
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_lab');
        Schema::dropIfExists('template_laboratorium');
        Schema::dropIfExists('detail_periksa_lab');
        Schema::dropIfExists('periksa_lab');
    }
};
