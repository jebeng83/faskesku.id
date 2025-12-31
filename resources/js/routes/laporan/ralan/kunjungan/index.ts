import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\KunjunganController::page
* @see app/Http/Controllers/KunjunganController.php:484
* @route '/laporan/ralan/kunjungan'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/laporan/ralan/kunjungan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KunjunganController::page
* @see app/Http/Controllers/KunjunganController.php:484
* @route '/laporan/ralan/kunjungan'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::page
* @see app/Http/Controllers/KunjunganController.php:484
* @route '/laporan/ralan/kunjungan'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::page
* @see app/Http/Controllers/KunjunganController.php:484
* @route '/laporan/ralan/kunjungan'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KunjunganController::data
* @see app/Http/Controllers/KunjunganController.php:497
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
* @see \App\Http\Controllers\KunjunganController::data
* @see app/Http/Controllers/KunjunganController.php:497
* @route '/laporan/ralan/kunjungan/data'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::data
* @see app/Http/Controllers/KunjunganController.php:497
* @route '/laporan/ralan/kunjungan/data'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::data
* @see app/Http/Controllers/KunjunganController.php:497
* @route '/laporan/ralan/kunjungan/data'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

const kunjungan = {
    page: Object.assign(page, page),
    data: Object.assign(data, data),
}

export default kunjungan