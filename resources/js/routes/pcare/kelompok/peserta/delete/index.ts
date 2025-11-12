import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1133
* @route '/pcare/api/kelompok/peserta/{eduId}/{noKartu}'
*/
export const api = (args: { eduId: string | number, noKartu: string | number } | [eduId: string | number, noKartu: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: api.url(args, options),
    method: 'delete',
})

api.definition = {
    methods: ["delete"],
    url: '/pcare/api/kelompok/peserta/{eduId}/{noKartu}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1133
* @route '/pcare/api/kelompok/peserta/{eduId}/{noKartu}'
*/
api.url = (args: { eduId: string | number, noKartu: string | number } | [eduId: string | number, noKartu: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            eduId: args[0],
            noKartu: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        eduId: args.eduId,
        noKartu: args.noKartu,
    }

    return api.definition.url
            .replace('{eduId}', parsedArgs.eduId.toString())
            .replace('{noKartu}', parsedArgs.noKartu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::api
* @see app/Http/Controllers/Pcare/PcareController.php:1133
* @route '/pcare/api/kelompok/peserta/{eduId}/{noKartu}'
*/
api.delete = (args: { eduId: string | number, noKartu: string | number } | [eduId: string | number, noKartu: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: api.url(args, options),
    method: 'delete',
})

const deleteMethod = {
    api: Object.assign(api, api),
}

export default deleteMethod