import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::subunits
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:242
* @route '/api/satusehat/organization/subunits'
*/
export const subunits = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subunits.url(options),
    method: 'get',
})

subunits.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/organization/subunits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::subunits
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:242
* @route '/api/satusehat/organization/subunits'
*/
subunits.url = (options?: RouteQueryOptions) => {
    return subunits.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::subunits
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:242
* @route '/api/satusehat/organization/subunits'
*/
subunits.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subunits.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::subunits
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:242
* @route '/api/satusehat/organization/subunits'
*/
subunits.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: subunits.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::update
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:545
* @route '/api/satusehat/organization/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/satusehat/organization/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::update
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:545
* @route '/api/satusehat/organization/{id}'
*/
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::update
* @see app/Http/Controllers/SatuSehat/SatuSehatController.php:545
* @route '/api/satusehat/organization/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

const organization = {
    subunits: Object.assign(subunits, subunits),
    update: Object.assign(update, update),
}

export default organization