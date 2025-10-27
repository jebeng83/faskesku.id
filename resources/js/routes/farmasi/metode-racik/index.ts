import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::index
 * @see app/Http/Controllers/Farmasi/MetodeRacikController.php:12
 * @route '/farmasi/metode-racik'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/metode-racik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::index
 * @see app/Http/Controllers/Farmasi/MetodeRacikController.php:12
 * @route '/farmasi/metode-racik'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::index
 * @see app/Http/Controllers/Farmasi/MetodeRacikController.php:12
 * @route '/farmasi/metode-racik'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::index
 * @see app/Http/Controllers/Farmasi/MetodeRacikController.php:12
 * @route '/farmasi/metode-racik'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::store
 * @see app/Http/Controllers/Farmasi/MetodeRacikController.php:40
 * @route '/farmasi/metode-racik'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/metode-racik',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::store
 * @see app/Http/Controllers/Farmasi/MetodeRacikController.php:40
 * @route '/farmasi/metode-racik'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::store
 * @see app/Http/Controllers/Farmasi/MetodeRacikController.php:40
 * @route '/farmasi/metode-racik'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::update
 * @see app/Http/Controllers/Farmasi/MetodeRacikController.php:64
 * @route '/farmasi/metode-racik/{kd_racik}'
 */
export const update = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/farmasi/metode-racik/{kd_racik}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::update
 * @see app/Http/Controllers/Farmasi/MetodeRacikController.php:64
 * @route '/farmasi/metode-racik/{kd_racik}'
 */
update.url = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_racik: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    kd_racik: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kd_racik: args.kd_racik,
                }

    return update.definition.url
            .replace('{kd_racik}', parsedArgs.kd_racik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::update
 * @see app/Http/Controllers/Farmasi/MetodeRacikController.php:64
 * @route '/farmasi/metode-racik/{kd_racik}'
 */
update.put = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::destroy
 * @see app/Http/Controllers/Farmasi/MetodeRacikController.php:83
 * @route '/farmasi/metode-racik/{kd_racik}'
 */
export const destroy = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/farmasi/metode-racik/{kd_racik}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::destroy
 * @see app/Http/Controllers/Farmasi/MetodeRacikController.php:83
 * @route '/farmasi/metode-racik/{kd_racik}'
 */
destroy.url = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kd_racik: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    kd_racik: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kd_racik: args.kd_racik,
                }

    return destroy.definition.url
            .replace('{kd_racik}', parsedArgs.kd_racik.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\MetodeRacikController::destroy
 * @see app/Http/Controllers/Farmasi/MetodeRacikController.php:83
 * @route '/farmasi/metode-racik/{kd_racik}'
 */
destroy.delete = (args: { kd_racik: string | number } | [kd_racik: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const metodeRacik = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default metodeRacik