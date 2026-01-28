import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SDKI\KategoriSdkiController::index
* @see app/Http/Controllers/SDKI/KategoriSdkiController.php:37
* @route '/api/kategori-sdki'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/kategori-sdki',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SDKI\KategoriSdkiController::index
* @see app/Http/Controllers/SDKI/KategoriSdkiController.php:37
* @route '/api/kategori-sdki'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SDKI\KategoriSdkiController::index
* @see app/Http/Controllers/SDKI/KategoriSdkiController.php:37
* @route '/api/kategori-sdki'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SDKI\KategoriSdkiController::index
* @see app/Http/Controllers/SDKI/KategoriSdkiController.php:37
* @route '/api/kategori-sdki'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SDKI\KategoriSdkiController::store
* @see app/Http/Controllers/SDKI/KategoriSdkiController.php:80
* @route '/api/kategori-sdki'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/kategori-sdki',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SDKI\KategoriSdkiController::store
* @see app/Http/Controllers/SDKI/KategoriSdkiController.php:80
* @route '/api/kategori-sdki'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SDKI\KategoriSdkiController::store
* @see app/Http/Controllers/SDKI/KategoriSdkiController.php:80
* @route '/api/kategori-sdki'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SDKI\KategoriSdkiController::update
* @see app/Http/Controllers/SDKI/KategoriSdkiController.php:209
* @route '/api/kategori-sdki/{idOrKey}'
*/
export const update = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/kategori-sdki/{idOrKey}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SDKI\KategoriSdkiController::update
* @see app/Http/Controllers/SDKI/KategoriSdkiController.php:209
* @route '/api/kategori-sdki/{idOrKey}'
*/
update.url = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { idOrKey: args }
    }

    if (Array.isArray(args)) {
        args = {
            idOrKey: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        idOrKey: args.idOrKey,
    }

    return update.definition.url
            .replace('{idOrKey}', parsedArgs.idOrKey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SDKI\KategoriSdkiController::update
* @see app/Http/Controllers/SDKI/KategoriSdkiController.php:209
* @route '/api/kategori-sdki/{idOrKey}'
*/
update.put = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SDKI\KategoriSdkiController::destroy
* @see app/Http/Controllers/SDKI/KategoriSdkiController.php:320
* @route '/api/kategori-sdki/{idOrKey}'
*/
export const destroy = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/kategori-sdki/{idOrKey}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SDKI\KategoriSdkiController::destroy
* @see app/Http/Controllers/SDKI/KategoriSdkiController.php:320
* @route '/api/kategori-sdki/{idOrKey}'
*/
destroy.url = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { idOrKey: args }
    }

    if (Array.isArray(args)) {
        args = {
            idOrKey: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        idOrKey: args.idOrKey,
    }

    return destroy.definition.url
            .replace('{idOrKey}', parsedArgs.idOrKey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SDKI\KategoriSdkiController::destroy
* @see app/Http/Controllers/SDKI/KategoriSdkiController.php:320
* @route '/api/kategori-sdki/{idOrKey}'
*/
destroy.delete = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const KategoriSdkiController = { index, store, update, destroy }

export default KategoriSdkiController