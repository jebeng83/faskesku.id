import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatInapController::store
 * @see app/Http/Controllers/RawatInapController.php:487
 * @route '/rawat-inap/pemeriksaan-ranap'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-inap/pemeriksaan-ranap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatInapController::store
 * @see app/Http/Controllers/RawatInapController.php:487
 * @route '/rawat-inap/pemeriksaan-ranap'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::store
 * @see app/Http/Controllers/RawatInapController.php:487
 * @route '/rawat-inap/pemeriksaan-ranap'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatInapController::deleteMethod
 * @see app/Http/Controllers/RawatInapController.php:557
 * @route '/rawat-inap/pemeriksaan-ranap'
 */
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/rawat-inap/pemeriksaan-ranap',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatInapController::deleteMethod
 * @see app/Http/Controllers/RawatInapController.php:557
 * @route '/rawat-inap/pemeriksaan-ranap'
 */
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::deleteMethod
 * @see app/Http/Controllers/RawatInapController.php:557
 * @route '/rawat-inap/pemeriksaan-ranap'
 */
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RawatInapController::update
 * @see app/Http/Controllers/RawatInapController.php:581
 * @route '/rawat-inap/pemeriksaan-ranap'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/rawat-inap/pemeriksaan-ranap',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RawatInapController::update
 * @see app/Http/Controllers/RawatInapController.php:581
 * @route '/rawat-inap/pemeriksaan-ranap'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::update
 * @see app/Http/Controllers/RawatInapController.php:581
 * @route '/rawat-inap/pemeriksaan-ranap'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})
const pemeriksaanRanap = {
    store: Object.assign(store, store),
delete: Object.assign(deleteMethod, deleteMethod),
update: Object.assign(update, update),
}

export default pemeriksaanRanap