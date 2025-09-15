import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\API\UserController::index
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:16
* @route '/api/users'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:16
 * @route '/api/users'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:16
* @route '/api/users'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:16
 * @route '/api/users'
 */
>>>>>>> kohsun
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::index
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:16
* @route '/api/users'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:16
 * @route '/api/users'
 */
>>>>>>> kohsun
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\UserController::index
* @see app/Http/Controllers/API/UserController.php:16
* @route '/api/users'
*/
=======
/**
* @see \App\Http\Controllers\API\UserController::index
 * @see app/Http/Controllers/API/UserController.php:16
 * @route '/api/users'
 */
>>>>>>> kohsun
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::store
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:43
* @route '/api/users'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:43
 * @route '/api/users'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:43
* @route '/api/users'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:43
 * @route '/api/users'
 */
>>>>>>> kohsun
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::store
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:43
* @route '/api/users'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:43
 * @route '/api/users'
 */
>>>>>>> kohsun
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\UserController::roles
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:156
* @route '/api/users/roles'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:156
 * @route '/api/users/roles'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:156
* @route '/api/users/roles'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:156
 * @route '/api/users/roles'
 */
>>>>>>> kohsun
roles.url = (options?: RouteQueryOptions) => {
    return roles.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::roles
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:156
* @route '/api/users/roles'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:156
 * @route '/api/users/roles'
 */
>>>>>>> kohsun
roles.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: roles.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\UserController::roles
* @see app/Http/Controllers/API/UserController.php:156
* @route '/api/users/roles'
*/
=======
/**
* @see \App\Http\Controllers\API\UserController::roles
 * @see app/Http/Controllers/API/UserController.php:156
 * @route '/api/users/roles'
 */
>>>>>>> kohsun
roles.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: roles.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::permissions
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:166
* @route '/api/users/permissions'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:166
 * @route '/api/users/permissions'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:166
* @route '/api/users/permissions'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:166
 * @route '/api/users/permissions'
 */
>>>>>>> kohsun
permissions.url = (options?: RouteQueryOptions) => {
    return permissions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::permissions
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:166
* @route '/api/users/permissions'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:166
 * @route '/api/users/permissions'
 */
>>>>>>> kohsun
permissions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: permissions.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\UserController::permissions
* @see app/Http/Controllers/API/UserController.php:166
* @route '/api/users/permissions'
*/
=======
/**
* @see \App\Http\Controllers\API\UserController::permissions
 * @see app/Http/Controllers/API/UserController.php:166
 * @route '/api/users/permissions'
 */
>>>>>>> kohsun
permissions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: permissions.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::employees
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:176
* @route '/api/users/employees'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:176
 * @route '/api/users/employees'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:176
* @route '/api/users/employees'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:176
 * @route '/api/users/employees'
 */
>>>>>>> kohsun
employees.url = (options?: RouteQueryOptions) => {
    return employees.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::employees
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:176
* @route '/api/users/employees'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:176
 * @route '/api/users/employees'
 */
>>>>>>> kohsun
employees.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employees.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\UserController::employees
* @see app/Http/Controllers/API/UserController.php:176
* @route '/api/users/employees'
*/
=======
/**
* @see \App\Http\Controllers\API\UserController::employees
 * @see app/Http/Controllers/API/UserController.php:176
 * @route '/api/users/employees'
 */
>>>>>>> kohsun
employees.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: employees.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::checkByNik
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:186
* @route '/api/users/check-by-nik/{nik}'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:186
 * @route '/api/users/check-by-nik/{nik}'
 */
>>>>>>> kohsun
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
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:186
* @route '/api/users/check-by-nik/{nik}'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:186
 * @route '/api/users/check-by-nik/{nik}'
 */
>>>>>>> kohsun
checkByNik.url = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nik: args }
    }

<<<<<<< HEAD
    if (Array.isArray(args)) {
        args = {
            nik: args[0],
        }
=======
    
    if (Array.isArray(args)) {
        args = {
                    nik: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        nik: args.nik,
    }
=======
                        nik: args.nik,
                }
>>>>>>> kohsun

    return checkByNik.definition.url
            .replace('{nik}', parsedArgs.nik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::checkByNik
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:186
* @route '/api/users/check-by-nik/{nik}'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:186
 * @route '/api/users/check-by-nik/{nik}'
 */
>>>>>>> kohsun
checkByNik.get = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkByNik.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\UserController::checkByNik
* @see app/Http/Controllers/API/UserController.php:186
* @route '/api/users/check-by-nik/{nik}'
*/
=======
/**
* @see \App\Http\Controllers\API\UserController::checkByNik
 * @see app/Http/Controllers/API/UserController.php:186
 * @route '/api/users/check-by-nik/{nik}'
 */
>>>>>>> kohsun
checkByNik.head = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkByNik.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::show
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:83
* @route '/api/users/{user}'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:83
 * @route '/api/users/{user}'
 */
>>>>>>> kohsun
export const show = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/users/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\UserController::show
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:83
* @route '/api/users/{user}'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:83
 * @route '/api/users/{user}'
 */
>>>>>>> kohsun
show.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }
=======
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }
>>>>>>> kohsun

    return show.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::show
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:83
* @route '/api/users/{user}'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:83
 * @route '/api/users/{user}'
 */
>>>>>>> kohsun
show.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\UserController::show
* @see app/Http/Controllers/API/UserController.php:83
* @route '/api/users/{user}'
*/
=======
/**
* @see \App\Http\Controllers\API\UserController::show
 * @see app/Http/Controllers/API/UserController.php:83
 * @route '/api/users/{user}'
 */
>>>>>>> kohsun
show.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::update
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:93
* @route '/api/users/{user}'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:93
 * @route '/api/users/{user}'
 */
>>>>>>> kohsun
export const update = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/users/{user}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\UserController::update
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:93
* @route '/api/users/{user}'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:93
 * @route '/api/users/{user}'
 */
>>>>>>> kohsun
update.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }
=======
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }
>>>>>>> kohsun

    return update.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::update
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:93
* @route '/api/users/{user}'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:93
 * @route '/api/users/{user}'
 */
