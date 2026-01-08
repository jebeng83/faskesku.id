import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import kunjungan from './kunjungan'
import frekuensiPenyakit3ceec5 from './frekuensi-penyakit'
import surveilansPenyakit2ae9e7 from './surveilans-penyakit'
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

/**
* @see \App\Http\Controllers\SurveilansPenyakitRalanController::surveilansPenyakit
* @see app/Http/Controllers/SurveilansPenyakitRalanController.php:11
* @route '/laporan/ralan/surveilans-penyakit'
*/
export const surveilansPenyakit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: surveilansPenyakit.url(options),
    method: 'get',
})

surveilansPenyakit.definition = {
    methods: ["get","head"],
    url: '/laporan/ralan/surveilans-penyakit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SurveilansPenyakitRalanController::surveilansPenyakit
* @see app/Http/Controllers/SurveilansPenyakitRalanController.php:11
* @route '/laporan/ralan/surveilans-penyakit'
*/
surveilansPenyakit.url = (options?: RouteQueryOptions) => {
    return surveilansPenyakit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SurveilansPenyakitRalanController::surveilansPenyakit
* @see app/Http/Controllers/SurveilansPenyakitRalanController.php:11
* @route '/laporan/ralan/surveilans-penyakit'
*/
surveilansPenyakit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: surveilansPenyakit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SurveilansPenyakitRalanController::surveilansPenyakit
* @see app/Http/Controllers/SurveilansPenyakitRalanController.php:11
* @route '/laporan/ralan/surveilans-penyakit'
*/
surveilansPenyakit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: surveilansPenyakit.url(options),
    method: 'head',
})

const ralan = {
    kunjungan: Object.assign(kunjungan, kunjungan),
    frekuensiPenyakit: Object.assign(frekuensiPenyakit, frekuensiPenyakit3ceec5),
    surveilansPenyakit: Object.assign(surveilansPenyakit, surveilansPenyakit2ae9e7),
}

export default ralan