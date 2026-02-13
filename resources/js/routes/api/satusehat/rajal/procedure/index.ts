import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::create
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:424
* @route '/api/satusehat/rajal/procedure'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/procedure',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::create
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:424
* @route '/api/satusehat/rajal/procedure'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::create
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:424
* @route '/api/satusehat/rajal/procedure'
*/
create.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\ProcedureTindakanController::sendByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/ProcedureTindakanController.php:11
* @route '/api/satusehat/rajal/procedure/by-rawat/{no_rawat}'
*/
export const sendByRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendByRawat.url(args, options),
    method: 'post',
})

sendByRawat.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/procedure/by-rawat/{no_rawat}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\ProcedureTindakanController::sendByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/ProcedureTindakanController.php:11
* @route '/api/satusehat/rajal/procedure/by-rawat/{no_rawat}'
*/
sendByRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return sendByRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\ProcedureTindakanController::sendByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/ProcedureTindakanController.php:11
* @route '/api/satusehat/rajal/procedure/by-rawat/{no_rawat}'
*/
sendByRawat.post = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendByRawat.url(args, options),
    method: 'post',
})

const procedure = {
    create: Object.assign(create, create),
    sendByRawat: Object.assign(sendByRawat, sendByRawat),
}

export default procedure