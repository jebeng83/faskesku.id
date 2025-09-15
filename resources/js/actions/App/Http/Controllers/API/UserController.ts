import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\API\UserController::getRoles
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:156
* @route '/api/users/roles'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:156
 * @route '/api/users/roles'
 */
>>>>>>> kohsun
export const getRoles = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRoles.url(options),
    method: 'get',
})

getRoles.definition = {
    methods: ["get","head"],
    url: '/api/users/roles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\UserController::getRoles
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:156
* @route '/api/users/roles'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:156
 * @route '/api/users/roles'
 */
>>>>>>> kohsun
getRoles.url = (options?: RouteQueryOptions) => {
    return getRoles.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::getRoles
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:156
* @route '/api/users/roles'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:156
 * @route '/api/users/roles'
 */
>>>>>>> kohsun
getRoles.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRoles.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\UserController::getRoles
* @see app/Http/Controllers/API/UserController.php:156
* @route '/api/users/roles'
*/
=======
/**
* @see \App\Http\Controllers\API\UserController::getRoles
 * @see app/Http/Controllers/API/UserController.php:156
 * @route '/api/users/roles'
 */
>>>>>>> kohsun
getRoles.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRoles.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::getPermissions
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:166
* @route '/api/users/permissions'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:166
 * @route '/api/users/permissions'
 */
>>>>>>> kohsun
export const getPermissions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPermissions.url(options),
    method: 'get',
})

getPermissions.definition = {
    methods: ["get","head"],
    url: '/api/users/permissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\UserController::getPermissions
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:166
* @route '/api/users/permissions'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:166
 * @route '/api/users/permissions'
 */
>>>>>>> kohsun
getPermissions.url = (options?: RouteQueryOptions) => {
    return getPermissions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::getPermissions
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:166
* @route '/api/users/permissions'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:166
 * @route '/api/users/permissions'
 */
>>>>>>> kohsun
getPermissions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPermissions.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\UserController::getPermissions
* @see app/Http/Controllers/API/UserController.php:166
* @route '/api/users/permissions'
*/
=======
/**
* @see \App\Http\Controllers\API\UserController::getPermissions
 * @see app/Http/Controllers/API/UserController.php:166
 * @route '/api/users/permissions'
 */
>>>>>>> kohsun
getPermissions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPermissions.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::getEmployees
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:176
* @route '/api/users/employees'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:176
 * @route '/api/users/employees'
 */
>>>>>>> kohsun
export const getEmployees = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getEmployees.url(options),
    method: 'get',
})

getEmployees.definition = {
    methods: ["get","head"],
    url: '/api/users/employees',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\UserController::getEmployees
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:176
* @route '/api/users/employees'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:176
 * @route '/api/users/employees'
 */
>>>>>>> kohsun
getEmployees.url = (options?: RouteQueryOptions) => {
    return getEmployees.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::getEmployees
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:176
* @route '/api/users/employees'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:176
 * @route '/api/users/employees'
 */
>>>>>>> kohsun
getEmployees.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getEmployees.url(options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\UserController::getEmployees
* @see app/Http/Controllers/API/UserController.php:176
* @route '/api/users/employees'
*/
=======
/**
* @see \App\Http\Controllers\API\UserController::getEmployees
 * @see app/Http/Controllers/API/UserController.php:176
 * @route '/api/users/employees'
 */
>>>>>>> kohsun
getEmployees.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getEmployees.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::checkUserByNik
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:186
* @route '/api/users/check-by-nik/{nik}'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:186
 * @route '/api/users/check-by-nik/{nik}'
 */
>>>>>>> kohsun
export const checkUserByNik = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkUserByNik.url(args, options),
    method: 'get',
})

checkUserByNik.definition = {
    methods: ["get","head"],
    url: '/api/users/check-by-nik/{nik}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\API\UserController::checkUserByNik
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:186
* @route '/api/users/check-by-nik/{nik}'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:186
 * @route '/api/users/check-by-nik/{nik}'
 */
>>>>>>> kohsun
checkUserByNik.url = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return checkUserByNik.definition.url
            .replace('{nik}', parsedArgs.nik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::checkUserByNik
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:186
* @route '/api/users/check-by-nik/{nik}'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:186
 * @route '/api/users/check-by-nik/{nik}'
 */
>>>>>>> kohsun
checkUserByNik.get = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkUserByNik.url(args, options),
    method: 'get',
})
<<<<<<< HEAD

/**
* @see \App\Http\Controllers\API\UserController::checkUserByNik
* @see app/Http/Controllers/API/UserController.php:186
* @route '/api/users/check-by-nik/{nik}'
*/
=======
/**
* @see \App\Http\Controllers\API\UserController::checkUserByNik
 * @see app/Http/Controllers/API/UserController.php:186
 * @route '/api/users/check-by-nik/{nik}'
 */
>>>>>>> kohsun
checkUserByNik.head = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkUserByNik.url(args, options),
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
* @see \App\Http\Controllers\API\UserController::updatePassword
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:205
* @route '/api/users/{user}/password'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:205
 * @route '/api/users/{user}/password'
 */
>>>>>>> kohsun
export const updatePassword = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(args, options),
    method: 'put',
})

updatePassword.definition = {
    methods: ["put"],
    url: '/api/users/{user}/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\UserController::updatePassword
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:205
* @route '/api/users/{user}/password'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:205
 * @route '/api/users/{user}/password'
 */
>>>>>>> kohsun
updatePassword.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updatePassword.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::updatePassword
<<<<<<< HEAD
* @see app/Http/Controllers/API/UserController.php:205
* @route '/api/users/{user}/password'
*/
=======
 * @see app/Http/Controllers/API/UserController.php:205
 * @route '/api/users/{user}/password'
 */
>>>>>>> kohsun
updatePassword.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(args, options),
    method: 'put',
})
<<<<<<< HEAD

=======
>>>>>>> kohsun
const UserController = { index, store, getRoles, getPermissions, getEmployees, checkUserByNik, show, update, destroy, updatePassword }

export default UserController