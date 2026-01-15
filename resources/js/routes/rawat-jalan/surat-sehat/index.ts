import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSurat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1954
* @route '/rawat-jalan/surat-sehat/next-no-surat'
*/
export const nextNoSurat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextNoSurat.url(options),
    method: 'get',
})

nextNoSurat.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sehat/next-no-surat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSurat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1954
* @route '/rawat-jalan/surat-sehat/next-no-surat'
*/
nextNoSurat.url = (options?: RouteQueryOptions) => {
    return nextNoSurat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSurat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1954
* @route '/rawat-jalan/surat-sehat/next-no-surat'
*/
nextNoSurat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextNoSurat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSurat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1954
* @route '/rawat-jalan/surat-sehat/next-no-surat'
*/
nextNoSurat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nextNoSurat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicate
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2020
* @route '/rawat-jalan/surat-sehat/check-duplicate'
*/
export const checkDuplicate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkDuplicate.url(options),
    method: 'get',
})

checkDuplicate.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sehat/check-duplicate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicate
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2020
* @route '/rawat-jalan/surat-sehat/check-duplicate'
*/
checkDuplicate.url = (options?: RouteQueryOptions) => {
    return checkDuplicate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicate
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2020
* @route '/rawat-jalan/surat-sehat/check-duplicate'
*/
checkDuplicate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkDuplicate.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicate
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2020
* @route '/rawat-jalan/surat-sehat/check-duplicate'
*/
checkDuplicate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkDuplicate.url(options),
    method: 'head',
})

/**
* @see routes/web.php:1355
* @route '/rawat-jalan/surat-sehat'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sehat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1355
* @route '/rawat-jalan/surat-sehat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1355
* @route '/rawat-jalan/surat-sehat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1355
* @route '/rawat-jalan/surat-sehat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1450
* @route '/rawat-jalan/surat-sehat'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-jalan/surat-sehat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1450
* @route '/rawat-jalan/surat-sehat'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1450
* @route '/rawat-jalan/surat-sehat'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const suratSehat = {
    store: Object.assign(store, store),
}

export default suratSehat