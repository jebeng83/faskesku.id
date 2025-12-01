import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/api.php:224
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
* @see routes/api.php:224
* @route '/api/sip-pegawai/apoteker'
*/
apoteker.url = (options?: RouteQueryOptions) => {
    return apoteker.definition.url + queryParams(options)
}

/**
* @see routes/api.php:224
* @route '/api/sip-pegawai/apoteker'
*/
apoteker.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apoteker.url(options),
    method: 'get',
})

/**
* @see routes/api.php:224
* @route '/api/sip-pegawai/apoteker'
*/
apoteker.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: apoteker.url(options),
    method: 'head',
})

const sipPegawai = {
    apoteker: Object.assign(apoteker, apoteker),
}

export default sipPegawai