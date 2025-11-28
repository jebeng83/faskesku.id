import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see [serialized-closure]:2
* @route '/farmasi/supplier'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/supplier',
} satisfies RouteDefinition<["get","head"]>

/**
* @see [serialized-closure]:2
* @route '/farmasi/supplier'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/farmasi/supplier'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/farmasi/supplier'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const supplier = {
    index: Object.assign(index, index),
}

export default supplier