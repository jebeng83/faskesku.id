import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\IGDController::index
* @see app/Http/Controllers/IGDController.php:13
* @route '/igd'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/igd',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IGDController::index
* @see app/Http/Controllers/IGDController.php:13
* @route '/igd'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IGDController::index
* @see app/Http/Controllers/IGDController.php:13
* @route '/igd'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IGDController::index
* @see app/Http/Controllers/IGDController.php:13
* @route '/igd'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IGDController::create
* @see app/Http/Controllers/IGDController.php:23
* @route '/igd/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/igd/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IGDController::create
* @see app/Http/Controllers/IGDController.php:23
* @route '/igd/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IGDController::create
* @see app/Http/Controllers/IGDController.php:23
* @route '/igd/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IGDController::create
* @see app/Http/Controllers/IGDController.php:23
* @route '/igd/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IGDController::store
* @see app/Http/Controllers/IGDController.php:33
* @route '/igd'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/igd',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\IGDController::store
* @see app/Http/Controllers/IGDController.php:33
* @route '/igd'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IGDController::store
* @see app/Http/Controllers/IGDController.php:33
* @route '/igd'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IGDController::show
* @see app/Http/Controllers/IGDController.php:43
* @route '/igd/{igd}'
*/
export const show = (args: { igd: string | number } | [igd: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/igd/{igd}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IGDController::show
* @see app/Http/Controllers/IGDController.php:43
* @route '/igd/{igd}'
*/
show.url = (args: { igd: string | number } | [igd: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { igd: args }
    }

    if (Array.isArray(args)) {
        args = {
            igd: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        igd: args.igd,
    }

    return show.definition.url
            .replace('{igd}', parsedArgs.igd.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IGDController::show
* @see app/Http/Controllers/IGDController.php:43
* @route '/igd/{igd}'
*/
show.get = (args: { igd: string | number } | [igd: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IGDController::show
* @see app/Http/Controllers/IGDController.php:43
* @route '/igd/{igd}'
*/
show.head = (args: { igd: string | number } | [igd: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IGDController::edit
* @see app/Http/Controllers/IGDController.php:53
* @route '/igd/{igd}/edit'
*/
export const edit = (args: { igd: string | number } | [igd: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/igd/{igd}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IGDController::edit
* @see app/Http/Controllers/IGDController.php:53
* @route '/igd/{igd}/edit'
*/
edit.url = (args: { igd: string | number } | [igd: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { igd: args }
    }

    if (Array.isArray(args)) {
        args = {
            igd: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        igd: args.igd,
    }

    return edit.definition.url
            .replace('{igd}', parsedArgs.igd.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IGDController::edit
* @see app/Http/Controllers/IGDController.php:53
* @route '/igd/{igd}/edit'
*/
edit.get = (args: { igd: string | number } | [igd: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IGDController::edit
* @see app/Http/Controllers/IGDController.php:53
* @route '/igd/{igd}/edit'
*/
edit.head = (args: { igd: string | number } | [igd: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IGDController::update
* @see app/Http/Controllers/IGDController.php:63
* @route '/igd/{igd}'
*/
export const update = (args: { igd: string | number } | [igd: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/igd/{igd}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\IGDController::update
* @see app/Http/Controllers/IGDController.php:63
* @route '/igd/{igd}'
*/
update.url = (args: { igd: string | number } | [igd: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { igd: args }
    }

    if (Array.isArray(args)) {
        args = {
            igd: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        igd: args.igd,
    }

    return update.definition.url
            .replace('{igd}', parsedArgs.igd.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IGDController::update
* @see app/Http/Controllers/IGDController.php:63
* @route '/igd/{igd}'
*/
update.put = (args: { igd: string | number } | [igd: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\IGDController::update
* @see app/Http/Controllers/IGDController.php:63
* @route '/igd/{igd}'
*/
update.patch = (args: { igd: string | number } | [igd: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\IGDController::destroy
* @see app/Http/Controllers/IGDController.php:73
* @route '/igd/{igd}'
*/
export const destroy = (args: { igd: string | number } | [igd: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/igd/{igd}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\IGDController::destroy
* @see app/Http/Controllers/IGDController.php:73
* @route '/igd/{igd}'
*/
destroy.url = (args: { igd: string | number } | [igd: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { igd: args }
    }

    if (Array.isArray(args)) {
        args = {
            igd: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        igd: args.igd,
    }

    return destroy.definition.url
            .replace('{igd}', parsedArgs.igd.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IGDController::destroy
* @see app/Http/Controllers/IGDController.php:73
* @route '/igd/{igd}'
*/
destroy.delete = (args: { igd: string | number } | [igd: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const igd = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default igd