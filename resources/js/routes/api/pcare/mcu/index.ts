import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pcare\PcareController::kunjungan
* @see app/Http/Controllers/Pcare/PcareController.php:2918
* @route '/api/pcare/mcu/kunjungan/{noKunjungan}'
*/
export const kunjungan = (args: { noKunjungan: string | number } | [noKunjungan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjungan.url(args, options),
    method: 'get',
})

kunjungan.definition = {
    methods: ["get","head"],
    url: '/api/pcare/mcu/kunjungan/{noKunjungan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::kunjungan
* @see app/Http/Controllers/Pcare/PcareController.php:2918
* @route '/api/pcare/mcu/kunjungan/{noKunjungan}'
*/
kunjungan.url = (args: { noKunjungan: string | number } | [noKunjungan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noKunjungan: args }
    }

    if (Array.isArray(args)) {
        args = {
            noKunjungan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noKunjungan: args.noKunjungan,
    }

    return kunjungan.definition.url
            .replace('{noKunjungan}', parsedArgs.noKunjungan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::kunjungan
* @see app/Http/Controllers/Pcare/PcareController.php:2918
* @route '/api/pcare/mcu/kunjungan/{noKunjungan}'
*/
kunjungan.get = (args: { noKunjungan: string | number } | [noKunjungan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kunjungan.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::kunjungan
* @see app/Http/Controllers/Pcare/PcareController.php:2918
* @route '/api/pcare/mcu/kunjungan/{noKunjungan}'
*/
kunjungan.head = (args: { noKunjungan: string | number } | [noKunjungan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kunjungan.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Pcare\PcareController::store
* @see app/Http/Controllers/Pcare/PcareController.php:2814
* @route '/api/pcare/mcu'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/pcare/mcu',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Pcare\PcareController::store
* @see app/Http/Controllers/Pcare/PcareController.php:2814
* @route '/api/pcare/mcu'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pcare\PcareController::store
* @see app/Http/Controllers/Pcare/PcareController.php:2814
* @route '/api/pcare/mcu'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const mcu = {
    kunjungan: Object.assign(kunjungan, kunjungan),
    store: Object.assign(store, store),
}

export default mcu