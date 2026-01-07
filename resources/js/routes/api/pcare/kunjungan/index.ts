import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::store
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:39
* @route '/api/pcare/kunjungan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/pcare/kunjungan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::store
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:39
* @route '/api/pcare/kunjungan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::store
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:39
* @route '/api/pcare/kunjungan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:750
* @route '/api/pcare/kunjungan/preview/{no_rawat}'
*/
export const preview = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

preview.definition = {
    methods: ["get","head"],
    url: '/api/pcare/kunjungan/preview/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:750
* @route '/api/pcare/kunjungan/preview/{no_rawat}'
*/
preview.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return preview.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:750
* @route '/api/pcare/kunjungan/preview/{no_rawat}'
*/
preview.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareKunjunganController::preview
* @see app/Http/Controllers/Pcare/PcareKunjunganController.php:750
* @route '/api/pcare/kunjungan/preview/{no_rawat}'
*/
preview.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview.url(args, options),
    method: 'head',
})

const kunjungan = {
    store: Object.assign(store, store),
    preview: Object.assign(preview, preview),
}

export default kunjungan