import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see routes/web.php:1360
* @route '/pcare/referensi-mobilejkn/poli'
*/
export const poli = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

poli.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi-mobilejkn/poli',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1360
* @route '/pcare/referensi-mobilejkn/poli'
*/
poli.url = (options?: RouteQueryOptions) => {
    return poli.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1360
* @route '/pcare/referensi-mobilejkn/poli'
*/
poli.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1360
* @route '/pcare/referensi-mobilejkn/poli'
*/
poli.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: poli.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1365
* @route '/pcare/referensi-mobilejkn/dokter'
*/
export const dokter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

dokter.definition = {
    methods: ["get","head"],
    url: '/pcare/referensi-mobilejkn/dokter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1365
* @route '/pcare/referensi-mobilejkn/dokter'
*/
dokter.url = (options?: RouteQueryOptions) => {
    return dokter.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1365
* @route '/pcare/referensi-mobilejkn/dokter'
*/
dokter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dokter.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1365
* @route '/pcare/referensi-mobilejkn/dokter'
*/
dokter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dokter.url(options),
    method: 'head',
})

const mobilejkn = {
    poli: Object.assign(poli, poli),
    dokter: Object.assign(dokter, dokter),
}

export default mobilejkn