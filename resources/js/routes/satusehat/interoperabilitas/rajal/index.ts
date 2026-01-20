import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see routes/web.php:2052
* @route '/satusehat/interoperabilitas/rajal/encounter'
*/
export const encounter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounter.url(options),
    method: 'get',
})

encounter.definition = {
    methods: ["get","head"],
    url: '/satusehat/interoperabilitas/rajal/encounter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:2052
* @route '/satusehat/interoperabilitas/rajal/encounter'
*/
encounter.url = (options?: RouteQueryOptions) => {
    return encounter.definition.url + queryParams(options)
}

/**
* @see routes/web.php:2052
* @route '/satusehat/interoperabilitas/rajal/encounter'
*/
encounter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounter.url(options),
    method: 'get',
})

/**
* @see routes/web.php:2052
* @route '/satusehat/interoperabilitas/rajal/encounter'
*/
encounter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: encounter.url(options),
    method: 'head',
})

const rajal = {
    encounter: Object.assign(encounter, encounter),
}

export default rajal