import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::index
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:13
* @route '/laporan/ralan/frekuensi-penyakit'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/laporan/ralan/frekuensi-penyakit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::index
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:13
* @route '/laporan/ralan/frekuensi-penyakit'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::index
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:13
* @route '/laporan/ralan/frekuensi-penyakit'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::index
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:13
* @route '/laporan/ralan/frekuensi-penyakit'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::data
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:28
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
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::data
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:28
* @route '/laporan/ralan/frekuensi-penyakit/data'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::data
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:28
* @route '/laporan/ralan/frekuensi-penyakit/data'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::data
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:28
* @route '/laporan/ralan/frekuensi-penyakit/data'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::print
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:91
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
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::print
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:91
* @route '/laporan/ralan/frekuensi-penyakit/print'
*/
print.url = (options?: RouteQueryOptions) => {
    return print.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::print
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:91
* @route '/laporan/ralan/frekuensi-penyakit/print'
*/
print.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRalanController::print
* @see app/Http/Controllers/FrekuensiPenyakitRalanController.php:91
* @route '/laporan/ralan/frekuensi-penyakit/print'
*/
print.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: print.url(options),
    method: 'head',
})

const FrekuensiPenyakitRalanController = { index, data, print }

export default FrekuensiPenyakitRalanController