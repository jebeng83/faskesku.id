import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::index
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:13
* @route '/farmasi/datasuplier'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/datasuplier',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::index
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:13
* @route '/farmasi/datasuplier'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::index
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:13
* @route '/farmasi/datasuplier'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::index
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:13
* @route '/farmasi/datasuplier'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::store
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:70
* @route '/farmasi/datasuplier'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/datasuplier',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::store
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:70
* @route '/farmasi/datasuplier'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::store
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:70
* @route '/farmasi/datasuplier'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::update
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
export const update = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/farmasi/datasuplier/{kode_suplier}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::update
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
update.url = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_suplier: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_suplier: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_suplier: args.kode_suplier,
    }

    return update.definition.url
            .replace('{kode_suplier}', parsedArgs.kode_suplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::update
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
update.put = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::destroy
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:109
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
export const destroy = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/farmasi/datasuplier/{kode_suplier}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::destroy
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:109
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
destroy.url = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_suplier: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_suplier: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_suplier: args.kode_suplier,
    }

    return destroy.definition.url
            .replace('{kode_suplier}', parsedArgs.kode_suplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::destroy
* @see app/Http/Controllers/Farmasi/DataSuplierController.php:109
* @route '/farmasi/datasuplier/{kode_suplier}'
*/
destroy.delete = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const datasuplier = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default datasuplier