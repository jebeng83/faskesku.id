import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::create
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:437
* @route '/api/satusehat/rajal/composition'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/composition',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::create
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:437
* @route '/api/satusehat/rajal/composition'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::create
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:437
* @route '/api/satusehat/rajal/composition'
*/
create.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::auto
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:0
* @route '/api/satusehat/rajal/composition/auto/{no_rawat}'
*/
export const auto = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: auto.url(args, options),
    method: 'post',
})

auto.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/composition/auto/{no_rawat}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::auto
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:0
* @route '/api/satusehat/rajal/composition/auto/{no_rawat}'
*/
auto.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return auto.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::auto
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:0
* @route '/api/satusehat/rajal/composition/auto/{no_rawat}'
*/
auto.post = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: auto.url(args, options),
    method: 'post',
})

const composition = {
    create: Object.assign(create, create),
    auto: Object.assign(auto, auto),
}

export default composition