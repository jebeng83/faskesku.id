import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::simpan
* @see app/Http/Controllers/Farmasi/PenjualanController.php:162
* @route '/farmasi/penjualan/simpan'
*/
export const simpan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: simpan.url(options),
    method: 'post',
})

simpan.definition = {
    methods: ["post"],
    url: '/farmasi/penjualan/simpan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::simpan
* @see app/Http/Controllers/Farmasi/PenjualanController.php:162
* @route '/farmasi/penjualan/simpan'
*/
simpan.url = (options?: RouteQueryOptions) => {
    return simpan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::simpan
* @see app/Http/Controllers/Farmasi/PenjualanController.php:162
* @route '/farmasi/penjualan/simpan'
*/
simpan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: simpan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::nota
* @see app/Http/Controllers/Farmasi/PenjualanController.php:33
* @route '/farmasi/penjualan/nota'
*/
export const nota = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nota.url(options),
    method: 'get',
})

nota.definition = {
    methods: ["get","head"],
    url: '/farmasi/penjualan/nota',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::nota
* @see app/Http/Controllers/Farmasi/PenjualanController.php:33
* @route '/farmasi/penjualan/nota'
*/
nota.url = (options?: RouteQueryOptions) => {
    return nota.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::nota
* @see app/Http/Controllers/Farmasi/PenjualanController.php:33
* @route '/farmasi/penjualan/nota'
*/
nota.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nota.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::nota
* @see app/Http/Controllers/Farmasi/PenjualanController.php:33
* @route '/farmasi/penjualan/nota'
*/
nota.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nota.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::riwayat
* @see app/Http/Controllers/Farmasi/PenjualanController.php:53
* @route '/farmasi/penjualan/riwayat'
*/
export const riwayat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(options),
    method: 'get',
})

riwayat.definition = {
    methods: ["get","head"],
    url: '/farmasi/penjualan/riwayat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::riwayat
* @see app/Http/Controllers/Farmasi/PenjualanController.php:53
* @route '/farmasi/penjualan/riwayat'
*/
riwayat.url = (options?: RouteQueryOptions) => {
    return riwayat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::riwayat
* @see app/Http/Controllers/Farmasi/PenjualanController.php:53
* @route '/farmasi/penjualan/riwayat'
*/
riwayat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Farmasi\PenjualanController::riwayat
* @see app/Http/Controllers/Farmasi/PenjualanController.php:53
* @route '/farmasi/penjualan/riwayat'
*/
riwayat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayat.url(options),
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

const penjualan = {
    simpan: Object.assign(simpan, simpan),
    nota: Object.assign(nota, nota),
    riwayat: Object.assign(riwayat, riwayat),
    print: Object.assign(print, print),
}

export default penjualan