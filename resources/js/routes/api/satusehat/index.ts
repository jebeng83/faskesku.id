import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import organization578ad3 from './organization'
import location from './location'
import config from './config'
import practitioner from './practitioner'
import patient from './patient'
import rajal from './rajal'
import mapping from './mapping'
import ranap from './ranap'
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::token
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:31
 * @route '/api/satusehat/token'
 */
export const token = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: token.url(options),
    method: 'get',
})

token.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/token',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::token
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:31
 * @route '/api/satusehat/token'
 */
token.url = (options?: RouteQueryOptions) => {
    return token.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::token
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:31
 * @route '/api/satusehat/token'
 */
token.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: token.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::token
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:31
 * @route '/api/satusehat/token'
 */
token.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: token.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::tokenDebug
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:54
 * @route '/api/satusehat/token-debug'
 */
export const tokenDebug = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tokenDebug.url(options),
    method: 'get',
})

tokenDebug.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/token-debug',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::tokenDebug
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:54
 * @route '/api/satusehat/token-debug'
 */
tokenDebug.url = (options?: RouteQueryOptions) => {
    return tokenDebug.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::tokenDebug
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:54
 * @route '/api/satusehat/token-debug'
 */
tokenDebug.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tokenDebug.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::tokenDebug
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:54
 * @route '/api/satusehat/token-debug'
 */
tokenDebug.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: tokenDebug.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::metadata
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:147
 * @route '/api/satusehat/metadata'
 */
export const metadata = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: metadata.url(options),
    method: 'get',
})

metadata.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/metadata',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::metadata
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:147
 * @route '/api/satusehat/metadata'
 */
metadata.url = (options?: RouteQueryOptions) => {
    return metadata.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::metadata
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:147
 * @route '/api/satusehat/metadata'
 */
metadata.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: metadata.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::metadata
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:147
 * @route '/api/satusehat/metadata'
 */
metadata.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: metadata.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::organization
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:159
 * @route '/api/satusehat/organization'
 */
export const organization = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organization.url(options),
    method: 'get',
})

organization.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/organization',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::organization
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:159
 * @route '/api/satusehat/organization'
 */
organization.url = (options?: RouteQueryOptions) => {
    return organization.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::organization
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:159
 * @route '/api/satusehat/organization'
 */
organization.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organization.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::organization
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:159
 * @route '/api/satusehat/organization'
 */
organization.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: organization.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::create
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:321
 * @route '/api/satusehat/{resource}'
 */
export const create = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(args, options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/api/satusehat/{resource}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::create
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:321
 * @route '/api/satusehat/{resource}'
 */
create.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return create.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::create
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:321
 * @route '/api/satusehat/{resource}'
 */
create.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::get
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:350
 * @route '/api/satusehat/{resource}/{id}'
 */
export const get = (args: { resource: string | number, id: string | number } | [resource: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(args, options),
    method: 'get',
})

get.definition = {
    methods: ["get","head"],
    url: '/api/satusehat/{resource}/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::get
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:350
 * @route '/api/satusehat/{resource}/{id}'
 */
get.url = (args: { resource: string | number, id: string | number } | [resource: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                    id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                                id: args.id,
                }

    return get.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::get
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:350
 * @route '/api/satusehat/{resource}/{id}'
 */
get.get = (args: { resource: string | number, id: string | number } | [resource: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SatuSehat\SatuSehatController::get
 * @see app/Http/Controllers/SatuSehat/SatuSehatController.php:350
 * @route '/api/satusehat/{resource}/{id}'
 */
get.head = (args: { resource: string | number, id: string | number } | [resource: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: get.url(args, options),
    method: 'head',
})
const satusehat = {
    token: Object.assign(token, token),
tokenDebug: Object.assign(tokenDebug, tokenDebug),
metadata: Object.assign(metadata, metadata),
organization: Object.assign(organization, organization578ad3),
location: Object.assign(location, location),
config: Object.assign(config, config),
practitioner: Object.assign(practitioner, practitioner),
patient: Object.assign(patient, patient),
rajal: Object.assign(rajal, rajal),
mapping: Object.assign(mapping, mapping),
ranap: Object.assign(ranap, ranap),
create: Object.assign(create, create),
get: Object.assign(get, get),
}

export default satusehat