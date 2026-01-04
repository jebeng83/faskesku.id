import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::index
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:13
* @route '/laporan/ranap/frekuensi-penyakit'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/frekuensi-penyakit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::index
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:13
* @route '/laporan/ranap/frekuensi-penyakit'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::index
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:13
* @route '/laporan/ranap/frekuensi-penyakit'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::index
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:13
* @route '/laporan/ranap/frekuensi-penyakit'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::data
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:22
* @route '/laporan/ranap/frekuensi-penyakit/data'
*/
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/frekuensi-penyakit/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::data
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:22
* @route '/laporan/ranap/frekuensi-penyakit/data'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::data
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:22
* @route '/laporan/ranap/frekuensi-penyakit/data'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::data
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:22
* @route '/laporan/ranap/frekuensi-penyakit/data'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::print
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:110
* @route '/laporan/ranap/frekuensi-penyakit/print'
*/
export const print = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(options),
    method: 'get',
})

print.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/frekuensi-penyakit/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::print
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:110
* @route '/laporan/ranap/frekuensi-penyakit/print'
*/
print.url = (options?: RouteQueryOptions) => {
    return print.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::print
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:110
* @route '/laporan/ranap/frekuensi-penyakit/print'
*/
print.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FrekuensiPenyakitRanapController::print
* @see app/Http/Controllers/FrekuensiPenyakitRanapController.php:110
* @route '/laporan/ranap/frekuensi-penyakit/print'
*/
print.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: print.url(options),
    method: 'head',
})

const FrekuensiPenyakitRanapController = { index, data, print }

export default FrekuensiPenyakitRanapController