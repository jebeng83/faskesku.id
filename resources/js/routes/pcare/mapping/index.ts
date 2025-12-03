import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import poli16996d from './poli'
import dokter1a4744 from './dokter'
import obatE6960e from './obat'
/**
* @see routes/web.php:803
* @route '/pcare/mapping/poli'
*/
export const poli = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

poli.definition = {
    methods: ["get","head"],
    url: '/pcare/mapping/poli',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:803
* @route '/pcare/mapping/poli'
*/
poli.url = (options?: RouteQueryOptions) => {
    return poli.definition.url + queryParams(options)
}

/**
* @see routes/web.php:803
* @route '/pcare/mapping/poli'
*/
poli.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

/**
* @see routes/web.php:803
* @route '/pcare/mapping/poli'
*/
poli.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: poli.url(options),
    method: 'head',
})

/**
* @see routes/web.php:808
* @route '/pcare/mapping/dokter'
*/
export const dokter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

dokter.definition = {
    methods: ["get","head"],
    url: '/pcare/mapping/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:808
* @route '/pcare/mapping/dokter'
*/
dokter.url = (options?: RouteQueryOptions) => {
    return dokter.definition.url + queryParams(options)
}

/**
* @see routes/web.php:808
* @route '/pcare/mapping/dokter'
*/
dokter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

/**
* @see routes/web.php:808
* @route '/pcare/mapping/dokter'
*/
dokter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dokter.url(options),
    method: 'head',
})

/**
* @see routes/web.php:813
* @route '/pcare/mapping/obat'
*/
export const obat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: obat.url(options),
    method: 'get',
})

obat.definition = {
    methods: ["get","head"],
    url: '/pcare/mapping/obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:813
* @route '/pcare/mapping/obat'
*/
obat.url = (options?: RouteQueryOptions) => {
    return obat.definition.url + queryParams(options)
}

/**
* @see routes/web.php:813
* @route '/pcare/mapping/obat'
*/
obat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: obat.url(options),
    method: 'get',
})

/**
* @see routes/web.php:813
* @route '/pcare/mapping/obat'
*/
obat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: obat.url(options),
    method: 'head',
})

const mapping = {
    poli: Object.assign(poli, poli16996d),
    dokter: Object.assign(dokter, dokter1a4744),
    obat: Object.assign(obat, obatE6960e),
}

export default mapping