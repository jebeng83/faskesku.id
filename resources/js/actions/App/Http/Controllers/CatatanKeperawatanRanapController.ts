import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::getRecords
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:14
* @route '/rawat-inap/catatan-keperawatan'
*/
export const getRecords = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRecords.url(options),
    method: 'get',
})

getRecords.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/catatan-keperawatan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::getRecords
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:14
* @route '/rawat-inap/catatan-keperawatan'
*/
getRecords.url = (options?: RouteQueryOptions) => {
    return getRecords.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::getRecords
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:14
* @route '/rawat-inap/catatan-keperawatan'
*/
getRecords.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRecords.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::getRecords
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:14
* @route '/rawat-inap/catatan-keperawatan'
*/
getRecords.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRecords.url(options),
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
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::destroy
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:91
* @route '/rawat-inap/catatan-keperawatan'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/rawat-inap/catatan-keperawatan',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::destroy
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:91
* @route '/rawat-inap/catatan-keperawatan'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatatanKeperawatanRanapController::destroy
* @see app/Http/Controllers/CatatanKeperawatanRanapController.php:91
* @route '/rawat-inap/catatan-keperawatan'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

const CatatanKeperawatanRanapController = { getRecords, store, update, destroy }

export default CatatanKeperawatanRanapController