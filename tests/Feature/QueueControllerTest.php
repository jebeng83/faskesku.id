<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class QueueControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_finish_endpoint_updates_status_and_timestamp(): void
    {
        $create = $this->postJson('/api/queue/tickets?channel=kiosk&prefix=A');
        $create->assertStatus(201)->assertJson(['ok' => true]);
        $nomor = $create->json('nomor');

        $finish = $this->postJson('/api/queue/finish', ['nomor' => $nomor]);
        $finish->assertStatus(200)->assertJson(['ok' => true, 'status' => 'dicetak']);

        $row = DB::table('antriloket')->where('nomor', $nomor)->first();
        $this->assertNotNull($row);
        $this->assertEquals('dicetak', $row->status);
        $this->assertNotNull($row->dicetak_pada);
    }

    public function test_cancel_endpoint_updates_status_and_timestamp(): void
    {
        $create = $this->postJson('/api/queue/tickets?channel=kiosk&prefix=B');
        $create->assertStatus(201)->assertJson(['ok' => true]);
        $nomor = $create->json('nomor');

        $cancel = $this->postJson('/api/queue/cancel', ['nomor' => $nomor]);
        $cancel->assertStatus(200)->assertJson(['ok' => true, 'status' => 'batal']);

        $row = DB::table('antriloket')->where('nomor', $nomor)->first();
        $this->assertNotNull($row);
        $this->assertEquals('batal', $row->status);
        $this->assertNotNull($row->dibatalkan_pada);
    }
}

