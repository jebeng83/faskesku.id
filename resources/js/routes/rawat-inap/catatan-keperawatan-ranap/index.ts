import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:783
* @route '/rawat-inap/catatan-keperawatan-ranap'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-inap/catatan-keperawatan-ranap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:783
* @route '/rawat-inap/catatan-keperawatan-ranap'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:783
* @route '/rawat-inap/catatan-keperawatan-ranap'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatInapController::deleteMethod
* @see app/Http/Controllers/RawatInapController.php:804
* @route '/rawat-inap/catatan-keperawatan-ranap'
*/
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/rawat-inap/catatan-keperawatan-ranap',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatInapController::deleteMethod
* @see app/Http/Controllers/RawatInapController.php:804
* @route '/rawat-inap/catatan-keperawatan-ranap'
*/
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::deleteMethod
* @see app/Http/Controllers/RawatInapController.php:804
* @route '/rawat-inap/catatan-keperawatan-ranap'
*/
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

const catatanKeperawatanRanap = {
    store: Object.assign(store, store),
    delete: Object.assign(deleteMethod, deleteMethod),
}

export default catatanKeperawatanRanap