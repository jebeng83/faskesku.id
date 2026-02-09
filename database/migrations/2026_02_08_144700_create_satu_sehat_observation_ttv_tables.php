<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Tabel-tabel tracking untuk SATU SEHAT Observation (Tanda-Tanda Vital)
     * Setiap jenis vital sign memiliki tabel terpisah untuk kemudahan tracking
     */
    public function up(): void
    {
        // 1. Tekanan Darah (Blood Pressure) - LOINC: 85354-9
        Schema::create('satu_sehat_observationttvtensi', function (Blueprint $table) {
            $table->id();
            $table->string('no_rawat', 17);
            $table->date('tgl_perawatan');
            $table->time('jam_rawat');
            $table->string('satusehat_id', 100)->nullable()->comment('UUID dari SATU SEHAT');
            $table->text('fhir_json')->nullable()->comment('Full FHIR response');
            $table->string('status', 20)->default('pending')->comment('pending, sent, failed');
            $table->text('error_message')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
            
            // Composite unique: satu no_rawat+tgl+jam hanya boleh punya 1 record
            $table->unique(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'idx_tensi_unique');
            $table->index('satusehat_id');
            $table->index('status');
            
            // Foreign key ke pemeriksaan_ralan
            $table->foreign(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'fk_tensi_pemeriksaan')
                ->references(['no_rawat', 'tgl_perawatan', 'jam_rawat'])
                ->on('pemeriksaan_ralan')
                ->onDelete('cascade');
        });

        // 2. Nadi (Heart Rate) - LOINC: 8867-4
        Schema::create('satu_sehat_observationttvnadi', function (Blueprint $table) {
            $table->id();
            $table->string('no_rawat', 17);
            $table->date('tgl_perawatan');
            $table->time('jam_rawat');
            $table->string('satusehat_id', 100)->nullable();
            $table->text('fhir_json')->nullable();
            $table->string('status', 20)->default('pending');
            $table->text('error_message')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
            
            $table->unique(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'idx_nadi_unique');
            $table->index('satusehat_id');
            $table->index('status');
            
            $table->foreign(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'fk_nadi_pemeriksaan')
                ->references(['no_rawat', 'tgl_perawatan', 'jam_rawat'])
                ->on('pemeriksaan_ralan')
                ->onDelete('cascade');
        });

        // 3. Respirasi (Respiratory Rate) - LOINC: 9279-1
        Schema::create('satu_sehat_observationttvrespirasi', function (Blueprint $table) {
            $table->id();
            $table->string('no_rawat', 17);
            $table->date('tgl_perawatan');
            $table->time('jam_rawat');
            $table->string('satusehat_id', 100)->nullable();
            $table->text('fhir_json')->nullable();
            $table->string('status', 20)->default('pending');
            $table->text('error_message')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
            
            $table->unique(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'idx_respirasi_unique');
            $table->index('satusehat_id');
            $table->index('status');
            
            $table->foreign(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'fk_respirasi_pemeriksaan')
                ->references(['no_rawat', 'tgl_perawatan', 'jam_rawat'])
                ->on('pemeriksaan_ralan')
                ->onDelete('cascade');
        });

        // 4. Suhu Tubuh (Body Temperature) - LOINC: 8310-5
        Schema::create('satu_sehat_observationttvsuhu', function (Blueprint $table) {
            $table->id();
            $table->string('no_rawat', 17);
            $table->date('tgl_perawatan');
            $table->time('jam_rawat');
            $table->string('satusehat_id', 100)->nullable();
            $table->text('fhir_json')->nullable();
            $table->string('status', 20)->default('pending');
            $table->text('error_message')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
            
            $table->unique(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'idx_suhu_unique');
            $table->index('satusehat_id');
            $table->index('status');
            
            $table->foreign(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'fk_suhu_pemeriksaan')
                ->references(['no_rawat', 'tgl_perawatan', 'jam_rawat'])
                ->on('pemeriksaan_ralan')
                ->onDelete('cascade');
        });

        // 5. SpO2 (Oxygen Saturation) - LOINC: 59408-5
        Schema::create('satu_sehat_observationttvspo2', function (Blueprint $table) {
            $table->id();
            $table->string('no_rawat', 17);
            $table->date('tgl_perawatan');
            $table->time('jam_rawat');
            $table->string('satusehat_id', 100)->nullable();
            $table->text('fhir_json')->nullable();
            $table->string('status', 20)->default('pending');
            $table->text('error_message')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
            
            $table->unique(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'idx_spo2_unique');
            $table->index('satusehat_id');
            $table->index('status');
            
            $table->foreign(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'fk_spo2_pemeriksaan')
                ->references(['no_rawat', 'tgl_perawatan', 'jam_rawat'])
                ->on('pemeriksaan_ralan')
                ->onDelete('cascade');
        });

        // 6. Berat Badan (Body Weight) - LOINC: 29463-7
        Schema::create('satu_sehat_observationttvbb', function (Blueprint $table) {
            $table->id();
            $table->string('no_rawat', 17);
            $table->date('tgl_perawatan');
            $table->time('jam_rawat');
            $table->string('satusehat_id', 100)->nullable();
            $table->text('fhir_json')->nullable();
            $table->string('status', 20)->default('pending');
            $table->text('error_message')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
            
            $table->unique(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'idx_bb_unique');
            $table->index('satusehat_id');
            $table->index('status');
            
            $table->foreign(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'fk_bb_pemeriksaan')
                ->references(['no_rawat', 'tgl_perawatan', 'jam_rawat'])
                ->on('pemeriksaan_ralan')
                ->onDelete('cascade');
        });

        // 7. GCS (Glasgow Coma Scale) - LOINC: 9269-2
        Schema::create('satu_sehat_observationttvgcs', function (Blueprint $table) {
            $table->id();
            $table->string('no_rawat', 17);
            $table->date('tgl_perawatan');
            $table->time('jam_rawat');
            $table->string('satusehat_id', 100)->nullable();
            $table->text('fhir_json')->nullable();
            $table->string('status', 20)->default('pending');
            $table->text('error_message')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
            
            $table->unique(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'idx_gcs_unique');
            $table->index('satusehat_id');
            $table->index('status');
            
            $table->foreign(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'fk_gcs_pemeriksaan')
                ->references(['no_rawat', 'tgl_perawatan', 'jam_rawat'])
                ->on('pemeriksaan_ralan')
                ->onDelete('cascade');
        });

        // 8. Kesadaran (Level of Consciousness) - LOINC: 80288-4
        Schema::create('satu_sehat_observationttvkesadaran', function (Blueprint $table) {
            $table->id();
            $table->string('no_rawat', 17);
            $table->date('tgl_perawatan');
            $table->time('jam_rawat');
            $table->string('satusehat_id', 100)->nullable();
            $table->text('fhir_json')->nullable();
            $table->string('status', 20)->default('pending');
            $table->text('error_message')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
            
            $table->unique(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'idx_kesadaran_unique');
            $table->index('satusehat_id');
            $table->index('status');
            
            $table->foreign(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'fk_kesadaran_pemeriksaan')
                ->references(['no_rawat', 'tgl_perawatan', 'jam_rawat'])
                ->on('pemeriksaan_ralan')
                ->onDelete('cascade');
        });

        // 9. Lingkar Perut (Waist Circumference) - LOINC: 8280-0
        Schema::create('satu_sehat_observationttvlp', function (Blueprint $table) {
            $table->id();
            $table->string('no_rawat', 17);
            $table->date('tgl_perawatan');
            $table->time('jam_rawat');
            $table->string('satusehat_id', 100)->nullable();
            $table->text('fhir_json')->nullable();
            $table->string('status', 20)->default('pending');
            $table->text('error_message')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
            
            $table->unique(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'idx_lp_unique');
            $table->index('satusehat_id');
            $table->index('status');
            
            $table->foreign(['no_rawat', 'tgl_perawatan', 'jam_rawat'], 'fk_lp_pemeriksaan')
                ->references(['no_rawat', 'tgl_perawatan', 'jam_rawat'])
                ->on('pemeriksaan_ralan')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_observationttvlp');
        Schema::dropIfExists('satu_sehat_observationttvkesadaran');
        Schema::dropIfExists('satu_sehat_observationttvgcs');
        Schema::dropIfExists('satu_sehat_observationttvbb');
        Schema::dropIfExists('satu_sehat_observationttvspo2');
        Schema::dropIfExists('satu_sehat_observationttvsuhu');
        Schema::dropIfExists('satu_sehat_observationttvrespirasi');
        Schema::dropIfExists('satu_sehat_observationttvnadi');
        Schema::dropIfExists('satu_sehat_observationttvtensi');
    }
};
