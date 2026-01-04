import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\KunjunganController::index
* @see app/Http/Controllers/KunjunganController.php:246
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
* @see app/Http/Controllers/KunjunganController.php:246
* @route '/laporan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::index
* @see app/Http/Controllers/KunjunganController.php:246
* @route '/laporan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::index
* @see app/Http/Controllers/KunjunganController.php:246
* @route '/laporan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanPage
* @see app/Http/Controllers/KunjunganController.php:632
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
* @see app/Http/Controllers/KunjunganController.php:632
* @route '/laporan/ralan/kunjungan'
*/
kunjunganRalanPage.url = (options?: RouteQueryOptions) => {
    return kunjunganRalanPage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanPage
* @see app/Http/Controllers/KunjunganController.php:632
* @route '/laporan/ralan/kunjungan'
*/
kunjunganRalanPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRalanPage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanPage
* @see app/Http/Controllers/KunjunganController.php:632
* @route '/laporan/ralan/kunjungan'
*/
kunjunganRalanPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kunjunganRalanPage.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanData
* @see app/Http/Controllers/KunjunganController.php:645
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
* @see app/Http/Controllers/KunjunganController.php:645
* @route '/laporan/ralan/kunjungan/data'
*/
kunjunganRalanData.url = (options?: RouteQueryOptions) => {
    return kunjunganRalanData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanData
* @see app/Http/Controllers/KunjunganController.php:645
* @route '/laporan/ralan/kunjungan/data'
*/
kunjunganRalanData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRalanData.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanData
* @see app/Http/Controllers/KunjunganController.php:645
* @route '/laporan/ralan/kunjungan/data'
*/
kunjunganRalanData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kunjunganRalanData.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanPrint
* @see app/Http/Controllers/KunjunganController.php:811
* @route '/laporan/ralan/kunjungan/print'
*/
export const kunjunganRalanPrint = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRalanPrint.url(options),
    method: 'get',
})

kunjunganRalanPrint.definition = {
    methods: ["get","head"],
    url: '/laporan/ralan/kunjungan/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanPrint
* @see app/Http/Controllers/KunjunganController.php:811
* @route '/laporan/ralan/kunjungan/print'
*/
kunjunganRalanPrint.url = (options?: RouteQueryOptions) => {
    return kunjunganRalanPrint.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanPrint
* @see app/Http/Controllers/KunjunganController.php:811
* @route '/laporan/ralan/kunjungan/print'
*/
kunjunganRalanPrint.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRalanPrint.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRalanPrint
* @see app/Http/Controllers/KunjunganController.php:811
* @route '/laporan/ralan/kunjungan/print'
*/
kunjunganRalanPrint.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kunjunganRalanPrint.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRanapPage
* @see app/Http/Controllers/KunjunganController.php:1011
* @route '/laporan/ranap/kunjungan'
*/
export const kunjunganRanapPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRanapPage.url(options),
    method: 'get',
})

kunjunganRanapPage.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/kunjungan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRanapPage
* @see app/Http/Controllers/KunjunganController.php:1011
* @route '/laporan/ranap/kunjungan'
*/
kunjunganRanapPage.url = (options?: RouteQueryOptions) => {
    return kunjunganRanapPage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRanapPage
* @see app/Http/Controllers/KunjunganController.php:1011
* @route '/laporan/ranap/kunjungan'
*/
kunjunganRanapPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRanapPage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRanapPage
* @see app/Http/Controllers/KunjunganController.php:1011
* @route '/laporan/ranap/kunjungan'
*/
kunjunganRanapPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kunjunganRanapPage.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRanapData
* @see app/Http/Controllers/KunjunganController.php:1024
* @route '/laporan/ranap/kunjungan/data'
*/
export const kunjunganRanapData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRanapData.url(options),
    method: 'get',
})

kunjunganRanapData.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/kunjungan/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRanapData
* @see app/Http/Controllers/KunjunganController.php:1024
* @route '/laporan/ranap/kunjungan/data'
*/
kunjunganRanapData.url = (options?: RouteQueryOptions) => {
    return kunjunganRanapData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRanapData
* @see app/Http/Controllers/KunjunganController.php:1024
* @route '/laporan/ranap/kunjungan/data'
*/
kunjunganRanapData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRanapData.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRanapData
* @see app/Http/Controllers/KunjunganController.php:1024
* @route '/laporan/ranap/kunjungan/data'
*/
kunjunganRanapData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kunjunganRanapData.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRanapPrint
* @see app/Http/Controllers/KunjunganController.php:1190
* @route '/laporan/ranap/kunjungan/print'
*/
export const kunjunganRanapPrint = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRanapPrint.url(options),
    method: 'get',
})

kunjunganRanapPrint.definition = {
    methods: ["get","head"],
    url: '/laporan/ranap/kunjungan/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRanapPrint
* @see app/Http/Controllers/KunjunganController.php:1190
* @route '/laporan/ranap/kunjungan/print'
*/
kunjunganRanapPrint.url = (options?: RouteQueryOptions) => {
    return kunjunganRanapPrint.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRanapPrint
* @see app/Http/Controllers/KunjunganController.php:1190
* @route '/laporan/ranap/kunjungan/print'
*/
kunjunganRanapPrint.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjunganRanapPrint.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KunjunganController::kunjunganRanapPrint
* @see app/Http/Controllers/KunjunganController.php:1190
* @route '/laporan/ranap/kunjungan/print'
*/
kunjunganRanapPrint.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kunjunganRanapPrint.url(options),
    method: 'head',
})

const KunjunganController = { index, kunjunganRalanPage, kunjunganRalanData, kunjunganRalanPrint, kunjunganRanapPage, kunjunganRanapData, kunjunganRanapPrint }

export default KunjunganController