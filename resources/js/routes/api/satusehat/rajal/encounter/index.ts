import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::create
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:21
* @route '/api/satusehat/rajal/encounter'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/api/satusehat/rajal/encounter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::create
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:21
* @route '/api/satusehat/rajal/encounter'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::create
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:21
* @route '/api/satusehat/rajal/encounter'
*/
create.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::updateByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:547
* @route '/api/satusehat/rajal/encounter/by-rawat/{no_rawat}'
*/
export const updateByRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateByRawat.url(args, options),
    method: 'put',
})

updateByRawat.definition = {
    methods: ["put"],
    url: '/api/satusehat/rajal/encounter/by-rawat/{no_rawat}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::updateByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:547
* @route '/api/satusehat/rajal/encounter/by-rawat/{no_rawat}'
*/
updateByRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateByRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::updateByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:547
* @route '/api/satusehat/rajal/encounter/by-rawat/{no_rawat}'
*/
updateByRawat.put = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateByRawat.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::idByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:696
* @route '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
export const idByRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: idByRawat.url(args, options),
    method: 'get',
})

idByRawat.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::idByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:696
* @route '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
idByRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return idByRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::idByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:696
* @route '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
idByRawat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: idByRawat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::idByRawat
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:696
* @route '/api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}'
*/
idByRawat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: idByRawat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::describe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:730
* @route '/api/satusehat/rajal/encounter/describe'
*/
export const describe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

describe.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/rajal/encounter/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::describe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:730
* @route '/api/satusehat/rajal/encounter/describe'
*/
describe.url = (options?: RouteQueryOptions) => {
    return describe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::describe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:730
* @route '/api/satusehat/rajal/encounter/describe'
*/
describe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describe.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController::describe
* @see app/Http/Controllers/SatuSehat/PelayananRawatJalan/SatuSehatRajalController.php:730
* @route '/api/satusehat/rajal/encounter/describe'
*/
describe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: describe.url(options),
    method: 'head',
})

const encounter = {
    create: Object.assign(create, create),
    updateByRawat: Object.assign(updateByRawat, updateByRawat),
    idByRawat: Object.assign(idByRawat, idByRawat),
    describe: Object.assign(describe, describe),
}

export default encounter