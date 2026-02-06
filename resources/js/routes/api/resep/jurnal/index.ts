import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\ResepController::stage
* @see app/Http/Controllers/RawatJalan/ResepController.php:1079
* @route '/api/resep/{no_resep}/jurnal/stage'
*/
export const stage = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stage.url(args, options),
    method: 'post',
})

stage.definition = {
    methods: ["post"],
    url: '/api/resep/{no_resep}/jurnal/stage',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::stage
* @see app/Http/Controllers/RawatJalan/ResepController.php:1079
* @route '/api/resep/{no_resep}/jurnal/stage'
*/
stage.url = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return stage.definition.url
            .replace('{no_resep}', parsedArgs.no_resep.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::stage
* @see app/Http/Controllers/RawatJalan/ResepController.php:1079
* @route '/api/resep/{no_resep}/jurnal/stage'
*/
stage.post = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stage.url(args, options),
    method: 'post',
})

const jurnal = {
    stage: Object.assign(stage, stage),
}

export default jurnal