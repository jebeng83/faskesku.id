import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1025
* @route '/api/satusehat/mapping/lokasi-ranap'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/mapping/lokasi-ranap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1025
* @route '/api/satusehat/mapping/lokasi-ranap'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1025
* @route '/api/satusehat/mapping/lokasi-ranap'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1025
* @route '/api/satusehat/mapping/lokasi-ranap'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::store
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1053
* @route '/api/satusehat/mapping/lokasi-ranap'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/satusehat/mapping/lokasi-ranap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::store
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1053
* @route '/api/satusehat/mapping/lokasi-ranap'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::store
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1053
* @route '/api/satusehat/mapping/lokasi-ranap'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::update
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1209
* @route '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}'
*/
export const update = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::update
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1209
* @route '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}'
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
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::update
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1209
* @route '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}'
*/
update.put = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::destroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1285
* @route '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}'
*/
export const destroy = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::destroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1285
* @route '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}'
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
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::destroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1285
* @route '/api/satusehat/mapping/lokasi-ranap/{kd_kamar}'
*/
destroy.delete = (args: { kd_kamar: string | number } | [kd_kamar: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const lokasi_ranap = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default lokasi_ranap