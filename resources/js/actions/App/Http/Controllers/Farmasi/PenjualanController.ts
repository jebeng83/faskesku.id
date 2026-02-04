import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::index
* @see app/Http/Controllers/Farmasi/PenjualanController.php:16
* @route '/farmasi/penjualan-obat'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/farmasi/penjualan-obat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::index
* @see app/Http/Controllers/Farmasi/PenjualanController.php:16
* @route '/farmasi/penjualan-obat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::index
* @see app/Http/Controllers/Farmasi/PenjualanController.php:16
* @route '/farmasi/penjualan-obat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::index
* @see app/Http/Controllers/Farmasi/PenjualanController.php:16
* @route '/farmasi/penjualan-obat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::store
* @see app/Http/Controllers/Farmasi/PenjualanController.php:162
* @route '/farmasi/penjualan/simpan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/farmasi/penjualan/simpan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::store
* @see app/Http/Controllers/Farmasi/PenjualanController.php:162
* @route '/farmasi/penjualan/simpan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::store
* @see app/Http/Controllers/Farmasi/PenjualanController.php:162
* @route '/farmasi/penjualan/simpan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::generateNota
* @see app/Http/Controllers/Farmasi/PenjualanController.php:33
* @route '/farmasi/penjualan/nota'
*/
export const generateNota = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateNota.url(options),
    method: 'get',
})

generateNota.definition = {
    methods: ["get","head"],
    url: '/farmasi/penjualan/nota',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::generateNota
* @see app/Http/Controllers/Farmasi/PenjualanController.php:33
* @route '/farmasi/penjualan/nota'
*/
generateNota.url = (options?: RouteQueryOptions) => {
    return generateNota.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::generateNota
* @see app/Http/Controllers/Farmasi/PenjualanController.php:33
* @route '/farmasi/penjualan/nota'
*/
generateNota.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateNota.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::generateNota
* @see app/Http/Controllers/Farmasi/PenjualanController.php:33
* @route '/farmasi/penjualan/nota'
*/
generateNota.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateNota.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::listRiwayat
* @see app/Http/Controllers/Farmasi/PenjualanController.php:53
* @route '/farmasi/penjualan/riwayat'
*/
export const listRiwayat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listRiwayat.url(options),
    method: 'get',
})

listRiwayat.definition = {
    methods: ["get","head"],
    url: '/farmasi/penjualan/riwayat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::listRiwayat
* @see app/Http/Controllers/Farmasi/PenjualanController.php:53
* @route '/farmasi/penjualan/riwayat'
*/
listRiwayat.url = (options?: RouteQueryOptions) => {
    return listRiwayat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::listRiwayat
* @see app/Http/Controllers/Farmasi/PenjualanController.php:53
* @route '/farmasi/penjualan/riwayat'
*/
listRiwayat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listRiwayat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::listRiwayat
* @see app/Http/Controllers/Farmasi/PenjualanController.php:53
* @route '/farmasi/penjualan/riwayat'
*/
listRiwayat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listRiwayat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::print
* @see app/Http/Controllers/Farmasi/PenjualanController.php:91
* @route '/farmasi/penjualan/print/{nota_jual}'
*/
export const print = (args: { nota_jual: string | number } | [nota_jual: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})

print.definition = {
    methods: ["get","head"],
    url: '/farmasi/penjualan/print/{nota_jual}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::print
* @see app/Http/Controllers/Farmasi/PenjualanController.php:91
* @route '/farmasi/penjualan/print/{nota_jual}'
*/
print.url = (args: { nota_jual: string | number } | [nota_jual: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nota_jual: args }
    }

    if (Array.isArray(args)) {
        args = {
            nota_jual: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        nota_jual: args.nota_jual,
    }

    return print.definition.url
            .replace('{nota_jual}', parsedArgs.nota_jual.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::print
* @see app/Http/Controllers/Farmasi/PenjualanController.php:91
* @route '/farmasi/penjualan/print/{nota_jual}'
*/
print.get = (args: { nota_jual: string | number } | [nota_jual: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::print
* @see app/Http/Controllers/Farmasi/PenjualanController.php:91
* @route '/farmasi/penjualan/print/{nota_jual}'
*/
print.head = (args: { nota_jual: string | number } | [nota_jual: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: print.url(args, options),
    method: 'head',
})

const PenjualanController = { index, store, generateNota, listRiwayat, print }

export default PenjualanController