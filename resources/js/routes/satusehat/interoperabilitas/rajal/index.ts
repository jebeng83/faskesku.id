import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see routes/web.php:3435
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
* @see routes/web.php:3435
* @route '/satusehat/interoperabilitas/rajal/encounter'
*/
encounter.url = (options?: RouteQueryOptions) => {
    return encounter.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3435
* @route '/satusehat/interoperabilitas/rajal/encounter'
*/
encounter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounter.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3435
* @route '/satusehat/interoperabilitas/rajal/encounter'
*/
encounter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: encounter.url(options),
    method: 'head',
})

/**
* @see routes/web.php:3439
* @route '/satusehat/interoperabilitas/rajal/prosedur-tindakan'
*/
export const prosedur_tindakan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prosedur_tindakan.url(options),
    method: 'get',
})

prosedur_tindakan.definition = {
    methods: ["get","head"],
    url: '/satusehat/interoperabilitas/rajal/prosedur-tindakan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:3439
* @route '/satusehat/interoperabilitas/rajal/prosedur-tindakan'
*/
prosedur_tindakan.url = (options?: RouteQueryOptions) => {
    return prosedur_tindakan.definition.url + queryParams(options)
}

/**
* @see routes/web.php:3439
* @route '/satusehat/interoperabilitas/rajal/prosedur-tindakan'
*/
prosedur_tindakan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prosedur_tindakan.url(options),
    method: 'get',
})

/**
* @see routes/web.php:3439
* @route '/satusehat/interoperabilitas/rajal/prosedur-tindakan'
*/
prosedur_tindakan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: prosedur_tindakan.url(options),
    method: 'head',
})

const rajal = {
    encounter: Object.assign(encounter, encounter),
    prosedur_tindakan: Object.assign(prosedur_tindakan, prosedur_tindakan),
}

export default rajal