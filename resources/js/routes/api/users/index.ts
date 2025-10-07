import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\API\UserController::index
 * @see app/Http/Controllers/API/UserController.php:16
 * @route '/api/users'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\UserController::index
 * @see app/Http/Controllers/API/UserController.php:16
 * @route '/api/users'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::index
 * @see app/Http/Controllers/API/UserController.php:16
 * @route '/api/users'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\UserController::index
 * @see app/Http/Controllers/API/UserController.php:16
 * @route '/api/users'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::store
 * @see app/Http/Controllers/API/UserController.php:43
 * @route '/api/users'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\API\UserController::store
 * @see app/Http/Controllers/API/UserController.php:43
 * @route '/api/users'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::store
 * @see app/Http/Controllers/API/UserController.php:43
 * @route '/api/users'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\UserController::roles
 * @see app/Http/Controllers/API/UserController.php:156
 * @route '/api/users/roles'
 */
export const roles = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: roles.url(options),
    method: 'get',
})

roles.definition = {
    methods: ["get","head"],
    url: '/api/users/roles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\UserController::roles
 * @see app/Http/Controllers/API/UserController.php:156
 * @route '/api/users/roles'
 */
roles.url = (options?: RouteQueryOptions) => {
    return roles.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::roles
 * @see app/Http/Controllers/API/UserController.php:156
 * @route '/api/users/roles'
 */
roles.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: roles.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\UserController::roles
 * @see app/Http/Controllers/API/UserController.php:156
 * @route '/api/users/roles'
 */
roles.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: roles.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::permissions
 * @see app/Http/Controllers/API/UserController.php:166
 * @route '/api/users/permissions'
 */
export const permissions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: permissions.url(options),
    method: 'get',
})

permissions.definition = {
    methods: ["get","head"],
    url: '/api/users/permissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\UserController::permissions
 * @see app/Http/Controllers/API/UserController.php:166
 * @route '/api/users/permissions'
 */
permissions.url = (options?: RouteQueryOptions) => {
    return permissions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::permissions
 * @see app/Http/Controllers/API/UserController.php:166
 * @route '/api/users/permissions'
 */
permissions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: permissions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\UserController::permissions
 * @see app/Http/Controllers/API/UserController.php:166
 * @route '/api/users/permissions'
 */
permissions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: permissions.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::employees
 * @see app/Http/Controllers/API/UserController.php:176
 * @route '/api/users/employees'
 */
export const employees = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employees.url(options),
    method: 'get',
})

employees.definition = {
    methods: ["get","head"],
    url: '/api/users/employees',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\UserController::employees
 * @see app/Http/Controllers/API/UserController.php:176
 * @route '/api/users/employees'
 */
employees.url = (options?: RouteQueryOptions) => {
    return employees.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::employees
 * @see app/Http/Controllers/API/UserController.php:176
 * @route '/api/users/employees'
 */
employees.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employees.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\UserController::employees
 * @see app/Http/Controllers/API/UserController.php:176
 * @route '/api/users/employees'
 */
employees.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: employees.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::checkByNik
 * @see app/Http/Controllers/API/UserController.php:186
 * @route '/api/users/check-by-nik/{nik}'
 */
export const checkByNik = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkByNik.url(args, options),
    method: 'get',
})

checkByNik.definition = {
    methods: ["get","head"],
    url: '/api/users/check-by-nik/{nik}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\UserController::checkByNik
 * @see app/Http/Controllers/API/UserController.php:186
 * @route '/api/users/check-by-nik/{nik}'
 */
checkByNik.url = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nik: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    nik: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        nik: args.nik,
                }

    return checkByNik.definition.url
            .replace('{nik}', parsedArgs.nik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::checkByNik
 * @see app/Http/Controllers/API/UserController.php:186
 * @route '/api/users/check-by-nik/{nik}'
 */
checkByNik.get = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkByNik.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\UserController::checkByNik
 * @see app/Http/Controllers/API/UserController.php:186
 * @route '/api/users/check-by-nik/{nik}'
 */
checkByNik.head = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkByNik.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::show
 * @see app/Http/Controllers/API/UserController.php:83
 * @route '/api/users/{user}'
 */
export const show = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/users/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\UserController::show
 * @see app/Http/Controllers/API/UserController.php:83
 * @route '/api/users/{user}'
 */
show.url = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return show.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::show
 * @see app/Http/Controllers/API/UserController.php:83
 * @route '/api/users/{user}'
 */
show.get = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\API\UserController::show
 * @see app/Http/Controllers/API/UserController.php:83
 * @route '/api/users/{user}'
 */
show.head = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::update
 * @see app/Http/Controllers/API/UserController.php:93
 * @route '/api/users/{user}'
 */
export const update = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/users/{user}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\UserController::update
 * @see app/Http/Controllers/API/UserController.php:93
 * @route '/api/users/{user}'
 */
update.url = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return update.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::update
 * @see app/Http/Controllers/API/UserController.php:93
 * @route '/api/users/{user}'
 */
update.put = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\UserController::destroy
 * @see app/Http/Controllers/API/UserController.php:138
 * @route '/api/users/{user}'
 */
export const destroy = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\API\UserController::destroy
 * @see app/Http/Controllers/API/UserController.php:138
 * @route '/api/users/{user}'
 */
destroy.url = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return destroy.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::destroy
 * @see app/Http/Controllers/API/UserController.php:138
 * @route '/api/users/{user}'
 */
destroy.delete = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\API\UserController::password
 * @see app/Http/Controllers/API/UserController.php:205
 * @route '/api/users/{user}/password'
 */
export const password = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: password.url(args, options),
    method: 'put',
})

password.definition = {
    methods: ["put"],
    url: '/api/users/{user}/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\UserController::password
 * @see app/Http/Controllers/API/UserController.php:205
 * @route '/api/users/{user}/password'
 */
password.url = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return password.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::password
 * @see app/Http/Controllers/API/UserController.php:205
 * @route '/api/users/{user}/password'
 */
password.put = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: password.url(args, options),
    method: 'put',
})
const users = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
roles: Object.assign(roles, roles),
permissions: Object.assign(permissions, permissions),
employees: Object.assign(employees, employees),
checkByNik: Object.assign(checkByNik, checkByNik),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
password: Object.assign(password, password),
}

export default users