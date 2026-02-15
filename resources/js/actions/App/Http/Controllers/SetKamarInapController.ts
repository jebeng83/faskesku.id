import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SetKamarInapController::apiShow
* @see app/Http/Controllers/SetKamarInapController.php:24
* @route '/api/set-kamar-inap'
*/
export const apiShow = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiShow.url(options),
    method: 'get',
})

apiShow.definition = {
    methods: ["get","head"],
    url: '/api/set-kamar-inap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SetKamarInapController::apiShow
* @see app/Http/Controllers/SetKamarInapController.php:24
* @route '/api/set-kamar-inap'
*/
apiShow.url = (options?: RouteQueryOptions) => {
    return apiShow.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetKamarInapController::apiShow
* @see app/Http/Controllers/SetKamarInapController.php:24
* @route '/api/set-kamar-inap'
*/
apiShow.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiShow.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SetKamarInapController::apiShow
* @see app/Http/Controllers/SetKamarInapController.php:24
* @route '/api/set-kamar-inap'
*/
apiShow.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: apiShow.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SetKamarInapController::apiStore
* @see app/Http/Controllers/SetKamarInapController.php:54
* @route '/api/set-kamar-inap'
*/
export const apiStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apiStore.url(options),
    method: 'post',
})

apiStore.definition = {
    methods: ["post"],
    url: '/api/set-kamar-inap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SetKamarInapController::apiStore
* @see app/Http/Controllers/SetKamarInapController.php:54
* @route '/api/set-kamar-inap'
*/
apiStore.url = (options?: RouteQueryOptions) => {
    return apiStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetKamarInapController::apiStore
* @see app/Http/Controllers/SetKamarInapController.php:54
* @route '/api/set-kamar-inap'
*/
apiStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apiStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SetKamarInapController::apiUpdate
* @see app/Http/Controllers/SetKamarInapController.php:91
* @route '/api/set-kamar-inap'
*/
export const apiUpdate = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: apiUpdate.url(options),
    method: 'put',
})

apiUpdate.definition = {
    methods: ["put"],
    url: '/api/set-kamar-inap',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SetKamarInapController::apiUpdate
* @see app/Http/Controllers/SetKamarInapController.php:91
* @route '/api/set-kamar-inap'
*/
apiUpdate.url = (options?: RouteQueryOptions) => {
    return apiUpdate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetKamarInapController::apiUpdate
* @see app/Http/Controllers/SetKamarInapController.php:91
* @route '/api/set-kamar-inap'
*/
apiUpdate.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: apiUpdate.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SetKamarInapController::apiDestroy
* @see app/Http/Controllers/SetKamarInapController.php:126
* @route '/api/set-kamar-inap'
*/
export const apiDestroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: apiDestroy.url(options),
    method: 'delete',
})

apiDestroy.definition = {
    methods: ["delete"],
    url: '/api/set-kamar-inap',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SetKamarInapController::apiDestroy
* @see app/Http/Controllers/SetKamarInapController.php:126
* @route '/api/set-kamar-inap'
*/
apiDestroy.url = (options?: RouteQueryOptions) => {
    return apiDestroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetKamarInapController::apiDestroy
* @see app/Http/Controllers/SetKamarInapController.php:126
* @route '/api/set-kamar-inap'
*/
apiDestroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: apiDestroy.url(options),
    method: 'delete',
})

const SetKamarInapController = { apiShow, apiStore, apiUpdate, apiDestroy }

export default SetKamarInapController