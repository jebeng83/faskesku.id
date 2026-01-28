import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SDKI\KeluhanSubyektifController::index
* @see app/Http/Controllers/SDKI/KeluhanSubyektifController.php:26
* @route '/api/keluhan-subyektif'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/keluhan-subyektif',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SDKI\KeluhanSubyektifController::index
* @see app/Http/Controllers/SDKI/KeluhanSubyektifController.php:26
* @route '/api/keluhan-subyektif'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SDKI\KeluhanSubyektifController::index
* @see app/Http/Controllers/SDKI/KeluhanSubyektifController.php:26
* @route '/api/keluhan-subyektif'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SDKI\KeluhanSubyektifController::index
* @see app/Http/Controllers/SDKI/KeluhanSubyektifController.php:26
* @route '/api/keluhan-subyektif'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SDKI\KeluhanSubyektifController::store
* @see app/Http/Controllers/SDKI/KeluhanSubyektifController.php:73
* @route '/api/keluhan-subyektif'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/keluhan-subyektif',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SDKI\KeluhanSubyektifController::store
* @see app/Http/Controllers/SDKI/KeluhanSubyektifController.php:73
* @route '/api/keluhan-subyektif'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SDKI\KeluhanSubyektifController::store
* @see app/Http/Controllers/SDKI/KeluhanSubyektifController.php:73
* @route '/api/keluhan-subyektif'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SDKI\KeluhanSubyektifController::update
* @see app/Http/Controllers/SDKI/KeluhanSubyektifController.php:181
* @route '/api/keluhan-subyektif/{idOrKey}'
*/
export const update = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/keluhan-subyektif/{idOrKey}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SDKI\KeluhanSubyektifController::update
* @see app/Http/Controllers/SDKI/KeluhanSubyektifController.php:181
* @route '/api/keluhan-subyektif/{idOrKey}'
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
* @see \App\Http\Controllers\SDKI\KeluhanSubyektifController::update
* @see app/Http/Controllers/SDKI/KeluhanSubyektifController.php:181
* @route '/api/keluhan-subyektif/{idOrKey}'
*/
update.put = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SDKI\KeluhanSubyektifController::destroy
* @see app/Http/Controllers/SDKI/KeluhanSubyektifController.php:265
* @route '/api/keluhan-subyektif/{idOrKey}'
*/
export const destroy = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/keluhan-subyektif/{idOrKey}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SDKI\KeluhanSubyektifController::destroy
* @see app/Http/Controllers/SDKI/KeluhanSubyektifController.php:265
* @route '/api/keluhan-subyektif/{idOrKey}'
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
* @see \App\Http\Controllers\SDKI\KeluhanSubyektifController::destroy
* @see app/Http/Controllers/SDKI/KeluhanSubyektifController.php:265
* @route '/api/keluhan-subyektif/{idOrKey}'
*/
destroy.delete = (args: { idOrKey: string | number } | [idOrKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const KeluhanSubyektifController = { index, store, update, destroy }

export default KeluhanSubyektifController