import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:576
* @route '/api/dev/rawat-jalan/pemeriksaan-ralan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/dev/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:576
* @route '/api/dev/rawat-jalan/pemeriksaan-ralan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:576
* @route '/api/dev/rawat-jalan/pemeriksaan-ralan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::update
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:726
* @route '/api/dev/rawat-jalan/pemeriksaan-ralan/update'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put","post"],
    url: '/api/dev/rawat-jalan/pemeriksaan-ralan/update',
} satisfies RouteDefinition<["put","post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::update
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:726
* @route '/api/dev/rawat-jalan/pemeriksaan-ralan/update'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::update
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:726
* @route '/api/dev/rawat-jalan/pemeriksaan-ralan/update'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::update
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:726
* @route '/api/dev/rawat-jalan/pemeriksaan-ralan/update'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

const pemeriksaanRalan = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
}

export default pemeriksaanRalan