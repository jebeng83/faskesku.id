import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see routes/web.php:838
* @route '/wa-gateway/kredensial'
*/
export const kredensial = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kredensial.url(options),
    method: 'get',
})

kredensial.definition = {
    methods: ["get","head"],
    url: '/wa-gateway/kredensial',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:838
* @route '/wa-gateway/kredensial'
*/
kredensial.url = (options?: RouteQueryOptions) => {
    return kredensial.definition.url + queryParams(options)
}

/**
* @see routes/web.php:838
* @route '/wa-gateway/kredensial'
*/
kredensial.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kredensial.url(options),
    method: 'get',
})

/**
* @see routes/web.php:838
* @route '/wa-gateway/kredensial'
*/
kredensial.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kredensial.url(options),
    method: 'head',
})

const waGateway = {
    kredensial: Object.assign(kredensial, kredensial),
}

export default waGateway