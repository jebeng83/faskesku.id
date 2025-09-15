import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AuthController::showLogin
<<<<<<< HEAD
* @see app/Http/Controllers/AuthController.php:11
* @route '/login'
*/
=======
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/login'
 */
>>>>>>> kohsun
export const showLogin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(options),
    method: 'get',
})

showLogin.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuthController::showLogin
<<<<<<< HEAD
* @see app/Http/Controllers/AuthController.php:11
* @route '/login'
*/
=======
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/login'
 */
>>>>>>> kohsun
showLogin.url = (options?: RouteQueryOptions) => {
    return showLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::showLogin
<<<<<<< HEAD
* @see app/Http/Controllers/AuthController.php:11
* @route '/login'
*/
=======
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/login'
 */
>>>>>>> kohsun
showLogin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\AuthController::showLogin
* @see app/Http/Controllers/AuthController.php:11
* @route '/login'
*/
=======
/**
* @see \App\Http\Controllers\AuthController::showLogin
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/login'
 */
>>>>>>> kohsun
showLogin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showLogin.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AuthController::login
<<<<<<< HEAD
* @see app/Http/Controllers/AuthController.php:16
* @route '/login'
*/
=======
 * @see app/Http/Controllers/AuthController.php:16
 * @route '/login'
 */
>>>>>>> kohsun
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::login
<<<<<<< HEAD
* @see app/Http/Controllers/AuthController.php:16
* @route '/login'
*/
=======
 * @see app/Http/Controllers/AuthController.php:16
 * @route '/login'
 */
>>>>>>> kohsun
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::login
<<<<<<< HEAD
* @see app/Http/Controllers/AuthController.php:16
* @route '/login'
*/
=======
 * @see app/Http/Controllers/AuthController.php:16
 * @route '/login'
 */
>>>>>>> kohsun
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AuthController::logout
<<<<<<< HEAD
* @see app/Http/Controllers/AuthController.php:39
* @route '/logout'
*/
=======
 * @see app/Http/Controllers/AuthController.php:37
 * @route '/logout'
 */
>>>>>>> kohsun
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::logout
<<<<<<< HEAD
* @see app/Http/Controllers/AuthController.php:39
* @route '/logout'
*/
=======
 * @see app/Http/Controllers/AuthController.php:37
 * @route '/logout'
 */
>>>>>>> kohsun
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::logout
<<<<<<< HEAD
* @see app/Http/Controllers/AuthController.php:39
* @route '/logout'
*/
=======
 * @see app/Http/Controllers/AuthController.php:37
 * @route '/logout'
 */
>>>>>>> kohsun
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})
<<<<<<< HEAD

=======
>>>>>>> kohsun
const AuthController = { showLogin, login, logout }

export default AuthController