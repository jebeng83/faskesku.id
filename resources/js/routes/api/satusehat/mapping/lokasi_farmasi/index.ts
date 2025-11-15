import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1293
* @route '/api/satusehat/mapping/lokasi-farmasi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/mapping/lokasi-farmasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1293
* @route '/api/satusehat/mapping/lokasi-farmasi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1293
* @route '/api/satusehat/mapping/lokasi-farmasi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::index
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1293
* @route '/api/satusehat/mapping/lokasi-farmasi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::store
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1328
* @route '/api/satusehat/mapping/lokasi-farmasi'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/satusehat/mapping/lokasi-farmasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::store
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1328
* @route '/api/satusehat/mapping/lokasi-farmasi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::store
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1328
* @route '/api/satusehat/mapping/lokasi-farmasi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::update
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1462
* @route '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}'
*/
export const update = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::update
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1462
* @route '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}'
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
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::update
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1462
* @route '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}'
*/
update.put = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::destroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1534
* @route '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}'
*/
export const destroy = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::destroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1534
* @route '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}'
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
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::destroy
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1534
* @route '/api/satusehat/mapping/lokasi-farmasi/{kd_bangsal}'
*/
destroy.delete = (args: { kd_bangsal: string | number } | [kd_bangsal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const lokasi_farmasi = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default lokasi_farmasi