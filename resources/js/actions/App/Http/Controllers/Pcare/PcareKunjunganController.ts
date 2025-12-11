import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::store
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:39
* @route '/api/permissions/pcare/kunjungan'
*/
const store1dd76432cfd5abf306e8e159bd184570 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store1dd76432cfd5abf306e8e159bd184570.url(options),
    method: 'post',
})

store1dd76432cfd5abf306e8e159bd184570.definition = {
    methods: ["post"],
    url: '/api/permissions/pcare/kunjungan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::store
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:39
* @route '/api/permissions/pcare/kunjungan'
*/
store1dd76432cfd5abf306e8e159bd184570.url = (options?: RouteQueryOptions) => {
    return store1dd76432cfd5abf306e8e159bd184570.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::store
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:39
* @route '/api/permissions/pcare/kunjungan'
*/
store1dd76432cfd5abf306e8e159bd184570.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store1dd76432cfd5abf306e8e159bd184570.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::store
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:39
* @route '/api/pcare/kunjungan'
*/
const storec9aa598399a4ca8f74542b33bfef7d69 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storec9aa598399a4ca8f74542b33bfef7d69.url(options),
    method: 'post',
})

storec9aa598399a4ca8f74542b33bfef7d69.definition = {
    methods: ["post"],
    url: '/api/pcare/kunjungan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::store
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:39
* @route '/api/pcare/kunjungan'
*/
storec9aa598399a4ca8f74542b33bfef7d69.url = (options?: RouteQueryOptions) => {
    return storec9aa598399a4ca8f74542b33bfef7d69.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::store
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:39
* @route '/api/pcare/kunjungan'
*/
storec9aa598399a4ca8f74542b33bfef7d69.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storec9aa598399a4ca8f74542b33bfef7d69.url(options),
    method: 'post',
})

export const store = {
    '/api/permissions/pcare/kunjungan': store1dd76432cfd5abf306e8e159bd184570,
    '/api/pcare/kunjungan': storec9aa598399a4ca8f74542b33bfef7d69,
}

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:306
* @route '/api/permissions/pcare/kunjungan/preview/{no_rawat}'
*/
const preview5bfd04a3fb39e6d51c278b7f3e73af6e = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview5bfd04a3fb39e6d51c278b7f3e73af6e.url(args, options),
    method: 'get',
})

preview5bfd04a3fb39e6d51c278b7f3e73af6e.definition = {
    methods: ["get","head"],
    url: '/api/permissions/pcare/kunjungan/preview/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:306
* @route '/api/permissions/pcare/kunjungan/preview/{no_rawat}'
*/
preview5bfd04a3fb39e6d51c278b7f3e73af6e.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return preview5bfd04a3fb39e6d51c278b7f3e73af6e.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:306
* @route '/api/permissions/pcare/kunjungan/preview/{no_rawat}'
*/
preview5bfd04a3fb39e6d51c278b7f3e73af6e.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview5bfd04a3fb39e6d51c278b7f3e73af6e.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:306
* @route '/api/permissions/pcare/kunjungan/preview/{no_rawat}'
*/
preview5bfd04a3fb39e6d51c278b7f3e73af6e.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview5bfd04a3fb39e6d51c278b7f3e73af6e.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:306
* @route '/api/pcare/kunjungan/preview/{no_rawat}'
*/
const preview5b83195a1d206f6038f6c55fb91bc577 = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview5b83195a1d206f6038f6c55fb91bc577.url(args, options),
    method: 'get',
})

preview5b83195a1d206f6038f6c55fb91bc577.definition = {
    methods: ["get","head"],
    url: '/api/pcare/kunjungan/preview/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:306
* @route '/api/pcare/kunjungan/preview/{no_rawat}'
*/
preview5b83195a1d206f6038f6c55fb91bc577.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return preview5b83195a1d206f6038f6c55fb91bc577.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:306
* @route '/api/pcare/kunjungan/preview/{no_rawat}'
*/
preview5b83195a1d206f6038f6c55fb91bc577.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview5b83195a1d206f6038f6c55fb91bc577.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:306
* @route '/api/pcare/kunjungan/preview/{no_rawat}'
*/
preview5b83195a1d206f6038f6c55fb91bc577.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview5b83195a1d206f6038f6c55fb91bc577.url(args, options),
    method: 'head',
})

export const preview = {
    '/api/permissions/pcare/kunjungan/preview/{no_rawat}': preview5bfd04a3fb39e6d51c278b7f3e73af6e,
    '/api/pcare/kunjungan/preview/{no_rawat}': preview5b83195a1d206f6038f6c55fb91bc577,
}

const PcareKunjunganController = { store, preview }

export default PcareKunjunganController