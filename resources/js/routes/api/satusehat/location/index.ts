import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::search
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:610
* @route '/api/satusehat/location'
*/
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/location',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::search
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:610
* @route '/api/satusehat/location'
*/
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::search
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:610
* @route '/api/satusehat/location'
*/
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::search
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:610
* @route '/api/satusehat/location'
*/
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::patch
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1595
* @route '/api/satusehat/location/{id}'
*/
export const patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: patch.url(args, options),
    method: 'patch',
})

patch.definition = {
    methods: ["patch"],
    url: '/api/satusehat/location/{id}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::patch
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1595
* @route '/api/satusehat/location/{id}'
*/
patch.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return patch.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::patch
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:1595
* @route '/api/satusehat/location/{id}'
*/
patch.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: patch.url(args, options),
    method: 'patch',
})

const location = {
    search: Object.assign(search, search),
    patch: Object.assign(patch, patch),
}

export default location