import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1874
* @route '/pcare/api/kelompok/kegiatan/{eduId}'
*/
export const api = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: api.url(args, options),
    method: 'delete',
})

api.definition = {
    methods: ["delete"],
    url: '/pcare/api/kelompok/kegiatan/{eduId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1874
* @route '/pcare/api/kelompok/kegiatan/{eduId}'
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
* @see app/Http/Controllers/Pcare/PcareController.php:1874
* @route '/pcare/api/kelompok/kegiatan/{eduId}'
*/
api.delete = (args: { eduId: string | number } | [eduId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: api.url(args, options),
    method: 'delete',
})

const deleteMethod = {
    api: Object.assign(api, api),
}

export default deleteMethod