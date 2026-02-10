import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import prerequisites from './prerequisites'
import interoperabilitas from './interoperabilitas'
/**
* @see [serialized-closure]:2
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
* @see [serialized-closure]:2
* @route '/satusehat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/satusehat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/satusehat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see [serialized-closure]:2
* @route '/satusehat/mapping-practitioner'
*/
export const mappingPractitioner = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mappingPractitioner.url(options),
    method: 'get',
})

mappingPractitioner.definition = {
    methods: ["get","head"],
    url: '/satusehat/mapping-practitioner',
} satisfies RouteDefinition<["get","head"]>

/**
* @see [serialized-closure]:2
* @route '/satusehat/mapping-practitioner'
*/
mappingPractitioner.url = (options?: RouteQueryOptions) => {
    return mappingPractitioner.definition.url + queryParams(options)
}

/**
* @see [serialized-closure]:2
* @route '/satusehat/mapping-practitioner'
*/
mappingPractitioner.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mappingPractitioner.url(options),
    method: 'get',
})

/**
* @see [serialized-closure]:2
* @route '/satusehat/mapping-practitioner'
*/
mappingPractitioner.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mappingPractitioner.url(options),
    method: 'head',
})

const satusehat = {
    index: Object.assign(index, index),
    prerequisites: Object.assign(prerequisites, prerequisites),
    interoperabilitas: Object.assign(interoperabilitas, interoperabilitas),
    mappingPractitioner: Object.assign(mappingPractitioner, mappingPractitioner),
}

export default satusehat