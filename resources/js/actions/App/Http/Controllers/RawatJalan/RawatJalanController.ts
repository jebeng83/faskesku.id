import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getDiagnosaPasien
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:822
* @route '/api/rawat-jalan/diagnosa'
*/
export const getDiagnosaPasien = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDiagnosaPasien.url(options),
    method: 'get',
})

getDiagnosaPasien.definition = {
    methods: ["get","head"],
    url: '/api/rawat-jalan/diagnosa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getDiagnosaPasien
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:822
* @route '/api/rawat-jalan/diagnosa'
*/
getDiagnosaPasien.url = (options?: RouteQueryOptions) => {
    return getDiagnosaPasien.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getDiagnosaPasien
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:822
* @route '/api/rawat-jalan/diagnosa'
*/
getDiagnosaPasien.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDiagnosaPasien.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getDiagnosaPasien
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:822
* @route '/api/rawat-jalan/diagnosa'
*/
getDiagnosaPasien.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDiagnosaPasien.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::storeDiagnosaPasien
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:855
* @route '/api/rawat-jalan/diagnosa'
*/
export const storeDiagnosaPasien = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDiagnosaPasien.url(options),
    method: 'post',
})

storeDiagnosaPasien.definition = {
    methods: ["post"],
    url: '/api/rawat-jalan/diagnosa',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::storeDiagnosaPasien
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:855
* @route '/api/rawat-jalan/diagnosa'
*/
storeDiagnosaPasien.url = (options?: RouteQueryOptions) => {
    return storeDiagnosaPasien.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::storeDiagnosaPasien
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:855
* @route '/api/rawat-jalan/diagnosa'
*/
storeDiagnosaPasien.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDiagnosaPasien.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::publicSuratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1211
* @route '/surat-sehat'
*/
export const publicSuratSehat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicSuratSehat.url(options),
    method: 'get',
})

publicSuratSehat.definition = {
    methods: ["get","head"],
    url: '/surat-sehat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::publicSuratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1211
* @route '/surat-sehat'
*/
publicSuratSehat.url = (options?: RouteQueryOptions) => {
    return publicSuratSehat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::publicSuratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1211
* @route '/surat-sehat'
*/
publicSuratSehat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicSuratSehat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::publicSuratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1211
* @route '/surat-sehat'
*/
publicSuratSehat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicSuratSehat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::publicSuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1319
* @route '/surat-sakit'
*/
export const publicSuratSakit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicSuratSakit.url(options),
    method: 'get',
})

publicSuratSakit.definition = {
    methods: ["get","head"],
    url: '/surat-sakit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::publicSuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1319
* @route '/surat-sakit'
*/
publicSuratSakit.url = (options?: RouteQueryOptions) => {
    return publicSuratSakit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::publicSuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1319
* @route '/surat-sakit'
*/
publicSuratSakit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicSuratSakit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::publicSuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1319
* @route '/surat-sakit'
*/
publicSuratSakit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicSuratSakit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::verifySuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1751
* @route '/rawat-jalan/surat-sakit/{no_rawat}/verify'
*/
export const verifySuratSakit = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verifySuratSakit.url(args, options),
    method: 'get',
})

verifySuratSakit.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit/{no_rawat}/verify',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::verifySuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1751
* @route '/rawat-jalan/surat-sakit/{no_rawat}/verify'
*/
verifySuratSakit.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return verifySuratSakit.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::verifySuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1751
* @route '/rawat-jalan/surat-sakit/{no_rawat}/verify'
*/
verifySuratSakit.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verifySuratSakit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::verifySuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1751
* @route '/rawat-jalan/surat-sakit/{no_rawat}/verify'
*/
verifySuratSakit.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verifySuratSakit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1904
* @route '/rawat-jalan/surat-sakit/next-no-surat'
*/
export const nextNoSuratSakit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextNoSuratSakit.url(options),
    method: 'get',
})

