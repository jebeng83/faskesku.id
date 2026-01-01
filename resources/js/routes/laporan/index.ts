import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import ranap from './ranap'
/**
* @see routes/web.php:345
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
* @see routes/web.php:345
* @route '/laporan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:345
* @route '/laporan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:345
* @route '/laporan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see routes/web.php:353
* @route '/laporan/rl-kemenkes'
*/
export const rlKemenkes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rlKemenkes.url(options),
    method: 'get',
})

rlKemenkes.definition = {
    methods: ["get","head"],
    url: '/laporan/rl-kemenkes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:353
* @route '/laporan/rl-kemenkes'
*/
rlKemenkes.url = (options?: RouteQueryOptions) => {
    return rlKemenkes.definition.url + queryParams(options)
}

/**
* @see routes/web.php:353
* @route '/laporan/rl-kemenkes'
*/
rlKemenkes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rlKemenkes.url(options),
    method: 'get',
})

/**
* @see routes/web.php:353
* @route '/laporan/rl-kemenkes'
*/
rlKemenkes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rlKemenkes.url(options),
    method: 'head',
})

/**
* @see routes/web.php:357
* @route '/laporan/bor'
*/
export const bor = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bor.url(options),
    method: 'get',
})

bor.definition = {
    methods: ["get","head"],
    url: '/laporan/bor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:357
* @route '/laporan/bor'
*/
bor.url = (options?: RouteQueryOptions) => {
    return bor.definition.url + queryParams(options)
}

/**
* @see routes/web.php:357
* @route '/laporan/bor'
*/
bor.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bor.url(options),
    method: 'get',
})

/**
* @see routes/web.php:357
* @route '/laporan/bor'
*/
bor.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bor.url(options),
    method: 'head',
})

const laporan = {
    index: Object.assign(index, index),
    ranap: Object.assign(ranap, ranap),
    rlKemenkes: Object.assign(rlKemenkes, rlKemenkes),
    bor: Object.assign(bor, bor),
}

export default laporan