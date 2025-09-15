import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\PermissionController::getRoles
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:19
* @route '/api/permissions/roles'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:19
 * @route '/api/permissions/roles'
 */
>>>>>>> kohsun
export const getRoles = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRoles.url(options),
    method: 'get',
})

getRoles.definition = {
    methods: ["get","head"],
    url: '/api/permissions/roles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PermissionController::getRoles
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:19
* @route '/api/permissions/roles'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:19
 * @route '/api/permissions/roles'
 */
>>>>>>> kohsun
getRoles.url = (options?: RouteQueryOptions) => {
    return getRoles.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::getRoles
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:19
* @route '/api/permissions/roles'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:19
 * @route '/api/permissions/roles'
 */
>>>>>>> kohsun
getRoles.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRoles.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\PermissionController::getRoles
* @see app/Http/Controllers/API/PermissionController.php:19
* @route '/api/permissions/roles'
*/
=======
/**
* @see \App\Http\Controllers\API\PermissionController::getRoles
 * @see app/Http/Controllers/API/PermissionController.php:19
 * @route '/api/permissions/roles'
 */
>>>>>>> kohsun
getRoles.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRoles.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PermissionController::createRole
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:61
* @route '/api/permissions/roles'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:61
 * @route '/api/permissions/roles'
 */
>>>>>>> kohsun
export const createRole = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createRole.url(options),
    method: 'post',
})

createRole.definition = {
    methods: ["post"],
    url: '/api/permissions/roles',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\PermissionController::createRole
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:61
* @route '/api/permissions/roles'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:61
 * @route '/api/permissions/roles'
 */
>>>>>>> kohsun
createRole.url = (options?: RouteQueryOptions) => {
    return createRole.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::createRole
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:61
* @route '/api/permissions/roles'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:61
 * @route '/api/permissions/roles'
 */
>>>>>>> kohsun
createRole.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createRole.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\PermissionController::getRole
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:287
* @route '/api/permissions/roles/{role}'
*/
export const getRole = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:287
 * @route '/api/permissions/roles/{role}'
 */
export const getRole = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
>>>>>>> kohsun
    url: getRole.url(args, options),
    method: 'get',
})

getRole.definition = {
    methods: ["get","head"],
    url: '/api/permissions/roles/{role}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PermissionController::getRole
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:287
* @route '/api/permissions/roles/{role}'
*/
getRole.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
=======
 * @see app/Http/Controllers/API/PermissionController.php:287
 * @route '/api/permissions/roles/{role}'
 */
getRole.url = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return getRole.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::getRole
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:287
* @route '/api/permissions/roles/{role}'
*/
getRole.get = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRole.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\PermissionController::getRole
* @see app/Http/Controllers/API/PermissionController.php:287
* @route '/api/permissions/roles/{role}'
*/
getRole.head = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:287
 * @route '/api/permissions/roles/{role}'
 */
getRole.get = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRole.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\PermissionController::getRole
 * @see app/Http/Controllers/API/PermissionController.php:287
 * @route '/api/permissions/roles/{role}'
 */
getRole.head = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
>>>>>>> kohsun
    url: getRole.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PermissionController::updateRole
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:105
* @route '/api/permissions/roles/{role}'
*/
export const updateRole = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:105
 * @route '/api/permissions/roles/{role}'
 */
export const updateRole = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
>>>>>>> kohsun
    url: updateRole.url(args, options),
    method: 'put',
})

updateRole.definition = {
    methods: ["put"],
    url: '/api/permissions/roles/{role}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\PermissionController::updateRole
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:105
* @route '/api/permissions/roles/{role}'
*/
updateRole.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
=======
 * @see app/Http/Controllers/API/PermissionController.php:105
 * @route '/api/permissions/roles/{role}'
 */
updateRole.url = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return updateRole.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::updateRole
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:105
* @route '/api/permissions/roles/{role}'
*/
updateRole.put = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:105
 * @route '/api/permissions/roles/{role}'
 */
updateRole.put = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
>>>>>>> kohsun
    url: updateRole.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\PermissionController::deleteRole
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:154
* @route '/api/permissions/roles/{role}'
*/
export const deleteRole = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:154
 * @route '/api/permissions/roles/{role}'
 */
export const deleteRole = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
>>>>>>> kohsun
    url: deleteRole.url(args, options),
    method: 'delete',
})

deleteRole.definition = {
    methods: ["delete"],
    url: '/api/permissions/roles/{role}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\API\PermissionController::deleteRole
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:154
* @route '/api/permissions/roles/{role}'
*/
deleteRole.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
=======
 * @see app/Http/Controllers/API/PermissionController.php:154
 * @route '/api/permissions/roles/{role}'
 */
deleteRole.url = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return deleteRole.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::deleteRole
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:154
* @route '/api/permissions/roles/{role}'
*/
deleteRole.delete = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:154
 * @route '/api/permissions/roles/{role}'
 */
deleteRole.delete = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
>>>>>>> kohsun
    url: deleteRole.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\API\PermissionController::getPermissions
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:40
* @route '/api/permissions'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:40
 * @route '/api/permissions'
 */
>>>>>>> kohsun
export const getPermissions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPermissions.url(options),
    method: 'get',
})

