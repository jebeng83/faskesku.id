import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SetHargaKamarController::index
* @see app/Http/Controllers/SetHargaKamarController.php:10
* @route '/api/set-harga-kamar'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/set-harga-kamar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SetHargaKamarController::index
* @see app/Http/Controllers/SetHargaKamarController.php:10
* @route '/api/set-harga-kamar'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetHargaKamarController::index
* @see app/Http/Controllers/SetHargaKamarController.php:10
* @route '/api/set-harga-kamar'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SetHargaKamarController::index
* @see app/Http/Controllers/SetHargaKamarController.php:10
* @route '/api/set-harga-kamar'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SetHargaKamarController::store
* @see app/Http/Controllers/SetHargaKamarController.php:72
* @route '/api/set-harga-kamar'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/set-harga-kamar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SetHargaKamarController::store
* @see app/Http/Controllers/SetHargaKamarController.php:72
* @route '/api/set-harga-kamar'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetHargaKamarController::store
* @see app/Http/Controllers/SetHargaKamarController.php:72
* @route '/api/set-harga-kamar'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SetHargaKamarController::update
* @see app/Http/Controllers/SetHargaKamarController.php:96
* @route '/api/set-harga-kamar/{kd_kamar}/{kd_pj}'
*/
export const update = (args: { kd_kamar: string | number, kd_pj: string | number } | [kd_kamar: string | number, kd_pj: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/set-harga-kamar/{kd_kamar}/{kd_pj}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SetHargaKamarController::update
* @see app/Http/Controllers/SetHargaKamarController.php:96
* @route '/api/set-harga-kamar/{kd_kamar}/{kd_pj}'
*/
update.url = (args: { kd_kamar: string | number, kd_pj: string | number } | [kd_kamar: string | number, kd_pj: string | number ], options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{kd_kamar}', parsedArgs.kd_kamar.toString())
            .replace('{kd_pj}', parsedArgs.kd_pj.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetHargaKamarController::update
* @see app/Http/Controllers/SetHargaKamarController.php:96
* @route '/api/set-harga-kamar/{kd_kamar}/{kd_pj}'
*/
update.put = (args: { kd_kamar: string | number, kd_pj: string | number } | [kd_kamar: string | number, kd_pj: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SetHargaKamarController::destroy
* @see app/Http/Controllers/SetHargaKamarController.php:121
* @route '/api/set-harga-kamar/{kd_kamar}/{kd_pj}'
*/
export const destroy = (args: { kd_kamar: string | number, kd_pj: string | number } | [kd_kamar: string | number, kd_pj: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/set-harga-kamar/{kd_kamar}/{kd_pj}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SetHargaKamarController::destroy
* @see app/Http/Controllers/SetHargaKamarController.php:121
* @route '/api/set-harga-kamar/{kd_kamar}/{kd_pj}'
*/
destroy.url = (args: { kd_kamar: string | number, kd_pj: string | number } | [kd_kamar: string | number, kd_pj: string | number ], options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{kd_kamar}', parsedArgs.kd_kamar.toString())
            .replace('{kd_pj}', parsedArgs.kd_pj.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SetHargaKamarController::destroy
* @see app/Http/Controllers/SetHargaKamarController.php:121
* @route '/api/set-harga-kamar/{kd_kamar}/{kd_pj}'
*/
destroy.delete = (args: { kd_kamar: string | number, kd_pj: string | number } | [kd_kamar: string | number, kd_pj: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const setHargaKamar = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default setHargaKamar