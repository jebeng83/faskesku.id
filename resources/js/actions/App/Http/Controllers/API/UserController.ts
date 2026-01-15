import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\API\UserController::index
* @see app/Http/Controllers/API/UserController.php:17
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
* @see app/Http/Controllers/API/UserController.php:17
* @route '/api/users'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::index
* @see app/Http/Controllers/API/UserController.php:17
* @route '/api/users'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\UserController::index
* @see app/Http/Controllers/API/UserController.php:17
* @route '/api/users'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::store
* @see app/Http/Controllers/API/UserController.php:44
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
* @see app/Http/Controllers/API/UserController.php:44
* @route '/api/users'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::store
* @see app/Http/Controllers/API/UserController.php:44
* @route '/api/users'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\API\UserController::getRoles
* @see app/Http/Controllers/API/UserController.php:159
* @route '/api/users/roles'
*/
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
* @see app/Http/Controllers/API/UserController.php:159
* @route '/api/users/roles'
*/
getRoles.url = (options?: RouteQueryOptions) => {
    return getRoles.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::getRoles
* @see app/Http/Controllers/API/UserController.php:159
* @route '/api/users/roles'
*/
getRoles.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRoles.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\UserController::getRoles
* @see app/Http/Controllers/API/UserController.php:159
* @route '/api/users/roles'
*/
getRoles.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRoles.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::getPermissions
* @see app/Http/Controllers/API/UserController.php:169
* @route '/api/users/permissions'
*/
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
* @see app/Http/Controllers/API/UserController.php:169
* @route '/api/users/permissions'
*/
getPermissions.url = (options?: RouteQueryOptions) => {
    return getPermissions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::getPermissions
* @see app/Http/Controllers/API/UserController.php:169
* @route '/api/users/permissions'
*/
getPermissions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPermissions.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\UserController::getPermissions
* @see app/Http/Controllers/API/UserController.php:169
* @route '/api/users/permissions'
*/
getPermissions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPermissions.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::getEmployees
* @see app/Http/Controllers/API/UserController.php:179
* @route '/api/users/employees'
*/
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
* @see app/Http/Controllers/API/UserController.php:179
* @route '/api/users/employees'
*/
getEmployees.url = (options?: RouteQueryOptions) => {
    return getEmployees.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::getEmployees
* @see app/Http/Controllers/API/UserController.php:179
* @route '/api/users/employees'
*/
getEmployees.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getEmployees.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\UserController::getEmployees
* @see app/Http/Controllers/API/UserController.php:179
* @route '/api/users/employees'
*/
getEmployees.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getEmployees.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::checkUserByNik
* @see app/Http/Controllers/API/UserController.php:189
* @route '/api/users/check-by-nik/{nik}'
*/
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
* @see app/Http/Controllers/API/UserController.php:189
* @route '/api/users/check-by-nik/{nik}'
*/
checkUserByNik.url = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return checkUserByNik.definition.url
            .replace('{nik}', parsedArgs.nik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::checkUserByNik
* @see app/Http/Controllers/API/UserController.php:189
* @route '/api/users/check-by-nik/{nik}'
*/
checkUserByNik.get = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkUserByNik.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\UserController::checkUserByNik
* @see app/Http/Controllers/API/UserController.php:189
* @route '/api/users/check-by-nik/{nik}'
*/
checkUserByNik.head = (args: { nik: string | number } | [nik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkUserByNik.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::show
* @see app/Http/Controllers/API/UserController.php:85
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
* @see app/Http/Controllers/API/UserController.php:85
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
* @see app/Http/Controllers/API/UserController.php:85
* @route '/api/users/{user}'
*/
show.get = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\API\UserController::show
* @see app/Http/Controllers/API/UserController.php:85
* @route '/api/users/{user}'
*/
show.head = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\API\UserController::update
* @see app/Http/Controllers/API/UserController.php:95
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
* @see app/Http/Controllers/API/UserController.php:95
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
* @see app/Http/Controllers/API/UserController.php:95
* @route '/api/users/{user}'
*/
update.put = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\API\UserController::destroy
* @see app/Http/Controllers/API/UserController.php:141
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
* @see app/Http/Controllers/API/UserController.php:141
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
* @see app/Http/Controllers/API/UserController.php:141
* @route '/api/users/{user}'
*/
destroy.delete = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\API\UserController::updatePassword
* @see app/Http/Controllers/API/UserController.php:208
* @route '/api/users/{user}/password'
*/
export const updatePassword = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(args, options),
    method: 'put',
})

updatePassword.definition = {
    methods: ["put"],
    url: '/api/users/{user}/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\API\UserController::updatePassword
* @see app/Http/Controllers/API/UserController.php:208
* @route '/api/users/{user}/password'
*/
updatePassword.url = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return updatePassword.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\API\UserController::updatePassword
* @see app/Http/Controllers/API/UserController.php:208
* @route '/api/users/{user}/password'
*/
updatePassword.put = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(args, options),
    method: 'put',
})

const UserController = { index, store, getRoles, getPermissions, getEmployees, checkUserByNik, show, update, destroy, updatePassword }

export default UserController