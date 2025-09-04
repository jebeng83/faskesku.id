import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { toast } from '@/tools/toast';

export default function SetHargaObat({ auth, hargaObat, error }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        ralan: hargaObat?.ralan || 20,
        kelas1: hargaObat?.kelas1 || 20,
        kelas2: hargaObat?.kelas2 || 20,
        kelas3: hargaObat?.kelas3 || 20,
        utama: hargaObat?.utama || 20,
        vip: hargaObat?.vip || 20,
        vvip: hargaObat?.vvip || 20,
        beliluar: hargaObat?.beliluar || 20,
        jualbebas: hargaObat?.jualbebas || 20,
        karyawan: hargaObat?.karyawan || 20
    });

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('set-harga-obat.update'), {
            onSuccess: () => {
                toast.success('Pengaturan harga obat berhasil disimpan');
            },
            onError: (errors) => {
                console.error(errors);
                toast.error('Terjadi kesalahan saat menyimpan pengaturan');
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pengaturan Harga Obat</h2>}
        >
            <Head title="Pengaturan Harga Obat" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Pengaturan Persentase Harga Jual Obat</h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Pengaturan ini digunakan untuk menentukan persentase markup harga jual obat dari harga beli.
                                        Nilai yang dimasukkan adalah dalam bentuk persentase (%).
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* Rawat Jalan */}
                                    <div>
                                        <InputLabel htmlFor="ralan" value="Rawat Jalan (%)" />
                                        <TextInput
                                            id="ralan"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="mt-1 block w-full"
                                            value={data.ralan}
                                            onChange={(e) => setData('ralan', e.target.value)}
                                        />
                                        <InputError message={errors.ralan} className="mt-2" />
                                    </div>

                                    {/* Kelas 1 */}
                                    <div>
                                        <InputLabel htmlFor="kelas1" value="Kelas 1 (%)" />
                                        <TextInput
                                            id="kelas1"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="mt-1 block w-full"
                                            value={data.kelas1}
                                            onChange={(e) => setData('kelas1', e.target.value)}
                                        />
                                        <InputError message={errors.kelas1} className="mt-2" />
                                    </div>

                                    {/* Kelas 2 */}
                                    <div>
                                        <InputLabel htmlFor="kelas2" value="Kelas 2 (%)" />
                                        <TextInput
                                            id="kelas2"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="mt-1 block w-full"
                                            value={data.kelas2}
                                            onChange={(e) => setData('kelas2', e.target.value)}
                                        />
                                        <InputError message={errors.kelas2} className="mt-2" />
                                    </div>

                                    {/* Kelas 3 */}
                                    <div>
                                        <InputLabel htmlFor="kelas3" value="Kelas 3 (%)" />
                                        <TextInput
                                            id="kelas3"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="mt-1 block w-full"
                                            value={data.kelas3}
                                            onChange={(e) => setData('kelas3', e.target.value)}
                                        />
                                        <InputError message={errors.kelas3} className="mt-2" />
                                    </div>

                                    {/* Utama */}
                                    <div>
                                        <InputLabel htmlFor="utama" value="Kelas Utama (%)" />
                                        <TextInput
                                            id="utama"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="mt-1 block w-full"
                                            value={data.utama}
                                            onChange={(e) => setData('utama', e.target.value)}
                                        />
                                        <InputError message={errors.utama} className="mt-2" />
                                    </div>

                                    {/* VIP */}
                                    <div>
                                        <InputLabel htmlFor="vip" value="VIP (%)" />
                                        <TextInput
                                            id="vip"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="mt-1 block w-full"
                                            value={data.vip}
                                            onChange={(e) => setData('vip', e.target.value)}
                                        />
                                        <InputError message={errors.vip} className="mt-2" />
                                    </div>

                                    {/* VVIP */}
                                    <div>
                                        <InputLabel htmlFor="vvip" value="VVIP (%)" />
                                        <TextInput
                                            id="vvip"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="mt-1 block w-full"
                                            value={data.vvip}
                                            onChange={(e) => setData('vvip', e.target.value)}
                                        />
                                        <InputError message={errors.vvip} className="mt-2" />
                                    </div>

                                    {/* Beli Luar */}
                                    <div>
                                        <InputLabel htmlFor="beliluar" value="Beli Luar (%)" />
                                        <TextInput
                                            id="beliluar"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="mt-1 block w-full"
                                            value={data.beliluar}
                                            onChange={(e) => setData('beliluar', e.target.value)}
                                        />
                                        <InputError message={errors.beliluar} className="mt-2" />
                                    </div>

                                    {/* Jual Bebas */}
                                    <div>
                                        <InputLabel htmlFor="jualbebas" value="Jual Bebas (%)" />
                                        <TextInput
                                            id="jualbebas"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="mt-1 block w-full"
                                            value={data.jualbebas}
                                            onChange={(e) => setData('jualbebas', e.target.value)}
                                        />
                                        <InputError message={errors.jualbebas} className="mt-2" />
                                    </div>

                                    {/* Karyawan */}
                                    <div>
                                        <InputLabel htmlFor="karyawan" value="Karyawan (%)" />
                                        <TextInput
                                            id="karyawan"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="mt-1 block w-full"
                                            value={data.karyawan}
                                            onChange={(e) => setData('karyawan', e.target.value)}
                                        />
                                        <InputError message={errors.karyawan} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-8">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}