nextNoSuratSakit.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit/next-no-surat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1904
* @route '/rawat-jalan/surat-sakit/next-no-surat'
*/
nextNoSuratSakit.url = (options?: RouteQueryOptions) => {
    return nextNoSuratSakit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1904
* @route '/rawat-jalan/surat-sakit/next-no-surat'
*/
nextNoSuratSakit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextNoSuratSakit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1904
* @route '/rawat-jalan/surat-sakit/next-no-surat'
*/
nextNoSuratSakit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nextNoSuratSakit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicateSuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1989
* @route '/rawat-jalan/surat-sakit/check-duplicate'
*/
export const checkDuplicateSuratSakit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkDuplicateSuratSakit.url(options),
    method: 'get',
})

checkDuplicateSuratSakit.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit/check-duplicate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicateSuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1989
* @route '/rawat-jalan/surat-sakit/check-duplicate'
*/
checkDuplicateSuratSakit.url = (options?: RouteQueryOptions) => {
    return checkDuplicateSuratSakit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicateSuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1989
* @route '/rawat-jalan/surat-sakit/check-duplicate'
*/
checkDuplicateSuratSakit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkDuplicateSuratSakit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicateSuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1989
* @route '/rawat-jalan/surat-sakit/check-duplicate'
*/
checkDuplicateSuratSakit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkDuplicateSuratSakit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSuratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1954
* @route '/rawat-jalan/surat-sehat/next-no-surat'
*/
export const nextNoSuratSehat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextNoSuratSehat.url(options),
    method: 'get',
})

nextNoSuratSehat.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sehat/next-no-surat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSuratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1954
* @route '/rawat-jalan/surat-sehat/next-no-surat'
*/
nextNoSuratSehat.url = (options?: RouteQueryOptions) => {
    return nextNoSuratSehat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSuratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1954
* @route '/rawat-jalan/surat-sehat/next-no-surat'
*/
nextNoSuratSehat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nextNoSuratSehat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::nextNoSuratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1954
* @route '/rawat-jalan/surat-sehat/next-no-surat'
*/
nextNoSuratSehat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nextNoSuratSehat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicateSuratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2020
* @route '/rawat-jalan/surat-sehat/check-duplicate'
*/
export const checkDuplicateSuratSehat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkDuplicateSuratSehat.url(options),
    method: 'get',
})

checkDuplicateSuratSehat.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sehat/check-duplicate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicateSuratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2020
* @route '/rawat-jalan/surat-sehat/check-duplicate'
*/
checkDuplicateSuratSehat.url = (options?: RouteQueryOptions) => {
    return checkDuplicateSuratSehat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicateSuratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2020
* @route '/rawat-jalan/surat-sehat/check-duplicate'
*/
checkDuplicateSuratSehat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkDuplicateSuratSehat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::checkDuplicateSuratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2020
* @route '/rawat-jalan/surat-sehat/check-duplicate'
*/
checkDuplicateSuratSehat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkDuplicateSuratSehat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSakitByNomor
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2051
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}'
*/
export const suratSakitByNomor = (args: { no_surat: string | number } | [no_surat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suratSakitByNomor.url(args, options),
    method: 'get',
})

