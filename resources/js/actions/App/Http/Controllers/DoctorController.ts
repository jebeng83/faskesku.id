import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DoctorController::index
 * @see app/Http/Controllers/DoctorController.php:24
 * @route '/doctors'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/doctors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::index
 * @see app/Http/Controllers/DoctorController.php:24
 * @route '/doctors'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::index
 * @see app/Http/Controllers/DoctorController.php:24
 * @route '/doctors'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::index
 * @see app/Http/Controllers/DoctorController.php:24
 * @route '/doctors'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DoctorController::create
 * @see app/Http/Controllers/DoctorController.php:0
 * @route '/doctors/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/doctors/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::create
 * @see app/Http/Controllers/DoctorController.php:0
 * @route '/doctors/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::create
 * @see app/Http/Controllers/DoctorController.php:0
 * @route '/doctors/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::create
 * @see app/Http/Controllers/DoctorController.php:0
 * @route '/doctors/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DoctorController::store
 * @see app/Http/Controllers/DoctorController.php:47
 * @route '/doctors'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/doctors',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DoctorController::store
 * @see app/Http/Controllers/DoctorController.php:47
 * @route '/doctors'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::store
 * @see app/Http/Controllers/DoctorController.php:47
 * @route '/doctors'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DoctorController::show
 * @see app/Http/Controllers/DoctorController.php:74
 * @route '/doctors/{doctor}'
 */
export const show = (args: { doctor: string | number } | [doctor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/doctors/{doctor}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::show
 * @see app/Http/Controllers/DoctorController.php:74
 * @route '/doctors/{doctor}'
 */
show.url = (args: { doctor: string | number } | [doctor: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { doctor: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    doctor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        doctor: args.doctor,
                }

    return show.definition.url
            .replace('{doctor}', parsedArgs.doctor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::show
 * @see app/Http/Controllers/DoctorController.php:74
 * @route '/doctors/{doctor}'
 */
show.get = (args: { doctor: string | number } | [doctor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::show
 * @see app/Http/Controllers/DoctorController.php:74
 * @route '/doctors/{doctor}'
 */
show.head = (args: { doctor: string | number } | [doctor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DoctorController::edit
 * @see app/Http/Controllers/DoctorController.php:0
 * @route '/doctors/{doctor}/edit'
 */
export const edit = (args: { doctor: string | number } | [doctor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/doctors/{doctor}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::edit
 * @see app/Http/Controllers/DoctorController.php:0
 * @route '/doctors/{doctor}/edit'
 */
edit.url = (args: { doctor: string | number } | [doctor: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { doctor: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    doctor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        doctor: args.doctor,
                }

    return edit.definition.url
            .replace('{doctor}', parsedArgs.doctor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::edit
 * @see app/Http/Controllers/DoctorController.php:0
 * @route '/doctors/{doctor}/edit'
 */
edit.get = (args: { doctor: string | number } | [doctor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::edit
 * @see app/Http/Controllers/DoctorController.php:0
 * @route '/doctors/{doctor}/edit'
 */
edit.head = (args: { doctor: string | number } | [doctor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DoctorController::update
 * @see app/Http/Controllers/DoctorController.php:84
 * @route '/doctors/{doctor}'
 */
export const update = (args: { doctor: string | number } | [doctor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/doctors/{doctor}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DoctorController::update
 * @see app/Http/Controllers/DoctorController.php:84
 * @route '/doctors/{doctor}'
 */
update.url = (args: { doctor: string | number } | [doctor: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { doctor: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    doctor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        doctor: args.doctor,
                }

    return update.definition.url
            .replace('{doctor}', parsedArgs.doctor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::update
 * @see app/Http/Controllers/DoctorController.php:84
 * @route '/doctors/{doctor}'
 */
update.put = (args: { doctor: string | number } | [doctor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\DoctorController::update
 * @see app/Http/Controllers/DoctorController.php:84
 * @route '/doctors/{doctor}'
 */
update.patch = (args: { doctor: string | number } | [doctor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DoctorController::destroy
 * @see app/Http/Controllers/DoctorController.php:112
 * @route '/doctors/{doctor}'
 */
export const destroy = (args: { doctor: string | number } | [doctor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/doctors/{doctor}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DoctorController::destroy
 * @see app/Http/Controllers/DoctorController.php:112
 * @route '/doctors/{doctor}'
 */
destroy.url = (args: { doctor: string | number } | [doctor: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { doctor: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    doctor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        doctor: args.doctor,
                }

    return destroy.definition.url
            .replace('{doctor}', parsedArgs.doctor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::destroy
 * @see app/Http/Controllers/DoctorController.php:112
 * @route '/doctors/{doctor}'
 */
destroy.delete = (args: { doctor: string | number } | [doctor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const DoctorController = { index, create, store, show, edit, update, destroy }

export default DoctorController