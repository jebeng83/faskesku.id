import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\KamarController::apiIndex
* @see app/Http/Controllers/KamarController.php:258
* @route '/api/kamar'
*/
export const apiIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiIndex.url(options),
    method: 'get',
})

apiIndex.definition = {
    methods: ["get","head"],
    url: '/api/kamar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KamarController::apiIndex
* @see app/Http/Controllers/KamarController.php:258
* @route '/api/kamar'
*/
apiIndex.url = (options?: RouteQueryOptions) => {
    return apiIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarController::apiIndex
* @see app/Http/Controllers/KamarController.php:258
* @route '/api/kamar'
*/
apiIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KamarController::apiIndex
* @see app/Http/Controllers/KamarController.php:258
* @route '/api/kamar'
*/
apiIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: apiIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KamarController::apiStore
* @see app/Http/Controllers/KamarController.php:300
* @route '/api/kamar'
*/
export const apiStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apiStore.url(options),
    method: 'post',
})

apiStore.definition = {
    methods: ["post"],
    url: '/api/kamar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KamarController::apiStore
* @see app/Http/Controllers/KamarController.php:300
* @route '/api/kamar'
*/
apiStore.url = (options?: RouteQueryOptions) => {
    return apiStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarController::apiStore
* @see app/Http/Controllers/KamarController.php:300
* @route '/api/kamar'
*/
apiStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apiStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KamarController::apiUpdate
* @see app/Http/Controllers/KamarController.php:320
* @route '/api/kamar/{kd_kamar}'
*/
export const apiUpdate = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: apiUpdate.url(args, options),
    method: 'put',
})

apiUpdate.definition = {
    methods: ["put"],
    url: '/api/kamar/{kd_kamar}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\KamarController::apiUpdate
* @see app/Http/Controllers/KamarController.php:320
* @route '/api/kamar/{kd_kamar}'
*/
apiUpdate.url = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_kamar: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_kamar: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_kamar: args.kd_kamar,
    }

    return apiUpdate.definition.url
            .replace('{kd_kamar}', parsedArgs.kd_kamar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarController::apiUpdate
* @see app/Http/Controllers/KamarController.php:320
* @route '/api/kamar/{kd_kamar}'
*/
apiUpdate.put = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: apiUpdate.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\KamarController::apiDestroy
* @see app/Http/Controllers/KamarController.php:341
* @route '/api/kamar/{kd_kamar}'
*/
export const apiDestroy = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: apiDestroy.url(args, options),
    method: 'delete',
})

apiDestroy.definition = {
    methods: ["delete"],
    url: '/api/kamar/{kd_kamar}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KamarController::apiDestroy
* @see app/Http/Controllers/KamarController.php:341
* @route '/api/kamar/{kd_kamar}'
*/
apiDestroy.url = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_kamar: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_kamar: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_kamar: args.kd_kamar,
    }

    return apiDestroy.definition.url
            .replace('{kd_kamar}', parsedArgs.kd_kamar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarController::apiDestroy
* @see app/Http/Controllers/KamarController.php:341
* @route '/api/kamar/{kd_kamar}'
*/
apiDestroy.delete = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: apiDestroy.url(args, options),
    method: 'delete',
})

const KamarController = { apiIndex, apiStore, apiUpdate, apiDestroy }

export default KamarController