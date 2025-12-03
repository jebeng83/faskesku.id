import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import prerequisites from './prerequisites'
import interoperabilitas from './interoperabilitas'
/**
* @see routes/web.php:1074
* @route '/satusehat'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/satusehat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1074
* @route '/satusehat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1074
* @route '/satusehat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1074
* @route '/satusehat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const satusehat = {
    index: Object.assign(index, index),
    prerequisites: Object.assign(prerequisites, prerequisites),
    interoperabilitas: Object.assign(interoperabilitas, interoperabilitas),
}

export default satusehat