getPermissions.definition = {
    methods: ["get","head"],
    url: '/api/permissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PermissionController::getPermissions
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:40
* @route '/api/permissions'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:40
 * @route '/api/permissions'
 */
>>>>>>> kohsun
getPermissions.url = (options?: RouteQueryOptions) => {
    return getPermissions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::getPermissions
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:40
* @route '/api/permissions'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:40
 * @route '/api/permissions'
 */
>>>>>>> kohsun
getPermissions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPermissions.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\PermissionController::getPermissions
* @see app/Http/Controllers/API/PermissionController.php:40
* @route '/api/permissions'
*/
=======
/**
* @see \App\Http\Controllers\API\PermissionController::getPermissions
 * @see app/Http/Controllers/API/PermissionController.php:40
 * @route '/api/permissions'
 */
>>>>>>> kohsun
getPermissions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPermissions.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PermissionController::createPermission
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:183
* @route '/api/permissions'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:183
 * @route '/api/permissions'
 */
>>>>>>> kohsun
export const createPermission = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createPermission.url(options),
    method: 'post',
})

createPermission.definition = {
    methods: ["post"],
    url: '/api/permissions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\PermissionController::createPermission
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:183
* @route '/api/permissions'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:183
 * @route '/api/permissions'
 */
>>>>>>> kohsun
createPermission.url = (options?: RouteQueryOptions) => {
    return createPermission.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::createPermission
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:183
* @route '/api/permissions'
*/
=======
 * @see app/Http/Controllers/API/PermissionController.php:183
 * @route '/api/permissions'
 */
>>>>>>> kohsun
createPermission.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createPermission.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\PermissionController::getPermission
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:308
* @route '/api/permissions/{permission}'
*/
export const getPermission = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:308
 * @route '/api/permissions/{permission}'
 */
export const getPermission = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
>>>>>>> kohsun
    url: getPermission.url(args, options),
    method: 'get',
})

getPermission.definition = {
    methods: ["get","head"],
    url: '/api/permissions/{permission}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PermissionController::getPermission
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:308
* @route '/api/permissions/{permission}'
*/
getPermission.url = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
=======
 * @see app/Http/Controllers/API/PermissionController.php:308
 * @route '/api/permissions/{permission}'
 */
getPermission.url = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
>>>>>>> kohsun
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permission: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { permission: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            permission: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { permission: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    permission: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        permission: typeof args.permission === 'object'
        ? args.permission.id
        : args.permission,
    }
=======
                        permission: typeof args.permission === 'object'
                ? args.permission.id
                : args.permission,
                }
>>>>>>> kohsun

    return getPermission.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::getPermission
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:308
* @route '/api/permissions/{permission}'
*/
getPermission.get = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPermission.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\PermissionController::getPermission
* @see app/Http/Controllers/API/PermissionController.php:308
* @route '/api/permissions/{permission}'
*/
getPermission.head = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:308
 * @route '/api/permissions/{permission}'
 */
getPermission.get = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPermission.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\PermissionController::getPermission
 * @see app/Http/Controllers/API/PermissionController.php:308
 * @route '/api/permissions/{permission}'
 */
getPermission.head = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
>>>>>>> kohsun
    url: getPermission.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PermissionController::updatePermission
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:218
* @route '/api/permissions/{permission}'
*/
export const updatePermission = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:218
 * @route '/api/permissions/{permission}'
 */
export const updatePermission = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
>>>>>>> kohsun
    url: updatePermission.url(args, options),
    method: 'put',
})

updatePermission.definition = {
    methods: ["put"],
    url: '/api/permissions/{permission}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\PermissionController::updatePermission
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:218
* @route '/api/permissions/{permission}'
*/
updatePermission.url = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
=======
 * @see app/Http/Controllers/API/PermissionController.php:218
 * @route '/api/permissions/{permission}'
 */
updatePermission.url = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
>>>>>>> kohsun
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permission: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { permission: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            permission: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { permission: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    permission: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        permission: typeof args.permission === 'object'
        ? args.permission.id
        : args.permission,
    }
=======
                        permission: typeof args.permission === 'object'
                ? args.permission.id
                : args.permission,
                }
>>>>>>> kohsun

    return updatePermission.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::updatePermission
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:218
* @route '/api/permissions/{permission}'
*/
updatePermission.put = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:218
 * @route '/api/permissions/{permission}'
 */
updatePermission.put = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
>>>>>>> kohsun
    url: updatePermission.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\PermissionController::deletePermission
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:258
* @route '/api/permissions/{permission}'
*/
export const deletePermission = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
=======
 * @see app/Http/Controllers/API/PermissionController.php:258
 * @route '/api/permissions/{permission}'
 */
export const deletePermission = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
>>>>>>> kohsun
    url: deletePermission.url(args, options),
    method: 'delete',
})

deletePermission.definition = {
    methods: ["delete"],
    url: '/api/permissions/{permission}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\API\PermissionController::deletePermission
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:258
* @route '/api/permissions/{permission}'
*/
deletePermission.url = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
=======
 * @see app/Http/Controllers/API/PermissionController.php:258
 * @route '/api/permissions/{permission}'
 */
deletePermission.url = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
>>>>>>> kohsun
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permission: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { permission: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            permission: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { permission: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    permission: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        permission: typeof args.permission === 'object'
        ? args.permission.id
        : args.permission,
    }
=======
                        permission: typeof args.permission === 'object'
                ? args.permission.id
                : args.permission,
                }
>>>>>>> kohsun

    return deletePermission.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::deletePermission
<<<<<<< HEAD
* @see app/Http/Controllers/API/PermissionController.php:258
* @route '/api/permissions/{permission}'
*/
deletePermission.delete = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePermission.url(args, options),
    method: 'delete',
})

=======
 * @see app/Http/Controllers/API/PermissionController.php:258
 * @route '/api/permissions/{permission}'
 */
deletePermission.delete = (args: { permission: string | number | { id: string | number } } | [permission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePermission.url(args, options),
    method: 'delete',
})
>>>>>>> kohsun
const PermissionController = { getRoles, createRole, getRole, updateRole, deleteRole, getPermissions, createPermission, getPermission, updatePermission, deletePermission }

export default PermissionController