suratSakitByNomor.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit/nomor/{no_surat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSakitByNomor
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2051
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}'
*/
suratSakitByNomor.url = (args: { no_surat: string | number } | [no_surat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return suratSakitByNomor.definition.url
            .replace('{no_surat}', parsedArgs.no_surat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSakitByNomor
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2051
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}'
*/
suratSakitByNomor.get = (args: { no_surat: string | number } | [no_surat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suratSakitByNomor.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSakitByNomor
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2051
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}'
*/
suratSakitByNomor.head = (args: { no_surat: string | number } | [no_surat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: suratSakitByNomor.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::verifySuratSakitByNomor
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2122
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}/verify'
*/
export const verifySuratSakitByNomor = (args: { no_surat: string | number } | [no_surat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verifySuratSakitByNomor.url(args, options),
    method: 'get',
})

verifySuratSakitByNomor.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit/nomor/{no_surat}/verify',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::verifySuratSakitByNomor
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2122
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}/verify'
*/
verifySuratSakitByNomor.url = (args: { no_surat: string | number } | [no_surat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return verifySuratSakitByNomor.definition.url
            .replace('{no_surat}', parsedArgs.no_surat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::verifySuratSakitByNomor
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2122
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}/verify'
*/
verifySuratSakitByNomor.get = (args: { no_surat: string | number } | [no_surat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verifySuratSakitByNomor.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::verifySuratSakitByNomor
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2122
* @route '/rawat-jalan/surat-sakit/nomor/{no_surat}/verify'
*/
verifySuratSakitByNomor.head = (args: { no_surat: string | number } | [no_surat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verifySuratSakitByNomor.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::storeValidasiTtd
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2136
* @route '/rawat-jalan/validasi-ttd'
*/
export const storeValidasiTtd = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeValidasiTtd.url(options),
    method: 'post',
})

storeValidasiTtd.definition = {
    methods: ["post"],
    url: '/rawat-jalan/validasi-ttd',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::storeValidasiTtd
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2136
* @route '/rawat-jalan/validasi-ttd'
*/
storeValidasiTtd.url = (options?: RouteQueryOptions) => {
    return storeValidasiTtd.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::storeValidasiTtd
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2136
* @route '/rawat-jalan/validasi-ttd'
*/
storeValidasiTtd.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeValidasiTtd.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::describeValidasiTtd
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2252
* @route '/rawat-jalan/validasi-ttd/describe'
*/
export const describeValidasiTtd = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describeValidasiTtd.url(options),
    method: 'get',
})

describeValidasiTtd.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/validasi-ttd/describe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::describeValidasiTtd
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2252
* @route '/rawat-jalan/validasi-ttd/describe'
*/
describeValidasiTtd.url = (options?: RouteQueryOptions) => {
    return describeValidasiTtd.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::describeValidasiTtd
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2252
* @route '/rawat-jalan/validasi-ttd/describe'
*/
describeValidasiTtd.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: describeValidasiTtd.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::describeValidasiTtd
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2252
* @route '/rawat-jalan/validasi-ttd/describe'
*/
describeValidasiTtd.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: describeValidasiTtd.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::findValidasiTtd
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2267
* @route '/rawat-jalan/validasi-ttd/find'
*/
export const findValidasiTtd = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: findValidasiTtd.url(options),
    method: 'get',
})

findValidasiTtd.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/validasi-ttd/find',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::findValidasiTtd
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2267
* @route '/rawat-jalan/validasi-ttd/find'
*/
findValidasiTtd.url = (options?: RouteQueryOptions) => {
    return findValidasiTtd.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::findValidasiTtd
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2267
* @route '/rawat-jalan/validasi-ttd/find'
*/
findValidasiTtd.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: findValidasiTtd.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::findValidasiTtd
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:2267
* @route '/rawat-jalan/validasi-ttd/find'
*/
findValidasiTtd.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: findValidasiTtd.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::lanjutan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:219
* @route '/rawat-jalan/lanjutan'
*/
export const lanjutan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lanjutan.url(options),
    method: 'get',
})

lanjutan.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/lanjutan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::lanjutan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:219
* @route '/rawat-jalan/lanjutan'
*/
lanjutan.url = (options?: RouteQueryOptions) => {
    return lanjutan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::lanjutan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:219
* @route '/rawat-jalan/lanjutan'
*/
lanjutan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lanjutan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::lanjutan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:219
* @route '/rawat-jalan/lanjutan'
*/
lanjutan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lanjutan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::index
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:23
* @route '/rawat-jalan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::index
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:23
* @route '/rawat-jalan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::index
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:23
* @route '/rawat-jalan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::index
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:23
* @route '/rawat-jalan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::riwayat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:295
* @route '/rawat-jalan/riwayat'
*/
export const riwayat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(options),
    method: 'get',
})

riwayat.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/riwayat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::riwayat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:295
* @route '/rawat-jalan/riwayat'
*/
riwayat.url = (options?: RouteQueryOptions) => {
    return riwayat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::riwayat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:295
* @route '/rawat-jalan/riwayat'
*/
riwayat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::riwayat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:295
* @route '/rawat-jalan/riwayat'
*/
riwayat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getRiwayatPemeriksaan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:339
* @route '/rawat-jalan/riwayat-pemeriksaan'
*/
export const getRiwayatPemeriksaan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayatPemeriksaan.url(options),
    method: 'get',
})

getRiwayatPemeriksaan.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/riwayat-pemeriksaan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getRiwayatPemeriksaan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:339
* @route '/rawat-jalan/riwayat-pemeriksaan'
*/
getRiwayatPemeriksaan.url = (options?: RouteQueryOptions) => {
    return getRiwayatPemeriksaan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getRiwayatPemeriksaan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:339
* @route '/rawat-jalan/riwayat-pemeriksaan'
*/
getRiwayatPemeriksaan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRiwayatPemeriksaan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getRiwayatPemeriksaan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:339
* @route '/rawat-jalan/riwayat-pemeriksaan'
*/
getRiwayatPemeriksaan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRiwayatPemeriksaan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::pemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:380
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
export const pemeriksaanRalan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pemeriksaanRalan.url(options),
    method: 'get',
})

pemeriksaanRalan.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::pemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:380
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
pemeriksaanRalan.url = (options?: RouteQueryOptions) => {
    return pemeriksaanRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::pemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:380
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
pemeriksaanRalan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pemeriksaanRalan.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::pemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:380
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
pemeriksaanRalan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pemeriksaanRalan.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::storePemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:560
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
export const storePemeriksaanRalan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePemeriksaanRalan.url(options),
    method: 'post',
})

storePemeriksaanRalan.definition = {
    methods: ["post"],
    url: '/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::storePemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:560
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
storePemeriksaanRalan.url = (options?: RouteQueryOptions) => {
    return storePemeriksaanRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::storePemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:560
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
storePemeriksaanRalan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePemeriksaanRalan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::deletePemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:676
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
export const deletePemeriksaanRalan = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePemeriksaanRalan.url(options),
    method: 'delete',
})

deletePemeriksaanRalan.definition = {
    methods: ["delete"],
    url: '/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::deletePemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:676
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
deletePemeriksaanRalan.url = (options?: RouteQueryOptions) => {
    return deletePemeriksaanRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::deletePemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:676
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
deletePemeriksaanRalan.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePemeriksaanRalan.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::updatePemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:700
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
export const updatePemeriksaanRalan = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePemeriksaanRalan.url(options),
    method: 'put',
})

updatePemeriksaanRalan.definition = {
    methods: ["put"],
    url: '/rawat-jalan/pemeriksaan-ralan',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::updatePemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:700
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
updatePemeriksaanRalan.url = (options?: RouteQueryOptions) => {
    return updatePemeriksaanRalan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::updatePemeriksaanRalan
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:700
* @route '/rawat-jalan/pemeriksaan-ralan'
*/
updatePemeriksaanRalan.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePemeriksaanRalan.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getobatRalanPublic
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:538
* @route '/rawat-jalan/obat-ralan/{no_rawat}'
*/
export const getobatRalanPublic = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getobatRalanPublic.url(args, options),
    method: 'get',
})

getobatRalanPublic.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/obat-ralan/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getobatRalanPublic
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:538
* @route '/rawat-jalan/obat-ralan/{no_rawat}'
*/
getobatRalanPublic.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getobatRalanPublic.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getobatRalanPublic
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:538
* @route '/rawat-jalan/obat-ralan/{no_rawat}'
*/
getobatRalanPublic.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getobatRalanPublic.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getobatRalanPublic
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:538
* @route '/rawat-jalan/obat-ralan/{no_rawat}'
*/
getobatRalanPublic.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getobatRalanPublic.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getPemeriksaanLabPublic
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:459
* @route '/rawat-jalan/lab/{no_rawat}'
*/
export const getPemeriksaanLabPublic = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPemeriksaanLabPublic.url(args, options),
    method: 'get',
})

