import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\RehabilitasiMedikController::index
* @see app/Http/Controllers/RehabilitasiMedikController.php:13
* @route '/rehabilitasi-medik'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rehabilitasi-medik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::index
* @see app/Http/Controllers/RehabilitasiMedikController.php:13
* @route '/rehabilitasi-medik'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::index
* @see app/Http/Controllers/RehabilitasiMedikController.php:13
* @route '/rehabilitasi-medik'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::index
* @see app/Http/Controllers/RehabilitasiMedikController.php:13
* @route '/rehabilitasi-medik'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::create
* @see app/Http/Controllers/RehabilitasiMedikController.php:23
* @route '/rehabilitasi-medik/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/rehabilitasi-medik/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::create
* @see app/Http/Controllers/RehabilitasiMedikController.php:23
* @route '/rehabilitasi-medik/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::create
* @see app/Http/Controllers/RehabilitasiMedikController.php:23
* @route '/rehabilitasi-medik/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::create
* @see app/Http/Controllers/RehabilitasiMedikController.php:23
* @route '/rehabilitasi-medik/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::store
* @see app/Http/Controllers/RehabilitasiMedikController.php:33
* @route '/rehabilitasi-medik'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rehabilitasi-medik',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::store
* @see app/Http/Controllers/RehabilitasiMedikController.php:33
* @route '/rehabilitasi-medik'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::store
* @see app/Http/Controllers/RehabilitasiMedikController.php:33
* @route '/rehabilitasi-medik'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::show
* @see app/Http/Controllers/RehabilitasiMedikController.php:43
* @route '/rehabilitasi-medik/{rehabilitasi_medik}'
*/
export const show = (args: { rehabilitasi_medik: string | number } | [rehabilitasi_medik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/rehabilitasi-medik/{rehabilitasi_medik}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::show
* @see app/Http/Controllers/RehabilitasiMedikController.php:43
* @route '/rehabilitasi-medik/{rehabilitasi_medik}'
*/
show.url = (args: { rehabilitasi_medik: string | number } | [rehabilitasi_medik: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rehabilitasi_medik: args }
    }

    if (Array.isArray(args)) {
        args = {
            rehabilitasi_medik: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rehabilitasi_medik: args.rehabilitasi_medik,
    }

    return show.definition.url
            .replace('{rehabilitasi_medik}', parsedArgs.rehabilitasi_medik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::show
* @see app/Http/Controllers/RehabilitasiMedikController.php:43
* @route '/rehabilitasi-medik/{rehabilitasi_medik}'
*/
show.get = (args: { rehabilitasi_medik: string | number } | [rehabilitasi_medik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::show
* @see app/Http/Controllers/RehabilitasiMedikController.php:43
* @route '/rehabilitasi-medik/{rehabilitasi_medik}'
*/
show.head = (args: { rehabilitasi_medik: string | number } | [rehabilitasi_medik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::edit
* @see app/Http/Controllers/RehabilitasiMedikController.php:53
* @route '/rehabilitasi-medik/{rehabilitasi_medik}/edit'
*/
export const edit = (args: { rehabilitasi_medik: string | number } | [rehabilitasi_medik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/rehabilitasi-medik/{rehabilitasi_medik}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::edit
* @see app/Http/Controllers/RehabilitasiMedikController.php:53
* @route '/rehabilitasi-medik/{rehabilitasi_medik}/edit'
*/
edit.url = (args: { rehabilitasi_medik: string | number } | [rehabilitasi_medik: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rehabilitasi_medik: args }
    }

    if (Array.isArray(args)) {
        args = {
            rehabilitasi_medik: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rehabilitasi_medik: args.rehabilitasi_medik,
    }

    return edit.definition.url
            .replace('{rehabilitasi_medik}', parsedArgs.rehabilitasi_medik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::edit
* @see app/Http/Controllers/RehabilitasiMedikController.php:53
* @route '/rehabilitasi-medik/{rehabilitasi_medik}/edit'
*/
edit.get = (args: { rehabilitasi_medik: string | number } | [rehabilitasi_medik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::edit
* @see app/Http/Controllers/RehabilitasiMedikController.php:53
* @route '/rehabilitasi-medik/{rehabilitasi_medik}/edit'
*/
edit.head = (args: { rehabilitasi_medik: string | number } | [rehabilitasi_medik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::update
* @see app/Http/Controllers/RehabilitasiMedikController.php:63
* @route '/rehabilitasi-medik/{rehabilitasi_medik}'
*/
export const update = (args: { rehabilitasi_medik: string | number } | [rehabilitasi_medik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/rehabilitasi-medik/{rehabilitasi_medik}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::update
* @see app/Http/Controllers/RehabilitasiMedikController.php:63
* @route '/rehabilitasi-medik/{rehabilitasi_medik}'
*/
update.url = (args: { rehabilitasi_medik: string | number } | [rehabilitasi_medik: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rehabilitasi_medik: args }
    }

    if (Array.isArray(args)) {
        args = {
            rehabilitasi_medik: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rehabilitasi_medik: args.rehabilitasi_medik,
    }

    return update.definition.url
            .replace('{rehabilitasi_medik}', parsedArgs.rehabilitasi_medik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::update
* @see app/Http/Controllers/RehabilitasiMedikController.php:63
* @route '/rehabilitasi-medik/{rehabilitasi_medik}'
*/
update.put = (args: { rehabilitasi_medik: string | number } | [rehabilitasi_medik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::update
* @see app/Http/Controllers/RehabilitasiMedikController.php:63
* @route '/rehabilitasi-medik/{rehabilitasi_medik}'
*/
update.patch = (args: { rehabilitasi_medik: string | number } | [rehabilitasi_medik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::destroy
* @see app/Http/Controllers/RehabilitasiMedikController.php:73
* @route '/rehabilitasi-medik/{rehabilitasi_medik}'
*/
export const destroy = (args: { rehabilitasi_medik: string | number } | [rehabilitasi_medik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/rehabilitasi-medik/{rehabilitasi_medik}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::destroy
* @see app/Http/Controllers/RehabilitasiMedikController.php:73
* @route '/rehabilitasi-medik/{rehabilitasi_medik}'
*/
destroy.url = (args: { rehabilitasi_medik: string | number } | [rehabilitasi_medik: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rehabilitasi_medik: args }
    }

    if (Array.isArray(args)) {
        args = {
            rehabilitasi_medik: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rehabilitasi_medik: args.rehabilitasi_medik,
    }

    return destroy.definition.url
            .replace('{rehabilitasi_medik}', parsedArgs.rehabilitasi_medik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RehabilitasiMedikController::destroy
* @see app/Http/Controllers/RehabilitasiMedikController.php:73
* @route '/rehabilitasi-medik/{rehabilitasi_medik}'
*/
destroy.delete = (args: { rehabilitasi_medik: string | number } | [rehabilitasi_medik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const rehabilitasiMedik = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default rehabilitasiMedikObject.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default rehabilitasiMedik