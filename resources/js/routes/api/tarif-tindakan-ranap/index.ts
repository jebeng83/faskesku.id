import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\TarifTindakanController::index
 * @see app/Http/Controllers/TarifTindakanController.php:82
 * @route '/api/tarif-tindakan-ranap'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/tarif-tindakan-ranap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::index
 * @see app/Http/Controllers/TarifTindakanController.php:82
 * @route '/api/tarif-tindakan-ranap'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::index
 * @see app/Http/Controllers/TarifTindakanController.php:82
 * @route '/api/tarif-tindakan-ranap'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TarifTindakanController::index
 * @see app/Http/Controllers/TarifTindakanController.php:82
 * @route '/api/tarif-tindakan-ranap'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::storeDokter
 * @see app/Http/Controllers/TarifTindakanController.php:127
 * @route '/api/tarif-tindakan-ranap/dokter'
 */
export const storeDokter = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDokter.url(options),
    method: 'post',
})

storeDokter.definition = {
    methods: ["post"],
    url: '/api/tarif-tindakan-ranap/dokter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::storeDokter
 * @see app/Http/Controllers/TarifTindakanController.php:127
 * @route '/api/tarif-tindakan-ranap/dokter'
 */
storeDokter.url = (options?: RouteQueryOptions) => {
    return storeDokter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::storeDokter
 * @see app/Http/Controllers/TarifTindakanController.php:127
 * @route '/api/tarif-tindakan-ranap/dokter'
 */
storeDokter.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDokter.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::storePerawat
 * @see app/Http/Controllers/TarifTindakanController.php:167
 * @route '/api/tarif-tindakan-ranap/perawat'
 */
export const storePerawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePerawat.url(options),
    method: 'post',
})

storePerawat.definition = {
    methods: ["post"],
    url: '/api/tarif-tindakan-ranap/perawat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::storePerawat
 * @see app/Http/Controllers/TarifTindakanController.php:167
 * @route '/api/tarif-tindakan-ranap/perawat'
 */
storePerawat.url = (options?: RouteQueryOptions) => {
    return storePerawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::storePerawat
 * @see app/Http/Controllers/TarifTindakanController.php:167
 * @route '/api/tarif-tindakan-ranap/perawat'
 */
storePerawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePerawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::storeDokterPerawat
 * @see app/Http/Controllers/TarifTindakanController.php:207
 * @route '/api/tarif-tindakan-ranap/dokter-perawat'
 */
export const storeDokterPerawat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDokterPerawat.url(options),
    method: 'post',
})

storeDokterPerawat.definition = {
    methods: ["post"],
    url: '/api/tarif-tindakan-ranap/dokter-perawat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::storeDokterPerawat
 * @see app/Http/Controllers/TarifTindakanController.php:207
 * @route '/api/tarif-tindakan-ranap/dokter-perawat'
 */
storeDokterPerawat.url = (options?: RouteQueryOptions) => {
    return storeDokterPerawat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::storeDokterPerawat
 * @see app/Http/Controllers/TarifTindakanController.php:207
 * @route '/api/tarif-tindakan-ranap/dokter-perawat'
 */
storeDokterPerawat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDokterPerawat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TarifTindakanController::riwayat
 * @see app/Http/Controllers/TarifTindakanController.php:250
 * @route '/api/tarif-tindakan-ranap/riwayat/{noRawat}'
 */
export const riwayat = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(args, options),
    method: 'get',
})

riwayat.definition = {
    methods: ["get","head"],
    url: '/api/tarif-tindakan-ranap/riwayat/{noRawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TarifTindakanController::riwayat
 * @see app/Http/Controllers/TarifTindakanController.php:250
 * @route '/api/tarif-tindakan-ranap/riwayat/{noRawat}'
 */
riwayat.url = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noRawat: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    noRawat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        noRawat: args.noRawat,
                }

    return riwayat.definition.url
            .replace('{noRawat}', parsedArgs.noRawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarifTindakanController::riwayat
 * @see app/Http/Controllers/TarifTindakanController.php:250
 * @route '/api/tarif-tindakan-ranap/riwayat/{noRawat}'
 */
riwayat.get = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TarifTindakanController::riwayat
 * @see app/Http/Controllers/TarifTindakanController.php:250
 * @route '/api/tarif-tindakan-ranap/riwayat/{noRawat}'
 */
riwayat.head = (args: { noRawat: string | number } | [noRawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayat.url(args, options),
    method: 'head',
})
const tarifTindakanRanap = {
    index: Object.assign(index, index),
storeDokter: Object.assign(storeDokter, storeDokter),
storePerawat: Object.assign(storePerawat, storePerawat),
storeDokterPerawat: Object.assign(storeDokterPerawat, storeDokterPerawat),
riwayat: Object.assign(riwayat, riwayat),
}

export default tarifTindakanRanap