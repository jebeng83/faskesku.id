import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import ralan from './ralan'
import ranap from './ranap'
/**
* @see routes/web.php:627
* @route '/laporan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/laporan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:627
* @route '/laporan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:627
* @route '/laporan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:627
* @route '/laporan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see routes/web.php:703
* @route '/laporan/stats'
*/
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/laporan/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:703
* @route '/laporan/stats'
*/
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see routes/web.php:703
* @route '/laporan/stats'
*/
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

/**
* @see routes/web.php:703
* @route '/laporan/stats'
*/
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

const laporan = {
    index: Object.assign(index, index),
    ralan: Object.assign(ralan, ralan),
    ranap: Object.assign(ranap, ranap),
    stats: Object.assign(stats, stats),
}

export default laporan