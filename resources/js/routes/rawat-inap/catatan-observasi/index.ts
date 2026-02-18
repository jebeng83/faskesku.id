import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::index
* @see app/Http/Controllers/CatatanObservasiRanapController.php:15
* @route '/rawat-inap/catatan-observasi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/catatan-observasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::index
* @see app/Http/Controllers/CatatanObservasiRanapController.php:15
* @route '/rawat-inap/catatan-observasi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::index
* @see app/Http/Controllers/CatatanObservasiRanapController.php:15
* @route '/rawat-inap/catatan-observasi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::index
* @see app/Http/Controllers/CatatanObservasiRanapController.php:15
* @route '/rawat-inap/catatan-observasi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::store
* @see app/Http/Controllers/CatatanObservasiRanapController.php:35
* @route '/rawat-inap/catatan-observasi'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-inap/catatan-observasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::store
* @see app/Http/Controllers/CatatanObservasiRanapController.php:35
* @route '/rawat-inap/catatan-observasi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::store
* @see app/Http/Controllers/CatatanObservasiRanapController.php:35
* @route '/rawat-inap/catatan-observasi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::update
* @see app/Http/Controllers/CatatanObservasiRanapController.php:63
* @route '/rawat-inap/catatan-observasi'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/rawat-inap/catatan-observasi',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::update
* @see app/Http/Controllers/CatatanObservasiRanapController.php:63
* @route '/rawat-inap/catatan-observasi'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::update
* @see app/Http/Controllers/CatatanObservasiRanapController.php:63
* @route '/rawat-inap/catatan-observasi'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::deleteMethod
* @see app/Http/Controllers/CatatanObservasiRanapController.php:104
* @route '/rawat-inap/catatan-observasi'
*/
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/rawat-inap/catatan-observasi',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::deleteMethod
* @see app/Http/Controllers/CatatanObservasiRanapController.php:104
* @route '/rawat-inap/catatan-observasi'
*/
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::deleteMethod
* @see app/Http/Controllers/CatatanObservasiRanapController.php:104
* @route '/rawat-inap/catatan-observasi'
*/
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

const catatanObservasi = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    delete: Object.assign(deleteMethod, deleteMethod),
}

export default catatanObservasi