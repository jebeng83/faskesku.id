import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::index
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1450
* @route '/rawat-jalan/surat-sakit'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::index
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1450
* @route '/rawat-jalan/surat-sakit'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::index
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1450
* @route '/rawat-jalan/surat-sakit'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::index
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1450
* @route '/rawat-jalan/surat-sakit'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSurat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1538
* @route '/rawat-jalan/surat-sakit/next-no-surat'
*/
export const nextNoSurat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextNoSurat.url(options),
    method: 'get',
})

nextNoSurat.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit/next-no-surat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSurat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1538
* @route '/rawat-jalan/surat-sakit/next-no-surat'
*/
nextNoSurat.url = (options?: RouteQueryOptions) => {
    return nextNoSurat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSurat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1538
* @route '/rawat-jalan/surat-sakit/next-no-surat'
*/
nextNoSurat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextNoSurat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSurat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1538
* @route '/rawat-jalan/surat-sakit/next-no-surat'
*/
nextNoSurat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nextNoSurat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicate
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1549
* @route '/rawat-jalan/surat-sakit/check-duplicate'
*/
export const checkDuplicate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkDuplicate.url(options),
    method: 'get',
})

checkDuplicate.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit/check-duplicate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicate
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1549
* @route '/rawat-jalan/surat-sakit/check-duplicate'
*/
checkDuplicate.url = (options?: RouteQueryOptions) => {
    return checkDuplicate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicate
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1549
* @route '/rawat-jalan/surat-sakit/check-duplicate'
*/
checkDuplicate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkDuplicate.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicate
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1549
* @route '/rawat-jalan/surat-sakit/check-duplicate'
*/
checkDuplicate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkDuplicate.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1604
* @route '/rawat-jalan/surat-sakit'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-jalan/surat-sakit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1604
* @route '/rawat-jalan/surat-sakit'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1604
* @route '/rawat-jalan/surat-sakit'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const suratSakit = {
    store: Object.assign(store, store),
}

export default suratSakit