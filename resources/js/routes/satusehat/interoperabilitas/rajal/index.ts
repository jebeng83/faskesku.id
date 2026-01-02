import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:1508
=======
* @see routes/web.php:1505
>>>>>>> main
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
<<<<<<< HEAD
* @see routes/web.php:1508
=======
* @see routes/web.php:1505
>>>>>>> main
* @route '/satusehat/interoperabilitas/rajal/encounter'
*/
encounter.url = (options?: RouteQueryOptions) => {
    return encounter.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:1508
=======
* @see routes/web.php:1505
>>>>>>> main
* @route '/satusehat/interoperabilitas/rajal/encounter'
*/
encounter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: encounter.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:1508
=======
* @see routes/web.php:1505
>>>>>>> main
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