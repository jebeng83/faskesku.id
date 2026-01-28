import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import frekuensiPenyakit3ceec5 from './frekuensi-penyakit'
import kunjunganAc275e from './kunjungan'
/**
* @see routes/web.php:676
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
* @see routes/web.php:676
* @route '/laporan/ralan/frekuensi-penyakit'
*/
frekuensiPenyakit.url = (options?: RouteQueryOptions) => {
    return frekuensiPenyakit.definition.url + queryParams(options)
}

/**
* @see routes/web.php:676
* @route '/laporan/ralan/frekuensi-penyakit'
*/
frekuensiPenyakit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: frekuensiPenyakit.url(options),
    method: 'get',
})

/**
* @see routes/web.php:676
* @route '/laporan/ralan/frekuensi-penyakit'
*/
frekuensiPenyakit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: frekuensiPenyakit.url(options),
    method: 'head',
})

/**
* @see routes/web.php:691
* @route '/laporan/ralan/kunjungan'
*/
export const kunjungan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjungan.url(options),
    method: 'get',
})

kunjungan.definition = {
    methods: ["get","head"],
    url: '/laporan/ralan/kunjungan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:691
* @route '/laporan/ralan/kunjungan'
*/
kunjungan.url = (options?: RouteQueryOptions) => {
    return kunjungan.definition.url + queryParams(options)
}

/**
* @see routes/web.php:691
* @route '/laporan/ralan/kunjungan'
*/
kunjungan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjungan.url(options),
    method: 'get',
})

/**
* @see routes/web.php:691
* @route '/laporan/ralan/kunjungan'
*/
kunjungan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kunjungan.url(options),
    method: 'head',
})

const ralan = {
    frekuensiPenyakit: Object.assign(frekuensiPenyakit, frekuensiPenyakit3ceec5),
    kunjungan: Object.assign(kunjungan, kunjunganAc275e),
}

export default ralan