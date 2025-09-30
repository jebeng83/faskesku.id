import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DaftarTarifController::generateKode
* @see app/Http/Controllers/DaftarTarifController.php:316
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
* @see app/Http/Controllers/DaftarTarifController.php:316
* @route '/daftar-tarif/generate-kode'
*/
generateKode.url = (options?: RouteQueryOptions) => {
    return generateKode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::generateKode
* @see app/Http/Controllers/DaftarTarifController.php:316
* @route '/daftar-tarif/generate-kode'
*/
generateKode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateKode.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::generateKode
* @see app/Http/Controllers/DaftarTarifController.php:316
* @route '/daftar-tarif/generate-kode'
*/
generateKode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateKode.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::storeRawatInap
* @see app/Http/Controllers/DaftarTarifController.php:354
* @route '/daftar-tarif/store-rawat-inap'
*/
export const storeRawatInap = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRawatInap.url(options),
    method: 'post',
})

storeRawatInap.definition = {
    methods: ["post"],
    url: '/daftar-tarif/store-rawat-inap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DaftarTarifController::storeRawatInap
* @see app/Http/Controllers/DaftarTarifController.php:354
* @route '/daftar-tarif/store-rawat-inap'
*/
storeRawatInap.url = (options?: RouteQueryOptions) => {
    return storeRawatInap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::storeRawatInap
* @see app/Http/Controllers/DaftarTarifController.php:354
* @route '/daftar-tarif/store-rawat-inap'
*/
storeRawatInap.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRawatInap.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::index
* @see app/Http/Controllers/DaftarTarifController.php:19
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
* @see app/Http/Controllers/DaftarTarifController.php:19
* @route '/daftar-tarif'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::index
* @see app/Http/Controllers/DaftarTarifController.php:19
* @route '/daftar-tarif'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::index
* @see app/Http/Controllers/DaftarTarifController.php:19
* @route '/daftar-tarif'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::create
* @see app/Http/Controllers/DaftarTarifController.php:125
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
* @see app/Http/Controllers/DaftarTarifController.php:125
* @route '/daftar-tarif/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::create
* @see app/Http/Controllers/DaftarTarifController.php:125
* @route '/daftar-tarif/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::create
* @see app/Http/Controllers/DaftarTarifController.php:125
* @route '/daftar-tarif/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::store
* @see app/Http/Controllers/DaftarTarifController.php:148
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
* @see app/Http/Controllers/DaftarTarifController.php:148
* @route '/daftar-tarif'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::store
* @see app/Http/Controllers/DaftarTarifController.php:148
* @route '/daftar-tarif'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::show
* @see app/Http/Controllers/DaftarTarifController.php:0
* @route '/daftar-tarif/{daftar_tarif}'
*/
export const show = (args: { daftar_tarif: string | number } | [daftar_tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/daftar-tarif/{daftar_tarif}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DaftarTarifController::show
* @see app/Http/Controllers/DaftarTarifController.php:0
* @route '/daftar-tarif/{daftar_tarif}'
*/
show.url = (args: { daftar_tarif: string | number } | [daftar_tarif: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { daftar_tarif: args }
    }

    if (Array.isArray(args)) {
        args = {
            daftar_tarif: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        daftar_tarif: args.daftar_tarif,
    }

    return show.definition.url
            .replace('{daftar_tarif}', parsedArgs.daftar_tarif.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::show
* @see app/Http/Controllers/DaftarTarifController.php:0
* @route '/daftar-tarif/{daftar_tarif}'
*/
show.get = (args: { daftar_tarif: string | number } | [daftar_tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::show
* @see app/Http/Controllers/DaftarTarifController.php:0
* @route '/daftar-tarif/{daftar_tarif}'
*/
show.head = (args: { daftar_tarif: string | number } | [daftar_tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::edit
* @see app/Http/Controllers/DaftarTarifController.php:494
* @route '/daftar-tarif/{daftar_tarif}/edit'
*/
export const edit = (args: { daftar_tarif: string | number } | [daftar_tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/daftar-tarif/{daftar_tarif}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DaftarTarifController::edit
* @see app/Http/Controllers/DaftarTarifController.php:494
* @route '/daftar-tarif/{daftar_tarif}/edit'
*/
edit.url = (args: { daftar_tarif: string | number } | [daftar_tarif: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { daftar_tarif: args }
    }

    if (Array.isArray(args)) {
        args = {
            daftar_tarif: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        daftar_tarif: args.daftar_tarif,
    }

    return edit.definition.url
            .replace('{daftar_tarif}', parsedArgs.daftar_tarif.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::edit
* @see app/Http/Controllers/DaftarTarifController.php:494
* @route '/daftar-tarif/{daftar_tarif}/edit'
*/
edit.get = (args: { daftar_tarif: string | number } | [daftar_tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::edit
* @see app/Http/Controllers/DaftarTarifController.php:494
* @route '/daftar-tarif/{daftar_tarif}/edit'
*/
edit.head = (args: { daftar_tarif: string | number } | [daftar_tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::update
* @see app/Http/Controllers/DaftarTarifController.php:519
* @route '/daftar-tarif/{daftar_tarif}'
*/
export const update = (args: { daftar_tarif: string | number } | [daftar_tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/daftar-tarif/{daftar_tarif}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DaftarTarifController::update
* @see app/Http/Controllers/DaftarTarifController.php:519
* @route '/daftar-tarif/{daftar_tarif}'
*/
update.url = (args: { daftar_tarif: string | number } | [daftar_tarif: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { daftar_tarif: args }
    }

    if (Array.isArray(args)) {
        args = {
            daftar_tarif: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        daftar_tarif: args.daftar_tarif,
    }

    return update.definition.url
            .replace('{daftar_tarif}', parsedArgs.daftar_tarif.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::update
* @see app/Http/Controllers/DaftarTarifController.php:519
* @route '/daftar-tarif/{daftar_tarif}'
*/
update.put = (args: { daftar_tarif: string | number } | [daftar_tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::update
* @see app/Http/Controllers/DaftarTarifController.php:519
* @route '/daftar-tarif/{daftar_tarif}'
*/
update.patch = (args: { daftar_tarif: string | number } | [daftar_tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DaftarTarifController::destroy
* @see app/Http/Controllers/DaftarTarifController.php:281
* @route '/daftar-tarif/{daftar_tarif}'
*/
export const destroy = (args: { daftar_tarif: string | number } | [daftar_tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/daftar-tarif/{daftar_tarif}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DaftarTarifController::destroy
* @see app/Http/Controllers/DaftarTarifController.php:281
* @route '/daftar-tarif/{daftar_tarif}'
*/
destroy.url = (args: { daftar_tarif: string | number } | [daftar_tarif: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { daftar_tarif: args }
    }

    if (Array.isArray(args)) {
        args = {
            daftar_tarif: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        daftar_tarif: args.daftar_tarif,
    }

    return destroy.definition.url
            .replace('{daftar_tarif}', parsedArgs.daftar_tarif.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaftarTarifController::destroy
* @see app/Http/Controllers/DaftarTarifController.php:281
* @route '/daftar-tarif/{daftar_tarif}'
*/
destroy.delete = (args: { daftar_tarif: string | number } | [daftar_tarif: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const DaftarTarifController = { generateKode, storeRawatInap, index, create, store, show, edit, update, destroy }

export default DaftarTarifController