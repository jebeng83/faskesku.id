import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import roles from './roles'
/**
* @see \App\Http\Controllers\API\PermissionController::index
 * @see app/Http/Controllers/API/PermissionController.php:40
 * @route '/api/permissions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/permissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PermissionController::index
 * @see app/Http/Controllers/API/PermissionController.php:40
 * @route '/api/permissions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::index
 * @see app/Http/Controllers/API/PermissionController.php:40
 * @route '/api/permissions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\PermissionController::index
 * @see app/Http/Controllers/API/PermissionController.php:40
 * @route '/api/permissions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PermissionController::store
 * @see app/Http/Controllers/API/PermissionController.php:183
 * @route '/api/permissions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/permissions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\PermissionController::store
 * @see app/Http/Controllers/API/PermissionController.php:183
 * @route '/api/permissions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::store
 * @see app/Http/Controllers/API/PermissionController.php:183
 * @route '/api/permissions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\PermissionController::show
 * @see app/Http/Controllers/API/PermissionController.php:308
 * @route '/api/permissions/{permission}'
 */
export const show = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/permissions/{permission}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PermissionController::show
 * @see app/Http/Controllers/API/PermissionController.php:308
 * @route '/api/permissions/{permission}'
 */
show.url = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permission: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { permission: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    permission: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        permission: typeof args.permission === 'object'
                ? args.permission.id
                : args.permission,
                }

    return show.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::show
 * @see app/Http/Controllers/API/PermissionController.php:308
 * @route '/api/permissions/{permission}'
 */
show.get = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\PermissionController::show
 * @see app/Http/Controllers/API/PermissionController.php:308
 * @route '/api/permissions/{permission}'
 */
show.head = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PermissionController::update
 * @see app/Http/Controllers/API/PermissionController.php:218
 * @route '/api/permissions/{permission}'
 */
export const update = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/permissions/{permission}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\PermissionController::update
 * @see app/Http/Controllers/API/PermissionController.php:218
 * @route '/api/permissions/{permission}'
 */
update.url = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permission: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { permission: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    permission: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        permission: typeof args.permission === 'object'
                ? args.permission.id
                : args.permission,
                }

    return update.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::update
 * @see app/Http/Controllers/API/PermissionController.php:218
 * @route '/api/permissions/{permission}'
 */
update.put = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\PermissionController::destroy
 * @see app/Http/Controllers/API/PermissionController.php:258
 * @route '/api/permissions/{permission}'
 */
export const destroy = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/permissions/{permission}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\API\PermissionController::destroy
 * @see app/Http/Controllers/API/PermissionController.php:258
 * @route '/api/permissions/{permission}'
 */
destroy.url = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permission: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { permission: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    permission: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        permission: typeof args.permission === 'object'
                ? args.permission.id
                : args.permission,
                }

    return destroy.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::destroy
 * @see app/Http/Controllers/API/PermissionController.php:258
 * @route '/api/permissions/{permission}'
 */
destroy.delete = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const permissions = {
    roles: Object.assign(roles, roles),
index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default permissions