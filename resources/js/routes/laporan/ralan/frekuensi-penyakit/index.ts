import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see routes/web.php:662
* @route '/laporan/ralan/frekuensi-penyakit/data'
*/
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/laporan/ralan/frekuensi-penyakit/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:662
* @route '/laporan/ralan/frekuensi-penyakit/data'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see routes/web.php:662
* @route '/laporan/ralan/frekuensi-penyakit/data'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see routes/web.php:662
* @route '/laporan/ralan/frekuensi-penyakit/data'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

/**
* @see routes/web.php:669
* @route '/laporan/ralan/frekuensi-penyakit/print'
*/
export const print = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(options),
    method: 'get',
})

print.definition = {
    methods: ["get","head"],
    url: '/laporan/ralan/frekuensi-penyakit/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:669
* @route '/laporan/ralan/frekuensi-penyakit/print'
*/
print.url = (options?: RouteQueryOptions) => {
    return print.definition.url + queryParams(options)
}

/**
* @see routes/web.php:669
* @route '/laporan/ralan/frekuensi-penyakit/print'
*/
print.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(options),
    method: 'get',
})

/**
* @see routes/web.php:669
* @route '/laporan/ralan/frekuensi-penyakit/print'
*/
print.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: print.url(options),
    method: 'head',
})

const frekuensiPenyakit = {
    data: Object.assign(data, data),
    print: Object.assign(print, print),
}

export default frekuensiPenyakit