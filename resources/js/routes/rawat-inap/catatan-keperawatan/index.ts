import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::index
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:14
* @route '/rawat-inap/catatan-keperawatan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/catatan-keperawatan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::index
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:14
* @route '/rawat-inap/catatan-keperawatan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::index
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:14
* @route '/rawat-inap/catatan-keperawatan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::index
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:14
* @route '/rawat-inap/catatan-keperawatan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::store
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:34
* @route '/rawat-inap/catatan-keperawatan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-inap/catatan-keperawatan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::store
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:34
* @route '/rawat-inap/catatan-keperawatan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::store
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:34
* @route '/rawat-inap/catatan-keperawatan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::update
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:56
* @route '/rawat-inap/catatan-keperawatan'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/rawat-inap/catatan-keperawatan',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::update
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:56
* @route '/rawat-inap/catatan-keperawatan'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::update
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:56
* @route '/rawat-inap/catatan-keperawatan'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::deleteMethod
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:91
* @route '/rawat-inap/catatan-keperawatan'
*/
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/rawat-inap/catatan-keperawatan',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::deleteMethod
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:91
* @route '/rawat-inap/catatan-keperawatan'
*/
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::deleteMethod
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:91
* @route '/rawat-inap/catatan-keperawatan'
*/
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

const catatanKeperawatan = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    delete: Object.assign(deleteMethod, deleteMethod),
}

export default catatanKeperawatan