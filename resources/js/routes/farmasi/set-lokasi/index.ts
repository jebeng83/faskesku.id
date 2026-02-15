import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import ralanMapping from './ralan-mapping'
import ranapMapping from './ranap-mapping'
/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::store
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:59
* @route '/farmasi/set-lokasi'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/set-lokasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::store
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:59
* @route '/farmasi/set-lokasi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::store
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:59
* @route '/farmasi/set-lokasi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::update
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:77
* @route '/farmasi/set-lokasi'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/farmasi/set-lokasi',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::update
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:77
* @route '/farmasi/set-lokasi'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::update
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:77
* @route '/farmasi/set-lokasi'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::destroy
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:95
* @route '/farmasi/set-lokasi'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/farmasi/set-lokasi',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::destroy
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:95
* @route '/farmasi/set-lokasi'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::destroy
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:95
* @route '/farmasi/set-lokasi'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

const setLokasi = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    ralanMapping: Object.assign(ralanMapping, ralanMapping),
    ranapMapping: Object.assign(ranapMapping, ranapMapping),
}

export default setLokasi