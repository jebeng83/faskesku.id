import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::storePenjualanPerBarang
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:291
* @route '/farmasi/set-penjualan-barang'
*/
export const storePenjualanPerBarang = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePenjualanPerBarang.url(options),
    method: 'post',
})

storePenjualanPerBarang.definition = {
    methods: ["post"],
    url: '/farmasi/set-penjualan-barang',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::storePenjualanPerBarang
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:291
* @route '/farmasi/set-penjualan-barang'
*/
storePenjualanPerBarang.url = (options?: RouteQueryOptions) => {
    return storePenjualanPerBarang.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::storePenjualanPerBarang
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:291
* @route '/farmasi/set-penjualan-barang'
*/
storePenjualanPerBarang.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePenjualanPerBarang.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::showPenjualanPerBarang
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:361
* @route '/farmasi/set-penjualan-barang/{kode_brng}'
*/
export const showPenjualanPerBarang = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPenjualanPerBarang.url(args, options),
    method: 'get',
})

showPenjualanPerBarang.definition = {
    methods: ["get","head"],
    url: '/farmasi/set-penjualan-barang/{kode_brng}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::showPenjualanPerBarang
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:361
* @route '/farmasi/set-penjualan-barang/{kode_brng}'
*/
showPenjualanPerBarang.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_brng: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_brng: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_brng: args.kode_brng,
    }

    return showPenjualanPerBarang.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::showPenjualanPerBarang
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:361
* @route '/farmasi/set-penjualan-barang/{kode_brng}'
*/
showPenjualanPerBarang.get = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPenjualanPerBarang.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::showPenjualanPerBarang
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:361
* @route '/farmasi/set-penjualan-barang/{kode_brng}'
*/
showPenjualanPerBarang.head = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showPenjualanPerBarang.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::destroyPenjualanPerBarang
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:347
* @route '/farmasi/set-penjualan-barang/{kode_brng}'
*/
export const destroyPenjualanPerBarang = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyPenjualanPerBarang.url(args, options),
    method: 'delete',
})

