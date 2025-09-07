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
            <div className="max-w-md w-full p-8">
                <div className="text-center mb-8">
                    {setting && setting.nama_instansi && (
                        <h2 className="text-xl font-semibold text-white mb-2">
                            {setting.nama_instansi}
                        </h2>
                    )}
                    <h1 className="text-3xl font-bold text-white">Login</h1>
                    <div className="w-16 h-1 bg-cyan-400 mx-auto mt-2"></div>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 border-white/50 rounded-none focus:outline-none focus:ring-0 focus:border-cyan-400 transition-colors text-white placeholder-white/70 ${
                                errors.email ? 'border-red-500' : 'border-white/50'
                            }`}
                            placeholder="Masukkan email Anda"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 border-white/50 rounded-none focus:outline-none focus:ring-0 focus:border-cyan-400 transition-colors text-white placeholder-white/70 ${
                                errors.password ? 'border-red-500' : 'border-white/50'
                            }`}
                            placeholder="Masukkan password Anda"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>
                    
                    <div className="flex items-center mb-6">
                        <input
                            id="remember"
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="h-4 w-4 text-cyan-400 focus:ring-cyan-400 border-white/50 rounded bg-transparent"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-white">
                            Ingat saya
                        </label>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 py-3 text-lg font-semibold text-white rounded-lg"
                    >
                        {processing ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>
                
                {setting && (
                    <div className="mt-8 pt-6 border-t border-white/20 text-center">
                        <p className="text-sm text-white/80">
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
