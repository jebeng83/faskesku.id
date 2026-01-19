import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:1324
* @route '/rawat-jalan/asuhan-keperawatan/sdki'
*/
export const sdki = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sdki.url(options),
    method: 'get',
})

sdki.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/asuhan-keperawatan/sdki',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1324
* @route '/rawat-jalan/asuhan-keperawatan/sdki'
*/
sdki.url = (options?: RouteQueryOptions) => {
    return sdki.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1324
* @route '/rawat-jalan/asuhan-keperawatan/sdki'
*/
sdki.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sdki.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1324
* @route '/rawat-jalan/asuhan-keperawatan/sdki'
*/
sdki.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sdki.url(options),
    method: 'head',
})

const asuhanKeperawatan = {
    sdki: Object.assign(sdki, sdki),
}

export default asuhanKeperawatan