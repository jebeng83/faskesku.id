import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SDKI\SdkiController::index
* @see app/Http/Controllers/SDKI/SdkiController.php:40
* @route '/api/sdki'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/sdki',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SDKI\SdkiController::index
* @see app/Http/Controllers/SDKI/SdkiController.php:40
* @route '/api/sdki'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SDKI\SdkiController::index
* @see app/Http/Controllers/SDKI/SdkiController.php:40
* @route '/api/sdki'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SDKI\SdkiController::index
* @see app/Http/Controllers/SDKI/SdkiController.php:40
* @route '/api/sdki'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SDKI\SdkiController::store
* @see app/Http/Controllers/SDKI/SdkiController.php:68
* @route '/api/sdki'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/sdki',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SDKI\SdkiController::store
* @see app/Http/Controllers/SDKI/SdkiController.php:68
* @route '/api/sdki'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SDKI\SdkiController::store
* @see app/Http/Controllers/SDKI/SdkiController.php:68
* @route '/api/sdki'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SDKI\SdkiController::update
* @see app/Http/Controllers/SDKI/SdkiController.php:113
* @route '/api/sdki/{idOrKode}'
*/
export const update = (args: { idOrKode: string | number } | [idOrKode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/sdki/{idOrKode}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SDKI\SdkiController::update
* @see app/Http/Controllers/SDKI/SdkiController.php:113
* @route '/api/sdki/{idOrKode}'
*/
update.url = (args: { idOrKode: string | number } | [idOrKode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { idOrKode: args }
    }

    if (Array.isArray(args)) {
        args = {
            idOrKode: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        idOrKode: args.idOrKode,
    }

    return update.definition.url
            .replace('{idOrKode}', parsedArgs.idOrKode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SDKI\SdkiController::update
* @see app/Http/Controllers/SDKI/SdkiController.php:113
* @route '/api/sdki/{idOrKode}'
*/
update.put = (args: { idOrKode: string | number } | [idOrKode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SDKI\SdkiController::destroy
* @see app/Http/Controllers/SDKI/SdkiController.php:149
* @route '/api/sdki/{idOrKode}'
*/
export const destroy = (args: { idOrKode: string | number } | [idOrKode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/sdki/{idOrKode}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SDKI\SdkiController::destroy
* @see app/Http/Controllers/SDKI/SdkiController.php:149
* @route '/api/sdki/{idOrKode}'
*/
destroy.url = (args: { idOrKode: string | number } | [idOrKode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { idOrKode: args }
    }

    if (Array.isArray(args)) {
        args = {
            idOrKode: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        idOrKode: args.idOrKode,
    }

    return destroy.definition.url
            .replace('{idOrKode}', parsedArgs.idOrKode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SDKI\SdkiController::destroy
* @see app/Http/Controllers/SDKI/SdkiController.php:149
* @route '/api/sdki/{idOrKode}'
*/
destroy.delete = (args: { idOrKode: string | number } | [idOrKode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const sdki = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default sdki