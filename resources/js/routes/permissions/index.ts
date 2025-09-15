import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
<<<<<<< HEAD
* @see routes/web.php:45
* @route '/permissions'
*/
=======
 * @see routes/web.php:37
 * @route '/permissions'
 */
>>>>>>> kohsun
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
* @see routes/web.php:45
* @route '/permissions'
*/
=======
 * @see routes/web.php:37
 * @route '/permissions'
 */
>>>>>>> kohsun
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:45
* @route '/permissions'
*/
=======
 * @see routes/web.php:37
 * @route '/permissions'
 */
>>>>>>> kohsun
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see routes/web.php:45
* @route '/permissions'
*/
=======
/**
 * @see routes/web.php:37
 * @route '/permissions'
 */
>>>>>>> kohsun
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
<<<<<<< HEAD

const permissions = {
    index: Object.assign(index, index),
=======
const permissions = {
    index,
>>>>>>> kohsun
}

export default permissions