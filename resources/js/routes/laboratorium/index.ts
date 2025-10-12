import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\LaboratoriumController::index
 * @see app/Http/Controllers/LaboratoriumController.php:24
 * @route '/laboratorium'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/laboratorium',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LaboratoriumController::index
 * @see app/Http/Controllers/LaboratoriumController.php:24
 * @route '/laboratorium'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LaboratoriumController::index
 * @see app/Http/Controllers/LaboratoriumController.php:24
 * @route '/laboratorium'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LaboratoriumController::index
 * @see app/Http/Controllers/LaboratoriumController.php:24
 * @route '/laboratorium'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LaboratoriumController::dashboard
 * @see app/Http/Controllers/LaboratoriumController.php:290
 * @route '/laboratorium/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/laboratorium/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LaboratoriumController::dashboard
 * @see app/Http/Controllers/LaboratoriumController.php:290
 * @route '/laboratorium/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LaboratoriumController::dashboard
 * @see app/Http/Controllers/LaboratoriumController.php:290
 * @route '/laboratorium/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LaboratoriumController::dashboard
 * @see app/Http/Controllers/LaboratoriumController.php:290
 * @route '/laboratorium/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LaboratoriumController::create
 * @see app/Http/Controllers/LaboratoriumController.php:62
 * @route '/laboratorium/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/laboratorium/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LaboratoriumController::create
 * @see app/Http/Controllers/LaboratoriumController.php:62
 * @route '/laboratorium/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LaboratoriumController::create
 * @see app/Http/Controllers/LaboratoriumController.php:62
 * @route '/laboratorium/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LaboratoriumController::create
 * @see app/Http/Controllers/LaboratoriumController.php:62
 * @route '/laboratorium/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LaboratoriumController::store
 * @see app/Http/Controllers/LaboratoriumController.php:82
 * @route '/laboratorium'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/laboratorium',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\LaboratoriumController::store
 * @see app/Http/Controllers/LaboratoriumController.php:82
 * @route '/laboratorium'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LaboratoriumController::store
 * @see app/Http/Controllers/LaboratoriumController.php:82
 * @route '/laboratorium'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LaboratoriumController::show
 * @see app/Http/Controllers/LaboratoriumController.php:130
 * @route '/laboratorium/{noRawat}'
 */
export const show = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/laboratorium/{noRawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LaboratoriumController::show
 * @see app/Http/Controllers/LaboratoriumController.php:130
 * @route '/laboratorium/{noRawat}'
 */
show.url = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noRawat: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    noRawat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        noRawat: args.noRawat,
                }

    return show.definition.url
            .replace('{noRawat}', parsedArgs.noRawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LaboratoriumController::show
 * @see app/Http/Controllers/LaboratoriumController.php:130
 * @route '/laboratorium/{noRawat}'
 */
show.get = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LaboratoriumController::show
 * @see app/Http/Controllers/LaboratoriumController.php:130
 * @route '/laboratorium/{noRawat}'
 */
show.head = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LaboratoriumController::edit
 * @see app/Http/Controllers/LaboratoriumController.php:154
 * @route '/laboratorium/{noRawat}/edit'
 */
export const edit = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/laboratorium/{noRawat}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LaboratoriumController::edit
 * @see app/Http/Controllers/LaboratoriumController.php:154
 * @route '/laboratorium/{noRawat}/edit'
 */
edit.url = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noRawat: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    noRawat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        noRawat: args.noRawat,
                }

    return edit.definition.url
            .replace('{noRawat}', parsedArgs.noRawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LaboratoriumController::edit
 * @see app/Http/Controllers/LaboratoriumController.php:154
 * @route '/laboratorium/{noRawat}/edit'
 */
edit.get = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LaboratoriumController::edit
 * @see app/Http/Controllers/LaboratoriumController.php:154
 * @route '/laboratorium/{noRawat}/edit'
 */
edit.head = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LaboratoriumController::update
 * @see app/Http/Controllers/LaboratoriumController.php:175
 * @route '/laboratorium/{noRawat}'
 */
export const update = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/laboratorium/{noRawat}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\LaboratoriumController::update
 * @see app/Http/Controllers/LaboratoriumController.php:175
 * @route '/laboratorium/{noRawat}'
 */
update.url = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noRawat: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    noRawat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        noRawat: args.noRawat,
                }

    return update.definition.url
            .replace('{noRawat}', parsedArgs.noRawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LaboratoriumController::update
 * @see app/Http/Controllers/LaboratoriumController.php:175
 * @route '/laboratorium/{noRawat}'
 */
update.put = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\LaboratoriumController::destroy
 * @see app/Http/Controllers/LaboratoriumController.php:204
 * @route '/laboratorium/{noRawat}'
 */
export const destroy = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/laboratorium/{noRawat}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\LaboratoriumController::destroy
 * @see app/Http/Controllers/LaboratoriumController.php:204
 * @route '/laboratorium/{noRawat}'
 */
destroy.url = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noRawat: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    noRawat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        noRawat: args.noRawat,
                }

    return destroy.definition.url
            .replace('{noRawat}', parsedArgs.noRawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LaboratoriumController::destroy
 * @see app/Http/Controllers/LaboratoriumController.php:204
 * @route '/laboratorium/{noRawat}'
 */
destroy.delete = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\LaboratoriumController::updateHasil
 * @see app/Http/Controllers/LaboratoriumController.php:220
 * @route '/laboratorium/{noRawat}/hasil'
 */
export const updateHasil = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHasil.url(args, options),
    method: 'put',
})

updateHasil.definition = {
    methods: ["put"],
    url: '/laboratorium/{noRawat}/hasil',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\LaboratoriumController::updateHasil
 * @see app/Http/Controllers/LaboratoriumController.php:220
 * @route '/laboratorium/{noRawat}/hasil'
 */
updateHasil.url = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noRawat: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    noRawat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        noRawat: args.noRawat,
                }

    return updateHasil.definition.url
            .replace('{noRawat}', parsedArgs.noRawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LaboratoriumController::updateHasil
 * @see app/Http/Controllers/LaboratoriumController.php:220
 * @route '/laboratorium/{noRawat}/hasil'
 */
updateHasil.put = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateHasil.url(args, options),
    method: 'put',
})
const laboratorium = {
    index: Object.assign(index, index),
dashboard: Object.assign(dashboard, dashboard),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
updateHasil: Object.assign(updateHasil, updateHasil),
}

export default laboratorium