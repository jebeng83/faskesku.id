import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\KamarOperasiController::index
* @see app/Http/Controllers/KamarOperasiController.php:13
* @route '/kamar-operasi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/kamar-operasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KamarOperasiController::index
* @see app/Http/Controllers/KamarOperasiController.php:13
* @route '/kamar-operasi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarOperasiController::index
* @see app/Http/Controllers/KamarOperasiController.php:13
* @route '/kamar-operasi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KamarOperasiController::index
* @see app/Http/Controllers/KamarOperasiController.php:13
* @route '/kamar-operasi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KamarOperasiController::create
* @see app/Http/Controllers/KamarOperasiController.php:23
* @route '/kamar-operasi/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/kamar-operasi/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KamarOperasiController::create
* @see app/Http/Controllers/KamarOperasiController.php:23
* @route '/kamar-operasi/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarOperasiController::create
* @see app/Http/Controllers/KamarOperasiController.php:23
* @route '/kamar-operasi/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KamarOperasiController::create
* @see app/Http/Controllers/KamarOperasiController.php:23
* @route '/kamar-operasi/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KamarOperasiController::store
* @see app/Http/Controllers/KamarOperasiController.php:33
* @route '/kamar-operasi'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/kamar-operasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KamarOperasiController::store
* @see app/Http/Controllers/KamarOperasiController.php:33
* @route '/kamar-operasi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarOperasiController::store
* @see app/Http/Controllers/KamarOperasiController.php:33
* @route '/kamar-operasi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KamarOperasiController::show
* @see app/Http/Controllers/KamarOperasiController.php:43
* @route '/kamar-operasi/{kamar_operasi}'
*/
export const show = (args: { kamar_operasi: string | number } | [kamar_operasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/kamar-operasi/{kamar_operasi}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KamarOperasiController::show
* @see app/Http/Controllers/KamarOperasiController.php:43
* @route '/kamar-operasi/{kamar_operasi}'
*/
show.url = (args: { kamar_operasi: string | number } | [kamar_operasi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kamar_operasi: args }
    }

    if (Array.isArray(args)) {
        args = {
            kamar_operasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kamar_operasi: args.kamar_operasi,
    }

    return show.definition.url
            .replace('{kamar_operasi}', parsedArgs.kamar_operasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarOperasiController::show
* @see app/Http/Controllers/KamarOperasiController.php:43
* @route '/kamar-operasi/{kamar_operasi}'
*/
show.get = (args: { kamar_operasi: string | number } | [kamar_operasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KamarOperasiController::show
* @see app/Http/Controllers/KamarOperasiController.php:43
* @route '/kamar-operasi/{kamar_operasi}'
*/
show.head = (args: { kamar_operasi: string | number } | [kamar_operasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KamarOperasiController::edit
* @see app/Http/Controllers/KamarOperasiController.php:53
* @route '/kamar-operasi/{kamar_operasi}/edit'
*/
export const edit = (args: { kamar_operasi: string | number } | [kamar_operasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/kamar-operasi/{kamar_operasi}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KamarOperasiController::edit
* @see app/Http/Controllers/KamarOperasiController.php:53
* @route '/kamar-operasi/{kamar_operasi}/edit'
*/
edit.url = (args: { kamar_operasi: string | number } | [kamar_operasi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kamar_operasi: args }
    }

    if (Array.isArray(args)) {
        args = {
            kamar_operasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kamar_operasi: args.kamar_operasi,
    }

    return edit.definition.url
            .replace('{kamar_operasi}', parsedArgs.kamar_operasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarOperasiController::edit
* @see app/Http/Controllers/KamarOperasiController.php:53
* @route '/kamar-operasi/{kamar_operasi}/edit'
*/
edit.get = (args: { kamar_operasi: string | number } | [kamar_operasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KamarOperasiController::edit
* @see app/Http/Controllers/KamarOperasiController.php:53
* @route '/kamar-operasi/{kamar_operasi}/edit'
*/
edit.head = (args: { kamar_operasi: string | number } | [kamar_operasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KamarOperasiController::update
* @see app/Http/Controllers/KamarOperasiController.php:63
* @route '/kamar-operasi/{kamar_operasi}'
*/
export const update = (args: { kamar_operasi: string | number } | [kamar_operasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/kamar-operasi/{kamar_operasi}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\KamarOperasiController::update
* @see app/Http/Controllers/KamarOperasiController.php:63
* @route '/kamar-operasi/{kamar_operasi}'
*/
update.url = (args: { kamar_operasi: string | number } | [kamar_operasi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kamar_operasi: args }
    }

    if (Array.isArray(args)) {
        args = {
            kamar_operasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kamar_operasi: args.kamar_operasi,
    }

    return update.definition.url
            .replace('{kamar_operasi}', parsedArgs.kamar_operasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarOperasiController::update
* @see app/Http/Controllers/KamarOperasiController.php:63
* @route '/kamar-operasi/{kamar_operasi}'
*/
update.put = (args: { kamar_operasi: string | number } | [kamar_operasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\KamarOperasiController::update
* @see app/Http/Controllers/KamarOperasiController.php:63
* @route '/kamar-operasi/{kamar_operasi}'
*/
update.patch = (args: { kamar_operasi: string | number } | [kamar_operasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\KamarOperasiController::destroy
* @see app/Http/Controllers/KamarOperasiController.php:73
* @route '/kamar-operasi/{kamar_operasi}'
*/
export const destroy = (args: { kamar_operasi: string | number } | [kamar_operasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/kamar-operasi/{kamar_operasi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KamarOperasiController::destroy
* @see app/Http/Controllers/KamarOperasiController.php:73
* @route '/kamar-operasi/{kamar_operasi}'
*/
destroy.url = (args: { kamar_operasi: string | number } | [kamar_operasi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kamar_operasi: args }
    }

    if (Array.isArray(args)) {
        args = {
            kamar_operasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kamar_operasi: args.kamar_operasi,
    }

    return destroy.definition.url
            .replace('{kamar_operasi}', parsedArgs.kamar_operasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarOperasiController::destroy
* @see app/Http/Controllers/KamarOperasiController.php:73
* @route '/kamar-operasi/{kamar_operasi}'
*/
destroy.delete = (args: { kamar_operasi: string | number } | [kamar_operasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const KamarOperasiController = { index, create, store, show, edit, update, destroy }

export default KamarOperasiController