import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\QueueController::create
* @see app/Http/Controllers/QueueController.php:35
* @route '/api/queue/tickets'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/api/queue/tickets',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QueueController::create
* @see app/Http/Controllers/QueueController.php:35
* @route '/api/queue/tickets'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QueueController::create
* @see app/Http/Controllers/QueueController.php:35
* @route '/api/queue/tickets'
*/
create.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QueueController::current
* @see app/Http/Controllers/QueueController.php:162
* @route '/api/queue/current'
*/
export const current = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: current.url(options),
    method: 'get',
})

current.definition = {
    methods: ["get","head"],
    url: '/api/queue/current',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QueueController::current
* @see app/Http/Controllers/QueueController.php:162
* @route '/api/queue/current'
*/
current.url = (options?: RouteQueryOptions) => {
    return current.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QueueController::current
* @see app/Http/Controllers/QueueController.php:162
* @route '/api/queue/current'
*/
current.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: current.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QueueController::current
* @see app/Http/Controllers/QueueController.php:162
* @route '/api/queue/current'
*/
current.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: current.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\QueueController::today
* @see app/Http/Controllers/QueueController.php:232
* @route '/api/queue/today'
*/
export const today = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: today.url(options),
    method: 'get',
})

today.definition = {
    methods: ["get","head"],
    url: '/api/queue/today',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QueueController::today
* @see app/Http/Controllers/QueueController.php:232
* @route '/api/queue/today'
*/
today.url = (options?: RouteQueryOptions) => {
    return today.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QueueController::today
* @see app/Http/Controllers/QueueController.php:232
* @route '/api/queue/today'
*/
today.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: today.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QueueController::today
* @see app/Http/Controllers/QueueController.php:232
* @route '/api/queue/today'
*/
today.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: today.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\QueueController::call
* @see app/Http/Controllers/QueueController.php:333
* @route '/api/queue/call'
*/
export const call = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: call.url(options),
    method: 'post',
})

call.definition = {
    methods: ["post"],
    url: '/api/queue/call',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QueueController::call
* @see app/Http/Controllers/QueueController.php:333
* @route '/api/queue/call'
*/
call.url = (options?: RouteQueryOptions) => {
    return call.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QueueController::call
* @see app/Http/Controllers/QueueController.php:333
* @route '/api/queue/call'
*/
call.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: call.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QueueController::finish
* @see app/Http/Controllers/QueueController.php:430
* @route '/api/queue/finish'
*/
export const finish = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: finish.url(options),
    method: 'post',
})

finish.definition = {
    methods: ["post"],
    url: '/api/queue/finish',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QueueController::finish
* @see app/Http/Controllers/QueueController.php:430
* @route '/api/queue/finish'
*/
finish.url = (options?: RouteQueryOptions) => {
    return finish.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QueueController::finish
* @see app/Http/Controllers/QueueController.php:430
* @route '/api/queue/finish'
*/
finish.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: finish.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QueueController::cancel
* @see app/Http/Controllers/QueueController.php:521
* @route '/api/queue/cancel'
*/
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/api/queue/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QueueController::cancel
* @see app/Http/Controllers/QueueController.php:521
* @route '/api/queue/cancel'
*/
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QueueController::cancel
* @see app/Http/Controllers/QueueController.php:521
* @route '/api/queue/cancel'
*/
cancel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

const QueueController = { create, current, today, call, finish, cancel }

export default QueueController