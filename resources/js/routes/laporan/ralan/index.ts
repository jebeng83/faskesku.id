import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import kunjungan from './kunjungan'
import frekuensiPenyakit3ceec5 from './frekuensi-penyakit'
/**
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::frekuensiPenyakit
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:13
* @route '/laporan/ralan/frekuensi-penyakit'
*/
export const frekuensiPenyakit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: frekuensiPenyakit.url(options),
    method: 'get',
})

frekuensiPenyakit.definition = {
    methods: ["get","head"],
    url: '/laporan/ralan/frekuensi-penyakit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::frekuensiPenyakit
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:13
* @route '/laporan/ralan/frekuensi-penyakit'
*/
frekuensiPenyakit.url = (options?: RouteQueryOptions) => {
    return frekuensiPenyakit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::frekuensiPenyakit
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:13
* @route '/laporan/ralan/frekuensi-penyakit'
*/
frekuensiPenyakit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: frekuensiPenyakit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::frekuensiPenyakit
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:13
* @route '/laporan/ralan/frekuensi-penyakit'
*/
frekuensiPenyakit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: frekuensiPenyakit.url(options),
    method: 'head',
})

const ralan = {
    kunjungan: Object.assign(kunjungan, kunjungan),
    frekuensiPenyakit: Object.assign(frekuensiPenyakit, frekuensiPenyakit3ceec5),
}

export default ralan