getPemeriksaanLabPublic.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/lab/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getPemeriksaanLabPublic
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:459
* @route '/rawat-jalan/lab/{no_rawat}'
*/
getPemeriksaanLabPublic.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getPemeriksaanLabPublic.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getPemeriksaanLabPublic
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:459
* @route '/rawat-jalan/lab/{no_rawat}'
*/
getPemeriksaanLabPublic.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPemeriksaanLabPublic.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getPemeriksaanLabPublic
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:459
* @route '/rawat-jalan/lab/{no_rawat}'
*/
getPemeriksaanLabPublic.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPemeriksaanLabPublic.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getRadiologiPublic
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:528
* @route '/rawat-jalan/radiologi/{no_rawat}'
*/
export const getRadiologiPublic = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRadiologiPublic.url(args, options),
    method: 'get',
})

getRadiologiPublic.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/radiologi/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getRadiologiPublic
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:528
* @route '/rawat-jalan/radiologi/{no_rawat}'
*/
getRadiologiPublic.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getRadiologiPublic.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getRadiologiPublic
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:528
* @route '/rawat-jalan/radiologi/{no_rawat}'
*/
getRadiologiPublic.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRadiologiPublic.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getRadiologiPublic
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:528
* @route '/rawat-jalan/radiologi/{no_rawat}'
*/
getRadiologiPublic.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRadiologiPublic.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::searchPegawai
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:937
* @route '/pegawai/search'
*/
export const searchPegawai = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchPegawai.url(options),
    method: 'get',
})

