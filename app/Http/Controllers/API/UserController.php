<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\User;
use App\Rules\StrongPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with(['employee', 'roles', 'permissions']);

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('nik', 'like', "%{$search}%");
            });
        }

        // Filter by role
        if ($request->has('role') && $request->role) {
            $query->role($request->role);
        }

        $users = $query->orderBy('created_at', 'desc')->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'nullable|string|email|max:255|unique:users,email',
            'password' => ['required', 'string', 'min:8', 'confirmed', new StrongPassword],
            // Ensure nik refers to an existing pegawai, and remains unique per users
            'nik' => 'nullable|string|max:20|exists:pegawai,nik|unique:users,nik',
            'roles' => 'array',
            'roles.*' => 'exists:roles,name',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'nik' => $request->nik,
        ]);

        // Assign roles
        if ($request->has('roles') && is_array($request->roles)) {
            $user->assignRole($request->roles);
        }

        $user->load(['employee', 'roles', 'permissions']);

        return response()->json([
            'success' => true,
            'message' => 'User berhasil dibuat',
            'data' => $user,
        ], 201);
    }

    public function show(User $user)
    {
        $user->load(['employee', 'roles', 'permissions']);

        return response()->json([
            'success' => true,
            'data' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,'.$user->id,
            'email' => 'nullable|string|email|max:255|unique:users,email,'.$user->id,
            'password' => ['nullable', 'string', 'min:8', 'confirmed', new StrongPassword],
            // Ensure nik refers to an existing pegawai, and remains unique per users
            'nik' => 'nullable|string|max:20|exists:pegawai,nik|unique:users,nik,'.$user->id,
            'roles' => 'array',
            'roles.*' => 'exists:roles,name',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $updateData = [
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'nik' => $request->nik,
        ];

        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $user->update($updateData);

        // Sync roles
        if ($request->has('roles')) {
            $user->syncRoles($request->roles);
        }

        $user->load(['employee', 'roles', 'permissions']);

        return response()->json([
            'success' => true,
            'message' => 'User berhasil diperbarui',
            'data' => $user,
        ]);
    }

    public function destroy(User $user)
    {
        // Prevent deleting the last admin user
        if ($user->hasRole('admin') && User::role('admin')->count() <= 1) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak dapat menghapus admin terakhir',
            ], 422);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User berhasil dihapus',
        ]);
    }

    public function getRoles()
    {
        $roles = Role::with('permissions')->get();

        return response()->json([
            'success' => true,
            'data' => $roles,
        ]);
    }

    public function getPermissions()
    {
        $permissions = Permission::all();

        return response()->json([
            'success' => true,
            'data' => $permissions,
        ]);
    }

    public function getEmployees()
    {
        $employees = Employee::select('nik', 'nama', 'jbtn')->get();

        return response()->json([
            'success' => true,
            'data' => $employees,
        ]);
    }

    public function legacyOptions(Request $request)
    {
        if (! Schema::hasTable('user')) {
            return response()->json([
                'success' => true,
                'data' => [],
            ]);
        }

        $search = trim((string) $request->get('search', ''));

        try {
            $query = DB::table('user')
                ->selectRaw("
                    CAST(AES_DECRYPT(user.id_user, 'nur') AS CHAR(700)) as username_plain,
                    pegawai.nik as nik,
                    pegawai.nama as nama
                ")
                ->leftJoin(
                    'pegawai',
                    DB::raw("CAST(AES_DECRYPT(user.id_user, 'nur') AS CHAR(700))"),
                    '=',
                    'pegawai.nik'
                )
                ->groupBy('username_plain', 'pegawai.nik', 'pegawai.nama')
                ->orderBy('username_plain');

            if ($search !== '') {
                $like = '%'.mb_strtolower($search).'%';
                $query->where(function ($q) use ($like) {
                    $q->whereRaw(
                        "LOWER(CAST(AES_DECRYPT(user.id_user, 'nur') AS CHAR(700))) like ?",
                        [$like]
                    )->orWhereRaw(
                        "LOWER(pegawai.nama) like ?",
                        [$like]
                    );
                });
            }

            $rows = $query->limit(20)->get();

            $data = $rows->map(function ($row) {
                $username = (string) ($row->username_plain ?? '');
                $nama = (string) ($row->nama ?? '');
                $nik = (string) ($row->nik ?? '');

                $labelParts = [];
                if ($nama !== '') {
                    $labelParts[] = $nama;
                }
                if ($username !== '') {
                    $labelParts[] = $username;
                }

                return [
                    'username' => $username,
                    'nama' => $nama,
                    'nik' => $nik,
                    'label' => implode(' - ', $labelParts) !== '' ? implode(' - ', $labelParts) : $username,
                ];
            })->filter(fn ($row) => $row['username'] !== '')->values();

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Throwable $e) {
            Log::error('Legacy user options query failed', [
                'search' => $search,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => true,
                'data' => [],
            ]);
        }
    }

    public function checkUserByNik($nik)
    {
        $user = User::where('nik', $nik)->with(['roles'])->first();

        if ($user) {
            return response()->json([
                'success' => true,
                'exists' => true,
                'data' => $user,
            ]);
        }

        return response()->json([
            'success' => true,
            'exists' => false,
            'data' => null,
        ]);
    }

    public function updatePassword(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'password' => ['required', 'string', 'min:8', 'confirmed', new StrongPassword],
            'current_password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Verify current password
        if (! Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Password saat ini tidak sesuai',
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password berhasil diperbarui',
        ]);
    }

    public function importFromLegacy(Request $request)
    {
        if (! Schema::hasTable('user')) {
            return response()->json([
                'success' => false,
                'message' => 'Tabel legacy user tidak tersedia',
            ], 422);
        }

        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'roles' => 'array',
            'roles.*' => 'exists:roles,name',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $legacyUser = DB::table('user')
                ->selectRaw("CAST(AES_DECRYPT(id_user, 'nur') AS CHAR(700)) as username_plain, CAST(AES_DECRYPT(password, 'windi') AS CHAR(255)) as password_plain")
                ->whereRaw("CAST(AES_DECRYPT(id_user, 'nur') AS CHAR(700)) = ?", [$request->username])
                ->first();
        } catch (\Throwable $e) {
            Log::error('Import legacy user query failed', [
                'username' => $request->username,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal membaca data dari tabel legacy user',
            ], 500);
        }

        if (! $legacyUser) {
            return response()->json([
                'success' => false,
                'message' => 'User legacy tidak ditemukan',
            ], 404);
        }

        $usernamePlain = (string) ($legacyUser->username_plain ?? '');
        $passwordPlain = (string) ($legacyUser->password_plain ?? '');

        if ($usernamePlain === '' || $passwordPlain === '') {
            return response()->json([
                'success' => false,
                'message' => 'Data legacy tidak valid',
            ], 422);
        }

        $employee = Employee::where('nik', $usernamePlain)->first();

        $attributes = [
            'name' => $employee ? (string) $employee->nama : $usernamePlain,
            'email' => null,
            'password' => Hash::make($passwordPlain),
        ];

        if ($employee) {
            $attributes['nik'] = (string) $employee->nik;
        }

        $user = User::updateOrCreate(
            ['username' => $usernamePlain],
            $attributes
        );

        if ($request->has('roles')) {
            $user->syncRoles($request->roles);
        } elseif ($user->roles()->count() === 0) {
            try {
                $user->assignRole('petugas');
            } catch (\Throwable $e) {
                Log::warning('Failed to assign default role on legacy import', [
                    'user_id' => $user->id,
                    'username' => $user->username,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        $user->load(['employee', 'roles', 'permissions']);

        return response()->json([
            'success' => true,
            'message' => 'User legacy berhasil diimpor',
            'data' => $user,
        ]);
    }

    public function importAllFromLegacy(Request $request)
    {
        if (! Schema::hasTable('user')) {
            return response()->json([
                'success' => false,
                'message' => 'Tabel legacy user tidak tersedia',
            ], 422);
        }

        $validator = Validator::make($request->all(), [
            'roles' => 'array',
            'roles.*' => 'exists:roles,name',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $roles = $request->get('roles', []);

        try {
            $rows = DB::table('user')
                ->selectRaw("CAST(AES_DECRYPT(id_user, 'nur') AS CHAR(700)) as username_plain, CAST(AES_DECRYPT(password, 'windi') AS CHAR(255)) as password_plain")
                ->get();
        } catch (\Throwable $e) {
            Log::error('Import all legacy users query failed', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal membaca data dari tabel legacy user',
            ], 500);
        }

        $created = 0;
        $updated = 0;
        $skipped = 0;

        foreach ($rows as $legacyUser) {
            $usernamePlain = (string) ($legacyUser->username_plain ?? '');
            $passwordPlain = (string) ($legacyUser->password_plain ?? '');

            if ($usernamePlain === '' || $passwordPlain === '') {
                $skipped++;
                continue;
            }

            $employee = Employee::where('nik', $usernamePlain)->first();

            $attributes = [
                'name' => $employee ? (string) $employee->nama : $usernamePlain,
                'email' => null,
                'password' => Hash::make($passwordPlain),
            ];

            if ($employee) {
                $attributes['nik'] = (string) $employee->nik;
            }

            $existing = User::where('username', $usernamePlain)->first();

            $user = User::updateOrCreate(
                ['username' => $usernamePlain],
                $attributes
            );

            if ($existing) {
                $updated++;
            } else {
                $created++;
            }

            if (! empty($roles)) {
                $user->syncRoles($roles);
            } elseif ($user->roles()->count() === 0) {
                try {
                    $user->assignRole('petugas');
                } catch (\Throwable $e) {
                    Log::warning('Failed to assign default role on bulk legacy import', [
                        'user_id' => $user->id,
                        'username' => $user->username,
                        'error' => $e->getMessage(),
                    ]);
                }
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Import user legacy selesai',
            'summary' => [
                'created' => $created,
                'updated' => $updated,
                'skipped' => $skipped,
            ],
        ]);
    }
}
