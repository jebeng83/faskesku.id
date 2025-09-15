import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalanController::search
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:372
* @route '/pegawai/search'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:372
 * @route '/pegawai/search'
 */
>>>>>>> kohsun
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/pegawai/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalanController::search
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:372
* @route '/pegawai/search'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:372
 * @route '/pegawai/search'
 */
>>>>>>> kohsun
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::search
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:372
* @route '/pegawai/search'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:372
 * @route '/pegawai/search'
 */
>>>>>>> kohsun
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\RawatJalanController::search
* @see app/Http/Controllers/RawatJalanController.php:372
* @route '/pegawai/search'
*/
=======
/**
* @see \App\Http\Controllers\RawatJalanController::search
 * @see app/Http/Controllers/RawatJalanController.php:372
 * @route '/pegawai/search'
 */
>>>>>>> kohsun
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})
<<<<<<< HEAD

const pegawai = {
    search: Object.assign(search, search),
=======
const pegawai = {
    search,
>>>>>>> kohsun
}

export default pegawai