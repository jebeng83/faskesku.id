import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
import add from './add'
import deleteMethod from './delete'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1937
* @route '/pcare/api/kelompok/peserta/{eduId}'
*/
export const api = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(args, options),
    method: 'get',
})

api.definition = {
    methods: ["get","head"],
    url: '/pcare/api/kelompok/peserta/{eduId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1937
* @route '/pcare/api/kelompok/peserta/{eduId}'
*/
api.url = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { eduId: args }
    }

    if (Array.isArray(args)) {
        args = {
            eduId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        eduId: args.eduId,
    }

    return api.definition.url
            .replace('{eduId}', parsedArgs.eduId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1937
* @route '/pcare/api/kelompok/peserta/{eduId}'
*/
api.get = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1937
* @route '/pcare/api/kelompok/peserta/{eduId}'
*/
api.head = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: api.url(args, options),
    method: 'head',
})

const peserta = {
    api: Object.assign(api, api),
    add: Object.assign(add, add),
    delete: Object.assign(deleteMethod, deleteMethod),
}

export default peserta