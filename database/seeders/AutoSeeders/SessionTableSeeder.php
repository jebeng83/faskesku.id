<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SessionTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('sessions')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('sessions')->insert(array (
          0 => 
          array (
            'id' => '6t3LmiG4bN7ODzkqI24w3g5NLTkbE3HcehibN0Qb',
            'user_id' => 2,
            'ip_address' => '127.0.0.1',
            'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
            'payload' => 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiNVZoV0lFUEdOeXBhMnRLTXFnRENpWmI5ZVVZeFVQWWt1anNBVmJDaiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zZXR0aW5nL2FwcCI7czo1OiJyb3V0ZSI7czoxNzoic2V0dGluZy5hcHAuaW5kZXgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToyO30=',
            'last_activity' => 1763516655,
          ),
          1 => 
          array (
            'id' => 'Cc0v8HWlLDjRQisauQph6GhaTc4hfxA2AxLtroKq',
            'user_id' => NULL,
            'ip_address' => '127.0.0.1',
            'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Trae/1.104.3 Chrome/138.0.7204.251 Electron/37.6.1 Safari/537.36',
            'payload' => 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiajVPZVFVTFpYUlNGM212YlN5U0Z3bmpnZjlrYVlEZXVVYVlWUFJGMiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NjY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbj9pZGVfd2Vidmlld19yZXF1ZXN0X3RpbWU9MTc2MzUwNTI5Mjg0NiI7czo1OiJyb3V0ZSI7czo1OiJsb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',
            'last_activity' => 1763516649,
          ),
          2 => 
          array (
            'id' => 'v4C7zpvb5RnELOjgnPMAVwJazioqRKZNqae7rmqg',
            'user_id' => 2,
            'ip_address' => '127.0.0.1',
            'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
            'payload' => 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiMlVLZVlxUHhDWHh2ZkZQTHZKYVNpMEppc0I2eHdvYTRHd3ZPQm5OeCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zZXR0aW5nL2FwcCI7czo1OiJyb3V0ZSI7czoxNzoic2V0dGluZy5hcHAuaW5kZXgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToyO30=',
            'last_activity' => 1763520917,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}