destroyPenjualanPerBarang.definition = {
    methods: ["delete"],
    url: '/farmasi/set-penjualan-barang/{kode_brng}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::destroyPenjualanPerBarang
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:347
* @route '/farmasi/set-penjualan-barang/{kode_brng}'
*/
destroyPenjualanPerBarang.url = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kode_brng: args }
    }

    if (Array.isArray(args)) {
        args = {
            kode_brng: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kode_brng: args.kode_brng,
    }

    return destroyPenjualanPerBarang.definition.url
            .replace('{kode_brng}', parsedArgs.kode_brng.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::destroyPenjualanPerBarang
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:347
* @route '/farmasi/set-penjualan-barang/{kode_brng}'
*/
destroyPenjualanPerBarang.delete = (args: { kode_brng: string | number } | [kode_brng: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyPenjualanPerBarang.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::showPenjualanUmum
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:404
* @route '/farmasi/set-penjualan-umum'
*/
export const showPenjualanUmum = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPenjualanUmum.url(options),
    method: 'get',
})

showPenjualanUmum.definition = {
    methods: ["get","head"],
    url: '/farmasi/set-penjualan-umum',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::showPenjualanUmum
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:404
* @route '/farmasi/set-penjualan-umum'
*/
showPenjualanUmum.url = (options?: RouteQueryOptions) => {
    return showPenjualanUmum.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::showPenjualanUmum
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:404
* @route '/farmasi/set-penjualan-umum'
*/
showPenjualanUmum.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPenjualanUmum.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::showPenjualanUmum
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:404
* @route '/farmasi/set-penjualan-umum'
*/
showPenjualanUmum.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showPenjualanUmum.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::showPenjualanPerJenis
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:451
* @route '/farmasi/set-penjualan/{kdjns}'
*/
export const showPenjualanPerJenis = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPenjualanPerJenis.url(args, options),
    method: 'get',
})

showPenjualanPerJenis.definition = {
    methods: ["get","head"],
    url: '/farmasi/set-penjualan/{kdjns}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::showPenjualanPerJenis
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:451
* @route '/farmasi/set-penjualan/{kdjns}'
*/
showPenjualanPerJenis.url = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kdjns: args }
    }

    if (Array.isArray(args)) {
        args = {
            kdjns: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kdjns: args.kdjns,
    }

    return showPenjualanPerJenis.definition.url
            .replace('{kdjns}', parsedArgs.kdjns.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::showPenjualanPerJenis
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:451
* @route '/farmasi/set-penjualan/{kdjns}'
*/
showPenjualanPerJenis.get = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPenjualanPerJenis.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::showPenjualanPerJenis
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:451
* @route '/farmasi/set-penjualan/{kdjns}'
*/
showPenjualanPerJenis.head = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showPenjualanPerJenis.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::getPercentageData
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:499
* @route '/farmasi/set-harga-obat/json'
*/
export const getPercentageData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPercentageData.url(options),
    method: 'get',
})

getPercentageData.definition = {
    methods: ["get","head"],
    url: '/farmasi/set-harga-obat/json',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::getPercentageData
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:499
* @route '/farmasi/set-harga-obat/json'
*/
getPercentageData.url = (options?: RouteQueryOptions) => {
    return getPercentageData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::getPercentageData
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:499
* @route '/farmasi/set-harga-obat/json'
*/
getPercentageData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPercentageData.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::getPercentageData
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:499
* @route '/farmasi/set-harga-obat/json'
*/
getPercentageData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPercentageData.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::index
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:18
* @route '/farmasi/set-harga-obat'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/set-harga-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::index
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:18
* @route '/farmasi/set-harga-obat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::index
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:18
* @route '/farmasi/set-harga-obat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::index
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:18
* @route '/farmasi/set-harga-obat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::update
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:108
* @route '/farmasi/set-harga-obat'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/farmasi/set-harga-obat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::update
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:108
* @route '/farmasi/set-harga-obat'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::update
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:108
* @route '/farmasi/set-harga-obat'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::updatePenjualanUmum
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:175
* @route '/farmasi/set-penjualan-umum'
*/
export const updatePenjualanUmum = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePenjualanUmum.url(options),
    method: 'post',
})

updatePenjualanUmum.definition = {
    methods: ["post"],
    url: '/farmasi/set-penjualan-umum',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::updatePenjualanUmum
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:175
* @route '/farmasi/set-penjualan-umum'
*/
updatePenjualanUmum.url = (options?: RouteQueryOptions) => {
    return updatePenjualanUmum.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::updatePenjualanUmum
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:175
* @route '/farmasi/set-penjualan-umum'
*/
updatePenjualanUmum.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePenjualanUmum.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::storePenjualanPerJenis
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:223
* @route '/farmasi/set-penjualan'
*/
export const storePenjualanPerJenis = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePenjualanPerJenis.url(options),
    method: 'post',
})

storePenjualanPerJenis.definition = {
    methods: ["post"],
    url: '/farmasi/set-penjualan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::storePenjualanPerJenis
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:223
* @route '/farmasi/set-penjualan'
*/
storePenjualanPerJenis.url = (options?: RouteQueryOptions) => {
    return storePenjualanPerJenis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::storePenjualanPerJenis
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:223
* @route '/farmasi/set-penjualan'
*/
storePenjualanPerJenis.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePenjualanPerJenis.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::destroyPenjualanPerJenis
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:276
* @route '/farmasi/set-penjualan/{kdjns}'
*/
export const destroyPenjualanPerJenis = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyPenjualanPerJenis.url(args, options),
    method: 'delete',
})

destroyPenjualanPerJenis.definition = {
    methods: ["delete"],
    url: '/farmasi/set-penjualan/{kdjns}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::destroyPenjualanPerJenis
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:276
* @route '/farmasi/set-penjualan/{kdjns}'
*/
destroyPenjualanPerJenis.url = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kdjns: args }
    }

    if (Array.isArray(args)) {
        args = {
            kdjns: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kdjns: args.kdjns,
    }

    return destroyPenjualanPerJenis.definition.url
            .replace('{kdjns}', parsedArgs.kdjns.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SetHargaObatController::destroyPenjualanPerJenis
* @see app/Http/Controllers/Farmasi/SetHargaObatController.php:276
* @route '/farmasi/set-penjualan/{kdjns}'
*/
destroyPenjualanPerJenis.delete = (args: { kdjns: string | number } | [kdjns: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyPenjualanPerJenis.url(args, options),
    method: 'delete',
})

const SetHargaObatController = { storePenjualanPerBarang, showPenjualanPerBarang, destroyPenjualanPerBarang, showPenjualanUmum, showPenjualanPerJenis, getPercentageData, index, update, updatePenjualanUmum, storePenjualanPerJenis, destroyPenjualanPerJenis }

export default SetHargaObatController