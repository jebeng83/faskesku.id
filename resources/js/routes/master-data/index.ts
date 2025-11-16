import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:56
=======
* @see routes/web.php:59
>>>>>>> origin/main
* @route '/master-data'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/master-data',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:56
=======
* @see routes/web.php:59
>>>>>>> origin/main
* @route '/master-data'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:56
=======
* @see routes/web.php:59
>>>>>>> origin/main
* @route '/master-data'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:56
=======
* @see routes/web.php:59
>>>>>>> origin/main
* @route '/master-data'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const masterData = {
    index: Object.assign(index, index),
}

export default masterData