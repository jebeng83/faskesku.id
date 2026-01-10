import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\RawatJalan\ResepController::masterAturanPakai
* @see app/Http/Controllers/RawatJalan/ResepController.php:1128
* @route '/api/aturan-pakai'
*/
export const masterAturanPakai = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: masterAturanPakai.url(options),
    method: 'get',
})

masterAturanPakai.definition = {
    methods: ["get","head"],
    url: '/api/aturan-pakai',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::masterAturanPakai
* @see app/Http/Controllers/RawatJalan/ResepController.php:1128
* @route '/api/aturan-pakai'
*/
masterAturanPakai.url = (options?: RouteQueryOptions) => {
    return masterAturanPakai.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::masterAturanPakai
* @see app/Http/Controllers/RawatJalan/ResepController.php:1128
* @route '/api/aturan-pakai'
*/
masterAturanPakai.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: masterAturanPakai.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::masterAturanPakai
* @see app/Http/Controllers/RawatJalan/ResepController.php:1128
* @route '/api/aturan-pakai'
*/
masterAturanPakai.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: masterAturanPakai.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::createAturanPakai
* @see app/Http/Controllers/RawatJalan/ResepController.php:1161
* @route '/api/aturan-pakai/public-store'
*/
const createAturanPakai374ccfefb05fd1b966138257f3ff85d4 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createAturanPakai374ccfefb05fd1b966138257f3ff85d4.url(options),
    method: 'post',
})

createAturanPakai374ccfefb05fd1b966138257f3ff85d4.definition = {
    methods: ["post"],
    url: '/api/aturan-pakai/public-store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::createAturanPakai
* @see app/Http/Controllers/RawatJalan/ResepController.php:1161
* @route '/api/aturan-pakai/public-store'
*/
createAturanPakai374ccfefb05fd1b966138257f3ff85d4.url = (options?: RouteQueryOptions) => {
    return createAturanPakai374ccfefb05fd1b966138257f3ff85d4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::createAturanPakai
* @see app/Http/Controllers/RawatJalan/ResepController.php:1161
* @route '/api/aturan-pakai/public-store'
*/
createAturanPakai374ccfefb05fd1b966138257f3ff85d4.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createAturanPakai374ccfefb05fd1b966138257f3ff85d4.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::createAturanPakai
* @see app/Http/Controllers/RawatJalan/ResepController.php:1161
* @route '/api/aturan-pakai'
*/
const createAturanPakaia7bc10726b589e75b0cf5faa36c0ad0e = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createAturanPakaia7bc10726b589e75b0cf5faa36c0ad0e.url(options),
    method: 'post',
})

createAturanPakaia7bc10726b589e75b0cf5faa36c0ad0e.definition = {
    methods: ["post"],
    url: '/api/aturan-pakai',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::createAturanPakai
* @see app/Http/Controllers/RawatJalan/ResepController.php:1161
* @route '/api/aturan-pakai'
*/
createAturanPakaia7bc10726b589e75b0cf5faa36c0ad0e.url = (options?: RouteQueryOptions) => {
    return createAturanPakaia7bc10726b589e75b0cf5faa36c0ad0e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::createAturanPakai
* @see app/Http/Controllers/RawatJalan/ResepController.php:1161
* @route '/api/aturan-pakai'
*/
createAturanPakaia7bc10726b589e75b0cf5faa36c0ad0e.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createAturanPakaia7bc10726b589e75b0cf5faa36c0ad0e.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::createAturanPakai
* @see app/Http/Controllers/RawatJalan/ResepController.php:1161
* @route '/api/aturan-pakai/store'
*/
const createAturanPakai213b1574bb365761d9ad0fabfef9a35a = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createAturanPakai213b1574bb365761d9ad0fabfef9a35a.url(options),
    method: 'post',
})

createAturanPakai213b1574bb365761d9ad0fabfef9a35a.definition = {
    methods: ["post"],
    url: '/api/aturan-pakai/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::createAturanPakai
* @see app/Http/Controllers/RawatJalan/ResepController.php:1161
* @route '/api/aturan-pakai/store'
*/
createAturanPakai213b1574bb365761d9ad0fabfef9a35a.url = (options?: RouteQueryOptions) => {
    return createAturanPakai213b1574bb365761d9ad0fabfef9a35a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::createAturanPakai
* @see app/Http/Controllers/RawatJalan/ResepController.php:1161
* @route '/api/aturan-pakai/store'
*/
createAturanPakai213b1574bb365761d9ad0fabfef9a35a.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createAturanPakai213b1574bb365761d9ad0fabfef9a35a.url(options),
    method: 'post',
})

