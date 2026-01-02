import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see routes/web.php:84
* @route '/antrian/loket'
*/
export const loket = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loket.url(options),
    method: 'get',
})

loket.definition = {
    methods: ["get","head"],
    url: '/antrian/loket',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:84
* @route '/antrian/loket'
*/
loket.url = (options?: RouteQueryOptions) => {
    return loket.definition.url + queryParams(options)
}

/**
* @see routes/web.php:84
* @route '/antrian/loket'
*/
loket.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loket.url(options),
    method: 'get',
})

/**
* @see routes/web.php:84
* @route '/antrian/loket'
*/
loket.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: loket.url(options),
    method: 'head',
})

/**
* @see routes/web.php:236
* @route '/antrian/display'
*/
export const display = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: display.url(options),
    method: 'get',
})

display.definition = {
    methods: ["get","head"],
    url: '/antrian/display',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:236
* @route '/antrian/display'
*/
display.url = (options?: RouteQueryOptions) => {
    return display.definition.url + queryParams(options)
}

/**
* @see routes/web.php:236
* @route '/antrian/display'
*/
display.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: display.url(options),
    method: 'get',
})

/**
* @see routes/web.php:236
* @route '/antrian/display'
*/
display.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: display.url(options),
    method: 'head',
})

const antrian = {
    loket: Object.assign(loket, loket),
    display: Object.assign(display, display),
}

export default antrian