import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
<<<<<<< HEAD
* @see vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:98
* @route '/storage/{path}'
*/
=======
 * @see vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:98
 * @route '/storage/{path}'
 */
>>>>>>> kohsun
export const local = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: local.url(args, options),
    method: 'get',
})

local.definition = {
    methods: ["get","head"],
    url: '/storage/{path}',
} satisfies RouteDefinition<["get","head"]>

/**
<<<<<<< HEAD
* @see vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:98
* @route '/storage/{path}'
*/
=======
 * @see vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:98
 * @route '/storage/{path}'
 */
>>>>>>> kohsun
local.url = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { path: args }
    }

<<<<<<< HEAD
    if (Array.isArray(args)) {
        args = {
            path: args[0],
        }
=======
    
    if (Array.isArray(args)) {
        args = {
                    path: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        path: args.path,
    }
=======
                        path: args.path,
                }
>>>>>>> kohsun

    return local.definition.url
            .replace('{path}', parsedArgs.path.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
<<<<<<< HEAD
* @see vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:98
* @route '/storage/{path}'
*/
=======
 * @see vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:98
 * @route '/storage/{path}'
 */
>>>>>>> kohsun
local.get = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: local.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:98
* @route '/storage/{path}'
*/
=======
/**
 * @see vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:98
 * @route '/storage/{path}'
 */
>>>>>>> kohsun
local.head = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: local.url(args, options),
    method: 'head',
})
<<<<<<< HEAD

const storage = {
    local: Object.assign(local, local),
=======
const storage = {
    local,
>>>>>>> kohsun
}

export default storage