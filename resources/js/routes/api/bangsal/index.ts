import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\BangsalController::index
* @see app/Http/Controllers/BangsalController.php:11
* @route '/api/bangsal'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/bangsal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BangsalController::index
* @see app/Http/Controllers/BangsalController.php:11
* @route '/api/bangsal'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BangsalController::index
* @see app/Http/Controllers/BangsalController.php:11
* @route '/api/bangsal'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BangsalController::index
* @see app/Http/Controllers/BangsalController.php:11
* @route '/api/bangsal'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BangsalController::store
* @see app/Http/Controllers/BangsalController.php:41
* @route '/api/bangsal'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/bangsal',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BangsalController::store
* @see app/Http/Controllers/BangsalController.php:41
* @route '/api/bangsal'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BangsalController::store
* @see app/Http/Controllers/BangsalController.php:41
* @route '/api/bangsal'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BangsalController::update
* @see app/Http/Controllers/BangsalController.php:60
* @route '/api/bangsal/{kd_bangsal}'
*/
export const update = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/bangsal/{kd_bangsal}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\BangsalController::update
* @see app/Http/Controllers/BangsalController.php:60
* @route '/api/bangsal/{kd_bangsal}'
*/
update.url = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_bangsal: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_bangsal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_bangsal: args.kd_bangsal,
    }

    return update.definition.url
            .replace('{kd_bangsal}', parsedArgs.kd_bangsal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BangsalController::update
* @see app/Http/Controllers/BangsalController.php:60
* @route '/api/bangsal/{kd_bangsal}'
*/
update.put = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\BangsalController::destroy
* @see app/Http/Controllers/BangsalController.php:77
* @route '/api/bangsal/{kd_bangsal}'
*/
export const destroy = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/bangsal/{kd_bangsal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\BangsalController::destroy
* @see app/Http/Controllers/BangsalController.php:77
* @route '/api/bangsal/{kd_bangsal}'
*/
destroy.url = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_bangsal: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_bangsal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_bangsal: args.kd_bangsal,
    }

    return destroy.definition.url
            .replace('{kd_bangsal}', parsedArgs.kd_bangsal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BangsalController::destroy
* @see app/Http/Controllers/BangsalController.php:77
* @route '/api/bangsal/{kd_bangsal}'
*/
destroy.delete = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const bangsal = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default bangsal