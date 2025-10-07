import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PermintaanLabController::index
 * @see app/Http/Controllers/PermintaanLabController.php:25
 * @route '/permintaan-lab'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/permintaan-lab',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::index
 * @see app/Http/Controllers/PermintaanLabController.php:25
 * @route '/permintaan-lab'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::index
 * @see app/Http/Controllers/PermintaanLabController.php:25
 * @route '/permintaan-lab'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PermintaanLabController::index
 * @see app/Http/Controllers/PermintaanLabController.php:25
 * @route '/permintaan-lab'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::create
 * @see app/Http/Controllers/PermintaanLabController.php:69
 * @route '/permintaan-lab/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/permintaan-lab/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::create
 * @see app/Http/Controllers/PermintaanLabController.php:69
 * @route '/permintaan-lab/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::create
 * @see app/Http/Controllers/PermintaanLabController.php:69
 * @route '/permintaan-lab/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PermintaanLabController::create
 * @see app/Http/Controllers/PermintaanLabController.php:69
 * @route '/permintaan-lab/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::store
 * @see app/Http/Controllers/PermintaanLabController.php:86
 * @route '/permintaan-lab'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/permintaan-lab',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::store
 * @see app/Http/Controllers/PermintaanLabController.php:86
 * @route '/permintaan-lab'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::store
 * @see app/Http/Controllers/PermintaanLabController.php:86
 * @route '/permintaan-lab'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::show
 * @see app/Http/Controllers/PermintaanLabController.php:177
 * @route '/permintaan-lab/{permintaan_lab}'
 */
export const show = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/permintaan-lab/{permintaan_lab}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::show
 * @see app/Http/Controllers/PermintaanLabController.php:177
 * @route '/permintaan-lab/{permintaan_lab}'
 */
show.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    permintaan_lab: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        permintaan_lab: args.permintaan_lab,
                }

    return show.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::show
 * @see app/Http/Controllers/PermintaanLabController.php:177
 * @route '/permintaan-lab/{permintaan_lab}'
 */
show.get = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PermintaanLabController::show
 * @see app/Http/Controllers/PermintaanLabController.php:177
 * @route '/permintaan-lab/{permintaan_lab}'
 */
show.head = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::edit
 * @see app/Http/Controllers/PermintaanLabController.php:190
 * @route '/permintaan-lab/{permintaan_lab}/edit'
 */
export const edit = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/permintaan-lab/{permintaan_lab}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::edit
 * @see app/Http/Controllers/PermintaanLabController.php:190
 * @route '/permintaan-lab/{permintaan_lab}/edit'
 */
edit.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    permintaan_lab: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        permintaan_lab: args.permintaan_lab,
                }

    return edit.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::edit
 * @see app/Http/Controllers/PermintaanLabController.php:190
 * @route '/permintaan-lab/{permintaan_lab}/edit'
 */
edit.get = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PermintaanLabController::edit
 * @see app/Http/Controllers/PermintaanLabController.php:190
 * @route '/permintaan-lab/{permintaan_lab}/edit'
 */
edit.head = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::update
 * @see app/Http/Controllers/PermintaanLabController.php:208
 * @route '/permintaan-lab/{permintaan_lab}'
 */
export const update = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/permintaan-lab/{permintaan_lab}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::update
 * @see app/Http/Controllers/PermintaanLabController.php:208
 * @route '/permintaan-lab/{permintaan_lab}'
 */
update.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    permintaan_lab: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        permintaan_lab: args.permintaan_lab,
                }

    return update.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::update
 * @see app/Http/Controllers/PermintaanLabController.php:208
 * @route '/permintaan-lab/{permintaan_lab}'
 */
update.put = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\PermintaanLabController::update
 * @see app/Http/Controllers/PermintaanLabController.php:208
 * @route '/permintaan-lab/{permintaan_lab}'
 */
update.patch = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
 * @see app/Http/Controllers/PermintaanLabController.php:255
 * @route '/permintaan-lab/{permintaan_lab}'
 */
export const destroy = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/permintaan-lab/{permintaan_lab}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
 * @see app/Http/Controllers/PermintaanLabController.php:255
 * @route '/permintaan-lab/{permintaan_lab}'
 */
destroy.url = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan_lab: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    permintaan_lab: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        permintaan_lab: args.permintaan_lab,
                }

    return destroy.definition.url
            .replace('{permintaan_lab}', parsedArgs.permintaan_lab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermintaanLabController::destroy
 * @see app/Http/Controllers/PermintaanLabController.php:255
 * @route '/permintaan-lab/{permintaan_lab}'
 */
destroy.delete = (args: { permintaan_lab: string | number } | [permintaan_lab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const permintaanLab = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default permintaanLab