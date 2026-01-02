import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import summary from './summary'
import attempts from './attempts'
import raw from './raw'
/**
<<<<<<< HEAD
* @see routes/web.php:1195
=======
* @see routes/web.php:1192
>>>>>>> main
* @route '/pcare/monitoring-status'
*/
export const status = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/pcare/monitoring-status',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:1195
=======
* @see routes/web.php:1192
>>>>>>> main
* @route '/pcare/monitoring-status'
*/
status.url = (options?: RouteQueryOptions) => {
    return status.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1195
=======
* @see routes/web.php:1192
>>>>>>> main
* @route '/pcare/monitoring-status'
*/
status.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1195
=======
* @see routes/web.php:1192
>>>>>>> main
* @route '/pcare/monitoring-status'
*/
status.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(options),
    method: 'head',
})

const monitoring = {
    status: Object.assign(status, status),
    summary: Object.assign(summary, summary),
    attempts: Object.assign(attempts, attempts),
    raw: Object.assign(raw, raw),
}

export default monitoring