import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalanController::store
* @see app/Http/Controllers/RawatJalanController.php:265
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalanController::store
* @see app/Http/Controllers/RawatJalanController.php:265
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::store
* @see app/Http/Controllers/RawatJalanController.php:265
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalanController::deleteMethod
* @see app/Http/Controllers/RawatJalanController.php:302
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatJalanController::deleteMethod
* @see app/Http/Controllers/RawatJalanController.php:302
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::deleteMethod
* @see app/Http/Controllers/RawatJalanController.php:302
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RawatJalanController::update
* @see app/Http/Controllers/RawatJalanController.php:326
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RawatJalanController::update
* @see app/Http/Controllers/RawatJalanController.php:326
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::update
* @see app/Http/Controllers/RawatJalanController.php:326
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const pemeriksaanRalan = {
    store: Object.assign(store, store),
    delete: Object.assign(deleteMethod, deleteMethod),
    update: Object.assign(update, update),
}

export default pemeriksaanRalan