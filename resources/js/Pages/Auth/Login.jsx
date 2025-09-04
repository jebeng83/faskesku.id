import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

function Login({ wallpaper, setting }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center"
            style={{
                backgroundImage: wallpaper ? `url(${wallpaper})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8">
                <div className="text-center mb-8">
                    {setting && setting.nama_instansi && (
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            {setting.nama_instansi}
                        </h2>
                    )}
                    <h1 className="text-3xl font-bold text-gray-900">Login</h1>
                    <p className="text-gray-600 mt-2">Masuk ke sistem SIMRS</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Masukkan email Anda"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Masukkan password Anda"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>
                    
                    <div className="mb-6">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                        </label>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {processing ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>
                
                {setting && (
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600">
                            {setting.alamat_instansi && (
                                <span className="block">{setting.alamat_instansi}</span>
                            )}
                            {setting.kontak && (
                                <span className="block mt-1">Telp: {setting.kontak}</span>
                            )}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
