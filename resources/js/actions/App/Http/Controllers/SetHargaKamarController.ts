import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SetHargaKamarController::apiIndex
* @see app/Http/Controllers/SetHargaKamarController.php:10
* @route '/api/set-harga-kamar'
*/
export const apiIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiIndex.url(options),
    method: 'get',
})

apiIndex.definition = {
    methods: ["get","head"],
    url: '/api/set-harga-kamar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SetHargaKamarController::apiIndex
* @see app/Http/Controllers/SetHargaKamarController.php:10
* @route '/api/set-harga-kamar'
*/
apiIndex.url = (options?: RouteQueryOptions) => {
    return apiIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetHargaKamarController::apiIndex
* @see app/Http/Controllers/SetHargaKamarController.php:10
* @route '/api/set-harga-kamar'
*/
apiIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SetHargaKamarController::apiIndex
* @see app/Http/Controllers/SetHargaKamarController.php:10
* @route '/api/set-harga-kamar'
*/
apiIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: apiIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SetHargaKamarController::apiStore
* @see app/Http/Controllers/SetHargaKamarController.php:72
* @route '/api/set-harga-kamar'
*/
export const apiStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apiStore.url(options),
    method: 'post',
})

apiStore.definition = {
    methods: ["post"],
    url: '/api/set-harga-kamar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SetHargaKamarController::apiStore
* @see app/Http/Controllers/SetHargaKamarController.php:72
* @route '/api/set-harga-kamar'
*/
apiStore.url = (options?: RouteQueryOptions) => {
    return apiStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetHargaKamarController::apiStore
* @see app/Http/Controllers/SetHargaKamarController.php:72
* @route '/api/set-harga-kamar'
*/
apiStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apiStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SetHargaKamarController::apiUpdate
* @see app/Http/Controllers/SetHargaKamarController.php:96
* @route '/api/set-harga-kamar/{kd_kamar}/{kd_pj}'
*/
export const apiUpdate = (args: { kd_kamar: string | number, kd_pj: string | number } | [kd_kamar: string | number, kd_pj: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: apiUpdate.url(args, options),
    method: 'put',
})

apiUpdate.definition = {
    methods: ["put"],
    url: '/api/set-harga-kamar/{kd_kamar}/{kd_pj}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SetHargaKamarController::apiUpdate
* @see app/Http/Controllers/SetHargaKamarController.php:96
* @route '/api/set-harga-kamar/{kd_kamar}/{kd_pj}'
*/
apiUpdate.url = (args: { kd_kamar: string | number, kd_pj: string | number } | [kd_kamar: string | number, kd_pj: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            kd_kamar: args[0],
            kd_pj: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_kamar: args.kd_kamar,
        kd_pj: args.kd_pj,
    }

    return apiUpdate.definition.url
            .replace('{kd_kamar}', parsedArgs.kd_kamar.toString())
            .replace('{kd_pj}', parsedArgs.kd_pj.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetHargaKamarController::apiUpdate
* @see app/Http/Controllers/SetHargaKamarController.php:96
* @route '/api/set-harga-kamar/{kd_kamar}/{kd_pj}'
*/
apiUpdate.put = (args: { kd_kamar: string | number, kd_pj: string | number } | [kd_kamar: string | number, kd_pj: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: apiUpdate.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SetHargaKamarController::apiDestroy
* @see app/Http/Controllers/SetHargaKamarController.php:121
* @route '/api/set-harga-kamar/{kd_kamar}/{kd_pj}'
*/
export const apiDestroy = (args: { kd_kamar: string | number, kd_pj: string | number } | [kd_kamar: string | number, kd_pj: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: apiDestroy.url(args, options),
    method: 'delete',
})

apiDestroy.definition = {
    methods: ["delete"],
    url: '/api/set-harga-kamar/{kd_kamar}/{kd_pj}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SetHargaKamarController::apiDestroy
* @see app/Http/Controllers/SetHargaKamarController.php:121
* @route '/api/set-harga-kamar/{kd_kamar}/{kd_pj}'
*/
apiDestroy.url = (args: { kd_kamar: string | number, kd_pj: string | number } | [kd_kamar: string | number, kd_pj: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            kd_kamar: args[0],
            kd_pj: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kd_kamar: args.kd_kamar,
        kd_pj: args.kd_pj,
    }

    return apiDestroy.definition.url
            .replace('{kd_kamar}', parsedArgs.kd_kamar.toString())
            .replace('{kd_pj}', parsedArgs.kd_pj.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetHargaKamarController::apiDestroy
* @see app/Http/Controllers/SetHargaKamarController.php:121
* @route '/api/set-harga-kamar/{kd_kamar}/{kd_pj}'
*/
apiDestroy.delete = (args: { kd_kamar: string | number, kd_pj: string | number } | [kd_kamar: string | number, kd_pj: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: apiDestroy.url(args, options),
    method: 'delete',
})

const SetHargaKamarController = { apiIndex, apiStore, apiUpdate, apiDestroy }

export default SetHargaKamarController