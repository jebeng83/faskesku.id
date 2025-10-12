import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::index
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:15
 * @route '/farmasi/jenis-obat'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/jenis-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::index
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:15
 * @route '/farmasi/jenis-obat'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::index
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:15
 * @route '/farmasi/jenis-obat'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::index
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:15
 * @route '/farmasi/jenis-obat'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::store
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:71
 * @route '/farmasi/jenis-obat'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/jenis-obat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::store
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:71
 * @route '/farmasi/jenis-obat'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::store
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:71
 * @route '/farmasi/jenis-obat'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::update
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:88
 * @route '/farmasi/jenis-obat/{kdjns}'
 */
const update0e2f233880d484f2f7c0d00d360fea3d = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update0e2f233880d484f2f7c0d00d360fea3d.url(args, options),
    method: 'put',
})

update0e2f233880d484f2f7c0d00d360fea3d.definition = {
    methods: ["put"],
    url: '/farmasi/jenis-obat/{kdjns}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::update
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:88
 * @route '/farmasi/jenis-obat/{kdjns}'
 */
update0e2f233880d484f2f7c0d00d360fea3d.url = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kdjns: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    kdjns: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kdjns: args.kdjns,
                }

    return update0e2f233880d484f2f7c0d00d360fea3d.definition.url
            .replace('{kdjns}', parsedArgs.kdjns.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::update
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:88
 * @route '/farmasi/jenis-obat/{kdjns}'
 */
update0e2f233880d484f2f7c0d00d360fea3d.put = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update0e2f233880d484f2f7c0d00d360fea3d.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Farmasi\JenisObatController::update
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:88
 * @route '/farmasi/jenis-obat/{kdjns}'
 */
const update0e2f233880d484f2f7c0d00d360fea3d = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update0e2f233880d484f2f7c0d00d360fea3d.url(args, options),
    method: 'patch',
})

update0e2f233880d484f2f7c0d00d360fea3d.definition = {
    methods: ["patch"],
    url: '/farmasi/jenis-obat/{kdjns}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::update
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:88
 * @route '/farmasi/jenis-obat/{kdjns}'
 */
update0e2f233880d484f2f7c0d00d360fea3d.url = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kdjns: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    kdjns: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kdjns: args.kdjns,
                }

    return update0e2f233880d484f2f7c0d00d360fea3d.definition.url
            .replace('{kdjns}', parsedArgs.kdjns.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::update
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:88
 * @route '/farmasi/jenis-obat/{kdjns}'
 */
update0e2f233880d484f2f7c0d00d360fea3d.patch = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update0e2f233880d484f2f7c0d00d360fea3d.url(args, options),
    method: 'patch',
})

export const update = {
    '/farmasi/jenis-obat/{kdjns}': update0e2f233880d484f2f7c0d00d360fea3d,
    '/farmasi/jenis-obat/{kdjns}': update0e2f233880d484f2f7c0d00d360fea3d,
}

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::destroy
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:110
 * @route '/farmasi/jenis-obat/{kdjns}'
 */
export const destroy = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/farmasi/jenis-obat/{kdjns}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::destroy
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:110
 * @route '/farmasi/jenis-obat/{kdjns}'
 */
destroy.url = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kdjns: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    kdjns: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kdjns: args.kdjns,
                }

    return destroy.definition.url
            .replace('{kdjns}', parsedArgs.kdjns.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\JenisObatController::destroy
 * @see app/Http/Controllers/Farmasi/JenisObatController.php:110
 * @route '/farmasi/jenis-obat/{kdjns}'
 */
destroy.delete = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const JenisObatController = { index, store, update, destroy }

export default JenisObatController