export const createAturanPakai = {
    '/api/aturan-pakai/public-store': createAturanPakai374ccfefb05fd1b966138257f3ff85d4,
    '/api/aturan-pakai': createAturanPakaia7bc10726b589e75b0cf5faa36c0ad0e,
    '/api/aturan-pakai/store': createAturanPakai213b1574bb365761d9ad0fabfef9a35a,
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
* @see app/Http/Controllers/RawatJalan/ResepController.php:25
* @route '/api/resep'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/resep',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
* @see app/Http/Controllers/RawatJalan/ResepController.php:25
* @route '/api/resep'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::store
* @see app/Http/Controllers/RawatJalan/ResepController.php:25
* @route '/api/resep'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::list
* @see app/Http/Controllers/RawatJalan/ResepController.php:963
* @route '/api/resep/list'
*/
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/api/resep/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::list
* @see app/Http/Controllers/RawatJalan/ResepController.php:963
* @route '/api/resep/list'
*/
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::list
* @see app/Http/Controllers/RawatJalan/ResepController.php:963
* @route '/api/resep/list'
*/
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::list
* @see app/Http/Controllers/RawatJalan/ResepController.php:963
* @route '/api/resep/list'
*/
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getStokInfo
* @see app/Http/Controllers/RawatJalan/ResepController.php:1285
* @route '/api/resep/stok-info'
*/
export const getStokInfo = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStokInfo.url(options),
    method: 'get',
})

getStokInfo.definition = {
    methods: ["get","head"],
    url: '/api/resep/stok-info',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getStokInfo
* @see app/Http/Controllers/RawatJalan/ResepController.php:1285
* @route '/api/resep/stok-info'
*/
getStokInfo.url = (options?: RouteQueryOptions) => {
    return getStokInfo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getStokInfo
* @see app/Http/Controllers/RawatJalan/ResepController.php:1285
* @route '/api/resep/stok-info'
*/
getStokInfo.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStokInfo.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getStokInfo
* @see app/Http/Controllers/RawatJalan/ResepController.php:1285
* @route '/api/resep/stok-info'
*/
getStokInfo.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStokInfo.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::generateQrCode
* @see app/Http/Controllers/RawatJalan/ResepController.php:1401
* @route '/api/resep/qrcode'
*/
export const generateQrCode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateQrCode.url(options),
    method: 'get',
})

generateQrCode.definition = {
    methods: ["get","head"],
    url: '/api/resep/qrcode',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::generateQrCode
* @see app/Http/Controllers/RawatJalan/ResepController.php:1401
* @route '/api/resep/qrcode'
*/
generateQrCode.url = (options?: RouteQueryOptions) => {
    return generateQrCode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::generateQrCode
* @see app/Http/Controllers/RawatJalan/ResepController.php:1401
* @route '/api/resep/qrcode'
*/
generateQrCode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateQrCode.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::generateQrCode
* @see app/Http/Controllers/RawatJalan/ResepController.php:1401
* @route '/api/resep/qrcode'
*/
generateQrCode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateQrCode.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getByNoRawat
* @see app/Http/Controllers/RawatJalan/ResepController.php:549
* @route '/api/resep/rawat/{no_rawat}'
*/
export const getByNoRawat = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByNoRawat.url(args, options),
    method: 'get',
})

