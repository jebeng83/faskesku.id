import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:50
* @route '/users'
*/
=======
 * @see routes/web.php:42
 * @route '/users'
 */
>>>>>>> kohsun
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
* @see routes/web.php:50
* @route '/users'
*/
=======
 * @see routes/web.php:42
 * @route '/users'
 */
>>>>>>> kohsun
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:50
* @route '/users'
*/
=======
 * @see routes/web.php:42
 * @route '/users'
 */
>>>>>>> kohsun
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see routes/web.php:50
* @route '/users'
*/
=======
/**
 * @see routes/web.php:42
 * @route '/users'
 */
>>>>>>> kohsun
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
<<<<<<< HEAD

const users = {
    index: Object.assign(index, index),
=======
const users = {
    index,
>>>>>>> kohsun
}

export default users