import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
const updated22f7ba58b61e66ef31c7cf8949079ce = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updated22f7ba58b61e66ef31c7cf8949079ce.url(args, options),
    method: 'put',
})

updated22f7ba58b61e66ef31c7cf8949079ce.definition = {
    methods: ["put"],
    url: '/farmasi/datasuplier/{kode_suplier}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::update
 * @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
 * @route '/farmasi/datasuplier/{kode_suplier}'
 */
updated22f7ba58b61e66ef31c7cf8949079ce.url = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updated22f7ba58b61e66ef31c7cf8949079ce.definition.url
            .replace('{kode_suplier}', parsedArgs.kode_suplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::update
 * @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
 * @route '/farmasi/datasuplier/{kode_suplier}'
 */
updated22f7ba58b61e66ef31c7cf8949079ce.put = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updated22f7ba58b61e66ef31c7cf8949079ce.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::update
 * @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
 * @route '/farmasi/datasuplier/{kode_suplier}'
 */
const updated22f7ba58b61e66ef31c7cf8949079ce = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updated22f7ba58b61e66ef31c7cf8949079ce.url(args, options),
    method: 'patch',
})

updated22f7ba58b61e66ef31c7cf8949079ce.definition = {
    methods: ["patch"],
    url: '/farmasi/datasuplier/{kode_suplier}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::update
 * @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
 * @route '/farmasi/datasuplier/{kode_suplier}'
 */
updated22f7ba58b61e66ef31c7cf8949079ce.url = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updated22f7ba58b61e66ef31c7cf8949079ce.definition.url
            .replace('{kode_suplier}', parsedArgs.kode_suplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DataSuplierController::update
 * @see app/Http/Controllers/Farmasi/DataSuplierController.php:87
 * @route '/farmasi/datasuplier/{kode_suplier}'
 */
updated22f7ba58b61e66ef31c7cf8949079ce.patch = (args: { kode_suplier: string | number } | [kode_suplier: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updated22f7ba58b61e66ef31c7cf8949079ce.url(args, options),
    method: 'patch',
})

export const update = {
    '/farmasi/datasuplier/{kode_suplier}': updated22f7ba58b61e66ef31c7cf8949079ce,
    '/farmasi/datasuplier/{kode_suplier}': updated22f7ba58b61e66ef31c7cf8949079ce,
}

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
const DataSuplierController = { index, store, update, destroy }

export default DataSuplierController