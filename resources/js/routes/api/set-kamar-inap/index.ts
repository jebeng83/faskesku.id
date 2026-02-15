import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SetKamarInapController::show
* @see app/Http/Controllers/SetKamarInapController.php:24
* @route '/api/set-kamar-inap'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/set-kamar-inap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SetKamarInapController::show
* @see app/Http/Controllers/SetKamarInapController.php:24
* @route '/api/set-kamar-inap'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetKamarInapController::show
* @see app/Http/Controllers/SetKamarInapController.php:24
* @route '/api/set-kamar-inap'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SetKamarInapController::show
* @see app/Http/Controllers/SetKamarInapController.php:24
* @route '/api/set-kamar-inap'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SetKamarInapController::store
* @see app/Http/Controllers/SetKamarInapController.php:54
* @route '/api/set-kamar-inap'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/set-kamar-inap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SetKamarInapController::store
* @see app/Http/Controllers/SetKamarInapController.php:54
* @route '/api/set-kamar-inap'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetKamarInapController::store
* @see app/Http/Controllers/SetKamarInapController.php:54
* @route '/api/set-kamar-inap'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SetKamarInapController::update
* @see app/Http/Controllers/SetKamarInapController.php:91
* @route '/api/set-kamar-inap'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/set-kamar-inap',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SetKamarInapController::update
* @see app/Http/Controllers/SetKamarInapController.php:91
* @route '/api/set-kamar-inap'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetKamarInapController::update
* @see app/Http/Controllers/SetKamarInapController.php:91
* @route '/api/set-kamar-inap'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SetKamarInapController::destroy
* @see app/Http/Controllers/SetKamarInapController.php:126
* @route '/api/set-kamar-inap'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/set-kamar-inap',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SetKamarInapController::destroy
* @see app/Http/Controllers/SetKamarInapController.php:126
* @route '/api/set-kamar-inap'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetKamarInapController::destroy
* @see app/Http/Controllers/SetKamarInapController.php:126
* @route '/api/set-kamar-inap'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

const setKamarInap = {
    show: Object.assign(show, show),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default setKamarInap