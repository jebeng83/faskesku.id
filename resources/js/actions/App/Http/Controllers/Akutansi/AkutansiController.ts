import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Akutansi\AkutansiController::invoice
* @see app/Http/Controllers/Akutansi/AkutansiController.php:17
* @route '/akutansi/invoice/{no_rawat}'
*/
export const invoice = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invoice.url(args, options),
    method: 'get',
})

invoice.definition = {
    methods: ["get","head"],
    url: '/akutansi/invoice/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Akutansi\AkutansiController::invoice
* @see app/Http/Controllers/Akutansi/AkutansiController.php:17
* @route '/akutansi/invoice/{no_rawat}'
*/
invoice.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return invoice.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Akutansi\AkutansiController::invoice
* @see app/Http/Controllers/Akutansi/AkutansiController.php:17
* @route '/akutansi/invoice/{no_rawat}'
*/
invoice.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invoice.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Akutansi\AkutansiController::invoice
* @see app/Http/Controllers/Akutansi/AkutansiController.php:17
* @route '/akutansi/invoice/{no_rawat}'
*/
invoice.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: invoice.url(args, options),
    method: 'head',
})

const AkutansiController = { invoice }

export default AkutansiController