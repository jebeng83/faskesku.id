<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class ModelHasPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $userModel = config('auth.providers.users.model') ?? \App\Models\User::class;

        $allPermNames = Permission::pluck('name')->all();
        if (! $allPermNames) {
            return;
        }

        $admins = method_exists($userModel, 'role')
            ? $userModel::role('admin')->get()
            : $userModel::query()->where('name', 'like', '%admin%')->get();

        if ($admins->isEmpty()) {
            $firstUser = $userModel::query()->first();
            if ($firstUser) {
                $firstUser->givePermissionTo(...$allPermNames);
            }
        } else {
            foreach ($admins as $user) {
                $user->givePermissionTo(...$allPermNames);
            }
        }

        app('cache')
            ->store(config('permission.cache.store') != 'default' ? config('permission.cache.store') : null)
            ->forget(config('permission.cache.key'));
    }
}

