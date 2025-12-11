import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import update603324 from './update'
/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::index
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:16
* @route '/jenjang-jabatan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/jenjang-jabatan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::index
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:16
* @route '/jenjang-jabatan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::index
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:16
* @route '/jenjang-jabatan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::index
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:16
* @route '/jenjang-jabatan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::create
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:43
* @route '/jenjang-jabatan/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/jenjang-jabatan/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::create
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:43
* @route '/jenjang-jabatan/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::create
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:43
* @route '/jenjang-jabatan/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::create
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:43
* @route '/jenjang-jabatan/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::store
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:51
* @route '/jenjang-jabatan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/jenjang-jabatan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::store
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:51
* @route '/jenjang-jabatan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::store
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:51
* @route '/jenjang-jabatan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::show
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:118
* @route '/jenjang-jabatan/{kode}'
*/
export const show = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/jenjang-jabatan/{kode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::show
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:118
* @route '/jenjang-jabatan/{kode}'
*/
show.url = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode: args.kode,
    }

    return show.definition.url
            .replace('{kode}', parsedArgs.kode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::show
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:118
* @route '/jenjang-jabatan/{kode}'
*/
show.get = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::show
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:118
* @route '/jenjang-jabatan/{kode}'
*/
show.head = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::edit
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:130
* @route '/jenjang-jabatan/{kode}/edit'
*/
export const edit = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/jenjang-jabatan/{kode}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::edit
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:130
* @route '/jenjang-jabatan/{kode}/edit'
*/
edit.url = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode: args.kode,
    }

    return edit.definition.url
            .replace('{kode}', parsedArgs.kode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::edit
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:130
* @route '/jenjang-jabatan/{kode}/edit'
*/
edit.get = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::edit
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:130
* @route '/jenjang-jabatan/{kode}/edit'
*/
edit.head = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::update
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:142
* @route '/jenjang-jabatan/{kode}'
*/
export const update = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/jenjang-jabatan/{kode}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::update
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:142
* @route '/jenjang-jabatan/{kode}'
*/
update.url = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode: args.kode,
    }

    return update.definition.url
            .replace('{kode}', parsedArgs.kode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::update
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:142
* @route '/jenjang-jabatan/{kode}'
*/
update.put = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::destroy
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:179
* @route '/jenjang-jabatan/{kode}'
*/
export const destroy = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/jenjang-jabatan/{kode}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::destroy
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:179
* @route '/jenjang-jabatan/{kode}'
*/
destroy.url = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode: args.kode,
    }

    return destroy.definition.url
            .replace('{kode}', parsedArgs.kode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Kepegawaian\JenjangJabatanController::destroy
* @see app/Http/Controllers/Kepegawaian/JenjangJabatanController.php:179
* @route '/jenjang-jabatan/{kode}'
*/
destroy.delete = (args: { kode: string | number } | [kode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const jenjangJabatan = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update603324),
    destroy: Object.assign(destroy, destroy),
}

export default jenjangJabatan