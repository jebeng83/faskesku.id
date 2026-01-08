<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\RegPeriksa;
use App\Models\Pasien;
use App\Models\Dokter;
use App\Models\Poliklinik;
use App\Models\Penjab;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Tests\TestCase;

class RawatInapTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Manually create tables if they don't exist (because they might be in generated folder not picked up by RefreshDatabase)
        if (!Schema::hasTable('bangsal')) {
            Schema::create('bangsal', function (Blueprint $table) {
                $table->char('kd_bangsal', 5)->primary();
                $table->string('nm_bangsal', 30)->nullable()->index();
                $table->enum('status', ['0', '1'])->nullable()->index();
            });
        }

        if (!Schema::hasTable('kamar')) {
            Schema::create('kamar', function (Blueprint $table) {
                $table->string('kd_kamar', 15)->primary();
                $table->char('kd_bangsal', 5)->nullable()->index();
                $table->double('trf_kamar')->nullable()->index();
                $table->enum('status', ['ISI', 'KOSONG', 'DIBERSIHKAN', 'DIBOOKING'])->nullable()->index();
                $table->enum('kelas', ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas Utama', 'Kelas VIP', 'Kelas VVIP'])->nullable()->index();
                $table->enum('statusdata', ['0', '1'])->nullable()->index();
            });
        }

        if (!Schema::hasTable('kamar_inap')) {
            Schema::create('kamar_inap', function (Blueprint $table) {
                $table->string('no_rawat', 17)->default('');
                $table->string('kd_kamar', 15)->index();
                $table->double('trf_kamar')->nullable()->index();
                $table->string('diagnosa_awal', 100)->nullable()->index();
                $table->string('diagnosa_akhir', 100)->nullable()->index();
                $table->date('tgl_masuk')->default('0000-00-00');
                $table->time('jam_masuk')->default('00:00:00');
                $table->date('tgl_keluar')->nullable()->index();
                $table->time('jam_keluar')->nullable()->index();
                $table->double('lama')->nullable()->index();
                $table->double('ttl_biaya')->nullable()->index();
                $table->enum('stts_pulang', ['Sehat', 'Rujuk', 'APS', '+', 'Meninggal', 'Sembuh', 'Membaik', 'Pulang Paksa', '-', 'Pindah Kamar', 'Status Belum Lengkap', 'Atas Persetujuan Dokter', 'Atas Permintaan Sendiri', 'Isoman', 'Lain-lain'])->index();
                $table->primary(['no_rawat', 'tgl_masuk', 'jam_masuk']);
            });
        }

        if (!Schema::hasTable('kelurahan')) {
            Schema::create('kelurahan', function (Blueprint $table) {
                $table->integer('kd_kel', true);
                $table->string('nm_kel', 60)->unique('nm_kel');
            });
        }

        if (!Schema::hasTable('kecamatan')) {
            Schema::create('kecamatan', function (Blueprint $table) {
                $table->integer('kd_kec', true);
                $table->string('nm_kec', 60)->unique('nm_kec');
            });
        }

        if (!Schema::hasTable('kabupaten')) {
            Schema::create('kabupaten', function (Blueprint $table) {
                $table->integer('kd_kab', true);
                $table->string('nm_kab', 60)->unique('nm_kab');
            });
        }

        // Drop pasien table if exists to ensure we have all required columns (migration might be minimal)
        Schema::dropIfExists('pasien');
        Schema::create('pasien', function (Blueprint $table) {
            $table->string('no_rkm_medis', 15)->primary();
            $table->string('nm_pasien', 100);
            $table->string('no_ktp', 20)->nullable();
            $table->enum('jk', ['L', 'P']);
            $table->string('tmp_lahir', 15)->nullable();
            $table->date('tgl_lahir')->nullable();
            $table->string('nm_ibu', 100)->nullable();
            $table->string('alamat', 200)->nullable();
            $table->enum('gol_drh', ['A', 'B', 'O', 'AB', '-'])->nullable();
            $table->string('pekerjaan', 60)->nullable();
            $table->enum('stts_nikah', ['BELUM MENIKAH', 'MENIKAH', 'JANDA', 'DUDHA', 'JOMBLO'])->nullable();
            $table->string('agama', 12)->nullable();
            $table->date('tgl_daftar')->nullable();
            $table->string('no_tlp', 40)->nullable();
            $table->string('umur', 30)->nullable();
            $table->string('p_jawab', 100)->nullable();
            $table->string('alamatpj', 200)->nullable();
            $table->string('hubunganpj', 20)->nullable();
            $table->double('biaya_reg')->nullable();
            $table->enum('stts', ['Aktif', 'Pindah', 'Meninggal', 'Keluar'])->nullable();
            $table->integer('kd_kel')->nullable();
            $table->integer('kd_kec')->nullable();
            $table->integer('kd_kab')->nullable();
            $table->integer('kd_prop')->nullable();
        });

        // Seed necessary reference tables if they don't exist
        if (DB::table('bangsal')->count() == 0) {
            DB::table('bangsal')->insert(['kd_bangsal' => 'B01', 'nm_bangsal' => 'Mawar']);
        }
        if (DB::table('kamar')->count() == 0) {
            DB::table('kamar')->insert([
                'kd_kamar' => 'K01',
                'kd_bangsal' => 'B01',
                'trf_kamar' => 100000,
                'status' => 'ISI',
                'kelas' => 'Kelas 1',
                'statusdata' => '1'
            ]);
        }
        if (DB::table('kelurahan')->count() == 0) {
            DB::table('kelurahan')->insert(['kd_kel' => '1', 'nm_kel' => 'Kelurahan A']);
        }
        if (DB::table('kecamatan')->count() == 0) {
            DB::table('kecamatan')->insert(['kd_kec' => '1', 'nm_kec' => 'Kecamatan B']);
        }
        if (DB::table('kabupaten')->count() == 0) {
            DB::table('kabupaten')->insert(['kd_kab' => '1', 'nm_kab' => 'Kabupaten C']);
        }
        if (DB::table('dokter')->count() == 0) {
            DB::table('dokter')->insert(['kd_dokter' => 'D01', 'nm_dokter' => 'Dr. X', 'jk' => 'L', 'tmp_lahir' => 'X', 'tgl_lahir' => '1980-01-01', 'gol_drh' => 'A', 'agama' => 'Islam', 'almt_tgl' => 'X', 'no_telp' => '081', 'stts_nikah' => 'MENIKAH', 'kd_sps' => '-', 'alumni' => '-', 'no_ijn_praktek' => '-', 'status' => '1']);
        }
        if (DB::table('penjab')->count() == 0) {
            DB::table('penjab')->insert(['kd_pj' => 'P01', 'png_jawab' => 'Umum', 'nama_perusahaan' => '-', 'alamat_perusahaan' => '-', 'no_telp' => '-', 'attn' => '-']);
        }
        if (DB::table('poliklinik')->count() == 0) {
            DB::table('poliklinik')->insert(['kd_poli' => 'IGD', 'nm_poli' => 'IGD', 'registrasi' => 10000, 'registrasilama' => 10000, 'status' => '1']);
        }
    }

    public function test_rawat_inap_page_loads()
    {
        $user = User::factory()->create();
        
        // Create Patient
        DB::table('pasien')->insert([
            'no_rkm_medis' => '000001',
            'nm_pasien' => 'Pasien Test',
            'no_ktp' => '1234567890123456',
            'jk' => 'L',
            'tmp_lahir' => 'Jakarta',
            'tgl_lahir' => '1990-01-01',
            'nm_ibu' => 'Ibu Test',
            'alamat' => 'Jl. Test',
            'gol_drh' => 'A',
            'pekerjaan' => 'Swasta',
            'stts_nikah' => 'MENIKAH',
            'agama' => 'ISLAM',
            'tgl_daftar' => '2023-01-01',
            'no_tlp' => '08123456789',
            'umur' => '30 Th',
            'p_jawab' => 'Keluarga',
            'alamatpj' => 'Jl. Test',
            'hubunganpj' => 'Istri',
            'biaya_reg' => 10000,
            'stts' => 'Aktif',
            'kd_kel' => '1',
            'kd_kec' => '1',
            'kd_kab' => '1',
            'kd_prop' => '1', // Assuming prop exists or not needed for join? It's not in the join list.
        ]);

        // Create Registration
        DB::table('reg_periksa')->insert([
            'no_reg' => '001',
            'no_rawat' => '2023/01/01/000001',
            'tgl_registrasi' => '2023-01-01',
            'jam_reg' => '08:00:00',
            'kd_dokter' => 'D01',
            'no_rkm_medis' => '000001',
            'kd_poli' => 'IGD',
            'p_jawab' => 'Keluarga',
            'almt_pj' => 'Jl. Test',
            'hubunganpj' => 'Istri',
            'biaya_reg' => 10000,
            'stts' => 'Belum',
            'stts_daftar' => 'Lama',
            'status_lanjut' => 'Ranap',
            'kd_pj' => 'P01',
            'umurdaftar' => 30,
            'sttsumur' => 'Th',
            'status_bayar' => 'Belum Bayar'
        ]);

        // Create Kamar Inap
        DB::table('kamar_inap')->insert([
            'no_rawat' => '2023/01/01/000001',
            'kd_kamar' => 'K01',
            'trf_kamar' => 100000,
            'diagnosa_awal' => 'Demam',
            'diagnosa_akhir' => '-',
            'tgl_masuk' => '2023-01-01',
            'jam_masuk' => '09:00:00',
            'tgl_keluar' => '0000-00-00',
            'jam_keluar' => '00:00:00',
            'lama' => 1,
            'ttl_biaya' => 0,
            'stts_pulang' => '-',
        ]);

        $response = $this->actingAs($user)->get(route('rawat-inap.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('RawatInap/Index')
            ->has('rawatInap.data', 1)
            ->where('rawatInap.data.0.no_rawat', '2023/01/01/000001')
            ->where('rawatInap.data.0.nm_pasien', 'Pasien Test')
            ->where('rawatInap.data.0.alamat', 'Jl. Test, Kelurahan A, Kecamatan B, Kabupaten C')
            ->where('rawatInap.data.0.kamar', 'K01 Mawar')
            ->where('rawatInap.data.0.stts_pulang', '-')
        );
    }
}
