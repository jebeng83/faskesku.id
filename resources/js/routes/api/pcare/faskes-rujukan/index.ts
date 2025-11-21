import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::subspesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1911
* @route '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
export const subspesialis = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subspesialis.url(args, options),
    method: 'get',
})

subspesialis.definition = {
    methods: ["get","head"],
    url: '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::subspesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1911
* @route '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
subspesialis.url = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            kdSubSpesialis: args[0],
            kdSarana: args[1],
            tglEstRujuk: args[2],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kdSubSpesialis: args.kdSubSpesialis,
        kdSarana: args.kdSarana,
        tglEstRujuk: args.tglEstRujuk,
    }

    return subspesialis.definition.url
            .replace('{kdSubSpesialis}', parsedArgs.kdSubSpesialis.toString())
            .replace('{kdSarana}', parsedArgs.kdSarana.toString())
            .replace('{tglEstRujuk}', parsedArgs.tglEstRujuk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::subspesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1911
* @route '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
subspesialis.get = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subspesialis.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::subspesialis
* @see app/Http/Controllers/Pcare/PcareController.php:1911
* @route '/api/pcare/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}'
*/
subspesialis.head = (args: { kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number } | [kdSubSpesialis: string | number, kdSarana: string | number, tglEstRujuk: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: subspesialis.url(args, options),
    method: 'head',
})

const faskesRujukan = {
    subspesialis: Object.assign(subspesialis, subspesialis),
}

export default faskesRujukan