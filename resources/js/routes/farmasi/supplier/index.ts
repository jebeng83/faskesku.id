import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:281
=======
* @see routes/web.php:277
>>>>>>> main
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
<<<<<<< HEAD
* @see routes/web.php:281
=======
* @see routes/web.php:277
>>>>>>> main
* @route '/farmasi/supplier'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:281
=======
* @see routes/web.php:277
>>>>>>> main
* @route '/farmasi/supplier'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
<<<<<<< HEAD
* @see routes/web.php:281
=======
* @see routes/web.php:277
>>>>>>> main
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