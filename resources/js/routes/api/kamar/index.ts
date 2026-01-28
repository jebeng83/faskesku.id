import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\KamarController::index
* @see app/Http/Controllers/KamarController.php:258
* @route '/api/kamar'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/kamar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KamarController::index
* @see app/Http/Controllers/KamarController.php:258
* @route '/api/kamar'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarController::index
* @see app/Http/Controllers/KamarController.php:258
* @route '/api/kamar'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KamarController::index
* @see app/Http/Controllers/KamarController.php:258
* @route '/api/kamar'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KamarController::store
* @see app/Http/Controllers/KamarController.php:300
* @route '/api/kamar'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/kamar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KamarController::store
* @see app/Http/Controllers/KamarController.php:300
* @route '/api/kamar'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarController::store
* @see app/Http/Controllers/KamarController.php:300
* @route '/api/kamar'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KamarController::update
* @see app/Http/Controllers/KamarController.php:320
* @route '/api/kamar/{kd_kamar}'
*/
export const update = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/kamar/{kd_kamar}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\KamarController::update
* @see app/Http/Controllers/KamarController.php:320
* @route '/api/kamar/{kd_kamar}'
*/
update.url = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_kamar: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_kamar: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_kamar: args.kd_kamar,
    }

    return update.definition.url
            .replace('{kd_kamar}', parsedArgs.kd_kamar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarController::update
* @see app/Http/Controllers/KamarController.php:320
* @route '/api/kamar/{kd_kamar}'
*/
update.put = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\KamarController::destroy
* @see app/Http/Controllers/KamarController.php:341
* @route '/api/kamar/{kd_kamar}'
*/
export const destroy = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/kamar/{kd_kamar}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KamarController::destroy
* @see app/Http/Controllers/KamarController.php:341
* @route '/api/kamar/{kd_kamar}'
*/
destroy.url = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_kamar: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_kamar: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_kamar: args.kd_kamar,
    }

    return destroy.definition.url
            .replace('{kd_kamar}', parsedArgs.kd_kamar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarController::destroy
* @see app/Http/Controllers/KamarController.php:341
* @route '/api/kamar/{kd_kamar}'
*/
destroy.delete = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const kamar = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default kamar