>>>>>>> kohsun
update.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\UserController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:138
* @route '/api/users/{user}'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:138
 * @route '/api/users/{user}'
 */
>>>>>>> kohsun
export const destroy = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\API\UserController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:138
* @route '/api/users/{user}'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:138
 * @route '/api/users/{user}'
 */
>>>>>>> kohsun
destroy.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }
=======
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }
>>>>>>> kohsun

    return destroy.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::destroy
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:138
* @route '/api/users/{user}'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:138
 * @route '/api/users/{user}'
 */
>>>>>>> kohsun
destroy.delete = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\API\UserController::password
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:205
* @route '/api/users/{user}/password'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:205
 * @route '/api/users/{user}/password'
 */
>>>>>>> kohsun
export const password = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: password.url(args, options),
    method: 'put',
})

password.definition = {
    methods: ["put"],
    url: '/api/users/{user}/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\UserController::password
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:205
* @route '/api/users/{user}/password'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:205
 * @route '/api/users/{user}/password'
 */
>>>>>>> kohsun
password.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

<<<<<<< HEAD
    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
=======
            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
>>>>>>> kohsun
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
<<<<<<< HEAD
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }
=======
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }
>>>>>>> kohsun

    return password.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::password
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:205
* @route '/api/users/{user}/password'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:205
 * @route '/api/users/{user}/password'
 */
>>>>>>> kohsun
password.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: password.url(args, options),
    method: 'put',
})
<<<<<<< HEAD

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
=======
const users = {
    index,
store,
roles,
permissions,
employees,
checkByNik,
show,
update,
destroy,
password,
>>>>>>> kohsun
}

export default users