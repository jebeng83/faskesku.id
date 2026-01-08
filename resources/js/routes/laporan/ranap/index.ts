import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import kunjungan from './kunjungan'
import frekuensiPenyakit3ceec5 from './frekuensi-penyakit'
import surveilansPenyakit2ae9e7 from './surveilans-penyakit'
/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::frekuensiPenyakit
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:13
* @route '/laporan/ranap/frekuensi-penyakit'
*/
export const frekuensiPenyakit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: frekuensiPenyakit.url(options),
    method: 'get',
})

frekuensiPenyakit.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/frekuensi-penyakit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::frekuensiPenyakit
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:13
* @route '/laporan/ranap/frekuensi-penyakit'
*/
frekuensiPenyakit.url = (options?: RouteQueryOptions) => {
    return frekuensiPenyakit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::frekuensiPenyakit
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:13
* @route '/laporan/ranap/frekuensi-penyakit'
*/
frekuensiPenyakit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: frekuensiPenyakit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::frekuensiPenyakit
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:13
* @route '/laporan/ranap/frekuensi-penyakit'
*/
frekuensiPenyakit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: frekuensiPenyakit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SurveilansPenyakitRanapController::surveilansPenyakit
* @see app/Http/Controllers/SurveilansPenyakitRanapController.php:11
* @route '/laporan/ranap/surveilans-penyakit'
*/
export const surveilansPenyakit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: surveilansPenyakit.url(options),
    method: 'get',
})

surveilansPenyakit.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/surveilans-penyakit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SurveilansPenyakitRanapController::surveilansPenyakit
* @see app/Http/Controllers/SurveilansPenyakitRanapController.php:11
* @route '/laporan/ranap/surveilans-penyakit'
*/
surveilansPenyakit.url = (options?: RouteQueryOptions) => {
    return surveilansPenyakit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SurveilansPenyakitRanapController::surveilansPenyakit
* @see app/Http/Controllers/SurveilansPenyakitRanapController.php:11
* @route '/laporan/ranap/surveilans-penyakit'
*/
surveilansPenyakit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: surveilansPenyakit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SurveilansPenyakitRanapController::surveilansPenyakit
* @see app/Http/Controllers/SurveilansPenyakitRanapController.php:11
* @route '/laporan/ranap/surveilans-penyakit'
*/
surveilansPenyakit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: surveilansPenyakit.url(options),
    method: 'head',
})

const ranap = {
    kunjungan: Object.assign(kunjungan, kunjungan),
    frekuensiPenyakit: Object.assign(frekuensiPenyakit, frekuensiPenyakit3ceec5),
    surveilansPenyakit: Object.assign(surveilansPenyakit, surveilansPenyakit2ae9e7),
}

export default ranap