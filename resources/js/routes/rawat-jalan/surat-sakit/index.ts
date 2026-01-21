import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::verify
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1808
* @route '/rawat-jalan/surat-sakit/{no_rawat}/verify'
*/
export const verify = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(args, options),
    method: 'get',
})

verify.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit/{no_rawat}/verify',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::verify
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1808
* @route '/rawat-jalan/surat-sakit/{no_rawat}/verify'
*/
verify.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return verify.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::verify
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1808
* @route '/rawat-jalan/surat-sakit/{no_rawat}/verify'
*/
verify.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::verify
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1808
* @route '/rawat-jalan/surat-sakit/{no_rawat}/verify'
*/
verify.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verify.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSurat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1961
* @route '/rawat-jalan/surat-sakit/next-no-surat'
*/
export const nextNoSurat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextNoSurat.url(options),
    method: 'get',
})

nextNoSurat.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit/next-no-surat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSurat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1961
* @route '/rawat-jalan/surat-sakit/next-no-surat'
*/
nextNoSurat.url = (options?: RouteQueryOptions) => {
    return nextNoSurat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSurat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1961
* @route '/rawat-jalan/surat-sakit/next-no-surat'
*/
nextNoSurat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextNoSurat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSurat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1961
* @route '/rawat-jalan/surat-sakit/next-no-surat'
*/
nextNoSurat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nextNoSurat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicate
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2046
* @route '/rawat-jalan/surat-sakit/check-duplicate'
*/
export const checkDuplicate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkDuplicate.url(options),
    method: 'get',
})

checkDuplicate.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit/check-duplicate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicate
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2046
* @route '/rawat-jalan/surat-sakit/check-duplicate'
*/
checkDuplicate.url = (options?: RouteQueryOptions) => {
    return checkDuplicate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicate
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2046
* @route '/rawat-jalan/surat-sakit/check-duplicate'
*/
checkDuplicate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkDuplicate.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicate
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2046
* @route '/rawat-jalan/surat-sakit/check-duplicate'
*/
checkDuplicate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkDuplicate.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::byNomor
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2108
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}'
*/
export const byNomor = (args: { no_surat: string | number } | [no_surat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byNomor.url(args, options),
    method: 'get',
})

byNomor.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit/nomor/{no_surat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::byNomor
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2108
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}'
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
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2108
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}'
*/
byNomor.get = (args: { no_surat: string | number } | [no_surat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byNomor.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::byNomor
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2108
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}'
*/
byNomor.head = (args: { no_surat: string | number } | [no_surat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byNomor.url(args, options),
    method: 'head',
})

/**
* @see routes/web.php:1479
* @route '/rawat-jalan/surat-sakit'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:1479
* @route '/rawat-jalan/surat-sakit'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:1479
* @route '/rawat-jalan/surat-sakit'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:1479
* @route '/rawat-jalan/surat-sakit'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1612
* @route '/rawat-jalan/surat-sakit'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-jalan/surat-sakit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1612
* @route '/rawat-jalan/surat-sakit'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1612
* @route '/rawat-jalan/surat-sakit'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const suratSakit = {
    store: Object.assign(store, store),
}

export default suratSakit