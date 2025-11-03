import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import poli16996d from './poli'
/**
* @see routes/web.php:364
* @route '/pcare/mapping/poli'
*/
export const poli = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

poli.definition = {
    methods: ["get","head"],
    url: '/pcare/mapping/poli',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:364
* @route '/pcare/mapping/poli'
*/
poli.url = (options?: RouteQueryOptions) => {
    return poli.definition.url + queryParams(options)
}

/**
* @see routes/web.php:364
* @route '/pcare/mapping/poli'
*/
poli.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poli.url(options),
    method: 'get',
})

/**
* @see routes/web.php:364
* @route '/pcare/mapping/poli'
*/
poli.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: poli.url(options),
    method: 'head',
})

const mapping = {
    poli: Object.assign(poli, poli16996d),
}

export default mapping