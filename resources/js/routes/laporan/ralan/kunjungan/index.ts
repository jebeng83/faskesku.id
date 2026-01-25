import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see routes/web.php:678
* @route '/laporan/ralan/kunjungan/data'
*/
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/laporan/ralan/kunjungan/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:678
* @route '/laporan/ralan/kunjungan/data'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see routes/web.php:678
* @route '/laporan/ralan/kunjungan/data'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see routes/web.php:678
* @route '/laporan/ralan/kunjungan/data'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

/**
* @see routes/web.php:689
* @route '/laporan/ralan/kunjungan/print'
*/
export const print = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(options),
    method: 'get',
})

print.definition = {
    methods: ["get","head"],
    url: '/laporan/ralan/kunjungan/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:689
* @route '/laporan/ralan/kunjungan/print'
*/
print.url = (options?: RouteQueryOptions) => {
    return print.definition.url + queryParams(options)
}

/**
* @see routes/web.php:689
* @route '/laporan/ralan/kunjungan/print'
*/
print.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(options),
    method: 'get',
})

/**
* @see routes/web.php:689
* @route '/laporan/ralan/kunjungan/print'
*/
print.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: print.url(options),
    method: 'head',
})

const kunjungan = {
    data: Object.assign(data, data),
    print: Object.assign(print, print),
}

export default kunjungan