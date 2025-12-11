import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::byRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:796
* @route '/api/satusehat/rajal/pipeline/by-rawat/{no_rawat}'
*/
export const byRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: byRawat.url(args, options),
    method: 'post',
})

byRawat.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/pipeline/by-rawat/{no_rawat}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::byRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:796
* @route '/api/satusehat/rajal/pipeline/by-rawat/{no_rawat}'
*/
byRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rawat: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_rawat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rawat: args.no_rawat,
    }

    return byRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::byRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:796
* @route '/api/satusehat/rajal/pipeline/by-rawat/{no_rawat}'
*/
byRawat.post = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: byRawat.url(args, options),
    method: 'post',
})

const pipeline = {
    byRawat: Object.assign(byRawat, byRawat),
}

export default pipeline