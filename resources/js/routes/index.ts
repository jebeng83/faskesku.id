import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../wayfinder'
/**
* @see \App\Http\Controllers\AuthController::login
<<<<<<< HEAD
* @see app/Http/Controllers/AuthController.php:11
* @route '/login'
*/
=======
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/login'
 */
>>>>>>> kohsun
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuthController::login
<<<<<<< HEAD
* @see app/Http/Controllers/AuthController.php:11
* @route '/login'
*/
=======
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/login'
 */
>>>>>>> kohsun
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::login
<<<<<<< HEAD
* @see app/Http/Controllers/AuthController.php:11
* @route '/login'
*/
=======
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/login'
 */
>>>>>>> kohsun
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\AuthController::login
* @see app/Http/Controllers/AuthController.php:11
* @route '/login'
*/
=======
/**
* @see \App\Http\Controllers\AuthController::login
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/login'
 */
>>>>>>> kohsun
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
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

/**
<<<<<<< HEAD
* @see routes/web.php:27
* @route '/'
*/
=======
 * @see routes/web.php:19
 * @route '/'
 */
>>>>>>> kohsun
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see routes/web.php:27
* @route '/'
*/
=======
 * @see routes/web.php:19
 * @route '/'
 */
>>>>>>> kohsun
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
<<<<<<< HEAD
* @see routes/web.php:27
* @route '/'
*/
=======
 * @see routes/web.php:19
 * @route '/'
 */
>>>>>>> kohsun
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see routes/web.php:27
* @route '/'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

=======
/**
 * @see routes/web.php:19
 * @route '/'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})
>>>>>>> kohsun
