import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalanController::store
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:265
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:265
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalanController::store
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:265
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:265
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::store
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:265
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:265
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalanController::deleteMethod
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:302
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:302
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatJalanController::deleteMethod
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:302
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:302
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::deleteMethod
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:302
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:302
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RawatJalanController::update
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:326
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:326
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RawatJalanController::update
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:326
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:326
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalanController::update
<<<<<<< HEAD
* @see app/Http/Controllers/RawatJalanController.php:326
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
=======
 * @see app/Http/Controllers/RawatJalanController.php:326
 * @route '/rawat-jalan/pemeriksaan-ralan'
 */
>>>>>>> kohsun
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})
<<<<<<< HEAD

const pemeriksaanRalan = {
    store: Object.assign(store, store),
    delete: Object.assign(deleteMethod, deleteMethod),
    update: Object.assign(update, update),
=======
const pemeriksaanRalan = {
    store,
delete: deleteMethod,
update,
>>>>>>> kohsun
}

export default pemeriksaanRalan