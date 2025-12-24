import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:770
=======
* @see routes/web.php:890
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/users'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/users',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:770
=======
* @see routes/web.php:890
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/users'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:770
=======
* @see routes/web.php:890
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/users'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:770
=======
* @see routes/web.php:890
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/users'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const users = {
    index: Object.assign(index, index),
}

export default users