searchPegawai.definition = {
    methods: ["get","head"],
    url: '/pegawai/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::searchPegawai
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:937
* @route '/pegawai/search'
*/
searchPegawai.url = (options?: RouteQueryOptions) => {
    return searchPegawai.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::searchPegawai
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:937
* @route '/pegawai/search'
*/
searchPegawai.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchPegawai.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::searchPegawai
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:937
* @route '/pegawai/search'
*/
searchPegawai.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchPegawai.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getStatistics
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:0
* @route '/rawat-jalan-statistics'
*/
export const getStatistics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatistics.url(options),
    method: 'get',
})

getStatistics.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan-statistics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getStatistics
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:0
* @route '/rawat-jalan-statistics'
*/
getStatistics.url = (options?: RouteQueryOptions) => {
    return getStatistics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getStatistics
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:0
* @route '/rawat-jalan-statistics'
*/
getStatistics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatistics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::getStatistics
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:0
* @route '/rawat-jalan-statistics'
*/
getStatistics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStatistics.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1159
* @route '/rawat-jalan/surat-sehat/{no_rawat}'
*/
export const suratSehat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suratSehat.url(args, options),
    method: 'get',
})

suratSehat.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sehat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1159
* @route '/rawat-jalan/surat-sehat/{no_rawat}'
*/
suratSehat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return suratSehat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1159
* @route '/rawat-jalan/surat-sehat/{no_rawat}'
*/
suratSehat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suratSehat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1159
* @route '/rawat-jalan/surat-sehat/{no_rawat}'
*/
suratSehat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: suratSehat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::storeSuratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1450
* @route '/rawat-jalan/surat-sehat'
*/
export const storeSuratSehat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSuratSehat.url(options),
    method: 'post',
})

storeSuratSehat.definition = {
    methods: ["post"],
    url: '/rawat-jalan/surat-sehat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::storeSuratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1450
* @route '/rawat-jalan/surat-sehat'
*/
storeSuratSehat.url = (options?: RouteQueryOptions) => {
    return storeSuratSehat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::storeSuratSehat
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1450
* @route '/rawat-jalan/surat-sehat'
*/
storeSuratSehat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSuratSehat.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1494
* @route '/rawat-jalan/surat-sakit/{no_rawat}'
*/
export const suratSakit = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suratSakit.url(args, options),
    method: 'get',
})

suratSakit.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/surat-sakit/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1494
* @route '/rawat-jalan/surat-sakit/{no_rawat}'
*/
suratSakit.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return suratSakit.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1494
* @route '/rawat-jalan/surat-sakit/{no_rawat}'
*/
suratSakit.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suratSakit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::suratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1494
* @route '/rawat-jalan/surat-sakit/{no_rawat}'
*/
suratSakit.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: suratSakit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::storeSuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1555
* @route '/rawat-jalan/surat-sakit'
*/
export const storeSuratSakit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSuratSakit.url(options),
    method: 'post',
})

