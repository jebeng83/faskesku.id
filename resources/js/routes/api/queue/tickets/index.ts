import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\QueueController::create
* @see app/Http/Controllers/QueueController.php:13
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
* @see app/Http/Controllers/QueueController.php:13
* @route '/api/queue/tickets'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QueueController::create
* @see app/Http/Controllers/QueueController.php:13
* @route '/api/queue/tickets'
*/
create.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

const tickets = {
    create: Object.assign(create, create),
}

export default tickets