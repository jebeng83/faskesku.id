<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use App\Models\User;

class PcareKunjunganStoreTest extends TestCase
{
    protected function ensurePcareConfig(): void
    {
        config([
            'bpjs.pcare.base_url' => 'https://pcare.test',
            'bpjs.pcare.cons_id' => 'cid',
            'bpjs.pcare.cons_pwd' => 'cpwd',
            'bpjs.pcare.user' => 'user',
            'bpjs.pcare.pass' => 'pass',
            'bpjs.pcare.app_code' => 'app',
            'bpjs.pcare.kode_ppk' => 'PPK',
        ]);
        if (! Schema::hasTable('setting_bridging_bpjs')) {
            Schema::create('setting_bridging_bpjs', function (Blueprint $table) {
                $table->id();
                $table->string('cons_id_pcare')->nullable();
                $table->string('secretkey_pcare')->nullable();
                $table->string('userkey_pcare')->nullable();
                $table->string('user_pcare')->nullable();
                $table->string('pass_pcare')->nullable();
            });
        }
        \Illuminate\Support\Facades\DB::table('setting_bridging_bpjs')->updateOrInsert(['id' => 1], [
            'cons_id_pcare' => 'cid',
            'secretkey_pcare' => 'cpwd',
            'userkey_pcare' => 'ukey',
            'user_pcare' => 'user',
            'pass_pcare' => 'pass',
        ]);
        if (! Schema::hasTable('setting')) {
            Schema::create('setting', function (Blueprint $table) {
                $table->id();
                $table->string('kode_ppk')->nullable();
            });
        }
        \Illuminate\Support\Facades\DB::table('setting')->updateOrInsert(['id' => 1], [
            'kode_ppk' => 'PPK',
        ]);
    }

    public function test_sanitizes_rujuk_lanjut_and_sets_json_content_type(): void
    {
        $this->actingAs(User::factory()->make());
        $this->ensurePcareConfig();
        $captured = [];
        config(['bpjs.pcare.kunjungan_content_type' => 'text/plain']);
        Http::fake([
            'https://pcare.test/kunjungan/v1' => function ($request) use (&$captured) {
                $captured['content_type'] = $request->hasHeader('Content-Type') ? $request->header('Content-Type') : null;
                $body = $request->body();
                $captured['data'] = is_string($body) ? (json_decode($body, true) ?: []) : (array) $request->data();
                return Http::response('{"metaData":{"message":"Sukses","code":201},"response":{}}', 201);
            },
        ]);

        $payload = [
            'tglDaftar' => '2025-01-02',
            'noKartu' => '0000000000000',
            'kdPoli' => '001',
            'kdTacc' => 0,
            'rujukLanjut' => null,
        ];
        $res = $this->postJson('/api/pcare/kunjungan', $payload);
        $res->assertStatus(201);

        $this->assertSame('text/plain', is_array($captured['content_type']) ? $captured['content_type'][0] : $captured['content_type']);
        $this->assertArrayHasKey('tglDaftar', $captured['data']);
        $this->assertSame('02-01-2025', $captured['data']['tglDaftar']);
        $this->assertSame(-1, $captured['data']['kdTacc']);
        $this->assertArrayNotHasKey('rujukLanjut', $captured['data']);
    }

    public function test_normalizes_rujuk_lanjut_fields_and_date(): void
    {
        $this->actingAs(User::factory()->make());
        $this->ensurePcareConfig();
        $captured = [];
        config(['bpjs.pcare.kunjungan_content_type' => 'text/plain']);
        Http::fake([
            'https://pcare.test/kunjungan/v1' => function ($request) use (&$captured) {
                $body = $request->body();
                $captured['data'] = is_string($body) ? (json_decode($body, true) ?: []) : (array) $request->data();
                return Http::response('{"metaData":{"message":"Sukses","code":201},"response":{}}', 201);
            },
        ]);

        $payload = [
            'tglDaftar' => '2025-01-03',
            'noKartu' => '0000000000000',
            'kdPoli' => '001',
            'kdTacc' => -1,
            'rujukLanjut' => [
                'khusus' => null,
                'subSpesialis' => [],
                'tglEstRujuk' => '2025-01-10',
            ],
        ];
        $res = $this->postJson('/api/pcare/kunjungan', $payload);
        $res->assertStatus(201);

        $this->assertArrayHasKey('rujukLanjut', $captured['data']);
        $this->assertArrayHasKey('tglEstRujuk', $captured['data']['rujukLanjut']);
        $this->assertSame('10-01-2025', $captured['data']['rujukLanjut']['tglEstRujuk']);
        $this->assertArrayNotHasKey('khusus', $captured['data']['rujukLanjut']);
        $this->assertArrayNotHasKey('subSpesialis', $captured['data']['rujukLanjut']);
    }
}
