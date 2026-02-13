import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::list
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:541
* @route '/api/satusehat/dispatch/batches/{batchId}/items'
*/
export const list = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(args, options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/dispatch/batches/{batchId}/items',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::list
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:541
* @route '/api/satusehat/dispatch/batches/{batchId}/items'
*/
list.url = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { batchId: args }
    }

    if (Array.isArray(args)) {
        args = {
            batchId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        batchId: args.batchId,
    }

    return list.definition.url
            .replace('{batchId}', parsedArgs.batchId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::list
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:541
* @route '/api/satusehat/dispatch/batches/{batchId}/items'
*/
list.get = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::list
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:541
* @route '/api/satusehat/dispatch/batches/{batchId}/items'
*/
list.head = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::retry_failed
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:577
* @route '/api/satusehat/dispatch/batches/{batchId}/retry-failed'
*/
export const retry_failed = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retry_failed.url(args, options),
    method: 'post',
})

retry_failed.definition = {
    methods: ["post"],
    url: '/api/satusehat/dispatch/batches/{batchId}/retry-failed',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::retry_failed
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:577
* @route '/api/satusehat/dispatch/batches/{batchId}/retry-failed'
*/
retry_failed.url = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { batchId: args }
    }

    if (Array.isArray(args)) {
        args = {
            batchId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        batchId: args.batchId,
    }

    return retry_failed.definition.url
            .replace('{batchId}', parsedArgs.batchId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::retry_failed
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:577
* @route '/api/satusehat/dispatch/batches/{batchId}/retry-failed'
*/
retry_failed.post = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retry_failed.url(args, options),
    method: 'post',
})

const items = {
    list: Object.assign(list, list),
    retry_failed: Object.assign(retry_failed, retry_failed),
}

export default items