<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display the authenticated user's profile.
     */
    public function show(Request $request)
    {
        $user = $request->user()->load('employee');
        $roles = method_exists($user, 'getRoleNames') ? $user->getRoleNames() : collect();

        return Inertia::render('Profile/index', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the authenticated user's profile.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $rules = [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
        ];

        $messages = [
            'name.required' => 'Nama harus diisi',
            'name.max' => 'Nama maksimal 255 karakter',
            'username.required' => 'Username harus diisi',
            'username.unique' => 'Username sudah digunakan',
            'username.max' => 'Username maksimal 255 karakter',
            'email.required' => 'Email harus diisi',
            'email.email' => 'Format email tidak valid',
            'email.unique' => 'Email sudah digunakan',
            'email.max' => 'Email maksimal 255 karakter',
        ];

        // Add password validation if password fields are provided
        if ($request->filled('current_password') || $request->filled('password')) {
            $rules['current_password'] = 'required|string';
            $rules['password'] = 'required|string|min:8|confirmed';

            $messages['current_password.required'] = 'Password saat ini harus diisi';
            $messages['password.required'] = 'Password baru harus diisi';
            $messages['password.min'] = 'Password minimal 8 karakter';
            $messages['password.confirmed'] = 'Konfirmasi password tidak sesuai';
        }

        $validated = $request->validate($rules, $messages);

        // Verify current password if changing password
        if ($request->filled('current_password')) {
            if (!Hash::check($request->current_password, $user->password)) {
                return back()->withErrors(['current_password' => 'Password saat ini tidak benar']);
            }

            // Hash new password
            $validated['password'] = Hash::make($request->password);
        }

        // Remove password confirmation field
        unset($validated['password_confirmation']);
        unset($validated['current_password']);

        $user->update($validated);

        return back()->with('success', 'Profile berhasil diperbarui');
    }
}
