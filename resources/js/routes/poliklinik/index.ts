import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PoliklinikController::index
* @see app/Http/Controllers/PoliklinikController.php:12
* @route '/poliklinik'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/poliklinik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PoliklinikController::index
* @see app/Http/Controllers/PoliklinikController.php:12
* @route '/poliklinik'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PoliklinikController::index
* @see app/Http/Controllers/PoliklinikController.php:12
* @route '/poliklinik'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PoliklinikController::index
* @see app/Http/Controllers/PoliklinikController.php:12
* @route '/poliklinik'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PoliklinikController::store
* @see app/Http/Controllers/PoliklinikController.php:32
* @route '/poliklinik'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/poliklinik',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PoliklinikController::store
* @see app/Http/Controllers/PoliklinikController.php:32
* @route '/poliklinik'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PoliklinikController::store
* @see app/Http/Controllers/PoliklinikController.php:32
* @route '/poliklinik'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PoliklinikController::update
* @see app/Http/Controllers/PoliklinikController.php:58
* @route '/poliklinik/{kd_poli}'
*/
export const update = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/poliklinik/{kd_poli}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PoliklinikController::update
* @see app/Http/Controllers/PoliklinikController.php:58
* @route '/poliklinik/{kd_poli}'
*/
update.url = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_poli: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_poli: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_poli: args.kd_poli,
    }

    return update.definition.url
            .replace('{kd_poli}', parsedArgs.kd_poli.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PoliklinikController::update
* @see app/Http/Controllers/PoliklinikController.php:58
* @route '/poliklinik/{kd_poli}'
*/
update.put = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PoliklinikController::toggleStatus
* @see app/Http/Controllers/PoliklinikController.php:82
* @route '/poliklinik/{kd_poli}/toggle-status'
*/
export const toggleStatus = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

toggleStatus.definition = {
    methods: ["patch"],
    url: '/poliklinik/{kd_poli}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PoliklinikController::toggleStatus
* @see app/Http/Controllers/PoliklinikController.php:82
* @route '/poliklinik/{kd_poli}/toggle-status'
*/
toggleStatus.url = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_poli: args }
    }

    if (Array.isArray(args)) {
        args = {
            kd_poli: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_poli: args.kd_poli,
    }

    return toggleStatus.definition.url
            .replace('{kd_poli}', parsedArgs.kd_poli.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PoliklinikController::toggleStatus
* @see app/Http/Controllers/PoliklinikController.php:82
* @route '/poliklinik/{kd_poli}/toggle-status'
*/
toggleStatus.patch = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

const poliklinik = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    toggleStatus: Object.assign(toggleStatus, toggleStatus),
}

export default poliklinik