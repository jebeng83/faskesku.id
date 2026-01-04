import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import summary from './summary'
import attempts from './attempts'
import raw from './raw'
/**
* @see routes/web.php:1195
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
* @see routes/web.php:1195
* @route '/pcare/monitoring-status'
*/
status.url = (options?: RouteQueryOptions) => {
    return status.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1195
* @route '/pcare/monitoring-status'
*/
status.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1195
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