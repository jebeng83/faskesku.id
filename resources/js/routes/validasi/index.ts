import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::surat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2087
* @route '/validasi/surat/{type}'
*/
export const surat = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: surat.url(args, options),
    method: 'get',
})

surat.definition = {
    methods: ["get","head"],
    url: '/validasi/surat/{type}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::surat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2087
* @route '/validasi/surat/{type}'
*/
surat.url = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { type: args }
    }

    if (Array.isArray(args)) {
        args = {
            type: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        type: args.type,
    }

    return surat.definition.url
            .replace('{type}', parsedArgs.type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::surat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2087
* @route '/validasi/surat/{type}'
*/
surat.get = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: surat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::surat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2087
* @route '/validasi/surat/{type}'
*/
surat.head = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: surat.url(args, options),
    method: 'head',
})

const validasi = {
    surat: Object.assign(surat, surat),
}

export default validasi