getByNoRawat.definition = {
    methods: ["get","head"],
    url: '/api/resep/rawat/{no_rawat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getByNoRawat
* @see app/Http/Controllers/RawatJalan/ResepController.php:549
* @route '/api/resep/rawat/{no_rawat}'
*/
getByNoRawat.url = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getByNoRawat.definition.url
            .replace('{no_rawat}', parsedArgs.no_rawat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getByNoRawat
* @see app/Http/Controllers/RawatJalan/ResepController.php:549
* @route '/api/resep/rawat/{no_rawat}'
*/
getByNoRawat.get = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByNoRawat.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getByNoRawat
* @see app/Http/Controllers/RawatJalan/ResepController.php:549
* @route '/api/resep/rawat/{no_rawat}'
*/
getByNoRawat.head = (args: { no_rawat: string | number } | [no_rawat: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getByNoRawat.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getByNoRawatQuery
* @see app/Http/Controllers/RawatJalan/ResepController.php:604
* @route '/api/resep/rawat'
*/
export const getByNoRawatQuery = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByNoRawatQuery.url(options),
    method: 'get',
})

getByNoRawatQuery.definition = {
    methods: ["get","head"],
    url: '/api/resep/rawat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getByNoRawatQuery
* @see app/Http/Controllers/RawatJalan/ResepController.php:604
* @route '/api/resep/rawat'
*/
getByNoRawatQuery.url = (options?: RouteQueryOptions) => {
    return getByNoRawatQuery.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getByNoRawatQuery
* @see app/Http/Controllers/RawatJalan/ResepController.php:604
* @route '/api/resep/rawat'
*/
getByNoRawatQuery.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByNoRawatQuery.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getByNoRawatQuery
* @see app/Http/Controllers/RawatJalan/ResepController.php:604
* @route '/api/resep/rawat'
*/
getByNoRawatQuery.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getByNoRawatQuery.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getByNoRkmMedis
* @see app/Http/Controllers/RawatJalan/ResepController.php:620
* @route '/api/resep/pasien/{no_rkm_medis}'
*/
export const getByNoRkmMedis = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByNoRkmMedis.url(args, options),
    method: 'get',
})

getByNoRkmMedis.definition = {
    methods: ["get","head"],
    url: '/api/resep/pasien/{no_rkm_medis}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getByNoRkmMedis
* @see app/Http/Controllers/RawatJalan/ResepController.php:620
* @route '/api/resep/pasien/{no_rkm_medis}'
*/
getByNoRkmMedis.url = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_rkm_medis: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_rkm_medis: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_rkm_medis: args.no_rkm_medis,
    }

    return getByNoRkmMedis.definition.url
            .replace('{no_rkm_medis}', parsedArgs.no_rkm_medis.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getByNoRkmMedis
* @see app/Http/Controllers/RawatJalan/ResepController.php:620
* @route '/api/resep/pasien/{no_rkm_medis}'
*/
getByNoRkmMedis.get = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByNoRkmMedis.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getByNoRkmMedis
* @see app/Http/Controllers/RawatJalan/ResepController.php:620
* @route '/api/resep/pasien/{no_rkm_medis}'
*/
getByNoRkmMedis.head = (args: { no_rkm_medis: string | number } | [no_rkm_medis: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getByNoRkmMedis.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getResep
* @see app/Http/Controllers/RawatJalan/ResepController.php:706
* @route '/api/resep/{no_resep}'
*/
export const getResep = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getResep.url(args, options),
    method: 'get',
})

getResep.definition = {
    methods: ["get","head"],
    url: '/api/resep/{no_resep}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getResep
* @see app/Http/Controllers/RawatJalan/ResepController.php:706
* @route '/api/resep/{no_resep}'
*/
getResep.url = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_resep: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_resep: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_resep: args.no_resep,
    }

    return getResep.definition.url
            .replace('{no_resep}', parsedArgs.no_resep.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getResep
* @see app/Http/Controllers/RawatJalan/ResepController.php:706
* @route '/api/resep/{no_resep}'
*/
getResep.get = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getResep.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::getResep
* @see app/Http/Controllers/RawatJalan/ResepController.php:706
* @route '/api/resep/{no_resep}'
*/
getResep.head = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getResep.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::destroy
* @see app/Http/Controllers/RawatJalan/ResepController.php:1359
* @route '/api/resep/{no_resep}'
*/
export const destroy = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/resep/{no_resep}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::destroy
* @see app/Http/Controllers/RawatJalan/ResepController.php:1359
* @route '/api/resep/{no_resep}'
*/
destroy.url = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_resep: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_resep: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_resep: args.no_resep,
    }

    return destroy.definition.url
            .replace('{no_resep}', parsedArgs.no_resep.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::destroy
* @see app/Http/Controllers/RawatJalan/ResepController.php:1359
* @route '/api/resep/{no_resep}'
*/
destroy.delete = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::validasi
* @see app/Http/Controllers/RawatJalan/ResepController.php:189
* @route '/api/resep/{no_resep}/validasi'
*/
export const validasi = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validasi.url(args, options),
    method: 'post',
})

validasi.definition = {
    methods: ["post"],
    url: '/api/resep/{no_resep}/validasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::validasi
* @see app/Http/Controllers/RawatJalan/ResepController.php:189
* @route '/api/resep/{no_resep}/validasi'
*/
validasi.url = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_resep: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_resep: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_resep: args.no_resep,
    }

    return validasi.definition.url
            .replace('{no_resep}', parsedArgs.no_resep.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::validasi
* @see app/Http/Controllers/RawatJalan/ResepController.php:189
* @route '/api/resep/{no_resep}/validasi'
*/
validasi.post = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validasi.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::penyerahan
* @see app/Http/Controllers/RawatJalan/ResepController.php:256
* @route '/api/resep/{no_resep}/penyerahan'
*/
export const penyerahan = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: penyerahan.url(args, options),
    method: 'post',
})

penyerahan.definition = {
    methods: ["post"],
    url: '/api/resep/{no_resep}/penyerahan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::penyerahan
* @see app/Http/Controllers/RawatJalan/ResepController.php:256
* @route '/api/resep/{no_resep}/penyerahan'
*/
penyerahan.url = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_resep: args }
    }

    if (Array.isArray(args)) {
        args = {
            no_resep: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        no_resep: args.no_resep,
    }

    return penyerahan.definition.url
            .replace('{no_resep}', parsedArgs.no_resep.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RawatJalan\ResepController::penyerahan
* @see app/Http/Controllers/RawatJalan/ResepController.php:256
* @route '/api/resep/{no_resep}/penyerahan'
*/
penyerahan.post = (args: { no_resep: string | number } | [no_resep: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: penyerahan.url(args, options),
    method: 'post',
})

const ResepController = { masterAturanPakai, createAturanPakai, store, list, getStokInfo, generateQrCode, getByNoRawat, getByNoRawatQuery, getByNoRkmMedis, getResep, destroy, validasi, penyerahan }

export default ResepController