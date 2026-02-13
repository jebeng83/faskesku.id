import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::create
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:390
* @route '/api/satusehat/dispatch/batches'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/api/satusehat/dispatch/batches',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::create
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:390
* @route '/api/satusehat/dispatch/batches'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::create
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:390
* @route '/api/satusehat/dispatch/batches'
*/
create.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::start
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:484
* @route '/api/satusehat/dispatch/batches/{batchId}/start'
*/
export const start = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(args, options),
    method: 'post',
})

start.definition = {
    methods: ["post"],
    url: '/api/satusehat/dispatch/batches/{batchId}/start',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::start
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:484
* @route '/api/satusehat/dispatch/batches/{batchId}/start'
*/
start.url = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return start.definition.url
            .replace('{batchId}', parsedArgs.batchId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::start
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:484
* @route '/api/satusehat/dispatch/batches/{batchId}/start'
*/
start.post = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::run_once
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:513
* @route '/api/satusehat/dispatch/batches/{batchId}/run-once'
*/
export const run_once = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: run_once.url(args, options),
    method: 'post',
})

run_once.definition = {
    methods: ["post"],
    url: '/api/satusehat/dispatch/batches/{batchId}/run-once',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::run_once
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:513
* @route '/api/satusehat/dispatch/batches/{batchId}/run-once'
*/
run_once.url = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return run_once.definition.url
            .replace('{batchId}', parsedArgs.batchId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::run_once
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:513
* @route '/api/satusehat/dispatch/batches/{batchId}/run-once'
*/
run_once.post = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: run_once.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::get
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:541
* @route '/api/satusehat/dispatch/batches/{batchId}'
*/
export const get = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(args, options),
    method: 'get',
})

get.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/dispatch/batches/{batchId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::get
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:541
* @route '/api/satusehat/dispatch/batches/{batchId}'
*/
get.url = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return get.definition.url
            .replace('{batchId}', parsedArgs.batchId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::get
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:541
* @route '/api/satusehat/dispatch/batches/{batchId}'
*/
get.get = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::get
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:541
* @route '/api/satusehat/dispatch/batches/{batchId}'
*/
get.head = (args: { batchId: string | number } | [batchId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: get.url(args, options),
    method: 'head',
})

const batches = {
    create: Object.assign(create, create),
    start: Object.assign(start, start),
    run_once: Object.assign(run_once, run_once),
    get: Object.assign(get, get),
}

export default batches