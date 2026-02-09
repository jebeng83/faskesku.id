<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class PcarePendaftaranTest extends TestCase
{
    // Do not use RefreshDatabase as it runs broken migrations in this legacy project
    // use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create tables manually for testing environment (SQLite :memory:)
        $this->createSchema();
    }

    protected function createSchema()
    {
        // Create users table for authentication
        if (!Schema::hasTable('users')) {
            Schema::create('users', function ($table) {
                $table->id();
                $table->string('name');
                $table->string('username')->unique();
                $table->string('email')->unique();
                $table->timestamp('email_verified_at')->nullable();
                $table->string('password');
                $table->rememberToken();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('dokter')) {
            Schema::create('dokter', function ($table) {
                $table->string('kd_dokter')->primary();
                $table->string('nm_dokter');
                $table->enum('jk', ['L', 'P']);
                $table->string('tmp_lahir')->default('-');
                $table->date('tgl_lahir')->default('1900-01-01');
                $table->string('gol_drh')->default('-');
                $table->string('agama')->default('-');
                $table->string('almt_tgl')->default('-');
                $table->string('no_telp')->default('-');
                $table->string('stts_nikah')->default('-');
                $table->string('kd_sps')->default('-');
                $table->string('alumni')->default('-');
                $table->string('no_ijn_praktek')->default('-');
                $table->string('status')->default('1');
            });
        }

        if (!Schema::hasTable('poliklinik')) {
            Schema::create('poliklinik', function ($table) {
                $table->string('kd_poli')->primary();
                $table->string('nm_poli');
                $table->integer('registrasi')->default(0);
                $table->integer('registrasilama')->default(0);
                $table->string('status')->default('1');
            });
        }

        if (!Schema::hasTable('pasien')) {
            Schema::create('pasien', function ($table) {
                $table->string('no_rkm_medis')->primary();
                $table->string('nm_pasien');
                $table->string('no_ktp')->default('-');
                $table->enum('jk', ['L', 'P']);
                $table->string('tmp_lahir')->default('-');
                $table->date('tgl_lahir')->default('1900-01-01');
                $table->string('nm_ibu')->default('-');
                $table->string('alamat')->default('-');
                $table->string('gol_drh')->default('-');
                $table->string('pekerjaan')->default('-');
                $table->string('stts_nikah')->default('-');
                $table->string('agama')->default('-');
                $table->date('tgl_daftar')->default('2000-01-01');
                $table->string('no_tlp')->default('-');
                $table->string('umur')->default('-');
                $table->string('p_jawab')->default('-');
                $table->string('almt_pj')->default('-');
                $table->string('hubunganpj')->default('-');
                $table->string('no_peserta')->default('-');
                $table->string('email')->default('-');
            });
        }
        
        if (!Schema::hasTable('penjab')) {
             Schema::create('penjab', function ($table) {
                $table->string('kd_pj')->primary();
                $table->string('png_jawab');
                $table->string('nama_perusahaan')->default('-');
                $table->string('alamat_asuransi')->default('-');
                $table->string('no_telp')->default('-');
                $table->string('attn')->default('-');
            });
        }
        
        if (!Schema::hasTable('reg_periksa')) {
            Schema::create('reg_periksa', function ($table) {
                $table->string('no_rawat')->primary();
                $table->string('no_reg');
                $table->string('no_rkm_medis');
                $table->string('kd_dokter');
                $table->string('kd_poli');
                $table->date('tgl_registrasi');
                $table->time('jam_reg');
                $table->string('kd_pj');
                $table->string('status_lanjut');
                $table->string('stts');
                $table->string('p_jawab');
                $table->string('almt_pj');
                $table->string('hubunganpj');
                $table->double('biaya_reg');
                $table->string('stts_daftar');
                $table->integer('umurdaftar');
                $table->string('sttsumur');
                $table->string('status_bayar')->default('Belum Bayar');
            });
        }
        
        if (!Schema::hasTable('pcare_pendaftaran')) {
             Schema::create('pcare_pendaftaran', function ($table) {
                $table->string('no_rawat')->primary();
                $table->date('tglDaftar');
                $table->string('no_rkm_medis');
                $table->string('nm_pasien');
                $table->string('kdProviderPeserta');
                $table->string('noKartu');
                $table->string('kdPoli');
                $table->string('nmPoli');
                $table->integer('sistole');
                $table->integer('diastole');
                $table->integer('beratBadan');
                $table->integer('tinggiBadan');
                $table->integer('respRate');
                $table->integer('heartRate');
                $table->integer('lingkarPerut');
                $table->string('kdTkp');
                $table->string('noUrut');
                $table->string('status');
                $table->timestamps();
            });
        }
        
        if (!Schema::hasTable('maping_poliklinik_pcare')) {
            Schema::create('maping_poliklinik_pcare', function ($table) {
                 $table->string('kd_poli_rs')->primary();
                 $table->string('kd_poli_pcare');
                 $table->string('nm_poli_pcare');
            });
        }
    }

    /** @test */
    public function it_skips_registration_if_already_registered_successfully()
    {
        // 1. Arrange
        $noRawat = '2023/01/01/000001';
        $noUrut = 'A001';

        // Insert dependencies
        DB::table('dokter')->insert([
            'kd_dokter' => 'D001', 
            'nm_dokter' => 'Dr. Test',
            'jk' => 'L',
            'tgl_lahir' => '1980-01-01',
        ]);
        
        DB::table('poliklinik')->insert([
            'kd_poli' => 'POLI01', 
            'nm_poli' => 'Poli Test',
        ]);

        DB::table('pasien')->insert([
            'no_rkm_medis' => '123456', 
            'nm_pasien' => 'Pasien Test', 
            'no_ktp' => '1234567890123456', 
            'jk' => 'L', 
            'tgl_lahir' => '1990-01-01', 
            'no_peserta' => '0000000000001',
        ]);
        
        DB::table('penjab')->insert([
            'kd_pj' => 'BPJ', 
            'png_jawab' => 'BPJS Kesehatan',
        ]);

        DB::table('reg_periksa')->insert([
            'no_rawat' => $noRawat,
            'no_reg' => '001',
            'no_rkm_medis' => '123456',
            'kd_dokter' => 'D001',
            'kd_poli' => 'POLI01',
            'tgl_registrasi' => '2023-01-01',
            'jam_reg' => '08:00:00',
            'kd_pj' => 'BPJ', 
            'status_lanjut' => 'Ralan',
            'stts' => 'Belum',
            'p_jawab' => 'Keluarga',
            'almt_pj' => '-',
            'hubunganpj' => 'Diri Sendiri',
            'biaya_reg' => 0,
            'stts_daftar' => 'Lama',
            'umurdaftar' => 30,
            'sttsumur' => 'Th',
        ]);

        // Insert existing successful registration
        DB::table('pcare_pendaftaran')->insert([
            'no_rawat' => $noRawat,
            'tglDaftar' => '2023-01-01',
            'no_rkm_medis' => '123456',
            'nm_pasien' => 'Pasien Test',
            'kdProviderPeserta' => '12345',
            'noKartu' => '0000000000001',
            'kdPoli' => '001',
            'nmPoli' => 'Umum',
            'sistole' => 120,
            'diastole' => 80,
            'beratBadan' => 60,
            'tinggiBadan' => 170,
            'respRate' => 20,
            'heartRate' => 80,
            'lingkarPerut' => 0,
            'kdTkp' => '10',
            'noUrut' => $noUrut,
            'status' => 'Terkirim',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Log::shouldReceive('channel')->with('bpjs')->andReturnSelf();
        Log::shouldReceive('info')
            ->once()
            ->with('Lewati PCare pendaftaran: Sudah terdaftar sebelumnya', \Mockery::on(function ($data) use ($noRawat, $noUrut) {
                return $data['no_rawat'] === $noRawat && $data['noUrut'] === $noUrut;
            }));

        // 2. Act
        $user = User::factory()->create();
        $response = $this->actingAs($user)->postJson('/api/pcare/pendaftaran', [
            'no_rawat' => $noRawat,
            'tgl_perawatan' => '2023-01-01',
        ]);

        // 3. Assert
        $response->assertStatus(200)
            ->assertJson([
                'skipped' => true,
                'already_registered' => true,
                'metaData' => [
                    'message' => 'Pendaftaran sudah pernah dikirim ke BPJS.',
                    'code' => 200,
                ],
                'response' => [
                    'noUrut' => $noUrut,
                ]
            ]);
    }

    /** @test */
    public function it_proceeds_if_not_registered_yet()
    {
        $noRawat = '2023/01/01/000002';
        
        DB::table('dokter')->insert([
            'kd_dokter' => 'D002', 
            'nm_dokter' => 'Dr. Test 2',
            'jk' => 'L',
            'tgl_lahir' => '1980-01-01',
        ]);
        
        DB::table('poliklinik')->insert([
            'kd_poli' => 'POLI02', 
            'nm_poli' => 'Poli Test 2',
        ]);
        
        DB::table('penjab')->insert([
            'kd_pj' => 'BPJ', 
            'png_jawab' => 'BPJS Kesehatan',
        ]);

        DB::table('reg_periksa')->insert([
            'no_rawat' => $noRawat,
            'no_reg' => '002',
            'no_rkm_medis' => '999999', // Not existing in pasien table
            'kd_dokter' => 'D002',
            'kd_poli' => 'POLI02',
            'tgl_registrasi' => '2023-01-01',
            'jam_reg' => '08:00:00',
            'kd_pj' => 'BPJ',
            'status_lanjut' => 'Ralan',
            'stts' => 'Belum',
            'p_jawab' => 'Keluarga',
            'almt_pj' => '-',
            'hubunganpj' => 'Diri Sendiri',
            'biaya_reg' => 0,
            'stts_daftar' => 'Lama',
            'umurdaftar' => 30,
            'sttsumur' => 'Th',
            'status_bayar' => 'Belum Bayar'
        ]);

         $user = User::factory()->create();
         $response = $this->actingAs($user)->postJson('/api/pcare/pendaftaran', [
            'no_rawat' => $noRawat,
        ]);

        // Should NOT be 200 skipped.
        // Should be 404 because Pasien not found (we didn't insert patient).
        $response->assertStatus(404);
        $response->assertJsonMissing(['skipped' => true]);
    }
}
