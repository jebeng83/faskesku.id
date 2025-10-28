import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:495
* @route '/pcare/api/kelompok/club/{kdProgram}'
*/
export const api = (args: { kdProgram: string | number } | [kdProgram: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(args, options),
    method: 'get',
})

api.definition = {
    methods: ["get","head"],
    url: '/pcare/api/kelompok/club/{kdProgram}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:495
* @route '/pcare/api/kelompok/club/{kdProgram}'
*/
api.url = (args: { kdProgram: string | number } | [kdProgram: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kdProgram: args }
    }

    if (Array.isArray(args)) {
        args = {
            kdProgram: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kdProgram: args.kdProgram,
    }

    return api.definition.url
            .replace('{kdProgram}', parsedArgs.kdProgram.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:495
* @route '/pcare/api/kelompok/club/{kdProgram}'
*/
api.get = (args: { kdProgram: string | number } | [kdProgram: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:495
* @route '/pcare/api/kelompok/club/{kdProgram}'
*/
api.head = (args: { kdProgram: string | number } | [kdProgram: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: api.url(args, options),
    method: 'head',
})

const club = {
    api: Object.assign(api, api),
}

export default club