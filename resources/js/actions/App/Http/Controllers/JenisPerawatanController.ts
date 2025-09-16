import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\JenisPerawatanController::index
* @see app/Http/Controllers/JenisPerawatanController.php:17
* @route '/tarif'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tarif',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JenisPerawatanController::index
* @see app/Http/Controllers/JenisPerawatanController.php:17
* @route '/tarif'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JenisPerawatanController::index
* @see app/Http/Controllers/JenisPerawatanController.php:17
* @route '/tarif'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JenisPerawatanController::index
* @see app/Http/Controllers/JenisPerawatanController.php:17
* @route '/tarif'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JenisPerawatanController::create
* @see app/Http/Controllers/JenisPerawatanController.php:75
* @route '/tarif/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/tarif/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JenisPerawatanController::create
* @see app/Http/Controllers/JenisPerawatanController.php:75
* @route '/tarif/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JenisPerawatanController::create
* @see app/Http/Controllers/JenisPerawatanController.php:75
* @route '/tarif/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JenisPerawatanController::create
* @see app/Http/Controllers/JenisPerawatanController.php:75
* @route '/tarif/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JenisPerawatanController::store
* @see app/Http/Controllers/JenisPerawatanController.php:89
* @route '/tarif'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tarif',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\JenisPerawatanController::store
* @see app/Http/Controllers/JenisPerawatanController.php:89
* @route '/tarif'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JenisPerawatanController::store
* @see app/Http/Controllers/JenisPerawatanController.php:89
* @route '/tarif'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JenisPerawatanController::show
* @see app/Http/Controllers/JenisPerawatanController.php:144
* @route '/tarif/{tarif}'
*/
export const show = (args: { tarif: string | number } | [tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/tarif/{tarif}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JenisPerawatanController::show
* @see app/Http/Controllers/JenisPerawatanController.php:144
* @route '/tarif/{tarif}'
*/
show.url = (args: { tarif: string | number } | [tarif: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tarif: args }
    }

    if (Array.isArray(args)) {
        args = {
            tarif: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tarif: args.tarif,
    }

    return show.definition.url
            .replace('{tarif}', parsedArgs.tarif.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JenisPerawatanController::show
* @see app/Http/Controllers/JenisPerawatanController.php:144
* @route '/tarif/{tarif}'
*/
show.get = (args: { tarif: string | number } | [tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JenisPerawatanController::show
* @see app/Http/Controllers/JenisPerawatanController.php:144
* @route '/tarif/{tarif}'
*/
show.head = (args: { tarif: string | number } | [tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JenisPerawatanController::edit
* @see app/Http/Controllers/JenisPerawatanController.php:156
* @route '/tarif/{tarif}/edit'
*/
export const edit = (args: { tarif: string | number } | [tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/tarif/{tarif}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JenisPerawatanController::edit
* @see app/Http/Controllers/JenisPerawatanController.php:156
* @route '/tarif/{tarif}/edit'
*/
edit.url = (args: { tarif: string | number } | [tarif: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tarif: args }
    }

    if (Array.isArray(args)) {
        args = {
            tarif: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tarif: args.tarif,
    }

    return edit.definition.url
            .replace('{tarif}', parsedArgs.tarif.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JenisPerawatanController::edit
* @see app/Http/Controllers/JenisPerawatanController.php:156
* @route '/tarif/{tarif}/edit'
*/
edit.get = (args: { tarif: string | number } | [tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JenisPerawatanController::edit
* @see app/Http/Controllers/JenisPerawatanController.php:156
* @route '/tarif/{tarif}/edit'
*/
edit.head = (args: { tarif: string | number } | [tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JenisPerawatanController::update
* @see app/Http/Controllers/JenisPerawatanController.php:171
* @route '/tarif/{tarif}'
*/
export const update = (args: { tarif: string | number } | [tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/tarif/{tarif}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\JenisPerawatanController::update
* @see app/Http/Controllers/JenisPerawatanController.php:171
* @route '/tarif/{tarif}'
*/
update.url = (args: { tarif: string | number } | [tarif: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tarif: args }
    }

    if (Array.isArray(args)) {
        args = {
            tarif: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tarif: args.tarif,
    }

    return update.definition.url
            .replace('{tarif}', parsedArgs.tarif.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JenisPerawatanController::update
* @see app/Http/Controllers/JenisPerawatanController.php:171
* @route '/tarif/{tarif}'
*/
update.put = (args: { tarif: string | number } | [tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\JenisPerawatanController::update
* @see app/Http/Controllers/JenisPerawatanController.php:171
* @route '/tarif/{tarif}'
*/
update.patch = (args: { tarif: string | number } | [tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\JenisPerawatanController::destroy
* @see app/Http/Controllers/JenisPerawatanController.php:215
* @route '/tarif/{tarif}'
*/
export const destroy = (args: { tarif: string | number } | [tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tarif/{tarif}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\JenisPerawatanController::destroy
* @see app/Http/Controllers/JenisPerawatanController.php:215
* @route '/tarif/{tarif}'
*/
destroy.url = (args: { tarif: string | number } | [tarif: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tarif: args }
    }

    if (Array.isArray(args)) {
        args = {
            tarif: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tarif: args.tarif,
    }

    return destroy.definition.url
            .replace('{tarif}', parsedArgs.tarif.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JenisPerawatanController::destroy
* @see app/Http/Controllers/JenisPerawatanController.php:215
* @route '/tarif/{tarif}'
*/
destroy.delete = (args: { tarif: string | number } | [tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\JenisPerawatanController::toggleStatus
* @see app/Http/Controllers/JenisPerawatanController.php:226
* @route '/tarif/{jenisPerawatan}/toggle-status'
*/
export const toggleStatus = (args: { jenisPerawatan: string | { kd_jenis_prw: string } } | [jenisPerawatan: string | { kd_jenis_prw: string } ] | string | { kd_jenis_prw: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleStatus.url(args, options),
    method: 'post',
})

toggleStatus.definition = {
    methods: ["post"],
    url: '/tarif/{jenisPerawatan}/toggle-status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\JenisPerawatanController::toggleStatus
* @see app/Http/Controllers/JenisPerawatanController.php:226
* @route '/tarif/{jenisPerawatan}/toggle-status'
*/
toggleStatus.url = (args: { jenisPerawatan: string | { kd_jenis_prw: string } } | [jenisPerawatan: string | { kd_jenis_prw: string } ] | string | { kd_jenis_prw: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jenisPerawatan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'kd_jenis_prw' in args) {
        args = { jenisPerawatan: args.kd_jenis_prw }
    }

    if (Array.isArray(args)) {
        args = {
            jenisPerawatan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jenisPerawatan: typeof args.jenisPerawatan === 'object'
        ? args.jenisPerawatan.kd_jenis_prw
        : args.jenisPerawatan,
    }

    return toggleStatus.definition.url
            .replace('{jenisPerawatan}', parsedArgs.jenisPerawatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JenisPerawatanController::toggleStatus
* @see app/Http/Controllers/JenisPerawatanController.php:226
* @route '/tarif/{jenisPerawatan}/toggle-status'
*/
toggleStatus.post = (args: { jenisPerawatan: string | { kd_jenis_prw: string } } | [jenisPerawatan: string | { kd_jenis_prw: string } ] | string | { kd_jenis_prw: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleStatus.url(args, options),
    method: 'post',
})

const JenisPerawatanController = { index, create, store, show, edit, update, destroy, toggleStatus }

export default JenisPerawatanController