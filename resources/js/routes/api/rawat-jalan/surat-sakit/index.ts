import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see [serialized-closure]:2
* @route '/api/rawat-jalan/surat-sakit/verify'
*/
export const verify = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(options),
    method: 'get',
})

verify.definition = {
    methods: ["get","head"],
    url: '/api/rawat-jalan/surat-sakit/verify',
} satisfies RouteDefinition<["get","head"]>

/**
* @see [serialized-closure]:2
* @route '/api/rawat-jalan/surat-sakit/verify'
*/
verify.url = (options?: RouteQueryOptions) => {
    return verify.definition.url + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/api/rawat-jalan/surat-sakit/verify'
*/
verify.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/api/rawat-jalan/surat-sakit/verify'
*/
verify.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verify.url(options),
    method: 'head',
})

const suratSakit = {
    verify: Object.assign(verify, verify),
}

export default suratSakit