import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:373
 * @route '/api/satusehat/mapping/departemen'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/mapping/departemen',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:373
 * @route '/api/satusehat/mapping/departemen'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:373
 * @route '/api/satusehat/mapping/departemen'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:373
 * @route '/api/satusehat/mapping/departemen'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::store
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:403
 * @route '/api/satusehat/mapping/departemen'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/satusehat/mapping/departemen',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::store
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:403
 * @route '/api/satusehat/mapping/departemen'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::store
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:403
 * @route '/api/satusehat/mapping/departemen'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::update
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:500
 * @route '/api/satusehat/mapping/departemen/{dep_id}'
 */
export const update = (args: { dep_id: string | number } | [dep_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/satusehat/mapping/departemen/{dep_id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::update
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:500
 * @route '/api/satusehat/mapping/departemen/{dep_id}'
 */
update.url = (args: { dep_id: string | number } | [dep_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dep_id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    dep_id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        dep_id: args.dep_id,
                }

    return update.definition.url
            .replace('{dep_id}', parsedArgs.dep_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::update
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:500
 * @route '/api/satusehat/mapping/departemen/{dep_id}'
 */
update.put = (args: { dep_id: string | number } | [dep_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::destroy
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:529
 * @route '/api/satusehat/mapping/departemen/{dep_id}'
 */
export const destroy = (args: { dep_id: string | number } | [dep_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/satusehat/mapping/departemen/{dep_id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::destroy
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:529
 * @route '/api/satusehat/mapping/departemen/{dep_id}'
 */
destroy.url = (args: { dep_id: string | number } | [dep_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dep_id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    dep_id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        dep_id: args.dep_id,
                }

    return destroy.definition.url
            .replace('{dep_id}', parsedArgs.dep_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::destroy
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:529
 * @route '/api/satusehat/mapping/departemen/{dep_id}'
 */
destroy.delete = (args: { dep_id: string | number } | [dep_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const departemen = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default departemen