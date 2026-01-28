import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SDKI\DataObyektifController::index
* @see app/Http/Controllers/SDKI/DataObyektifController.php:26
* @route '/api/data-obyektif'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/data-obyektif',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SDKI\DataObyektifController::index
* @see app/Http/Controllers/SDKI/DataObyektifController.php:26
* @route '/api/data-obyektif'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SDKI\DataObyektifController::index
* @see app/Http/Controllers/SDKI/DataObyektifController.php:26
* @route '/api/data-obyektif'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SDKI\DataObyektifController::index
* @see app/Http/Controllers/SDKI/DataObyektifController.php:26
* @route '/api/data-obyektif'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SDKI\DataObyektifController::store
* @see app/Http/Controllers/SDKI/DataObyektifController.php:73
* @route '/api/data-obyektif'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/data-obyektif',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SDKI\DataObyektifController::store
* @see app/Http/Controllers/SDKI/DataObyektifController.php:73
* @route '/api/data-obyektif'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SDKI\DataObyektifController::store
* @see app/Http/Controllers/SDKI/DataObyektifController.php:73
* @route '/api/data-obyektif'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SDKI\DataObyektifController::update
* @see app/Http/Controllers/SDKI/DataObyektifController.php:181
* @route '/api/data-obyektif/{idOrKey}'
*/
export const update = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/data-obyektif/{idOrKey}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SDKI\DataObyektifController::update
* @see app/Http/Controllers/SDKI/DataObyektifController.php:181
* @route '/api/data-obyektif/{idOrKey}'
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
* @see \App\Http\Controllers\SDKI\DataObyektifController::update
* @see app/Http/Controllers/SDKI/DataObyektifController.php:181
* @route '/api/data-obyektif/{idOrKey}'
*/
update.put = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SDKI\DataObyektifController::destroy
* @see app/Http/Controllers/SDKI/DataObyektifController.php:265
* @route '/api/data-obyektif/{idOrKey}'
*/
export const destroy = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/data-obyektif/{idOrKey}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SDKI\DataObyektifController::destroy
* @see app/Http/Controllers/SDKI/DataObyektifController.php:265
* @route '/api/data-obyektif/{idOrKey}'
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
* @see \App\Http\Controllers\SDKI\DataObyektifController::destroy
* @see app/Http/Controllers/SDKI/DataObyektifController.php:265
* @route '/api/data-obyektif/{idOrKey}'
*/
destroy.delete = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const dataObyektif = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default dataObyektif