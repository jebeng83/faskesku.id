import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\PenjabController::index
<<<<<<< HEAD
* @see app/Http/Controllers/API/PenjabController.php:13
* @route '/api/penjab'
*/
=======
 * @see app/Http/Controllers/API/PenjabController.php:13
 * @route '/api/penjab'
 */
>>>>>>> kohsun
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/penjab',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PenjabController::index
<<<<<<< HEAD
* @see app/Http/Controllers/API/PenjabController.php:13
* @route '/api/penjab'
*/
=======
 * @see app/Http/Controllers/API/PenjabController.php:13
 * @route '/api/penjab'
 */
>>>>>>> kohsun
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PenjabController::index
<<<<<<< HEAD
* @see app/Http/Controllers/API/PenjabController.php:13
* @route '/api/penjab'
*/
=======
 * @see app/Http/Controllers/API/PenjabController.php:13
 * @route '/api/penjab'
 */
>>>>>>> kohsun
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\PenjabController::index
* @see app/Http/Controllers/API/PenjabController.php:13
* @route '/api/penjab'
*/
=======
/**
* @see \App\Http\Controllers\API\PenjabController::index
 * @see app/Http/Controllers/API/PenjabController.php:13
 * @route '/api/penjab'
 */
>>>>>>> kohsun
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PenjabController::store
<<<<<<< HEAD
* @see app/Http/Controllers/API/PenjabController.php:24
* @route '/api/penjab'
*/
=======
 * @see app/Http/Controllers/API/PenjabController.php:24
 * @route '/api/penjab'
 */
>>>>>>> kohsun
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/penjab',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\PenjabController::store
<<<<<<< HEAD
* @see app/Http/Controllers/API/PenjabController.php:24
* @route '/api/penjab'
*/
=======
 * @see app/Http/Controllers/API/PenjabController.php:24
 * @route '/api/penjab'
 */
>>>>>>> kohsun
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PenjabController::store
<<<<<<< HEAD
* @see app/Http/Controllers/API/PenjabController.php:24
* @route '/api/penjab'
*/
=======
 * @see app/Http/Controllers/API/PenjabController.php:24
 * @route '/api/penjab'
 */
>>>>>>> kohsun
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})
<<<<<<< HEAD

=======
>>>>>>> kohsun
const PenjabController = { index, store }

export default PenjabController