import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import wilayah from './wilayah'
import pasien from './pasien'
import penjab from './penjab'
import perusahaanPasien from './perusahaan-pasien'
import sukuBangsa from './suku-bangsa'
import bahasaPasien from './bahasa-pasien'
import cacatFisik from './cacat-fisik'
import sipPegawai from './sip-pegawai'
/**
* @see \App\Http\Controllers\API\DokterController::dokter
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/public/dokter'
*/
export const dokter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

dokter.definition = {
    methods: ["get","head"],
    url: '/api/public/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\DokterController::dokter
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/public/dokter'
*/
dokter.url = (options?: RouteQueryOptions) => {
    return dokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\DokterController::dokter
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/public/dokter'
*/
dokter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\DokterController::dokter
* @see app/Http/Controllers/API/DokterController.php:14
* @route '/api/public/dokter'
*/
dokter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dokter.url(options),
    method: 'head',
})

const publicMethod = {
    wilayah: Object.assign(wilayah, wilayah),
    pasien: Object.assign(pasien, pasien),
    penjab: Object.assign(penjab, penjab),
    perusahaanPasien: Object.assign(perusahaanPasien, perusahaanPasien),
    sukuBangsa: Object.assign(sukuBangsa, sukuBangsa),
    bahasaPasien: Object.assign(bahasaPasien, bahasaPasien),
    cacatFisik: Object.assign(cacatFisik, cacatFisik),
    dokter: Object.assign(dokter, dokter),
    sipPegawai: Object.assign(sipPegawai, sipPegawai),
}

export default publicMethod