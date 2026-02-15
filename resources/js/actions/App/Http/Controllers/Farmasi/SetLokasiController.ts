import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::index
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:16
* @route '/farmasi/set-lokasi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/set-lokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::index
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:16
* @route '/farmasi/set-lokasi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::index
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:16
* @route '/farmasi/set-lokasi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::index
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:16
* @route '/farmasi/set-lokasi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

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

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::ralanStore
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:104
* @route '/farmasi/set-lokasi/ralan-mapping'
*/
export const ralanStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ralanStore.url(options),
    method: 'post',
})

ralanStore.definition = {
    methods: ["post"],
    url: '/farmasi/set-lokasi/ralan-mapping',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::ralanStore
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:104
* @route '/farmasi/set-lokasi/ralan-mapping'
*/
ralanStore.url = (options?: RouteQueryOptions) => {
    return ralanStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::ralanStore
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:104
* @route '/farmasi/set-lokasi/ralan-mapping'
*/
ralanStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ralanStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::ralanDestroy
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:119
* @route '/farmasi/set-lokasi/ralan-mapping'
*/
export const ralanDestroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: ralanDestroy.url(options),
    method: 'delete',
})

ralanDestroy.definition = {
    methods: ["delete"],
    url: '/farmasi/set-lokasi/ralan-mapping',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::ralanDestroy
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:119
* @route '/farmasi/set-lokasi/ralan-mapping'
*/
ralanDestroy.url = (options?: RouteQueryOptions) => {
    return ralanDestroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::ralanDestroy
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:119
* @route '/farmasi/set-lokasi/ralan-mapping'
*/
ralanDestroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: ralanDestroy.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::ranapStore
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:134
* @route '/farmasi/set-lokasi/ranap-mapping'
*/
export const ranapStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ranapStore.url(options),
    method: 'post',
})

ranapStore.definition = {
    methods: ["post"],
    url: '/farmasi/set-lokasi/ranap-mapping',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::ranapStore
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:134
* @route '/farmasi/set-lokasi/ranap-mapping'
*/
ranapStore.url = (options?: RouteQueryOptions) => {
    return ranapStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::ranapStore
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:134
* @route '/farmasi/set-lokasi/ranap-mapping'
*/
ranapStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ranapStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::ranapDestroy
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:149
* @route '/farmasi/set-lokasi/ranap-mapping'
*/
export const ranapDestroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: ranapDestroy.url(options),
    method: 'delete',
})

ranapDestroy.definition = {
    methods: ["delete"],
    url: '/farmasi/set-lokasi/ranap-mapping',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::ranapDestroy
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:149
* @route '/farmasi/set-lokasi/ranap-mapping'
*/
ranapDestroy.url = (options?: RouteQueryOptions) => {
    return ranapDestroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetLokasiController::ranapDestroy
* @see app/Http/Controllers/Farmasi/SetLokasiController.php:149
* @route '/farmasi/set-lokasi/ranap-mapping'
*/
ranapDestroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: ranapDestroy.url(options),
    method: 'delete',
})

const SetLokasiController = { index, store, update, destroy, ralanStore, ralanDestroy, ranapStore, ranapDestroy }

export default SetLokasiController