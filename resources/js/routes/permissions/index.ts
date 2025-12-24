import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:765
=======
* @see routes/web.php:885
>>>>>>> 697e42ab (BelumFixTVPoli)
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
* @see routes/web.php:765
=======
* @see routes/web.php:885
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/permissions'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:765
=======
* @see routes/web.php:885
>>>>>>> 697e42ab (BelumFixTVPoli)
* @route '/permissions'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
<<<<<<< HEAD
* @see routes/web.php:765
=======
* @see routes/web.php:885
>>>>>>> 697e42ab (BelumFixTVPoli)
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