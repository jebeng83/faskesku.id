import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\PermissionController::index
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:19
* @route '/api/permissions/roles'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:19
 * @route '/api/permissions/roles'
 */
>>>>>>> kohsun
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/permissions/roles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PermissionController::index
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:19
* @route '/api/permissions/roles'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:19
 * @route '/api/permissions/roles'
 */
>>>>>>> kohsun
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::index
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:19
* @route '/api/permissions/roles'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:19
 * @route '/api/permissions/roles'
 */
>>>>>>> kohsun
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\PermissionController::index
* @see app/Http/Controllers/API/PermissionController.php:19
* @route '/api/permissions/roles'
*/
=======
/**
* @see \App\Http\Controllers\API\PermissionController::index
 * @see app/Http/Controllers/API/PermissionController.php:19
 * @route '/api/permissions/roles'
 */
>>>>>>> kohsun
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PermissionController::store
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:61
* @route '/api/permissions/roles'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:61
 * @route '/api/permissions/roles'
 */
>>>>>>> kohsun
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/permissions/roles',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\PermissionController::store
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:61
* @route '/api/permissions/roles'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:61
 * @route '/api/permissions/roles'
 */
>>>>>>> kohsun
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::store
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:61
* @route '/api/permissions/roles'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:61
 * @route '/api/permissions/roles'
 */
>>>>>>> kohsun
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\PermissionController::show
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:287
* @route '/api/permissions/roles/{role}'
*/
export const show = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:287
 * @route '/api/permissions/roles/{role}'
 */
export const show = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
>>>>>>> kohsun
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/permissions/roles/{role}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PermissionController::show
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:287
* @route '/api/permissions/roles/{role}'
*/
show.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
=======
 * @see app/Http/Controllers/API/PermissionController.php:287
 * @route '/api/permissions/roles/{role}'
 */
show.url = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
>>>>>>> kohsun
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { role: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    role: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        role: typeof args.role === 'object'
        ? args.role.id
        : args.role,
    }
=======
                        role: typeof args.role === 'object'
                ? args.role.id
                : args.role,
                }
>>>>>>> kohsun

    return show.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::show
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:287
* @route '/api/permissions/roles/{role}'
*/
show.get = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\PermissionController::show
* @see app/Http/Controllers/API/PermissionController.php:287
* @route '/api/permissions/roles/{role}'
*/
show.head = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:287
 * @route '/api/permissions/roles/{role}'
 */
show.get = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\PermissionController::show
 * @see app/Http/Controllers/API/PermissionController.php:287
 * @route '/api/permissions/roles/{role}'
 */
show.head = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
>>>>>>> kohsun
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PermissionController::update
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:105
* @route '/api/permissions/roles/{role}'
*/
export const update = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:105
 * @route '/api/permissions/roles/{role}'
 */
export const update = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
>>>>>>> kohsun
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/permissions/roles/{role}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\PermissionController::update
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:105
* @route '/api/permissions/roles/{role}'
*/
update.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
=======
 * @see app/Http/Controllers/API/PermissionController.php:105
 * @route '/api/permissions/roles/{role}'
 */
update.url = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
>>>>>>> kohsun
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { role: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    role: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        role: typeof args.role === 'object'
        ? args.role.id
        : args.role,
    }
=======
                        role: typeof args.role === 'object'
                ? args.role.id
                : args.role,
                }
>>>>>>> kohsun

    return update.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::update
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:105
* @route '/api/permissions/roles/{role}'
*/
update.put = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:105
 * @route '/api/permissions/roles/{role}'
 */
update.put = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
>>>>>>> kohsun
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\PermissionController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:154
* @route '/api/permissions/roles/{role}'
*/
export const destroy = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:154
 * @route '/api/permissions/roles/{role}'
 */
export const destroy = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
>>>>>>> kohsun
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/permissions/roles/{role}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\API\PermissionController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:154
* @route '/api/permissions/roles/{role}'
*/
destroy.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
=======
 * @see app/Http/Controllers/API/PermissionController.php:154
 * @route '/api/permissions/roles/{role}'
 */
destroy.url = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
>>>>>>> kohsun
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { role: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    role: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        role: typeof args.role === 'object'
        ? args.role.id
        : args.role,
    }
=======
                        role: typeof args.role === 'object'
                ? args.role.id
                : args.role,
                }
>>>>>>> kohsun

    return destroy.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:154
* @route '/api/permissions/roles/{role}'
*/
destroy.delete = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const roles = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
=======
 * @see app/Http/Controllers/API/PermissionController.php:154
 * @route '/api/permissions/roles/{role}'
 */
destroy.delete = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const roles = {
    index,
store,
show,
update,
destroy,
>>>>>>> kohsun
}

export default roles