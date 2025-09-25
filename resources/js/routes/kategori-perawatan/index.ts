import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\KategoriPerawatanController::generateKode
* @see app/Http/Controllers/KategoriPerawatanController.php:171
* @route '/kategori-perawatan/generate-kode'
*/
export const generateKode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateKode.url(options),
    method: 'get',
})

generateKode.definition = {
    methods: ["get","head"],
    url: '/kategori-perawatan/generate-kode',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KategoriPerawatanController::generateKode
* @see app/Http/Controllers/KategoriPerawatanController.php:171
* @route '/kategori-perawatan/generate-kode'
*/
generateKode.url = (options?: RouteQueryOptions) => {
    return generateKode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KategoriPerawatanController::generateKode
* @see app/Http/Controllers/KategoriPerawatanController.php:171
* @route '/kategori-perawatan/generate-kode'
*/
generateKode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateKode.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KategoriPerawatanController::generateKode
* @see app/Http/Controllers/KategoriPerawatanController.php:171
* @route '/kategori-perawatan/generate-kode'
*/
generateKode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateKode.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KategoriPerawatanController::index
* @see app/Http/Controllers/KategoriPerawatanController.php:15
* @route '/kategori-perawatan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/kategori-perawatan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KategoriPerawatanController::index
* @see app/Http/Controllers/KategoriPerawatanController.php:15
* @route '/kategori-perawatan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KategoriPerawatanController::index
* @see app/Http/Controllers/KategoriPerawatanController.php:15
* @route '/kategori-perawatan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KategoriPerawatanController::index
* @see app/Http/Controllers/KategoriPerawatanController.php:15
* @route '/kategori-perawatan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KategoriPerawatanController::create
* @see app/Http/Controllers/KategoriPerawatanController.php:44
* @route '/kategori-perawatan/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/kategori-perawatan/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KategoriPerawatanController::create
* @see app/Http/Controllers/KategoriPerawatanController.php:44
* @route '/kategori-perawatan/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KategoriPerawatanController::create
* @see app/Http/Controllers/KategoriPerawatanController.php:44
* @route '/kategori-perawatan/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KategoriPerawatanController::create
* @see app/Http/Controllers/KategoriPerawatanController.php:44
* @route '/kategori-perawatan/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KategoriPerawatanController::store
* @see app/Http/Controllers/KategoriPerawatanController.php:54
* @route '/kategori-perawatan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/kategori-perawatan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KategoriPerawatanController::store
* @see app/Http/Controllers/KategoriPerawatanController.php:54
* @route '/kategori-perawatan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KategoriPerawatanController::store
* @see app/Http/Controllers/KategoriPerawatanController.php:54
* @route '/kategori-perawatan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KategoriPerawatanController::show
* @see app/Http/Controllers/KategoriPerawatanController.php:88
* @route '/kategori-perawatan/{kategori_perawatan}'
*/
export const show = (args: { kategori_perawatan: string | number } | [kategori_perawatan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/kategori-perawatan/{kategori_perawatan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KategoriPerawatanController::show
* @see app/Http/Controllers/KategoriPerawatanController.php:88
* @route '/kategori-perawatan/{kategori_perawatan}'
*/
show.url = (args: { kategori_perawatan: string | number } | [kategori_perawatan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kategori_perawatan: args }
    }

    if (Array.isArray(args)) {
        args = {
            kategori_perawatan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kategori_perawatan: args.kategori_perawatan,
    }

    return show.definition.url
            .replace('{kategori_perawatan}', parsedArgs.kategori_perawatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KategoriPerawatanController::show
* @see app/Http/Controllers/KategoriPerawatanController.php:88
* @route '/kategori-perawatan/{kategori_perawatan}'
*/
show.get = (args: { kategori_perawatan: string | number } | [kategori_perawatan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KategoriPerawatanController::show
* @see app/Http/Controllers/KategoriPerawatanController.php:88
* @route '/kategori-perawatan/{kategori_perawatan}'
*/
show.head = (args: { kategori_perawatan: string | number } | [kategori_perawatan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KategoriPerawatanController::edit
* @see app/Http/Controllers/KategoriPerawatanController.php:100
* @route '/kategori-perawatan/{kategori_perawatan}/edit'
*/
export const edit = (args: { kategori_perawatan: string | number } | [kategori_perawatan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/kategori-perawatan/{kategori_perawatan}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KategoriPerawatanController::edit
* @see app/Http/Controllers/KategoriPerawatanController.php:100
* @route '/kategori-perawatan/{kategori_perawatan}/edit'
*/
edit.url = (args: { kategori_perawatan: string | number } | [kategori_perawatan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kategori_perawatan: args }
    }

    if (Array.isArray(args)) {
        args = {
            kategori_perawatan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kategori_perawatan: args.kategori_perawatan,
    }

    return edit.definition.url
            .replace('{kategori_perawatan}', parsedArgs.kategori_perawatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KategoriPerawatanController::edit
* @see app/Http/Controllers/KategoriPerawatanController.php:100
* @route '/kategori-perawatan/{kategori_perawatan}/edit'
*/
edit.get = (args: { kategori_perawatan: string | number } | [kategori_perawatan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KategoriPerawatanController::edit
* @see app/Http/Controllers/KategoriPerawatanController.php:100
* @route '/kategori-perawatan/{kategori_perawatan}/edit'
*/
edit.head = (args: { kategori_perawatan: string | number } | [kategori_perawatan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KategoriPerawatanController::update
* @see app/Http/Controllers/KategoriPerawatanController.php:113
* @route '/kategori-perawatan/{kategori_perawatan}'
*/
export const update = (args: { kategori_perawatan: string | number } | [kategori_perawatan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/kategori-perawatan/{kategori_perawatan}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\KategoriPerawatanController::update
* @see app/Http/Controllers/KategoriPerawatanController.php:113
* @route '/kategori-perawatan/{kategori_perawatan}'
*/
update.url = (args: { kategori_perawatan: string | number } | [kategori_perawatan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kategori_perawatan: args }
    }

    if (Array.isArray(args)) {
        args = {
            kategori_perawatan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kategori_perawatan: args.kategori_perawatan,
    }

    return update.definition.url
            .replace('{kategori_perawatan}', parsedArgs.kategori_perawatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KategoriPerawatanController::update
* @see app/Http/Controllers/KategoriPerawatanController.php:113
* @route '/kategori-perawatan/{kategori_perawatan}'
*/
update.put = (args: { kategori_perawatan: string | number } | [kategori_perawatan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\KategoriPerawatanController::update
* @see app/Http/Controllers/KategoriPerawatanController.php:113
* @route '/kategori-perawatan/{kategori_perawatan}'
*/
update.patch = (args: { kategori_perawatan: string | number } | [kategori_perawatan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\KategoriPerawatanController::destroy
* @see app/Http/Controllers/KategoriPerawatanController.php:149
* @route '/kategori-perawatan/{kategori_perawatan}'
*/
export const destroy = (args: { kategori_perawatan: string | number } | [kategori_perawatan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/kategori-perawatan/{kategori_perawatan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KategoriPerawatanController::destroy
* @see app/Http/Controllers/KategoriPerawatanController.php:149
* @route '/kategori-perawatan/{kategori_perawatan}'
*/
destroy.url = (args: { kategori_perawatan: string | number } | [kategori_perawatan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kategori_perawatan: args }
    }

    if (Array.isArray(args)) {
        args = {
            kategori_perawatan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kategori_perawatan: args.kategori_perawatan,
    }

    return destroy.definition.url
            .replace('{kategori_perawatan}', parsedArgs.kategori_perawatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KategoriPerawatanController::destroy
* @see app/Http/Controllers/KategoriPerawatanController.php:149
* @route '/kategori-perawatan/{kategori_perawatan}'
*/
destroy.delete = (args: { kategori_perawatan: string | number } | [kategori_perawatan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const kategoriPerawatan = {
    generateKode: Object.assign(generateKode, generateKode),
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default kategoriPerawatan