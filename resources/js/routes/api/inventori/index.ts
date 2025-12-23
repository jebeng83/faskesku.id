import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::sisaStok
 * @see app/Http/Controllers/Farmasi/SisaStokController.php:10
 * @route '/api/inventori/sisa-stok'
 */
export const sisaStok = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sisaStok.url(options),
    method: 'get',
})

sisaStok.definition = {
    methods: ["get","head"],
    url: '/api/inventori/sisa-stok',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::sisaStok
 * @see app/Http/Controllers/Farmasi/SisaStokController.php:10
 * @route '/api/inventori/sisa-stok'
 */
sisaStok.url = (options?: RouteQueryOptions) => {
    return sisaStok.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::sisaStok
 * @see app/Http/Controllers/Farmasi/SisaStokController.php:10
 * @route '/api/inventori/sisa-stok'
 */
sisaStok.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sisaStok.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Farmasi\SisaStokController::sisaStok
 * @see app/Http/Controllers/Farmasi/SisaStokController.php:10
 * @route '/api/inventori/sisa-stok'
 */
sisaStok.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sisaStok.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::sirkulasiBarang
 * @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
 * @route '/api/inventori/sirkulasi-barang'
 */
export const sirkulasiBarang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sirkulasiBarang.url(options),
    method: 'get',
})

sirkulasiBarang.definition = {
    methods: ["get","head"],
    url: '/api/inventori/sirkulasi-barang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::sirkulasiBarang
 * @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
 * @route '/api/inventori/sirkulasi-barang'
 */
sirkulasiBarang.url = (options?: RouteQueryOptions) => {
    return sirkulasiBarang.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::sirkulasiBarang
 * @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
 * @route '/api/inventori/sirkulasi-barang'
 */
sirkulasiBarang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sirkulasiBarang.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Farmasi\SirkulasiObatController::sirkulasiBarang
 * @see app/Http/Controllers/Farmasi/SirkulasiObatController.php:11
 * @route '/api/inventori/sirkulasi-barang'
 */
sirkulasiBarang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sirkulasiBarang.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::daruratStok
 * @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
 * @route '/api/inventori/darurat-stok'
 */
export const daruratStok = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: daruratStok.url(options),
    method: 'get',
})

daruratStok.definition = {
    methods: ["get","head"],
    url: '/api/inventori/darurat-stok',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::daruratStok
 * @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
 * @route '/api/inventori/darurat-stok'
 */
daruratStok.url = (options?: RouteQueryOptions) => {
    return daruratStok.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::daruratStok
 * @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
 * @route '/api/inventori/darurat-stok'
 */
daruratStok.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: daruratStok.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Farmasi\DaruratStokController::daruratStok
 * @see app/Http/Controllers/Farmasi/DaruratStokController.php:10
 * @route '/api/inventori/darurat-stok'
 */
daruratStok.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: daruratStok.url(options),
    method: 'head',
})
const inventori = {
    sisaStok: Object.assign(sisaStok, sisaStok),
sirkulasiBarang: Object.assign(sirkulasiBarang, sirkulasiBarang),
daruratStok: Object.assign(daruratStok, daruratStok),
}

export default inventori