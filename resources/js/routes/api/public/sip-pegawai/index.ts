import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see routes/api.php:113
* @route '/api/public/sip-pegawai/expiring'
*/
export const expiring = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: expiring.url(options),
    method: 'get',
})

expiring.definition = {
    methods: ["get","head"],
    url: '/api/public/sip-pegawai/expiring',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/api.php:113
* @route '/api/public/sip-pegawai/expiring'
*/
expiring.url = (options?: RouteQueryOptions) => {
    return expiring.definition.url + queryParams(options)
}

/**
* @see routes/api.php:113
* @route '/api/public/sip-pegawai/expiring'
*/
expiring.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: expiring.url(options),
    method: 'get',
})

/**
* @see routes/api.php:113
* @route '/api/public/sip-pegawai/expiring'
*/
expiring.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: expiring.url(options),
    method: 'head',
})

const sipPegawai = {
    expiring: Object.assign(expiring, expiring),
}

export default sipPegawai