import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
* @see app/Http/Controllers/RawatJalan/ResepController.php:185
* @route '/api/resep/racikan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/resep/racikan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
* @see app/Http/Controllers/RawatJalan/ResepController.php:185
* @route '/api/resep/racikan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
* @see app/Http/Controllers/RawatJalan/ResepController.php:185
* @route '/api/resep/racikan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::append
* @see app/Http/Controllers/RawatJalan/ResepController.php:511
* @route '/api/resep/{no_resep}/racikan'
*/
export const append = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: append.url(args, options),
    method: 'post',
})

append.definition = {
    methods: ["post"],
    url: '/api/resep/{no_resep}/racikan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::append
* @see app/Http/Controllers/RawatJalan/ResepController.php:511
* @route '/api/resep/{no_resep}/racikan'
*/
append.url = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_resep: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_resep: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_resep: args.no_resep,
    }

    return append.definition.url
            .replace('{no_resep}', parsedArgs.no_resep.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::append
* @see app/Http/Controllers/RawatJalan/ResepController.php:511
* @route '/api/resep/{no_resep}/racikan'
*/
append.post = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: append.url(args, options),
    method: 'post',
})

const racikan = {
    store: Object.assign(store, store),
    append: Object.assign(append, append),
}

export default racikan