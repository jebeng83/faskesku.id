import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\RawatInapController::lanjutan
* @see app/Http/Controllers/RawatInapController.php:149
* @route '/rawat-inap/lanjutan'
*/
export const lanjutan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lanjutan.url(options),
    method: 'get',
})

lanjutan.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/lanjutan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::lanjutan
* @see app/Http/Controllers/RawatInapController.php:149
* @route '/rawat-inap/lanjutan'
*/
lanjutan.url = (options?: RouteQueryOptions) => {
    return lanjutan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::lanjutan
* @see app/Http/Controllers/RawatInapController.php:149
* @route '/rawat-inap/lanjutan'
*/
lanjutan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lanjutan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::lanjutan
* @see app/Http/Controllers/RawatInapController.php:149
* @route '/rawat-inap/lanjutan'
*/
lanjutan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lanjutan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:15
* @route '/rawat-inap'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rawat-inap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:15
* @route '/rawat-inap'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:15
* @route '/rawat-inap'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::index
* @see app/Http/Controllers/RawatInapController.php:15
* @route '/rawat-inap'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::create
* @see app/Http/Controllers/RawatInapController.php:112
* @route '/rawat-inap/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::create
* @see app/Http/Controllers/RawatInapController.php:112
* @route '/rawat-inap/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::create
* @see app/Http/Controllers/RawatInapController.php:112
* @route '/rawat-inap/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::create
* @see app/Http/Controllers/RawatInapController.php:112
* @route '/rawat-inap/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:122
* @route '/rawat-inap'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-inap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:122
* @route '/rawat-inap'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::store
* @see app/Http/Controllers/RawatInapController.php:122
* @route '/rawat-inap'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatInapController::show
* @see app/Http/Controllers/RawatInapController.php:132
* @route '/rawat-inap/{rawat_inap}'
*/
export const show = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/{rawat_inap}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::show
* @see app/Http/Controllers/RawatInapController.php:132
* @route '/rawat-inap/{rawat_inap}'
*/
show.url = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_inap: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_inap: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_inap: args.rawat_inap,
    }

    return show.definition.url
            .replace('{rawat_inap}', parsedArgs.rawat_inap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::show
* @see app/Http/Controllers/RawatInapController.php:132
* @route '/rawat-inap/{rawat_inap}'
*/
show.get = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::show
* @see app/Http/Controllers/RawatInapController.php:132
* @route '/rawat-inap/{rawat_inap}'
*/
show.head = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::edit
* @see app/Http/Controllers/RawatInapController.php:142
* @route '/rawat-inap/{rawat_inap}/edit'
*/
export const edit = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/rawat-inap/{rawat_inap}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatInapController::edit
* @see app/Http/Controllers/RawatInapController.php:142
* @route '/rawat-inap/{rawat_inap}/edit'
*/
edit.url = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_inap: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_inap: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_inap: args.rawat_inap,
    }

    return edit.definition.url
            .replace('{rawat_inap}', parsedArgs.rawat_inap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::edit
* @see app/Http/Controllers/RawatInapController.php:142
* @route '/rawat-inap/{rawat_inap}/edit'
*/
edit.get = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatInapController::edit
* @see app/Http/Controllers/RawatInapController.php:142
* @route '/rawat-inap/{rawat_inap}/edit'
*/
edit.head = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatInapController::update
* @see app/Http/Controllers/RawatInapController.php:225
* @route '/rawat-inap/{rawat_inap}'
*/
export const update = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/rawat-inap/{rawat_inap}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RawatInapController::update
* @see app/Http/Controllers/RawatInapController.php:225
* @route '/rawat-inap/{rawat_inap}'
*/
update.url = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_inap: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_inap: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_inap: args.rawat_inap,
    }

    return update.definition.url
            .replace('{rawat_inap}', parsedArgs.rawat_inap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::update
* @see app/Http/Controllers/RawatInapController.php:225
* @route '/rawat-inap/{rawat_inap}'
*/
update.put = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RawatInapController::update
* @see app/Http/Controllers/RawatInapController.php:225
* @route '/rawat-inap/{rawat_inap}'
*/
update.patch = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RawatInapController::destroy
* @see app/Http/Controllers/RawatInapController.php:235
* @route '/rawat-inap/{rawat_inap}'
*/
export const destroy = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/rawat-inap/{rawat_inap}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatInapController::destroy
* @see app/Http/Controllers/RawatInapController.php:235
* @route '/rawat-inap/{rawat_inap}'
*/
destroy.url = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_inap: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_inap: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_inap: args.rawat_inap,
    }

    return destroy.definition.url
            .replace('{rawat_inap}', parsedArgs.rawat_inap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatInapController::destroy
* @see app/Http/Controllers/RawatInapController.php:235
* @route '/rawat-inap/{rawat_inap}'
*/
destroy.delete = (args: { rawat_inap: string | number } | [rawat_inap: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const rawatInap = {
    lanjutan: Object.assign(lanjutan, lanjutan),
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default rawatInap