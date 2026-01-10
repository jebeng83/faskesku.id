import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Alergi\AlergiController::index
* @see app/Http/Controllers/Alergi/AlergiController.php:97
* @route '/api/alergi/jenis'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/alergi/jenis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Alergi\AlergiController::index
* @see app/Http/Controllers/Alergi/AlergiController.php:97
* @route '/api/alergi/jenis'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Alergi\AlergiController::index
* @see app/Http/Controllers/Alergi/AlergiController.php:97
* @route '/api/alergi/jenis'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Alergi\AlergiController::index
* @see app/Http/Controllers/Alergi/AlergiController.php:97
* @route '/api/alergi/jenis'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Alergi\AlergiController::store
* @see app/Http/Controllers/Alergi/AlergiController.php:118
* @route '/api/alergi/jenis'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/alergi/jenis',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Alergi\AlergiController::store
* @see app/Http/Controllers/Alergi/AlergiController.php:118
* @route '/api/alergi/jenis'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Alergi\AlergiController::store
* @see app/Http/Controllers/Alergi/AlergiController.php:118
* @route '/api/alergi/jenis'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Alergi\AlergiController::update
* @see app/Http/Controllers/Alergi/AlergiController.php:130
* @route '/api/alergi/jenis/{kode_jenis}'
*/
export const update = (args: { kode_jenis: string | number } | [kode_jenis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/alergi/jenis/{kode_jenis}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Alergi\AlergiController::update
* @see app/Http/Controllers/Alergi/AlergiController.php:130
* @route '/api/alergi/jenis/{kode_jenis}'
*/
update.url = (args: { kode_jenis: string | number } | [kode_jenis: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_jenis: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_jenis: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_jenis: args.kode_jenis,
    }

    return update.definition.url
            .replace('{kode_jenis}', parsedArgs.kode_jenis.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Alergi\AlergiController::update
* @see app/Http/Controllers/Alergi/AlergiController.php:130
* @route '/api/alergi/jenis/{kode_jenis}'
*/
update.put = (args: { kode_jenis: string | number } | [kode_jenis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Alergi\AlergiController::destroy
* @see app/Http/Controllers/Alergi/AlergiController.php:148
* @route '/api/alergi/jenis/{kode_jenis}'
*/
export const destroy = (args: { kode_jenis: string | number } | [kode_jenis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/alergi/jenis/{kode_jenis}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Alergi\AlergiController::destroy
* @see app/Http/Controllers/Alergi/AlergiController.php:148
* @route '/api/alergi/jenis/{kode_jenis}'
*/
destroy.url = (args: { kode_jenis: string | number } | [kode_jenis: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_jenis: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_jenis: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_jenis: args.kode_jenis,
    }

    return destroy.definition.url
            .replace('{kode_jenis}', parsedArgs.kode_jenis.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Alergi\AlergiController::destroy
* @see app/Http/Controllers/Alergi/AlergiController.php:148
* @route '/api/alergi/jenis/{kode_jenis}'
*/
destroy.delete = (args: { kode_jenis: string | number } | [kode_jenis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const jenis = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default jenis