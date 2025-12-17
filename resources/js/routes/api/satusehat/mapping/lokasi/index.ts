import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:689
 * @route '/api/satusehat/mapping/lokasi'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/mapping/lokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:689
 * @route '/api/satusehat/mapping/lokasi'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:689
 * @route '/api/satusehat/mapping/lokasi'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:689
 * @route '/api/satusehat/mapping/lokasi'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::store
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:717
 * @route '/api/satusehat/mapping/lokasi'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/satusehat/mapping/lokasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::store
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:717
 * @route '/api/satusehat/mapping/lokasi'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::store
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:717
 * @route '/api/satusehat/mapping/lokasi'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::update
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:936
 * @route '/api/satusehat/mapping/lokasi/{kd_poli}'
 */
export const update = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/satusehat/mapping/lokasi/{kd_poli}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::update
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:936
 * @route '/api/satusehat/mapping/lokasi/{kd_poli}'
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
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::update
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:936
 * @route '/api/satusehat/mapping/lokasi/{kd_poli}'
 */
update.put = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::destroy
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1024
 * @route '/api/satusehat/mapping/lokasi/{kd_poli}'
 */
export const destroy = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/satusehat/mapping/lokasi/{kd_poli}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::destroy
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1024
 * @route '/api/satusehat/mapping/lokasi/{kd_poli}'
 */
destroy.url = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{kd_poli}', parsedArgs.kd_poli.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::destroy
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1024
 * @route '/api/satusehat/mapping/lokasi/{kd_poli}'
 */
destroy.delete = (args: { kd_poli: string | number } | [kd_poli: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const lokasi = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default lokasi