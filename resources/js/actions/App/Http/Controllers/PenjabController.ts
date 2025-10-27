import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PenjabController::index
 * @see app/Http/Controllers/PenjabController.php:12
 * @route '/penjab'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/penjab',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PenjabController::index
 * @see app/Http/Controllers/PenjabController.php:12
 * @route '/penjab'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PenjabController::index
 * @see app/Http/Controllers/PenjabController.php:12
 * @route '/penjab'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PenjabController::index
 * @see app/Http/Controllers/PenjabController.php:12
 * @route '/penjab'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PenjabController::store
 * @see app/Http/Controllers/PenjabController.php:33
 * @route '/penjab'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/penjab',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PenjabController::store
 * @see app/Http/Controllers/PenjabController.php:33
 * @route '/penjab'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PenjabController::store
 * @see app/Http/Controllers/PenjabController.php:33
 * @route '/penjab'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PenjabController::update
 * @see app/Http/Controllers/PenjabController.php:61
 * @route '/penjab/{kd_pj}'
 */
export const update = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/penjab/{kd_pj}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PenjabController::update
 * @see app/Http/Controllers/PenjabController.php:61
 * @route '/penjab/{kd_pj}'
 */
update.url = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_pj: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    kd_pj: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kd_pj: args.kd_pj,
                }

    return update.definition.url
            .replace('{kd_pj}', parsedArgs.kd_pj.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PenjabController::update
 * @see app/Http/Controllers/PenjabController.php:61
 * @route '/penjab/{kd_pj}'
 */
update.put = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PenjabController::toggleStatus
 * @see app/Http/Controllers/PenjabController.php:78
 * @route '/penjab/{kd_pj}/toggle-status'
 */
export const toggleStatus = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

toggleStatus.definition = {
    methods: ["patch"],
    url: '/penjab/{kd_pj}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PenjabController::toggleStatus
 * @see app/Http/Controllers/PenjabController.php:78
 * @route '/penjab/{kd_pj}/toggle-status'
 */
toggleStatus.url = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_pj: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    kd_pj: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kd_pj: args.kd_pj,
                }

    return toggleStatus.definition.url
            .replace('{kd_pj}', parsedArgs.kd_pj.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PenjabController::toggleStatus
 * @see app/Http/Controllers/PenjabController.php:78
 * @route '/penjab/{kd_pj}/toggle-status'
 */
toggleStatus.patch = (args: { kd_pj: string | number } | [kd_pj: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})
const PenjabController = { index, store, update, toggleStatus }

export default PenjabController