import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayoutError from '@/Layouts/AppLayoutError';

export default function AccessDenied({ message = 'Maaf, User Anda tidak mempunyak akses ke halaman ini' }) {
  return (
    <AppLayoutError title="Akses Ditolak">
      <Head title="403 - Akses Ditolak" />
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-xl">
          <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm p-6">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold">Akses Ditolak</h1>
            </div>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{message}</p>
            <div className="mt-6">
              <Link href="/dashboard" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Kembali ke Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayoutError>
  );
}
