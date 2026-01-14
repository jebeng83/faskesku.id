import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:702
* @route '/laporan/ranap/kunjungan'
*/
export const kunjungan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjungan.url(options),
    method: 'get',
})

kunjungan.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/kunjungan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:702
* @route '/laporan/ranap/kunjungan'
*/
kunjungan.url = (options?: RouteQueryOptions) => {
    return kunjungan.definition.url + queryParams(options)
}

/**
* @see routes/web.php:702
* @route '/laporan/ranap/kunjungan'
*/
kunjungan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjungan.url(options),
    method: 'get',
})

/**
* @see routes/web.php:702
* @route '/laporan/ranap/kunjungan'
*/
kunjungan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kunjungan.url(options),
    method: 'head',
})

/**
* @see routes/web.php:705
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
* @see routes/web.php:705
* @route '/laporan/ranap/frekuensi-penyakit'
*/
frekuensiPenyakit.url = (options?: RouteQueryOptions) => {
    return frekuensiPenyakit.definition.url + queryParams(options)
}

/**
* @see routes/web.php:705
* @route '/laporan/ranap/frekuensi-penyakit'
*/
frekuensiPenyakit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: frekuensiPenyakit.url(options),
    method: 'get',
})

/**
* @see routes/web.php:705
* @route '/laporan/ranap/frekuensi-penyakit'
*/
frekuensiPenyakit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: frekuensiPenyakit.url(options),
    method: 'head',
})

const ranap = {
    kunjungan: Object.assign(kunjungan, kunjungan),
    frekuensiPenyakit: Object.assign(frekuensiPenyakit, frekuensiPenyakit),
}

export default ranap