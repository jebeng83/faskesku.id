import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\KunjunganController::index
* @see app/Http/Controllers/KunjunganController.php:101
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
* @see \App\Http\Controllers\KunjunganController::index
* @see app/Http/Controllers/KunjunganController.php:101
* @route '/laporan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::index
* @see app/Http/Controllers/KunjunganController.php:101
* @route '/laporan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::index
* @see app/Http/Controllers/KunjunganController.php:101
* @route '/laporan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KunjunganController::getStats
* @see app/Http/Controllers/KunjunganController.php:284
* @route '/laporan/stats'
*/
export const getStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStats.url(options),
    method: 'get',
})

getStats.definition = {
    methods: ["get","head"],
    url: '/laporan/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KunjunganController::getStats
* @see app/Http/Controllers/KunjunganController.php:284
* @route '/laporan/stats'
*/
getStats.url = (options?: RouteQueryOptions) => {
    return getStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::getStats
* @see app/Http/Controllers/KunjunganController.php:284
* @route '/laporan/stats'
*/
getStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::getStats
* @see app/Http/Controllers/KunjunganController.php:284
* @route '/laporan/stats'
*/
getStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStats.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanPage
* @see app/Http/Controllers/KunjunganController.php:484
* @route '/laporan/ralan/kunjungan'
*/
export const kunjunganRalanPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRalanPage.url(options),
    method: 'get',
})

kunjunganRalanPage.definition = {
    methods: ["get","head"],
    url: '/laporan/ralan/kunjungan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanPage
* @see app/Http/Controllers/KunjunganController.php:484
* @route '/laporan/ralan/kunjungan'
*/
kunjunganRalanPage.url = (options?: RouteQueryOptions) => {
    return kunjunganRalanPage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanPage
* @see app/Http/Controllers/KunjunganController.php:484
* @route '/laporan/ralan/kunjungan'
*/
kunjunganRalanPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRalanPage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanPage
* @see app/Http/Controllers/KunjunganController.php:484
* @route '/laporan/ralan/kunjungan'
*/
kunjunganRalanPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kunjunganRalanPage.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanData
* @see app/Http/Controllers/KunjunganController.php:497
* @route '/laporan/ralan/kunjungan/data'
*/
export const kunjunganRalanData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRalanData.url(options),
    method: 'get',
})

kunjunganRalanData.definition = {
    methods: ["get","head"],
    url: '/laporan/ralan/kunjungan/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanData
* @see app/Http/Controllers/KunjunganController.php:497
* @route '/laporan/ralan/kunjungan/data'
*/
kunjunganRalanData.url = (options?: RouteQueryOptions) => {
    return kunjunganRalanData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanData
* @see app/Http/Controllers/KunjunganController.php:497
* @route '/laporan/ralan/kunjungan/data'
*/
kunjunganRalanData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRalanData.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanData
* @see app/Http/Controllers/KunjunganController.php:497
* @route '/laporan/ralan/kunjungan/data'
*/
kunjunganRalanData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kunjunganRalanData.url(options),
    method: 'head',
})

const KunjunganController = { index, getStats, kunjunganRalanPage, kunjunganRalanData }

export default KunjunganController