import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::getRecords
* @see app/Http/Controllers/CatatanObservasiRanapController.php:15
* @route '/rawat-inap/catatan-observasi'
*/
export const getRecords = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRecords.url(options),
    method: 'get',
})

getRecords.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/catatan-observasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::getRecords
* @see app/Http/Controllers/CatatanObservasiRanapController.php:15
* @route '/rawat-inap/catatan-observasi'
*/
getRecords.url = (options?: RouteQueryOptions) => {
    return getRecords.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::getRecords
* @see app/Http/Controllers/CatatanObservasiRanapController.php:15
* @route '/rawat-inap/catatan-observasi'
*/
getRecords.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRecords.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::getRecords
* @see app/Http/Controllers/CatatanObservasiRanapController.php:15
* @route '/rawat-inap/catatan-observasi'
*/
getRecords.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRecords.url(options),
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
* @see \App\Http\Controllers\CatatanObservasiRanapController::destroy
* @see app/Http/Controllers/CatatanObservasiRanapController.php:104
* @route '/rawat-inap/catatan-observasi'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/rawat-inap/catatan-observasi',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::destroy
* @see app/Http/Controllers/CatatanObservasiRanapController.php:104
* @route '/rawat-inap/catatan-observasi'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatatanObservasiRanapController::destroy
* @see app/Http/Controllers/CatatanObservasiRanapController.php:104
* @route '/rawat-inap/catatan-observasi'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

const CatatanObservasiRanapController = { getRecords, store, update, destroy }

export default CatatanObservasiRanapController