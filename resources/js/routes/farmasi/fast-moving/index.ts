import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:734
* @route '/farmasi/obat-fast-moving/data'
*/
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/farmasi/obat-fast-moving/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:734
* @route '/farmasi/obat-fast-moving/data'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see routes/web.php:734
* @route '/farmasi/obat-fast-moving/data'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see routes/web.php:734
* @route '/farmasi/obat-fast-moving/data'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

const fastMoving = {
    data: Object.assign(data, data),
}

export default fastMoving