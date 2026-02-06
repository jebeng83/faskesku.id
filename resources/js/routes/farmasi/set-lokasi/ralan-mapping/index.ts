import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::store
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:93
* @route '/farmasi/set-lokasi/ralan-mapping'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/set-lokasi/ralan-mapping',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::store
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:93
* @route '/farmasi/set-lokasi/ralan-mapping'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::store
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:93
* @route '/farmasi/set-lokasi/ralan-mapping'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::destroy
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:108
* @route '/farmasi/set-lokasi/ralan-mapping'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/farmasi/set-lokasi/ralan-mapping',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::destroy
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:108
* @route '/farmasi/set-lokasi/ralan-mapping'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::destroy
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:108
* @route '/farmasi/set-lokasi/ralan-mapping'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

const ralanMapping = {
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default ralanMapping