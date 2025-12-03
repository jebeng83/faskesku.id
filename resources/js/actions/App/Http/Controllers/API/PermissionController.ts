import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\PermissionController::getRoles
* @see app/Http/Controllers/API/PermissionController.php:17
* @route '/api/permissions/roles'
*/
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
* @see app/Http/Controllers/API/PermissionController.php:17
* @route '/api/permissions/roles'
*/
getRoles.url = (options?: RouteQueryOptions) => {
    return getRoles.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::getRoles
* @see app/Http/Controllers/API/PermissionController.php:17
* @route '/api/permissions/roles'
*/
getRoles.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRoles.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\PermissionController::getRoles
* @see app/Http/Controllers/API/PermissionController.php:17
* @route '/api/permissions/roles'
*/
getRoles.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRoles.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PermissionController::createRole
* @see app/Http/Controllers/API/PermissionController.php:59
* @route '/api/permissions/roles'
*/
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
* @see app/Http/Controllers/API/PermissionController.php:59
* @route '/api/permissions/roles'
*/
createRole.url = (options?: RouteQueryOptions) => {
    return createRole.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::createRole
* @see app/Http/Controllers/API/PermissionController.php:59
* @route '/api/permissions/roles'
*/
createRole.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createRole.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\PermissionController::getRole
* @see app/Http/Controllers/API/PermissionController.php:285
* @route '/api/permissions/roles/{role}'
*/
export const getRole = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRole.url(args, options),
    method: 'get',
})

getRole.definition = {
    methods: ["get","head"],
    url: '/api/permissions/roles/{role}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PermissionController::getRole
* @see app/Http/Controllers/API/PermissionController.php:285
* @route '/api/permissions/roles/{role}'
*/
getRole.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        role: typeof args.role === 'object'
        ? args.role.id
        : args.role,
    }

    return getRole.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::getRole
* @see app/Http/Controllers/API/PermissionController.php:285
* @route '/api/permissions/roles/{role}'
*/
getRole.get = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRole.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\PermissionController::getRole
* @see app/Http/Controllers/API/PermissionController.php:285
* @route '/api/permissions/roles/{role}'
*/
getRole.head = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRole.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PermissionController::updateRole
* @see app/Http/Controllers/API/PermissionController.php:103
* @route '/api/permissions/roles/{role}'
*/
export const updateRole = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRole.url(args, options),
    method: 'put',
})

updateRole.definition = {
    methods: ["put"],
    url: '/api/permissions/roles/{role}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\PermissionController::updateRole
* @see app/Http/Controllers/API/PermissionController.php:103
* @route '/api/permissions/roles/{role}'
*/
updateRole.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        role: typeof args.role === 'object'
        ? args.role.id
        : args.role,
    }

    return updateRole.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::updateRole
* @see app/Http/Controllers/API/PermissionController.php:103
* @route '/api/permissions/roles/{role}'
*/
updateRole.put = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRole.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\PermissionController::deleteRole
* @see app/Http/Controllers/API/PermissionController.php:152
* @route '/api/permissions/roles/{role}'
*/
export const deleteRole = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteRole.url(args, options),
    method: 'delete',
})

deleteRole.definition = {
    methods: ["delete"],
    url: '/api/permissions/roles/{role}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\API\PermissionController::deleteRole
* @see app/Http/Controllers/API/PermissionController.php:152
* @route '/api/permissions/roles/{role}'
*/
deleteRole.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        role: typeof args.role === 'object'
        ? args.role.id
        : args.role,
    }

    return deleteRole.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::deleteRole
* @see app/Http/Controllers/API/PermissionController.php:152
* @route '/api/permissions/roles/{role}'
*/
deleteRole.delete = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteRole.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\API\PermissionController::getPermissions
* @see app/Http/Controllers/API/PermissionController.php:38
* @route '/api/permissions'
*/
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
* @see app/Http/Controllers/API/PermissionController.php:38
* @route '/api/permissions'
*/
getPermissions.url = (options?: RouteQueryOptions) => {
    return getPermissions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::getPermissions
* @see app/Http/Controllers/API/PermissionController.php:38
* @route '/api/permissions'
*/
getPermissions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPermissions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\PermissionController::getPermissions
* @see app/Http/Controllers/API/PermissionController.php:38
* @route '/api/permissions'
*/
getPermissions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPermissions.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PermissionController::createPermission
* @see app/Http/Controllers/API/PermissionController.php:181
* @route '/api/permissions'
*/
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
* @see app/Http/Controllers/API/PermissionController.php:181
* @route '/api/permissions'
*/
createPermission.url = (options?: RouteQueryOptions) => {
    return createPermission.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::createPermission
* @see app/Http/Controllers/API/PermissionController.php:181
* @route '/api/permissions'
*/
createPermission.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createPermission.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\PermissionController::getPermission
* @see app/Http/Controllers/API/PermissionController.php:306
* @route '/api/permissions/{permission}'
*/
export const getPermission = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPermission.url(args, options),
    method: 'get',
})

getPermission.definition = {
    methods: ["get","head"],
    url: '/api/permissions/{permission}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\PermissionController::getPermission
* @see app/Http/Controllers/API/PermissionController.php:306
* @route '/api/permissions/{permission}'
*/
getPermission.url = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getPermission.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::getPermission
* @see app/Http/Controllers/API/PermissionController.php:306
* @route '/api/permissions/{permission}'
*/
getPermission.get = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPermission.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\PermissionController::getPermission
* @see app/Http/Controllers/API/PermissionController.php:306
* @route '/api/permissions/{permission}'
*/
getPermission.head = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPermission.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\PermissionController::updatePermission
* @see app/Http/Controllers/API/PermissionController.php:216
* @route '/api/permissions/{permission}'
*/
export const updatePermission = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePermission.url(args, options),
    method: 'put',
})

updatePermission.definition = {
    methods: ["put"],
    url: '/api/permissions/{permission}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\PermissionController::updatePermission
* @see app/Http/Controllers/API/PermissionController.php:216
* @route '/api/permissions/{permission}'
*/
updatePermission.url = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updatePermission.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::updatePermission
* @see app/Http/Controllers/API/PermissionController.php:216
* @route '/api/permissions/{permission}'
*/
updatePermission.put = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePermission.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\PermissionController::deletePermission
* @see app/Http/Controllers/API/PermissionController.php:256
* @route '/api/permissions/{permission}'
*/
export const deletePermission = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePermission.url(args, options),
    method: 'delete',
})

deletePermission.definition = {
    methods: ["delete"],
    url: '/api/permissions/{permission}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\API\PermissionController::deletePermission
* @see app/Http/Controllers/API/PermissionController.php:256
* @route '/api/permissions/{permission}'
*/
deletePermission.url = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return deletePermission.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\PermissionController::deletePermission
* @see app/Http/Controllers/API/PermissionController.php:256
* @route '/api/permissions/{permission}'
*/
deletePermission.delete = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePermission.url(args, options),
    method: 'delete',
})

const PermissionController = { getRoles, createRole, getRole, updateRole, deleteRole, getPermissions, createPermission, getPermission, updatePermission, deletePermission }

export default PermissionController