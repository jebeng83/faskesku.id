import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see routes/api.php:240
* @route '/api/dev/debug/alergi-pasien'
*/
export const alergiPasien = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: alergiPasien.url(options),
    method: 'get',
})

alergiPasien.definition = {
    methods: ["get","head"],
    url: '/api/dev/debug/alergi-pasien',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/api.php:240
* @route '/api/dev/debug/alergi-pasien'
*/
alergiPasien.url = (options?: RouteQueryOptions) => {
    return alergiPasien.definition.url + queryParams(options)
}

/**
* @see routes/api.php:240
* @route '/api/dev/debug/alergi-pasien'
*/
alergiPasien.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: alergiPasien.url(options),
    method: 'get',
})

/**
* @see routes/api.php:240
* @route '/api/dev/debug/alergi-pasien'
*/
alergiPasien.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: alergiPasien.url(options),
    method: 'head',
})

/**
* @see routes/api.php:257
* @route '/api/dev/debug/pemeriksaan-ralan'
*/
export const pemeriksaanRalan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pemeriksaanRalan.url(options),
    method: 'get',
})

pemeriksaanRalan.definition = {
    methods: ["get","head"],
    url: '/api/dev/debug/pemeriksaan-ralan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/api.php:257
* @route '/api/dev/debug/pemeriksaan-ralan'
*/
pemeriksaanRalan.url = (options?: RouteQueryOptions) => {
    return pemeriksaanRalan.definition.url + queryParams(options)
}

/**
* @see routes/api.php:257
* @route '/api/dev/debug/pemeriksaan-ralan'
*/
pemeriksaanRalan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pemeriksaanRalan.url(options),
    method: 'get',
})

/**
* @see routes/api.php:257
* @route '/api/dev/debug/pemeriksaan-ralan'
*/
pemeriksaanRalan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pemeriksaanRalan.url(options),
    method: 'head',
})

const debug = {
    alergiPasien: Object.assign(alergiPasien, alergiPasien),
    pemeriksaanRalan: Object.assign(pemeriksaanRalan, pemeriksaanRalan),
}

export default debug