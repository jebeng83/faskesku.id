import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\KunjunganController::page
* @see app/Http/Controllers/KunjunganController.php:864
* @route '/laporan/ranap/kunjungan'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/kunjungan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KunjunganController::page
* @see app/Http/Controllers/KunjunganController.php:864
* @route '/laporan/ranap/kunjungan'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::page
* @see app/Http/Controllers/KunjunganController.php:864
* @route '/laporan/ranap/kunjungan'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::page
* @see app/Http/Controllers/KunjunganController.php:864
* @route '/laporan/ranap/kunjungan'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KunjunganController::data
* @see app/Http/Controllers/KunjunganController.php:877
* @route '/laporan/ranap/kunjungan/data'
*/
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/kunjungan/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KunjunganController::data
* @see app/Http/Controllers/KunjunganController.php:877
* @route '/laporan/ranap/kunjungan/data'
*/
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::data
* @see app/Http/Controllers/KunjunganController.php:877
* @route '/laporan/ranap/kunjungan/data'
*/
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::data
* @see app/Http/Controllers/KunjunganController.php:877
* @route '/laporan/ranap/kunjungan/data'
*/
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KunjunganController::print
* @see app/Http/Controllers/KunjunganController.php:1043
* @route '/laporan/ranap/kunjungan/print'
*/
export const print = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(options),
    method: 'get',
})

print.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/kunjungan/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KunjunganController::print
* @see app/Http/Controllers/KunjunganController.php:1043
* @route '/laporan/ranap/kunjungan/print'
*/
print.url = (options?: RouteQueryOptions) => {
    return print.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::print
* @see app/Http/Controllers/KunjunganController.php:1043
* @route '/laporan/ranap/kunjungan/print'
*/
print.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::print
* @see app/Http/Controllers/KunjunganController.php:1043
* @route '/laporan/ranap/kunjungan/print'
*/
print.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: print.url(options),
    method: 'head',
})

const kunjungan = {
    page: Object.assign(page, page),
    data: Object.assign(data, data),
    print: Object.assign(print, print),
}

export default kunjungan