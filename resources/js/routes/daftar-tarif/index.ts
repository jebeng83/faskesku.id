import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DaftarTarifController::index
* @see app/Http/Controllers/DaftarTarifController.php:18
* @route '/daftar-tarif'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/daftar-tarif',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DaftarTarifController::index
* @see app/Http/Controllers/DaftarTarifController.php:18
* @route '/daftar-tarif'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::index
* @see app/Http/Controllers/DaftarTarifController.php:18
* @route '/daftar-tarif'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::index
* @see app/Http/Controllers/DaftarTarifController.php:18
* @route '/daftar-tarif'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::create
* @see app/Http/Controllers/DaftarTarifController.php:122
* @route '/daftar-tarif/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/daftar-tarif/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DaftarTarifController::create
* @see app/Http/Controllers/DaftarTarifController.php:122
* @route '/daftar-tarif/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::create
* @see app/Http/Controllers/DaftarTarifController.php:122
* @route '/daftar-tarif/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::create
* @see app/Http/Controllers/DaftarTarifController.php:122
* @route '/daftar-tarif/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::store
* @see app/Http/Controllers/DaftarTarifController.php:141
* @route '/daftar-tarif'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/daftar-tarif',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DaftarTarifController::store
* @see app/Http/Controllers/DaftarTarifController.php:141
* @route '/daftar-tarif'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::store
* @see app/Http/Controllers/DaftarTarifController.php:141
* @route '/daftar-tarif'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::generateKode
* @see app/Http/Controllers/DaftarTarifController.php:309
* @route '/daftar-tarif/generate-kode'
*/
export const generateKode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateKode.url(options),
    method: 'get',
})

generateKode.definition = {
    methods: ["get","head"],
    url: '/daftar-tarif/generate-kode',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DaftarTarifController::generateKode
* @see app/Http/Controllers/DaftarTarifController.php:309
* @route '/daftar-tarif/generate-kode'
*/
generateKode.url = (options?: RouteQueryOptions) => {
    return generateKode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::generateKode
* @see app/Http/Controllers/DaftarTarifController.php:309
* @route '/daftar-tarif/generate-kode'
*/
generateKode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateKode.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::generateKode
* @see app/Http/Controllers/DaftarTarifController.php:309
* @route '/daftar-tarif/generate-kode'
*/
generateKode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateKode.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::show
* @see app/Http/Controllers/DaftarTarifController.php:0
* @route '/daftar-tarif/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/daftar-tarif/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DaftarTarifController::show
* @see app/Http/Controllers/DaftarTarifController.php:0
* @route '/daftar-tarif/{id}'
*/
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::show
* @see app/Http/Controllers/DaftarTarifController.php:0
* @route '/daftar-tarif/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::show
* @see app/Http/Controllers/DaftarTarifController.php:0
* @route '/daftar-tarif/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::edit
* @see app/Http/Controllers/DaftarTarifController.php:357
* @route '/daftar-tarif/{id}/edit'
*/
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/daftar-tarif/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DaftarTarifController::edit
* @see app/Http/Controllers/DaftarTarifController.php:357
* @route '/daftar-tarif/{id}/edit'
*/
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::edit
* @see app/Http/Controllers/DaftarTarifController.php:357
* @route '/daftar-tarif/{id}/edit'
*/
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::edit
* @see app/Http/Controllers/DaftarTarifController.php:357
* @route '/daftar-tarif/{id}/edit'
*/
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::update
* @see app/Http/Controllers/DaftarTarifController.php:382
* @route '/daftar-tarif/{id}/update'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/daftar-tarif/{id}/update',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DaftarTarifController::update
* @see app/Http/Controllers/DaftarTarifController.php:382
* @route '/daftar-tarif/{id}/update'
*/
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::update
* @see app/Http/Controllers/DaftarTarifController.php:382
* @route '/daftar-tarif/{id}/update'
*/
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::destroy
* @see app/Http/Controllers/DaftarTarifController.php:274
* @route '/daftar-tarif/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/daftar-tarif/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DaftarTarifController::destroy
* @see app/Http/Controllers/DaftarTarifController.php:274
* @route '/daftar-tarif/{id}'
*/
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::destroy
* @see app/Http/Controllers/DaftarTarifController.php:274
* @route '/daftar-tarif/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const daftarTarif = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    generateKode: Object.assign(generateKode, generateKode),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default daftarTarif