import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SpesialisController::index
 * @see app/Http/Controllers/SpesialisController.php:23
 * @route '/spesialis'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/spesialis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SpesialisController::index
 * @see app/Http/Controllers/SpesialisController.php:23
 * @route '/spesialis'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SpesialisController::index
 * @see app/Http/Controllers/SpesialisController.php:23
 * @route '/spesialis'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SpesialisController::index
 * @see app/Http/Controllers/SpesialisController.php:23
 * @route '/spesialis'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SpesialisController::create
 * @see app/Http/Controllers/SpesialisController.php:0
 * @route '/spesialis/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/spesialis/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SpesialisController::create
 * @see app/Http/Controllers/SpesialisController.php:0
 * @route '/spesialis/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SpesialisController::create
 * @see app/Http/Controllers/SpesialisController.php:0
 * @route '/spesialis/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SpesialisController::create
 * @see app/Http/Controllers/SpesialisController.php:0
 * @route '/spesialis/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SpesialisController::store
 * @see app/Http/Controllers/SpesialisController.php:35
 * @route '/spesialis'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/spesialis',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SpesialisController::store
 * @see app/Http/Controllers/SpesialisController.php:35
 * @route '/spesialis'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SpesialisController::store
 * @see app/Http/Controllers/SpesialisController.php:35
 * @route '/spesialis'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SpesialisController::show
 * @see app/Http/Controllers/SpesialisController.php:50
 * @route '/spesialis/{spesiali}'
 */
export const show = (args: { spesiali: string | number } | [spesiali: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/spesialis/{spesiali}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SpesialisController::show
 * @see app/Http/Controllers/SpesialisController.php:50
 * @route '/spesialis/{spesiali}'
 */
show.url = (args: { spesiali: string | number } | [spesiali: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { spesiali: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    spesiali: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        spesiali: args.spesiali,
                }

    return show.definition.url
            .replace('{spesiali}', parsedArgs.spesiali.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SpesialisController::show
 * @see app/Http/Controllers/SpesialisController.php:50
 * @route '/spesialis/{spesiali}'
 */
show.get = (args: { spesiali: string | number } | [spesiali: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SpesialisController::show
 * @see app/Http/Controllers/SpesialisController.php:50
 * @route '/spesialis/{spesiali}'
 */
show.head = (args: { spesiali: string | number } | [spesiali: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SpesialisController::edit
 * @see app/Http/Controllers/SpesialisController.php:0
 * @route '/spesialis/{spesiali}/edit'
 */
export const edit = (args: { spesiali: string | number } | [spesiali: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/spesialis/{spesiali}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SpesialisController::edit
 * @see app/Http/Controllers/SpesialisController.php:0
 * @route '/spesialis/{spesiali}/edit'
 */
edit.url = (args: { spesiali: string | number } | [spesiali: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { spesiali: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    spesiali: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        spesiali: args.spesiali,
                }

    return edit.definition.url
            .replace('{spesiali}', parsedArgs.spesiali.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SpesialisController::edit
 * @see app/Http/Controllers/SpesialisController.php:0
 * @route '/spesialis/{spesiali}/edit'
 */
edit.get = (args: { spesiali: string | number } | [spesiali: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SpesialisController::edit
 * @see app/Http/Controllers/SpesialisController.php:0
 * @route '/spesialis/{spesiali}/edit'
 */
edit.head = (args: { spesiali: string | number } | [spesiali: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SpesialisController::update
 * @see app/Http/Controllers/SpesialisController.php:60
 * @route '/spesialis/{spesiali}'
 */
export const update = (args: { spesiali: string | number } | [spesiali: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/spesialis/{spesiali}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\SpesialisController::update
 * @see app/Http/Controllers/SpesialisController.php:60
 * @route '/spesialis/{spesiali}'
 */
update.url = (args: { spesiali: string | number } | [spesiali: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { spesiali: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    spesiali: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        spesiali: args.spesiali,
                }

    return update.definition.url
            .replace('{spesiali}', parsedArgs.spesiali.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SpesialisController::update
 * @see app/Http/Controllers/SpesialisController.php:60
 * @route '/spesialis/{spesiali}'
 */
update.put = (args: { spesiali: string | number } | [spesiali: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\SpesialisController::update
 * @see app/Http/Controllers/SpesialisController.php:60
 * @route '/spesialis/{spesiali}'
 */
update.patch = (args: { spesiali: string | number } | [spesiali: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\SpesialisController::destroy
 * @see app/Http/Controllers/SpesialisController.php:76
 * @route '/spesialis/{spesiali}'
 */
export const destroy = (args: { spesiali: string | number } | [spesiali: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/spesialis/{spesiali}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SpesialisController::destroy
 * @see app/Http/Controllers/SpesialisController.php:76
 * @route '/spesialis/{spesiali}'
 */
destroy.url = (args: { spesiali: string | number } | [spesiali: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { spesiali: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    spesiali: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        spesiali: args.spesiali,
                }

    return destroy.definition.url
            .replace('{spesiali}', parsedArgs.spesiali.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SpesialisController::destroy
 * @see app/Http/Controllers/SpesialisController.php:76
 * @route '/spesialis/{spesiali}'
 */
destroy.delete = (args: { spesiali: string | number } | [spesiali: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const spesialis = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default spesialis