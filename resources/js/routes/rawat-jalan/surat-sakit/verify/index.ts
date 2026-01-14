import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::byNomor
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2025
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}/verify'
*/
export const byNomor = (args: { no_surat: string | number } | [no_surat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byNomor.url(args, options),
    method: 'get',
})

byNomor.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit/nomor/{no_surat}/verify',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::byNomor
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2025
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}/verify'
*/
byNomor.url = (args: { no_surat: string | number } | [no_surat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_surat: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_surat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_surat: args.no_surat,
    }

    return byNomor.definition.url
            .replace('{no_surat}', parsedArgs.no_surat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::byNomor
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2025
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}/verify'
*/
byNomor.get = (args: { no_surat: string | number } | [no_surat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byNomor.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::byNomor
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2025
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}/verify'
*/
byNomor.head = (args: { no_surat: string | number } | [no_surat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byNomor.url(args, options),
    method: 'head',
})

