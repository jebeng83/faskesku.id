import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/api.php:253
* @route '/api/sip-pegawai/apoteker'
*/
export const apoteker = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apoteker.url(options),
    method: 'get',
})

apoteker.definition = {
    methods: ["get","head"],
    url: '/api/sip-pegawai/apoteker',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/api.php:253
* @route '/api/sip-pegawai/apoteker'
*/
apoteker.url = (options?: RouteQueryOptions) => {
    return apoteker.definition.url + queryParams(options)
}

/**
* @see routes/api.php:253
* @route '/api/sip-pegawai/apoteker'
*/
apoteker.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apoteker.url(options),
    method: 'get',
})

/**
* @see routes/api.php:253
* @route '/api/sip-pegawai/apoteker'
*/
apoteker.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: apoteker.url(options),
    method: 'head',
})

/**
* @see routes/api.php:278
* @route '/api/sip-pegawai/expiring'
*/
export const expiring = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: expiring.url(options),
    method: 'get',
})

expiring.definition = {
    methods: ["get","head"],
    url: '/api/sip-pegawai/expiring',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/api.php:278
* @route '/api/sip-pegawai/expiring'
*/
expiring.url = (options?: RouteQueryOptions) => {
    return expiring.definition.url + queryParams(options)
}

/**
* @see routes/api.php:278
* @route '/api/sip-pegawai/expiring'
*/
expiring.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: expiring.url(options),
    method: 'get',
})

/**
* @see routes/api.php:278
* @route '/api/sip-pegawai/expiring'
*/
expiring.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: expiring.url(options),
    method: 'head',
})

const sipPegawai = {
    apoteker: Object.assign(apoteker, apoteker),
    expiring: Object.assign(expiring, expiring),
}

export default sipPegawai