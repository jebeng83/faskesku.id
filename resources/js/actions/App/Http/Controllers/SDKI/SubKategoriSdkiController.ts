import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SDKI\SubKategoriSdkiController::index
* @see app/Http/Controllers/SDKI/SubKategoriSdkiController.php:39
* @route '/api/subkategori-sdki'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/subkategori-sdki',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SDKI\SubKategoriSdkiController::index
* @see app/Http/Controllers/SDKI/SubKategoriSdkiController.php:39
* @route '/api/subkategori-sdki'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SDKI\SubKategoriSdkiController::index
* @see app/Http/Controllers/SDKI/SubKategoriSdkiController.php:39
* @route '/api/subkategori-sdki'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SDKI\SubKategoriSdkiController::index
* @see app/Http/Controllers/SDKI/SubKategoriSdkiController.php:39
* @route '/api/subkategori-sdki'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SDKI\SubKategoriSdkiController::store
* @see app/Http/Controllers/SDKI/SubKategoriSdkiController.php:194
* @route '/api/subkategori-sdki'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/subkategori-sdki',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SDKI\SubKategoriSdkiController::store
* @see app/Http/Controllers/SDKI/SubKategoriSdkiController.php:194
* @route '/api/subkategori-sdki'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SDKI\SubKategoriSdkiController::store
* @see app/Http/Controllers/SDKI/SubKategoriSdkiController.php:194
* @route '/api/subkategori-sdki'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SDKI\SubKategoriSdkiController::update
* @see app/Http/Controllers/SDKI/SubKategoriSdkiController.php:315
* @route '/api/subkategori-sdki/{idOrKey}'
*/
export const update = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/subkategori-sdki/{idOrKey}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SDKI\SubKategoriSdkiController::update
* @see app/Http/Controllers/SDKI/SubKategoriSdkiController.php:315
* @route '/api/subkategori-sdki/{idOrKey}'
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
* @see \App\Http\Controllers\SDKI\SubKategoriSdkiController::update
* @see app/Http/Controllers/SDKI/SubKategoriSdkiController.php:315
* @route '/api/subkategori-sdki/{idOrKey}'
*/
update.put = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SDKI\SubKategoriSdkiController::destroy
* @see app/Http/Controllers/SDKI/SubKategoriSdkiController.php:412
* @route '/api/subkategori-sdki/{idOrKey}'
*/
export const destroy = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/subkategori-sdki/{idOrKey}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SDKI\SubKategoriSdkiController::destroy
* @see app/Http/Controllers/SDKI/SubKategoriSdkiController.php:412
* @route '/api/subkategori-sdki/{idOrKey}'
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
* @see \App\Http\Controllers\SDKI\SubKategoriSdkiController::destroy
* @see app/Http/Controllers/SDKI/SubKategoriSdkiController.php:412
* @route '/api/subkategori-sdki/{idOrKey}'
*/
destroy.delete = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const SubKategoriSdkiController = { index, store, update, destroy }

export default SubKategoriSdkiController