storeSuratSakit.definition = {
    methods: ["post"],
    url: '/rawat-jalan/surat-sakit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::storeSuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1555
* @route '/rawat-jalan/surat-sakit'
*/
storeSuratSakit.url = (options?: RouteQueryOptions) => {
    return storeSuratSakit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::storeSuratSakit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1555
* @route '/rawat-jalan/surat-sakit'
*/
storeSuratSakit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSuratSakit.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::create
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:144
* @route '/rawat-jalan/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::create
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:144
* @route '/rawat-jalan/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::create
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:144
* @route '/rawat-jalan/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::create
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:144
* @route '/rawat-jalan/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:957
* @route '/rawat-jalan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rawat-jalan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:957
* @route '/rawat-jalan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::store
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:957
* @route '/rawat-jalan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::show
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1025
* @route '/rawat-jalan/{rawat_jalan}'
*/
export const show = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/{rawat_jalan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::show
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1025
* @route '/rawat-jalan/{rawat_jalan}'
*/
show.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_jalan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_jalan: args.rawat_jalan,
    }

    return show.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::show
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1025
* @route '/rawat-jalan/{rawat_jalan}'
*/
show.get = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::show
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1025
* @route '/rawat-jalan/{rawat_jalan}'
*/
show.head = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::edit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1037
* @route '/rawat-jalan/{rawat_jalan}/edit'
*/
export const edit = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/rawat-jalan/{rawat_jalan}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::edit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1037
* @route '/rawat-jalan/{rawat_jalan}/edit'
*/
edit.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_jalan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_jalan: args.rawat_jalan,
    }

    return edit.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::edit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1037
* @route '/rawat-jalan/{rawat_jalan}/edit'
*/
edit.get = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::edit
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1037
* @route '/rawat-jalan/{rawat_jalan}/edit'
*/
edit.head = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::update
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1113
* @route '/rawat-jalan/{rawat_jalan}'
*/
export const update = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/rawat-jalan/{rawat_jalan}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::update
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1113
* @route '/rawat-jalan/{rawat_jalan}'
*/
update.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_jalan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_jalan: args.rawat_jalan,
    }

    return update.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::update
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1113
* @route '/rawat-jalan/{rawat_jalan}'
*/
update.put = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::update
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1113
* @route '/rawat-jalan/{rawat_jalan}'
*/
update.patch = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::destroy
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1148
* @route '/rawat-jalan/{rawat_jalan}'
*/
export const destroy = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/rawat-jalan/{rawat_jalan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::destroy
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1148
* @route '/rawat-jalan/{rawat_jalan}'
*/
destroy.url = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rawat_jalan: args }
    }

    if (Array.isArray(args)) {
        args = {
            rawat_jalan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        rawat_jalan: args.rawat_jalan,
    }

    return destroy.definition.url
            .replace('{rawat_jalan}', parsedArgs.rawat_jalan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\RawatJalanController::destroy
* @see app/Http/Controllers/RawatJalan/RawatJalanController.php:1148
* @route '/rawat-jalan/{rawat_jalan}'
*/
destroy.delete = (args: { rawat_jalan: string | number } | [rawat_jalan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const RawatJalanController = { getDiagnosaPasien, storeDiagnosaPasien, publicSuratSehat, publicSuratSakit, verifySuratSakit, nextNoSuratSakit, checkDuplicateSuratSakit, nextNoSuratSehat, checkDuplicateSuratSehat, suratSakitByNomor, verifySuratSakitByNomor, storeValidasiTtd, describeValidasiTtd, findValidasiTtd, lanjutan, index, riwayat, getRiwayatPemeriksaan, pemeriksaanRalan, storePemeriksaanRalan, deletePemeriksaanRalan, updatePemeriksaanRalan, getobatRalanPublic, getPemeriksaanLabPublic, getRadiologiPublic, searchPegawai, getStatistics, suratSehat, storeSuratSehat, suratSakit, storeSuratSakit, create, store, show, edit, update, destroy }

export default RawatJalanController