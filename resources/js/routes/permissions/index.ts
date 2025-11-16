import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:95
=======
* @see routes/web.php:104
>>>>>>> origin/main
* @route '/permissions'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/permissions',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:95
=======
* @see routes/web.php:104
>>>>>>> origin/main
* @route '/permissions'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:95
=======
* @see routes/web.php:104
>>>>>>> origin/main
* @route '/permissions'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:95
=======
* @see routes/web.php:104
>>>>>>> origin/main
* @route '/permissions'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const permissions = {
    index: Object.assign(index, index),
}

export default permissions